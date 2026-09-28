import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import heroBackground from '../assets/RivoltaLive.jpg';
import toddStudioPortrait from '../assets/live/ToddStudioInstructor.JPG';
import guitarTogetherLogo from '../assets/guitar-together-logo.png';

// ─────────────────────────────────────────────────────────────────────────────
// STRIPE PAYMENT LINKS — paste the two Payment Link URLs here.
// Leave a value empty ('') and that cohort's button renders disabled, so the
// page can ship before the links exist. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────────
const TUESDAY_STRIPE_URL = 'https://buy.stripe.com/6oU9AU8BQ5dF9Qy3TR6kg01';
const SATURDAY_STRIPE_URL = 'https://buy.stripe.com/14AfZi8BQ49B7Iq1LJ6kg02';

const PAGE_TITLE = 'Beginner Adult Guitar Class in Lewisville, TX | Guitar Together';
const PAGE_DESCRIPTION =
  'Join Guitar Together, an 8-week small-group beginner guitar experience for adults at Legacy Music Studio in Old Town Lewisville. No experience necessary.';

const GOLD = '#C9A84C';

const highlights = ['No experience necessary', 'Small group — maximum 10', 'Play real songs'];

const stages = [
  {
    weeks: 'Weeks 1–2',
    title: 'Start playing',
    copy: 'Get comfortable with the guitar, learn your first chords, and begin making music.',
  },
  {
    weeks: 'Weeks 3–4',
    title: 'Turn chords into songs',
    copy: 'Work on chord changes, strumming patterns, rhythm, and start playing complete songs.',
  },
  {
    weeks: 'Weeks 5–6',
    title: 'Play together',
    copy: 'Expand your chord vocabulary, strengthen your rhythm, and experience playing music with other people.',
  },
  {
    weeks: 'Weeks 7–8',
    title: 'Christmas & celebration',
    copy: 'Learn approachable Christmas songs and finish the program playing music together.',
  },
];

const cohorts = [
  {
    id: 'tuesday',
    day: 'Tuesday morning',
    audience: 'Especially welcoming to adults 55+ and adults with flexible weekday schedules.',
    time: 'Tuesdays · 11:30 AM–12:20 PM',
    dates: 'October 6 – December 1, 2026',
    skipped: 'No class November 24',
    stripeUrl: TUESDAY_STRIPE_URL,
    cta: 'Register for Tuesday',
    testId: 'button-register-tuesday',
  },
  {
    id: 'saturday',
    day: 'Saturday morning',
    audience: 'Designed especially for working adults and anyone whose schedule has kept them from learning guitar.',
    time: 'Saturdays · 10:30–11:20 AM',
    dates: 'October 10 – December 5, 2026',
    skipped: 'No class November 28',
    stripeUrl: SATURDAY_STRIPE_URL,
    cta: 'Register for Saturday',
    testId: 'button-register-saturday',
  },
];

const faqs = [
  {
    q: 'Do I need any guitar experience?',
    a: 'No. This program is designed to be accessible to complete beginners. People who have played a little previously are welcome too.',
  },
  { q: 'What kind of guitar do I need?', a: 'A playable acoustic or electric guitar is fine.' },
  {
    q: 'Is this only for people 55+?',
    a: 'No. The Tuesday morning class is especially suited to adults 55+ and people with flexible weekday schedules, but Guitar Together is open to adults generally.',
  },
  {
    q: 'What if I miss a class?',
    a: 'Tuition reserves your place for the complete eight-week program. Individual missed sessions are not refundable or transferable to private lessons.',
  },
  {
    q: "What if the class doesn't have enough people?",
    a: 'A minimum of five participants is required. If a cohort does not run, participants may receive a full refund or transfer to another available cohort.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Full refunds are available through seven days before the first class. After that point, tuition is non-refundable.',
  },
];

const SOURCE_KEY = 'tbm:guitar-together-source';

/**
 * Reads ?source=… (e.g. /guitar-together?source=todd-facebook) and remembers it
 * for the rest of the visit, so a later read — analytics, a form field, or the
 * Stripe hand-off below — can use it without touching the page structure.
 */
function useSourceParam(): string | null {
  const [params] = useSearchParams();
  const fromUrl = params.get('source');

  useEffect(() => {
    if (!fromUrl) return;
    try {
      sessionStorage.setItem(SOURCE_KEY, fromUrl);
    } catch {
      /* private mode — the in-memory value below still works for this render */
    }
  }, [fromUrl]);

  if (fromUrl) return fromUrl;
  try {
    return sessionStorage.getItem(SOURCE_KEY);
  } catch {
    return null;
  }
}

// Stripe only accepts [A-Za-z0-9_-] in client_reference_id.
const cleanSource = (source: string) => source.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 50);

/** Passes the campaign source through to Stripe so paid registrations can be attributed. */
function registrationUrl(stripeUrl: string, source: string | null): string {
  if (!source) return stripeUrl;
  const ref = cleanSource(source);
  if (!ref) return stripeUrl;
  return `${stripeUrl}${stripeUrl.includes('?') ? '&' : '?'}client_reference_id=${ref}`;
}

export default function GuitarTogether() {
  const source = useSourceParam();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    const tag = meta ?? document.createElement('meta');
    tag.setAttribute('name', 'description');
    const previousDescription = tag.getAttribute('content');
    tag.setAttribute('content', PAGE_DESCRIPTION);
    if (created) document.head.appendChild(tag);

    return () => {
      document.title = previousTitle;
      if (created) tag.remove();
      else if (previousDescription !== null) tag.setAttribute('content', previousDescription);
    };
  }, []);

  const goToClasses = () =>
    document.getElementById('choose-your-class')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const goldButton =
    'inline-flex items-center justify-center py-3.5 px-7 rounded-lg text-sm font-light tracking-wide transition-colors bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42]';

  return (
    <main className="bg-[#0f172a] text-gray-100">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-28 pb-20 px-6">
        <img
          src={heroBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0f172a]/80" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/75 to-[#0f172a]/55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.10),transparent_55%)]"
        />

        <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight text-white">
            You&rsquo;ve always wanted to play.
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-light text-gray-300">Maybe now&rsquo;s the time.</p>

          <div className="mt-10 mb-2">
            <img
              src={guitarTogetherLogo}
              alt="Guitar Together"
              className="mx-auto w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px]"
              loading="eager"
              decoding="async"
            />
            <p className="mt-3 text-base sm:text-lg font-light text-gray-200">
              An 8-Week Beginner Guitar Experience for Adults
            </p>
          </div>

          <p className="mt-6 text-base sm:text-lg font-light text-gray-400 text-balance">
            No experience. No pressure. No long-term commitment.
          </p>

          <button data-testid="button-hero-choose-class" onClick={goToClasses} className={`${goldButton} mt-10 w-full sm:w-auto`}>
            Choose your class
          </button>
        </div>
      </section>

      {/* ── Intro / value ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-white mb-8">
            You&rsquo;ve thought about learning guitar long enough.
          </h2>
          <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-gray-400">
            <p>
              Guitar Together is an eight-week beginner guitar experience for adults who have always
              wanted to play &mdash; or who played years ago and want to pick it back up.
            </p>
            <p>
              No previous experience is necessary. We&rsquo;ll learn in a relaxed small-group environment,
              starting with basic chords and rhythm and quickly putting them together to play real songs.
            </p>
            <p>
              And because we&rsquo;re heading into the holidays, we&rsquo;ll finish by learning a few
              Christmas favorites together.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center justify-center rounded-xl border border-white/10 bg-[#1A2E42]/50 px-5 py-6 text-center text-sm font-light tracking-[0.15em] uppercase text-[#C9A84C]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── What we'll do ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24 bg-[#0b1220]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-10">What we&rsquo;ll do</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stages.map((stage) => (
              <li key={stage.weeks} className="rounded-xl border border-white/10 bg-[#0f172a] p-6">
                <div className="text-xs font-light tracking-[0.25em] uppercase text-[#C9A84C] mb-2">{stage.weeks}</div>
                <h3 className="text-xl font-light text-white mb-3">{stage.title}</h3>
                <p className="text-sm md:text-base font-light leading-relaxed text-gray-400">{stage.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Choose your class (primary conversion) ───────────────────────── */}
      <section id="choose-your-class" className="scroll-mt-20 px-6 py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-3">Choose your class</h2>
          <p className="text-base font-light text-gray-400 mb-10">
            Two cohorts, same program. Pick the morning that fits your week.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cohorts.map((cohort) => (
              <div
                key={cohort.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#1A2E42]/40 p-6 sm:p-8"
              >
                <h3 className="text-2xl font-light text-white">{cohort.day}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-gray-400">{cohort.audience}</p>

                <dl className="mt-6 space-y-3 text-sm font-light text-gray-200">
                  <div>
                    <dt className="sr-only">Meets</dt>
                    <dd className="text-base text-white">{cohort.time}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Dates</dt>
                    <dd>
                      {cohort.dates}
                      <span className="block text-gray-500">{cohort.skipped}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Location</dt>
                    <dd>
                      Legacy Music Studio
                      <span className="block text-gray-500">Old Town Lewisville, Texas</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Format</dt>
                    <dd className="text-gray-500">8 sessions · Maximum 10 participants</dd>
                  </div>
                </dl>

                <div className="mt-8 flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-light text-[#C9A84C]">$279</span>
                  <span className="text-sm font-light text-gray-400">for the complete 8-week program</span>
                </div>

                <a
                  href={registrationUrl(cohort.stripeUrl, source)}
                  data-testid={cohort.testId}
                  className={`${goldButton} mt-8 w-full text-base py-4`}
                >
                  {cohort.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you need ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24 bg-[#0b1220]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">What do I need?</h2>
          <p className="text-xl md:text-2xl font-light text-white">A playable acoustic or electric guitar.</p>
          <p className="mt-2 text-xl md:text-2xl font-light text-[#C9A84C]">That&rsquo;s it.</p>
          <div className="mt-6 space-y-4 text-base font-light leading-relaxed text-gray-400">
            <p>No previous guitar experience is required.</p>
            <p>
              If you&rsquo;re not sure whether your current guitar is appropriate for the class, contact
              Todd before purchasing another instrument.
            </p>
          </div>
        </div>
      </section>

      {/* ── About Todd ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-center">
          <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#1A2E42]">
            <img
              src={toddStudioPortrait}
              alt="Todd Brannon seated in his home studio holding a guitar"
              className="w-full aspect-[4/5] object-cover object-[50%_35%]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <h2 className="text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-5">Your instructor</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white mb-6">
              Decades of playing. Years of teaching. A practical way to finally learn.
            </p>
            <div className="space-y-4 text-base font-light leading-relaxed text-gray-400">
              <p>
                Todd Brannon has played on stage with his band The Shake, on the worship team at
                Valley Creek Church since 2013, and on three live albums along the way.
              </p>
              <p>
                Today he teaches guitar and beginner piano across north DFW and Denton, and produces
                session work and instrumental releases from his studio.
              </p>
              <p>
                His approach with adult students is practical: less about teaching you how to play, and
                more about teaching you how to practice &mdash; so you always know what to work on and why
                it matters this week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24 bg-[#0b1220]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-light tracking-[0.3em] uppercase text-[#C9A84C] mb-8">Questions</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-base md:text-lg font-light text-white hover:text-[#C9A84C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 rounded">
                  {faq.q}
                  <span aria-hidden="true" className="shrink-0 text-[#C9A84C] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base font-light leading-relaxed text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-white mb-5">Stop waiting for someday.</h2>
          <p className="text-base md:text-lg font-light text-gray-400 text-balance mb-10">
            Eight weeks. Ten people. One guitar you&rsquo;ve been meaning to learn.
          </p>
          <button
            data-testid="button-final-choose-class"
            onClick={goToClasses}
            className={`${goldButton} w-full sm:w-auto text-base py-4`}
            style={{ borderColor: GOLD }}
          >
            Choose your class
          </button>
        </div>
      </section>
    </main>
  );
}
