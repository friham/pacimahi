import { useState, useRef } from 'react';
import axios from 'axios';
import { FaImage, FaUpload } from 'react-icons/fa';

import { API_URL, SERVER_URL } from '../config';

/**
 * Komponen upload gambar melalui file explorer (drag & drop / klik pilih file).
 * Props:
 * - value: string, image_url yang sedang tersimpan (bisa path relatif "/images/uploads/xxx.jpg" atau URL penuh)
 * - onChange: (image_url: string) => void, dipanggil dengan URL gambar baru setelah upload berhasil
 * - token: string, JWT token untuk autentikasi request upload
 * - label: string, label field yang ditampilkan
 */
function ImageUploader({ value, onChange, token, label = 'Gambar' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const previewSrc = value
    ? (value.startsWith('http') || value.startsWith('blob:') ? value : `${SERVER_URL}${value}`)
    : '';

  const uploadFile = async (file) => {
    if (!file) return;

    // Validasi tipe file di sisi client sebelum dikirim ke server
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format file harus JPG, PNG, GIF, atau WEBP.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB.');
      return;
    }

    setError('');
    setUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        onChange(res.data.data.image_url);
      } else {
        setError('Gagal mengunggah gambar.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengunggah gambar. Coba lagi.');
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
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="image-uploader__input"
          onChange={handleFileSelect}
        />

        {previewSrc ? (
          <img src={previewSrc} alt="Preview" className="image-uploader__preview" />
        ) : (
          <div className="image-uploader__placeholder">
            <FaImage />
          </div>
        )}

        <div className="image-uploader__info">
          <span className="image-uploader__title">
            <FaUpload style={{ marginRight: 6 }} />
            Klik atau seret gambar ke sini untuk mengunggah
          </span>
          <span className="image-uploader__hint">Format JPG, PNG, GIF, WEBP. Maks 5MB.</span>
          {fileName && !uploading && !error && (
            <span className="image-uploader__filename">{fileName}</span>
          )}
          {uploading && <span className="image-uploader__status image-uploader__status--uploading">Mengunggah gambar...</span>}
          {error && <span className="image-uploader__status image-uploader__status--error">{error}</span>}
          {!uploading && !error && value && (
            <span className="image-uploader__status image-uploader__status--success">Gambar siap digunakan ✓</span>
          )}
        </div>

        {value && !uploading && (
          <button type="button" className="image-uploader__remove" onClick={handleRemove}>
            Hapus
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
