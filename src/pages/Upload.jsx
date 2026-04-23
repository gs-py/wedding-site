import UploadForm from '../components/upload/UploadForm.jsx';

export default function Upload() {
  return (
    <section className="px-5 md:px-8 py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-champagne mb-3">Guest gallery</p>
          <h1 className="font-serif text-4xl md:text-5xl text-burgundy">Share your photos</h1>
          <p className="mt-3 text-charcoal/70 md:text-[17px]">
            Add up to <strong>10 photos</strong> from the day. The ones you loved, the candid
            ones, the blurry-but-heartfelt ones — we want them all.
          </p>
        </header>
        <UploadForm />
      </div>
    </section>
  );
}
