export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_BYTES = 10 * 1024 * 1024; // 10MB
export const MAX_PER_GUEST = 10;

export function validateFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, reason: `${file.name}: only JPEG, PNG, or WebP allowed` };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, reason: `${file.name}: exceeds 10MB` };
  }
  return { ok: true };
}
