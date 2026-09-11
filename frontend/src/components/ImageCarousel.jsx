import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
    // Gambar hasil upload disimpan sebagai path relatif (mis. /images/uploads/xxx.jpg)
    if (slide.image_url.startsWith('/')) return `${SERVER_URL}${slide.image_url}`;
    return slide.image_url;
  }
  const defaults = [banner1, banner2, banner3, banner4];
  return defaults[index % defaults.length];
};

function ImageCarousel() {
  const [slides, setSlides] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axios.get(`${API_URL}/sliders`);
        if (res.data.success && res.data.data.length > 0) {
          setSlides(res.data.data);
        }
      } catch (err) {
        console.warn('Using default banner slides due to API fallback:', err.message);
      }
    };
    fetchSliders();
  }, []);

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo, slides.length]);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section className="carousel-section">
      <div className="container">
        <div className="carousel-header">
          <div className="carousel-header__badge">INFORMASI PERADILAN</div>
          <h2 className="carousel-header__title">Banner Informatif & Layanan Publik</h2>
        </div>

        <div className="carousel">
          {/* Slides Track */}
          <div className="carousel__track">
            {slides.map((slide, index) => {
              const imgSrc = resolveImage(slide, index);
              return (
                <div
                  key={slide.id || index}
                  className={`carousel__slide ${index === current ? 'carousel__slide--active' : ''}`}
                >
                  <img
                    src={imgSrc}
                    alt={slide.title || `Banner Slide ${index + 1}`}
                    className="carousel__slide-img"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            className="carousel__arrow carousel__arrow--prev"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button
            className="carousel__arrow carousel__arrow--next"
            onClick={goNext}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>

          {/* Dots Indicators */}
          <div className="carousel__dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel__dot ${index === current ? 'carousel__dot--active' : ''}`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageCarousel;
