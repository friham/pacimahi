
import LayananPublikLayout from './LayananPublikLayout';
import { FaWheelchair, FaCheckCircle, FaFilePdf, FaUniversalAccess } from 'react-icons/fa';

const prioritasSteps = [
  { no: '1', title: 'Penyambutan & Skrining Kaum Rentan', desc: 'Petugas Satpam/Duta Pelayanan menyambut di pintu masuk, menyediakan kursi roda/tongkat kruk, dan memberikan kalung tanda khusus prioritas.' },
  { no: '2', title: 'Pengambilan Antrean Jalur Khusus', desc: 'Pemohon prioritas mendapatkan nomor antrean khusus (Jalur C) tanpa perlu menunggu antrean reguler.' },
  { no: '3', title: 'Pelayanan pada Loket Khusus Rendah', desc: 'Petugas PTSP melayani di loket khusus disabilitas yang dilengkapi microphone, alat bantu dengar, dan formulir braille jika dibutuhkan.' },
  { no: '4', title: 'Pendampingan Menuju Ruang Sidang / Tunggu', desc: 'Petugas mendampingi menuju Ruang Tunggu Prioritas, Ruang Laktasi, atau Ruang Sidang yang dilengkapi guiding block.' },
];

function AlurPrioritasPTSPPage() {
  return (
    <LayananPublikLayout
      title="Alur Pelayanan Prioritas PTSP & Kaum Rentan"
      subtitle="Standar Operasional Pelayanan Ramah Kaum Rentan (Penyandang Disabilitas, Lanjut Usia, Ibu Hamil, dan Ibu Menyusui) PA Kota Cimahi"
      breadcrumb="Alur Pelayanan Prioritas"
    >
      <div className="pa-content-card">
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20, #0d9488)',
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
              <FaUniversalAccess size={20} color="#fde047" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#fde047' }}>
                Pelayanan Inklusif Ramah Disabilitas
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>BEBAS ANTREAN PANJANG BAGI KAUM RENTAN</h2>
            <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.9 }}>
              Komitmen Pengadilan Agama Kota Cimahi memberikan kemudahan, kenyamanan, dan aksesibilitas penuh bagi penyandang disabilitas dan kelompok rentan.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px 20px', borderRadius: '10px', textAlign: 'center' }}>
            <FaWheelchair size={36} color="#fde047" />
            <div style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '4px' }}>PRIORITAS UTAMA</div>
          </div>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#1b5e20', margin: '0 0 16px 0' }}>Tahapan Alur Pelayanan Prioritas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {prioritasSteps.map((step, idx) => (
            <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1b5e20', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '12px' }}>
                {step.no}
              </div>
              <h3 style={{ fontSize: '0.98rem', color: '#1e293b', margin: '0 0 6px 0', fontWeight: 700 }}>{step.title}</h3>
              <p style={{ fontSize: '0.83rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#1b5e20', margin: '0 0 12px 0', fontWeight: 700 }}>Fasilitas Khusus yang Disediakan:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
            {[
              'Guiding Block (Jalur Pemandu Tunanetra)',
              'Jalur Kursi Roda (Ramp Landai)',
              'Kursi Roda & Tongkat Kruk Cadangan',
              'Loket PTSP Khusus Rendah',
              'Toilet Khusus Penyandang Disabilitas',
              'Ruang Laktasi / Menyusui Ibu & Anak',
              'Ruang Bermain Anak Ramah Lingkungan',
              'Alat Bantu Dengar di Ruang Sidang',
            ].map((f, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                <FaCheckCircle color="#059669" size={14} style={{ flexShrink: 0 }} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => alert('Mengunduh SOP Layanan Prioritas & Disabilitas PA Cimahi (PDF)')}
          style={{
            background: '#1b5e20',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FaFilePdf size={12} /> Unduh SOP Layanan Kaum Rentan (PDF)
        </button>
      </div>
    </LayananPublikLayout>
  );
}

export default AlurPrioritasPTSPPage;
