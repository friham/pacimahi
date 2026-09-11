import { FaTimes, FaDesktop, FaTabletAlt, FaMobileAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import BlockRenderer from './BlockRenderer';
import { sanitizeHtml } from '../../sanitize';
import { useState } from 'react';

export default function PagePreviewModal({ isOpen, onClose, pageData = {} }) {
  const [deviceView, setDeviceView] = useState('desktop'); // desktop, tablet, mobile

  if (!isOpen) return null;

  const contentBlocks = Array.isArray(pageData.blocks) ? pageData.blocks : [];

  return (
    <div className="media-modal-backdrop animate-fade-in" onClick={onClose} style={{ zIndex: 10000 }}>
      <div 
        className="media-modal" 
        style={{ 
          width: deviceView === 'desktop' ? '1200px' : deviceView === 'tablet' ? '768px' : '420px', 
          height: '92vh',
          transition: 'width 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with device switcher */}
        <div className="media-modal__header" style={{ background: '#0b4619', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, color: '#fef08a', fontSize: '0.9rem' }}>PRATINJAU HALAMAN (DRAFT / LIVE PREVIEW)</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '3px 8px', borderRadius: '6px' }}>
            <button 
              type="button" 
              onClick={() => setDeviceView('desktop')} 
              style={{ background: deviceView === 'desktop' ? '#ffffff' : 'transparent', color: deviceView === 'desktop' ? '#0b4619' : '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
            >
              <FaDesktop /> Komputer
            </button>
            <button 
              type="button" 
              onClick={() => setDeviceView('tablet')} 
              style={{ background: deviceView === 'tablet' ? '#ffffff' : 'transparent', color: deviceView === 'tablet' ? '#0b4619' : '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
            >
              <FaTabletAlt /> Tablet
            </button>
            <button 
              type="button" 
              onClick={() => setDeviceView('mobile')} 
              style={{ background: deviceView === 'mobile' ? '#ffffff' : 'transparent', color: deviceView === 'mobile' ? '#0b4619' : '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
            >
              <FaMobileAlt /> Ponsel
            </button>
          </div>

          <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '1.2rem', cursor: 'pointer' }}>
            <FaTimes />
          </button>
        </div>

        {/* Court Page Simulation Body */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc', padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', background: '#ffffff', padding: deviceView === 'mobile' ? '1.25rem' : '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            {/* Breadcrumb Simulation */}
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.25rem', display: 'flex', gap: '6px' }}>
              <span>Beranda</span> › <span>Informasi</span> › <span style={{ color: '#0b4619', fontWeight: 600 }}>{pageData.title || 'Judul Halaman'}</span>
            </div>

            {/* Page Header */}
            <header style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
              <span style={{ 
                background: '#e0f2fe', 
                color: '#0369a1', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Halaman Resmi Pengadilan
              </span>
              <h1 style={{ color: '#0b4619', fontSize: '1.85rem', fontWeight: 700, margin: '0.75rem 0 0.5rem 0', lineHeight: 1.3 }}>
                {pageData.title || 'Judul Halaman Pengadilan'}
              </h1>
              {pageData.subtitle && (
                <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
                  {pageData.subtitle}
                </p>
              )}
              <div style={{ display: 'flex', gap: '16px', marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaCalendarAlt size={12} /> {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaUser size={12} /> Tim Redaksi PA Cimahi
                </span>
              </div>
            </header>

            {/* Excerpt if present */}
            {pageData.excerpt && (
              <div style={{ background: '#f0fdf4', borderLeft: '4px solid #16a34a', padding: '14px 18px', borderRadius: '4px', marginBottom: '2rem', fontStyle: 'italic', color: '#166534' }}>
                {pageData.excerpt}
              </div>
            )}

            {/* Render Blocks or Fallback HTML */}
            {contentBlocks.length > 0 ? (
              <BlockRenderer blocks={contentBlocks} />
            ) : pageData.content_html ? (
              <div 
                className="cms-text-block"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.content_html) }}
              />
            ) : (
              <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Konten halaman belum diisi.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="media-modal__footer" style={{ background: '#ffffff' }}>
          <button type="button" className="media-confirm-btn" onClick={onClose}>
            Kembali ke Editor
          </button>
        </div>
      </div>
    </div>
  );
}
