import { useState } from 'react';
import ProfileLayout from './ProfileLayout';
import { FaCalendarAlt, FaFilePdf, FaExternalLinkAlt, FaClock } from 'react-icons/fa';

function AgendaKegiatanPage() {
  const [selectedYear, setSelectedYear] = useState('2026');

  const years = [
    { year: '2026', label: 'Tahun 2026 (Terbaru)' },
    { year: '2025', label: 'Tahun 2025' },
    { year: '2024', label: 'Tahun 2024' },
    { year: '2023', label: 'Tahun 2023' },
    { year: '2022', label: 'Tahun 2022' },
    { year: '2021', label: 'Tahun 2021' },
  ];

  return (
    <ProfileLayout
      title="Agenda Kegiatan Pimpinan"
      subtitle="Jadwal Kerja, Rapat Koordinasi, dan Agenda Resmi Pimpinan Pengadilan Agama Kota Cimahi"
      breadcrumb="Agenda Kegiatan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaCalendarAlt style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Transparansi Jadwal Kerja & Agenda Pimpinan</h4>
          <p style={{ margin: 0 }}>
            Informasi publik terkait jadwal pelaksanaan agenda kerja pimpinan, rapat koordinasi bulanan, pembinaan, sosialisasi inovasi, serta kegiatan yustisial dan non-yustisial di lingkungan Pengadilan Agama Kota Cimahi.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {years.map((y) => (
            <button
              key={y.year}
              onClick={() => setSelectedYear(y.year)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedYear === y.year ? 'none' : '1px solid var(--gray-300)',
                background: selectedYear === y.year ? 'var(--primary-800)' : 'white',
                color: selectedYear === y.year ? 'white' : 'var(--gray-700)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedYear === y.year ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {y.label}
            </button>
          ))}
        </div>

        {selectedYear === '2026' && (
          <div>
            <h2>Jadwal & Agenda Kerja Tahun 2026</h2>
            <p>
              Pratinjau kalender kerja dan jadwal kegiatan pimpinan Pengadilan Agama Kota Cimahi Kelas IA Tahun Anggaran 2026:
            </p>
            <div className="embed-container" style={{ paddingBottom: '100%' }}>
              <iframe
                src="https://drive.google.com/file/d/189TA_LkWwk95hEqt0nW44GUJLtxnv6Hz/preview"
                title="Agenda Kegiatan 2026"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}

        {selectedYear === '2025' && (
          <div>
            <h2>Jadwal & Agenda Kerja Tahun 2025</h2>
            <div style={{ background: '#f8fafc', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
              <img
                src="https://pa-cimahi.go.id/images/2025/Screenshot_2025-01-09_105704.png"
                alt="Agenda Kegiatan 2025"
                style={{ maxWidth: '100%', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p style={{ marginTop: '1rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                Agenda pelaksanaan kegiatan pimpinan, rapat evaluasi kinerja triwulan, dan pembinaan berkala Tahun 2025.
              </p>
            </div>
          </div>
        )}

        {selectedYear === '2024' && (
          <div>
            <h2>Jadwal & Agenda Kerja Tahun 2024</h2>
            <div style={{ background: '#f8fafc', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
              <img
                src="https://pa-cimahi.go.id/images/images/photo/Agenda_Kegiatan_2024.png"
                alt="Agenda Kegiatan 2024"
                style={{ maxWidth: '100%', borderRadius: 'var(--radius-sm)' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p style={{ marginTop: '1rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                Rekapitulasi jadwal kegiatan dan monitoring kinerja satuan kerja sepanjang Tahun 2024.
              </p>
            </div>
          </div>
        )}

        {selectedYear === '2023' && (
          <div>
            <h2>Jadwal & Agenda Kerja Tahun 2023</h2>
            <div style={{ background: '#f8fafc', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
              <img
                src="https://pa-cimahi.go.id/images/2023/Jadwal_Kegiatan_2023.png"
                alt="Agenda Kegiatan 2023"
                style={{ maxWidth: '100%', borderRadius: 'var(--radius-sm)' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p style={{ marginTop: '1rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                Arsip jadwal agenda pimpinan dan operasional kantor Tahun 2023.
              </p>
            </div>
          </div>
        )}

        {selectedYear === '2022' && (
          <div>
            <h2>Jadwal & Agenda Kerja Tahun 2022</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="https://drive.google.com/file/d/1m1bS842yIhA3-N0Qu0c5YeD4orHpOayS/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--primary-800)',
                  color: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  width: 'fit-content',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <FaFilePdf /> Buka Arsip Jadwal Kegiatan 2022 (Google Drive)
              </a>
              <div className="embed-container">
                <iframe
                  src="https://drive.google.com/file/d/1m1bS842yIhA3-N0Qu0c5YeD4orHpOayS/preview"
                  title="Agenda Kegiatan 2022"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {selectedYear === '2021' && (
          <div>
            <h2>Jadwal & Agenda Kerja Tahun 2021</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="https://drive.google.com/file/d/1vhn9txoZZzdMypIgPxvwu1yGb5rJu5ro/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--primary-800)',
                  color: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  width: 'fit-content',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <FaFilePdf /> Buka Arsip Jadwal Kegiatan 2021 (Google Drive)
              </a>
              <div className="embed-container">
                <iframe
                  src="https://drive.google.com/file/d/1vhn9txoZZzdMypIgPxvwu1yGb5rJu5ro/preview"
                  title="Agenda Kegiatan 2021"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </article>
    </ProfileLayout>
  );
}

export default AgendaKegiatanPage;
