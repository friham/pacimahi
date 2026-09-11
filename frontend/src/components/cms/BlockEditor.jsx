import { useState } from 'react';
import { 
  FaPlus, FaTrash, FaCopy, FaChevronUp, FaChevronDown, 
  FaGripVertical, FaHeading, FaParagraph, FaImage, FaImages, 
  FaVideo, FaMousePointer, FaLink, FaFilePdf, FaTable, FaQuoteRight, 
  FaListUl, FaCode, FaMapMarkerAlt, FaMinus, FaEye, FaAngleDown, FaAngleRight
} from 'react-icons/fa';
import MediaLibraryModal from './MediaLibraryModal';
import DocumentPickerModal from './DocumentPickerModal';
import RichTextEditor from './RichTextEditor';
import { SERVER_URL } from '../../config';
import './BlockEditor.css';

const BLOCK_TYPES = [
  { type: 'heading', label: 'Heading', icon: FaHeading, desc: 'Judul seksi H1-H4' },
  { type: 'text', label: 'Teks Paragraf', icon: FaParagraph, desc: 'Teks dan format kaya' },
  { type: 'image', label: 'Gambar', icon: FaImage, desc: 'Foto tunggal dengan caption' },
  { type: 'gallery', label: 'Galeri Foto', icon: FaImages, desc: 'Kumpulan beberapa gambar' },
  { type: 'video', label: 'Video', icon: FaVideo, desc: 'Video YouTube/Vimeo/MP4' },
  { type: 'button', label: 'Tombol Aksi', icon: FaMousePointer, desc: 'Tombol tautan dinamis' },
  { type: 'link', label: 'Tautan / Link', icon: FaLink, desc: 'Link internal / eksternal' },
  { type: 'document', label: 'File Download', icon: FaFilePdf, desc: 'Dokumen SK / SOP unduh' },
  { type: 'table', label: 'Tabel Data', icon: FaTable, desc: 'Tabel baris dan kolom' },
  { type: 'quote', label: 'Kutipan / Quote', icon: FaQuoteRight, desc: 'Pernyataan resmi pimpinan' },
  { type: 'accordion', label: 'Akordion (FAQ)', icon: FaListUl, desc: 'Item buka-tutup lipat' },
  { type: 'maps', label: 'Google Maps', icon: FaMapMarkerAlt, desc: 'Peta lokasi kantor' },
  { type: 'embed', label: 'Embed Iframe', icon: FaCode, desc: 'Widget pihak ketiga' },
  { type: 'html', label: 'HTML Kustom', icon: FaCode, desc: 'Kode HTML/JS khusus' },
  { type: 'divider', label: 'Pemisah / Garis', icon: FaMinus, desc: 'Garis pemisah seksi' }
];

export default function BlockEditor({ blocks = [], onChange, token }) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  // Modals state
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaTargetCallback, setMediaTargetCallback] = useState(null);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docTargetCallback, setDocTargetCallback] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedBlocks(prev => ({
      ...prev,
      [idx]: prev[idx] === undefined ? false : !prev[idx] // default expanded if undefined
    }));
  };

  const isExpanded = (idx) => {
    return expandedBlocks[idx] !== false;
  };

  // Add block
  const handleAddBlock = (type) => {
    let initialContent = {};
    let initialSettings = {};

    switch (type) {
      case 'heading':
        initialContent = { text: 'Judul Seksi Baru', level: 'h2' };
        initialSettings = { align: 'left' };
        break;
      case 'text':
        initialContent = { html: '<p>Tuliskan informasi atau uraian di sini...</p>' };
        break;
      case 'image':
        initialContent = { url: '', alt: '', caption: '' };
        initialSettings = { align: 'center', width: '100%' };
        break;
      case 'gallery':
        initialContent = { images: [] };
        initialSettings = { columns: 3 };
        break;
      case 'video':
        initialContent = { title: '', url: '', caption: '' };
        break;
      case 'button':
        initialContent = { text: 'Lihat Selengkapnya', url: '#', open_new_tab: false };
        initialSettings = { align: 'left', variant: 'primary' };
        break;
      case 'link':
        initialContent = { text: 'Tautan Resmi', url: '#', open_new_tab: true, rel: 'noopener' };
        break;
      case 'document':
        initialContent = { doc_title: 'Surat Keputusan Pengadilan', doc_number: '', doc_date: '', file_url: '', file_size: 0, description: '' };
        break;
      case 'table':
        initialContent = {
          headers: ['No', 'Uraian', 'Keterangan'],
          rows: [
            ['1', 'Data Baris 1', 'Lengkap'],
            ['2', 'Data Baris 2', 'Sesuai Standar']
          ]
        };
        break;
      case 'quote':
        initialContent = { quote: 'Keadilan yang transparan adalah amanah bersama.', author: 'Ketua Pengadilan' };
        break;
      case 'accordion':
        initialContent = {
          items: [
            { title: 'Pertanyaan atau Tahapan Pertama', content: 'Uraian lengkap untuk bagian ini.' },
            { title: 'Pertanyaan atau Tahapan Kedua', content: 'Uraian lanjutan untuk bagian ini.' }
          ]
        };
        break;
      case 'maps':
        initialContent = { title: 'Lokasi Kantor', url: '' };
        break;
      case 'embed':
      case 'html':
        initialContent = { html: '<div><!-- Masukkan kode HTML di sini --></div>' };
        break;
      case 'divider':
        initialSettings = { style: 'simple' };
        break;
      default:
        break;
    }

    const newBlock = {
      id: `block-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      type,
      content: initialContent,
      settings: initialSettings,
      sort_order: blocks.length + 1
    };

    const nextBlocks = [...blocks, newBlock];
    onChange(nextBlocks);
    setShowAddMenu(false);
  };

  // Update block content or settings
  const updateBlock = (index, field, value) => {
    const nextBlocks = [...blocks];
    nextBlocks[index] = {
      ...nextBlocks[index],
      [field]: value
    };
    onChange(nextBlocks);
  };

  // Delete block
  const deleteBlock = (index) => {
    if (!window.confirm('Hapus block ini?')) return;
    const nextBlocks = blocks.filter((_, i) => i !== index);
    onChange(nextBlocks);
  };

  // Duplicate block
  const duplicateBlock = (index) => {
    const item = blocks[index];
    const cloned = {
      ...item,
      id: `block-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      content: JSON.parse(JSON.stringify(item.content || {})),
      settings: JSON.parse(JSON.stringify(item.settings || {}))
    };
    const nextBlocks = [...blocks];
    nextBlocks.splice(index + 1, 0, cloned);
    onChange(nextBlocks);
  };

  // Move Up / Down
  const moveBlock = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= blocks.length) return;
    const nextBlocks = [...blocks];
    const [moved] = nextBlocks.splice(fromIndex, 1);
    nextBlocks.splice(toIndex, 0, moved);
    onChange(nextBlocks);
  };

  // HTML5 Drag & Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dropTargetIndex !== index) {
      setDropTargetIndex(index);
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      moveBlock(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  // Helpers to trigger modals
  const openMediaPickerFor = (callback) => {
    setMediaTargetCallback(() => callback);
    setMediaModalOpen(true);
  };

  const openDocPickerFor = (callback) => {
    setDocTargetCallback(() => callback);
    setDocModalOpen(true);
  };

  return (
    <div className="cms-block-editor">
      {/* Block List */}
      <div className="cms-block-list">
        {blocks.length === 0 ? (
          <div className="cms-block-empty">
            <p>Halaman ini belum memiliki konten block. Klik tombol di bawah untuk mulai menambahkan konten.</p>
          </div>
        ) : (
          blocks.map((block, index) => {
            const blockMeta = BLOCK_TYPES.find(b => b.type === block.type) || { label: block.type, icon: FaParagraph };
            const Icon = blockMeta.icon;
            const expanded = isExpanded(index);
            const isDragging = draggedIndex === index;
            const isDropTarget = dropTargetIndex === index;

            return (
              <div 
                key={block.id || index}
                className={`cms-block-card ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}`}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                {/* Block Header */}
                <div className="cms-block-card__header">
                  <div 
                    className="cms-block-card__drag-handle" 
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    title="Drag & drop untuk ubah urutan"
                  >
                    <FaGripVertical />
                  </div>

                  <div className="cms-block-card__type-badge" onClick={() => toggleExpand(index)}>
                    <Icon className="cms-block-card__icon" />
                    <span className="cms-block-card__type-label">{blockMeta.label}</span>
                    <span className="cms-block-card__order">#{index + 1}</span>
                  </div>

                  <div className="cms-block-card__header-preview" onClick={() => toggleExpand(index)}>
                    {block.type === 'heading' && <span>{block.content?.text || ''}</span>}
                    {block.type === 'image' && <span>{block.content?.caption || block.content?.alt || 'Gambar'}</span>}
                    {block.type === 'video' && <span>{block.content?.title || block.content?.url || 'Video'}</span>}
                    {block.type === 'document' && <span>{block.content?.doc_title || 'File Dokumen'}</span>}
                    {block.type === 'button' && <span>{block.content?.text || 'Tombol'}</span>}
                  </div>

                  <div className="cms-block-card__actions">
                    <button 
                      type="button" 
                      onClick={() => moveBlock(index, index - 1)} 
                      disabled={index === 0} 
                      title="Pindah ke Atas"
                    >
                      <FaChevronUp />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => moveBlock(index, index + 1)} 
                      disabled={index === blocks.length - 1} 
                      title="Pindah ke Bawah"
                    >
                      <FaChevronDown />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => duplicateBlock(index)} 
                      title="Duplikat Block"
                    >
                      <FaCopy />
                    </button>
                    <button 
                      type="button" 
                      className="danger" 
                      onClick={() => deleteBlock(index)} 
                      title="Hapus Block"
                    >
                      <FaTrash />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => toggleExpand(index)} 
                      title={expanded ? "Ciutkan" : "Bentangkan"}
                    >
                      {expanded ? <FaAngleDown /> : <FaAngleRight />}
                    </button>
                  </div>
                </div>

                {/* Block Body (Editable Fields) */}
                {expanded && (
                  <div className="cms-block-card__body animate-fade-in">
                    {/* HEADING BLOCK */}
                    {block.type === 'heading' && (
                      <div className="cms-field-grid">
                        <div className="cms-field-group" style={{ flex: 3 }}>
                          <label>Teks Heading:</label>
                          <input 
                            type="text" 
                            value={block.content?.text || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, text: e.target.value })}
                            placeholder="Ketik judul seksi..."
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 1 }}>
                          <label>Level:</label>
                          <select 
                            value={block.content?.level || 'h2'}
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, level: e.target.value })}
                          >
                            <option value="h1">H1 (Judul Utama)</option>
                            <option value="h2">H2 (Subjudul Besar)</option>
                            <option value="h3">H3 (Subjudul Sedang)</option>
                            <option value="h4">H4 (Subjudul Kecil)</option>
                          </select>
                        </div>
                        <div className="cms-field-group" style={{ flex: 1 }}>
                          <label>Perataan:</label>
                          <select 
                            value={block.settings?.align || 'left'}
                            onChange={(e) => updateBlock(index, 'settings', { ...block.settings, align: e.target.value })}
                          >
                            <option value="left">Kiri</option>
                            <option value="center">Tengah</option>
                            <option value="right">Kanan</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* TEXT BLOCK */}
                    {block.type === 'text' && (
                      <div className="cms-field-group">
                        <label>Konten Teks (Rich WYSIWYG Editor):</label>
                        <RichTextEditor 
                          value={block.content?.html || block.content?.text || ''}
                          onChange={(val) => updateBlock(index, 'content', { ...block.content, html: val })}
                          onOpenMediaLibrary={(cb) => openMediaPickerFor(cb)}
                        />
                      </div>
                    )}

                    {/* IMAGE BLOCK */}
                    {block.type === 'image' && (
                      <div className="cms-image-editor">
                        <div className="cms-image-editor__preview">
                          {block.content?.url ? (
                            <img 
                              src={block.content.url.startsWith('/') ? `${SERVER_URL}${block.content.url}` : block.content.url} 
                              alt={block.content.alt || ''} 
                            />
                          ) : (
                            <div className="cms-img-placeholder">Belum ada gambar dipilih</div>
                          )}
                          <button 
                            type="button" 
                            className="cms-btn cms-btn--primary"
                            onClick={() => openMediaPickerFor((url, alt) => {
                              updateBlock(index, 'content', { ...block.content, url, alt });
                            })}
                          >
                            Pilih dari Media Library
                          </button>
                        </div>

                        <div className="cms-image-editor__meta">
                          <div className="cms-field-group">
                            <label>URL Gambar Langsung:</label>
                            <input 
                              type="text" 
                              value={block.content?.url || ''} 
                              onChange={(e) => updateBlock(index, 'content', { ...block.content, url: e.target.value })}
                              placeholder="https://... atau pilih dari Media Library"
                            />
                          </div>
                          <div className="cms-field-group">
                            <label>Keterangan (Caption):</label>
                            <input 
                              type="text" 
                              value={block.content?.caption || ''} 
                              onChange={(e) => updateBlock(index, 'content', { ...block.content, caption: e.target.value })}
                              placeholder="Keterangan di bawah gambar..."
                            />
                          </div>
                          <div className="cms-field-grid">
                            <div className="cms-field-group">
                              <label>Alt Text (Aksesibilitas):</label>
                              <input 
                                type="text" 
                                value={block.content?.alt || ''} 
                                onChange={(e) => updateBlock(index, 'content', { ...block.content, alt: e.target.value })}
                                placeholder="Deskripsi foto..."
                              />
                            </div>
                            <div className="cms-field-group">
                              <label>Perataan:</label>
                              <select 
                                value={block.settings?.align || 'center'}
                                onChange={(e) => updateBlock(index, 'settings', { ...block.settings, align: e.target.value })}
                              >
                                <option value="center">Tengah</option>
                                <option value="left">Kiri</option>
                                <option value="right">Kanan</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* GALLERY BLOCK */}
                    {block.type === 'gallery' && (
                      <div className="cms-gallery-editor">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <button 
                            type="button" 
                            className="cms-btn cms-btn--primary"
                            onClick={() => openMediaPickerFor((url, alt) => {
                              const curr = Array.isArray(block.content?.images) ? block.content.images : [];
                              updateBlock(index, 'content', {
                                ...block.content,
                                images: [...curr, { url, caption: alt }]
                              });
                            })}
                          >
                            + Tambah Foto ke Galeri
                          </button>
                          <div>
                            <label style={{ fontSize: '0.85rem', marginRight: '6px' }}>Jumlah Kolom:</label>
                            <select 
                              value={block.settings?.columns || 3}
                              onChange={(e) => updateBlock(index, 'settings', { ...block.settings, columns: Number(e.target.value) })}
                            >
                              <option value="2">2 Kolom</option>
                              <option value="3">3 Kolom</option>
                              <option value="4">4 Kolom</option>
                            </select>
                          </div>
                        </div>

                        <div className="cms-gallery-preview-list">
                          {(block.content?.images || []).map((img, i) => (
                            <div key={i} className="cms-gallery-preview-item">
                              <img src={img.url.startsWith('/') ? `${SERVER_URL}${img.url}` : img.url} alt="" />
                              <button 
                                type="button" 
                                className="remove-img"
                                onClick={() => {
                                  const filtered = block.content.images.filter((_, gIdx) => gIdx !== i);
                                  updateBlock(index, 'content', { ...block.content, images: filtered });
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* VIDEO BLOCK */}
                    {block.type === 'video' && (
                      <div className="cms-field-grid">
                        <div className="cms-field-group" style={{ flex: 2 }}>
                          <label>Judul Video:</label>
                          <input 
                            type="text" 
                            value={block.content?.title || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, title: e.target.value })}
                            placeholder="Contoh: Video Sambutan Ketua Pengadilan"
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 3 }}>
                          <label>URL Video (YouTube / Vimeo / MP4):</label>
                          <input 
                            type="text" 
                            value={block.content?.url || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, url: e.target.value })}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 2 }}>
                          <label>Keterangan Video:</label>
                          <input 
                            type="text" 
                            value={block.content?.caption || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, caption: e.target.value })}
                            placeholder="Keterangan singkat..."
                          />
                        </div>
                      </div>
                    )}

                    {/* BUTTON BLOCK */}
                    {block.type === 'button' && (
                      <div className="cms-field-grid">
                        <div className="cms-field-group" style={{ flex: 2 }}>
                          <label>Teks Tombol:</label>
                          <input 
                            type="text" 
                            value={block.content?.text || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, text: e.target.value })}
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 3 }}>
                          <label>URL Tujuan:</label>
                          <input 
                            type="text" 
                            value={block.content?.url || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, url: e.target.value })}
                            placeholder="https://... atau /layanan"
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 1 }}>
                          <label>Gaya:</label>
                          <select 
                            value={block.settings?.variant || 'primary'}
                            onChange={(e) => updateBlock(index, 'settings', { ...block.settings, variant: e.target.value })}
                          >
                            <option value="primary">Hijau Pengadilan</option>
                            <option value="gold">Emas Mewah</option>
                            <option value="outline">Garis (Outline)</option>
                          </select>
                        </div>
                        <div className="cms-field-group" style={{ flex: 1 }}>
                          <label>Buka Tab Baru:</label>
                          <select 
                            value={block.content?.open_new_tab ? 'yes' : 'no'}
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, open_new_tab: e.target.value === 'yes' })}
                          >
                            <option value="no">Tidak (Tab Sama)</option>
                            <option value="yes">Ya (Tab Baru)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* LINK BLOCK */}
                    {block.type === 'link' && (
                      <div className="cms-field-grid">
                        <div className="cms-field-group" style={{ flex: 2 }}>
                          <label>Label Tautan:</label>
                          <input 
                            type="text" 
                            value={block.content?.text || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, text: e.target.value })}
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 3 }}>
                          <label>URL (Internal/External):</label>
                          <input 
                            type="text" 
                            value={block.content?.url || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, url: e.target.value })}
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 1 }}>
                          <label>Tab Baru:</label>
                          <select 
                            value={block.content?.open_new_tab ? 'yes' : 'no'}
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, open_new_tab: e.target.value === 'yes' })}
                          >
                            <option value="yes">Ya</option>
                            <option value="no">Tidak</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* DOCUMENT DOWNLOAD BLOCK */}
                    {block.type === 'document' && (
                      <div className="cms-field-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <label>Informasi Berkas Dokumen Resmi:</label>
                          <button 
                            type="button" 
                            className="cms-btn cms-btn--primary"
                            onClick={() => openDocPickerFor((doc) => {
                              updateBlock(index, 'content', {
                                doc_title: doc.doc_title,
                                doc_number: doc.doc_number,
                                doc_date: doc.doc_date,
                                file_url: doc.file_url,
                                file_size: doc.file_size,
                                description: doc.description
                              });
                            })}
                          >
                            Pilih dari Repositori Dokumen
                          </button>
                        </div>

                        <div className="cms-field-grid">
                          <div className="cms-field-group" style={{ flex: 2 }}>
                            <label>Nama / Judul Dokumen:</label>
                            <input 
                              type="text" 
                              value={block.content?.doc_title || ''} 
                              onChange={(e) => updateBlock(index, 'content', { ...block.content, doc_title: e.target.value })}
                            />
                          </div>
                          <div className="cms-field-group" style={{ flex: 2 }}>
                            <label>Nomor Dokumen/SK:</label>
                            <input 
                              type="text" 
                              value={block.content?.doc_number || ''} 
                              onChange={(e) => updateBlock(index, 'content', { ...block.content, doc_number: e.target.value })}
                            />
                          </div>
                          <div className="cms-field-group" style={{ flex: 1 }}>
                            <label>Tanggal Dokumen:</label>
                            <input 
                              type="date" 
                              value={block.content?.doc_date || ''} 
                              onChange={(e) => updateBlock(index, 'content', { ...block.content, doc_date: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="cms-field-grid" style={{ marginTop: '8px' }}>
                          <div className="cms-field-group" style={{ flex: 3 }}>
                            <label>URL Berkas (File Path):</label>
                            <input 
                              type="text" 
                              value={block.content?.file_url || ''} 
                              onChange={(e) => updateBlock(index, 'content', { ...block.content, file_url: e.target.value })}
                              placeholder="/documents/... atau link berkas"
                            />
                          </div>
                          <div className="cms-field-group" style={{ flex: 3 }}>
                            <label>Deskripsi Ringkas:</label>
                            <input 
                              type="text" 
                              value={block.content?.description || ''} 
                              onChange={(e) => updateBlock(index, 'content', { ...block.content, description: e.target.value })}
                              placeholder="Tentang isi dokumen..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TABLE BLOCK */}
                    {block.type === 'table' && (
                      <div className="cms-field-group">
                        <label>Editor Tabel:</label>
                        <div className="cms-table-editor">
                          <table className="cms-table">
                            <thead>
                              <tr>
                                {(block.content?.headers || []).map((h, hIdx) => (
                                  <th key={hIdx}>
                                    <input 
                                      type="text" 
                                      value={h} 
                                      onChange={(e) => {
                                        const newHeaders = [...block.content.headers];
                                        newHeaders[hIdx] = e.target.value;
                                        updateBlock(index, 'content', { ...block.content, headers: newHeaders });
                                      }}
                                    />
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(block.content?.rows || []).map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx}>
                                      <input 
                                        type="text" 
                                        value={cell} 
                                        onChange={(e) => {
                                          const newRows = [...block.content.rows];
                                          newRows[rIdx][cIdx] = e.target.value;
                                          updateBlock(index, 'content', { ...block.content, rows: newRows });
                                        }}
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                            <button 
                              type="button" 
                              className="cms-btn cms-btn--outline"
                              onClick={() => {
                                const newHeaders = [...(block.content?.headers || []), 'Kolom Baru'];
                                const newRows = (block.content?.rows || []).map(r => [...r, '']);
                                updateBlock(index, 'content', { headers: newHeaders, rows: newRows });
                              }}
                            >
                              + Tambah Kolom
                            </button>
                            <button 
                              type="button" 
                              className="cms-btn cms-btn--outline"
                              onClick={() => {
                                const colCount = (block.content?.headers || []).length;
                                const newRow = new Array(colCount).fill('');
                                updateBlock(index, 'content', { ...block.content, rows: [...(block.content?.rows || []), newRow] });
                              }}
                            >
                              + Tambah Baris
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* QUOTE BLOCK */}
                    {block.type === 'quote' && (
                      <div className="cms-field-grid">
                        <div className="cms-field-group" style={{ flex: 3 }}>
                          <label>Teks Kutipan:</label>
                          <textarea 
                            rows={3}
                            value={block.content?.quote || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, quote: e.target.value })}
                            placeholder="Tuliskan kata mutiara atau pernyataan resmi..."
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 2 }}>
                          <label>Sumber / Tokoh:</label>
                          <input 
                            type="text" 
                            value={block.content?.author || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, author: e.target.value })}
                            placeholder="Contoh: Ketua Pengadilan Agama Cimahi"
                          />
                        </div>
                      </div>
                    )}

                    {/* ACCORDION BLOCK */}
                    {block.type === 'accordion' && (
                      <div className="cms-field-group">
                        <label>Item Akordion / Lipatan:</label>
                        {(block.content?.items || []).map((item, aIdx) => (
                          <div key={aIdx} className="cms-accordion-editor-item">
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                              <input 
                                type="text" 
                                style={{ flex: 1, fontWeight: 600 }}
                                value={item.title || ''} 
                                onChange={(e) => {
                                  const nextItems = [...block.content.items];
                                  nextItems[aIdx].title = e.target.value;
                                  updateBlock(index, 'content', { ...block.content, items: nextItems });
                                }}
                                placeholder="Judul Akordion..."
                              />
                              <button 
                                type="button" 
                                className="danger"
                                onClick={() => {
                                  const filtered = block.content.items.filter((_, idx) => idx !== aIdx);
                                  updateBlock(index, 'content', { ...block.content, items: filtered });
                                }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                            <textarea 
                              rows={2}
                              value={item.content || ''} 
                              onChange={(e) => {
                                const nextItems = [...block.content.items];
                                nextItems[aIdx].content = e.target.value;
                                updateBlock(index, 'content', { ...block.content, items: nextItems });
                              }}
                              placeholder="Isi jawaban atau uraian..."
                            />
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className="cms-btn cms-btn--primary"
                          style={{ marginTop: '8px' }}
                          onClick={() => {
                            const nextItems = [...(block.content?.items || []), { title: 'Item Baru', content: '' }];
                            updateBlock(index, 'content', { ...block.content, items: nextItems });
                          }}
                        >
                          + Tambah Item Akordion
                        </button>
                      </div>
                    )}

                    {/* GOOGLE MAPS */}
                    {block.type === 'maps' && (
                      <div className="cms-field-grid">
                        <div className="cms-field-group" style={{ flex: 2 }}>
                          <label>Judul Peta:</label>
                          <input 
                            type="text" 
                            value={block.content?.title || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, title: e.target.value })}
                            placeholder="Peta Kantor..."
                          />
                        </div>
                        <div className="cms-field-group" style={{ flex: 4 }}>
                          <label>Embed Map URL:</label>
                          <input 
                            type="text" 
                            value={block.content?.url || ''} 
                            onChange={(e) => updateBlock(index, 'content', { ...block.content, url: e.target.value })}
                            placeholder="https://maps.google.com/maps?q=..."
                          />
                        </div>
                      </div>
                    )}

                    {/* EMBED / HTML */}
                    {(block.type === 'embed' || block.type === 'html') && (
                      <div className="cms-field-group">
                        <label>Kode HTML / Iframe:</label>
                        <textarea 
                          rows={4}
                          value={block.content?.html || ''} 
                          onChange={(e) => updateBlock(index, 'content', { ...block.content, html: e.target.value })}
                          placeholder="<iframe src='...'></iframe>"
                        />
                      </div>
                    )}

                    {/* DIVIDER */}
                    {block.type === 'divider' && (
                      <p style={{ color: '#6b7280', margin: 0 }}>Garis pemisah horizontal bersih akan ditampilkan di halaman.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Block Trigger & Menu */}
      <div className="cms-add-block-container">
        {!showAddMenu ? (
          <button 
            type="button" 
            className="cms-add-block-btn"
            onClick={() => setShowAddMenu(true)}
          >
            <FaPlus /> <span>Tambah Content Block</span>
          </button>
        ) : (
          <div className="cms-block-picker animate-fade-in">
            <div className="cms-block-picker__header">
              <h4>Pilih Jenis Content Block</h4>
              <button type="button" onClick={() => setShowAddMenu(false)}>&times;</button>
            </div>
            <div className="cms-block-picker__grid">
              {BLOCK_TYPES.map((b) => {
                const Icon = b.icon;
                return (
                  <button 
                    key={b.type} 
                    type="button" 
                    className="cms-block-picker__item"
                    onClick={() => handleAddBlock(b.type)}
                  >
                    <div className="cms-block-picker__icon">
                      <Icon />
                    </div>
                    <div className="cms-block-picker__text">
                      <span className="name">{b.label}</span>
                      <span className="desc">{b.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Integrated Modals */}
      <MediaLibraryModal 
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        token={token}
        onSelect={(url, alt, item) => {
          if (mediaTargetCallback) mediaTargetCallback(url, alt, item);
        }}
      />

      <DocumentPickerModal 
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        token={token}
        onSelect={(doc) => {
          if (docTargetCallback) docTargetCallback(doc);
        }}
      />
    </div>
  );
}
