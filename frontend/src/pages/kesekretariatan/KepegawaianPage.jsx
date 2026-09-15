import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { 
  FaUsersCog, 
  FaUserTie, 
  FaGraduationCap, 
  FaCalendarCheck, 
  FaAward, 
  FaFilePdf, 
  FaDownload,
  FaExternalLinkAlt
} from 'react-icons/fa';

const sdmStatistik = [
  { kategori: 'Hakim (Termasuk Ketua & Wakil)', jumlah: '12 Orang', pns: '12 Orang' },
  { kategori: 'Pejabat Struktural Kepaniteraan', jumlah: '6 Orang', pns: '6 Orang' },
  { kategori: 'Pejabat Struktural Kesekretariatan', jumlah: '4 Orang', pns: '4 Orang' },
  { kategori: 'Panitera Pengganti (Fungsional)', jumlah: '8 Orang', pns: '8 Orang' },
  { kategori: 'Jurusita & Jurusita Pengganti', jumlah: '5 Orang', pns: '5 Orang' },
  { kategori: 'Pelaksana / Staf Administrasi', jumlah: '9 Orang', pns: '9 Orang' },
  { kategori: 'PPNPN / Pegawai Kontrak Satker', jumlah: '14 Orang', pns: 'Non-PNS' },
];

function KepegawaianPage() {
  return (
    <KesekretariatanLayout
      title="Urusan Kepegawaian, Organisasi & Tata Laksana"
      subtitle="Pengelolaan Manajemen SDM Aparatur Peradilan Berbasis Aplikasi SIKEP Mahkamah Agung RI dan SIASN BKN"
      breadcrumb="Kepegawaian"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #0369a1)',
          borderRadius: '10px',
          padding: '20px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '24px'
        }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 700 }}>Integrasi SIKEP Mahkamah Agung RI</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
              Data pegawai, bezzeting formasi, mutasi, penilaian kinerja (SKP), dan rekam jejak kedinasan terintegrasi secara online.
            </p>
          </div>
          <a
            href="https://sikep.mahkamahagung.go.id"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#fff',
              color: '#1b5e20',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Portal SIKEP MA</span>
            <FaExternalLinkAlt size={10} />
          </a>
        </div>

        <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Rekapitulasi Bezzeting Formasi Pegawai TA 2025</h2>
        <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.88rem' }}>Jumlah pegawai aktif per unit kerja di lingkungan PA Kota Cimahi</p>

        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '12px 14px' }}>Unit / Jabatan</th>
                <th style={{ padding: '12px 14px' }}>Jumlah Eksisting</th>
                <th style={{ padding: '12px 14px' }}>Status Kepegawaian</th>
              </tr>
            </thead>
            <tbody>
              {sdmStatistik.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1e293b' }}>{item.kategori}</td>
                  <td style={{ padding: '12px 14px', color: '#047857', fontWeight: 700 }}>{item.jumlah}</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{item.pns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '1.1rem', color: '#1b5e20', margin: '0 0 12px 0' }}>Standar Pelayanan Administrasi Kepegawaian</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {[
            { title: 'Kenaikan Pangkat (KP) Reguler & Pilihan', desc: 'Pengusulan berkala periode Februari, April, Juni, Agustus, Oktober, dan Desember via SIASN.' },
            { title: 'Kenaikan Gaji Berkala (KGB)', desc: 'Penerbitan Surat Keputusan KGB secara otomatis setiap 2 tahun sekali.' },
            { title: 'Pengelolaan Cuti Pegawai', desc: 'Permohonan Cuti Tahunan, Cuti Sakit, Cuti Alasan Penting melalui aplikasi SIKEP Mobile.' },
            { title: 'Penilaian Kinerja (SKP)', desc: 'Penyusunan Sasaran Kinerja Pegawai tahunan dan evaluasi triwulanan berbasis E-Kinerja BKN.' },
          ].map((srv, idx) => (
            <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', background: '#fff' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>{srv.title}</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', lineHeight: 1.4 }}>{srv.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => alert('Mengunduh Laporan Bezzeting Kepegawaian 2025 (PDF)')}
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
          <FaFilePdf size={12} /> Unduh Laporan Bezzeting Pegawai 2025 (PDF)
        </button>
      </div>
    </KesekretariatanLayout>
  );
}

export default KepegawaianPage;
