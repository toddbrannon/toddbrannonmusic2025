import React, { useState, useEffect } from 'react';

const GOOGLE_FONTS = [
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=DM+Mono:wght@400;500&display=swap',
];

const gold = '#c8a96e';
const dark = '#080806';
const mono = "'DM Mono', monospace";
const serif = "'Cormorant Garamond', serif";

const fontLinkId = 'lead-magnet-google-fonts';

const LeadMagnetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!document.getElementById(fontLinkId)) {
      const link = document.createElement('link');
      link.id = fontLinkId;
      link.rel = 'stylesheet';
      link.href = GOOGLE_FONTS[0];
      document.head.appendChild(link);
    }
  }, []);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: dark,
        color: '#fff',
        fontFamily: serif,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 12px',
      }}
    >
      <div
        style={{
          background: 'rgba(20,16,8,0.98)',
          borderRadius: 18,
          maxWidth: 580,
          width: '100%',
          margin: '0 auto',
          padding: '40px 32px 32px 32px',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
          border: `1.5px solid ${gold}`,
        }}
      >
        <div style={{ fontFamily: mono, color: gold, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          Todd Brannon Music
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 13, color: '#fff', letterSpacing: 1, marginRight: 10 }}>Free Download</span>
          <span style={{ height: 1, width: 36, background: gold, display: 'inline-block', borderRadius: 2 }} />
        </div>
        <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 38, margin: '18px 0 10px 0', color: gold, lineHeight: 1.1 }}>
          The Guitar Scale That Unlocks Everything Else
        </h1>
        <p style={{ fontFamily: serif, fontSize: 20, color: '#e7e2d6', margin: '0 0 18px 0', lineHeight: 1.4 }}>
          A free reference sheet for guitarists who want to understand music, not just play it. Learn the C Major Scale across two octaves — and how its numbered structure becomes the foundation for playing in any key, building chords, and understanding the Nashville Number System.
        </p>
        <ul style={{ margin: '0 0 18px 0', padding: 0, listStyle: 'none' }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ color: gold, fontFamily: mono, fontSize: 20, marginRight: 10 }}>→</span>
            <span style={{ fontSize: 17, color: '#fff' }}>Both octaves with tab notation and exact fingering — ascending and descending</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ color: gold, fontFamily: mono, fontSize: 20, marginRight: 10 }}>→</span>
            <span style={{ fontSize: 17, color: '#fff' }}>See how Whole steps and Half steps create the numbered structure that works in any major key across the neck</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: gold, fontFamily: mono, fontSize: 20, marginRight: 10 }}>→</span>
            <span style={{ fontSize: 17, color: '#fff' }}>Build the foundation for chord theory and the Nashville Number System</span>
          </li>
        </ul>
        <hr style={{ border: 'none', borderTop: `1px solid #222`, margin: '18px 0 18px 0' }} />
        <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 18, marginBottom: 8, color: '#e7e2d6' }}>
          Send it to my inbox
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ display: 'flex', alignItems: 'center', border: `1.2px solid ${gold}`, borderRadius: 8, overflow: 'hidden', background: '#18140c', marginBottom: 10 }}>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#fff',
                fontFamily: mono,
                fontSize: 17,
                padding: '14px 16px',
                letterSpacing: 0.5,
              }}
              disabled={status === 'loading' || status === 'success'}
              autoComplete="off"
              required
            />
            <button
              type="submit"
              style={{
                background: gold,
                color: dark,
                fontFamily: mono,
                fontWeight: 600,
                fontSize: 16,
                border: 'none',
                padding: '0 22px',
                height: 48,
                cursor: status === 'loading' || status === 'success' ? 'default' : 'pointer',
                transition: 'background 0.2s',
                borderLeft: `1.2px solid ${gold}`,
                borderRadius: 0,
                outline: 'none',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'success' ? 'Done ✓' : status === 'loading' ? 'Sending…' : 'Send'}
            </button>
          </div>
          <div style={{ minHeight: 24, fontFamily: mono, fontSize: 15, marginTop: 2 }}>
            {status === 'success' && (
              <span style={{ color: gold }}>Check your inbox for the download link!</span>
            )}
            {status === 'error' && (
              <span style={{ color: '#e05a5a' }}>{errorMsg}</span>
            )}
            {status === 'loading' && (
              <span style={{ color: '#b6b6b6' }}>Sending…</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadMagnetPage;
