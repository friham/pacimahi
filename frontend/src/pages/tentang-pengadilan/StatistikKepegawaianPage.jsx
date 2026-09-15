import ProfileLayout from './ProfileLayout';
import { FaChartBar, FaUsers, FaUserGraduate, FaIdCard } from 'react-icons/fa';

function StatistikKepegawaianPage() {
  const staffStats = [
    { no: 1, position: 'Ketua Pengadilan', count: 1 },
    { no: 2, position: 'Wakil Ketua Pengadilan', count: 1 },
    { no: 3, position: 'Hakim / Majelis Hakim', count: 6 },
    { no: 4, position: 'Panitera', count: 1 },
    { no: 5, position: 'Sekretaris', count: 1 },
    { no: 6, position: 'Panitera Muda Gugatan', count: 1 },
    { no: 7, position: 'Panitera Muda Hukum', count: 1 },
    { no: 8, position: 'Panitera Muda Permohonan', count: 1 },
    { no: 9, position: 'Kepala Sub Bagian Kepegawaian, Organisasi & Tata Laksana', count: 1 },
    { no: 10, position: 'Kepala Sub Bagian Perencanaan, TI & Pelaporan (PTIP)', count: 1 },
    { no: 11, position: 'Panitera Pengganti', count: 5 },
    { no: 12, position: 'Juru Sita', count: 2 },
    { no: 13, position: 'Juru Sita Pengganti', count: 2 },
    { no: 14, position: 'Pejabat Fungsional', count: 4 },
    { no: 15, position: 'Pelaksana / Staf', count: 8 },
    { no: 16, position: 'Pegawai Pemerintah dengan Perjanjian Kerja (PPPK)', count: 17 },
  ];

  const totalStaff = staffStats.reduce((sum, item) => sum + item.count, 0);

  return (
    <ProfileLayout
      title="Statistik Kepegawaian"
      subtitle="Komposisi SDM, Formasi Jabatan, dan Kendali Pegawai Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Statistik Kepegawaian"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaChartBar style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Transparansi Komposisi SDM Aparatur</h4>
          <p style={{ margin: 0 }}>
            Pengadilan Agama Kota Cimahi didukung oleh <strong>{totalStaff} orang aparatur</strong> yang terdiri dari Hakim, Pejabat Struktural/Fungsional Kepaniteraan & Kesekretariatan, Pelaksana, serta PPPK yang berdedikasi memberikan pelayanan prima.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-800), var(--primary-900))',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <FaUsers size={24} style={{ color: 'var(--gold-400)', marginBottom: '0.4rem' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalStaff}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Total Aparatur</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <FaUserGraduate size={24} style={{ color: '#93c5fd', marginBottom: '0.4rem' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>8</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Hakim (Termasuk Pimpinan)</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0f766e, #115e59)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <FaIdCard size={24} style={{ color: '#99f6e4', marginBottom: '0.4rem' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>28</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>PNS / Fungsional</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #b45309, #78350f)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <FaUsers size={24} style={{ color: '#fde68a', marginBottom: '0.4rem' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>17</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>PPPK</div>
          </div>
        </div>

        <h2>Tabel Jumlah Aparatur Berdasarkan Formasi Jabatan</h2>
        <div className="pa-table-wrapper">
          <table className="pa-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                <th>Jabatan / Formasi</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Jumlah Pegawai</th>
              </tr>
            </thead>
            <tbody>
              {staffStats.map((item) => (
                <tr key={item.no}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.no}</td>
                  <td><strong>{item.position}</strong></td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary-800)' }}>
                    {item.count}
                  </td>
                </tr>
              ))}
              <tr style={{ background: 'var(--primary-100)', fontWeight: 800 }}>
                <td colSpan={2} style={{ textAlign: 'right', paddingRight: '1.5rem', color: 'var(--primary-950)' }}>
                  JUMLAH TOTAL PEGAWAI:
                </td>
                <td style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--primary-950)' }}>
                  {totalStaff}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Statistik Terintegrasi SIMTEPA Mahkamah Agung</h2>
        <div className="embed-container" style={{ paddingBottom: '90%' }}>
          <iframe
            src="https://simtepa.mahkamahagung.go.id/share/statistik_ttntt/ab9a3d23d34bdb24be70b64fdb1cfed8"
            title="Statistik Kepegawaian SIMTEPA"
            loading="lazy"
          ></iframe>
        </div>

        <h2>Kendali Pegawai Pengadilan Agama Kota Cimahi</h2>
        <div className="embed-container" style={{ paddingBottom: '90%' }}>
          <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8X70uMTpPD4NDrP7KBd_3M9hYSNzjpzX_3c2MQ0Xl4ivrjufWh7KswSyHUc_aeA/pubhtml?widget=true&headers=false"
            title="Kendali Pegawai Spreadsheet"
            loading="lazy"
          ></iframe>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default StatistikKepegawaianPage;
