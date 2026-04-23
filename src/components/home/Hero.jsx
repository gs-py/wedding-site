import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Image as ImageIcon, MessageCircleHeart } from 'lucide-react';
import Button from '../ui/Button.jsx';

const BRIDE = import.meta.env.VITE_BRIDE_NAME || 'Priya';
const GROOM = import.meta.env.VITE_GROOM_NAME || 'Arjun';
const DATE = import.meta.env.VITE_WEDDING_DATE || '2025-12-15T18:00:00';
const QUOTE = import.meta.env.VITE_WEDDING_QUOTE || '';
const QUOTE_REF = import.meta.env.VITE_WEDDING_QUOTE_REF || '';
const VENUE = import.meta.env.VITE_VENUE_NAME || '';

/* Drop your couple photo at  public/couple.jpg  (recommended ~2000px wide).
   If missing, a soft blush placeholder is shown instead. */
const COUPLE_SRC = '/couple.jpg';

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

function CouplePhoto() {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-soft">
      {/* placeholder background — visible while loading or on error */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush via-cream to-champagne/30" />
      {!errored && (
        <img
          src={COUPLE_SRC}
          alt={`${BRIDE} and ${GROOM}`}
          loading="eager"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-burgundy/60 text-center px-6">
          <span className="font-serif text-5xl mb-2">{BRIDE[0]} & {GROOM[0]}</span>
          <span className="text-xs uppercase tracking-[0.25em]">Add public/couple.jpg</span>
        </div>
      )}

      {/* names overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent">
        <p className="uppercase tracking-[0.3em] text-[11px] md:text-xs text-cream/80 mb-2">
          We're getting married
        </p>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-cream drop-shadow">
          {BRIDE}
          <span className="inline-block mx-3 text-champagne italic">&amp;</span>
          {GROOM}
        </h1>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blush/40 via-cream to-cream" />

      <div className="mx-auto max-w-5xl px-5 md:px-8 pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="animate-fade-in-up">
          <CouplePhoto />
        </div>

        <div className="mt-8 md:mt-10 text-center animate-fade-in-up">
          {QUOTE && (
            <p className="font-serif italic text-burgundy/90 text-lg md:text-xl">
              “{QUOTE}”
              {QUOTE_REF && (
                <span className="block mt-1 text-sm not-italic text-champagne tracking-[0.2em] uppercase">
                  {QUOTE_REF}
                </span>
              )}
            </p>
          )}
          <p className="mt-6 text-charcoal/70 md:text-[17px]">
            {formatDate(DATE)}
            {VENUE && (
              <>
                <span className="mx-2 text-champagne">·</span>
                {VENUE}
              </>
            )}
          </p>
        </div>

        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button as={Link} to="/gallery" variant="primary">
            <ImageIcon size={16} /> View Gallery
          </Button>
          <Button as={Link} to="/upload" variant="secondary">
            <Camera size={16} /> Share Your Photos
          </Button>
          <Button as={Link} to="/wishes" variant="outline">
            <MessageCircleHeart size={16} /> Leave a Wish
          </Button>
        </div>
      </div>
    </section>
  );
}
