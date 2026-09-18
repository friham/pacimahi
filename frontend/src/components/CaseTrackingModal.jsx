import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaGavel, FaExternalLinkAlt, FaInfoCircle, FaSearch } from 'react-icons/fa';
import './CaseTrackingModal.css';

function CaseTrackingModal({ isOpen, onClose, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');
  const inputRef = useRef(null);

  // Sync initialQuery when opened
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSearchedTerm(initialQuery);
      setHasSubmitted(Boolean(initialQuery && initialQuery.trim()));
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setHasSubmitted(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialQuery]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchedTerm(query.trim());
    setHasSubmitted(true);
  };

  const modalElement = (
    <div 
      className="case-modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="case-modal-title"
    >
      <div className="case-modal animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="case-modal__header">
          <div className="case-modal__header-icon">
            <FaGavel />
          </div>
          <div>
            <h3 id="case-modal-title" className="case-modal__title">
              Informasi &amp; Pelacakan Perkara (SIPP)
            </h3>
            <p className="case-modal__subtitle">Pengadilan Agama Kota Cimahi</p>
          </div>
          <button 
            type="button" 
            className="case-modal__close" 
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="case-modal__body">
          <form className="case-modal__search-form" onSubmit={handleSearch}>
            <div className="case-modal__input-wrapper">
              <FaSearch className="case-modal__search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="case-modal__input"
                placeholder="Masukkan nomor perkara (contoh: 124/Pdt.G/2026/PA.Cmi)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="case-modal__search-btn">
                Cek Perkara
              </button>
            </div>
          </form>

          {hasSubmitted ? (
            <div className="case-notice-card animate-fade-in-up">
              <div className="case-notice-card__badge">
                <FaInfoCircle className="case-notice-card__icon" />
                <span>Pencarian: <strong>{searchedTerm}</strong></span>
              </div>
              <h4 className="case-notice-card__title">
                Pelacakan Langsung Melalui Portal Resmi SIPP
              </h4>
              <p className="case-notice-card__desc">
                Pencarian mandiri data nomor perkara belum tersedia langsung di website profil ini demi menjaga keakuratan dan keabsahan data persidangan secara <em>real-time</em>.
              </p>
              <p className="case-notice-card__desc">
                Silakan cek status tahapan perkara, riwayat persidangan, biaya, dan putusan Anda secara resmi melalui portal Sistem Informasi Penelusuran Perkara (SIPP) Pengadilan Agama Kota Cimahi.
              </p>
              <div className="case-notice-card__action">
                <a
                  href="https://sipp.pa-cimahi.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-notice-card__btn"
                >
                  <FaExternalLinkAlt /> Buka Portal Resmi SIPP PA Cimahi
                </a>
              </div>
            </div>
          ) : (
            <div className="case-modal__placeholder">
              <div className="case-modal__placeholder-icon-box">
                <FaGavel />
              </div>
              <h4 className="case-modal__placeholder-title">Pencarian Status Perkara</h4>
              <p className="case-modal__placeholder-text">
                Ketik nomor perkara di kolom atas, lalu klik <strong>Cek Perkara</strong> untuk petunjuk verifikasi resmi melalui SIPP Mahkamah Agung RI.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalElement, document.body) : null;
}

export default CaseTrackingModal;
