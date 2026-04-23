import { Phone, Shirt } from 'lucide-react';
import EventSchedule from '../components/event/EventSchedule.jsx';
import VenueMap from '../components/event/VenueMap.jsx';

const DATE = import.meta.env.VITE_WEDDING_DATE || '2025-12-15T18:00:00';
const VENUE = import.meta.env.VITE_VENUE_NAME || 'Grand Hyatt, Kochi';
const DRESS = import.meta.env.VITE_DRESS_CODE || 'Traditional Indian attire preferred';
const CONTACT_NAME = import.meta.env.VITE_CONTACT_NAME || 'Rhea (Maid of Honor)';
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || '+91 98765 43210';

export default function Event() {
  const d = new Date(DATE);
  const niceDate = isNaN(d)
    ? DATE
    : d.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
  const niceTime = isNaN(d)
    ? ''
    : d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  return (
    <section className="px-5 md:px-8 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-champagne mb-3">The celebration</p>
          <h1 className="font-serif text-4xl md:text-5xl text-burgundy">Event Details</h1>
          <p className="mt-3 text-charcoal/70">
            {niceDate}
            {niceTime && ` · ${niceTime}`} · {VENUE}
          </p>
        </header>

        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-burgundy mb-4">Schedule</h2>
            <EventSchedule />
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-burgundy mb-4">Venue</h2>
            <VenueMap />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/70 border border-blush/60 shadow-soft p-5 flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-blush flex items-center justify-center text-burgundy shrink-0">
                <Shirt size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-burgundy">Dress Code</h3>
                <p className="text-charcoal/80 mt-2 text-[15px]">{DRESS}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/70 border border-blush/60 shadow-soft p-5 flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-blush flex items-center justify-center text-burgundy shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-burgundy">Questions?</h3>
                <p className="text-charcoal/80 mt-2 text-[15px]">
                  {CONTACT_NAME}
                  <br />
                  <a href={`tel:${CONTACT_PHONE}`} className="text-burgundy underline-offset-4 hover:underline">
                    {CONTACT_PHONE}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
