import { useEffect } from 'react';
import CMLayout from '../../components/confidentmusician/CMLayout';

const GOLD = '#d4af37';

interface AudioCard {
  title: string;
  description: string;
  tempo?: string;
  key?: string;
}

const tracks: AudioCard[] = [
  {
    title: 'Play Along: G–C–D Progression',
    description: 'A beginner-friendly backing track cycling G, C, and D chords. Ideal for practicing chord transitions.',
    tempo: '72 BPM',
    key: 'G Major',
  },
  {
    title: 'Play Along: Minor Chord Workout',
    description: 'Am–Dm–Em progression at a medium tempo. Practice smooth transitions and chord tone targeting.',
    tempo: '80 BPM',
    key: 'A Minor',
  },
  {
    title: 'Slow Tempo: Worship Chord Changes',
    description: 'A slow, spacious backing track for working on clean transitions between worship-style chord voicings.',
    tempo: '58 BPM',
    key: 'C Major',
  },
];

{/* ADD NEW AUDIO CARDS HERE */}

export default function CMAudio() {
  useEffect(() => {
    document.title = 'Audio Resources | The Confident Musician';
  }, []);

  return (
    <CMLayout
      title="Audio Resources"
      subtitle="Backing tracks and play-along recordings. Put on headphones, pick up your guitar, and practice."
    >
      {/* Coming soon notice */}
      <div className="flex gap-3 items-start rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/8 px-5 py-4 mb-7">
        <svg aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0" style={{ color: GOLD }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-light leading-relaxed" style={{ color: GOLD }}>
          Backing tracks are being recorded and mixed. Every track here will be tailored to real things we work on together — the right tempos, keys, and feels for your current level.
        </p>
      </div>

      <div className="space-y-4">
        {tracks.map(track => (
          <div
            key={track.title}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {track.tempo && (
                <span className="text-xs px-2 py-0.5 rounded-full border font-medium" style={{ borderColor: 'rgba(212,175,55,0.4)', color: GOLD }}>
                  {track.tempo}
                </span>
              )}
              {track.key && (
                <span className="text-xs px-2 py-0.5 rounded-full border font-medium" style={{ borderColor: 'rgba(212,175,55,0.4)', color: GOLD }}>
                  {track.key}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">{track.title}</h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
              {track.description}
            </p>
            {/* Audio placeholder */}
            <div className="w-full rounded-xl border border-white/10 bg-white/5 flex items-center gap-4 px-5 py-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(212,175,55,0.12)' }}
              >
                <svg aria-hidden="true" className="w-4 h-4" style={{ color: GOLD }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
              </div>
              <div className="flex-1 h-1.5 rounded-full bg-white/10" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wide text-gray-500 shrink-0">Coming Soon</span>
            </div>
          </div>
        ))}

        {/* ADD NEW AUDIO CARDS HERE */}
      </div>
    </CMLayout>
  );
}
