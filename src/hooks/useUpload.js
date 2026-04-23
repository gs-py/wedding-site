import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase, PHOTO_BUCKET } from '../lib/supabase.js';
import { useGuest } from '../context/GuestContext.jsx';
import { compressImage } from '../utils/compressImage.js';
import { validateFile, MAX_PER_GUEST } from '../utils/validateFile.js';

export function useUpload() {
  const { guestId, guestName } = useGuest();
  const [usedCount, setUsedCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  /** @type {[Record<string, {progress:number, status:'pending'|'uploading'|'done'|'error'}>, Function]} */
  const [fileProgress, setFileProgress] = useState({});

  const refreshCount = useCallback(async () => {
    if (!guestId) return;
    const { count, error } = await supabase
      .from('photos')
      .select('*', { count: 'exact', head: true })
      .eq('guest_id', guestId);
    if (!error) setUsedCount(count ?? 0);
  }, [guestId]);

  useEffect(() => {
    refreshCount();
  }, [refreshCount]);

  const remaining = Math.max(0, MAX_PER_GUEST - usedCount);

  const uploadFiles = useCallback(
    async (files) => {
      if (!guestName?.trim()) {
        toast.error('Please enter your name first');
        return { uploaded: 0 };
      }
      if (!files?.length) return { uploaded: 0 };

      // Validate up front
      const valid = [];
      for (const f of files) {
        const v = validateFile(f);
        if (!v.ok) {
          toast.error(v.reason);
        } else {
          valid.push(f);
        }
      }
      if (!valid.length) return { uploaded: 0 };

      if (valid.length > remaining) {
        toast.error(`You can only upload ${remaining} more photo${remaining === 1 ? '' : 's'}.`);
        return { uploaded: 0 };
      }

      setIsUploading(true);
      let uploaded = 0;

      const initial = {};
      valid.forEach((f, i) => {
        initial[`${f.name}-${i}`] = { progress: 0, status: 'pending' };
      });
      setFileProgress(initial);

      for (let i = 0; i < valid.length; i += 1) {
        const file = valid[i];
        const key = `${file.name}-${i}`;
        try {
          setFileProgress((p) => ({ ...p, [key]: { progress: 10, status: 'uploading' } }));
          const compressed = await compressImage(file);
          setFileProgress((p) => ({ ...p, [key]: { progress: 45, status: 'uploading' } }));

          const ext =
            (compressed.type && compressed.type.split('/')[1]?.replace('jpeg', 'jpg')) || 'jpg';
          const path = `${guestId}/${Date.now()}_${i}_${Math.random()
            .toString(36)
            .slice(2, 8)}.${ext}`;

          const { error: upErr } = await supabase.storage
            .from(PHOTO_BUCKET)
            .upload(path, compressed, {
              cacheControl: '3600',
              upsert: false,
              contentType: compressed.type || 'image/jpeg',
            });
          if (upErr) throw upErr;

          setFileProgress((p) => ({ ...p, [key]: { progress: 80, status: 'uploading' } }));

          const { data: pub } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);
          const image_url = pub?.publicUrl;

          const { error: dbErr } = await supabase.from('photos').insert({
            guest_name: guestName.trim(),
            guest_id: guestId,
            image_url,
            storage_path: path,
          });
          if (dbErr) throw dbErr;

          setFileProgress((p) => ({ ...p, [key]: { progress: 100, status: 'done' } }));
          uploaded += 1;
        } catch (err) {
          console.error('[upload]', err);
          setFileProgress((p) => ({ ...p, [key]: { progress: 0, status: 'error' } }));
          toast.error(`Failed: ${file.name}`);
        }
      }

      setIsUploading(false);
      await refreshCount();
      if (uploaded) toast.success(`${uploaded} photo${uploaded === 1 ? '' : 's'} uploaded 💛`);
      return { uploaded };
    },
    [guestId, guestName, remaining, refreshCount],
  );

  return { uploadFiles, remaining, usedCount, isUploading, fileProgress, refreshCount };
}
