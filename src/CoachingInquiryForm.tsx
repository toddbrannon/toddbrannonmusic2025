import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

const GOLD = '#C9A84C';
const GOLD_HOVER = '#d4b65e';

interface ToggleOption {
  label: string;
  value: string;
}

function ToggleGroup({
  options,
  selected,
  onSelect,
  ariaLabelledBy,
}: {
  options: ToggleOption[];
  selected: string;
  onSelect: (val: string) => void;
  ariaLabelledBy?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-labelledby={ariaLabelledBy}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          data-testid={`toggle-coaching-${opt.value}`}
          aria-pressed={selected === opt.value}
          onClick={() => onSelect(opt.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
            selected === opt.value
              ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
              : 'border-gray-600 text-gray-400 bg-transparent hover:border-gray-500 hover:text-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function CoachingInquiryForm({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coachingTopic, setCoachingTopic] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const topicOptions: ToggleOption[] = [
    { label: 'Worship Team Prep', value: 'worship-prep' },
    { label: 'Home Recording (Logic Pro)', value: 'home-recording' },
    { label: 'Songwriting', value: 'songwriting' },
    { label: 'Not Sure Yet', value: 'not-sure' },
  ];

  const experienceOptions: ToggleOption[] = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'Coaching Inquiry',
          name,
          email,
          phone,
          interests: coachingTopic ? [coachingTopic] : [],
          experience,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Unable to send your inquiry. Please check your connection and try again.');
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
            Thanks for reaching out — I'll review your info and get back to you
            soon. Looking forward to helping you take your playing to the next
            level.
          </p>
          <p className="text-gray-400 italic text-base mt-4">— Todd Brannon</p>
          <button
            data-testid="button-back-to-site-coaching"
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
          data-testid="button-back-coaching"
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
          Coaching Inquiry
        </h1>
        <p className="text-gray-400 font-light mb-10">
          Tell me what you're looking to work on and I'll be in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="coaching-name" className="block text-sm text-gray-400 mb-1.5">
                Name <span style={{ color: GOLD }}>*</span>
              </label>
              <input
                id="coaching-name"
                data-testid="input-coaching-name"
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
              <label htmlFor="coaching-email" className="block text-sm text-gray-400 mb-1.5">
                Email <span style={{ color: GOLD }}>*</span>
              </label>
              <input
                id="coaching-email"
                data-testid="input-coaching-email"
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
            <label htmlFor="coaching-phone" className="block text-sm text-gray-400 mb-1.5">
              Phone <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="coaching-phone"
              data-testid="input-coaching-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#252525] border border-[#777777] rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#C9A84C] transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <span id="label-coaching-topic" className="block text-sm text-gray-400 mb-3">
              What do you need coaching on?
            </span>
            <ToggleGroup
              options={topicOptions}
              selected={coachingTopic}
              onSelect={setCoachingTopic}
              ariaLabelledBy="label-coaching-topic"
            />
          </div>

          <div>
            <span id="label-coaching-experience" className="block text-sm text-gray-400 mb-3">
              Experience level
            </span>
            <ToggleGroup
              options={experienceOptions}
              selected={experience}
              onSelect={setExperience}
              ariaLabelledBy="label-coaching-experience"
            />
          </div>

          <div>
            <label htmlFor="coaching-message" className="block text-sm text-gray-400 mb-1.5">
              Message <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="coaching-message"
              data-testid="input-coaching-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-[#252525] border border-[#777777] rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#C9A84C] transition-colors resize-none"
              placeholder="Goals, questions, schedule details..."
            />
          </div>

          {error && (
            <div
              role="alert"
              data-testid="text-coaching-error"
              className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-300 text-sm"
            >
              {error}
            </div>
          )}

          <button
            data-testid="button-submit-coaching"
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
            {submitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </main>
    </div>
  );
}
