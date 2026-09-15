import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { 
  FaBullhorn, 
  FaExternalLinkAlt, 
  FaShieldAlt, 
  FaUserSecret, 
  FaFileAlt, 
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';

const channels = [
  { nama: 'Aplikasi SIWAS MARI (Online)', deskripsi: 'Sistem Informasi Pengawasan Mahkamah Agung RI berbasis digital 24 jam dengan jaminan kerahasiaan identitas pelapor.', link: 'https://siwas.mahkamahagung.go.id', external: true },
  { nama: 'Meja Pengaduan PTSP', deskripsi: 'Menyampaikan pengaduan langsung ke Petugas Meja Pengaduan di Kantor Pengadilan Agama Kota Cimahi.', link: '#', external: false },
  { nama: 'Email Pengaduan', deskripsi: 'Kirim berkas kronologi dan bukti ke email resmi pengawasan: pengaduan@pa-cimahi.go.id.', link: 'mailto:pengaduan@pa-cimahi.go.id', external: true },
  { nama: 'WhatsApp Pengaduan', deskripsi: 'Kirim pesan pengaduan cepat via WhatsApp SILINCAH: 0811-2111-1522.', link: 'https://wa.me/6281121111522?text=Laporan%20Pengaduan', external: true },
];

function LayananPengaduanPage() {
  const [tab, setTab] = useState('alur');

  return (
    <LayananPublikLayout
      title="Layanan Pengaduan & SIWAS MARI"
      subtitle="Saluran Pengaduan Dugaan Pelanggaran Kode Etik, Pungli, Gratifikasi, dan Ketidakpuasan Pelayanan Peradilan (PERMA No. 9 Tahun 2016)"
      breadcrumb="Layanan Pengaduan"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a, #0369a1)',
          borderRadius: '12px',
          padding: '24px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          boxShadow: '0 4px 15px rgba(30, 58, 138, 0.25)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <FaUserSecret size={22} color="#93c5fd" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#93c5fd' }}>
                Whistleblowing System Mahkamah Agung RI
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>SIWAS MARI — PERLINDUNGAN PELAPOR 100%</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Identitas Pelapor dijamin kerahasiaannya oleh Badan Pengawasan Mahkamah Agung RI.
            </p>
          </div>
          <a
            href="https://siwas.mahkamahagung.go.id"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#fff',
              color: '#1e3a8a',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Buka SIWAS MARI</span>
            <FaExternalLinkAlt size={12} />
          </a>
        </div>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            onClick={() => setTab('alur')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: tab === 'alur' ? '#1b5e20' : 'transparent',
              color: tab === 'alur' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Alur & Saluran Pengaduan
          </button>
          <button
            onClick={() => setTab('hak')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: tab === 'hak' ? '#1b5e20' : 'transparent',
              color: tab === 'hak' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Hak Pelapor & Terlapor
          </button>
          <button
            onClick={() => setTab('meja')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: tab === 'meja' ? '#1b5e20' : 'transparent',
              color: tab === 'meja' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Laporan Meja Pengaduan
          </button>
        </div>

        {tab === 'alur' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 14px 0' }}>4 Kanal Resmi Pengaduan PA Kota Cimahi</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              {channels.map((ch, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff' }}>
                  <h4 style={{ fontSize: '0.98rem', color: '#1e293b', margin: '0 0 6px 0', fontWeight: 700 }}>{ch.nama}</h4>
                  <p style={{ fontSize: '0.83rem', color: '#64748b', margin: '0 0 14px 0', lineHeight: 1.45 }}>{ch.deskripsi}</p>
                  {ch.external && (
                    <a href={ch.link} target="_blank" rel="noreferrer" style={{ color: '#1b5e20', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Akses Layanan <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#1b5e20' }}>Syarat Laporan Pengaduan yang Dapat Diproses:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                <li>Mencantumkan nama dan identitas pelapor (atau memilih opsi anonim terlindungi di SIWAS).</li>
                <li>Menyebutkan secara jelas pihak yang dilaporkan (Terlapor).</li>
                <li>Menjelaskan kronologi perbuatan atau pelanggaran yang diadukan.</li>
                <li>Menyertakan bukti awal (foto, rekaman, dokumen, atau saksi).</li>
              </ul>
            </div>
          </div>
        )}

        {tab === 'hak' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff' }}>
              <h4 style={{ fontSize: '1rem', color: '#1b5e20', margin: '0 0 10px 0', fontWeight: 700 }}>Hak-Hak Pelapor:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                <li>Mendapatkan perlindungan kerahasiaan atas identitas pribadinya.</li>
                <li>Mendapatkan tanda terima resmi atas laporan pengaduan yang disampaikan.</li>
                <li>Mengetahui tahapan dan perkembangan penanganan pengaduan.</li>
                <li>Mendapatkan perlakuan yang sama tanpa diskriminasi.</li>
              </ul>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff' }}>
              <h4 style={{ fontSize: '1rem', color: '#0369a1', margin: '0 0 10px 0', fontWeight: 700 }}>Hak-Hak Terlapor:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                <li>Mengetahui dugaan pelanggaran yang disangkakan kepadanya.</li>
                <li>Mendapatkan hak pembelaan diri dan memberikan keterangan klarifikasi.</li>
                <li>Didampingi atau menghadirkan saksi yang meringankan.</li>
                <li>Asas praduga tak bersalah sebelum adanya putusan sanksi tetap.</li>
              </ul>
            </div>
          </div>
        )}

        {tab === 'meja' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 12px 0' }}>Rekapitulasi Register Meja Pengaduan</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>Laporan berkala penanganan keluhan dan pengaduan masyarakat PA Kota Cimahi</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Periode</th>
                    <th style={{ padding: '12px 14px' }}>Pengaduan Diterima</th>
                    <th style={{ padding: '12px 14px' }}>Dalam Proses</th>
                    <th style={{ padding: '12px 14px' }}>Selesai / Ditindaklanjuti</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700 }}>Triwulan I 2025</td>
                    <td style={{ padding: '12px 14px' }}>0 Laporan</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>100%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700 }}>Tahun 2024</td>
                    <td style={{ padding: '12px 14px' }}>0 Laporan</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </LayananPublikLayout>
  );
}

export default LayananPengaduanPage;
