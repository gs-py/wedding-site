import { Quote } from 'lucide-react';

const TONES = [
  'bg-blush/60 border-blush',
  'bg-champagne/20 border-champagne/40',
  'bg-white border-blush/50',
  'bg-cream border-champagne/30',
];

function toneFor(id) {
  let s = 0;
  for (const ch of String(id || '')) s = (s + ch.charCodeAt(0)) % TONES.length;
  return TONES[s];
}

export default function WishCard({ wish }) {
  return (
    <article
      className={`break-inside-avoid rounded-2xl border shadow-soft px-5 py-5 ${toneFor(wish.id)} animate-fade-in-up`}
    >
      <Quote size={18} className="text-champagne mb-2" />
      <p className="text-charcoal/90 leading-relaxed whitespace-pre-wrap">{wish.message}</p>
      <footer className="mt-4 flex items-center justify-between text-sm">
        <span className="font-serif text-burgundy">— {wish.guest_name}</span>
        <time className="text-charcoal/50 text-xs">
          {new Date(wish.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </time>
      </footer>
    </article>
  );
}
