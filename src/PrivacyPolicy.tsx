import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = 'Privacy Policy | Todd Brannon Music';
    headingRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 md:px-6">
      <main className="max-w-[720px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
          Back
        </button>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl md:text-4xl font-semibold text-white mb-2 focus:outline-none"
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 22, 2026</p>

        <div className="space-y-8 text-gray-300 font-light leading-relaxed">
          <p>
            Todd Brannon Music ("I", "me", or "my") operates toddbrannonmusic.com. I respect your privacy and am committed to being transparent about how I handle the limited personal information collected through this site.
          </p>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">What I Collect</h2>
            <p>
              Depending on how you interact with this site, I may collect your name, email address, and optionally your phone number. This includes information submitted through contact forms, lesson inquiry forms, free resource requests, and waitlist signups.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">How I Use It</h2>
            <p className="mb-3">
              Your information is used to respond to your inquiry, deliver requested resources, or notify you about programs you've expressed interest in — such as The Confident Guitarist Community.
            </p>
            <p>
              If you opt in to marketing communications during signup, I may also send you occasional emails about new lessons, resources, announcements, or offerings from Todd Brannon Music. You can opt out at any time by replying to any email with "unsubscribe" or by contacting me directly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">Where It Goes</h2>
            <p>
              Submitted form data is stored in a private, secured database and delivered to my private email inbox via Resend. I do not use third-party CRMs or marketing platforms that sell or share your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">What I Don't Do</h2>
            <p>
              I do not sell, rent, trade, or otherwise share your personal information with any third party for their own purposes — ever.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">Data Retention</h2>
            <p>
              I retain your information only as long as it is relevant to our communication or your interest in my programs. You may request deletion of your information at any time by emailing{' '}
              <a href="mailto:todd@toddbrannonmusic.com" className="text-[#C9A84C] hover:underline">todd@toddbrannonmusic.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">Your Rights</h2>
            <p>
              You may request to view, correct, or delete any personal information I hold about you by contacting me directly at{' '}
              <a href="mailto:todd@toddbrannonmusic.com" className="text-[#C9A84C] hover:underline">todd@toddbrannonmusic.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">Contact</h2>
            <p>
              Todd Brannon Music<br />
              <a href="mailto:todd@toddbrannonmusic.com" className="text-[#C9A84C] hover:underline">todd@toddbrannonmusic.com</a><br />
              <a href="https://toddbrannonmusic.com" className="text-[#C9A84C] hover:underline">toddbrannonmusic.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}