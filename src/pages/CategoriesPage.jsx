import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import { categoriesData } from '../data/categories';
import { surveysData } from '../data/surveys';
import { Landmark, MessageSquareText, Clock, Users, ArrowRight, CheckCircle2, Search, Filter } from 'lucide-react';

export default function CategoriesPage({ onOpenSurveyModal, onUploadVideo, onGoLive, selectedCategoryFilter, setSelectedCategoryFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(selectedCategoryFilter || 'all');

  const filteredCategories = categoriesData.filter(cat => {
    if (activeFilter === 'all') return true;
    return cat.id === activeFilter;
  });

  const filteredSurveys = surveysData.filter(survey => {
    const matchesFilter = activeFilter === 'all' || survey.categoryId === activeFilter;
    const matchesSearch = survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          survey.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          survey.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-14 sm:py-20 bg-surface-subtle min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeading
          badge="Browse All Topics"
          title="Survey Categories"
          subtitle="Explore our active topic channels. Select a category to participate in vetted surveys and view genuine public opinion consensus."
        />

        {/* Filter & Search Bar */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-2xl border border-surface-border shadow-card">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-brand-500 text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveFilter('politics')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeFilter === 'politics'
                  ? 'bg-brand-500 text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-gray-50'
              }`}
            >
              Politics
            </button>
            <button
              onClick={() => setActiveFilter('common-talks')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeFilter === 'common-talks'
                  ? 'bg-brand-500 text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-gray-50'
              }`}
            >
              Common Talks
            </button>
          </div>

          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search surveys or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-border focus:border-brand-500 focus:outline-none text-sm text-ink-primary"
            />
          </div>
        </div>

        {/* Primary Category Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {filteredCategories.map((cat, idx) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              delay={idx * 100}
              onSelectCategory={(id) => setActiveFilter(id)}
              onTakeSurvey={(id) => onOpenSurveyModal(id)}
              onUploadVideo={onUploadVideo}
              onGoLive={onGoLive}
            />
          ))}
        </div>

        {/* Active Surveys Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-border">
            <div>
              <h3 className="text-2xl font-bold text-ink-primary">
                Active Surveys ({filteredSurveys.length})
              </h3>
              <p className="text-sm text-ink-secondary mt-1">
                Participate in real surveys right now and view live consensus numbers.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-brand-50 text-brand-700 border border-brand-200 rounded-full hidden sm:inline-block">
              Open to Public
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.id}
                className="bg-white rounded-2xl p-6 border border-surface-border hover-card-lift flex flex-col justify-between"
                data-aos="fade-up"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                      {survey.categoryName}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                      <Clock className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{survey.estimatedTime}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-ink-primary mb-2">
                    {survey.title}
                  </h4>
                  <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                    {survey.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-borderLight flex items-center justify-between">
                  <span className="text-xs text-ink-secondary flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-500" />
                    <span>{survey.participants} responses</span>
                  </span>

                  <button
                    onClick={() => onOpenSurveyModal(survey.id)}
                    className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
                  >
                    <span>Take Survey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
