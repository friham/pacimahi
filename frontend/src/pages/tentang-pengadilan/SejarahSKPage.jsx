import ProfileLayout from './ProfileLayout';
import { FaFilePdf, FaDownload, FaExternalLinkAlt, FaBalanceScale, FaCheckCircle } from 'react-icons/fa';

function SejarahSKPage() {
  const skDriveUrl = 'https://drive.google.com/file/d/1I74_skvMUwXwS88s9kFPcqBcDXQCpKIn/preview';
  const skDirectUrl = 'https://drive.google.com/file/d/1I74_skvMUwXwS88s9kFPcqBcDXQCpKIn/view?usp=sharing';

  return (
    <ProfileLayout
      title="Surat Keputusan Pembentukan Pengadilan"
      subtitle="Dokumen Resmi Keputusan Presiden RI Nomor 15 Tahun 2016"
      breadcrumb="SK Pembentukan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaBalanceScale style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Keputusan Presiden Republik Indonesia Nomor 15 Tahun 2016</h4>
          <p style={{ margin: 0 }}>
            Tentang Pembentukan Pengadilan Agama Kota Cimahi, Pengadilan Agama Soreang, dan Pengadilan Agama Ngamprah serta Pengadilan Agama baru lainnya di wilayah Negara Kesatuan Republik Indonesia, ditandatangani oleh Presiden Republik Indonesia Joko Widodo pada tanggal <strong>26 April 2016</strong>.
          </p>
        </div>

        <h2>Rangkuman Poin Penting Regulasi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
          <div style={{
            background: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '4px solid var(--primary-700)'
          }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary-900)', marginTop: 0 }}>
              Pemisahan Nomenklatur & Wilayah
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', margin: 0 }}>
              Menetapkan Pengadilan Agama Kota Cimahi berkedudukan di Kota Cimahi dengan daerah hukum meliputi seluruh wilayah administrasi Kota Cimahi.
            </p>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '4px solid var(--gold-600)'
          }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary-900)', marginTop: 0 }}>
              Peningkatan Kualitas Pelayanan
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', margin: 0 }}>
              Mendekatkan akses keadilan dan mempermudah masyarakat Kota Cimahi dalam menyelesaikan sengketa hukum keluarga dan ekonomi syariah.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '1.5rem 0', flexWrap: 'wrap' }}>
          <a
            href={skDirectUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--primary-800)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)',
              transition: 'background 0.2s'
            }}
          >
            <FaFilePdf size={18} /> Buka Dokumen SK Lengkap
          </a>

          <a
            href={skDirectUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f1f5f9',
              color: 'var(--gray-800)',
              border: '1px solid var(--gray-300)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            <FaDownload size={14} /> Unduh PDF (Google Drive)
          </a>
        </div>

        <h2>Pratinjau Dokumen SK</h2>
        <div className="embed-container" style={{ paddingBottom: '90%' }}>
          <iframe
            src={skDriveUrl}
            title="Pratinjau SK Pembentukan Pengadilan Agama Kota Cimahi"
            allow="autoplay"
          ></iframe>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default SejarahSKPage;
