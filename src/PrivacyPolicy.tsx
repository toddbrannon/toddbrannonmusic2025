import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    document.title = 'Privacy Policy | Todd Brannon Music';
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 md:px-6 animate-fadeIn">
      <main className="max-w-[720px] mx-auto">
        <button
          data-testid="button-back-privacy"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 9, 2026</p>

        <div className="space-y-8 text-gray-300 font-light leading-relaxed">
          <p>
            Todd Brannon Music ("I", "me", or "my") operates toddbrannonmusic.com. I respect your privacy and am committed to being transparent about how I handle the limited personal information collected through this site.
          </p>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">What I Collect</h2>
            <p>
              When you submit an inquiry through the contact form on this site, I collect your name, email address, and optionally your phone number, along with any details you choose to share in the message field.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">How I Use It</h2>
            <p>
              Your information is used solely to respond to your inquiry about lessons or coaching services. I do not use it for marketing, advertising, or any other purpose.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-3">Where It Goes</h2>
            <p>
              Submitted form data is delivered to my private email inbox via Resend and may be logged in a private Google Sheet for my own organizational purposes. Neither Resend nor Google Sheets sells or shares your data with third parties.
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
              I retain inquiry information only as long as it is relevant to our communication. You may request deletion of your information at any time by emailing{' '}
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
