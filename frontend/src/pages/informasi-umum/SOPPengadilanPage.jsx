import { useState } from 'react';
import InformasiUmumLayout from './InformasiUmumLayout';
import { FaFilePdf, FaSearch, FaBook } from 'react-icons/fa';

const sopList = [
  { no: 1, title: 'SOP Permohonan Informasi Publik dan Media', link: 'https://drive.google.com/file/d/1QpVhU1qrqJ00SRw-HD_XSql-N4NH4Y_j/view?usp=drive_link' },
  { no: 2, title: 'SOP Pelayanan Pos Bantuan Hukum (Posbakum)', link: 'https://drive.google.com/open?id=1IGxF3fRBFPyNHSYUsO_DOSPgPcaXGI1X' },
  { no: 3, title: 'SOP Pelayanan Sidang Terpadu', link: 'https://drive.google.com/open?id=1SN-vt_esYCKwVadzMXjkPqPu2InpSkeD' },
  { no: 4, title: 'SOP Pelayanan Penerimaan Perkara', link: 'https://drive.google.com/open?id=1AkdPJ0mGQQL3XdidJ7GRwb1JIUC_fvrL' },
  { no: 5, title: 'SOP Penetapan Penunjukan Majelis Hakim (PMH)', link: 'https://drive.google.com/open?id=1G4r2we1k_W36XsR_vkPMm_rZv8DOrHkk' },
  { no: 6, title: 'SOP Penetapan Penunjukan Panitera Pengganti (PP)', link: 'https://drive.google.com/open?id=1wLHcbBMKQuYa7lTsyFXSWsunneFkbdlc' },
  { no: 7, title: 'SOP Layanan Pembebasan Biaya Perkara Pada Tingkat Pertama (Prodeo)', link: 'https://drive.google.com/open?id=1aUElLzXkUnEdRmrX2SPC7LR2z2Wgbm0U' },
  { no: 8, title: 'SOP Layanan Permohonan Eksekusi Riil', link: 'https://drive.google.com/open?id=1MlAhszlhAymdXkeUQUR_ZH70rx_HeeFz' },
  { no: 9, title: 'SOP Layanan Permohonan Eksekusi Pembayaran Sejumlah Uang', link: 'https://drive.google.com/open?id=1F7-q-tFin57UxhkvmNZxbb1Le92rA4up' },
  { no: 10, title: 'SOP Layanan Permohonan Eksekusi Selain Putusan PA dengan Lelang', link: 'https://drive.google.com/open?id=1ZCbY7Z4sHvGVHGxKuKGRviTxGvdu5SaP' },
  { no: 11, title: 'SOP Layanan Permohonan Bantuan Eksekusi PA Lain (Delegasi)', link: 'https://drive.google.com/open?id=100BOj23_Gsux-T2lanrw8r3ISQeBQmVx' },
  { no: 12, title: 'SOP Layanan Permohonan Konsinyasi', link: 'https://drive.google.com/open?id=1Is8u-MvIcgUQfmXh5eFk0DKhFgMEhMcn' },
  { no: 13, title: 'SOP Pengarsipan Perkara', link: 'https://drive.google.com/open?id=1khJLy67l56Z7OPIxgCmsadPPoOiw50rB' },
  { no: 14, title: 'SOP Pelaporan Perkara', link: 'https://drive.google.com/open?id=14Js5k6cEXeHzQHfUreSGDdB2CGb7eNkt' },
  { no: 15, title: 'SOP Pelayanan Pengaduan', link: 'https://drive.google.com/open?id=1s6PsgaDJB2OMFAgvTUEWuOfL1U86tGy6&usp=drive_fs' },
  { no: 16, title: 'SOP Layanan Permohonan Perceraian dari PNS, TNI dan POLRI', link: 'https://drive.google.com/open?id=1P4mh9NEhF0Ie-VNnnlzbiaTeQL2T9TGo' },
  { no: 17, title: 'SOP Layanan Permohonan Itsbat Nikah Volunter', link: 'https://drive.google.com/open?id=17fDoFKSUM_kGUobf0Ut-euQqQx0YO9WB' },
  { no: 18, title: 'SOP Permohonan Banding', link: 'https://drive.google.com/open?id=1POOWzDKzW_rqemO42dw4HQ8wDqg-yrMl' },
  { no: 19, title: 'SOP Pelayanan Mediasi', link: 'https://drive.google.com/open?id=1eQGudZIDeypM6_IQA_rBtT9UMYXyPNdj' },
  { no: 20, title: 'SOP Layanan Pemanggilan Pihak', link: 'https://drive.google.com/open?id=1tgm-JonSKZMzJYN6jGP5pLeCnzJsZNDO' },
  { no: 21, title: 'SOP Layanan Pemeriksaan Setempat (Descente)', link: 'https://drive.google.com/open?id=1RIPLl_F_Jm4Yc2QpK-RmMil1sKrCRt1G' },
  { no: 22, title: 'SOP Layanan Teguran Tambah Panjar Biaya Perkara', link: 'https://drive.google.com/open?id=1q27VnJ5Fn1xHg7mYoUbqhcbKU8srrHUj' },
  { no: 23, title: 'SOP Layanan Sita Jaminan (Conservatoir Beslag)', link: 'https://drive.google.com/open?id=1q9DTGv49ECOzXMLfEOjkVoqZqZw031YS' },
  { no: 24, title: 'SOP Layanan Sita Buntut Tingkat Banding', link: 'https://drive.google.com/open?id=1Dbma0AP2Cwtf2HOXVf43W4YcREb5dTuq' },
  { no: 25, title: 'SOP Layanan Sita Buntut Tingkat Kasasi', link: 'https://drive.google.com/open?id=140xxwM0CBEpZBPjm92mZAI70hIbs0Bf8' },
  { no: 26, title: 'SOP Layanan Sita Harta Bersama Tanpa Perkara', link: 'https://drive.google.com/open?id=1hYUOawj5jHeeBhA-Cg_0xOrVXJum576j' },
  { no: 27, title: 'SOP Layanan Pemberitahuan Isi Putusan (PBT)', link: 'https://drive.google.com/open?id=1FQjzpX89_7w_ItmwXTP6Hp-wkBeqOVdH' },
  { no: 28, title: 'SOP Pengembalian Sisa Panjar Biaya Perkara', link: 'https://drive.google.com/open?id=11qmYj2OD1GsSoQYiYOiTv_ueHPdknokO' },
  { no: 29, title: 'SOP Layanan Perkara Berkekuatan Hukum Tetap (BHT)', link: 'https://drive.google.com/open?id=1cEaKQjPsTOeFu46WvmVSg_S9pWwTQHs0' },
  { no: 30, title: 'SOP Penyerahan Akta Cerai', link: 'https://drive.google.com/open?id=1d5swKsqV59qjCDBRKb-34Jm86PakY9uy' },
  { no: 31, title: 'SOP Pelayanan Permohonan Kasasi', link: 'https://drive.google.com/file/d/1WKWCIKC5bHZw1bXmn1Vb0p7ATmbiZg2x/view?usp=sharing' },
  { no: 32, title: 'SOP Pelaksanaan Eksekusi Lelang', link: 'https://drive.google.com/file/d/1ZCbY7Z4sHvGVHGxKuKGRviTxGvdu5SaP/view?usp=sharing' },
  { no: 33, title: 'SOP Pelaksanaan Eksekusi Riil', link: 'https://drive.google.com/file/d/1MlAhszlhAymdXkeUQUR_ZH70rx_HeeFz/view?usp=sharing' },
  { no: 34, title: 'SOP Eksekusi Non-Eksekutable (NE)', link: 'https://drive.google.com/file/d/1eDtGmNmg0yLW_D_CgGmJhWLwYxfqdawO/view?usp=sharing' },
  { no: 35, title: 'SOP Eksekusi Pengosongan', link: 'https://drive.google.com/file/d/1DHCvWUmpruC5wxnFaOskfoLWH7XyBx1q/view?usp=sharing' },
  { no: 36, title: 'SOP Eksekusi Pembayaran Sejumlah Uang Tanpa Jaminan', link: 'https://drive.google.com/file/d/1F7-q-tFin57UxhkvmNZxbb1Le92rA4up/view?usp=sharing' },
  { no: 37, title: 'SOP Eksekusi Tabungan / Rekening', link: 'https://drive.google.com/file/d/1Z9SvS1AH8iiNw8cH3bWmce5aIPgulEwS/view?usp=sharing' },
  { no: 38, title: 'SOP Pengiriman Produk Pengadilan Melalui PT POS', link: 'https://drive.google.com/file/d/1x6Cjkmj8YXIXriZqdRoxQfp_fw15bCtN/view?usp=sharing' },
  { no: 39, title: 'SOP Pelayanan Kepada Penyandang Disabilitas', link: 'https://drive.google.com/file/d/15btaAzrjX_SjAAunTwpXB3hEQodNj2eS/view?usp=sharing' },
  { no: 40, title: 'SOP Penanganan Disabilitas di Lingkungan Pengadilan', link: 'https://drive.google.com/file/d/176qcg9f9u7e60JDzQuOh-QZ3CkNk_G1n/view?usp=sharing' },
  { no: 41, title: 'SOP Membantu Membuat Gugatan/Permohonan Bagi Tuna Aksara', link: 'https://drive.google.com/open?id=1MAd5PK8PuCFtEtIt0bCa18DECJsXeerJ&usp=drive_fs' },
  { no: 42, title: 'SOP Pelayanan Publik Ramah Kaum Rentan: Dispensasi Kawin', link: 'https://drive.google.com/open?id=1QuEVyjRDBadZEKVI9URETh8skW_9-DjC&usp=drive_fs' },
  { no: 43, title: 'SOP Pelayanan Publik Ramah Kaum Rentan: Isbat Nikah', link: 'https://drive.google.com/open?id=1hdcGYHyJy8vbc4_MXyb4SIz5TdsuF90h&usp=drive_fs' },
  { no: 44, title: 'SOP Pelayanan Publik Ramah Kaum Rentan: Perwalian Anak', link: 'https://drive.google.com/open?id=1n2e9RxkgApRHqPOF4hUHOC0-sZ-8bd6J&usp=drive_fs' },
  { no: 45, title: 'SOP Pelayanan Publik Ramah Kaum Rentan: Pengangkatan Anak (Adopsi)', link: 'https://drive.google.com/open?id=1-HUuc-CB6kr08yaLdbNLwCsAg1qF0xqy&usp=drive_fs' },
  { no: 46, title: 'SOP Pelayanan Publik Ramah Kaum Rentan: Perkara Kewarisan', link: 'https://drive.google.com/open?id=151KOpQE5wqPxc9yqWojC7PXHpttaB7Cu' },
];

function SOPPengadilanPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSop = sopList.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.no.toString().includes(searchQuery)
  );

  return (
    <InformasiUmumLayout
      title="Standar Operasional Prosedur (SOP)"
      subtitle="Dokumen Baku Standar Pelayanan Kepaniteraan dan Kesekretariatan Pengadilan Agama Kota Cimahi"
      breadcrumb="Standar Operasional Prosedur"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaBook style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Pedoman Mutu Pelayanan Pengadilan</h4>
          <p style={{ margin: 0 }}>
            Standar Operasional Prosedur (SOP) merupakan panduan baku yang mengatur seluruh alur kerja pelayanan peradilan di Pengadilan Agama Kota Cimahi Kelas IA untuk memastikan proses yang tertib, transparan, cepat, dan terukur.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#f1f5f9',
          border: '1px solid var(--gray-300)',
          borderRadius: 'var(--radius-md)',
          padding: '0.6rem 1rem',
          margin: '1.5rem 0'
        }}>
          <FaSearch style={{ color: 'var(--gray-500)' }} />
          <input
            type="text"
            placeholder="Cari nama SOP atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.92rem',
              color: 'var(--gray-800)'
            }}
          />
        </div>

        <div className="pa-table-wrapper">
          <table className="pa-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                <th>Nama Standar Operasional Prosedur (SOP)</th>
                <th style={{ width: '130px', textAlign: 'center' }}>Aksi Dokumen</th>
              </tr>
            </thead>
            <tbody>
              {filteredSop.length > 0 ? (
                filteredSop.map((sop) => (
                  <tr key={sop.no}>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{sop.no}</td>
                    <td>
                      <strong>{sop.title}</strong>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <a
                        href={sop.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--primary-700)',
                          color: 'white',
                          padding: '5px 12px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <FaFilePdf size={12} /> Unduh PDF
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-500)' }}>
                    Tidak ditemukan SOP dengan kata kunci "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </InformasiUmumLayout>
  );
}

export default SOPPengadilanPage;
