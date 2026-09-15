import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { FaExternalLinkAlt, FaUsers, FaSearch } from 'react-icons/fa';

const paketPengadaan = [
  {
    kode: 'RUP-2025-01',
    namaPaket: 'Pengadaan Jasa Keamanan (Security) dan Kebersihan (Cleaning Service) TA 2025',
    metode: 'Tender Cepat / E-Katalog',
    pagu: 'Rp 420.000.000',
    hps: 'Rp 415.500.000',
    status: 'Selesai Kontrak',
    pemenang: 'PT. Garda Sarana Pratama',
  },
  {
    kode: 'RUP-2025-02',
    namaPaket: 'Pengadaan Layanan Pos Bantuan Hukum (Posbakum) TA 2025',
    metode: 'Seleksi Terbuka / MoU',
    pagu: 'Rp 65.000.000',
    hps: 'Rp 64.800.000',
    status: 'Selesai Kontrak',
    pemenang: 'LBH Pasundan Cimahi',
  },
  {
    kode: 'RUP-2025-03',
    namaPaket: 'Pemeliharaan Gedung Kantor & Renovasi Ruang Sidang Utama',
    metode: 'Pengadaan Langsung',
    pagu: 'Rp 145.000.000',
    hps: 'Rp 142.300.000',
    status: 'Dalam Pelaksanaan',
    pemenang: 'CV. Karya Mandiri Sejahtera',
  },
  {
    kode: 'RUP-2025-04',
    namaPaket: 'Pengadaan Perangkat TI dan Server Penunjang SIPP & e-Court',
    metode: 'E-Purchasing (E-Katalog LKPP)',
    pagu: 'Rp 85.000.000',
    hps: 'Rp 84.500.000',
    status: 'Selesai Pengiriman',
    pemenang: 'PT. Citra Solusi Teknologi',
  },
];

function PengadaanBarangJasaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPaket = paketPengadaan.filter(p => 
    p.namaPaket.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.metode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <KesekretariatanLayout
      title="Pengadaan Barang & Jasa"
      subtitle="Transparansi Rencana Umum Pengadaan (RUP), Pelaksanaan Pengadaan Barang dan Jasa Pemerintah, dan Integrasi LPSE Mahkamah Agung RI"
      breadcrumb="Pengadaan Barang & Jasa"
    >
      <div className="pa-content-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <a
            href="https://lpse.mahkamahagung.go.id"
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'linear-gradient(135deg, #1b5e20, #2e7d32)',
              color: '#fff',
              padding: '20px',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(27, 94, 32, 0.2)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Portal Resmi</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>LPSE Mahkamah Agung RI</div>
              <div style={{ fontSize: '0.8rem', marginTop: '4px', opacity: 0.9 }}>Layanan Pengadaan Secara Elektronik</div>
            </div>
            <FaExternalLinkAlt size={20} />
          </a>

          <a
            href="https://sirup.lkpp.go.id"
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'linear-gradient(135deg, #0284c7, #0369a1)',
              color: '#fff',
              padding: '20px',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sistem Informasi</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>SiRUP LKPP RI</div>
              <div style={{ fontSize: '0.8rem', marginTop: '4px', opacity: 0.9 }}>Rencana Umum Pengadaan Satker</div>
            </div>
            <FaExternalLinkAlt size={20} />
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Daftar Paket Pengadaan TA 2025</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Informasi paket tender, e-katalog, dan pengadaan langsung PA Cimahi</p>
          </div>
          <div style={{ position: 'relative', width: '260px' }}>
            <input
              type="text"
              placeholder="Cari paket atau metode..."
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
                <th style={{ padding: '12px 14px' }}>Kode / RUP</th>
                <th style={{ padding: '12px 14px' }}>Nama Paket Pengadaan</th>
                <th style={{ padding: '12px 14px' }}>Metode</th>
                <th style={{ padding: '12px 14px' }}>Pagu / HPS</th>
                <th style={{ padding: '12px 14px' }}>Pemenang / Rekanan</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPaket.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#475569', fontWeight: 600 }}>{item.kode}</td>
                  <td style={{ padding: '12px 14px', color: '#1e293b', fontWeight: 600, maxWidth: '280px' }}>{item.namaPaket}</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{item.metode}</td>
                  <td style={{ padding: '12px 14px', color: '#0f766e', fontWeight: 600 }}>{item.pagu}</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>{item.pemenang}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      background: item.status.includes('Selesai') ? '#dcfce7' : '#fef3c7',
                      color: item.status.includes('Selesai') ? '#166534' : '#92400e',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontWeight: 600
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#1b5e20', fontWeight: 700 }}>
            <FaUsers />
            <span>Pejabat Pengadaan & Unit Kerja Pengadaan Barang/Jasa (UKPBJ)</span>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#475569' }}>
            Pelaksanaan pengadaan barang dan jasa di lingkungan Pengadilan Agama Kota Cimahi berpedoman pada Peraturan Presiden No. 16 Tahun 2018 jo. Perpres No. 12 Tahun 2021 tentang Pengadaan Barang/Jasa Pemerintah.
          </p>
          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Kontak Pokja / Pejabat Pengadaan: <strong>surat@pa-cimahi.go.id</strong> / Telp: <strong>022-63191919</strong>
          </div>
        </div>
      </div>
    </KesekretariatanLayout>
  );
}

export default PengadaanBarangJasaPage;
