import { useState, useRef, useEffect } from 'react';
import React from 'react';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter,
  FaAlignRight, FaAlignJustify, FaListUl, FaListOl,
  FaLink, FaImage, FaTable, FaCode, FaUndo, FaRedo
} from 'react-icons/fa';
import { SERVER_URL } from '../../config';
import './RichTextEditor.css';

const RTE_TEXT_COLORS = [
  { label: 'Hitam',       color: '#000000' },
  { label: 'Putih',       color: '#ffffff' },
  { label: 'Abu',         color: '#6b7280' },
  { label: 'Abu Gelap',   color: '#374151' },
  { label: 'Coklat',      color: '#78350f' },
  { label: 'Merah',       color: '#b91c1c' },
  { label: 'Oranye',      color: '#c2410c' },
  { label: 'Kuning',      color: '#a16207' },
  { label: 'Hijau Tua',   color: '#15803d' },
  { label: 'Hijau',       color: '#16a34a' },
  { label: 'Teal',        color: '#0f766e' },
  { label: 'Cyan',        color: '#0891b2' },
  { label: 'Biru Tua',    color: '#1e40af' },
  { label: 'Biru',        color: '#1d4ed8' },
  { label: 'Biru Muda',   color: '#3b82f6' },
  { label: 'Ungu',        color: '#6d28d9' },
  { label: 'Merah Muda',  color: '#db2777' },
  { label: 'Pink',        color: '#ec4899' },
  { label: 'Abu Muda',    color: '#9ca3af' },
  { label: 'Slate',       color: '#475569' },
];
const RTE_BG_COLORS = [
  { label: 'Tanpa Latar',    color: 'transparent' },
  { label: 'Putih',          color: '#ffffff' },
  { label: 'Abu Sangat Muda',color: '#f9fafb' },
  { label: 'Abu Muda',       color: '#f3f4f6' },
  { label: 'Kuning Lembut',  color: '#fef9c3' },
  { label: 'Oranye Muda',    color: '#ffedd5' },
  { label: 'Merah Muda',     color: '#fee2e2' },
  { label: 'Merah Muda 2',   color: '#fce7f3' },
  { label: 'Ungu Muda',      color: '#f3e8ff' },
  { label: 'Biru Muda',      color: '#dbeafe' },
  { label: 'Cyan Muda',      color: '#cffafe' },
  { label: 'Teal Muda',      color: '#ccfbf1' },
  { label: 'Hijau Muda',     color: '#dcfce7' },
  { label: 'Lime Muda',      color: '#ecfccb' },
  { label: 'Kuning 2',       color: '#fef08a' },
  { label: 'Abu Slate',      color: '#e2e8f0' },
  { label: 'Biru Abu',       color: '#dde1e7' },
  { label: 'Coklat Muda',    color: '#fef3c7' },
  { label: 'Salmon',         color: '#fecaca' },
  { label: 'Lavender',       color: '#e9d5ff' },
];

function ColorPaletteInline({ colors, onSelect, title, children }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  return (
    <div className="cms-colorpicker" ref={wrapRef}>
      <button
        type="button"
        className="rich-text-btn cms-rte-btn--color"
        title={title}
        onMouseDown={(e) => { e.preventDefault(); setOpen((v) => !v); }}
      >
        {children}
      </button>
      {open && (
        <div className="cms-colorpicker__popup">
          <div className="cms-colorpicker__label">{title}</div>
          <div className="cms-colorpicker__grid">
            {colors.map((c) => (
              <button
                key={c.color}
                type="button"
                className="cms-colorpicker__swatch"
                title={c.label}
                style={{
                  background: c.color === 'transparent' ? 'repeating-linear-gradient(45deg,#e5e7eb 0,#e5e7eb 4px,#fff 4px,#fff 8px)' : c.color,
                  border: c.color === '#ffffff' || c.color === 'transparent' ? '1.5px solid #d1d5db' : '1.5px solid transparent',
                }}
                onMouseDown={(e) => { e.preventDefault(); setOpen(false); onSelect(c.color); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RichTextEditor({ value = '', onChange, onOpenMediaLibrary }) {
  const editorRef = useRef(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlCode, setHtmlCode] = useState(value);
  const savedRangeRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (document.activeElement !== editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setHtmlCode(value || '');
  }, [value, isHtmlMode]);

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setHtmlCode(html);
    if (onChange) onChange(html);
  };

  const handleEditorBlur = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
    handleInput();
  };

  const ensureFocused = () => {
    if (!editorRef.current || isHtmlMode) return;
    editorRef.current.focus();
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
    }
  };

  const executeCommand = (command, val = null) => {
    if (isHtmlMode) return;
    ensureFocused();
    document.execCommand(command, false, val);
    if (editorRef.current) {
      handleInput();
    }
  };

  const handleHtmlCodeChange = (e) => {
    const code = e.target.value;
    setHtmlCode(code);
    if (onChange) onChange(code);
  };

  const toggleHtmlMode = () => {
    if (isHtmlMode) {
      setIsHtmlMode(false);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = htmlCode;
        }
      }, 0);
    } else {
      if (editorRef.current) {
        setHtmlCode(editorRef.current.innerHTML);
      }
      setIsHtmlMode(true);
    }
  };

  const insertLink = () => {
    ensureFocused();
    const url = prompt('Masukkan URL Link (contoh: https://contoh.go.id atau /profil):');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertTable = () => {
    const rows = prompt('Jumlah baris:', '3');
    const cols = prompt('Jumlah kolom:', '3');
    if (rows && cols) {
      const r = parseInt(rows, 10);
      const c = parseInt(cols, 10);
      if (r > 0 && c > 0) {
        let tableHtml = '<table style="width:100%; border-collapse: collapse; margin: 1rem 0;"><tbody>';
        for (let i = 0; i < r; i++) {
          tableHtml += '<tr>';
          for (let j = 0; j < c; j++) {
            tableHtml += '<td style="border: 1px solid #d1d5db; padding: 8px;">Sel</td>';
          }
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table><p></p>';
        executeCommand('insertHTML', tableHtml);
      }
    }
  };

  const handleInsertImage = () => {
    if (onOpenMediaLibrary) {
      onOpenMediaLibrary((imgUrl, alt) => {
        const fullUrl = imgUrl.startsWith('/') ? `${SERVER_URL}${imgUrl}` : imgUrl;
        const imgHtml = `<p><img src="${fullUrl}" alt="${alt || 'Gambar'}" style="max-width: 100%; height: auto; border-radius: 6px;" /></p><p></p>`;
        executeCommand('insertHTML', imgHtml);
      });
    } else {
      const url = prompt('Masukkan URL Gambar:');
      if (url) {
        executeCommand('insertImage', url);
      }
    }
  };

  const applyFontSize = (pxValue) => {
    ensureFocused();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    if (pxValue === 'default' || !pxValue) {
      try {
        const fragment = range.extractContents();
        fragment.querySelectorAll('*').forEach(el => {
          el.style.fontSize = '';
          if (!el.getAttribute('style')) el.removeAttribute('style');
          if (el.tagName.toLowerCase() === 'span' && !el.attributes.length) {
            const parent = el.parentNode;
            if (parent) {
              while (el.firstChild) parent.insertBefore(el.firstChild, el);
              parent.removeChild(el);
            }
          }
        });
        range.insertNode(fragment);
        if (editorRef.current) {
          editorRef.current.querySelectorAll('span:empty').forEach(el => el.remove());
          editorRef.current.normalize();
        }
      } catch {
        executeCommand('removeFormat', null);
      }
      handleInput();
      return;
    }

    const span = document.createElement('span');
    span.style.fontSize = pxValue;
    try {
      range.surroundContents(span);
    } catch {
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
    }
    sel.collapseToEnd();
    handleInput();
  };

  const applyBgColor = (colorValue) => {
    ensureFocused();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    if (colorValue === 'transparent' || colorValue === 'inherit' || !colorValue) {
      try {
        const fragment = range.extractContents();
        fragment.querySelectorAll('*').forEach(el => {
          el.style.backgroundColor = '';
          if (!el.getAttribute('style')) el.removeAttribute('style');
          if (el.tagName.toLowerCase() === 'span' && !el.attributes.length) {
            const parent = el.parentNode;
            if (parent) {
              while (el.firstChild) parent.insertBefore(el.firstChild, el);
              parent.removeChild(el);
            }
          }
        });
        range.insertNode(fragment);
        if (editorRef.current) {
          editorRef.current.querySelectorAll('span:empty').forEach(el => el.remove());
          editorRef.current.normalize();
        }
      } catch {
        executeCommand('hiliteColor', 'inherit');
      }
      handleInput();
      return;
    }

    const ok = document.execCommand('hiliteColor', false, colorValue);
    if (!ok) {
      const span = document.createElement('span');
      span.style.backgroundColor = colorValue;
      try {
        range.surroundContents(span);
      } catch {
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
      }
      sel.collapseToEnd();
    }
    handleInput();
  };

  const clearAllFormatting = () => {
    ensureFocused();
    if (!editorRef.current) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    const cleanNode = (node) => {
      if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
      node.removeAttribute('style');
      node.removeAttribute('color');
      node.removeAttribute('face');
      node.removeAttribute('size');
      node.removeAttribute('class');

      const children = Array.from(node.childNodes);
      for (const child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) cleanNode(child);
      }

      const tag = node.tagName.toLowerCase();
      if (['span', 'font', 'b', 'strong', 'i', 'em', 'u', 's', 'strike', 'a', 'mark'].includes(tag)) {
        const parent = node.parentNode;
        if (parent) {
          while (node.firstChild) parent.insertBefore(node.firstChild, node);
          parent.removeChild(node);
        }
      } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'].includes(tag)) {
        const p = document.createElement('p');
        while (node.firstChild) p.appendChild(node.firstChild);
        if (node.parentNode) node.parentNode.replaceChild(p, node);
      }
    };

    const hasSelection = !range.collapsed && editorRef.current.contains(range.commonAncestorContainer);
    if (hasSelection) {
      try {
        executeCommand('removeFormat', null);
        executeCommand('unlink', null);
        const fragment = range.extractContents();
        Array.from(fragment.childNodes).forEach(cleanNode);
        range.insertNode(fragment);
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        executeCommand('removeFormat', null);
        executeCommand('unlink', null);
        executeCommand('formatBlock', '<p>');
      } catch (err) {
        console.warn(err);
      }
      Array.from(editorRef.current.childNodes).forEach(cleanNode);
    }

    editorRef.current.querySelectorAll('span:empty, font:empty, b:empty, i:empty, u:empty, s:empty, a:empty').forEach(el => el.remove());
    editorRef.current.normalize();
    handleInput();
  };

  const fontFamilySelect = [
    { label: 'Huruf Default', value: '' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
  ];

  const fontSizeSelect = [
    { label: 'Ukuran', value: '' },
    { label: 'Kecil (12px)', value: '12px' },
    { label: 'Sedang (14px)', value: '14px' },
    { label: 'Biasa (16px)', value: '16px' },
    { label: 'Besar (18px)', value: '18px' },
    { label: 'Lebih Besar (22px)', value: '22px' },
    { label: 'Sangat Besar (28px)', value: '28px' },
    { label: 'Reset Ukuran', value: 'default' },
  ];

  const textColorSelect = [
    { label: '⬛ Hitam', value: '#111827' },
    { label: '🩶 Abu Gelap', value: '#374151' },
    { label: '🔵 Biru', value: '#1d4ed8' },
    { label: '🟢 Hijau', value: '#15803d' },
    { label: '🔴 Merah', value: '#b91c1c' },
    { label: '🟣 Ungu', value: '#6d28d9' },
    { label: '🟡 Kuning Tua', value: '#d97706' },
    { label: '🩵 Cyan', value: '#0891b2' },
  ];

  const bgColorSelect = [
    { label: 'Tanpa Warna Latar', value: '' },
    { label: '🟡 Kuning Lembut', value: '#fef9c3' },
    { label: '⬜ Abu Muda', value: '#f3f4f6' },
    { label: '🔵 Biru Muda', value: '#dbeafe' },
    { label: '🟢 Hijau Muda', value: '#dcfce7' },
    { label: '🔴 Merah Muda', value: '#fee2e2' },
    { label: '🟣 Ungu Muda', value: '#f3e8ff' },
  ];

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__toolbar">
        <div className="rich-text-editor__group">
          <select
            className="rich-text-editor__select"
            onChange={(e) => {
              const val = e.target.value;
              if (val) { ensureFocused(); executeCommand('formatBlock', val); }
              e.target.value = '';
            }}
            title="Heading / Format"
            defaultValue=""
          >
            <option value="">Format Teks</option>
            <option value="<p>">Paragraf (P)</option>
            <option value="<h1>">Judul H1</option>
            <option value="<h2>">Subjudul H2</option>
            <option value="<h3>">Subjudul H3</option>
            <option value="<h4>">Subjudul H4</option>
            <option value="<blockquote>">Kutipan</option>
          </select>
        </div>

        <div className="rich-text-editor__group">
          <select
            className="rich-text-editor__select"
            onChange={(e) => {
              const val = e.target.value;
              e.target.value = '';
              if (!val) return;
              if (val === 'default') {
                ensureFocused();
                executeCommand('removeFormat', null);
              } else {
                applyFontSize(val);
              }
            }}
            title="Ukuran Huruf"
            defaultValue=""
          >
            {fontSizeSelect.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rich-text-editor__group">
          <select
            className="rich-text-editor__select"
            onChange={(e) => {
              const val = e.target.value;
              if (!val) return;
              ensureFocused();
              executeCommand('fontName', val);
              e.target.value = '';
            }}
            title="Jenis Huruf"
            defaultValue=""
          >
            {fontFamilySelect.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rich-text-editor__group">
          <ColorPaletteInline
            colors={RTE_TEXT_COLORS}
            title="Warna Teks"
            onSelect={(color) => {
              ensureFocused();
              executeCommand('foreColor', color);
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: 13, height: 13, borderRadius: 3, background: '#1d4ed8', border: '1px solid #c7d2fe', flexShrink: 0 }} />
              Warna
            </span>
          </ColorPaletteInline>
        </div>

        <div className="rich-text-editor__group">
          <ColorPaletteInline
            colors={RTE_BG_COLORS}
            title="Warna Latar"
            onSelect={(color) => applyBgColor(color === 'transparent' ? 'inherit' : color)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: 13, height: 13, borderRadius: 3, background: '#fef9c3', border: '1px solid #d1d5db', flexShrink: 0 }} />
              Latar
            </span>
          </ColorPaletteInline>
        </div>

        <div className="rich-text-editor__divider" />

        <div className="rich-text-editor__group">
          <button type="button" onClick={() => executeCommand('bold')} title="Tebal (Ctrl+B)" className="rich-text-btn">
            <FaBold />
          </button>
          <button type="button" onClick={() => executeCommand('italic')} title="Miring (Ctrl+I)" className="rich-text-btn">
            <FaItalic />
          </button>
          <button type="button" onClick={() => executeCommand('underline')} title="Garis Bawah (Ctrl+U)" className="rich-text-btn">
            <FaUnderline />
          </button>
          <button type="button" onClick={() => executeCommand('strikeThrough')} title="Coret (Ctrl+S)" className="rich-text-btn">
            <FaStrikethrough />
          </button>
        </div>

        <div className="rich-text-editor__divider" />

        <div className="rich-text-editor__group">
          <button type="button" onClick={() => executeCommand('justifyLeft')} title="Rata Kiri" className="rich-text-btn">
            <FaAlignLeft />
          </button>
          <button type="button" onClick={() => executeCommand('justifyCenter')} title="Rata Tengah" className="rich-text-btn">
            <FaAlignCenter />
          </button>
          <button type="button" onClick={() => executeCommand('justifyRight')} title="Rata Kanan" className="rich-text-btn">
            <FaAlignRight />
          </button>
          <button type="button" onClick={() => executeCommand('justifyFull')} title="Rata Kiri-Kanan" className="rich-text-btn">
            <FaAlignJustify />
          </button>
        </div>

        <div className="rich-text-editor__divider" />

        <div className="rich-text-editor__group">
          <button type="button" onClick={() => executeCommand('insertUnorderedList')} title="Daftar Bullet" className="rich-text-btn">
            <FaListUl />
          </button>
          <button type="button" onClick={() => executeCommand('insertOrderedList')} title="Daftar Nomor" className="rich-text-btn">
            <FaListOl />
          </button>
        </div>

        <div className="rich-text-editor__divider" />

        <div className="rich-text-editor__group">
          <button type="button" onClick={insertLink} title="Sisipkan Tautan" className="rich-text-btn">
            <FaLink />
          </button>
          <button type="button" onClick={handleInsertImage} title="Sisipkan Gambar" className="rich-text-btn">
            <FaImage />
          </button>
          <button type="button" onClick={insertTable} title="Buat Tabel" className="rich-text-btn">
            <FaTable />
          </button>
        </div>

        <div className="rich-text-editor__divider" />

        <div className="rich-text-editor__group">
          <button type="button" onClick={() => executeCommand('undo')} title="Undo" className="rich-text-btn">
            <FaUndo />
          </button>
          <button type="button" onClick={() => executeCommand('redo')} title="Redo" className="rich-text-btn">
            <FaRedo />
          </button>
          <button
            type="button"
            onClick={toggleHtmlMode}
            title={isHtmlMode ? 'Kembali ke Visual' : 'Edit HTML'}
            className={`rich-text-btn ${isHtmlMode ? 'active' : ''}`}
          >
            <FaCode />
          </button>
          <button
            type="button"
            onClick={clearAllFormatting}
            title="Hapus Semua Format (Warna teks, latar, ukuran, tebal, dll)"
            className="rich-text-btn"
            style={{ color: '#dc2626', fontWeight: 600, fontSize: '0.8rem', padding: '0 6px' }}
          >
            ✕ Clear
          </button>
        </div>
      </div>

      {isHtmlMode ? (
        <textarea
          className="rich-text-editor__code"
          value={htmlCode}
          onChange={handleHtmlCodeChange}
          placeholder="Tulis kode HTML di sini..."
          rows={14}
        />
      ) : (
        <div
          ref={editorRef}
          className="rich-text-editor__content"
          contentEditable
          onInput={handleInput}
          onBlur={handleEditorBlur}
          placeholder="Mulai ketik isi konten halaman di sini..."
        />
      )}
    </div>
  );
}
