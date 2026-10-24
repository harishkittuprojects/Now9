import React from 'react';
import { BarChart3, Vote, MessagesSquare, FolderCheck, Check } from 'lucide-react';

export default function ServiceCard({ service, delay = 0 }) {
  const renderIcon = () => {
    switch (service.iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-brand-600" />;
      case 'Vote':
        return <Vote className="w-6 h-6 text-brand-600" />;
      case 'MessagesSquare':
        return <MessagesSquare className="w-6 h-6 text-brand-600" />;
      case 'FolderCheck':
      default:
        return <FolderCheck className="w-6 h-6 text-brand-600" />;
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border border-surface-border p-8 hover-card-lift flex flex-col justify-between group"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
            {renderIcon()}
          </div>
          {service.highlight && (
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
              {service.highlight}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-ink-primary mb-3 group-hover:text-brand-600 transition-colors">
          {service.title}
        </h3>

        <p className="text-ink-secondary text-sm md:text-base leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Feature bullets */}
        <div className="space-y-2.5 pt-4 border-t border-surface-borderLight">
          {service.details.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm text-ink-secondary">
              <span className="w-4 h-4 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
