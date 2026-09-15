import { FaBars, FaEdit } from 'react-icons/fa';

export default function AdminHeader({
  activeTab,
  setActiveTab,
  toggleSidebar,
  user,
  headerImgError,
  setHeaderImgError,
  getAvatarUrl,
  setIsAdding,
  setEditingItem
}) {
  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <button
          type="button"
          className="admin-header__mobile-toggle"
          onClick={toggleSidebar}
          title="Buka Menu Navigasi"
          aria-label="Buka Menu Navigasi"
        >
          <FaBars />
        </button>
        <div>
          <h1 className="admin-header__title">{activeTab}</h1>
        </div>
      </div>
      <div 
        className="admin-header__user"
        onClick={() => {
          setActiveTab('Pengaturan Akun');
          setIsAdding(false);
          setEditingItem(null);
        }}
        title="Klik untuk mengelola akun & profil admin"
      >
        <div className="admin-header__avatar">
          {user?.avatar && !headerImgError ? (
            <img
              src={getAvatarUrl(user.avatar)}
              alt={user.name || 'Admin'}
              className="admin-header__avatar-img"
              onError={() => setHeaderImgError(true)}
            />
          ) : (
            (user?.name || user?.username || 'A').charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <p className="admin-header__user-name">{user?.name || 'Administrator'}</p>
          <p className="admin-header__user-role">{user?.role || 'superadmin'}</p>
        </div>
        <div className="admin-header__user-edit-hint" title="Pengaturan Akun">
          <FaEdit />
        </div>
      </div>
    </header>
  );
}
