import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function safeName(s) {
  return String(s || 'guest').replace(/[^\w\-]+/g, '_').slice(0, 40);
}

function extFromUrl(url, fallback = 'jpg') {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\.(jpe?g|png|webp)$/i);
    return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : fallback;
  } catch {
    return fallback;
  }
}

export async function downloadAllAsZip(photos, onProgress) {
  const zip = new JSZip();
  let done = 0;

  for (const p of photos) {
    try {
      const res = await fetch(p.image_url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const ext = extFromUrl(p.image_url);
      zip.file(`${safeName(p.guest_name)}_${p.id.slice(0, 8)}.${ext}`, blob);
    } catch (err) {
      console.warn('Failed to fetch', p.image_url, err);
    }
    done += 1;
    onProgress?.(done, photos.length);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const stamp = new Date().toISOString().slice(0, 10);
  saveAs(blob, `wedding-photos-${stamp}.zip`);
}
