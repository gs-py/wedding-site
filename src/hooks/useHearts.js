import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useGuest } from '../context/GuestContext.jsx';

/** Tracks which photo IDs the current guest has hearted, with a toggle action. */
export function useHearts() {
  const { guestId } = useGuest();
  const [hearted, setHearted] = useState(() => new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('hearts')
        .select('photo_id')
        .eq('guest_id', guestId);
      if (!cancelled && !error) {
        setHearted(new Set((data ?? []).map((r) => r.photo_id)));
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [guestId]);

  /**
   * Toggles. Returns delta applied to the photo's hearts_count (+1 or -1), or 0 on failure.
   */
  const toggle = useCallback(
    async (photoId) => {
      const was = hearted.has(photoId);
      // optimistic
      setHearted((prev) => {
        const next = new Set(prev);
        was ? next.delete(photoId) : next.add(photoId);
        return next;
      });
      try {
        if (was) {
          const { error } = await supabase
            .from('hearts')
            .delete()
            .eq('photo_id', photoId)
            .eq('guest_id', guestId);
          if (error) throw error;
          return -1;
        }
        const { error } = await supabase
          .from('hearts')
          .insert({ photo_id: photoId, guest_id: guestId });
        if (error) throw error;
        return 1;
      } catch (err) {
        // revert on failure
        setHearted((prev) => {
          const next = new Set(prev);
          was ? next.add(photoId) : next.delete(photoId);
          return next;
        });
        console.error('[hearts]', err);
        return 0;
      }
    },
    [hearted, guestId],
  );

  return { hearted, toggle, loading };
}
