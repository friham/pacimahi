import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { 
  FaClipboardList, 
  FaFilePdf, 
  FaDownload, 
  FaMoneyCheckAlt, 
  FaUserCheck, 
  FaChartPie, 
  FaChartLine, 
  FaStar,
  FaCalendarAlt 
} from 'react-icons/fa';

const reportTabs = [
  { id: 'keuangan', label: 'Laporan Keuangan', icon: FaMoneyCheckAlt },
  { id: 'lhkpn', label: 'LHKPN (KPK)', icon: FaUserCheck },
  { id: 'lhkasn', label: 'LHKASN (SiHARKA)', icon: FaUserCheck },
  { id: 'lra', label: 'LRA (Realisasi Anggaran)', icon: FaChartPie },
  { id: 'kinerjaTriwulan', label: 'Laporan Kinerja Triwulan', icon: FaChartLine },
  { id: 'skmIpk', label: 'Laporan SKM & IPK', icon: FaStar },
];

const reportDocs = {
  keuangan: [
    { title: 'Laporan Keuangan Tahunan TA 2024 (Audited BPK RI)', period: 'Tahun 2024', size: '5.2 MB', date: 'Januari 2025' },
    { title: 'Catatan Atas Laporan Keuangan (CaLK) TA 2024', period: 'Tahun 2024', size: '4.5 MB', date: 'Januari 2025' },
  ],
  lhkpn: [
    { title: 'Rekapitulasi Bukti Tanda Terima e-LHKPN KPK RI TA 2024 (100% Kepatuhan)', period: 'Tahun 2024', size: '2.4 MB', date: 'Januari 2025' },
  ],
  lhkasn: [
    { title: 'Laporan Kepatuhan Harta Kekayaan ASN SiHARKA TA 2024 (100% Kepatuhan)', period: 'Tahun 2024', size: '1.8 MB', date: 'Januari 2025' },
  ],
  lra: [
    { title: 'Laporan Realisasi Anggaran (LRA) DIPA 01 & DIPA 04 Triwulan IV TA 2024', period: 'TW IV 2024', size: '2.1 MB', date: 'Januari 2025' },
    { title: 'Laporan Realisasi Anggaran (LRA) DIPA 01 & DIPA 04 Triwulan III TA 2024', period: 'TW III 2024', size: '1.9 MB', date: 'Oktober 2024' },
  ],
  kinerjaTriwulan: [
    { title: 'Laporan Monitoring dan Capaian Kinerja Triwulan IV TA 2024', period: 'TW IV 2024', size: '2.6 MB', date: 'Januari 2025' },
    { title: 'Laporan Monitoring dan Capaian Kinerja Triwulan III TA 2024', period: 'TW III 2024', size: '2.3 MB', date: 'Oktober 2024' },
  ],
  skmIpk: [
    { title: 'Laporan Hasil Survei Kepuasan Masyarakat (SKM) & IPAK Triwulan IV 2024', period: 'TW IV 2024', size: '1.7 MB', date: 'Januari 2025', score: 'Mutu A (98.00%)' },
    { title: 'Laporan Hasil Survei Kepuasan Masyarakat (SKM) & IPAK Triwulan III 2024', period: 'TW III 2024', size: '1.6 MB', date: 'Oktober 2024', score: 'Mutu A (97.25%)' },
  ]
};

function LaporanKesekretariatanPage() {
  const [activeTab, setActiveTab] = useState('keuangan');

  return (
    <KesekretariatanLayout
      title="Publikasi Laporan-Laporan Resmi"
      subtitle="Dokumen Laporan Keuangan, Kepatuhan LHKPN/LHKASN, Realisasi Anggaran (LRA), Kinerja Triwulanan, serta Survei SKM & IPK"
      breadcrumb="Laporan"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {reportTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '9px 14px',
                  border: 'none',
                  background: isActive ? '#1b5e20' : 'transparent',
                  color: isActive ? '#fff' : '#475569',
                  borderRadius: '6px 6px 0 0',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem'
                }}
              >
                <Icon size={12} /> {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {(reportDocs[activeTab] || []).map((doc, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px 20px',
                background: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
                <div style={{ width: '42px', height: '42px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', flexShrink: 0 }}>
                  <FaFilePdf size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 600 }}>{doc.title}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: '#64748b' }}>
                    <span>Periode: <strong>{doc.period}</strong></span>
                    <span>Penerbitan: <strong>{doc.date}</strong></span>
                    {doc.score && <span style={{ color: '#047857', fontWeight: 700 }}>{doc.score}</span>}
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Mengunduh dokumen: ${doc.title}`)}
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
                <FaDownload size={12} /> Unduh PDF ({doc.size})
              </button>
            </div>
          ))}
        </div>
      </div>
    </KesekretariatanLayout>
  );
}

export default LaporanKesekretariatanPage;
