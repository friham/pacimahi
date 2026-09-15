import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { 
  FaConciergeBell, 
  FaUserFriends, 
  FaWheelchair, 
  FaFileAlt, 
  FaSearch, 
  FaCheckCircle, 
  FaInfoCircle,
  FaHeart
} from 'react-icons/fa';

const loketPTSP = [
  { no: '01', nama: 'Meja Layanan Informasi & Pengaduan', deskripsi: 'Pemberian informasi perkara, tata cara berperkara, jadwal sidang, serta penerimaan keluhan atau pengaduan masyarakat.', petugas: 'Petugas Meja Informasi' },
  { no: '02', nama: 'Meja Pendaftaran Perkara (Gugatan / Permohonan)', deskripsi: 'Penerimaan pendaftaran gugatan/permohonan secara manual (bagi yang belum e-Court) serta verifikasi berkas awal.', petugas: 'Petugas Pendaftaran' },
  { no: '03', nama: 'Meja e-Court & Gugatan Mandiri', deskripsi: 'Pendampingan pendaftaran perkara elektronik (e-Court) bagi pengguna lain (perorangan) dan pembuatan gugatan mandiri secara cuma-cuma.', petugas: 'Petugas e-Court' },
  { no: '04', nama: 'Meja Pembayaran (Kasir / Bank)', deskripsi: 'Pemberian Surat Kuasa Untuk Membayar (SKUM), pembayaran panjar biaya perkara via EDC / virtual account Bank BSI / BRI.', petugas: 'Kasir PTSP' },
  { no: '05', nama: 'Meja Penyerahan Produk Pengadilan', deskripsi: 'Pengambilan Akta Cerai, Salinan Putusan / Penetapan, dan Legalisasi dokumen putusan pengadilan.', petugas: 'Petugas Meja Produk' },
  { no: '06', nama: 'Pos Bantuan Hukum (Posbakum)', deskripsi: 'Konsultasi hukum gratis, pembuatan dokumen gugatan/permohonan bagi masyarakat tidak mampu.', petugas: 'Advokat / Paralegal Piket' },
];

const saranaPrioritas = [
  'Jalur Pemandu Difabel (Guiding Block)',
  'Kursi Roda & Tongkat Kruk Cadangan',
  'Toilet Khusus Penyandang Disabilitas',
  'Loket / Meja PTSP Khusus Prioritas Rendah',
  'Ruang Laktasi / Menyusui Ibu & Anak',
  'Ruang Bermain Ramah Anak',
  'Buku Braille & Formulir Huruf Braille',
  'Alat Bantu Dengar (Hearing Aid) di Ruang Sidang',
];

function PTSPPage() {
  const [activeTab, setActiveTab] = useState('loket');

  return (
    <LayananPublikLayout
      title="Pelayanan Terpadu Satu Pintu (PTSP)"
      subtitle="Standar Pelayanan Publik Terintegrasi Pengadilan Agama Kota Cimahi Kelas IA Berdasarkan SK Dirjen Badilag Mahkamah Agung RI"
      breadcrumb="PTSP"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #047857)',
          borderRadius: '12px',
          padding: '24px',
          color: '#fff',
          marginBottom: '28px',
          boxShadow: '0 4px 15px rgba(27, 94, 32, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FaHeart size={20} color="#fde047" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fde047' }}>
              Maklumat Pelayanan PA Kota Cimahi
            </span>
          </div>
          <blockquote style={{ margin: '0 0 12px 0', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.6, fontWeight: 500 }}>
            "Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan peradilan sesuai standar pelayanan yang telah ditetapkan, dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai peraturan perundang-undangan yang berlaku."
          </blockquote>
          <div style={{ fontSize: '0.82rem', opacity: 0.9, textAlign: 'right' }}>
            — Ketua Pengadilan Agama Kota Cimahi Kelas IA
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('loket')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'loket' ? '#1b5e20' : 'transparent',
              color: activeTab === 'loket' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaConciergeBell /> Loket & Meja Layanan
          </button>
          <button
            onClick={() => setActiveTab('prioritas')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'prioritas' ? '#1b5e20' : 'transparent',
              color: activeTab === 'prioritas' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaWheelchair /> Layanan Ramah Disabilitas
          </button>
          <button
            onClick={() => setActiveTab('kompensasi')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'kompensasi' ? '#1b5e20' : 'transparent',
              color: activeTab === 'kompensasi' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaCheckCircle /> Kompensasi Pelayanan
          </button>
        </div>

        {activeTab === 'loket' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 16px 0' }}>Struktur Meja Pelayanan Terpadu Satu Pintu</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {loketPTSP.map((loket, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      {loket.no}
                    </div>
                    <h3 style={{ fontSize: '0.95rem', color: '#1e293b', margin: 0, fontWeight: 700 }}>{loket.nama}</h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.4 }}>{loket.deskripsi}</p>
                  <div style={{ fontSize: '0.78rem', color: '#065f46', background: '#f0fdf4', padding: '4px 10px', borderRadius: '4px', fontWeight: 600, display: 'inline-block' }}>
                    Petugas: {loket.petugas}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1b5e20', fontWeight: 700, marginBottom: '6px' }}>
                <FaInfoCircle />
                <span>Prinsip Pelayanan 5S & 5R</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                Seluruh petugas PTSP PA Kota Cimahi wajib mengedepankan budaya kerja <strong>5S</strong> (Senyum, Salam, Sapa, Sopan, Santun) dan <strong>5R</strong> (Ringkas, Rapi, Resik, Rawat, Rajin) tanpa menerima gratifikasi dalam bentuk apapun.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'prioritas' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Sarana & Prasarana Ramah Kaum Rentan</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Fasilitas khusus bagi Penyandang Disabilitas, Lansia, Ibu Hamil, dan Ibu Menyusui</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              {saranaPrioritas.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <FaCheckCircle color="#059669" size={16} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'kompensasi' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Kompensasi Keterlambatan Pelayanan</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Standar kompensasi apabila layanan melebihi batas waktu SOP yang ditetapkan</p>

            <div style={{ overflowX: 'auto' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Jenis Layanan</th>
                    <th style={{ padding: '12px 14px' }}>Standar Waktu SOP</th>
                    <th style={{ padding: '12px 14px' }}>Bentuk Kompensasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Pengambilan Akta Cerai</td>
                    <td style={{ padding: '12px 14px' }}>Maksimal 15 Menit</td>
                    <td style={{ padding: '12px 14px', color: '#047857' }}>Permohonan Maaf Tertulis & Pengiriman Gratis via Pos / Kurir</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Pendaftaran Perkara Baru</td>
                    <td style={{ padding: '12px 14px' }}>Maksimal 20 Menit</td>
                    <td style={{ padding: '12px 14px', color: '#047857' }}>Permohonan Maaf & Souvenir Edukasi Peradilan</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Pemberian Informasi Perkara</td>
                    <td style={{ padding: '12px 14px' }}>Maksimal 10 Menit</td>
                    <td style={{ padding: '12px 14px', color: '#047857' }}>Permohonan Maaf Langsung oleh Penanggung Jawab PTSP</td>
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

export default PTSPPage;
