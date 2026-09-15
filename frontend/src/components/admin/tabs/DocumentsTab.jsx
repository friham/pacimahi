import React from 'react';
import {
  FaFilePdf,
  FaPlus,
  FaSave,
  FaSearch,
  FaDownload,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import DocumentUploader from '../../DocumentUploader';

export default function DocumentsTab({
  isAdding,
  setIsAdding,
  editingItem,
  setEditingItem,
  docForm,
  setDocForm,
  handleDocSubmit,
  loading,
  token,
  docSearch,
  setDocSearch,
  fetchDocuments,
  documents,
  SERVER_URL,
  deleteDocument
}) {
  return (
    <div className="cms-panel animate-fade-in-up">
      <div className="cms-panel__header">
        <div>
          <h2 className="cms-panel__title"><FaFilePdf /> Pustaka Dokumen</h2>
          <p className="cms-panel__subtitle">Kelola dokumen resmi: SK, Peraturan, Laporan, dan file publik lainnya.</p>
        </div>
        <button
          className="cms-btn cms-btn--primary"
          onClick={() => {
            setIsAdding(true);
            setEditingItem(null);
            setDocForm({ doc_title: '', doc_number: '', doc_date: '', description: '', file_url: '' });
          }}
        >
          <FaPlus /> Tambah Dokumen
        </button>
      </div>

      {isAdding && (
        <div className="cms-form-card animate-fade-in-down">
          <h3 className="cms-form-card__title">{editingItem ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}</h3>
          <form onSubmit={handleDocSubmit}>
            <div className="cms-form-grid">
              <div className="cms-form-group cms-form-group--full">
                <label>Judul Dokumen *</label>
                <input
                  type="text"
                  value={docForm.doc_title}
                  required
                  onChange={e => setDocForm(prev => ({ ...prev, doc_title: e.target.value }))}
                  placeholder="Contoh: SK Pembentukan Pengadilan Agama Kota Cimahi"
                />
              </div>
              <div className="cms-form-group">
                <label>Nomor Dokumen</label>
                <input
                  type="text"
                  value={docForm.doc_number}
                  onChange={e => setDocForm(prev => ({ ...prev, doc_number: e.target.value }))}
                  placeholder="Mis. 001/SK/2024"
                />
              </div>
              <div className="cms-form-group">
                <label>Tanggal Dokumen</label>
                <input
                  type="date"
                  value={docForm.doc_date}
                  onChange={e => setDocForm(prev => ({ ...prev, doc_date: e.target.value }))}
                />
              </div>
              <div className="cms-form-group cms-form-group--full">
                <label>Deskripsi</label>
                <textarea
                  rows="2"
                  value={docForm.description}
                  onChange={e => setDocForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Keterangan singkat dokumen..."
                />
              </div>
              <div className="cms-form-group cms-form-group--full">
                <DocumentUploader
                  label="Upload File Dokumen (PDF/DOC/DOCX/XLS/XLSX/ZIP) *"
                  value={docForm.file_url}
                  token={token}
                  onChange={(url) => setDocForm(prev => ({ ...prev, file_url: url }))}
                />
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
                <FaSave /> {loading ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Dokumen'}
              </button>
            </div>
          </form>
        </div>
      )}

      {!isAdding && (
        <div className="cms-filter-row">
          <div className="cms-search-box">
            <FaSearch className="cms-search-box__icon" />
            <input
              type="text"
              placeholder="Cari dokumen berdasarkan judul atau nomor..."
              value={docSearch}
              onChange={e => setDocSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchDocuments()}
            />
            <button className="cms-search-box__btn" onClick={fetchDocuments}>Cari</button>
          </div>
          <span className="cms-count-badge">{documents.length} dokumen</span>
        </div>
      )}

      {!isAdding && (
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Judul Dokumen</th>
                <th>Nomor</th>
                <th>Tanggal</th>
                <th>File</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr><td colSpan="5" className="cms-table__empty">Belum ada dokumen. Klik "Tambah Dokumen" untuk mulai.</td></tr>
              ) : documents.map(doc => (
                <tr key={doc.id}>
                  <td className="cms-table__bold">
                    {doc.doc_title}
                    {doc.description && <small className="cms-table__sub">{doc.description}</small>}
                  </td>
                  <td>{doc.doc_number || <span className="cms-muted">—</span>}</td>
                  <td className="cms-muted">{doc.doc_date ? new Date(doc.doc_date).toLocaleDateString('id-ID') : '—'}</td>
                  <td>
                    <a
                      href={`${SERVER_URL}${doc.file_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="cms-btn cms-btn--sm cms-btn--download"
                    >
                      <FaDownload /> Download
                    </a>
                  </td>
                  <td>
                    <div className="cms-table-actions">
                      <button
                        className="cms-btn cms-btn--icon cms-btn--edit"
                        title="Edit"
                        onClick={() => {
                          setEditingItem(doc);
                          setDocForm({
                            doc_title: doc.doc_title,
                            doc_number: doc.doc_number || '',
                            doc_date: doc.doc_date ? doc.doc_date.split('T')[0] : '',
                            description: doc.description || '',
                            file_url: doc.file_url
                          });
                          setIsAdding(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="cms-btn cms-btn--icon cms-btn--delete"
                        title="Hapus"
                        onClick={() => deleteDocument(doc.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
