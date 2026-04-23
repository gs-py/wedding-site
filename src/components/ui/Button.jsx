export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cream';
  const variants = {
    primary:
      'bg-burgundy text-cream hover:bg-burgundy/90 shadow-soft',
    secondary:
      'bg-blush text-burgundy hover:bg-blush/80',
    outline:
      'border border-champagne text-burgundy hover:bg-champagne/10',
    ghost: 'text-burgundy hover:bg-blush/50',
  };
  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-[15px]',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
