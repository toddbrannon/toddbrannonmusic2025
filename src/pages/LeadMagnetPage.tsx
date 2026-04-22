import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// ─────────────────────────────────────────────────
// ADD NEW LEAD MAGNETS HERE
// ─────────────────────────────────────────────────
interface LeadMagnetConfig {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  formHeading: string;
}

const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  'major-scale-for-guitarists': {
    title: 'The Guitar Scale That Unlocks Everything Else',
    subtitle: '🎁 Free Download',
    description:
      'A free reference sheet for guitarists who want to understand music, not just play it. Learn the C Major Scale across two octaves — and how its numbered structure becomes the foundation for playing in any key, building chords, and understanding the Nashville Number System.',
    bullets: [
      'Both octaves with tab notation and exact fingering — ascending and descending',
      'See how Whole steps and Half steps create the numbered structure that works in any major key across the neck',
      'Build the foundation for chord theory and the Nashville Number System',
    ],
    formHeading: 'Send it to my inbox',
  },
  // Add future lead magnets here:
  // 'nashville-number-system-cheat-sheet': {
  //   title: '...',
  //   subtitle: '...',
  //   description: '...',
  //   bullets: [...],
  //   formHeading: '...',
  // },
};
// ─────────────────────────────────────────────────

const LeadMagnetPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? LEAD_MAGNETS[slug] : null;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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
        body: JSON.stringify({ email, slug }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-[#F0F8FF] flex items-center justify-center text-[#1A2E42]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600">This resource doesn't exist or may have moved.</p>
          <a href="/" className="mt-6 inline-block text-[#C9A84C] hover:underline">← Back to home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F8FF] text-[#1A2E42] flex flex-col">
      {/* Header */}
      <header className="relative z-10 p-6 bg-white border-b border-[#C9A84C]/20">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <span className="font-bold text-lg tracking-widest text-[#C9A84C]">Todd Brannon Music</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-[#F0F8FF] to-[#FEF7E0] flex-1">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-4 text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
            {config.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#1A2E42]">
            {config.title}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-800 max-w-xl mx-auto mb-8">
            {config.description}
          </p>
          <ul className="text-left text-lg text-[#1A2E42] mb-8 max-w-xl mx-auto space-y-3">
            {config.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 text-[#C9A84C]">→</span> {bullet}
              </li>
            ))}
          </ul>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-[#C9A84C]/30 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#1A2E42]">{config.formHeading}</h2>
            <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#C9A84C]/40 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-[#1A2E42] bg-[#F0F8FF] placeholder-gray-400 text-lg"
                  disabled={status === 'loading' || status === 'success'}
                  autoComplete="off"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'success' ? 'Done ✓' : status === 'loading' ? 'Sending…' : 'Send'}
                </button>
              </div>
              <div className="min-h-[24px] text-base">
                {status === 'success' && (
                  <span className="text-[#C9A84C]">Check your inbox for the download link!</span>
                )}
                {status === 'error' && (
                  <span className="text-red-600">{errorMsg}</span>
                )}
                {status === 'loading' && (
                  <span className="text-gray-500">Sending…</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center text-gray-500 text-sm bg-white border-t border-[#C9A84C]/20">
        <p>&copy; 2026 <a href="https://www.toddbrannonmusic.com" className="hover:underline">Todd Brannon Music</a>. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LeadMagnetPage;