import { FaPlus, FaEdit, FaTrash, FaEye, FaImage, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import ImageUploader from '../../ImageUploader';

export default function SlidersTab({
  sliders,
  isAdding,
  setIsAdding,
  editingItem,
  setEditingItem,
  sliderForm,
  setSliderForm,
  handleSliderSubmit,
  deleteSlider,
  token,
  loading,
  getAvatarUrl,
  sliderPreview,
  setSliderPreview
}) {
  return (
    <div className="crud-panel">
      {!isAdding && !editingItem ? (
        <>
          <div className="crud-panel__actions">
            <button className="crud-panel__btn crud-panel__btn--primary" onClick={() => setIsAdding(true)}>
              <FaPlus /> Tambah Slider Baru
            </button>
          </div>

          <div className="crud-table-wrapper">
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Sort</th>
                  <th>Gambar</th>
                  <th>Judul</th>
                  <th>Deskripsi</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {sliders.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Tidak ada data slider.</td></tr>
                ) : (
                  sliders.map((s) => (
                    <tr key={s.id}>
                      <td>{s.sort_order}</td>
                      <td>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <img
                            src={getAvatarUrl(s.image_url)}
                            alt={s.title}
                            className="crud-table__img"
                            style={{ cursor: 'pointer', transition: 'transform 0.15s', display: 'block' }}
                            title="Klik untuk preview gambar"
                            onClick={() => setSliderPreview({ src: getAvatarUrl(s.image_url), title: s.title })}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            onError={e => { e.target.src = 'https://placehold.co/100x50?text=Gambar'; }}
                          />
                          <button
                            type="button"
                            title="Preview gambar"
                            onClick={() => setSliderPreview({ src: getAvatarUrl(s.image_url), title: s.title })}
                            style={{
                              position: 'absolute', bottom: 2, right: 2,
                              background: 'rgba(0,0,0,0.65)', color: '#fff',
                              border: 'none', borderRadius: '4px', padding: '2px 5px',
                              cursor: 'pointer', fontSize: '0.7rem', lineHeight: 1,
                              display: 'flex', alignItems: 'center', gap: 3
                            }}
                          >
                            <FaEye size={10} /> Lihat
                          </button>
                        </div>
                      </td>
                      <td className="crud-table__bold">{s.title}</td>
                      <td>{s.description || '-'}</td>
                      <td>
                        <span className={`crud-badge ${s.is_active ? 'crud-badge--active' : 'crud-badge--inactive'}`}>
                          {s.is_active ? 'Aktif' : 'Non-aktif'}
                        </span>
                      </td>
                      <td>
                        <div className="crud-actions">
                          <button className="crud-actions__btn crud-actions__btn--edit" onClick={() => {
                            setEditingItem(s);
                            setSliderForm({ ...s, is_active: s.is_active === 1 || s.is_active === true });
                          }}>
                            <FaEdit />
                          </button>
                          <button className="crud-actions__btn crud-actions__btn--delete" onClick={() => deleteSlider(s.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <form onSubmit={handleSliderSubmit} className="crud-form">
          <h2 className="crud-form__title">{editingItem ? 'Edit Slider' : 'Tambah Slider Baru'}</h2>
          <div className="crud-form__grid">
            <div className="crud-form__group">
              <label>Judul Slider *</label>
              <input type="text" value={sliderForm.title} onChange={(e) => setSliderForm({ ...sliderForm, title: e.target.value })} required />
            </div>
            <div className="crud-form__group col-span-2">
              <ImageUploader
                label="Gambar Banner / Slider *"
                value={sliderForm.image_url}
                token={token}
                onChange={(url) => setSliderForm({ ...sliderForm, image_url: url })}
              />
            </div>
            <div className="crud-form__group col-span-2">
              <label>Deskripsi / Keterangan</label>
              <textarea rows="3" value={sliderForm.description} onChange={(e) => setSliderForm({ ...sliderForm, description: e.target.value })} />
            </div>
            <div className="crud-form__group">
              <label>Link Tujuan URL (Opsional)</label>
              <input type="text" value={sliderForm.link} onChange={(e) => setSliderForm({ ...sliderForm, link: e.target.value })} />
            </div>
            <div className="crud-form__group">
              <label>Urutan Tampil (Sort Order)</label>
              <input type="number" value={sliderForm.sort_order} onChange={(e) => setSliderForm({ ...sliderForm, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="crud-form__group checkbox">
              <label className="checkbox-label">
                <input type="checkbox" checked={sliderForm.is_active} onChange={(e) => setSliderForm({ ...sliderForm, is_active: e.target.checked })} />
                Tampilkan Slider di Homepage (Aktif)
              </label>
            </div>
          </div>
          <div className="crud-form__actions">
            <button type="submit" className="crud-panel__btn crud-panel__btn--primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" className="crud-panel__btn crud-panel__btn--secondary" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
              Batal
            </button>
          </div>
        </form>
      )}

      {sliderPreview && (
        <div
          onClick={() => setSliderPreview(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.78)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.18s ease'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1e293b', borderRadius: '14px',
              padding: '20px', maxWidth: '90vw', maxHeight: '90vh',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              display: 'flex', flexDirection: 'column', gap: '14px',
              animation: 'slideUp 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <h3 style={{ margin: 0, color: '#f1f5f9', fontSize: '1rem', fontWeight: 600, maxWidth: '60vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <FaImage style={{ marginRight: 8, color: '#60a5fa' }} />{sliderPreview.title}
              </h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <a
                  href={sliderPreview.src}
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '7px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <FaExternalLinkAlt size={11} /> Buka Tab Baru
                </a>
                <button
                  type="button"
                  onClick={() => setSliderPreview(null)}
                  style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '7px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <FaTimes size={12} /> Tutup
                </button>
              </div>
            </div>
            <img
              src={sliderPreview.src}
              alt={sliderPreview.title}
              style={{
                maxWidth: '80vw', maxHeight: '72vh',
                objectFit: 'contain', borderRadius: '10px',
                border: '2px solid #334155', display: 'block'
              }}
              onError={e => { e.target.src = 'https://placehold.co/800x400?text=Gambar+Tidak+Tersedia'; }}
            />
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.75rem', textAlign: 'center' }}>
              Klik di luar gambar atau tombol Tutup untuk menutup preview
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
