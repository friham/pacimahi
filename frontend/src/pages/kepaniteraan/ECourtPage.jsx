import KepaniteraanLayout from './KepaniteraanLayout';
import { FaLaptop, FaExternalLinkAlt } from 'react-icons/fa';

function ECourtPage() {
  return (
    <KepaniteraanLayout
      title="e-Court (Berperkara Secara Elektronik)"
      subtitle="Layanan Pendaftaran Perkara, Pembayaran Panjar, Pemanggilan, dan Persidangan Secara Online"
      breadcrumb="e-Court"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaLaptop style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Transformasi Peradilan Digital</h4>
          <p style={{ margin: 0 }}>
            Aplikasi e-Court Mahkamah Agung RI memberikan kemudahan kepada Pengguna Terdaftar (Advokat) maupun Pengguna Lain (Perseorangan, Badan Hukum, Pemerintah) untuk mendaftar perkara dari mana saja secara online.
          </p>
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <a
            href="https://ecourt.mahkamahagung.go.id"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, var(--primary-800), var(--primary-900))',
              color: 'white',
              padding: '12px 28px',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.05rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <span>Buka Portal Resmi e-Court MARI</span>
            <FaExternalLinkAlt size={14} />
          </a>
        </div>

        <h2>4 Layanan Utama e-Court</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '4px solid #1e40af' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '1.1rem' }}>
              1. e-Filing
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)' }}>
              Pendaftaran perkara gugatan, permohonan, atau bantahan secara elektronik tanpa perlu hadir langsung ke pengadilan.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '4px solid #047857' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#047857', fontSize: '1.1rem' }}>
              2. e-Payment
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)' }}>
              Pembayaran panjar biaya perkara secara elektronik melalui Virtual Account berbagai bank yang terafiliasi secara instan dan otomatis.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '4px solid #b45309' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#b45309', fontSize: '1.1rem' }}>
              3. e-Summons
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)' }}>
              Pemanggilan para pihak dan pemberitahuan putusan/dokumen peradilan secara elektronik melalui domisili elektronik (Email terverifikasi).
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '4px solid #6b21a8' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b21a8', fontSize: '1.1rem' }}>
              4. e-Litigation
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)' }}>
              Pelaksanaan persidangan elektronik untuk tahap jawaban, replik, duplik, pembuktian dokumen, dan pembacaan putusan secara online.
            </p>
          </div>
        </div>

        <h2>Dasar Hukum e-Court</h2>
        <ul>
          <li>Peraturan Mahkamah Agung (PERMA) Nomor 1 Tahun 2019 tentang Administrasi Perkara dan Persidangan di Pengadilan Secara Elektronik.</li>
          <li>Peraturan Mahkamah Agung (PERMA) Nomor 7 Tahun 2022 tentang Perubahan atas PERMA Nomor 1 Tahun 2019.</li>
          <li>Keputusan Ketua Mahkamah Agung RI Nomor 363/KMA/SK/XII/2022 tentang Petunjuk Teknis Administrasi dan Persidangan Elektronik.</li>
        </ul>
      </article>
    </KepaniteraanLayout>
  );
}

export default ECourtPage;
