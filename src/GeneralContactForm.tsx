import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

const GOLD = '#C9A84C';
const GOLD_HOVER = '#d4b65e';

export default function GeneralContactForm({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'General Contact',
          name,
          email,
          message: subject ? `Subject: ${subject}\n\n${message}` : message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Unable to send your message. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4 animate-fadeIn">
        <main className="max-w-md w-full text-center space-y-6">
          <div
            className="w-20 h-20 mx-auto rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: GOLD }}
          >
            <Check className="w-10 h-10" style={{ color: GOLD }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            You're on my radar.
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Thanks for reaching out — I'll review your message and get back to
            you soon.
          </p>
          <p className="text-gray-400 italic text-base mt-4">— Todd Brannon</p>
          <button
            data-testid="button-back-to-site-contact"
            onClick={onBack}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: GOLD }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 md:px-6 animate-fadeIn">
      <main className="max-w-[620px] mx-auto">
        <button
          data-testid="button-back-contact"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div
          className="w-12 h-[2px] mb-4"
          style={{ backgroundColor: GOLD }}
        />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl md:text-4xl font-semibold text-white mb-2 focus:outline-none"
        >
          Get in Touch
        </h1>
        <p className="text-gray-400 font-light mb-10">
          Have a question or want to work together? Drop me a line.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm text-gray-400 mb-1.5">
                Name <span style={{ color: GOLD }}>*</span>
              </label>
              <input
                id="contact-name"
                data-testid="input-contact-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#252525] border border-[#777777] rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#C9A84C] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm text-gray-400 mb-1.5">
                Email <span style={{ color: GOLD }}>*</span>
              </label>
              <input
                id="contact-email"
                data-testid="input-contact-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#252525] border border-[#777777] rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#C9A84C] transition-colors"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-sm text-gray-400 mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              data-testid="input-contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#252525] border border-[#777777] rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#C9A84C] transition-colors"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm text-gray-400 mb-1.5">
              Message <span style={{ color: GOLD }}>*</span>
            </label>
            <textarea
              id="contact-message"
              data-testid="input-contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-[#252525] border border-[#777777] rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#C9A84C] transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>

          {error && (
            <div
              role="alert"
              data-testid="text-contact-error"
              className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-300 text-sm"
            >
              {error}
            </div>
          )}

          <button
            data-testid="button-submit-contact"
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-6 rounded-lg text-lg font-medium transition-colors text-[#1A2E42] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={(e) => {
              if (!submitting) e.currentTarget.style.backgroundColor = GOLD_HOVER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = GOLD;
            }}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </main>
    </div>
  );
}
