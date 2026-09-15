import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, 
  FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp,
  FaChevronRight, FaClock, FaExternalLinkAlt
} from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';
import './Footer.css';

function Footer() {
  const { settings } = useSettings();

  const s = settings;
  const whatsappNum = s.social_whatsapp || '6281121111522';

  return (
    <footer className="footer">
      <div className="footer__top-line"></div>

      <div className="container">
        <div className="footer__grid">

          <div className="footer__col">
            <div className="footer__brand">
              <img src={logoImg} alt="Logo Pengadilan Agama Kota Cimahi" className="footer__brand-logo" />
              <div>
                <h3 className="footer__brand-title">Pengadilan Agama</h3>
                <p className="footer__brand-subtitle">Kota Cimahi Kelas IA</p>
              </div>
            </div>
            <p className="footer__desc">
              {s.footer_description || 'Mewujudkan peradilan agama yang agung, bersih, dan melayani dengan sepenuh hati untuk masyarakat Kota Cimahi dan sekitarnya.'}
            </p>
            <div className="footer__hours">
              <div className="footer__hours-title">
                <FaClock className="footer__contact-icon" /> Jam Pelayanan PTSP
              </div>
              <div className="footer__hours-row"><span>Senin – Kamis</span><span>{s.footer_hours_weekday || '08.00 – 16.30 WIB'}</span></div>
              <div className="footer__hours-row"><span>Jumat</span><span>{s.footer_hours_friday || '07.30 – 16.30 WIB'}</span></div>
              <div className="footer__hours-row footer__hours-closed"><span>Sabtu – Minggu</span><span>Tutup</span></div>
            </div>
            <div className="footer__socials" style={{ marginTop: '1.25rem' }}>
              {s.social_facebook && (
                <a href={s.social_facebook} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Facebook"><FaFacebookF /></a>
              )}
              {s.social_instagram && (
                <a href={s.social_instagram} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram"><FaInstagram /></a>
              )}
              {s.social_youtube && (
                <a href={s.social_youtube} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="YouTube"><FaYoutube /></a>
              )}
              {whatsappNum && (
                <a href={`https://wa.me/${whatsappNum}?text=Info%20Layanan%20PA%20Cimahi`} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="WhatsApp"><FaWhatsapp /></a>
              )}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Tautan Cepat</h4>
            <ul className="footer__links">
              <li><Link to="/tentang-pengadilan/pengantar-dari-ketua-pengadilan"><FaChevronRight className="footer__link-icon" /> Profil Pengadilan</Link></li>
              <li><Link to="/tentang-pengadilan/struktur-organisasi"><FaChevronRight className="footer__link-icon" /> Struktur Organisasi</Link></li>
              <li><Link to="/tentang-pengadilan/wilayah-yurisdiksi"><FaChevronRight className="footer__link-icon" /> Wilayah Yurisdiksi</Link></li>
              <li><Link to="/kepaniteraan/jadwal-persidangan"><FaChevronRight className="footer__link-icon" /> Jadwal Persidangan</Link></li>
              <li><Link to="/kepaniteraan/statistik-perkara"><FaChevronRight className="footer__link-icon" /> Statistik Perkara</Link></li>
              <li><Link to="/publikasi/berita"><FaChevronRight className="footer__link-icon" /> Berita Terkini</Link></li>
              <li><Link to="/publikasi/pengumuman"><FaChevronRight className="footer__link-icon" /> Pengumuman</Link></li>
              <li><Link to="/layanan-publik/layanan-pengaduan"><FaChevronRight className="footer__link-icon" /> Pengaduan</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Layanan Online</h4>
            <ul className="footer__links">
              <li>
                <a href="https://ecourt.mahkamahagung.go.id" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="footer__link-icon" /> e-Court MA RI
                </a>
              </li>
              <li>
                <a href="https://sipp.mahkamahagung.go.id" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="footer__link-icon" /> SIPP (Info Perkara)
                </a>
              </li>
              <li>
                <a href="https://gugatan.mahkamahagung.go.id" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="footer__link-icon" /> Gugatan Mandiri
                </a>
              </li>
              <li>
                <a href="https://siwas.mahkamahagung.go.id" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="footer__link-icon" /> SIWAS (Pengawasan)
                </a>
              </li>
              <li>
                <a href="https://posbakum.badilag.net" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="footer__link-icon" /> Posbakum Online
                </a>
              </li>
              <li>
                <a href="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="footer__link-icon" /> CCTV Online (ACO)
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281121111522?text=Info%20Layanan" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="footer__link-icon" /> WhatsApp SILINCAH
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Hubungi Kami</h4>
            <div className="footer__contacts">
              {s.court_address && (
                <a
                  className="footer__contact"
                  href={`https://maps.google.com/?q=${encodeURIComponent(s.court_address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaMapMarkerAlt className="footer__contact-icon" />
                  <span>{s.court_address}</span>
                </a>
              )}
              {s.court_phone && (
                <a className="footer__contact" href={`tel:${s.court_phone.replace(/[^0-9+]/g, '')}`}>
                  <FaPhone className="footer__contact-icon" />
                  <span>{s.court_phone}</span>
                </a>
              )}
              {s.court_email && (
                <a className="footer__contact" href={`mailto:${s.court_email}`}>
                  <FaEnvelope className="footer__contact-icon" />
                  <span>{s.court_email}</span>
                </a>
              )}
              {s.court_website && (
                <a className="footer__contact" href={s.court_website} target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="footer__contact-icon" />
                  <span>{s.court_website.replace(/https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="footer__bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p className="footer__copyright">
            © {new Date().getFullYear()} Pengadilan Agama Kota Cimahi Kelas IA — Mahkamah Agung Republik Indonesia. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
