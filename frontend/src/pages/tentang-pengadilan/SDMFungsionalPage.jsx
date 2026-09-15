import ProfileLayout from './ProfileLayout';
import { FaBriefcase } from 'react-icons/fa';

function SDMFungsionalPage() {
  const pelaksanaEmbed = 'https://simtepa.mahkamahagung.go.id/share/profil_pelaksana/html/ab9a3d23d34bdb24be70b64fdb1cfed8';

  return (
    <ProfileLayout
      title="SDM Fungsional dan Pelaksana"
      subtitle="Pejabat Fungsional Keahlian/Keterampilan, Pelaksana, dan PPPK Pengadilan Agama Kota Cimahi"
      breadcrumb="SDM Fungsional & Pelaksana"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaBriefcase style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Pejabat Fungsional & Tenaga Pelaksana</h4>
          <p style={{ margin: 0 }}>
            Daftar aparatur fungsional pranata peradilan, pranata komputer, arsiparis, bendahara, staf pelaksana, dan Pegawai Pemerintah dengan Perjanjian Kerja (PPPK).
          </p>
        </div>

        <h2>Daftar Pejabat Fungsional & Pelaksana</h2>
        <div className="embed-container" style={{ paddingBottom: '120%', minHeight: '800px' }}>
          <iframe
            src={pelaksanaEmbed}
            title="Profil SDM Fungsional dan Pelaksana Pengadilan Agama Kota Cimahi"
            loading="lazy"
          ></iframe>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default SDMFungsionalPage;
