import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaSearch, FaTimes, FaFileAlt, FaNewspaper, 
  FaConciergeBell, FaSpinner, FaExternalLinkAlt 
} from 'react-icons/fa';
import { API_URL } from '../config';
import './GlobalSearchBox.css';

export default function GlobalSearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalInputRef = useRef(null);
  const modalDialogRef = useRef(null);

  // Focus modal input and freeze background body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (modalInputRef.current) {
          modalInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close modal and basic focus trapping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseModal();
      }

      // Tab key navigation within modal
      if (e.key === 'Tab' && modalDialogRef.current) {
        const focusableElements = modalDialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_URL}/search`, {
          params: { q: query.trim() }
        });
        if (res.data?.success) {
          setResults(res.data.data || []);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error('Error fetching global search:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSelectResult = () => {
    handleCloseModal();
  };

  const pages = results.filter((r) => r.type === 'halaman');
  const news = results.filter((r) => r.type === 'berita');
  const services = results.filter((r) => r.type === 'layanan');

  // Render modal dialog via React Portal into document.body
  const modalContent = isOpen ? (
    <div 
      className="search-modal-backdrop" 
      onClick={handleCloseModal}
      aria-hidden="false"
    >
      <div 
        className="search-modal-card" 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="search-modal-label"
        ref={modalDialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Input Header */}
        <div className="search-modal-header">
          <FaSearch className="search-modal-header__icon" />
          <input
            id="search-modal-label"
            ref={modalInputRef}
            type="text"
            className="search-modal-header__input"
            placeholder="Ketik untuk mencari halaman, berita, atau layanan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {loading && <FaSpinner className="search-modal-header__spinner spin" />}
          {query && !loading && (
            <button
              type="button"
              className="search-modal-header__clear"
              onClick={() => {
                setQuery('');
                setResults([]);
                if (modalInputRef.current) modalInputRef.current.focus();
              }}
              title="Hapus ketikan"
              aria-label="Hapus ketikan"
            >
              <FaTimes />
            </button>
          )}
          <button
            type="button"
            className="search-modal-header__close"
            onClick={handleCloseModal}
            title="Tutup pencarian (Esc)"
            aria-label="Tutup pencarian"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Content / Results */}
        <div className="search-modal-body">
          {/* State 1: Typing / Loading */}
          {loading && (
            <div className="search-modal-status">
              <FaSpinner className="spin" />
              <span>Mencari informasi...</span>
            </div>
          )}

          {/* State 2: Untouched / query < 2 */}
          {!loading && query.trim().length < 2 && (
            <div className="search-modal-placeholder">
              <div className="search-modal-placeholder__icon-box">
                <FaSearch />
              </div>
              <p className="search-modal-placeholder__title">
                Cari Segala Informasi PA Cimahi
              </p>
              <p className="search-modal-placeholder__desc">
                Masukkan minimal 2 huruf untuk menemukan dokumen pengadilan, panduan berperkara, berita terkini, atau layanan PTSP online.
              </p>
              <div className="search-modal-quick-chips">
                <span className="search-modal-quick-label">Saran pencarian:</span>
                {['Sejarah', 'Biaya Perkara', 'Jadwal Sidang', 'e-Court', 'Gugatan Mandiri'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="search-modal-chip"
                    onClick={() => {
                      setQuery(chip);
                      if (modalInputRef.current) modalInputRef.current.focus();
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* State 3: Query >= 2 but no results */}
          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="search-modal-empty">
              <p className="search-modal-empty__title">Tidak ada hasil ditemukan</p>
              <p className="search-modal-empty__desc">
                Tidak ada halaman, berita, atau layanan yang cocok dengan kata kunci <strong>"{query}"</strong>. Coba periksa ejaan kata atau gunakan istilah umum lainnya.
              </p>
            </div>
          )}

          {/* State 4: Has Results */}
          {!loading && results.length > 0 && (
            <div className="search-modal-results">
              {/* Group: Halaman */}
              {pages.length > 0 && (
                <div className="search-group">
                  <div className="search-group__title">
                    <FaFileAlt /> Halaman Konten ({pages.length})
                  </div>
                  <div className="search-group__list">
                    {pages.map((item) => (
                      <Link
                        key={item.id}
                        to={item.url}
                        className="search-result-item"
                        onClick={handleSelectResult}
                      >
                        <div className="search-result-item__main">
                          <span className="search-result-item__title">{item.title}</span>
                          {item.snippet && (
                            <p className="search-result-item__snippet">{item.snippet}</p>
                          )}
                        </div>
                        <span className="search-result-item__tag">Halaman</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Group: Layanan */}
              {services.length > 0 && (
                <div className="search-group">
                  <div className="search-group__title">
                    <FaConciergeBell /> Layanan ({services.length})
                  </div>
                  <div className="search-group__list">
                    {services.map((item) => (
                      item.isExternal ? (
                        <a
                          key={item.id}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="search-result-item"
                          onClick={handleSelectResult}
                        >
                          <div className="search-result-item__main">
                            <span className="search-result-item__title">
                              {item.title} <FaExternalLinkAlt size={10} style={{ marginLeft: 5, opacity: 0.7 }} />
                            </span>
                            {item.snippet && (
                              <p className="search-result-item__snippet">{item.snippet}</p>
                            )}
                          </div>
                          <span className="search-result-item__tag search-result-item__tag--service">Eksternal</span>
                        </a>
                      ) : (
                        <Link
                          key={item.id}
                          to={item.url}
                          className="search-result-item"
                          onClick={handleSelectResult}
                        >
                          <div className="search-result-item__main">
                            <span className="search-result-item__title">{item.title}</span>
                            {item.snippet && (
                              <p className="search-result-item__snippet">{item.snippet}</p>
                            )}
                          </div>
                          <span className="search-result-item__tag search-result-item__tag--service">Layanan</span>
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Group: Berita */}
              {news.length > 0 && (
                <div className="search-group">
                  <div className="search-group__title">
                    <FaNewspaper /> Berita &amp; Publikasi ({news.length})
                  </div>
                  <div className="search-group__list">
                    {news.map((item) => (
                      <Link
                        key={item.id}
                        to={item.url}
                        className="search-result-item"
                        onClick={handleSelectResult}
                      >
                        <div className="search-result-item__main">
                          <span className="search-result-item__title">{item.title}</span>
                          {item.snippet && (
                            <p className="search-result-item__snippet">{item.snippet}</p>
                          )}
                        </div>
                        <span className="search-result-item__tag search-result-item__tag--news">Berita</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer / Keyboard tip */}
        <div className="search-modal-footer">
          <span className="search-modal-tip">
            Tekan <kbd>Esc</kbd> untuk menutup
          </span>
          <span className="search-modal-tip">
            Pencarian Pengadilan Agama Kota Cimahi
          </span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="global-search-wrapper">
      {/* Search trigger bar in hero - purely click/focus trigger WITHOUT any submit button */}
      <div 
        className="global-search-trigger" 
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label="Buka pencarian umum website"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenModal();
          }
        }}
      >
        <FaSearch className="global-search-trigger__icon" />
        <input
          type="text"
          className="global-search-trigger__input"
          placeholder="Cari halaman, berita, atau layanan pengadilan..."
          readOnly
          onClick={handleOpenModal}
          onFocus={handleOpenModal}
          value=""
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* Render modal directly into body so it escapes parent overflow & clipping */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </div>
  );
}
