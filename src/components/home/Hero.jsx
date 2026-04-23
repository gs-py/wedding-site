import { Link } from 'react-router-dom';
import { Camera, Image as ImageIcon, MessageCircleHeart } from 'lucide-react';
import Button from '../ui/Button.jsx';
import CoupleSlideshow from './CoupleSlideshow.jsx';

const DATE = import.meta.env.VITE_WEDDING_DATE || '2025-12-15T18:00:00';
const QUOTE = import.meta.env.VITE_WEDDING_QUOTE || '';
const QUOTE_REF = import.meta.env.VITE_WEDDING_QUOTE_REF || '';
const VENUE = import.meta.env.VITE_VENUE_NAME || '';

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blush/40 via-cream to-cream" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-6 pb-10 md:pt-16 md:pb-16">
        <div className="animate-fade-in-up">
          <CoupleSlideshow />
        </div>

        <div className="mt-7 md:mt-10 text-center animate-fade-in-up">
          {QUOTE && (
            <p className="font-serif italic text-burgundy/90 text-base sm:text-lg md:text-xl px-2">
              &ldquo;{QUOTE}&rdquo;
              {QUOTE_REF && (
                <span className="block mt-1 text-xs sm:text-sm not-italic text-champagne tracking-[0.2em] uppercase">
                  {QUOTE_REF}
                </span>
              )}
            </p>
          )}
          <p className="mt-5 md:mt-6 text-charcoal/70 text-sm sm:text-base md:text-[17px]">
            {formatDate(DATE)}
            {VENUE && (
              <>
                <span className="mx-2 text-champagne">·</span>
                <span className="whitespace-nowrap">{VENUE}</span>
              </>
            )}
          </p>
        </div>

        <div className="mt-7 md:mt-10 grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
          <Button as={Link} to="/gallery" variant="primary" className="w-full sm:w-auto">
            <ImageIcon size={16} /> View Gallery
          </Button>
          <Button as={Link} to="/upload" variant="secondary" className="w-full sm:w-auto">
            <Camera size={16} /> Share Your Photos
          </Button>
          <Button as={Link} to="/wishes" variant="outline" className="w-full sm:w-auto">
            <MessageCircleHeart size={16} /> Leave a Wish
          </Button>
        </div>
      </div>
    </section>
  );
}
