import WishCard from './WishCard.jsx';

export default function WishesWall({ wishes }) {
  if (!wishes.length) {
    return (
      <div className="text-center py-14">
        <p className="font-serif text-2xl text-burgundy mb-1">No wishes yet</p>
        <p className="text-charcoal/60 text-sm">Be the first to leave a note.</p>
      </div>
    );
  }
  return (
    <div className="masonry columns-1 md:columns-2 lg:columns-3">
      {wishes.map((w) => (
        <WishCard key={w.id} wish={w} />
      ))}
    </div>
  );
}
