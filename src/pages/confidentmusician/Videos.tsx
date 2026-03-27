import { useEffect } from 'react';
import CMLayout from '../../components/confidentmusician/CMLayout';

const GOLD = '#d4af37';

interface VideoCard {
  title: string;
  description: string;
  youtubeId: string;
}

const videos: VideoCard[] = [
  {
    title: 'Capo Techniques Demonstrated',
    description: 'How to use a capo to play in any key while keeping familiar open chord shapes. Great for worship team guitarists.',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    title: 'String Muting for Clean Rhythm',
    description: 'Left and right hand muting techniques that stop unwanted string noise — essential for a tight, professional sound.',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    title: 'How to Read a Chord Chart',
    description: 'A walkthrough of Nashville number charts and standard chord charts used on worship teams and in studio sessions.',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

{/* ADD NEW VIDEO CARDS HERE */}

export default function CMVideos() {
  useEffect(() => {
    document.title = 'Video Resources | Confident Musician';
  }, []);

  return (
    <CMLayout
      title="Video Resources"
      subtitle="Watch at your own pace. Pause, rewind, and revisit as many times as you need."
    >
      <div className="space-y-8">
        {videos.map(video => (
          <div
            key={video.title}
            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <div className="aspect-video w-full">
              <iframe
                title={video.title}
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&cc_load_policy=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold text-white mb-1">{video.title}</h2>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{video.description}</p>
              <p className="mt-3 text-xs font-medium" style={{ color: GOLD }}>
                ▶ Watch above
              </p>
            </div>
          </div>
        ))}

        {/* ADD NEW VIDEO CARDS HERE */}
      </div>
    </CMLayout>
  );
}
