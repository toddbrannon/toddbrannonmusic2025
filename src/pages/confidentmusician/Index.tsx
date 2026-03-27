import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const GOLD = '#d4af37';

const sections = [
  {
    path: '/confidentmusician/lessons',
    label: 'Deeper Dive Lessons',
    description: 'Detailed lesson write-ups that go beyond what we cover in your session — theory, technique, and context.',
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    path: '/confidentmusician/pdfs',
    label: 'PDF Resources',
    description: 'Printable chord charts, scale diagrams, practice logs, and reference sheets — download and keep.',
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    path: '/confidentmusician/videos',
    label: 'Video Resources',
    description: 'Demonstration videos, technique breakdowns, and lesson supplements you can watch at your own pace.',
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
      </svg>
    ),
  },
  {
    path: '/confidentmusician/audio',
    label: 'Audio Resources',
    description: 'Backing tracks, play-along recordings, and ear training exercises to practice between sessions.',
    icon: (
      <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
];

export default function CMIndex() {
  useEffect(() => {
    document.title = 'The Confident Musician | Student Hub';
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex flex-col">
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-5 text-center">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: GOLD }}>
            Private Student Portal
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            The Confident Musician
          </h1>
          <p className="text-gray-400 font-light text-base max-w-xl mx-auto">
            Your personal resource hub. Everything here is created for students working with Todd Brannon.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map(section => (
            <Link
              key={section.path}
              to={section.path}
              className="group block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all p-6"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(212,175,55,0.12)', color: GOLD }}
              >
                {section.icon}
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                {section.label}
              </h2>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {section.description}
              </p>
              <div
                className="mt-5 text-sm font-medium flex items-center gap-1 transition-colors"
                style={{ color: GOLD }}
              >
                Open section
                <svg aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/10 py-6 px-4 text-center text-xs text-gray-600">
        The Confident Musician · Private student portal · Todd Brannon Music
      </footer>
    </div>
  );
}
