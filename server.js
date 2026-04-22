import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { pool, init } from './db.js';
import { sendDownloadLink } from './mailer.js';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { Resend } from 'resend';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));

// --- SESSION SETUP ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
}));

const PDF_PATH = process.env.PDF_PATH || '/data/lead-magnet.pdf';
const PDF_FILENAME = process.env.PDF_FILENAME || 'todd-brannon-music-guide.pdf';

// ─────────────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────────────

function requireAuth(req, res, next) {
  if (req.session?.user === process.env.ADMIN_USERNAME) return next();
  res.status(401).send('Unauthorized');
}

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per window
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});


app.post('/admin/login', loginRateLimit, (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.user = process.env.ADMIN_USERNAME;
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.get('/admin/signups', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM summer2026_signups ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error', details: err.message });
  }
});

app.get('/admin', (req, res) => {
  const file = req.session?.user === process.env.ADMIN_USERNAME ? 'admin.html' : 'login.html';
  res.sendFile(join(__dirname, file));
});

// ─────────────────────────────────────────────────
// LEAD MAGNET ROUTES
// ─────────────────────────────────────────────────

app.post('/api/submit', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    let token;
    const result = await pool.query('SELECT token FROM leads WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      token = result.rows[0].token;
    } else {
      token = uuidv4();
      await pool.query('INSERT INTO leads (email, token) VALUES ($1, $2)', [email, token]);
    }
    try {
      await appendWaitlistRow(email);
    } catch (sheetErr) {
      console.error('Google Sheet append error (lead magnet):', sheetErr);
    }
    await sendDownloadLink(email, token);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ error: err.message || 'An error occurred.' });
  }
});

app.get('/download/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const result = await pool.query('SELECT * FROM leads WHERE token = $1', [token]);
    if (result.rows.length === 0) {
      return res.status(404).send('<h1>Not Found</h1><p>Invalid or expired download link.</p>');
    }
    await pool.query('UPDATE leads SET downloaded_at = COALESCE(downloaded_at, NOW()) WHERE token = $1', [token]);
    if (!fs.existsSync(PDF_PATH)) {
      return res.status(503).send('<h1>Service Unavailable</h1><p>The requested file is not available. Please try again later.</p>');
    }
    const fileBuffer = fs.readFileSync(PDF_PATH);
    console.log('File path:', PDF_PATH);
    console.log('File exists:', fs.existsSync(PDF_PATH));
    console.log('File size on disk:', fs.statSync(PDF_PATH).size);
    console.log('Buffer size being sent:', fileBuffer.length);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${PDF_FILENAME}"`);
    return res.send(fileBuffer);
  } catch (err) {
    console.error('Download error:', err);
    return res.status(500).send('<h1>Server Error</h1><p>Could not process your request.</p>');
  }
});

// ─────────────────────────────────────────────────
// ENVIRONMENT / CONFIG
// ─────────────────────────────────────────────────

if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
  console.error('Missing required environment variables: RESEND_API_KEY and/or CONTACT_EMAIL');
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Waitlist';
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const VALID_STUDENT_TYPES = ['myself', 'my-child', 'both'];
const VALID_EXPERIENCE = ['beginner', 'some-experience', 'intermediate', 'advanced'];
const VALID_INTERESTS = ['guitar-lessons', 'worship-prep', 'home-recording', 'songwriting', 'not-sure'];
const VALID_AVAILABILITY = ['after-school', 'daytime', 'homeschool', 'flexible', 'open'];

// ─────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeString(val, maxLen = 500) {
  if (typeof val !== 'string') return '';
  return val.slice(0, maxLen).trim();
}

function sanitizeEnum(val, allowed) {
  if (typeof val === 'string' && allowed.includes(val)) return val;
  return '';
}

function sanitizeEnumArray(val, allowed) {
  if (!Array.isArray(val)) return [];
  return val.filter(v => typeof v === 'string' && allowed.includes(v));
}

const LABELS = {
  'myself': 'Myself',
  'my-child': 'My Child',
  'both': 'Both',
  'beginner': 'Complete Beginner',
  'some-experience': 'Some Experience',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced',
  'guitar-lessons': 'Guitar Lessons',
  'worship-prep': 'Worship Team Prep',
  'home-recording': 'Home Recording (Logic Pro)',
  'songwriting': 'Songwriting Coaching',
  'not-sure': 'Not Sure Yet',
  'after-school': 'After School',
  'daytime': 'Daytime',
  'homeschool': 'Homeschool',
  'flexible': 'Flexible',
  'open': 'Open',
};

function formatLabel(val) {
  return LABELS[val] || val;
}

function formatList(items) {
  if (!items || (Array.isArray(items) && items.length === 0) || items === '') return 'Not specified';
  if (Array.isArray(items)) return items.map(formatLabel).map(escapeHtml).join(', ');
  return escapeHtml(formatLabel(items));
}

function normalizePrivateKey(key) {
  return key ? String(key).replace(/\\n/g, '\n') : '';
}

async function appendWaitlistRow(email) {
  if (GOOGLE_SHEETS_WEBHOOK_URL) {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error(`Google Sheets webhook responded with ${response.status}`);
    }
    return;
  }

  const serviceAccount = GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON)
    : {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: normalizePrivateKey(GOOGLE_PRIVATE_KEY),
      };

  if (!GOOGLE_SHEET_ID || !serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error('Google Sheets integration is not configured.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${GOOGLE_SHEET_NAME}!A:B`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[new Date().toISOString(), escapeHtml(email)]],
    },
  });
}

// ─────────────────────────────────────────────────
// API ROUTES
// ─────────────────────────────────────────────────

app.post('/api/waitlist', async (req, res) => {
  try {
    const email = sanitizeString(req.body.email, 320);
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    await appendWaitlistRow(email);
    return res.json({ success: true });
  } catch (err) {
    console.error('Waitlist submit error:', err);
    return res.status(500).json({ error: String(err.message || 'Failed to submit waitlist. Please try again.') });
  }
});

app.post('/api/inquire', async (req, res) => {
  try {
    const inquiryType = sanitizeString(req.body.inquiryType, 100) || 'Inquiry';
    const name = sanitizeString(req.body.name, 200);
    const email = sanitizeString(req.body.email, 320);
    const phone = sanitizeString(req.body.phone, 30);
    const studentType = sanitizeEnum(req.body.studentType, VALID_STUDENT_TYPES);
    const experience = sanitizeEnum(req.body.experience, VALID_EXPERIENCE);
    const interests = sanitizeEnumArray(req.body.interests, VALID_INTERESTS);
    const availability = sanitizeEnumArray(req.body.availability, VALID_AVAILABILITY);
    const message = sanitizeString(req.body.message, 2000);

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone) || 'Not provided';
    const safeMessage = escapeHtml(message);

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #C9A84C; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 22px; color: #1a1a1a; font-weight: 600;">New Lesson Inquiry</h1>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 15px; color: #fff;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #C9A84C; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 15px; color: #fff;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; vertical-align: top;">Student</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 15px; color: #fff;">${formatList(studentType)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; vertical-align: top;">Experience</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 15px; color: #fff;">${formatList(experience)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; vertical-align: top;">Interested In</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 15px; color: #fff;">${formatList(interests)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; vertical-align: top;">Availability</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; font-size: 15px; color: #fff;">${formatList(availability)}</td>
            </tr>
            ${safeMessage ? `
            <tr>
              <td style="padding: 12px 0; color: #999; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; font-size: 15px; color: #fff; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        <div style="padding: 16px 32px; background-color: #111; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #666;">Sent from Todd Brannon Music inquiry form</p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: 'Todd Brannon Music <noreply@contact.toddbrannonmusic.com>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: inquiryType === 'General Contact'
        ? 'New Message — Todd Brannon Music'
        : `New ${escapeHtml(inquiryType)} — Todd Brannon Music`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      if (error.statusCode === 403) {
        return res.status(500).json({ error: 'Email delivery is not configured yet. Please contact Todd directly.' });
      }
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ─────────────────────────────────────────────────
// STATIC / SPA CATCH-ALL (must be last)
// ─────────────────────────────────────────────────

const distPath = join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^\/(?!api\/|admin).*/, (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

// ─────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────

const PORT = 3001;
init()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });