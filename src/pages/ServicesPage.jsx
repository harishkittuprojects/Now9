import React from 'react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import { servicesData } from '../data/services';
import { CheckCircle2, Shield, BarChart2, Layers } from 'lucide-react';

export default function ServicesPage({ onOpenSurveyModal, setActivePage }) {
  return (
    <div className="py-14 sm:py-20 bg-surface-subtle min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          badge="Platform Capabilities"
          title="Our Services"
          subtitle="Discover how Now 9 conducts research, aggregates public viewpoints, and delivers reliable citizen sentiment for communities and organizations."
        />

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {servicesData.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              delay={idx * 100}
            />
          ))}
        </div>

        {/* Methodology & Quality Assurance Section */}
        <div
          className="max-w-5xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-surface-border shadow-sm mb-16"
          data-aos="fade-up"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-600 tracking-wider uppercase bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Quality & Integrity
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-primary mt-3">
              Built on Trust and Accuracy
            </h3>
            <p className="text-sm sm:text-base text-ink-secondary mt-2">
              Every survey conducted through Now 9 follows strict ethical guidelines to ensure impartial data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-surface-subtle border border-surface-border text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-ink-primary mb-1">Unbiased Questions</h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Neutral wording vetted to prevent leading queries and skewed answers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-subtle border border-surface-border text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-ink-primary mb-1">Aggregated Analytics</h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Public consensus metrics calculated accurately across all sample pools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-subtle border border-surface-border text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-ink-primary mb-1">Open Access</h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Publicly accessible results for transparent citizen empowerment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <CTASection
          onTakeSurvey={() => onOpenSurveyModal()}
          onExploreCategories={() => {
            setActivePage('categories');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

      </div>
    </div>
  );
}
