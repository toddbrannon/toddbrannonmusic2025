import { useEffect } from 'react';
import CMLayout from '../../components/confidentmusician/CMLayout';

const GOLD = '#d4af37';

interface AudioCard {
  title: string;
  description: string;
  src: string;
  tempo?: string;
  key?: string;
}

const tracks: AudioCard[] = [
  {
    title: 'Play Along: G–C–D Progression',
    description: 'A beginner-friendly backing track cycling G, C, and D chords. Ideal for practicing chord transitions.',
    src: '/resources/audio/g-c-d-progression.mp3',
    tempo: '72 BPM',
    key: 'G Major',
  },
  {
    title: 'Play Along: Minor Chord Workout',
    description: 'Am–Dm–Em progression at a medium tempo. Practice smooth transitions and chord tone targeting.',
    src: '/resources/audio/minor-chord-workout.mp3',
    tempo: '80 BPM',
    key: 'A Minor',
  },
  {
    title: 'Slow Tempo: Worship Chord Changes',
    description: 'A slow, spacious backing track for working on clean transitions between worship-style chord voicings.',
    src: '/resources/audio/worship-changes-slow.mp3',
    tempo: '58 BPM',
    key: 'C Major',
  },
];

{/* ADD NEW AUDIO CARDS HERE */}

export default function CMAudio() {
  useEffect(() => {
    document.title = 'Audio Resources | Confident Musician';
  }, []);

  return (
    <CMLayout
      title="Audio Resources"
      subtitle="Backing tracks and play-along recordings. Put on headphones, pick up your guitar, and practice."
    >
      <div className="space-y-4">
        {tracks.map(track => (
          <div
            key={track.title}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap gap-2 mb-3">
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
            <audio
              controls
              className="w-full rounded-lg"
              style={{ accentColor: GOLD }}
              aria-label={track.title}
            >
              <source src={track.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}

        {/* ADD NEW AUDIO CARDS HERE */}
      </div>
    </CMLayout>
  );
}
