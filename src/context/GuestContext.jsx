import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getGuestId, getGuestName, setGuestName as persistName } from '../utils/guestId.js';

const GuestContext = createContext(null);

export function GuestProvider({ children }) {
  const [guestId] = useState(() => getGuestId());
  const [guestName, setGuestNameState] = useState(() => getGuestName());

  useEffect(() => {
    persistName(guestName);
  }, [guestName]);

  const value = useMemo(
    () => ({
      guestId,
      guestName,
      setGuestName: (n) => setGuestNameState(n ?? ''),
    }),
    [guestId, guestName],
  );

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error('useGuest must be used inside <GuestProvider>');
  return ctx;
}
