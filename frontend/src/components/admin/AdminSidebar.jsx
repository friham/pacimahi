import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaSignOutAlt } from 'react-icons/fa';

export default function AdminSidebar({
  sidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  toggleSidebar,
  navSections,
  userRole,
  activeTab,
  setActiveTab,
  setIsAdding,
  setEditingItem,
  handleLogout,
  logo
}) {
  const isSuperOrAdmin = userRole === 'superadmin' || userRole === 'admin';

  return (
    <>
      {mobileSidebarOpen && (
        <div 
          className="admin-sidebar-backdrop animate-fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarCollapsed ? 'admin-sidebar--collapsed' : ''} ${mobileSidebarOpen ? 'admin-sidebar--mobile-open' : ''}`}>
        <div className="admin-sidebar__header">
          <button
            type="button"
            className="admin-sidebar__yt-toggle"
            onClick={toggleSidebar}
            title={sidebarCollapsed ? 'Perluas Menu' : 'Ciutkan Menu'}
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>

          {!sidebarCollapsed && (
            <div className="admin-sidebar__brand">
              <img
                src={logo}
                alt="Logo Pengadilan Agama Kota Cimahi"
                className="admin-sidebar__logo-img"
              />
              <div className="admin-sidebar__brand-text">
                <span className="admin-sidebar__brand-title">Pengadilan Agama Kota Cimahi Kelas IA</span>
                <span className="admin-sidebar__brand-sub">Admin Panel</span>
              </div>
            </div>
          )}
        </div>

        <nav className="admin-sidebar__nav">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="admin-sidebar__section">
              {sIdx > 0 && <div className="admin-sidebar__divider" />}
              {!sidebarCollapsed && (
                <p className="admin-sidebar__section-title">{section.title}</p>
              )}
              <div className="admin-sidebar__section-items">
                {section.items
                  .filter((item) => isSuperOrAdmin || (item.label !== 'Log Aktivitas' && item.label !== 'Pengaturan Website'))
                  .map((item, iIdx) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.label;
                  return (
                    <button
                      key={iIdx}
                      className={`admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
                      title={item.label}
                      onClick={() => {
                        setActiveTab(item.label);
                        setIsAdding(false);
                        setEditingItem(null);
                        if (window.innerWidth <= 768) setMobileSidebarOpen(false);
                      }}
                    >
                      <Icon className="admin-sidebar__link-icon" />
                      <span className="admin-sidebar__link-text">
                        {sidebarCollapsed ? item.short : item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__divider" />
          <Link 
            to="/" 
            className="admin-sidebar__link"
            title="Lihat Website"
          >
            <FaHome className="admin-sidebar__link-icon" />
            <span className="admin-sidebar__link-text">
              {sidebarCollapsed ? 'Web' : 'Lihat Website'}
            </span>
          </Link>
          <button 
            className="admin-sidebar__link admin-sidebar__link--logout" 
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt className="admin-sidebar__link-icon" />
            <span className="admin-sidebar__link-text">
              {sidebarCollapsed ? 'Keluar' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
