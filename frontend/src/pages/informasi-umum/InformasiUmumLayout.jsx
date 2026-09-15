import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialSidebar from '../../components/SocialSidebar';
import VirtualAssistant from '../../components/VirtualAssistant';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import AcoFloatingButton from '../../components/AcoFloatingButton';
import { FaHome, FaChevronRight, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';
import './InformasiUmumLayout.css';
import '../tentang-pengadilan/tentang-pengadilan.css';

const menuLinks = [
  {
    title: 'Standar Operasional Prosedur (SOP)',
    path: '/informasi-umum/standar-operasional-prosedur',
    children: [
      {
        title: 'Standar Operasional Prosedur',
        path: '/informasi-umum/standar-operasional-prosedur',
      },
    ],
  },
  {
    title: 'Program Kerja Tahunan',
    path: '/informasi-umum/program-kerja',
  },
  {
    title: 'Laporan Tahunan',
    path: '/informasi-umum/laporan-tahunan',
  },
];

function InformasiUmumLayout({ title, subtitle, breadcrumb, children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="info-page-wrapper">
      <Navbar />

      <SocialSidebar />

      <section className="info-hero">
        <div className="info-hero__container">
          <nav className="info-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">
              <FaHome style={{ marginRight: '4px', verticalAlign: '-1px' }} />
              Beranda
            </Link>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span>Informasi Umum</span>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span className="current">{breadcrumb || title}</span>
          </nav>
          <h1 className="info-hero__title">{title}</h1>
          {subtitle && <p className="info-hero__subtitle">{subtitle}</p>}
        </div>
      </section>

      <div className="info-body-container">
        <aside className="info-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaBookOpen className="sidebar-card__header-icon" />
              <span>Informasi Umum</span>
            </div>
            <ul className="sidebar-nav-list">
              {menuLinks.map((item, index) => {
                const isExact = currentPath === item.path;
                const isChildActive = item.children?.some(c => c.path === currentPath);
                const isActive = isExact || isChildActive;

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
                        {item.children.map((child, cIdx) => (
                          <li key={cIdx}>
                            <Link
                              to={child.path}
                              className={`sidebar-nav-sublink ${currentPath === child.path ? 'active' : ''}`}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
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
                  <strong>Telepon</strong>
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
              <span>Tautan Transparansi</span>
            </div>
            <div className="sidebar-info-card" style={{ fontSize: '0.85rem' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li>
                  <a href="https://mahkamahagung.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> Mahkamah Agung RI
                  </a>
                </li>
                <li>
                  <a href="https://badilag.mahkamahagung.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> Dirjen Badilag MARI
                  </a>
                </li>
                <li>
                  <a href="http://sipp.pa-cimahi.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> SIPP PA Kota Cimahi
                  </a>
                </li>
                <li>
                  <a href="https://siwas.mahkamahagung.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> SIWAS MARI (Pengaduan)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="info-content-area">
          {children}
        </main>
      </div>

      <VirtualAssistant />
      <AccessibilityWidget />
      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />

      <Footer />
    </div>
  );
}

export default InformasiUmumLayout;
