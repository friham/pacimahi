import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialSidebar from '../../components/SocialSidebar';
import VirtualAssistant from '../../components/VirtualAssistant';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import AcoFloatingButton from '../../components/AcoFloatingButton';
import { 
  FaHome, 
  FaChevronRight, 
  FaBalanceScale, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaWhatsapp,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { API_URL } from '../../config';
import './ProfileLayout.css';
import './tentang-pengadilan.css';

const defaultMenuLinks = [
  {
    title: 'Pengantar Ketua Pengadilan',
    path: '/tentang-pengadilan/pengantar-dari-ketua-pengadilan',
  },
  {
    title: 'Visi dan Misi Pengadilan',
    path: '/tentang-pengadilan/visi-dan-misi',
  },
  {
    title: 'Tugas Pokok dan Fungsi Pengadilan Agama',
    path: '/tentang-pengadilan/kekuasaan-dan-ruang-lingkup-pengadilan-agama',
  },
  {
    title: 'Wilayah Yurisdiksi',
    path: '/tentang-pengadilan/wilayah-yurisdiksi',
  },
  {
    title: 'Struktur Organisasi',
    path: '/tentang-pengadilan/struktur-organisasi',
  },
  {
    title: 'Sejarah Pengadilan',
    path: '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan',
    children: [
      {
        title: 'Tanggal Pembentukan Pengadilan',
        path: '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan',
      },
      {
        title: 'Surat Keputusan Pembentukan Pengadilan',
        path: '/tentang-pengadilan/sejarah-pengadilan-cmi/sk-pembentukan-pengadilan',
      },
    ],
  },
  {
    title: 'Daftar Nama Mantan Pimpinan',
    path: '/tentang-pengadilan/daftar-nama-mantan-pimpinan',
  },
  {
    title: 'Agenda Kegiatan',
    path: '/tentang-pengadilan/agenda-kerja-pimpinan',
  },
  {
    title: 'Alamat Pengadilan',
    path: '/tentang-pengadilan/alamat-pengadilan',
  },
  {
    title: 'Profil Pegawai & Aparatur',
    path: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua',
    children: [
      {
        title: 'Ketua & Wakil Ketua',
        path: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua',
      },
      {
        title: 'SDM Hakim',
        path: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/sdm-hakim',
      },
      {
        title: 'SDM Kepaniteraan',
        path: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kepaniteraann',
      },
      {
        title: 'SDM Kesekretariatan',
        path: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kesekretariatan',
      },
      {
        title: 'SDM Fungsional dan Pelaksana',
        path: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/fungsional-dan-pelaksana',
      },
      {
        title: 'Statistik Kepegawaian',
        path: '/tentang-pengadilan/profile-pengadilan/statistik-kepegawaian',
      },
    ],
  },
];

let cachedProfilLinks = null;
let fetchSidebarMenusPromise = null;

function ProfileLayout({ title, subtitle, breadcrumb, children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [sidebarLinks, setSidebarLinks] = useState(() => cachedProfilLinks || defaultMenuLinks);

  const fetchSidebarMenus = useCallback(async (force = false) => {
    if (cachedProfilLinks && !force) {
      setSidebarLinks(cachedProfilLinks);
      return;
    }
    if (fetchSidebarMenusPromise && !force) {
      const data = await fetchSidebarMenusPromise;
      if (data) setSidebarLinks(data);
      return;
    }

    fetchSidebarMenusPromise = (async () => {
      try {
        const res = await axios.get(`${API_URL}/menus/tree?scope=public`);
        if (res.data?.success && Array.isArray(res.data.data)) {
          const profilNode = res.data.data.find(m => m.slug === 'profil-pengadilan' || m.title?.toLowerCase().includes('profil'));
          if (profilNode && Array.isArray(profilNode.children) && profilNode.children.length > 0) {
            const mapChild = (c) => ({
              title: c.title,
              path: c.url || `/tentang-pengadilan/${c.slug}`,
              children: Array.isArray(c.children) && c.children.length > 0 ? c.children.map(mapChild) : undefined
            });
            const mapped = profilNode.children.map(mapChild);
            cachedProfilLinks = mapped;
            return mapped;
          }
        }
      } catch (e) {
        // fallback to default
      } finally {
        fetchSidebarMenusPromise = null;
      }
      return null;
    })();

    const result = await fetchSidebarMenusPromise;
    if (result) {
      setSidebarLinks(result);
    }
  }, []);

  useEffect(() => {
    if (!cachedProfilLinks) {
      fetchSidebarMenus();
    }
    const handleUpdate = () => {
      cachedProfilLinks = null;
      fetchSidebarMenus(true);
    };
    window.addEventListener('cms_menu_updated', handleUpdate);
    return () => window.removeEventListener('cms_menu_updated', handleUpdate);
  }, [fetchSidebarMenus]);

  return (
    <div className="profile-page-wrapper">
      {}
      <Navbar />

      {}
      <SocialSidebar />

      {}
      <section className="profile-hero">
        <div className="profile-hero__container">
          <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">
              <FaHome style={{ marginRight: '4px', verticalAlign: '-1px' }} />
              Beranda
            </Link>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span>Profil Pengadilan</span>
            <span className="sep"><FaChevronRight size={10} /></span>
            <span className="current">{breadcrumb || title}</span>
          </nav>
          <h1 className="profile-hero__title">{title}</h1>
          {subtitle && <p className="profile-hero__subtitle">{subtitle}</p>}
        </div>
      </section>

      {}
      <div className="profile-body-container">
        {}
        <aside className="profile-sidebar">
          {}
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaBalanceScale className="sidebar-card__header-icon" />
              <span>Profil Pengadilan</span>
            </div>
            <ul className="sidebar-nav-list">
              {sidebarLinks.map((item, index) => {
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

          {}
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

          {}
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <FaExternalLinkAlt className="sidebar-card__header-icon" />
              <span>Tautan Penting</span>
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
                  <a href="https://pta-bandung.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> PTA Bandung
                  </a>
                </li>
                <li>
                  <a href="http://sipp.pa-cimahi.go.id" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> SIPP PA Kota Cimahi
                  </a>
                </li>
                <li>
                  <a href="https://putusan3.mahkamahagung.go.id/pengadilan/profil/pengadilan/pa-cimahi.html" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaChevronRight size={10} /> Direktori Putusan
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {}
        <main className="profile-content-area">
          {children}
        </main>
      </div>

      {}
      <VirtualAssistant />
      <AccessibilityWidget />
      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />

      {}
      <Footer />
    </div>
  );
}

export default ProfileLayout;
