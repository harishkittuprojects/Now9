import React, { useState } from 'react';
import { ArrowRight, CheckCircle, BarChart3, Users, Sparkles, TrendingUp, Vote } from 'lucide-react';

export default function HeroSection({ onTakeSurvey, onExploreCategories }) {
  // Interactive mini-poll widget inside Hero
  const [selectedHeroOption, setSelectedHeroOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const heroPollOptions = [
    { id: 1, text: "Improving Public Healthcare Access", percent: 46 },
    { id: 2, text: "Strengthening Civic Infrastructure", percent: 34 },
    { id: 3, text: "Youth Job Creation & Technology", percent: 20 },
  ];

  const handleVote = (id) => {
    setSelectedHeroOption(id);
    setHasVoted(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/30 via-white to-white pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-surface-border">
      {/* Decorative ambient subtle background pattern */}
      <div className="absolute top-0 inset-x-0 h-64 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 text-left" data-aos="fade-right">
            
            {/* Live badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-4 sm:mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-500 live-pulse"></span>
              <span className="font-medium">Live Public Opinion Platform</span>
              <span className="text-gray-300">|</span>
              <span className="text-ink-secondary">Over 340,000+ voices</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink-primary tracking-tight leading-[1.15] mb-4 sm:mb-6">
              Your Voice Shapes Tomorrow's <span className="text-brand-500 underline decoration-brand-200 decoration-wavy decoration-2">Decisions.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-lg text-ink-secondary leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              Now 9 is a trusted survey and public opinion platform. Participate in vetted surveys on <strong>Politics</strong> and <strong>Common Talks</strong>, discover what everyday citizens think, and let your perspective be heard.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <button
                onClick={onTakeSurvey}
                className="inline-flex items-center justify-center gap-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-green-glow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                <span>Take a Survey</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={onExploreCategories}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-ink-primary font-semibold text-sm sm:text-base px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-surface-border transition-all duration-200 focus:outline-none"
              >
                <span>Explore Categories</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-surface-border max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-ink-primary">100%</p>
                <p className="text-[11px] sm:text-xs text-ink-secondary font-medium mt-0.5">Anonymous & Free</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-brand-600">36+</p>
                <p className="text-[11px] sm:text-xs text-ink-secondary font-medium mt-0.5">Active Surveys</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-ink-primary">&lt; 3 min</p>
                <p className="text-[11px] sm:text-xs text-ink-secondary font-medium mt-0.5">Avg Completion</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Element related to surveys/opinions (Interactive Live Poll Widget) */}
          <div className="lg:col-span-5" data-aos="fade-left">
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-elevated">
              
              {/* Header of poll card */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-borderLight mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                    <Vote className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-ink-primary">Live Pulse Poll</h3>
                    <p className="text-[11px] text-ink-secondary">Featured in Politics • 12.8k votes</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 live-pulse"></span>
                  Active
                </span>
              </div>

              {/* Poll Question */}
              <p className="font-semibold text-base text-ink-primary mb-4">
                "What should be the top focus for public governance over the next 12 months?"
              </p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {heroPollOptions.map((opt) => {
                  const isSelected = selectedHeroOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleVote(opt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden group ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/50 shadow-xs'
                          : 'border-surface-border hover:border-brand-300 hover:bg-gray-50'
                      }`}
                    >
                      {/* Percentage background fill when voted */}
                      {hasVoted && (
                        <div
                          className={`absolute top-0 bottom-0 left-0 ${
                            isSelected ? 'bg-brand-100/70' : 'bg-gray-100/60'
                          } transition-all duration-700 pointer-events-none`}
                          style={{ width: `${opt.percent}%` }}
                        />
                      )}

                      <div className="relative flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-brand-500 bg-brand-500 text-white'
                                : 'border-gray-300 group-hover:border-brand-400'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </span>
                          <span className={`font-medium ${isSelected ? 'text-ink-primary font-semibold' : 'text-ink-secondary'}`}>
                            {opt.text}
                          </span>
                        </div>
                        {hasVoted && (
                          <span className="font-bold text-xs text-brand-700 shrink-0 ml-2">
                            {opt.percent}%
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer info & CTA */}
              <div className="pt-4 border-t border-surface-borderLight flex items-center justify-between text-xs text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-500" />
                  {hasVoted ? "Vote recorded anonymously" : "Tap an option to cast sample vote"}
                </span>
                <button
                  onClick={onTakeSurvey}
                  className="font-bold text-brand-600 hover:text-brand-700 underline text-xs"
                >
                  View full survey &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
