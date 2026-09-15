import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { 
  FaBuilding, 
  FaClock, 
  FaUserShield, 
  FaExclamationTriangle, 
  FaUsers, 
  FaWheelchair, 
  FaBaby, 
  FaPray, 
  FaCoffee, 
  FaCheckCircle 
} from 'react-icons/fa';

const fasilitas = [
  { nama: 'Ruang PTSP Nyaman & Ber-AC', deskripsi: 'Dilengkapi nomor antrean elektronik, monitor display informasi, dan mesin kepuasan IKM.', icon: FaBuilding },
  { nama: 'Ruang Tunggu Sidang Terpisah', deskripsi: 'Kapasitas 150 orang dilengkapi charging station, air minum gratis, dan layar CCTV jadwal sidang.', icon: FaBuilding },
  { nama: 'Ruang Mediasi Representatif', deskripsi: '4 Ruang mediasi kedap suara dan berfasilitas meja bundar untuk menunjang perdamaian perkara.', icon: FaBuilding },
  { nama: 'Ruang Laktasi (Ibu Menyusui)', deskripsi: 'Fasilitas privasi bagi ibu menyusui dilengkapi lemari pendingin ASI, sofa, dan wastafel.', icon: FaBaby },
  { nama: 'Ruang Bermain Anak Ramah Lingkungan', deskripsi: 'Area permainan edukatif, buku dongeng, dan mainan aman bagi anak para pihak berperkara.', icon: FaBaby },
  { nama: 'Musholla As-Salam PA Cimahi', deskripsi: 'Musholla bersih untuk ibadah sholat berjamaah dengan sarana wudhu terpisah pria dan wanita.', icon: FaPray },
  { nama: 'Fasilitas Ramah Disabilitas', deskripsi: 'Ramp kursi roda, jalur guiding block, toilet difabel, dan kursi roda cadangan.', icon: FaWheelchair },
  { nama: 'Kantin Koperasi & Area Parkir Luas', deskripsi: 'Penyediaan konsumsi higienis dan parkir gratis tertata dengan petugas keamanan 24 jam.', icon: FaCoffee },
];

const pejabatPengawas = [
  { nama: 'Drs. H. Dudung, S.H., M.H.', jabatan: 'Ketua / Penanggung Jawab Umum Pengawasan' },
  { nama: 'Dra. Hj. Siti Aminah, M.H.ES.', jabatan: 'Wakil Ketua / Koordinator Hakim Pengawas Bidang (Hawasbid)' },
  { nama: 'Drs. Subhan, M.H.', jabatan: 'Panitera / Pengawas Administrasi Kepaniteraan' },
  { nama: 'Rudi Hermawan, S.E., M.M.', jabatan: 'Sekretaris / Pengawas Administrasi Kesekretariatan' },
];

function FasilitasPublikPage() {
  const [tab, setTab] = useState('fasilitas');

  return (
    <LayananPublikLayout
      title="Fasilitas Publik & Keselamatan Kantor"
      subtitle="Sarana Prasarana Pelayanan Pengadilan, Jam Kerja Layanan, Petugas PTSP, dan Prosedur Tanggap Darurat & Evakuasi (K3)"
      breadcrumb="Fasilitas Publik & K3"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button onClick={() => setTab('fasilitas')} style={{ padding: '10px 18px', border: 'none', background: tab === 'fasilitas' ? '#1b5e20' : 'transparent', color: tab === 'fasilitas' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            Fasilitas Publik
          </button>
          <button onClick={() => setTab('jamKerja')} style={{ padding: '10px 18px', border: 'none', background: tab === 'jamKerja' ? '#1b5e20' : 'transparent', color: tab === 'jamKerja' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            Jam Kerja & Petugas PTSP
          </button>
          <button onClick={() => setTab('k3')} style={{ padding: '10px 18px', border: 'none', background: tab === 'k3' ? '#1b5e20' : 'transparent', color: tab === 'k3' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            Evakuasi & Tanggap Darurat (K3)
          </button>
          <button onClick={() => setTab('pengawas')} style={{ padding: '10px 18px', border: 'none', background: tab === 'pengawas' ? '#1b5e20' : 'transparent', color: tab === 'pengawas' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            Pejabat Pengawas
          </button>
        </div>

        {tab === 'fasilitas' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {fasilitas.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: '0.98rem', color: '#1e293b', margin: 0, fontWeight: 700 }}>{f.nama}</h3>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>{f.deskripsi}</p>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'jamKerja' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', background: '#fff' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#1b5e20', fontSize: '1.05rem', fontWeight: 700 }}>Jam Kerja Kantor</h4>
                <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                  <strong>Senin s.d. Kamis:</strong> 08.00 - 16.30 WIB
                  <br />
                  <strong>Istirahat:</strong> 12.00 - 13.00 WIB
                  <br /><br />
                  <strong>Jumat:</strong> 07.30 - 16.30 WIB
                  <br />
                  <strong>Istirahat:</strong> 11.30 - 13.00 WIB
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', background: '#fff' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#1b5e20', fontSize: '1.05rem', fontWeight: 700 }}>Jam Pelayanan PTSP</h4>
                <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                  <strong>Senin s.d. Kamis:</strong> 08.00 - 16.30 WIB
                  <br />
                  <strong>Pengambilan Nomor Antrean:</strong> s.d. 15.30 WIB
                  <br /><br />
                  <strong>Jumat:</strong> 07.30 - 16.30 WIB
                  <br />
                  <strong>Pengambilan Nomor Antrean:</strong> s.d. 15.30 WIB
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'k3' && (
          <div>
            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '12px' }}>
              <FaExclamationTriangle size={24} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: '#92400e', fontSize: '0.98rem' }}>Prosedur Keadaan Darurat (Gempa Bumi & Kebakaran)</h4>
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#78350f', lineHeight: 1.5 }}>
                  Ikuti rambu jalur evakuasi hijau menuju Titik Kumpul Aman (Assembly Point) di Halaman Parkir Depan PA Kota Cimahi. Jangan gunakan lift / jangan panik.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {[
                { no: '1', title: 'Bunyi Sirine / Alarm Darurat', desc: 'Saat alarm peringatan berbunyi, segera hentikan aktivitas dan lindungi kepala di bawah meja kokoh.' },
                { no: '2', title: 'Ikuti Jalur Evakuasi Hijau', desc: 'Berjalan cepat dan tertib mengikuti petunjuk arah panah evakuasi di koridor kantor.' },
                { no: '3', title: 'Kaum Rentan Didampingi Petugas', desc: 'Tim Tanggap Darurat K3 segera mendampingi lansia, ibu hamil, dan pengguna kursi roda.' },
                { no: '4', title: 'Berkumpul di Assembly Point', desc: 'Petugas melakukan pendataan absensi seluruh pengunjung dan pegawai di titik kumpul aman.' },
              ].map((k, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#d97706', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '8px' }}>
                    {k.no}
                  </div>
                  <h4 style={{ fontSize: '0.92rem', color: '#1e293b', margin: '0 0 4px 0', fontWeight: 700 }}>{k.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'pengawas' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="pa-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#1b5e20', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px' }}>Nama Pejabat</th>
                  <th style={{ padding: '12px 14px' }}>Kedudukan / Tugas Pengawasan</th>
                </tr>
              </thead>
              <tbody>
                {pejabatPengawas.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1e293b' }}>{p.nama}</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>{p.jabatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </LayananPublikLayout>
  );
}

export default FasilitasPublikPage;
