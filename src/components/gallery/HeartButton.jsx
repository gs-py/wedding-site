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
      className={`inline-flex items-center gap-1.5 rounded-full bg-cream/90 backdrop-blur px-3 py-1.5 text-sm text-burgundy hover:bg-cream shadow-soft transition ${className}`}
    >
      <Heart
        size={size}
        fill={active ? 'currentColor' : 'none'}
        className={`transition ${burst ? 'animate-heart-burst' : ''} ${
          active ? 'text-burgundy' : 'text-burgundy/70'
        }`}
      />
      <span className="tabular-nums">{count ?? 0}</span>
    </button>
  );
}
