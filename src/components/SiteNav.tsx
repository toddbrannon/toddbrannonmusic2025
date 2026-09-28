import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import brandLogo from '../assets/tbm_brand.png';

const navLinks = [
  { label: 'MUSIC', to: '/#featured-work' },
  { label: 'GUITAR', to: '/#lessons' },
  { label: 'LICENSING + PRODUCTION', to: '/licensing' },
  { label: 'ABOUT', to: '/#about' },
  { label: 'CONTACT', to: '/#contact' },
];

const MENU_ID = 'site-nav-menu';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // A link is "current" only when it points at a route, not an on-page anchor.
  const isCurrent = (to: string) => !to.includes('#') && pathname === to;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const linkClass = (to: string, size: string) =>
    `${size} font-light tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${
      isCurrent(to) ? 'text-[#C9A84C]' : 'text-gray-300 hover:text-[#C9A84C]'
    }`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Todd Brannon Music — home"
          onClick={() => {
            setOpen(false);
            window.scrollTo(0, 0);
          }}
        >
          <img src={brandLogo} alt="" aria-hidden="true" className="h-8 object-contain" />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              aria-current={isCurrent(link.to) ? 'page' : undefined}
              className={linkClass(link.to, 'text-xs')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          data-testid="nav-menu-toggle"
          className="md:hidden text-gray-300 hover:text-[#C9A84C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 rounded"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id={MENU_ID}
          aria-label="Main navigation"
          className="md:hidden absolute top-16 inset-x-0 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              aria-current={isCurrent(link.to) ? 'page' : undefined}
              className={linkClass(link.to, 'text-sm')}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
