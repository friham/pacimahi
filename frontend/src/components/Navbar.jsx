import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaUserShield } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './Navbar.css';

import { API_URL } from '../config';

const defaultMenuItems = [
  {
    label: 'Profil Pengadilan',
    children: [
      { label: 'Pengantar Ketua Pengadilan', href: '/tentang-pengadilan/pengantar-dari-ketua-pengadilan' },
      { label: 'Visi dan Misi Pengadilan', href: '/tentang-pengadilan/visi-dan-misi' },
      { label: 'Tugas Pokok & Fungsi', href: '/tentang-pengadilan/kekuasaan-dan-ruang-lingkup-pengadilan-agama' },
      { label: 'Wilayah Yurisdiksi', href: '/tentang-pengadilan/wilayah-yurisdiksi' },
      { label: 'Struktur Organisasi', href: '/tentang-pengadilan/struktur-organisasi' },
      {
        label: 'Sejarah Pengadilan',
        href: '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan',
        children: [
          { label: 'Tanggal Pembentukan Pengadilan', href: '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan' },
          { label: 'SK Pembentukan Pengadilan', href: '/tentang-pengadilan/sejarah-pengadilan-cmi/sk-pembentukan-pengadilan' },
        ],
      },
      { label: 'Daftar Mantan Pimpinan', href: '/tentang-pengadilan/daftar-nama-mantan-pimpinan' },
      { label: 'Agenda Kegiatan Pimpinan', href: '/tentang-pengadilan/agenda-kerja-pimpinan' },
      { label: 'Alamat & Kontak Pengadilan', href: '/tentang-pengadilan/alamat-pengadilan' },
      {
        label: 'Profil Pegawai & SDM',
        href: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua',
        children: [
          { label: 'Ketua & Wakil Ketua', href: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua' },
          { label: 'SDM Hakim', href: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/sdm-hakim' },
          { label: 'SDM Kepaniteraan', href: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kepaniteraann' },
          { label: 'SDM Kesekretariatan', href: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kesekretariatan' },
          { label: 'SDM Fungsional & Pelaksana', href: '/tentang-pengadilan/profile-pengadilan/profil-pegawai/fungsional-dan-pelaksana' },
          { label: 'Statistik Kepegawaian', href: '/tentang-pengadilan/profile-pengadilan/statistik-kepegawaian' },
        ],
      },
    ],
  },
  {
    label: 'Informasi Umum',
    children: [
      { label: 'Standar Operasional Prosedur (SOP)', href: '/informasi-umum/standar-operasional-prosedur' },
      { label: 'Program Kerja Tahunan', href: '/informasi-umum/program-kerja' },
      { label: 'Laporan Tahunan', href: '/informasi-umum/laporan-tahunan' },
    ],
  },
  {
    label: 'Kepaniteraan',
    children: [
      {
        label: 'Pos Bantuan Hukum (Posbakum)',
        href: '/kepaniteraan/posbakum',
        children: [
          { label: 'Keberadaan Posbakum', href: '/kepaniteraan/posbakum' },
          { label: 'Penerima Jasa Posbakum', href: '/kepaniteraan/posbakum' },
          { label: 'Syarat dan Mekanisme', href: '/kepaniteraan/posbakum' },
          { label: 'Dasar Aturan Posbakum', href: '/kepaniteraan/posbakum' },
        ],
      },
      {
        label: 'Perkara Prodeo (Cuma-Cuma)',
        href: '/kepaniteraan/prodeo',
        children: [
          { label: 'Prosedur Berperkara Prodeo', href: '/kepaniteraan/prodeo' },
          { label: 'Syarat & Dokumen Prodeo', href: '/kepaniteraan/prodeo' },
          { label: 'Dasar Hukum Prodeo', href: '/kepaniteraan/prodeo' },
        ],
      },
      { label: 'Hak-Hak Para Pencari Keadilan', href: '/kepaniteraan/hak-pencari-keadilan' },
      {
        label: 'Prosedur Berperkara',
        href: '/kepaniteraan/prosedur-berperkara',
        children: [
          { label: 'Tingkat Pertama', href: '/kepaniteraan/prosedur-berperkara' },
          { label: 'Tingkat Banding', href: '/kepaniteraan/prosedur-berperkara' },
          { label: 'Tingkat Kasasi', href: '/kepaniteraan/prosedur-berperkara' },
          { label: 'Peninjauan Kembali (PK)', href: '/kepaniteraan/prosedur-berperkara' },
          { label: 'Pengambilan Produk Pengadilan', href: '/kepaniteraan/prosedur-berperkara' },
          { label: 'Prosedur Gugatan Sederhana', href: '/kepaniteraan/prosedur-berperkara' },
          { label: 'Prosedur Eksekusi Putusan', href: '/kepaniteraan/prosedur-berperkara' },
        ],
      },
      { label: 'e-Court (Berperkara Elektronik)', href: '/kepaniteraan/ecourt' },
      { label: 'Hak-Hak Pokok dalam Persidangan', href: '/kepaniteraan/hak-pokok-persidangan' },
      {
        label: 'Mediasi Pengadilan',
        href: '/kepaniteraan/mediasi',
        children: [
          { label: 'Prosedur Mediasi', href: '/kepaniteraan/mediasi' },
          { label: 'Daftar Nama Mediator', href: '/kepaniteraan/mediasi' },
        ],
      },
      { label: 'Panggilan Ghaib (Tergugat Tak Diketahui)', href: '/kepaniteraan/panggilan-ghaib' },
      { label: 'Delegasi / Tabayun', href: '/kepaniteraan/delegasi-tabayun' },
      { label: 'Pedoman Pengelolaan Kepaniteraan', href: '/kepaniteraan/pedoman-kepaniteraan' },
      { label: 'SIPP – Penelusuran Perkara', href: '/kepaniteraan/sipp' },
      { label: 'Direktori Putusan Mahkamah Agung', href: '/kepaniteraan/direktori-putusan' },
      { label: 'Tata Tertib Persidangan', href: '/kepaniteraan/tata-tertib-persidangan' },
      { label: 'Agenda & Jadwal Persidangan', href: '/kepaniteraan/jadwal-persidangan' },
      { label: 'Statistik Perkara', href: '/kepaniteraan/statistik-perkara' },
      { label: 'SK Panjar & Biaya Proses Berperkara', href: '/kepaniteraan/biaya-perkara' },
      { label: 'Hak Perempuan & Anak Pasca Perceraian', href: '/kepaniteraan/hak-perempuan-anak' },
      { label: 'Penerimaan Perkara (SOP PTSP)', href: '/kepaniteraan/penerimaan-perkara' },
      { label: 'Layanan Informasi Perkara', href: '/kepaniteraan/layanan-informasi-perkara' },
      { label: 'Tahapan-Tahapan Perkara', href: '/kepaniteraan/tahapan-perkara' },
      { label: 'Laporan Keuangan Perkara', href: '/kepaniteraan/keuangan-perkara' },
    ],
  },
  {
    label: 'Kesekretariatan',
    children: [
      { label: 'Pengadaan Barang dan Jasa', href: '/kesekretariatan/pengadaan-barang-dan-jasa' },
      {
        label: 'DIPA',
        href: '/kesekretariatan/dipa',
        children: [
          { label: 'DIPA 01 - BUA', href: '/kesekretariatan/dipa' },
          { label: 'DIPA 04 - BADILAG', href: '/kesekretariatan/dipa' },
          { label: 'Realisasi Anggaran (LRA)', href: '/kesekretariatan/dipa' },
        ],
      },
      { label: 'Realisasi Penerimaan Negara Bukan Pajak PNBP', href: '/kesekretariatan/realisasi-pnbp' },
      { label: 'Daftar Aset dan Inventaris', href: '/kesekretariatan/daftar-aset-dan-inventaris' },
      { label: 'Survei Pelayanan Publik', href: '/kesekretariatan/survei-pelayanan-publik' },
      { label: 'Kepegawaian', href: '/kesekretariatan/kepegawaian' },
      { label: 'Kategorisasi Informasi', href: '/kesekretariatan/kategorisasi-informasi' },
      {
        label: 'SAKIP',
        href: '/kesekretariatan/sakip',
        children: [
          { label: 'LKjIP (Laporan Kinerja)', href: '/kesekretariatan/sakip' },
          { label: 'RENSTRA (Rencana Strategis)', href: '/kesekretariatan/sakip' },
          { label: 'RKT (Rencana Kinerja Tahunan)', href: '/kesekretariatan/sakip' },
          { label: 'PKT (Perjanjian Kinerja)', href: '/kesekretariatan/sakip' },
          { label: 'IKU (Indikator Utama)', href: '/kesekretariatan/sakip' },
        ],
      },
      { label: 'Surat Menyurat Pimpinan', href: '/kesekretariatan/surat-menyurat-pimpinan' },
      {
        label: 'Pedoman Pengelolaan Kesekretariatan',
        href: '/kesekretariatan/pedoman-pengelolaan-kesekretariatan',
        children: [
          { label: 'Pedoman Keuangan', href: '/kesekretariatan/pedoman-pengelolaan-kesekretariatan' },
          { label: 'Pedoman BMN', href: '/kesekretariatan/pedoman-pengelolaan-kesekretariatan' },
          { label: 'Pedoman Kepegawaian & Disiplin', href: '/kesekretariatan/pedoman-pengelolaan-kesekretariatan' },
          { label: 'Pedoman IT & Siber', href: '/kesekretariatan/pedoman-pengelolaan-kesekretariatan' },
        ],
      },
      { label: 'Unit Pelaksana Teknis Kesekretariatan', href: '/kesekretariatan/unit-pelaksana-teknis-kesekretariatan' },
      {
        label: 'Laporan',
        href: '/kesekretariatan/laporan',
        children: [
          { label: 'Laporan Keuangan (LRA & CaLK)', href: '/kesekretariatan/laporan' },
          { label: 'Laporan BMN SIMAN', href: '/kesekretariatan/laporan' },
          { label: 'Laporan Hawasbid', href: '/kesekretariatan/laporan' },
          { label: 'Laporan Kinerja Tahunan', href: '/kesekretariatan/laporan' },
        ],
      },
    ],
  },
  {
    label: 'Layanan Publik',
    children: [
      { label: 'Pelayanan Terpadu Satu Pintu (PTSP)', href: '/layanan-publik/ptsp' },
      { label: 'Alur Pelayanan Prioritas & Disabilitas', href: '/layanan-publik/alur-pelayanan-prioritas-ptsp' },
      {
        label: 'Akreditasi Penjaminan Mutu (APM)',
        href: '/layanan-publik/akreditasi-penjaminan-mutu',
        children: [
          { label: 'Leadership', href: '/layanan-publik/akreditasi-penjaminan-mutu' },
          { label: 'Customer Focus', href: '/layanan-publik/akreditasi-penjaminan-mutu' },
          { label: 'Process Management', href: '/layanan-publik/akreditasi-penjaminan-mutu' },
          { label: 'Strategic Planning', href: '/layanan-publik/akreditasi-penjaminan-mutu' },
          { label: 'Resources Management', href: '/layanan-publik/akreditasi-penjaminan-mutu' },
          { label: 'Document System', href: '/layanan-publik/akreditasi-penjaminan-mutu' },
          { label: 'Performance Results', href: '/layanan-publik/akreditasi-penjaminan-mutu' },
        ],
      },
      {
        label: 'Zona Integritas (WBK/WBBM)',
        href: '/layanan-publik/zona-integritas',
        children: [
          { label: 'Rencana Pembangunan ZI', href: '/layanan-publik/zona-integritas' },
          { label: 'Area 1 - Manajemen Perubahan', href: '/layanan-publik/zona-integritas' },
          { label: 'Area 2 - Penataan Tatalaksana', href: '/layanan-publik/zona-integritas' },
          { label: 'Area 3 - Manajemen SDM', href: '/layanan-publik/zona-integritas' },
          { label: 'Area 4 - Akuntabilitas Kinerja', href: '/layanan-publik/zona-integritas' },
          { label: 'Area 5 - Penguatan Pengawasan', href: '/layanan-publik/zona-integritas' },
          { label: 'Area 6 - Kualitas Pelayanan', href: '/layanan-publik/zona-integritas' },
        ],
      },
      {
        label: 'Pengawasan & Kode Etik',
        href: '/layanan-publik/pengawasan-dan-kode-etik',
        children: [
          { label: 'Kode Etik Hakim (KEPPH)', href: '/layanan-publik/pengawasan-dan-kode-etik' },
          { label: 'Kode Etik Panitera & Jurusita', href: '/layanan-publik/pengawasan-dan-kode-etik' },
          { label: 'Kode Etik Pegawai ASN', href: '/layanan-publik/pengawasan-dan-kode-etik' },
          { label: 'Data Hukuman Disiplin', href: '/layanan-publik/pengawasan-dan-kode-etik' },
          { label: 'Putusan MKH', href: '/layanan-publik/pengawasan-dan-kode-etik' },
        ],
      },
      {
        label: 'Layanan Pengaduan',
        href: '/layanan-publik/layanan-pengaduan',
        children: [
          { label: 'Mekanisme & Alur Pengaduan', href: '/layanan-publik/layanan-pengaduan' },
          { label: 'SIWAS MARI Online', href: 'https://siwas.mahkamahagung.go.id', external: true },
          { label: 'Hak Pelapor & Terlapor', href: '/layanan-publik/layanan-pengaduan' },
          { label: 'Laporan Meja Pengaduan', href: '/layanan-publik/layanan-pengaduan' },
        ],
      },
      {
        label: 'Layanan Informasi Publik (PPID)',
        href: '/layanan-publik/layanan-informasi',
        children: [
          { label: 'Prosedur Permintaan Informasi', href: '/layanan-publik/layanan-informasi' },
          { label: 'Formulir Permintaan Informasi', href: '/layanan-publik/layanan-informasi' },
          { label: 'Biaya Memperoleh Informasi', href: '/layanan-publik/layanan-informasi' },
          { label: 'Prosedur Keberatan Informasi', href: '/layanan-publik/layanan-informasi' },
          { label: 'Laporan Akses Informasi', href: '/layanan-publik/layanan-informasi' },
        ],
      },
      { label: 'Fasilitas Publik & Jam Kerja', href: '/layanan-publik/fasilitas-publik' },
      { label: 'Brosur Digital & Kumpulan SK', href: '/layanan-publik/brosur-digital' },
      { label: 'WhatsApp SILINCAH', href: 'https://wa.me/6281121111522?text=Info%20Layanan', external: true },
      { label: 'CCTV Online (ACO Badilag)', href: 'https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421', external: true },
    ],
  },
  {
    label: 'Publikasi',
    children: [
      { label: 'Berita Pengadilan', href: '/publikasi/berita' },
      { label: 'Pengumuman Resmi', href: '/publikasi/pengumuman' },
      { label: 'Artikel Hukum & Opini', href: '/publikasi/artikel' },
      {
        label: 'Peraturan & Kebijakan',
        href: '/publikasi/peraturan-kebijakan',
        children: [
          { label: 'Peraturan Perundang-undangan', href: '/publikasi/peraturan-kebijakan' },
          { label: 'PERMA (Peraturan MA)', href: '/publikasi/peraturan-kebijakan' },
          { label: 'Keputusan Ketua MA (SK KMA)', href: '/publikasi/peraturan-kebijakan' },
          { label: 'Surat Edaran MA (SEMA)', href: '/publikasi/peraturan-kebijakan' },
          { label: 'Keputusan Sekretaris MA', href: '/publikasi/peraturan-kebijakan' },
          { label: 'Pertimbangan Hukum MA', href: '/publikasi/peraturan-kebijakan' },
          { label: 'Yurisprudensi MA RI', href: '/publikasi/peraturan-kebijakan' },
          { label: 'Kebijakan Pimpinan PA Cimahi', href: '/publikasi/peraturan-kebijakan' },
        ],
      },
      { label: 'Perjanjian Kerja Sama (MoU)', href: '/publikasi/perjanjian-dengan-pihak-ketiga' },
      { label: 'Arsip Hasil Penelitian', href: '/publikasi/arsip-hasil-penelitian' },
      { label: 'Galeri Foto & Multimedia', href: '/publikasi/galeri' },
    ],
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [navItems, setNavItems] = useState(defaultMenuItems);
  const location = useLocation();
  const closeTimer = useRef(null);

  // Fetch dynamic menus from backend
  const fetchDynamicMenus = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/menus/tree?scope=public`);
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        const mapNode = (node) => {
          const isExternal = node.type === 'link' || node.open_new_tab || (node.url && node.url.startsWith('http'));
          const href = node.url || (node.slug ? `/tentang-pengadilan/${node.slug}` : '#');
          return {
            id: node.id,
            label: node.title,
            href: href,
            external: isExternal,
            children: Array.isArray(node.children) && node.children.length > 0 
              ? node.children.map(mapNode) 
              : undefined
          };
        };
        setNavItems(res.data.data.map(mapNode));
      }
    } catch (err) {
      console.warn('Menggunakan fallback menu navbar');
    }
  }, []);

  useEffect(() => {
    fetchDynamicMenus();
    const handleMenuUpdate = () => fetchDynamicMenus();
    window.addEventListener('cms_menu_updated', handleMenuUpdate);
    return () => window.removeEventListener('cms_menu_updated', handleMenuUpdate);
  }, [fetchDynamicMenus]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setOpenSubMenus({});
  }, [location.pathname]);

  // Buka dropdown langsung
  const openDropdown = useCallback((index) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(index);
  }, []);

  // Tutup dropdown dengan sedikit delay agar tidak langsung hilang saat berpindah antar elemen
  const closeDropdown = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, []);

  // Klik link → tutup semua dropdown dan sub-menu seketika, dan scroll ke atas
  const handleLinkClick = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(null);
    setOpenSubMenus({});
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const toggleSubMenu = (key, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={handleLinkClick}>
          <img src={logoImg} alt="Logo Pengadilan Agama Kota Cimahi" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span className="navbar__logo-title">MAHKAMAH AGUNG REPUBLIK INDONESIA</span>
            <span className="navbar__logo-subtitle">PENGADILAN AGAMA KOTA CIMAHI KELAS IA</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar__menu">
          {navItems.map((item, index) => {
            const isMenuOpen = activeDropdown === index;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div
                key={item.id || index}
                className="navbar__item"
                onMouseEnter={() => hasChildren && openDropdown(index)}
                onMouseLeave={hasChildren ? closeDropdown : undefined}
              >
                {hasChildren ? (
                  <button
                    className={`navbar__link ${isMenuOpen ? 'navbar__link--active' : ''}`}
                    onClick={() => setActiveDropdown(isMenuOpen ? null : index)}
                  >
                    <span>{item.label}</span>
                    <FaChevronDown className="navbar__chevron" size={10} />
                  </button>
                ) : item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="navbar__link"
                    onClick={handleLinkClick}
                  >
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <Link
                    to={item.href || '#'}
                    className="navbar__link"
                    onClick={handleLinkClick}
                  >
                    <span>{item.label}</span>
                  </Link>
                )}

                {/* Desktop Dropdown */}
                {hasChildren && isMenuOpen && (
                  <div
                    className="navbar__dropdown animate-fade-in-down"
                    onMouseEnter={() => openDropdown(index)}
                    onMouseLeave={closeDropdown}
                  >
                    {item.children.map((child, childIdx) => {
                      const subKey = `desktop-${index}-${childIdx}`;
                      const hasSub = child.children && child.children.length > 0;
                      const isSubOpen = !!openSubMenus[subKey];

                      if (child.external) {
                        return (
                          <a
                            key={childIdx}
                            href={child.href}
                            target="_blank"
                            rel="noreferrer"
                            className="navbar__dropdown-item"
                            onClick={handleLinkClick}
                          >
                            {child.label}
                          </a>
                        );
                      }

                      return (
                        <div key={childIdx} className="navbar__dropdown-item-group">
                          <div className="navbar__dropdown-link-wrapper">
                            <Link
                              to={child.href}
                              className="navbar__dropdown-item"
                              onClick={handleLinkClick}
                            >
                              <span>{child.label}</span>
                            </Link>

                            {/* Chevron button to toggle sub-items if present */}
                            {hasSub && (
                              <button
                                className="navbar__dropdown-expand-btn"
                                onClick={(e) => toggleSubMenu(subKey, e)}
                                title="Buka sub-menu"
                              >
                                <FaChevronDown
                                  size={10}
                                  className={`navbar__chevron-icon ${isSubOpen ? 'open' : ''}`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Inline Sub-items */}
                          {hasSub && isSubOpen && (
                            <div className="navbar__inline-sub-list">
                              {child.children.map((subChild, sIdx) => (
                                <Link
                                  key={sIdx}
                                  to={subChild.href}
                                  className="navbar__inline-sub-item"
                                  onClick={handleLinkClick}
                                >
                                  <FaChevronRight size={8} style={{ opacity: 0.5, flexShrink: 0 }} />
                                  <span>{subChild.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`}>
        {navItems.map((item, index) => {
          const isTopOpen = activeDropdown === index;

          return (
            <div key={index} className="navbar__mobile-item">
              {item.children && item.children.length > 0 ? (
                /* Item punya sub-menu → tampilkan tombol dengan chevron */
                <button
                  className="navbar__mobile-link"
                  onClick={() => setActiveDropdown(isTopOpen ? null : index)}
                >
                  <span>{item.label}</span>
                  <FaChevronDown
                    className={`navbar__chevron ${isTopOpen ? 'navbar__chevron--open' : ''}`}
                    size={12}
                  />
                </button>
              ) : (
                /* Item tidak punya sub-menu → tampilkan sebagai link biasa tanpa panah */
                <Link
                  to={item.href || '#'}
                  className="navbar__mobile-link"
                  onClick={handleLinkClick}
                >
                  <span>{item.label}</span>
                </Link>
              )}

              {item.children && isTopOpen && (
                <div className="navbar__mobile-dropdown">
                  {item.children.map((child, childIdx) => {
                    const mobileKey = `mobile-${index}-${childIdx}`;
                    const hasSub = child.children && child.children.length > 0;
                    const isSubOpen = !!openSubMenus[mobileKey];

                    if (child.external) {
                      return (
                        <a
                          key={childIdx}
                          href={child.href}
                          target="_blank"
                          rel="noreferrer"
                          className="navbar__mobile-dropdown-item"
                          onClick={handleLinkClick}
                        >
                          {child.label}
                        </a>
                      );
                    }

                    return (
                      <div key={childIdx} className="navbar__mobile-sub-group">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '12px' }}>
                          <Link
                            to={child.href}
                            className="navbar__mobile-dropdown-item"
                            style={{ flex: 1 }}
                            onClick={handleLinkClick}
                          >
                            {child.label}
                          </Link>
                          {hasSub && (
                            <button
                              onClick={(e) => toggleSubMenu(mobileKey, e)}
                              style={{ background: 'transparent', border: 'none', color: '#fff', padding: '8px', cursor: 'pointer' }}
                            >
                              <FaChevronDown
                                size={10}
                                style={{ transform: isSubOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                              />
                            </button>
                          )}
                        </div>

                        {hasSub && isSubOpen && (
                          <div className="navbar__mobile-nested-dropdown">
                            {child.children.map((subChild, sIdx) => (
                              <Link
                                key={sIdx}
                                to={subChild.href}
                                className="navbar__mobile-nested-item"
                                onClick={handleLinkClick}
                              >
                                {subChild.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
