import { useState } from 'react';
import KepaniteraanLayout from './KepaniteraanLayout';
import { FaGavel, FaExchangeAlt, FaBalanceScale, FaFileSignature, FaCertificate, FaHammer } from 'react-icons/fa';

function ProsedurBerperkaraPage() {
  const [activeTab, setActiveTab] = useState('tingkat-pertama');

  return (
    <KepaniteraanLayout
      title="Prosedur Berperkara"
      subtitle="Panduan Alur Beracara Tingkat Pertama, Banding, Kasasi, PK, Gugatan Sederhana, dan Eksekusi"
      breadcrumb="Prosedur Berperkara"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaGavel style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Pedoman Beracara di Peradilan Agama</h4>
          <p style={{ margin: 0 }}>
            Prosedur beracara di Pengadilan Agama Kota Cimahi berpedoman pada hukum acara perdata yang berlaku di Indonesia serta peraturan Mahkamah Agung RI guna menjamin proses peradilan yang sederhana, cepat, dan berbiaya ringan.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {[
            { id: 'tingkat-pertama', label: 'Tingkat Pertama' },
            { id: 'banding', label: 'Tingkat Banding' },
            { id: 'kasasi', label: 'Tingkat Kasasi' },
            { id: 'pk', label: 'Peninjauan Kembali (PK)' },
            { id: 'produk', label: 'Pengambilan Produk' },
            { id: 'gugatan-sederhana', label: 'Gugatan Sederhana' },
            { id: 'eksekusi', label: 'Prosedur Eksekusi' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: activeTab === tab.id ? 'none' : '1px solid var(--gray-300)',
                background: activeTab === tab.id ? 'var(--primary-800)' : 'white',
                color: activeTab === tab.id ? 'white' : 'var(--gray-700)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'tingkat-pertama' && (
          <div>
            <h2>Prosedur Berperkara Tingkat Pertama</h2>
            <ol>
              <li><strong>Pendaftaran Perkara:</strong> Penggugat/Pemohon mendaftarkan gugatan/permohonan melalui e-Court atau datang langsung ke Meja PTSP.</li>
              <li><strong>Pembayaran Panjar Biaya:</strong> Membayar taksiran panjar biaya perkara melalui Bank BRI atau kanal pembayaran virtual account.</li>
              <li><strong>Pemberian Nomor Perkara:</strong> Petugas membukukan perkara dan menerbitkan Surat Kuasa Untuk Membayar (SKUM) serta Nomor Perkara.</li>
              <li><strong>Penetapan Majelis Hakim & Hari Sidang:</strong> Ketua menunjuk Majelis Hakim (PMH), Panitera menunjuk Panitera Pengganti (PP), dan Majelis menetapkan Hari Sidang (PHS).</li>
              <li><strong>Pemanggilan Para Pihak:</strong> Juru Sita memanggil Penggugat dan Tergugat untuk hadir pada hari sidang yang telah ditentukan.</li>
              <li><strong>Tahap Persidangan:</strong> Meliputi Upaya Perdamaian/Mediasi, Pembacaan Gugatan, Jawaban, Replik, Duplik, Pembuktian, Kesimpulan, dan Pembacaan Putusan.</li>
            </ol>
          </div>
        )}

        {activeTab === 'banding' && (
          <div>
            <h2>Prosedur Permohonan Banding (PTA Bandung)</h2>
            <ol>
              <li>Permohonan banding diajukan ke Pengadilan Agama Kota Cimahi dalam tenggang waktu <strong>14 hari</strong> setelah putusan diucapkan atau diberitahukan secara sah.</li>
              <li>Membayar panjar biaya perkara banding.</li>
              <li>Panitera memberitahukan permohonan banding kepada pihak terbanding.</li>
              <li>Pembanding dapat menyerahkan Memori Banding, dan Terbanding berhak menyerahkan Kontra Memori Banding.</li>
              <li>Para pihak diberi kesempatan membaca/memeriksa berkas perkara (Inzage) dalam waktu 14 hari.</li>
              <li>Berkas perkara (Bundel A dan Bundel B) dikirimkan ke Pengadilan Tinggi Agama Bandung untuk diperiksa dan diputus.</li>
            </ol>
          </div>
        )}

        {activeTab === 'kasasi' && (
          <div>
            <h2>Prosedur Permohonan Kasasi (Mahkamah Agung RI)</h2>
            <ol>
              <li>Permohonan kasasi diajukan dalam tenggang waktu <strong>14 hari</strong> setelah putusan/pemberitahuan putusan banding diterima.</li>
              <li>Membayar biaya panjar kasasi di Pengadilan Agama Kota Cimahi.</li>
              <li>Pemohon Kasasi <strong>wajib</strong> menyerahkan Memori Kasasi dalam waktu 14 hari sejak permohonan didaftarkan.</li>
              <li>Panitera menyampaikan salinan memori kasasi kepada Termohon Kasasi, yang dapat menyampaikan Kontra Memori Kasasi dalam 14 hari.</li>
              <li>Berkas perkara dikirimkan ke Mahkamah Agung RI.</li>
            </ol>
          </div>
        )}

        {activeTab === 'pk' && (
          <div>
            <h2>Prosedur Peninjauan Kembali (PK)</h2>
            <ol>
              <li>Permohonan PK diajukan atas dasar adanya bukti baru (<em>Novum</em>) yang belum pernah diperiksa, atau adanya pertentangan putusan, atau kekhilafan hakim.</li>
              <li>Tenggang waktu pengajuan adalah <strong>180 hari</strong> sejak ditemukannya bukti baru (disumpah) atau putusan berkekuatan hukum tetap.</li>
              <li>Membayar panjar biaya perkara PK dan mendaftarkan permohonan di Pengadilan Agama Kota Cimahi.</li>
              <li>Pengadilan melakukan sidang pemeriksaan bukti novum, kemudian berkas dikirim ke Mahkamah Agung RI.</li>
            </ol>
          </div>
        )}

        {activeTab === 'produk' && (
          <div>
            <h2>Prosedur Pengambilan Produk Pengadilan (Akta Cerai & Salinan Putusan)</h2>
            <ul>
              <li><strong>Pihak Berperkara Langsung:</strong> Menunjukkan identitas diri asli (KTP/SIM) dan menyerahkan fotokopinya, serta menyebutkan nomor perkara.</li>
              <li><strong>Melalui Kuasa:</strong> Menyertakan Surat Kuasa Khusus bermeterai Rp 10.000,- yang dilegalisasi Notaris/Ketua Pengadilan, disertai identitas pemberi dan penerima kuasa.</li>
              <li><strong>Penerbitan Akta Cerai:</strong> Diterbitkan setelah perkara cerai berkekuatan hukum tetap (BHT) dan ikrar talak telah diucapkan (untuk cerai talak).</li>
              <li>Membayar PNBP pengambilan produk sesuai ketentuan PP RI No. 5 Tahun 2019.</li>
            </ul>
          </div>
        )}

        {activeTab === 'gugatan-sederhana' && (
          <div>
            <h2>Prosedur Gugatan Sederhana (Small Claim Court)</h2>
            <p>Tata cara pemeriksaan perdata ekonomi syariah dengan nilai gugatan materiil paling banyak <strong>Rp 500.000.000,-</strong> (Lima Ratus Juta Rupiah):</p>
            <ul>
              <li>Diperiksa dan diputus oleh <strong>Hakim Tunggal</strong> dalam waktu paling lama <strong>25 hari</strong> kerja sejak sidang pertama.</li>
              <li>Penggugat dan Tergugat wajib berdomisili di wilayah hukum yang sama (Kota Cimahi / Kabupaten Bandung Barat).</li>
              <li>Tidak dapat diajukan tuntutan provisi, eksepsi, rekonvensi, replik, duplik, atau kesimpulan.</li>
              <li>Upaya hukum terhadap putusan gugatan sederhana hanya berupa <strong>Keberatan</strong> ke Ketua Pengadilan.</li>
            </ul>
          </div>
        )}

        {activeTab === 'eksekusi' && (
          <div>
            <h2>Prosedur Permohonan Eksekusi</h2>
            <ol>
              <li>Pemohon mengajukan Surat Permohonan Eksekusi atas putusan yang telah BHT ke Ketua Pengadilan Agama Kota Cimahi.</li>
              <li>Membayar taksiran panjar biaya eksekusi.</li>
              <li>Ketua Pengadilan menerbitkan penetapan teguran (<em>Aanmaning</em>) dan memanggil Termohon Eksekusi.</li>
              <li>Ketua Pengadilan memimpin sidang Aanmaning memberi peringatan kepada Termohon agar memenuhi putusan dalam 8 hari.</li>
              <li>Jika Termohon tidak memenuhi secara sukarela, Ketua menerbitkan Surat Penetapan Sita Eksekusi / Eksekusi Riil / Eksekusi Lelang.</li>
            </ol>
          </div>
        )}
      </article>
    </KepaniteraanLayout>
  );
}

export default ProsedurBerperkaraPage;
