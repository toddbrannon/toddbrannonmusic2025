import express from 'express';
import { Resend } from 'resend';

const app = express();
app.use(express.json({ limit: '100kb' }));

if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
  console.error('Missing required environment variables: RESEND_API_KEY and/or CONTACT_EMAIL');
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

const VALID_STUDENT_TYPES = ['myself', 'my-child', 'both'];
const VALID_EXPERIENCE = ['beginner', 'some-experience', 'intermediate', 'advanced'];
const VALID_INTERESTS = ['guitar-lessons', 'worship-prep', 'home-recording', 'songwriting'];
const VALID_AVAILABILITY = ['after-school', 'daytime', 'homeschool', 'flexible', 'open'];

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

app.post('/api/inquire', async (req, res) => {
  try {
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
      from: 'Todd Brannon Music <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Lesson Inquiry from ${safeName}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});
