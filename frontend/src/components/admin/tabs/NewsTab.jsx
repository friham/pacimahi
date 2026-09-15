import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import DocumentUploader from '../../DocumentUploader';

export default function NewsTab({
  news,
  isAdding,
  setIsAdding,
  editingItem,
  setEditingItem,
  newsForm,
  setNewsForm,
  handleNewsSubmit,
  deleteNews,
  token,
  loading
}) {
  return (
    <div className="crud-panel">
      {!isAdding && !editingItem ? (
        <>
          <div className="crud-panel__actions">
            <button className="crud-panel__btn crud-panel__btn--primary" onClick={() => setIsAdding(true)}>
              <FaPlus /> Tulis Berita Baru
            </button>
          </div>

          <div className="crud-table-wrapper">
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th>Status Publikasi</th>
                  <th>Tanggal Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {news.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Tidak ada data berita/pengumuman.</td></tr>
                ) : (
                  news.map((n) => (
                    <tr key={n.id}>
                      <td>
                        <span className="crud-badge crud-badge--category">{n.category}</span>
                      </td>
                      <td className="crud-table__bold">{n.title}</td>
                      <td>{n.author_name || 'Admin'}</td>
                      <td>
                        <span className={`crud-badge ${n.is_published ? 'crud-badge--active' : 'crud-badge--inactive'}`}>
                          {n.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>{new Date(n.created_at).toLocaleDateString('id-ID')}</td>
                      <td>
                        <div className="crud-actions">
                          <button className="crud-actions__btn crud-actions__btn--edit" onClick={() => {
                            setEditingItem(n);
                            setNewsForm({ ...n, is_published: n.is_published === 1 || n.is_published === true });
                          }}>
                            <FaEdit />
                          </button>
                          <button className="crud-actions__btn crud-actions__btn--delete" onClick={() => deleteNews(n.id)}>
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
        <form onSubmit={handleNewsSubmit} className="crud-form">
          <h2 className="crud-form__title">{editingItem ? 'Edit Berita / Pengumuman' : 'Tulis Berita Baru'}</h2>
          <div className="crud-form__grid">
            <div className="crud-form__group col-span-2">
              <label>Judul Berita *</label>
              <input type="text" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} required />
            </div>
            <div className="crud-form__group">
              <label>Kategori</label>
              <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}>
                <option value="berita">Berita</option>
                <option value="pengumuman">Pengumuman</option>
                <option value="artikel">Artikel</option>
              </select>
            </div>
            <div className="crud-form__group col-span-2">
              <DocumentUploader
                label="Lampiran File Berita / Dokumen PDF / Gambar *"
                value={newsForm.image_url}
                token={token}
                onChange={(url) => setNewsForm({ ...newsForm, image_url: url })}
              />
            </div>
            <div className="crud-form__group col-span-2">
              <label>Isi Konten Berita *</label>
              <textarea rows="8" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} required />
            </div>
            <div className="crud-form__group checkbox">
              <label className="checkbox-label">
                <input type="checkbox" checked={newsForm.is_published} onChange={(e) => setNewsForm({ ...newsForm, is_published: e.target.checked })} />
                Publikasikan Berita Ini di Homepage
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
    </div>
  );
}
