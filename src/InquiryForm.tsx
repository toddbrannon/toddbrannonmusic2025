import { useState } from 'react';
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
}: {
  options: ToggleOption[];
  selected: string | string[];
  onSelect: (val: string | string[]) => void;
  multi?: boolean;
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
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          data-testid={`toggle-${opt.value}`}
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

export default function InquiryForm({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentType, setStudentType] = useState('');
  const [experience, setExperience] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [message, setMessage] = useState('');

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
    { label: 'Homeschool', value: 'homeschool' },
    { label: 'Flexible', value: 'flexible' },
    { label: 'Open', value: 'open' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4 animate-fadeIn">
        <div className="max-w-md w-full text-center space-y-6">
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
          <p className="text-gray-500 italic text-base mt-4">— Todd Brannon</p>
          <button
            data-testid="button-back-to-site"
            onClick={onBack}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: GOLD }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 md:px-6 animate-fadeIn">
      <div className="max-w-[620px] mx-auto">
        <button
          data-testid="button-back"
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
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
          Inquire About Lessons
        </h1>
        <p className="text-gray-400 font-light mb-10">
          Fill out the form below and I'll be in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Name <span style={{ color: GOLD }}>*</span>
              </label>
              <input
                data-testid="input-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Email <span style={{ color: GOLD }}>*</span>
              </label>
              <input
                data-testid="input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">
              Phone <span className="text-gray-600">(optional)</span>
            </label>
            <input
              data-testid="input-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Who's taking lessons?
            </label>
            <ToggleGroup
              options={studentOptions}
              selected={studentType}
              onSelect={(val) => setStudentType(val as string)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Experience level
            </label>
            <ToggleGroup
              options={experienceOptions}
              selected={experience}
              onSelect={(val) => setExperience(val as string)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Interested in
            </label>
            <ToggleGroup
              options={interestOptions}
              selected={interests}
              onSelect={(val) => setInterests(val as string[])}
              multi
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Preferred availability
            </label>
            <ToggleGroup
              options={availabilityOptions}
              selected={availability}
              onSelect={(val) => setAvailability(val as string[])}
              multi
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">
              Message <span className="text-gray-600">(optional)</span>
            </label>
            <textarea
              data-testid="input-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              placeholder="Goals, questions, schedule details..."
            />
          </div>

          <button
            data-testid="button-submit-inquiry"
            type="submit"
            className="w-full py-3 px-6 rounded-lg text-lg font-medium transition-colors text-white"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = GOLD_HOVER)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = GOLD)
            }
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
