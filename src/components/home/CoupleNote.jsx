const BRIDE = import.meta.env.VITE_BRIDE_NAME || 'Hazhlit';
const GROOM = import.meta.env.VITE_GROOM_NAME || 'Joel';

export default function CoupleNote() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pb-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-3xl bg-white/70 border border-blush/70 shadow-soft px-5 py-9 sm:px-8 md:px-12 md:py-14 animate-fade-in-up">
          <span className="block font-serif italic text-champagne text-lg sm:text-xl mb-3 sm:mb-4">
            — A little note from us —
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-burgundy mb-5">
            Our Story
          </h2>

          <p className="text-charcoal/80 leading-relaxed text-[15px] sm:text-[17px]">
            We met without a plan, just as friends crossing paths, never imagining our
            story would lead here. Somewhere along the way, in quiet conversations and
            unspoken understanding, it became clear&mdash;this was not chance, but grace.
            In His perfect time, what began simply grew into something certain, as
            though our hearts were being gently aligned all along.{' '}
            <span className="italic text-burgundy/90">
              &ldquo;He has made everything beautiful in its time&rdquo;
            </span>
            &mdash;and in that truth, we found each other, not by our design, but by His.
          </p>

          <p className="mt-4 text-charcoal/80 leading-relaxed text-[15px] sm:text-[17px]">
            With grateful hearts, we are truly happy to have you be a part of our
            special day, as we step into this beautiful promise together.
          </p>

          <p className="mt-6 font-serif text-lg sm:text-xl text-burgundy">
            With love, {GROOM} &amp; {BRIDE}
          </p>
        </div>
      </div>
    </section>
  );
}
