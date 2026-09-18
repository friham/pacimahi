import { useState } from 'react';
import { FaSearch, FaBullhorn, FaTimes, FaExpandAlt, FaCopy, FaCheck } from 'react-icons/fa';
import GlobalSearchBox from './GlobalSearchBox';
import { useSettings } from '../context/SettingsContext';
import './HeroSection.css';

function HeroSection({ onOpenCaseModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('perkara');
  const [isTickerVisible, setIsTickerVisible] = useState(true);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { settings: heroSettings } = useSettings();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onOpenCaseModal) {
      onOpenCaseModal(searchQuery);
    }
  };

  return (
    <section className="hero">
      <div className="hero__bg-photo" aria-hidden="true"></div>
      <div className="hero__bg-pattern"></div>
      <div className="hero__bg-overlay"></div>

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
        <h1 className="hero__title animate-fade-in-up animate-delay-1">
          <span className="hero__title-main">Selamat Datang di Pengadilan Agama</span>
          <span className="hero__title-city">Kota Cimahi</span>
        </h1>
        <p className="hero__subtitle animate-fade-in-up animate-delay-2">
          {heroSettings.hero_subtitle}
        </p>

        <div className="hero__search-container animate-fade-in-up animate-delay-4">
          <div className="hero__search-tabs" role="tablist" aria-label="Pilihan Pencarian">
            <button
              type="button"
              role="tab"
              aria-selected={activeSearchTab === 'perkara'}
              className={`hero__search-tab ${activeSearchTab === 'perkara' ? 'hero__search-tab--active' : ''}`}
              onClick={() => setActiveSearchTab('perkara')}
            >
              Lacak Perkara
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSearchTab === 'global'}
              className={`hero__search-tab ${activeSearchTab === 'global' ? 'hero__search-tab--active' : ''}`}
              onClick={() => setActiveSearchTab('global')}
            >
              Cari Berita &amp; Layanan
            </button>
          </div>

          {activeSearchTab === 'perkara' ? (
            <div className="hero__global-search-wrap">
              <div 
                className="global-search-trigger"
                onClick={() => {
                  if (onOpenCaseModal) onOpenCaseModal('');
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label="Buka pelacakan perkara SIPP"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onOpenCaseModal) onOpenCaseModal('');
                  }
                }}
              >
                <FaSearch className="global-search-trigger__icon" />
                <input
                  type="text"
                  className="global-search-trigger__input"
                  placeholder="Cari nomor perkara (cth: 124/Pdt.G/2026/PA.Cmi) atau nama pihak..."
                  readOnly
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenCaseModal) onOpenCaseModal('');
                  }}
                  onFocus={() => {
                    if (onOpenCaseModal) onOpenCaseModal('');
                  }}
                  value=""
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            </div>
          ) : (
            <div className="hero__global-search-wrap">
              <GlobalSearchBox />
            </div>
          )}
        </div>
      </div>

      <div className="hero__wave">
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none">
          <path
            d="M0,8 C270,22 550,5 810,6 C1070,7 1220,21 1440,9 L1440,24 L0,24 Z"
            fill="var(--surface-bg)"
          />
        </svg>
      </div>

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
