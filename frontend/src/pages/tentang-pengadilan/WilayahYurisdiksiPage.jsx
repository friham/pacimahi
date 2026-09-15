import ProfileLayout from './ProfileLayout';
import { FaMapMarkedAlt, FaCity, FaBuilding, FaMapPin } from 'react-icons/fa';

function WilayahYurisdiksiPage() {
  const districts = [
    {
      name: 'Kecamatan Cimahi Selatan',
      code: '32.77.01',
      kelurahanCount: 5,
      kelurahans: [
        { name: 'Kelurahan Cibeber', postal: '40531' },
        { name: 'Kelurahan Leuwigajah', postal: '40532' },
        { name: 'Kelurahan Utama', postal: '40533 (Lokasi Kantor Pengadilan)' },
        { name: 'Kelurahan Melong', postal: '40534' },
        { name: 'Kelurahan Cibeureum', postal: '40535' },
      ],
    },
    {
      name: 'Kecamatan Cimahi Tengah',
      code: '32.77.02',
      kelurahanCount: 6,
      kelurahans: [
        { name: 'Kelurahan Baros', postal: '40521' },
        { name: 'Kelurahan Cigugur Tengah', postal: '40522' },
        { name: 'Kelurahan Karangmekar', postal: '40523' },
        { name: 'Kelurahan Setiamanah', postal: '40524' },
        { name: 'Kelurahan Cimahi', postal: '40525' },
        { name: 'Kelurahan Padasuka', postal: '40526' },
      ],
    },
    {
      name: 'Kecamatan Cimahi Utara',
      code: '32.77.03',
      kelurahanCount: 4,
      kelurahans: [
        { name: 'Kelurahan Cipageran', postal: '40511' },
        { name: 'Kelurahan Citeureup', postal: '40512' },
        { name: 'Kelurahan Cibabat', postal: '40513' },
        { name: 'Kelurahan Pasirkaliki', postal: '40514' },
      ],
    },
  ];

  return (
    <ProfileLayout
      title="Wilayah Yurisdiksi"
      subtitle="Daerah Hukum dan Batas Wilayah Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="Wilayah Yurisdiksi"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaMapMarkedAlt style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Daerah Hukum PA Kota Cimahi</h4>
          <p style={{ margin: 0 }}>
            Berdasarkan <strong>Keputusan Presiden Republik Indonesia Nomor 15 Tahun 2016</strong>, daerah hukum Pengadilan Agama Kota Cimahi meliputi seluruh wilayah administratif <strong>Kota Cimahi</strong> yang terdiri dari <strong>3 Kecamatan</strong> dan <strong>15 Kelurahan</strong>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-800), var(--primary-900))',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <FaCity size={28} style={{ color: 'var(--gold-400)', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>1</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Kota Administratif</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <FaBuilding size={28} style={{ color: '#93c5fd', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>3</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Kecamatan</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #b45309, #78350f)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <FaMapPin size={28} style={{ color: '#fde68a', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>15</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Kelurahan</div>
          </div>
        </div>

        <h2>Peta Wilayah Kota Cimahi</h2>
        <div style={{
          textAlign: 'center',
          margin: '1.5rem 0',
          background: 'white',
          border: '1px solid var(--gray-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <img
            src="/images/peta-yurisdiksi.jpg"
            alt="Peta Wilayah Yurisdiksi Kota Cimahi"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 'var(--radius-md)',
              display: 'block',
              margin: '0 auto'
            }}
          />
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--gray-500)', fontStyle: 'italic' }}>
            Peta Wilayah Kota Cimahi (Skala 1 : 100.000) — Daerah Hukum PA Kota Cimahi
          </p>
        </div>

        <h2>Rincian Pembagian Wilayah Hukum</h2>
        <p>
          Berikut adalah rincian kecamatan dan kelurahan yang berada di bawah daerah hukum Pengadilan Agama Kota Cimahi:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1.5rem 0' }}>
          {districts.map((district, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-900), var(--primary-800))',
                color: 'white',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>{district.name}</span>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  fontSize: '0.8rem',
                  padding: '2px 10px',
                  borderRadius: '12px'
                }}>
                  {district.kelurahanCount} Kelurahan
                </span>
              </div>
              <div className="pa-table-wrapper" style={{ margin: 0, border: 'none' }}>
                <table className="pa-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px', textAlign: 'center' }}>No</th>
                      <th>Nama Kelurahan</th>
                      <th style={{ width: '150px' }}>Kode Pos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {district.kelurahans.map((kel, kIdx) => (
                      <tr key={kIdx}>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{kIdx + 1}</td>
                        <td>
                          <strong>{kel.name}</strong>
                          {kel.postal.includes('Lokasi') && (
                            <span style={{
                              marginLeft: '8px',
                              background: 'var(--primary-100)',
                              color: 'var(--primary-800)',
                              fontSize: '0.75rem',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 600
                            }}>
                              Gedung Kantor
                            </span>
                          )}
                        </td>
                        <td>{kel.postal.split(' ')[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <h2>Batas Wilayah Kota Cimahi</h2>
        <div className="pa-table-wrapper">
          <table className="pa-table">
            <thead>
              <tr>
                <th style={{ width: '160px' }}>Arah Mata Angin</th>
                <th>Berbatasan Dengan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Sebelah Utara</strong></td>
                <td>Kabupaten Bandung Barat (Kecamatan Cisarua & Parongpong)</td>
              </tr>
              <tr>
                <td><strong>Sebelah Selatan</strong></td>
                <td>Kabupaten Bandung (Kecamatan Margaasih) & Kota Bandung</td>
              </tr>
              <tr>
                <td><strong>Sebelah Timur</strong></td>
                <td>Kota Bandung (Kecamatan Sukasari, Andir, & Bandung Kulon)</td>
              </tr>
              <tr>
                <td><strong>Sebelah Barat</strong></td>
                <td>Kabupaten Bandung Barat (Kecamatan Padalarang & Batujajar)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </ProfileLayout>
  );
}

export default WilayahYurisdiksiPage;
