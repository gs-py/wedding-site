import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function HeartButton({ active, count, onToggle, size = 18, className = '' }) {
  const [burst, setBurst] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBurst(true);
    setTimeout(() => setBurst(false), 450);
    await onToggle?.();
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={active}
      aria-label={active ? 'Unheart photo' : 'Heart photo'}
      className={`inline-flex items-center gap-1.5 rounded-full bg-cream/95 backdrop-blur min-h-[44px] px-3.5 text-sm text-burgundy hover:bg-cream active:scale-95 shadow-soft transition select-none ${className}`}
    >
      <Heart
        size={size}
        fill={active ? 'currentColor' : 'none'}
        className={`transition ${burst ? 'animate-heart-burst' : ''} ${
          active ? 'text-burgundy' : 'text-burgundy/70'
        }`}
      />
      <span className="tabular-nums leading-none">{count ?? 0}</span>
    </button>
  );
}
