import { useState } from 'react';
import InformasiUmumLayout from './InformasiUmumLayout';
import { FaDownload, FaChartLine } from 'react-icons/fa';

const laptahData = [
  {
    id: 'laptah-2025',
    year: '2025',
    title: 'Laporan Tahunan (Laptah) Tahun 2025',
    desc: 'Laporan capaian kinerja komprehensif, penyelesaian perkara, realisasi anggaran, serta inovasi pelayanan peradilan PA Kota Cimahi Tahun 2025.',
    link: 'https://drive.google.com/file/d/1Tj7DZtsLfOI1blKpzG50Cphz6hZuUJ_5/preview',
    downloadLink: 'https://drive.google.com/file/d/1Tj7DZtsLfOI1blKpzG50Cphz6hZuUJ_5/view?usp=sharing',
    type: 'Laporan Tahunan',
  },
  {
    id: 'lpk-2025',
    year: '2025 (LPK)',
    title: 'Laporan Pelaksanaan Kegiatan (LPK) Tahun 2025',
    desc: 'Dokumentasi detail pelaksanaan kegiatan operasional yustisial dan kesekretariatan Tahun 2025.',
    link: 'https://drive.google.com/file/d/1fpN8FxWxD6O4kTCPSZU_YuQfXQ5Rj9sr/preview',
    downloadLink: 'https://drive.google.com/file/d/1fpN8FxWxD6O4kTCPSZU_YuQfXQ5Rj9sr/view?usp=sharing',
    type: 'LPK',
  },
  {
    id: 'laptah-2024',
    year: '2024',
    title: 'Laporan Tahunan (Laptah) Tahun 2024',
    desc: 'Rekapitulasi tahunan kinerja penyelesaian perkara, manajemen peradilan, dan pelayanan publik Tahun 2024.',
    link: 'https://drive.google.com/file/d/1x7_5lAVRqPSoPsAjX3S9ckEnB90s0DgA/preview',
    downloadLink: 'https://drive.google.com/file/d/1x7_5lAVRqPSoPsAjX3S9ckEnB90s0DgA/view?usp=sharing',
    type: 'Laporan Tahunan',
  },
];

function LaporanTahunanPage() {
  const [selectedId, setSelectedId] = useState(laptahData[0].id);

  const currentDoc = laptahData.find(item => item.id === selectedId) || laptahData[0];

  return (
    <InformasiUmumLayout
      title="Laporan Tahunan (Laptah)"
      subtitle="Akuntabilitas dan Laporan Capaian Kinerja Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Laporan Tahunan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaChartLine style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Wujud Transparansi & Akuntabilitas Publik</h4>
          <p style={{ margin: 0 }}>
            Laporan Tahunan memuat informasi komprehensif mengenai realisasi target perkara, serapan anggaran, reformasi birokrasi, sarana prasarana, serta evaluasi pelayanan prima bagi masyarakat pencari keadilan di Kota Cimahi dan Kabupaten Bandung Barat.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {laptahData.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: selectedId === item.id ? 'none' : '1px solid var(--gray-300)',
                background: selectedId === item.id ? 'var(--primary-800)' : 'white',
                color: selectedId === item.id ? 'white' : 'var(--gray-700)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedId === item.id ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {item.title.replace(' (Laptah)', '')}
            </button>
          ))}
        </div>

        <div style={{
          background: '#f8fafc',
          border: '1px solid var(--gray-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          margin: '1.5rem 0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ margin: 0, paddingBottom: 0, borderBottom: 'none', fontSize: '1.3rem' }}>
                {currentDoc.title}
              </h2>
              <p style={{ margin: '0.35rem 0 0 0', color: 'var(--gray-600)', fontSize: '0.88rem' }}>
                {currentDoc.desc}
              </p>
            </div>
            <a
              href={currentDoc.downloadLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--primary-800)',
                color: 'white',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <FaDownload size={14} /> Unduh PDF
            </a>
          </div>

          <div className="embed-container" style={{ paddingBottom: '90%' }}>
            <iframe
              src={currentDoc.link}
              title={currentDoc.title}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </article>
    </InformasiUmumLayout>
  );
}

export default LaporanTahunanPage;
