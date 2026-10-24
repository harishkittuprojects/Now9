import React from 'react';
import SectionHeading from './SectionHeading';
import { Layers, ListChecks, HelpCircle, Send } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose a Category",
      description: "Pick between Politics or Common Talks based on topics that interest you.",
      icon: Layers
    },
    {
      number: "02",
      title: "Select a Survey",
      description: "Browse active public opinion surveys covering current issues and trends.",
      icon: ListChecks
    },
    {
      number: "03",
      title: "Answer the Questions",
      description: "Complete simple, objective questions designed for quick and honest participation.",
      icon: HelpCircle
    },
    {
      number: "04",
      title: "Submit Your Opinion",
      description: "Share your voice instantly and review aggregated public perspectives.",
      icon: Send
    }
  ];

  return (
    <section className="py-20 bg-surface-subtle border-y border-surface-border" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Seamless Process"
          title="How It Works"
          subtitle="Participating in public opinion research on Now 9 is straightforward, anonymous, and takes only a few minutes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-7 border border-surface-border hover-card-lift flex flex-col justify-between relative group"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-gray-300 group-hover:text-brand-500 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-ink-primary mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-ink-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-borderLight flex items-center gap-2 text-xs font-semibold text-brand-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
