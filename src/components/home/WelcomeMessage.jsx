const BRIDE = import.meta.env.VITE_BRIDE_NAME || 'Hazhlit Mahima';
const GROOM = import.meta.env.VITE_GROOM_NAME || 'Joel Joseph';
const BRIDE_PARENTS = import.meta.env.VITE_BRIDE_PARENTS || '';
const GROOM_PARENTS = import.meta.env.VITE_GROOM_PARENTS || '';
const QUOTE = import.meta.env.VITE_WEDDING_QUOTE || '';
const QUOTE_REF = import.meta.env.VITE_WEDDING_QUOTE_REF || '';
const VENUE = import.meta.env.VITE_VENUE_NAME || '';
const ADDRESS = import.meta.env.VITE_VENUE_ADDRESS || '';
const DATE = import.meta.env.VITE_WEDDING_DATE || '';

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function fmtTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function WelcomeMessage() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pb-14">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-3xl bg-white/70 border border-blush/70 shadow-soft px-5 py-10 sm:px-8 md:px-12 md:py-14 animate-fade-in-up">
          {QUOTE && (
            <>
              <p className="font-serif italic text-burgundy/90 text-lg md:text-xl leading-relaxed">
                &ldquo;{QUOTE}&rdquo;
              </p>
              {QUOTE_REF && (
                <p className="mt-1 text-xs sm:text-sm text-champagne tracking-[0.25em] uppercase">
                  {QUOTE_REF}
                </p>
              )}
              <div className="mx-auto my-7 h-px w-20 bg-champagne/50" />
            </>
          )}

          {GROOM_PARENTS && (
            <p className="font-serif text-base sm:text-lg text-burgundy/90">
              {GROOM_PARENTS}
            </p>
          )}
          <p className="mt-3 text-charcoal/75 text-[15px] sm:text-base leading-relaxed">
            cordially request the honour of your presence
            <br className="hidden sm:block" />
            with your family on the auspicious occasion of the
            <br className="hidden sm:block" />
            wedding of our son
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl text-burgundy mt-6 mb-2">{GROOM}</h2>
          <p className="font-serif italic text-champagne text-lg">weds</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-burgundy mt-2">{BRIDE}</h2>

          {BRIDE_PARENTS && (
            <p className="mt-4 text-charcoal/70 text-sm sm:text-base">
              D/o {BRIDE_PARENTS}
            </p>
          )}

          <div className="mx-auto my-7 h-px w-20 bg-champagne/50" />

          {DATE && (
            <p className="font-serif text-burgundy text-xl sm:text-2xl">
              {fmtDate(DATE)}
              <span className="block text-champagne text-sm tracking-[0.2em] uppercase mt-1.5">
                {fmtTime(DATE)} onwards
              </span>
            </p>
          )}

          {VENUE && (
            <p className="mt-5 font-serif text-lg text-burgundy/90">{VENUE}</p>
          )}
          {ADDRESS && (
            <p className="text-sm text-charcoal/65 mt-1 leading-relaxed">{ADDRESS}</p>
          )}
        </div>
      </div>
    </section>
  );
}
