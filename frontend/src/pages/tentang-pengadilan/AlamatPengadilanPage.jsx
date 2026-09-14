import ProfileLayout from './ProfileLayout';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaBus, 
  FaCar, 
  FaClock
} from 'react-icons/fa';

function AlamatPengadilanPage() {
  const gmapsEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1665.3672510223164!2d107.53668145016101!3d-6.898596817947038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e5afbfae11f7%3A0xf9d78eccac995777!2sThe%20Edge%20Apartement%2C%20Jl.%20Baros%20No.57%2C%20Leuwigajah%2C%20Kec.%20Cimahi%20Sel.%2C%20Kota%20Cimahi%2C%20Jawa%20Barat%2040521%2C%20Indonesia!5e0!3m2!1sen!2sau!4v1723101711773!5m2!1sen!2sau';

  return (
    <ProfileLayout
      title="Alamat Pengadilan"
      subtitle="Lokasi Kantor, Titik Koordinat Peta, Kontak Resmi, dan Akses Transportasi"
      breadcrumb="Alamat Pengadilan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaMapMarkerAlt style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Gedung Baru Pengadilan Agama Kota Cimahi</h4>
          <p style={{ margin: 0 }}>
            Pengadilan Agama Kota Cimahi Kelas IA kini melayani masyarakat di gedung baru yang beralamat di <strong>Jalan Baros, Kelurahan Utama, Kecamatan Cimahi Selatan, Kota Cimahi, Provinsi Jawa Barat (Kode Pos 40533)</strong>.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', margin: '2rem 0' }}>
          <div style={{
            background: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '4px solid var(--primary-700)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FaMapMarkerAlt style={{ color: 'var(--primary-700)', fontSize: '1.2rem' }} />
              <strong style={{ color: 'var(--primary-900)' }}>Alamat Surat</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)', textAlign: 'left' }}>
              Jl. Baros, Kel. Utama, Kec. Cimahi Selatan, Kota Cimahi, Jawa Barat, 40533
            </p>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '4px solid var(--primary-700)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FaPhoneAlt style={{ color: 'var(--primary-700)', fontSize: '1.2rem' }} />
              <strong style={{ color: 'var(--primary-900)' }}>Telepon & WhatsApp</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)', textAlign: 'left' }}>
              Telp: <strong>022-63191919</strong>
              <br />
              WA SILINCAH: <strong>0811-2111-1522</strong>
            </p>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '4px solid var(--primary-700)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FaEnvelope style={{ color: 'var(--primary-700)', fontSize: '1.2rem' }} />
              <strong style={{ color: 'var(--primary-900)' }}>Email Resmi</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)', textAlign: 'left' }}>
              surat@pa-cimahi.go.id
              <br />
              tabayyunpacimahi@gmail.com
            </p>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '4px solid var(--primary-700)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FaClock style={{ color: 'var(--primary-700)', fontSize: '1.2rem' }} />
              <strong style={{ color: 'var(--primary-900)' }}>Jam Pelayanan PTSP</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)', textAlign: 'left' }}>
              Senin - Kamis: 08.00 - 16.30 WIB
              <br />
              Jumat: 07.30 - 16.30 WIB
            </p>
          </div>
        </div>

        <h2>Peta Lokasi Google Maps</h2>
        <p>
          Gunakan peta interaktif di bawah ini untuk mendapatkan petunjuk arah menuju kantor Pengadilan Agama Kota Cimahi:
        </p>

        <div className="embed-container" style={{ paddingBottom: '55%' }}>
          <iframe
            src={gmapsEmbed}
            title="Google Maps Lokasi Pengadilan Agama Kota Cimahi"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <h2>Panduan Rute & Akses Transportasi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
          <div style={{ background: '#f8fafc', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: 'var(--primary-900)', marginTop: 0 }}>
              <FaCar /> Kendaraan Pribadi
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)', margin: 0 }}>
              Melalui Gerbang Tol Baros (Purbaleunyi), keluar menuju Jl. Baros ke arah Leuwigajah / Apartemen The Edge. Lokasi kantor dapat dijangkau dalam waktu 3-5 menit dari pintu tol Baros.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: 'var(--primary-900)', marginTop: 0 }}>
              <FaBus /> Angkutan Umum & Kereta
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)', margin: 0 }}>
              Dari Stasiun Cimahi, naik angkutan kota trayek Cimahi - Leuwigajah atau Cimahi - Soreang dan turun langsung di Jl. Baros di depan kantor Pengadilan Agama Kota Cimahi.
            </p>
          </div>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default AlamatPengadilanPage;
