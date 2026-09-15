import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearchPlus, 
  FaTimes, 
  FaExternalLinkAlt, 
  FaArrowRight, 
  FaFileAlt, 
  FaQrcode, 
  FaWhatsapp, 
  FaDownload,
  FaCheckCircle
} from 'react-icons/fa';
import './HomeSpotlightBanners.css';

const ziCards = [
  { id: 'zi-main', img: '/images/zona-integritas/zi-main.png', title: 'Zona Integritas PA Kota Cimahi', area: 'Utama', desc: 'Komitmen WBK & WBBM Menuju Peradilan Bersih dan Akuntabel' },
  { id: 'zi-area-1', img: '/images/zona-integritas/zi-area-1.png', title: 'Area I: Manajemen Perubahan', area: 'Area 1', desc: 'Mengubah pola pikir dan budaya kerja aparatur peradilan' },
  { id: 'zi-area-2', img: '/images/zona-integritas/zi-area-2.png', title: 'Area II: Penataan Tata Laksana', area: 'Area 2', desc: 'Optimalisasi SOP terintegrasi dan sistem persidangan modern' },
  { id: 'zi-area-3', img: '/images/zona-integritas/zi-area-3.png', title: 'Area III: Penataan Sistem Manajemen SDM', area: 'Area 3', desc: 'Pengembangan kompetensi, transparansi, dan penegakan disiplin' },
  { id: 'zi-area-4', img: '/images/zona-integritas/zi-area-4.png', title: 'Area IV: Penguatan Akuntabilitas Kinerja', area: 'Area 4', desc: 'Keterlibatan pimpinan dalam pencapaian target kinerja peradilan' },
  { id: 'zi-area-5', img: '/images/zona-integritas/zi-area-5.png', title: 'Area V: Penguatan Pengawasan', area: 'Area 5', desc: 'Pengendalian gratifikasi dan saluran pengaduan SIWAS terpadu' },
  { id: 'zi-area-6', img: '/images/zona-integritas/zi-area-6.png', title: 'Area VI: Peningkatan Kualitas Pelayanan Publik', area: 'Area 6', desc: 'Pelayanan prima berorientasi kepuasan masyarakat & kaum rentan' }
];

function HomeSpotlightBanners() {
  const [zoomImage, setZoomImage] = useState(null);

  const handleOpenZoom = (imgSrc, imgTitle) => {
    setZoomImage({ src: imgSrc, title: imgTitle });
  };

  const handleCloseZoom = () => {
    setZoomImage(null);
  };

  return (
    <section className="home-spotlight-section">
      <div className="container">

        {/* ========================================================
            1. ZONA INTEGRITAS (WBK & WBBM) 7 CARDS
        ======================================================== */}
        <div className="spotlight-block zi-block">
          <div className="spotlight-block__header">
            <div className="spotlight-badge">
              <span>REFORMASI BIROKRASI</span>
            </div>
            <h2 className="spotlight-title">Pembangunan Zona Integritas (WBK & WBBM)</h2>
            <p className="spotlight-desc">
              Pengadilan Agama Kota Cimahi berkomitmen mewujudkan Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM) melalui 6 Area Perubahan.
            </p>
          </div>

          <div className="zi-cards-grid">
            {ziCards.map((card, idx) => (
              <Link
                key={card.id}
                to="/layanan-publik/zona-integritas"
                className="zi-card"
                title={`${card.title} - Klik untuk selengkapnya`}
              >
                <div className="zi-card__img-container">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="zi-card__img"
                    loading="lazy"
                  />
                  <div className="zi-card__overlay">
                    <span className="zi-card__tag">{card.area}</span>
                    <span className="zi-card__view-btn">Lihat Detail <FaArrowRight size={10} /></span>
                  </div>
                </div>
                <div className="zi-card__caption">
                  <span className="zi-card__caption-title">{card.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================
            2. ALUR PELAYANAN PRIORITAS PTSP (INFOGRAFIS LENGKAP)
        ======================================================== */}
        <div className="spotlight-block prioritas-block">
          <div className="spotlight-block__header">
            <div className="spotlight-badge spotlight-badge--accent">
              <span>RAMAH DISABILITAS & KAUM RENTAN</span>
            </div>
            <h2 className="spotlight-title">Alur Pelayanan Prioritas PTSP PA Kota Cimahi</h2>
            <p className="spotlight-desc">
              Layanan khusus bebas antrean panjang dan pendampingan penuh untuk penyandang disabilitas, lanjut usia, ibu hamil, serta ibu menyusui.
            </p>
          </div>

          <div className="prioritas-banner-card">
            <div 
              className="prioritas-banner-wrapper"
              onClick={() => handleOpenZoom('/images/alur-prioritas-ptsp.png', 'Alur Pelayanan Prioritas PTSP Pengadilan Agama Kota Cimahi')}
              title="Klik untuk memperbesar infografis"
            >
              <img
                src="/images/alur-prioritas-ptsp.png"
                alt="Alur Pelayanan Prioritas PTSP Pengadilan Agama Kota Cimahi"
                className="prioritas-banner-img"
                loading="lazy"
              />
              <div className="prioritas-banner-zoom-hint">
                <FaSearchPlus /> Klik untuk Perbesar Gambar
              </div>
            </div>

            <div className="prioritas-card-footer">
              <div className="prioritas-points">
                <div className="prioritas-point-item">
                  <FaCheckCircle className="prioritas-point-icon" />
                  <span>Jalur Antrian Prioritas Khusus</span>
                </div>
                <div className="prioritas-point-item">
                  <FaCheckCircle className="prioritas-point-icon" />
                  <span>Fasilitas Kursi Roda & Tongkat Kruk</span>
                </div>
                <div className="prioritas-point-item">
                  <FaCheckCircle className="prioritas-point-icon" />
                  <span>Pendampingan Petugas Ramah 5S</span>
                </div>
                <div className="prioritas-point-item">
                  <FaCheckCircle className="prioritas-point-icon" />
                  <span>Ruang Tunggu & Loket Khusus Rendah</span>
                </div>
              </div>

              <div className="prioritas-actions">
                <button
                  type="button"
                  className="spotlight-btn spotlight-btn--secondary"
                  onClick={() => handleOpenZoom('/images/alur-prioritas-ptsp.png', 'Alur Pelayanan Prioritas PTSP')}
                >
                  <FaSearchPlus /> Perbesar Gambar
                </button>
                <Link
                  to="/layanan-publik/alur-pelayanan-prioritas-ptsp"
                  className="spotlight-btn spotlight-btn--primary"
                >
                  <FaFileAlt /> Lihat Panduan & SOP Lengkap
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. DUA BANNER LAYANAN: PROSEDUR BERPERKARA & LAYANAN INFORMASI
        ======================================================== */}
        <div className="spotlight-block service-dual-block">
          <div className="service-dual-grid">
            <Link
              to="/kepaniteraan/prosedur-berperkara"
              className="service-dual-card"
              title="Klik untuk melihat Prosedur Berperkara di PA Kota Cimahi"
            >
              <div className="service-dual-card__img-box">
                <img
                  src="/images/prosedur-berperkara.png"
                  alt="Prosedur Berperkara PA Cimahi"
                  className="service-dual-card__img"
                  loading="lazy"
                />
                <div className="service-dual-card__hover-mask">
                  <span className="service-dual-card__btn-pill">
                    Buka Prosedur Berperkara <FaArrowRight size={12} />
                  </span>
                </div>
              </div>
              <div className="service-dual-card__meta">
                <h3 className="service-dual-card__title">Prosedur Berperkara</h3>
                <p className="service-dual-card__subtitle">
                  Panduan lengkap tahapan beracara di tingkat pertama, banding, kasasi, hingga peninjauan kembali.
                </p>
              </div>
            </Link>

            <Link
              to="/layanan-publik/layanan-informasi"
              className="service-dual-card"
              title="Klik untuk mengakses Layanan Informasi PA Kota Cimahi"
            >
              <div className="service-dual-card__img-box">
                <img
                  src="/images/layanan-informasi.png"
                  alt="Layanan Informasi PA Cimahi"
                  className="service-dual-card__img"
                  loading="lazy"
                />
                <div className="service-dual-card__hover-mask">
                  <span className="service-dual-card__btn-pill">
                    Buka Layanan Informasi <FaArrowRight size={12} />
                  </span>
                </div>
              </div>
              <div className="service-dual-card__meta">
                <h3 className="service-dual-card__title">Layanan Informasi & PPID</h3>
                <p className="service-dual-card__subtitle">
                  Permintaan informasi publik, biaya informasi, dan transparansi dokumentasi peradilan.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* ========================================================
            4. BROSUR DIGITAL & QUICK SCAN BARCODE
        ======================================================== */}
        <div className="spotlight-block brosur-block">
          <div className="brosur-card">
            <div 
              className="brosur-card__img-wrapper"
              onClick={() => handleOpenZoom('/images/brosur-digital-banner.png', 'Brosur Digital PA Kota Cimahi')}
              title="Klik untuk memperbesar brosur digital"
            >
              <img
                src="/images/brosur-digital-banner.png"
                alt="Brosur Digital PA Cimahi - Scan QR Code"
                className="brosur-card__img"
                loading="lazy"
              />
              <div className="brosur-card__zoom-badge">
                <FaSearchPlus /> Perbesar
              </div>
            </div>

            <div className="brosur-card__quick-bar">
              <div className="brosur-quick-links">
                <Link to="/kepaniteraan/prosedur-berperkara" className="brosur-chip">
                  <FaFileAlt /> Persyaratan Berperkara
                </Link>
                <Link to="/kepaniteraan/biaya-perkara" className="brosur-chip">
                  <FaDownload /> Panjar Biaya Perkara
                </Link>
                <Link to="/kepaniteraan/tahapan-perkara" className="brosur-chip">
                  <FaCheckCircle /> Alur Pelayanan
                </Link>
                <a 
                  href="https://wa.me/6285703203331?text=Halo%20Admin%20PA%20Cimahi,%20saya%20ingin%20bertanya%20informasi%20layanan" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="brosur-chip brosur-chip--whatsapp"
                >
                  <FaWhatsapp /> WhatsApp SILINCAH
                </a>
              </div>

              <div className="brosur-main-action">
                <Link to="/layanan-publik/brosur-digital" className="spotlight-btn spotlight-btn--accent">
                  <FaQrcode /> Unduh Brosur Digital Lengkap
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            5. SOLUSI AKTA CERAI HILANG & LEGALISASI SECARA ONLINE
        ======================================================== */}
        <div className="spotlight-block akta-cerai-block">
          <div className="akta-card">
            <div 
              className="akta-card__img-wrapper"
              onClick={() => handleOpenZoom('/images/akta-cerai-banner.png', 'Solusi Akta Cerai Hilang dan Legalisasi Online PA Kota Cimahi')}
              title="Klik untuk memperbesar informasi akta cerai"
            >
              <img
                src="/images/akta-cerai-banner.png"
                alt="Solusi Mengatasi Akta Cerai Anda yang Hilang - Pengadilan Agama Kota Cimahi"
                className="akta-card__img"
                loading="lazy"
              />
              <div className="akta-card__zoom-badge">
                <FaSearchPlus /> Perbesar
              </div>
            </div>

            <div className="akta-card__actions-bar">
              <div className="akta-card__info-text">
                <strong>Butuh Duplikat atau Legalisasi Akta Cerai?</strong>
                <span>Kini dapat diajukan secara online dengan mudah, cepat, dan transparan tanpa antrean panjang.</span>
              </div>
              <div className="akta-card__btn-group">
                <a
                  href="https://bit.ly/aktaceraipacimahi"
                  target="_blank"
                  rel="noreferrer"
                  className="spotlight-btn spotlight-btn--primary"
                >
                  <span>Formulir Pengajuan Online</span>
                  <FaExternalLinkAlt size={12} />
                </a>
                <Link
                  to="/layanan-publik/ptsp"
                  className="spotlight-btn spotlight-btn--outline"
                >
                  <span>Informasi Loket PTSP</span>
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================
          IMAGE LIGHTBOX / ZOOM MODAL
      ======================================================== */}
      {zoomImage && (
        <div className="spotlight-modal-overlay" onClick={handleCloseZoom}>
          <div className="spotlight-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="spotlight-modal-header">
              <h3 className="spotlight-modal-title">{zoomImage.title}</h3>
              <button 
                type="button" 
                className="spotlight-modal-close" 
                onClick={handleCloseZoom}
                aria-label="Tutup"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <div className="spotlight-modal-body">
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                className="spotlight-modal-img"
              />
            </div>
            <div className="spotlight-modal-footer">
              <a
                href={zoomImage.src}
                target="_blank"
                rel="noreferrer"
                download
                className="spotlight-btn spotlight-btn--secondary"
              >
                <FaDownload /> Buka Tab Baru / Simpan Gambar
              </a>
              <button
                type="button"
                className="spotlight-btn spotlight-btn--primary"
                onClick={handleCloseZoom}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomeSpotlightBanners;
