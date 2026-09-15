import DOMPurify from 'dompurify';

export function sanitizeHtml(html) {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'sub', 'sup',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'blockquote', 'pre', 'code',
      'div', 'span', 'section', 'article', 'figure', 'figcaption',
      'hr',
      'iframe', 
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title',
      'width', 'height', 'style', 'class',
      'align', 'valign',
      'allow', 'allowfullscreen', 'loading',
      'colspan', 'rowspan', 'border',
      'frameborder', 'allowpaymentrequest',
      'type', 'start', 'reversed',
    ],
    ALLOW_DATA_ATTR: false,
    ALLOWED_TAGS_COLUMN: 'auto',
    ALLOWED_ATTR_COLUMN: 'auto',
  });
}
