import KepaniteraanLayout from './KepaniteraanLayout';
import { FaUserShield } from 'react-icons/fa';

function HakPencariKeadilanPage() {
  return (
    <KepaniteraanLayout
      title="Hak-Hak Para Pencari Keadilan"
      subtitle="Jaminan Hak Hukum Masyarakat dalam Proses Peradilan di Pengadilan Agama Kota Cimahi"
      breadcrumb="Hak-Hak Pencari Keadilan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaUserShield style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Perlindungan Hak Asasi & Persamaan di Depan Hukum</h4>
          <p style={{ margin: 0 }}>
            Setiap orang berhak atas pengakuan, jaminan, perlindungan, dan kepastian hukum yang adil serta perlakuan yang sama di hadapan hukum (<em>Equality Before the Law</em>) tanpa diskriminasi.
          </p>
        </div>

        <h2>Daftar Hak-Hak Para Pencari Keadilan</h2>
        <div style={{ display: 'grid', gap: '1.25rem', margin: '1.5rem 0' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-700)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-900)', fontSize: '1.1rem' }}>
              1. Hak Memperoleh Informasi yang Jelas & Transparan
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
              Berhak memperoleh informasi mengenai prosedur beracara, perkiraan biaya panjar perkara, jadwal persidangan, serta perkembangan penanganan perkaranya melalui PTSP, website, SIPP, dan WhatsApp SILINCAH.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-700)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-900)', fontSize: '1.1rem' }}>
              2. Hak Memperoleh Bantuan Hukum Cuma-Cuma
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
              Bagi masyarakat tidak mampu secara ekonomi berhak mendapatkan layanan pembuatan surat gugatan/permohonan secara gratis di Posbakum serta mengajukan pembebasan biaya perkara (Prodeo).
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-700)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-900)', fontSize: '1.1rem' }}>
              3. Hak Menggunakan Kuasa Hukum / Advokat
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
              Berhak menunjuk advokat/pengacara yang memiliki izin resmi atau kuasa insidentil yang memenuhi syarat hukum untuk mewakili kepentingannya di pengadilan.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-700)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-900)', fontSize: '1.1rem' }}>
              4. Hak Mendapatkan Perlakuan Adil & Sidang Terbuka
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
              Berhak diadili oleh Majelis Hakim yang independen, bebas dari intervensi, diperlakukan secara sopan dan adil dalam persidangan (kecuali perkara perceraian/rahasia yang tertutup untuk umum).
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-700)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-900)', fontSize: '1.1rem' }}>
              5. Hak Mengajukan Upaya Hukum
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
              Jika tidak puas dengan putusan Pengadilan Tingkat Pertama, para pihak berhak mengajukan upaya hukum Banding ke Pengadilan Tinggi Agama, Kasasi ke Mahkamah Agung, dan Peninjauan Kembali (PK).
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-700)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-900)', fontSize: '1.1rem' }}>
              6. Hak Mengajukan Pengaduan atas Pelanggaran Etik
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
              Berhak melaporkan perilaku aparatur yang melanggar kode etik, meminta suap/gratifikasi, atau tidak profesional melalui Meja Pengaduan atau aplikasi SIWAS Mahkamah Agung RI.
            </p>
          </div>
        </div>
      </article>
    </KepaniteraanLayout>
  );
}

export default HakPencariKeadilanPage;
