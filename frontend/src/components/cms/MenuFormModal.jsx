import { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaFolderPlus } from 'react-icons/fa';
import './MediaLibraryModal.css';

export default function MenuFormModal({ isOpen, onClose, onSave, menuData, allMenus = [], parentDefaultId = null }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    parent_id: '',
    type: 'page',
    url: '',
    icon: '',
    sort_order: 0,
    status: 'published',
    open_new_tab: false,
    description: ''
  });

  useEffect(() => {
    if (menuData) {
      setFormData({
        title: menuData.title || '',
        slug: menuData.slug || '',
        parent_id: menuData.parent_id !== null && menuData.parent_id !== undefined ? String(menuData.parent_id) : '',
        type: menuData.type || 'page',
        url: menuData.url || '',
        icon: menuData.icon || '',
        sort_order: menuData.sort_order || 0,
        status: menuData.status || 'published',
        open_new_tab: !!menuData.open_new_tab,
        description: menuData.description || ''
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        parent_id: parentDefaultId ? String(parentDefaultId) : '',
        type: 'page',
        url: '',
        icon: '',
        sort_order: 0,
        status: 'published',
        open_new_tab: false,
        description: ''
      });
    }
  }, [menuData, parentDefaultId, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const updates = { title };
    if (!menuData) {
      updates.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert('Nama Menu dan Slug wajib diisi!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="media-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="media-modal" style={{ width: '650px', height: 'auto', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="media-modal__header">
          <div className="media-modal__header-title">
            <FaFolderPlus className="text-emerald" />
            <h3>{menuData ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
          </div>
          <button type="button" className="media-modal__close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Nama Menu *
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Contoh: Struktur Organisasi"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Slug Menu *
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="struktur-organisasi"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Parent Menu (Tingkat Induk):
                </label>
                <select 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
                  value={formData.parent_id}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                >
                  <option value="">[ Menu Utama / Root Level ]</option>
                  {allMenus
                    .filter(m => !menuData || m.id !== menuData.id) // cannot be own parent
                    .map(m => (
                      <option key={m.id} value={m.id}>
                        {m.parent_id ? `↳ ${m.title}` : m.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Tipe Menu:
                </label>
                <select 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="page">Halaman CMS</option>
                  <option value="dropdown">Dropdown (Hanya Wadah Submenu)</option>
                  <option value="link">Link Eksternal</option>
                  <option value="document">File / Dokumen</option>
                  <option value="video">Video</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  URL / Target Tautan:
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="/tentang-pengadilan/... atau https://..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Urutan (Sort Order):
                </label>
                <input 
                  type="number" 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Status Publikasi:
                </label>
                <select 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="published">Published (Tampil di Web)</option>
                  <option value="draft">Draft (Konsep)</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Buka di Tab Baru:
                </label>
                <select 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
                  value={formData.open_new_tab ? 'yes' : 'no'}
                  onChange={(e) => setFormData({ ...formData, open_new_tab: e.target.value === 'yes' })}
                >
                  <option value="no">Tidak (Same Tab)</option>
                  <option value="yes">Ya (New Tab)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                Deskripsi Singkat (Opsional):
              </label>
              <textarea 
                rows={2}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi singkat seputar menu ini..."
              />
            </div>
          </div>

          <div className="media-modal__footer">
            <button type="button" className="media-cancel-btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="media-confirm-btn">
              <FaSave style={{ marginRight: '6px' }} /> Simpan Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
