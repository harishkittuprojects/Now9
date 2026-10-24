import React from 'react';
import { Landmark, MessageSquareText, ArrowRight, CheckCircle, Users, Video, Radio } from 'lucide-react';

export default function CategoryCard({ category, onSelectCategory, onTakeSurvey, onUploadVideo, onGoLive, delay = 0 }) {
  // Map icon name to component
  const renderIcon = () => {
    switch (category.iconName) {
      case 'Landmark':
        return <Landmark className="w-7 h-7 text-brand-600" />;
      case 'MessageSquareText':
      default:
        return <MessageSquareText className="w-7 h-7 text-brand-600" />;
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border border-surface-border p-8 hover-card-lift relative flex flex-col justify-between group"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div>
        {/* Top Header Badge & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center transition-colors group-hover:bg-brand-100/80">
            {renderIcon()}
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-ink-secondary border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-brand-500"></span>
            {category.surveyCount} Active Surveys
          </span>
        </div>

        {/* Title & Badge */}
        <div className="mb-3">
          <span className="text-xs font-semibold text-brand-600 tracking-wider uppercase">
            {category.badge}
          </span>
          <h3 className="text-2xl font-bold text-ink-primary mt-1 group-hover:text-brand-600 transition-colors">
            {category.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-ink-secondary text-base leading-relaxed mb-6">
          {category.shortDescription}
        </p>

        {/* Featured Topics tags */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-ink-secondary/70 uppercase tracking-wider block mb-2">
            Trending Topics
          </span>
          <div className="flex flex-wrap gap-2">
            {category.featuredTopics.map((topic, i) => (
              <span
                key={i}
                className="text-xs font-medium bg-gray-50 text-ink-secondary px-2.5 py-1 rounded-md border border-gray-100"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 sm:pt-6 border-t border-surface-borderLight flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
        {category.id === 'common-talks' ? (
          <>
            <button
              onClick={() => (onUploadVideo ? onUploadVideo(category) : onTakeSurvey(category.id))}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm px-3.5 py-3 rounded-xl shadow-sm hover:shadow-green-glow transition-all duration-200"
            >
              <Video className="w-4 h-4" />
              <span>Upload Video</span>
            </button>
            <button
              onClick={() => (onGoLive ? onGoLive(category) : null)}
              className="inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-3.5 py-3 rounded-xl shadow-sm hover:shadow-red-glow transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <Radio className="w-4 h-4" />
              <span>Live Stream</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => onTakeSurvey(category.id)}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-sm transition-all duration-200"
          >
            <span>Take Survey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onSelectCategory(category.id)}
          className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-ink-primary font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl border border-surface-border transition-all duration-200"
        >
          <span>Explore</span>
        </button>
      </div>
    </div>
  );
}
