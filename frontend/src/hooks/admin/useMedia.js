import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

/**
 * Domain: Media library (upload gambar, pencarian, hapus, salin URL).
 */
export default function useMedia({ token, showMsg, openConfirm }) {
  const [mediaList, setMediaList] = useState([]);
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaUploadFile, setMediaUploadFile] = useState(null);
  const [mediaAltText, setMediaAltText] = useState('');
  const [mediaCaption, setMediaCaption] = useState('');
  const [mediaUploading, setMediaUploading] = useState(false);
  const mediaFileRef = useRef(null);

  const fetchMedia = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/media`, {
        headers: { Authorization: `Bearer ${token}` },
        params: mediaSearch ? { search: mediaSearch } : {}
      });
      setMediaList(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token, mediaSearch]);

  const handleMediaUpload = async (e) => {
    e.preventDefault();
    if (!mediaUploadFile) { showMsg('Pilih file gambar terlebih dahulu.', 'error'); return; }
    const formData = new FormData();
    formData.append('image', mediaUploadFile);
    formData.append('alt_text', mediaAltText);
    formData.append('caption', mediaCaption);
    setMediaUploading(true);
    try {
      await axios.post(`${API_URL}/media`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      showMsg('Media berhasil diunggah ke Media Library!');
      setMediaUploadFile(null); setMediaAltText(''); setMediaCaption('');
      if (mediaFileRef.current) mediaFileRef.current.value = '';
      fetchMedia();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal mengunggah media.', 'error');
    } finally { setMediaUploading(false); }
  };

  const deleteMedia = (id) => {
    openConfirm({
      title: 'Hapus Berkas Media',
      message: 'Apakah Anda yakin ingin menghapus file media ini? Halaman atau komponen yang menggunakan file ini mungkin tidak dapat menampilkannya lagi.',
      confirmText: 'Ya, Hapus Media',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/media/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          showMsg('Media berhasil dihapus.');
          fetchMedia();
        } catch { showMsg('Gagal menghapus media.', 'error'); }
      }
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => showMsg('URL disalin ke clipboard!'));
  };

  return {
    mediaList, mediaSearch, setMediaSearch, mediaUploadFile, setMediaUploadFile,
    mediaAltText, setMediaAltText, mediaCaption, setMediaCaption,
    mediaUploading, mediaFileRef, fetchMedia, handleMediaUpload,
    deleteMedia, copyToClipboard
  };
}
