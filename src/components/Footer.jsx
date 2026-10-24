import React from 'react';
import { ArrowUp, ShieldCheck, Mail, Globe } from 'lucide-react';

export default function Footer({ setActivePage, onOpenSurveyModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-surface-border pt-16 pb-12 text-ink-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-surface-borderLight">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-black text-xl shadow-xs">
                <span>9</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-ink-primary">
                Now <span className="text-brand-500">9</span>
              </span>
            </div>

            <p className="text-ink-secondary text-sm leading-relaxed max-w-sm">
              Now 9 is an independent, modern survey and public opinion platform empowering citizens to express their views on politics, governance, society, and everyday conversations.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-brand-700">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>Independent • Unbiased • Anonymous</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-ink-secondary hover:text-brand-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('categories')}
                  className="text-ink-secondary hover:text-brand-600 transition-colors"
                >
                  Survey Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-ink-secondary hover:text-brand-600 transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSurveyModal}
                  className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                >
                  Take a Survey &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Survey Categories Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary">
              Core Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('categories')}
                  className="text-ink-secondary hover:text-brand-600 transition-colors flex items-center justify-between w-full max-w-xs"
                >
                  <span>Politics & Governance</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">14 live</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('categories')}
                  className="text-ink-secondary hover:text-brand-600 transition-colors flex items-center justify-between w-full max-w-xs"
                >
                  <span>Common Talks & Lifestyle</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">22 live</span>
                </button>
              </li>
              <li className="pt-2 text-xs text-ink-secondary">
                New survey categories and specialized topics are added regularly based on user requests.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-secondary">
          <p>© {new Date().getFullYear()} Now 9 Survey Platform. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="hover:text-ink-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-ink-primary transition-colors cursor-pointer">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-ink-secondary hover:text-brand-600 font-medium transition-colors p-1"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
