export default function UploadProgress({ progress }) {
  const entries = Object.entries(progress ?? {});
  if (!entries.length) return null;

  const avg =
    entries.reduce((s, [, v]) => s + (v?.progress ?? 0), 0) / entries.length;

  return (
    <div className="rounded-2xl bg-white/70 border border-blush/50 px-5 py-4">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-burgundy font-medium">Uploading photos…</span>
        <span className="text-charcoal/60">{Math.round(avg)}%</span>
      </div>
      <div className="h-2 rounded-full bg-blush/60 overflow-hidden">
        <div
          className="h-full bg-champagne transition-all"
          style={{ width: `${avg}%` }}
        />
      </div>
    </div>
  );
}
