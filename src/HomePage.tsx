import React, { useEffect, useRef, useState } from 'react';
import heroBackground from './assets/RivoltaLive.jpg';
import toddStudioPortrait from './assets/live/ToddStudioInstructor.JPG';
import InquiryForm from './InquiryForm';
import CoachingInquiryForm from './CoachingInquiryForm';
import RecentWork from './RecentWork';
import { Link, useLocation } from 'react-router-dom';
import { useScrollToHash } from './hooks/useScrollToHash';
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
import toddWesternDays from './assets/live/ToddWesternDays.jpg';
import bandLife from './assets/live/BandLife.jpg';
import legacySOS from './assets/live/LegacySOS.jpg';

import { SiSpotify, SiApplemusic, SiYoutubemusic, SiSoundcloud, SiBandcamp } from 'react-icons/si';
import { Mic, Sliders, Music, Headphones } from 'lucide-react';

function HomePage() {
  const mainContentRef = useRef<HTMLElement>(null);
  useScrollToHash();
  const { key: locationKey } = useLocation();
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryPreset, setInquiryPreset] = useState<{ interests?: string[] } | null>(null);
  const [showCoachingForm, setShowCoachingForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // The forms replace the page body, so a nav link like /#featured-work would
  // otherwise change the hash with nothing to scroll to. Any navigation closes
  // whatever overlay is open and lets the sections render again.
  useEffect(() => {
    setShowInquiryForm(false);
    setShowCoachingForm(false);
    setShowContactForm(false);
    setShowPrivacyPolicy(false);
  }, [locationKey]);

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

  const liveShots = [
    toddLive2, toddLive3, toddLive5, toddLive10, toddLive14,
    toddWesternDays, bandLife, legacySOS,
  ];

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
    document.title = 'Todd Brannon Music';
  }, []);


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
        initialInterests={inquiryPreset?.interests}
        onBack={() => {
          setShowInquiryForm(false);
          setInquiryPreset(null);
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
      <header id="hero" className="relative min-h-screen flex items-center bg-[#0f172a] text-white overflow-hidden">
        {/* Live-performance photo behind the hero */}
        <img
          src={heroBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Base darkening */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0f172a]/75" />
        {/* Directional darkening: heaviest behind the copy (top on mobile, left on desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/40 lg:bg-gradient-to-r lg:from-[#0f172a] lg:via-[#0f172a]/70 lg:to-[#0f172a]/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.10),transparent_55%)]"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 lg:pt-32 w-full">
          {/* Row 1 — introduction and actions beside the portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.78fr] gap-12 lg:gap-14 items-center">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <p className="text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
                Guitar &amp; Piano Lessons &middot; Session Work &middot; Near Argyle, TX
              </p>
              <h1 className="text-5xl md:text-6xl font-light leading-[1.05] tracking-tight text-white mb-6">Made to create.</h1>
              <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 max-w-2xl">
                Private guitar and beginner piano lessons, session guitar and production, and new
                instrumental music &mdash; all from my studio near Argyle, Texas.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  data-testid="button-hero-lesson-inquiry"
                  onClick={() => {
                    setInquiryPreset(null);
                    setShowInquiryForm(true);
                    window.scrollTo(0, 0);
                  }}
                  className="py-3.5 px-7 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Inquire About Lessons
                </button>
                <button
                  data-testid="button-hero-coaching-inquiry"
                  onClick={() => {
                    setShowCoachingForm(true);
                    window.scrollTo(0, 0);
                  }}
                  className="py-3.5 px-7 rounded-lg text-sm font-light tracking-wide transition-colors border border-[#C9A84C]/70 text-[#C9A84C] hover:bg-[#C9A84C]/10"
                >
                  Inquire About Coaching
                </button>
              </div>

              <button
                data-testid="hero-link-collab"
                onClick={() => {
                  setShowContactForm(true);
                  window.scrollTo(0, 0);
                }}
                className="mt-6 text-balance text-sm font-light text-gray-400 underline underline-offset-4 decoration-gray-600 hover:text-white hover:decoration-[#C9A84C] transition-colors"
              >
                Need a session player, writer, or producer? Let&rsquo;s talk &rarr;
              </button>
            </div>

            {/* Portrait + latest music */}
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-sm lg:max-w-[370px]">
            {/* Photo card with a symmetric halo */}
            <div className="relative">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-[1.5rem] border border-[#C9A84C]/30" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#1A2E42]">
                <img
                  src={toddStudioPortrait}
                  alt="Todd Brannon seated in his home studio holding a guitar, with a recording session on the screen behind him"
                  className="w-full aspect-[4/5] object-cover object-[50%_35%] saturate-[.82] contrast-[1.06] brightness-100"
                  loading="eager"
                  decoding="async"
                />
                {/* Cool the warm wall toward the site navy */}
                <div aria-hidden="true" className="absolute inset-0 bg-[#1A2E42] mix-blend-multiply opacity-40 pointer-events-none" />
                {/* Warm light spilling in from the top right, echoing the lamp */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-45 bg-[radial-gradient(ellipse_at_85%_15%,rgba(201,168,76,0.55),rgba(201,168,76,0.12)_35%,transparent_60%)]"
                />
                {/* Fade the lower photo into the music strip */}
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0f172a]/85 via-[#0f172a]/30 to-transparent pointer-events-none" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 120px 40px rgba(15,23,42,0.55)' }}
                />
                {/* Film grain: inline SVG noise, so nothing extra loads */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[.18]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    backgroundSize: '160px 160px',
                  }}
                />
              </div>
            </div>
            {/* Latest-music strip overlapping the bottom of the photo card */}
            <div className="relative -mt-10 mx-4 rounded-xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-md shadow-xl px-4 py-3">
              <RecentWork variant="strip" />
            </div>
            </div>
          </div>

          {/* Row 2 — Guitar Together featured offer. The graphic carries all of its own copy
              and CTA. The file has a navy frame around the card (card spans x 179–1742,
              y 28–783 of 1920×819); the link box is sized to the card and clips that frame. */}
          <Link
            to="/guitar-together?source=todd-homepage"
            data-testid="hero-cta-guitar-together"
            className="relative mt-16 lg:mt-20 block w-full aspect-[1564/756] overflow-hidden rounded-[1.92%/3.97%] shadow-2xl transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0f172a]"
          >
            <img
              src="/images/guitar-together-homepage.jpg"
              alt="Guitar Together — 8-week beginner guitar classes for adults in Old Town Lewisville. Space limited."
              width={1920}
              height={819}
              className="absolute max-w-none w-[122.76%] h-auto left-[-11.45%] top-[-3.70%]"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>
      </header>


      {/* Private Lesson Availability (near Argyle, TX) Section */}
      <section id="lessons" aria-labelledby="lessons-heading" className="scroll-mt-20 px-6 py-24 bg-[#1A2E42] text-white overflow-x-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Guitar &amp; Beginner Piano &middot; Near Argyle, TX</span>
          <h2 id="lessons-heading" className="text-3xl md:text-4xl font-bold mb-8 text-white">Private Lesson Spots Are Currently Available</h2>

          <p className="text-lg leading-relaxed text-gray-200 max-w-2xl mx-auto mb-6">
            I believe we were all created to create. Learning guitar or piano is one of the most
            direct ways to express what&rsquo;s already in you &mdash; and to make something you can
            actually hear.
          </p>

          <p className="text-lg leading-relaxed text-gray-200 max-w-2xl mx-auto mb-8">
            Here&rsquo;s the honest part: my job is less about teaching you how to play and more about
            teaching you how to practice. Anyone can hand you a chord chart. What moves you forward is
            knowing what to work on, how to work on it, and why it matters this week.
          </p>

          <div className="bg-[#2A3E52] rounded-lg p-6 mb-8 text-left">
            <h3 className="text-xl font-semibold mb-4 text-[#C9A84C]">What every lesson looks like</h3>
            <ul className="text-gray-200 space-y-3">
              <li>&bull; We warm up with scales and exercises that build finger strength, coordination, and real technique.</li>
              <li>&bull; We look at last week&rsquo;s assignment, so you always know exactly where you stand.</li>
              <li>&bull; We open up something new and dig into it together.</li>
              <li>&bull; You leave with clear objectives for the week ahead &mdash; no guessing what to practice.</li>
              <li>&bull; We close by looking at what&rsquo;s next, so you&rsquo;re motivated to put the work in before we meet again.</li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              Parents: this means you&rsquo;ll always know what your student is working on and why.
            </p>
          </div>

          <div className="bg-[#2A3E52] rounded-lg p-6 text-left mt-8">
            <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-2">Coming October 2026</div>
            <h3 className="text-xl font-semibold text-[#C9A84C] mb-3">Not quite ready for private lessons?</h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              I&rsquo;m putting together small group guitar classes for anyone who wants to learn in a
              relaxed, no-pressure setting &mdash; no prior experience needed. Learn a few chords, play
              some songs, and enjoy making music with other people.
            </p>
            <ul className="text-gray-200 space-y-2">
              <li>&bull; Daytime classes for adults 55+ and homeschool students</li>
              <li>&bull; A weekend class for working adults who can&rsquo;t get away during the week</li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              Full schedule and pricing are coming soon. Let me know you&rsquo;re interested and
              you&rsquo;ll be the first to hear.
            </p>
          </div>

          <p className="text-gray-200 mb-8">
            Spots are limited and scheduling changes often, so the fastest way to find out what&rsquo;s
            open is to ask.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              data-testid="button-lessons-section-inquiry"
              onClick={() => {
                setInquiryPreset(null);
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
            >
              Inquire About Lessons
            </button>
            <Link
              data-testid="button-lessons-section-group"
              to="/guitar-together"
              className="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
            >
              Group Classes
            </Link>
          </div>
        </div>
      </section>

      <main id="main-content" ref={mainContentRef} tabIndex={-1} className="focus:outline-none">

      <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 pt-24 pb-8 bg-gray-900 text-gray-100 overflow-hidden">
        {/* Intro */}
        <div className="px-6 md:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 id="about-heading" className="text-4xl md:text-5xl font-light mb-16">About</h2>

            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white max-w-4xl">
              Decades of playing. Years of teaching. And I&rsquo;m still convinced we were all
              created to create.
            </p>

            <p className="text-base md:text-lg font-light leading-relaxed text-gray-400 max-w-3xl mt-6">
              Son of a gospel singer. Piano lessons as a kid, then a band &mdash; The Shake &mdash;
              with performances throughout Texas and surrounding states. Recording sessions in DFW
              and Nashville. Since 2013 I&rsquo;ve played guitar on the
              worship team at Valley Creek Church, with three live albums along the way. Today I
              release instrumental music as HIAUTMSKI, produce remixes and session work from my
              studio, and teach guitar and beginner piano across north DFW and Denton.
            </p>

            {/* Stat callouts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 mb-20">
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

            {/* Audience paths */}
            <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-8">Which one are you?</div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-white/10 bg-gray-800/40 p-8 flex flex-col">
                <h3 className="text-xl font-light text-white mb-3">Want to learn?</h3>
                <p className="text-base font-light leading-relaxed text-gray-400 mb-6 flex-grow">
                  Guitar or beginner piano, from your first chord to playing with confidence.
                  I&rsquo;ll teach you how to practice &mdash; not just how to play.
                </p>
                <button
                  data-testid="about-cta-lessons"
                  onClick={() => {
                    setInquiryPreset(null);
                    setShowInquiryForm(true);
                    window.scrollTo(0, 0);
                  }}
                  className="mt-auto w-full py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Inquire About Lessons
                </button>
              </div>

              <div className="rounded-xl border border-white/10 bg-gray-800/40 p-8 flex flex-col">
                <h3 className="text-xl font-light text-white mb-3">Need a player, writer, or producer?</h3>
                <p className="text-base font-light leading-relaxed text-gray-400 mb-6 flex-grow">
                  Session guitar, co-writing, remixes, and full production from my studio &mdash;
                  remote or in person. Bring the idea; I&rsquo;ll help you finish it.
                </p>
                <button
                  data-testid="about-cta-collab"
                  onClick={() => {
                    setShowContactForm(true);
                    window.scrollTo(0, 0);
                  }}
                  className="mt-auto w-full py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Start a Conversation
                </button>
              </div>

              <div className="rounded-xl border border-white/10 bg-gray-800/40 p-8 flex flex-col">
                <h3 className="text-xl font-light text-white mb-3">Here for the music?</h3>
                <p className="text-base font-light leading-relaxed text-gray-400 mb-6 flex-grow">
                  From The Shake&rsquo;s <em>In This Chaos</em> to new instrumental releases as
                  HIAUTMSKI &mdash; everything is streaming, and there&rsquo;s more on the way.
                </p>
                <button
                  data-testid="about-cta-listen"
                  onClick={() => document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-auto w-full py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
                >
                  Listen
                </button>
              </div>
            </div>

            {/* Full history, opt-in */}
            <details className="mt-16">
              <summary className="inline-block list-none [&::-webkit-details-marker]:hidden text-sm font-light tracking-wide text-[#C9A84C] hover:text-[#b8953d] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded">
                Read more...
              </summary>
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 mt-8">
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
                  <h3 className="text-xl font-light text-white mb-4">Worship &amp; Community</h3>
                  <p className="text-base font-light leading-relaxed text-gray-400">
                    Since 2013, I've served as a worship team guitarist at Valley Creek Church in Flower Mound — contributing to three live worship albums in 2015, 2023, and 2024.
                  </p>
                </div>
                <div>
                  <div className="text-xs font-light tracking-widest text-[#C9A84C] uppercase mb-3">Current Projects</div>
                  <h3 className="text-xl font-light text-white mb-4">Recording, Remixes &amp; Teaching</h3>
                  <p className="text-base font-light leading-relaxed text-gray-400">
                    Original instrumental releases live on Spotify, Apple Music, and YouTube under the moniker HIAUTMSKI. I've also produced remixes of classic Shake songs from <em>In This Chaos</em>. On the teaching side, I instruct at two local studios serving north Dallas-Fort Worth and Denton, focusing on rock, pop, and worship — beginner to intermediate.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Photo grid */}
        <div className="px-6 md:px-24 mt-12 mb-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            {liveShots.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-xl aspect-[3/4]">
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

      <section id="featured-work" aria-labelledby="featured-work-heading" className="scroll-mt-20 pt-12 pb-12 px-6 md:px-24 bg-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-12">
            <h2 id="featured-work-heading" className="text-4xl md:text-5xl font-light text-white">Featured Work</h2>
          </div>

          {/* Studio Productions */}
          <div>
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

          {/* Performance Shorts
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
          </div> */}

        </div>
      </section>

      <section aria-labelledby="services-heading" className="pt-12 pb-12 px-6 md:px-24 bg-gray-900 text-gray-100">
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
                  onClick={() => { setInquiryPreset(null); setShowInquiryForm(true); window.scrollTo(0, 0); }}
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

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 pt-12 pb-24 px-6 md:px-24 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-light mb-8">Get in Touch</h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <button
              data-testid="button-open-lesson-inquiry"
              onClick={() => {
                setInquiryPreset(null);
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white/10 px-6 py-10 text-center text-sm text-gray-400">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <span>&copy; 2026 Todd Brannon Music. All rights reserved.</span>
          <span className="hidden sm:inline text-gray-600">·</span>
          <button
            onClick={() => { setShowPrivacyPolicy(true); window.scrollTo(0, 0); }}
            className="hover:text-[#C9A84C] transition-colors"
          >
            Privacy Policy
          </button>
          <span className="hidden sm:inline text-gray-600">·</span>
          <a href="/free-resources" className="hover:text-[#C9A84C] transition-colors">
            Free Resources
          </a>
          <span className="hidden sm:inline text-gray-600">·</span>
          <a href="/licensing" className="hover:text-[#C9A84C] transition-colors">
            Licensing + Production
          </a>
        </div>
      </footer>
    </main>
    </div>
  );
}

export default HomePage;