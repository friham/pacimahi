import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function ServicesTab({
  services,
  isAdding,
  setIsAdding,
  editingItem,
  setEditingItem,
  serviceForm,
  setServiceForm,
  handleServiceSubmit,
  deleteService,
  loading
}) {
  return (
    <div className="crud-panel">
      {!isAdding && !editingItem ? (
        <>
          <div className="crud-panel__actions">
            <button className="crud-panel__btn crud-panel__btn--primary" onClick={() => setIsAdding(true)}>
              <FaPlus /> Tambah Layanan Baru
            </button>
          </div>

          <div className="crud-table-wrapper">
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Sort</th>
                  <th>Ikon</th>
                  <th>Nama Layanan</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Tidak ada data layanan.</td></tr>
                ) : (
                  services.map((s) => (
                    <tr key={s.id}>
                      <td>{s.sort_order}</td>
                      <td className="crud-table__icon-cell">{s.icon}</td>
                      <td className="crud-table__bold">{s.name}</td>
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
                            setServiceForm({ ...s, is_active: s.is_active === 1 || s.is_active === true });
                          }}>
                            <FaEdit />
                          </button>
                          <button className="crud-actions__btn crud-actions__btn--delete" onClick={() => deleteService(s.id)}>
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
        <form onSubmit={handleServiceSubmit} className="crud-form">
          <h2 className="crud-form__title">{editingItem ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
          <div className="crud-form__grid">
            <div className="crud-form__group">
              <label>Nama Layanan *</label>
              <input type="text" value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} required />
            </div>
            <div className="crud-form__group">
              <label>Nama Ikon React Icons (misal: FaSearch, FaLaptop, FaCalendarAlt) *</label>
              <input type="text" value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} required />
            </div>
            <div className="crud-form__group col-span-2">
              <label>Keterangan Layanan</label>
              <textarea rows="3" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} />
            </div>
            <div className="crud-form__group">
              <label>Link Akses Layanan</label>
              <input type="text" value={serviceForm.link} onChange={(e) => setServiceForm({ ...serviceForm, link: e.target.value })} />
            </div>
            <div className="crud-form__group">
              <label>Urutan Urut (Sort Order)</label>
              <input type="number" value={serviceForm.sort_order} onChange={(e) => setServiceForm({ ...serviceForm, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="crud-form__group checkbox">
              <label className="checkbox-label">
                <input type="checkbox" checked={serviceForm.is_active} onChange={(e) => setServiceForm({ ...serviceForm, is_active: e.target.checked })} />
                Aktifkan Layanan di Homepage
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
