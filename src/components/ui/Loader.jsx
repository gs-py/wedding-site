export default function Loader({ label = 'Loading…', className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-12 text-burgundy/70 ${className}`}>
      <span className="inline-block h-5 w-5 rounded-full border-2 border-champagne border-t-transparent animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
