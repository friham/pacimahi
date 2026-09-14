import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialSidebar from '../../components/SocialSidebar';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import AcoFloatingButton from '../../components/AcoFloatingButton';
import { 
  FaHome, 
  FaChevronRight, 
  FaFolderOpen, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaWhatsapp,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaCoins,
  FaBoxes,
  FaPoll,
  FaUsersCog,
  FaListAlt,
  FaChartLine,
  FaEnvelopeOpenText,
  FaBookReader,
  FaSitemap,
  FaClipboardList
} from 'react-icons/fa';
import './KesekretariatanLayout.css';
import '../tentang-pengadilan/tentang-pengadilan.css';

const kesekretariatanMenu = [
  {
    title: 'Pengadaan Barang dan Jasa',
    path: '/kesekretariatan/pengadaan-barang-dan-jasa',
    icon: FaFolderOpen,
  },
  {
    title: 'DIPA',
    path: '/kesekretariatan/dipa',
    icon: FaFileInvoiceDollar,
  },
  {
    title: 'Realisasi Penerimaan Negara Bukan Pajak PNBP',
    path: '/kesekretariatan/realisasi-pnbp',
    icon: FaCoins,
  },
  {
    title: 'Daftar Aset dan Inventaris',
    path: '/kesekretariatan/daftar-aset-dan-inventaris',
    icon: FaBoxes,
  },
  {
    title: 'Survei Pelayanan Publik',
    path: '/kesekretariatan/survei-pelayanan-publik',
    icon: FaPoll,
  },
  {
    title: 'Kepegawaian',
    path: '/kesekretariatan/kepegawaian',
    icon: FaUsersCog,
  },
  {
    title: 'Kategorisasi Informasi',
    path: '/kesekretariatan/kategorisasi-informasi',
    icon: FaListAlt,
  },
  {
    title: 'SAKIP',
    path: '/kesekretariatan/sakip',
    icon: FaChartLine,
  },
  {
    title: 'Surat Menyurat Pimpinan',
    path: '/kesekretariatan/surat-menyurat-pimpinan',
    icon: FaEnvelopeOpenText,
  },
  {
    title: 'Pedoman Pengelolaan Kesekretariatan',
    path: '/kesekretariatan/pedoman-pengelolaan-kesekretariatan',
    icon: FaBookReader,
  },
  {
    title: 'Unit Pelaksana Teknis Kesekretariatan',
    path: '/kesekretariatan/unit-pelaksana-teknis-kesekretariatan',
    icon: FaSitemap,
  },
  {
    title: 'Laporan',
    path: '/kesekretariatan/laporan',
    icon: FaClipboardList,
  },
];

function KesekretariatanLayout({ title, subtitle, breadcrumb, children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="kesekretariatan-page-wrapper">
      {/* Top Navbar */}
      <Navbar />

      {/* Floating Left Social Icons */}
      <SocialSidebar />

      {/* Hero Banner with Breadcrumbs */}
      <section className="kesekretariatan-hero">
        <div className="kesekretariatan-hero__container">
          <nav className="kesekretariatan-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">
              <FaHome style={{ marginRight: '4px', verticalAlign: '-1px' }} />
              Beranda
            </Link>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span>Kesekretariatan</span>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span className="current">{breadcrumb || title}</span>
          </nav>
          <h1 className="kesekretariatan-hero__title">{title}</h1>
          {subtitle && <p className="kesekretariatan-hero__subtitle">{subtitle}</p>}
        </div>
      </section>

      {/* Main Container Grid */}
      <div className="kesekretariatan-body-container">
        {/* Left Sidebar Menu */}
        <aside className="kesekretariatan-sidebar">
          {/* Menu Card */}
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaFolderOpen className="sidebar-card__header-icon" />
              <span>Menu Kesekretariatan</span>
            </div>
            <ul className="sidebar-nav-list">
              {kesekretariatanMenu.map((item, index) => {
                const isActive = currentPath === item.path;
                const IconComponent = item.icon || FaFileAlt;

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

          {/* Quick Contact Widget */}
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaClock className="sidebar-card__header-icon" />
              <span>Jam Operasional Kantor</span>
            </div>
            <div className="sidebar-info-card">
              <div className="info-item">
                <FaClock className="info-item-icon" />
                <div className="info-item-content">
                  <strong>Senin - Kamis:</strong> 08.00 - 16.30 WIB
                  <br />
                  <strong>Jumat:</strong> 07.30 - 16.30 WIB
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
                  <strong>Telepon / Fax</strong>
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
                href="https://wa.me/6281121111522?text=Info%20Kesekretariatan"
                target="_blank"
                rel="noreferrer"
                className="sidebar-cta-btn"
              >
                <FaWhatsapp size={18} />
                <span>SILINCAH WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="kesekretariatan-content-area">
          {children}
        </main>
      </div>

      {/* Floating Accessibility Buttons */}
      <AccessibilityWidget />
      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default KesekretariatanLayout;
