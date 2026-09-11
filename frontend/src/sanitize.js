import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content before rendering with dangerouslySetInnerHTML.
 * Allows common formatting tags but strips <script>, event handlers, etc.
 */
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
      'hr', 'br',
      'iframe',  // for embeds (YouTube, etc.)
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title',
      'width', 'height', 'style', 'class',
      'allow', 'allowfullscreen', 'loading',
      'colspan', 'rowspan', 'border',
      'frameborder', 'allowpaymentrequest',
    ],
    ALLOW_DATA_ATTR: false,
  });
}
