import { Heart } from 'lucide-react';

const BRIDE = import.meta.env.VITE_BRIDE_NAME || 'Priya';
const GROOM = import.meta.env.VITE_GROOM_NAME || 'Arjun';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 md:mt-20 border-t border-blush/60 bg-cream pb-safe">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-charcoal/60 text-center md:text-left">
        <p className="font-serif text-lg text-burgundy/90">
          {BRIDE} <span className="text-champagne">&amp;</span> {GROOM}
        </p>
        <p className="flex items-center gap-1.5">
          Made with <Heart size={14} className="text-burgundy" fill="currentColor" /> for our favourite people
        </p>
        <p className="text-charcoal/40">© {year}</p>
      </div>
    </footer>
  );
}
