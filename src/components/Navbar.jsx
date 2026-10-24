import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle2, MapPin, Radio, Video, PlusCircle, Sparkles } from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  presentDistrict, 
  onOpenSurveyModal, 
  onOpenLiveStream, 
  onOpenUploadVideo 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'regional', label: 'District Radar' },
    { id: 'categories', label: 'Categories' },
    { id: 'services', label: 'Our Services' },
  ];

  const handleNavClick = (pageId) => {
    if (pageId === 'regional') {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById('regional-pulse');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('regional-pulse');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const currentDistrictName = presentDistrict?.districtName || "Hyderabad";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-border'
          : 'bg-white border-b border-surface-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none shrink-0"
            aria-label="Now 9 Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-sm transition-transform duration-200 group-hover:scale-105">
              <span>9</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-ink-primary leading-none">
                Now <span className="text-brand-500">9</span>
              </span>
              <span className="text-[11px] font-medium text-ink-secondary tracking-wider uppercase mt-0.5 hidden sm:inline-block">
                Survey & Opinion Platform
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 relative ${
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-brand-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenLiveStream}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <Radio className="w-3.5 h-3.5" />
              <span>Live Stream</span>
            </button>

            <button
              onClick={() => handleNavClick('regional')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 hover:border-brand-400 hover:bg-brand-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>In District: <strong>{currentDistrictName}</strong></span>
            </button>
          </div>

          {/* Mobile Right Bar: Live Pill + Hamburger (Fit within 360px without stretching) */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
            {/* Quick Live Button on Mobile Topbar */}
            <button
              onClick={onOpenLiveStream}
              className="inline-flex items-center gap-1 bg-red-600 active:bg-red-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>Live</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 ml-0.5"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-ink-primary" />
              ) : (
                <Menu className="w-5 h-5 text-ink-primary" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-surface-border px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          {/* Mobile quick actions bar */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLiveStream();
              }}
              className="flex items-center justify-center gap-1.5 bg-red-600 text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-xs active:bg-red-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <Radio className="w-3.5 h-3.5" />
              <span>Go Live Stream</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUploadVideo();
              }}
              className="flex items-center justify-center gap-1.5 bg-brand-50 text-brand-700 border border-brand-200 py-2.5 px-3 rounded-xl text-xs font-bold active:bg-brand-100"
            >
              <Video className="w-3.5 h-3.5 text-brand-600" />
              <span>Upload Video</span>
            </button>
          </div>

          {/* Mobile present district tag */}
          <div className="px-3.5 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs text-ink-secondary font-medium flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              Present District:
            </span>
            <strong className="text-brand-900 font-bold">{currentDistrictName}</strong>
          </div>

          <nav className="flex flex-col space-y-1 pt-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-bold'
                      : 'text-ink-secondary hover:bg-gray-50 hover:text-ink-primary'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
