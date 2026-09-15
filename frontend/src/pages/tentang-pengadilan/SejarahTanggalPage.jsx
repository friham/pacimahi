import ProfileLayout from './ProfileLayout';
import { FaLandmark } from 'react-icons/fa';

import initialStaff from '../../data/sejarahStaffData.json';

function SejarahTanggalPage() {

  return (
    <ProfileLayout
      title="Sejarah Pembentukan Pengadilan"
      subtitle="Perjalanan Historis, Transformasi, dan Jejak Perkembangan Pengadilan Agama Kota Cimahi"
      breadcrumb="Tanggal Pembentukan"
    >
      <article className="pa-article">
        <div className="pa-callout pa-callout--gold">
          <h4><FaLandmark style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Identitas Satuan Kerja</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.9rem' }}>
            <div><strong>Nama Satker:</strong> Pengadilan Agama Kota Cimahi Kelas IA</div>
            <div><strong>Dasar Pembentukan:</strong> Kemenag No. 28 Th 1967 & Keppres No. 15 Th 2016</div>
            <div><strong>Alamat Gedung Baru:</strong> Jl. Baros, Kel. Utama, Kec. Cimahi Selatan</div>
            <div><strong>Kode Pos / Telp:</strong> 40533 / 022-63191919</div>
          </div>
        </div>

        <h2>Kronologi Sejarah Pembentukan</h2>

        <div className="sejarah-timeline">
          <div className="timeline-step">
            <div className="timeline-dot"></div>
            <div className="timeline-title">1. Masa Sebelum Penjajahan (Tahun 1641)</div>
            <div className="timeline-card">
              <p style={{ margin: 0 }}>
                Pengadilan Agama di Kabupaten Bandung pada zaman sebelum penjajahan belum memiliki struktur organisasi formal modern, namun fungsi sebagai lembaga peradilan penyelesai sengketa antar pemeluk agama Islam telah berjalan dengan <strong>Mesjid sebagai sentra kegiatan</strong> dan para <strong>"Ajengan"</strong> sebagai tokoh kuncinya. Bandung sebagai pemerintahan kabupaten telah ada sejak tahun 1641 di bawah naungan sistem kerajaan Mataram.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-dot"></div>
            <div className="timeline-title">2. Masa Penjajahan Belanda & Jepang (Tahun 1882)</div>
            <div className="timeline-card">
              <p style={{ margin: 0 }}>
                Pada tahun 1882 berdasarkan <em>Staatsblad 1882 Pasal 1</em>, dibentuklah <strong>Raad Agama</strong> dengan kantor berpusat di Mesjid Agung Bandung (Kaum). Tokoh Ketua Pengadilan Agama (<em>Hoofd Penghulu President Raad Agama</em>) yang terkenal pada masa itu adalah <strong>Penghulu H. Hasan Mustopa</strong>.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-dot"></div>
            <div className="timeline-title">3. Era Kemerdekaan & Pembentukan Resmi (15 Maret 1967)</div>
            <div className="timeline-card">
              <p>
                Berdasarkan <strong>Keputusan Menteri Agama RI No. 28 Tahun 1967 tanggal 15 Maret 1967</strong>, dibentuklah Kantor Cabang Pengadilan Agama Bandung di Cimahi. Keputusan ini direalisasikan pada bulan <strong>Desember 1967</strong> dengan pelantikan <strong>KH. Moh. Syarif Ishak</strong> sebagai Ketua Pengadilan Agama Kabupaten Bandung di Cimahi yang pertama.
              </p>
              <p style={{ margin: 0 }}>
                Sebelum memiliki gedung mandiri, kantor sementara menempati ruangan berukuran 5 x 5 m di sebelah Apotik Budi Jalan Raya Tagog yang dipinjamkan oleh PT. Farmaja. Inventaris awal hanya berupa 2 buah mesin tik (besar dan kecil) dengan meja sidang biasa.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-dot"></div>
            <div className="timeline-title">4. Masa Berlakunya UU No. 1 Tahun 1974 & Gedung Jl. Terusan No. 38</div>
            <div className="timeline-card">
              <p style={{ margin: 0 }}>
                Ketika diberlakukan UU No. 1 Tahun 1974 tentang Perkawinan, kantor sempat pindah ke Jalan Cihanjuang (sebelah Hotel Chandra). Pada tahun 1978, di bawah kepemimpinan <strong>Drs. KH. Hidayat Rifa’i</strong>, kantor resmi dipindahkan ke <strong>Jalan Terusan No. 38 Cimahi</strong> di atas tanah seluas 510 m² dengan bangunan seluas 225 m².
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-dot"></div>
            <div className="timeline-title">5. Masa Berlakunya UU No. 7 Tahun 1989 & Peningkatan Kelas IA</div>
            <div className="timeline-card">
              <p style={{ margin: 0 }}>
                Berdasarkan KMA Nomor 73 Tahun 1993 jo. KMA Nomor 589 Tahun 1999, Pengadilan Agama Cimahi ditetapkan naik status menjadi <strong>Pengadilan Agama Kelas IA</strong>. Seiring terbentuknya Kota Cimahi otonom (UU No. 9 Tahun 2001) dan pemekaran Kabupaten Bandung Barat (2007), PA Cimahi sempat mewilayahi tiga daerah sekaligus.
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-dot"></div>
            <div className="timeline-title">6. Era Satu Atap Mahkamah Agung (UU No. 4 Tahun 2004)</div>
            <div className="timeline-card">
              <p style={{ margin: 0 }}>
                Sejak 30 Juni 2004, seluruh pembinaan teknis yustisial, finansial, dan organisasi peradilan agama dialihkan dari Departemen Agama ke <strong>struktur Mahkamah Agung RI</strong> (Penyatuatapan Badan Peradilan). Era ini memicu modernisasi pelayanan peradilan terkomputerisasi yang pesat (SIPP/SISDIPA).
              </p>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-dot"></div>
            <div className="timeline-title">7. Keppres No. 15 Tahun 2016: Menjadi Pengadilan Agama Kota Cimahi</div>
            <div className="timeline-card">
              <p style={{ margin: 0 }}>
                Berdasarkan <strong>Keppres RI No. 15 Tahun 2016</strong>, dibentuk Pengadilan Agama baru yaitu PA Soreang dan PA Ngamprah, sehingga PA Cimahi berubah nomenklatur resmi menjadi <strong>Pengadilan Agama Kota Cimahi Kelas IA</strong> yang khusus melayani wilayah Kota Cimahi dengan kantor megah modern di <strong>Jalan Baros, Kelurahan Utama, Kota Cimahi</strong>.
              </p>
            </div>
          </div>
        </div>

        <h2>Komposisi 13 Pegawai Perdana (Tahun 1967)</h2>
        <p>
          Susunan perintis aparatur Pengadilan Agama Kabupaten Bandung di Cimahi pada saat awal pembentukan tahun 1967:
        </p>

        <div className="pa-table-wrapper">
          <table className="pa-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                <th>Nama Pegawai</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Gol</th>
                <th style={{ width: '120px' }}>Pendidikan</th>
                <th>Jabatan</th>
              </tr>
            </thead>
            <tbody>
              {initialStaff.map((staff) => (
                <tr key={staff.no}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{staff.no}</td>
                  <td><strong>{staff.name}</strong></td>
                  <td style={{ textAlign: 'center' }}>{staff.gol}</td>
                  <td>{staff.edu}</td>
                  <td>{staff.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Riwayat Gedung Kantor Dari Masa ke Masa</h2>
        <div className="pa-table-wrapper">
          <table className="pa-table">
            <thead>
              <tr>
                <th style={{ width: '80px', textAlign: 'center' }}>Periode</th>
                <th>Lokasi Gedung Kantor</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }}>1967</td>
                <td>Jalan Raya Tagog Cimahi (Sebelah Apotik Budi)</td>
                <td>Kantor sementara ukuran 5x5 meter pinjaman PT. Farmaja</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>1968 - 1974</td>
                <td>Jalan Gatot Subroto Cimahi</td>
                <td>Memanfaatkan ruangan Kantor Inspeksi Pendidikan Agama Islam</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>1975 - 1978</td>
                <td>Jalan Cihanjuang Cimahi (Lantai 2 sebelah Hotel Chandra)</td>
                <td>Masa berlakunya UU No. 1 Tahun 1974</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>1978 - 2008</td>
                <td>Jalan Terusan No. 38 Cimahi</td>
                <td>Gedung Balai Sidang Pengadilan Agama Cimahi</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>2008 - 2019</td>
                <td>Komplek Pemkab Soreang & Jl. Raya Soreang-Kopo KM 16</td>
                <td>Pusat perkantoran selama mewilayahi Kab. Bandung & Kota Cimahi</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>2019 - 2024</td>
                <td>Jalan Kolonel Masturi No. 180 Kota Cimahi</td>
                <td>Kantor transisi pasca pemekaran PA Soreang dan PA Ngamprah</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}><strong>2024 - Sekarang</strong></td>
                <td><strong>Jalan Baros, Kel. Utama, Kec. Cimahi Selatan, Kota Cimahi</strong></td>
                <td><strong>Gedung Baru Mandiri dan Modern Pengadilan Agama Kota Cimahi Kelas IA</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default SejarahTanggalPage;
