import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaShieldAlt, FaGavel, FaListAlt, FaBullhorn, FaTimes, FaExpandAlt, FaCopy, FaCheck } from 'react-icons/fa';
import { API_URL } from '../config';
import './HeroSection.css';

function HeroSection({ onOpenCaseModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTickerVisible, setIsTickerVisible] = useState(true);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [heroSettings, setHeroSettings] = useState({
    hero_badge: 'Zona Integritas WBK & WBBM',
    hero_title: 'Selamat Datang di Pengadilan Agama Kota Cimahi',
    hero_subtitle: 'Mewujudkan Peradilan Agama yang Agung, Bersih, dan Melayani dengan Sepenuh Hati untuk Masyarakat Kota Cimahi.',
    running_text: 'Selamat Datang di Website Resmi Pengadilan Agama Kota Cimahi Kelas II • Pelayanan PTSP Buka Senin-Jumat • Stop Pungli & Gratifikasi • Layanan e-Court MA RI Tersedia 24 Jam'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_URL}/settings`);
        if (res.data.success && Object.keys(res.data.data).length > 0) {
          setHeroSettings(prev => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.warn('Using default hero settings:', err.message);
      }
    };
    fetchSettings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onOpenCaseModal) {
      onOpenCaseModal(searchQuery);
    }
  };

  return (
    <section className="hero">
      {/* Decorative background elements */}
      <div className="hero__bg-pattern"></div>
      <div className="hero__bg-overlay"></div>

      {/* Running Announcement Ticker - Positioned near navbar */}
      {heroSettings.running_text && (
        isTickerVisible ? (
          <div className="hero__ticker">
            <div 
              className="hero__ticker-badge"
              onClick={() => setIsAnnouncementModalOpen(true)}
              title="Klik untuk memperbesar pengumuman"
            >
              <FaBullhorn /> Pengumuman:
            </div>
            <div 
              className="hero__ticker-content"
              onClick={() => setIsAnnouncementModalOpen(true)}
              title="Klik untuk memperbesar / membaca teks pengumuman lengkap"
            >
              <div className="hero__ticker-text">
                {heroSettings.running_text}
              </div>
            </div>
            <div className="hero__ticker-actions">
              <button 
                type="button"
                className="hero__ticker-action-btn"
                onClick={() => setIsAnnouncementModalOpen(true)}
                title="Perbesar / Zoom Pengumuman"
                aria-label="Perbesar Pengumuman"
              >
                <FaExpandAlt size={11} />
              </button>
              <button 
                type="button"
                className="hero__ticker-action-btn hero__ticker-action-btn--close"
                onClick={() => setIsTickerVisible(false)}
                title="Sembunyikan Pengumuman"
                aria-label="Sembunyikan Pengumuman"
              >
                <FaTimes size={12} />
              </button>
            </div>
          </div>
        ) : (
          <button 
            type="button"
            className="hero__ticker-reopen-btn"
            onClick={() => setIsTickerVisible(true)}
            title="Tampilkan Pengumuman Kembali"
          >
            <FaBullhorn /> Lihat Pengumuman
          </button>
        )
      )}

      <div className="hero__content container">
        {/* Main Heading */}
        <h1 className="hero__title animate-fade-in-up">
          {heroSettings.hero_title?.includes('Pengadilan Agama') ? (
            <>
              {heroSettings.hero_title.split('Pengadilan Agama')[0]}
              <span className="hero__title-highlight"> Pengadilan Agama</span>
              <br />
              <span className="hero__title-city">Kota Cimahi</span>
            </>
          ) : (
            heroSettings.hero_title
          )}
        </h1>

        {/* Subtitle */}
        <p className="hero__subtitle animate-fade-in-up animate-delay-2">
          {heroSettings.hero_subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="hero__buttons animate-fade-in-up animate-delay-3">
          <a href="#layanan" className="hero__btn hero__btn--primary">
            <FaListAlt /> Layanan Pengadilan
          </a>
          <button
            type="button"
            className="hero__btn hero__btn--secondary"
            onClick={() => onOpenCaseModal && onOpenCaseModal('')}
          >
            <FaGavel /> Cek Informasi Perkara
          </button>
        </div>

        {/* Search Bar */}
        <form className="hero__search animate-fade-in-up animate-delay-4" onSubmit={handleSearch}>
          <div className="hero__search-wrapper">
            <FaSearch className="hero__search-icon" />
            <input
              type="text"
              className="hero__search-input"
              placeholder="Cari informasi perkara (cth: 124/Pdt.G/2026/PA.Cmi) atau nama pihak..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="hero__search-btn">
              Cari
            </button>
          </div>
        </form>
      </div>

      {/* Bottom line divider */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none">
          <path
            d="M0,8 C270,22 550,5 810,6 C1070,7 1220,21 1440,9 L1440,24 L0,24 Z"
            fill="var(--surface-bg)"
          />
        </svg>
      </div>

      {/* Announcement Zoom / Detail Modal */}
      {isAnnouncementModalOpen && (
        <div 
          className="hero-announcement-modal-overlay" 
          onClick={() => setIsAnnouncementModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="hero-announcement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hero-announcement-modal__header">
              <div className="hero-announcement-modal__title-box">
                <span className="hero-announcement-modal__icon">
                  <FaBullhorn />
                </span>
                <div>
                  <h3 className="hero-announcement-modal__title">Pengumuman Resmi</h3>
                  <span className="hero-announcement-modal__sub">Pengadilan Agama Kota Cimahi</span>
                </div>
              </div>
              <button 
                className="hero-announcement-modal__close" 
                onClick={() => setIsAnnouncementModalOpen(false)}
                aria-label="Tutup"
              >
                <FaTimes />
              </button>
            </div>

            <div className="hero-announcement-modal__body">
              <div className="hero-announcement-modal__text">
                {heroSettings.running_text}
              </div>
            </div>

            <div className="hero-announcement-modal__footer">
              <button 
                type="button"
                className="hero-announcement-modal__btn hero-announcement-modal__btn--copy"
                onClick={() => {
                  navigator.clipboard.writeText(heroSettings.running_text);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
              >
                {isCopied ? <><FaCheck /> Tersalin!</> : <><FaCopy /> Salin Teks</>}
              </button>
              <button 
                type="button"
                className="hero-announcement-modal__btn hero-announcement-modal__btn--primary"
                onClick={() => setIsAnnouncementModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;
