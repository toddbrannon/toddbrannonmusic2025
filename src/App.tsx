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

  const shorts = ['nGSuU-unq1E', 'KLOqY1d4ByA', 'QKfNKczBk0k', 'UevV3DAJpCQ', 'YEt4bJQQ0Dc', 'DaD7cpzlmWE'];
  const livePerformances = [
    { id: 'HJlMHuzPDKY', title: 'All I Can Say - Valley Creek Worship' },
    { id: 'M5SHz--FuVg', title: 'This Is Love - Valley Creek Worship' },
    { id: 'gusVP-y0vfE', title: 'Christmas 2024 - Valley Creek Worship', start: 3277, end: 3401 },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.getElementsByTagName('script')[0]?.parentNode?.insertBefore(script, document.getElementsByTagName('script')[0]);
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => { delete window.onYouTubeIframeAPIReady; };
  }, []);

  useEffect(() => {
    if (!apiReady) return;

    const initializePlayer = (videoId: string, elementId: string, start?: number, end?: number) => {
      const player = new YT.Player(elementId, {
        videoId,
        playerVars: {
          start,
          end,
          playsinline: 1,
          controls: 1,
          rel: 0,
        },
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
      {/* Keep your JSX exactly the same... */}
      {/* (omitted here for brevity, keep your existing JSX structure unchanged) */}
    </div>
  );
}

export default App;
