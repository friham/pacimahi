import { useState } from 'react';
import KesekretariatanLayout from './KesekretariatanLayout';
import { 
  FaSitemap, 
  FaLaptopCode, 
  FaMoneyCheckAlt, 
  FaUsersCog, 
  FaCheckCircle,
  FaUserTie
} from 'react-icons/fa';

const subBagian = [
  {
    nama: 'Sub Bagian Perencanaan, TI, dan Pelaporan (PTIP)',
    kepala: 'Kasubbag PTIP',
    icon: FaLaptopCode,
    tugas: [
      'Penyusunan Rencana Kerja dan Anggaran (RKA-KL) DIPA 01 dan DIPA 04',
      'Penyusunan dokumen SAKIP (LKjIP, RENSTRA, RKT, PKT, dan IKU)',
      'Pengelolaan jaringan intranet, server, backup data, dan website resmi',
      'Pemeliharaan aplikasi SIPP, e-Court, dan inovasi pelayanan SILINCAH',
      'Penyusunan laporan bulanan, triwulanan, semesteran, dan tahunan satuan kerja',
    ]
  },
  {
    nama: 'Sub Bagian Umum dan Keuangan',
    kepala: 'Kasubbag Umum & Keuangan',
    icon: FaMoneyCheckAlt,
    tugas: [
      'Pelaksanaan pengelolaan anggaran belanja pegawai, barang, dan modal (SPP, SPM, SP2D)',
      'Penyelenggaraan akuntansi keuangan, LRA, neraca, dan CALK berbasis SAKTI',
      'Pengelolaan Barang Milik Negara (BMN), inventarisasi, dan aplikasi SIMAN',
      'Pemeliharaan sarana gedung kantor, kendaraan dinas, dan kebersihan lingkungan',
      'Pengelolaan ketatausahaan persuratan dinas, arsip, dan ekspedisi',
    ]
  },
  {
    nama: 'Sub Bagian Kepegawaian, Organisasi & Tata Laksana (Ortala)',
    kepala: 'Kasubbag Kepegawaian & Ortala',
    icon: FaUsersCog,
    tugas: [
      'Pengelolaan administrasi mutasi, promosi, kenaikan pangkat, dan KGB pegawai',
      'Pengusulan bezzeting formasi, pengadaan CASN/PPPK, dan pensiun pegawai',
      'Monitoring presensi elektronik, cuti pegawai, dan evaluasi kinerja (SKP) via SIKEP',
      'Penyusunan dan reviu Standar Operasional Prosedur (SOP) seluruh unit kerja',
      'Pembangunan Zona Integritas (WBK/WBBM) dan evaluasi kelembagaan organisasi',
    ]
  },
];

function UPTKesekretariatanPage() {
  return (
    <KesekretariatanLayout
      title="Unit Pelaksana Teknis Kesekretariatan"
      subtitle="Tugas Pokok, Fungsi, dan Pembagian Kerja Sub Bagian di Bawah Sekretaris Pengadilan Agama Kota Cimahi Kelas IA"
      breadcrumb="UPT Kesekretariatan"
    >
      <div className="pa-content-card">
        <div style={{ background: '#f8fafc', borderLeft: '4px solid #1b5e20', padding: '16px', borderRadius: '0 8px 8px 0', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#1b5e20', margin: '0 0 4px 0' }}>Struktur Organisasi Kesekretariatan</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
            Berdasarkan Peraturan Mahkamah Agung RI No. 7 Tahun 2015, Kesekretariatan dipimpin oleh seorang Sekretaris selaku Kuasa Pengguna Anggaran (KPA) yang membawahi 3 (tiga) Sub Bagian teknis.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {subBagian.map((sub, idx) => {
            const Icon = sub.icon;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '20px',
                  background: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', color: '#1e293b', margin: 0, fontWeight: 700 }}>{sub.nama}</h3>
                    <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>Penanggung Jawab: {sub.kepala}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600, marginBottom: '8px' }}>Rincian Tugas dan Fungsi Utama:</div>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {sub.tugas.map((t, tIdx) => (
                    <li key={tIdx} style={{ fontSize: '0.83rem', color: '#475569', lineHeight: 1.45 }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </KesekretariatanLayout>
  );
}

export default UPTKesekretariatanPage;
