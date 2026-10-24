import React from 'react';
import HeroSection from '../components/HeroSection';
import LocationPoliticalTracker from '../components/LocationPoliticalTracker';
import AboutSection from '../components/AboutSection';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import HowItWorks from '../components/HowItWorks';
import WhyNow9 from '../components/WhyNow9';
import CTASection from '../components/CTASection';
import { categoriesData } from '../data/categories';

export default function HomePage({ setActivePage, onOpenSurveyModal, onUploadVideo, onGoLive, onSelectCategory, onDistrictDetected }) {
  return (
    <div>
      {/* Automatic Present District & Political Radar - First Section */}
      <LocationPoliticalTracker
        onTakeFullSurvey={() => onOpenSurveyModal('politics-telangana-pulse')}
        onDistrictDetected={onDistrictDetected}
      />

      {/* Hero Section */}
      <HeroSection
        onTakeSurvey={() => onOpenSurveyModal()}
        onExploreCategories={() => {
          setActivePage('categories');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* About Section */}
      <AboutSection
        onExploreCategories={() => {
          setActivePage('categories');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Survey Categories Preview Section */}
      <section className="py-20 bg-surface-subtle border-t border-surface-border" id="categories-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Survey Categories"
            title="Explore Key Opinion Areas"
            subtitle="Choose between core civic policy topics or everyday lifestyle discussions to cast your opinion."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {categoriesData.map((category, idx) => (
              <CategoryCard
                key={category.id}
                category={category}
                delay={idx * 150}
                onSelectCategory={(id) => {
                  onSelectCategory(id);
                  setActivePage('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onTakeSurvey={(id) => onOpenSurveyModal(id)}
                onUploadVideo={onUploadVideo}
                onGoLive={onGoLive}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Why Now 9 Section */}
      <WhyNow9 />

      {/* Call To Action Section */}
      <CTASection
        onTakeSurvey={() => onOpenSurveyModal()}
        onExploreCategories={() => {
          setActivePage('categories');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
