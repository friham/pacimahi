import { useState } from 'react';
import { 
  FaFilePdf, FaDownload, FaQuoteLeft, FaChevronDown, 
  FaExternalLinkAlt, FaCalendarAlt, FaFileAlt, FaMapMarkerAlt,
  FaPlayCircle, FaInfoCircle
} from 'react-icons/fa';
import { sanitizeHtml } from '../../sanitize';
import { SERVER_URL } from '../../config';
import './BlockRenderer.css';

const getEmbedUrl = (url) => {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return url;
};

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export default function BlockRenderer({ blocks = [] }) {
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (blockId, itemIndex) => {
    const key = `${blockId}-${itemIndex}`;
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  const sortedBlocks = [...blocks].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <div className="cms-block-renderer">
      {sortedBlocks.map((block, idx) => {
        const type = block.type;
        const content = typeof block.content === 'object' ? block.content : {};
        const settings = typeof block.settings === 'object' ? block.settings : {};
        const blockId = block.id || idx;

        switch (type) {
          case 'heading': {
            const level = content.level || 'h2';
            const align = settings.align || 'left';
            const style = { textAlign: align };
            const text = content.text || '';

            if (level === 'h1') return <h1 key={blockId} className="cms-heading cms-heading--h1" style={style}>{text}</h1>;
            if (level === 'h3') return <h3 key={blockId} className="cms-heading cms-heading--h3" style={style}>{text}</h3>;
            if (level === 'h4') return <h4 key={blockId} className="cms-heading cms-heading--h4" style={style}>{text}</h4>;
            return <h2 key={blockId} className="cms-heading cms-heading--h2" style={style}>{text}</h2>;
          }

          case 'text': {
            const html = content.html || content.text || '';
            return (
              <div 
                key={blockId} 
                className="cms-text-block"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
              />
            );
          }

          case 'image': {
            const align = settings.align || 'center';
            const width = settings.width ? (String(settings.width).includes('%') || String(settings.width).includes('px') ? settings.width : `${settings.width}px`) : '100%';
            const imgUrl = content.url?.startsWith('/') ? `${SERVER_URL}${content.url}` : content.url;

            return (
              <figure key={blockId} className={`cms-image-figure cms-align-${align}`}>
                <img 
                  src={imgUrl} 
                  alt={content.alt || 'Gambar Konten Pengadilan'} 
                  style={{ maxWidth: width, height: 'auto', borderRadius: '8px' }}
                  loading="lazy"
                />
                {content.caption && (
                  <figcaption className="cms-image-caption">
                    {content.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case 'gallery': {
            const images = Array.isArray(content.images) ? content.images : [];
            const cols = settings.columns || 3;
            return (
              <div key={blockId} className={`cms-gallery-grid cms-gallery-cols-${cols}`}>
                {images.map((img, i) => {
                  const src = img.url?.startsWith('/') ? `${SERVER_URL}${img.url}` : img.url;
                  return (
                    <div key={i} className="cms-gallery-item">
                      <img src={src} alt={img.alt || img.caption || `Galeri ${i+1}`} loading="lazy" />
                      {img.caption && <span className="cms-gallery-caption">{img.caption}</span>}
                    </div>
                  );
                })}
              </div>
            );
          }

          case 'video': {
            const rawUrl = content.url || '';
            const embedUrl = getEmbedUrl(rawUrl);
            const isEmbed = embedUrl.includes('youtube') || embedUrl.includes('vimeo');
            const videoSrc = rawUrl.startsWith('/') ? `${SERVER_URL}${rawUrl}` : rawUrl;

            return (
              <div key={blockId} className="cms-video-container">
                {content.title && <h3 className="cms-video-title">{content.title}</h3>}
                <div className="cms-video-wrapper">
                  {isEmbed ? (
                    <iframe
                      src={embedUrl}
                      title={content.title || 'Video Pengadilan'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video controls src={videoSrc}>
                      Browser Anda tidak mendukung tag video.
                    </video>
                  )}
                </div>
                {content.caption && <p className="cms-video-caption">{content.caption}</p>}
              </div>
            );
          }

          case 'button': {
            const align = settings.align || 'left';
            const variant = settings.variant || 'primary';
            const btnUrl = content.url || '#';
            const openNewTab = content.open_new_tab;

            return (
              <div key={blockId} className={`cms-button-block cms-align-${align}`}>
                <a 
                  href={btnUrl} 
                  target={openNewTab ? '_blank' : '_self'}
                  rel={openNewTab ? 'noopener noreferrer' : undefined}
                  className={`cms-btn cms-btn--${variant}`}
                >
                  {content.text || 'Lihat Selengkapnya'}
                  {openNewTab && <FaExternalLinkAlt size={12} style={{ marginLeft: 6 }} />}
                </a>
              </div>
            );
          }

          case 'link': {
            const linkUrl = content.url || '#';
            const openNewTab = content.open_new_tab;
            const rel = content.rel || (openNewTab ? 'noopener noreferrer' : 'none');

            return (
              <div key={blockId} className="cms-link-card">
                <a 
                  href={linkUrl} 
                  target={openNewTab ? '_blank' : '_self'}
                  rel={rel !== 'none' ? rel : undefined}
                  className="cms-link-card__anchor"
                >
                  <span>{content.text || linkUrl}</span>
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            );
          }

          case 'document': {
            const docUrl = content.file_url?.startsWith('/') ? `${SERVER_URL}${content.file_url}` : content.file_url;
            return (
              <div key={blockId} className="cms-document-card">
                <div className="cms-document-card__icon">
                  <FaFilePdf size={32} />
                </div>
                <div className="cms-document-card__info">
                  <h4 className="cms-document-card__title">{content.doc_title || 'Dokumen Pengadilan'}</h4>
                  <div className="cms-document-card__meta">
                    {content.doc_number && <span className="cms-doc-badge">Nomor: {content.doc_number}</span>}
                    {content.doc_date && (
                      <span className="cms-doc-date">
                        <FaCalendarAlt size={12} /> {content.doc_date}
                      </span>
                    )}
                    {content.file_size && (
                      <span className="cms-doc-size">({formatFileSize(content.file_size)})</span>
                    )}
                  </div>
                  {content.description && (
                    <p className="cms-document-card__desc">{content.description}</p>
                  )}
                </div>
                <div className="cms-document-card__action">
                  <a 
                    href={docUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cms-doc-download-btn"
                    download
                  >
                    <FaDownload size={14} />
                    <span>Unduh Dokumen</span>
                  </a>
                </div>
              </div>
            );
          }

          case 'table': {
            const headers = Array.isArray(content.headers) ? content.headers : [];
            const rows = Array.isArray(content.rows) ? content.rows : [];
            const hasHeader = content.has_header !== false;
            return (
              <div key={blockId} className="cms-table-responsive">
                <table className="cms-content-table">
                  {hasHeader && headers.length > 0 && (
                    <thead>
                      <tr>
                        {headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {(Array.isArray(row) ? row : []).map((cell, cIdx) => (
                          <td key={cIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case 'quote': {
            return (
              <blockquote key={blockId} className="cms-quote-box">
                <FaQuoteLeft className="cms-quote-icon" />
                <p className="cms-quote-text">{content.quote || ''}</p>
                {content.author && (
                  <footer className="cms-quote-author">— {content.author}</footer>
                )}
              </blockquote>
            );
          }

          case 'accordion': {
            const items = Array.isArray(content.items) ? content.items : [];
            return (
              <div key={blockId} className="cms-accordion-list">
                {items.map((item, idx) => {
                  const isOpen = !!openAccordions[`${blockId}-${idx}`];
                  return (
                    <div key={idx} className={`cms-accordion-item ${isOpen ? 'open' : ''}`}>
                      <button 
                        type="button" 
                        className="cms-accordion-header"
                        onClick={() => toggleAccordion(blockId, idx)}
                      >
                        <span>{item.title}</span>
                        <FaChevronDown className={`cms-accordion-arrow ${isOpen ? 'open' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="cms-accordion-body">
                          <p>{item.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }

          case 'maps': {
            const mapUrl = content.url || '';
            return (
              <div key={blockId} className="cms-map-container">
                <div className="cms-map-header">
                  <FaMapMarkerAlt /> <span>{content.title || 'Lokasi Kantor Pengadilan'}</span>
                </div>
                <iframe
                  src={mapUrl || "https://maps.google.com/maps?q=Pengadilan%20Agama%20Cimahi&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            );
          }

          case 'embed':
          case 'html': {
            return (
              <div 
                key={blockId} 
                className="cms-custom-html"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.html || content.code || '') }}
              />
            );
          }

          case 'callout': {
            return (
              <div key={blockId} className="pa-callout">
                {content.title && <h4>{content.title}</h4>}
                <p style={{ margin: 0 }}>{content.text || ''}</p>
              </div>
            );
          }

          case 'divider': {
            return <hr key={blockId} className="cms-divider" />;
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
