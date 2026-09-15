import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { FaShieldAlt, FaCheckCircle, FaDownload, FaFilePdf, FaExternalLinkAlt, FaUsers, FaAward } from 'react-icons/fa';

const lhkpnHakim = [
  { nama: 'Drs. H. Dudung, S.H., M.H.', jabatan: 'Ketua Pengadilan Agama Kota Cimahi', statusLHKPN: 'Sudah Lapor (100%)', tglLapor: '15 Januari 2025', nhk: 'NHK-182930' },
  { nama: 'Dra. Hj. Siti Aminah, M.H.ES.', jabatan: 'Wakil Ketua Pengadilan Agama Kota Cimahi', statusLHKPN: 'Sudah Lapor (100%)', tglLapor: '18 Januari 2025', nhk: 'NHK-291024' },
  { nama: 'Drs. H. Ahmad Fauzi, M.H.', jabatan: 'Hakim Utama Muda', statusLHKPN: 'Sudah Lapor (100%)', tglLapor: '20 Januari 2025', nhk: 'NHK-381920' },
  { nama: 'Hj. Nurlaila, S.Ag., M.H.', jabatan: 'Hakim Madya Pratama', statusLHKPN: 'Sudah Lapor (100%)', tglLapor: '22 Januari 2025', nhk: 'NHK-472819' },
  { nama: 'H. M. Syukri, S.H.I., M.S.I.', jabatan: 'Hakim Madya Pratama', statusLHKPN: 'Sudah Lapor (100%)', tglLapor: '25 Januari 2025', nhk: 'NHK-581923' },
  { nama: 'Drs. Subhan, M.H.', jabatan: 'Panitera', statusLHKPN: 'Sudah Lapor (100%)', tglLapor: '16 Januari 2025', nhk: 'NHK-691823' },
  { nama: 'Rudi Hermawan, S.E., M.M.', jabatan: 'Sekretaris / KPA', statusLHKPN: 'Sudah Lapor (100%)', tglLapor: '17 Januari 2025', nhk: 'NHK-782910' },
];

function LHKPNPage() {
  const [activeTab, setActiveTab] = useState('lhkpn');

  return (
    <KesekretariatanLayout
      title="LHKPN & LHKASN"
      subtitle="Kepatuhan Pelaporan Harta Kekayaan Penyelenggara Negara (e-LHKPN KPK) dan Aparatur Sipil Negara (SiHARKA KemenPAN-RB) PA Kota Cimahi"
      breadcrumb="LHKPN & LHKASN"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #15803d)',
          borderRadius: '12px',
          padding: '24px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          boxShadow: '0 4px 15px rgba(27, 94, 32, 0.25)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <FaAward size={20} color="#fde047" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fde047' }}>
                Tingkat Kepatuhan Pelaporan 2024 / 2025
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: '0 0 6px 0', fontWeight: 800 }}>100% KEPATUHAN TEPAT WAKTU</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Seluruh Wajib Lapor (Pimpinan, Hakim, Panitera, Sekretaris, & Pejabat Pembuat Komitmen) telah menyelesaikan pelaporan sebelum batas waktu.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px 24px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>100%</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>KPK RI & SiHARKA</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('lhkpn')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'lhkpn' ? '#1b5e20' : 'transparent',
              color: activeTab === 'lhkpn' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaShieldAlt /> e-LHKPN (KPK RI)
          </button>
          <button
            onClick={() => setActiveTab('lhkasn')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'lhkasn' ? '#1b5e20' : 'transparent',
              color: activeTab === 'lhkasn' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaUsers /> LHKASN (SiHARKA)
          </button>
        </div>

        {activeTab === 'lhkpn' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Daftar Wajib Lapor e-LHKPN Periode Pelaporan 2024</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>Verifikasi tanda terima pelaporan LHKPN pada Komisi Pemberantasan Korupsi (KPK)</p>
              </div>
              <a
                href="https://elhkpn.kpk.go.id"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#0284c7',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Portal e-LHKPN KPK</span>
                <FaExternalLinkAlt size={10} />
              </a>
            </div>

            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Nama Pejabat / Pegawai</th>
                    <th style={{ padding: '12px 14px' }}>Jabatan</th>
                    <th style={{ padding: '12px 14px' }}>Status Pelaporan</th>
                    <th style={{ padding: '12px 14px' }}>Tanggal Lapor</th>
                    <th style={{ padding: '12px 14px' }}>No. Register KPK</th>
                  </tr>
                </thead>
                <tbody>
                  {lhkpnHakim.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1e293b' }}>{row.nama}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.jabatan}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FaCheckCircle size={10} /> {row.statusLHKPN}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{row.tglLapor}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#0369a1', fontWeight: 600 }}>{row.nhk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => alert('Mengunduh Rekapitulasi Tanda Terima e-LHKPN 2024 Lengkap (PDF)')}
              style={{
                background: '#1b5e20',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaFilePdf /> Unduh Rekap Bukti Tanda Terima LHKPN KPK 2024 (PDF)
            </button>
          </div>
        )}

        {activeTab === 'lhkasn' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 6px 0' }}>Laporan Harta Kekayaan ASN (SiHARKA)</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Kepatuhan pelaporan harta kekayaan seluruh Pegawai Negeri Sipil / Non-Wajib LHKPN</p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'center' }}>
                <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1b5e20' }}>28 Orang</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Wajib Lapor ASN</div>
                </div>
                <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>28 Orang</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Sudah Melaporkan</div>
                </div>
                <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Persentase Kepatuhan</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => alert('Mengunduh Berita Acara Rekapitulasi LHKASN SiHARKA 2024 (PDF)')}
                style={{
                  background: '#1b5e20',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FaDownload /> Unduh Rekapitulasi SiHARKA 2024 (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    </KesekretariatanLayout>
  );
}

export default LHKPNPage;
