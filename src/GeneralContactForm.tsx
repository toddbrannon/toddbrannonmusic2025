import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

const GOLD = '#C9A84C';
const GOLD_HOVER = '#d4b65e';

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

export default function GeneralContactForm({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = 'Get in Touch | Todd Brannon Music';
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return value.trim() ? '' : 'Please enter your full name.';
      case 'email':
        if (!value.trim()) return 'Please enter your email address.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ''
          : 'Please enter a valid email address (e.g. you@example.com).';
      case 'message':
        return value.trim() ? '' : 'Please enter your message.';
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
    const messageErr = validateField('message', message);
    const newErrors: Record<string, string> = {};
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (messageErr) newErrors.message = messageErr;

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      if (nameErr) document.getElementById('contact-name')?.focus();
      else if (emailErr) document.getElementById('contact-email')?.focus();
      else if (messageErr) document.getElementById('contact-message')?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError('');

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
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Unable to send your message. Please check your connection and try again.');
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
          data-testid="button-back-contact"
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
          Get in Touch
        </h1>
        <p className="text-gray-400 font-light mb-2">
          Have a question or want to work together? Drop me a line.
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
                <label htmlFor="contact-name" className="block text-sm text-gray-400 mb-1.5">
                  Name<RequiredMark />
                </label>
                <input
                  id="contact-name"
                  data-testid="input-contact-name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  className={fieldErrors.name ? INPUT_ERROR : INPUT_NORMAL}
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <FieldError id="contact-name-error" message={fieldErrors.name} />
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-gray-400 mb-1.5">
                  Email<RequiredMark />
                </label>
                <input
                  id="contact-email"
                  data-testid="input-contact-email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  className={fieldErrors.email ? INPUT_ERROR : INPUT_NORMAL}
                  placeholder="you@email.com"
                />
                {fieldErrors.email && (
                  <FieldError id="contact-email-error" message={fieldErrors.email} />
                )}
              </div>
            </div>
          </fieldset>

          <div>
            <label htmlFor="contact-subject" className="block text-sm text-gray-400 mb-1.5">
              Subject <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="contact-subject"
              data-testid="input-contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={INPUT_NORMAL}
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm text-gray-400 mb-1.5">
              Message<RequiredMark />
            </label>
            <textarea
              id="contact-message"
              data-testid="input-contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
              onBlur={(e) => handleBlur('message', e.target.value)}
              rows={5}
              className={`${fieldErrors.message ? INPUT_ERROR : INPUT_NORMAL} resize-none`}
              placeholder="Your message..."
            />
            {fieldErrors.message && (
              <FieldError id="contact-message-error" message={fieldErrors.message} />
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              data-testid="text-contact-error"
              className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-300 text-sm"
            >
              {submitError}
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
