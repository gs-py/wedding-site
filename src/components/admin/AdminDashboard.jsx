import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image as ImageIcon, Users, MessageCircleHeart, LogOut, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button.jsx';
import Loader from '../ui/Loader.jsx';
import DownloadAllButton from './DownloadAllButton.jsx';
import { supabase, PHOTO_BUCKET } from '../../lib/supabase.js';

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 border border-blush/60 shadow-soft p-5 flex items-center gap-4">
      <div className="h-11 w-11 rounded-full bg-blush text-burgundy flex items-center justify-center">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-champagne">{label}</p>
        <p className="font-serif text-3xl text-burgundy leading-tight">{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard({ session, onSignOut }) {
  const [photos, setPhotos] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [{ data: ph }, { data: ws }] = await Promise.all([
      supabase.from('photos').select('*').order('uploaded_at', { ascending: false }),
      supabase.from('wishes').select('*').order('created_at', { ascending: false }),
    ]);
    setPhotos(ph ?? []);
    setWishes(ws ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const guestStats = useMemo(() => {
    const map = new Map();
    for (const p of photos) {
      const k = p.guest_id;
      const cur = map.get(k) ?? { guest_id: k, guest_name: p.guest_name, count: 0 };
      cur.count += 1;
      map.set(k, cur);
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [photos]);

  const deletePhoto = async (photo) => {
    if (!confirm(`Delete photo by ${photo.guest_name}?`)) return;
    try {
      if (photo.storage_path) {
        await supabase.storage.from(PHOTO_BUCKET).remove([photo.storage_path]);
      }
      const { error } = await supabase.from('photos').delete().eq('id', photo.id);
      if (error) throw error;
      setPhotos((p) => p.filter((x) => x.id !== photo.id));
      toast.success('Photo removed');
    } catch (err) {
      console.error(err);
      toast.error('Could not delete');
    }
  };

  const deleteWish = async (wish) => {
    if (!confirm(`Delete wish from ${wish.guest_name}?`)) return;
    const { error } = await supabase.from('wishes').delete().eq('id', wish.id);
    if (error) {
      toast.error('Could not delete');
      return;
    }
    setWishes((w) => w.filter((x) => x.id !== wish.id));
    toast.success('Wish removed');
  };

  if (loading) return <Loader label="Loading dashboard…" />;

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-champagne mb-2">Admin</p>
          <h1 className="font-serif text-4xl text-burgundy">Dashboard</h1>
          <p className="text-sm text-charcoal/60 mt-1">Signed in as {session.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <DownloadAllButton />
          <Button variant="outline" onClick={onSignOut}>
            <LogOut size={15} /> Sign out
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat icon={ImageIcon} label="Total photos" value={photos.length} />
        <Stat icon={Users} label="Unique guests" value={guestStats.length} />
        <Stat icon={MessageCircleHeart} label="Wishes" value={wishes.length} />
      </div>

      <section>
        <h2 className="font-serif text-2xl text-burgundy mb-3">Uploads per guest</h2>
        <div className="rounded-2xl bg-white/70 border border-blush/60 shadow-soft divide-y divide-blush/40 overflow-hidden">
          {guestStats.length === 0 && (
            <p className="p-5 text-charcoal/60 text-sm">No uploads yet.</p>
          )}
          {guestStats.map((g) => (
            <div key={g.guest_id} className="flex items-center justify-between px-5 py-3">
              <span className="font-medium text-charcoal/90">{g.guest_name}</span>
              <span className="text-burgundy tabular-nums">{g.count} / 10</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-burgundy mb-3">Photos</h2>
        {photos.length === 0 ? (
          <p className="text-charcoal/60 text-sm">No photos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((p) => (
              <div key={p.id} className="relative group rounded-xl overflow-hidden border border-blush/60">
                <img src={p.image_url} alt="" loading="lazy" className="w-full h-40 object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-charcoal/80 to-transparent text-cream text-xs flex items-center justify-between">
                  <span className="truncate">{p.guest_name}</span>
                  <span>♥ {p.hearts_count ?? 0}</span>
                </div>
                <button
                  onClick={() => deletePhoto(p)}
                  className="absolute top-2 right-2 rounded-full bg-cream/90 p-1.5 text-burgundy opacity-0 group-hover:opacity-100 transition hover:bg-blush"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl text-burgundy mb-3">Wishes</h2>
        {wishes.length === 0 ? (
          <p className="text-charcoal/60 text-sm">No wishes yet.</p>
        ) : (
          <div className="space-y-3">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="rounded-xl border border-blush/60 bg-white/70 shadow-soft p-4 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-charcoal/90 whitespace-pre-wrap">{w.message}</p>
                  <p className="text-xs text-charcoal/50 mt-2">
                    — {w.guest_name} ·{' '}
                    {new Date(w.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <button
                  onClick={() => deleteWish(w)}
                  className="shrink-0 rounded-full p-2 text-burgundy hover:bg-blush"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
