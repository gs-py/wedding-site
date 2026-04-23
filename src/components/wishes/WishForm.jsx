import { useState } from 'react';
import { Send } from 'lucide-react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { useGuest } from '../../context/GuestContext.jsx';

export default function WishForm({ onSubmit }) {
  const { guestName, setGuestName } = useGuest();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const remaining = 500 - message.length;

  const handle = async (e) => {
    e.preventDefault();
    setBusy(true);
    const ok = await onSubmit({ guest_name: guestName, message });
    setBusy(false);
    if (ok) setMessage('');
  };

  return (
    <form onSubmit={handle} className="rounded-3xl bg-white/70 border border-blush/60 p-5 md:p-7 shadow-soft space-y-4">
      <Input
        label="Your name"
        placeholder="e.g. Aarav Menon"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        maxLength={60}
        required
      />
      <div>
        <Input
          as="textarea"
          label="Your wish"
          placeholder="Write something kind, funny, sweet — they'll read every word."
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 500))}
          maxLength={500}
          required
        />
        <div className={`text-xs mt-1 text-right ${remaining < 40 ? 'text-burgundy' : 'text-charcoal/50'}`}>
          {remaining} characters left
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={busy}>
          <Send size={15} /> {busy ? 'Sending…' : 'Share your wish'}
        </Button>
      </div>
    </form>
  );
}
