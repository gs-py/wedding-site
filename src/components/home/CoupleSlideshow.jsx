import { useEffect, useRef, useState } from 'react';

const BRIDE = import.meta.env.VITE_BRIDE_NAME || 'Priya';
const GROOM = import.meta.env.VITE_GROOM_NAME || 'Arjun';

/* Drop these in /public — anything missing is auto-skipped:
   /public/couple1.jpg, /public/couple2.jpg, /public/couple3.jpg
   To add more: add couple4.jpg etc. to /public AND extend this array. */
const SLIDES = ['/couple1.jpg', '/couple2.jpg', '/couple3.jpg'];

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD = 40;

export default function CoupleSlideshow() {
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState(() => new Set());
  const touchStart = useRef(null);
  const paused = useRef(false);

  const validIndices = SLIDES.map((_, i) => i).filter((i) => !broken.has(i));
  const allBroken = validIndices.length === 0;

  const advance = (dir = 1) => {
    setActive((cur) => {
      let next = cur;
      for (let i = 0; i < SLIDES.length; i += 1) {
        next = (next + dir + SLIDES.length) % SLIDES.length;
        if (!broken.has(next)) return next;
      }
      return cur;
    });
  };

  // jump off a broken slide if the active one fails
  useEffect(() => {
    if (broken.has(active) && !allBroken) advance(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [broken]);

  // auto-advance, paused on tab hidden / hover / touch
  useEffect(() => {
    if (allBroken || validIndices.length < 2) return;
    const id = setInterval(() => {
      if (!paused.current && document.visibilityState !== 'hidden') advance(1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [broken, allBroken]);

  const onTouchStart = (e) => {
    paused.current = true;
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) advance(dx < 0 ? 1 : -1);
    touchStart.current = null;
    setTimeout(() => {
      paused.current = false;
    }, 1000);
  };

  return (
    <div
      className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-soft select-none touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${BRIDE} and ${GROOM} photos`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blush via-cream to-champagne/30" />

      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${BRIDE} & ${GROOM} — slide ${i + 1}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          draggable={false}
          onError={() =>
            setBroken((prev) => {
              if (prev.has(i)) return prev;
              const n = new Set(prev);
              n.add(i);
              return n;
            })
          }
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === active && !broken.has(i) ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {allBroken && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-burgundy/60 text-center px-6">
          <span className="font-serif text-5xl mb-2">
            {BRIDE[0]} <span className="text-champagne italic">&amp;</span> {GROOM[0]}
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em]">
            Add /public/couple1.jpg, couple2.jpg, couple3.jpg
          </span>
        </div>
      )}

      {/* names overlay */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-16 md:px-10 md:pb-10 md:pt-24 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent pointer-events-none">
        <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-cream/80 mb-2">
          We&rsquo;re getting married
        </p>
        <h1 className="font-serif text-[2.2rem] leading-[1.05] sm:text-5xl md:text-6xl text-cream drop-shadow">
          {BRIDE}
          <span className="inline-block mx-2 md:mx-3 text-champagne italic">&amp;</span>
          {GROOM}
        </h1>
      </div>

      {/* pagination dots */}
      {validIndices.length > 1 && (
        <div className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/30 backdrop-blur-sm">
          {SLIDES.map((_, i) =>
            broken.has(i) ? null : (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-7 bg-cream' : 'w-1.5 bg-cream/60 hover:bg-cream/90'
                }`}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
