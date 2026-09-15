import ProfileLayout from './ProfileLayout';
import { FaBalanceScale, FaBook, FaCheckCircle, FaFileAlt, FaGavel, FaHandsHelping } from 'react-icons/fa';

function TugasPokokFungsiPage() {
  const duties = [
    {
      icon: <FaGavel />,
      title: 'Perkawinan',
      desc: 'Pemeriksaan dan penyelesaian perkara izin poligami, pencegahan & pembatalan perkawinan, gugatan cerai talak, cerai gugat, harta bersama, penguasaan anak, isbat nikah, dispensasi kawin, wali adhal, dan kewajiban pasca perceraian.',
    },
    {
      icon: <FaBook />,
      title: 'Kewarisan & Wasiat',
      desc: 'Penyelesaian sengketa penentuan ahli waris, penentuan harta peninggalan, penentuan bagian masing-masing ahli waris, serta pelaksanaan pembagian harta warisan dan wasiat menurut hukum Islam.',
    },
    {
      icon: <FaHandsHelping />,
      title: 'Hibah, Wakaf & Zakat/Shadaqah',
      desc: 'Penyelesaian sengketa terkait keabsahan dan penyerahan hibah, pengelolaan wakaf, serta penyerahan dan penyaluran zakat, infaq, dan shadaqah berdasarkan syariat Islam.',
    },
    {
      icon: <FaBalanceScale />,
      title: 'Ekonomi Syariah',
      desc: 'Penyelesaian sengketa perbankan syariah, lembaga keuangan mikro syariah, asuransi syariah, reasuransi syariah, reksadana syariah, obligasi & surat berharga syariah, sekuritas syariah, dan pembiayaan syariah.',
    },
  ];

  const functions = [
    {
      num: 1,
      title: 'Fungsi Mengadili (Judicial)',
      desc: 'Memeriksa dan mengadili perkara-perkara yang menjadi kewenangan Pengadilan Agama di tingkat pertama sesuai dengan ketentuan peraturan perundang-undangan.',
    },
    {
      num: 2,
      title: 'Fungsi Pembinaan & Pengawasan',
      desc: 'Memberikan pengarahan, bimbingan, dan petunjuk kepada aparatur peradilan serta pengawasan internal terhadap pelaksanaan tugas peradilan agar berjalan tertib, jujur, dan berintegritas.',
    },
    {
      num: 3,
      title: 'Fungsi Pelayanan Teknis Yustisial & Administrasi Kepaniteraan',
      desc: 'Memberikan pelayanan teknis yustisial dan administrasi kepaniteraan bagi perkara tingkat pertama, penyitaan, eksekusi, serta administrasi perkara upaya hukum Banding, Kasasi, dan Peninjauan Kembali (PK).',
    },
    {
      num: 4,
      title: 'Fungsi Administrasi Umum & Kesekretariatan',
      desc: 'Memberikan pelayanan administrasi umum, pengelolaan kepegawaian, teknologi informasi, perencanaan anggaran, dan tata kelola keuangan serta sarana prasarana peradilan.',
    },
    {
      num: 5,
      title: 'Fungsi Pertimbangan Hukum & Konsultasi',
      desc: 'Memberikan keterangan, pertimbangan, dan nasehat tentang Hukum Islam kepada Instansi Pemerintah di daerah hukumnya apabila diminta sesuai dengan Pasal 52 UU No. 7/1989 jo. UU No. 50/2009.',
    },
    {
      num: 6,
      title: 'Fungsi Penyelesaian Harta Peninggalan di Luar Sengketa',
      desc: 'Memberikan pelayanan penyelesaian permohonan pertolongan pembagian harta peninggalan di luar sengketa antara orang-orang yang beragama Islam berdasarkan hukum Islam (Pasal 107 ayat 2 UU Peradilan Agama).',
    },
    {
      num: 7,
      title: 'Fungsi Pelayanan Hukum Khusus',
      desc: 'Meliputi waarmerking akta keahliwarisan di bawah tangan, penyuluhan hukum masyarakat, hisab rukyat hilal, dan pelayanan riset/penelitian akademis.',
    },
  ];

  return (
    <ProfileLayout
      title="Tugas Pokok dan Fungsi Pengadilan Agama"
      subtitle="Kekuasaan, Wewenang, dan Ruang Lingkup Yuridis Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Tugas Pokok & Fungsi"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaBalanceScale style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Landasan Yuridis Formal</h4>
          <p style={{ margin: 0 }}>
            Tugas Pokok dan Fungsi Pengadilan Agama didasarkan pada <strong>Pasal 49 & Pasal 52 Undang-Undang Nomor 50 Tahun 2009</strong> tentang Perubahan Kedua atas <strong>Undang-Undang Nomor 7 Tahun 1989</strong> jo. <strong>Undang-Undang Nomor 3 Tahun 2006</strong> tentang Peradilan Agama.
          </p>
        </div>

        <h2>Tugas Pokok Pengadilan Agama</h2>
        <p>
          Pengadilan Agama Kota Cimahi, yang merupakan Pengadilan Tingkat Pertama, bertugas dan berwenang memeriksa, memutus, dan menyelesaikan perkara-perkara di tingkat pertama antara orang-orang yang beragama Islam di bidang:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
          {duties.map((duty, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
                borderTop: '4px solid var(--primary-700)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--primary-700)', fontSize: '1.25rem' }}>{duty.icon}</span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-900)' }}>{duty.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.5, textAlign: 'left' }}>
                {duty.desc}
              </p>
            </div>
          ))}
        </div>

        <h2>Fungsi Pokok Pengadilan Agama</h2>
        <p>
          Dalam menyelenggarakan peradilan yang mandiri, berkeadilan, dan modern, Pengadilan Agama Kota Cimahi menjalankan fungsi-fungsi sebagai berikut:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
          {functions.map((fn) => (
            <div
              key={fn.num}
              style={{
                background: '#f8fafc',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                background: 'var(--primary-700)',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                {fn.num}
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1rem', color: 'var(--primary-900)' }}>
                  {fn.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-700)', lineHeight: 1.55, textAlign: 'left' }}>
                  {fn.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pa-quote">
          "Menegakkan hukum dan keadilan berdasarkan Ketuhanan Yang Maha Esa dengan menjunjung tinggi asas peradilan yang sederhana, cepat, dan berbiaya ringan."
        </div>
      </article>
    </ProfileLayout>
  );
}

export default TugasPokokFungsiPage;
