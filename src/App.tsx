import React, { useEffect, useRef, useState } from 'react';
import heroImage from './assets/RivoltaLive.jpg';
import logo from './assets/tb_music_logo_1400.png';
import brandLogo from './assets/tbm_brand.png';
import mastersPlanImg from './assets/albums/MastersPlanStirredCover.jpg';
import twentySixImg from './assets/albums/HIAUTMSKI_26_Cover.jpg';
import exWayImg from './assets/albums/TheShakeExWayCover.jpg';
import chaosImg from './assets/albums/TheShakeChaosCover.jpg';
import deepImg from './assets/albums/DeepCallsToDeepDemoCover.png';
import winsImg from './assets/albums/WinsAndScarsDemoCover.png';

import { SiSpotify, SiApplemusic, SiYoutubemusic, SiSoundcloud, SiBandcamp } from 'react-icons/si';
import { ArrowDown, Instagram } from 'lucide-react';

interface VideoPlayer {
  player: YT.Player | null;
  id: string;
}

function App() {
  const [players, setPlayers] = useState<VideoPlayer[]>([]);
  const [apiReady, setApiReady] = useState(false);
  const currentPlayerRef = useRef<YT.Player | null>(null);
  const playerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const albums = [
    { title: 'Deep Calls To Deep (demo)', artist: 'Todd Brannon', image: deepImg, year: '2025',
      bandcamp: 'https://toddbrannon.bandcamp.com/track/deep-calls-to-deep-demo',
      soundcloud: 'https://soundcloud.com/todd-437268405/deep-calls-to-deep-demo?si=8bf98b2ab6dc48348c187f4706a596b1&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
    },
    { title: 'Wins & Scars (demo)', artist: 'Todd Brannon', image: winsImg, year: '2025',
      bandcamp: 'https://open.spotify.com/album/6nV9Sjp2BMS9w68olk4JHf?si=YLri_IEJT8iYicU9PR8Tlg',
      soundcloud: 'https://music.apple.com/us/album/in-this-chaos/1705257577'
    },
    { title: 'In This Chaos', artist: 'The Shake', image: chaosImg, year: '1999',
      spotify: 'https://open.spotify.com/album/6nV9Sjp2BMS9w68olk4JHf?si=YLri_IEJT8iYicU9PR8Tlg',
      appleMusic: 'https://music.apple.com/us/album/in-this-chaos/1705257577',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_meBCEETXYmq4R6KX0JkAQiCpduPstL2Ck&si=eFGHGxK5BXJJUo3u'
    },
    { title: "The Master's Plan (2023 Stirred Up Version)", artist: 'The Shake', image: mastersPlanImg, year: '2023',
      spotify: 'https://open.spotify.com/album/1Azz2rVvRWWxr4cjwWce8K?si=_GmTe_uvSgqbHEuHvjI_Gw',
      appleMusic: 'https://music.apple.com/us/album/the-masters-plan-2023-stirred-up-version-single/1715338006',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_ksWFz0A0OmPAt48u0u_4j7TbwIX8wslgg&si=32lVd7sTCBuFvb6e'
    },
    { title: 'Excellent Way (The Revival Beat Remix)', artist: 'The Shake', image: exWayImg, year: '2023',
      spotify: 'https://open.spotify.com/album/2YWxtmqNXWwp5mF2d1x1sJ?si=89AolnG6QkmLDLu4CrwWVw',
      appleMusic: 'https://music.apple.com/us/album/excellent-way-the-revival-beat-remix-the-1998/1735443250',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_keU0JbZJOs8m3G8xrP8WFVtH_IFkdxmFM&si=4b2n7dpyJvtjvQUU'
    },
    { title: '26', artist: 'HIAUTMSKI', image: twentySixImg, year: '2023',
      spotify: 'https://open.spotify.com/album/2YRgwdRgjZi3Rx9VVfKEcK?si=hrhdPggFTL6QiSg6LU7ukA',
      appleMusic: 'https://music.apple.com/us/album/26-single/1772098428',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_lymBl8qbqpgcHoFe3fltbaTqH7ly_Wj10&si=jvU3i4z4wzsk7Sgl'
    }
  ];

  const platforms = [
    { key: 'appleMusic', icon: <SiApplemusic className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'spotify', icon: <SiSpotify className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'youtubeMusic', icon: <SiYoutubemusic className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'bandcamp', icon: <SiBandcamp className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'soundcloud', icon: <SiSoundcloud className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
  ];

  const shorts = ['rgtTCIE7i0k', 'COfxfBqVXV4', 'txoq8QpRBnA', 'naAJz__fqgQ', '8NSZnh1d5_8','_sAxY1MxrR8', 'nGSuU-unq1E', 'KLOqY1d4ByA', 'QKfNKczBk0k', 'UevV3DAJpCQ', 'YEt4bJQQ0Dc', 'DaD7cpzlmWE'];
  const livePerformances = [
    { id: 'HJlMHuzPDKY', title: 'All I Can Say - Valley Creek Worship' },
    { id: 'M5SHz--FuVg', title: 'This Is Love - Valley Creek Worship' },
    { id: 'gusVP-y0vfE', title: 'Christmas 2024 - Valley Creek Worship', start: 3277, end: 3401 },
    { id: 'jK0PgX6k6k8', title: 'Praise God - Valley Creek Worship', start: 900, end: 1006}
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => { delete window.onYouTubeIframeAPIReady; };
  }, []);

  useEffect(() => {
    if (!apiReady) return;

    const initializePlayer = (videoId: string, elementId: string, start?: number, end?: number) => {
      const player = new YT.Player(elementId, {
        videoId,
        playerVars: { start, end, playsinline: 1, controls: 1, rel: 0 },
        events: {
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.PLAYING) {
              if (currentPlayerRef.current && currentPlayerRef.current !== event.target) {
                currentPlayerRef.current.pauseVideo();
              }
              currentPlayerRef.current = event.target as YT.Player;
            }
          },
        },
      });
      setPlayers(prev => [...prev.filter(p => p.id !== videoId), { player, id: videoId }]);
    };

    playerRefs.current.forEach((element, key) => {
      const [type, ...idParts] = key.split('_');
      const videoId = idParts.join('_');
      const found = livePerformances.find(l => l.id === videoId);
      if (!players.some(p => p.id === videoId)) {
        initializePlayer(videoId, `${type}_player_${videoId}`, found?.start, found?.end);
      }
    });
  }, [apiReady]);

  const setPlayerRef = (videoId: string, type: 'short' | 'live') => (element: HTMLDivElement | null) => {
    if (element) {
      playerRefs.current.set(`${type}_${videoId}`, element);
    }
  };

  return (
    <div className="relative">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <img src={brandLogo} alt="TBM Brand Logo" className="h-8 md:h-10 object-contain" />
        </nav>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <img src={logo} alt="TB Music Logo" className="h-[350px] md:h-[400px] lg:h-[600px] xl:h-[700px] mb-6 object-contain opacity-70" />
          <ArrowDown className="w-8 h-8 animate-bounce mt-12" />
        </div>
      </div>

      <section className="py-24 px-6 md:px-24 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-light mb-12">About</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed">With over two decades...</p>
          <p className="text-lg md:text-xl font-light leading-relaxed">My musical journey continued...</p>
          <p className="text-lg md:text-xl font-light leading-relaxed">Recent projects include instrumental compositions...</p>
          <p className="text-lg md:text-xl font-light leading-relaxed">I also teach guitar...</p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-gray-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Featured Work</h2>
          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8">Performance Shorts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-[1400px] mx-auto">
              {shorts.map(videoId => (
                <div key={videoId} className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                  <div id={`short_player_${videoId}`} className="w-full h-full rounded-lg shadow-lg" ref={setPlayerRef(videoId, 'short')} />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8">Live Performances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {livePerformances.map(video => (
                <div key={video.id} className="aspect-video">
                  <div id={`live_player_${video.id}`} className="w-full h-full rounded-lg shadow-lg" ref={setPlayerRef(video.id, 'live')} />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-light mb-2">Studio Productions</h3>
            <p className="text-sm font-light mb-8">Hover over cover to listen</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {albums.map((album, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <img src={album.image} alt={`${album.title} by ${album.artist}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/80 transition-opacity group-hover:opacity-100 p-4 text-center">
                    <span className="text-xl font-light mb-2">{album.title}</span>
                    <span className="text-sm font-light mb-1">{album.artist}</span>
                    <span className="text-sm font-light">{album.year}</span>
                    <div className="flex space-x-4 mt-4">
                      {platforms.map(({ key, icon }) =>
                        album[key as keyof typeof album] ? (
                          <a key={key} href={album[key as keyof typeof album]} target="_blank" rel="noopener noreferrer">
                            {icon}
                          </a>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Services</h2>
          <div><h3 className="text-2xl font-light mb-4">Studio Engineering & Music Production</h3><p className="text-lg font-light leading-relaxed">Full-service studio production...</p></div>
          <div><h3 className="text-2xl font-light mb-4">Guitar Instruction</h3><p className="text-lg font-light leading-relaxed">Private lessons for all skill levels...</p></div>
          <div><h3 className="text-2xl font-light mb-4">Session Work</h3><p className="text-lg font-light leading-relaxed">Professional guitar tracks...</p></div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-gray-250">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Get in Touch</h2>
          <p className="text-lg md:text-xl font-light mb-12">Available for production, session work, and private instruction. Let's create something extraordinary together.</p>
          <div className="flex justify-center space-x-8">
            <a href="https://www.instagram.com/todd_brannon_music" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#E1306C] hover:text-[#C13584] transition-colors">
              <Instagram className="w-6 h-6 cursor-pointer" /><span>todd_brannon_music</span>
            </a>
            <a href="https://www.instagram.com/the_shake_band" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#E1306C] hover:text-[#C13584] transition-colors">
              <Instagram className="w-6 h-6 cursor-pointer" /><span>the_shake_band</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 md:px-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/80">
          © {new Date().getFullYear()} Todd Brannon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
