import { useMemo, useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import Dropzone from './Dropzone.jsx';
import PhotoPreview from './PhotoPreview.jsx';
import UploadProgress from './UploadProgress.jsx';
import { useGuest } from '../../context/GuestContext.jsx';
import { useUpload } from '../../hooks/useUpload.js';
import { MAX_PER_GUEST, validateFile } from '../../utils/validateFile.js';

export default function UploadForm() {
  const { guestName, setGuestName } = useGuest();
  const { uploadFiles, remaining, usedCount, isUploading, fileProgress } = useUpload();
  const [files, setFiles] = useState([]);

  const disabled = remaining === 0;
  const canAdd = useMemo(() => Math.max(0, remaining - files.length), [remaining, files.length]);

  const addFiles = (incoming) => {
    const allowed = [];
    for (const f of incoming) {
      const v = validateFile(f);
      if (!v.ok) {
        toast.error(v.reason);
        continue;
      }
      allowed.push(f);
    }
    if (!allowed.length) return;
    if (allowed.length > canAdd) {
      toast.error(`Only ${canAdd} more photo${canAdd === 1 ? '' : 's'} allowed.`);
      return;
    }
    setFiles((prev) => [...prev, ...allowed]);
  };

  const removeAt = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!files.length) {
      toast.error('Pick at least one photo');
      return;
    }
    const { uploaded } = await uploadFiles(files);
    if (uploaded) setFiles([]);
  };

  const submitLabel = isUploading
    ? 'Uploading…'
    : `Share ${files.length || ''} photo${files.length === 1 ? '' : 's'}`;

  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-28 sm:pb-0">
      <div className="rounded-3xl bg-white/70 border border-blush/60 p-5 md:p-7 shadow-soft">
        <Input
          label="Your name"
          placeholder="e.g. Aarav Menon"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          maxLength={60}
          required
        />

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-charcoal/70">
            <Sparkles size={14} className="text-champagne" />
            {remaining} of {MAX_PER_GUEST} photos remaining
          </span>
          <span className="text-charcoal/50">You&rsquo;ve shared {usedCount}</span>
        </div>
      </div>

      <Dropzone onFiles={addFiles} disabled={disabled || isUploading} remaining={remaining} />

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {files.map((f, i) => (
            <PhotoPreview
              key={`${f.name}-${i}`}
              file={f}
              onRemove={isUploading ? null : () => removeAt(i)}
              progress={fileProgress[`${f.name}-${i}`]}
            />
          ))}
        </div>
      )}

      {isUploading && <UploadProgress progress={fileProgress} />}

      {/* Desktop submit */}
      <div className="hidden sm:flex items-center justify-end">
        <Button type="submit" disabled={disabled || isUploading || !files.length} size="lg">
          <Camera size={16} />
          {submitLabel}
        </Button>
      </div>

      {/* Sticky mobile submit — only when there's something to send */}
      {files.length > 0 && (
        <div
          className="sm:hidden fixed inset-x-0 bottom-0 z-30 px-4 pt-3 bg-cream/95 backdrop-blur border-t border-blush/60"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
        >
          <Button
            type="submit"
            disabled={disabled || isUploading}
            size="lg"
            className="w-full"
          >
            <Camera size={16} /> {submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
}
