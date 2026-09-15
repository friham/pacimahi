import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { FaAward, FaCheckCircle, FaFilePdf, FaStar } from 'react-icons/fa';

const ikmData = [
  { triwulan: 'Triwulan IV 2024', ikm: '3.92 / 4.00 (98.00%)', mutu: 'A (Sangat Baik)', responden: '185 Orang', icon: FaStar },
  { triwulan: 'Triwulan III 2024', ikm: '3.89 / 4.00 (97.25%)', mutu: 'A (Sangat Baik)', responden: '192 Orang', icon: FaStar },
  { triwulan: 'Triwulan II 2024', ikm: '3.86 / 4.00 (96.50%)', mutu: 'A (Sangat Baik)', responden: '174 Orang', icon: FaStar },
  { triwulan: 'Triwulan I 2024', ikm: '3.85 / 4.00 (96.25%)', mutu: 'A (Sangat Baik)', responden: '168 Orang', icon: FaStar },
];

const ipakData = [
  { triwulan: 'Triwulan IV 2024', ipak: '3.98 / 4.00 (99.50%)', mutu: 'Sangat Bersih (Bebas KKN)', responden: '185 Orang' },
  { triwulan: 'Triwulan III 2024', ipak: '3.96 / 4.00 (99.00%)', mutu: 'Sangat Bersih (Bebas KKN)', responden: '192 Orang' },
  { triwulan: 'Triwulan II 2024', ipak: '3.95 / 4.00 (98.75%)', mutu: 'Sangat Bersih (Bebas KKN)', responden: '174 Orang' },
  { triwulan: 'Triwulan I 2024', ipak: '3.94 / 4.00 (98.50%)', mutu: 'Sangat Bersih (Bebas KKN)', responden: '168 Orang' },
];

function SurveiPelayananPublikPage() {
  const [tab, setTab] = useState('ikm');

  return (
    <KesekretariatanLayout
      title="Survei Pelayanan Publik (IKM & IPAK)"
      subtitle="Hasil Survei Kepuasan Masyarakat (IKM) dan Indeks Persepsi Anti Korupsi (IPAK) Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Survei Pelayanan Publik"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #047857)',
          borderRadius: '12px',
          padding: '24px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          boxShadow: '0 4px 15px rgba(27, 94, 32, 0.2)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <FaAward size={20} color="#fde047" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#fde047', letterSpacing: '0.05em' }}>
                Nilai Mutu Pelayanan Periode Terakhir (TW IV 2024)
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: '0 0 6px 0', fontWeight: 800 }}>MUTU PELAYANAN A (SANGAT BAIK)</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Berdasarkan survei elektronik independen terhadap seluruh pengguna layanan pengadilan.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>98.00%</div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase' }}>Indeks IKM</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 20px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>99.50%</div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase' }}>Indeks IPAK</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            onClick={() => setTab('ikm')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: tab === 'ikm' ? '#1b5e20' : 'transparent',
              color: tab === 'ikm' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaStar /> Indeks Kepuasan Masyarakat (IKM)
          </button>
          <button
            onClick={() => setTab('ipak')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: tab === 'ipak' ? '#1b5e20' : 'transparent',
              color: tab === 'ipak' ? '#fff' : '#475569',
              borderRadius: '6px 6px 0 0',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FaCheckCircle /> Indeks Persepsi Anti Korupsi (IPAK)
          </button>
        </div>

        {tab === 'ikm' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Hasil Survei IKM Triwulanan TA 2024</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Evaluasi 9 unsur standar kepuasan pelayanan publik berdasarkan PermenPAN-RB No. 14 Tahun 2017</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {ikmData.map((item, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {item.triwulan}
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>
                    {item.ikm}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 600, marginBottom: '8px' }}>
                    Mutu: {item.mutu}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                    Jumlah Responden: <strong>{item.responden}</strong>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Mengunduh Laporan Lengkap Survei IKM 2024 (PDF)')}
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
              <FaFilePdf size={12} /> Unduh Laporan Survei IKM Lengkap (PDF)
            </button>
          </div>
        )}

        {tab === 'ipak' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Hasil Survei Persepsi Anti Korupsi (IPAK) TA 2024</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.88rem' }}>Pengukuran integritas dan kepuasan bebas dari suap, gratifikasi, dan calo peradilan</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {ipakData.map((item, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {item.triwulan}
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>
                    {item.ipak}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: 600, marginBottom: '8px' }}>
                    Predikat: {item.mutu}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                    Jumlah Responden: <strong>{item.responden}</strong>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Mengunduh Laporan Lengkap Survei IPAK 2024 (PDF)')}
              style={{
                background: '#0284c7',
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
              <FaFilePdf size={12} /> Unduh Laporan Survei IPAK Lengkap (PDF)
            </button>
          </div>
        )}
      </div>
    </KesekretariatanLayout>
  );
}

export default SurveiPelayananPublikPage;
