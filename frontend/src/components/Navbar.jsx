import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaSearch } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './Navbar.css';

import { API_URL } from '../config';

import { defaultMenuItems } from '../data/defaultMenuTree';
import { useSearchModal } from '../hooks/useSearchModal';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openSearchModal } = useSearchModal();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [navItems, setNavItems] = useState(defaultMenuItems);
  const location = useLocation();
  const closeTimer = useRef(null);

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
    } catch {}
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchDynamicMenus();
    };
    load();
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

  useEffect(() => {
    const resetTimer = setTimeout(() => {
      setIsOpen(false);
      setActiveDropdown(null);
      setOpenSubMenus({});
    }, 0);
    return () => clearTimeout(resetTimer);
  }, [location.pathname]);

  const openDropdown = useCallback((index) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(index);
  }, []);

  const closeDropdown = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, []);

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
        <Link to="/" className="navbar__logo" onClick={handleLinkClick}>
          <img src={logoImg} alt="Logo Pengadilan Agama Kota Cimahi" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span className="navbar__logo-title">MAHKAMAH AGUNG REPUBLIK INDONESIA</span>
            <span className="navbar__logo-subtitle">PENGADILAN AGAMA KOTA CIMAHI KELAS IA</span>
          </div>
        </Link>

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

        {scrolled && (
          <button
            className="navbar__search-btn"
            onClick={openSearchModal}
            aria-label="Buka pencarian"
            title="Cari berita & layanan"
          >
            <FaSearch size={16} />
          </button>
        )}

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      <div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`}>
        {navItems.map((item, index) => {
          const isTopOpen = activeDropdown === index;

          return (
            <div key={index} className="navbar__mobile-item">
              {item.children && item.children.length > 0 ? (
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
