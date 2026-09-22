import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import {
  FaCode, FaPlus, FaSave, FaTrash, FaCopy, FaSearch,
  FaTimes, FaEdit, FaEye, FaTag, FaHtml5, FaCss3Alt,
  FaJs, FaLayerGroup, FaCheckCircle, FaExclamationCircle,
  FaSpinner, FaDatabase, FaShareAlt
} from 'react-icons/fa';
import { API_URL } from '../../../config';
import './CodeLibraryTab.css';

const LANG_CONFIG = {
  html: { label: 'HTML', icon: FaHtml5, color: '#e34f26', bg: '#fff4f1' },
  css:  { label: 'CSS',  icon: FaCss3Alt, color: '#264de4', bg: '#f0f4ff' },
  js:   { label: 'JS',   icon: FaJs,      color: '#f7df1e', bg: '#fffef0', textColor: '#333' },
  combined: { label: 'Combined', icon: FaLayerGroup, color: '#0b4619', bg: '#f0faf4' },
};

const EMPTY_FORM = {
  name: '', description: '', language: 'html',
  tags: '', html_code: '', css_code: '', js_code: ''
};

function LivePreview({ htmlCode, cssCode }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body { margin: 0; padding: 12px; font-family: system-ui, sans-serif; font-size: 14px; }
  ${cssCode || ''}
</style>
</head><body>${htmlCode || '<p style="color:#9ca3af;text-align:center;margin-top:40px">Belum ada konten HTML untuk dipreview</p>'}</body></html>`);
    doc.close();
  }, [htmlCode, cssCode]);

  return (
    <iframe
      ref={iframeRef}
      className="cl-preview__iframe"
      title="Live Preview"
      sandbox="allow-scripts"
    />
  );
}

function CodeEditor({ value, onChange, language, placeholder }) {
  const lineCount = (value || '').split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  return (
    <div className="cl-editor__wrap">
      <div className="cl-editor__gutter">
        {lines.map(n => <span key={n}>{n}</span>)}
      </div>
      <textarea
        className={`cl-editor__textarea cl-editor__textarea--${language}`}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
      />
    </div>
  );
}

export default function CodeLibraryTab({ token }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [selected, setSelected] = useState(null); // currently selected snippet id
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeEditorTab, setActiveEditorTab] = useState('html');
  const [showPreview, setShowPreview] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (langFilter && langFilter !== 'all') params.lang = langFilter;
      if (search) params.search = search;
      const res = await axios.get(`${API_URL}/code-snippets`, { params });
      setSnippets(res.data.data || []);
    } catch {
      showToast('Gagal memuat snippet.', 'error');
    } finally {
      setLoading(false);
    }
  }, [langFilter, search]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const handleSelectSnippet = (snippet) => {
    setSelected(snippet.id);
    setForm({
      name: snippet.name || '',
      description: snippet.description || '',
      language: snippet.language || 'html',
      tags: snippet.tags || '',
      html_code: snippet.html_code || '',
      css_code: snippet.css_code || '',
      js_code: snippet.js_code || '',
    });
    setIsNew(false);
    setActiveEditorTab('html');
  };

  const handleNew = () => {
    setSelected(null);
    setForm(EMPTY_FORM);
    setIsNew(true);
    setActiveEditorTab('html');
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      showToast('Nama snippet wajib diisi!', 'error');
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        const res = await axios.post(`${API_URL}/code-snippets`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showToast('Snippet berhasil disimpan ke library! 🎉');
        setIsNew(false);
        setSelected(res.data.data?.id);
        fetchSnippets();
      } else {
        await axios.put(`${API_URL}/code-snippets/${selected}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showToast('Snippet berhasil diperbarui!');
        fetchSnippets();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan snippet.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    if (!window.confirm('Hapus snippet ini dari library?')) return;
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/code-snippets/${selected}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Snippet dihapus dari library.');
      setSelected(null);
      setForm(EMPTY_FORM);
      setIsNew(false);
      fetchSnippets();
    } catch {
      showToast('Gagal menghapus snippet.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast('Kode berhasil disalin!');
    });
  };

  const getActiveCode = () => {
    if (activeEditorTab === 'html') return form.html_code;
    if (activeEditorTab === 'css') return form.css_code;
    return form.js_code;
  };

  const filteredSnippets = snippets.filter(s => {
    const q = search.toLowerCase();
    return !q || s.name?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q) || s.tags?.toLowerCase().includes(q);
  });

  return (
    <div className="cl-root">
      {/* Toast */}
      {toast && (
        <div className={`cl-toast cl-toast--${toast.type}`}>
          {toast.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="cl-header">
        <div className="cl-header__left">
          <div className="cl-header__icon"><FaCode /></div>
          <div>
            <h2 className="cl-header__title">Code Library</h2>
            <p className="cl-header__sub">Kelola dan simpan snippet HTML, CSS, JavaScript reusable</p>
          </div>
        </div>
        <button className="cl-btn cl-btn--primary" onClick={handleNew}>
          <FaPlus /> Snippet Baru
        </button>
      </div>

      {/* Body */}
      <div className="cl-body">
        {/* ── Sidebar: Snippet List ── */}
        <aside className="cl-sidebar">
          {/* Search + Filter */}
          <div className="cl-sidebar__controls">
            <div className="cl-search">
              <FaSearch className="cl-search__icon" />
              <input
                type="text"
                className="cl-search__input"
                placeholder="Cari snippet..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="cl-search__clear" onClick={() => setSearch('')}>
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="cl-lang-filter">
              {['all', 'html', 'css', 'js', 'combined'].map(l => (
                <button
                  key={l}
                  className={`cl-lang-pill ${langFilter === l ? 'cl-lang-pill--active' : ''}`}
                  onClick={() => setLangFilter(l)}
                >
                  {l === 'all' ? 'Semua' : l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Snippet Cards */}
          <div className="cl-snippet-list">
            {loading ? (
              <div className="cl-empty"><FaSpinner className="spin" /><span>Memuat...</span></div>
            ) : filteredSnippets.length === 0 ? (
              <div className="cl-empty">
                <FaDatabase />
                <span>{search ? 'Tidak ada snippet yang cocok' : 'Library masih kosong'}</span>
                <button className="cl-btn cl-btn--outline-sm" onClick={handleNew}>+ Buat Snippet</button>
              </div>
            ) : (
              filteredSnippets.map(snippet => {
                const langCfg = LANG_CONFIG[snippet.language] || LANG_CONFIG.html;
                const Icon = langCfg.icon;
                const isActive = selected === snippet.id;
                return (
                  <div
                    key={snippet.id}
                    className={`cl-card ${isActive ? 'cl-card--active' : ''}`}
                    onClick={() => handleSelectSnippet(snippet)}
                  >
                    <div className="cl-card__icon" style={{ background: langCfg.bg, color: langCfg.color }}>
                      <Icon />
                    </div>
                    <div className="cl-card__body">
                      <p className="cl-card__name">{snippet.name}</p>
                      <div className="cl-card__meta">
                        <span className="cl-lang-badge" style={{ background: langCfg.bg, color: langCfg.color }}>
                          {langCfg.label}
                        </span>
                        {snippet.tags && snippet.tags.split(',').slice(0, 2).map(t => (
                          <span key={t} className="cl-tag"><FaTag />{t.trim()}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* ── Main Editor Panel ── */}
        <main className="cl-editor-panel">
          {!isNew && !selected ? (
            <div className="cl-editor-empty">
              <div className="cl-editor-empty__icon"><FaCode /></div>
              <h3>Pilih snippet atau buat baru</h3>
              <p>Klik snippet dari daftar di kiri, atau klik tombol "Snippet Baru" untuk mulai menulis kode.</p>
              <button className="cl-btn cl-btn--primary" onClick={handleNew}><FaPlus /> Snippet Baru</button>
            </div>
          ) : (
            <>
              {/* Editor Form Header */}
              <div className="cl-editor-header">
                <div className="cl-editor-header__fields">
                  <input
                    type="text"
                    className="cl-input cl-input--name"
                    placeholder="Nama snippet..."
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  />
                  <div className="cl-editor-header__row">
                    <input
                      type="text"
                      className="cl-input cl-input--tags"
                      placeholder="Tag (pisah koma): button, card, table..."
                      value={form.tags}
                      onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                    />
                    <select
                      className="cl-select"
                      value={form.language}
                      onChange={e => setForm(p => ({ ...p, language: e.target.value }))}
                    >
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="js">JavaScript</option>
                      <option value="combined">Combined (HTML+CSS)</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    className="cl-input"
                    placeholder="Deskripsi singkat snippet ini..."
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  />
                </div>

                {/* Action Buttons */}
                <div className="cl-editor-actions">
                  <button
                    className="cl-btn cl-btn--ghost"
                    onClick={() => setShowPreview(p => !p)}
                    title={showPreview ? 'Sembunyikan Preview' : 'Tampilkan Preview'}
                  >
                    <FaEye /> {showPreview ? 'Sembunyikan' : 'Preview'}
                  </button>
                  <button
                    className="cl-btn cl-btn--ghost"
                    onClick={() => handleCopy(getActiveCode())}
                    title="Salin kode aktif"
                  >
                    {copied ? <FaCheckCircle /> : <FaCopy />}
                    {copied ? 'Tersalin!' : 'Salin'}
                  </button>
                  {!isNew && (
                    <button
                      className="cl-btn cl-btn--danger"
                      onClick={handleDelete}
                      disabled={deleting}
                      title="Hapus snippet"
                    >
                      {deleting ? <FaSpinner className="spin" /> : <FaTrash />}
                      Hapus
                    </button>
                  )}
                  <button
                    className="cl-btn cl-btn--primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? <FaSpinner className="spin" /> : <FaSave />}
                    {isNew ? 'Simpan ke Library' : 'Perbarui'}
                  </button>
                </div>
              </div>

              {/* Editor + Preview split */}
              <div className={`cl-workspace ${showPreview ? 'cl-workspace--split' : ''}`}>
                {/* Code Area */}
                <div className="cl-code-area">
                  {/* Tab Bar */}
                  <div className="cl-tabs">
                    {[
                      { key: 'html', label: 'HTML', Icon: FaHtml5, color: '#e34f26' },
                      { key: 'css',  label: 'CSS',  Icon: FaCss3Alt, color: '#264de4' },
                      { key: 'js',   label: 'JS',   Icon: FaJs,      color: '#f0c000' },
                    ].map(({ key, label, Icon, color }) => (
                      <button
                        key={key}
                        className={`cl-tab ${activeEditorTab === key ? 'cl-tab--active' : ''}`}
                        onClick={() => setActiveEditorTab(key)}
                        style={activeEditorTab === key ? { borderBottomColor: color } : {}}
                      >
                        <Icon style={{ color }} /> {label}
                      </button>
                    ))}
                    <div className="cl-tabs__spacer" />
                    <span className="cl-line-count">
                      {(getActiveCode() || '').split('\n').length} baris
                    </span>
                  </div>

                  {/* Actual Editor */}
                  {activeEditorTab === 'html' && (
                    <CodeEditor
                      value={form.html_code}
                      onChange={v => setForm(p => ({ ...p, html_code: v }))}
                      language="html"
                      placeholder={`<!-- Tulis HTML di sini -->\n<div class="my-component">\n  <h1>Judul</h1>\n  <p>Konten</p>\n</div>`}
                    />
                  )}
                  {activeEditorTab === 'css' && (
                    <CodeEditor
                      value={form.css_code}
                      onChange={v => setForm(p => ({ ...p, css_code: v }))}
                      language="css"
                      placeholder={`/* Tulis CSS di sini */\n.my-component {\n  background: #f0f4ff;\n  padding: 1rem;\n}`}
                    />
                  )}
                  {activeEditorTab === 'js' && (
                    <CodeEditor
                      value={form.js_code}
                      onChange={v => setForm(p => ({ ...p, js_code: v }))}
                      language="js"
                      placeholder={`// Tulis JavaScript di sini\ndocument.addEventListener('DOMContentLoaded', function() {\n  console.log('Snippet loaded');\n});`}
                    />
                  )}
                </div>

                {/* Live Preview */}
                {showPreview && (
                  <div className="cl-preview">
                    <div className="cl-preview__header">
                      <FaEye /> Live Preview
                      <span className="cl-preview__hint">(HTML + CSS digabung)</span>
                    </div>
                    <LivePreview htmlCode={form.html_code} cssCode={form.css_code} />
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
