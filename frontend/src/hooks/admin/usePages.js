import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const EMPTY_PAGE_FORM = {
  title: '', subtitle: '', slug: '', excerpt: '', content_html: '',
  status: 'draft', seo_title: '', meta_description: '', meta_keywords: '',
  menu_id: '', blocks: []
};

/**
 * Domain: Halaman CMS (pages + content_blocks) — termasuk helper blok
 * (tambah/edit/pindah/hapus blok & tabel) yang mengoperasikan pageForm.blocks.
 */
export default function usePages({ token, showMsg, setLoading, setEditingItem, setIsAdding, openConfirm }) {
  const [pages, setPages] = useState([]);
  const [pageForm, setPageForm] = useState(EMPTY_PAGE_FORM);
  const [pageSearch, setPageSearch] = useState('');
  const [pageStatusFilter, setPageStatusFilter] = useState('all');

  const fetchPages = useCallback(async () => {
    try {
      const params = {};
      if (pageStatusFilter && pageStatusFilter !== 'all') params.status = pageStatusFilter;
      if (pageSearch) params.search = pageSearch;
      const res = await axios.get(`${API_URL}/pages`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setPages(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token, pageStatusFilter, pageSearch]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === 'text' ? { html: '' }
             : type === 'image' ? { url: '', caption: '', alt: '' }
             : type === 'video' ? { url: '', title: '', caption: '' }
             : type === 'document' ? { file_url: '', doc_title: '', description: '' }
             : type === 'callout' ? { title: 'Informasi Penting', text: '' }
             : type === 'table' ? { headers: ['Kolom 1', 'Kolom 2', 'Kolom 3'], rows: [['', '', ''], ['', '', '']], has_header: true }
             : type === 'code' ? { html_code: '', css_code: '' }
             : {},
      settings: type === 'image' ? { align: 'center', width: '100%' } : {},
      sort_order: (pageForm.blocks || []).length + 1
    };
    setPageForm(prev => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlock]
    }));
  };

  const updateBlockContent = (index, field, value) => {
    setPageForm(prev => {
      const updated = [...(prev.blocks || [])];
      updated[index] = {
        ...updated[index],
        content: {
          ...(updated[index].content || {}),
          [field]: value
        }
      };
      return { ...prev, blocks: updated };
    });
  };

  const moveBlock = (index, direction) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= blocks.length) return prev;
      const temp = blocks[index];
      blocks[index] = blocks[targetIndex];
      blocks[targetIndex] = temp;
      const normalized = blocks.map((b, i) => ({ ...b, sort_order: i + 1 }));
      return { ...prev, blocks: normalized };
    });
  };

  const deleteBlock = (index) => {
    setPageForm(prev => ({
      ...prev,
      blocks: (prev.blocks || []).filter((_, i) => i !== index).map((b, i) => ({ ...b, sort_order: i + 1 }))
    }));
  };

  const updateTableHeader = (blockIndex, colIndex, value) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const headers = [...(blocks[blockIndex].content.headers || [])];
      headers[colIndex] = value;
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, headers } };
      return { ...prev, blocks };
    });
  };

  const updateTableCell = (blockIndex, rowIndex, colIndex, value) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const rows = blocks[blockIndex].content.rows.map(r => [...r]);
      rows[rowIndex][colIndex] = value;
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, rows } };
      return { ...prev, blocks };
    });
  };

  const addTableRow = (blockIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const colCount = (blocks[blockIndex].content.headers || []).length || 2;
      const newRow = Array(colCount).fill('');
      const rows = [...(blocks[blockIndex].content.rows || []), newRow];
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, rows } };
      return { ...prev, blocks };
    });
  };

  const removeTableRow = (blockIndex, rowIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const rows = (blocks[blockIndex].content.rows || []).filter((_, i) => i !== rowIndex);
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, rows } };
      return { ...prev, blocks };
    });
  };

  const addTableColumn = (blockIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const headers = [...(blocks[blockIndex].content.headers || []), `Kolom ${(blocks[blockIndex].content.headers || []).length + 1}`];
      const rows = (blocks[blockIndex].content.rows || []).map(r => [...r, '']);
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, headers, rows } };
      return { ...prev, blocks };
    });
  };

  const removeTableColumn = (blockIndex, colIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const headers = (blocks[blockIndex].content.headers || []).filter((_, i) => i !== colIndex);
      const rows = (blocks[blockIndex].content.rows || []).map(r => r.filter((_, i) => i !== colIndex));
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, headers, rows } };
      return { ...prev, blocks };
    });
  };

  const savePage = async (e, editingItem) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...pageForm, menu_id: pageForm.menu_id || null };
      if (editingItem) {
        await axios.put(`${API_URL}/pages/${editingItem.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Halaman berhasil diperbarui!');
      } else {
        await axios.post(`${API_URL}/pages`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Halaman baru berhasil dibuat!');
      }
      setIsAdding(false); setEditingItem(null);
      setPageForm(EMPTY_PAGE_FORM);
      fetchPages();
      window.dispatchEvent(new Event('cms_page_updated'));
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan halaman.', 'error');
    } finally { setLoading(false); }
  };

  const deletePage = (id) => {
    openConfirm({
      title: 'Hapus Halaman Konten',
      message: 'Yakin ingin menghapus halaman ini? Seluruh blok konten dan teks di dalamnya tidak dapat dikembalikan.',
      confirmText: 'Ya, Hapus Halaman',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/pages/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          showMsg('Halaman berhasil dihapus.');
          fetchPages();
          window.dispatchEvent(new Event('cms_page_updated'));
        } catch { showMsg('Gagal menghapus halaman.', 'error'); }
      }
    });
  };

  const togglePageStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await axios.patch(`${API_URL}/pages/${id}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      showMsg(`Status halaman berhasil diubah ke ${newStatus}.`);
      fetchPages();
      window.dispatchEvent(new Event('cms_page_updated'));
    } catch { showMsg('Gagal mengubah status halaman.', 'error'); }
  };

  return {
    pages, pageForm, setPageForm, pageSearch, setPageSearch,
    pageStatusFilter, setPageStatusFilter, fetchPages,
    savePage, deletePage, togglePageStatus,
    addBlock, updateBlockContent, moveBlock, deleteBlock,
    updateTableHeader, updateTableCell, addTableRow, removeTableRow,
    addTableColumn, removeTableColumn
  };
}
