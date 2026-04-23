import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import HeartButton from './HeartButton.jsx';

const SWIPE_THRESHOLD = 45;

export default function Lightbox({ photo, onClose, onPrev, onNext, hearted, onHeart }) {
  const touchStart = useRef(null);

  useEffect(() => {
    if (!photo) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? onNext : onPrev)?.();
    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-3 right-3 md:top-5 md:right-5 z-10 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-cream/95 text-charcoal hover:bg-blush shadow-soft"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev?.();
        }}
        className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-cream/95 text-charcoal hover:bg-blush shadow-soft"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext?.();
        }}
        className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-cream/95 text-charcoal hover:bg-blush shadow-soft"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      <figure
        className="relative flex flex-col items-center justify-center w-full h-full max-w-5xl px-3 md:px-8 py-3 md:py-6 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={photo.image_url}
          alt={`Photo by ${photo.guest_name}`}
          className="max-h-[72vh] md:max-h-[78vh] w-auto rounded-2xl shadow-soft object-contain bg-charcoal"
          draggable={false}
        />
        <figcaption className="mt-4 flex items-center justify-between gap-3 w-full max-w-2xl px-2">
          <div className="text-cream min-w-0">
            <p className="font-serif text-lg md:text-xl truncate">{photo.guest_name}</p>
            <p className="text-cream/60 text-xs">
              {new Date(photo.uploaded_at).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
          <HeartButton active={hearted} count={photo.hearts_count} onToggle={onHeart} />
        </figcaption>

        {/* mobile-only nav buttons docked at the bottom for thumb reach */}
        <div className="md:hidden mt-3 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev?.();
            }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/95 text-charcoal hover:bg-blush shadow-soft"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/95 text-charcoal hover:bg-blush shadow-soft"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </figure>
    </div>
  );
}
