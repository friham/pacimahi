import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { 
  FaAward, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaUsers, 
  FaBalanceScale, 
  FaCogs, 
  FaEye, 
  FaHandsHelping,
  FaFilePdf,
  FaDownload
} from 'react-icons/fa';

const areaPerubahan = [
  { no: 'I', nama: 'Manajemen Perubahan', icon: FaCogs, poin: 'Membangun komitmen pimpinan dan seluruh aparatur menuju Wilayah Bebas dari Korupsi (WBK) & WBBM.', target: 'Pola Pikir (Mindset) & Budaya Kerja (Culture Set)' },
  { no: 'II', nama: 'Penataan Tatalaksana', icon: FaBalanceScale, poin: 'Penerapan SOP terstandarisasi, digitalisasi persidangan via e-Court, dan keterbukaan informasi peradilan.', target: 'Efisiensi & Efektivitas Sistem Kerja' },
  { no: 'III', nama: 'Penataan Sistem Manajemen SDM', icon: FaUsers, poin: 'Transparansi mutasi/promosi, penilaian kinerja berbasis SKP, serta penegakan disiplin dan kode etik aparatur.', target: 'Profesionalisme & Integritas SDM' },
  { no: 'IV', nama: 'Penguatan Akuntabilitas', icon: FaCheckCircle, poin: 'Keterlibatan pimpinan secara langsung dalam penyusunan SAKIP, Renstra, IKU, dan Perjanjian Kinerja Tahunan.', target: 'Akuntabilitas Kinerja & Anggaran' },
  { no: 'V', nama: 'Penguatan Pengawasan', icon: FaEye, poin: 'Optimalisasi SIWAS MARI, whistleblowing system (WBS), pengendalian gratifikasi, dan penanganan benturan kepentingan.', target: 'Terwujudnya Satker Bebas KKN' },
  { no: 'VI', nama: 'Peningkatan Kualitas Pelayanan Publik', icon: FaHandsHelping, poin: 'Penyediaan fasilitas PTSP prima, inovasi SILINCAH, antrean sidang berbasis barcode, dan survei kepuasan (IKM/IPA).', target: 'Kepuasan Masyarakat & Layanan Prima' },
];

function ZonaIntegritasPage() {
  const [activeArea, setActiveArea] = useState(0);

  return (
    <LayananPublikLayout
      title="Zona Integritas (WBK / WBBM)"
      subtitle="Pembangunan Zona Integritas Menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM) PA Kota Cimahi"
      breadcrumb="Zona Integritas"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #065f46, #047857)',
          borderRadius: '12px',
          padding: '24px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          boxShadow: '0 4px 15px rgba(6, 95, 70, 0.2)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <FaShieldAlt size={20} color="#fde047" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#fde047' }}>
                Komitmen Bersama PA Kota Cimahi
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>TOLAK SUAP, GRATIFIKASI & PUNGLI!</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Seluruh pelayanan di Pengadilan Agama Kota Cimahi bebas dari segala bentuk pungutan liar dan biaya di luar ketentuan perundang-undangan.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 20px', borderRadius: '10px', textAlign: 'center' }}>
            <FaAward size={36} color="#fde047" />
            <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '4px' }}>WBK & WBBM</div>
          </div>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#1b5e20', margin: '0 0 8px 0' }}>6 (Enam) Area Perubahan Pembangunan Zona Integritas</h2>
        <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Pilar reformasi birokrasi peradilan agama di Pengadilan Agama Kota Cimahi Kelas IA</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {areaPerubahan.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '18px',
                  background: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Area {area.no}</div>
                    <h3 style={{ fontSize: '0.98rem', color: '#1e293b', margin: 0, fontWeight: 700 }}>{area.nama}</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.45 }}>{area.poin}</p>
                <div style={{ fontSize: '0.78rem', color: '#64748b', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                  Target: <strong style={{ color: '#065f46' }}>{area.target}</strong>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#1b5e20', margin: '0 0 8px 0', fontWeight: 700 }}>Lembar Kerja Evaluasi (LKE) & Dokumen ZI</h3>
          <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: '#475569' }}>
            Dokumen eviden dan Lembar Kerja Evaluasi (LKE) Zona Integritas PA Kota Cimahi yang diunggah ke Portal PMPZI Mahkamah Agung RI.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => alert('Mengunduh SK Tim Pembangunan ZI PA Cimahi')}
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
              <FaFilePdf /> SK Tim Pembangunan ZI (PDF)
            </button>
            <button
              onClick={() => alert('Mengunduh Rencana Aksi ZI 2025')}
              style={{
                background: '#0d9488',
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
              <FaDownload /> Rencana Aksi ZI TA 2025 (PDF)
            </button>
          </div>
        </div>
      </div>
    </LayananPublikLayout>
  );
}

export default ZonaIntegritasPage;
