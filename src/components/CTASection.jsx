import React from 'react';
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function CTASection({ onTakeSurvey, onExploreCategories }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative bg-brand-500 rounded-3xl overflow-hidden px-8 py-14 sm:px-14 sm:py-16 text-center text-white shadow-xl shadow-brand-500/20"
          data-aos="zoom-in"
        >
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-brand-400/30 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-brand-600/40 blur-2xl pointer-events-none"></div>

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Make Your Voice Count Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Ready to Share Your Opinion with the World?
            </h2>

            <p className="text-brand-50 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of everyday citizens who share their viewpoints on politics, society, and everyday life on Now 9. Fast, simple, and impactful.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onTakeSurvey}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 text-base hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-500"
              >
                <span>Take a Survey</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreCategories}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl border border-white/40 transition-all duration-200 text-base focus:outline-none"
              >
                <span>Explore Categories</span>
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>100% Anonymous & Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>Takes less than 3 minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>Real-time public results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
