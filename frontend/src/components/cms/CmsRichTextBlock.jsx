import { useState, useEffect, useRef } from 'react';
import {
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaListUl, FaListOl, FaLink, FaUnlink
} from 'react-icons/fa';
import CmsColorPalette from './CmsColorPalette';
import ConfirmModal from '../admin/ConfirmModal';
import {
  saveSelection,
  restoreSelection,
  applyFontSize,
  applyBgColor,
  removeAllFormatting,
  TEXT_COLORS,
  BG_COLORS
} from './utils/textFormatting';

export default function CmsRichTextBlock({ value = '', onChange }) {
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      if (document.activeElement !== editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleEditorBlur = () => {
    savedRangeRef.current = saveSelection();
    handleInput();
  };

  const ensureFocusAndSelection = () => {
    if (!editorRef.current) return;
    const isFocused = document.activeElement === editorRef.current ||
      editorRef.current.contains(document.activeElement);
    if (!isFocused) {
      editorRef.current.focus();
      if (savedRangeRef.current) {
        restoreSelection(savedRangeRef.current);
      }
    }
  };

  const handleRteCmd = (e, cmd, val = null) => {
    e.preventDefault();
    if (editorRef.current) {
      ensureFocusAndSelection();
      document.execCommand(cmd, false, val);
      handleInput();
    }
  };

  const handleRteSelect = (e, cmd) => {
    const val = e.target.value;
    e.target.value = ''; // Reset dropdown segera
    if (!val || val === '') return;

    if (!editorRef.current) return;

    if (cmd === 'fontSize') {
      applyFontSize(editorRef.current, val, savedRangeRef.current);
    } else if (cmd === 'hiliteColor') {
      if (!val) return;
      applyBgColor(editorRef.current, val, savedRangeRef.current);
    } else {
      ensureFocusAndSelection();
      document.execCommand(cmd, false, val);
    }
    handleInput();
  };

  const handleClearFormat = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      removeAllFormatting(editorRef.current, savedRangeRef.current);
      handleInput();
    }
  };

  const handleClearContent = (e) => {
    e.preventDefault();
    if (!editorRef.current || !editorRef.current.innerHTML.trim()) return;
    setShowClearConfirm(true);
  };

  const executeClearContent = () => {
    setShowClearConfirm(false);
    if (!editorRef.current) return;
    editorRef.current.innerHTML = '';
    savedRangeRef.current = null;
    handleInput();
    editorRef.current.focus();
  };

  const handleInsertLink = (e) => {
    e.preventDefault();
    ensureFocusAndSelection();
    const url = window.prompt('Masukkan URL link (contoh: https://pa-cimahi.go.id atau /layanan):', 'https://');
    if (url) {
      document.execCommand('createLink', false, url);
      handleInput();
    }
  };

  return (
    <div className="cms-rte-block">
      <div className="cms-rte-toolbar">
        <div className="cms-rte-toolbar__group">
          <select
            className="cms-rte-select"
            onChange={(e) => handleRteSelect(e, 'formatBlock')}
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
          <select
            className="cms-rte-select"
            onChange={(e) => handleRteSelect(e, 'fontSize')}
            title="Ukuran Huruf"
            defaultValue=""
          >
            <option value="">Ukuran</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="22px">22px</option>
            <option value="28px">28px</option>
            <option value="default">Reset Ukuran</option>
          </select>
          <select
            className="cms-rte-select"
            onChange={(e) => handleRteSelect(e, 'fontName')}
            title="Jenis Huruf"
            defaultValue=""
          >
            <option value="">Huruf</option>
            <option value="Arial">Arial</option>
            <option value="Roboto">Roboto</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
          <CmsColorPalette
            colors={TEXT_COLORS}
            title="Warna Teks"
            onSelect={(color) => {
              if (editorRef.current) {
                ensureFocusAndSelection();
                document.execCommand('foreColor', false, color);
                handleInput();
              }
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: 13, height: 13, borderRadius: 3, background: '#1d4ed8', border: '1px solid #c7d2fe', flexShrink: 0 }} />
              Warna
            </span>
          </CmsColorPalette>
          <CmsColorPalette
            colors={BG_COLORS}
            title="Warna Latar"
            onSelect={(color) => {
              if (editorRef.current) {
                applyBgColor(editorRef.current, color === 'transparent' ? 'inherit' : color, savedRangeRef.current);
                handleInput();
              }
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: 13, height: 13, borderRadius: 3, background: '#fef9c3', border: '1px solid #d1d5db', flexShrink: 0 }} />
              Latar
            </span>
          </CmsColorPalette>
        </div>

        <div className="cms-rte-toolbar__sep" />

        <div className="cms-rte-toolbar__group">
          <button type="button" className="cms-rte-btn" title="Tebal (Ctrl+B)" onMouseDown={e => handleRteCmd(e, 'bold')}>
            <b>B</b>
          </button>
          <button type="button" className="cms-rte-btn" title="Miring (Ctrl+I)" onMouseDown={e => handleRteCmd(e, 'italic')}>
            <i>I</i>
          </button>
          <button type="button" className="cms-rte-btn" title="Garis Bawah (Ctrl+U)" onMouseDown={e => handleRteCmd(e, 'underline')}>
            <u>U</u>
          </button>
          <button type="button" className="cms-rte-btn" title="Coret" onMouseDown={e => handleRteCmd(e, 'strikeThrough')}>
            <s>S</s>
          </button>
        </div>

        <div className="cms-rte-toolbar__sep" />

        <div className="cms-rte-toolbar__group">
          <button type="button" className="cms-rte-btn" title="Rata Kiri" onMouseDown={e => handleRteCmd(e, 'justifyLeft')}>
            <FaAlignLeft />
          </button>
          <button type="button" className="cms-rte-btn" title="Rata Tengah" onMouseDown={e => handleRteCmd(e, 'justifyCenter')}>
            <FaAlignCenter />
          </button>
          <button type="button" className="cms-rte-btn" title="Rata Kanan" onMouseDown={e => handleRteCmd(e, 'justifyRight')}>
            <FaAlignRight />
          </button>
          <button type="button" className="cms-rte-btn" title="Rata Penuh" onMouseDown={e => handleRteCmd(e, 'justifyFull')}>
            <FaAlignJustify />
          </button>
        </div>

        <div className="cms-rte-toolbar__sep" />

        <div className="cms-rte-toolbar__group">
          <button type="button" className="cms-rte-btn" title="Daftar Bullet (List)" onMouseDown={e => handleRteCmd(e, 'insertUnorderedList')}>
            <FaListUl />
          </button>
          <button type="button" className="cms-rte-btn" title="Daftar Nomor (1. 2. 3.)" onMouseDown={e => handleRteCmd(e, 'insertOrderedList')}>
            <FaListOl />
          </button>
        </div>

        <div className="cms-rte-toolbar__sep" />

        <div className="cms-rte-toolbar__group">
          <button type="button" className="cms-rte-btn" title="Sisipkan Tautan" onMouseDown={handleInsertLink}>
            <FaLink /> Link
          </button>
          <button type="button" className="cms-rte-btn" title="Hapus Tautan" onMouseDown={e => handleRteCmd(e, 'unlink')}>
            <FaUnlink /> Hapus Link
          </button>
          <button type="button" className="cms-rte-btn" title="Garis Pemisah" onMouseDown={e => handleRteCmd(e, 'insertHorizontalRule')}>
            — HR
          </button>
          <button
            type="button"
            className="cms-rte-btn cms-rte-btn--danger"
            title="Hapus Semua Format (Warna teks, latar, ukuran, tebal, dll). Jika ada teks dipilih, membersihkan seleksi. Jika tidak, membersihkan seluruh teks."
            onMouseDown={handleClearFormat}
          >
            ✕ Clear Format
          </button>
          <button
            type="button"
            className="cms-rte-btn"
            title="Kosongkan Semua Isi Teks di Wadah Ini"
            onMouseDown={handleClearContent}
          >
            🗑 Kosongkan
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="cms-rte-editor"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Ketikkan teks konten atau artikel di sini..."
        onInput={handleInput}
        onBlur={handleEditorBlur}
      />

      <p className="cms-rte-hint">
        Pilih teks lalu pilih format di toolbar. Daftar bullet/nomor, ukuran, jenis, dan warna teks tersedia.
      </p>
      <ConfirmModal
        show={showClearConfirm}
        title="Kosongkan Isi Teks"
        message="Apakah Anda yakin ingin mengosongkan seluruh isi teks pada wadah ini?"
        confirmText="Ya, Kosongkan"
        type="warning"
        onConfirm={executeClearContent}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}
