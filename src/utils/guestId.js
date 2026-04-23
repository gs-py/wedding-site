const KEY = 'wedding_guest_id';
const NAME_KEY = 'wedding_guest_name';

export function getGuestId() {
  let id = localStorage.getItem(KEY);
  if (!id) {
    id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `g_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function getGuestName() {
  return localStorage.getItem(NAME_KEY) ?? '';
}

export function setGuestName(name) {
  if (name && name.trim()) localStorage.setItem(NAME_KEY, name.trim());
}
