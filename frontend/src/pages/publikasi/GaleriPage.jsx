import { useState } from 'react';
import PublikasiLayout from './PublikasiLayout';
import { FaImages, FaVideo, FaCalendarAlt, FaTimes, FaPlayCircle } from 'react-icons/fa';

const galleryPhotos = [
  {
    id: 1,
    title: 'Apel Pagi dan Pemberian Reward Pegawai Teladan Bulan Februari 2025',
    category: 'Kegiatan Kantor',
    date: '24 Februari 2025',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    caption: 'Penyerahan piagam penghargaan kepada Agen Perubahan dan Pegawai Berprestasi periode Triwulan I.'
  },
  {
    id: 2,
    title: 'Pelaksanaan Sidang Keliling Terpadu di Kecamatan Cililin',
    category: 'Pelayanan Perkara',
    date: '12 Februari 2025',
    image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&auto=format&fit=crop&q=80',
    caption: 'Majelis Hakim memeriksa perkara permohonan itsbat nikah terpadu bersama KUA dan Disdukcapil.'
  },
  {
    id: 3,
    title: 'Bimbingan Teknis Peningkatan Kapasitas Tenaga Teknis Kepaniteraan',
    category: 'Pelatihan / Bimtek',
    date: '28 Januari 2025',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    caption: 'Peserta bimtek menyimak materi implementasi Surat Tercatat dan eksekusi putusan perdata agama.'
  },
  {
    id: 4,
    title: 'Rapat Pleno Pembahasan Tindak Lanjut Hasil Pengawasan Hawasbid',
    category: 'Rapat Koordinasi',
    date: '15 Januari 2025',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    caption: 'Evaluasi berkala kepatuhan SOP dan akurasi data penanganan perkara SIPP.'
  },
  {
    id: 5,
    title: 'Penandatanganan Perjanjian Kerjasama (MoU) Pos Bantuan Hukum TA 2025',
    category: 'Kerjasama Lembaga',
    date: '06 Januari 2025',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    caption: 'Pimpinan PA Kota Cimahi bersama pimpinan LBH mitra menyepakati komitmen layanan Posbakum prima.'
  },
  {
    id: 6,
    title: 'Sosialisasi Pencegahan Gratifikasi dan Pungutan Liar oleh Tim Satgas Saber Pungli',
    category: 'Zona Integritas',
    date: '18 Desember 2024',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    caption: 'Penguatan integritas moral seluruh pegawai untuk menjaga marwah institusi peradilan yang agung.'
  }
];

function GaleriPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('foto');

  return (
    <PublikasiLayout
      title="Galeri Foto & Video"
      subtitle="Dokumentasi Visual Kegiatan, Pelayanan Publik, Persidangan, dan Agenda Resmi Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Galeri"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('foto')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'foto' ? '#1b5e20' : 'transparent',
              color: activeTab === 'foto' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaImages /> Galeri Foto Kegiatan
          </button>
          <button
            onClick={() => setActiveTab('video')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'video' ? '#1b5e20' : 'transparent',
              color: activeTab === 'video' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaVideo /> Video Profil & Edukasi
          </button>
        </div>

        {activeTab === 'foto' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {galleryPhotos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <FaCalendarAlt size={10} /> {item.date}
                    </div>
                    <h3 style={{ fontSize: '0.88rem', color: '#1e293b', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Video Profil Resmi PA Kota Cimahi 2025', durasi: '04:15', channel: 'PA Cimahi Official' },
                { title: 'Panduan e-Court: Cara Daftar Gugatan Mandiri Online', durasi: '06:30', channel: 'Badilag MA RI' },
                { title: 'Sosialisasi Hak Perempuan dan Anak Pasca Perceraian', durasi: '05:45', channel: 'Humas PA Cimahi' },
              ].map((v, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
                  <div style={{ height: '180px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', position: 'relative', cursor: 'pointer' }}
                    onClick={() => alert(`Memutar video: ${v.title}`)}
                  >
                    <FaPlayCircle size={48} color="#22c55e" />
                    <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>
                      {v.durasi}
                    </span>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h3 style={{ fontSize: '0.92rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>{v.title}</h3>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Kanal: {v.channel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '750px',
                width: '100%',
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.6)',
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
              >
                <FaTimes size={16} />
              </button>
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  {selectedPhoto.category} • {selectedPhoto.date}
                </div>
                <h3 style={{ fontSize: '1.1rem', color: '#1e293b', margin: '0 0 8px 0', fontWeight: 700 }}>
                  {selectedPhoto.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublikasiLayout>
  );
}

export default GaleriPage;
