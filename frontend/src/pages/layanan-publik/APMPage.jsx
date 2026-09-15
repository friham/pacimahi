import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { FaAward, FaUserTie, FaHeart, FaCogs, FaCompass, FaBoxes, FaFolderOpen, FaChartLine, FaFilePdf } from 'react-icons/fa';

const apmCriteria = [
  { id: 'leadership', title: '1. Leadership (Kepemimpinan)', icon: FaUserTie, score: 'Nilai: 100%', desc: 'Komitmen pimpinan dalam menetapkan visi, misi, nilai-nilai organisasi, dan pembinaan berkala aparatur pengadilan.' },
  { id: 'customerFocus', title: '2. Customer Focus (Fokus Pengguna Layanan)', icon: FaHeart, score: 'Nilai: 100%', desc: 'Standar pelayanan prima pada PTSP, survei IKM, penanganan pengaduan cepat, dan sarana disabilitas.' },
  { id: 'processManagement', title: '3. Process Management (Manajemen Proses)', icon: FaCogs, score: 'Nilai: 98.5%', desc: 'Standardisasi proses persidangan, e-Court, administrasi perkara SIPP, dan kepatuhan SOP peradilan.' },
  { id: 'strategicPlanning', title: '4. Strategic Planning (Perencanaan Strategis)', icon: FaCompass, score: 'Nilai: 100%', desc: 'Penyelarasan Renstra, IKU, RKT, Perjanjian Kinerja Tahunan, dan mitigasi risiko operasional.' },
  { id: 'resourcesManagement', title: '5. Resources Management (Manajemen Sumber Daya)', icon: FaBoxes, score: 'Nilai: 99.0%', desc: 'Pengelolaan SDM berbasis SIKEP, pengelolaan anggaran DIPA, serta pemeliharaan aset BMN SIMAN.' },
  { id: 'documentSystem', title: '6. Document System (Sistem Dokumen & Arsip)', icon: FaFolderOpen, score: 'Nilai: 100%', desc: 'Pengendalian dokumen SOP, tata naskah dinas, register perkara elektronik, dan digitalisasi berkas perkara.' },
  { id: 'performanceResults', title: '7. Performance Results (Hasil Kinerja)', icon: FaChartLine, score: 'Nilai: 99.5%', desc: 'Capaian rasio penyelesaian perkara di atas 95%, realisasi anggaran optimal, dan kepuasan publik tinggi.' },
];

function APMPage() {
  const [selectedCriteria, setSelectedCriteria] = useState('all');

  return (
    <LayananPublikLayout
      title="Akreditasi Penjaminan Mutu (APM)"
      subtitle="Sertifikasi Akreditasi Penjaminan Mutu Badan Peradilan Agama (Ditjen Badilag Mahkamah Agung RI) — Predikat A (Excellent)"
      breadcrumb="Akreditasi Penjaminan Mutu"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #b45309)',
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
              <FaAward size={22} color="#fde047" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#fde047' }}>
                Hasil Surveillance Akreditasi Ditjen Badilag
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px 0' }}>PREDIKAT A (EXCELLENT)</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Pengadilan Agama Kota Cimahi Kelas IA secara konsisten mempertahankan nilai mutu tertinggi pada 7 Kriteria Standar Akreditasi Peradilan Agama.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px 24px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>A</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>EXCELLENT</div>
          </div>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#1b5e20', margin: '0 0 16px 0' }}>7 (Tujuh) Area Kriteria Penjaminan Mutu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {apmCriteria.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: '0.98rem', color: '#1e293b', margin: 0, fontWeight: 700 }}>{item.title}</h3>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', background: '#f0fdf4', padding: '3px 8px', borderRadius: '4px' }}>
                    {item.score}
                  </span>
                </div>
                <p style={{ fontSize: '0.83rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h4 style={{ margin: '0 0 2px 0', fontSize: '0.92rem', color: '#1b5e20' }}>Sertifikat Akreditasi Penjaminan Mutu</h4>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Diterbitkan oleh Ditjen Badan Peradilan Agama Mahkamah Agung RI</div>
          </div>
          <button
            onClick={() => alert('Mengunduh Sertifikat APM Predikat A (PDF)')}
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
            <FaFilePdf size={12} /> Unduh Sertifikat APM (PDF)
          </button>
        </div>
      </div>
    </LayananPublikLayout>
  );
}

export default APMPage;
