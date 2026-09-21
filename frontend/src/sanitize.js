import DOMPurify from 'dompurify';

// Whitelist domain terpercaya untuk iframe (misal: YouTube, Google Maps)
const TRUSTED_IFRAME_DOMAINS = [
  'youtube.com',
  'www.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'google.com',
  'www.google.com',
  'maps.google.com',
  'drive.google.com',
  'docs.google.com'
];

function isTrustedIframeUrl(src) {
  if (!src) return false;
  try {
    const parsedUrl = new URL(src, window.location.origin);
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return false;
    }
    const hostname = parsedUrl.hostname.toLowerCase();
    return TRUSTED_IFRAME_DOMAINS.some(
      domain => hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

// Hook DOMPurify untuk memvalidasi atribut src pada tag iframe
DOMPurify.removeHook('uponSanitizeElement');
DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe') {
    const src = node.getAttribute('src');
    if (!src || !isTrustedIframeUrl(src)) {
      node.parentNode?.removeChild(node);
    }
  }
});

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
      'div', 'span', 'font', 'section', 'article', 'figure', 'figcaption',
      'hr',
      'iframe', 
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title',
      'width', 'height', 'style', 'class', 'color',
      'align', 'valign',
      'allow', 'allowfullscreen', 'loading',
      'colspan', 'rowspan', 'border',
      'frameborder', 'allowpaymentrequest',
      'type', 'start', 'reversed',
    ],
    ALLOW_DATA_ATTR: false,
  });
}
