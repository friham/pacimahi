import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialSidebar from '../../components/SocialSidebar';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import AcoFloatingButton from '../../components/AcoFloatingButton';
import { FaHome, FaChevronRight, FaConciergeBell, FaAward, FaBullhorn, FaWhatsapp, FaVideo, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaExternalLinkAlt, FaShieldAlt, FaGavel, FaInfoCircle, FaFileAlt, FaWheelchair, FaBuilding } from 'react-icons/fa';
import './LayananPublikLayout.css';
import '../tentang-pengadilan/tentang-pengadilan.css';

const layananPublikMenu = [
  {
    title: 'Pelayanan Terpadu Satu Pintu (PTSP)',
    path: '/layanan-publik/ptsp',
    icon: FaConciergeBell,
  },
  {
    title: 'Alur Pelayanan Prioritas & Kaum Rentan',
    path: '/layanan-publik/alur-pelayanan-prioritas-ptsp',
    icon: FaWheelchair,
  },
  {
    title: 'Akreditasi Penjaminan Mutu (APM)',
    path: '/layanan-publik/akreditasi-penjaminan-mutu',
    icon: FaAward,
  },
  {
    title: 'Zona Integritas (WBK & WBBM)',
    path: '/layanan-publik/zona-integritas',
    icon: FaShieldAlt,
  },
  {
    title: 'Pengawasan & Kode Etik',
    path: '/layanan-publik/pengawasan-dan-kode-etik',
    icon: FaGavel,
  },
  {
    title: 'Layanan Pengaduan & SIWAS MARI',
    path: '/layanan-publik/layanan-pengaduan',
    icon: FaBullhorn,
  },
  {
    title: 'Layanan Informasi Publik (PPID)',
    path: '/layanan-publik/layanan-informasi',
    icon: FaInfoCircle,
  },
  {
    title: 'Fasilitas Publik & Tanggap Darurat',
    path: '/layanan-publik/fasilitas-publik',
    icon: FaBuilding,
  },
  {
    title: 'Brosur Digital & Kumpulan SK',
    path: '/layanan-publik/brosur-digital',
    icon: FaFileAlt,
  },
  {
    title: 'WhatsApp SILINCAH',
    path: 'https://wa.me/6281121111522?text=Info%20Layanan%20Publik',
    icon: FaWhatsapp,
    external: true,
  },
  {
    title: 'CCTV Online (ACO Badilag)',
    path: 'https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421',
    icon: FaVideo,
    external: true,
  },
];

function LayananPublikLayout({ title, subtitle, breadcrumb, children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="layanan-publik-page-wrapper">
      <Navbar />
      <SocialSidebar />

      <section className="layanan-publik-hero">
        <div className="layanan-publik-hero__container">
          <nav className="layanan-publik-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">
              <FaHome style={{ marginRight: '4px', verticalAlign: '-1px' }} />
              Beranda
            </Link>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span>Layanan Publik</span>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span className="current">{breadcrumb || title}</span>
          </nav>
          <h1 className="layanan-publik-hero__title">{title}</h1>
          {subtitle && <p className="layanan-publik-hero__subtitle">{subtitle}</p>}
        </div>
      </section>

      <div className="layanan-publik-body-container">
        <aside className="layanan-publik-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaConciergeBell className="sidebar-card__header-icon" />
              <span>Menu Layanan Publik</span>
            </div>
            <ul className="sidebar-nav-list">
              {layananPublikMenu.map((item, index) => {
                const isActive = currentPath === item.path;
                const IconComponent = item.icon || FaFileAlt;

                if (item.external) {
                  return (
                    <li key={index} className="sidebar-nav-item">
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        className="sidebar-nav-link"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <IconComponent size={14} style={{ opacity: 0.7, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>{item.title}</span>
                        </div>
                        <FaExternalLinkAlt size={10} style={{ opacity: 0.5, flexShrink: 0 }} />
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IconComponent size={14} style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0 }} />
                        <span style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>{item.title}</span>
                      </div>
                      {item.children && item.children.length > 0 && (
                        <FaChevronRight size={10} style={{ opacity: isActive ? 1 : 0.4, flexShrink: 0 }} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaClock className="sidebar-card__header-icon" />
              <span>Jam Operasional PTSP</span>
            </div>
            <div className="sidebar-info-card">
              <div className="info-item">
                <FaClock className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Senin - Kamis:</strong> 08.00 - 16.30 WIB
                  <br />
                  <strong>Istirahat:</strong> 12.00 - 13.00 WIB
                  <br />
                  <strong>Jumat:</strong> 07.30 - 16.30 WIB
                  <br />
                  <strong>Istirahat:</strong> 11.30 - 13.00 WIB
                </div>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Lokasi Meja PTSP</strong>
                  <span>Gedung Utama Lantai 1 PA Kota Cimahi</span>
                </div>
              </div>

              <div className="info-item">
                <FaPhoneAlt className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Call Center PTSP</strong>
                  <span>022-63191919</span>
                </div>
              </div>

              <a
                href="https://wa.me/6281121111522?text=Halo%20PTSP%20PA%20Cimahi"
                target="_blank"
                rel="noreferrer"
                className="sidebar-cta-btn"
              >
                <FaWhatsapp size={18} />
                <span>Chat Petugas PTSP</span>
              </a>
            </div>
          </div>
        </aside>

        <main className="layanan-publik-content-area">
          {children}
        </main>
      </div>

      <AccessibilityWidget />
      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />
      <Footer />
    </div>
  );
}

export default LayananPublikLayout;
