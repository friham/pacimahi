import React from 'react';
import {
  FaImages,
  FaFileUpload,
  FaImage,
  FaSearch,
  FaCopy,
  FaTrash
} from 'react-icons/fa';

export default function MediaTab({
  mediaUploadFile,
  setMediaUploadFile,
  mediaAltText,
  setMediaAltText,
  mediaCaption,
  setMediaCaption,
  mediaUploading,
  handleMediaUpload,
  mediaFileRef,
  mediaSearch,
  setMediaSearch,
  fetchMedia,
  mediaList,
  SERVER_URL,
  copyToClipboard,
  deleteMedia
}) {
  return (
    <div className="cms-panel animate-fade-in-up">
      <div className="cms-panel__header">
        <div>
          <h2 className="cms-panel__title"><FaImages /> Media Library</h2>
          <p className="cms-panel__subtitle">Kelola semua gambar & aset visual yang diunggah ke website.</p>
        </div>
      </div>

      <div className="cms-media-upload-card">
        <h3 className="cms-media-upload-card__title"><FaFileUpload /> Unggah Gambar Baru</h3>
        <form onSubmit={handleMediaUpload} className="cms-media-upload-form">
          <div className="cms-media-drop-zone" onClick={() => mediaFileRef.current?.click()}>
            {mediaUploadFile ? (
              <div className="cms-media-drop-zone__preview">
                <img src={URL.createObjectURL(mediaUploadFile)} alt="preview" />
                <span>{mediaUploadFile.name}</span>
              </div>
            ) : (
              <>
                <FaImage className="cms-media-drop-zone__icon" />
                <p>Klik atau seret gambar ke sini</p>
                <small>JPG, PNG, WEBP, SVG — Maks. 5MB</small>
              </>
            )}
            <input
              ref={mediaFileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => { if (e.target.files[0]) setMediaUploadFile(e.target.files[0]); }}
            />
          </div>
          <div className="cms-form-grid">
            <div className="cms-form-group">
              <label>Alt Text (SEO)</label>
              <input
                type="text"
                value={mediaAltText}
                onChange={e => setMediaAltText(e.target.value)}
                placeholder="Deskripsi gambar untuk SEO & aksesibilitas"
              />
            </div>
            <div className="cms-form-group">
              <label>Caption (Opsional)</label>
              <input
                type="text"
                value={mediaCaption}
                onChange={e => setMediaCaption(e.target.value)}
                placeholder="Keterangan gambar"
              />
            </div>
          </div>
          <button type="submit" className="cms-btn cms-btn--primary" disabled={mediaUploading || !mediaUploadFile}>
            <FaFileUpload /> {mediaUploading ? 'Mengunggah...' : 'Unggah ke Library'}
          </button>
        </form>
      </div>

      <div className="cms-filter-row">
        <div className="cms-search-box">
          <FaSearch className="cms-search-box__icon" />
          <input
            type="text"
            placeholder="Cari file berdasarkan nama atau alt text..."
            value={mediaSearch}
            onChange={e => setMediaSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchMedia()}
          />
          <button className="cms-search-box__btn" onClick={fetchMedia}>Cari</button>
        </div>
        <span className="cms-count-badge">{mediaList.length} file</span>
      </div>

      <div className="cms-media-grid">
        {mediaList.length === 0 ? (
          <div className="cms-empty-state">
            <FaImages className="cms-empty-state__icon" />
            <p>Belum ada media. Unggah gambar di atas.</p>
          </div>
        ) : mediaList.map(item => (
          <div key={item.id} className="cms-media-card">
            <div className="cms-media-card__img-wrap">
              <img
                src={`${SERVER_URL}${item.file_url}`}
                alt={item.alt_text}
                onError={e => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="90"><rect fill="%23f1f5f9" width="120" height="90"/><text x="50%" y="50%" font-size="12" fill="%2394a3b8" text-anchor="middle" dy=".35em">No Image</text></svg>';
                }}
              />
              <div className="cms-media-card__overlay">
                <button
                  className="cms-media-card__action-btn"
                  title="Salin URL"
                  onClick={() => copyToClipboard(`${SERVER_URL}${item.file_url}`)}
                >
                  <FaCopy />
                </button>
                <button
                  className="cms-media-card__action-btn cms-media-card__action-btn--delete"
                  title="Hapus"
                  onClick={() => deleteMedia(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="cms-media-card__info">
              <p className="cms-media-card__name">{item.original_name}</p>
              <p className="cms-media-card__meta">{(item.file_size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
