import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

/**
 * Domain: Pengaturan akun admin (profil, avatar, ganti password).
 * Menyinkronkan form dengan `user` dari AuthContext.
 */
export default function useAccount({ user, token, updateUser, showMsg }) {
  const [accountForm, setAccountForm] = useState({
    username: user?.username || '',
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [accountLoading, setAccountLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarImgError, setAvatarImgError] = useState(false);
  const [headerImgError, setHeaderImgError] = useState(false);
  const avatarFileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setAccountForm({
        username: user.username || '',
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || ''
      });
      setHeaderImgError(false);
    }
  }, [user]);

  useEffect(() => {
    setAvatarImgError(false);
  }, [accountForm.avatar]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (avatarUploading) {
      showMsg('Sedang mengunggah foto avatar, mohon tunggu sebentar...', 'error');
      return;
    }
    if (accountForm.avatar && accountForm.avatar.startsWith('blob:')) {
      showMsg('Foto masih diproses, silakan coba lagi sesaat.', 'error');
      return;
    }
    setAccountLoading(true);
    try {
      const res = await axios.put(`${API_URL}/auth/profile`, accountForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        updateUser(res.data.data.admin, res.data.data.token);
        showMsg('Profil akun admin berhasil diperbarui!');
      }
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal memperbarui profil.', 'error');
    } finally {
      setAccountLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMsg('Konfirmasi password baru tidak cocok.', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showMsg('Password baru minimal 6 karakter.', 'error');
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await axios.put(`${API_URL}/auth/password`, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        showMsg('Password akun admin berhasil diubah!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal mengubah password.', 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showMsg('Ukuran file foto maksimal 5MB.', 'error');
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = '';
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setAccountForm(prev => ({ ...prev, avatar: localPreview }));
    setAvatarImgError(false);

    const formData = new FormData();
    formData.append('image', file);

    setAvatarUploading(true);
    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        const newAvatarUrl = res.data.data.image_url;
        setAccountForm(prev => ({ ...prev, avatar: newAvatarUrl }));
        showMsg('Foto avatar berhasil diunggah! Klik "Simpan Perubahan Profil" untuk menerapkan.');
      }
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal mengunggah foto avatar.', 'error');
      setAccountForm(prev => ({ ...prev, avatar: user?.avatar || '' }));
    } finally {
      setAvatarUploading(false);
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = '';
    }
  };

  return {
    accountForm, setAccountForm, passwordForm, setPasswordForm,
    showPass, setShowPass, accountLoading, passwordLoading,
    avatarUploading, avatarImgError, setAvatarImgError,
    headerImgError, setHeaderImgError, avatarFileInputRef,
    handleUpdateProfile, handleChangePassword, handleAvatarFileChange
  };
}
