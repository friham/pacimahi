import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { FaCoins, FaDownload, FaChartPie } from 'react-icons/fa';

const pnbpList = [
  {
    jenis: 'Pendapatan Hak Kepaniteraan Lainnya (Pendaftaran & Permohonan)',
    target2025: 'Rp 120.000.000',
    realisasiTW1: 'Rp 35.450.000',
    persen: '29.54%',
    setoran: 'SIMPONI / Kas Negara',
  },
  {
    jenis: 'Pendapatan Ongkos / Redaksi Putusan & Legalisasi Akta',
    target2025: 'Rp 45.000.000',
    realisasiTW1: 'Rp 14.200.000',
    persen: '31.55%',
    setoran: 'SIMPONI / Kas Negara',
  },
  {
    jenis: 'Pendapatan Sisa Panjar Perkara Tidak Diambil (6 Bulan)',
    target2025: 'Rp 25.000.000',
    realisasiTW1: 'Rp 8.750.000',
    persen: '35.00%',
    setoran: 'SIMPONI / Kas Negara',
  },
  {
    jenis: 'Pendapatan Sewa Fasilitas Tanah & Gedung / BMN Kantin & ATM',
    target2025: 'Rp 15.000.000',
    realisasiTW1: 'Rp 5.000.000',
    persen: '33.33%',
    setoran: 'SIMPONI / Kas Negara',
  },
];

const yearlySummary = [
  { tahun: '2024', target: 'Rp 185.000.000', realisasi: 'Rp 210.450.000', capaian: '113.75% (Surplus)', status: 'Selesai Audit' },
  { tahun: '2023', target: 'Rp 170.000.000', realisasi: 'Rp 195.200.000', capaian: '114.82% (Surplus)', status: 'Selesai Audit' },
  { tahun: '2022', target: 'Rp 160.000.000', realisasi: 'Rp 182.100.000', capaian: '113.81% (Surplus)', status: 'Selesai Audit' },
];

function RealisasiPNBPPage() {
  const [activeTab, setActiveTab] = useState('berjalan');

  return (
    <KesekretariatanLayout
      title="Realisasi Penerimaan Negara Bukan Pajak (PNBP)"
      subtitle="Laporan dan Akuntabilitas Penyetoran Pendapatan Kepaniteraan serta Kesekretariatan ke Kas Negara Berbasis SIMPONI Kemenkeu"
      breadcrumb="Realisasi PNBP"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('berjalan')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'berjalan' ? '#1b5e20' : 'transparent',
              color: activeTab === 'berjalan' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaCoins /> PNBP Tahun Berjalan (2025)
          </button>
          <button
            onClick={() => setActiveTab('tahunan')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'tahunan' ? '#1b5e20' : 'transparent',
              color: activeTab === 'tahunan' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaChartPie /> Rekapitulasi Tahunan (2022-2024)
          </button>
        </div>

        {activeTab === 'berjalan' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Realisasi PNBP Triwulan I TA 2025</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Penerimaan Negara Bukan Pajak Fungsional dan Umum</p>
              </div>
              <button
                onClick={() => alert('Mengunduh Laporan Realisasi PNBP TW I 2025 (PDF)')}
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
                  gap: '6px'
                }}
              >
                <FaDownload size={12} /> Unduh Laporan TW I (PDF)
              </button>
            </div>

            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Akun & Jenis Pendapatan PNBP</th>
                    <th style={{ padding: '12px 14px' }}>Target Tahunan</th>
                    <th style={{ padding: '12px 14px' }}>Realisasi TW I</th>
                    <th style={{ padding: '12px 14px' }}>Capaian</th>
                    <th style={{ padding: '12px 14px' }}>Kanal Setor</th>
                  </tr>
                </thead>
                <tbody>
                  {pnbpList.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1e293b' }}>{item.jenis}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{item.target2025}</td>
                      <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 600 }}>{item.realisasiTW1}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                          {item.persen}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{item.setoran}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: '#f8fafc', borderLeft: '4px solid #1b5e20', padding: '14px 18px', borderRadius: '0 8px 8px 0', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
              <strong>Mekanisme Penyetoran PNBP:</strong>
              <br />
              Seluruh pungutan penerimaan negara bukan pajak disetorkan langsung ke Kas Negara secara elektronik menggunakan Surat Setoran Bukan Pajak (SSBP) dan kode billing SIMPONI Kementerian Keuangan RI.
            </div>
          </div>
        )}

        {activeTab === 'tahunan' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Historis Realisasi PNBP 3 Tahun Terakhir</h2>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.88rem' }}>Realisasi target tahunan PNBP Pengadilan Agama Kota Cimahi Kelas IA</p>

            <div style={{ overflowX: 'auto' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Tahun Anggaran</th>
                    <th style={{ padding: '12px 14px' }}>Target PNBP</th>
                    <th style={{ padding: '12px 14px' }}>Realisasi Akhir</th>
                    <th style={{ padding: '12px 14px' }}>Persentase Capaian</th>
                    <th style={{ padding: '12px 14px' }}>Status Laporan</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlySummary.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1e293b' }}>{row.tahun}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.target}</td>
                      <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 600 }}>{row.realisasi}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                          {row.capaian}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </KesekretariatanLayout>
  );
}

export default RealisasiPNBPPage;
