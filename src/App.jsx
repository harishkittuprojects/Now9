import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ServicesPage from './pages/ServicesPage';
import SurveyModal from './components/SurveyModal';
import UploadVideoModal from './components/UploadVideoModal';
import LiveStreamModal from './components/LiveStreamModal';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [isUploadVideoModalOpen, setIsUploadVideoModalOpen] = useState(false);
  const [isLiveStreamModalOpen, setIsLiveStreamModalOpen] = useState(false);
  const [activeSurveyId, setActiveSurveyId] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [presentDistrict, setPresentDistrict] = useState({
    districtName: "Hyderabad",
    stateName: "Telangana"
  });

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
      disable: 'mobile' // Prevents horizontal scroll/shift on mobile screens
    });
  }, []);

  // Refresh AOS when switching pages
  useEffect(() => {
    AOS.refresh();
  }, [activePage]);

  const handleOpenSurveyModal = (surveyId = null) => {
    setActiveSurveyId(surveyId);
    setIsSurveyModalOpen(true);
  };

  const handleCloseSurveyModal = () => {
    setIsSurveyModalOpen(false);
    setActiveSurveyId(null);
  };

  const handleOpenUploadVideoModal = () => {
    setIsUploadVideoModalOpen(true);
  };

  const handleCloseUploadVideoModal = () => {
    setIsUploadVideoModalOpen(false);
  };

  const handleOpenLiveStreamModal = () => {
    setIsLiveStreamModalOpen(true);
  };

  const handleCloseLiveStreamModal = () => {
    setIsLiveStreamModalOpen(false);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryFilter(categoryId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink-primary font-sans antialiased overflow-x-hidden w-full max-w-full">
      {/* Top Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        presentDistrict={presentDistrict}
        onOpenSurveyModal={() => handleOpenSurveyModal()}
        onOpenLiveStream={handleOpenLiveStreamModal}
        onOpenUploadVideo={handleOpenUploadVideoModal}
      />

      {/* Main View Router */}
      <main className="flex-1 overflow-x-hidden w-full max-w-full">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onOpenSurveyModal={handleOpenSurveyModal}
            onUploadVideo={handleOpenUploadVideoModal}
            onGoLive={handleOpenLiveStreamModal}
            onSelectCategory={handleSelectCategory}
            onDistrictDetected={(loc) => setPresentDistrict(loc)}
          />
        )}

        {activePage === 'categories' && (
          <CategoriesPage
            onOpenSurveyModal={handleOpenSurveyModal}
            onUploadVideo={handleOpenUploadVideoModal}
            onGoLive={handleOpenLiveStreamModal}
            selectedCategoryFilter={selectedCategoryFilter}
            setSelectedCategoryFilter={setSelectedCategoryFilter}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onOpenSurveyModal={handleOpenSurveyModal}
            setActivePage={setActivePage}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenSurveyModal={() => handleOpenSurveyModal()}
      />

      {/* Interactive Survey Modal */}
      <SurveyModal
        isOpen={isSurveyModalOpen}
        onClose={handleCloseSurveyModal}
        initialSurveyId={activeSurveyId}
      />

      {/* Common Talks Upload Video Modal */}
      <UploadVideoModal
        isOpen={isUploadVideoModalOpen}
        onClose={handleCloseUploadVideoModal}
        presentDistrict={presentDistrict}
      />

      {/* Live Stream Broadcast & Studio Modal */}
      <LiveStreamModal
        isOpen={isLiveStreamModalOpen}
        onClose={handleCloseLiveStreamModal}
        presentDistrict={presentDistrict}
      />
    </div>
  );
}
