import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const EMPTY_FORM = { title: '', image_url: '', description: '', link: '', sort_order: 0, is_active: true };

/**
 * Domain: Slider homepage (kelola slider dari panel admin).
 * State data + form + aksi CRUD. `editingItem` dikirim saat dipanggil
 * oleh AdminDashboard agar state cross-tab tetap di komponen induk.
 */
export default function useSliders({ token, showMsg, setLoading, setEditingItem, setIsAdding, openConfirm }) {
  const [sliders, setSliders] = useState([]);
  const [sliderForm, setSliderForm] = useState(EMPTY_FORM);

  const fetchSliders = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/sliders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSliders(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const saveSlider = async (e, editingItem) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/sliders/${editingItem.id}`, sliderForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Slider berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/sliders`, sliderForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Slider baru berhasil ditambahkan');
      }
      setIsAdding(false);
      setEditingItem(null);
      setSliderForm(EMPTY_FORM);
      fetchSliders();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan slider', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteSlider = (id) => {
    openConfirm({
      title: 'Hapus Slider',
      message: 'Apakah Anda yakin ingin menghapus slider ini dari homepage?',
      confirmText: 'Ya, Hapus Slider',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/sliders/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          showMsg('Slider berhasil dihapus');
          fetchSliders();
        } catch {
          showMsg('Gagal menghapus slider', 'error');
        }
      }
    });
  };

  return { sliders, sliderForm, setSliderForm, fetchSliders, saveSlider, deleteSlider };
}
