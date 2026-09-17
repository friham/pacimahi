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

const ImageCarousel = lazy(() => import('../components/ImageCarousel'));
const HomeSpotlightBanners = lazy(() => import('../components/HomeSpotlightBanners'));
const NewsSection = lazy(() => import('../components/NewsSection'));
const VideoProfileSection = lazy(() => import('../components/VideoProfileSection'));
const VirtualAssistant = lazy(() => import('../components/VirtualAssistant'));
const CaseTrackingModal = lazy(() => import('../components/CaseTrackingModal'));

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

  const rawVideoUrl = videoSettings.video_url !== undefined && videoSettings.video_url !== null 
    ? String(videoSettings.video_url).trim() 
    : '';
  const videoUrl = rawVideoUrl;
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : '';

  return (
    <div className="home-page">
      <Navbar />

      <SocialSidebar />

      <main>
        <HeroSection onOpenCaseModal={handleOpenCaseModal} />

        <Suspense fallback={null}>
          <ImageCarousel />
        </Suspense>

        <Suspense fallback={null}>
          <HomeSpotlightBanners />
        </Suspense>

        <QuickAccess onOpenCaseModal={handleOpenCaseModal} />

        <StatsSection />

        <Suspense fallback={null}>
          <NewsSection />
        </Suspense>

        <Suspense fallback={null}>
          <VideoProfileSection
            videoUrl={videoUrl}
            videoId={videoId}
            title={videoSettings.video_title || 'Video Profil Pengadilan Agama Kota Cimahi'}
            subtitle={videoSettings.video_subtitle || 'Mengenal lebih dekat komitmen integritas, tata kelola modern, dan inovasi pelayanan prima Pengadilan Agama Kota Cimahi bagi masyarakat.'}
          />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <CaseTrackingModal
          isOpen={isCaseModalOpen}
          onClose={() => setIsCaseModalOpen(false)}
          initialQuery={caseModalInitialQuery}
        />
      </Suspense>

      <Suspense fallback={null}>
        <VirtualAssistant />
      </Suspense>

      <AccessibilityWidget />

      <AcoFloatingButton cctvUrl="https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421" />

      <Footer />
    </div>
  );
}

export default HomePage;
