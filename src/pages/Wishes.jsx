import WishForm from '../components/wishes/WishForm.jsx';
import WishesWall from '../components/wishes/WishesWall.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useWishes } from '../hooks/useWishes.js';

export default function Wishes() {
  const { wishes, loading, addWish } = useWishes();

  return (
    <section className="px-5 md:px-8 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-champagne mb-3">Guestbook</p>
          <h1 className="font-serif text-4xl md:text-5xl text-burgundy">Wishes &amp; Blessings</h1>
          <p className="mt-3 text-charcoal/70">
            Leave a note for the couple. Big or small — every word matters.
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-12">
          <WishForm onSubmit={addWish} />
        </div>

        {loading ? <Loader label="Gathering wishes…" /> : <WishesWall wishes={wishes} />}
      </div>
    </section>
  );
}
