import { useEffect, useState } from 'react';

const DATE = import.meta.env.VITE_WEDDING_DATE || '2025-12-15T18:00:00';

function diff(target) {
  const now = Date.now();
  const end = new Date(target).getTime();
  let ms = Math.max(0, end - now);
  const days = Math.floor(ms / 86400000); ms -= days * 86400000;
  const hours = Math.floor(ms / 3600000); ms -= hours * 3600000;
  const minutes = Math.floor(ms / 60000); ms -= minutes * 60000;
  const seconds = Math.floor(ms / 1000);
  return { days, hours, minutes, seconds, over: end - Date.now() <= 0 };
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-[68px] md:min-w-[96px] rounded-2xl bg-cream border border-champagne/30 shadow-soft px-3 py-4 md:py-6">
        <span className="block font-serif text-3xl md:text-5xl text-burgundy tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[11px] md:text-xs tracking-[0.25em] uppercase text-champagne">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState(() => diff(DATE));

  useEffect(() => {
    const id = setInterval(() => setT(diff(DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-5 md:px-8 py-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-champagne mb-3">Counting down to</p>
        <h2 className="font-serif text-3xl md:text-4xl text-burgundy mb-8">
          {t.over ? 'Today is the day' : 'The Big Day'}
        </h2>

        {!t.over && (
          <div className="flex items-center justify-center gap-3 md:gap-5">
            <Unit value={t.days} label="Days" />
            <Unit value={t.hours} label="Hours" />
            <Unit value={t.minutes} label="Minutes" />
            <Unit value={t.seconds} label="Seconds" />
          </div>
        )}
      </div>
    </section>
  );
}
