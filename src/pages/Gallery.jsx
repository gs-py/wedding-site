import { useCallback, useMemo, useState } from 'react';
import { Clock, Heart } from 'lucide-react';
import PhotoGrid from '../components/gallery/PhotoGrid.jsx';
import Lightbox from '../components/gallery/Lightbox.jsx';
import Loader from '../components/ui/Loader.jsx';
import { usePhotos } from '../hooks/usePhotos.js';
import { useHearts } from '../hooks/useHearts.js';

export default function Gallery() {
  const [sort, setSort] = useState('latest');
  const { photos, loading, hasMore, loadMore, applyHeartDelta } = usePhotos(sort);
  const { hearted, toggle } = useHearts();
  const [openIdx, setOpenIdx] = useState(null);

  const openPhoto = useMemo(
    () => (openIdx === null ? null : photos[openIdx] ?? null),
    [openIdx, photos],
  );

  const handleHeart = useCallback(
    async (photo) => {
      const delta = await toggle(photo.id);
      if (delta) applyHeartDelta(photo.id, delta);
    },
    [toggle, applyHeartDelta],
  );

  const onOpen = useCallback(
    (photo) => {
      const idx = photos.findIndex((p) => p.id === photo.id);
      if (idx >= 0) setOpenIdx(idx);
    },
    [photos],
  );

  return (
    <section className="px-5 md:px-8 py-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-8">
          <p className="uppercase tracking-[0.3em] text-xs text-champagne mb-3">Every beautiful moment</p>
          <h1 className="font-serif text-4xl md:text-5xl text-burgundy">Gallery</h1>
        </header>

        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setSort('latest')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
              sort === 'latest'
                ? 'bg-burgundy text-cream shadow-soft'
                : 'bg-white/70 text-burgundy hover:bg-blush'
            }`}
          >
            <Clock size={15} /> Latest
          </button>
          <button
            onClick={() => setSort('loved')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
              sort === 'loved'
                ? 'bg-burgundy text-cream shadow-soft'
                : 'bg-white/70 text-burgundy hover:bg-blush'
            }`}
          >
            <Heart size={15} /> Most Loved
          </button>
        </div>

        <PhotoGrid
          photos={photos}
          hearted={hearted}
          onHeart={handleHeart}
          onOpen={onOpen}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />

        {loading && <Loader label="Loading photos…" />}
      </div>

      <Lightbox
        photo={openPhoto}
        hearted={openPhoto ? hearted.has(openPhoto.id) : false}
        onHeart={openPhoto ? () => handleHeart(openPhoto) : undefined}
        onClose={() => setOpenIdx(null)}
        onPrev={() =>
          setOpenIdx((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
        }
        onNext={() => setOpenIdx((i) => (i === null ? i : (i + 1) % photos.length))}
      />
    </section>
  );
}
