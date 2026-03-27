import { useEffect } from 'react';
import CMLayout from '../../components/confidentmusician/CMLayout';

const GOLD = '#d4af37';

interface PDFCard {
  title: string;
  description: string;
}

const pdfs: PDFCard[] = [
  {
    title: 'Major & Minor Scale Charts',
    description: 'Printable fretboard diagrams for all 12 major and natural minor scales across five positions.',
  },
  {
    title: 'Chord Diagram Library',
    description: 'Open chords, barre chords, and power chord shapes for every common key. Great desk reference.',
  },
  {
    title: 'Weekly Practice Log',
    description: 'Track your daily practice sessions, goals, and progress. Print a new sheet each week.',
  },
];

{/* ADD NEW PDF CARDS HERE */}

export default function CMPDFs() {
  useEffect(() => {
    document.title = 'PDF Resources | The Confident Musician';
  }, []);

  return (
    <CMLayout
      title="PDF Resources"
      subtitle="Download, print, and keep. These reference sheets are yours to use however helps most."
    >
      {/* Coming soon notice */}
      <div className="flex gap-3 items-start rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/8 px-5 py-4 mb-7">
        <svg aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0" style={{ color: GOLD }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-light leading-relaxed" style={{ color: GOLD }}>
          PDFs are being designed and will be ready to download soon. Each sheet is built specifically for students — clean, printable, and guitar-focused.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pdfs.map(pdf => (
          <div
            key={pdf.title}
            className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(212,175,55,0.12)', color: GOLD }}
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">{pdf.title}</h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed flex-1 mb-5">
              {pdf.description}
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white/8 text-gray-400 border border-white/10 self-start">
              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Coming Soon
            </span>
          </div>
        ))}

        {/* ADD NEW PDF CARDS HERE */}
      </div>
    </CMLayout>
  );
}
