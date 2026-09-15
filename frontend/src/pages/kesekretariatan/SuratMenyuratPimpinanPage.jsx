import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { 
  FaEnvelopeOpenText, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaSearch, 
  FaDownload, 
  FaCheckCircle,
  FaFilePdf
} from 'react-icons/fa';

const lettersList = [
  {
    nomor: 'W10-A19/082/HM.00/II/2025',
    tgl: '24 Februari 2025',
    perihal: 'Undangan Rapat Koordinasi Pembinaan dan Evaluasi Kinerja Awal Tahun 2025',
    tujuan: 'Seluruh Hakim dan Pegawai PA Kota Cimahi',
    sifat: 'Penting / Terbuka',
  },
  {
    nomor: 'W10-A19/065/OT.01/II/2025',
    tgl: '18 Februari 2025',
    perihal: 'Himbauan Kepatuhan Pengisian E-Kinerja BKN dan LHKPN/LHKASN',
    tujuan: 'Seluruh ASN Pengadilan Agama Kota Cimahi',
    sifat: 'Penting',
  },
  {
    nomor: 'W10-A19/042/PL.01/I/2025',
    tgl: '22 Januari 2025',
    perihal: 'Penetapan Jam Pelayanan Pos Bantuan Hukum (Posbakum) Semester I',
    tujuan: 'LBH Mitra dan Petugas Meja PTSP',
    sifat: 'Pemberitahuan',
  },
  {
    nomor: 'W10-A19/019/KU.01/I/2025',
    tgl: '10 Januari 2025',
    perihal: 'Penyampaian Petikan DIPA 01 BUA dan DIPA 04 Badilag TA 2025',
    tujuan: 'Kuasa Pengguna Anggaran & PPK PA Cimahi',
    sifat: 'Biasa',
  },
];

function SuratMenyuratPimpinanPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = lettersList.filter(item => 
    item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tujuan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <KesekretariatanLayout
      title="Surat Menyurat & Tata Naskah Dinas Pimpinan"
      subtitle="Tata Kelola Persuratan Kedinasan, Agenda Surat Keluar/Masuk, dan Tata Naskah Dinas Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Surat Menyurat Pimpinan"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Agenda Surat Kedinasan Terbuka TA 2025</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Daftar surat keluar umum dan surat edaran pimpinan pengadilan</p>
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Cari nomor atau perihal surat..."
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

        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '12px 14px' }}>Nomor Surat Dinas</th>
                <th style={{ padding: '12px 14px' }}>Tanggal</th>
                <th style={{ padding: '12px 14px' }}>Perihal</th>
                <th style={{ padding: '12px 14px' }}>Tujuan / Sasaran</th>
                <th style={{ padding: '12px 14px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 600, color: '#0369a1' }}>{item.nomor}</td>
                  <td style={{ padding: '12px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>{item.tgl}</td>
                  <td style={{ padding: '12px 14px', color: '#1e293b', fontWeight: 600, maxWidth: '280px' }}>{item.perihal}</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{item.tujuan}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <button
                      onClick={() => alert(`Mengunduh dokumen: ${item.nomor}`)}
                      style={{
                        background: '#f1f5f9',
                        color: '#1b5e20',
                        border: '1px solid #cbd5e1',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <FaFilePdf size={10} /> Unduh
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: '#1b5e20' }}>Pedoman Tata Naskah Dinas Mahkamah Agung RI</h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
            Pengelolaan surat menyurat resmi di PA Kota Cimahi berpedoman pada Surat Keputusan Ketua Mahkamah Agung RI No. 131/KMA/SK/VII/2023 tentang Pedoman Tata Naskah Dinas di Lingkungan Mahkamah Agung dan Badan Peradilan yang Berada di Bawahnya.
          </p>
        </div>
      </div>
    </KesekretariatanLayout>
  );
}

export default SuratMenyuratPimpinanPage;
