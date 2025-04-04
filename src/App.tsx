import React, { useEffect, useRef, useState } from 'react';
import heroImage from './assets/RivoltaLive.jpg'; // ✅ This imports a string URL
import mastersPlanImg from './assets/albums/MastersPlanStirredCover.jpg';
import twentySixImg from './assets/albums/HIAUTMSKI_26_Cover.jpg';
import exWayImg from './assets/albums/TheShakeExWayCover.jpg';
import chaosImg from './assets/albums/TheShakeChaosCover.jpg';


import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si';
import { Menu, ArrowDown, Instagram, Youtube } from 'lucide-react';

interface VideoPlayer {
  player: YT.Player | null;
  id: string;
}

function App() {``
  const [players, setPlayers] = useState<VideoPlayer[]>([]);
  const [apiReady, setApiReady] = useState(false);
  const currentPlayerRef = useRef<YT.Player | null>(null);
  const playerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const albums = [
    {
      title: 'In This Chaos',
      artist: 'The Shake',
      image: chaosImg,
      year: '1999',
      spotify: 'https://open.spotify.com/album/6nV9Sjp2BMS9w68olk4JHf?si=YLri_IEJT8iYicU9PR8Tlg',
      appleMusic: 'https://music.apple.com/us/album/in-this-chaos/1705257577',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_meBCEETXYmq4R6KX0JkAQiCpduPstL2Ck&si=eFGHGxK5BXJJUo3u',
    },
    {
      title: "The Master's Plan (2023 Stirred Up Version)",
      artist: 'The Shake',
      image: mastersPlanImg,
      year: '2023',
      spotify: 'https://open.spotify.com/album/1Azz2rVvRWWxr4cjwWce8K?si=_GmTe_uvSgqbHEuHvjI_Gw',
      appleMusic: 'https://music.apple.com/us/album/the-masters-plan-2023-stirred-up-version-single/1715338006',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_ksWFz0A0OmPAt48u0u_4j7TbwIX8wslgg&si=32lVd7sTCBuFvb6e',
    },
    {
      title: 'Excellent Way (The Revival Beat Remix)',
      artist: 'The Shake',
      image: exWayImg,
      year: '2023',
      spotify: 'https://open.spotify.com/album/2YWxtmqNXWwp5mF2d1x1sJ?si=89AolnG6QkmLDLu4CrwWVw',
      appleMusic: 'https://music.apple.com/us/album/excellent-way-the-revival-beat-remix-the-1998/1735443250',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_keU0JbZJOs8m3G8xrP8WFVtH_IFkdxmFM&si=4b2n7dpyJvtjvQUU',
    },
    {
      title: '26',
      artist: 'HIAUTMSKI',
      image: twentySixImg,
      year: '2023',
      spotify: 'https://open.spotify.com/album/2YRgwdRgjZi3Rx9VVfKEcK?si=hrhdPggFTL6QiSg6LU7ukA',
      appleMusic: 'https://music.apple.com/us/album/26-single/1772098428',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_lymBl8qbqpgcHoFe3fltbaTqH7ly_Wj10&si=jvU3i4z4wzsk7Sgl',
    },
  ];

  const shorts = ['nGSuU-unq1E', 'KLOqY1d4ByA', 'QKfNKczBk0k', 'UevV3DAJpCQ', 'YEt4bJQQ0Dc'];
  const livePerformances = [
    { id: 'HJlMHuzPDKY', title: 'All I Can Say - Valley Creek Worship' },
    { id: 'M5SHz--FuVg', title: 'This Is Love - Valley Creek Worship' },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  useEffect(() => {
    if (!apiReady) return;

    const initializePlayer = (videoId: string, elementId: string) => {
      const player = new YT.Player(elementId, {
        videoId,
        playerVars: {
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

      setPlayers((prev) => [...prev.filter((p) => p.id !== videoId), { player, id: videoId }]);
    };

    playerRefs.current.forEach((element, key) => {
      const [type, ...videoIdParts] = key.split('_'); // Use underscore as separator
      const videoId = videoIdParts.join('_'); // Rejoin parts to preserve dashes in videoId
      if (!players.some((p) => p.id === videoId)) {
        initializePlayer(videoId, `${type}_player_${videoId}`);
      }
    });
  }, [apiReady]);

  const setPlayerRef = (videoId: string, type: 'short' | 'live') => (element: HTMLDivElement | null) => {
    if (element) {
      playerRefs.current.set(`${type}_${videoId}`, element); // Use underscore instead of dash
    }
  };

  return (
    <div className="relative">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#2F4F4F] opacity-75"></div>
        </div>
        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <span className="text-white text-2xl font-light">TB</span>
          <Menu className="text-white w-6 h-6 cursor-pointer" />
        </nav>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-6xl md:text-8xl font-light mb-6">Todd Brannon</h1>
          <p className="text-xl md:text-2xl font-light mb-4">Guitarist • Songwriter • Engineer • Producer • Instructor</p>
          <ArrowDown className="w-8 h-8 animate-bounce mt-12" />
        </div>
      </div>

      <section className="py-24 px-6 md:px-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12">About</h2>
          <div className="space-y-8">
            <p className="text-lg md:text-xl font-light leading-relaxed">
              With over two decades of experience in music production and performance, I've dedicated my life to crafting authentic sounds and helping others discover their musical voice. Currently, I teach guitar at two local studios serving the Lewisville and Flower Mound, Texas areas five days per week, specializing in beginner to intermediate instruction with a focus on rock, pop, and worship music.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              My musical journey began in 1996 
              when I formed The Shake with my cousin and two friends. We recorded multiple projects, including a 
              3-song EP (1998), a full-length album "In This Chaos" (1999), and additional unreleased tracks in 
              Nashville (2001). During our five years together, we performed extensively throughout the Dallas-Fort Worth 
              area and beyond. Since 2013, I've been an active member of the worship team at Valley Creek Church in Flower Mound, 
              contributing to three live worship albums (2015, 2023, and 2024).
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Recent projects include instrumental compositions released on major streaming platforms (Spotify, Apple Music, YouTube) under the HIAUTMSKI moniker. I've also produced and released remixes of two classic Shake songs from "In This Chaos," alongside making the complete original album available on streaming platforms for a new generation to discover.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              As an instructor, I focus on developing each student's unique style while building a strong foundation in music theory and technique. I'm always open to inquiries from potential new students, offering personalized guidance to help them achieve their musical goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Featured Work</h2>

          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8">Performance Shorts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-[1400px] mx-auto">
              {shorts.map((videoId) => (
                <div key={videoId} className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                  <div
                    id={`short_player_${videoId}`}
                    className="w-full h-full rounded-lg shadow-lg"
                    ref={setPlayerRef(videoId, 'short')}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8">Live Performances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {livePerformances.map((video) => (
                <div key={video.id} className="aspect-video">
                  <div
                    id={`live_player_${video.id}`}
                    className="w-full h-full rounded-lg shadow-lg"
                    ref={setPlayerRef(video.id, 'live')}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8">Studio Productions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {albums.map((album, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <img src={album.image} alt={`${album.title} by ${album.artist}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/80 transition-opacity group-hover:opacity-100 p-4 text-center">
                    <span className="text-xl font-light mb-2">{album.title}</span>
                    <span className="text-sm font-light mb-1">{album.artist}</span>
                    <span className="text-sm font-light">{album.year}</span>
                    <div className="flex space-x-4 mt-4">
                      <a href={album.appleMusic} target="_blank" rel="noopener noreferrer">
                        <SiApplemusic className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                      </a>
                      <a href={album.spotify} target="_blank" rel="noopener noreferrer">
                        <SiSpotify className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                      </a>
                      <a href={album.youtubeMusic} target="_blank" rel="noopener noreferrer">
                        <SiYoutubemusic className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/80 transition-opacity group-hover:opacity-100">
                <span className="text-xl font-light mb-2">Studio Productions</span>
                <span className="text-sm font-light">Recent Albums & Singles</span>
              </div>
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/80 transition-opacity group-hover:opacity-100">
                <span className="text-xl font-light mb-2">Guitar Instruction</span>
                <span className="text-sm font-light">Teaching Portfolio</span>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Services</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-light mb-4">Studio Engineering & Music Production</h3>
              <p className="text-lg font-light leading-relaxed">
                Full-service studio production, from pre-production planning through final mastering. Specializing in guitar-driven genres and acoustic arrangements.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Guitar Instruction</h3>
              <p className="text-lg font-light leading-relaxed">
                Private lessons for all skill levels. Customized curriculum focusing on technique, theory, and personal style development.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Session Work</h3>
              <p className="text-lg font-light leading-relaxed">
                Professional guitar tracks for your recordings. Remote sessions available with quick turnaround times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Get in Touch</h2>
          <p className="text-lg md:text-xl font-light mb-12">
            Available for production, session work, and private instruction. Let's create something extraordinary together.
          </p>
          <div className="flex justify-center space-x-8">
            {/* <a href="https://www.youtube.com/CHANNEL_ID" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-6 h-6 cursor-pointer hover:text-[#2F4F4F] transition-colors" />
            </a> */}
            <a
              href="https://www.instagram.com/todd_brannon_music"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#E1306C] hover:text-[#C13584] transition-colors"
            >
              <Instagram className="w-6 h-6 cursor-pointer" />
              <span>todd_brannon_music</span>
            </a>

            <a
              href="https://www.instagram.com/the_shake_band"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#E1306C] hover:text-[#C13584] transition-colors"
            >
              <Instagram className="w-6 h-6 cursor-pointer" />
              <span>the_shake_band</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 md:px-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Todd Brannon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;