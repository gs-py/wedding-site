import { useEffect, useRef } from 'react';
import PhotoCard from './PhotoCard.jsx';

export default function PhotoGrid({
  photos,
  hearted,
  onHeart,
  onOpen,
  onLoadMore,
  hasMore,
  loading,
}) {
  const sentinel = useRef(null);

  useEffect(() => {
    if (!sentinel.current || !hasMore) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) onLoadMore?.();
      },
      { rootMargin: '400px' },
    );
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [hasMore, loading, onLoadMore]);

  if (!photos.length && !loading) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-2xl text-burgundy mb-2">No photos yet</p>
        <p className="text-charcoal/60 text-sm">Be the first to share a moment from the day.</p>
      </div>
    );
  }

  return (
    <>
      <div className="masonry columns-2 md:columns-3 lg:columns-4">
        {photos.map((p) => (
          <PhotoCard
            key={p.id}
            photo={p}
            hearted={hearted.has(p.id)}
            onHeart={onHeart}
            onOpen={onOpen}
          />
        ))}
      </div>
      <div ref={sentinel} className="h-8" />
    </>
  );
}
