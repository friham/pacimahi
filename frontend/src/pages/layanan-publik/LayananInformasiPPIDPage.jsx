import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { FaInfoCircle, FaFileAlt, FaFilePdf, FaMoneyBillWave, FaUserCheck, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const ppidTabs = [
  { id: 'prosedur', label: 'Prosedur Permintaan', icon: FaInfoCircle },
  { id: 'formulir', label: 'Formulir Permintaan', icon: FaFileAlt },
  { id: 'biaya', label: 'Biaya Memperoleh Informasi', icon: FaMoneyBillWave },
  { id: 'hak', label: 'Hak Pemohon Informasi', icon: FaUserCheck },
  { id: 'keberatan', label: 'Prosedur Keberatan', icon: FaExclamationCircle },
  { id: 'laporan', label: 'Laporan Akses Informasi', icon: FaFilePdf },
];

function LayananInformasiPPIDPage() {
  const [activeTab, setActiveTab] = useState('prosedur');

  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    pekerjaan: '',
    telepon: '',
    email: '',
    informasiDiminta: '',
    tujuan: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <LayananPublikLayout
      title="Layanan Informasi Publik (PPID)"
      subtitle="Pejabat Pengelola Informasi dan Dokumentasi (PPID) Pengadilan Agama Kota Cimahi — Transparansi Sesuai SK KMA No. 2-144/KMA/SK/VIII/2022"
      breadcrumb="Layanan Informasi PPID"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #047857)',
          borderRadius: '12px',
          padding: '24px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          boxShadow: '0 4px 15px rgba(27, 94, 32, 0.2)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <FaCheckCircle size={20} color="#fde047" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#fde047' }}>
                Prinsip Keterbukaan Informasi Publik
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>BIAYA INFORMASI: RP 0,- (GRATIS)</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Pemberian informasi publik secara digital/elektronik tidak dipungut biaya apapun.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px 20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>PPID</div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase' }}>PA Kota Cimahi</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {ppidTabs.map((tab) => {
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

        {activeTab === 'prosedur' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 14px 0' }}>Tahapan Permintaan Informasi Publik</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { no: '1', title: 'Pengajuan Permohonan', desc: 'Pemohon mengisi formulir permohonan informasi via online atau langsung di Meja Informasi PTSP dengan melampirkan fotokopi KTP.' },
                { no: '2', title: 'Pencatatan & Verifikasi', desc: 'Petugas PPID memeriksa kelengkapan data dan memberikan tanda terima permohonan resmi.' },
                { no: '3', title: 'Pemberitahuan Tertulis', desc: 'PPID memberikan jawaban tertulis paling lambat 10 (sepuluh) hari kerja (dapat diperpanjang 7 hari kerja).' },
                { no: '4', title: 'Penyerahan Informasi', desc: 'Informasi diberikan secara digital (email/softcopy) atau hardcopy di Meja PPID.' },
              ].map((s, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#fff' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1b5e20', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '10px' }}>
                    {s.no}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>{s.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'formulir' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 14px 0' }}>Formulir Permohonan Informasi Publik Online</h3>
            {submitted ? (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
                <FaCheckCircle size={40} color="#059669" style={{ marginBottom: '12px' }} />
                <h4 style={{ margin: '0 0 6px 0', color: '#065f46', fontSize: '1.1rem' }}>Permohonan Informasi Berhasil Terkirim!</h4>
                <p style={{ margin: '0 0 16px 0', color: '#047857', fontSize: '0.85rem' }}>
                  Petugas PPID PA Kota Cimahi akan memproses permohonan Anda maksimal 10 hari kerja. Kode registrasi: <strong>PPID-CMI-{Date.now().toString().slice(-6)}</strong>.
                </p>
                <button onClick={() => setSubmitted(false)} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  Kirim Permohonan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Nama Lengkap Sesuai KTP *</label>
                  <input required type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Nomor Induk Kependudukan (NIK) *</label>
                  <input required type="text" value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Nomor Telepon / WhatsApp *</label>
                  <input required type="text" value={formData.telepon} onChange={(e) => setFormData({...formData, telepon: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Alamat Email *</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Rincian Informasi yang Dibutuhkan *</label>
                  <textarea required rows={3} value={formData.informasiDiminta} onChange={(e) => setFormData({...formData, informasiDiminta: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <button type="submit" style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
                    Kirim Permohonan Informasi
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'biaya' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 12px 0' }}>Ketentuan Biaya Perolehan Informasi</h3>
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Bentuk Informasi</th>
                    <th style={{ padding: '12px 14px' }}>Biaya Layanan</th>
                    <th style={{ padding: '12px 14px' }}>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Dokumen Digital / Softcopy (PDF/Email/Flashdisk)</td>
                    <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>Rp 0,- (GRATIS)</td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>Pengiriman via email / portal PPID</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Fotokopi / Hardcopy Cetak</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Sesuai Biaya Riil Fotokopi</td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>Ditanggung oleh pemohon</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'hak' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 12px 0' }}>Hak-Hak Pemohon Informasi Publik</h3>
            <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
              <li>Melihat dan mengetahui informasi publik yang ada di bawah penguasaan pengadilan.</li>
              <li>Menghadiri pertemuan publik yang terbuka untuk umum untuk memperoleh informasi.</li>
              <li>Mendapatkan salinan informasi publik melalui permohonan sesuai prosedur.</li>
              <li>Mengajukan keberatan apabila permohonan informasi tidak ditanggapi atau ditolak tanpa alasan sah.</li>
            </ul>
          </div>
        )}

        {activeTab === 'keberatan' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 12px 0' }}>Prosedur Pengajuan Keberatan Informasi</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>
              Pemohon berhak mengajukan keberatan kepada Atasan PPID (Ketua Pengadilan Agama Kota Cimahi) apabila permohonan informasi:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
              <li>Ditolak dengan alasan pengecualian yang tidak berdasar.</li>
              <li>Tidak ditanggapi dalam jangka waktu 10 hari kerja.</li>
              <li>Permintaan informasi dikenakan biaya yang tidak wajar.</li>
              <li>Informasi yang diberikan tidak sesuai dengan yang diminta.</li>
            </ul>
            <button onClick={() => alert('Mengunduh Formulir Keberatan Informasi Publik (PDF)')} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaFilePdf size={12} /> Unduh Formulir Keberatan (PDF)
            </button>
          </div>
        )}

        {activeTab === 'laporan' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 12px 0' }}>Laporan Layanan Informasi Publik (PPID) Tahunan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'Laporan Akses Layanan Informasi Publik (PPID) TA 2024', size: '2.4 MB', date: 'Januari 2025' },
                { title: 'Laporan Akses Layanan Informasi Publik (PPID) TA 2023', size: '2.1 MB', date: 'Januari 2024' },
              ].map((doc, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', color: '#1e293b', fontWeight: 600 }}>{doc.title}</span>
                  <button onClick={() => alert(`Mengunduh: ${doc.title}`)} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Unduh ({doc.size})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LayananPublikLayout>
  );
}

export default LayananInformasiPPIDPage;
