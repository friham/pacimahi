import { useState } from 'react';
import PublikasiLayout from './PublikasiLayout';
import { FaCalendarAlt, FaUser, FaSearch, FaChevronRight, FaEye } from 'react-icons/fa';

const newsList = [
  {
    id: 1,
    title: 'Pengadilan Agama Kota Cimahi Raih Predikat Sangat Baik dalam Penilaian Kinerja Triwulan Ditjen Badilag',
    excerpt: 'Pengadilan Agama Kota Cimahi kembali menorehkan prestasi gemilang dengan meraih nilai rapor kinerja penanganan perkara dan SIPP tertinggi di wilayah Jawa Barat.',
    category: 'Prestasi',
    date: '28 Februari 2025',
    author: 'Humas PA Cimahi',
    views: '1.420',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    title: 'Sosialisasi Pelayanan Ramah Kaum Rentan dan Penyandang Disabilitas di Lingkungan PTSP',
    excerpt: 'Guna meningkatkan inklusivitas pelayanan publik peradilan, PA Kota Cimahi menggelar pelatihan bahasa isyarat dan pendampingan disabilitas bagi seluruh petugas front office.',
    category: 'Pelayanan Publik',
    date: '20 Februari 2025',
    author: 'Tim IT & PTSP',
    views: '980',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Rapat Koordinasi dan Penandatanganan MoU Pos Bantuan Hukum (Posbakum) TA 2025',
    excerpt: 'Kerjasama penyediaan bantuan hukum cuma-cuma bagi masyarakat kurang mampu kembali diperpanjang dengan penandatanganan Memorandum of Understanding bersama LBH mitra resmi.',
    category: 'Kerjasama',
    date: '10 Januari 2025',
    author: 'Kepaniteraan',
    views: '1.250',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    title: 'Pelaksanaan Sidang Keliling Terpadu di Kecamatan Cililin: Dekatkan Keadilan bagi Warga',
    excerpt: 'Masyarakat pencari keadilan di pelosok wilayah hukum mendapatkan kemudahan pengesahan nikah (itsbat nikah) dan administrasi kependudukan terpadu secara langsung.',
    category: 'Kegiatan',
    date: '05 Januari 2025',
    author: 'Humas PA Cimahi',
    views: '1.870',
    image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=600&auto=format&fit=crop&q=60'
  }
];

function BeritaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Prestasi', 'Pelayanan Publik', 'Kerjasama', 'Kegiatan'];

  const filteredNews = newsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <PublikasiLayout
      title="Berita Pengadilan"
      subtitle="Kabar Terkini, Kegiatan Kedinasan, Prestasi, dan Informasi Seputar Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Berita"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedCategory === cat ? '#1b5e20' : '#f1f5f9',
                  color: selectedCategory === cat ? '#fff' : '#475569',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '260px' }}>
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '0.85rem'
              }}
            />
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredNews.map((news) => (
            <article
              key={news.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={news.image}
                  alt={news.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(27, 94, 32, 0.9)',
                  color: '#fff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  {news.category}
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#64748b', marginBottom: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaCalendarAlt size={10} /> {news.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaEye size={10} /> {news.views}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', color: '#1e293b', margin: '0 0 10px 0', lineHeight: 1.4, fontWeight: 700 }}>
                  {news.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.5, flex: 1 }}>
                  {news.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaUser size={10} /> {news.author}
                  </span>
                  <button
                    onClick={() => alert(`Membaca selengkapnya: "${news.title}"`)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#1b5e20',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Selengkapnya <FaChevronRight size={10} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublikasiLayout>
  );
}

export default BeritaPage;
