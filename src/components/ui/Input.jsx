export default function Input({ label, error, className = '', as = 'input', ...rest }) {
  const Tag = as;
  return (
    <label className={`block w-full ${className}`}>
      {label && (
        <span className="block text-sm font-medium text-burgundy/80 mb-1.5">{label}</span>
      )}
      <Tag
        className={`w-full rounded-xl border border-champagne/40 bg-white/80 px-4 py-3 text-charcoal placeholder:text-charcoal/40 shadow-sm transition focus:border-champagne focus:bg-white focus:outline-none focus:ring-2 focus:ring-champagne/30 ${
          as === 'textarea' ? 'min-h-[120px] resize-y' : ''
        }`}
        {...rest}
      />
      {error && <span className="block text-xs text-burgundy mt-1">{error}</span>}
    </label>
  );
}
