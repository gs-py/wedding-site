const VENUE = import.meta.env.VITE_VENUE_NAME || 'Grand Hyatt, Kochi';
const ADDRESS = import.meta.env.VITE_VENUE_ADDRESS || '';
const QUERY = import.meta.env.VITE_VENUE_MAP_QUERY || VENUE;

export default function VenueMap() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(QUERY)}&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(QUERY)}`;

  return (
    <div className="rounded-3xl overflow-hidden border border-blush/60 shadow-soft bg-white/70">
      <div className="aspect-[16/10] w-full">
        <iframe
          title={`Map to ${VENUE}`}
          src={src}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl text-burgundy">{VENUE}</h3>
          {ADDRESS && <p className="text-sm text-charcoal/70 mt-1">{ADDRESS}</p>}
        </div>
        <a
          href={openUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-burgundy text-cream px-4 py-2 text-sm hover:bg-burgundy/90"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
