import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Resource {
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

const resources: Resource[] = [
  {
    title: 'The Art of Strumming',
    description:
      'A focused guide to developing rhythm, feel, and confidence with the strum hand. Download and use alongside your lessons.',
    href: '/resources/art-of-strumming.html',
    external: true,
  },
];

export default function FreeResources() {
  useEffect(() => {
    document.title = 'Free Resources | Todd Brannon Music';
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F8FF] text-[#1A2E42] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#C9A84C]/20 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-sm tracking-widest uppercase text-[#C9A84C]">
            Todd Brannon Music
          </Link>
          <Link
            to="/"
            className="text-sm text-[#1A2E42] hover:text-[#C9A84C] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Page heading */}
      <section className="px-6 py-16 bg-gradient-to-b from-[#F0F8FF] to-[#FEF7E0]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            For Students &amp; Visitors
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Free Resources
          </h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl mx-auto">
            Guides, reference sheets, and downloads to support your playing — no strings attached.
          </p>
        </div>
      </section>

      {/* Resource cards */}
      <section className="flex-1 px-6 pt-8 pb-20">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target={r.external ? '_blank' : undefined}
              rel={r.external ? 'noopener noreferrer' : undefined}
              className="group bg-white rounded-xl border border-[#C9A84C]/25 shadow-sm hover:shadow-md hover:border-[#C9A84C]/60 transition-all p-6 flex flex-col"
            >
              {/* PDF icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  style={{ stroke: '#C9A84C' }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0
                       0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0
                       0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125
                       1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0
                       1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-semibold text-[#1A2E42] mb-2 group-hover:text-[#C9A84C] transition-colors">
                {r.title}
              </h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed flex-1 mb-5">
                {r.description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A84C]">
                View &amp; Download
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C9A84C]/20 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          &copy; 2026{' '}
          <a href="https://www.toddbrannonmusic.com" className="hover:underline">
            Todd Brannon Music
          </a>
          . All rights reserved.{' '}
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}
