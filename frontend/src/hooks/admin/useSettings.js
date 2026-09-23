import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const DEFAULT_SETTINGS = {
  hero_badge: 'Zona Integritas WBK & WBBM',
  hero_title: 'Selamat Datang di Pengadilan Agama Kota Cimahi',
  hero_subtitle: 'Mewujudkan Peradilan Agama yang Agung, Bersih, dan Melayani dengan Sepenuh Hati untuk Masyarakat Kota Cimahi.',
  running_text: 'Selamat Datang di Website Resmi Pengadilan Agama Kota Cimahi Kelas IA • Pelayanan PTSP Buka Senin-Kamis & Jumat • Stop Pungli & Gratifikasi • Layanan e-Court MA RI Tersedia 24 Jam',
  stat_diterima: '3.420',
  stat_diputus: '3.365',
  stat_persentase: '98,4%',
  stat_ikm: '97,8%',
  survey_period: 'Triwulan II Tahun 2026',
  survey_ikm_score: '3.97',
  survey_ikm_grade: 'A (Sangat Baik)',
  survey_ipkp_score: '3.97',
  survey_ipkp_grade: 'A (Sangat Baik)',
  survey_ipak_score: '3.98',
  survey_ipak_grade: 'A (Sangat Baik)',
  court_address: 'Jl. Encep Kartawiria No. 28, Cimahi Tengah, Kota Cimahi 40526',
  court_phone: '(022) 6631 334',
  court_email: 'info@pa-cimahi.go.id',
  court_whatsapp: '6281121111522',
  social_facebook: 'https://www.facebook.com/share/1CcnHbJVdC/?mibextid=wwXIfr',
  social_instagram: 'https://www.instagram.com/pa.kotacimahi/',
  social_youtube: 'https://www.youtube.com/channel/UCEEumbm787379_CQ9AQblCg',
  social_whatsapp: '6281121111522',
  footer_description: 'Mewujudkan peradilan agama yang agung, bersih, dan melayani dengan sepenuh hati untuk masyarakat Kota Cimahi dan sekitarnya.',
  footer_hours_weekday: '08.00 – 16.30 WIB',
  footer_hours_friday: '07.30 – 16.30 WIB',
  video_url: 'https://youtu.be/62bIsvRcPv0?si=Fow524ngSa3DIkBs',
  video_title: 'Video Profil Pengadilan Agama Kota Cimahi',
  video_subtitle: 'Mengenal lebih dekat komitmen integritas, tata kelola modern, dan inovasi pelayanan prima Pengadilan Agama Kota Cimahi bagi masyarakat.',
};

/**
 * Domain: Pengaturan website (site_settings key/value).
 */
export default function useSettings({ token, showMsg, setLoading }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/settings`);
      if (res.data.success && Object.keys(res.data.data).length > 0) {
        setSettings(prev => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMsg('Pengaturan website berhasil disimpan & disinkronkan ke Homepage!');
    } catch {
      showMsg('Gagal menyimpan pengaturan website', 'error');
    } finally {
      setLoading(false);
    }
  };

  return { settings, setSettings, fetchSettings, handleSettingsSubmit };
}
