import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import axios from 'axios';
import {
  FaCode, FaPlus, FaSave, FaTrash, FaCopy, FaSearch,
  FaTimes, FaEye, FaEyeSlash, FaTag, FaHtml5, FaCss3Alt,
  FaJs, FaLayerGroup, FaCheckCircle, FaExclamationCircle,
  FaSpinner, FaDatabase, FaEdit, FaChevronDown
} from 'react-icons/fa';
import { API_URL } from '../../../config';
import './CodeLibraryTab.css';

const LANG_CONFIG = {
  html:     { label: 'HTML',     icon: FaHtml5,    color: '#e34f26', bg: 'rgba(227,79,38,0.15)' },
  css:      { label: 'CSS',      icon: FaCss3Alt,  color: '#264de4', bg: 'rgba(38,77,228,0.15)' },
  js:       { label: 'JS',       icon: FaJs,       color: '#f0c000', bg: 'rgba(240,192,0,0.15)' },
  combined: { label: 'Combined', icon: FaLayerGroup,color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
};

const EMPTY_FORM = {
  name: '', description: '', language: 'html',
  tags: '', html_code: '', css_code: '', js_code: ''
};

/* ── Sub-komponen: Live Preview dalam iframe ── */
function LivePreview({ htmlCode, cssCode, jsCode }) {
  const previewDoc = useMemo(() => `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; font-size: 14px; background:#fff; }
  ${cssCode || ''}
</style>
</head><body>
${htmlCode || '<p style="color:#9ca3af;text-align:center;margin-top:60px;font-size:13px">Tulis HTML di editor untuk melihat preview</p>'}
<script>
try {
  ${jsCode || ''}
} catch(e) { console.error('Preview JS error:', e); }
</script>
</body></html>`, [htmlCode, cssCode, jsCode]);

  return (
    <iframe
      className="cl-preview__iframe"
      title="Live Preview"
      sandbox="allow-scripts"
      srcDoc={previewDoc}
      style={{ minHeight: '320px' }}
    />
  );
}

/* ── Sub-komponen: Code Editor dengan line numbers ── */
function CodeEditor({ value, onChange, language, placeholder, onTab }) {
  const textareaRef = useRef(null);
  const gutterRef   = useRef(null);
  const lines = (value || '').split('\n');
  const lineCount = Math.max(lines.length, 1);

  /* Sync scroll gutter dengan textarea */
  const handleScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = value.slice(0, start) + '  ' + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
    if (onTab) onTab(e);
  };

  return (
    <div className="cl-editor__wrap">
      <div className="cl-editor__gutter" ref={gutterRef}>
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i + 1}>{i + 1}</span>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className={`cl-editor__textarea cl-editor__textarea--${language}`}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
      />
    </div>
  );
}

/* ── Main Component ── */
export default function CodeLibraryTab({ token }) {
  const [snippets,       setSnippets]       = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [saving,         setSaving]         = useState(false);
  const [deleting,       setDeleting]       = useState(false);
  const [search,         setSearch]         = useState('');
  const [langFilter,     setLangFilter]     = useState('all');
  const [selected,       setSelected]       = useState(null);
  const [form,           setForm]           = useState(EMPTY_FORM);
  const [activeTab,      setActiveTab]      = useState('html');
  const [showPreview,    setShowPreview]    = useState(true);
  const [isNew,          setIsNew]          = useState(false);
  const [toast,          setToast]          = useState(null);
  const [copied,         setCopied]         = useState(null); // 'html'|'css'|'js'|null
  const [confirmDelete,  setConfirmDelete]  = useState(false);
  const [metaOpen,       setMetaOpen]       = useState(false);

  /* ── Toast ── */
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  /* ── Fetch (hanya langFilter yang trigger refetch; search = client-side) ── */
  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (langFilter && langFilter !== 'all') params.lang = langFilter;
      const res = await axios.get(`${API_URL}/code-snippets`, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setSnippets(res.data.data || []);
    } catch (err) {
      const msg = err.response?.status === 404
        ? 'Endpoint tidak ditemukan — pastikan server berjalan.'
        : err.response?.data?.message || 'Gagal memuat library snippet.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [langFilter, token, showToast]);

  useEffect(() => {
    const load = async () => {
      await fetchSnippets();
    };
    load();
  }, [fetchSnippets]);

  /* ── Client-side filter ── */
  const filteredSnippets = snippets.filter(s => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.tags?.toLowerCase().includes(q)
    );
  });

  /* ── Handlers ── */
  const handleSelectSnippet = (snippet) => {
    setSelected(snippet.id);
    setForm({
      name:        snippet.name        || '',
      description: snippet.description || '',
      language:    snippet.language    || 'html',
      tags:        snippet.tags        || '',
      html_code:   snippet.html_code   || '',
      css_code:    snippet.css_code    || '',
      js_code:     snippet.js_code     || '',
    });
    setIsNew(false);
    setActiveTab('html');
    setConfirmDelete(false);
    setMetaOpen(false);
  };

  const handleNew = () => {
    setSelected(null);
    setForm(EMPTY_FORM);
    setIsNew(true);
    setActiveTab('html');
    setConfirmDelete(false);
    setMetaOpen(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { showToast('Nama snippet wajib diisi!', 'error'); return; }
    setSaving(true);
    try {
      if (isNew) {
        const res = await axios.post(`${API_URL}/code-snippets`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showToast('Snippet berhasil disimpan ke library! 🎉');
        const newId = res.data.data?.id;
        setIsNew(false);
        setSelected(newId);
        await fetchSnippets();
      } else {
        await axios.put(`${API_URL}/code-snippets/${selected}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showToast('Snippet berhasil diperbarui!');
        await fetchSnippets();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan snippet.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/code-snippets/${selected}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Snippet dihapus dari library.');
      setSelected(null);
      setForm(EMPTY_FORM);
      setIsNew(false);
      setConfirmDelete(false);
      await fetchSnippets();
    } catch {
      showToast('Gagal menghapus snippet.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleCopy = async (codeType) => {
    const code = codeType === 'html' ? form.html_code
               : codeType === 'css'  ? form.css_code
               : form.js_code;
    try {
      await navigator.clipboard.writeText(code || '');
      setCopied(codeType);
      showToast(`Kode ${codeType.toUpperCase()} berhasil disalin!`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      showToast('Salin gagal — coba manual.', 'error');
    }
  };

  const EDITOR_TABS = [
    { key: 'html', label: 'HTML',       Icon: FaHtml5,   color: '#e34f26',
      placeholder: `<!-- Tulis HTML di sini -->\n<div class="komponen">\n  <h2>Judul</h2>\n  <p>Konten halaman...</p>\n</div>` },
    { key: 'css',  label: 'CSS',        Icon: FaCss3Alt, color: '#264de4',
      placeholder: `/* Tulis CSS di sini */\n.komponen {\n  background: #f0f4ff;\n  padding: 1.5rem;\n  border-radius: 12px;\n}` },
    { key: 'js',   label: 'JavaScript', Icon: FaJs,      color: '#f0c000',
      placeholder: `// Tulis JavaScript di sini\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('Loaded');\n});` },
  ];

  const activeCode = form[`${activeTab}_code`] || '';
  const lineCount  = (activeCode).split('\n').length;

  return (
    <div className="cl-root">

      {/* ── Toast ── */}
      {toast && (
        <div className={`cl-toast cl-toast--${toast.type}`}>
          {toast.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
          <span>{toast.msg}</span>
          <button className="cl-toast__close" onClick={() => setToast(null)}><FaTimes /></button>
        </div>
      )}

      {/* ── Header ── */}
      <div className="cl-header">
        <div className="cl-header__left">
          <div className="cl-header__icon"><FaCode /></div>
          <div>
            <h2 className="cl-header__title">Code Library</h2>
            <p className="cl-header__sub">Simpan &amp; kelola snippet HTML, CSS, JavaScript yang bisa dipakai ulang</p>
          </div>
        </div>
        <div className="cl-header__actions">
          <button className="cl-btn cl-btn--ghost cl-btn--sm" onClick={fetchSnippets} title="Muat ulang">
            <FaSpinner className={loading ? 'spin' : ''} style={{ opacity: loading ? 1 : 0.5 }} />
          </button>
          <button className="cl-btn cl-btn--primary" onClick={handleNew}>
            <FaPlus /> Snippet Baru
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="cl-body">

        {/* ── Sidebar: daftar snippet ── */}
        <aside className="cl-sidebar">
          <div className="cl-sidebar__controls">
            {/* Search */}
            <div className="cl-search">
              <FaSearch className="cl-search__icon" />
              <input
                type="text"
                className="cl-search__input"
                placeholder="Cari nama, tag, deskripsi..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="cl-search__clear" onClick={() => setSearch('')}><FaTimes /></button>
              )}
            </div>
            {/* Lang filter */}
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
            <div className="cl-sidebar__count">
              {filteredSnippets.length} snippet {search && `(filter: "${search}")`}
            </div>
          </div>

          {/* Snippet list */}
          <div className="cl-snippet-list">
            {loading ? (
              <div className="cl-empty">
                <FaSpinner className="spin" style={{ fontSize: '1.5rem', color: '#22c55e' }} />
                <span>Memuat library...</span>
              </div>
            ) : filteredSnippets.length === 0 ? (
              <div className="cl-empty">
                <FaDatabase style={{ fontSize: '2rem', opacity: 0.25 }} />
                <span>{search ? `Tidak ada hasil untuk "${search}"` : 'Library masih kosong'}</span>
                {!search && (
                  <button className="cl-btn cl-btn--outline-sm" onClick={handleNew}>
                    + Buat Snippet Pertama
                  </button>
                )}
              </div>
            ) : (
              filteredSnippets.map(snippet => {
                const cfg = LANG_CONFIG[snippet.language] || LANG_CONFIG.html;
                const Icon = cfg.icon;
                const isActive = selected === snippet.id && !isNew;
                return (
                  <div
                    key={snippet.id}
                    className={`cl-card ${isActive ? 'cl-card--active' : ''}`}
                    onClick={() => handleSelectSnippet(snippet)}
                    title={snippet.description || snippet.name}
                  >
                    <div className="cl-card__icon" style={{ background: cfg.bg, color: cfg.color }}>
                      <Icon />
                    </div>
                    <div className="cl-card__body">
                      <p className="cl-card__name">{snippet.name}</p>
                      <div className="cl-card__meta">
                        <span className="cl-lang-badge" style={{ background: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                        {snippet.tags && snippet.tags.split(',').slice(0, 2).map(t => t.trim()).filter(Boolean).map(t => (
                          <span key={t} className="cl-tag"><FaTag />{t}</span>
                        ))}
                      </div>
                    </div>
                    {isActive && <FaEdit className="cl-card__edit-icon" />}
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* ── Main editor panel ── */}
        <main className="cl-editor-panel">
          {!isNew && !selected ? (

            /* Empty state */
            <div className="cl-editor-empty">
              <div className="cl-editor-empty__icon"><FaCode /></div>
              <h3>Pilih snippet atau buat baru</h3>
              <p>Klik snippet dari daftar kiri, atau klik &ldquo;Snippet Baru&rdquo; untuk mulai menulis kode reusable.</p>
              <button className="cl-btn cl-btn--primary" onClick={handleNew}>
                <FaPlus /> Buat Snippet Baru
              </button>
            </div>

          ) : (
            <>
              {/* ── Editor header ── */}
              <div className="cl-editor-header">
                <div className="cl-editor-header__fields">
                  <input
                    type="text"
                    className="cl-input cl-input--name"
                    placeholder="Nama snippet..."
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  />

                  {/* Meta accordion */}
                  <button
                    type="button"
                    className="cl-meta-toggle"
                    onClick={() => setMetaOpen(p => !p)}
                  >
                    <span>Tag &amp; Keterangan</span>
                    <FaChevronDown className={metaOpen ? 'rotated' : ''} />
                  </button>
                  {metaOpen && (
                    <div className="cl-meta-fields">
                      <div className="cl-editor-header__row">
                        <input
                          type="text"
                          className="cl-input cl-input--tags"
                          placeholder="Tag (pisah koma): button, card, form..."
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
                          <option value="combined">Combined (HTML+CSS+JS)</option>
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
                  )}
                </div>

                {/* Action buttons */}
                <div className="cl-editor-actions">
                  <button
                    className="cl-btn cl-btn--ghost cl-btn--sm"
                    onClick={() => setShowPreview(p => !p)}
                    title={showPreview ? 'Sembunyikan Preview' : 'Tampilkan Preview'}
                  >
                    {showPreview ? <FaEyeSlash /> : <FaEye />}
                    <span className="cl-btn-label">{showPreview ? 'Hide' : 'Preview'}</span>
                  </button>

                  {!isNew && !confirmDelete ? (
                    <button
                      className="cl-btn cl-btn--danger cl-btn--sm"
                      onClick={() => setConfirmDelete(true)}
                      title="Hapus snippet"
                    >
                      <FaTrash />
                    </button>
                  ) : confirmDelete ? (
                    <div className="cl-confirm-delete">
                      <span>Hapus?</span>
                      <button className="cl-btn cl-btn--danger cl-btn--xs" onClick={handleDelete} disabled={deleting}>
                        {deleting ? <FaSpinner className="spin" /> : 'Ya'}
                      </button>
                      <button className="cl-btn cl-btn--ghost cl-btn--xs" onClick={() => setConfirmDelete(false)}>Batal</button>
                    </div>
                  ) : null}

                  <button
                    className="cl-btn cl-btn--primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? <FaSpinner className="spin" /> : <FaSave />}
                    {isNew ? 'Simpan' : 'Perbarui'}
                  </button>
                </div>
              </div>

              {/* ── Workspace: editor + preview ── */}
              <div className={`cl-workspace ${showPreview ? 'cl-workspace--split' : ''}`}>

                {/* Code Area */}
                <div className="cl-code-area">
                  {/* Tab bar */}
                  <div className="cl-tabs">
                    {EDITOR_TABS.map(({ key, label, Icon, color }) => (
                      <button
                        key={key}
                        className={`cl-tab ${activeTab === key ? 'cl-tab--active' : ''}`}
                        onClick={() => setActiveTab(key)}
                        style={activeTab === key ? { borderBottomColor: color, color: '#e2e8f0' } : {}}
                      >
                        <Icon style={{ color }} />
                        {label}
                        {form[`${key}_code`] && (
                          <span className="cl-tab__dot" style={{ background: color }} />
                        )}
                      </button>
                    ))}
                    <div className="cl-tabs__spacer" />
                    <button
                      className="cl-copy-btn"
                      onClick={() => handleCopy(activeTab)}
                      title={`Salin kode ${activeTab.toUpperCase()}`}
                    >
                      {copied === activeTab ? <FaCheckCircle style={{ color: '#22c55e' }} /> : <FaCopy />}
                      <span>{copied === activeTab ? 'Tersalin!' : 'Salin'}</span>
                    </button>
                    <span className="cl-line-count">{lineCount} baris</span>
                  </div>

                  {/* Editors */}
                  {EDITOR_TABS.map(({ key, placeholder }) =>
                    activeTab === key ? (
                      <CodeEditor
                        key={key}
                        value={form[`${key}_code`]}
                        onChange={v => setForm(p => ({ ...p, [`${key}_code`]: v }))}
                        language={key}
                        placeholder={placeholder}
                      />
                    ) : null
                  )}
                </div>

                {/* Live Preview */}
                {showPreview && (
                  <div className="cl-preview">
                    <div className="cl-preview__header">
                      <FaEye />
                      <span>Live Preview</span>
                      <span className="cl-preview__hint">HTML + CSS + JS</span>
                      <div className="cl-preview__dots">
                        <span /><span /><span />
                      </div>
                    </div>
                    <LivePreview
                      htmlCode={form.html_code}
                      cssCode={form.css_code}
                      jsCode={form.js_code}
                    />
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
