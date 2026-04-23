import { useState } from 'react';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { supabase } from '../../lib/supabase.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message || 'Login failed');
      return;
    }
    toast.success('Welcome back 💛');
  };

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={handle}
        className="rounded-3xl bg-white/70 border border-blush/60 p-6 md:p-8 shadow-soft space-y-4"
      >
        <header className="text-center mb-2">
          <p className="uppercase tracking-[0.3em] text-xs text-champagne mb-2">Private</p>
          <h1 className="font-serif text-3xl text-burgundy">Admin Sign In</h1>
          <p className="text-sm text-charcoal/60 mt-1">For the couple &amp; family only</p>
        </header>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={busy} className="w-full" size="lg">
          <LogIn size={16} /> {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
