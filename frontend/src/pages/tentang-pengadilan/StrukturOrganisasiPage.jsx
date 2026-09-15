import ProfileLayout from './ProfileLayout';
import { FaSitemap, FaUsers, FaUserTie, FaGavel, FaFileSignature } from 'react-icons/fa';

function StrukturOrganisasiPage() {
  const structureNodes = [
    {
      level: 'Pimpinan Pengadilan',
      roles: [
        { title: 'Ketua Pengadilan Agama', note: 'Pimpinan Tertinggi Satuan Kerja' },
        { title: 'Wakil Ketua Pengadilan Agama', note: 'Koordinator Pengawasan & Manajemen Kinerja' },
      ],
    },
    {
      level: 'Pelaksana Teknis Peradilan (Hakim)',
      roles: [
        { title: 'Hakim / Majelis Hakim', note: 'Pejabat Fungsional Penegak Hukum & Keadilan' },
      ],
    },
    {
      level: 'Lini Kepaniteraan (Yustisial)',
      roles: [
        { title: 'Panitera', note: 'Kepala Pelaksana Administrasi Perkara' },
        { title: 'Panitera Muda Permohonan', note: 'Administrasi Perkara Permohonan (Voluntair)' },
        { title: 'Panitera Muda Gugatan', note: 'Administrasi Perkara Gugatan (Contentiosa)' },
        { title: 'Panitera Muda Hukum', note: 'Pengelolaan Informasi, Laporan & Statistik Hukum' },
        { title: 'Panitera Pengganti & Juru Sita / Juru Sita Pengganti', note: 'Pelaksana Sidang & Pemanggilan Pihak' },
      ],
    },
    {
      level: 'Lini Kesekretariatan (Non-Yustisial)',
      roles: [
        { title: 'Sekretaris', note: 'Kepala Pelaksana Administrasi Umum & Sarpras' },
        { title: 'Sub Bagian Umum & Keuangan', note: 'Pengelolaan BMN, Keuangan DIPA & Rumah Tangga' },
        { title: 'Sub Bagian Kepegawaian, Organisasi & Tata Laksana', note: 'SDM, Disiplin & Penataan Kelembagaan' },
        { title: 'Sub Bagian Perencanaan, TI & Pelaporan (PTIP)', note: 'Program Kerja, Anggaran, Website & TI' },
      ],
    },
  ];

  return (
    <ProfileLayout
      title="Struktur Organisasi"
      subtitle="Bagan Tata Kelola dan Struktur Kelembagaan Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Struktur Organisasi"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaSitemap style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Struktur Organisasi Berdasarkan Perma No. 7 Tahun 2015</h4>
          <p style={{ margin: 0 }}>
            Struktur organisasi Pengadilan Agama Kota Cimahi Kelas IA disusun berdasarkan <strong>Peraturan Mahkamah Agung RI Nomor 7 Tahun 2015</strong> tentang Organisasi dan Tata Kerja Kepaniteraan dan Kesekretariatan Peradilan.
          </p>
        </div>

        <h2>Bagan Struktur Organisasi 2026</h2>
        <p>
          Bagan kelembagaan yang mengintegrasikan fungsi pimpinan, hakim, kepaniteraan, dan kesekretariatan:
        </p>

        <div style={{
          margin: '1.5rem 0',
          background: 'white',
          border: '1px solid var(--gray-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center'
        }}>
          <img
            src="/images/struktur-organisasi.jpg"
            alt="Struktur Organisasi Pengadilan Agama Kota Cimahi"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 'var(--radius-md)',
              display: 'block',
              margin: '0 auto',
              cursor: 'zoom-in'
            }}
            onClick={(e) => window.open(e.target.src, '_blank')}
            title="Klik untuk memperbesar"
          />
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--gray-500)', fontStyle: 'italic' }}>
            Struktur Organisasi Pengadilan Agama Kota Cimahi Kelas IA — Klik gambar untuk memperbesar
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '2rem 0' }}>
          {structureNodes.map((section, sIdx) => (
            <div
              key={sIdx}
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{
                background: sIdx === 0 
                  ? 'linear-gradient(135deg, var(--gold-600), var(--gold-700))'
                  : sIdx === 1 
                  ? 'linear-gradient(135deg, var(--primary-800), var(--primary-900))'
                  : 'linear-gradient(135deg, #334155, #1e293b)',
                color: 'white',
                padding: '0.85rem 1.25rem',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {sIdx === 0 ? <FaUserTie /> : sIdx === 1 ? <FaGavel /> : <FaUsers />}
                <span>{section.level}</span>
              </div>
              <div style={{
                padding: '1.25rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}>
                {section.roles.map((role, rIdx) => (
                  <div
                    key={rIdx}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      borderLeft: '4px solid var(--primary-600)'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--primary-950)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {role.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--gray-600)' }}>
                      {role.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>Deskripsi Pembagian Tugas Pokok Organisasi</h2>
        <div className="pa-table-wrapper">
          <table className="pa-table">
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Jabatan / Unit Kerja</th>
                <th>Uraian Tugas & Tanggung Jawab</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Ketua Pengadilan</strong></td>
                <td>Memimpin pelaksanaan tugas pokok pengadilan, mengawasi jalannya peradilan, serta mengkoordinasikan seluruh aparatur yustisial dan non-yustisial.</td>
              </tr>
              <tr>
                <td><strong>Wakil Ketua</strong></td>
                <td>Membantu Ketua dalam mengendalikan manajemen peradilan, bertindak sebagai koordinator Hakim Pengawas Bidang (Hawasbid), dan menangani pengawasan internal.</td>
              </tr>
              <tr>
                <td><strong>Hakim</strong></td>
                <td>Melaksanakan kekuasaan kehakiman secara merdeka untuk memeriksa, mengadili, dan memutus perkara yang diajukan ke Pengadilan Agama.</td>
              </tr>
              <tr>
                <td><strong>Panitera</strong></td>
                <td>Memimpin pelaksanaan administrasi perkara, persidangan, pembuatan akta peradilan, penyitaan, eksekusi, dan pengelolaan panjar biaya perkara.</td>
              </tr>
              <tr>
                <td><strong>Sekretaris</strong></td>
                <td>Memimpin pelaksanaan administrasi kesekretariatan meliputi perencanaan anggaran, pengelolaan aset BMN, kepegawaian, dan teknologi informasi.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default StrukturOrganisasiPage;
