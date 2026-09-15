import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { 
  FaFileInvoiceDollar, 
  FaDownload, 
  FaCheckCircle, 
  FaChartPie, 
  FaCoins, 
  FaSearch, 
  FaFilePdf, 
  FaInfoCircle,
  FaCalendarAlt,
  FaBalanceScale,
  FaFileAlt
} from 'react-icons/fa';

import dipaData from '../../data/dipaData.json';
const { dipaPetikan, rpaData, rkklData } = dipaData;

function DIPAPage() {
  const [activeTab, setActiveTab] = useState('dipa');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredDipa = dipaPetikan.filter(d => 
    d.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.year.includes(searchFilter) ||
    d.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <KesekretariatanLayout
      title="DIPA & Pengelolaan Anggaran"
      subtitle="Publikasi DIPA Petikan (01 & 04), Rencana Penarikan Anggaran (RPA), Kertas Kerja RKA-KL, CaLK, dan Neraca Keuangan Pengadilan Agama Kota Cimahi"
      breadcrumb="DIPA"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'dipa', label: 'DIPA Petikan' },
            { id: 'rpa', label: 'RPA (Rencana Penarikan)' },
            { id: 'rkkl', label: 'Kertas Kerja RKA-KL' },
            { id: 'calk', label: 'CaLK (Catatan Laporan)' },
            { id: 'neraca', label: 'Neraca Keuangan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px',
                border: 'none',
                background: activeTab === tab.id ? '#1b5e20' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#475569',
                borderRadius: '6px 6px 0 0',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.84rem'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dipa' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Daftar Isian Pelaksanaan Anggaran (DIPA) TA 2025 / 2024</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>Petikan DIPA Badan Urusan Administrasi (01) dan Ditjen Badilag (04)</p>
              </div>
              <div style={{ position: 'relative', width: '260px' }}>
                <input
                  type="text"
                  placeholder="Cari DIPA..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.85rem'
                  }}
                />
                <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {filteredDipa.map((doc, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ background: '#ecfdf5', color: '#065f46', fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', borderRadius: '4px' }}>
                      {doc.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaCalendarAlt size={11} /> {doc.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>{doc.nominal}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '8px', fontFamily: 'monospace' }}>{doc.code}</div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 14px 0', lineHeight: 1.4 }}>{doc.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px dashed #e2e8f0' }}>
                    <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                      <FaCheckCircle size={12} style={{ verticalAlign: '-1px', marginRight: '4px' }} />
                      {doc.status}
                    </span>
                    <button
                      onClick={() => alert(`Mengunduh dokumen DIPA: ${doc.description}`)}
                      style={{
                        background: '#1b5e20',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FaFilePdf /> Unduh ({doc.fileSize})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rpa' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 6px 0' }}>Rencana Penarikan Anggaran (RPA / RPD) TA 2025</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Rencana dan realisasi penarikan dana bulanan per DIPA Satuan Kerja</p>

            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Periode / Bulan</th>
                    <th style={{ padding: '12px 14px' }}>Target DIPA 01</th>
                    <th style={{ padding: '12px 14px' }}>Target DIPA 04</th>
                    <th style={{ padding: '12px 14px' }}>Total Realisasi</th>
                    <th style={{ padding: '12px 14px' }}>Status RPD</th>
                  </tr>
                </thead>
                <tbody>
                  {rpaData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1e293b' }}>{row.bulan}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.targetDipa01}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.targetDipa04}</td>
                      <td style={{ padding: '12px 14px', color: '#047857', fontWeight: 700 }}>{row.realisasi}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: '#ecfdf5', color: '#065f46', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => alert('Mengunduh Jadwal RPA / RPD TA 2025 Lengkap (PDF)')}
              style={{
                background: '#1b5e20',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FaDownload size={12} /> Unduh Matriks RPD / RPA TA 2025 (PDF)
            </button>
          </div>
        )}

        {activeTab === 'rkkl' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 6px 0' }}>Rincian Kertas Kerja Satker (RKA-KL) TA 2025</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Rincian alokasi belanja program dan output kegiatan satuan kerja</p>

            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Kode Akun / Output</th>
                    <th style={{ padding: '12px 14px' }}>Uraian Program & Kegiatan</th>
                    <th style={{ padding: '12px 14px' }}>Pagu Alokasi</th>
                    <th style={{ padding: '12px 14px' }}>Sumber Dana</th>
                  </tr>
                </thead>
                <tbody>
                  {rkklData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#0369a1', fontWeight: 600 }}>{row.kodeAkun}</td>
                      <td style={{ padding: '12px 14px', color: '#1e293b', fontWeight: 600 }}>{row.deskripsi}</td>
                      <td style={{ padding: '12px 14px', color: '#047857', fontWeight: 700 }}>{row.pagu}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.sumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => alert('Mengunduh Kertas Kerja RKA-KL Lengkap (PDF)')}
              style={{
                background: '#1b5e20',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FaFilePdf size={12} /> Unduh Kertas Kerja RKA-KL TA 2025 (PDF)
            </button>
          </div>
        )}

        {activeTab === 'calk' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 6px 0' }}>Catatan Atas Laporan Keuangan (CaLK)</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Penjelasan naratif dan rincian akun laporan keuangan Pengadilan Agama Kota Cimahi</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Catatan Atas Laporan Keuangan (CaLK) Tahunan 2024 (Audited)', size: '4.8 MB', date: 'Januari 2025' },
                { title: 'Catatan Atas Laporan Keuangan (CaLK) Semester II 2024', size: '3.6 MB', date: 'Desember 2024' },
                { title: 'Catatan Atas Laporan Keuangan (CaLK) Semester I 2024', size: '3.2 MB', date: 'Juli 2024' },
              ].map((doc, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaFilePdf size={22} color="#dc2626" />
                    <div>
                      <h4 style={{ fontSize: '0.92rem', color: '#1e293b', margin: '0 0 2px 0', fontWeight: 600 }}>{doc.title}</h4>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Tanggal Terbit: {doc.date}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Mengunduh: ${doc.title}`)}
                    style={{
                      background: '#1b5e20',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FaDownload size={11} /> Unduh ({doc.size})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'neraca' && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#1b5e20', margin: '0 0 6px 0' }}>Neraca Keuangan Satuan Kerja</h2>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Posisi aset, kewajiban, dan ekuitas Pengadilan Agama Kota Cimahi</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '0.95rem' }}>Aset Lancar (Kas & Persediaan)</h4>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1b5e20' }}>Rp 124.500.000</div>
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '0.95rem' }}>Aset Tetap (Tanah, Gedung, Mesin BMN)</h4>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1b5e20' }}>Rp 19.100.500.000</div>
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '0.95rem' }}>Total Ekuitas Satker</h4>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#047857' }}>Rp 19.225.000.000</div>
              </div>
            </div>

            <button
              onClick={() => alert('Mengunduh Laporan Neraca Keuangan Audited BPK (PDF)')}
              style={{
                background: '#1b5e20',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FaFilePdf size={12} /> Unduh Neraca Keuangan 2024 Audited (PDF)
            </button>
          </div>
        )}
      </div>
    </KesekretariatanLayout>
  );
}

export default DIPAPage;
