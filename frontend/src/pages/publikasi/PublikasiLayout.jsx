import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialSidebar from '../../components/SocialSidebar';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import AcoFloatingButton from '../../components/AcoFloatingButton';
import { FaHome, FaChevronRight, FaNewspaper, FaBullhorn, FaBook, FaImages, FaFileAlt, FaHandshake, FaGraduationCap, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './PublikasiLayout.css';
import '../tentang-pengadilan/tentang-pengadilan.css';

const publikasiMenu = [
  {
    title: 'Berita Pengadilan',
    path: '/publikasi/berita',
    icon: FaNewspaper,
  },
  {
    title: 'Pengumuman Resmi',
    path: '/publikasi/pengumuman',
    icon: FaBullhorn,
  },
  {
    title: 'Artikel Hukum & Opini',
    path: '/publikasi/artikel',
    icon: FaFileAlt,
  },
  {
    title: 'Peraturan & Kebijakan',
    path: '/publikasi/peraturan-kebijakan',
    icon: FaBook,
  },
  {
    title: 'Perjanjian Kerja Sama (MoU)',
    path: '/publikasi/perjanjian-dengan-pihak-ketiga',
    icon: FaHandshake,
  },
  {
    title: 'Arsip Hasil Penelitian',
    path: '/publikasi/arsip-hasil-penelitian',
    icon: FaGraduationCap,
  },
  {
    title: 'Galeri & File Multimedia',
    path: '/publikasi/galeri',
    icon: FaImages,
  },
];

function PublikasiLayout({ title, subtitle, breadcrumb, children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="publikasi-page-wrapper">
      <Navbar />
      <SocialSidebar />

      <section className="publikasi-hero">
        <div className="publikasi-hero__container">
          <nav className="publikasi-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">
              <FaHome style={{ marginRight: '4px', verticalAlign: '-1px' }} />
              Beranda
            </Link>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span>Publikasi</span>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span className="current">{breadcrumb || title}</span>
          </nav>
          <h1 className="publikasi-hero__title">{title}</h1>
          {subtitle && <p className="publikasi-hero__subtitle">{subtitle}</p>}
        </div>
      </section>

      <div className="publikasi-body-container">
        <aside className="publikasi-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaNewspaper className="sidebar-card__header-icon" />
              <span>Menu Publikasi</span>
            </div>
            <ul className="sidebar-nav-list">
              {publikasiMenu.map((item, index) => {
                const isActive = currentPath === item.path;
                const IconComponent = item.icon;

                return (
                  <li key={index} className="sidebar-nav-item">
                    <Link
                      to={item.path}
                      className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IconComponent size={14} style={{ opacity: isActive ? 1 : 0.6 }} />
                        <span>{item.title}</span>
                      </div>
                      {item.children && item.children.length > 0 && (
                        <FaChevronRight size={11} style={{ opacity: isActive ? 1 : 0.4 }} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaEnvelope className="sidebar-card__header-icon" />
              <span>Humas & Informasi</span>
            </div>
            <div className="sidebar-info-card">
              <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#475569' }}>
                Untuk konfirmasi pers, liputan media, atau permintaan narasumber pengadilan:
              </p>
              <div className="info-item">
                <FaEnvelope className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Email Humas</strong>
                  <span>humas@pa-cimahi.go.id</span>
                </div>
              </div>
              <div className="info-item">
                <FaPhoneAlt className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Telepon Kantor</strong>
                  <span>022-63191919</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="publikasi-content-area">
          {children}
        </main>
      </div>

      <AccessibilityWidget />
      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />
      <Footer />
    </div>
  );
}

export default PublikasiLayout;
