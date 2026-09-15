import { useState } from 'react';
import ProfileLayout from './ProfileLayout';
import { FaUserTie, FaBuilding, FaCalendarAlt, FaThLarge, FaList } from 'react-icons/fa';

import mantanPimpinanData from '../../data/mantanPimpinanData.json';

function MantanPimpinanPage() {
  const [viewMode, setViewMode] = useState('grid'); 

  return (
    <ProfileLayout
      title="Daftar Nama Mantan Pimpinan"
      subtitle="Jejak Pengabdian dan Sejarah Kepemimpinan Pengadilan Agama Kota Cimahi Sejak 1968"
      breadcrumb="Mantan Pimpinan"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaUserTie style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Penghormatan Atas Pengabdian</h4>
          <p style={{ margin: 0 }}>
            Daftar Ketua dan Pimpinan yang telah mendedikasikan tenaga, pikiran, dan kepemimpinannya dalam membangun serta mengembangkan Pengadilan Agama Kota Cimahi sejak didirikan pada tahun 1967/1968.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.5rem 0 1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
              Total Pimpinan Terdaftar: <strong>{mantanPimpinanData.length} Orang</strong>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--gray-300)',
                background: viewMode === 'grid' ? 'var(--primary-700)' : 'white',
                color: viewMode === 'grid' ? 'white' : 'var(--gray-700)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <FaThLarge size={13} /> Galeri Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--gray-300)',
                background: viewMode === 'table' ? 'var(--primary-700)' : 'white',
                color: viewMode === 'table' ? 'white' : 'var(--gray-700)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <FaList size={13} /> Tabel Rinci
            </button>
          </div>
        </div>

        {viewMode === 'grid' && (
          <div className="pimpinan-grid">
            {mantanPimpinanData.map((p) => (
              <div key={p.no} className="pimpinan-card">
                <div className="pimpinan-photo-wrapper">
                  <span className="pimpinan-badge-num">Ke-{p.no}</span>
                  <img
                    src={p.photo}
                    alt={p.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(p.name) + '&background=1b5e20&color=fff&size=256';
                    }}
                  />
                </div>
                <div className="pimpinan-info">
                  <div className="pimpinan-name">{p.name}</div>
                  <div className="pimpinan-period">
                    <FaCalendarAlt style={{ marginRight: '5px', verticalAlign: '-1px' }} />
                    Masa Bakti: {p.period}
                  </div>
                  <div className="pimpinan-office">
                    <FaBuilding style={{ marginRight: '5px', verticalAlign: '-1px', color: 'var(--gray-400)' }} />
                    {p.office}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'table' && (
          <div className="pa-table-wrapper">
            <table className="pa-table">
              <thead>
                <tr>
                  <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                  <th>Nama & Gelar Lengkap</th>
                  <th style={{ width: '140px', textAlign: 'center' }}>Masa Bakti</th>
                  <th>Alamat Kantor Saat Bertugas</th>
                </tr>
              </thead>
              <tbody>
                {mantanPimpinanData.map((p) => (
                  <tr key={p.no}>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{p.no}</td>
                    <td><strong>{p.name}</strong></td>
                    <td style={{ textAlign: 'center', color: 'var(--primary-800)', fontWeight: 600 }}>{p.period}</td>
                    <td>{p.office}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </ProfileLayout>
  );
}

export default MantanPimpinanPage;
