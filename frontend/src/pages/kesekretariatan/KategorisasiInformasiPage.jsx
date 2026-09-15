import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { 
  FaListAlt, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaLock, 
  FaFilePdf, 
  FaDownload, 
  FaSearch 
} from 'react-icons/fa';

const dipCategories = {
  berkala: [
    { no: '01', informasi: 'Profil Pengadilan (Struktur, Visi Misi, Alamat, Yurisdiksi)', penanggungJawab: 'Sub Bagian PTIP', format: 'Website & Dokumen Publik' },
    { no: '02', informasi: 'Daftar Isian Pelaksanaan Anggaran (DIPA) & RKA-KL', penanggungJawab: 'Sub Bagian Umum & Keuangan', format: 'PDF & Tabel Portal' },
    { no: '03', informasi: 'Laporan Realisasi Anggaran (LRA) dan Neraca Keuangan', penanggungJawab: 'Sub Bagian Umum & Keuangan', format: 'PDF Triwulanan' },
    { no: '04', informasi: 'Laporan Akuntabilitas Kinerja (SAKIP / LKjIP)', penanggungJawab: 'Sub Bagian PTIP', format: 'PDF Tahunan' },
    { no: '05', informasi: 'Statistik Penanganan Perkara & Perkara Masuk/Putus', penanggungJawab: 'Kepaniteraan Hukum', format: 'Tabel Berkala SIPP' },
  ],
  setiapSaat: [
    { no: '01', informasi: 'Standar Operasional Prosedur (SOP) Seluruh Unit Kerja', penanggungJawab: 'Sub Bagian Ortala', format: 'Dokumen SOP' },
    { no: '02', informasi: 'Daftar Aset dan Inventaris Barang Milik Negara (BMN)', penanggungJawab: 'Sub Bagian Umum & Keuangan', format: 'Laporan SIMAN' },
    { no: '03', informasi: 'Daftar Regulasi, SK Ketua, dan Kebijakan Pelayanan', penanggungJawab: 'Sub Bagian Ortala', format: 'JDIH Dokumen' },
    { no: '04', informasi: 'Hasil Survei Kepuasan Masyarakat (IKM) & IPAK', penanggungJawab: 'Sub Bagian PTIP', format: 'Laporan Survei' },
  ],
  sertaMerta: [
    { no: '01', informasi: 'Pengumuman Perubahan Jam Kerja Layanan / Hari Libur', penanggungJawab: 'Humas / Sekretaris', format: 'Media Sosial & Website' },
    { no: '02', informasi: 'Pemberitahuan Panggilan Sidang Ghaib Perkara', penanggungJawab: 'Kepaniteraan', format: 'Papan Pengumuman & Web' },
    { no: '03', informasi: 'Informasi Gangguan Sistem Pelayanan / Listrik / Server', penanggungJawab: 'Tim IT', format: 'Pemberitahuan Terbuka' },
  ],
  dikecualikan: [
    { no: '01', informasi: 'Musyawarah Majelis Hakim dan Catatan Pendapat Hakim (Dissenting Opinion Rahasia)', dasarHukum: 'UU No. 14 Tahun 2008 & SK KMA 2-144' },
    { no: '02', informasi: 'Data Pribadi Pihak Berperkara (NIK, Rekening, Alamat Rahasia Saksi)', dasarHukum: 'UU Perlindungan Data Pribadi' },
    { no: '03', informasi: 'Dokumen Perkara yang Disidangkan Secara Tertutup (Asusila / Anak)', dasarHukum: 'UU Peradilan Agama' },
  ]
};

function KategorisasiInformasiPage() {
  const [activeTab, setActiveTab] = useState('berkala');

  return (
    <KesekretariatanLayout
      title="Kategorisasi Informasi Publik (DIP)"
      subtitle="Daftar Informasi Publik (DIP) Pejabat Pengelola Informasi dan Dokumentasi (PPID) Berdasarkan SK KMA Nomor 2-144/KMA/SK/VIII/2022"
      breadcrumb="Kategorisasi Informasi"
    >
      <div className="pa-content-card">
        <div style={{ background: '#f8fafc', borderLeft: '4px solid #1b5e20', padding: '16px', borderRadius: '0 8px 8px 0', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Keterbukaan Informasi Publik di Pengadilan</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
            Pengadilan Agama Kota Cimahi berkomitmen mewujudkan transparansi peradilan dengan mengelompokkan informasi publik ke dalam 4 kategori sesuai standar Mahkamah Agung RI.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'berkala', label: 'Informasi Berkala' },
            { id: 'setiapSaat', label: 'Informasi Setiap Saat' },
            { id: 'sertaMerta', label: 'Informasi Serta Merta' },
            { id: 'dikecualikan', label: 'Informasi Dikecualikan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px',
                border: 'none',
                background: activeTab === tab.id ? '#1b5e20' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#475569',
                borderRadius: '6px 6px 0 0',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dikecualikan' ? (
          <div>
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaLock color="#e11d48" size={18} />
              <div style={{ fontSize: '0.85rem', color: '#9f1239' }}>
                Informasi yang Dikecualikan adalah informasi yang tidak dapat diakses publik karena dapat membahayakan kepentingan penegakan hukum, kerahasiaan pribadi, atau rahasia jabatan.
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#be123c', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>No.</th>
                    <th style={{ padding: '12px 14px' }}>Jenis Informasi Dikecualikan</th>
                    <th style={{ padding: '12px 14px' }}>Dasar Pertimbangan Hukum</th>
                  </tr>
                </thead>
                <tbody>
                  {dipCategories.dikecualikan.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700 }}>{row.no}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1e293b' }}>{row.informasi}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.dasarHukum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px' }}>No.</th>
                  <th style={{ padding: '12px 14px' }}>Rincian Informasi Publik</th>
                  <th style={{ padding: '12px 14px' }}>Penanggung Jawab</th>
                  <th style={{ padding: '12px 14px' }}>Bentuk / Format Layanan</th>
                </tr>
              </thead>
              <tbody>
                {(dipCategories[activeTab] || []).map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700 }}>{row.no}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1e293b' }}>{row.informasi}</td>
                    <td style={{ padding: '12px 14px', color: '#047857', fontWeight: 600 }}>{row.penanggungJawab}</td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>{row.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <button
            onClick={() => alert('Mengunduh Daftar Informasi Publik (DIP) Lengkap SK KMA (PDF)')}
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
            <FaFilePdf size={12} /> Unduh SK Penetapan DIP PA Cimahi (PDF)
          </button>
        </div>
      </div>
    </KesekretariatanLayout>
  );
}

export default KategorisasiInformasiPage;
