import ProfileLayout from './ProfileLayout';
import { FaGavel, FaAward } from 'react-icons/fa';

function PengantarKetuaPage() {
  return (
    <ProfileLayout
      title="Pengantar Ketua Pengadilan"
      subtitle="Sekapur Sirih dan Sambutan Resmi Ketua Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Pengantar Ketua"
    >
      <article className="pa-article">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ 
            background: 'var(--primary-100)', 
            color: 'var(--primary-900)', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '0.85rem', 
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            SAMBUTAN RESMI
          </span>
          <h2 style={{ marginTop: '0.8rem', borderBottom: 'none', paddingBottom: 0 }}>
            Sekapur Sirih dari Ketua Pengadilan Agama Kota Cimahi
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '0.9rem' }}>
            Mewujudkan Era Baru Peradilan Modern Berbasis Teknologi Informasi
          </p>
        </div>

        <div className="pa-callout">
          <h4><FaGavel style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Landasan Konstitusional Yudikatif</h4>
          <p style={{ margin: 0 }}>
            <em>"Kekuasaan kehakiman dilakukan oleh sebuah Mahkamah Agung dan badan peradilan yang berada di bawahnya dalam Lingkungan Peradilan Umum, Lingkungan Peradilan Agama, Lingkungan Peradilan Militer, Lingkungan Peradilan Tata Usaha Negara, dan oleh sebuah Mahkamah Konstitusi."</em>
            <br />
            <strong>— Pasal 24 ayat (2) UUD Negara Republik Indonesia Tahun 1945</strong>
          </p>
        </div>

        <p>
          Mahkamah Agung Republik Indonesia merupakan satu-satunya badan yudikatif yang menjamin tegaknya keadilan dengan instrumen para aparatur negara sebagai stakeholder peradilan. Peradilan Agama adalah salah satu pelaku kekuasaan kehakiman bagi rakyat pencari keadilan yang beragama Islam mengenai perkara tertentu sebagaimana dimaksud dalam <strong>Undang-Undang Nomor 50 Tahun 2009</strong> tentang Perubahan Kedua atas Undang-Undang Nomor 7 Tahun 1989 tentang Peradilan Agama.
        </p>

        <p>
          Kekuasaan Kehakiman di lingkungan Peradilan Agama dilaksanakan oleh Pengadilan Agama dan Pengadilan Tinggi Agama yang berpuncak pada Mahkamah Agung Republik Indonesia sebagai Pengadilan Negara Tertinggi.
        </p>

        <p>
          Pengadilan Agama, yang merupakan Pengadilan Tingkat Pertama, bertugas dan berwenang memeriksa, memutus, dan menyelesaikan perkara-perkara di tingkat pertama antara orang-orang yang beragama Islam di bidang <strong>perkawinan, kewarisan, wasiat, hibah, wakaf, zakat, infaq, shadaqah, dan ekonomi syariah</strong>, sebagaimana diatur dalam Pasal 49 Undang-Undang Nomor 3 Tahun 2006 jo. Undang-Undang Nomor 50 Tahun 2009 tentang Peradilan Agama.
        </p>

        <h2>Fungsi Utama Pengadilan Agama</h2>
        <p>Untuk melaksanakan tugas pokok tersebut, Pengadilan Agama mempunyai fungsi strategis:</p>

        <ol>
          <li><strong>Pelayanan Teknis Yustisial & Kepaniteraan:</strong> Memberikan pelayanan teknis yustisial dan administrasi kepaniteraan bagi perkara tingkat pertama serta penyitaan dan eksekusi.</li>
          <li><strong>Administrasi Upaya Hukum:</strong> Memberikan pelayanan di bidang administrasi perkara banding, kasasi, dan peninjauan kembali serta administrasi peradilan lainnya.</li>
          <li><strong>Administrasi Umum:</strong> Memberikan pelayanan administrasi umum kepada semua unsur di lingkungan Pengadilan Agama (umum, kepegawaian, dan keuangan kecuali biaya perkara).</li>
          <li><strong>Pertimbangan Hukum Islam:</strong> Memberikan keterangan, pertimbangan, dan nasehat tentang Hukum Islam pada Instansi Pemerintah di daerah hukumnya apabila diminta (Pasal 52 UU Peradilan Agama).</li>
          <li><strong>Penyelesaian Pembagian Harta Peninggalan:</strong> Memberikan pelayanan penyelesaian permohonan pertolongan pembagian harta peninggalan di luar sengketa antara orang-orang yang beragama Islam berdasarkan hukum Islam.</li>
          <li><strong>Tugas Pelayanan Lainnya:</strong> Melaksanakan pertimbangan hukum agama, hisab rukyat, riset/penelitian ilmiah, pengawasan advokat/penasehat hukum, dan penyuluhan hukum.</li>
          <li><strong>Istbat Rukyat Hilal:</strong> Memberikan kesaksian rukyat hilal dalam penentuan awal bulan pada kalender Hijriyah.</li>
        </ol>

        <h2>Perkembangan Satuan Kerja & Wilayah Hukum</h2>
        <p>
          Pasca terbitnya <strong>Keputusan Presiden Republik Indonesia Nomor 15 Tahun 2016</strong> yang diresmikan oleh Ketua Mahkamah Agung RI pada tanggal 22 Oktober 2018, Pengadilan Agama Cimahi dimekarkan menjadi 3 satuan kerja mandiri, yakni:
        </p>
        <ul>
          <li><strong>Pengadilan Agama Kota Cimahi Kelas IA</strong> (Mewilayahi Kota Cimahi: 3 Kecamatan & 15 Kelurahan)</li>
          <li><strong>Pengadilan Agama Soreang Kelas II</strong> (Mewilayahi Kabupaten Bandung)</li>
          <li><strong>Pengadilan Agama Ngamprah Kelas II</strong> (Mewilayahi Kabupaten Bandung Barat)</li>
        </ul>

        <h2>Komitmen Reformasi Birokrasi Menuju 2025–2029</h2>
        <p>
          Reformasi Birokrasi di lingkungan Pengadilan Agama Kota Cimahi diarahkan pada pembaruan menyeluruh terhadap aspek kelembagaan (organisasi), ketatalaksanaan (<em>business process</em>), dan sumber daya manusia (aparatur). Melalui manajemen perubahan, aparatur diarahkan untuk memiliki <em>mindset</em> dan <em>cultural set</em> yang profesional, berintegritas tinggi, dan akuntabel.
        </p>

        <p>
          <strong>Rencana Strategis (Renstra) Pengadilan Agama Kota Cimahi Tahun 2025–2029</strong> merupakan komitmen bersama dalam menyelaraskan arah kebijakan dengan Cetak Biru Mahkamah Agung 2010–2035 demi mewujudkan peradilan yang sederhana, cepat, dan berbiaya ringan melalui pemanfaatan teknologi informasi terintegrasi.
        </p>

        <div className="pa-callout pa-callout--gold">
          <h4><FaAward style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Motto Pelayanan PA Kota Cimahi: "CINTA"</h4>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#451a03', lineHeight: 1.6 }}>
            Sebagai komitmen pelayanan prima kepada seluruh masyarakat pencari keadilan di Kota Cimahi, seluruh aparatur berpegang teguh pada nilai-nilai moto <strong>CINTA</strong>:
          </p>
          <div className="motto-grid" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <div className="motto-card">
              <div className="motto-letter">C</div>
              <div className="motto-card-text">
                <div className="motto-title">Cermat</div>
                <div className="motto-desc">Teliti dan tepat dalam setiap proses yustisial & administrasi</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">I</div>
              <div className="motto-card-text">
                <div className="motto-title">Ikhlas</div>
                <div className="motto-desc">Tulus mengabdi melayani masyarakat tanpa pamrih</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">N</div>
              <div className="motto-card-text">
                <div className="motto-title">Nyaman</div>
                <div className="motto-desc">Fasilitas ramah, inklusif, tertib, dan bersahabat</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">T</div>
              <div className="motto-card-text">
                <div className="motto-title">Transparan</div>
                <div className="motto-desc">Keterbukaan informasi publik dan akuntabilitas biaya</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">A</div>
              <div className="motto-card-text">
                <div className="motto-title">Akuntabel</div>
                <div className="motto-desc">Dapat dipertanggungjawabkan sesuai standar hukum</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pa-quote">
          "Era Baru Peradilan Modern Berbasis Teknologi Informasi menjadi tonggak kami dalam menghadirkan pelayanan peradilan yang prima, inklusif, cepat, transparan, dan bebas dari segala bentuk gratifikasi maupun korupsi."
        </div>
      </article>
    </ProfileLayout>
  );
}

export default PengantarKetuaPage;
