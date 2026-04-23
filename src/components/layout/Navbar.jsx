import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const BRIDE = import.meta.env.VITE_BRIDE_NAME || 'Priya';
const GROOM = import.meta.env.VITE_GROOM_NAME || 'Arjun';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/event', label: 'Event' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/upload', label: 'Upload' },
  { to: '/wishes', label: 'Wishes' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur border-b border-blush/60">
      <nav className="mx-auto max-w-6xl px-5 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Heart size={18} className="text-burgundy group-hover:animate-heart-burst" fill="currentColor" />
          <span className="font-serif text-xl md:text-2xl tracking-wide text-burgundy">
            {BRIDE} <span className="text-champagne">&</span> {GROOM}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm rounded-full transition ${
                    isActive
                      ? 'text-burgundy bg-blush/60'
                      : 'text-charcoal/70 hover:text-burgundy hover:bg-blush/40'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden rounded-full p-2 text-burgundy hover:bg-blush/40"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-blush/60 bg-cream">
          <ul className="px-5 py-3 flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-lg text-[15px] ${
                      isActive ? 'text-burgundy bg-blush/50' : 'text-charcoal/80'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
