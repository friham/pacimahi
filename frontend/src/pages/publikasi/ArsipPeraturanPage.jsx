import { useState } from 'react';
import PublikasiLayout from './PublikasiLayout';
import { FaBook, FaFilePdf, FaSearch, FaGavel, FaBalanceScale, FaFileContract, FaBookmark, FaUniversity } from 'react-icons/fa';

const regulationTabs = [
  { id: 'uu', label: 'Peraturan Perundang-undangan', icon: FaBook },
  { id: 'perma', label: 'PERMA', icon: FaGavel },
  { id: 'kma', label: 'SK KMA', icon: FaBalanceScale },
  { id: 'sema', label: 'SEMA', icon: FaFileContract },
  { id: 'sekma', label: 'SK SEKMA', icon: FaBookmark },
  { id: 'pertimbangan', label: 'Pertimbangan Hukum MA', icon: FaUniversity },
  { id: 'yurisprudensi', label: 'Yurisprudensi MA RI', icon: FaGavel },
  { id: 'kebijakan', label: 'Kebijakan Pimpinan PA', icon: FaBalanceScale },
];

const regulationsData = {
  uu: [
    { nomor: 'UU No. 7 Tahun 1989 jo. UU 50/2009', tentang: 'Peradilan Agama', tahun: '2009', size: '2.4 MB' },
    { nomor: 'UU No. 14 Tahun 1985 jo. UU 3/2009', tentang: 'Mahkamah Agung', tahun: '2009', size: '2.8 MB' },
    { nomor: 'UU No. 48 Tahun 2009', tentang: 'Kekuasaan Kehakiman', tahun: '2009', size: '1.9 MB' },
    { nomor: 'UU No. 1 Tahun 1974 jo. UU 16/2019', tentang: 'Perkawinan (Batas Usia Kawin 19 Tahun)', tahun: '2019', size: '1.5 MB' },
  ],
  perma: [
    { nomor: 'PERMA No. 7 Tahun 2022', tentang: 'Perubahan Atas PERMA No. 1 Tahun 2019 tentang Administrasi Perkara dan Persidangan di Pengadilan Secara Elektronik (e-Court / e-Litigation)', tahun: '2022', size: '3.2 MB' },
    { nomor: 'PERMA No. 1 Tahun 2016', tentang: 'Prosedur Mediasi di Pengadilan', tahun: '2016', size: '2.1 MB' },
    { nomor: 'PERMA No. 5 Tahun 2019', tentang: 'Pedoman Mengadili Permohonan Dispensasi Kawin', tahun: '2019', size: '1.8 MB' },
    { nomor: 'PERMA No. 3 Tahun 2017', tentang: 'Pedoman Mengadili Perkara Perempuan Berhadapan dengan Hukum', tahun: '2017', size: '2.0 MB' },
  ],
  kma: [
    { nomor: 'SK KMA No. 2-144/KMA/SK/VIII/2022', tentang: 'Standar Pelayanan Informasi Publik di Pengadilan', tahun: '2022', size: '4.2 MB' },
    { nomor: 'SK KMA No. 131/KMA/SK/VII/2023', tentang: 'Pedoman Tata Naskah Dinas di Lingkungan Mahkamah Agung', tahun: '2023', size: '4.6 MB' },
    { nomor: 'SK KMA No. 271/KMA/SK/XII/2022', tentang: 'Pedoman Keamanan Siber dan Sistem Informasi Pengadilan', tahun: '2022', size: '2.2 MB' },
  ],
  sema: [
    { nomor: 'SEMA No. 1 Tahun 2023', tentang: 'Tata Cara Panggilan Sidang Melalui Surat Tercatat (PT Pos Indonesia)', tahun: '2023', size: '1.4 MB' },
    { nomor: 'SEMA No. 2 Tahun 2023', tentang: 'Petunjuk Teknis Pendaftaran Perkawinan Beda Agama', tahun: '2023', size: '1.1 MB' },
    { nomor: 'SEMA No. 1 Tahun 2022', tentang: 'Pemberlakuan Rumusan Hasil Rapat Pleno Kamar Mahkamah Agung', tahun: '2022', size: '3.5 MB' },
  ],
  sekma: [
    { nomor: 'SK SEKMA No. 01/SEK/SK/I/2024', tentang: 'Petunjuk Pelaksanaan Anggaran DIPA Mahkamah Agung RI', tahun: '2024', size: '3.4 MB' },
    { nomor: 'SK SEKMA No. 14/SEK/SK/III/2023', tentang: 'Pedoman Pengelolaan dan Penetapan Status Penggunaan (PSP) BMN', tahun: '2023', size: '2.8 MB' },
  ],
  pertimbangan: [
    { nomor: 'Pertimbangan Hukum MA RI No. 04/Tuaka.Ag/V/2023', tentang: 'Kewenangan Mutlak Pengadilan Agama dalam Sengketa Ekonomi Syariah dan Hak Milik', tahun: '2023', size: '1.6 MB' },
    { nomor: 'Pertimbangan Hukum MA RI No. 02/Tuaka.Ag/II/2022', tentang: 'Nafkah Lampau (Madhiyah) Istri yang Ditalak Li’an', tahun: '2022', size: '1.2 MB' },
  ],
  yurisprudensi: [
    { nomor: 'Yurisprudensi MA No. 1/Yur/Ag/2018', tentang: 'Harta Bersama yang Diperoleh Selama Ikatan Perkawinan Tanpa Perjanjian Kawin', tahun: '2018', size: '2.5 MB' },
    { nomor: 'Yurisprudensi MA No. 2/Yur/Ag/2019', tentang: 'Hak Hadhanah Anak di Bawah Umur 12 Tahun Kepada Ibu Kandung Kecuali Terbukti Murtad / Lalim', tahun: '2019', size: '2.3 MB' },
    { nomor: 'Yurisprudensi MA No. 1/Yur/Ag/2021', tentang: 'Eksekusi Hak Tanggungan Akad Pembiayaan Murabahah', tahun: '2021', size: '2.8 MB' },
  ],
  kebijakan: [
    { nomor: 'SK Ketua PA Kota Cimahi No. W10-A19/01/2025', tentang: 'Standar Biaya Panjar Perkara dan Radius Wilayah Panggilan Tahun 2025', tahun: '2025', size: '1.5 MB' },
    { nomor: 'SK Ketua PA Kota Cimahi No. W10-A19/02/2025', tentang: 'Penetapan Jam Pelayanan Posbakum dan Duta Layanan Prioritas', tahun: '2025', size: '1.2 MB' },
  ]
};

function ArsipPeraturanPage() {
  const [activeTab, setActiveTab] = useState('uu');
  const [searchTerm, setSearchTerm] = useState('');

  const currentList = (regulationsData[activeTab] || []).filter(item =>
    item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tentang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PublikasiLayout
      title="Arsip Peraturan, Yurisprudensi & Kebijakan"
      subtitle="Koleksi Lengkap Peraturan Perundang-Undangan, PERMA, SEMA, SK KMA, SK SEKMA, Pertimbangan Hukum, Yurisprudensi Mahkamah Agung RI, dan Kebijakan Pimpinan"
      breadcrumb="Peraturan & Kebijakan"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {regulationTabs.map((tab) => {
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

        <div style={{ position: 'relative', width: '100%', maxWidth: '360px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Cari nomor atau perihal peraturan..."
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

        <div style={{ overflowX: 'auto' }}>
          <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '12px 14px' }}>Nomor Regulasi</th>
                <th style={{ padding: '12px 14px' }}>Tentang / Perihal</th>
                <th style={{ padding: '12px 14px' }}>Tahun</th>
                <th style={{ padding: '12px 14px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#0369a1', whiteSpace: 'nowrap' }}>
                    {item.nomor}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#1e293b', fontWeight: 600 }}>
                    {item.tentang}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>
                    {item.tahun}
                  </td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => alert(`Mengunduh dokumen peraturan: ${item.nomor}`)}
                      style={{
                        background: '#1b5e20',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <FaFilePdf size={11} /> Unduh ({item.size})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PublikasiLayout>
  );
}

export default ArsipPeraturanPage;
