import { useState, useRef } from 'react';
import axios from 'axios';
import { FaFilePdf, FaFileImage, FaUpload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import { API_URL, SERVER_URL } from '../config';

/**
 * Komponen upload dokumen (PDF & Gambar) untuk Admin Panel.
 * Props:
 * - value: string, URL file (misal /documents/123-file.pdf atau /images/uploads/123-img.jpg)
 * - onChange: (fileUrl: string) => void
 * - token: string, JWT Token auth
 * - label: string
 * - acceptTypes: string, default 'application/pdf,image/jpeg,image/png,image/webp'
 */
function DocumentUploader({
  value,
  onChange,
  token,
  label = 'Lampiran File / Dokumen (PDF / Gambar)',
  acceptTypes = 'application/pdf,image/jpeg,image/jpg,image/png,image/webp'
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const fileSrc = value
    ? (value.startsWith('http') || value.startsWith('blob:') ? value : `${SERVER_URL}${value}`)
    : '';

  const isPdf = value ? value.toLowerCase().endsWith('.pdf') : false;

  const uploadFile = async (file) => {
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setError('Ukuran file maksimal 20MB.');
      return;
    }

    setError('');
    setUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('document', file);

      const res = await axios.post(`${API_URL}/upload/document`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        onChange(res.data.data.file_url);
      } else {
        setError('Gagal mengunggah file.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengunggah file. Coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    uploadFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    uploadFile(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
    setFileName('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="image-uploader">
      <label>{label}</label>
      <div
        className={`image-uploader__dropzone ${isDragging ? 'is-dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{ minHeight: '140px' }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptTypes}
          className="image-uploader__input"
          onChange={handleFileSelect}
        />

        {value ? (
          isPdf ? (
            <div style={{ textAlign: 'center', color: '#e11d48', padding: '10px' }}>
              <FaFilePdf size={42} />
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginTop: '4px' }}>
                Dokumen PDF
              </div>
            </div>
          ) : (
            <img src={fileSrc} alt="Preview" className="image-uploader__preview" />
          )
        ) : (
          <div className="image-uploader__placeholder" style={{ display: 'flex', gap: '8px' }}>
            <FaFilePdf size={28} style={{ color: '#e11d48' }} />
            <FaFileImage size={28} style={{ color: '#16a34a' }} />
          </div>
        )}

        <div className="image-uploader__info">
          <span className="image-uploader__title">
            <FaUpload style={{ marginRight: 6 }} />
            Klik atau seret file PDF / Gambar ke sini
          </span>
          <span className="image-uploader__hint">Format PDF, JPG, PNG, WEBP. Maksimal 20MB.</span>
          {fileName && !uploading && !error && (
            <span className="image-uploader__filename">{fileName}</span>
          )}
          {uploading && <span className="image-uploader__status image-uploader__status--uploading">Mengunggah file...</span>}
          {error && <span className="image-uploader__status image-uploader__status--error"><FaExclamationCircle /> {error}</span>}
          {!uploading && !error && value && (
            <span className="image-uploader__status image-uploader__status--success">
              <FaCheckCircle style={{ marginRight: 4 }} /> File tersimpan ({isPdf ? 'PDF' : 'Gambar'})
            </span>
          )}
        </div>

        {value && !uploading && (
          <div style={{ display: 'flex', gap: '6px', position: 'absolute', right: '12px', top: '12px' }}>
            <a
              href={fileSrc}
              target="_blank"
              rel="noreferrer"
              className="crud-panel__btn"
              style={{ padding: '4px 10px', fontSize: '0.75rem', textDecoration: 'none', background: '#3b82f6', color: '#fff' }}
              onClick={(e) => e.stopPropagation()}
            >
              Lihat
            </a>
            <button type="button" className="image-uploader__remove" style={{ position: 'static' }} onClick={handleRemove}>
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentUploader;
