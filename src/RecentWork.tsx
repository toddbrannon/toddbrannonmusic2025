import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Play, Pause } from 'lucide-react';
import enjoyTheRideImg from './assets/albums/EnjoyTheRide.jpg';
import withoutYouImg from './assets/albums/WithoutYou.jpg';

interface Track {
  title: string;
  artist: string;
  year: string;
  image: string;
  url: string;
  preview?: string;
}

// Newest tracks, linked out to [untitled]. Add a `preview` path (an audio file in
// public/audio/) to show the inline snippet player on that cover.
const recentWork: Track[] = [
  {
    title: 'Enjoy the Ride',
    artist: 'The Shake',
    year: '2026',
    image: enjoyTheRideImg,
    url: 'https://untitled.stream/library/track/HZnlUZuUedb1ozL0DYGgI',
    preview: '/audio/enjoy-the-ride.m4a',
  },
  {
    title: 'Without You',
    artist: 'The Shake',
    year: '2026',
    image: withoutYouImg,
    url: 'https://untitled.stream/library/track/bVtBQjCyPbBqIj2fGVOo6',
    preview: '/audio/without-you.m4a',
  },
];

const hasPreviews = recentWork.some((track) => track.preview);

// Dark halo behind the hero captions: the background photo alone only gives
// gray-400 ~3.6:1 contrast, below WCAG AA for small text.
const heroCaptionShadow = { textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)' };

export default function RecentWork({ variant = 'section' }: { variant?: 'hero' | 'section' | 'strip' }) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const isHero = variant === 'hero';

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

  // Stop any preview still playing when this unmounts (e.g. an inquiry form opens).
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

  const coverLink = (track: Track, className: string, imgClassName: string) => (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen to ${track.title} on untitled`}
      className={className}
    >
      <img src={track.image} alt={`${track.title} by ${track.artist}`} className={imgClassName} />
    </a>
  );

  // Play/pause toggle plus its hidden <audio>; rendered as a sibling of the cover
  // link so pressing play never follows the outbound link.
  const player = (track: Track, index: number, buttonClass: string, iconClass: string) =>
    track.preview ? (
      <>
        <button
          type="button"
          data-testid={`preview-toggle-${index}`}
          onClick={(e) => togglePreview(e, index)}
          aria-label={
            playingIndex === index
              ? `Pause preview of ${track.title}`
              : `Play preview of ${track.title}`
          }
          aria-pressed={playingIndex === index}
          className={`${buttonClass} rounded-full bg-[#C9A84C] text-[#1A2E42] flex items-center justify-center shadow-lg hover:bg-[#b8953d] transition-colors focus:outline-none focus:ring-2 focus:ring-white/70`}
        >
          {playingIndex === index ? (
            <Pause className={iconClass} aria-hidden="true" />
          ) : (
            <Play className={iconClass} aria-hidden="true" />
          )}
        </button>
        <audio
          ref={(el) => {
            // Ignore React's null on unmount: refs are detached before the effect
            // cleanup runs, and the cleanup needs the element to stop playback.
            if (el) audioRefs.current[index] = el;
          }}
          src={track.preview}
          preload="none"
          onEnded={() => setPlayingIndex(null)}
        />
      </>
    ) : null;

  if (variant === 'strip') {
    return (
      <div>
        <span className="text-[10px] font-light tracking-[0.25em] uppercase text-[#C9A84C]">Latest</span>
        <div className="flex flex-col gap-3 mt-2">
          {recentWork.map((track, index) => (
            <div key={track.title} className="flex items-center gap-3 min-w-0 flex-1">
              {coverLink(
                track,
                'block w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-white/10',
                'w-full h-full object-cover',
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-light text-white truncate">{track.title}</div>
                <div className="text-xs font-light text-gray-400 truncate">{track.artist}</div>
              </div>
              {player(track, index, 'shrink-0 h-8 w-8', 'w-3.5 h-3.5')}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const tiles = recentWork.map((track, index) => (
    <div key={track.title} className={isHero ? 'w-32 sm:w-40' : undefined}>
      <div className="group relative aspect-square overflow-hidden rounded-xl shadow-lg border border-white/10">
        {coverLink(
          track,
          'block w-full h-full',
          'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
        )}
        {player(
          track,
          index,
          isHero ? 'absolute bottom-2 right-2 h-9 w-9' : 'absolute bottom-3 right-3 h-11 w-11',
          isHero ? 'w-4 h-4' : 'w-5 h-5',
        )}
      </div>
      <div className={isHero ? 'mt-2 text-center' : 'mt-3'} style={isHero ? heroCaptionShadow : undefined}>
        <div className={`${isHero ? 'text-sm' : 'text-base'} font-light text-white`}>{track.title}</div>
        <div className="text-xs font-light text-gray-400">
          {track.artist} &middot; {track.year}
        </div>
      </div>
    </div>
  ));

  if (isHero) {
    return (
      <div className="text-center">
        <p className="text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-4 text-balance">
          What I&rsquo;ve been working on lately
        </p>
        <div className="flex justify-center gap-4 sm:gap-6">{tiles}</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-light text-white mb-2">What I&rsquo;ve been working on lately</h3>
      <p className="text-sm font-light text-gray-400 mb-8">
        {hasPreviews
          ? 'New tracks in progress — press play for a preview, or tap the cover to hear the full track on [untitled].'
          : 'New tracks in progress — tap a cover to listen on [untitled].'}
      </p>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-xl">{tiles}</div>
    </div>
  );
}
