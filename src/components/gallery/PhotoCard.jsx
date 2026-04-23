import HeartButton from './HeartButton.jsx';

export default function PhotoCard({ photo, hearted, onHeart, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.(photo)}
      className="group relative w-full overflow-hidden rounded-2xl bg-blush/40 shadow-soft block"
    >
      <img
        src={photo.image_url}
        alt={`Photo by ${photo.guest_name}`}
        loading="lazy"
        className="w-full h-auto object-cover transition duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition">
        <span className="text-cream text-sm font-medium drop-shadow truncate max-w-[60%]">
          {photo.guest_name}
        </span>
      </div>
      <div className="absolute top-2 right-2">
        <HeartButton active={hearted} count={photo.hearts_count} onToggle={() => onHeart?.(photo)} />
      </div>
    </button>
  );
}
