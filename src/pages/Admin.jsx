import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminLogin from '../components/admin/AdminLogin.jsx';
import AdminDashboard from '../components/admin/AdminDashboard.jsx';
import Loader from '../components/ui/Loader.jsx';
import { supabase } from '../lib/supabase.js';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
  };

  return (
    <section className="px-5 md:px-8 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        {loading ? (
          <Loader label="Checking session…" />
        ) : session ? (
          <AdminDashboard session={session} onSignOut={signOut} />
        ) : (
          <AdminLogin />
        )}
      </div>
    </section>
  );
}
