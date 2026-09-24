import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PublikasiLayout from './PublikasiLayout';
import { FaCalendarAlt, FaUser, FaSearch, FaChevronRight, FaTimes, FaNewspaper, FaSpinner } from 'react-icons/fa';
import { API_URL, SERVER_URL } from '../../config';
import { sanitizeHtml } from '../../sanitize';

const categories = ['Semua', 'Berita', 'Pengumuman', 'Artikel'];

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

function BeritaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [lastUrlSearch, setLastUrlSearch] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedNews, setSelectedNews] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  if (urlSearch !== lastUrlSearch) {
    setLastUrlSearch(urlSearch);
    setSearchTerm(urlSearch);
  }

  const applySearch = (value) => {
    setSearchTerm(value);
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (value) next.set('search', value);
    else next.delete('search');
    setSearchParams(next, { replace: true });
  };

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page };
      if (selectedCategory !== 'Semua') {
        params.category = selectedCategory.toLowerCase();
      }
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const res = await axios.get(`${API_URL}/news`, { params });
      if (res.data?.success) {
        setNewsList(res.data.data || []);
        setTotalPages(res.data.meta?.totalPages || 1);
      } else {
        setNewsList([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setNewsList([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchNews]);

  const pagerStart = Math.max(1, Math.min(page - 2, totalPages - 4));
  const pagerEnd = Math.min(totalPages, pagerStart + 4);
  const pageNumbers = [];
  for (let i = pagerStart; i <= pagerEnd; i++) pageNumbers.push(i);

  const changePage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PublikasiLayout
      title="Berita Pengadilan"
      subtitle="Kabar Terkini, Kegiatan Kedinasan, Prestasi, dan Informasi Seputar Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Berita"
    >
      <div className="pa-content-card">
        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => { setSelectedCategory(cat); setPage(1); }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: selectedCategory === cat ? '#1b5e20' : '#f1f5f9',
                  color: selectedCategory === cat ? '#fff' : '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Cari judul atau isi berita..."
              value={searchTerm}
              onChange={(e) => applySearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.86rem',
                outline: 'none',
                background: '#fff'
              }}
            />
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            {searchTerm && (
              <button
                type="button"
                onClick={() => applySearch('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
                title="Hapus pencarian"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Content State: Loading, Empty, or Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#1b5e20' }}>
            <FaSpinner className="spin" size={32} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '12px', fontSize: '0.95rem', color: '#64748b' }}>Memuat daftar berita...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1'
          }}>
            <FaNewspaper size={44} style={{ color: '#94a3b8', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#334155', margin: '0 0 6px 0', fontWeight: 800 }}>
              {searchTerm || selectedCategory !== 'Semua' 
                ? 'Tidak Ada Berita yang Cocok' 
                : 'Belum Ada Berita yang Dipublikasikan'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}>
              {searchTerm || selectedCategory !== 'Semua'
                ? 'Coba gunakan kata kunci lain atau pilih kategori yang berbeda.'
                : 'Saat ini belum ada publikasi berita terbaru yang ditambahkan ke sistem.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {newsList.map((item) => {
              const fileUrl = item.image_url && item.image_url.startsWith('/')
                ? `${SERVER_URL}${item.image_url}`
                : item.image_url;

              const excerpt = item.content
                ? item.content.replace(/<[^>]*>?/gm, '').substring(0, 140) + '...'
                : '';

              return (
                <article
                  key={item.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <div style={{ height: '190px', overflow: 'hidden', position: 'relative', background: '#f1f5f9' }}>
                    <img
                      src={fileUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60'}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60';
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(27, 94, 32, 0.92)',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      {item.category || 'Berita'}
                    </span>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.76rem', color: '#64748b', marginBottom: '10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaCalendarAlt size={11} /> {formatDate(item.published_at || item.created_at)}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: '0 0 10px 0', lineHeight: 1.4, fontWeight: 800 }}>
                      {item.title}
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: '#475569', margin: '0 0 16px 0', lineHeight: 1.55, flex: 1 }}>
                      {excerpt}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaUser size={11} /> {item.author_name || 'Admin'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedNews(item)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#1b5e20',
                          fontWeight: 800,
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 0'
                        }}
                      >
                        Selengkapnya <FaChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '28px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => changePage(page - 1)}
              disabled={page <= 1}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#fff',
                color: page <= 1 ? '#cbd5e1' : '#334155',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: page <= 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ‹ Sebelumnya
            </button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => changePage(p)}
                style={{
                  minWidth: '38px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: p === page ? '#1b5e20' : '#e2e8f0',
                  background: p === page ? '#1b5e20' : '#fff',
                  color: p === page ? '#fff' : '#334155',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => changePage(page + 1)}
              disabled={page >= totalPages}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#fff',
                color: page >= totalPages ? '#cbd5e1' : '#334155',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Berikutnya ›
            </button>
          </div>
        )}

        {/* Modal Detail Berita */}
        {selectedNews && (
          <div
            className="news-modal-overlay"
            onClick={() => setSelectedNews(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div
              className="news-modal animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: '16px',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                title="Tutup"
              >
                <FaTimes />
              </button>

              {selectedNews.image_url && (
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={selectedNews.image_url.startsWith('/') ? `${SERVER_URL}${selectedNews.image_url}` : selectedNews.image_url}
                    alt={selectedNews.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    background: '#e8f5e9',
                    color: '#1b5e20',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase'
                  }}>
                    {selectedNews.category || 'Berita'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {formatDate(selectedNews.published_at || selectedNews.created_at)}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.35, marginBottom: '16px' }}>
                  {selectedNews.title}
                </h2>

                <div
                  style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedNews.content || '') }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PublikasiLayout>
  );
}

export default BeritaPage;
