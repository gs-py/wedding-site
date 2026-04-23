import { Sparkles, Utensils } from 'lucide-react';

const DATE = import.meta.env.VITE_WEDDING_DATE || '2026-04-29T17:30:00+05:30';

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function fmtTime(iso, addHours = 0) {
  try {
    const d = new Date(iso);
    d.setHours(d.getHours() + addHours);
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  } catch {
    return '';
  }
}

const items = [
  {
    icon: Sparkles,
    name: 'Ceremony',
    date: fmtDate(DATE),
    time: `${fmtTime(DATE)} onwards`,
    note: 'The big moment — the vows',
  },
  {
    icon: Utensils,
    name: 'Reception',
    date: fmtDate(DATE),
    time: 'To follow',
    note: 'Feast & celebration',
  },
];

export default function EventSchedule() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((s) => (
        <div
          key={s.name}
          className="rounded-2xl bg-white/70 border border-blush/60 shadow-soft p-5 flex gap-4 items-start"
        >
          <div className="h-12 w-12 rounded-full bg-blush flex items-center justify-center text-burgundy shrink-0">
            <s.icon size={20} />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-burgundy">{s.name}</h3>
            <p className="text-sm text-charcoal/60 mt-0.5">
              {s.date} · {s.time}
            </p>
            <p className="mt-2 text-charcoal/80 text-[15px]">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
