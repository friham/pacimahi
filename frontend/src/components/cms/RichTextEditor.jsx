import { useState, useRef, useEffect } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaAlignJustify, FaListUl, FaListOl, 
  FaQuoteRight, FaLink, FaImage, FaTable, FaCode, FaUndo, FaRedo,
  FaHeading
} from 'react-icons/fa';
import { SERVER_URL } from '../../config';
import './RichTextEditor.css';

export default function RichTextEditor({ value = '', onChange, onOpenMediaLibrary }) {
  const editorRef = useRef(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlCode, setHtmlCode] = useState(value);

  // Keep editor content in sync when value changes externally
  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setHtmlCode(value || '');
  }, [value, isHtmlMode]);

  const executeCommand = (command, val = null) => {
    if (isHtmlMode) return;
    document.execCommand(command, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setHtmlCode(html);
    if (onChange) onChange(html);
  };

  const handleHtmlCodeChange = (e) => {
    const code = e.target.value;
    setHtmlCode(code);
    if (onChange) onChange(code);
  };

  const toggleHtmlMode = () => {
    if (isHtmlMode) {
      // Switching from HTML to Visual
      setIsHtmlMode(false);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = htmlCode;
        }
      }, 0);
    } else {
      // Switching from Visual to HTML
      if (editorRef.current) {
        setHtmlCode(editorRef.current.innerHTML);
      }
      setIsHtmlMode(true);
    }
  };

  const insertLink = () => {
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
        let tableHtml = '<table class="cms-table" style="width:100%; border-collapse: collapse; margin: 1rem 0;"><tbody>';
        for (let i = 0; i < r; i++) {
          tableHtml += '<tr>';
          for (let j = 0; j < c; j++) {
            tableHtml += '<td style="border: 1px solid #ddd; padding: 8px;">Sel</td>';
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

  return (
    <div className="rich-text-editor">
      {/* Toolbar */}
      <div className="rich-text-editor__toolbar">
        <div className="rich-text-editor__group">
          <select 
            className="rich-text-editor__select"
            onChange={(e) => {
              const val = e.target.value;
              if (val) executeCommand('formatBlock', val);
              e.target.value = '';
            }}
            title="Heading / Format"
          >
            <option value="">Format Teks</option>
            <option value="<p>">Paragraf (P)</option>
            <option value="<h1>">Judul H1</option>
            <option value="<h2>">Subjudul H2</option>
            <option value="<h3>">Subjudul H3</option>
            <option value="<h4>">Subjudul H4</option>
            <option value="<blockquote>">Kutipan (Blockquote)</option>
          </select>
        </div>

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
        </div>

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
          <button type="button" onClick={() => executeCommand('justifyFull')} title="Rata Kiri Kanan" className="rich-text-btn">
            <FaAlignJustify />
          </button>
        </div>

        <div className="rich-text-editor__group">
          <button type="button" onClick={() => executeCommand('insertUnorderedList')} title="Bullet List" className="rich-text-btn">
            <FaListUl />
          </button>
          <button type="button" onClick={() => executeCommand('insertOrderedList')} title="Numbered List" className="rich-text-btn">
            <FaListOl />
          </button>
          <button type="button" onClick={() => executeCommand('formatBlock', '<blockquote>')} title="Blockquote" className="rich-text-btn">
            <FaQuoteRight />
          </button>
        </div>

        <div className="rich-text-editor__group">
          <button type="button" onClick={insertLink} title="Sisipkan Tautan" className="rich-text-btn">
            <FaLink />
          </button>
          <button type="button" onClick={handleInsertImage} title="Sisipkan Gambar dari Media Library" className="rich-text-btn">
            <FaImage />
          </button>
          <button type="button" onClick={insertTable} title="Buat Tabel" className="rich-text-btn">
            <FaTable />
          </button>
        </div>

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
            title={isHtmlMode ? "Kembali ke Visual" : "Edit HTML"} 
            className={`rich-text-btn ${isHtmlMode ? 'active' : ''}`}
          >
            <FaCode />
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
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
          onBlur={handleInput}
          placeholder="Mulai ketik isi konten halaman di sini..."
        />
      )}
    </div>
  );
}
