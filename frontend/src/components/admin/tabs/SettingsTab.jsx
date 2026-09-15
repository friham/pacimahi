import { FaSave } from 'react-icons/fa';

export default function SettingsTab({
  settings,
  setSettings,
  handleSettingsSubmit,
  loading
}) {
  return (
    <div className="crud-panel animate-fade-in-up">
      <form onSubmit={handleSettingsSubmit} className="crud-form">
        <h2 className="crud-form__title">Pengaturan Konten & Teks Homepage</h2>

        <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
          1. Teks Hero Banner & Pengumuman Berjalan
        </h3>
        <div className="crud-form__grid">
          <div className="crud-form__group">
            <label>Badge Zona Integritas (Hero)</label>
            <input
              type="text"
              value={settings.hero_badge || ''}
              onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Judul Utama (Hero Title)</label>
            <input
              type="text"
              value={settings.hero_title || ''}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
            />
          </div>
          <div className="crud-form__group col-span-2">
            <label>Slogan / Subtitle Hero</label>
            <textarea
              rows="2"
              value={settings.hero_subtitle || ''}
              onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
            />
          </div>
          <div className="crud-form__group col-span-2">
            <label>Teks Pengumuman Berjalan (Running Announcement Ticker)</label>
            <input
              type="text"
              value={settings.running_text || ''}
              onChange={(e) => setSettings({ ...settings, running_text: e.target.value })}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
          2. Angka Statistik Kinerja Pengadilan
        </h3>
        <div className="crud-form__grid">
          <div className="crud-form__group">
            <label>Total Perkara Diterima</label>
            <input
              type="text"
              value={settings.stat_diterima || ''}
              onChange={(e) => setSettings({ ...settings, stat_diterima: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Total Perkara Diputus</label>
            <input
              type="text"
              value={settings.stat_diputus || ''}
              onChange={(e) => setSettings({ ...settings, stat_diputus: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Tingkat Penyelesaian (%)</label>
            <input
              type="text"
              value={settings.stat_persentase || ''}
              onChange={(e) => setSettings({ ...settings, stat_persentase: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Indeks Kepuasan Masyarakat / IKM (%)</label>
            <input
              type="text"
              value={settings.stat_ikm || ''}
              onChange={(e) => setSettings({ ...settings, stat_ikm: e.target.value })}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
          3. Informasi Kontak Kantor & Layanan WhatsApp PTSP
        </h3>
        <div className="crud-form__grid">
          <div className="crud-form__group col-span-2">
            <label>Alamat Kantor Pengadilan</label>
            <input
              type="text"
              value={settings.court_address || ''}
              onChange={(e) => setSettings({ ...settings, court_address: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Nomor Telepon Kantor</label>
            <input
              type="text"
              value={settings.court_phone || ''}
              onChange={(e) => setSettings({ ...settings, court_phone: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Email Resmi</label>
            <input
              type="text"
              value={settings.court_email || ''}
              onChange={(e) => setSettings({ ...settings, court_email: e.target.value })}
            />
          </div>
          <div className="crud-form__group col-span-2">
            <label>Nomor WhatsApp Layanan PTSP / Chatbot (Format: 62812xxxxxx)</label>
            <input
              type="text"
              value={settings.court_whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, court_whatsapp: e.target.value })}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
          4. Media Sosial & Tautan Eksternal
        </h3>
        <div className="crud-form__grid">
          <div className="crud-form__group">
            <label>URL Facebook</label>
            <input type="text" placeholder="https://facebook.com/..."
              value={settings.social_facebook || ''}
              onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>URL Instagram</label>
            <input type="text" placeholder="https://instagram.com/..."
              value={settings.social_instagram || ''}
              onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>URL YouTube</label>
            <input type="text" placeholder="https://youtube.com/..."
              value={settings.social_youtube || ''}
              onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>URL WhatsApp (format: 62812xxxxxx)</label>
            <input type="text" placeholder="6281121111522"
              value={settings.social_whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, social_whatsapp: e.target.value })}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
          5. Footer & Deskripsi Website
        </h3>
        <div className="crud-form__grid">
          <div className="crud-form__group col-span-2">
            <label>Deskripsi singkat website (ditampilkan di footer)</label>
            <textarea rows="2"
              value={settings.footer_description || ''}
              onChange={(e) => setSettings({ ...settings, footer_description: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Jam Senin – Kamis</label>
            <input type="text" placeholder="08.00 – 16.30 WIB"
              value={settings.footer_hours_weekday || ''}
              onChange={(e) => setSettings({ ...settings, footer_hours_weekday: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Jam Jumat</label>
            <input type="text" placeholder="07.30 – 16.30 WIB"
              value={settings.footer_hours_friday || ''}
              onChange={(e) => setSettings({ ...settings, footer_hours_friday: e.target.value })}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
          6. Video Profil
        </h3>
        <div className="crud-form__grid">
          <div className="crud-form__group col-span-2">
            <label>URL Video YouTube (contoh: https://youtu.be/xxxxx)</label>
            <input type="text"
              value={settings.video_url || ''}
              onChange={(e) => setSettings({ ...settings, video_url: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Judul Video</label>
            <input type="text"
              value={settings.video_title || ''}
              onChange={(e) => setSettings({ ...settings, video_title: e.target.value })}
            />
          </div>
          <div className="crud-form__group">
            <label>Subtitle Video</label>
            <input type="text"
              value={settings.video_subtitle || ''}
              onChange={(e) => setSettings({ ...settings, video_subtitle: e.target.value })}
            />
          </div>
        </div>

        <div className="crud-form__actions" style={{ marginTop: '2rem' }}>
          <button type="submit" className="crud-panel__btn crud-panel__btn--primary" disabled={loading}>
            <FaSave /> {loading ? 'Menyimpan...' : 'Simpan & Sinkronkan ke Homepage'}
          </button>
        </div>
      </form>
    </div>
  );
}
