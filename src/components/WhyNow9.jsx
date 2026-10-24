import React from 'react';
import SectionHeading from './SectionHeading';
import { UserCheck, Globe, Zap, LayoutGrid, HeartHandshake } from 'lucide-react';

export default function WhyNow9() {
  const advantages = [
    {
      title: "Easy Participation",
      description: "No lengthy signups or intrusive hurdles. Hop into any survey and make your voice count in minutes.",
      icon: UserCheck
    },
    {
      title: "Genuine Public Opinion",
      description: "Unfiltered, balanced viewpoints gathered from everyday citizens to reflect real societal pulse.",
      icon: Globe
    },
    {
      title: "Simple & Clean Surveys",
      description: "Intuitive questions designed for clarity and speed, free of confusing jargon or bias.",
      icon: Zap
    },
    {
      title: "Organized Topics",
      description: "Structured into dedicated spheres like Politics and Common Talks so you can focus on what matters to you.",
      icon: LayoutGrid
    },
    {
      title: "User-Friendly Experience",
      description: "Modern, clutter-free interface optimized for seamless use on smartphones, tablets, and computers.",
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-20 bg-white" id="why-now-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="Why Now 9"
          subtitle="We are reimagining public opinion surveys to be transparent, accessible, and respectful of your time."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-surface-border hover-card-lift flex flex-col justify-between group"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-5 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-primary mb-2.5">
                    {adv.title}
                  </h3>
                  <p className="text-ink-secondary text-sm md:text-base leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Trust & Privacy Highlight */}
          <div
            className="bg-brand-50/60 rounded-2xl p-7 border border-brand-200 flex flex-col justify-between hover-card-lift"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white mb-4">
                <span>Trust First</span>
              </div>
              <h3 className="text-xl font-bold text-ink-primary mb-2.5">
                Anonymous & Secure
              </h3>
              <p className="text-ink-secondary text-sm md:text-base leading-relaxed">
                Your privacy is paramount. Responses are aggregated anonymously so you can share your honest opinion without hesitation.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-brand-700">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              <span>100% Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
