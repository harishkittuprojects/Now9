import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  Menu, 
  Play, 
  Video, 
  Users, 
  MapPin, 
  Share2, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Music2, 
  Send, 
  Smile, 
  Check, 
  CheckCircle2, 
  Radio, 
  Clock, 
  Eye, 
  Vote, 
  TrendingUp, 
  Sparkles,
  Home,
  FileText,
  Compass
} from 'lucide-react';
import { 
  SURVEY_DATA, 
  TRENDING_NOW, 
  LIVE_DEBATES, 
  SHORT_VIDEOS_FEED, 
  COMMON_PEOPLE_STORIES, 
  AREA_SPECIALS_UPDATES, 
  DEBATE_PANELISTS, 
  LIVE_CHAT_MESSAGES 
} from '../data/nowNineCompleteAppData';

// Phone Status Bar (Cellular, Wifi, Battery without time)
export function PhoneStatusBar() {
  return (
    <div className="h-5 px-4 flex items-center justify-end text-white text-[11px] font-semibold tracking-tight z-30 select-none bg-transparent shrink-0">
      <div className="flex items-center gap-1.5 opacity-90 ml-auto">
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className="w-[2px] h-1 bg-white rounded-2xs"></span>
          <span className="w-[2px] h-1.5 bg-white rounded-2xs"></span>
          <span className="w-[2px] h-2 bg-white rounded-2xs"></span>
          <span className="w-[2px] h-2.5 bg-white rounded-2xs"></span>
        </div>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
          <path d="M12 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-4.9-3.4a7.02 7.02 0 0 1 9.8 0l1.4-1.4a8.98 8.98 0 0 0-12.6 0l1.4 1.4zm-2.8-2.8a11 11 0 0 1 15.4 0l1.4-1.4a12.98 12.98 0 0 0-18.2 0l1.4 1.4z" />
        </svg>
        <div className="flex items-center gap-[1px]">
          <div className="w-4 h-2 rounded-[2.5px] border border-white/80 p-[0.5px] flex items-center">
            <div className="h-full w-full bg-white rounded-[1px]"></div>
          </div>
          <div className="w-[1px] h-0.8 bg-white/70 rounded-r-xs"></div>
        </div>
      </div>
    </div>
  );
}

// Bottom Navigation Bar (Home, Survey, Live, Shorts, Community)
export function BottomNavBar({ activeTab = 'home', onTabChange = () => {} }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'survey', label: 'Survey', icon: FileText },
    { id: 'live-debates', label: 'Live', icon: Radio },
    { id: 'short-videos', label: 'Shorts', icon: Video },
    { id: 'common-people', label: 'Community', icon: Users },
  ];

  return (
    <div className="h-12 border-t border-[#1C1C22] bg-[#0E0E12] px-2 flex items-center justify-around z-30 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-center py-1 px-2 relative transition-all"
          >
            <Icon 
              className={`w-4 h-4 transition-colors ${
                isActive ? 'text-[#F5C754] stroke-[2.5]' : 'text-gray-400 hover:text-gray-200'
              }`} 
            />
            <span className={`text-[9px] mt-0.5 tracking-tight ${
              isActive ? 'text-[#F5C754] font-bold' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Indian Flag SVG
export function IndiaFlag() {
  return (
    <svg className="w-4 h-3 rounded-[2px] overflow-hidden shadow-xs shrink-0" viewBox="0 0 30 20">
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.6" />
      <circle cx="15" cy="10" r="0.5" fill="#000080" />
    </svg>
  );
}

// LOGIN SCREEN
export function ScreenLogin({ onLoginSuccess, onSkipToHome }) {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValues, setOtpValues] = useState(['9', '4', '1', '0']);
  const [touchStartY, setTouchStartY] = useState(null);

  // Swipe up gesture handler for mobile view response
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (touchStartY === null) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    // If user swipes up by > 50px, respond immediately by entering home
    if (deltaY > 50) {
      onSkipToHome();
    }
    setTouchStartY(null);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpStep(true);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-amber-500/25 via-amber-600/10 to-transparent blur-2xl pointer-events-none"></div>

      <PhoneStatusBar />

      {/* Main Content - Fully scrollable and touch responsive */}
      <div className="flex-1 min-h-0 px-4 sm:px-5 py-3 flex flex-col z-10 overflow-y-auto phone-scroll touch-pan-y pb-8">
        {/* Brand Logo & Header */}
        <div className="text-center pt-1 shrink-0">
          {/* Golden 9 Logo */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FDE68A] p-[2px] shadow-lg shadow-amber-500/30 flex items-center justify-center mx-auto mb-1.5">
            <div className="w-full h-full rounded-full bg-[#101014] flex items-center justify-center relative overflow-hidden">
              <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF1B0] via-[#F5C754] to-[#D49022] leading-none">
                9
              </span>
              <div className="absolute right-[22%] top-[34%] w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-[#F5C754]"></div>
            </div>
          </div>

          <h1 className="font-black text-2xl tracking-tight text-white leading-tight">
            now<span className="text-[#F5C754]">nine</span>
          </h1>

          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <span className="text-[9px] font-bold tracking-widest text-gray-300 uppercase">
              YOUR VOTE <span className="text-[#F5C754]">|</span> YOUR VOICE
            </span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-black uppercase">
              LIVE
            </span>
          </div>

          <div className="mt-4 text-left">
            <h2 className="text-base font-extrabold text-white">
              {otpStep ? 'Verify OTP' : 'Login / Register'}
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
              {otpStep 
                ? `Enter the 4-digit code sent to +91 ${phoneNumber}` 
                : 'Enter your mobile number to vote and join live political discussions'}
            </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="py-2.5 my-1 shrink-0">
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-300 block mb-1">
                  Mobile Number
                </label>
                <div className="flex items-center rounded-xl bg-[#141419] border border-[#2A2A35] focus-within:border-amber-400 transition-colors overflow-hidden">
                  <div className="px-2.5 py-2.5 bg-[#1B1B22] border-r border-[#2A2A35] flex items-center gap-1.5 text-xs font-bold text-gray-200">
                    <IndiaFlag />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile"
                    className="flex-1 bg-transparent px-3 py-2.5 text-xs font-bold text-white placeholder-gray-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>Get OTP</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-300 block mb-1">
                  4-Digit OTP Code
                </label>
                <div className="flex items-center justify-between gap-2">
                  {otpValues.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const next = [...otpValues];
                        next[idx] = e.target.value;
                        setOtpValues(next);
                      }}
                      className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-[#141419] border border-amber-400/80 text-center font-black text-lg text-amber-400 focus:outline-none shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 text-[9px]">
                  <span className="text-gray-400">Resend OTP in <strong>28s</strong></span>
                  <button 
                    type="button" 
                    onClick={() => setOtpStep(false)}
                    className="text-[#F5C754] font-bold hover:underline"
                  >
                    Change Number
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>Verify & Enter NowNine</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </form>
          )}

          {/* Social / Guest Options */}
          <div className="mt-3 pt-3 border-t border-[#1C1C24] space-y-2 text-center">
            <button
              type="button"
              onClick={onLoginSuccess}
              className="w-full py-2 px-3 rounded-xl bg-[#14141A] border border-[#252530] text-gray-200 text-xs font-semibold hover:bg-[#1C1C24] transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={onSkipToHome}
              className="text-[10px] font-semibold text-gray-400 hover:text-[#F5C754] transition-colors inline-block mt-1"
            >
              Skip & Continue as Guest →
            </button>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="py-1 text-center shrink-0">
          <p className="text-[8px] text-gray-500 leading-tight">
            🔒 100% Anonymous Voting • Official Citizen Opinion Platform
          </p>
        </div>

        {/* Dynamic Swipe Up or Tap to Explore Indicator */}
        <div 
          onClick={onSkipToHome}
          className="mt-3 py-2 flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-all text-amber-400 shrink-0"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-[#FDE047] shadow-sm animate-bounce-up">
            <span>Swipe up or tap to explore NowNine</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-[-90deg] stroke-[3]" />
          </div>
          <span className="text-[8px] text-gray-500 mt-1">Scroll down to preview live features</span>
        </div>

        {/* Rich Scrollable Preview Section (Guarantees smooth mobile scroll response) */}
        <div className="mt-4 pt-4 border-t border-[#1C1C24] space-y-3.5">
          <div className="text-left">
            <span className="text-[9px] font-extrabold text-[#F5C754] uppercase tracking-wider block">
              What's Inside NowNine
            </span>
            <h3 className="text-xs font-bold text-white mt-0.5">
              India's #1 Citizen Voice & Political Opinion Platform
            </h3>
          </div>

          {/* Live Political Pulse Card */}
          <div 
            onClick={onSkipToHome}
            className="p-3 rounded-2xl bg-[#141419] border border-amber-500/30 shadow-md cursor-pointer hover:border-amber-400 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <span>🗳️</span>
                <span>Live Political Pulse (2026)</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[7px] font-black uppercase">
                Trending
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: 'BJP', percent: '34.2%', color: 'bg-orange-500', width: '34%' },
                { name: 'Congress', percent: '28.7%', color: 'bg-sky-500', width: '29%' },
                { name: 'BRS', percent: '16.8%', color: 'bg-pink-500', width: '17%' },
                { name: 'YSRCP', percent: '8.9%', color: 'bg-emerald-500', width: '9%' },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-2 text-[9px]">
                  <span className="w-14 font-bold text-gray-300">{p.name}</span>
                  <div className="flex-1 h-1.5 bg-[#202028] rounded-full overflow-hidden">
                    <div className={`h-full ${p.color} rounded-full`} style={{ width: p.width }}></div>
                  </div>
                  <span className="w-8 text-right font-mono font-bold text-amber-400">{p.percent}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Debate Spotlight */}
          <div 
            onClick={onSkipToHome}
            className="p-3 rounded-2xl bg-[#141419] border border-[#23232C] hover:border-amber-500/40 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-[10px] font-bold text-white">Live News Debate Stream</span>
              <span className="ml-auto text-[8px] text-gray-400">12.4K Watching</span>
            </div>
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/news_debate_studio.jpg" 
                alt="Debate Studio" 
                className="w-16 h-12 rounded-lg object-cover shrink-0 border border-white/10"
              />
              <div>
                <p className="font-telugu text-[10px] font-bold text-white line-clamp-1">
                  2026 ఎన్నికలు : ఎవరికి అవకాశాలు?
                </p>
                <p className="text-[8px] text-gray-400 mt-0.5">
                  Top Political Analysts & Public Live Q&A
                </p>
              </div>
            </div>
          </div>

          {/* Direct Enter Action */}
          <button
            type="button"
            onClick={onSkipToHome}
            className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer active:scale-[0.99]"
          >
            <span>Enter NowNine Experience</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="w-full pb-1 flex justify-center z-20 shrink-0">
        <div className="w-24 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
}

// 1. SCREEN 1: SPLASH SCREEN
export function Screen1Splash({ onGetStarted }) {
  const [touchStartY, setTouchStartY] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (touchStartY === null) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    if (deltaY > 50) {
      onGetStarted();
    }
    setTouchStartY(null);
  };

  return (
    <div 
      onClick={onGetStarted}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white cursor-pointer select-none"
    >
      {/* Golden top wave decorative glow */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-b from-[#F5C754]/30 via-[#EAB308]/10 to-transparent blur-xl"></div>
      </div>

      <PhoneStatusBar />

      {/* Brand Identity */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-1 z-10 text-center">
        {/* Golden 9 Logo */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FDE68A] p-[2.5px] shadow-lg shadow-amber-500/30 flex items-center justify-center mb-1">
          <div className="w-full h-full rounded-full bg-[#101014] flex items-center justify-center relative overflow-hidden">
            <span className="font-black text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF1B0] via-[#F5C754] to-[#D49022] leading-none">
              9
            </span>
            <div className="absolute right-[22%] top-[34%] w-0 h-0 border-t-[3.5px] border-t-transparent border-b-[3.5px] border-b-transparent border-l-[6px] border-l-[#F5C754]"></div>
          </div>
        </div>

        {/* nownine text */}
        <h1 className="font-black text-3xl tracking-tight text-white leading-none">
          now<span className="text-[#F5C754]">nine</span>
        </h1>

        {/* Subtitle with live badge */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[9px] font-bold tracking-widest text-gray-300 uppercase">
            YOUR VOTE <span className="text-[#F5C754]">|</span> YOUR VOICE
          </span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-extrabold uppercase">
            LIVE
          </span>
        </div>

        {/* Golden Headline Pill */}
        <div className="mt-3 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-500/30">
          <p className="text-[10px] font-bold text-[#FDE047] tracking-tight">
            India's First Political + Community Video App
          </p>
        </div>
      </div>

      {/* Center Parliament Illustration & Crowds */}
      <div className="relative w-full z-10 flex flex-col items-center">
        <div className="relative w-full overflow-hidden flex items-end justify-center">
          <img
            src="/assets/parliament_circular.jpg"
            alt="Sansad Bhavan Illuminated"
            className="w-full h-40 object-cover object-bottom filter contrast-110 brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0D]/70 via-transparent to-transparent"></div>
        </div>

        {/* 5 Feature Icons Row */}
        <div className="w-full px-3 py-2 flex items-center justify-around text-center border-t border-b border-white/5 bg-[#101014]/80">
          {[
            { label: 'Survey', icon: '📝' },
            { label: 'Live Debates', icon: '🎙️' },
            { label: 'Short Videos', icon: '🎬' },
            { label: 'Community', icon: '👥' },
            { label: 'Area Specials', icon: '📍' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-sm">{item.icon}</span>
              <span className="text-[8px] font-medium text-gray-300 mt-0.5">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="p-3 w-full">
          <button
            type="button"
            onClick={onGetStarted}
            className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* iOS Home Bar */}
      <div className="w-full pb-1 flex justify-center z-20">
        <div className="w-24 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
}

// 2. SCREEN 2: HOME SCREEN
export function Screen2Home({ onNavigate }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Top Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <button className="text-gray-300 hover:text-white p-1">
          <Menu className="w-4 h-4 text-[#F5C754]" />
        </button>

        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#B45309] to-[#FDE68A] p-[1px] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center font-black text-[10px] text-[#F5C754]">
              9
            </div>
          </div>
          <span className="font-extrabold text-xs text-white">
            now<span className="text-[#F5C754]">nine</span>
          </span>
        </div>

        <button className="text-gray-300 hover:text-white p-1 relative">
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1"></span>
        </button>
      </div>

      {/* Scrollable Main Area */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-3 pb-6">
        {/* Greeting */}
        <div>
          <h2 className="text-sm font-extrabold text-white">Good Evening!</h2>
          <p className="text-[10px] text-gray-400">Stay informed. Stay ahead.</p>
        </div>

        {/* Hero Card: Political Survey */}
        <div 
          onClick={() => onNavigate('survey')}
          className="relative rounded-2xl p-3 bg-gradient-to-r from-[#1E1B14] via-[#2A2312] to-[#1A1813] border border-amber-500/40 shadow-lg cursor-pointer overflow-hidden group"
        >
          <div className="relative z-10 max-w-[65%]">
            <span className="text-xs font-black text-[#FDE047] block leading-tight">
              Political Survey
            </span>
            <span className="text-[9px] text-gray-300 block mb-2 leading-tight">
              Your Opinion Matters.
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5C754] text-black font-extrabold text-[9px] shadow-sm group-hover:brightness-110">
              <span>Take Survey</span>
              <ChevronRight className="w-3 h-3 stroke-[3]" />
            </span>
          </div>

          {/* Hand dropping ballot icon illustration */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center opacity-85">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
              🗳️
            </div>
          </div>
        </div>

        {/* 4 Feature Tiles Grid (2x2) */}
        <div className="grid grid-cols-2 gap-2">
          {/* Tile 1: Live Debates */}
          <div 
            onClick={() => onNavigate('live-debates')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-1.5">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Live Debates</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Watch • Listen • Discuss</p>
            </div>
          </div>

          {/* Tile 2: Short Videos */}
          <div 
            onClick={() => onNavigate('short-videos')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-1.5">
              <Video className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Short Videos</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Trending • Local • Viral</p>
            </div>
          </div>

          {/* Tile 3: Common People */}
          <div 
            onClick={() => onNavigate('common-people')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-1.5">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Common People</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Real Voices • Real Stories</p>
            </div>
          </div>

          {/* Tile 4: Area Specials */}
          <div 
            onClick={() => onNavigate('area-specials')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Area Specials</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Your Area • Your Updates</p>
            </div>
          </div>
        </div>

        {/* Trending Now Horizontal Carousel */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-white">Trending Now</span>
            <span className="text-[9px] text-[#F5C754] font-semibold cursor-pointer">See All &gt;</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {TRENDING_NOW.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('video-player')}
                className="rounded-xl overflow-hidden bg-[#141418] border border-[#232328] cursor-pointer group"
              >
                <div className="h-16 w-full relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <span className="absolute bottom-1 right-1 text-[8px] px-1 rounded bg-black/60 text-white flex items-center gap-0.5">
                    <Eye className="w-2.5 h-2.5 text-amber-400" />
                    {item.views}
                  </span>
                </div>
                <div className="p-1.5">
                  <p className="font-telugu text-[9px] text-white font-medium line-clamp-1 leading-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavBar activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}

// 3. SCREEN 3: POLITICAL SURVEY SCREEN
export function Screen3Survey({ onBack, onNext }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Header */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <button onClick={onBack} className="p-1 text-gray-300 hover:text-white">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xs font-extrabold text-white leading-tight">
            {SURVEY_DATA.title}
          </h2>
          <p className="text-[8px] text-gray-400 leading-none mt-0.5">
            {SURVEY_DATA.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 px-3 py-3 overflow-y-auto phone-scroll touch-pan-y flex flex-col justify-between pb-6">
        <div>
          {/* Progress Bar & Counter */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-1 bg-[#1F1F26] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#F5C754] to-[#EAB308] rounded-full"
                style={{ width: '20%' }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-gray-400">{SURVEY_DATA.progress}</span>
          </div>

          {/* Question in Telugu */}
          <h3 className="font-telugu text-xs font-bold text-white mb-3 leading-relaxed">
            {SURVEY_DATA.question}
          </h3>

          {/* Options */}
          <div className="space-y-2">
            {SURVEY_DATA.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'border-[#EAB308] bg-[#1C1910] shadow-sm'
                      : 'border-[#222228] bg-[#121216] hover:border-gray-600'
                  }`}
                >
                  {/* Radio circle / checkmark */}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#F5C754] bg-[#F5C754] text-black' : 'border-gray-500'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>

                  <span className={`font-telugu text-[11px] leading-snug ${
                    isSelected ? 'text-white font-semibold' : 'text-gray-300'
                  }`}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-3 border-t border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
        <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-2"></div>
      </div>
    </div>
  );
}

// 4. SCREEN 4: LIVE DEBATES SCREEN
export function Screen4LiveDebates({ onBack, onSelectDebate, onNavigate }) {
  const [filter, setFilter] = useState('live');

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-1.5">
          <button onClick={onBack} className="p-1 text-gray-300 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xs font-extrabold text-white">Live Debates</h2>
        </div>
        <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-extrabold uppercase">
          LIVE
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-2.5 pb-6">
        {/* Main Live Debate Video Card */}
        <div 
          onClick={onSelectDebate}
          className="rounded-2xl overflow-hidden bg-[#141419] border border-red-500/40 shadow-lg cursor-pointer group"
        >
          <div className="relative h-28 w-full overflow-hidden">
            <img 
              src="/assets/news_debate_studio.jpg" 
              alt="Live Debate Studio" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            
            {/* Top Badges */}
            <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between">
              <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[8px] font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                LIVE
              </span>
              <span className="px-1.5 py-0.2 rounded bg-black/60 text-white text-[8px] font-semibold flex items-center gap-0.5">
                <Eye className="w-2.5 h-2.5 text-red-400" />
                12.4K
              </span>
            </div>
          </div>

          <div className="p-2">
            <h3 className="font-telugu text-[11px] font-bold text-white line-clamp-1">
              2026 ఎన్నికలు : ఎవరికి అవకాశాలు?
            </h3>
            <p className="text-[8px] text-gray-400 mt-0.5">
              Political Debate | Experts | Public Opinion
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          {['Live Now', 'Upcoming', 'Past'].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(item.toLowerCase())}
              className={`px-2.5 py-0.8 rounded-full text-[9px] font-bold transition-all ${
                idx === 0 
                  ? 'bg-[#F5C754] text-black shadow-xs' 
                  : 'bg-[#181820] text-gray-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Debates List */}
        <div className="space-y-1.5">
          {LIVE_DEBATES.slice(1).map((item) => (
            <div
              key={item.id}
              onClick={onSelectDebate}
              className="p-1.5 rounded-xl bg-[#141419] border border-[#222228] flex items-center gap-2 cursor-pointer hover:border-gray-600"
            >
              <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                {item.isLive && (
                  <span className="absolute top-0.5 left-0.5 px-1 rounded bg-red-600 text-white text-[7px] font-black">
                    LIVE
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-telugu text-[10px] font-bold text-white truncate">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-[8px] text-gray-400">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {item.time}
                  </span>
                  <span>{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavBar activeTab="live-debates" onTabChange={onNavigate} />
    </div>
  );
}

// 5. SCREEN 5: SHORT VIDEOS FEED SCREEN
export function Screen5ShortVideos({ onBack, onSelectShort, onNavigate }) {
  const [filter, setFilter] = useState('foryou');

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Header */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <button onClick={onBack} className="p-1 text-gray-300 hover:text-white">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xs font-extrabold text-white">Short Videos</h2>
      </div>

      {/* Filter Tabs */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-[#16161C] overflow-x-auto phone-scroll shrink-0">
        {['For You', 'Politics', 'Trending', 'Local'].map((item, idx) => (
          <button
            key={idx}
            className={`px-2.5 py-0.8 rounded-full text-[9px] font-bold shrink-0 transition-all ${
              idx === 0 
                ? 'bg-[#F5C754] text-black shadow-xs' 
                : 'bg-[#16161D] text-gray-400 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Video Cards Feed */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-2 pb-6">
        {SHORT_VIDEOS_FEED.map((item) => (
          <div
            key={item.id}
            onClick={onSelectShort}
            className="rounded-2xl overflow-hidden bg-[#141419] border border-[#23232C] cursor-pointer group relative"
          >
            <div className="relative h-24 w-full overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              
              {/* Duration badge */}
              <span className="absolute top-1.5 right-1.5 px-1 py-0.2 rounded bg-black/60 text-white text-[8px] font-mono">
                {item.duration}
              </span>

              {/* Views badge */}
              <span className="absolute bottom-1.5 right-1.5 text-[8px] text-gray-300 flex items-center gap-0.5">
                <Eye className="w-2.5 h-2.5 text-amber-400" />
                {item.views}
              </span>
            </div>

            <div className="p-2">
              <span className="inline-block px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-400/30 text-[#FDE047] text-[8px] font-bold mb-1">
                {item.badge}
              </span>
              <h3 className="font-telugu text-[10px] font-bold text-white line-clamp-1">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <BottomNavBar activeTab="short-videos" onTabChange={onNavigate} />
    </div>
  );
}

// 6. SCREEN 6: COMMON PEOPLE SCREEN
export function Screen6CommonPeople({ onBack, onSelectStory, onNavigate }) {
  const [filter, setFilter] = useState('all');

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Header */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <button onClick={onBack} className="p-1 text-gray-300 hover:text-white">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xs font-extrabold text-white">Common People</h2>
          <p className="text-[8px] text-[#F5C754] font-medium leading-none mt-0.5">
            Real People • Real Opinions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-[#16161C] overflow-x-auto phone-scroll shrink-0">
        {['All', 'Farmers', 'Students', 'Women'].map((item, idx) => (
          <button
            key={idx}
            className={`px-2.5 py-0.8 rounded-full text-[9px] font-bold shrink-0 transition-all ${
              idx === 0 
                ? 'bg-[#F5C754] text-black shadow-xs' 
                : 'bg-[#16161D] text-gray-400 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Stories List */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-2 pb-6">
        {COMMON_PEOPLE_STORIES.map((item) => (
          <div
            key={item.id}
            onClick={onSelectStory}
            className="p-2 rounded-xl bg-[#141419] border border-[#23232C] flex items-center gap-2.5 cursor-pointer hover:border-gray-600"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-0.5 right-0.5 text-[7px] px-0.8 rounded bg-black/70 text-white font-mono">
                {item.duration}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-telugu text-[10px] font-bold text-white line-clamp-1">
                {item.title}
              </h4>
              <div className="flex items-center justify-between mt-1 text-[8px] text-gray-400">
                <span className="flex items-center gap-1 text-[#F5C754]">
                  <span>{item.icon}</span>
                  <span className="font-semibold">{item.role}</span>
                </span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5" />
                  {item.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavBar activeTab="common-people" onTabChange={onNavigate} />
    </div>
  );
}

// 7. SCREEN 7: AREA SPECIALS SCREEN
export function Screen7AreaSpecials({ onBack, onNavigate }) {
  const [selectedArea, setSelectedArea] = useState('Hyderabad');

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Header */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <button onClick={onBack} className="p-1 text-gray-300 hover:text-white">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xs font-extrabold text-white">Area Specials</h2>
          <p className="text-[8px] text-gray-400 leading-none mt-0.5">
            Your Area • Your Updates
          </p>
        </div>
      </div>

      {/* Area Selector Dropdown Box */}
      <div className="px-3 pt-2 shrink-0">
        <div className="p-2 rounded-xl bg-[#141419] border border-[#23232C]">
          <span className="text-[8px] font-semibold text-gray-400 block mb-0.5">
            Select Your Area
          </span>
          <div className="flex items-center justify-between font-bold text-xs text-white">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#F5C754]" />
              {selectedArea}
            </span>
            <span className="text-gray-400 text-[10px]">▼</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto phone-scroll shrink-0">
        {['All', 'News', 'Events', 'Development', 'Alerts'].map((item, idx) => (
          <button
            key={idx}
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 transition-all ${
              idx === 0 
                ? 'bg-[#F5C754] text-black shadow-xs' 
                : 'bg-[#16161D] text-gray-400 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Area Feed Cards */}
      <div className="flex-1 min-h-0 px-3 py-1 overflow-y-auto phone-scroll touch-pan-y space-y-2 pb-6">
        {AREA_SPECIALS_UPDATES.map((item) => (
          <div
            key={item.id}
            className="p-2 rounded-xl bg-[#141419] border border-[#23232C] flex items-center gap-2.5 cursor-pointer hover:border-gray-600"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`px-1.5 py-0.2 rounded text-[7px] font-extrabold text-white ${item.badgeColor}`}>
                  {item.category}
                </span>
                <span className="text-[8px] text-gray-400">{item.time}</span>
              </div>
              <h4 className="font-telugu text-[10px] font-bold text-white line-clamp-2 leading-tight">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <BottomNavBar activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}

// 8. SCREEN 8: FULLSCREEN SHORT VIDEO PLAYER
export function Screen8ShortVideoPlayer({ onBack }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(8900);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-white select-none">
      {/* Background Fullscreen Video / Photo */}
      <img 
        src="/assets/youth_speaker_mic.jpg" 
        alt="Youth speaker" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <PhoneStatusBar />
        <div className="px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 rounded-full bg-black/40 text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-white drop-shadow">Short Video</span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-semibold text-white flex items-center gap-1 backdrop-blur-xs">
            <MapPin className="w-2.5 h-2.5 text-[#F5C754]" />
            Hyderabad
          </span>
        </div>
      </div>

      {/* Right Floating Interaction Column */}
      <div className="absolute right-2 bottom-16 z-30 flex flex-col items-center gap-3">
        {/* Heart */}
        <button onClick={toggleLike} className="flex flex-col items-center group">
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
            <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${liked ? 'text-red-500 fill-current' : 'text-white'}`} />
          </div>
          <span className="text-[8px] font-bold mt-0.5">{(likesCount / 1000).toFixed(1)}K</span>
        </button>

        {/* Comment */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-[8px] font-bold mt-0.5">432</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
            <Share2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-[8px] font-bold mt-0.5">Share</span>
        </div>

        {/* Save */}
        <button onClick={() => setSaved(!saved)} className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
            <Bookmark className={`w-4 h-4 ${saved ? 'text-amber-400 fill-current' : 'text-white'}`} />
          </div>
          <span className="text-[8px] font-bold mt-0.5">Save</span>
        </button>

        {/* Duration badge */}
        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-black/60 text-gray-300">
          1:20
        </span>
      </div>

      {/* Bottom Video Details Overlay */}
      <div className="absolute left-3 right-14 bottom-3 z-30">
        {/* Author & Follow */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-[9px] text-black">
            9
          </div>
          <span className="text-xs font-bold text-white">@nownine</span>
          <button className="px-2 py-0.5 rounded-full bg-[#F5C754] text-black text-[9px] font-extrabold shadow-sm">
            Follow
          </button>
        </div>

        {/* Telugu Title */}
        <p className="font-telugu text-[11px] font-bold text-white drop-shadow mb-1 leading-snug">
          యువతకు రాజకీయాల్లో అవకాశం ఎంత వరకు?
        </p>

        {/* Hashtags */}
        <p className="text-[9px] text-gray-300 font-medium">
          #Youth #Politics #India #nownine
        </p>

        {/* Audio tag */}
        <div className="flex items-center gap-1.5 mt-1 text-[8px] text-gray-300">
          <Music2 className="w-3 h-3 text-[#F5C754] animate-spin" />
          <span>Original Sound - nownine</span>
        </div>

        {/* Video progress scrubber */}
        <div className="w-full h-0.5 bg-white/30 rounded-full mt-2 overflow-hidden">
          <div className="w-2/5 h-full bg-[#F5C754]"></div>
        </div>
      </div>
    </div>
  );
}

// 9. SCREEN 9: LIVE DEBATE DETAIL / BROADCAST PLAYER
export function Screen9LiveDebateDetail({ onBack }) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(LIVE_CHAT_MESSAGES);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        user: 'You',
        text: chatInput,
        time: 'Just now',
        avatarBg: 'bg-emerald-600'
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 text-gray-300 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xs font-extrabold text-white">Live Debate</h2>
        </div>
        <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-extrabold uppercase">
          LIVE
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto phone-scroll touch-pan-y pb-6">
        {/* Video Player */}
        <div className="relative w-full h-36 bg-black overflow-hidden shrink-0">
          <img 
            src="/assets/news_debate_studio.jpg" 
            alt="Live Debate Broadcast" 
            className="w-full h-full object-cover"
          />
          {/* Top Badges */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
            <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[8px] font-extrabold flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              LIVE
            </span>
            <span className="px-1.5 py-0.2 rounded bg-black/60 text-white text-[8px] font-semibold flex items-center gap-0.5">
              <Eye className="w-2.5 h-2.5 text-red-400" />
              12.4K
            </span>
          </div>
        </div>

        {/* Debate Title & Meta */}
        <div className="p-3 border-b border-[#1A1A22]">
          <h3 className="font-telugu text-xs font-bold text-white leading-snug">
            2026 ఎన్నికలు : ఎవరికి అవకాశాలు?
          </h3>
          <p className="text-[9px] text-gray-400 mt-0.5">
            Political Debate | Experts | Public Opinion
          </p>
          <div className="flex items-center gap-2 text-[8px] text-gray-400 mt-1">
            <span className="flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5 text-amber-400" />
              Today, 07:30 PM
            </span>
            <span>•</span>
            <span>Live from Hyderabad</span>
          </div>
        </div>

        {/* Panelists Horizontal Scroll */}
        <div className="p-3 border-b border-[#1A1A22]">
          <span className="text-[10px] font-bold text-white block mb-1.5">
            Panelists
          </span>
          <div className="flex items-center gap-3 overflow-x-auto phone-scroll pb-1">
            {DEBATE_PANELISTS.map((panelist) => (
              <div key={panelist.id} className="flex flex-col items-center text-center shrink-0 w-16">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${panelist.color} flex items-center justify-center font-bold text-xs text-white shadow-sm mb-1`}>
                  {panelist.name.charAt(0)}
                </div>
                <span className="text-[9px] font-bold text-white truncate w-full">
                  {panelist.name}
                </span>
                <span className="text-[7px] text-gray-400 truncate w-full">
                  {panelist.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat Stream */}
        <div className="p-3">
          <span className="text-[10px] font-bold text-white block mb-1.5 flex items-center gap-1">
            <span>Live Chat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </span>

          <div className="space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <div className={`w-5 h-5 rounded-full ${msg.avatarBg} flex items-center justify-center text-[8px] font-bold text-white shrink-0`}>
                  {msg.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-[#F5C754]">{msg.user}</span>
                    <span className="text-[7px] text-gray-500">{msg.time}</span>
                  </div>
                  <p className="font-telugu text-[9px] text-gray-200 leading-tight">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Live Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="p-2 border-t border-[#1C1C22] bg-[#0E0E12] flex items-center gap-1.5 shrink-0">
        <button type="button" className="text-gray-400 hover:text-white p-1">
          <Smile className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[#181820] border border-[#262630] rounded-full px-3 py-1 text-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
        />
        <button 
          type="submit" 
          className="w-7 h-7 rounded-full bg-[#F5C754] text-black flex items-center justify-center shrink-0 hover:brightness-110 shadow-xs cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

// Phone Chassis Wrap
export function PhoneFrame({ children, title = null, stepBadge = null, isCard = false, onClick = null }) {
  if (isCard) {
    return (
      <div className="flex flex-col items-center">
        {title && (
          <div className="mb-2 text-center flex items-center gap-1.5">
            {stepBadge && (
              <span className="w-4 h-4 rounded-full bg-[#EAB308] text-black font-black text-[10px] flex items-center justify-center">
                {stepBadge}
              </span>
            )}
            <span className="text-xs font-bold text-gray-300">
              {title}
            </span>
          </div>
        )}

        <div 
          onClick={onClick}
          className="relative rounded-[32px] p-[4px] bg-gradient-to-b from-[#383328] via-[#1B1B1F] to-[#2E2818] shadow-2xl border border-[#48402A]/70 w-[216px] h-[440px] hover:scale-[1.02] cursor-pointer transition-transform"
        >
          <div className="w-full h-full rounded-[28px] overflow-hidden bg-[#0A0A0D] border border-black/80 relative">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-0 flex flex-col items-center justify-center">
      {/* Responsive Phone Chassis */}
      <div 
        className="relative w-full max-w-[430px] h-[100dvh] max-h-[100dvh] sm:h-[min(730px,calc(100vh-80px))] sm:w-[350px] sm:rounded-[42px] sm:p-[6px] sm:bg-gradient-to-b sm:from-[#3E382A] sm:via-[#1E1E22] sm:to-[#322B1C] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] sm:border sm:border-[#52482E]/80 transition-all duration-300 flex flex-col min-h-0"
      >
        {/* Dynamic Island / Notch (Desktop only) */}
        <div className="hidden sm:flex absolute top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-40 items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#111116] ml-6"></div>
        </div>

        {/* Screen Container */}
        <div className="w-full h-full min-h-0 sm:rounded-[36px] overflow-hidden bg-[#0A0A0D] sm:border sm:border-black/90 relative flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
