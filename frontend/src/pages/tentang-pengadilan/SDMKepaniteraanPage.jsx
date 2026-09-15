import ProfileLayout from './ProfileLayout';
import { FaFileSignature } from 'react-icons/fa';

function SDMKepaniteraanPage() {
  const kepaniteraanEmbed = 'https://simtepa.mahkamahagung.go.id/share/profil_kepaniteraan/html/ab9a3d23d34bdb24be70b64fdb1cfed8';

  return (
    <ProfileLayout
      title="Profil SDM Kepaniteraan"
      subtitle="Panitera, Panitera Muda, Panitera Pengganti, dan Juru Sita Pengadilan Agama Kota Cimahi"
      breadcrumb="SDM Kepaniteraan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaFileSignature style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Aparatur Teknis Kepaniteraan</h4>
          <p style={{ margin: 0 }}>
            Daftar aparatur teknis yustisial yang bertugas melayani administrasi persidangan, pembuatan akta perkara, penerimaan permohonan/gugatan, dan pelaksanaan putusan peradilan.
          </p>
        </div>

        <h2>Daftar Pejabat & Pegawai Kepaniteraan</h2>
        <div className="embed-container" style={{ paddingBottom: '120%', minHeight: '800px' }}>
          <iframe
            src={kepaniteraanEmbed}
            title="Profil SDM Kepaniteraan Pengadilan Agama Kota Cimahi"
            loading="lazy"
          ></iframe>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default SDMKepaniteraanPage;
