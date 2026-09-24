import { useState } from 'react';
import {
  FaTimes,
  FaRedo,
  FaCog,
  FaCommentDots,
  FaArrowsAltV,
  FaAlignLeft,
  FaTint,
  FaAdjust,
  FaLink,
  FaArrowsAltH,
  FaPause,
  FaEyeSlash,
  FaBookOpen,
  FaMousePointer,
  FaCheck,
  FaUniversalAccess,
} from 'react-icons/fa';
import { useAccessibility } from '../hooks/useAccessibility';
import './AccessibilityWidget.css';

function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    settings,
    activeCount,
    toggleVoiceMode,
    toggleTooltip,
    cycleLineHeight,
    cycleTextAlign,
    cycleSaturation,
    cycleContrast,
    toggleHighlightLinks,
    cycleTextSize,
    cycleLetterSpacing,
    togglePauseAnimations,
    toggleHideImages,
    toggleDyslexiaFont,
    toggleLargeCursor,
    setWidgetPosition,
    resetAll,
  } = useAccessibility();

  const getLineHeightLabel = () => {
    if (settings.lineHeight === 1) return '1.8x';
    if (settings.lineHeight === 2) return '2.2x';
    return null;
  };

  const getTextAlignLabel = () => {
    if (settings.textAlign === 'left') return 'Kiri';
    if (settings.textAlign === 'justify') return 'Rata Kiri-Kanan';
    if (settings.textAlign === 'center') return 'Tengah';
    return null;
  };

  const getSaturationLabel = () => {
    if (settings.saturation === 'high') return 'Tinggi';
    if (settings.saturation === 'grayscale') return 'Monokrom';
    if (settings.saturation === 'low') return 'Rendah';
    return null;
  };

  const getContrastLabel = () => {
    if (settings.contrast === 'dark') return 'Gelap';
    if (settings.contrast === 'light') return 'Terang';
    if (settings.contrast === 'invert') return 'Invert';
    return null;
  };

  const getTextSizeLabel = () => {
    if (settings.textSize === 1) return '+20%';
    if (settings.textSize === 2) return '+40%';
    if (settings.textSize === 3) return '+60%';
    return null;
  };

  const getLetterSpacingLabel = () => {
    if (settings.letterSpacing === 1) return '2px';
    if (settings.letterSpacing === 2) return '4px';
    return null;
  };

  const features = [
    {
      id: 'tooltip',
      title: 'Tooltip',
      desc: 'Tampilkan info bantuan',
      icon: <FaCommentDots className="a11y-icon" />,
      isActive: settings.tooltip,
      status: settings.tooltip ? 'Aktif' : null,
      onClick: toggleTooltip,
    },
    {
      id: 'lineHeight',
      title: 'Tinggi Baris',
      desc: 'Spasi antar baris teks',
      icon: <FaArrowsAltV className="a11y-icon" />,
      isActive: settings.lineHeight > 0,
      status: getLineHeightLabel(),
      onClick: cycleLineHeight,
    },
    {
      id: 'textAlign',
      title: 'Perataan Teks',
      desc: 'Ubah rata teks',
      icon: <FaAlignLeft className="a11y-icon" />,
      isActive: settings.textAlign !== 'normal',
      status: getTextAlignLabel(),
      onClick: cycleTextAlign,
    },
    {
      id: 'saturation',
      title: 'Saturasi',
      desc: 'Intensitas warna',
      icon: <FaTint className="a11y-icon" />,
      isActive: settings.saturation !== 'normal',
      status: getSaturationLabel(),
      onClick: cycleSaturation,
    },
    {
      id: 'contrast',
      title: 'Kontras',
      desc: 'Tingkatkan keterbacaan',
      icon: <FaAdjust className="a11y-icon" />,
      isActive: settings.contrast !== 'normal',
      status: getContrastLabel(),
      onClick: cycleContrast,
    },
    {
      id: 'highlightLinks',
      title: 'Sorot Tautan',
      desc: 'Perjelas link web',
      icon: <FaLink className="a11y-icon" />,
      isActive: settings.highlightLinks,
      status: settings.highlightLinks ? 'Aktif' : null,
      onClick: toggleHighlightLinks,
    },
    {
      id: 'textSize',
      title: 'Teks Lebih Besar',
      desc: 'Perbesar ukuran huruf',
      icon: <span className="a11y-font-icon">A</span>,
      isActive: settings.textSize > 0,
      status: getTextSizeLabel(),
      onClick: cycleTextSize,
    },
    {
      id: 'letterSpacing',
      title: 'Jarak Teks',
      desc: 'Spasi antar karakter',
      icon: <FaArrowsAltH className="a11y-icon" />,
      isActive: settings.letterSpacing > 0,
      status: getLetterSpacingLabel(),
      onClick: cycleLetterSpacing,
    },
    {
      id: 'pauseAnimations',
      title: 'Jeda Animasi',
      desc: 'Hentikan pergerakan',
      icon: <FaPause className="a11y-icon" />,
      isActive: settings.pauseAnimations,
      status: settings.pauseAnimations ? 'Aktif' : null,
      onClick: togglePauseAnimations,
    },
    {
      id: 'hideImages',
      title: 'Sembunyikan Gambar',
      desc: 'Fokus pada teks saja',
      icon: <FaEyeSlash className="a11y-icon" />,
      isActive: settings.hideImages,
      status: settings.hideImages ? 'Aktif' : null,
      onClick: toggleHideImages,
    },
    {
      id: 'dyslexiaFont',
      title: 'Ramah Disleksia',
      desc: 'Font khusus disleksia',
      icon: <FaBookOpen className="a11y-icon" />,
      isActive: settings.dyslexiaFont,
      status: settings.dyslexiaFont ? 'Aktif' : null,
      onClick: toggleDyslexiaFont,
    },
    {
      id: 'largeCursor',
      title: 'Kursor',
      desc: 'Perbesar ukuran kursor',
      icon: <FaMousePointer className="a11y-icon" />,
      isActive: settings.largeCursor,
      status: settings.largeCursor ? 'Aktif' : null,
      onClick: toggleLargeCursor,
    },
  ];

  return (
    <div className={`a11y-widget-root a11y-pos-${settings.widgetPosition}`}>
      {settings.widgetPosition !== 'hidden' ? (
        <div
          className="a11y-floating-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            type="button"
            className={`a11y-floating-trigger ${isHovered ? 'a11y-floating-trigger--hover' : ''} ${isOpen ? 'a11y-floating-trigger--active' : ''}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Tutup Menu Aksesibilitas' : 'Buka Menu Aksesibilitas'}
            title="Menu Aksesibilitas"
          >
            <div className="a11y-trigger-icon-wrap">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="a11y-svg-icon"
              >
                <circle cx="12" cy="4.5" r="2.2" fill="currentColor" stroke="none" />
                <path d="M4.5 9h15" />
                <path d="M12 9v6" />
                <path d="M8 20l4-5 4 5" />
              </svg>
            </div>

            {activeCount > 0 && (
              <span className="a11y-active-badge" title={`${activeCount} fitur aktif`}>
                {activeCount}
              </span>
            )}
          </button>

          {isHovered && !isOpen && (
            <div className="a11y-tooltip-card animate-fade-in-up">
              <span>Accessibility Features Available</span>
            </div>
          )}
        </div>
      ) : (
        /* Hidden state restore button */
        <button
          type="button"
          className="a11y-restore-trigger"
          onClick={() => {
            setWidgetPosition('right');
            setIsOpen(true);
          }}
          title="Tampilkan Menu Aksesibilitas"
        >
          <FaUniversalAccess />
          <span>Aksesibilitas</span>
        </button>
      )}

      {isOpen && (
        <div
          className="a11y-floating-panel animate-panel-slide"
          role="region"
          aria-label="Menu Aksesibilitas"
        >
          <div className="a11y-panel-header">
            <div className="a11y-header-content">
              <div className="a11y-header-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1b5e20"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="a11y-header-svg"
                >
                  <circle cx="12" cy="4.5" r="2.2" fill="#1b5e20" stroke="none" />
                  <path d="M4.5 9h15" />
                  <path d="M12 9v6" />
                  <path d="M8 20l4-5 4 5" />
                </svg>
              </div>
              <div className="a11y-header-text">
                <h3 className="a11y-title">Menu Aksesibilitas</h3>
                <p className="a11y-subtitle">
                  Sesuaikan tampilan website agar lebih mudah digunakan sesuai kebutuhan Anda.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="a11y-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup Menu Aksesibilitas"
              title="Tutup Menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="a11y-panel-body">
            <div className="a11y-voice-mode-row">
              <div className="a11y-voice-mode-left">
                <div className="a11y-voice-wave-container" aria-hidden="true">
                  <svg
                    viewBox="0 0 28 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="a11y-voice-wave-svg"
                  >
                    <path d="M2 10h3l2-6 3 12 3-12 3 12 2-6h7" />
                  </svg>
                </div>
                <div className="a11y-voice-label-group">
                  <span className="a11y-voice-label">
                    {settings.voiceMode ? 'Mode Suara Aktif' : 'Aktifkan Mode Suara'}
                  </span>
                  <span className="a11y-voice-hint">
                    Pembaca teks otomatis untuk tunanetra
                  </span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings.voiceMode}
                aria-label="Aktifkan Mode Suara (Text to Speech)"
                title={settings.voiceMode ? 'Matikan Mode Suara' : 'Aktifkan Mode Suara'}
                className={`a11y-switch-btn ${settings.voiceMode ? 'a11y-switch-btn--on' : ''}`}
                onClick={toggleVoiceMode}
              >
                <span className="a11y-switch-knob">
                  {settings.voiceMode ? (
                    <FaCheck className="a11y-switch-icon a11y-switch-icon--check" />
                  ) : (
                    <FaTimes className="a11y-switch-icon a11y-switch-icon--times" />
                  )}
                </span>
              </button>
            </div>

            <div className="a11y-cards-grid">
              {features.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`a11y-card ${item.isActive ? 'a11y-card--active' : ''}`}
                  onClick={item.onClick}
                >
                  <div className="a11y-card-icon-container">{item.icon}</div>
                  <div className="a11y-card-info">
                    <span className="a11y-card-title">{item.title}</span>
                    <span className="a11y-card-desc">{item.desc}</span>
                  </div>

                  {item.status && (
                    <span className="a11y-card-badge">
                      <FaCheck className="a11y-badge-check" />
                      {item.status}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="a11y-reset-btn"
              onClick={resetAll}
            >
              <FaRedo className="a11y-reset-icon" />
              <span>Reset Semua Pengaturan</span>
            </button>

            <div className="a11y-position-section">
              <div className="a11y-position-header">
                <FaCog className="a11y-cog-icon" />
                <span>Posisi Widget Aksesibilitas</span>
              </div>

              <div className="a11y-position-buttons">
                <button
                  type="button"
                  className={`a11y-pos-btn ${settings.widgetPosition === 'left' ? 'a11y-pos-btn--active' : ''}`}
                  onClick={() => setWidgetPosition('left')}
                >
                  Kiri
                </button>
                <button
                  type="button"
                  className={`a11y-pos-btn ${settings.widgetPosition === 'right' ? 'a11y-pos-btn--active' : ''}`}
                  onClick={() => setWidgetPosition('right')}
                >
                  Kanan
                </button>
                <button
                  type="button"
                  className={`a11y-pos-btn ${settings.widgetPosition === 'hidden' ? 'a11y-pos-btn--active' : ''}`}
                  onClick={() => setWidgetPosition('hidden')}
                >
                  Sembunyikan
                </button>
              </div>
            </div>

            <div className="a11y-panel-footer-note">
              LAYANAN PENGADILAN AGAMA KOTA CIMAHI
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityWidget;
