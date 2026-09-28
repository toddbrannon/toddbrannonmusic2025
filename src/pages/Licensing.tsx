import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Music, Play, Pause, ExternalLink } from 'lucide-react';
import GeneralContactForm from '../GeneralContactForm';
import enjoyTheRideImg from '../assets/albums/EnjoyTheRide.jpg';
import withoutYouImg from '../assets/albums/WithoutYou.jpg';

const PAGE_TITLE = 'Music Licensing + Custom Production | Todd Brannon Music';
const INQUIRY_TYPE = 'Licensing / Production';

interface LicensingTrack {
  title: string;
  description: string;
  duration: string;
  cover: string | null;
  preview: string | null;
  untitledUrl: string | null;
}

// TODO: confirm the displayed durations (these are the full-track times).
const licensingTracks: LicensingTrack[] = [
  {
    title: 'Enjoy the Ride',
    description: 'Synth and guitar driven rock with male vocals',
    duration: '3:12',
    cover: enjoyTheRideImg,
    preview: '/audio/enjoy-the-ride.m4a',
    untitledUrl: 'https://untitled.stream/library/track/HZnlUZuUedb1ozL0DYGgI',
  },
  {
    title: 'Without You',
    description: 'Guitar groove driven rock with ambient vibes under male vocals',
    duration: '3:48',
    cover: withoutYouImg,
    preview: '/audio/without-you.m4a',
    untitledUrl: 'https://untitled.stream/library/track/bVtBQjCyPbBqIj2fGVOo6',
  },
];

const available = [
  'Original songs & masters',
  'Instrumental compositions',
  'Custom composition to brief',
  'Guitar & production',
  'Instrumental mixes, alternate mixes & stems',
  'One-stop clearance on select titles',
];

export default function Licensing() {
  const [showForm, setShowForm] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    const previous = document.title;
    document.title = PAGE_TITLE;
    return () => {
      document.title = previous;
    };
  }, []);

  // Only one preview plays at a time; starting one resets the other.
  const togglePreview = (e: MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRefs.current[index];
    if (!audio) return;
    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }
    if (playingIndex !== null) {
      const previous = audioRefs.current[playingIndex];
      if (previous) {
        previous.pause();
        previous.currentTime = 0;
      }
    }
    audio.play();
    setPlayingIndex(index);
  };

  useEffect(() => {
    const players = audioRefs.current;
    return () => {
      players.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  if (showForm) {
    return (
      <GeneralContactForm
        inquiryType={INQUIRY_TYPE}
        onBack={() => {
          setShowForm(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-gray-100 pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-5">Licensing + Production</p>
        <h1 className="text-4xl md:text-5xl font-light leading-tight text-white mb-6">
          Music Licensing + Custom Production
        </h1>
        <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 mb-16">
          Original songs, instrumental compositions and custom music for film, television,
          advertising, digital media and other visual projects.
        </p>

        <h2 className="text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-6">Available</h2>
        <ul className="space-y-3 text-base md:text-lg font-light text-gray-200 mb-16">
          {available.map((item) => (
            <li key={item}>
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block mr-4 align-middle" />
              {item}
            </li>
          ))}
        </ul>

        <h2 id="selected-work" className="scroll-mt-24 text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-6">
          Listen to selected work
        </h2>
        <ul className="divide-y divide-white/10 border-y border-white/10 mb-16">
          {licensingTracks.map((track, index) => (
            <li key={track.title} className="flex items-center gap-4 py-4">
              <div className="w-14 h-14 rounded-md overflow-hidden border border-white/10 flex-shrink-0">
                {track.cover ? (
                  <img src={track.cover} alt={`${track.title} cover`} className="w-full h-full object-cover" />
                ) : (
                  <div
                    aria-hidden="true"
                    className="w-full h-full bg-gradient-to-br from-[#1A2E42] to-[#2A3E52] flex items-center justify-center"
                  >
                    <Music className="w-5 h-5 text-[#C9A84C]/70" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-base font-light text-white truncate">{track.title}</div>
                <div className="text-sm font-light text-gray-400 truncate">{track.description}</div>
              </div>

              <div className="text-xs font-light text-gray-500 tabular-nums hidden sm:block">{track.duration}</div>

              {track.preview ? (
                <>
                  <button
                    type="button"
                    data-testid={`licensing-preview-${index}`}
                    onClick={(e) => togglePreview(e, index)}
                    aria-label={
                      playingIndex === index
                        ? `Pause preview of ${track.title}`
                        : `Play preview of ${track.title}`
                    }
                    aria-pressed={playingIndex === index}
                    className="h-9 w-9 flex-shrink-0 rounded-full bg-[#C9A84C] text-[#1A2E42] flex items-center justify-center hover:bg-[#b8953d] transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    {playingIndex === index ? (
                      <Pause className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Play className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[index] = el;
                    }}
                    src={track.preview}
                    preload="none"
                    onEnded={() => setPlayingIndex(null)}
                  />
                </>
              ) : (
                <button
                  type="button"
                  data-testid={`licensing-preview-${index}`}
                  disabled
                  aria-disabled="true"
                  title="Preview coming soon"
                  aria-label={`Preview of ${track.title} coming soon`}
                  className="h-9 w-9 flex-shrink-0 rounded-full bg-white/5 text-gray-600 cursor-not-allowed flex items-center justify-center"
                >
                  <Play className="w-4 h-4" aria-hidden="true" />
                </button>
              )}

              {track.untitledUrl && (
                <a
                  href={track.untitledUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${track.title} on untitled`}
                  className="flex-shrink-0"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-[#C9A84C] transition-colors" />
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="text-sm font-light text-gray-500 mb-16">
          Full catalog, instrumentals, and stems available on request.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            data-testid="button-licensing-inquiry"
            onClick={() => {
              setShowForm(true);
              window.scrollTo(0, 0);
            }}
            className="py-3.5 px-7 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
          >
            Licensing / Production Inquiry &rarr;
          </button>
          <a
            href="#selected-work"
            className="py-3.5 px-7 rounded-lg text-sm font-light tracking-wide transition-colors border border-[#C9A84C]/70 text-[#C9A84C] hover:bg-[#C9A84C]/10 text-center"
          >
            Listen to selected work &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
