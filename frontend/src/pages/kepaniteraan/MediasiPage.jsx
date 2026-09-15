import { useState } from 'react';
import KepaniteraanLayout from './KepaniteraanLayout';
import { FaHandshake } from 'react-icons/fa';

const mediators = [
  { no: 1, nama: 'Drs. H. Saepudin, S.H., M.H.I.', jabatan: 'Ketua', sertifikat: 'Bersertifikat' },
  { no: 2, nama: 'Drs. H. Engkus Kusnadi, S.H., M.H.', jabatan: 'Wakil Ketua', sertifikat: 'Bersertifikat' },
  { no: 3, nama: 'Dra. Hj. Neni Nuraeni, S.H., M.H.', jabatan: 'Hakim', sertifikat: 'Bersertifikat' },
  { no: 4, nama: 'Drs. H. Tatang Taufik, M.H.', jabatan: 'Hakim', sertifikat: 'Bersertifikat' },
  { no: 5, nama: 'Dr. Hj. Ani Farida, S.H., M.H.', jabatan: 'Hakim', sertifikat: 'Bersertifikat' },
  { no: 6, nama: 'Drs. H. Cecep Suryana, M.H.', jabatan: 'Hakim', sertifikat: 'Bersertifikat' },
];

function MediasiPage() {
  const [activeTab, setActiveTab] = useState('prosedur');

  return (
    <KepaniteraanLayout
      title="Mediasi Pengadilan"
      subtitle="Prosedur dan Daftar Mediator di Pengadilan Agama Kota Cimahi"
      breadcrumb="Mediasi"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaHandshake style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Perdamaian adalah Penyelesaian Terbaik</h4>
          <p style={{ margin: 0 }}>
            Berdasarkan PERMA Nomor 1 Tahun 2016, setiap perkara gugatan yang diajukan ke pengadilan <strong>wajib</strong> menempuh proses mediasi terlebih dahulu sebagai upaya perdamaian yang wajib ditempuh para pihak.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {[
            { id: 'prosedur', label: 'Prosedur Mediasi' },
            { id: 'mediator', label: 'Daftar Nama Mediator' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 20px', borderRadius: '20px',
                border: activeTab === tab.id ? 'none' : '1px solid var(--gray-300)',
                background: activeTab === tab.id ? 'var(--primary-800)' : 'white',
                color: activeTab === tab.id ? 'white' : 'var(--gray-700)',
                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'prosedur' && (
          <div>
            <h2>Prosedur Mediasi di Pengadilan Agama Kota Cimahi</h2>
            <ol>
              <li>
                <strong>Pemilihan Mediator:</strong> Pada sidang pertama, Majelis Hakim mewajibkan para pihak untuk menempuh mediasi dan memilih mediator dari daftar yang tersedia dalam waktu maksimal <strong>2 hari kerja</strong>.
              </li>
              <li>
                <strong>Penyerahan Resume:</strong> Dalam waktu 5 hari kerja setelah pemilihan mediator, masing-masing pihak wajib menyerahkan resume perkara kepada mediator dan pihak lawan.
              </li>
              <li>
                <strong>Proses Mediasi:</strong> Proses mediasi berlangsung paling lama <strong>30 hari kerja</strong> (dapat diperpanjang 30 hari jika ada kesepakatan). Mediasi bersifat tertutup dan rahasia.
              </li>
              <li>
                <strong>Hasil Mediasi:</strong>
                <ul>
                  <li><strong>Berhasil:</strong> Para pihak menandatangani kesepakatan perdamaian yang kemudian dikuatkan dengan Akta Perdamaian (Acte van Dading).</li>
                  <li><strong>Tidak Berhasil:</strong> Mediator menyampaikan laporan dan perkara dilanjutkan ke persidangan biasa.</li>
                </ul>
              </li>
            </ol>
            <h3>Dasar Hukum</h3>
            <ul>
              <li>Peraturan Mahkamah Agung RI Nomor 1 Tahun 2016 tentang Prosedur Mediasi di Pengadilan.</li>
            </ul>
          </div>
        )}

        {activeTab === 'mediator' && (
          <div>
            <h2>Daftar Nama Mediator</h2>
            <p>Pengadilan Agama Kota Cimahi Tahun 2025/2026</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="pa-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>No.</th>
                    <th>Nama</th>
                    <th>Jabatan</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {mediators.map(m => (
                    <tr key={m.no}>
                      <td style={{ textAlign: 'center' }}>{m.no}</td>
                      <td>{m.nama}</td>
                      <td>{m.jabatan}</td>
                      <td>
                        <span style={{
                          background: '#d1fae5', color: '#065f46',
                          padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600
                        }}>
                          {m.sertifikat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </article>
    </KepaniteraanLayout>
  );
}

export default MediasiPage;
