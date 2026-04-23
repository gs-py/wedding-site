import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function PhotoPreview({ file, onRemove, progress }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const status = progress?.status;
  const pct = progress?.progress ?? 0;

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-white shadow-soft border border-blush/50">
      {src && (
        <img
          src={src}
          alt={file.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      {onRemove && !status && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 rounded-full bg-cream/90 p-1.5 text-burgundy opacity-0 group-hover:opacity-100 transition hover:bg-blush"
          aria-label="Remove"
        >
          <X size={14} />
        </button>
      )}
      {status && status !== 'done' && (
        <div className="absolute inset-x-2 bottom-2 rounded-full bg-cream/80 h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all ${status === 'error' ? 'bg-burgundy' : 'bg-champagne'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
      {status === 'done' && (
        <div className="absolute inset-0 bg-burgundy/70 text-cream flex items-center justify-center font-serif">
          Uploaded ✓
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 bg-burgundy/70 text-cream flex items-center justify-center text-sm">
          Failed
        </div>
      )}
    </div>
  );
}
