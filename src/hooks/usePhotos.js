import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const PAGE_SIZE = 24;

export function usePhotos(sort = 'latest') {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = useCallback(
    async (p, reset = false) => {
      setLoading(true);
      const from = p * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const col = sort === 'loved' ? 'hearts_count' : 'uploaded_at';
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order(col, { ascending: false })
        .range(from, to);

      if (!error && data) {
        setPhotos((prev) => (reset ? data : [...prev, ...data]));
        setHasMore(data.length === PAGE_SIZE);
      }
      setLoading(false);
    },
    [sort],
  );

  useEffect(() => {
    setPage(0);
    fetchPage(0, true);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  }, [page, loading, hasMore, fetchPage]);

  const applyHeartDelta = useCallback((photoId, delta) => {
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === photoId ? { ...p, hearts_count: Math.max(0, (p.hearts_count ?? 0) + delta) } : p,
      ),
    );
  }, []);

  const removePhoto = useCallback((photoId) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
  }, []);

  return { photos, loading, hasMore, loadMore, applyHeartDelta, removePhoto };
}
