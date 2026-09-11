import { useState } from 'react';
import { FaPlay, FaYoutube, FaExternalLinkAlt, FaTimes, FaShareAlt } from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';
import './VideoProfileSection.css';

function VideoProfileSection({
  videoUrl = 'https://youtu.be/62bIsvRcPv0?si=Fow524ngSa3DIkBs',
  videoId = '62bIsvRcPv0',
  title = 'Video Profil Pengadilan Agama Kota Cimahi',
  subtitle = 'Mengenal lebih dekat komitmen integritas, tata kelola modern, dan inovasi pelayanan prima Pengadilan Agama Kota Cimahi bagi masyarakat.',
}) {
  const headerRef = useScrollReveal();
  const videoRef = useScrollReveal({ threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(videoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="video-profile-section" id="profil-video">
      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className="video-profile__header scroll-reveal">
          <span className="video-profile__tag">Profil & Galeri Video</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* Video Player Card Container (Reference Design Image 2) */}
        <div ref={videoRef} className="video-card-wrapper scroll-reveal">
          <div className="video-card">
            {!isPlaying ? (
              /* Video Cover / Banner State */
              <div
                className="video-cover"
                onClick={() => setIsPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Putar Video Profil Pengadilan Agama Kota Cimahi"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsPlaying(true);
                  }
                }}
              >
                {/* Background Image / Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Thumbnail Video Profil PA Kota Cimahi"
                  className="video-cover__img"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div className="video-cover__overlay"></div>

                {/* Top Info Bar */}
                <div className="video-cover__top">
                  <div className="video-cover__channel">
                    <div className="video-cover__avatar">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="2"
                        className="video-cover__avatar-svg"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="video-cover__channel-title">Video Profil PA Cimahi</h4>
                      <p className="video-cover__channel-sub">Pengadilan Agama Kota Cimahi</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="video-cover__share-btn"
                    onClick={handleShare}
                    title="Salin Link Video"
                    aria-label="Salin Link Video"
                  >
                    <FaShareAlt />
                    <span>{copied ? 'Tersalin!' : 'Bagikan'}</span>
                  </button>
                </div>

                {/* Center Big Play Button & Headline */}
                <div className="video-cover__center">
                  <div className="video-play-btn-pulse">
                    <button
                      type="button"
                      className="video-play-btn"
                      aria-label="Mulai Video"
                    >
                      <FaPlay className="video-play-icon" />
                    </button>
                  </div>

                  <div className="video-cover__text-group">
                    <h3 className="video-cover__headline">Welcome to PA Kota Cimahi</h3>
                    <p className="video-cover__subheadline">
                      Selamat Datang di Pengadilan Agama Kota Cimahi • Melayani dengan CINTA
                    </p>
                  </div>
                </div>

                {/* Bottom Bar with Direct YouTube Link */}
                <div className="video-cover__bottom">
                  <div className="video-cover__badge">
                    <span className="live-dot"></span> Official Court Profile
                  </div>

                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-yt-direct-btn"
                    onClick={(e) => e.stopPropagation()}
                    title="Tonton langsung di YouTube"
                  >
                    <span>Tonton di</span>
                    <FaYoutube className="yt-icon" />
                    <span className="yt-text">YouTube</span>
                    <FaExternalLinkAlt className="yt-ext-icon" />
                  </a>
                </div>
              </div>
            ) : (
              /* Inline YouTube Iframe Player */
              <div className="video-player-container">
                <div className="video-player__top-bar">
                  <span className="video-player__title">{title}</span>
                  <div className="video-player__controls">
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-player__yt-link"
                    >
                      <FaYoutube /> Buka di YouTube
                    </a>
                    <button
                      type="button"
                      className="video-player__close-btn"
                      onClick={() => setIsPlaying(false)}
                      title="Tutup Pemutar"
                      aria-label="Tutup Pemutar Video"
                    >
                      <FaTimes /> Tutup
                    </button>
                  </div>
                </div>

                <div className="video-iframe-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="Video Profil Pengadilan Agama Kota Cimahi"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoProfileSection;
