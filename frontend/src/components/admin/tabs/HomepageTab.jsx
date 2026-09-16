import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  FaPencilAlt, FaTimes, FaPlus, FaTrash, FaArrowUp,
  FaArrowDown, FaImages, FaSave, FaExclamationTriangle, FaGlobeAsia, FaEyeSlash
} from 'react-icons/fa';
import MediaLibraryModal from '../../cms/MediaLibraryModal';
import resolveMediaUrl from '../../../utils/resolveMediaUrl';

const SECTION_CONFIGS = {
  zi_gallery: {
    label: 'Zona Integritas (7 Kartu)',
    desc: 'Galeri kartu Zona Integritas WBK & WBBM di homepage.',
    headerFields: ['badge_text', 'title', 'description'],
    requireTitle: true,
    requireDescription: true,
    itemsConfig: {
      kind: 'cards',
      fields: [
        { key: 'img', label: 'Gambar', type: 'image' },
        { key: 'title', label: 'Judul', type: 'text' },
        { key: 'area', label: 'Area (tag)', type: 'text' },
        { key: 'desc', label: 'Deskripsi', type: 'textarea' }
      ],
      newItem: () => ({ id: `zi-area-${Date.now()}`, img: '', title: '', area: '', desc: '' })
    }
  },
  prioritas_ptsp: {
    label: 'Alur Pelayanan Prioritas PTSP',
    desc: 'Banner infografis prioritas PTSP beserta poin-poin layanan.',
    headerFields: ['badge_text', 'title', 'description', 'image_url', 'link_url'],
    requireTitle: true,
    requireDescription: true,
    itemsConfig: {
      kind: 'points',
      fields: [{ key: 'text', label: 'Teks Poin', type: 'text' }],
      newItem: () => ''
    }
  },
  service_dual: {
    label: 'Dua Banner Layanan',
    desc: 'Kartu Prosedur Berperkara & Layanan Informasi PPID.',
    headerFields: [],
    itemsConfig: {
      kind: 'object',
      fields: [
        { key: 'image_url', label: 'Gambar', type: 'image' },
        { key: 'title', label: 'Judul', type: 'text' },
        { key: 'subtitle', label: 'Subjudul', type: 'textarea' },
        { key: 'link_url', label: 'Link Tujuan', type: 'url' },
        { key: 'pill_text', label: 'Teks Tombol Hover', type: 'text' },
        { key: 'alt_text', label: 'Alt Teks Gambar', type: 'text' },
        { key: 'hover_title', label: 'Hover Title Kartu', type: 'text' }
      ],
      newItem: () => ({ image_url: '', title: '', subtitle: '', link_url: '', pill_text: '', alt_text: '', hover_title: '' })
    }
  },
  brosur_digital: {
    label: 'Brosur Digital',
    desc: 'Banner brosur + link cepat layanan.',
    headerFields: ['image_url', 'link_url'],
    itemsConfig: {
      kind: 'object',
      fields: [
        { key: 'icon', label: 'Icon Key (file/download/check/whatsapp)', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'url', label: 'URL Tujuan', type: 'url' }
      ],
      newItem: () => ({ icon: 'file', label: '', url: '' })
    }
  },
  akta_cerai: {
    label: 'Akta Cerai Online',
    desc: 'Banner informasi akta cerai + tombol aksi.',
    headerFields: ['title', 'description', 'image_url'],
    requireTitle: true,
    requireDescription: true,
    itemsConfig: {
      kind: 'object',
      fields: [
        { key: 'label', label: 'Label Tombol', type: 'text' },
        { key: 'url', label: 'URL Tujuan', type: 'url' },
        { key: 'is_external', label: 'Buka di tab baru (eksternal)', type: 'checkbox' }
      ],
      newItem: () => ({ label: '', url: '', is_external: false })
    }
  }
};

const SECTION_ORDER = ['zi_gallery', 'prioritas_ptsp', 'service_dual', 'brosur_digital', 'akta_cerai'];

const isValidUrl = (url) => {
  if (!url) return true;
  if (url.startsWith('/')) return true;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

const ImageInput = ({ value, onChange, label, onPickMedia }) => (
  <div className="homepage-tab__img-input">
    <input
      type="text"
      className="homepage-tab__input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
    />
    <button
      type="button"
      className="homepage-tab__btn-media"
      onClick={() => onPickMedia(label)}
      title="Pilih dari Media Library"
    >
      <FaImages />
    </button>
  </div>
);

function HomepageTab({ token }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const [form, setForm] = useState({ badge_text: '', title: '', description: '', image_url: '', link_url: '', link_text: '', items: [], status: 'published' });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState({ text: '', type: '' });
  const [mediaPicker, setMediaPicker] = useState(null);

  const showNotice = (text, type = 'success') => {
    setNotice({ text, type });
    setTimeout(() => setNotice({ text: '', type: '' }), 5000);
  };

  const fetchSections = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/homepage-sections/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setSections(res.data.data);
    } catch (err) {
      showNotice(err.response?.data?.message || 'Gagal memuat data section.', 'error');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const openEdit = (section) => {
    setEditingKey(section.section_key);
    setErrors({});
    setForm({
      badge_text: section.badge_text || '',
      title: section.title || '',
      description: section.description || '',
      image_url: section.image_url || '',
      link_url: section.link_url || '',
      link_text: section.link_text || '',
      items: Array.isArray(section.items) ? section.items : [],
      status: section.status || 'published'
    });
  };

  const closeEdit = () => {
    setEditingKey(null);
    setErrors({});
  };

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const addItem = () => {
    const cfg = SECTION_CONFIGS[editingKey]?.itemsConfig;
    if (!cfg) return;
    setForm((prev) => ({ ...prev, items: [...prev.items, cfg.newItem()] }));
  };

  const removeItem = (idx) => {
    setForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  const moveItem = (idx, dir) => {
    setForm((prev) => {
      const next = [...prev.items];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return { ...prev, items: next };
    });
  };

  const setItemField = (idx, fieldKey, value) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((it, i) => {
        if (i !== idx) return it;
        if (fieldKey === 'text') return typeof it === 'string' ? value : { ...it, text: value };
        return { ...it, [fieldKey]: value };
      })
    }));
  };

  const getItemField = (item, fieldKey) => {
    if (fieldKey === 'text') return typeof item === 'string' ? item : (item?.text || '');
    return item?.[fieldKey] ?? '';
  };

  const openMediaPicker = (path, label) => setMediaPicker({ path, label });
  const closeMediaPicker = () => setMediaPicker(null);
  const handleMediaSelect = (fullUrl) => {
    if (mediaPicker) {
      let value = fullUrl;
      try {
        const serverOrigin = new URL(import.meta.env.VITE_SERVER_URL || 'http://localhost:5000').origin;
        if (typeof fullUrl === 'string' && fullUrl.startsWith(serverOrigin)) {
          value = fullUrl.slice(serverOrigin.length);
        }
      } catch (e) { /* pakai fullUrl apa adanya */ }
      setForm((prev) => {
        const next = { ...prev };
        const path = mediaPicker.path;
        if (path.startsWith('items.')) {
          const [, idxStr, field] = path.split('.');
          const idx = Number(idxStr);
          next.items = prev.items.map((it, i) => {
            if (i !== idx) return it;
            if (field === 'img' || field === 'image_url') {
              return typeof it === 'string' ? it : { ...it, [field]: value };
            }
            return it;
          });
        } else {
          next[path] = value;
        }
        return next;
      });
      setMediaPicker(null);
    }
  };

  const validate = () => {
    const cfg = SECTION_CONFIGS[editingKey] || {};
    const err = {};
    if (cfg.requireTitle && !String(form.title || '').trim()) {
      err.title = 'Judul wajib diisi untuk section ini.';
    }
    if (cfg.requireDescription && !String(form.description || '').trim()) {
      err.description = 'Deskripsi wajib diisi untuk section ini.';
    }
    if (form.image_url && !isValidUrl(form.image_url)) err.image_url = 'URL gambar tidak valid.';
    if (form.link_url && !isValidUrl(form.link_url)) err.link_url = 'URL link tidak valid.';
    const itemCfg = cfg.itemsConfig;
    if (itemCfg) {
      form.items.forEach((it, idx) => {
        if (itemCfg.kind === 'points') {
          if (!String(getItemField(it, 'text')).trim()) {
            err[`item_${idx}`] = 'Poin tidak boleh kosong.';
          }
        } else {
          itemCfg.fields.forEach((f) => {
            if (f.type === 'checkbox') return;
            const val = getItemField(it, f.key);
            if (f.type === 'url' && val && !isValidUrl(val)) {
              err[`item_${idx}_${f.key}`] = 'URL tidak valid.';
            }
            if (f.required && !String(val).trim()) {
              err[`item_${idx}_${f.key}`] = `${f.label} wajib diisi.`;
            }
          });
        }
      });
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showNotice('Periksa kembali form, ada isian yang belum valid.', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        badge_text: form.badge_text || null,
        title: form.title || null,
        description: form.description || null,
        image_url: form.image_url || null,
        link_url: form.link_url || null,
        link_text: form.link_text || null,
        items: Array.isArray(form.items) ? form.items : null,
        status: form.status
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/homepage-sections/${editingKey}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showNotice('Section berhasil disimpan dan langsung tampil di homepage.');
      closeEdit();
      fetchSections();
    } catch (err) {
      showNotice(err.response?.data?.message || 'Gagal menyimpan section.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (section) => {
    const next = section.status === 'published' ? 'draft' : 'published';
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/homepage-sections/${section.section_key}`,
        { status: next },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showNotice(next === 'draft'
        ? `Section "${SECTION_CONFIGS[section.section_key]?.label || section.section_key}" disembunyikan dari homepage.`
        : `Section "${SECTION_CONFIGS[section.section_key]?.label || section.section_key}" dipublikasikan.`);
      fetchSections();
    } catch (err) {
      showNotice(err.response?.data?.message || 'Gagal mengubah status.', 'error');
    }
  };

  const getSection = (key) => sections.find((s) => s.section_key === key);
  const isImageField = (f) => f.type === 'image' || ['img', 'image_url'].includes(f.key);

  return (
    <div className="dashboard-home animate-fade-in-up">
      <div className="dash-section-title">
        <span className="dash-section-title__bar" />
        <h3>Konten Homepage</h3>
      </div>
      <p className="homepage-tab__intro">
        Kelola 5 blok konten spotlight di halaman depan website. Perubahan langsung tampil di homepage setelah disimpan.
      </p>

      {notice.text && (
        <div className={`homepage-tab__notice homepage-tab__notice--${notice.type}`}>
          {notice.type === 'error' ? <FaExclamationTriangle /> : <FaGlobeAsia />}
          <span>{notice.text}</span>
          <button onClick={() => setNotice({ text: '', type: '' })}><FaTimes /></button>
        </div>
      )}

      {loading ? (
        <p className="homepage-tab__loading">Memuat data section...</p>
      ) : (
        <div className="homepage-tab__grid">
          {SECTION_ORDER.map((key) => {
            const cfg = SECTION_CONFIGS[key] || { label: key, desc: '' };
            const section = getSection(key);
            const status = section?.status || 'draft';
            return (
              <div key={key} className={`homepage-tab__card ${status === 'draft' ? 'homepage-tab__card--draft' : ''}`}>
                <div className="homepage-tab__card-head">
                  <div className="homepage-tab__card-title-wrap">
                    <h4 className="homepage-tab__card-title">{cfg.label}</h4>
                    <p className="homepage-tab__card-desc">{cfg.desc}</p>
                  </div>
                  <span className={`homepage-tab__status homepage-tab__status--${status}`}>
                    {status === 'published' ? <FaGlobeAsia /> : <FaEyeSlash />}
                    {status === 'published' ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="homepage-tab__card-meta">
                  Key: <code>{key}</code>
                  {section?.updated_at && ` | Update terakhir: ${new Date(section.updated_at).toLocaleString('id-ID')}`}
                </p>
                <div className="homepage-tab__card-actions">
                  <button
                    className="homepage-tab__btn homepage-tab__btn--edit"
                    onClick={() => openEdit(section || { section_key: key })}
                    disabled={!section}
                  >
                    <FaPencilAlt /> Edit
                  </button>
                  <button
                    className={`homepage-tab__btn homepage-tab__btn--toggle ${status === 'draft' ? 'homepage-tab__btn--toggle-draft' : ''}`}
                    onClick={() => toggleStatus(section)}
                    disabled={!section}
                  >
                    {status === 'published' ? <FaEyeSlash /> : <FaGlobeAsia />}
                    {status === 'published' ? 'Jadikan Draft' : 'Publikasikan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editingKey && (
        <div className="cms-modal-overlay" onClick={closeEdit}>
          <form className="cms-modal homepage-tab__modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <div className="cms-modal__header">
              <h3>Edit: {SECTION_CONFIGS[editingKey]?.label || editingKey}</h3>
              <button type="button" className="cms-modal__close" onClick={closeEdit}><FaTimes /></button>
            </div>

            <div className="homepage-tab__modal-body">
              {SECTION_CONFIGS[editingKey]?.headerFields.includes('badge_text') && (
                <div className="homepage-tab__field">
                  <label>Badge Text</label>
                  <input
                    type="text"
                    className="homepage-tab__input"
                    value={form.badge_text}
                    onChange={(e) => setField('badge_text', e.target.value)}
                    maxLength={100}
                  />
                </div>
              )}
              {SECTION_CONFIGS[editingKey]?.headerFields.includes('title') && (
                <div className="homepage-tab__field">
                  <label>Title {SECTION_CONFIGS[editingKey].requireTitle && '*'}</label>
                  <input
                    type="text"
                    className={`homepage-tab__input ${errors.title ? 'homepage-tab__input--error' : ''}`}
                    value={form.title}
                    onChange={(e) => setField('title', e.target.value)}
                    maxLength={255}
                  />
                  {errors.title && <span className="homepage-tab__error">{errors.title}</span>}
                </div>
              )}
              {SECTION_CONFIGS[editingKey]?.headerFields.includes('description') && (
                <div className="homepage-tab__field">
                  <label>Description {SECTION_CONFIGS[editingKey].requireDescription && '*'}</label>
                  <textarea
                    className={`homepage-tab__input ${errors.description ? 'homepage-tab__input--error' : ''}`}
                    rows={3}
                    value={form.description}
                    onChange={(e) => setField('description', e.target.value)}
                  />
                  {errors.description && <span className="homepage-tab__error">{errors.description}</span>}
                </div>
              )}
              {SECTION_CONFIGS[editingKey]?.headerFields.includes('image_url') && (
                <div className="homepage-tab__field">
                  <label>Gambar Banner</label>
                  {form.image_url && (
                    <img
                      src={resolveMediaUrl(form.image_url)}
                      alt="preview banner"
                      className="homepage-tab__preview"
                    />
                  )}
                  <ImageInput
                    value={form.image_url}
                    onChange={(v) => setField('image_url', v)}
                    label="URL gambar atau pilih dari media"
                    onPickMedia={(label) => openMediaPicker('image_url', label)}
                  />
                  {errors.image_url && <span className="homepage-tab__error">{errors.image_url}</span>}
                </div>
              )}
              {SECTION_CONFIGS[editingKey]?.headerFields.includes('link_url') && (
                <div className="homepage-tab__field">
                  <label>Link Utama Section</label>
                  <input
                    type="text"
                    className={`homepage-tab__input ${errors.link_url ? 'homepage-tab__input--error' : ''}`}
                    value={form.link_url}
                    onChange={(e) => setField('link_url', e.target.value)}
                    placeholder="/layanan-publik/... atau https://..."
                  />
                  {errors.link_url && <span className="homepage-tab__error">{errors.link_url}</span>}
                </div>
              )}

              {SECTION_CONFIGS[editingKey]?.itemsConfig && (
                <div className="homepage-tab__items-block">
                  <div className="homepage-tab__items-head">
                    <label>
                      {SECTION_CONFIGS[editingKey].itemsConfig.kind === 'points'
                        ? 'Poin-poin Layanan'
                        : SECTION_CONFIGS[editingKey].itemsConfig.kind === 'cards'
                          ? 'Kartu'
                          : 'Item'}
                    </label>
                    <button type="button" className="homepage-tab__btn homepage-tab__btn--add" onClick={addItem}>
                      <FaPlus /> Tambah
                    </button>
                  </div>

                  {form.items.length === 0 && (
                    <p className="homepage-tab__empty">Belum ada item. Klik Tambah untuk membuat.</p>
                  )}

                  {form.items.map((item, idx) => (
                    <div key={idx} className="homepage-tab__item">
                      <div className="homepage-tab__item-toolbar">
                        <span className="homepage-tab__item-index">#{idx + 1}</span>
                        <button type="button" onClick={() => moveItem(idx, -1)} disabled={idx === 0} title="Naikkan"><FaArrowUp /></button>
                        <button type="button" onClick={() => moveItem(idx, 1)} disabled={idx === form.items.length - 1} title="Turunkan"><FaArrowDown /></button>
                        <button type="button" onClick={() => removeItem(idx)} className="homepage-tab__item-delete" title="Hapus"><FaTrash /></button>
                      </div>
                      <div className="homepage-tab__item-fields">
                        {SECTION_CONFIGS[editingKey].itemsConfig.kind === 'points' ? (
                          <div className="homepage-tab__field">
                            <input
                              type="text"
                              className={`homepage-tab__input ${errors[`item_${idx}`] ? 'homepage-tab__input--error' : ''}`}
                              value={getItemField(item, 'text')}
                              onChange={(e) => setItemField(idx, 'text', e.target.value)}
                              placeholder="Teks poin layanan"
                            />
                            {errors[`item_${idx}`] && <span className="homepage-tab__error">{errors[`item_${idx}`]}</span>}
                          </div>
                        ) : (
                          SECTION_CONFIGS[editingKey].itemsConfig.fields.map((f) => (
                            <div className="homepage-tab__field" key={f.key}>
                              {f.type === 'checkbox' ? (
                                <label className="homepage-tab__checkbox">
                                  <input
                                    type="checkbox"
                                    checked={!!getItemField(item, f.key)}
                                    onChange={(e) => setItemField(idx, f.key, e.target.checked)}
                                  />
                                  {f.label}
                                </label>
                              ) : (
                                <>
                                  <label>{f.label}</label>
                                  {f.type === 'textarea' ? (
                                    <textarea
                                      className="homepage-tab__input"
                                      rows={2}
                                      value={getItemField(item, f.key)}
                                      onChange={(e) => setItemField(idx, f.key, e.target.value)}
                                    />
                                  ) : isImageField(f) ? (
                                    <>
                                      {getItemField(item, f.key) && (
                                        <img
                                          src={resolveMediaUrl(getItemField(item, f.key))}
                                          alt={`preview ${f.label}`}
                                          className="homepage-tab__preview homepage-tab__preview--sm"
                                        />
                                      )}
                                      <div className="homepage-tab__img-input">
                                        <input
                                          type="text"
                                          className={`homepage-tab__input ${errors[`item_${idx}_${f.key}`] ? 'homepage-tab__input--error' : ''}`}
                                          value={getItemField(item, f.key)}
                                          onChange={(e) => setItemField(idx, f.key, e.target.value)}
                                        />
                                        <button
                                          type="button"
                                          className="homepage-tab__btn-media"
                                          onClick={() => openMediaPicker(`items.${idx}.${f.key}`, f.label)}
                                          title="Pilih dari Media Library"
                                        >
                                          <FaImages />
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <input
                                      type="text"
                                      className={`homepage-tab__input ${errors[`item_${idx}_${f.key}`] ? 'homepage-tab__input--error' : ''}`}
                                      value={getItemField(item, f.key)}
                                      onChange={(e) => setItemField(idx, f.key, e.target.value)}
                                    />
                                  )}
                                  {errors[`item_${idx}_${f.key}`] && (
                                    <span className="homepage-tab__error">{errors[`item_${idx}_${f.key}`]}</span>
                                  )}
                                </>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="homepage-tab__field">
                <label>Status</label>
                <select
                  className="homepage-tab__input"
                  value={form.status}
                  onChange={(e) => setField('status', e.target.value)}
                >
                  <option value="published">Published (tampil di homepage)</option>
                  <option value="draft">Draft (disembunyikan)</option>
                </select>
              </div>
            </div>

            <div className="homepage-tab__modal-footer">
              <button type="button" className="homepage-tab__btn homepage-tab__btn--cancel" onClick={closeEdit} disabled={saving}>
                Batal
              </button>
              <button type="submit" className="homepage-tab__btn homepage-tab__btn--save" disabled={saving}>
                <FaSave /> {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {mediaPicker && (
        <MediaLibraryModal
          isOpen={true}
          onClose={closeMediaPicker}
          onSelect={handleMediaSelect}
          token={token}
        />
      )}
    </div>
  );
}

export default HomepageTab;
