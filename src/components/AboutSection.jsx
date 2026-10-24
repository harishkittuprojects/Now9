import React from 'react';
import SectionHeading from './SectionHeading';
import { Target, MessageSquare, TrendingUp, Users } from 'lucide-react';

export default function AboutSection({ onExploreCategories }) {
  const highlights = [
    {
      icon: Target,
      title: "Objective Purpose",
      description: "Now 9 exists to give everyday people an open and transparent channel to express their views on matters of public importance."
    },
    {
      icon: MessageSquare,
      title: "Diverse Dialogue",
      description: "From crucial government policies to everyday common talks, we encompass the questions that shape daily society."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Reflection",
      description: "See how your perspectives compare with thousands of fellow citizens across cities, communities, and backgrounds."
    }
  ];

  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Mission */}
          <div className="lg:col-span-6" data-aos="fade-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              <span>About Now 9</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight leading-tight mb-6">
              Empowering Public Voices, One Survey at a Time.
            </h2>
            
            <div className="space-y-4 text-ink-secondary text-base leading-relaxed">
              <p>
                <strong>Now 9</strong> is a modern survey and public opinion platform designed to make civic participation accessible to everyone. We believe that healthy communities and governments thrive when opinions are gathered with integrity, simplicity, and trust.
              </p>
              <p>
                Whether it is a critical national election policy or common everyday life discussions, Now 9 provides structured, bite-sized questionnaires that empower people to vote, compare perspectives, and stay informed on public sentiment.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onExploreCategories}
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
              >
                <span>Learn More About Categories</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-6 space-y-4" data-aos="fade-up">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-subtle border border-surface-border hover:border-brand-300 transition-all duration-200 flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-surface-border flex items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink-primary mb-1 group-hover:text-brand-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
