import { useState } from 'react';
import PublikasiLayout from './PublikasiLayout';
import { 
  FaCalendarAlt, 
  FaFilePdf, 
  FaSearch, 
} from 'react-icons/fa';

const announcementList = [
  {
    id: 1,
    title: 'Pengumuman Pelaksanaan Sidang Keliling Terpadu Tahap I Tahun Anggaran 2025',
    nomor: 'W10-A19/045/HK.05/I/2025',
    date: '15 Januari 2025',
    category: 'Pelayanan Perkara',
    fileSize: '1.4 MB',
    summary: 'Diberitahukan kepada masyarakat di wilayah Kecamatan Cililin, Cihampelas, dan sekitarnya mengenai jadwal pelaksanaan sidang keliling isbat nikah terpadu.',
    important: true,
  },
  {
    id: 2,
    title: 'Hasil Seleksi Penyedia Layanan Pos Bantuan Hukum (Posbakum) PA Kota Cimahi TA 2025',
    nomor: 'W10-A19/012/PL.01/I/2025',
    date: '08 Januari 2025',
    category: 'Pengadaan / Seleksi',
    fileSize: '850 KB',
    summary: 'Pengumuman penetapan lembaga bantuan hukum pemenang seleksi penyedia jasa pos bantuan hukum (Posbakum) Pengadilan Agama Kota Cimahi.',
    important: false,
  },
  {
    id: 3,
    title: 'Penetapan Jam Kerja Pelayanan PTSP dan Jadwal Sidang Selama Bulan Suci Ramadhan 1446 H',
    nomor: 'W10-A19/189/OT.01/II/2025',
    date: '25 Februari 2025',
    category: 'Operasional',
    fileSize: '620 KB',
    summary: 'Penyesuaian jam kerja kantor dan loket PTSP selama bulan Ramadhan: Senin-Kamis (08.00-15.00 WIB) dan Jumat (08.00-15.30 WIB).',
    important: true,
  },
  {
    id: 4,
    title: 'Pengumuman Panggilan Ghaib Perkara Gugatan Perceraian Terdaftar Bulan Februari 2025',
    nomor: 'W10-A19/PG/02/2025',
    date: '10 Februari 2025',
    category: 'Panggilan Sidang',
    fileSize: '1.1 MB',
    summary: 'Panggilan persidangan melalui media resmi pengadilan bagi pihak Tergugat/Termohon yang tidak diketahui tempat tinggalnya di seluruh wilayah Republik Indonesia.',
    important: false,
  },
];

function PengumumanPage() {
  const [search, setSearch] = useState('');

  const filteredAnnouncements = announcementList.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.nomor.toLowerCase().includes(search.toLowerCase()) ||
    item.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PublikasiLayout
      title="Pengumuman Resmi"
      subtitle="Pemberitahuan Resmi, Pengumuman Sidang Keliling, Hasil Seleksi Posbakum, dan Kebijakan Operasional PA Kota Cimahi"
      breadcrumb="Pengumuman"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Arsip Pengumuman Resmi Satker</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Dokumen dan pengumuman yang diterbitkan oleh Pengadilan Agama Kota Cimahi Kelas IA</p>
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Cari nomor atau judul pengumuman..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              style={{
                border: item.important ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                borderLeft: item.important ? '5px solid #16a34a' : '5px solid #64748b',
                borderRadius: '8px',
                padding: '18px 20px',
                background: item.important ? '#f0fdf4' : '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#e2e8f0', color: '#334155', padding: '2px 8px', borderRadius: '4px' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaCalendarAlt size={10} /> {item.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#0369a1', fontFamily: 'monospace', marginBottom: '8px' }}>
                  Nomor: {item.nomor}
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  {item.summary}
                </p>
              </div>

              <button
                onClick={() => alert(`Mengunduh dokumen pengumuman: ${item.title}`)}
                style={{
                  background: '#1b5e20',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexShrink: 0
                }}
              >
                <FaFilePdf size={12} /> Unduh PDF ({item.fileSize})
              </button>
            </div>
          ))}
        </div>
      </div>
    </PublikasiLayout>
  );
}

export default PengumumanPage;
