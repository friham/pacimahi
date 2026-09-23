import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const EMPTY_MENU_FORM = {
  title: '', slug: '', parent_id: '', type: 'page', url: '', icon: '',
  sort_order: 0, status: 'published', open_new_tab: false, description: ''
};

/**
 * Domain: Menu navigasi (flat list + tree) + aksi CRUD/status.
 */
export default function useMenus({ token, showMsg, setLoading, setEditingItem, setIsAdding, openConfirm }) {
  const [menus, setMenus] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [menuForm, setMenuForm] = useState(EMPTY_MENU_FORM);

  const fetchMenus = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/menus`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenus(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token]);

  const fetchMenuTree = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/menus/tree`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenuTree(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token]);

  const saveMenu = async (e, editingItem) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...menuForm, parent_id: menuForm.parent_id || null };
      if (editingItem) {
        await axios.put(`${API_URL}/menus/${editingItem.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Menu berhasil diperbarui!');
      } else {
        await axios.post(`${API_URL}/menus`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Menu baru berhasil ditambahkan!');
      }
      setIsAdding(false); setEditingItem(null);
      setMenuForm(EMPTY_MENU_FORM);
      fetchMenus(); fetchMenuTree();
      window.dispatchEvent(new Event('cms_menu_updated'));
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan menu.', 'error');
    } finally { setLoading(false); }
  };

  const deleteMenu = (id) => {
    openConfirm({
      title: 'Hapus Menu Navigasi',
      message: 'Yakin hapus menu ini? Sub-menu (jika ada) akan dinaikkan ke level atasnya.',
      confirmText: 'Ya, Hapus Menu',
      type: 'warning',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/menus/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          showMsg('Menu berhasil dihapus.');
          fetchMenus(); fetchMenuTree();
          window.dispatchEvent(new Event('cms_menu_updated'));
        } catch { showMsg('Gagal menghapus menu.', 'error'); }
      }
    });
  };

  const toggleMenuStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'inactive' : 'published';
    try {
      await axios.patch(`${API_URL}/menus/${id}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      fetchMenus(); fetchMenuTree();
      window.dispatchEvent(new Event('cms_menu_updated'));
    } catch { showMsg('Gagal mengubah status menu.', 'error'); }
  };

  return { menus, menuTree, menuForm, setMenuForm, fetchMenus, fetchMenuTree, saveMenu, deleteMenu, toggleMenuStatus };
}
