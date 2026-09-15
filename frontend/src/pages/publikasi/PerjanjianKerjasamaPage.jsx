import { useState } from 'react';
import PublikasiLayout from './PublikasiLayout';
import { 
  FaHandshake, 
  FaFilePdf, 
  FaDownload, 
  FaCalendarAlt, 
  FaBuilding, 
  FaCheckCircle, 
  FaSearch 
} from 'react-icons/fa';

const mouList = [
  {
    mitra: 'Lembaga Bantuan Hukum (LBH) Mitra Keadilan',
    nomor: 'W10-A19/008/HK.05/I/2025',
    tentang: 'Penyelenggaraan Layanan Pos Bantuan Hukum (Posbakum) Tahun Anggaran 2025',
    jangkaWaktu: '02 Januari 2025 s.d. 31 Desember 2025',
    kategori: 'Bantuan Hukum Cuma-Cuma',
    size: '2.4 MB',
  },
  {
    mitra: 'PT. Pos Indonesia (Persero) KC Cimahi',
    nomor: 'W10-A19/042/HK.05/III/2024',
    tentang: 'Kerja Sama Pengiriman Surat Panggilan Sidang, Pemberitahuan Putusan, dan Produk Pengadilan',
    jangkaWaktu: '2024 - 2026 (3 Tahun)',
    kategori: 'Ekspedisi Surat Tercatat',
    size: '1.8 MB',
  },
  {
    mitra: 'Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Cimahi & Kab. Bandung Barat',
    nomor: 'W10-A19/095/HK.05/VI/2024',
    tentang: 'Integrasi dan Sinkronisasi Penerbitan Dokumen Kependudukan Pasca Putusan Perceraian (Inovasi SAPA WARGA)',
    jangkaWaktu: '2024 - 2027 (Berlaku)',
    kategori: 'Integrasi Data Kependudukan',
    size: '3.2 MB',
  },
  {
    mitra: 'PT. Bank Syariah Indonesia (BSI) KC Cimahi',
    nomor: 'W10-A19/012/KU.01/I/2024',
    tentang: 'Pengelolaan Rekening Biaya Perkara, Penerimaan Pembayaran Virtual Account e-Court, dan Layanan Cashless PTSP',
    jangkaWaktu: '2024 - 2026',
    kategori: 'Perbankan & Transaksi Keuangan',
    size: '2.1 MB',
  },
  {
    mitra: 'Dinas Kesehatan Kota Cimahi & Kab. Bandung Barat',
    nomor: 'W10-A19/077/HK.05/V/2024',
    tentang: 'Pemeriksaan Kesehatan Reproduksi dan Kesiapan Fisik bagi Pemohon Dispensasi Kawin',
    jangkaWaktu: '2024 - 2026',
    kategori: 'Kesehatan Reproduksi Remaja',
    size: '1.9 MB',
  },
  {
    mitra: 'Dinas Pemberdayaan Perempuan, Perlindungan Anak dan KB (DP3AKB)',
    nomor: 'W10-A19/081/HK.05/V/2024',
    tentang: 'Pendampingan Psikologis dan Konseling Perlindungan Anak pada Perkara Dispensasi Kawin & Hak Asuh',
    jangkaWaktu: '2024 - 2026',
    kategori: 'Perlindungan Perempuan & Anak',
    size: '2.0 MB',
  },
];

function PerjanjianKerjasamaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mouList.filter(m => 
    m.mitra.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.tentang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PublikasiLayout
      title="Perjanjian Kerja Sama (MoU) Pihak Ketiga"
      subtitle="Daftar Naskah Nota Kesepahaman (MoU) dan Perjanjian Kerja Sama antara Pengadilan Agama Kota Cimahi Kelas IA dengan Instansi Pemerintah & Lembaga Mitra"
      breadcrumb="Perjanjian Pihak Ketiga"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Daftar MoU & PKS Aktif</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Mendukung inovasi layanan prima dan perlindungan hukum bagi masyarakat pencari keadilan</p>
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Cari mitra / perihal MoU..."
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filtered.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '18px',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                    {item.kategori}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#0369a1', fontFamily: 'monospace', fontWeight: 600 }}>
                    {item.nomor}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.02rem', color: '#1e293b', margin: '0 0 6px 0', fontWeight: 700, lineHeight: 1.4 }}>
                  {item.mitra}
                </h3>

                <p style={{ fontSize: '0.83rem', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.45 }}>
                  {item.tentang}
                </p>

                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px' }}>
                  <strong>Masa Berlaku:</strong> {item.jangkaWaktu}
                </div>
              </div>

              <button
                onClick={() => alert(`Mengunduh dokumen MoU: ${item.mitra}`)}
                style={{
                  background: '#1b5e20',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <FaFilePdf size={12} /> Unduh Naskah MoU ({item.size})
              </button>
            </div>
          ))}
        </div>
      </div>
    </PublikasiLayout>
  );
}

export default PerjanjianKerjasamaPage;
