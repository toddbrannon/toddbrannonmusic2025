import { Link, useLocation } from 'react-router-dom';

const GOLD = '#d4af37';

const navLinks = [
  { path: '/confidentmusician', label: 'Hub' },
  { path: '/confidentmusician/lessons', label: 'Lessons' },
  { path: '/confidentmusician/pdfs', label: 'PDFs' },
  { path: '/confidentmusician/videos', label: 'Videos' },
  { path: '/confidentmusician/audio', label: 'Audio' },
];

export default function CMLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex flex-col">
      <header className="sticky top-0 z-10 bg-[#0f0f1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link
            to="/confidentmusician"
            className="text-sm font-semibold tracking-wide shrink-0"
            style={{ color: GOLD }}
          >
            The Confident Musician
          </Link>
          <nav aria-label="Section navigation" className="flex flex-wrap gap-1 justify-end">
            {navLinks.map(link => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'text-[#0f0f1a] bg-[#d4af37]'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 flex-1">
        <div className="mb-8 border-l-4 pl-5" style={{ borderColor: GOLD }}>
          <h1 className="text-3xl font-semibold text-white mb-1">{title}</h1>
          {subtitle && (
            <p className="text-gray-400 font-light text-base">{subtitle}</p>
          )}
        </div>
        {children}
      </main>

      <footer className="border-t border-white/10 py-6 px-4 text-center text-xs text-gray-600">
        The Confident Musician · Private student portal · Todd Brannon Music
      </footer>
    </div>
  );
}
