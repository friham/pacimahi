import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const EMPTY_FORM = { name: '', icon: '', description: '', link: '', sort_order: 0, is_active: true };

/**
 * Domain: Layanan cepat (quick access) di homepage.
 */
export default function useServices({ token, showMsg, setLoading, setEditingItem, setIsAdding, openConfirm }) {
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState(EMPTY_FORM);

  const fetchServices = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/services/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const saveService = async (e, editingItem) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/services/${editingItem.id}`, serviceForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Layanan berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/services`, serviceForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Layanan baru berhasil ditambahkan');
      }
      setIsAdding(false);
      setEditingItem(null);
      setServiceForm(EMPTY_FORM);
      fetchServices();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan layanan', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = (id) => {
    openConfirm({
      title: 'Hapus Layanan',
      message: 'Apakah Anda yakin ingin menghapus layanan ini?',
      confirmText: 'Ya, Hapus Layanan',
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          showMsg('Layanan berhasil dihapus');
          fetchServices();
        } catch {
          showMsg('Gagal menghapus layanan', 'error');
        }
      }
    });
  };

  return { services, serviceForm, setServiceForm, fetchServices, saveService, deleteService };
}
