import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa';
import banner1 from '../assets/banner-1.jpg';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.jpg';
import banner4 from '../assets/banner-4.jpg';
import './ImageCarousel.css';

const defaultSlides = [
  {
    id: 1,
    title: 'Zona Integritas WBK & WBBM',
    description: 'Selamat Datang di Pengadilan Agama Kota Cimahi',
    image: banner1,
    image_url: '/images/banner-1.jpg'
  },
  {
    id: 2,
    title: 'Laporan Survei PA Kota Cimahi',
    description: 'Hasil Survei Kepuasan Masyarakat (IKM), IPKP, dan IPAK Predikat A (Sangat Baik)',
    image: banner2,
    image_url: '/images/banner-2.jpg'
  },
  {
    id: 3,
    title: 'Informasi Layanan MPP Kota Cimahi',
    description: 'Layanan Pengadilan Agama Kota Cimahi di Mal Pelayanan Publik Kota Cimahi',
    image: banner3,
    image_url: '/images/banner-3.jpg'
  },
  {
    id: 4,
    title: 'Layanan Pengaduan Ditjen Badilag',
    description: 'Aspirasi dan Pengaduan Online WhatsApp Ditjen Badilag MA RI',
    image: banner4,
    image_url: '/images/banner-4.jpg'
  },
];

import { API_URL, SERVER_URL } from '../config';

const resolveImage = (slide, index) => {
  if (slide.image) return slide.image;
  if (slide.image_url) {
    if (slide.image_url.includes('banner-1') || slide.image_url.includes('slider-1')) return banner1;
    if (slide.image_url.includes('banner-2') || slide.image_url.includes('slider-2')) return banner2;
    if (slide.image_url.includes('banner-3') || slide.image_url.includes('slider-3')) return banner3;
    if (slide.image_url.includes('banner-4')) return banner4;
    if (slide.image_url.startsWith('/')) return `${SERVER_URL}${slide.image_url}`;
    return slide.image_url;
  }
  const defaults = [banner1, banner2, banner3, banner4];
  return defaults[index % defaults.length];
};

function Lightbox({ slide, imgSrc, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <div className="carousel-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="carousel-lightbox__inner" onClick={e => e.stopPropagation()}>
        <img src={imgSrc} alt="" className="carousel-lightbox__bg" aria-hidden="true" />

        <img
          src={imgSrc}
          alt={slide?.title || 'Banner'}
          className="carousel-lightbox__img"
        />

        {(slide?.title || slide?.description) && (
          <div className="carousel-lightbox__caption">
            {slide.title && <h3 className="carousel-lightbox__title">{slide.title}</h3>}
            {slide.description && <p className="carousel-lightbox__desc">{slide.description}</p>}
          </div>
        )}

        <button className="carousel-lightbox__close" onClick={onClose} aria-label="Tutup">
          <FaTimes />
        </button>
        <button className="carousel-lightbox__prev" onClick={onPrev} aria-label="Sebelumnya">
          <FaChevronLeft />
        </button>
        <button className="carousel-lightbox__next" onClick={onNext} aria-label="Berikutnya">
          <FaChevronRight />
        </button>
      </div>
    </div>,
    document.body
  );
}

function ImageCarousel() {
  const [slides, setSlides]       = useState(defaultSlides);
  const [current, setCurrent]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dotKey, setDotKey]       = useState(0);
  const [lightbox, setLightbox]   = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axios.get(`${API_URL}/sliders`);
        if (res.data.success && res.data.data.length > 0) setSlides(res.data.data);
      } catch {
      }
    };
    fetchSliders();
  }, []);

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setDotKey(k => k + 1);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goNext = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);
  const goPrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo, slides.length]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 5000);
  }, [goNext]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => startTimer();

  const openLightbox  = () => { setLightbox(true); pause(); };
  const closeLightbox = () => { setLightbox(false); resume(); };

  const lbNext = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length]);
  const lbPrev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length]);

  const currentSlide = slides[current];
  const currentImg   = resolveImage(currentSlide, current);

  const carouselRef = useScrollReveal({ threshold: 0.08 });

  return (
    <>
      <section ref={carouselRef} className="carousel-section scroll-reveal">
        <div className="container">
          <div className="carousel-header">
            <div className="carousel-header__badge">INFORMASI PERADILAN</div>
            <h2 className="carousel-header__title">Banner Informatif &amp; Layanan Publik</h2>
          </div>

          <div
            className="carousel"
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            <div className="carousel__track">
              {slides.map((slide, index) => {
                const imgSrc  = resolveImage(slide, index);
                const isActive = index === current;
                return (
                  <div
                    key={slide.id || index}
                    className={`carousel__slide ${isActive ? 'carousel__slide--active' : ''}`}
                  >
                    <img
                      src={imgSrc}
                      alt=""
                      className="carousel__slide-backdrop"
                      aria-hidden="true"
                    />

                    <img
                      src={imgSrc}
                      alt={slide.title || `Banner Slide ${index + 1}`}
                      className="carousel__slide-img"
                      onClick={isActive ? openLightbox : undefined}
                      style={{ cursor: isActive ? 'zoom-in' : 'default' }}
                    />

                    {isActive && (
                      <button
                        className="carousel__expand-btn"
                        onClick={openLightbox}
                        aria-label="Lihat gambar penuh"
                        title="Lihat gambar penuh"
                      >
                        <FaExpand size={13} />
                        <span>Lihat Penuh</span>
                      </button>
                    )}

                    {(slide.title || slide.description) && (
                      <div className="carousel__slide-content">
                        {slide.title && (
                          <h3 className="carousel__slide-title" key={`t-${index}-${dotKey}`}>
                            {slide.title}
                          </h3>
                        )}
                        {slide.description && (
                          <p className="carousel__slide-desc" key={`d-${index}-${dotKey}`}>
                            {slide.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button className="carousel__arrow carousel__arrow--prev" onClick={goPrev} aria-label="Slide sebelumnya">
              <FaChevronLeft />
            </button>
            <button className="carousel__arrow carousel__arrow--next" onClick={goNext} aria-label="Slide berikutnya">
              <FaChevronRight />
            </button>

            <div className="carousel__dots">
              {slides.map((_, index) => (
                <button
                  key={index === current ? `dot-${index}-${dotKey}` : index}
                  className={`carousel__dot ${index === current ? 'carousel__dot--active' : ''}`}
                  onClick={() => goTo(index)}
                  aria-label={`Ke slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="carousel__counter">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          slide={currentSlide}
          imgSrc={currentImg}
          onClose={closeLightbox}
          onNext={lbNext}
          onPrev={lbPrev}
        />
      )}
    </>
  );
}

export default ImageCarousel;
