import {
  FaSitemap, FaFileAlt, FaNewspaper, FaImages, FaCog, FaSlidersH,
  FaFilePdf, FaExternalLinkAlt, FaArrowRight, FaMapMarkerAlt,
  FaPhoneAlt, FaWhatsapp, FaEnvelope
} from 'react-icons/fa';

export default function OverviewTab({
  user,
  settings,
  setActiveTab,
  logo
}) {
  return (
    <div className="dashboard-home animate-fade-in-up">
      <div className="dash-banner">
        <div className="dash-banner__left">
          <h2 className="dash-banner__title">
            Selamat datang, {user?.name || 'Administrator'}!
          </h2>
          <p className="dash-banner__sub">
            Kelola konten website Pengadilan Agama Kota Cimahi Kelas IA secara real-time. Perubahan yang Anda simpan langsung tampil ke publik.
          </p>
        </div>
        <div className="dash-banner__right">
          <img src={logo} alt="PA Cimahi" className="dash-banner__logo" />
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__top">
            <span className="admin-stat-card__label">Total Perkara</span>
          </div>
          <h3 className="admin-stat-card__value">{settings.stat_diterima || '3.420'}</h3>
          <p className="admin-stat-card__note">Perkara masuk tahun berjalan</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__top">
            <span className="admin-stat-card__label">Perkara Diputus</span>
          </div>
          <h3 className="admin-stat-card__value">{settings.stat_diputus || '3.365'}</h3>
          <p className="admin-stat-card__note">Selesai & berkekuatan hukum</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__top">
            <span className="admin-stat-card__label">Penyelesaian (%)</span>
            <span className="stat-badge">Target 90%</span>
          </div>
          <h3 className="admin-stat-card__value">{settings.stat_persentase || '98,4%'}</h3>
          <p className="admin-stat-card__note">Rasio keberhasilan penanganan</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__top">
            <span className="admin-stat-card__label">Indeks Kepuasan (IKM)</span>
            <span className="stat-badge">Sangat Baik</span>
          </div>
          <h3 className="admin-stat-card__value">{settings.stat_ikm || '97,8%'}</h3>
          <p className="admin-stat-card__note">Survei pelayanan publik PTSP</p>
        </div>
      </div>

      <div className="dash-analytics-grid">
        <div className="dash-chart-card">
          <div className="dash-chart-card__header">
            <div>
              <h3 className="dash-chart-card__title">Tren Penanganan Perkara Bulanan</h3>
              <p className="dash-chart-card__subtitle">Perkara masuk vs diputus — tahun berjalan</p>
            </div>
          </div>

          <div className="dash-chart-legend">
            <span className="dash-chart-legend__item">
              <span className="dash-chart-legend__line dash-chart-legend__line--primary" />
              Perkara masuk
            </span>
            <span className="dash-chart-legend__item">
              <span className="dash-chart-legend__line dash-chart-legend__line--muted" />
              Perkara diputus
            </span>
          </div>

          <div className="dash-chart-svg-container">
            <svg viewBox="0 0 600 180" className="dash-main-chart" preserveAspectRatio="none">
              <line x1="40" y1="40" x2="580" y2="40" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="40" y1="80" x2="580" y2="80" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="40" y1="120" x2="580" y2="120" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="40" y1="160" x2="580" y2="160" stroke="#e5e7eb" strokeWidth="1"/>

              <text x="4" y="44" fill="#6b7280" fontSize="11">400</text>
              <text x="4" y="84" fill="#6b7280" fontSize="11">300</text>
              <text x="4" y="124" fill="#6b7280" fontSize="11">200</text>
              <text x="4" y="164" fill="#6b7280" fontSize="11">100</text>

              <path className="dash-chart-line dash-chart-line--primary" d="M40,140 L100,130 L160,120 L220,110 L280,100 L340,90 L400,80 L460,70 L520,60 L580,50"
                fill="none" strokeWidth="2.5" strokeLinecap="round"/>
              <path className="dash-chart-line dash-chart-line--muted" d="M40,150 L100,140 L160,130 L220,120 L280,110 L340,100 L400,90 L460,80 L520,70 L580,60"
                fill="none" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <div className="dash-chart-x-labels">
              {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'].map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>

          <div className="dash-chart-summary-row">
            <div className="chart-summary-item">
              <span className="chart-summary-label">Rata-rata Masuk</span>
              <strong className="chart-summary-val chart-summary-val--primary">285 perkara/bln</strong>
            </div>
            <div className="chart-summary-item">
              <span className="chart-summary-label">Rata-rata Diputus</span>
              <strong className="chart-summary-val chart-summary-val--muted">280 perkara/bln</strong>
            </div>
            <div className="chart-summary-item">
              <span className="chart-summary-label">Sisa Perkara Aktif</span>
              <strong className="chart-summary-val chart-summary-val--gold">55 perkara (1,6%)</strong>
            </div>
          </div>
        </div>

        <div className="dash-chart-card">
          <div className="dash-chart-card__header">
            <div>
              <h3 className="dash-chart-card__title">Tingkat Penyelesaian</h3>
              <p className="dash-chart-card__subtitle">Rasio perkara diputus tepat waktu</p>
            </div>
          </div>

          <div className="gauge-simple">
            <div className="gauge-simple__percent">{settings.stat_persentase || '98,4%'}</div>
            <div className="gauge-simple__label">Penyelesaian Perkara</div>
          </div>

          <div className="gauge-stats-list">
            <div className="gauge-stat-item">
              <div className="gauge-stat-dot gauge-stat-dot--primary"></div>
              <span className="gauge-stat-name">Perkara Gugatan</span>
              <span className="gauge-stat-val">2.531 (74%)</span>
            </div>
            <div className="gauge-stat-item">
              <div className="gauge-stat-dot gauge-stat-dot--gold"></div>
              <span className="gauge-stat-name">Perkara Permohonan</span>
              <span className="gauge-stat-val">889 (26%)</span>
            </div>
          </div>
        </div>

        <div className="dash-chart-card">
          <div className="dash-chart-card__header">
            <div>
              <h3 className="dash-chart-card__title">Pengunjung PTSP</h3>
              <p className="dash-chart-card__subtitle">Aktivitas layanan 7 hari terakhir</p>
            </div>
            <span className="stat-badge">+8% ↑</span>
          </div>

          <div className="ptsp-bars-value-row">
            <span className="ptsp-bars-total">486</span>
            <span className="ptsp-bars-unit">pengunjung / minggu</span>
          </div>

          <div className="ptsp-bars-container">
            {[
              { day: 'Sen', val: 94 },
              { day: 'Sel', val: 86 },
              { day: 'Rab', val: 98, active: true },
              { day: 'Kam', val: 82 },
              { day: 'Jum', val: 68 },
              { day: 'Sab', val: 28 },
              { day: 'Min', val: 30 },
            ].map((bar, i) => (
              <div key={i} className={`ptsp-bar-col ${bar.active ? 'ptsp-bar-col--active' : ''}`}>
                <div className="ptsp-bar-track">
                  <div className="ptsp-bar-fill" style={{ height: `${bar.val}%` }} />
                </div>
                <span className="ptsp-bar-value">{bar.val}</span>
                <span className="ptsp-bar-label">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="ptsp-quick-services">
            <div className="ptsp-service-pill">
              <span>Sidang: <strong>182</strong></span>
            </div>
            <div className="ptsp-service-pill">
              <span>Akta Cerai: <strong>124</strong></span>
            </div>
            <div className="ptsp-service-pill">
              <span>POSBAKUM: <strong>95</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-section-title">
        <span className="dash-section-title__bar" />
        <h3>Menu Pengelolaan</h3>
      </div>

      <div className="dash-quick-grid">
        {[
          { label: 'Kelola Menu', desc: 'Kelola navigasi & sidebar website secara dinamis', icon: FaSitemap, tab: 'Kelola Menu' },
          { label: 'Kelola Halaman', desc: 'Buat & edit halaman konten CMS website', icon: FaFileAlt, tab: 'Kelola Halaman' },
          { label: 'Kelola Berita', desc: 'Tulis, edit dan publish berita & pengumuman', icon: FaNewspaper, tab: 'Kelola Berita' },
          { label: 'Media Library', desc: 'Kelola gambar & media yang diunggah', icon: FaImages, tab: 'Media Library' },
          { label: 'Kelola Layanan', desc: 'Perbarui daftar layanan publik pengadilan', icon: FaCog, tab: 'Kelola Layanan' },
          { label: 'Pengaturan Website', desc: 'Ubah teks hero, kontak & statistik homepage', icon: FaSlidersH, tab: 'Pengaturan Website' },
          { label: 'Pustaka Dokumen', desc: 'Kelola file SK, Peraturan, & dokumen resmi', icon: FaFilePdf, tab: 'Pustaka Dokumen' },
          { label: 'Lihat Website', desc: 'Buka halaman publik pengadilan langsung', icon: FaExternalLinkAlt, tab: null },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="dash-quick-card"
              onClick={() => item.tab ? setActiveTab(item.tab) : window.open('/', '_blank')}
            >
              <div className="dash-quick-card__icon-wrap">
                <Icon />
              </div>
              <div className="dash-quick-card__body">
                <p className="dash-quick-card__label">{item.label}</p>
                <p className="dash-quick-card__desc">{item.desc}</p>
              </div>
              <FaArrowRight className="dash-quick-card__arrow" />
            </div>
          );
        })}
      </div>

      <div className="dash-info-row">
        {[
          { icon: FaMapMarkerAlt, title: 'Alamat Kantor', val: settings.court_address || 'Jl. Encep Kartawiria No. 28, Cimahi Tengah' },
          { icon: FaPhoneAlt, title: 'Telepon Kantor', val: settings.court_phone || '(022) 6631 334' },
          { icon: FaWhatsapp, title: 'WhatsApp PTSP', val: `+${settings.court_whatsapp || '6281121111522'}` },
          { icon: FaEnvelope, title: 'Email Resmi', val: settings.court_email || 'info@pa-cimahi.go.id' },
        ].map((info, i) => {
          const InfoIcon = info.icon;
          return (
            <div key={i} className="dash-info-card">
              <div className="dash-info-card__icon">
                <InfoIcon />
              </div>
              <div>
                <p className="dash-info-card__title">{info.title}</p>
                <p className="dash-info-card__val">{info.val}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
