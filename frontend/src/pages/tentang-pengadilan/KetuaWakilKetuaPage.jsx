import ProfileLayout from './ProfileLayout';
import { FaUserTie } from 'react-icons/fa';

function KetuaWakilKetuaPage() {
  const ketuaEmbed = 'https://simtepa.mahkamahagung.go.id/share/profil_ketua/html/ab9a3d23d34bdb24be70b64fdb1cfed8';
  const wakilEmbed = 'https://simtepa.mahkamahagung.go.id/share/profil_wakil/html/ab9a3d23d34bdb24be70b64fdb1cfed8';

  return (
    <ProfileLayout
      title="Profil Ketua & Wakil Ketua"
      subtitle="Profil dan Biodata Pimpinan Pengadilan Agama Kota Cimahi Kelas IA (SIMTEPA Mahkamah Agung RI)"
      breadcrumb="Ketua & Wakil Ketua"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaUserTie style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Profil Terintegrasi SIMTEPA MARI</h4>
          <p style={{ margin: 0 }}>
            Informasi profil dan riwayat jabatan Ketua dan Wakil Ketua Pengadilan Agama Kota Cimahi terintegrasi langsung secara <em>real-time</em> dengan Sistem Informasi Manajemen Tenaga Teknis Peradilan Agama (SIMTEPA) Direktorat Jenderal Badan Peradilan Agama Mahkamah Agung RI.
          </p>
        </div>

        <h2>Profil Ketua Pengadilan Agama Kota Cimahi</h2>
        <div className="embed-container" style={{ paddingBottom: '100%', minHeight: '650px', marginBottom: '3rem' }}>
          <iframe
            src={ketuaEmbed}
            title="Profil Ketua Pengadilan Agama Kota Cimahi"
            loading="lazy"
          ></iframe>
        </div>

        <h2>Profil Wakil Ketua Pengadilan Agama Kota Cimahi</h2>
        <div className="embed-container" style={{ paddingBottom: '100%', minHeight: '650px' }}>
          <iframe
            src={wakilEmbed}
            title="Profil Wakil Ketua Pengadilan Agama Kota Cimahi"
            loading="lazy"
          ></iframe>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default KetuaWakilKetuaPage;
