import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { 
  FaGavel, 
  FaShieldAlt, 
  FaUserTie, 
  FaUsersCog, 
  FaCheckCircle, 
  FaFilePdf, 
  FaDownload, 
  FaBalanceScale,
  FaAward
} from 'react-icons/fa';

const kodeEtikTabs = [
  { id: 'hakim', label: 'Kode Etik Hakim (KEPPH)', icon: FaGavel },
  { id: 'panitera', label: 'Kode Etik Panitera & Jurusita', icon: FaBalanceScale },
  { id: 'pegawai', label: 'Kode Etik Pegawai ASN', icon: FaUsersCog },
  { id: 'hukuman', label: 'Data Hukuman Disiplin', icon: FaShieldAlt },
  { id: 'pengaduan', label: 'Laporan Triwulan Pengaduan', icon: FaCheckCircle },
  { id: 'mkh', label: 'Putusan MKH', icon: FaGavel },
  { id: 'pedoman', label: 'Pedoman Pengawasan', icon: FaShieldAlt },
];

function PengawasanKodeEtikPage() {
  const [activeTab, setActiveTab] = useState('hakim');

  return (
    <LayananPublikLayout
      title="Pengawasan, Kode Etik & Penegakan Disiplin"
      subtitle="Pedoman Perilaku Hakim (KEPPH), Kode Etik Panitera/Jurusita, Kode Etik ASN, Data Hukuman Disiplin, dan Laporan Pengawasan"
      breadcrumb="Pengawasan & Kode Etik"
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
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#fde047' }}>
                Integritas & Kedisiplinan Aparatur (2024 - 2025)
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>0 KASUS PELANGGARAN KODE ETIK (NIHIL)</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Seluruh Pimpinan, Hakim, Pejabat Kepaniteraan, Kesekretariatan, dan Staf taat terhadap Kode Etik dan Disiplin ASN.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px 20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>NIHIL</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Hukuman Disiplin</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          {kodeEtikTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '9px 13px',
                  border: 'none',
                  background: isActive ? '#1b5e20' : 'transparent',
                  color: isActive ? '#fff' : '#475569',
                  borderRadius: '6px 6px 0 0',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem'
                }}
              >
                <Icon size={12} /> {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'hakim' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>10 Prinsip Kode Etik & Pedoman Perilaku Hakim (KEPPH)</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>Keputusan Bersama Ketua Mahkamah Agung RI dan Ketua Komisi Yudisial RI</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {[
                '1. Berperilaku Adil',
                '2. Berperilaku Jujur',
                '3. Berperilaku Arif dan Bijaksana',
                '4. Bersikap Mandiri (Independen)',
                '5. Berintegritas Tinggi',
                '6. Bertanggung Jawab',
                '7. Menjunjung Tinggi Harga Diri',
                '8. Berdisiplin Tinggi',
                '9. Berperilaku Rendah Hati',
                '10. Bersikap Profesional',
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '12px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b' }}>
                  {item}
                </div>
              ))}
            </div>

            <button onClick={() => alert('Mengunduh Naskah Lengkap KEPPH (PDF)')} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaFilePdf size={12} /> Unduh Naskah KEPPH (PDF)
            </button>
          </div>
        )}

        {activeTab === 'panitera' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Kode Etik Panitera dan Jurusita (IPASPI)</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>Keputusan Ketua Mahkamah Agung RI & Ikatan Panitera/Sekretaris Pengadilan Indonesia</p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
              <li>Menjaga integritas, kejujuran, dan rahasia musyawarah persidangan.</li>
              <li>Dilarang menerima imbalan, hadiah, atau fasilitas dari pihak yang berperkara.</li>
              <li>Melaksanakan pemanggilan pihak (relaas) secara sah, patut, dan tepat waktu.</li>
              <li>Tertib dalam pencatatan register perkara dan berita acara sidang.</li>
            </ul>
            <button onClick={() => alert('Mengunduh Kode Etik Panitera Jurusita (PDF)')} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaFilePdf size={12} /> Unduh Kode Etik IPASPI (PDF)
            </button>
          </div>
        )}

        {activeTab === 'pegawai' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Kode Etik & Disiplin Pegawai ASN (PP No. 94 Tahun 2021)</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>Nilai Dasar BerAKHLAK (Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif)</p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                Seluruh aparatur ASN PA Kota Cimahi wajib mematuhi jam kerja kedinasan, tidak menyalahgunakan wewenang jabatan, dan menerapkan budaya anti gratifikasi 100%.
              </p>
            </div>
            <button onClick={() => alert('Mengunduh PP 94/2021 tentang Disiplin ASN (PDF)')} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaFilePdf size={12} /> Unduh PP Disiplin ASN (PDF)
            </button>
          </div>
        )}

        {activeTab === 'hukuman' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Rekapitulasi Data Penjatuhan Hukuman Disiplin (2024 - 2025)</h3>
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Tahun</th>
                    <th style={{ padding: '12px 14px' }}>Hukuman Ringan</th>
                    <th style={{ padding: '12px 14px' }}>Hukuman Sedang</th>
                    <th style={{ padding: '12px 14px' }}>Hukuman Berat</th>
                    <th style={{ padding: '12px 14px' }}>Total Kasus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700 }}>2025 (Berjalan)</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>0 (NIHIL)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700 }}>2024</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px' }}>0</td>
                    <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>0 (NIHIL)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pengaduan' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Laporan Triwulan Penyelesaian Pengaduan Masyarakat</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>Rekapitulasi penanganan pengaduan via SIWAS MARI dan Meja Pengaduan Satker</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Pengaduan Masuk 2024</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>0 Laporan</div>
              </div>
              <div style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Tingkat Tindak Lanjut</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>100% Selesai</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mkh' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Putusan Majelis Kehormatan Hakim (MKH)</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>Informasi penegakan sanksi etik Majelis Kehormatan Hakim (MA RI & Komisi Yudisial)</p>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#065f46', lineHeight: 1.5 }}>
                Tidak terdapat Hakim pada Pengadilan Agama Kota Cimahi yang pernah diproses atau dijatuhi sanksi oleh Majelis Kehormatan Hakim (MKH).
              </p>
            </div>
          </div>
        )}

        {activeTab === 'pedoman' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#1b5e20', margin: '0 0 8px 0' }}>Pedoman Pengawasan Mahkamah Agung RI</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.85rem' }}>Regulasi Sistem Pengawasan Internal dan Eksternal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'PERMA No. 7 Tahun 2016: Penegakan Disiplin Kerja Hakim pada Mahkamah Agung dan Badan Peradilan', size: '1.4 MB' },
                { title: 'PERMA No. 8 Tahun 2016: Pengawasan dan Pembinaan Atasan Langsung di Lingkungan Mahkamah Agung', size: '1.2 MB' },
                { title: 'PERMA No. 9 Tahun 2016: Pedoman Penanganan Pengaduan (Whistleblowing System / SIWAS)', size: '1.8 MB' },
              ].map((doc, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 600 }}>{doc.title}</span>
                  <button onClick={() => alert(`Mengunduh: ${doc.title}`)} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer' }}>
                    Unduh ({doc.size})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LayananPublikLayout>
  );
}

export default PengawasanKodeEtikPage;
