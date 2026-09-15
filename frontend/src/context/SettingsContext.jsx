import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const SettingsContext = createContext(null);

const defaultSettings = {
  hero_badge: 'Zona Integritas WBK & WBBM',
  hero_title: 'Selamat Datang di Pengadilan Agama Kota Cimahi',
  hero_subtitle: 'Mewujudkan Peradilan Agama yang Agung, Bersih, dan Melayani dengan Sepenuh Hati untuk Masyarakat Kota Cimahi.',
  running_text: 'Selamat Datang di Website Resmi Pengadilan Agama Kota Cimahi Kelas IA • Pelayanan PTSP Buka Senin-Kamis & Jumat • Stop Pungli & Gratifikasi • Layanan e-Court MA RI Tersedia 24 Jam',
  stat_diterima: '3.420',
  stat_diputus: '3.365',
  stat_persentase: '98,4%',
  stat_ikm: '97,8%',
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

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/settings`);
      if (res.data.success && Object.keys(res.data.data).length > 0) {
        setSettings(prev => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.warn('SettingsContext: using defaults', err.message);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const refreshSettings = useCallback(() => {
    return fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loaded, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export default SettingsContext;
