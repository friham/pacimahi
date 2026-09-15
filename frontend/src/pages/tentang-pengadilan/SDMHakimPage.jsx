import ProfileLayout from './ProfileLayout';
import { FaGavel } from 'react-icons/fa';

function SDMHakimPage() {
  const hakimEmbed = 'https://simtepa.mahkamahagung.go.id/share/profil_hakim/html/ab9a3d23d34bdb24be70b64fdb1cfed8';

  return (
    <ProfileLayout
      title="Profil SDM Hakim"
      subtitle="Daftar dan Profil Hakim Pengadilan Agama Kota Cimahi Kelas IA (SIMTEPA Mahkamah Agung RI)"
      breadcrumb="SDM Hakim"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaGavel style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Daftar Hakim Pengadilan Agama Kota Cimahi</h4>
          <p style={{ margin: 0 }}>
            Profil resmi, riwayat pendidikan, pangkat, golongan, dan masa kerja Hakim Pengadilan Agama Kota Cimahi terintegrasi dengan SIMTEPA Mahkamah Agung RI.
          </p>
        </div>

        <h2>Daftar Hakim Pengadilan Agama Kota Cimahi</h2>
        <div className="embed-container" style={{ paddingBottom: '120%', minHeight: '800px' }}>
          <iframe
            src={hakimEmbed}
            title="Daftar Hakim Pengadilan Agama Kota Cimahi"
            loading="lazy"
          ></iframe>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default SDMHakimPage;
