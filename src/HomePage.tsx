import React, { useEffect, useRef, useState } from 'react';
import heroImage from './assets/RivoltaLive.jpg';
import logo from './assets/tb_music_logo_1400.png';
import brandLogo from './assets/tbm_brand.png';
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
import enjoyTheRideImg from './assets/albums/EnjoyTheRide.jpg';
import withoutYouImg from './assets/albums/WithoutYou.jpg';
import toddLive2 from './assets/live/ToddLive2.jpeg';
import toddLive3 from './assets/live/ToddLive10.png';
import toddLive5 from './assets/live/ToddLive30.png';
import toddLive10 from './assets/live/ToddLive22.png';
import toddLive14 from './assets/live/ToddLive24.png';
import toddWesternDays from './assets/live/ToddWesternDays.jpg';
import bandLife from './assets/live/BandLife.jpg';
import legacySOS from './assets/live/LegacySOS.jpg';

import { SiSpotify, SiApplemusic, SiYoutubemusic, SiSoundcloud, SiBandcamp } from 'react-icons/si';
import { Mic, Sliders, Music, Headphones, Play, Pause, ArrowDown } from 'lucide-react';

function HomePage() {
  const mainContentRef = useRef<HTMLElement>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryPreset, setInquiryPreset] = useState<{ interests?: string[] } | null>(null);
  const [showCoachingForm, setShowCoachingForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // Newest tracks, linked out to [untitled]. Drop an mp3 in public/audio/ and add a
  // `preview` path here to light up the inline snippet player below.
  const recentWork: {
    title: string;
    artist: string;
    year: string;
    image: string;
    url: string;
    preview?: string;
  }[] = [
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
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  // Only one preview plays at a time; starting one resets the other.
  const togglePreview = (e: React.MouseEvent, index: number) => {
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

  // Stop any preview still playing when this page unmounts (e.g. a form opens).
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
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <nav aria-label="Main navigation" className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <img src={brandLogo} alt="Todd Brannon Music" className="h-8 md:h-10 object-contain" />
        </nav>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 px-6">
          <h1 className="sr-only">Todd Brannon Music</h1>
          <button
            data-testid="button-hero-new-music"
            onClick={() =>
              document.getElementById('recent-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            aria-label="New music: Enjoy the Ride and Without You. Scroll to listen."
            className="mb-8 inline-flex max-w-full items-center gap-2 sm:gap-3 rounded-full border border-[#C9A84C]/60 bg-black/30 backdrop-blur-sm pl-1.5 pr-3 sm:pr-4 py-1.5 text-xs sm:text-sm font-light tracking-wide text-white transition-colors hover:border-[#C9A84C] hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
          >
            <span className="shrink-0 rounded-full bg-[#C9A84C] px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#1A2E42]">New</span>
            <span className="whitespace-nowrap">
              Enjoy the Ride &amp; Without You<span className="hidden sm:inline"> &mdash; listen</span>
            </span>
            <ArrowDown className="w-4 h-4 shrink-0 text-[#C9A84C]" aria-hidden="true" />
          </button>
          <img src={logo} alt="" aria-hidden="true" className="h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] mb-6 object-contain opacity-70" />
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              data-testid="button-hero-lesson-inquiry"
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


      {/* Private Lesson Availability (Argyle, TX) Section */}
      <section aria-labelledby="lessons-heading" className="px-6 py-24 bg-[#1A2E42] text-white overflow-x-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Guitar &amp; Beginner Piano &middot; Argyle, TX</span>
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
            <button
              data-testid="button-lessons-section-group"
              onClick={() => {
                setInquiryPreset({ interests: ['group-classes'] });
                setShowInquiryForm(true);
                window.scrollTo(0, 0);
              }}
              className="py-3 px-6 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]"
            >
              Ask About Group Classes
            </button>
          </div>
        </div>
      </section>

      <main id="main-content" ref={mainContentRef} tabIndex={-1} className="focus:outline-none">

      <section aria-labelledby="about-heading" className="pt-24 pb-8 bg-gray-900 text-gray-100 overflow-hidden">
        {/* Intro */}
        <div className="px-6 md:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 id="about-heading" className="text-4xl md:text-5xl font-light mb-16">About</h2>

            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white max-w-4xl">
              Twenty-plus years of playing, recording, and teaching in North Texas &mdash; and
              I&rsquo;m still convinced we were all created to create.
            </p>

            <p className="text-base md:text-lg font-light leading-relaxed text-gray-400 max-w-3xl mt-6">
              Son of a gospel singer. Piano lessons as a kid, then a band &mdash; The Shake &mdash;
              with records made in Dallas and Nashville. Since 2013 I&rsquo;ve played guitar on the
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

      <section id="featured-work" aria-labelledby="featured-work-heading" className="pt-12 pb-24 px-6 md:px-24 bg-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-12">
            <h2 id="featured-work-heading" className="text-4xl md:text-5xl font-light text-white">Featured Work</h2>
          </div>

          {/* Recent work */}
          <div id="recent-work" className="mb-24 scroll-mt-8">
            <h3 className="text-2xl font-light text-white mb-2">What I&rsquo;ve been working on lately</h3>
            <p className="text-sm font-light text-gray-400 mb-8">
              {hasPreviews
                ? 'New tracks in progress — press play for a preview, or tap the cover to hear the full track on [untitled].'
                : 'New tracks in progress — tap a cover to listen on [untitled].'}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-xl">
              {recentWork.map((track, index) => (
                <div key={track.title}>
                  <div className="group relative aspect-square overflow-hidden rounded-xl shadow-lg border border-white/10">
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Listen to ${track.title} on untitled`}
                      className="block w-full h-full"
                    >
                      <img
                        src={track.image}
                        alt={`${track.title} by ${track.artist}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </a>
                    {track.preview && (
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
                          className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-[#C9A84C] text-[#1A2E42] flex items-center justify-center shadow-lg hover:bg-[#b8953d] transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
                        >
                          {playingIndex === index ? (
                            <Pause className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Play className="w-5 h-5" aria-hidden="true" />
                          )}
                        </button>
                        <audio
                          ref={(el) => {
                            audioRefs.current[index] = el;
                          }}
                          src={track.preview}
                          preload="none"
                          onEnded={() => setPlayingIndex(null)}
                        />
                      </>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="text-base font-light text-white">{track.title}</div>
                    <div className="text-xs font-light text-gray-400">{track.artist} &middot; {track.year}</div>
                  </div>
                </div>
              ))}
            </div>
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

      <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 md:px-24 bg-gray-900 text-gray-100">
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
        </div>
      </footer>
    </main>
    </div>
  );
}

export default HomePage;