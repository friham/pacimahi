import ProfileLayout from './ProfileLayout';
import { FaUsersCog } from 'react-icons/fa';

function SDMKesekretariatanPage() {
  const kesekretariatanEmbed = 'https://simtepa.mahkamahagung.go.id/share/profil_kesekretariatan/html/ab9a3d23d34bdb24be70b64fdb1cfed8';

  return (
    <ProfileLayout
      title="Profil SDM Kesekretariatan"
      subtitle="Sekretaris, Kepala Sub Bagian, dan Aparatur Kesekretariatan Pengadilan Agama Kota Cimahi"
      breadcrumb="SDM Kesekretariatan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaUsersCog style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Aparatur Manajemen Kesekretariatan</h4>
          <p style={{ margin: 0 }}>
            Daftar aparatur non-yustisial pengelola bidang Umum & Keuangan, Kepegawaian & Tata Laksana, serta Perencanaan, TI & Pelaporan (PTIP).
          </p>
        </div>

        <h2>Daftar Pejabat & Pegawai Kesekretariatan</h2>
        <div className="embed-container" style={{ paddingBottom: '100%', minHeight: '650px' }}>
          <iframe
            src={kesekretariatanEmbed}
            title="Profil SDM Kesekretariatan Pengadilan Agama Kota Cimahi"
            loading="lazy"
          ></iframe>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default SDMKesekretariatanPage;
