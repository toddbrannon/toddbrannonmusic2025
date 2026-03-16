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
  multi = false,
  ariaLabelledBy,
}: {
  options: ToggleOption[];
  selected: string | string[];
  onSelect: (val: string | string[]) => void;
  multi?: boolean;
  ariaLabelledBy?: string;
}) {
  const isActive = (val: string) =>
    multi ? (selected as string[]).includes(val) : selected === val;

  const handleClick = (val: string) => {
    if (multi) {
      const arr = selected as string[];
      onSelect(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    } else {
      onSelect(val);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-labelledby={ariaLabelledBy}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          data-testid={`toggle-${opt.value}`}
          aria-pressed={isActive(opt.value)}
          onClick={() => handleClick(opt.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
            isActive(opt.value)
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

export default function InquiryForm({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentType, setStudentType] = useState('');
  const [experience, setExperience] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = 'Inquire About Lessons | Todd Brannon Music';
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  const studentOptions: ToggleOption[] = [
    { label: 'Myself', value: 'myself' },
    { label: 'My Child', value: 'my-child' },
    { label: 'Both', value: 'both' },
  ];

  const experienceOptions: ToggleOption[] = [
    { label: 'Complete Beginner', value: 'beginner' },
    { label: 'Some Experience', value: 'some-experience' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  const interestOptions: ToggleOption[] = [
    { label: 'Guitar Lessons', value: 'guitar-lessons' },
    { label: 'Worship Team Prep', value: 'worship-prep' },
    { label: 'Home Recording (Logic Pro)', value: 'home-recording' },
    { label: 'Songwriting Coaching', value: 'songwriting' },
  ];

  const availabilityOptions: ToggleOption[] = [
    { label: 'After School', value: 'after-school' },
    { label: 'Daytime', value: 'daytime' },
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
      if (nameErr) document.getElementById('inquiry-name')?.focus();
      else if (emailErr) document.getElementById('inquiry-email')?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'Lesson Inquiry',
          name,
          email,
          phone,
          studentType,
          experience,
          interests,
          availability,
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
            data-testid="button-back-to-site"
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
          data-testid="button-back"
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
          Inquire About Lessons
        </h1>
        <p className="text-gray-400 font-light mb-2">
          Fill out the form below and I'll be in touch.
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
                <label htmlFor="inquiry-name" className="block text-sm text-gray-400 mb-1.5">
                  Name<RequiredMark />
                </label>
                <input
                  id="inquiry-name"
                  data-testid="input-name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'inquiry-name-error' : undefined}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  className={fieldErrors.name ? INPUT_ERROR : INPUT_NORMAL}
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <FieldError id="inquiry-name-error" message={fieldErrors.name} />
                )}
              </div>
              <div>
                <label htmlFor="inquiry-email" className="block text-sm text-gray-400 mb-1.5">
                  Email<RequiredMark />
                </label>
                <input
                  id="inquiry-email"
                  data-testid="input-email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'inquiry-email-error' : undefined}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  className={fieldErrors.email ? INPUT_ERROR : INPUT_NORMAL}
                  placeholder="you@email.com"
                />
                {fieldErrors.email && (
                  <FieldError id="inquiry-email-error" message={fieldErrors.email} />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="inquiry-phone" className="block text-sm text-gray-400 mb-1.5">
                Phone <span className="text-gray-400">(optional)</span>
              </label>
              <input
                id="inquiry-phone"
                data-testid="input-phone"
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
            <span id="label-student-type" className="block text-sm text-gray-400 mb-3">
              Who's taking lessons?
            </span>
            <ToggleGroup
              options={studentOptions}
              selected={studentType}
              onSelect={(val) => setStudentType(val as string)}
              ariaLabelledBy="label-student-type"
            />
          </div>

          <div>
            <span id="label-experience" className="block text-sm text-gray-400 mb-3">
              Experience level
            </span>
            <ToggleGroup
              options={experienceOptions}
              selected={experience}
              onSelect={(val) => setExperience(val as string)}
              ariaLabelledBy="label-experience"
            />
          </div>

          <div>
            <span id="label-interests" className="block text-sm text-gray-400 mb-3">
              Interested in
            </span>
            <ToggleGroup
              options={interestOptions}
              selected={interests}
              onSelect={(val) => setInterests(val as string[])}
              multi
              ariaLabelledBy="label-interests"
            />
          </div>

          <div>
            <span id="label-availability" className="block text-sm text-gray-400 mb-3">
              Preferred availability
            </span>
            <ToggleGroup
              options={availabilityOptions}
              selected={availability}
              onSelect={(val) => setAvailability(val as string[])}
              multi
              ariaLabelledBy="label-availability"
            />
          </div>

          <div>
            <label htmlFor="inquiry-message" className="block text-sm text-gray-400 mb-1.5">
              Message <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="inquiry-message"
              data-testid="input-message"
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
              data-testid="text-error"
              className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-300 text-sm"
            >
              {submitError}
            </div>
          )}

          <button
            data-testid="button-submit-inquiry"
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
