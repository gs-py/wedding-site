import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import HeartButton from './HeartButton.jsx';

export default function Lightbox({ photo, onClose, onPrev, onNext, hearted, onHeart }) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/85 backdrop-blur-sm p-3 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-4 right-4 rounded-full bg-cream/90 p-2 text-charcoal hover:bg-blush z-10"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev?.();
        }}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-3 text-charcoal hover:bg-blush"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext?.();
        }}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-3 text-charcoal hover:bg-blush"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      <figure
        className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image_url}
          alt={`Photo by ${photo.guest_name}`}
          className="max-h-[80vh] w-auto rounded-2xl shadow-soft object-contain bg-charcoal"
        />
        <figcaption className="mt-4 flex items-center justify-between gap-3 w-full max-w-2xl">
          <div className="text-cream">
            <p className="font-serif text-xl">{photo.guest_name}</p>
            <p className="text-cream/60 text-xs">
              {new Date(photo.uploaded_at).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
          <HeartButton active={hearted} count={photo.hearts_count} onToggle={onHeart} />
        </figcaption>
      </figure>
    </div>
  );
}
