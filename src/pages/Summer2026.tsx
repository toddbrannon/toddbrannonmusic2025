import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import brandLogo from '../assets/tbm_brand.png';

function Summer2026() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
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
        setSubmitError(data.error || 'Unable to submit waitlist. Please try again.');
        return;
      }

      setSubmitSuccess(true);
      setEmail('');
    } catch (error) {
      setSubmitError('Unable to submit waitlist. Please check your connection and try again.');
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
          <span className="inline-block mb-6 text-sm uppercase tracking-[0.3em] text-[#C9A84C]">🎸 Become a Confident Guitarist</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Not just someone who knows a few chords
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-800 max-w-3xl mx-auto mb-8">
            Stop guessing what to practice.<br />
            Start playing music that actually feels good.
          </p>
          <div className="text-lg text-gray-800 mb-12">
            <p className="mb-4">New lesson openings available now</p>
            <p className="text-[#1A2E42] font-semibold">🚨 The Confident Guitarist Community is launching soon</p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors"
              >
                👉 Join the Waitlist
              </button>
              <button
                onClick={() => navigate('/inquire')}
                className="px-8 py-4 bg-[#1A2E42] hover:bg-[#2a3e52] text-white font-semibold rounded-lg transition-colors"
              >
                👉 Book a Local Lesson
              </button>
          </div>
        </div>
      </section>

      {/* Local Lessons Section */}
      <section className="px-6 py-24 bg-[#1A2E42] text-white overflow-x-hidden">
        <div
          ref={sectionRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
              : 'opacity-0 -translate-x-full translate-y-16 scale-75'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">🎯 New Daytime Lesson Openings (Argyle, TX)</h2>
          <p className="text-lg leading-relaxed text-gray-200 mb-6">
            I've opened up limited daytime spots at<br />
            <span className="text-[#C9A84C] font-semibold">New Song School of the Arts</span>
          </p>

          <div className="bg-[#2A3E52] rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-[#C9A84C]">Available Times:</h3>
            <ul className="text-left text-gray-200 space-y-2">
              <li>• Wednesdays (before 4 PM)</li>
              <li>• Fridays (11 AM – 4:30 PM)</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-[#C9A84C]">Best Fit For:</h3>
            <ul className="text-gray-200 space-y-2">
              <li>• Homeschool students</li>
              <li>• Adults with flexible schedules</li>
              <li>• Anyone serious about improving without the evening rush</li>
            </ul>
          </div>

          <div className="bg-[#2A3E52] rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-[#C9A84C]">Private Lessons That Actually Move You Forward</h3>
            <ul className="text-left text-gray-200 space-y-2">
              <li>• Clear, structured progression (no guesswork)</li>
              <li>• Real musical application (not just theory)</li>
              <li>• Personalized coaching based on your level and goals</li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/inquire')}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors"
          >
            👉 Claim a Spot Before They Fill
          </button>
        </div>
      </section>

      {/* Community Launch Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">🚨 Something Bigger Is Coming…</h2>
            <p className="text-xl text-gray-800 mb-8">If you've ever felt like:</p>
            <ul className="text-lg text-gray-800 space-y-3 mb-12">
              <li>• You're stuck playing the same things over and over</li>
              <li>• You don't know what to practice next</li>
              <li>• You can play… but don't feel confident</li>
            </ul>
            <p className="text-2xl text-[#1A2E42] font-semibold">This is for you.</p>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#1A2E42]">🎸 The Confident Guitarist Community</h2>
            <p className="text-xl text-gray-800 mb-8">
              A live, structured, engaging way to get better at guitar<br />
              <span className="text-[#1A2E42] font-semibold">—without doing it alone</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#FEF7E0] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-[#1A2E42]">🎯 How It Works</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">🎥 Weekly Live Lesson</h4>
                  <p className="text-gray-800">Sundays — 7 PM (Central)<br />Step-by-step instruction focused on real musical progress</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">🎤 Live Q&A + Hang Sessions</h4>
                  <p className="text-gray-800">Get unstuck, ask questions, and stay consistent</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">🎶 Play Real Music</h4>
                  <p className="text-gray-800">No random exercises. No disconnected drills.</p>
                  <p className="text-gray-800 mt-2">You'll play along with:</p>
                  <ul className="text-gray-800 ml-4 mt-2 space-y-1">
                    <li>• Original songs I write and record</li>
                    <li>• Custom backing tracks</li>
                    <li>• Parts designed for your level</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#F0F8FF] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-[#1A2E42]">🎸 One System — Multiple Levels</h3>
              <p className="text-gray-800 mb-4">Inside the community:</p>
              <ul className="text-gray-800 space-y-2">
                <li>• <strong>Beginners</strong> → strum simple chords and stay engaged</li>
                <li>• <strong>Intermediate players</strong> → build rhythm, timing, and control</li>
                <li>• <strong>Electric players</strong> → explore tone, effects, and lead parts</li>
              </ul>
              <p className="text-gray-800 mt-4">
                <em>Everyone plays the same music—just at different levels</em>
              </p>
            </div>
          </div>

          <div className="bg-[#FEF7E0] rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center text-[#1A2E42]">⚡ Why This Actually Works</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-red-600">Most people try to learn guitar like this:</h4>
                <ul className="text-gray-800 space-y-1">
                  <li>• Random videos</li>
                  <li>• No structure</li>
                  <li>• No accountability</li>
                  <li>• No real progress</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-600">This is different:</h4>
                <ul className="text-gray-800 space-y-1">
                  <li>• Structured weekly progression</li>
                  <li>• Live interaction (not pre-recorded guesswork)</li>
                  <li>• Music-first learning approach</li>
                  <li>• Built-in community</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-xl font-semibold text-[#1A2E42]">The Real Goal</p>
              <p className="text-lg text-gray-800 mt-2">
                You pick up your guitar…<br />
                You play…<br />
                And it actually feels good
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#FFF8F0] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-600">🤝 Who This Is For</h3>
              <p className="text-gray-800 mb-4">This is for you if:</p>
              <ul className="text-gray-800 space-y-2">
                <li>• You've been playing but feel stuck</li>
                <li>• You've tried learning on your own and plateaued</li>
                <li>• You want structure without rigidity</li>
                <li>• You want to actually enjoy playing again</li>
              </ul>
            </div>

            <div className="bg-[#F0F8FF] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-600">This is NOT for:</h3>
              <ul className="text-gray-800 space-y-2">
                <li>• People looking for random song tutorials only</li>
                <li>• People unwilling to show up consistently</li>
                <li>• People expecting results without effort</li>
                <li>• People looking for lessons on how to shred, chicken pick, or learn more scales</li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A2E42]">🚀 Launching Soon</h2>
            <p className="text-xl text-gray-800 mb-8">
              The Confident Guitarist Community is opening in the next couple of weeks
            </p>
            <p className="text-lg text-gray-800 mb-8">
              Join the waitlist and get:
            </p>
            <ul className="text-gray-800 space-y-2 mb-8">
              <li>• Early access</li>
              <li>• Launch pricing</li>
              <li>• Sneak peeks of lessons and backing tracks</li>
            </ul>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors text-lg"
            >
              👉 Join the Waitlist Now
            </button>
          </div>

          <div className="bg-[#FEF7E0] rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center text-[#1A2E42]">⚡ Two Paths Forward</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Option 1</h4>
                <p className="text-gray-800">Keep doing what you've been doing</p>
                <p className="text-red-600 mt-2">→ inconsistent progress</p>
                <p className="text-red-600">→ no clear direction</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-3 text-[#1A2E42]">Option 2</h4>
                <p className="text-gray-800">Join something built to actually move you forward</p>
                <div className="flex flex-col gap-4 mt-4">
                  <button
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors"
                  >
                    👉 Join the Waitlist
                  </button>
                  <button
                    onClick={() => navigate('/inquire')}
                    className="px-6 py-3 bg-[#1A2E42] hover:bg-[#2a3e52] text-white font-semibold rounded-lg transition-colors"
                  >
                    👉 Book a Private Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-700">
            <p>No spam. Just early access, updates, and real value.</p>
          </div>
        </div>
      </section>

      {/* Waitlist Signup Section */}
      <section id="waitlist" className="px-6 py-24 bg-[#F0F8FF]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Join the Waitlist</h2>
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
              <p className="text-sm text-[#1A2E42] font-semibold">You're on the waitlist! We'll follow up soon.</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-[#C9A84C] hover:bg-[#b8953d] text-[#1A2E42] font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Joining...' : 'Join Waitlist'}
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