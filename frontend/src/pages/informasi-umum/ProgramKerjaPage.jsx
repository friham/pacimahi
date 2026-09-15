import { useState } from 'react';
import InformasiUmumLayout from './InformasiUmumLayout';
import { FaCalendarCheck, FaDownload } from 'react-icons/fa';

const prokerData = [
  {
    year: '2026',
    title: 'Program Kerja Tahunan (PKT) Tahun 2026',
    desc: 'Rencana kerja, target kinerja tahunan, serta alokasi prioritas pelayanan peradilan modern berbasis TI Tahun 2026.',
    link: 'https://drive.google.com/file/d/1qr9EXQu-Zd6OjEUyL_QRcSoc9wUOFl1q/preview',
    downloadLink: 'https://drive.google.com/open?id=1qr9EXQu-Zd6OjEUyL_QRcSoc9wUOFl1q&usp=drive_fs',
    cover: 'https://pa-cimahi.go.id/images/pkt2026.jpg',
  },
  {
    year: '2025',
    title: 'Program Kerja Tahunan (PKT) Tahun 2025',
    desc: 'Pedoman pelaksanaan kegiatan yustisial dan non-yustisial serta program peningkatan Zona Integritas Tahun 2025.',
    link: 'https://drive.google.com/file/d/1gwYRwvXWjgaPM0oIEidM-z5iWlH0Ifhz/preview',
    downloadLink: 'https://drive.google.com/file/d/1gwYRwvXWjgaPM0oIEidM-z5iWlH0Ifhz/view?usp=sharing',
    cover: 'https://pa-cimahi.go.id/images/proker_2025.png',
  },
  {
    year: '2024',
    title: 'Program Kerja Tahunan (PKT) Tahun 2024',
    desc: 'Arsip rencana kinerja tahunan dan pencapaian indikator kinerja utama (IKU) Tahun 2024.',
    link: 'https://drive.google.com/file/d/1KBTFhccgbLLuoCyf-TYag2F_azKTek59/preview',
    downloadLink: 'https://drive.google.com/file/d/1KBTFhccgbLLuoCyf-TYag2F_azKTek59/view?usp=sharing',
    cover: 'https://pa-cimahi.go.id/images/2024/PKT_2024_Cover.png',
  },
  {
    year: '2023',
    title: 'Program Kerja Tahunan (PKT) Tahun 2023',
    desc: 'Arsip rencana kerja dan anggaran operasional Pengadilan Agama Kota Cimahi Tahun 2023.',
    link: 'https://drive.google.com/file/d/1Tn58Qk_JYD7iydLAoWvtCmWdsthYILRB/preview',
    downloadLink: 'https://drive.google.com/file/d/1Tn58Qk_JYD7iydLAoWvtCmWdsthYILRB/view?usp=sharing',
    cover: null,
  },
];

function ProgramKerjaPage() {
  const [activeYear, setActiveYear] = useState('2026');

  const selectedItem = prokerData.find(item => item.year === activeYear) || prokerData[0];

  return (
    <InformasiUmumLayout
      title="Program Kerja Tahunan"
      subtitle="Rencana Kerja dan Rencana Aksi Kinerja Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Program Kerja Tahunan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaCalendarCheck style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Pedoman Rencana Aksi Kinerja</h4>
          <p style={{ margin: 0 }}>
            Program Kerja Tahunan (PKT) Pengadilan Agama Kota Cimahi memuat penjabaran rencana strategis ke dalam program nyata, target kuantitatif, dan jadwal operasional guna mewujudkan tata kelola peradilan yang prima dan akuntabel.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {prokerData.map((item) => (
            <button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: activeYear === item.year ? 'none' : '1px solid var(--gray-300)',
                background: activeYear === item.year ? 'var(--primary-800)' : 'white',
                color: activeYear === item.year ? 'white' : 'var(--gray-700)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeYear === item.year ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Tahun {item.year} {item.year === '2026' && '(Terbaru)'}
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
                {selectedItem.title}
              </h2>
              <p style={{ margin: '0.35rem 0 0 0', color: 'var(--gray-600)', fontSize: '0.88rem' }}>
                {selectedItem.desc}
              </p>
            </div>
            <a
              href={selectedItem.downloadLink}
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
              src={selectedItem.link}
              title={selectedItem.title}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </article>
    </InformasiUmumLayout>
  );
}

export default ProgramKerjaPage;
