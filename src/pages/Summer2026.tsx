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

          {/* CHANGED: two separate CTAs, one per offer — no contradiction */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <button
              onClick={() => setShowInquiryForm(true)}
              className="px-8 py-4 bg-[#1A2E42] hover:bg-[#142536] text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Book a Free Intro Call →
            </button>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors text-lg"
            >
              👉 Save My Spot in the Community
            </button>
          </div>

          {/* CHANGED: context under CTAs explains what each is, clearly */}
          <p className="text-sm text-gray-500 mt-2">
            <strong>1-on-1 lessons</strong> are open now · <strong>The Confident Guitarist Community</strong> launches Summer 2026
          </p>
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

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#FFF8F0] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-600">🤝 This is for you if:</h3>
              <ul className="text-gray-800 space-y-2">
                {/* CHANGED: more specific and honest */}
                <li>• You've been playing on and off for years but haven't broken through</li>
                <li>• You can learn a riff but can't hold a whole song together</li>
                <li>• You want structure without being told what to feel about music</li>
                <li>• You're ready to commit to showing up once a week</li>
              </ul>
            </div>

            <div className="bg-[#F0F8FF] rounded-lg p-8">
              {/* CHANGED: "not for" list is sharper and more honest — builds trust */}
              <h3 className="text-2xl font-bold mb-6 text-red-600">This is not for you if:</h3>
              <ul className="text-gray-800 space-y-2">
                <li>• You just want someone to walk you through tabs for your favorite songs</li>
                <li>• You're not willing to show up consistently</li>
                <li>• You want shred technique, sweep picking, or scale theory deep-dives</li>
                <li>• You're hoping results come without putting in the reps</li>
              </ul>
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
