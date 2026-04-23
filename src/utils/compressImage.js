import imageCompression from 'browser-image-compression';

export async function compressImage(file) {
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 2,
      maxWidthOrHeight: 2400,
      useWebWorker: true,
      initialQuality: 0.85,
    });
    // imageCompression returns a Blob-like File; ensure we have a real File with a safe name
    return new File([compressed], file.name, {
      type: compressed.type || file.type,
      lastModified: Date.now(),
    });
  } catch (err) {
    console.warn('[compressImage] falling back to original:', err);
    return file;
  }
}
