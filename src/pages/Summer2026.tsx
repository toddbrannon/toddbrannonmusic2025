import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import brandLogo from '../assets/tbm_brand.png';
import InquiryForm from '../InquiryForm';

function Summer2026() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setSubmitError('Please enter your email address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Unable to submit. Please try again.');
        return;
      }

      setSubmitSuccess(true);
      setEmail('');
    } catch (error) {
      setSubmitError('Unable to submit. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <img src={brandLogo} alt="Todd Brannon Music" className="h-8" />
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-900 hover:text-[#1A2E42] transition-colors"
          >
            Back to Home →
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          {/* CHANGED: eyebrow speaks to the specific person, not an aspiration */}
          <span className="inline-block mb-6 text-sm uppercase tracking-[0.3em] text-[#C9A84C]">🎸 For adults who've been "learning guitar" for years and still don't feel like players</span>

          {/* CHANGED: headline names the real feeling instead of a vague "not just" construction */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            You know more than you think. You just don't know what to do next.
          </h1>

          {/* CHANGED: subhead is specific and names Todd — makes it personal, not generic */}
          <p className="text-xl md:text-2xl leading-relaxed text-gray-800 max-w-3xl mx-auto mb-12">
            Most guitar students aren't missing talent — they're missing a clear path.
            Todd's lessons cut through the noise so you're actually playing music,
            not grinding through exercises nobody enjoys.
          </p>

          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors text-lg"
          >
            👉 Save My Spot in the Community
          </button>


        </div>
      </section>

      {/* Todd's Story Section */}
      <section className="px-6 py-24 bg-[#FEF7E0]">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-[#C9A84C] mb-6">From Todd</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A2E42]">I let my ego cost me seven years. Here's what finally changed.</h2>
          <div className="space-y-5 text-lg text-gray-800 leading-relaxed">
            <p>
              In 1988, I walked into a jazz improv class at my community college. The room was full of electric guitarists with practice amps, a piano player, a bassist, a drummer — and they just started playing. Going around the room. Each guitarist taking a turn.
            </p>
            <p>
              When it got to me, I noodled around in a major scale because that's all I had. No phrasing. No creativity. I felt completely exposed and way out of my league.
            </p>
            <p>
              So I walked out of class and went straight to the registrar's office and withdrew. And because I was too embarrassed to face my instructor, I didn't just quit the class — I called to cancel my lessons and never went back.
            </p>
            <p className="text-xl font-semibold text-[#1A2E42] border-l-4 border-[#C9A84C] pl-4">
              That was 1988. I didn't put myself in a room with other musicians again until 1995. Seven years.
            </p>
            <p>
              For most of that time, I could barely believe I could be a confident guitarist — let alone be part of something I was proud of.
            </p>
            <p>
              Then in 1995, I took what felt like a terrifying next step: I started playing at church. Through that, I met a drummer. That drummer became the drummer of the band my cousin and I put together in 1996. And for the next five-plus years, we drove across DFW every single week — no matter what — to rehearse, write, record, and play. Oklahoma, Louisiana, San Antonio, Houston. We did the thing I always dreamed of doing.
            </p>
            <p className="text-xl font-semibold text-[#1A2E42] border-l-4 border-[#C9A84C] pl-4 italic">
              That was a community. Before I ever had that word for it.
            </p>
            <p>
              I wasn't doing it alone. And that made all the difference.
            </p>
            <p>
              Since then: 13 years on the worship team here in the Flower Mound area. Three live recordings. Students from age seven to retired adults — at New Song School of the Arts in Argyle and Legacy Music Studio in Lewisville.
            </p>
            <p className="font-semibold text-[#1A2E42]">
              I know what it costs to stay in hiding. And I know what opens up when you finally stop. That's what this community is built around.
            </p>
          </div>
        </div>
      </section>

      {/* Community Launch Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">

          {/* CHANGED: lead with the buyer's problem, not a hype tease */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">You've been practicing. So why doesn't it feel like progress?</h2>
            <p className="text-xl text-gray-800 mb-8">If this sounds familiar:</p>
            <ul className="text-lg text-gray-800 space-y-3 mb-12">
              {/* CHANGED: pain points rewritten as specific, recognizable moments — not vague feelings */}
              <li>• You sit down to play and spend 10 minutes deciding what to work on</li>
              <li>• You can play parts of songs but can't get through a full one cleanly</li>
              <li>• You'd be embarrassed to play in front of anyone right now</li>
            </ul>
            {/* CHANGED: direct statement replaces vague "This is for you" */}
            <p className="text-2xl text-[#1A2E42] font-semibold">That's not a talent problem. That's a structure problem. And it's fixable.</p>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#1A2E42]">🎸 The Confident Guitarist Community</h2>
            {/* CHANGED: rewritten to be outcome-first */}
            <p className="text-xl text-gray-800 mb-8">
              A live, structured program that moves you forward every week<br />
              <span className="text-[#1A2E42] font-semibold">— with other players doing the same work, at the same time</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#FEF7E0] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-[#1A2E42]">🎯 How It Works</h3>
              <div className="space-y-6">
                <div>
                  {/* CHANGED: specificity retained, framing sharpened */}
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">🎥 Weekly Live Lesson — Sundays, 7 PM Central</h4>
                  <p className="text-gray-800">Step-by-step instruction built around real musical progress, not isolated drills</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">🎤 Live Q&A + Hang Sessions</h4>
                  {/* CHANGED: more specific benefit */}
                  <p className="text-gray-800">Get unstuck fast. Ask the question you've been Googling for a week and get a real answer in real time</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">🎶 Play Real Music from Day One</h4>
                  {/* CHANGED: benefit-forward instead of negation-forward */}
                  <p className="text-gray-800">Original songs, custom backing tracks, and parts designed for your exact level — so you're always playing something that sounds like music, not an exercise</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F0F8FF] rounded-lg p-8">
              {/* CHANGED: headline clarifies the multi-level approach is a feature, not a workaround */}
              <h3 className="text-2xl font-bold mb-6 text-[#1A2E42]">🎸 One Song. Every Level Plays Together.</h3>
              <p className="text-gray-800 mb-4">Everyone works on the same music — at the part that fits where they are:</p>
              <ul className="text-gray-800 space-y-2">
                <li>• <strong>Beginners</strong> → strum the chords, stay in the groove</li>
                <li>• <strong>Intermediate players</strong> → build rhythm, timing, and control</li>
                <li>• <strong>Electric players</strong> → dig into tone, effects, and lead parts</li>
              </ul>
              {/* CHANGED: payoff reframed as community benefit */}
              <p className="text-gray-800 mt-4">
                <em>You're never the only one who doesn't have it figured out yet — because everyone's learning the same song</em>
              </p>
            </div>
          </div>

          <div className="bg-[#FEF7E0] rounded-lg p-8 mb-16">
            {/* CHANGED: section title is more specific */}
            <h3 className="text-2xl font-bold mb-6 text-center text-[#1A2E42]">⚡ Why YouTube Hasn't Fixed This (And What Does)</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {/* CHANGED: left column is more damning and specific */}
                <h4 className="text-lg font-semibold mb-3 text-red-600">How most people try to improve:</h4>
                <ul className="text-gray-800 space-y-1">
                  <li>• Search YouTube until something looks good</li>
                  <li>• Follow it for a week, then get distracted</li>
                  <li>• Repeat with a different video</li>
                  <li>• Wonder why nothing is sticking</li>
                </ul>
              </div>
              <div>
                {/* CHANGED: right column kept but each point is cleaner */}
                <h4 className="text-lg font-semibold mb-3 text-green-600">How this works instead:</h4>
                <ul className="text-gray-800 space-y-1">
                  <li>• A clear weekly path — you always know what's next</li>
                  <li>• Live interaction so bad habits get caught early</li>
                  <li>• Music-first so practice actually sounds like something</li>
                  <li>• A group so you show up even when motivation drops</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              {/* CHANGED: "The Real Goal" rewritten as a concrete image, not a vague feeling */}
              <p className="text-xl font-semibold text-[#1A2E42]">What this actually looks like</p>
              <p className="text-lg text-gray-800 mt-2">
                You pick up your guitar on a Tuesday night.<br />
                You play through a full song — cleanly, confidently.<br />
                And you think: <em>yeah, I'm actually getting better.</em>
              </p>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-[#FFF8F0] rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#1A2E42]">🤝 Where do you want this to take you?</h3>
              <p className="text-gray-800 mb-6">It doesn't matter where you're starting. What matters is that you have a next step — and people around you while you take it.</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-[#1A2E42] mb-1">🏠 Play better at home</p>
                  <p className="text-sm text-gray-700">Pick up your guitar and actually enjoy it instead of feeling stuck</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-[#1A2E42] mb-1">👥 Play with friends</p>
                  <p className="text-sm text-gray-700">Stop sitting out and start contributing when there are guitars in the room</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-[#1A2E42] mb-1">🎸 Start a band</p>
                  <p className="text-sm text-gray-700">Build the confidence and the skills to step into a real playing situation</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-[#1A2E42] mb-1">✝️ Join a worship team</p>
                  <p className="text-sm text-gray-700">Get ready to play in a church setting — the same path that changed everything for Todd</p>
                </div>
              </div>
            </div>
          </div>

          {/* CHANGED: launch section rewritten — no hype, just clear offer and specific incentive */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A2E42]">🚀 Opening Summer 2026 — Spots Are Limited</h2>
            <p className="text-xl text-gray-800 mb-8">
              The community launches in the next few weeks. Waitlist members get first access and launch pricing.
            </p>
            <p className="text-lg text-gray-800 mb-4">When you join the waitlist, you'll get:</p>
            <ul className="text-gray-800 space-y-2 mb-8">
              <li>• First access when doors open</li>
              <li>• Launch pricing (lower than public rate)</li>
              <li>• A preview lesson and backing track before launch</li>
            </ul>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors text-lg"
            >
              👉 Save My Spot
            </button>
          </div>

          {/* CHANGED: "Two paths" section rewritten — Option 2 is specific and action-oriented */}
          <div className="bg-[#FEF7E0] rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center text-[#1A2E42]">⚡ Two ways this goes from here</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">You don't sign up</h4>
                <p className="text-gray-800">Same YouTube rabbit holes. Same plateau. Same guitar sitting in the corner more than it should.</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-3 text-[#1A2E42]">You get on the list</h4>
                <p className="text-gray-800 mb-4">First access to a structured program built for exactly where you are — with a teacher and a group holding you to it.</p>
                <div className="flex flex-col gap-4 mt-4">
                  <button
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors"
                  >
                    👉 Save My Spot
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-700">
            <p>No spam. Just early access, a preview lesson, and the launch date when it's set.</p>
          </div>
        </div>
      </section>

      {/* Waitlist Signup Section */}
      <section id="waitlist" className="px-6 py-24 bg-[#F0F8FF]">
        <div className="max-w-md mx-auto text-center">
          {/* CHANGED: waitlist header is specific about what happens next */}
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Get Early Access + Launch Pricing</h2>
          <p className="text-gray-600 mb-6">Drop your email and you'll hear from Todd directly when spots open.</p>
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            />
            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-sm text-[#1A2E42] font-semibold">You're in. Todd will reach out personally before launch.</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving your spot...' : 'Save My Spot'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-gray-700">
        <p>&copy; 2026 Todd Brannon Music. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Summer2026;
