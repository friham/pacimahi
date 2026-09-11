import { useState } from 'react';
import { 
  FaCalculator, FaRoute, FaHandHoldingHeart, FaCalendarAlt, 
  FaCheck, FaInfoCircle, FaFileSignature, FaUserTie, FaMoneyBillWave, FaClock
} from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';
import './ServiceGuide.css';

const stepsData = [
  {
    step: '01',
    title: 'Pendaftaran & Pembayaran Panjar',
    desc: 'Daftar secara mandiri via e-Court atau kunjungi loket PTSP Pengadilan Agama Cimahi. Bayar panjar perkara melalui virtual account bank mitra.',
    icon: FaFileSignature
  },
  {
    step: '02',
    title: 'Panggilan Sidang (Relas)',
    desc: 'Jurusita mengirimkan surat panggilan sidang resmi (relaas) ke alamat tempat tinggal Penggugat dan Tergugat atau via domisili elektronik.',
    icon: FaClock
  },
  {
    step: '03',
    title: 'Mediasi Wajib oleh Hakim Mediator',
    desc: 'Pada sidang pertama jika kedua belah pihak hadir, wajib menempuh proses mediasi perdamaian yang dipandu oleh Hakim Mediator tersertifikasi.',
    icon: FaUserTie
  },
  {
    step: '04',
    title: 'Pemeriksaan Perkara & Pembuktian',
    desc: 'Apabila mediasi tidak berhasil, dilanjutkan dengan pembacaan gugatan, jawaban, replik-duplik, serta pemeriksaan bukti surat dan saksi.',
    icon: FaRoute
  },
  {
    step: '05',
    title: 'Putusan & Pengambilan Akta',
    desc: 'Majelis Hakim membacakan putusan akhir. Setelah berkekuatan hukum tetap (BHT), para pihak dapat mengambil Akta Cerai & Salinan Putusan.',
    icon: FaMoneyBillWave
  }
];

const radiusRates = {
  'cimahi_tengah': { label: 'Kecamatan Cimahi Tengah (Radius I)', cost: 100000 },
  'cimahi_utara': { label: 'Kecamatan Cimahi Utara (Radius I)', cost: 110000 },
  'cimahi_selatan': { label: 'Kecamatan Cimahi Selatan (Radius I)', cost: 110000 },
  'padalarang_kbb': { label: 'Padalarang / Ngamprah (Radius II KBB)', cost: 150000 },
  'lembang_kbb': { label: 'Lembang / Cisarua (Radius III KBB)', cost: 180000 },
  'luar_wilayah': { label: 'Luar Wilayah / Surat Tercatat POS', cost: 75000 },
};

const caseBaseFees = {
  'cerai_gugat': { label: 'Cerai Gugat (Diajukan Istri)', pendaftaran: 30000, redaksi: 10000, meterai: 10000, pnbpPanggilan: 40000, panggilanCount: 5 },
  'cerai_talak': { label: 'Cerai Talak (Diajukan Suami)', pendaftaran: 30000, redaksi: 10000, meterai: 10000, pnbpPanggilan: 50000, panggilanCount: 7 },
  'isbat_nikah': { label: 'Pengesahan / Isbat Nikah (Voluntair)', pendaftaran: 30000, redaksi: 10000, meterai: 10000, pnbpPanggilan: 20000, panggilanCount: 3 },
  'dispensasi_kawin': { label: 'Dispensasi Kawin', pendaftaran: 30000, redaksi: 10000, meterai: 10000, pnbpPanggilan: 20000, panggilanCount: 3 },
  'harta_bersama': { label: 'Gugatan Harta Bersama / Waris', pendaftaran: 30000, redaksi: 10000, meterai: 10000, pnbpPanggilan: 50000, panggilanCount: 6 },
};

function ServiceGuide() {
  const [activeTab, setActiveTab] = useState('alur');

  // Calculator states
  const [caseType, setCaseType] = useState('cerai_gugat');
  const [radiusP, setRadiusP] = useState('cimahi_tengah');
  const [radiusT, setRadiusT] = useState('cimahi_selatan');
  const [isEcourt, setIsEcourt] = useState(true);

  // Compute fee
  const selectedCase = caseBaseFees[caseType];
  const rateP = radiusRates[radiusP].cost;
  const rateT = radiusRates[radiusT].cost;
  
  // Ecourt discount factor on delivery/summons
  const ecourtDiscount = isEcourt ? 0.4 : 1.0;
  const totalPanggilan = Math.round(((rateP * 2) + (rateT * selectedCase.panggilanCount)) * ecourtDiscount);
  const totalEstimasi = selectedCase.pendaftaran + selectedCase.redaksi + selectedCase.meterai + selectedCase.pnbpPanggilan + totalPanggilan;

  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="service-guide-section" id="panduan">
      <div className="container">
        <div ref={headerRef} className="service-guide__header scroll-reveal">
          <span className="service-guide__tag">Panduan Layanan Terpadu</span>
          <h2 className="section-title">Pusat Bantuan & Prosedur Perkara</h2>
          <p className="section-subtitle">
            Pelajari alur persidangan, hitung simulasi panjar biaya perkara secara mandiri, serta info bantuan hukum gratis
          </p>

          <div className="service-guide__tabs">
            <button
              className={`service-guide__tab-btn ${activeTab === 'alur' ? 'active' : ''}`}
              onClick={() => setActiveTab('alur')}
            >
              <FaRoute /> Alur Berperkara
            </button>
            <button
              className={`service-guide__tab-btn ${activeTab === 'kalkulator' ? 'active' : ''}`}
              onClick={() => setActiveTab('kalkulator')}
            >
              <FaCalculator /> Simulasi Panjar Biaya
            </button>
            <button
              className={`service-guide__tab-btn ${activeTab === 'posbakum' ? 'active' : ''}`}
              onClick={() => setActiveTab('posbakum')}
            >
              <FaHandHoldingHeart /> Bantuan Hukum (Posbakum)
            </button>
            <button
              className={`service-guide__tab-btn ${activeTab === 'jadwal' ? 'active' : ''}`}
              onClick={() => setActiveTab('jadwal')}
            >
              <FaCalendarAlt /> Jadwal Sidang Hari Ini
            </button>
          </div>
        </div>

        {/* TAB 1: ALUR BERPERKARA */}
        {activeTab === 'alur' && (
          <div ref={contentRef} className="guide-timeline scroll-reveal">
            {stepsData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="timeline-card">
                  <div className="timeline-card__badge">{item.step}</div>
                  <div className="timeline-card__icon-wrap">
                    <Icon />
                  </div>
                  <h3 className="timeline-card__title">{item.title}</h3>
                  <p className="timeline-card__desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: KALKULATOR PANJAR BIAYA */}
        {activeTab === 'kalkulator' && (
          <div ref={contentRef} className="calculator-box scroll-reveal">
            <div className="calculator-box__grid">
              <div className="calculator-form">
                <h3 className="calculator-form__title">
                  <FaCalculator /> Form Hitung Estimasi Panjar Biaya
                </h3>
                <p className="calculator-form__desc">
                  Biaya panjar perkara dihitung berdasarkan jenis perkara, radius domisili para pihak, serta metode pendaftaran (e-Court hemat hingga 60%).
                </p>

                <div className="calc-group">
                  <label>Jenis Perkara:</label>
                  <select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
                    {Object.entries(caseBaseFees).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>

                <div className="calc-group">
                  <label>Domisili / Kecamatan Penggugat (Pemohon):</label>
                  <select value={radiusP} onChange={(e) => setRadiusP(e.target.value)}>
                    {Object.entries(radiusRates).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>

                <div className="calc-group">
                  <label>Domisili / Kecamatan Tergugat (Termohon):</label>
                  <select value={radiusT} onChange={(e) => setRadiusT(e.target.value)}>
                    {Object.entries(radiusRates).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>

                <div className="calc-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={isEcourt}
                      onChange={(e) => setIsEcourt(e.target.checked)}
                    />
                    <span>Daftar Melalui <strong>e-Court Mahkamah Agung</strong> (Panggilan Surat Tercatat / Hemat Biaya)</span>
                  </label>
                </div>
              </div>

              {/* Summary Card */}
              <div className="calculator-summary">
                <h4 className="calc-summary__heading">Rincian Estimasi Biaya Panjar</h4>
                <div className="calc-summary__list">
                  <div className="calc-summary__row">
                    <span>Pendaftaran Perkara (PNBP)</span>
                    <span>Rp {selectedCase.pendaftaran.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="calc-summary__row">
                    <span>PNBP Biaya Panggilan</span>
                    <span>Rp {selectedCase.pnbpPanggilan.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="calc-summary__row">
                    <span>Biaya Panggilan Sidang (Estimasi)</span>
                    <span>Rp {totalPanggilan.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="calc-summary__row">
                    <span>Redaksi & Meterai Dokumen</span>
                    <span>Rp {(selectedCase.redaksi + selectedCase.meterai).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="calc-summary__row calc-summary__row--total">
                    <span>Total Estimasi Panjar:</span>
                    <span className="calc-total-number">Rp {totalEstimasi.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="calc-summary__note">
                  <FaInfoCircle />
                  <span>Sisa panjar biaya perkara yang tidak terpakai setelah putusan akan dikembalikan 100% ke rekening pihak.</span>
                </div>

                <a
                  href="https://ecourt.mahkamahagung.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="calc-summary__cta"
                >
                  <FaCheck /> Lanjut Daftar di e-Court MA RI
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: POSBAKUM & PRODEO */}
        {activeTab === 'posbakum' && (
          <div ref={contentRef} className="posbakum-box scroll-reveal">
            <div className="posbakum-box__intro">
              <div className="posbakum-icon">⚖️</div>
              <div>
                <h3>Layanan Pos Bantuan Hukum (Posbakum) & Perkara Prodeo (Gratis)</h3>
                <p>
                  Pengadilan Agama Kota Cimahi menyediakan layanan konsultasi hukum gratis, pembuatan dokumen gugatan/permohonan secara cuma-cuma, serta pembebasan seluruh biaya perkara bagi masyarakat tidak mampu.
                </p>
              </div>
            </div>

            <div className="posbakum-grid">
              <div className="posbakum-card">
                <h4><FaCheck className="check-icon" /> Persyaratan Perkara Prodeo (Biaya Rp 0)</h4>
                <ul>
                  <li>Surat Keterangan Tidak Mampu (SKTM) dari Lurah / Kepala Desa setempat; atau</li>
                  <li>Kartu Indonesia Sehat (KIS) / BPJS PBI; atau</li>
                  <li>Kartu Indonesia Pintar (KIP) / Kartu Keluarga Sejahtera (KKS); atau</li>
                  <li>Surat Keterangan Penerima Bantuan Sosial lainnya dari pemerintah.</li>
                </ul>
              </div>

              <div className="posbakum-card">
                <h4><FaCheck className="check-icon" /> Layanan yang Diberikan Posbakum</h4>
                <ul>
                  <li>Pemberian informasi dan konsultasi hukum keluarga & waris Islam.</li>
                  <li>Bantuan pembuatan surat gugatan / surat permohonan secara cuma-cuma.</li>
                  <li>Petunjuk mengenai tahapan dan tata cara persidangan di pengadilan.</li>
                  <li>Pemberian rujukan dan pendampingan advokat bagi perkara yang memenuhi syarat.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: JADWAL SIDANG */}
        {activeTab === 'jadwal' && (
          <div ref={contentRef} className="jadwal-box scroll-reveal">
            <div className="jadwal-table-wrapper">
              <table className="jadwal-table">
                <thead>
                  <tr>
                    <th>No. Perkara</th>
                    <th>Jenis Perkara</th>
                    <th>Ruang Sidang</th>
                    <th>Waktu Mulai</th>
                    <th>Agenda Sidang</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">124/Pdt.G/2026/PA.Cmi</td>
                    <td>Cerai Gugat</td>
                    <td>Ruang Sidang Utama (1)</td>
                    <td>09:00 WIB</td>
                    <td>Pembacaan Putusan</td>
                    <td><span className="jadwal-badge jadwal-badge--done">Selesai</span></td>
                  </tr>
                  <tr>
                    <td className="font-bold">88/Pdt.G/2026/PA.Cmi</td>
                    <td>Cerai Talak</td>
                    <td>Ruang Sidang Utama (1)</td>
                    <td>10:15 WIB</td>
                    <td>Pemeriksaan Saksi Penggugat</td>
                    <td><span className="jadwal-badge jadwal-badge--ongoing">Sedang Berlangsung</span></td>
                  </tr>
                  <tr>
                    <td className="font-bold">35/Pdt.P/2026/PA.Cmi</td>
                    <td>Dispensasi Kawin</td>
                    <td>Ruang Sidang 2</td>
                    <td>11:00 WIB</td>
                    <td>Pemeriksaan Calon Mempelai & Ortu</td>
                    <td><span className="jadwal-badge jadwal-badge--waiting">Menunggu</span></td>
                  </tr>
                  <tr>
                    <td className="font-bold">210/Pdt.G/2026/PA.Cmi</td>
                    <td>Harta Bersama</td>
                    <td>Ruang Sidang 2</td>
                    <td>13:00 WIB</td>
                    <td>Musyawarah Mediasi Lanjutan</td>
                    <td><span className="jadwal-badge jadwal-badge--waiting">Menunggu</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="jadwal-footer">
              <p>Menampilkan sampel jadwal sidang hari ini. Untuk melihat jadwal lengkap seluruh majelis hakim:</p>
              <a
                href="https://sipp.pa-cimahi.go.id/list_jadwal_sidang"
                target="_blank"
                rel="noreferrer"
                className="jadwal-btn"
              >
                Lihat Jadwal Sidang Lengkap di SIPP Online →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServiceGuide;
