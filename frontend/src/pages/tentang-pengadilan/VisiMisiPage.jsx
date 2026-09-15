import ProfileLayout from './ProfileLayout';
import { FaEye, FaBullhorn, FaStar } from 'react-icons/fa';

function VisiMisiPage() {
  const missions = [
    {
      num: 1,
      title: 'Menjaga Kemandirian Pengadilan Agama Kota Cimahi',
      desc: 'Memastikan independensi lembaga peradilan dalam menegakkan hukum dan keadilan tanpa intervensi dari pihak manapun.',
    },
    {
      num: 2,
      title: 'Memberikan Pelayanan Hukum Yang Berkeadilan Kepada Pencari Keadilan',
      desc: 'Menghadirkan putusan yang berkualitas, proses persidangan yang adil, serta pelayanan yang memprioritaskan kepuasan masyarakat.',
    },
    {
      num: 3,
      title: 'Meningkatkan Kualitas Kepemimpinan Pengadilan Agama Kota Cimahi',
      desc: 'Mewujudkan tata kelola pimpinan yang visioner, adaptif, profesional, dan berintegritas tinggi di seluruh lini manajemen.',
    },
    {
      num: 4,
      title: 'Meningkatkan Kredibilitas dan Transparansi Pengadilan Agama Kota Cimahi',
      desc: 'Membuka akses informasi publik secara komprehensif, akuntabel, dan bebas dari korupsi, kolusi, serta nepotisme (KKN).',
    },
  ];

  return (
    <ProfileLayout
      title="Visi dan Misi Pengadilan"
      subtitle="Komitmen Visi, Misi, dan Tata Nilai Luhur Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Visi & Misi"
    >
      <article className="pa-article">
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-800) 100%)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.2)',
            border: '1px solid var(--gold-400)',
            color: 'var(--gold-400)',
            padding: '4px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <FaEye /> VISI PENGADILAN
          </div>
          <h2 style={{
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 800,
            borderBottom: 'none',
            margin: '0.5rem 0',
            fontFamily: 'var(--font-primary)'
          }}>
            " Terwujudnya Pengadilan Agama Kota Cimahi Yang Agung "
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '650px',
            margin: '0.5rem auto 0',
            fontSize: '0.95rem'
          }}>
            Selaras dengan Visi Mahkamah Agung Republik Indonesia dalam mewujudkan badan peradilan yang berwibawa, modern, terpercaya, dan bermartabat.
          </p>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--primary-100)',
              color: 'var(--primary-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaBullhorn size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, paddingBottom: 0, borderBottom: 'none' }}>MISI PENGADILAN</h2>
              <span style={{ fontSize: '0.88rem', color: 'var(--gray-500)' }}>4 Pilar Utama Implementasi Kinerja Pengadilan</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {missions.map((m) => (
              <div
                key={m.num}
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  gap: '1rem',
                  transition: 'all 0.2s ease',
                  borderLeft: '4px solid var(--primary-600)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary-700)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                  flexShrink: 0
                }}>
                  {m.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', margin: '0 0 0.4rem 0', color: 'var(--gray-900)' }}>
                    {m.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--gray-600)', textAlign: 'left', lineHeight: 1.5 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#fef3c7',
              color: 'var(--gold-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaStar size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, paddingBottom: 0, borderBottom: 'none' }}>MOTTO PELAYANAN</h2>
              <span style={{ fontSize: '0.88rem', color: 'var(--gray-500)' }}>Nilai Budaya Kerja Aparatur Pengadilan Agama Kota Cimahi</span>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
            border: '2px solid var(--gold-400)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-950)', margin: '0 0 0.5rem 0', letterSpacing: '0.1em' }}>
              " CINTA "
            </h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-900)', margin: 0, textAlign: 'center' }}>
              Cermat — Ikhlas — Nyaman — Transparan — Akuntabel
            </p>
          </div>

          <div className="motto-grid">
            <div className="motto-card">
              <div className="motto-letter">C</div>
              <div className="motto-card-text">
                <div className="motto-title">Cermat</div>
                <div className="motto-desc">Cepat, tepat, teliti, dan sesuai dengan prosedur hukum yang berlaku.</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">I</div>
              <div className="motto-card-text">
                <div className="motto-title">Ikhlas</div>
                <div className="motto-desc">Melayani masyarakat dengan kerendahan hati dan integritas nurani.</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">N</div>
              <div className="motto-card-text">
                <div className="motto-title">Nyaman</div>
                <div className="motto-desc">Menciptakan lingkungan pelayanan yang ramah, bersih, dan inklusif.</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">T</div>
              <div className="motto-card-text">
                <div className="motto-title">Transparan</div>
                <div className="motto-desc">Keterbukaan informasi biaya, tahapan, serta putusan yang mudah diakses.</div>
              </div>
            </div>
            <div className="motto-card">
              <div className="motto-letter">A</div>
              <div className="motto-card-text">
                <div className="motto-title">Akuntabel</div>
                <div className="motto-desc">Setiap proses dan keputusan dapat dipertanggungjawabkan secara hukum dan publik.</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default VisiMisiPage;
