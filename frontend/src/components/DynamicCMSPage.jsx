import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { sanitizeHtml } from '../sanitize';
import ProfileLayout from '../pages/tentang-pengadilan/ProfileLayout';
import BlockRenderer from './cms/BlockRenderer';
import { FaCalendarAlt, FaUser, FaSpinner } from 'react-icons/fa';

import { API_URL } from '../config';

export default function DynamicCMSPage({ customSlug }) {
  const { slug: routeSlug } = useParams();
  const location = useLocation();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeSlug = customSlug || routeSlug || location.pathname.split('/').filter(Boolean).pop();

  useEffect(() => {
    if (!activeSlug) return;
    let isCurrent = true;
    const controller = new AbortController();

    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/pages/slug/${activeSlug}`, {
          signal: controller.signal
        });
        if (!isCurrent) return;
        if (res.data.success && res.data.data) {
          setPage(res.data.data);
          setError(null);
          document.title = `${res.data.data.seo_title || res.data.data.title} | Pengadilan Agama Kota Cimahi`;
        } else {
          setError('Halaman tidak ditemukan');
        }
      } catch (err) {
        if (!isCurrent || axios.isCancel(err) || err.name === 'CanceledError') return;
        setError(err.response?.data?.message || 'Halaman tidak ditemukan.');
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchPage();

    const handleUpdate = () => fetchPage();
    window.addEventListener('cms_page_updated', handleUpdate);

    return () => {
      isCurrent = false;
      controller.abort();
      window.removeEventListener('cms_page_updated', handleUpdate);
    };
  }, [activeSlug]);

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

  if (error || !page) {
    return (
      <ProfileLayout title="404 - Halaman Tidak Ditemukan" breadcrumb="404">
        <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', margin: '1rem 0' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>
            !
          </div>
          <h2 style={{ color: '#991b1b', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>404 - Halaman Tidak Ditemukan</h2>
          <p style={{ color: '#4b5563', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Halaman ini belum diisi di sistem kelola halaman atau masih dalam status draft pada dashboard admin pengadilan.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 22px', background: '#0b4619', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', boxShadow: '0 2px 6px rgba(11, 70, 25, 0.2)' }}>
              Kembali ke Beranda
            </Link>
          </div>
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

        {page.excerpt && (
          <div className="pa-callout" style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
            <p style={{ margin: 0, color: 'var(--primary-900)' }}>{page.excerpt}</p>
          </div>
        )}

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
