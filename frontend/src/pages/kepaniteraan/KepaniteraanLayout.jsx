import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialSidebar from '../../components/SocialSidebar';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import AcoFloatingButton from '../../components/AcoFloatingButton';
import { 
  FaHome, 
  FaChevronRight, 
  FaGavel, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaWhatsapp,
  FaExternalLinkAlt,
  FaFileSignature,
  FaBalanceScale
} from 'react-icons/fa';
import './KepaniteraanLayout.css';
import '../tentang-pengadilan/tentang-pengadilan.css';

const menuLinks = [
  {
    title: 'Pos Bantuan Hukum (Posbakum)',
    path: '/kepaniteraan/posbakum',
    children: [
      {
        title: 'Keberadaan Posbakum',
        path: '/kepaniteraan/posbakum?tab=keberadaan',
      },
      {
        title: 'Syarat dan Mekanisme Posbakum',
        path: '/kepaniteraan/posbakum?tab=syarat',
      },
    ],
  },
  {
    title: 'Perkara Prodeo (Cuma-cuma)',
    path: '/kepaniteraan/prodeo',
    children: [
      {
        title: 'Prosedur Berperkara Prodeo',
        path: '/kepaniteraan/prodeo?tab=prosedur',
      },
      {
        title: 'Syarat & Dokumen Prodeo',
        path: '/kepaniteraan/prodeo?tab=syarat',
      },
    ],
  },
  {
    title: 'Hak-Hak Para Pencari Keadilan',
    path: '/kepaniteraan/hak-hak-pencari-keadilan',
  },
  {
    title: 'Prosedur Berperkara',
    path: '/kepaniteraan/prosedur-berperkara',
  },
  {
    title: 'e-Court (Berperkara Elektronik)',
    path: '/kepaniteraan/layanan-e-court',
  },
  {
    title: 'Hak Pokok Dalam Persidangan',
    path: '/kepaniteraan/hak-pokok-persidangan',
  },
  {
    title: 'Mediasi Pengadilan',
    path: '/kepaniteraan/mediasi',
  },
  {
    title: 'Panggilan Ghaib',
    path: '/kepaniteraan/panggilan-ghaib',
  },
  {
    title: 'Delegasi / Tabayun',
    path: '/kepaniteraan/delegasi-tabayun',
  },
  {
    title: 'Pedoman Pengelolaan Kepaniteraan',
    path: '/kepaniteraan/pedoman-pengelolaan-kepaniteraan',
  },
  {
    title: 'SIPP (Penelusuran Perkara)',
    path: 'http://sipp.pa-cimahi.go.id/',
    external: true,
  },
  {
    title: 'Direktori Putusan MARI',
    path: 'https://putusan3.mahkamahagung.go.id/pengadilan/profil/pengadilan/pa-cimahi.html',
    external: true,
  },
  {
    title: 'Tata Tertib Persidangan',
    path: '/kepaniteraan/tata-tertib-persidangan',
  },
  {
    title: 'Agenda / Jadwal Persidangan',
    path: '/kepaniteraan/agenda-jadwal-persidangan',
  },
  {
    title: 'Statistik Perkara',
    path: '/kepaniteraan/statistik-perkara',
  },
  {
    title: 'SK Panjar Biaya Perkara',
    path: '/kepaniteraan/biaya-perkara',
  },
  {
    title: 'Biaya Proses Berperkara',
    path: '/kepaniteraan/biaya-proses-berperkara',
  },
  {
    title: 'Hak Perempuan & Anak Pasca Perceraian',
    path: '/kepaniteraan/hak-perempuan-dan-anak',
  },
  {
    title: 'Penerimaan Perkara (SOP)',
    path: '/kepaniteraan/penerimaan-perkara',
  },
  {
    title: 'Layanan Informasi Perkara',
    path: '/kepaniteraan/layanan-informasi-perkara',
  },
  {
    title: 'Tahapan-Tahapan Perkara',
    path: '/kepaniteraan/tahapan-tahapan-perkara',
  },
  {
    title: 'Laporan Keuangan Perkara',
    path: '/kepaniteraan/keuangan-perkara',
  },
];

function KepaniteraanLayout({ title, subtitle, breadcrumb, children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="kepaniteraan-page-wrapper">
      <Navbar />

      <SocialSidebar />

      <section className="kepaniteraan-hero">
        <div className="kepaniteraan-hero__container">
          <nav className="kepaniteraan-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">
              <FaHome style={{ marginRight: '4px', verticalAlign: '-1px' }} />
              Beranda
            </Link>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span>Kepaniteraan</span>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span className="current">{breadcrumb || title}</span>
          </nav>
          <h1 className="kepaniteraan-hero__title">{title}</h1>
          {subtitle && <p className="kepaniteraan-hero__subtitle">{subtitle}</p>}
        </div>
      </section>

      <div className="kepaniteraan-body-container">
        <aside className="kepaniteraan-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaFileSignature className="sidebar-card__header-icon" />
              <span>Menu Kepaniteraan</span>
            </div>
            <ul className="sidebar-nav-list">
              {menuLinks.map((item, index) => {
                const fullCurrent = location.pathname + (location.search || '');
                const isExact = currentPath === item.path;
                const isChildActive = item.children?.some(c => fullCurrent === c.path || (currentPath === item.path && !location.search));
                const isActive = isExact || isChildActive;

                if (item.external) {
                  return (
                    <li key={index} className="sidebar-nav-item">
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        className="sidebar-nav-link"
                      >
                        <span>{item.title}</span>
                        <FaExternalLinkAlt size={10} style={{ opacity: 0.5 }} />
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={index} className="sidebar-nav-item">
                    <Link
                      to={item.path}
                      className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span>{item.title}</span>
                      {item.children && item.children.length > 0 && (
                        <FaChevronRight size={11} style={{ opacity: isActive ? 1 : 0.4 }} />
                      )}
                    </Link>
                    {item.children && (
                      <ul className="sidebar-nav-sublist">
                        {item.children.map((child, cIdx) => {
                          const isSubActive = fullCurrent === child.path || (currentPath === item.path && !location.search && cIdx === 0);
                          return (
                            <li key={cIdx}>
                              <Link
                                to={child.path}
                                className={`sidebar-nav-sublink ${isSubActive ? 'active' : ''}`}
                              >
                                {child.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaClock className="sidebar-card__header-icon" />
              <span>Layanan & Kontak</span>
            </div>
            <div className="sidebar-info-card">
              <div className="info-item">
                <FaClock className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Jam Kerja Pelayanan</strong>
                  <span>Senin - Kamis: 08.00 - 16.30 WIB</span>
                  <br />
                  <span>Jumat: 07.30 - 16.30 WIB</span>
                </div>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Alamat Kantor</strong>
                  <span>Jl. Baros, Kel. Utama, Kec. Cimahi Selatan, Kota Cimahi 40533</span>
                </div>
              </div>

              <div className="info-item">
                <FaPhoneAlt className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Telepon PTSP</strong>
                  <span>022-63191919</span>
                </div>
              </div>

              <div className="info-item">
                <FaEnvelope className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Email Resmi</strong>
                  <span>surat@pa-cimahi.go.id</span>
                </div>
              </div>

              <a
                href="https://wa.me/6281121111522?text=Info"
                target="_blank"
                rel="noreferrer"
                className="sidebar-cta-btn"
              >
                <FaWhatsapp size={18} />
                <span>SILINCAH WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaExternalLinkAlt className="sidebar-card__header-icon" />
              <span>Aplikasi Yustisial</span>
            </div>
            <div className="sidebar-info-card" style={{ fontSize: '0.85rem' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li>
                  <a href="https://ecourt.mahkamahagung.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> e-Court Mahkamah Agung
                  </a>
                </li>
                <li>
                  <a href="http://sipp.pa-cimahi.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> SIPP PA Kota Cimahi
                  </a>
                </li>
                <li>
                  <a href="https://putusan3.mahkamahagung.go.id/pengadilan/profil/pengadilan/pa-cimahi.html" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> Direktori Putusan MARI
                  </a>
                </li>
                <li>
                  <a href="https://gugatanmandiri.badilag.net" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> Gugatan Mandiri Badilag
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="kepaniteraan-content-area">
          {children}
        </main>
      </div>

      <AccessibilityWidget />
      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />

      <Footer />
    </div>
  );
}

export default KepaniteraanLayout;
