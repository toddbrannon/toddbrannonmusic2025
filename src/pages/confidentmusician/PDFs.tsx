import { useEffect } from 'react';
import CMLayout from '../../components/confidentmusician/CMLayout';

const GOLD = '#d4af37';

interface PDFCard {
  title: string;
  description: string;
  filename: string;
}

const pdfs: PDFCard[] = [
  {
    title: 'Major & Minor Scale Charts',
    description: 'Printable fretboard diagrams for all 12 major and natural minor scales across five positions.',
    filename: 'scale-charts.pdf',
  },
  {
    title: 'Chord Diagram Library',
    description: 'Open chords, barre chords, and power chord shapes for every common key. Great desk reference.',
    filename: 'chord-diagrams.pdf',
  },
  {
    title: 'Weekly Practice Log',
    description: 'Track your daily practice sessions, goals, and progress. Print a new sheet each week.',
    filename: 'practice-log.pdf',
  },
];

{/* ADD NEW PDF CARDS HERE */}

export default function CMPDFs() {
  useEffect(() => {
    document.title = 'PDF Resources | Confident Musician';
  }, []);

  return (
    <CMLayout
      title="PDF Resources"
      subtitle="Download, print, and keep. These reference sheets are yours to use however helps most."
    >
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
            <a
              href={`/resources/pdfs/${pdf.filename}`}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 text-[#0f0f1a] self-start"
              style={{ backgroundColor: GOLD }}
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </a>
          </div>
        ))}

        {/* ADD NEW PDF CARDS HERE */}
      </div>
    </CMLayout>
  );
}
