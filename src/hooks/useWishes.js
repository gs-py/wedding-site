import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase.js';

export function useWishes() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setWishes(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addWish = useCallback(async ({ guest_name, message }) => {
    const name = guest_name?.trim();
    const msg = message?.trim();
    if (!name || !msg) {
      toast.error('Please add your name and a message');
      return false;
    }
    if (msg.length > 500) {
      toast.error('Message must be 500 characters or fewer');
      return false;
    }
    const { data, error } = await supabase
      .from('wishes')
      .insert({ guest_name: name, message: msg })
      .select()
      .single();
    if (error) {
      toast.error('Could not post your wish');
      return false;
    }
    setWishes((prev) => [data, ...prev]);
    toast.success('Wish shared 💛');
    return true;
  }, []);

  const removeWish = useCallback((id) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return { wishes, loading, addWish, refresh: fetchAll, removeWish };
}
