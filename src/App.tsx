import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CMIndex from './pages/confidentmusician/Index';
import CMLessons from './pages/confidentmusician/Lessons';
import CMPDFs from './pages/confidentmusician/PDFs';
import CMVideos from './pages/confidentmusician/Videos';
import CMAudio from './pages/confidentmusician/Audio';
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
import toddLive2 from './assets/live/ToddLive2.jpeg';
import toddLive3 from './assets/live/ToddLive10.png';
import toddLive5 from './assets/live/ToddLive30.png';
import toddLive10 from './assets/live/ToddLive22.png';
import toddLive14 from './assets/live/ToddLive24.png';

import { SiSpotify, SiApplemusic, SiYoutubemusic, SiSoundcloud, SiBandcamp, SiYoutube } from 'react-icons/si';
import { Instagram, Mic, Sliders, Music, Headphones } from 'lucide-react';

function App() {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const wasAutoTriggeredRef = useRef(false);
  const mainContentRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showCoachingForm, setShowCoachingForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const location = useLocation();
  const isCMPath = location.pathname.startsWith('/confidentmusician');

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
    { key: 'appleMusic', label: 'Apple Music', icon: <SiApplemusic aria-hidden="true" className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'spotify', label: 'Spotify', icon: <SiSpotify aria-hidden="true" className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'youtubeMusic', label: 'YouTube Music', icon: <SiYoutubemusic aria-hidden="true" className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'bandcamp', label: 'Bandcamp', icon: <SiBandcamp aria-hidden="true" className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
    { key: 'soundcloud', label: 'SoundCloud', icon: <SiSoundcloud aria-hidden="true" className="w-6 h-6 text-white hover:text-gray-300 transition-colors" /> },
  ];

  const shorts = [
    { id: 'h8Hluai8bks', title: 'Home Studio Guitar – Performance Short' },
    { id: 'ff3Qf6akxQw', title: 'Live Worship Guitar – Performance Short' },
    { id: 'uZzbosx7CsU', title: 'Worship Guitar – Performance Short' },
    { id: 'rgtTCIE7i0k', title: 'Guitar Performance Short' },
  ];

  useEffect(() => {
    if (isCMPath) return;
    document.title = 'Todd Brannon Music';
  }, [isCMPath]);

  useEffect(() => {
    if (isCMPath) return;
    if (sessionStorage.getItem('modal-dismissed')) return;
    const timer = setTimeout(() => {
      wasAutoTriggeredRef.current = true;
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isCMPath]);

  useEffect(() => {
    if (showModal && modalRef.current) {
      if (!wasAutoTriggeredRef.current) {
        modalTriggerRef.current = document.activeElement as HTMLElement;
      }
      const closeBtn = modalRef.current.querySelector<HTMLElement>('button[aria-label="Close dialog"]');
      if (closeBtn) {
        closeBtn.focus();
      } else {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length) focusable[0].focus();
      }
    }
  }, [showModal]);

  const closeModal = useCallback(() => {
    sessionStorage.setItem('modal-dismissed', '1');
    const autoTriggered = wasAutoTriggeredRef.current;
    wasAutoTriggeredRef.current = false;
    setShowModal(false);
    setTimeout(() => {
      if (autoTriggered) {
        mainContentRef.current?.focus();
      } else {
        const trigger = modalTriggerRef.current;
        if (trigger && trigger !== document.body && typeof trigger.focus === 'function') {
          trigger.focus();
        }
      }
    }, 0);
  }, []);

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab' || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  if (isCMPath) {
    return (
      <Routes>
        <Route path="/confidentmusician" element={<CMIndex />} />
        <Route path="/confidentmusician/lessons" element={<CMLessons />} />
        <Route path="/confidentmusician/pdfs" element={<CMPDFs />} />
        <Route path="/confidentmusician/videos" element={<CMVideos />} />
        <Route path="/confidentmusician/audio" element={<CMAudio />} />
      </Routes>
    );
  }

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C9A84C] focus:text-[#1A2E42] focus:rounded-lg focus:font-medium focus:text-sm"
      >
        Skip to main content
      </a>
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <nav aria-label="Main navigation" className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <img src={brandLogo} alt="Todd Brannon Music" className="h-8 md:h-10 object-contain" />
        </nav>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="sr-only">Todd Brannon Music</h1>
          <img src={logo} alt="" aria-hidden="true" className="h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] mb-6 object-contain opacity-70" />
          <div className="flex gap-4">
            <button
              data-testid="button-hero-lesson-inquiry"
              onClick={() => {
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
            >
              Inquire About Lessons
            </button>
            <button
              data-testid="button-hero-coaching-inquiry"
              onClick={() => {
                setShowCoachingForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
            >
              Inquire About Coaching
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" ref={mainContentRef} tabIndex={-1} className="focus:outline-none">

      <section aria-labelledby="about-heading" className="py-24 bg-gray-900 text-gray-100 overflow-hidden">

        {/* Stat callouts */}
        <div className="px-6 md:px-24 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 id="about-heading" className="text-4xl md:text-5xl font-light mb-16">About</h2>
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
                Son of a gospel singer — music has always been the foundation.
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
                The son of a gospel singer, I started piano lessons young and trained steadily until age 14. That early foundation — melody, harmony, discipline — shaped everything that followed.
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

        {/* Photo grid */}
        <div className="px-6 md:px-24 mt-12 mb-8">
          <div className="max-w-6xl mx-auto grid grid-cols-5 gap-2.5">
            {liveShots.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-xl" style={{ height: '360px' }}>
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

      </section>

      <section aria-labelledby="featured-work-heading" className="py-24 px-6 md:px-24 bg-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-12">
            <h2 id="featured-work-heading" className="text-4xl md:text-5xl font-light text-white">Featured Work</h2>
          </div>

          {/* Studio Productions */}
          <div className="mb-24">
            <h3 className="text-2xl font-light text-white mb-2">Studio Productions</h3>
            <p className="text-sm font-light text-gray-400 mb-2">Original releases, remixes, and studio projects spanning two decades.</p>
            <p className="text-xs font-light italic text-gray-400 mb-8">Hover or focus a cover to listen</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {albums.map((album, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-xl shadow-lg border border-white/10">
                  <img
                    src={album.image}
                    alt={`${album.title} by ${album.artist}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/85 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 p-4 text-center">
                    <span className="text-base font-light mb-1 leading-snug">{album.title}</span>
                    <span className="text-xs font-light mb-1 text-gray-300">{album.artist}</span>
                    <span className="text-xs font-light text-gray-300">{album.year}</span>
                    <div className="flex space-x-3 mt-3">
                      {platforms.map(({ key, label, icon }) =>
                        album[key as keyof typeof album] ? (
                          <a key={key} href={album[key as keyof typeof album]} target="_blank" rel="noopener noreferrer" aria-label={`Listen on ${label}`}>
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

          {/* Performance Shorts */}
          <div>
            <h3 className="text-2xl font-light text-white mb-2">Performance Shorts</h3>
            <p className="text-sm font-light text-gray-400 mb-1">Quick clips from the home studio and beyond.</p>
            <p className="text-xs font-light text-gray-400 mb-8">
              Captions available — use the CC button in each video player, or press <kbd className="px-1 py-0.5 rounded bg-white/10 text-xs font-mono">c</kbd> while the video is focused.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shorts.map(short => (
                <div key={short.id} className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                  <iframe
                    id={`shorts_player_${short.id}`}
                    title={short.title}
                    src={`https://www.youtube.com/embed/${short.id}?enablejsapi=1&playsinline=1&controls=1&rel=0&cc_load_policy=1`}
                    className="w-full h-full rounded-xl shadow-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://youtube.com/@toddbrannonmusic?si=H3_Ao1IBbC_OuXO3"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-youtube-shorts-more"
                className="inline-block py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
              >
                View more on YouTube →
              </a>
            </div>
          </div>

        </div>
      </section>

      <section aria-labelledby="services-heading" className="pt-12 pb-24 px-6 md:px-24 bg-gray-900 text-gray-100">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-16">
            <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-3">What I Do</div>
            <h2 id="services-heading" className="text-4xl md:text-5xl font-light mb-4">Services</h2>
            <p className="text-base font-light text-gray-400">From the stage to the studio to your living room.</p>
          </div>

          {/* 2x2 card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Live Performance */}
            <div className="rounded-xl p-8 flex flex-col transition-colors" style={{ backgroundColor: '#1A2E42', border: '1px solid rgba(45, 125, 210, 0.6)' }}>
              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
                  <Mic aria-hidden="true" className="w-5 h-5" style={{ color: '#C9A84C' }} />
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
                  <Sliders aria-hidden="true" className="w-5 h-5" style={{ color: '#C9A84C' }} />
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
                  <Music aria-hidden="true" className="w-5 h-5" style={{ color: '#C9A84C' }} />
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
                  <Headphones aria-hidden="true" className="w-5 h-5" style={{ color: '#C9A84C' }} />
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

      <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 md:px-24 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-light mb-8">Get in Touch</h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <button
              data-testid="button-open-lesson-inquiry"
              onClick={() => {
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
            >
              Inquire About Lessons
            </button>
            <button
              data-testid="button-open-coaching-inquiry"
              onClick={() => {
                setShowCoachingForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
            >
              Coaching Inquiry
            </button>
            <button
              data-testid="button-open-general-contact"
              onClick={() => {
                setShowContactForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
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
              className="flex items-center space-x-2 text-[#FF3D7F] hover:text-[#FF69A0] transition-colors"
            >
              <Instagram aria-hidden="true" className="w-6 h-6" />
              <span>Instagram</span>
            </a>

            <a
              href="https://youtube.com/@toddbrannonmusic?si=H3_Ao1IBbC_OuXO3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#FF4040] hover:text-[#FF6666] transition-colors"
            >
              <SiYoutube aria-hidden="true" className="w-6 h-6" />
              <span>YouTube</span>
            </a>

            <a
              href="https://toddbrannon.bandcamp.com/track/deep-calls-to-deep-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#629AA9] hover:text-[#7EB5C3] transition-colors"
            >
              <SiBandcamp aria-hidden="true" className="w-6 h-6" />
              <span>Bandcamp</span>
            </a>

            <a
              href="https://soundcloud.com/todd-437268405"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#FF5500] hover:text-[#FF7733] transition-colors"
            >
              <SiSoundcloud aria-hidden="true" className="w-6 h-6" />
              <span>SoundCloud</span>
            </a>
            
            

            {/* <a
              href="https://www.instagram.com/the_shake_band"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#FF3D7F] hover:text-[#FF69A0] transition-colors"
            >
              <Instagram className="w-6 h-6 cursor-pointer" />
              <span>the_shake_band</span>
            </a> */}
          </div>
        </div>
      </section>

      </main>

      <footer className="py-6 px-6 md:px-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
          <nav aria-label="Footer navigation" className="flex items-center gap-2 text-xs">
            <button
              data-testid="button-footer-lesson-inquiry"
              onClick={() => {
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="min-h-[44px] px-3 flex items-center text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              Lesson Inquiry
            </button>
            <span className="text-white/50" aria-hidden="true">·</span>
            <button
              data-testid="button-footer-coaching-inquiry"
              onClick={() => {
                setShowCoachingForm(true);
                window.scrollTo(0, 0);
              }}
              className="min-h-[44px] px-3 flex items-center text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              Coaching Inquiry
            </button>
            <span className="text-white/50" aria-hidden="true">·</span>
            <button
              data-testid="button-footer-contact"
              onClick={() => {
                setShowContactForm(true);
                window.scrollTo(0, 0);
              }}
              className="min-h-[44px] px-3 flex items-center text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>© {new Date().getFullYear()} Todd Brannon. All rights reserved.</span>
            <button
              data-testid="link-privacy-policy"
              onClick={() => {
                setShowPrivacyPolicy(true);
                window.scrollTo(0, 0);
              }}
              className="min-h-[44px] px-3 flex items-center text-white/60 hover:text-white/90 transition-colors"
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
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            data-testid="modal-lessons"
            className="relative bg-gray-900 text-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
          >
            <button
              data-testid="button-close-modal"
              onClick={closeModal}
              aria-label="Close dialog"
              className="absolute top-3 right-3 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white text-xl leading-none"
            >
              ×
            </button>
            <div className="md:w-2/5 flex-shrink-0 flex items-center justify-center bg-gray-950 p-4 md:p-3 md:rounded-l-2xl">
              <img
                src={toddHeadshot}
                alt="Todd Brannon, guitarist and music instructor"
                className="max-h-[30vh] md:max-h-[80vh] w-auto h-auto object-contain rounded-xl"
              />
            </div>
            <div className="flex-1 p-5 md:p-8 flex flex-col justify-center space-y-3 md:space-y-4 overflow-y-auto">
              <h2 id="modal-title" className="text-xl md:text-2xl lg:text-3xl font-semibold">Ready to Play — Really Play?</h2>
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
                  closeModal();
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
