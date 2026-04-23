import { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function Dropzone({ onFiles, disabled, remaining }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const handle = (fileList) => {
    if (!fileList?.length) return;
    onFiles(Array.from(fileList));
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (!disabled) handle(e.dataTransfer.files);
      }}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-14 text-center transition cursor-pointer ${
        drag ? 'border-burgundy bg-blush/40' : 'border-champagne/60 bg-white/60 hover:bg-blush/20'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <div className="h-14 w-14 rounded-full bg-blush flex items-center justify-center">
        {remaining === 0 ? (
          <ImageIcon className="text-burgundy" size={26} />
        ) : (
          <UploadCloud className="text-burgundy" size={26} />
        )}
      </div>
      <div>
        <p className="font-serif text-xl text-burgundy">
          {remaining === 0 ? 'You’ve shared your 10 photos 💛' : 'Drop photos here'}
        </p>
        <p className="text-sm text-charcoal/60 mt-1">
          {remaining === 0
            ? 'Thank you for sharing!'
            : 'or click to browse — JPEG, PNG, or WebP, up to 10MB each'}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = '';
        }}
      />
    </div>
  );
}
