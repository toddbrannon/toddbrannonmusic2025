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

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" style={{ color: GOLD }}> *</span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-400">
      {message}
    </p>
  );
}

const INPUT_BASE = 'w-full bg-[#252525] rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#C9A84C] transition-colors border';
const INPUT_NORMAL = `${INPUT_BASE} border-[#777777]`;
const INPUT_ERROR = `${INPUT_BASE} border-red-500`;

export default function CoachingInquiryForm({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coachingTopic, setCoachingTopic] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = 'Coaching Inquiry | Todd Brannon Music';
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

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

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return value.trim() ? '' : 'Please enter your full name.';
      case 'email':
        if (!value.trim()) return 'Please enter your email address.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ''
          : 'Please enter a valid email address (e.g. you@example.com).';
      default:
        return '';
    }
  };

  const handleBlur = (field: string, value: string) => {
    const err = validateField(field, value);
    setFieldErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateField('name', name);
    const emailErr = validateField('email', email);
    const newErrors: Record<string, string> = {};
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      if (nameErr) document.getElementById('coaching-name')?.focus();
      else if (emailErr) document.getElementById('coaching-email')?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError('');

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
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Unable to send your inquiry. Please check your connection and try again.');
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
            aria-hidden="true"
          >
            <Check aria-hidden="true" className="w-10 h-10" style={{ color: GOLD }} />
          </div>
          <h2
            ref={successRef}
            tabIndex={-1}
            className="text-3xl md:text-4xl font-semibold text-white focus:outline-none"
          >
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
            <ArrowLeft aria-hidden="true" className="w-4 h-4" />
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
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
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
        <p className="text-gray-400 font-light mb-2">
          Tell me what you're looking to work on and I'll be in touch.
        </p>
        <p className="text-xs text-gray-400 mb-8">
          Fields marked <span aria-hidden="true" style={{ color: GOLD }}>*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">

          <fieldset className="border-0 p-0 m-0 min-w-0 space-y-4">
            <legend className="sr-only">Contact details</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="coaching-name" className="block text-sm text-gray-400 mb-1.5">
                  Name<RequiredMark />
                </label>
                <input
                  id="coaching-name"
                  data-testid="input-coaching-name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'coaching-name-error' : undefined}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  className={fieldErrors.name ? INPUT_ERROR : INPUT_NORMAL}
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <FieldError id="coaching-name-error" message={fieldErrors.name} />
                )}
              </div>
              <div>
                <label htmlFor="coaching-email" className="block text-sm text-gray-400 mb-1.5">
                  Email<RequiredMark />
                </label>
                <input
                  id="coaching-email"
                  data-testid="input-coaching-email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'coaching-email-error' : undefined}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  className={fieldErrors.email ? INPUT_ERROR : INPUT_NORMAL}
                  placeholder="you@email.com"
                />
                {fieldErrors.email && (
                  <FieldError id="coaching-email-error" message={fieldErrors.email} />
                )}
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
                className={INPUT_NORMAL}
                placeholder="(555) 123-4567"
              />
            </div>
          </fieldset>

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
              className={`${INPUT_NORMAL} resize-none`}
              placeholder="Goals, questions, schedule details..."
            />
          </div>

          {submitError && (
            <div
              role="alert"
              data-testid="text-coaching-error"
              className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-300 text-sm"
            >
              {submitError}
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
