// Simple Express backend with hardcoded login and protected email signup viewer
import express from 'express';
import session from 'express-session';
import pg from 'pg';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const app = express();
const PORT = process.env.ADMIN_PORT || 4000;

// --- ESM __dirname SHIM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURE POSTGRES ---
const db = new pg.Pool({
  connectionString: process.env.RENDER_POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// --- SESSION SETUP ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- AUTH MIDDLEWARE ---
function requireAuth(req, res, next) {
  if (req.session && req.session.user === 'toddbrannon') {
    return next();
  }
  res.status(401).send('Unauthorized');
}

// --- LOGIN ROUTE ---
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === 'toddbrannon' &&
    password === 'ToddBrannonMusic4Real!'
  ) {
    req.session.user = 'toddbrannon';
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// --- LOGOUT ROUTE ---
app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// --- PROTECTED SIGNUP VIEWER ---
app.get('/admin/signups', requireAuth, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM summer2026_signups ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error', details: err.message });
  }
});

// --- SIMPLE ADMIN PAGE (OPTIONAL) ---
app.get('/admin', (req, res) => {
  if (req.session && req.session.user === 'toddbrannon') {
    res.sendFile(path.join(__dirname, 'admin.html'));
  } else {
    res.sendFile(path.join(__dirname, 'login.html'));
  }
});

// --- STATIC FILES FOR ADMIN UI (OPTIONAL) ---
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Admin server running on port ${PORT}`);
});