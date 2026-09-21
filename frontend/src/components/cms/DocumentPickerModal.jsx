import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { FaTimes, FaSearch, FaUpload, FaTrash, FaFilePdf, FaSpinner } from 'react-icons/fa';
import './MediaLibraryModal.css';

import { API_URL } from '../../config';
import ConfirmModal from '../admin/ConfirmModal';

export default function DocumentPickerModal({ isOpen, onClose, onSelect, token }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    doc_title: '',
    doc_number: '',
    doc_date: '',
    description: ''
  });
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchDocuments = useCallback(async () => {
    if (!isOpen) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/documents`, {
        params: search ? { search } : {}
      });
      if (res.data.success) {
        setDocuments(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isOpen, search]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (!isOpen) return null;

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert('Pilih file dokumen terlebih dahulu!');
      return;
    }
    if (!uploadForm.doc_title) {
      alert('Judul dokumen wajib diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('doc_title', uploadForm.doc_title);
    formData.append('doc_number', uploadForm.doc_number);
    formData.append('doc_date', uploadForm.doc_date);
    formData.append('description', uploadForm.description);

    setUploading(true);
    try {
      const res = await axios.post(`${API_URL}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        setShowUploadForm(false);
        setUploadFile(null);
        setUploadForm({ doc_title: '', doc_number: '', doc_date: '', description: '' });
        fetchDocuments();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengunggah dokumen.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setDeleteTargetId(id);
  };

  const confirmDeleteDoc = async () => {
    if (!deleteTargetId) return;
    const id = deleteTargetId;
    setDeleteTargetId(null);
    try {
      await axios.delete(`${API_URL}/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (selectedDoc?.id === id) setSelectedDoc(null);
      fetchDocuments();
    } catch {
      alert('Gagal menghapus dokumen.');
    }
  };

  const handleConfirmSelect = () => {
    if (!selectedDoc) return;
    onSelect(selectedDoc);
    onClose();
  };

  return (
    <div className="media-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="media-modal" style={{ height: '80vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="media-modal__header">
          <div className="media-modal__header-title">
            <FaFilePdf style={{ color: '#dc2626' }} />
            <h3>Repositori Dokumen Pengadilan</h3>
          </div>
          <button type="button" className="media-modal__close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="media-modal__actions">
          <button 
            type="button" 
            className="media-upload-btn"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            <FaUpload /> <span>{showUploadForm ? 'Batal Unggah' : 'Upload Dokumen Baru'}</span>
          </button>

          <div className="media-search-box">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Cari nama / no dokumen..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {showUploadForm && (
          <form onSubmit={handleUploadSubmit} style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Judul Dokumen *</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  value={uploadForm.doc_title}
                  onChange={(e) => setUploadForm({ ...uploadForm, doc_title: e.target.value })}
                  placeholder="Contoh: SK Pembentukan Pengadilan"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Nomor Dokumen</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  value={uploadForm.doc_number}
                  onChange={(e) => setUploadForm({ ...uploadForm, doc_number: e.target.value })}
                  placeholder="Contoh: W10-A18/123/OT.01.3/I/2026"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Tanggal Dokumen</label>
                <input 
                  type="date" 
                  style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  value={uploadForm.doc_date}
                  onChange={(e) => setUploadForm({ ...uploadForm, doc_date: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Pilih File (PDF, DOCX, XLSX, ZIP) *</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                type="submit" 
                className="media-upload-btn"
                disabled={uploading}
              >
                {uploading ? <FaSpinner className="spin" /> : <FaUpload />} Simpan & Unggah
              </button>
            </div>
          </form>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {loading ? (
            <div className="media-loading">
              <FaSpinner className="spin text-emerald" size={28} />
              <p>Memuat daftar dokumen...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="media-empty">
              <FaFilePdf size={48} className="text-gray" />
              <p>Belum ada dokumen yang tersedia.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {documents.map((doc) => {
                const isSelected = selectedDoc?.id === doc.id;
                return (
                  <div 
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #0b4619' : '1px solid #e5e7eb',
                      background: isSelected ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <FaFilePdf size={28} style={{ color: '#dc2626' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{doc.doc_title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', gap: '12px', marginTop: '2px' }}>
                          {doc.doc_number && <span>No: {doc.doc_number}</span>}
                          {doc.doc_date && <span>Tgl: {doc.doc_date}</span>}
                          <span>({(doc.file_size / 1024).toFixed(1)} KB)</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        type="button" 
                        onClick={(e) => handleDelete(doc.id, e)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px' }}
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="media-modal__footer">
          <button type="button" className="media-cancel-btn" onClick={onClose}>
            Batal
          </button>
          {selectedDoc && (
            <button type="button" className="media-confirm-btn" onClick={handleConfirmSelect}>
              Pilih Dokumen Ini
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        show={Boolean(deleteTargetId)}
        title="Hapus Dokumen"
        message="Apakah Anda yakin ingin menghapus file dokumen ini dari pustaka?"
        confirmText="Ya, Hapus Dokumen"
        onConfirm={confirmDeleteDoc}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
