const BRIDE = import.meta.env.VITE_BRIDE_NAME || 'Priya';
const GROOM = import.meta.env.VITE_GROOM_NAME || 'Arjun';

export default function WelcomeMessage() {
  return (
    <section className="px-5 md:px-8 pb-14">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-3xl bg-white/70 border border-blush/70 shadow-soft px-6 py-10 md:px-12 md:py-14 animate-fade-in-up">
          <span className="block font-serif italic text-champagne text-xl mb-4">
            — A little note from us —
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-burgundy mb-5">
            Thank you for being here
          </h2>
          <p className="text-charcoal/80 leading-relaxed md:text-[17px]">
            We met on a rainy Tuesday, over bad coffee and a shared playlist, and somehow
            nothing has ever felt that ordinary since. Getting to celebrate this moment
            with the people who made us who we are — you — is everything.
          </p>
          <p className="text-charcoal/80 leading-relaxed md:text-[17px] mt-4">
            Please snap lots of photos, share them here, and leave us a note. We'll read
            every single one.
          </p>
          <p className="mt-6 font-serif text-xl text-burgundy">
            With love, {BRIDE} & {GROOM}
          </p>
        </div>
      </div>
    </section>
  );
}
