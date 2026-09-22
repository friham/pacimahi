import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import {
  FaCode, FaTimes, FaSearch, FaHtml5, FaCss3Alt, FaJs,
  FaLayerGroup, FaTag, FaEye, FaCheckCircle, FaSpinner,
  FaDatabase, FaPlus
} from 'react-icons/fa';
import { API_URL } from '../../config';
import './CodeEditorModal.css';

const LANG_CONFIG = {
  html:     { label: 'HTML',     Icon: FaHtml5,    color: '#e34f26', bg: 'rgba(227,79,38,0.12)' },
  css:      { label: 'CSS',      Icon: FaCss3Alt,  color: '#264de4', bg: 'rgba(38,77,228,0.12)' },
  js:       { label: 'JS',       Icon: FaJs,       color: '#f0c000', bg: 'rgba(240,192,0,0.12)' },
  combined: { label: 'Combined', Icon: FaLayerGroup,color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
};

function MiniPreview({ htmlCode, cssCode }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{margin:0;padding:10px;font-family:system-ui,sans-serif;font-size:13px;}${cssCode||''}</style>
</head><body>${htmlCode||'<p style="color:#9ca3af;text-align:center;padding-top:30px;font-size:12px;">Tidak ada preview</p>'}</body></html>`);
    doc.close();
  }, [htmlCode, cssCode]);
  return <iframe ref={iframeRef} className="cem-preview__iframe" title="Preview" sandbox="allow-scripts" />;
}

export default function CodeEditorModal({ open, onClose, onInsert }) {
  const [tab, setTab] = useState('library'); // 'library' | 'editor'
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(false);

  // Custom code editor state (when tab === 'editor')
  const [custom, setCustom] = useState({ html_code: '', css_code: '', name: 'Custom Snippet' });
  const [editorTab, setEditorTab] = useState('html');
  const [inserting, setInserting] = useState(false);

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (langFilter !== 'all') params.lang = langFilter;
      if (search) params.search = search;
      const res = await axios.get(`${API_URL}/code-snippets`, { params });
      setSnippets(res.data.data || []);
    } catch { /* noop */ }
    finally { setLoading(false); }
  }, [langFilter, search]);

  useEffect(() => {
    if (open) fetchSnippets();
  }, [open, fetchSnippets]);

  const handleInsertSnippet = (snippet) => {
    setInserting(true);
    onInsert({
      html_code: snippet.html_code || '',
      css_code:  snippet.css_code  || '',
      js_code:   snippet.js_code   || '',
      snippet_name: snippet.name,
      snippet_id:   snippet.id,
    });
    setTimeout(() => { setInserting(false); onClose(); }, 300);
  };

  const handleInsertCustom = () => {
    setInserting(true);
    onInsert({
      html_code: custom.html_code || '',
      css_code:  custom.css_code  || '',
      js_code:   '',
      snippet_name: custom.name || 'Custom Code',
      snippet_id: null,
    });
    setTimeout(() => { setInserting(false); onClose(); }, 300);
  };

  if (!open) return null;

  const filtered = snippets.filter(s => {
    const q = search.toLowerCase();
    return !q || s.name?.toLowerCase().includes(q) || s.tags?.toLowerCase().includes(q);
  });

  return (
    <div className="cem-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cem-modal">
        {/* Header */}
        <div className="cem-modal__header">
          <div className="cem-modal__title">
            <div className="cem-modal__icon"><FaCode /></div>
            <div>
              <h3>Pilih atau Tulis Kode</h3>
              <p>Dari Code Library atau tulis kode HTML/CSS kustom</p>
            </div>
          </div>
          <button className="cem-close" onClick={onClose}><FaTimes /></button>
        </div>

        {/* Tab Switcher */}
        <div className="cem-tabs">
          <button
            className={`cem-tab ${tab === 'library' ? 'cem-tab--active' : ''}`}
            onClick={() => setTab('library')}
          >
            <FaDatabase /> Code Library
          </button>
          <button
            className={`cem-tab ${tab === 'editor' ? 'cem-tab--active' : ''}`}
            onClick={() => setTab('editor')}
          >
            <FaPlus /> Tulis Kustom
          </button>
        </div>

        {/* ── Library Tab ── */}
        {tab === 'library' && (
          <div className="cem-library">
            {/* Search + filter */}
            <div className="cem-library__controls">
              <div className="cem-search">
                <FaSearch className="cem-search__icon" />
                <input
                  type="text"
                  className="cem-search__input"
                  placeholder="Cari snippet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && <button className="cem-search__clear" onClick={() => setSearch('')}><FaTimes /></button>}
              </div>
              <div className="cem-filter">
                {['all','html','css','js','combined'].map(l => (
                  <button
                    key={l}
                    className={`cem-filter-pill ${langFilter === l ? 'cem-filter-pill--active' : ''}`}
                    onClick={() => setLangFilter(l)}
                  >
                    {l === 'all' ? 'Semua' : l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Snippet grid */}
            <div className="cem-snippet-grid">
              {loading ? (
                <div className="cem-loading"><FaSpinner className="cem-spin" /> Memuat snippet...</div>
              ) : filtered.length === 0 ? (
                <div className="cem-empty">
                  <FaDatabase />
                  <p>{search ? 'Tidak ada snippet yang cocok' : 'Library kosong — buat snippet di tab Code Library'}</p>
                </div>
              ) : (
                filtered.map(snippet => {
                  const cfg = LANG_CONFIG[snippet.language] || LANG_CONFIG.html;
                  const Icon = cfg.Icon;
                  const isSelected = selected?.id === snippet.id;
                  return (
                    <div
                      key={snippet.id}
                      className={`cem-card ${isSelected ? 'cem-card--selected' : ''}`}
                      onClick={() => setSelected(snippet)}
                    >
                      <div className="cem-card__header">
                        <div className="cem-card__lang-icon" style={{ color: cfg.color, background: cfg.bg }}>
                          <Icon />
                        </div>
                        <span className="cem-card__name">{snippet.name}</span>
                        {isSelected && <FaCheckCircle className="cem-card__check" />}
                      </div>
                      {snippet.description && (
                        <p className="cem-card__desc">{snippet.description}</p>
                      )}
                      <div className="cem-card__footer">
                        <span className="cem-card__lang" style={{ color: cfg.color }}>{cfg.label}</span>
                        {snippet.tags && snippet.tags.split(',').slice(0,3).map(t => (
                          <span key={t} className="cem-card__tag"><FaTag />{t.trim()}</span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Selected snippet detail */}
            {selected && (
              <div className="cem-selected-bar">
                <div className="cem-selected-bar__info">
                  <strong>{selected.name}</strong>
                  <span>akan dimasukkan ke halaman</span>
                </div>
                <div className="cem-selected-bar__actions">
                  <button className="cem-btn cem-btn--ghost" onClick={() => setPreview(p => !p)}>
                    <FaEye /> {preview ? 'Tutup' : 'Preview'}
                  </button>
                  <button className="cem-btn cem-btn--primary" onClick={() => handleInsertSnippet(selected)} disabled={inserting}>
                    {inserting ? <FaSpinner className="cem-spin" /> : <FaCode />}
                    Insert ke Halaman
                  </button>
                </div>
              </div>
            )}

            {/* Mini preview panel */}
            {selected && preview && (
              <div className="cem-mini-preview">
                <div className="cem-mini-preview__label"><FaEye /> Preview: {selected.name}</div>
                <MiniPreview htmlCode={selected.html_code} cssCode={selected.css_code} />
              </div>
            )}
          </div>
        )}

        {/* ── Custom Editor Tab ── */}
        {tab === 'editor' && (
          <div className="cem-custom">
            <div className="cem-custom__meta">
              <input
                type="text"
                className="cem-input"
                placeholder="Nama blok kode ini..."
                value={custom.name}
                onChange={e => setCustom(p => ({ ...p, name: e.target.value }))}
              />
            </div>

            {/* Tab: HTML / CSS */}
            <div className="cem-editor-tabs">
              {[
                { key: 'html', label: 'HTML', color: '#e34f26' },
                { key: 'css',  label: 'CSS',  color: '#264de4' },
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  className={`cem-etab ${editorTab === key ? 'cem-etab--active' : ''}`}
                  style={editorTab === key ? { borderBottomColor: color } : {}}
                  onClick={() => setEditorTab(key)}
                >
                  {label}
                </button>
              ))}
              <div className="cem-editor-tabs__spacer" />
              <button className="cem-btn cem-btn--ghost cem-btn--sm" onClick={() => setPreview(p => !p)}>
                <FaEye /> {preview ? 'Tutup Preview' : 'Live Preview'}
              </button>
            </div>

            <div className={`cem-custom__workspace ${preview ? 'cem-custom__workspace--split' : ''}`}>
              {/* Editor */}
              <div className="cem-custom__editor-wrap">
                {editorTab === 'html' && (
                  <textarea
                    className="cem-code-textarea cem-code-textarea--html"
                    value={custom.html_code}
                    onChange={e => setCustom(p => ({ ...p, html_code: e.target.value }))}
                    placeholder={'<!-- Tulis HTML di sini -->\n<div class="box">\n  <h2>Judul</h2>\n  <p>Konten</p>\n</div>'}
                    spellCheck={false}
                  />
                )}
                {editorTab === 'css' && (
                  <textarea
                    className="cem-code-textarea cem-code-textarea--css"
                    value={custom.css_code}
                    onChange={e => setCustom(p => ({ ...p, css_code: e.target.value }))}
                    placeholder={'/* Tulis CSS di sini */\n.box {\n  background: #f0f4ff;\n  padding: 1.5rem;\n  border-radius: 8px;\n}'}
                    spellCheck={false}
                  />
                )}
              </div>

              {/* Preview */}
              {preview && (
                <div className="cem-custom__preview">
                  <div className="cem-custom__preview-label"><FaEye /> Live Preview</div>
                  <MiniPreview htmlCode={custom.html_code} cssCode={custom.css_code} />
                </div>
              )}
            </div>

            <div className="cem-custom__actions">
              <button className="cem-btn cem-btn--ghost" onClick={onClose}>Batal</button>
              <button
                className="cem-btn cem-btn--primary"
                onClick={handleInsertCustom}
                disabled={!custom.html_code.trim() && !custom.css_code.trim()}
              >
                <FaCode /> Insert ke Halaman
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
