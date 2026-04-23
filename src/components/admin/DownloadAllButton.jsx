import { useState } from 'react';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button.jsx';
import { supabase } from '../../lib/supabase.js';
import { downloadAllAsZip } from '../../utils/downloadZip.js';

export default function DownloadAllButton() {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handle = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('id, guest_name, image_url')
        .order('uploaded_at', { ascending: true });
      if (error) throw error;
      if (!data?.length) {
        toast('No photos to download', { icon: '📂' });
        return;
      }
      setProgress({ done: 0, total: data.length });
      await downloadAllAsZip(data, (done, total) => setProgress({ done, total }));
      toast.success('Download ready');
    } catch (err) {
      console.error(err);
      toast.error('Download failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button onClick={handle} disabled={busy}>
        <Download size={16} />
        {busy
          ? progress.total
            ? `Zipping ${progress.done}/${progress.total}`
            : 'Preparing…'
          : 'Download all photos (.zip)'}
      </Button>
    </div>
  );
}
