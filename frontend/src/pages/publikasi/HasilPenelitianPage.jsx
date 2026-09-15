import { useState } from 'react';
import PublikasiLayout from './PublikasiLayout';
import { FaFilePdf, FaUserGraduate, FaSearch } from 'react-icons/fa';

const researchArchive = [
  {
    judul: 'Efektivitas Mediasi Elektronik dalam Penyelesaian Perkara Cerai Gugat di Pengadilan Agama Cimahi Masa Pasca Pandemi',
    peneliti: 'Ahmad Fauzi, S.H.',
    kampus: 'Universitas Islam Negeri Sunan Gunung Djati Bandung (UIN SGD)',
    strata: 'Tesis Magister Hukum (S2)',
    tahun: '2024',
    size: '4.8 MB',
  },
  {
    judul: 'Implementasi Pembebasan Biaya Perkara (Prodeo) bagi Masyarakat Miskin Ditinjau dari Asas Keadilan Akses Hukum',
    peneliti: 'Nabila Rahmawati',
    kampus: 'Universitas Padjadjaran (UNPAD)',
    strata: 'Skripsi Sarjana Hukum (S1)',
    tahun: '2024',
    size: '3.6 MB',
  },
  {
    judul: 'Analisis Pertimbangan Hakim dalam Penetapan Dispensasi Kawin Pasca Berlakunya Undang-Undang Nomor 16 Tahun 2019',
    peneliti: 'Rian Hidayat',
    kampus: 'Universitas Pasundan (UNPAS)',
    strata: 'Skripsi Sarjana Hukum (S1)',
    tahun: '2023',
    size: '3.2 MB',
  },
  {
    judul: 'Perlindungan Hukum Hak Ex-Officio Hakim terhadap Nafkah Madhiyah dan Hadhanah Pascaperceraian di PA Kota Cimahi',
    peneliti: 'Dr. Muhammad Ridwan, M.Ag.',
    kampus: 'IAIN Syekh Nurjati Cirebon',
    strata: 'Penelitian Dosen / Jurnal Terakreditasi SINTA',
    tahun: '2023',
    size: '2.1 MB',
  },
];

function HasilPenelitianPage() {
  const [tab, setTab] = useState('arsip');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = researchArchive.filter(r => 
    r.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.peneliti.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.kampus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PublikasiLayout
      title="Arsip Hasil Penelitian & Riset Akademis"
      subtitle="Koleksi Skripsi, Tesis, Disertasi, dan Jurnal Ilmiah yang Dilaksanakan di Pengadilan Agama Kota Cimahi Serta Prosedur Izin Penelitian"
      breadcrumb="Hasil Penelitian"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            onClick={() => setTab('arsip')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: tab === 'arsip' ? '#1b5e20' : 'transparent',
              color: tab === 'arsip' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Daftar Arsip Penelitian
          </button>
          <button
            onClick={() => setTab('prosedur')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: tab === 'prosedur' ? '#1b5e20' : 'transparent',
              color: tab === 'prosedur' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Prosedur & Syarat Izin Riset
          </button>
        </div>

        {tab === 'arsip' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Repositori Karya Ilmiah Mahasiswa & Dosen</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>Arsip data penelitian hukum perdata agama di wilayah hukum Cimahi dan Bandung Barat</p>
              </div>
              <div style={{ position: 'relative', width: '280px' }}>
                <input
                  type="text"
                  placeholder="Cari judul / nama peneliti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '18px 20px',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>
                        {item.strata}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tahun: {item.tahun}</span>
                    </div>

                    <h4 style={{ fontSize: '0.98rem', color: '#1e293b', margin: '0 0 6px 0', fontWeight: 700, lineHeight: 1.4 }}>
                      {item.judul}
                    </h4>

                    <div style={{ fontSize: '0.82rem', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaUserGraduate size={12} /> Peneliti: <strong>{item.peneliti}</strong> ({item.kampus})
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Mengunduh abstrak/naskah penelitian: ${item.judul}`)}
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
                    <FaFilePdf size={12} /> Unduh Naskah ({item.size})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'prosedur' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 12px 0' }}>Persyaratan & Alur Izin Penelitian / Magang Riset</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              {[
                { no: '1', title: 'Surat Permohonan dari Kampus', desc: 'Surat resmi dari Dekan / Direktur Pascasarjana ditujukan kepada Ketua Pengadilan Agama Kota Cimahi.' },
                { no: '2', title: 'Proposal Penelitian', desc: 'Melampirkan proposal penelitian lengkap, instrumen wawancara/kuesioner, dan data yang dibutuhkan.' },
                { no: '3', title: 'Verifikasi & Disposisi Ketua', desc: 'Subbag PTIP memproses permohonan dan menerbitkan Surat Izin Penelitian resmi (maksimal 3 hari kerja).' },
                { no: '4', title: 'Penyerahan Laporan Akhir', desc: 'Setelah penelitian selesai, peneliti wajib menyerahkan 1 eksemplar naskah/abstrak ke perpustakaan PA Cimahi.' },
              ].map((p, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1b5e20', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '8px' }}>
                    {p.no}
                  </div>
                  <h4 style={{ fontSize: '0.92rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>{p.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublikasiLayout>
  );
}

export default HasilPenelitianPage;
