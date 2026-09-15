import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { FaBookReader, FaFilePdf, FaMoneyBillWave, FaBoxes, FaUsersCog, FaSitemap, FaCalendarAlt, FaChartLine, FaLaptopCode, FaCogs } from 'react-icons/fa';

const pedomanSections = [
  { id: 'keuangan', label: 'Keuangan', icon: FaMoneyBillWave },
  { id: 'umum', label: 'Bagian Umum', icon: FaBoxes },
  { id: 'kepegawaian', label: 'Bagian Kepegawaian', icon: FaUsersCog },
  { id: 'organisasi', label: 'Organisasi', icon: FaSitemap },
  { id: 'perencanaan', label: 'Perencanaan', icon: FaCalendarAlt },
  { id: 'pelaporan', label: 'Pelaporan', icon: FaChartLine },
  { id: 'ti', label: 'Teknologi Informasi', icon: FaLaptopCode },
  { id: 'tatalaksana', label: 'Tata Laksana', icon: FaCogs },
];

const pedomanData = {
  keuangan: [
    { title: 'Pedoman Pelaksanaan Anggaran & Pertanggungjawaban SPJ Keuangan', nomor: 'SK Sekretaris MA RI No. 01/SEK/SK/I/2024', size: '3.4 MB' },
    { title: 'Petunjuk Teknis Pembayaran Tunjangan Kinerja dan Gaji ASN', nomor: 'Peraturan Sekretaris MA RI', size: '2.1 MB' },
  ],
  umum: [
    { title: 'Pedoman Pengelolaan, Pengamanan, dan Wasdal Barang Milik Negara (BMN)', nomor: 'SK Sekretaris MA RI No. 14/SEK/SK/III/2023', size: '2.8 MB' },
    { title: 'Standar Operasional Pemeliharaan Gedung Kantor dan Kendaraan Dinas', nomor: 'SOP Satker PA Cimahi', size: '1.9 MB' },
  ],
  kepegawaian: [
    { title: 'Pedoman Penegakan Disiplin dan Kode Etik Aparatur Peradilan', nomor: 'PP No. 94 Tahun 2021', size: '4.1 MB' },
    { title: 'Petunjuk Teknis Pengelolaan Cuti dan Penilaian SKP via SIKEP', nomor: 'Keputusan Ka. BKN', size: '2.6 MB' },
  ],
  organisasi: [
    { title: 'Pedoman Penataan Kelembagaan dan Evaluasi Beban Kerja Organisasi', nomor: 'PERMA No. 7 Tahun 2015', size: '3.1 MB' },
  ],
  perencanaan: [
    { title: 'Pedoman Penyusunan Rencana Kerja dan Anggaran (RKA-KL) Pagu Indikatif', nomor: 'SK Sekretaris MA RI', size: '2.5 MB' },
  ],
  pelaporan: [
    { title: 'Pedoman Penyusunan Laporan Kinerja Instansi Pemerintah (LKjIP) & SAKIP', nomor: 'PermenPAN-RB No. 88 Tahun 2021', size: '3.8 MB' },
  ],
  ti: [
    { title: 'Pedoman Keamanan Siber dan Standardisasi Infrastruktur TI Pengadilan', nomor: 'SK KMA No. 271/KMA/SK/XII/2022', size: '2.2 MB' },
    { title: 'SOP Backup Database SIPP dan Pemeliharaan Jaringan Intranet', nomor: 'SOP PTIP PA Cimahi', size: '1.5 MB' },
  ],
  tatalaksana: [
    { title: 'Pedoman Tata Naskah Dinas di Lingkungan Mahkamah Agung RI', nomor: 'SK KMA No. 131/KMA/SK/VII/2023', size: '4.6 MB' },
    { title: 'Pedoman Penyusunan dan Evaluasi Standar Operasional Prosedur (SOP)', nomor: 'PermenPAN-RB No. 35 Tahun 2012', size: '2.9 MB' },
  ],
};

function PedomanKesekretariatanPage() {
  const [activeTab, setActiveTab] = useState('keuangan');

  return (
    <KesekretariatanLayout
      title="Pedoman Pengelolaan Organisasi & Administrasi"
      subtitle="Kumpulan Pedoman Pengelolaan Keuangan, Umum, Kepegawaian, Organisasi, Perencanaan, Pelaporan, TI, dan Tata Laksana"
      breadcrumb="Pedoman Pengelolaan Organisasi & Administrasi"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {pedomanSections.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '9px 13px',
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
          {(pedomanData[activeTab] || []).map((item, idx) => (
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
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FaBookReader size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.96rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>{item.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: '#0369a1', fontFamily: 'monospace' }}>{item.nomor}</div>
                </div>
              </div>

              <button
                onClick={() => alert(`Mengunduh: ${item.title}`)}
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
                <FaFilePdf size={12} /> Unduh ({item.size})
              </button>
            </div>
          ))}
        </div>
      </div>
    </KesekretariatanLayout>
  );
}

export default PedomanKesekretariatanPage;
