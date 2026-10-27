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
      {/* Interactive NowNine 10-Screen Mobile Flow Spotlight Banner */}
      <div className="bg-[#0C0C0E] border-b border-amber-500/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FDE68A] p-[2px] flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <div className="w-full h-full rounded-[10px] bg-[#121215] flex items-center justify-center font-black text-amber-400 text-lg">
                9
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  NowNine Live Vote & Survey UI
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase tracking-wider">
                  NEW
                </span>
              </div>
              <p className="text-xs text-gray-400">
                10-Screen Mobile Journey: Splash Screen, Party Selection, 5 Survey Steps & Live Poll Trends
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setActivePage('app-flow');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5C754] to-[#EAB308] hover:brightness-105 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <span>Launch 10 Screens App Flow</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

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
