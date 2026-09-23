import { useState } from 'react';
import {
  FaSitemap, FaPlus, FaSave, FaAngleRight, FaAngleDown,
  FaEdit, FaToggleOn, FaToggleOff, FaTrash
} from 'react-icons/fa';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function MenusTab({
  userRole,
  menus,
  menuTree,
  isAdding,
  setIsAdding,
  editingItem,
  setEditingItem,
  menuForm,
  setMenuForm,
  handleMenuSubmit,
  deleteMenu,
  toggleMenuStatus,
  loading
}) {
  const canManageMenus = userRole === 'superadmin' || userRole === 'admin';
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleExpand = (id) =>
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));

  const renderMenuTreeItems = (items, depth = 0) => {
    return items.map(item => (
      <div key={item.id} className={`menu-tree-item menu-tree-item--depth-${depth}`}>
        <div className="menu-tree-row">
          <div className="menu-tree-row__left">
            {item.children?.length > 0 ? (
              <button className="menu-tree-expand" onClick={() => toggleExpand(item.id)}>
                {expandedMenus[item.id] ? <FaAngleDown /> : <FaAngleRight />}
              </button>
            ) : <span className="menu-tree-expand menu-tree-expand--empty" />}
            <span className="menu-tree-icon"><FaSitemap /></span>
            <div className="menu-tree-info">
              <span className="menu-tree-title">{item.title}</span>
              <span className="menu-tree-slug">/{item.slug}</span>
            </div>
          </div>
          <div className="menu-tree-row__right">
            <span className={`cms-badge cms-badge--${item.type}`}>{item.type}</span>
            <span className={`cms-badge cms-badge--status-${item.status}`}>{item.status}</span>
            {canManageMenus && (
              <button
                className="cms-btn cms-btn--icon cms-btn--edit"
                title="Edit Menu"
                onClick={() => {
                  setEditingItem(item);
                  setMenuForm({
                    title: item.title,
                    slug: item.slug,
                    parent_id: item.parent_id || '',
                    type: item.type,
                    url: item.url || '',
                    icon: item.icon || '',
                    sort_order: item.sort_order,
                    status: item.status,
                    open_new_tab: !!item.open_new_tab,
                    description: item.description || ''
                  });
                  setIsAdding(true);
                }}
              >
                <FaEdit /> Edit
              </button>
            )}
            {canManageMenus && (
              <>
                <button
                  className={`cms-btn cms-btn--icon ${item.status === 'published' ? 'cms-btn--toggle' : 'cms-btn--toggle-draft'}`}
                  title={item.status === 'published' ? 'Nonaktifkan Menu' : 'Aktifkan Menu'}
                  onClick={() => toggleMenuStatus(item.id, item.status)}
                >
                  {item.status === 'published' ? <><FaToggleOn /> Aktif</> : <><FaToggleOff /> Nonaktif</>}
                </button>
                <button
                  className="cms-btn cms-btn--icon cms-btn--delete"
                  title="Hapus Menu"
                  onClick={() => deleteMenu(item.id)}
                >
                  <FaTrash /> Hapus
                </button>
              </>
            )}
          </div>
        </div>
        {item.children?.length > 0 && expandedMenus[item.id] && (
          <div className="menu-tree-children">
            {renderMenuTreeItems(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="cms-panel animate-fade-in-up">
      <div className="cms-panel__header">
        <div>
          <h2 className="cms-panel__title"><FaSitemap /> Kelola Menu Navigasi &amp; Sidebar</h2>
          <p className="cms-panel__subtitle">Tambah, edit, atur hierarki dan urutan menu website secara dinamis.</p>
        </div>
        {canManageMenus && (
          <button
            className="cms-btn cms-btn--primary"
            onClick={() => {
              setIsAdding(true);
              setEditingItem(null);
              setMenuForm({ title: '', slug: '', parent_id: '', type: 'page', url: '', icon: '', sort_order: 0, status: 'published', open_new_tab: false, description: '' });
            }}
          >
            <FaPlus /> Tambah Menu
          </button>
        )}
      </div>

      {isAdding && (
        <div className="cms-form-card animate-fade-in-down">
          <h3 className="cms-form-card__title">{editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
          <form onSubmit={handleMenuSubmit}>
            <div className="cms-form-grid">
              <div className="cms-form-group">
                <label>Nama Menu *</label>
                <input
                  type="text"
                  value={menuForm.title}
                  required
                  onChange={e => setMenuForm(prev => ({
                    ...prev,
                    title: e.target.value,
                    slug: !editingItem ? slugify(e.target.value) : prev.slug
                  }))}
                  placeholder="Contoh: Profil Pengadilan"
                />
              </div>
              <div className="cms-form-group">
                <label>Slug / URL Identifier *</label>
                <input
                  type="text"
                  value={menuForm.slug}
                  required
                  onChange={e => setMenuForm(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                  placeholder="profil-pengadilan"
                />
              </div>
              <div className="cms-form-group">
                <label>Parent Menu (Opsional)</label>
                <select value={menuForm.parent_id} onChange={e => setMenuForm(prev => ({ ...prev, parent_id: e.target.value }))}>
                  <option value="">— Tanpa Parent (Level Utama) —</option>
                  {menus.filter(m => !editingItem || m.id !== editingItem.id).map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>
              <div className="cms-form-group">
                <label>Tipe Menu</label>
                <select value={menuForm.type} onChange={e => setMenuForm(prev => ({ ...prev, type: e.target.value }))}>
                  <option value="page">Halaman CMS</option>
                  <option value="link">Tautan Eksternal</option>
                  <option value="dropdown">Dropdown (Parent saja)</option>
                  <option value="document">Dokumen/File</option>
                  <option value="video">Video</option>
                  <option value="custom">Kustom</option>
                </select>
              </div>
              <div className="cms-form-group">
                <label>URL / Tautan (Opsional)</label>
                <input
                  type="text"
                  value={menuForm.url}
                  onChange={e => setMenuForm(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://... atau /halaman-saya"
                />
              </div>
              <div className="cms-form-group">
                <label>Urutan (Sort Order)</label>
                <input
                  type="number"
                  value={menuForm.sort_order}
                  min="0"
                  onChange={e => setMenuForm(prev => ({ ...prev, sort_order: Number(e.target.value) }))}
                />
              </div>
              <div className="cms-form-group">
                <label>Status</label>
                <select value={menuForm.status} onChange={e => setMenuForm(prev => ({ ...prev, status: e.target.value }))}>
                  <option value="published">Published (Tampil)</option>
                  <option value="draft">Draft (Tersembunyi)</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
              <div className="cms-form-group">
                <label>Icon (CSS Class / Emoji)</label>
                <input
                  type="text"
                  value={menuForm.icon}
                  onChange={e => setMenuForm(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="mis. 📋 atau fa-gavel"
                />
              </div>
              <div className="cms-form-group cms-form-group--full">
                <label>Deskripsi (Opsional)</label>
                <textarea
                  rows="2"
                  value={menuForm.description}
                  onChange={e => setMenuForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Deskripsi singkat menu ini..."
                />
              </div>
              <div className="cms-form-group cms-form-group--checkbox">
                <label className="cms-checkbox-label">
                  <input
                    type="checkbox"
                    checked={menuForm.open_new_tab}
                    onChange={e => setMenuForm(prev => ({ ...prev, open_new_tab: e.target.checked }))}
                  />
                  Buka di Tab Baru
                </label>
              </div>
            </div>
            <div className="cms-form-actions">
              <button
                type="button"
                className="cms-btn cms-btn--ghost"
                onClick={() => { setIsAdding(false); setEditingItem(null); }}
              >
                Batal
              </button>
              <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}>
                <FaSave /> {loading ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Menu'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="cms-menu-tree">
        <div className="cms-menu-tree__header">
          <span>Struktur Menu ({menus.length} item)</span>
          <span className="cms-menu-tree__hint">Klik <FaAngleRight className="inline" /> untuk expand sub-menu</span>
        </div>
        {menuTree.length === 0 ? (
          <div className="cms-empty-state">
            <FaSitemap className="cms-empty-state__icon" />
            <p>Belum ada menu. Klik &quot;Tambah Menu&quot; untuk membuat menu pertama.</p>
          </div>
        ) : (
          <div className="menu-tree-wrapper">
            {renderMenuTreeItems(menuTree)}
          </div>
        )}
      </div>
    </div>
  );
}
