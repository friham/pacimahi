import { useState, useRef } from 'react';
import axios from 'axios';
import { FaImage, FaUpload, FaCropAlt } from 'react-icons/fa';
import ImageCropModal from './ImageCropModal';

import { API_URL, SERVER_URL } from '../config';

/**
 * Komponen upload gambar melalui file explorer (drag & drop / klik pilih file)
 * dilengkapi dengan fitur potong / crop gambar interaktif sebelum dan sesudah diunggah.
 * Props:
 * - value: string, image_url yang sedang tersimpan (bisa path relatif "/images/uploads/xxx.jpg" atau URL penuh)
 * - onChange: (image_url: string) => void, dipanggil dengan URL gambar baru setelah upload berhasil
 * - token: string, JWT token untuk autentikasi request upload
 * - label: string, label field yang ditampilkan
 * - allowCrop: boolean, aktifkan fitur pemotong foto (default: true)
 */
function ImageUploader({ value, onChange, token, label = 'Gambar', allowCrop = true }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState('');
  const [pendingFile, setPendingFile] = useState(null);
  const inputRef = useRef(null);

  const previewSrc = value
    ? (value.startsWith('http') || value.startsWith('blob:') ? value : `${SERVER_URL}${value}`)
    : '';

  const uploadFile = async (file) => {
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format file harus JPG, PNG, GIF, atau WEBP.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file maksimal 10MB.');
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
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handlePendingFile = (file) => {
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format file harus JPG, PNG, GIF, atau WEBP.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file maksimal 10MB.');
      return;
    }

    setError('');

    if (!allowCrop) {
      uploadFile(file);
      return;
    }

    const objUrl = URL.createObjectURL(file);
    setPendingFile(file);
    setCropImageSrc(objUrl);
    setCropModalOpen(true);
  };

  const handleConfirmCrop = (croppedFile) => {
    setCropModalOpen(false);
    if (cropImageSrc && cropImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(cropImageSrc);
    }
    uploadFile(croppedFile);
  };

  const handleSkipCrop = () => {
    setCropModalOpen(false);
    if (cropImageSrc && cropImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(cropImageSrc);
    }
    if (pendingFile) {
      uploadFile(pendingFile);
    }
  };

  const handleCloseCrop = () => {
    setCropModalOpen(false);
    if (cropImageSrc && cropImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(cropImageSrc);
    }
    setPendingFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    handlePendingFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handlePendingFile(file);
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
          <div style={{ display: 'flex', gap: '6px', position: 'relative', zIndex: 2 }}>
            {allowCrop && (
              <button
                type="button"
                className="image-uploader__crop-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCropImageSrc(previewSrc);
                  setPendingFile(null);
                  setCropModalOpen(true);
                }}
                title="Potong ulang gambar ini"
              >
                <FaCropAlt style={{ marginRight: 4 }} /> Potong Ulang
              </button>
            )}
            <button type="button" className="image-uploader__remove" onClick={handleRemove}>
              Hapus
            </button>
          </div>
        )}
      </div>

      {allowCrop && (
        <ImageCropModal
          isOpen={cropModalOpen}
          imageSrc={cropImageSrc}
          fileName={fileName || pendingFile?.name || 'foto.jpg'}
          onClose={handleCloseCrop}
          onConfirmCrop={handleConfirmCrop}
          onSkipCrop={pendingFile ? handleSkipCrop : null}
        />
      )}
    </div>
  );
}

export default ImageUploader;
