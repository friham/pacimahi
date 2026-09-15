import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import KepaniteraanLayout from './KepaniteraanLayout';
import { FaHandHoldingUsd, FaFileContract, FaBalanceScale, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

function ProdeoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'prosedur');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  return (
    <KepaniteraanLayout
      title="Layanan Perkara Cuma-Cuma (Prodeo)"
      subtitle="Pembebasan Biaya Perkara Bagi Masyarakat Tidak Mampu di Pengadilan Agama Kota Cimahi"
      breadcrumb="Perkara Prodeo"
    >
      <article className="pa-article">
        <div className="pa-callout">
          <h4><FaHandHoldingUsd style={{ marginRight: '8px', verticalAlign: '-2px' }} /> Keadilan untuk Semua (Justice for All)</h4>
          <p style={{ margin: 0 }}>
            Layanan perkara prodeo adalah layanan pembebasan biaya panjar perkara bagi masyarakat yang tidak mampu secara ekonomi, di mana seluruh biaya perkara ditanggung oleh negara melalui DIPA Pengadilan Agama Kota Cimahi.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {[
            { id: 'prosedur', label: 'Prosedur Berperkara Prodeo' },
            { id: 'syarat', label: 'Syarat Pengajuan' },
            { id: 'aturan', label: 'Peraturan & Kebijakan' },
            { id: 'biaya', label: 'Rincian Komponen Biaya' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: activeTab === tab.id ? 'none' : '1px solid var(--gray-300)',
                background: activeTab === tab.id ? 'var(--primary-800)' : 'white',
                color: activeTab === tab.id ? 'white' : 'var(--gray-700)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'prosedur' && (
          <div>
            <h2>Prosedur Pengajuan Berperkara Secara Prodeo</h2>
            <ol>
              <li><strong>Pendaftaran:</strong> Penggugat/Pemohon mengajukan surat permohonan berperkara secara prodeo bersamaan dengan surat gugatan/permohonan ke meja pendaftaran PTSP.</li>
              <li><strong>Pemeriksaan Dokumen:</strong> Petugas memeriksa kelengkapan bukti ketidakmampuan (SKTM atau Kartu Bantuan Sosial).</li>
              <li><strong>Penetapan Ketua:</strong> Ketua Pengadilan Agama memeriksa permohonan dan menerbitkan penetapan layanan prodeo atau menunjuk Majelis Hakim untuk memeriksa permohonan prodeo.</li>
              <li><strong>Sidang Insidentil / Pemeriksaan:</strong> Majelis Hakim memeriksa bukti ketidakmampuan pemohon dalam sidang pertama.</li>
              <li><strong>Putusan Sela / Penetapan:</strong> Jika dikabulkan, proses persidangan dilanjutkan secara cuma-cuma tanpa dipungut biaya sepeser pun.</li>
            </ol>
          </div>
        )}

        {activeTab === 'syarat' && (
          <div>
            <h2>Syarat Pengajuan Perkara Prodeo</h2>
            <ul>
              <li>Surat Permohonan Berperkara Secara Prodeo yang ditujukan kepada Ketua Pengadilan Agama Kota Cimahi.</li>
              <li>Surat Keterangan Tidak Mampu (SKTM) yang dikeluarkan oleh Kepala Desa/Lurah setempat yang menyatakan bahwa pemohon benar tidak mampu membayar biaya perkara; ATAU</li>
              <li>Surat Keterangan Tunjangan Sosial lainnya seperti Kartu Program Keluarga Harapan (PKH), Kartu Bantuan Pangan Non Tunai (BPNT), Kartu Indonesia Pintar (KIP), atau Kartu Indonesia Sehat (KIS PBI).</li>
              <li>Fotokopi identitas diri (KTP dan Kartu Keluarga).</li>
            </ul>
          </div>
        )}

        {activeTab === 'aturan' && (
          <div>
            <h2>Peraturan dan Kebijakan Terkait Prodeo</h2>
            <ul>
              <li>HIR (Herzien Inlandsch Reglement) Pasal 237-245 / RBg Pasal 273-281.</li>
              <li>Undang-Undang Nomor 48 Tahun 2009 tentang Kekuasaan Kehakiman (Pasal 56 & 57).</li>
              <li>Peraturan Mahkamah Agung RI (PERMA) Nomor 1 Tahun 2014 tentang Pedoman Pemberian Layanan Hukum Bagi Masyarakat Tidak Mampu di Pengadilan.</li>
              <li>Surat Edaran Mahkamah Agung RI (SEMA) Nomor 10 Tahun 2010 tentang Pedoman Bantuan Hukum.</li>
            </ul>
          </div>
        )}

        {activeTab === 'biaya' && (
          <div>
            <h2>Komponen Biaya yang Dibebaskan</h2>
            <p>Dalam perkara prodeo, seluruh komponen biaya yang dibebankan kepada negara melalui anggaran DIPA meliputi:</p>
            <ul>
              <li>Biaya Pendaftaran / Kepaniteraan.</li>
              <li>Biaya Panggilan dan Pemberitahuan Para Pihak (Radius).</li>
              <li>Biaya Pemeriksaan Setempat (Descente) jika diperlukan.</li>
              <li>Biaya Meterai dan Redaksi Putusan.</li>
              <li>Biaya Penggandaan dan Pemberkasan Berkas Perkara.</li>
            </ul>
          </div>
        )}
      </article>
    </KepaniteraanLayout>
  );
}

export default ProdeoPage;
