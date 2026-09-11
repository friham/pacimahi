import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { sanitizeHtml } from '../sanitize';
import ProfileLayout from '../pages/tentang-pengadilan/ProfileLayout';
import BlockRenderer from './cms/BlockRenderer';
import { FaCalendarAlt, FaUser, FaSpinner } from 'react-icons/fa';

import { API_URL } from '../config';

export default function DynamicCMSPage({ customSlug, fallbackComponent: Fallback }) {
  const { slug: routeSlug } = useParams();
  const location = useLocation();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Compute slug from customSlug, routeSlug, or last pathname segment
  const activeSlug = customSlug || routeSlug || location.pathname.split('/').filter(Boolean).pop();

  const fetchPage = useCallback(async () => {
    if (!activeSlug) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/pages/slug/${activeSlug}`);
      if (res.data.success && res.data.data) {
        setPage(res.data.data);
        setError(null);
        document.title = `${res.data.data.seo_title || res.data.data.title} | Pengadilan Agama Kota Cimahi`;
      } else {
        setError('Halaman tidak ditemukan');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Halaman tidak ditemukan.');
    } finally {
      setLoading(false);
    }
  }, [activeSlug]);

  useEffect(() => {
    fetchPage();
    const handleUpdate = () => fetchPage();
    window.addEventListener('cms_page_updated', handleUpdate);
    return () => window.removeEventListener('cms_page_updated', handleUpdate);
  }, [fetchPage]);

  // If loading and a static fallback exists, render the fallback directly so there's zero flicker
  if (loading && Fallback) {
    return <Fallback />;
  }

  // If loading without fallback, show spinner
  if (loading) {
    return (
      <ProfileLayout title="Memuat Halaman..." breadcrumb="Memuat...">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: '#0b4619' }}>
          <FaSpinner className="spin" size={36} />
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>Memuat konten halaman dari sistem CMS...</p>
        </div>
      </ProfileLayout>
    );
  }

  // If error or page not found:
  // If Fallback component exists, render it!
  if ((error || !page) && Fallback) {
    return <Fallback />;
  }

  // If error and no fallback, show 404
  if (error || !page) {
    return (
      <ProfileLayout title="Halaman Tidak Ditemukan" breadcrumb="404">
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h2 style={{ color: '#991b1b' }}>404 - Halaman Tidak Ditemukan</h2>
          <p style={{ color: '#6b7280', margin: '1rem 0' }}>
            Halaman yang Anda cari mungkin belum dipublikasikan atau sudah dipindahkan.
          </p>
          <Link to="/" style={{ display: 'inline-block', padding: '10px 20px', background: '#0b4619', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>
            Kembali ke Beranda
          </Link>
        </div>
      </ProfileLayout>
    );
  }

  const contentBlocks = Array.isArray(page.blocks) ? page.blocks : [];

  return (
    <ProfileLayout
      title={page.title}
      subtitle={page.subtitle}
      breadcrumb={page.title}
    >
      <article className="pa-article cms-dynamic-article">

        {/* Date & Author Info */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaCalendarAlt size={12} style={{ color: '#0b4619' }} /> 
            {new Date(page.updated_at || page.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaUser size={12} style={{ color: '#0b4619' }} /> 
            {page.author_name || 'Tim Redaksi PA Cimahi'}
          </span>
        </div>

        {/* Excerpt if present */}
        {page.excerpt && (
          <div className="pa-callout" style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
            <p style={{ margin: 0, color: 'var(--primary-900)' }}>{page.excerpt}</p>
          </div>
        )}

        {/* Render Blocks or Fallback HTML */}
        {contentBlocks.length > 0 ? (
          <BlockRenderer blocks={contentBlocks} />
        ) : page.content_html ? (
          <div 
            className="cms-text-block"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content_html) }}
          />
        ) : null}
      </article>
    </ProfileLayout>
  );
}
