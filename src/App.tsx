import React, { useEffect, useRef, useState } from 'react';
import heroImage from './assets/RivoltaLive.jpg';
import logo from './assets/tb_music_logo_1400.png';
import brandLogo from './assets/tbm_brand.png';
import toddHeadshot from './assets/ToddGuitarHeadshot.jpg';
import InquiryForm from './InquiryForm';
import CoachingInquiryForm from './CoachingInquiryForm';
import GeneralContactForm from './GeneralContactForm';
import PrivacyPolicy from './PrivacyPolicy';
import mastersPlanImg from './assets/albums/MastersPlanStirredCover.jpg';
import twentySixImg from './assets/albums/HIAUTMSKI_26_Cover.jpg';
import exWayImg from './assets/albums/TheShakeExWayCover.jpg';
import chaosImg from './assets/albums/TheShakeChaosCover.jpg';
import deepImg from './assets/albums/DeepCallsToDeepDemoCover.png';
import winsImg from './assets/albums/WinsAndScarsDemoCover.png';
import thumbHJlMHuzPDKY from './assets/thumbnails/HJlMHuzPDKY.png';
import thumbM5SHzFuVg from './assets/thumbnails/M5SHz--FuVg.png';
import thumbGusVP from './assets/thumbnails/gusVP-y0vfE.png';
import thumbJK0Pg from './assets/thumbnails/jK0PgX6k6k8.png';
import toddLive2 from './assets/live/ToddLive2.jpeg';
import toddLive3 from './assets/live/ToddLive10.png';
import toddLive5 from './assets/live/ToddLive30.png';
import toddLive10 from './assets/live/ToddLive22.png';
import toddLive14 from './assets/live/ToddLive24.png';

import { SiSpotify, SiApplemusic, SiYoutubemusic, SiSoundcloud, SiBandcamp, SiYoutube } from 'react-icons/si';
import { ArrowDown, Instagram, Mic, Sliders, Music, Headphones } from 'lucide-react';

interface VideoPlayer {
  player: YT.Player | null;
  id: string;
}

function App() {
  const [players, setPlayers] = useState<VideoPlayer[]>([]);
  const [apiReady, setApiReady] = useState(false);
  const currentPlayerRef = useRef<YT.Player | null>(null);
  const playerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [videoStates, setVideoStates] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showCoachingForm, setShowCoachingForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAllShorts, setShowAllShorts] = useState(false);

  const albums = [
    { title: 'Deep Calls To Deep (demo)', artist: 'Todd Brannon', image: deepImg, year: '2025',
      bandcamp: 'https://toddbrannon.bandcamp.com/track/deep-calls-to-deep-demo',
      soundcloud: 'https://soundcloud.com/todd-437268405/deepcallstodeepdemomasterjuly2?si=ebe8da59bb3a487884b3c617dece743a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
    },
    { title: 'Wins & Scars (demo)', artist: 'Todd Brannon', image: winsImg, year: '2025',
      bandcamp: 'https://toddbrannon.bandcamp.com/track/wins-and-scars-demo',
      soundcloud: 'https://soundcloud.com/todd-437268405/wins-and-scars-demo?si=b49d8879fb2043e2b687510f8ed0a9b0&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
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

  const liveShots = [toddLive2, toddLive3, toddLive5, toddLive10, toddLive14]

  const platforms = [
    { key: 'appleMusic', icon: <SiApplemusic className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'spotify', icon: <SiSpotify className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'youtubeMusic', icon: <SiYoutubemusic className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'bandcamp', icon: <SiBandcamp className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'soundcloud', icon: <SiSoundcloud className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
  ];

  const shorts = ['h8Hluai8bks', 'ff3Qf6akxQw', 'uZzbosx7CsU', 'txoq8QpRBnA'];
  const livePerformances = [
    { id: 'HJlMHuzPDKY', title: 'All I Can Say - Valley Creek Worship', image: thumbHJlMHuzPDKY },
    { id: 'M5SHz--FuVg', title: 'This Is Love - Valley Creek Worship', image: thumbM5SHzFuVg },
    { id: 'gusVP-y0vfE', title: 'Christmas 2024 - Valley Creek Worship', image: thumbGusVP, start: 3277, end: 3401 },
    { id: 'jK0PgX6k6k8', title: 'Praise God - Valley Creek Worship', image: thumbJK0Pg, start: 900, end: 1006}
  ];

  useEffect(() => {
    // If the YouTube API is already loaded (e.g. after HMR / hot-reload),
    // onYouTubeIframeAPIReady will never fire again — set ready immediately.
    if ((window as any).YT?.Player) {
      setApiReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => { delete window.onYouTubeIframeAPIReady; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!apiReady) return;

    const initializePlayer = (videoId: string, elementId: string, start?: number, end?: number) => {
      const player = new YT.Player(elementId, {
        videoId,
        playerVars: { start, end, playsinline: 1, controls: 1, rel: 0 },
        events: {
          onStateChange: (event: YT.OnStateChangeEvent) => {
            const playerId = event.target.getVideoData().video_id;
            if (event.data === YT.PlayerState.PLAYING) {
              setVideoStates(prev => ({ ...prev, [playerId]: true }));
              if (currentPlayerRef.current && currentPlayerRef.current !== event.target) {
                currentPlayerRef.current.pauseVideo();
              }
              currentPlayerRef.current = event.target;
            } else {
              setVideoStates(prev => ({ ...prev, [playerId]: false }));
            }
          },
        },
      });
      setPlayers(prev => [...prev.filter(p => p.id !== videoId), { player, id: videoId }]);
    };

    playerRefs.current.forEach((_element, key) => {
      const [type, ...idParts] = key.split('_');
      const videoId = idParts.join('_');
      const elementId = `${type}_player_${videoId}`;
      // Only initialize if no iframe has been injected yet for this slot
      const alreadyMounted = !!document.getElementById(elementId)?.querySelector('iframe');
      if (!alreadyMounted) {
        const found = livePerformances.find(l => l.id === videoId);
        initializePlayer(videoId, elementId, found?.start, found?.end);
      }
    });
  // Re-run when showAllShorts toggles so newly-mounted short divs get players
  }, [apiReady, showAllShorts]);

  const setPlayerRef = (videoId: string, type: 'short' | 'live') => (element: HTMLDivElement | null) => {
    if (element) {
      playerRefs.current.set(`${type}_${videoId}`, element);
    }
  };


  if (showPrivacyPolicy) {
    return (
      <PrivacyPolicy
        onBack={() => {
          setShowPrivacyPolicy(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (showInquiryForm) {
    return (
      <InquiryForm
        onBack={() => {
          setShowInquiryForm(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (showCoachingForm) {
    return (
      <CoachingInquiryForm
        onBack={() => {
          setShowCoachingForm(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (showContactForm) {
    return (
      <GeneralContactForm
        onBack={() => {
          setShowContactForm(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

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
          <img src={logo} alt="TB Music Logo" className="h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] mb-6 object-contain opacity-70" />
          <div className="flex gap-4">
            <button
              data-testid="button-hero-lesson-inquiry"
              onClick={() => {
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#2F4F4F] hover:bg-[#3a6363] text-white"
            >
              Inquire About Lessons
            </button>
            <button
              data-testid="button-hero-coaching-inquiry"
              onClick={() => {
                setShowCoachingForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#2F4F4F] hover:bg-[#3a6363] text-white"
            >
              Inquire About Coaching
            </button>
          </div>
        </div>
      </div>

      <section className="py-24 bg-gray-900 text-gray-100 overflow-hidden">

        {/* Stat callouts */}
        <div className="px-6 md:px-24 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light mb-16">About</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: '20+', label: 'Years in Music' },
                { value: '3', label: 'Studio Recording Projects' },
                { value: '3', label: 'Live Worship Albums' },
                { value: '2', label: 'Teaching Studios' },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-[#C9A84C] pt-5">
                  <div className="text-4xl md:text-5xl font-light text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-light tracking-wide text-gray-400 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pull quote */}
        <div className="px-6 md:px-24 mb-20">
          <div className="max-w-6xl mx-auto">
            <blockquote className="border-l-4 border-[#C9A84C] pl-8 md:pl-12">
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-white italic">
                "Son of a southern gospel singer — music has always been the foundation."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-6 md:px-24 mb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-3">Early Roots</div>
              <h3 className="text-xl font-light text-white mb-4">Before the Stage</h3>
              <p className="text-base font-light leading-relaxed text-gray-400">
                The son of a southern gospel singer, I started piano lessons young and trained steadily until age 14. That early foundation — melody, harmony, discipline — shaped everything that followed.
              </p>
            </div>
            <div>
              <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-3">The Shake Years · 1996–2001</div>
              <h3 className="text-xl font-light text-white mb-4">Building the Band</h3>
              <p className="text-base font-light leading-relaxed text-gray-400">
                In 1996, I formed The Shake with my cousin and two friends. Over five years we recorded a 3-song EP (1998), the full-length album <em>In This Chaos</em> (1999), and additional sessions in Nashville (2001). We performed extensively throughout Dallas-Fort Worth and beyond.
              </p>
            </div>
            <div>
              <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-3">Valley Creek · 2013–Present</div>
              <h3 className="text-xl font-light text-white mb-4">Worship & Community</h3>
              <p className="text-base font-light leading-relaxed text-gray-400">
                Since 2013, I've served as a worship team guitarist at Valley Creek Church in Flower Mound — contributing to three live worship albums in 2015, 2023, and 2024.
              </p>
            </div>
            <div>
              <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-3">Current Projects</div>
              <h3 className="text-xl font-light text-white mb-4">Recording, Remixes & Teaching</h3>
              <p className="text-base font-light leading-relaxed text-gray-400">
                Original instrumental releases live on Spotify, Apple Music, and YouTube under the moniker HIAUTMSKI. I've also produced remixes of classic Shake songs from <em>In This Chaos</em>. On the teaching side, I instruct at two local studios serving north Dallas-Fort Worth and Denton, focusing on rock, pop, and worship — beginner to intermediate.
              </p>
            </div>
          </div>
        </div>

        {/* Full-width staggered photo strip */}
        <div className="w-full overflow-hidden">
          <div className="flex items-end gap-1 md:gap-2" style={{ height: '340px' }}>
            {liveShots.map((image, index) => {
              const offsets = [0, -24, 12, -16, 8];
              return (
                <div
                  key={index}
                  className="flex-1 relative overflow-hidden"
                  style={{
                    height: `${300 + offsets[index % offsets.length]}px`,
                    transform: `translateY(${offsets[index % offsets.length] > 0 ? offsets[index % offsets.length] : 0}px)`,
                  }}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.85)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>

      </section>

      <section className="py-24 px-6 md:px-24 bg-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-3">Featured Work</h2>
            <p className="text-base font-light text-gray-400">Two decades of work across studios, stages, and screens.</p>
          </div>

          {/* Studio Productions */}
          <div className="mb-24">
            <h3 className="text-2xl font-light text-white mb-2">Studio Productions</h3>
            <p className="text-sm font-light text-gray-400 mb-2">Original releases, remixes, and studio projects spanning two decades.</p>
            <p className="text-xs font-light italic text-gray-500 mb-8">Hover over cover to listen</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:overflow-x-auto lg:gap-6 lg:pb-4">
              {albums.map((album, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-xl shadow-lg border border-white/10 lg:flex-none lg:w-52 lg:h-52">
                  <img
                    src={album.image}
                    alt={`${album.title} by ${album.artist}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/85 transition-opacity duration-300 group-hover:opacity-100 p-4 text-center">
                    <span className="text-base font-light mb-1 leading-snug">{album.title}</span>
                    <span className="text-xs font-light mb-1 text-gray-300">{album.artist}</span>
                    <span className="text-xs font-light text-gray-400">{album.year}</span>
                    <div className="flex space-x-3 mt-3">
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

          {/* Live Performances */}
          <div className="mb-24">
            <h3 className="text-2xl font-light text-white mb-2">Live Performances</h3>
            <p className="text-sm font-light text-gray-400 mb-8">Selected clips from the Valley Creek Worship stage.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {livePerformances.map(video => {
                const isOverlayVisible = !videoStates[video.id];
                return (
                  <div key={video.id} className="aspect-video relative rounded-xl shadow-lg overflow-hidden">
                    <div
                      id={`live_player_${video.id}`}
                      className="w-full h-full"
                      ref={setPlayerRef(video.id, 'live')}
                    />
                    {isOverlayVisible && (
                      <div
                        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/play"
                        onClick={() => {
                          const playerObj = players.find(p => p.id === video.id);
                          if (playerObj?.player && typeof playerObj.player.playVideo === "function") {
                            playerObj.player.playVideo();
                          }
                        }}
                      >
                        <img
                          src={video.image}
                          alt="Video thumbnail"
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover/play:brightness-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover/play:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/20 group-hover/play:bg-white/30 transition-colors duration-300 flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Shorts */}
          <div className="mb-16">
            <h3 className="text-2xl font-light text-white mb-2">Performance Shorts</h3>
            <p className="text-sm font-light text-gray-400 mb-8">Quick clips from the home studio and beyond.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {(showAllShorts ? shorts : shorts.slice(0, 6)).map(videoId => (
                <div key={videoId} className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                  <div id={`short_player_${videoId}`} className="w-full h-full rounded-xl shadow-lg" ref={setPlayerRef(videoId, 'short')} />
                </div>
              ))}
            </div>
            {shorts.length > 6 && (
              <div className="mt-10 text-center">
                <button
                  data-testid="button-toggle-shorts"
                  onClick={() => setShowAllShorts(prev => !prev)}
                  className="text-sm font-light text-gray-400 hover:text-[#C9A84C] transition-colors tracking-wide"
                >
                  {showAllShorts ? '← View less' : 'View more →'}
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-gray-900 text-gray-100">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-16">
            <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-3">What I Do</div>
            <h2 className="text-4xl md:text-5xl font-light mb-4">Services</h2>
            <p className="text-base font-light text-gray-400">From the stage to the studio to your living room.</p>
          </div>

          {/* 2x2 card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Live Performance */}
            <div className="rounded-xl p-8 flex flex-col transition-colors" style={{ backgroundColor: '#1A2E42', border: '1px solid rgba(45, 125, 210, 0.6)' }}>
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
                  <Mic className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <h3 className="text-xl font-light text-white mb-3">Live Performance</h3>
                <p className="text-sm font-light leading-relaxed text-gray-400">
                  Available to fill in as your electric guitarist for live gigs or worship team needs. Gear list available upon request.
                </p>
              </div>
              <div className="mt-auto pt-6 border-t border-gray-800">
                <button
                  data-testid="cta-live-performance"
                  onClick={() => { setShowContactForm(true); window.scrollTo(0, 0); }}
                  className="w-full py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Request gear list →
                </button>
              </div>
            </div>

            {/* Studio Engineering */}
            <div className="rounded-xl p-8 flex flex-col transition-colors" style={{ backgroundColor: '#1A2E42', border: '1px solid rgba(45, 125, 210, 0.6)' }}>
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
                  <Sliders className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <h3 className="text-xl font-light text-white mb-3">Studio Engineering & Music Production</h3>
                <p className="text-sm font-light leading-relaxed text-gray-400">
                  Full-service studio production, from pre-production planning through final mastering. Specializing in guitar-driven genres and acoustic arrangements.
                </p>
              </div>
              <div className="mt-auto pt-6 border-t border-gray-800">
                <button
                  data-testid="cta-studio"
                  onClick={() => { setShowCoachingForm(true); window.scrollTo(0, 0); }}
                  className="w-full py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Start a project →
                </button>
              </div>
            </div>

            {/* Guitar Instruction */}
            <div className="rounded-xl p-8 flex flex-col transition-colors" style={{ backgroundColor: '#1A2E42', border: '1px solid rgba(45, 125, 210, 0.6)' }}>
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
                  <Music className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <h3 className="text-xl font-light text-white mb-3">Guitar Instruction</h3>
                <p className="text-sm font-light leading-relaxed text-gray-400">
                  Private lessons for all skill levels. Customized curriculum focusing on technique, theory, and personal style development.
                </p>
              </div>
              <div className="mt-auto pt-6 border-t border-gray-800">
                <button
                  data-testid="cta-lessons"
                  onClick={() => { setShowInquiryForm(true); window.scrollTo(0, 0); }}
                  className="w-full py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Inquire about lessons →
                </button>
              </div>
            </div>

            {/* Session Work */}
            <div className="rounded-xl p-8 flex flex-col transition-colors" style={{ backgroundColor: '#1A2E42', border: '1px solid rgba(45, 125, 210, 0.6)' }}>
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
                  <Headphones className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <h3 className="text-xl font-light text-white mb-3">Session Work</h3>
                <p className="text-sm font-light leading-relaxed text-gray-400">
                  Professional guitar tracks for your recordings. Remote sessions available with quick turnaround times.
                </p>
              </div>
              <div className="mt-auto pt-6 border-t border-gray-800">
                <button
                  data-testid="cta-session"
                  onClick={() => { setShowContactForm(true); window.scrollTo(0, 0); }}
                  className="w-full py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Book a session →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 md:px-24 bg-gray-300">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Get in Touch</h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <button
              data-testid="button-open-lesson-inquiry"
              onClick={() => {
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#2F4F4F] hover:bg-[#3a6363] text-white"
            >
              Inquire About Lessons
            </button>
            <button
              data-testid="button-open-coaching-inquiry"
              onClick={() => {
                setShowCoachingForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#2F4F4F] hover:bg-[#3a6363] text-white"
            >
              Coaching Inquiry
            </button>
            <button
              data-testid="button-open-general-contact"
              onClick={() => {
                setShowContactForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#2F4F4F] hover:bg-[#3a6363] text-white"
            >
              General Contact
            </button>
          </div>

          <p className="text-lg md:text-xl font-light mb-12">
            Available for live performance, production, session work, and private instruction. Let's create something extraordinary together.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
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
              <span>Instagram</span>
            </a>

            <a
              href="https://youtube.com/@toddbrannonmusic?si=H3_Ao1IBbC_OuXO3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#FF0000] hover:text-[#CC0000] transition-colors"
            >
              <SiYoutube className="w-6 h-6 cursor-pointer" />
              <span>YouTube</span>
            </a>

            <a
              href="https://toddbrannon.bandcamp.com/track/deep-calls-to-deep-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#629AA9] hover:text-[#517e8d] transition-colors"
            >
              <SiBandcamp className="w-6 h-6 cursor-pointer" />
              <span>Bandcamp</span>
            </a>

            <a
              href="https://soundcloud.com/todd-437268405"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#FF5500] hover:text-[#e94f00] transition-colors"
            >
              <SiSoundcloud className="w-6 h-6 cursor-pointer" />
              <span>SoundCloud</span>
            </a>
            
            

            {/* <a
              href="https://www.instagram.com/the_shake_band"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#E1306C] hover:text-[#C13584] transition-colors"
            >
              <Instagram className="w-6 h-6 cursor-pointer" />
              <span>the_shake_band</span>
            </a> */}
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 md:px-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-6 text-xs">
            <button
              data-testid="button-footer-lesson-inquiry"
              onClick={() => {
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              Lesson Inquiry
            </button>
            <span className="text-white/20">·</span>
            <button
              data-testid="button-footer-coaching-inquiry"
              onClick={() => {
                setShowCoachingForm(true);
                window.scrollTo(0, 0);
              }}
              className="text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              Coaching Inquiry
            </button>
            <span className="text-white/20">·</span>
            <button
              data-testid="button-footer-contact"
              onClick={() => {
                setShowContactForm(true);
                window.scrollTo(0, 0);
              }}
              className="text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Todd Brannon. All rights reserved.</span>
            <button
              data-testid="link-privacy-policy"
              onClick={() => {
                setShowPrivacyPolicy(true);
                window.scrollTo(0, 0);
              }}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {showModal && (
        <div
          data-testid="modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            data-testid="modal-lessons"
            className="relative bg-gray-900 text-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              data-testid="button-close-modal"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white text-xl leading-none"
            >
              ×
            </button>
            <div className="md:w-2/5 flex-shrink-0 flex items-center justify-center bg-gray-950 p-4 md:p-3 md:rounded-l-2xl">
              <img
                src={toddHeadshot}
                alt="Todd Brannon with guitar"
                className="max-h-[30vh] md:max-h-[80vh] w-auto h-auto object-contain rounded-xl"
              />
            </div>
            <div className="flex-1 p-5 md:p-8 flex flex-col justify-center space-y-3 md:space-y-4 overflow-y-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Ready to Play — Really Play?</h2>
              <p className="text-sm md:text-base font-light leading-relaxed text-gray-300">
                Whether you're a beginner picking up a guitar for the first time or a teen or adult looking to sharpen your skills for a worship team or band, I offer focused, personalized instruction that goes beyond technique and theory.
              </p>
              <p className="text-sm md:text-base font-light leading-relaxed text-gray-300">
                With 12 years on the worship team at Valley Creek Church and experience as a songwriter and recording artist, I bring real, working musicianship into every lesson — so you're learning from someone who plays, not just teaches.
              </p>
              <p className="text-sm md:text-base font-light leading-relaxed text-gray-300">
                I currently teach 25+ students at New Song School of the Arts (Argyle) and Legacy Music Studio (Lewisville), with after-school, daytime, and homeschool availability.
              </p>
              <button
                data-testid="button-inquire-lessons"
                onClick={() => {
                  setShowModal(false);
                  setShowInquiryForm(true);
                  window.scrollTo(0, 0);
                }}
                className="mt-2 w-full py-3 px-6 bg-[#2F4F4F] hover:bg-[#3a6363] transition-colors text-white font-light tracking-wide rounded-lg text-base md:text-lg"
              >
                Inquire About Lessons
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
