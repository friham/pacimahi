import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import KepaniteraanLayout from './KepaniteraanLayout';
import { FaHandHoldingHeart, FaDownload } from 'react-icons/fa';

function PosbakumPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'keberadaan');

  const [prevTab, setPrevTab] = useState(tabFromUrl);
  if (prevTab !== tabFromUrl) {
    setPrevTab(tabFromUrl);
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  return (
    <KepaniteraanLayout
      title="Pos Bantuan Hukum (Posbakum)"
      subtitle="Layanan Bantuan Hukum Cuma-Cuma bagi Masyarakat Kurang Mampu di Pengadilan Agama Kota Cimahi"
      breadcrumb="Posbakum"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaHandHoldingHeart style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Pelayanan Bantuan Hukum Gratis</h4>
          <p style={{ margin: 0 }}>
            Pos Bantuan Hukum (Posbakum) Pengadilan Agama Kota Cimahi dibentuk untuk memberikan layanan bantuan hukum berupa pemberian informasi, konsultasi, advis hukum, serta pembuatan dokumen hukum bagi masyarakat yang tidak mampu secara cuma-cuma (gratis).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {[
            { id: 'keberadaan', label: 'Keberadaan Posbakum' },
            { id: 'penerima', label: 'Penerima Jasa' },
            { id: 'jenis', label: 'Jenis Jasa Hukum' },
            { id: 'syarat', label: 'Syarat & Mekanisme' },
            { id: 'aturan', label: 'Dasar Hukum' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
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

        {activeTab === 'keberadaan' && (
          <div>
            <h2>Kerjasama Lembaga Bantuan Hukum (Posbakum)</h2>
            <p>
              Penyelenggaraan Pos Bantuan Hukum Pengadilan Agama Kota Cimahi bekerjasama dengan Lembaga Bantuan Hukum (LBH) terakreditasi:
            </p>
            <div className="pa-table-wrapper">
              <table className="pa-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                    <th>Nama Lembaga Bantuan Hukum</th>
                    <th style={{ textAlign: 'center', width: '90px' }}>Tahun</th>
                    <th style={{ textAlign: 'center', width: '130px' }}>Surat Perjanjian (MoU)</th>
                    <th style={{ textAlign: 'center', width: '130px' }}>SK Ketua PA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>1</td>
                    <td><strong>Biro Konsultasi dan Layanan Hukum Keluarga (BKLHK) Klinik Hukum Fakultas Syariah & Hukum UIN Sunan Gunung Djati Bandung</strong></td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>2025</td>
                    <td style={{ textAlign: 'center' }}>
                      <a href="https://drive.google.com/file/d/1ijf7_IUy2ZZJc0yiahxbv5woc810nvH9/view?usp=drive_link" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', fontWeight: 600, textDecoration: 'none' }}>
                        <FaDownload size={11} /> Lihat MoU
                      </a>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <a href="https://drive.google.com/file/d/1SzixZAWH7VJx4_FZP36bBtki7qxpznvN/view?usp=sharing" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', fontWeight: 600, textDecoration: 'none' }}>
                        <FaDownload size={11} /> Lihat SK
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>2</td>
                    <td><strong>Biro Konsultasi dan Layanan Hukum Keluarga (BKLHK) Klinik Hukum Fakultas Syariah & Hukum UIN Sunan Gunung Djati Bandung</strong></td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>2024</td>
                    <td style={{ textAlign: 'center' }}>
                      <a href="https://drive.google.com/file/d/1PHok6fR6ii02lmk4VvnF9JxPg5h97vD2/view?usp=drive_link" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', fontWeight: 600, textDecoration: 'none' }}>
                        <FaDownload size={11} /> Lihat MoU
                      </a>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <a href="https://drive.google.com/file/d/1d0X61JkS5Hgl3m7fH3S9ckEnB90s0DgA/view?usp=sharing" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-800)', fontWeight: 600, textDecoration: 'none' }}>
                        <FaDownload size={11} /> Lihat SK
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'penerima' && (
          <div>
            <h2>Penerima Jasa Pos Bantuan Hukum</h2>
            <p>Masyarakat yang berhak menerima layanan cuma-cuma di Posbakum Pengadilan Agama Kota Cimahi adalah:</p>
            <ul>
              <li>Masyarakat pencari keadilan yang tidak mampu secara ekonomi dalam membayar jasa advokat/kuasa hukum.</li>
              <li>Masyarakat yang tidak memiliki akses terhadap informasi dan konsultasi hukum peradilan agama.</li>
              <li>Perempuan kepala keluarga, penyandang disabilitas, dan kelompok rentan lainnya.</li>
            </ul>
          </div>
        )}

        {activeTab === 'jenis' && (
          <div>
            <h2>Jenis Jasa Hukum yang Dilayani</h2>
            <p>Layanan cuma-cuma yang diberikan oleh petugas Posbakum meliputi:</p>
            <ol>
              <li><strong>Pemberian Informasi dan Konsultasi Hukum:</strong> Memberikan penjelasan terkait tata cara dan syarat mengajukan perkara di Pengadilan Agama.</li>
              <li><strong>Pembuatan Dokumen Hukum:</strong> Membantu penyusunan surat gugatan atau surat permohonan secara rapi dan sesuai kaidah hukum formil.</li>
              <li><strong>Penyediaan Informasi Prodeo:</strong> Memberikan panduan pengajuan permohonan pembebasan biaya perkara (prodeo).</li>
              <li><strong>Rujukan Bantuan Hukum Lanjutan:</strong> Memberikan rujukan ke Organisasi Bantuan Hukum terakreditasi jika perkara memerlukan pendampingan advokat di persidangan.</li>
            </ol>
          </div>
        )}

        {activeTab === 'syarat' && (
          <div>
            <h2>Syarat dan Mekanisme Layanan Posbakum</h2>
            <h3>Persyaratan Dokumen:</h3>
            <ul>
              <li>KTP / Kartu Identitas Diri asli dan fotokopi.</li>
              <li>Surat Keterangan Tidak Mampu (SKTM) dari Lurah/Kepala Desa setempat; ATAU</li>
              <li>Kartu Perlindungan Sosial (KPS), Kartu Indonesia Sehat (KIS/BPJS PBI), Kartu Indonesia Pintar (KIP), atau Kartu Program Keluarga Harapan (PKH).</li>
              <li>Apabila tidak memiliki dokumen di atas, pemohon dapat menandatangani Surat Pernyataan Tidak Mampu di hadapan petugas.</li>
            </ul>

            <h3>Alur Mekanisme Layanan:</h3>
            <ol>
              <li>Pemohon datang langsung ke meja PTSP Pengadilan Agama Kota Cimahi dan mengambil nomor antrean Posbakum.</li>
              <li>Pemohon menyerahkan dokumen persyaratan kepada petugas Posbakum.</li>
              <li>Petugas Posbakum melakukan verifikasi berkas dan wawancara konsultasi hukum.</li>
              <li>Petugas membuatkan draft surat permohonan/gugatan bagi pemohon.</li>
              <li>Pemohon membaca, memeriksa, dan menandatangani surat gugatan/permohonan untuk didaftarkan ke meja pendaftaran.</li>
            </ol>
          </div>
        )}

        {activeTab === 'aturan' && (
          <div>
            <h2>Dasar Hukum Pos Bantuan Hukum</h2>
            <ul>
              <li>Undang-Undang Nomor 48 Tahun 2009 tentang Kekuasaan Kehakiman.</li>
              <li>Undang-Undang Nomor 50 Tahun 2009 tentang Perubahan Kedua atas UU No. 7 Tahun 1989 tentang Peradilan Agama.</li>
              <li>Undang-Undang Nomor 16 Tahun 2011 tentang Bantuan Hukum.</li>
              <li>Peraturan Mahkamah Agung RI (PERMA) Nomor 1 Tahun 2014 tentang Pedoman Pemberian Layanan Hukum Bagi Masyarakat Tidak Mampu di Pengadilan.</li>
              <li>Surat Keputusan Direktur Jenderal Badan Peradilan Agama MARI terkait Petunjuk Teknis Pelaksanaan Posbakum Peradilan Agama.</li>
            </ul>
          </div>
        )}
      </article>
    </KepaniteraanLayout>
  );
}

export default PosbakumPage;
