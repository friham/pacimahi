import { useState } from 'react';
import LayananPublikLayout from './LayananPublikLayout';
import { FaYoutube, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';

const brosurList = [
  { judul: 'Brosur Panduan Berperkara Gugatan Perceraian', size: '1.4 MB', desc: 'Syarat dokumen, alur pendaftaran, dan tahapan persidangan cerai gugat/talak.' },
  { judul: 'Brosur Permohonan Pengesahan Nikah (Itsbat Nikah)', size: '1.1 MB', desc: 'Panduan legalitas pernikahan bagi warga yang belum memiliki buku nikah resmi.' },
  { judul: 'Brosur Layanan Pos Bantuan Hukum (Posbakum Gratis)', size: '950 KB', desc: 'Syarat memperoleh konsultasi dan pembuatan gugatan/permohonan secara cuma-cuma.' },
  { judul: 'Brosur Hak Perempuan dan Anak Pasca Perceraian', size: '1.6 MB', desc: 'Edukasi nafkah iddah, mut’ah, madhiyah, dan nafkah hadhanah pemeliharaan anak.' },
  { judul: 'Brosur Berperkara Elektronik (e-Court & e-Litigation)', size: '1.8 MB', desc: 'Panduan pendaftaran perkara mandiri dari rumah melalui ecourt.mahkamahagung.go.id.' },
  { judul: 'Brosur Panduan Layanan WhatsApp SILINCAH', size: '820 KB', desc: 'Cara cek status perkara, jadwal sidang, dan biaya panjar via pesan otomatis WhatsApp.' },
];

const skList = [
  { nomor: 'SK/KPA.W10-A19/01/2025', tentang: 'Penetapan Standar Pelayanan Publik dan Maklumat Pelayanan PA Kota Cimahi TA 2025', size: '1.5 MB' },
  { nomor: 'SK/KPA.W10-A19/02/2025', tentang: 'Penetapan Radius dan Biaya Panjar Perkara Perdata Agama TA 2025', size: '1.2 MB' },
  { nomor: 'SK/KPA.W10-A19/03/2025', tentang: 'Pembentukan Tim Pejabat Pengelola Informasi dan Dokumentasi (PPID)', size: '980 KB' },
  { nomor: 'SK/KPA.W10-A19/04/2025', tentang: 'Penetapan Tim Satgas Penanganan Pengaduan dan Pengendalian Gratifikasi', size: '1.1 MB' },
];

const tautanTerkait = [
  { nama: 'Mahkamah Agung Republik Indonesia', url: 'https://www.mahkamahagung.go.id' },
  { nama: 'Direktorat Jenderal Badan Peradilan Agama (Badilag)', url: 'https://badilag.mahkamahagung.go.id' },
  { nama: 'Pengadilan Tinggi Agama Jawa Barat', url: 'https://pta-bandung.go.id' },
  { nama: 'Komisi Yudisial Republik Indonesia', url: 'https://komisiyudisial.go.id' },
  { nama: 'Kementerian PAN-RB (LAPOR!)', url: 'https://www.lapor.go.id' },
  { nama: 'Jaringan Dokumentasi Informasi Hukum (JDIH MARI)', url: 'https://jdih.mahkamahagung.go.id' },
];

function MediaPublikasiLayananPage() {
  const [tab, setTab] = useState('brosur');

  return (
    <LayananPublikLayout
      title="Brosur Digital, SK Pelayanan & Tautan Terkait"
      subtitle="Koleksi Brosur Edukasi Peradilan, Kumpulan Surat Keputusan Pimpinan, Kanal Media Sosial YouTube, dan Tautan Lembaga Terkait"
      breadcrumb="Brosur & Media Layanan"
    >
      <div className="pa-content-card">
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button onClick={() => setTab('brosur')} style={{ padding: '10px 18px', border: 'none', background: tab === 'brosur' ? '#1b5e20' : 'transparent', color: tab === 'brosur' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            Brosur Digital
          </button>
          <button onClick={() => setTab('sk')} style={{ padding: '10px 18px', border: 'none', background: tab === 'sk' ? '#1b5e20' : 'transparent', color: tab === 'sk' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            Kumpulan SK Standar Pelayanan
          </button>
          <button onClick={() => setTab('youtube')} style={{ padding: '10px 18px', border: 'none', background: tab === 'youtube' ? '#1b5e20' : 'transparent', color: tab === 'youtube' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            YouTube Official
          </button>
          <button onClick={() => setTab('tautan')} style={{ padding: '10px 18px', border: 'none', background: tab === 'tautan' ? '#1b5e20' : 'transparent', color: tab === 'tautan' ? '#fff' : '#475569', borderRadius: '6px 6px 0 0', fontWeight: 600, cursor: 'pointer' }}>
            Tautan Terkait
          </button>
        </div>

        {tab === 'brosur' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {brosurList.map((b, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '0.96rem', color: '#1e293b', margin: '0 0 6px 0', fontWeight: 700 }}>{b.judul}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.45 }}>{b.desc}</p>
                </div>
                <button onClick={() => alert(`Mengunduh: ${b.judul}`)} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <FaFilePdf size={12} /> Unduh Brosur ({b.size})
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'sk' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {skList.map((sk, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#0369a1', fontFamily: 'monospace', fontWeight: 700 }}>{sk.nomor}</div>
                  <h4 style={{ fontSize: '0.95rem', color: '#1e293b', margin: '2px 0 0 0', fontWeight: 600 }}>{sk.tentang}</h4>
                </div>
                <button onClick={() => alert(`Mengunduh: ${sk.nomor}`)} style={{ background: '#1b5e20', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  Unduh ({sk.size})
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'youtube' && (
          <div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <FaYoutube size={36} color="#dc2626" />
                <div>
                  <h3 style={{ margin: '0 0 2px 0', fontSize: '1.1rem', color: '#991b1b', fontWeight: 700 }}>Official YouTube PA Kota Cimahi</h3>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#7f1d1d' }}>Tonton video sosialisasi, profil peradilan, podcast hukum, dan inovasi pelayanan peradilan.</p>
                </div>
              </div>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" style={{ background: '#dc2626', color: '#fff', padding: '8px 18px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Buka Kanal YouTube</span>
                <FaExternalLinkAlt size={10} />
              </a>
            </div>
          </div>
        )}

        {tab === 'tautan' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {tautanTerkait.map((t, idx) => (
              <a key={idx} href={t.url} target="_blank" rel="noreferrer" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textDecoration: 'none', color: '#1e293b', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{t.nama}</span>
                <FaExternalLinkAlt size={12} color="#1b5e20" />
              </a>
            ))}
          </div>
        )}
      </div>
    </LayananPublikLayout>
  );
}

export default MediaPublikasiLayananPage;
