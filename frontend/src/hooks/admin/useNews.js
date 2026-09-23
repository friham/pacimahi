import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const EMPTY_FORM = { title: '', content: '', image_url: '', category: 'berita', is_published: true };

/**
 * Domain: Berita / pengumuman / artikel.
 */
export default function useNews({ token, showMsg, setLoading, setEditingItem, setIsAdding, openConfirm }) {
  const [news, setNews] = useState([]);
  const [newsForm, setNewsForm] = useState(EMPTY_FORM);

  const fetchNews = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/news/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const saveNews = async (e, editingItem) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/news/${editingItem.id}`, newsForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Berita berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/news`, newsForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Berita baru berhasil ditambahkan');
      }
      setIsAdding(false);
      setEditingItem(null);
      setNewsForm(EMPTY_FORM);
      fetchNews();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan berita', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = (id) => {
    openConfirm({
      title: 'Hapus Berita',
      message: 'Apakah Anda yakin ingin menghapus artikel berita ini?',
      confirmText: 'Ya, Hapus Berita',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/news/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          showMsg('Berita berhasil dihapus');
          fetchNews();
        } catch {
          showMsg('Gagal menghapus berita', 'error');
        }
      }
    });
  };

  return { news, newsForm, setNewsForm, fetchNews, saveNews, deleteNews };
}
