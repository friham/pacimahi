export function saveSelection() {
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0) {
    return sel.getRangeAt(0).cloneRange();
  }
  return null;
}

export function restoreSelection(savedRange) {
  if (!savedRange) return;
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    sel.addRange(savedRange);
  }
}

export function applyFontSize(editorEl, pxValue, savedRange) {
  editorEl.focus();
  if (savedRange) restoreSelection(savedRange);
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
      editorEl.querySelectorAll('span:empty').forEach(el => el.remove());
      editorEl.normalize();
    } catch {
      document.execCommand('removeFormat', false, null);
    }
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
}

export function applyBgColor(editorEl, colorValue, savedRange) {
  editorEl.focus();
  if (savedRange) restoreSelection(savedRange);
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
      editorEl.querySelectorAll('span:empty').forEach(el => el.remove());
      editorEl.normalize();
    } catch {
      document.execCommand('hiliteColor', false, 'inherit');
    }
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
}

export function removeAllFormatting(editorEl, savedRange) {
  editorEl.focus();
  if (savedRange) restoreSelection(savedRange);
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
      if (child.nodeType === Node.ELEMENT_NODE) {
        cleanNode(child);
      }
    }

    const tag = node.tagName.toLowerCase();
    if (['span', 'font', 'b', 'strong', 'i', 'em', 'u', 's', 'strike', 'a', 'mark', 'small', 'sub', 'sup'].includes(tag)) {
      const parent = node.parentNode;
      if (parent) {
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }
        parent.removeChild(node);
      }
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'].includes(tag)) {
      const p = document.createElement('p');
      while (node.firstChild) {
        p.appendChild(node.firstChild);
      }
      if (node.parentNode) {
        node.parentNode.replaceChild(p, node);
      }
    }
  };

  const hasSpecificSelection = !range.collapsed && editorEl.contains(range.commonAncestorContainer);

  if (hasSpecificSelection) {
    try {
      document.execCommand('removeFormat', false, null);
      document.execCommand('unlink', false, null);

      const fragment = range.extractContents();
      Array.from(fragment.childNodes).forEach(cleanNode);
      range.insertNode(fragment);
    } catch {
      // Fallback pembersihan seleksi gagal; konten editor tetap utuh.
    }
  } else {
    try {
      document.execCommand('removeFormat', false, null);
      document.execCommand('unlink', false, null);
      document.execCommand('formatBlock', false, '<p>');
    } catch {
      // execCommand tidak didukung: bersihkan manual lewat cleanNode di bawah.
    }
    Array.from(editorEl.childNodes).forEach(cleanNode);
  }

  editorEl.querySelectorAll('span:empty, font:empty, b:empty, i:empty, u:empty, s:empty, a:empty').forEach(el => el.remove());
  editorEl.normalize();
}

export const TEXT_COLORS = [
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

export const BG_COLORS = [
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
