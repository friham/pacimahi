import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { FaChartLine, FaFilePdf, FaDownload, FaBullseye, FaBookOpen, FaHandshake, FaCalendarAlt, FaCompass, FaAward } from 'react-icons/fa';

const sakipTabs = [
  { id: 'rka', label: 'Rencana Kerja & Anggaran', icon: FaCalendarAlt },
  { id: 'renstra', label: 'RENSTRA (Rencana Strategis)', icon: FaBookOpen },
  { id: 'rencanaAksi', label: 'Rencana Aksi Kinerja', icon: FaChartLine },
  { id: 'iku', label: 'Reviu IKU', icon: FaBullseye },
  { id: 'perjanjian', label: 'Perjanjian Kinerja (PKT)', icon: FaHandshake },
  { id: 'lkjip', label: 'LKjIP (Laporan Kinerja)', icon: FaAward },
  { id: 'cetakBiru', label: 'Cetak Biru MA RI', icon: FaCompass },
];

const docsData = {
  rka: [
    { title: 'Rencana Kerja dan Anggaran Kementerian/Lembaga (RKA-KL) TA 2025', year: '2025', size: '3.4 MB', date: 'Januari 2025' },
    { title: 'Rencana Kinerja Tahunan (RKT) TA 2025', year: '2025', size: '2.1 MB', date: 'Desember 2024' },
  ],
  renstra: [
    { title: 'Rencana Strategis (RENSTRA) 2025 - 2029 PA Kota Cimahi', year: '2025-2029', size: '4.8 MB', date: 'Januari 2025' },
    { title: 'Revisi Rencana Strategis (RENSTRA) 2020 - 2024', year: '2020-2024', size: '4.2 MB', date: 'Maret 2023' },
  ],
  rencanaAksi: [
    { title: 'Rencana Aksi Perjanjian Kinerja Tahunan TA 2025', year: '2025', size: '1.8 MB', date: 'Januari 2025' },
    { title: 'Matriks Target Capaian Kinerja Triwulanan TA 2025', year: '2025', size: '1.2 MB', date: 'Januari 2025' },
  ],
  iku: [
    { title: 'Reviu Indikator Kinerja Utama (IKU) Terbaru SK KMA', year: '2024-2029', size: '1.6 MB', date: 'November 2024' },
    { title: 'Matriks Penyelarasan Indikator Kinerja Sasaran Strategis', year: '2024', size: '1.1 MB', date: 'Agustus 2024' },
  ],
  perjanjian: [
    { title: 'Perjanjian Kinerja Tahunan (PKT) Ketua PA Kota Cimahi 2025', year: '2025', size: '1.4 MB', date: 'Januari 2025' },
    { title: 'Perjanjian Kinerja Tahunan (PKT) Panitera & Sekretaris 2025', year: '2025', size: '1.6 MB', date: 'Januari 2025' },
    { title: 'Perjanjian Kinerja Tahunan (PKT) Pejabat Struktural & Fungsional', year: '2025', size: '2.8 MB', date: 'Januari 2025' },
  ],
  lkjip: [
    { title: 'Laporan Kinerja Instansi Pemerintah (LKjIP) Tahun 2024', year: '2024', size: '5.6 MB', date: 'Februari 2025', nilai: 'Predikat A (Sangat Baik / 88.75)' },
    { title: 'Laporan Kinerja Instansi Pemerintah (LKjIP) Tahun 2023', year: '2023', size: '5.2 MB', date: 'Februari 2024', nilai: 'Predikat A (Sangat Baik / 87.50)' },
    { title: 'Laporan Kinerja Instansi Pemerintah (LKjIP) Tahun 2022', year: '2022', size: '4.8 MB', date: 'Februari 2023', nilai: 'Predikat A (Sangat Baik / 85.20)' },
  ],
  cetakBiru: [
    { title: 'Cetak Biru Pembaruan Peradilan Mahkamah Agung RI 2010 - 2035', year: '2010-2035', size: '8.4 MB', date: 'Mahkamah Agung RI' },
    { title: 'Pembaruan Fungsi Teknis dan Manajemen Pengadilan Agama Berbasis Digital', year: 'Badilag', size: '3.6 MB', date: 'Ditjen Badilag' },
  ]
};

function SAKIPPage() {
  const [activeTab, setActiveTab] = useState('rka');

  return (
    <KesekretariatanLayout
      title="Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP)"
      subtitle="Dokumen Sistem Pengelolaan Pengadilan, Perencanaan Kerja, RENSTRA, IKU, Perjanjian Kinerja, LKjIP, dan Cetak Biru Mahkamah Agung RI"
      breadcrumb="SAKIP / Pengelolaan Pengadilan"
    >
      <div className="pa-content-card">
        <div style={{ background: '#f8fafc', borderLeft: '4px solid #1b5e20', padding: '16px', borderRadius: '0 8px 8px 0', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Akuntabilitas Kinerja & Sistem Pengelolaan Pengadilan</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
            Pengelolaan kinerja Pengadilan Agama Kota Cimahi Kelas IA berpedoman pada prinsip akuntabilitas, transparansi, dan efektivitas untuk mewujudkan peradilan modern berbasis teknologi informasi menuju <em>World Class Court</em>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {sakipTabs.map((tab) => {
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
          {(docsData[activeTab] || []).map((doc, idx) => (
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
                    <span>Periode: <strong>{doc.year}</strong></span>
                    <span>Penerbitan: <strong>{doc.date}</strong></span>
                    {doc.nilai && <span style={{ color: '#047857', fontWeight: 700 }}>{doc.nilai}</span>}
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
                <FaDownload size={12} /> Unduh ({doc.size})
              </button>
            </div>
          ))}
        </div>
      </div>
    </KesekretariatanLayout>
  );
}

export default SAKIPPage;
