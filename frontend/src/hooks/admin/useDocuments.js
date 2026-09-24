import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const EMPTY_DOC_FORM = {
  doc_title: '', doc_number: '', doc_date: '', description: '', file_url: ''
};

export default function useDocuments({ token, showMsg, setLoading, setEditingItem, setIsAdding, openConfirm }) {
  const [documents, setDocuments] = useState([]);
  const [docSearch, setDocSearch] = useState('');
  const [docForm, setDocForm] = useState(EMPTY_DOC_FORM);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/documents`, {
        headers: { Authorization: `Bearer ${token}` },
        params: docSearch ? { search: docSearch } : {}
      });
      setDocuments(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token, docSearch]);

  const saveDocument = async (e, editingItem) => {
    e.preventDefault();
    if (!docForm.file_url) { showMsg('Upload dokumen terlebih dahulu.', 'error'); return; }
    setLoading(true);
    try {
      const payload = { ...docForm };
      if (editingItem) {
        await axios.put(`${API_URL}/documents/${editingItem.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Dokumen berhasil diperbarui!');
      } else {
        await axios.post(`${API_URL}/documents/by-url`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Dokumen berhasil ditambahkan ke Pustaka!');
      }
      setIsAdding(false); setEditingItem(null);
      setDocForm(EMPTY_DOC_FORM);
      fetchDocuments();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan dokumen.', 'error');
    } finally { setLoading(false); }
  };

  const deleteDocument = (id) => {
    openConfirm({
      title: 'Hapus Dokumen',
      message: 'Apakah Anda yakin ingin menghapus dokumen ini dari pustaka dokumen?',
      confirmText: 'Ya, Hapus Dokumen',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/documents/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          showMsg('Dokumen berhasil dihapus.');
          fetchDocuments();
        } catch { showMsg('Gagal menghapus dokumen.', 'error'); }
      }
    });
  };

  return {
    documents, docSearch, setDocSearch, docForm, setDocForm,
    fetchDocuments, saveDocument, deleteDocument
  };
}
