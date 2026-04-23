import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, children, wide = false, className = '' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${wide ? 'max-w-6xl' : 'max-w-lg'} bg-cream rounded-2xl shadow-soft overflow-hidden ${className}`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 rounded-full bg-cream/90 p-2 text-charcoal hover:bg-blush transition"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
