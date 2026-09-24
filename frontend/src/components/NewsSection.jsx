import { useState, useEffect } from 'react';
import axios from 'axios';
import { sanitizeHtml } from '../sanitize';
import { FaCalendarAlt, FaUser, FaArrowRight, FaTimes, FaTag } from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';
import { API_URL, SERVER_URL } from '../config';
import './NewsSection.css';

const defaultFallbackNews = [
  {
    id: 1,
    title: 'Pencanangan Pembangunan Zona Integritas PA Kota Cimahi Menuju WBBM 2026',
    slug: 'pencanangan-zi-pa-cimahi-2026',
    content: 'Pengadilan Agama Kota Cimahi berkomitmen mewujudkan birokrasi yang bersih, melayani, dan bebas dari korupsi dengan meningkatkan standar pelayanan terpadu satu pintu (PTSP). Ketua Pengadilan Agama Kota Cimahi menegaskan bahwa seluruh aparatur peradilan siap memberikan pelayanan berkelas dunia dengan prinsip Cermat, Ikhlas, Nyaman, Transparan, dan Akuntabel (CINTA). Transformasi digital terus digencarkan guna mempermudah akses keadilan bagi seluruh lapisan masyarakat Kota Cimahi.',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    category: 'berita',
    author_name: 'Humas PA Cimahi',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Pengumuman Jadwal Pelayanan PTSP dan Sidang Selama Bulan Ramadhan',
    slug: 'pengumuman-jadwal-layanan-ramadhan',
    content: 'Diberitahukan kepada seluruh masyarakat pencari keadilan bahwa jam operasional pelayanan dan persidangan mengalami penyesuaian selama bulan Ramadhan. Pelayanan PTSP dibuka mulai pukul 08.00 WIB hingga pukul 15.00 WIB pada hari Senin hingga Kamis, serta pukul 08.00 WIB hingga 15.30 WIB pada hari Jumat. Pelayanan pendaftaran mandiri melalui e-Court tetap aktif 24 jam.',
    image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    category: 'pengumuman',
    author_name: 'Sekretariat',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Panduan Pendaftaran Perkara Secara Mandiri Melalui E-Court Mahkamah Agung',
    slug: 'panduan-ecourt-mandiri-2026',
    content: 'Masyarakat kini dapat mendaftarkan gugatan, membayar panjar biaya perkara, hingga menerima panggilan sidang secara daring melalui platform e-Court MA RI. Langkah-langkahnya mencakup pembuatan akun pengguna perorangan, pengisian formulir gugatan, pengunggahan dokumen KTP dan buku nikah, serta pembayaran panjar perkara melalui virtual account. Penggunaan e-Court memangkas biaya panggilan sidang hingga 60%.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    category: 'artikel',
    author_name: 'Kepaniteraan Hukum',
    created_at: new Date().toISOString()
  }
];

const formatNewsDate = (dateString, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!dateString) return '-';
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? '-' : parsed.toLocaleDateString('id-ID', options);
};

function NewsSection() {
  const [newsList, setNewsList] = useState(() => 
    defaultFallbackNews.map(item => ({
      ...item,
      created_at: item.created_at || new Date().toISOString()
    }))
  );
  const [activeCategory, setActiveCategory] = useState('semua');
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/news`);
        if (res.data.success) {
          const nowIso = new Date().toISOString();
          const normalized = res.data.data.map(item => ({
            ...item,
            created_at: item.created_at || nowIso
          }));
          setNewsList(normalized);
        }
      } catch {
        // Gagal fetch: gunakan daftar berita fallback statis.
      }
    };
    fetchNews();
  }, []);

  const filteredNews = activeCategory === 'semua'
    ? newsList
    : newsList.filter(n => n.category === activeCategory);

  const headerRef = useScrollReveal();

  return (
    <section className="news-section" id="berita">
      <div className="container">
        <div ref={headerRef} className="news-section__header scroll-reveal">
          <span className="news-section__tag">Publikasi Terkini</span>
          <h2 className="section-title">Berita & Informasi Pengadilan</h2>
          <p className="section-subtitle">
            Kabar terbaru seputar kegiatan peradilan, inovasi pelayanan, dan pengumuman resmi PA Kota Cimahi
          </p>

          <div className="news-filters">
            {['semua', 'berita', 'pengumuman', 'artikel'].map((cat) => (
              <button
                key={cat}
                className={`news-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="news-grid">
          {filteredNews.map((item, idx) => {
            const isPdf = item.image_url && item.image_url.toLowerCase().endsWith('.pdf');
            const fileUrl = item.image_url && item.image_url.startsWith('/')
              ? `${SERVER_URL}${item.image_url}`
              : item.image_url;

            return (
              <article key={item.id || idx} className="news-card animate-fade-in-up">
                <div className="news-card__image-wrap">
                  {isPdf ? (
                    <div style={{
                      height: '180px',
                      background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#e11d48'
                    }}>
                      <span style={{ fontSize: '3rem' }}>📄</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '8px', color: '#9f1239' }}>Dokumen PDF Official</span>
                    </div>
                  ) : fileUrl ? (
                    <>
                      <img
                        src={fileUrl}
                        alt={item.title}
                        className="news-card__img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div style={{ display: 'none', height: '180px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#92400e' }}>
                        <span style={{ fontSize: '2rem' }}>⚠️</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '6px' }}>Gambar tidak dapat dimuat</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ height: '180px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                      <span style={{ fontSize: '2.5rem' }}>📰</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '6px' }}>Gambar belum diunggah</span>
                    </div>
                  )}
                  <span className={`news-card__badge news-card__badge--${item.category}`}>
                    {item.category}
                  </span>
                </div>

                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span>
                      <FaCalendarAlt /> {formatNewsDate(item.created_at)}
                    </span>
                    <span>
                      <FaUser /> {item.author_name || 'Admin'}
                    </span>
                  </div>

                  <h3 className="news-card__title" onClick={() => setSelectedNews(item)}>
                    {item.title}
                  </h3>

                  <p className="news-card__excerpt">
                    {(() => {
                      const plainText = (item.content || '').replace(/<[^>]*>/g, '').substring(0, 130);
                      return plainText || 'Ringkasan konten berita...';
                    })()}...
                  </p>

                  <button
                    type="button"
                    className="news-card__read-more"
                    onClick={() => setSelectedNews(item)}
                  >
                    Baca Selengkapnya <FaArrowRight />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {selectedNews && (
          <div className="news-modal-overlay" onClick={() => setSelectedNews(null)}>
            <div className="news-modal animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <button className="news-modal__close" onClick={() => setSelectedNews(null)}>
                <FaTimes />
              </button>

              <div className="news-modal__header-img-wrap">
                {selectedNews.image_url && selectedNews.image_url.toLowerCase().endsWith('.pdf') ? (
                  <div style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                    textAlign: 'center',
                    color: '#e11d48'
                  }}>
                    <div style={{ fontSize: '4rem' }}>📑</div>
                    <h3 style={{ color: '#9f1239', margin: '0.5rem 0' }}>Lampiran Dokumen PDF</h3>
                    <a
                      href={selectedNews.image_url.startsWith('/') ? `${SERVER_URL}${selectedNews.image_url}` : selectedNews.image_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '10px 24px',
                        background: '#e11d48',
                        color: 'white',
                        borderRadius: '20px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        marginTop: '10px'
                      }}
                    >
                      Buka / Unduh File PDF
                    </a>
                  </div>
                ) : selectedNews.image_url ? (
                  <>
                    <img
                      src={selectedNews.image_url.startsWith('/') ? `${SERVER_URL}${selectedNews.image_url}` : selectedNews.image_url}
                      alt={selectedNews.title}
                      className="news-modal__header-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{ display: 'none', height: '240px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#92400e' }}>
                      <span style={{ fontSize: '2.5rem' }}>⚠️</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '8px' }}>Gambar tidak dapat dimuat</span>
                    </div>
                  </>
                ) : (
                  <div style={{ height: '240px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                    <span style={{ fontSize: '3rem' }}>📰</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '8px' }}>Gambar belum diunggah</span>
                  </div>
                )}
              </div>

              <div className="news-modal__content">
                <div className="news-modal__meta">
                  <span className={`news-card__badge news-card__badge--${selectedNews.category}`}>
                    <FaTag /> {selectedNews.category}
                  </span>
                  <span>
                    <FaCalendarAlt /> {formatNewsDate(selectedNews.created_at, { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span>
                    <FaUser /> {selectedNews.author_name || 'Humas PA Cimahi'}
                  </span>
                </div>

                <h2 className="news-modal__title">{selectedNews.title}</h2>

                <div
                  className="news-modal__text"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedNews.content || '') }}
                />

                {selectedNews.image_url && selectedNews.image_url.toLowerCase().endsWith('.pdf') && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                    <strong>📄 Dokumen Terlampir:</strong>
                    <div style={{ marginTop: '6px' }}>
                      <a
                        href={selectedNews.image_url.startsWith('/') ? `${SERVER_URL}${selectedNews.image_url}` : selectedNews.image_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#2563eb', fontWeight: 600 }}
                      >
                        Klik di sini untuk mengunduh dokumen resmi (PDF)
                      </a>
                    </div>
                  </div>
                )}

                <div className="news-modal__footer">
                  <button className="news-modal__btn-close" onClick={() => setSelectedNews(null)}>
                    Tutup Artikel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;
