import { useEffect } from 'react';
import CMLayout from '../../components/confidentmusician/CMLayout';

const GOLD = '#d4af37';

interface VideoCard {
  title: string;
  description: string;
}

const videos: VideoCard[] = [
  {
    title: 'Capo Techniques Demonstrated',
    description: 'How to use a capo to play in any key while keeping familiar open chord shapes. Great for worship team guitarists.',
  },
  {
    title: 'String Muting for Clean Rhythm',
    description: 'Left and right hand muting techniques that stop unwanted string noise — essential for a tight, professional sound.',
  },
  {
    title: 'How to Read a Chord Chart',
    description: 'A walkthrough of Nashville number charts and standard chord charts used on worship teams and in studio sessions.',
  },
];

{/* ADD NEW VIDEO CARDS HERE */}

export default function CMVideos() {
  useEffect(() => {
    document.title = 'Video Resources | The Confident Musician';
  }, []);

  return (
    <CMLayout
      title="Video Resources"
      subtitle="Watch at your own pace. Pause, rewind, and revisit as many times as you need."
    >
      {/* Coming soon notice */}
      <div className="flex gap-3 items-start rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/8 px-5 py-4 mb-7">
        <svg aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0" style={{ color: GOLD }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-light leading-relaxed" style={{ color: GOLD }}>
          Videos are being recorded and edited. Each one is shot specifically to support what you're working on in lessons — clear, focused, and easy to follow along with.
        </p>
      </div>

      <div className="space-y-5">
        {videos.map(video => (
          <div
            key={video.title}
            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
          >
            {/* Video placeholder */}
            <div className="aspect-video w-full bg-white/5 flex flex-col items-center justify-center gap-3 border-b border-white/10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(212,175,55,0.12)' }}
              >
                <svg aria-hidden="true" className="w-7 h-7" style={{ color: GOLD }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Video Coming Soon</span>
            </div>
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">{video.title}</h2>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{video.description}</p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/8 text-gray-400 border border-white/10 mt-0.5">
                <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Coming Soon
              </span>
            </div>
          </div>
        ))}

        {/* ADD NEW VIDEO CARDS HERE */}
      </div>
    </CMLayout>
  );
}
