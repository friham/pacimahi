import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { FaTimes, FaSearch, FaUpload, FaTrash, FaCheck, FaCopy, FaImage, FaFilm, FaSpinner } from 'react-icons/fa';
import './MediaLibraryModal.css';

import { API_URL, SERVER_URL } from '../../config';

export default function MediaLibraryModal({ isOpen, onClose, onSelect, token }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // all, image, video
  const [copiedId, setCopiedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const fetchMedia = useCallback(async () => {
    if (!isOpen) return;
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (activeTab === 'image') params.type = 'image';
      if (activeTab === 'video') params.type = 'video';

      const res = await axios.get(`${API_URL}/media`, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.data.success) {
        setMediaList(res.data.data || []);
      }
    } catch (err) {
      console.error('Fetch media error:', err);
    } finally {
      setLoading(false);
    }
  }, [isOpen, search, activeTab, token]);

  useEffect(() => {
    let isSubscribed = true;

    if (!isOpen) {
      setMediaList([]);
      setSelectedItem(null);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (activeTab === 'image') params.type = 'image';
        if (activeTab === 'video') params.type = 'video';

        const res = await axios.get(`${API_URL}/media`, {
          params,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (isSubscribed && res.data.success) {
          setMediaList(res.data.data || []);
        }
      } catch (err) {
        if (isSubscribed) {
          console.error('Fetch media error:', err);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [isOpen, search, activeTab, token]);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt_text', file.name);

    setUploading(true);
    setErrorMsg('');
    try {
      const res = await axios.post(`${API_URL}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        fetchMedia();
        setSelectedItem(res.data.data);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Gagal mengunggah file.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Yakin ingin menghapus file ini dari Media Library?')) return;
    try {
      await axios.delete(`${API_URL}/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (selectedItem?.id === id) setSelectedItem(null);
      fetchMedia();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus file.');
    }
  };

  const handleCopyUrl = (url, id, e) => {
    e?.stopPropagation();
    const fullUrl = url.startsWith('/') ? `${SERVER_URL}${url}` : url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConfirmSelect = () => {
    if (!selectedItem) return;
    const fullUrl = selectedItem.file_url.startsWith('/') 
      ? `${SERVER_URL}${selectedItem.file_url}` 
      : selectedItem.file_url;
    onSelect(fullUrl, selectedItem.alt_text || selectedItem.original_name, selectedItem);
    onClose();
  };

  return (
    <div className="media-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="media-modal" onClick={(e) => e.stopPropagation()}>
        <div className="media-modal__header">
          <div className="media-modal__header-title">
            <FaImage className="text-emerald" />
            <h3>Media Library Pengadilan</h3>
          </div>
          <button type="button" className="media-modal__close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="media-modal__actions">
          <div className="media-modal__tabs">
            <button 
              type="button" 
              className={`media-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Semua File
            </button>
            <button 
              type="button" 
              className={`media-tab-btn ${activeTab === 'image' ? 'active' : ''}`}
              onClick={() => setActiveTab('image')}
            >
              Gambar
            </button>
            <button 
              type="button" 
              className={`media-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              Video
            </button>
          </div>

          <div className="media-modal__controls">
            <div className="media-search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Cari file media..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4" 
              onChange={handleFileUpload}
            />
            <button 
              type="button" 
              className="media-upload-btn" 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? <FaSpinner className="spin" /> : <FaUpload />}
              <span>{uploading ? 'Mengunggah...' : 'Upload File'}</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="media-modal__alert error">
            {errorMsg}
          </div>
        )}

        <div className="media-modal__body">
          <div className="media-grid-container">
            {loading ? (
              <div className="media-loading">
                <FaSpinner className="spin text-emerald" size={28} />
                <p>Memuat media library...</p>
              </div>
            ) : mediaList.length === 0 ? (
              <div className="media-empty">
                <FaImage size={48} className="text-gray" />
                <p>Belum ada media yang diunggah.</p>
                <button 
                  type="button" 
                  className="media-upload-btn outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaUpload /> Upload Sekarang
                </button>
              </div>
            ) : (
              <div className="media-grid">
                {mediaList.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  const isImg = item.mime_type?.startsWith('image/');
                  const fullUrl = item.file_url.startsWith('/') ? `${SERVER_URL}${item.file_url}` : item.file_url;

                  return (
                    <div 
                      key={item.id} 
                      className={`media-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="media-card__preview">
                        {isImg ? (
                          <img src={fullUrl} alt={item.alt_text || item.original_name} loading="lazy" />
                        ) : (
                          <div className="media-card__video-ph">
                            <FaFilm size={32} />
                          </div>
                        )}
                        {isSelected && (
                          <div className="media-card__check">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                      <div className="media-card__footer">
                        <span className="media-card__name" title={item.original_name}>
                          {item.original_name}
                        </span>
                        <div className="media-card__actions">
                          <button 
                            type="button" 
                            title="Salin URL"
                            onClick={(e) => handleCopyUrl(item.file_url, item.id, e)}
                          >
                            {copiedId === item.id ? <FaCheck style={{ color: '#16a34a' }} /> : <FaCopy />}
                          </button>
                          <button 
                            type="button" 
                            title="Hapus Media"
                            className="danger"
                            onClick={(e) => handleDelete(item.id, e)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedItem && (
            <div className="media-details-sidebar">
              <h4>Detail Berkas</h4>
              <div className="media-details__preview">
                {selectedItem.mime_type?.startsWith('image/') ? (
                  <img 
                    src={selectedItem.file_url.startsWith('/') ? `${SERVER_URL}${selectedItem.file_url}` : selectedItem.file_url} 
                    alt={selectedItem.original_name} 
                  />
                ) : (
                  <FaFilm size={48} className="text-gray" />
                )}
              </div>
              <div className="media-details__info">
                <p><strong>Nama:</strong> {selectedItem.original_name}</p>
                <p><strong>Ukuran:</strong> {(selectedItem.file_size / 1024).toFixed(1)} KB</p>
                <p><strong>Tipe:</strong> {selectedItem.mime_type}</p>
                <p><strong>Tanggal:</strong> {new Date(selectedItem.created_at).toLocaleDateString('id-ID')}</p>
              </div>

              <div className="media-details__form">
                <label>Alt Text / Deskripsi:</label>
                <input 
                  type="text" 
                  value={selectedItem.alt_text || ''} 
                  onChange={(e) => setSelectedItem({ ...selectedItem, alt_text: e.target.value })}
                  placeholder="Alt text untuk aksesibilitas..."
                />
              </div>

              <button 
                type="button" 
                className="media-select-btn"
                onClick={handleConfirmSelect}
              >
                Gunakan Berkas Ini
              </button>
            </div>
          )}
        </div>

        <div className="media-modal__footer">
          <button type="button" className="media-cancel-btn" onClick={onClose}>
            Tutup
          </button>
          {onSelect && selectedItem && (
            <button type="button" className="media-confirm-btn" onClick={handleConfirmSelect}>
              Sisipkan ke Konten
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
