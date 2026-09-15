import { useState } from 'react';
import PublikasiLayout from './PublikasiLayout';
import { FaUserEdit, FaCalendarAlt, FaTag, FaSearch, FaArrowRight, FaFilePdf } from 'react-icons/fa';

const artikelData = [
  {
    id: 1,
    judul: 'Penerapan Asas Peradilan Sederhana, Cepat, dan Biaya Ringan Melalui e-Litigation di Lingkungan Peradilan Agama',
    penulis: 'Drs. H. Dudung, S.H., M.H.',
    jabatan: 'Ketua Pengadilan Agama Kota Cimahi',
    tanggal: '15 Februari 2025',
    kategori: 'Hukum Acara Perdata Agama',
    ringkasan: 'Analisis yuridis terhadap transformasi digital peradilan agama dalam memangkas birokrasi panggilan pihak, replik-duplik online, hingga pembacaan putusan secara elektronik.',
    bacaan: '8 Menit Membaca',
  },
  {
    id: 2,
    judul: 'Perlindungan Hak Nafkah Iddah dan Mut’ah Pascaperceraian Berdasarkan PERMA Nomor 3 Tahun 2017',
    penulis: 'Dra. Hj. Siti Aminah, M.H.ES.',
    jabatan: 'Wakil Ketua PA Kota Cimahi',
    tanggal: '28 Januari 2025',
    kategori: 'Hukum Keluarga Islam',
    ringkasan: 'Kajian empiris mengenai mekanisme eksekusi kewajiban nafkah mantan suami terhadap bekas istri dan anak untuk memastikan keadilan substantif.',
    bacaan: '6 Menit Membaca',
  },
  {
    id: 3,
    judul: 'Optimalisasi Mediasi Elektronik dalam Meminimalisir Angka Perceraian di Wilayah Kota Cimahi dan Kab. Bandung Barat',
    penulis: 'Drs. Subhan, M.H.',
    jabatan: 'Hakim Mediator Senior',
    tanggal: '10 Januari 2025',
    kategori: 'Mediasi Peradilan',
    ringkasan: 'Pemanfaatan mediasi daring teleconference dalam mempertemukan pihak yang berhalangan hadir secara fisik demi tercapainya kesepakatan damai (dading).',
    bacaan: '5 Menit Membaca',
  },
  {
    id: 4,
    judul: 'Harta Bersama dalam Perkawinan Poligami: Tinjauan Hukum Islam dan Kompilasi Hukum Islam (KHI)',
    penulis: 'Tim Kajian Hukum PA Cimahi',
    jabatan: 'Kepaniteraan Hukum',
    tanggal: '20 Desember 2024',
    kategori: 'Harta Bersama & Waris',
    ringkasan: 'Problematika pembagian harta bersama perkawinan kedua dan seterusnya tanpa persetujuan istri pertama serta kepastian hak waris anak.',
    bacaan: '7 Menit Membaca',
  },
];

function ArtikelHukumPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  const categories = ['Semua', 'Hukum Acara Perdata Agama', 'Hukum Keluarga Islam', 'Mediasi Peradilan', 'Harta Bersama & Waris'];

  const filtered = artikelData.filter(item => {
    const matchCat = selectedKategori === 'Semua' || item.kategori === selectedKategori;
    const matchSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase()) || item.penulis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PublikasiLayout
      title="Artikel Hukum & Opini Peradilan"
      subtitle="Kumpulan Karya Tulis Ilmiah, Analisis Putusan, dan Opini Hukum Pimpinan serta Aparatur Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Artikel Hukum"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedKategori(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid #cbd5e1',
                  background: selectedKategori === cat ? '#1b5e20' : '#fff',
                  color: selectedKategori === cat ? '#fff' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '260px' }}>
            <input
              type="text"
              placeholder="Cari judul artikel / penulis..."
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {filtered.map((art) => (
            <div
              key={art.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '20px',
                background: '#fff',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ background: '#ecfdf5', color: '#065f46', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '4px' }}>
                  <FaTag size={10} style={{ marginRight: '4px' }} /> {art.kategori}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaCalendarAlt size={11} /> {art.tanggal} • {art.bacaan}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: '#1e293b', margin: '0 0 8px 0', fontWeight: 700, lineHeight: 1.4 }}>
                {art.judul}
              </h3>

              <div style={{ fontSize: '0.82rem', color: '#0369a1', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FaUserEdit /> Oleh: {art.penulis} <em>({art.jabatan})</em>
              </div>

              <p style={{ fontSize: '0.86rem', color: '#475569', margin: '0 0 16px 0', lineHeight: 1.55 }}>
                {art.ringkasan}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <button
                  onClick={() => alert(`Membuka artikel lengkap: "${art.judul}"`)}
                  style={{
                    background: 'transparent',
                    color: '#1b5e20',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Baca Selengkapnya <FaArrowRight size={11} />
                </button>

                <button
                  onClick={() => alert(`Mengunduh naskah PDF: "${art.judul}"`)}
                  style={{
                    background: '#f1f5f9',
                    color: '#1b5e20',
                    border: '1px solid #cbd5e1',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <FaFilePdf size={11} /> Unduh PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublikasiLayout>
  );
}

export default ArtikelHukumPage;
