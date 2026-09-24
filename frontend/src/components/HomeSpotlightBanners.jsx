import { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import resolveMediaUrl from '../utils/resolveMediaUrl';
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

const ziCardsFallback = [
  { id: 'zi-main', img: '/images/zona-integritas/zi-main.png', title: 'Zona Integritas PA Kota Cimahi', area: 'Utama', desc: 'Komitmen WBK & WBBM Menuju Peradilan Bersih dan Akuntabel' },
  { id: 'zi-area-1', img: '/images/zona-integritas/zi-area-1.png', title: 'Area I: Manajemen Perubahan', area: 'Area 1', desc: 'Mengubah pola pikir dan budaya kerja aparatur peradilan' },
  { id: 'zi-area-2', img: '/images/zona-integritas/zi-area-2.png', title: 'Area II: Penataan Tata Laksana', area: 'Area 2', desc: 'Optimalisasi SOP terintegrasi dan sistem persidangan modern' },
  { id: 'zi-area-3', img: '/images/zona-integritas/zi-area-3.png', title: 'Area III: Penataan Sistem Manajemen SDM', area: 'Area 3', desc: 'Pengembangan kompetensi, transparansi, dan penegakan disiplin' },
  { id: 'zi-area-4', img: '/images/zona-integritas/zi-area-4.png', title: 'Area IV: Penguatan Akuntabilitas Kinerja', area: 'Area 4', desc: 'Keterlibatan pimpinan dalam pencapaian target kinerja peradilan' },
  { id: 'zi-area-5', img: '/images/zona-integritas/zi-area-5.png', title: 'Area V: Penguatan Pengawasan', area: 'Area 5', desc: 'Pengendalian gratifikasi dan saluran pengaduan SIWAS terpadu' },
  { id: 'zi-area-6', img: '/images/zona-integritas/zi-area-6.png', title: 'Area VI: Peningkatan Kualitas Pelayanan Publik', area: 'Area 6', desc: 'Pelayanan prima berorientasi kepuasan masyarakat & kaum rentan' }
];

const FALLBACK_SECTIONS = {
  zi_gallery: {
    badge_text: 'REFORMASI BIROKRASI',
    title: 'Pembangunan Zona Integritas (WBK & WBBM)',
    description: 'Pengadilan Agama Kota Cimahi berkomitmen mewujudkan Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM) melalui 6 Area Perubahan.',
    items: ziCardsFallback
  },
  prioritas_ptsp: {
    badge_text: 'RAMAH DISABILITAS & KAUM RENTAN',
    title: 'Alur Pelayanan Prioritas PTSP PA Kota Cimahi',
    description: 'Layanan khusus bebas antrean panjang dan pendampingan penuh untuk penyandang disabilitas, lanjut usia, ibu hamil, serta ibu menyusui.',
    image_url: '/images/alur-prioritas-ptsp.png',
    link_url: '/layanan-publik/alur-pelayanan-prioritas-ptsp',
    items: [
      'Jalur Antrian Prioritas Khusus',
      'Fasilitas Kursi Roda & Tongkat Kruk',
      'Pendampingan Petugas Ramah 5S',
      'Ruang Tunggu & Loket Khusus Rendah'
    ]
  },
  service_dual: {
    items: [
      {
        image_url: '/images/prosedur-berperkara.png',
        title: 'Prosedur Berperkara',
        subtitle: 'Panduan lengkap tahapan beracara di tingkat pertama, banding, kasasi, hingga peninjauan kembali.',
        link_url: '/kepaniteraan/prosedur-berperkara'
      },
      {
        image_url: '/images/layanan-informasi.png',
        title: 'Layanan Informasi & PPID',
        subtitle: 'Permintaan informasi publik, biaya informasi, dan transparansi dokumentasi peradilan.',
        link_url: '/layanan-publik/layanan-informasi'
      }
    ]
  },
  brosur_digital: {
    image_url: '/images/brosur-digital-banner.png',
    link_url: '/layanan-publik/brosur-digital',
    items: [
      { icon: 'file', label: 'Persyaratan Berperkara', url: '/kepaniteraan/prosedur-berperkara' },
      { icon: 'download', label: 'Panjar Biaya Perkara', url: '/kepaniteraan/biaya-perkara' },
      { icon: 'check', label: 'Alur Pelayanan', url: '/kepaniteraan/tahapan-perkara' },
      { icon: 'whatsapp', label: 'WhatsApp SILINCAH', url: 'https://wa.me/6285703203331?text=Halo%20Admin%20PA%20Cimahi,%20saya%20ingin%20bertanya%20informasi%20layanan' }
    ]
  },
  akta_cerai: {
    title: 'Butuh Duplikat atau Legalisasi Akta Cerai?',
    description: 'Kini dapat diajukan secara online dengan mudah, cepat, dan transparan tanpa antrean panjang.',
    image_url: '/images/akta-cerai-banner.png',
    items: [
      { label: 'Formulir Pengajuan Online', url: 'https://bit.ly/aktaceraipacimahi', is_external: true },
      { label: 'Informasi Loket PTSP', url: '/layanan-publik/ptsp', is_external: false }
    ]
  }
};

const CHIP_ICONS = {
  file: FaFileAlt,
  download: FaDownload,
  check: FaCheckCircle,
  whatsapp: FaWhatsapp
};

function HomeSpotlightBanners() {
  const [zoomImage, setZoomImage] = useState(null);
  const [sections, setSections] = useState(FALLBACK_SECTIONS);

  // Scroll-reveal refs — satu per block, threshold rendah (0.08) agar elemen besar tidak nyangkut
  const ziRef        = useScrollReveal({ threshold: 0.08 });
  const priRef       = useScrollReveal({ threshold: 0.08 });
  const dualRef      = useScrollReveal({ threshold: 0.08 });
  const brosurRef    = useScrollReveal({ threshold: 0.08 });
  const aktaRef      = useScrollReveal({ threshold: 0.08 });

  useEffect(() => {
    let cancelled = false;
    axios.get(`${API_URL}/homepage-sections`)
      .then((res) => {
        if (cancelled) return;
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const byKey = {};
          res.data.data.forEach((s) => { byKey[s.section_key] = s; });
          setSections((prev) => ({ ...prev, ...byKey }));
        }
      })
      .catch(() => {
        // Gagal fetch: biarkan data fallback statis yang ditampilkan.
      });
    return () => { cancelled = true; };
  }, []);

  const handleOpenZoom = (imgSrc, imgTitle) => {
    setZoomImage({ src: imgSrc, title: imgTitle });
  };

  const handleCloseZoom = () => {
    setZoomImage(null);
  };

  const zi = sections.zi_gallery || {};
  const ziCards = (zi.items || ziCardsFallback).map((card) => ({
    ...card,
    img: resolveMediaUrl(card.img)
  }));

  const pri = sections.prioritas_ptsp || {};
  const priImage = resolveMediaUrl(pri.image_url || FALLBACK_SECTIONS.prioritas_ptsp.image_url);

  const dualCards = ((sections.service_dual || {}).items || FALLBACK_SECTIONS.service_dual.items).map((card) => ({
    ...card,
    image_url: resolveMediaUrl(card.image_url)
  }));

  const brosur = sections.brosur_digital || {};
  const brosurImage = resolveMediaUrl(brosur.image_url || FALLBACK_SECTIONS.brosur_digital.image_url);
  const brosurLinks = brosur.items || FALLBACK_SECTIONS.brosur_digital.items;

  const akta = sections.akta_cerai || {};
  const aktaImage = resolveMediaUrl(akta.image_url || FALLBACK_SECTIONS.akta_cerai.image_url);
  const aktaButtons = akta.items || FALLBACK_SECTIONS.akta_cerai.items;

  return (
    <section className="home-spotlight-section">
      <div className="container">

        {/* ========================================================
            1. ZONA INTEGRITAS (WBK & WBBM) 7 CARDS
        ======================================================== */}
        <div ref={ziRef} className="spotlight-block zi-block scroll-reveal">
          <div className="spotlight-block__header">
            <div className="spotlight-badge">
              <span>{zi.badge_text || FALLBACK_SECTIONS.zi_gallery.badge_text}</span>
            </div>
            <h2 className="spotlight-title">{zi.title || FALLBACK_SECTIONS.zi_gallery.title}</h2>
            <p className="spotlight-desc">
              {zi.description || FALLBACK_SECTIONS.zi_gallery.description}
            </p>
          </div>

          <div className="zi-cards-grid scroll-reveal-stagger">
            {ziCards.map((card, idx) => (
              <Link
                key={card.id}
                to="/layanan-publik/zona-integritas"
                className="zi-card"
                style={{ transitionDelay: `${idx * 0.08}s` }}
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
        <div ref={priRef} className="spotlight-block prioritas-block scroll-reveal">
          <div className="spotlight-block__header">
            <div className="spotlight-badge spotlight-badge--accent">
              <span>{pri.badge_text || FALLBACK_SECTIONS.prioritas_ptsp.badge_text}</span>
            </div>
            <h2 className="spotlight-title">{pri.title || FALLBACK_SECTIONS.prioritas_ptsp.title}</h2>
            <p className="spotlight-desc">
              {pri.description || FALLBACK_SECTIONS.prioritas_ptsp.description}
            </p>
          </div>

          <div className="prioritas-banner-card">
            <div
              className="prioritas-banner-wrapper"
              onClick={() => handleOpenZoom(priImage, 'Alur Pelayanan Prioritas PTSP Pengadilan Agama Kota Cimahi')}
              title="Klik untuk memperbesar infografis"
            >
              <img
                src={priImage}
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
                {(pri.items || FALLBACK_SECTIONS.prioritas_ptsp.items).map((point, idx) => (
                  <div className="prioritas-point-item" key={idx}>
                    <FaCheckCircle className="prioritas-point-icon" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="prioritas-actions">
                <button
                  type="button"
                  className="spotlight-btn spotlight-btn--secondary"
                  onClick={() => handleOpenZoom(priImage, 'Alur Pelayanan Prioritas PTSP')}
                >
                  <FaSearchPlus /> Perbesar Gambar
                </button>
                <Link
                  to={pri.link_url || FALLBACK_SECTIONS.prioritas_ptsp.link_url}
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
        <div ref={dualRef} className="spotlight-block service-dual-block scroll-reveal">
          <div className="service-dual-grid scroll-reveal-stagger">
            {dualCards.map((card, idx) => (
              <Link
                key={idx}
                to={card.link_url}
                className="service-dual-card"
                style={{ transitionDelay: `${idx * 0.08}s` }}
                title={card.hover_title || `Klik untuk melihat ${card.title} di PA Kota Cimahi`}
              >
                <div className="service-dual-card__img-box">
                  <img
                    src={card.image_url}
                    alt={card.alt_text || `${card.title} PA Cimahi`}
                    className="service-dual-card__img"
                    loading="lazy"
                  />
                  <div className="service-dual-card__hover-mask">
                    <span className="service-dual-card__btn-pill">
                      {card.pill_text || `Buka ${card.title}`} <FaArrowRight size={12} />
                    </span>
                  </div>
                </div>
                <div className="service-dual-card__meta">
                  <h3 className="service-dual-card__title">{card.title}</h3>
                  <p className="service-dual-card__subtitle">
                    {card.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================
            4. BROSUR DIGITAL & QUICK SCAN BARCODE
        ======================================================== */}
        <div ref={brosurRef} className="spotlight-block brosur-block scroll-reveal">
          <div className="brosur-card">
            <div
              className="brosur-card__img-wrapper"
              onClick={() => handleOpenZoom(brosurImage, 'Brosur Digital PA Kota Cimahi')}
              title="Klik untuk memperbesar brosur digital"
            >
              <img
                src={brosurImage}
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
                {brosurLinks.map((chip, idx) => {
                  const ChipIcon = CHIP_ICONS[chip.icon] || FaFileAlt;
                  const isExternal = typeof chip.url === 'string' && chip.url.startsWith('http');
                  const chipClass = chip.icon === 'whatsapp' ? 'brosur-chip brosur-chip--whatsapp' : 'brosur-chip';
                  return isExternal ? (
                    <a
                      key={idx}
                      href={chip.url}
                      target="_blank"
                      rel="noreferrer"
                      className={chipClass}
                    >
                      <ChipIcon /> {chip.label}
                    </a>
                  ) : (
                    <Link key={idx} to={chip.url} className={chipClass}>
                      <ChipIcon /> {chip.label}
                    </Link>
                  );
                })}
              </div>

              <div className="brosur-main-action">
                <Link to={brosur.link_url || FALLBACK_SECTIONS.brosur_digital.link_url} className="spotlight-btn spotlight-btn--accent">
                  <FaQrcode /> Unduh Brosur Digital Lengkap
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            5. SOLUSI AKTA CERAI HILANG & LEGALISASI SECARA ONLINE
        ======================================================== */}
        <div ref={aktaRef} className="spotlight-block akta-cerai-block scroll-reveal">
          <div className="akta-card">
            <div
              className="akta-card__img-wrapper"
              onClick={() => handleOpenZoom(aktaImage, 'Solusi Akta Cerai Hilang dan Legalisasi Online PA Kota Cimahi')}
              title="Klik untuk memperbesar informasi akta cerai"
            >
              <img
                src={aktaImage}
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
                <strong>{akta.title || FALLBACK_SECTIONS.akta_cerai.title}</strong>
                <span>{akta.description || FALLBACK_SECTIONS.akta_cerai.description}</span>
              </div>
              <div className="akta-card__btn-group">
                {aktaButtons.map((btn, idx) => (
                  btn.is_external ? (
                    <a
                      key={idx}
                      href={btn.url}
                      target="_blank"
                      rel="noreferrer"
                      className="spotlight-btn spotlight-btn--primary"
                    >
                      <span>{btn.label}</span>
                      <FaExternalLinkAlt size={12} />
                    </a>
                  ) : (
                    <Link
                      key={idx}
                      to={btn.url}
                      className="spotlight-btn spotlight-btn--outline"
                    >
                      <span>{btn.label}</span>
                      <FaArrowRight size={12} />
                    </Link>
                  )
                ))}
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
