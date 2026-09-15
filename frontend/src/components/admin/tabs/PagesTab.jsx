import axios from 'axios';
import {
  FaFileAlt, FaPlus, FaSearch, FaAlignLeft, FaImage, FaVideo,
  FaFilePdf, FaInfo, FaTable, FaArrowUp, FaArrowDown, FaTrash,
  FaEye, FaSave, FaTimes, FaEdit, FaToggleOn, FaToggleOff
} from 'react-icons/fa';
import ImageUploader from '../../ImageUploader';
import DocumentUploader from '../../DocumentUploader';
import CmsRichTextBlock from '../../cms/CmsRichTextBlock';
import BlockRenderer from '../../cms/BlockRenderer';
import { sanitizeHtml } from '../../../sanitize';

export default function PagesTab({
  pages,
  isAdding,
  setIsAdding,
  editingItem,
  setEditingItem,
  pageForm,
  setPageForm,
  pageSearch,
  setPageSearch,
  pageStatusFilter,
  setPageStatusFilter,
  fetchPages,
  handlePageSubmit,
  togglePageStatus,
  deletePage,
  menus,
  token,
  loading,
  slugify,
  previewPage,
  setPreviewPage,
  moveBlock,
  deleteBlock,
  addBlock,
  updateBlockContent,
  addTableRow,
  addTableColumn,
  updateTableHeader,
  removeTableColumn,
  updateTableCell,
  removeTableRow,
  showMsg,
  API_URL
}) {
  return (
    <div className="cms-panel animate-fade-in-up">
      <div className="cms-panel__header">
        <div>
          <h2 className="cms-panel__title"><FaFileAlt /> Kelola Halaman CMS</h2>
          <p className="cms-panel__subtitle">Buat & edit halaman konten dinamis yang terhubung ke menu navigasi.</p>
        </div>
        <button className="cms-btn cms-btn--primary" onClick={() => { 
          setIsAdding(true); 
          setEditingItem(null); 
          setPageForm({ 
            title: '', 
            subtitle: '', 
            slug: '', 
            excerpt: '', 
            content_html: '', 
            status: 'draft', 
            seo_title: '', 
            meta_description: '', 
            meta_keywords: '', 
            menu_id: '', 
            blocks: [{ id: Date.now(), type: 'text', content: { text: '' }, settings: {}, sort_order: 1 }] 
          }); 
        }}>
          <FaPlus /> Buat Halaman Baru
        </button>
      </div>

      {!isAdding && (
        <div className="cms-filter-row">
          <div className="cms-search-box">
            <FaSearch className="cms-search-box__icon" />
            <input type="text" placeholder="Cari halaman berdasarkan judul atau slug..." value={pageSearch}
              onChange={e => setPageSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchPages()} />
            <button className="cms-search-box__btn" onClick={fetchPages}>Cari</button>
          </div>
          <select className="cms-filter-select" value={pageStatusFilter} onChange={e => { setPageStatusFilter(e.target.value); }}>
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      )}

      {isAdding && (
        <div className="cms-form-card animate-fade-in-down">
          <h3 className="cms-form-card__title">{editingItem ? `Edit: ${editingItem.title}` : 'Buat Halaman Baru'}</h3>
          <form onSubmit={handlePageSubmit}>
            <div className="cms-section-label">Informasi Dasar</div>
            <div className="cms-form-grid">
              <div className="cms-form-group">
                <label>Judul Halaman *</label>
                <input type="text" value={pageForm.title} required
                  onChange={e => setPageForm(prev => ({ ...prev, title: e.target.value, slug: !editingItem ? slugify(e.target.value) : prev.slug }))} />
              </div>
              <div className="cms-form-group">
                <label>Slug URL *</label>
                <input type="text" value={pageForm.slug} required
                  onChange={e => setPageForm(prev => ({ ...prev, slug: slugify(e.target.value) }))} />
              </div>
              <div className="cms-form-group">
                <label>Subtitle</label>
                <input type="text" value={pageForm.subtitle} onChange={e => setPageForm(prev => ({ ...prev, subtitle: e.target.value }))} placeholder="Sub-judul opsional" />
              </div>
              <div className="cms-form-group">
                <label>Tautkan ke Menu</label>
                <select value={pageForm.menu_id} onChange={e => setPageForm(prev => ({ ...prev, menu_id: e.target.value }))}>
                  <option value="">— Tidak Terhubung ke Menu —</option>
                  {menus.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                </select>
              </div>
              <div className="cms-form-group">
                <label>Status Publikasi</label>
                <select value={pageForm.status} onChange={e => setPageForm(prev => ({ ...prev, status: e.target.value }))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="cms-form-group cms-form-group--full">
                <label>Ringkasan / Excerpt</label>
                <textarea rows="2" value={pageForm.excerpt} onChange={e => setPageForm(prev => ({ ...prev, excerpt: e.target.value }))} placeholder="Ringkasan singkat halaman ini..." />
              </div>
            </div>

            <div className="cms-section-label">
              <span>Struktur Konten Halaman (Wadah / Container Berbasis Blok)</span>
            </div>
            <div className="cms-form-group cms-form-group--full">
              <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748b' }}>
                Setiap elemen konten berada dalam <strong>wadah (container) tersendiri</strong>. Anda dapat langsung mengedit isi teks, mengganti foto/gambar, mengganti video, atau mengganti dokumen PDF secara instan tanpa perlu coding HTML.
              </p>

              <div className="cms-blocks-builder">
                {(!pageForm.blocks || pageForm.blocks.length === 0) ? (
                  <div className="cms-block-empty">
                    <FaAlignLeft style={{ fontSize: '2rem', color: '#cbd5e1' }} />
                    <h4>Belum ada blok konten</h4>
                    <p>Klik salah satu tombol di bawah untuk menambahkan wadah teks, gambar, video, atau dokumen PDF.</p>
                  </div>
                ) : (
                  <div className="cms-blocks-list">
                    {pageForm.blocks.map((block, idx) => {
                      const bContent = block.content || {};

                      return (
                        <div key={block.id || idx} className={`cms-block-card cms-block-card--${block.type}`}>
                          <div className="cms-block-card__header">
                            <div className="cms-block-card__tag">
                              <span className="cms-block-card__num">{idx + 1}</span>
                              {block.type === 'text' && <><FaAlignLeft style={{ color: '#16a34a' }} /> <span>Wadah Teks & Artikel</span></>}
                              {block.type === 'image' && <><FaImage style={{ color: '#2563eb' }} /> <span>Wadah Foto / Gambar</span></>}
                              {block.type === 'video' && <><FaVideo style={{ color: '#dc2626' }} /> <span>Wadah Video (YouTube/MP4)</span></>}
                              {block.type === 'document' && <><FaFilePdf style={{ color: '#ea580c' }} /> <span>Wadah Dokumen PDF</span></>}
                              {block.type === 'callout' && <><FaInfo style={{ color: '#ca8a04' }} /> <span>Wadah Kotak Informasi / Pengumuman</span></>}
                              {block.type === 'table' && <><FaTable style={{ color: '#7c3aed' }} /> <span>Wadah Tabel Data</span></>}
                            </div>
                            <div className="cms-block-card__actions">
                              <button 
                                type="button" 
                                className="cms-block-tool-btn" 
                                title="Pindah ke Atas" 
                                disabled={idx === 0} 
                                onClick={() => moveBlock(idx, -1)}
                              >
                                <FaArrowUp />
                              </button>
                              <button 
                                type="button" 
                                className="cms-block-tool-btn" 
                                title="Pindah ke Bawah" 
                                disabled={idx === pageForm.blocks.length - 1} 
                                onClick={() => moveBlock(idx, 1)}
                              >
                                <FaArrowDown />
                              </button>
                              <button 
                                type="button" 
                                className="cms-block-tool-btn cms-block-tool-btn--delete" 
                                title="Hapus Wadah Ini" 
                                onClick={() => deleteBlock(idx)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>

                          <div className="cms-block-card__body">
                            {block.type === 'text' && (
                              <CmsRichTextBlock
                                value={bContent.html || bContent.text || ''}
                                onChange={(newHtml) => updateBlockContent(idx, 'html', newHtml)}
                              />
                            )}

                            {block.type === 'image' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                  <div style={{ flex: '1', minWidth: '240px' }}>
                                    <ImageUploader 
                                      value={bContent.url}
                                      token={token}
                                      label="Ganti / Upload Foto Baru"
                                      onChange={newUrl => updateBlockContent(idx, 'url', newUrl)}
                                    />
                                  </div>
                                  <div style={{ flex: '1', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div className="cms-form-group">
                                      <label>Atau URL Foto Langsung</label>
                                      <input 
                                        type="text" 
                                        value={bContent.url || ''} 
                                        placeholder="https://example.com/foto.jpg atau /images/uploads/..." 
                                        onChange={e => updateBlockContent(idx, 'url', e.target.value)}
                                      />
                                    </div>
                                    <div className="cms-form-group">
                                      <label>Keterangan / Caption Foto</label>
                                      <input 
                                        type="text" 
                                        value={bContent.caption || ''} 
                                        placeholder="Keterangan yang tampil di bawah foto..." 
                                        onChange={e => updateBlockContent(idx, 'caption', e.target.value)}
                                      />
                                    </div>
                                    <div className="cms-form-group">
                                      <label>Alt Text (SEO & Aksesibilitas)</label>
                                      <input 
                                        type="text" 
                                        value={bContent.alt || ''} 
                                        placeholder="Deskripsi foto..." 
                                        onChange={e => updateBlockContent(idx, 'alt', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {block.type === 'video' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div className="cms-form-group">
                                  <label>URL Video (YouTube, Vimeo, atau Link MP4) *</label>
                                  <input 
                                    type="text" 
                                    value={bContent.url || ''} 
                                    placeholder="Contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/..." 
                                    onChange={e => updateBlockContent(idx, 'url', e.target.value)}
                                  />
                                  <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
                                    Ganti link ini kapan saja untuk langsung mengubah tayangan video di halaman.
                                  </small>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                  <div className="cms-form-group">
                                    <label>Judul Video</label>
                                    <input 
                                      type="text" 
                                      value={bContent.title || ''} 
                                      placeholder="Judul video di atas player..." 
                                      onChange={e => updateBlockContent(idx, 'title', e.target.value)}
                                    />
                                  </div>
                                  <div className="cms-form-group">
                                    <label>Keterangan / Caption Video</label>
                                    <input 
                                      type="text" 
                                      value={bContent.caption || ''} 
                                      placeholder="Keterangan singkat di bawah video..." 
                                      onChange={e => updateBlockContent(idx, 'caption', e.target.value)}
                                    />
                                  </div>
                                </div>
                                {bContent.url && (
                                  <div className="cms-block-preview-box">
                                    <small style={{ fontWeight: 600, color: '#15803d', display: 'block', marginBottom: 4 }}>
                                      ✓ Video terpasang: {bContent.url}
                                    </small>
                                  </div>
                                )}
                              </div>
                            )}

                            {block.type === 'document' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                  <div style={{ flex: '1', minWidth: '240px' }}>
                                    <DocumentUploader 
                                      value={bContent.file_url}
                                      token={token}
                                      label="Ganti / Upload Berkas PDF Baru"
                                      acceptTypes="application/pdf"
                                      onChange={newDocUrl => updateBlockContent(idx, 'file_url', newDocUrl)}
                                    />
                                  </div>
                                  <div style={{ flex: '1', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div className="cms-form-group">
                                      <label>Judul Dokumen / Nama Berkas *</label>
                                      <input 
                                        type="text" 
                                        value={bContent.doc_title || ''} 
                                        placeholder="Contoh: Surat Keputusan / Pedoman Pelayanan" 
                                        onChange={e => updateBlockContent(idx, 'doc_title', e.target.value)}
                                      />
                                    </div>
                                    <div className="cms-form-group">
                                      <label>Keterangan Dokumen</label>
                                      <input 
                                        type="text" 
                                        value={bContent.description || ''} 
                                        placeholder="Keterangan berkas unduhan..." 
                                        onChange={e => updateBlockContent(idx, 'description', e.target.value)}
                                      />
                                    </div>
                                    <div className="cms-form-group">
                                      <label>Nomor Dokumen (Opsional)</label>
                                      <input 
                                        type="text" 
                                        value={bContent.doc_number || ''} 
                                        placeholder="Contoh: W10-A19/001/HK.05/I/2024" 
                                        onChange={e => updateBlockContent(idx, 'doc_number', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {block.type === 'callout' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div className="cms-form-group">
                                  <label>Judul Kotak Informasi</label>
                                  <input 
                                    type="text" 
                                    value={bContent.title || ''} 
                                    placeholder="Contoh: Informasi Penting / Catatan Pelayanan" 
                                    onChange={e => updateBlockContent(idx, 'title', e.target.value)}
                                  />
                                </div>
                                <div className="cms-form-group" style={{ marginBottom: 0 }}>
                                  <label>Pesan / Uraian Catatan</label>
                                  <textarea 
                                    rows="3" 
                                    value={bContent.text || ''} 
                                    placeholder="Uraian pengumuman atau catatan penting..."
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #d1d5db', fontSize: '0.9rem' }}
                                    onChange={e => updateBlockContent(idx, 'text', e.target.value)}
                                  />
                                </div>
                              </div>
                            )}

                            {block.type === 'table' && (
                              <div className="cms-table-editor">
                                <div className="cms-table-editor__toolbar">
                                  <button type="button" className="cms-table-editor__btn" onClick={() => addTableRow(idx)}>
                                    + Tambah Baris
                                  </button>
                                  <button type="button" className="cms-table-editor__btn" onClick={() => addTableColumn(idx)}>
                                    + Tambah Kolom
                                  </button>
                                  <label className="cms-table-editor__toggle">
                                    <input 
                                      type="checkbox" 
                                      checked={bContent.has_header !== false} 
                                      onChange={e => updateBlockContent(idx, 'has_header', e.target.checked)}
                                    />
                                    <span>Baris Header</span>
                                  </label>
                                </div>
                                <div className="cms-table-editor__scroll">
                                  <table className="cms-table-edit-preview">
                                    {bContent.has_header !== false && (
                                      <thead>
                                        <tr>
                                          {(bContent.headers || []).map((header, colIdx) => (
                                            <th key={colIdx} className="cms-table-edit-th">
                                              <div className="cms-table-edit-cell-wrap">
                                                <input
                                                  type="text"
                                                  className="cms-table-edit-input cms-table-edit-input--header"
                                                  value={header}
                                                  placeholder={`Kolom ${colIdx + 1}`}
                                                  onChange={e => updateTableHeader(idx, colIdx, e.target.value)}
                                                />
                                                {(bContent.headers || []).length > 1 && (
                                                  <button type="button" className="cms-table-edit-del-col" title="Hapus Kolom" onClick={() => removeTableColumn(idx, colIdx)}>✕</button>
                                                )}
                                              </div>
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                    )}
                                    <tbody>
                                      {(bContent.rows || []).map((row, rowIdx) => (
                                        <tr key={rowIdx}>
                                          {(Array.isArray(row) ? row : []).map((cell, colIdx) => (
                                            <td key={colIdx} className="cms-table-edit-td">
                                              <input
                                                type="text"
                                                className="cms-table-edit-input"
                                                value={cell}
                                                placeholder="Isi sel..."
                                                onChange={e => updateTableCell(idx, rowIdx, colIdx, e.target.value)}
                                              />
                                            </td>
                                          ))}
                                          <td className="cms-table-edit-td cms-table-edit-td--action">
                                            {(bContent.rows || []).length > 1 && (
                                              <button type="button" className="cms-table-edit-del-row" title="Hapus Baris" onClick={() => removeTableRow(idx, rowIdx)}>✕</button>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                <p className="cms-rte-hint">Klik sel untuk mengedit. Tambah/hapus baris dan kolom dengan tombol di atas.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="cms-add-block-bar">
                  <p className="cms-add-block-bar__title">+ Tambah Wadah Fitur Baru ke Halaman:</p>
                  <div className="cms-add-block-bar__buttons">
                    <button 
                      type="button" 
                      className="cms-btn-add-block" 
                      onClick={() => addBlock('text')}
                    >
                      <FaAlignLeft style={{ color: '#16a34a' }} /> + Wadah Teks
                    </button>
                    <button 
                      type="button" 
                      className="cms-btn-add-block" 
                      onClick={() => addBlock('image')}
                    >
                      <FaImage style={{ color: '#2563eb' }} /> + Wadah Foto / Gambar
                    </button>
                    <button 
                      type="button" 
                      className="cms-btn-add-block" 
                      onClick={() => addBlock('video')}
                    >
                      <FaVideo style={{ color: '#dc2626' }} /> + Wadah Video
                    </button>
                    <button 
                      type="button" 
                      className="cms-btn-add-block" 
                      onClick={() => addBlock('document')}
                    >
                      <FaFilePdf style={{ color: '#ea580c' }} /> + Wadah Dokumen PDF
                    </button>
                    <button 
                      type="button" 
                      className="cms-btn-add-block" 
                      onClick={() => addBlock('callout')}
                    >
                      <FaInfo style={{ color: '#ca8a04' }} /> + Wadah Kotak Info
                    </button>
                    <button 
                      type="button" 
                      className="cms-btn-add-block" 
                      onClick={() => addBlock('table')}
                    >
                      <FaTable style={{ color: '#7c3aed' }} /> + Wadah Tabel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="cms-section-label">SEO & Meta</div>
            <div className="cms-form-grid">
              <div className="cms-form-group">
                <label>SEO Title</label>
                <input type="text" value={pageForm.seo_title} onChange={e => setPageForm(prev => ({ ...prev, seo_title: e.target.value }))} placeholder="Biarkan kosong untuk gunakan judul halaman" />
              </div>
              <div className="cms-form-group">
                <label>Meta Keywords</label>
                <input type="text" value={pageForm.meta_keywords} onChange={e => setPageForm(prev => ({ ...prev, meta_keywords: e.target.value }))} placeholder="kata-kunci, dipisah, koma" />
              </div>
              <div className="cms-form-group cms-form-group--full">
                <label>Meta Description</label>
                <textarea rows="2" value={pageForm.meta_description} onChange={e => setPageForm(prev => ({ ...prev, meta_description: e.target.value }))} placeholder="Deskripsi singkat untuk mesin pencari (maks. 160 karakter)" />
              </div>
            </div>

            <div className="cms-form-actions">
              <button type="button" className="cms-btn cms-btn--ghost" onClick={() => { setIsAdding(false); setEditingItem(null); }}>Batal</button>
              {((pageForm.blocks && pageForm.blocks.length > 0) || pageForm.content_html) && (
                <button type="button" className="cms-btn cms-btn--preview" onClick={() => setPreviewPage({ ...pageForm })}>
                  <FaEye /> Preview
                </button>
              )}
              <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}><FaSave /> {loading ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Buat & Simpan'}</button>
            </div>
          </form>
        </div>
      )}

      {previewPage && (
        <div className="cms-modal-overlay" onClick={() => setPreviewPage(null)}>
          <div className="cms-modal" onClick={e => e.stopPropagation()}>
            <div className="cms-modal__header">
              <h3>Preview: {previewPage.title}</h3>
              <button className="cms-modal__close" onClick={() => setPreviewPage(null)}><FaTimes /></button>
            </div>
            <div className="cms-modal__body">
              {previewPage.blocks && previewPage.blocks.length > 0 ? (
                <BlockRenderer blocks={previewPage.blocks} />
              ) : (
                <div className="cms-page-preview" dangerouslySetInnerHTML={{ __html: sanitizeHtml(previewPage.content_html || '') }} />
              )}
            </div>
          </div>
        </div>
      )}

      {!isAdding && (
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Judul Halaman</th>
                <th>Slug</th>
                <th>Menu Terkait</th>
                <th>Status</th>
                <th>Diperbarui</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pages.length === 0 ? (
                <tr><td colSpan="6" className="cms-table__empty">Belum ada halaman. Klik "Buat Halaman Baru" untuk mulai.</td></tr>
              ) : pages.map(page => (
                <tr key={page.id}>
                  <td className="cms-table__bold">
                    <div>{page.title}</div>
                    {page.subtitle && <small className="cms-table__sub">{page.subtitle}</small>}
                  </td>
                  <td><code className="cms-code">/{page.slug}</code></td>
                  <td>{page.menu_title || <span className="cms-muted">—</span>}</td>
                  <td><span className={`cms-badge cms-badge--status-${page.status}`}>{page.status}</span></td>
                  <td className="cms-muted">{new Date(page.updated_at).toLocaleDateString('id-ID')}</td>
                  <td>
                    <div className="cms-table-actions">
                      <button className="cms-btn cms-btn--icon cms-btn--edit" title="Edit Halaman" onClick={async () => {
                        try {
                          const res = await axios.get(`${API_URL}/pages/${page.id}`, { headers: { Authorization: `Bearer ${token}` } });
                          const d = res.data.data;
                          let initialBlocks = Array.isArray(d.blocks) && d.blocks.length > 0 ? d.blocks : [];
                          if (initialBlocks.length === 0 && d.content_html) {
                            initialBlocks = [{ id: Date.now(), type: 'text', content: { text: d.content_html }, settings: {}, sort_order: 1 }];
                          }
                          setPageForm({ 
                            title: d.title, 
                            subtitle: d.subtitle || '', 
                            slug: d.slug, 
                            excerpt: d.excerpt || '', 
                            content_html: d.content_html || '', 
                            status: d.status, 
                            seo_title: d.seo_title || '', 
                            meta_description: d.meta_description || '', 
                            meta_keywords: d.meta_keywords || '', 
                            menu_id: d.menu_id || '', 
                            blocks: initialBlocks 
                          });
                          setEditingItem(page);
                          setIsAdding(true);
                        } catch (err) {
                          showMsg('Gagal memuat data halaman.', 'error');
                        }
                      }}>
                        <FaEdit /> Edit
                      </button>
                      <button 
                        className={`cms-btn cms-btn--icon ${page.status === 'published' ? 'cms-btn--toggle' : 'cms-btn--toggle-draft'}`} 
                        title={page.status === 'published' ? 'Jadikan Draft' : 'Publish Halaman'} 
                        onClick={() => togglePageStatus(page.id, page.status)}
                      >
                        {page.status === 'published' ? <><FaToggleOn /> Published</> : <><FaToggleOff /> Draft</>}
                      </button>
                      <button className="cms-btn cms-btn--icon cms-btn--delete" title="Hapus Halaman" onClick={() => deletePage(page.id)}>
                        <FaTrash /> Hapus
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
