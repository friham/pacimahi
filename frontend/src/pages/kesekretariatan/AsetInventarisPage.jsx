import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { FaBoxes, FaCar, FaBuilding, FaLaptop, FaFilePdf, FaDownload, FaShieldAlt } from 'react-icons/fa';

const bmnSummary = [
  { kategori: 'Tanah & Bangunan Gedung Kantor', kuantitas: '2 Unit (3.420 m²)', nilaiPerolehan: 'Rp 14.850.000.000', kondisi: '100% Baik', icon: FaBuilding },
  { kategori: 'Kendaraan Dinas Jabatan & Operasional', kuantitas: '6 Unit Roda 4, 8 Unit Roda 2', nilaiPerolehan: 'Rp 1.420.000.000', kondisi: 'Baik / Terawat', icon: FaCar },
  { kategori: 'Peralatan & Mesin (Komputer/Server/AC)', kuantitas: '342 Unit', nilaiPerolehan: 'Rp 2.180.500.000', kondisi: '98% Baik', icon: FaLaptop },
  { kategori: 'Gedung dan Bangunan Lainnya (Pos/Pagar)', kuantitas: '4 Unit', nilaiPerolehan: 'Rp 650.000.000', kondisi: 'Baik', icon: FaBuilding },
];

const kendaraanDinas = [
  { noPolisi: 'D 1085 T', jenis: 'Toyota Innova Zenix 2.0 V', pengguna: 'Ketua Pengadilan Agama Kota Cimahi', tahun: '2023', status: 'Dinas Jabatan' },
  { noPolisi: 'D 1192 T', jenis: 'Toyota Rush 1.5 S TRD', pengguna: 'Wakil Ketua Pengadilan Agama Kota Cimahi', tahun: '2021', status: 'Dinas Jabatan' },
  { noPolisi: 'D 1240 T', jenis: 'Toyota Avanza 1.3 G', pengguna: 'Panitera Pengadilan Agama Kota Cimahi', tahun: '2020', status: 'Dinas Operasional' },
  { noPolisi: 'D 1241 T', jenis: 'Toyota Avanza 1.3 G', pengguna: 'Sekretaris Pengadilan Agama Kota Cimahi', tahun: '2020', status: 'Dinas Operasional' },
  { noPolisi: 'D 1580 T', jenis: 'Daihatsu Gran Max Minibus (Mobil Layanan Keliling)', pengguna: 'Pelayanan Sidang Keliling & Tabayun', tahun: '2022', status: 'Operasional Sidang' },
];

function AsetInventarisPage() {
  const [activeTab, setActiveTab] = useState('rekap');

  return (
    <KesekretariatanLayout
      title="Daftar Aset & Inventaris (BMN)"
      subtitle="Pengelolaan dan Inventarisasi Barang Milik Negara (BMN) Berbasis Aplikasi SIMAN Kementerian Keuangan pada Pengadilan Agama Kota Cimahi"
      breadcrumb="Aset & Inventaris"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('rekap')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'rekap' ? '#1b5e20' : 'transparent',
              color: activeTab === 'rekap' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaBoxes /> Rekapitulasi BMN
          </button>
          <button
            onClick={() => setActiveTab('kendaraan')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'kendaraan' ? '#1b5e20' : 'transparent',
              color: activeTab === 'kendaraan' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaCar /> Kendaraan Dinas
          </button>
          <button
            onClick={() => setActiveTab('laporan')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'laporan' ? '#1b5e20' : 'transparent',
              color: activeTab === 'laporan' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaFilePdf /> Laporan BMN SIMAN
          </button>
        </div>

        {activeTab === 'rekap' && (
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Rekapitulasi Barang Milik Negara (BMN) TA 2024/2025</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.9rem' }}>Data inventarisasi aset negara yang tercatat dalam Neraca Satuan Kerja</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {bmnSummary.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} />
                      </div>
                      <h3 style={{ fontSize: '0.92rem', color: '#1e293b', margin: 0, fontWeight: 700 }}>{item.kategori}</h3>
                    </div>
                    <div style={{ fontSize: '1.15rem', color: '#1b5e20', fontWeight: 800, marginBottom: '6px' }}>{item.nilaiPerolehan}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                      <span>Kuantitas: <strong>{item.kuantitas}</strong></span>
                      <span style={{ color: '#059669', fontWeight: 600 }}>{item.kondisi}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1b5e20', fontWeight: 700, marginBottom: '6px' }}>
                <FaShieldAlt />
                <span>Pengamanan & Legalitas Aset BMN</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                Seluruh sertifikat tanah gedung kantor Pengadilan Agama Kota Cimahi telah bersertifikat Hak Pakai atas nama Pemerintah Republik Indonesia c.q. Mahkamah Agung RI dan tercatat secara tertib pada aplikasi SIMAN Kementerian Keuangan RI.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'kendaraan' && (
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Daftar Kendaraan Dinas Operasional & Jabatan</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.9rem' }}>Transparansi pemanfaatan dan pemegang kendaraan dinas PA Kota Cimahi</p>

            <div style={{ overflowX: 'auto' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>No. Polisi</th>
                    <th style={{ padding: '12px 14px' }}>Merk & Tipe Kendaraan</th>
                    <th style={{ padding: '12px 14px' }}>Pengguna / Peruntukan</th>
                    <th style={{ padding: '12px 14px' }}>Tahun</th>
                    <th style={{ padding: '12px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {kendaraanDinas.map((k, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#1e293b' }}>{k.noPolisi}</td>
                      <td style={{ padding: '12px 14px', color: '#334155', fontWeight: 600 }}>{k.jenis}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{k.pengguna}</td>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{k.tahun}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#ecfdf5', color: '#065f46', padding: '3px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.78rem' }}>
                          {k.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'laporan' && (
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Dokumen Laporan BMN (SIMAN / DJKN)</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.9rem' }}>Unduh dokumen resmi rekapitulasi laporan BMN per semester dan tahunan</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Laporan BMN Tahunan 2024 (Audited BPK)', year: '2024', size: '4.2 MB', date: 'Januari 2025' },
                { title: 'Laporan BMN Semester II Tahun 2024', year: 'Sem II 2024', size: '3.1 MB', date: 'Desember 2024' },
                { title: 'Laporan BMN Semester I Tahun 2024', year: 'Sem I 2024', size: '2.8 MB', date: 'Juli 2024' },
                { title: 'Hasil Pengawasan dan Pengendalian (Wasdal) BMN', year: '2024', size: '1.5 MB', date: 'November 2024' },
              ].map((doc, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaFilePdf size={24} color="#dc2626" />
                    <div>
                      <h3 style={{ fontSize: '0.92rem', color: '#1e293b', margin: '0 0 2px 0', fontWeight: 600 }}>{doc.title}</h3>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Periode: {doc.year} • Tanggal Terbit: {doc.date}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Mengunduh dokumen: ${doc.title}`)}
                    style={{
                      background: '#1b5e20',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FaDownload size={11} /> Unduh ({doc.size})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </KesekretariatanLayout>
  );
}

export default AsetInventarisPage;
