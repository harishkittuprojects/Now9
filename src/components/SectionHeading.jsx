import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = ""
}) {
  return (
    <div
      className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}
      data-aos="fade-up"
    >
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-3.5`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-ink-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3.5 text-base md:text-lg text-ink-secondary leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
