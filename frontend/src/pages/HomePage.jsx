import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import QuickAccess from '../components/QuickAccess';
import StatsSection from '../components/StatsSection';
import SocialSidebar from '../components/SocialSidebar';
import AccessibilityWidget from '../components/AccessibilityWidget';
import AcoFloatingButton from '../components/AcoFloatingButton';
import Footer from '../components/Footer';
import { useSettings } from '../context/SettingsContext';

// Lazy-load below-the-fold components for faster initial paint
const ImageCarousel = lazy(() => import('../components/ImageCarousel'));
const HomeSpotlightBanners = lazy(() => import('../components/HomeSpotlightBanners'));
const NewsSection = lazy(() => import('../components/NewsSection'));
const VideoProfileSection = lazy(() => import('../components/VideoProfileSection'));
const VirtualAssistant = lazy(() => import('../components/VirtualAssistant'));
const CaseTrackingModal = lazy(() => import('../components/CaseTrackingModal'));

// Extract YouTube video ID from various URL formats
const extractYouTubeId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/,
  ];
  for (const pat of patterns) {
    const m = url.match(pat);
    if (m) return m[1];
  }
  return null;
};

function HomePage() {
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [caseModalInitialQuery, setCaseModalInitialQuery] = useState('');
  const { settings: videoSettings } = useSettings();

  useEffect(() => {
    document.title = 'Pengadilan Agama Kota Cimahi Kelas IA | Website Resmi';
  }, []);

  const handleOpenCaseModal = (query = '') => {
    setCaseModalInitialQuery(query);
    setIsCaseModalOpen(true);
  };

  const videoUrl = videoSettings.video_url || 'https://youtu.be/62bIsvRcPv0?si=Fow524ngSa3DIkBs';
  const videoId = extractYouTubeId(videoUrl) || '62bIsvRcPv0';

  return (
    <div className="home-page">
      {/* Top Navigation */}
      <Navbar />

      {/* Floating Social Media Links on Left */}
      <SocialSidebar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Search & Action Buttons */}
        <HeroSection onOpenCaseModal={handleOpenCaseModal} />

        {/* 2. Highlight Banner Slider / Image Carousel */}
        <Suspense fallback={null}>
          <ImageCarousel />
        </Suspense>

        {/* 2.5. Spotlight Banners */}
        <Suspense fallback={null}>
          <HomeSpotlightBanners />
        </Suspense>

        {/* 3. Quick Access Services Grid (8 Services) */}
        <QuickAccess onOpenCaseModal={handleOpenCaseModal} />

        {/* 4. Transparency & Case Statistics Counter */}
        <StatsSection />

        {/* 5. News & Announcements Section (Publikasi Terkini) */}
        <Suspense fallback={null}>
          <NewsSection />
        </Suspense>

        {/* 7. Official Video Profile Section (Video Profil PA Cimahi) */}
        <Suspense fallback={null}>
          <VideoProfileSection
            videoUrl={videoUrl}
            videoId={videoId}
            title={videoSettings.video_title || 'Video Profil Pengadilan Agama Kota Cimahi'}
            subtitle={videoSettings.video_subtitle || 'Mengenal lebih dekat komitmen integritas, tata kelola modern, dan inovasi pelayanan prima Pengadilan Agama Kota Cimahi bagi masyarakat.'}
          />
        </Suspense>
      </main>

      {/* Interactive SIPP Case Tracking Modal */}
      <Suspense fallback={null}>
        <CaseTrackingModal
          isOpen={isCaseModalOpen}
          onClose={() => setIsCaseModalOpen(false)}
          initialQuery={caseModalInitialQuery}
        />
      </Suspense>

      {/* Floating Virtual Assistant (SAPA) Chatbot on Bottom-Right */}
      <Suspense fallback={null}>
        <VirtualAssistant />
      </Suspense>

      {/* Floating Accessibility Features Widget (Menu Aksesibilitas) */}
      <AccessibilityWidget />

      {/* Floating ACO (Access CCTV Online) Shortcut Button */}
      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
