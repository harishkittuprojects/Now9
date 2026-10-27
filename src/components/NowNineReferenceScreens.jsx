import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  ChevronDown,
  Bell, 
  Menu, 
  Play, 
  Pause,
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
  Compass,
  X,
  Volume2,
  VolumeX,
  ThumbsUp,
  User,
  LogOut,
  Globe,
  ShieldCheck,
  RotateCcw,
  Mic,
  MicOff
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
import { SURVEY_QUESTIONS, PARTIES } from '../data/nowNineAppFlowData';

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
export function ScreenLogin({ onLoginSuccess, onSkipToHome, onNavigate = null }) {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValues, setOtpValues] = useState(['9', '4', '1', '0']);
  const [touchStartY, setTouchStartY] = useState(null);
  const [resendTimer, setResendTimer] = useState(28);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

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
      showToast(`OTP 9410 sent to +91 ${phoneNumber}!`);
    }
  };

  const handleResendOtp = () => {
    setResendTimer(30);
    showToast(`New OTP 9410 resent to +91 ${phoneNumber}!`);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    showToast('Verified! Welcome to NowNine.');
    setTimeout(() => onLoginSuccess(), 400);
  };

  const handleGoogleLogin = () => {
    showToast('Signing in with Google Account...');
    setTimeout(() => onLoginSuccess(), 500);
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

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute top-7 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

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
                  {phoneNumber.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setPhoneNumber('')}
                      className="px-2.5 text-gray-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
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
                  <button 
                    type="button" 
                    onClick={handleResendOtp}
                    className="text-gray-400 hover:text-amber-300 font-medium cursor-pointer"
                  >
                    Resend OTP in <strong className="text-amber-400">{resendTimer}s</strong>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setOtpStep(false)}
                    className="text-[#F5C754] font-bold hover:underline cursor-pointer"
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
              onClick={handleGoogleLogin}
              className="w-full py-2 px-3 rounded-xl bg-[#14141A] border border-[#252530] text-gray-200 text-xs font-semibold hover:bg-[#1C1C24] transition-colors flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
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
              className="text-[10px] font-semibold text-gray-400 hover:text-[#F5C754] transition-colors inline-block mt-1 cursor-pointer"
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
            onClick={() => onNavigate ? onNavigate('survey') : onSkipToHome()}
            className="p-3 rounded-2xl bg-[#141419] border border-amber-500/30 shadow-md cursor-pointer hover:border-amber-400 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <span>🗳️</span>
                <span>Live Political Pulse (2026)</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[7px] font-black uppercase">
                Take Poll →
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
            onClick={() => onNavigate ? onNavigate('live-debates') : onSkipToHome()}
            className="p-3 rounded-2xl bg-[#141419] border border-[#23232C] hover:border-amber-500/40 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-[10px] font-bold text-white">Live News Debate Stream</span>
              <span className="ml-auto text-[8px] text-amber-400 font-semibold group-hover:underline">Watch Live →</span>
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
            onClick={() => onNavigate ? onNavigate('home') : onSkipToHome()}
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
export function Screen1Splash({ onGetStarted, onNavigate = null }) {
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
            { label: 'Survey', icon: '📝', id: 'survey' },
            { label: 'Live Debates', icon: '🎙️', id: 'live-debates' },
            { label: 'Short Videos', icon: '🎬', id: 'short-videos' },
            { label: 'Community', icon: '👥', id: 'common-people' },
            { label: 'Area Specials', icon: '📍', id: 'area-specials' },
          ].map((item, idx) => (
            <button 
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigate) onNavigate(item.id);
                else onGetStarted();
              }}
              className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all p-1 cursor-pointer"
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-[8px] font-medium text-gray-300 mt-0.5">{item.label}</span>
            </button>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [appLang, setAppLang] = useState('తెలుగు');
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Live Debate: 2026 ఎన్నికలు - ఎవరికి అవకాశాలు?', subtitle: '12.4K watching now', time: 'Just now', target: 'debate-detail', isUnread: true },
    { id: 2, title: 'Political Survey: 12,400+ Citizens Voted', subtitle: 'Cast your vote on governance & leadership', time: '1h ago', target: 'survey', isUnread: true },
    { id: 3, title: 'Trending Voice: యువతకు ఉద్యోగాలు ఎలా వస్తాయి?', subtitle: '8.9K likes on local voice debate', time: '3h ago', target: 'video-player', isUnread: false },
  ]);

  const unreadCount = notifs.filter(n => n.isUnread).length;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Top Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0 z-30">
        <button 
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-4 h-4 text-[#F5C754]" />
        </button>

        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#B45309] to-[#FDE68A] p-[1px] flex items-center justify-center shadow-xs">
            <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center font-black text-[10px] text-[#F5C754]">
              9
            </div>
          </div>
          <span className="font-extrabold text-xs text-white">
            now<span className="text-[#F5C754]">nine</span>
          </span>
        </div>

        <button 
          type="button"
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="text-gray-300 hover:text-white p-1 relative rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-0.5 right-0.5 ring-2 ring-[#0E0E12] animate-pulse"></span>
          )}
        </button>
      </div>

      {/* Notifications Dropdown Panel */}
      {isNotifOpen && (
        <div className="absolute top-12 left-2 right-2 z-50 bg-[#14141A] border border-[#2A2A35] rounded-2xl shadow-2xl p-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#22222E]">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-black">
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={() => setNotifs(prev => prev.map(n => ({ ...n, isUnread: false })))}
                className="text-[9px] text-[#F5C754] hover:underline font-semibold cursor-pointer"
              >
                Mark read
              </button>
              <button 
                type="button"
                onClick={() => setIsNotifOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="mt-2 space-y-1.5 max-h-56 overflow-y-auto phone-scroll">
            {notifs.map((n) => (
              <div 
                key={n.id}
                onClick={() => {
                  onNavigate(n.target);
                  setIsNotifOpen(false);
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col gap-0.5 ${
                  n.isUnread ? 'bg-[#1C1A14] border-amber-500/30' : 'bg-[#101014] border-[#222228] opacity-80'
                }`}
              >
                <span className="text-[10px] font-bold text-white leading-tight">{n.title}</span>
                <span className="text-[8px] text-gray-400">{n.subtitle}</span>
                <span className="text-[7px] text-amber-400/80 mt-0.5 font-mono">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Side Drawer */}
      {isMenuOpen && (
        <div className="absolute inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
          ></div>

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-[280px] h-full bg-[#121217] border-r border-[#262632] flex flex-col justify-between p-4 z-10">
            <div>
              {/* Profile Card */}
              <div className="flex items-center justify-between pb-3 border-b border-[#22222E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B45309] to-[#FDE68A] p-[1.5px] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center font-black text-xs text-[#F5C754]">
                      9
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-white">NowNine Citizen</h3>
                    <p className="text-[8px] text-amber-400 font-semibold flex items-center gap-1">
                      <span>Verified Voter</span>
                      <span>🇮🇳</span>
                    </p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-3 space-y-1">
                {[
                  { label: 'Political Survey', icon: FileText, target: 'survey', color: 'text-amber-400' },
                  { label: 'Live Debates', icon: Radio, target: 'live-debates', color: 'text-red-400' },
                  { label: 'Short Videos', icon: Video, target: 'short-videos', color: 'text-amber-400' },
                  { label: 'Common People Voice', icon: Users, target: 'common-people', color: 'text-sky-400' },
                  { label: 'Area Specials', icon: MapPin, target: 'area-specials', color: 'text-emerald-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.target}
                      type="button"
                      onClick={() => {
                        onNavigate(item.target);
                        setIsMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-xl flex items-center gap-2.5 text-left text-xs font-semibold text-gray-200 hover:bg-[#1A1A24] hover:text-white transition-colors cursor-pointer"
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Settings & Info */}
              <div className="pt-2 border-t border-[#22222E] space-y-1 text-[10px] text-gray-400">
                <button 
                  type="button"
                  onClick={() => {
                    const next = appLang === 'తెలుగు' ? 'ENG' : 'తెలుగు';
                    setAppLang(next);
                  }}
                  className="w-full p-2 rounded-xl bg-[#181820] hover:bg-[#20202A] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium text-gray-300">
                    <Globe className="w-3 h-3 text-[#F5C754]" />
                    <span>Language / భాష</span>
                  </span>
                  <span className="font-bold text-[#F5C754] text-[9px] bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
                    {appLang} (Tap to change)
                  </span>
                </button>
                <div className="p-2 rounded-xl bg-[#181820] flex items-center gap-1.5 text-gray-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="text-[9px] leading-tight">100% Anonymous & Secure Voting</span>
                </div>
              </div>
            </div>

            {/* Logout / Switch Account */}
            <button
              type="button"
              onClick={() => {
                onNavigate('login');
                setIsMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-red-600/15 border border-red-500/30 text-red-400 hover:bg-red-600/25 transition-colors text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Account / Exit</span>
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Main Area */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-3 pb-16">
        {/* Greeting */}
        <div>
          <h2 className="text-sm font-extrabold text-white">Good Evening!</h2>
          <p className="text-[10px] text-gray-400">Stay informed. Stay ahead.</p>
        </div>

        {/* Hero Card: Political Survey */}
        <div 
          onClick={() => onNavigate('survey')}
          className="relative rounded-2xl p-3 bg-gradient-to-r from-[#1E1B14] via-[#2A2312] to-[#1A1813] border border-amber-500/40 shadow-lg cursor-pointer overflow-hidden group hover:border-amber-400 transition-all"
        >
          <div className="relative z-10 max-w-[65%]">
            <span className="text-xs font-black text-[#FDE047] block leading-tight">
              Political Survey
            </span>
            <span className="text-[9px] text-gray-300 block mb-2 leading-tight">
              Your Opinion Matters.
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('survey');
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5C754] text-black font-extrabold text-[9px] shadow-sm group-hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <span>Take Survey</span>
              <ChevronRight className="w-3 h-3 stroke-[3]" />
            </button>
          </div>

          {/* Hand dropping ballot icon illustration */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center opacity-85 group-hover:scale-110 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
              🗳️
            </div>
          </div>
        </div>

        {/* 4 Feature Tiles Grid (2x2) */}
        <div className="grid grid-cols-2 gap-2">
          {/* Tile 1: Live Debates */}
          <button 
            type="button"
            onClick={() => onNavigate('live-debates')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between text-left group active:scale-[0.98]"
          >
            <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-1.5 group-hover:scale-105 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Live Debates</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Watch • Listen • Discuss</p>
            </div>
          </button>

          {/* Tile 2: Short Videos */}
          <button 
            type="button"
            onClick={() => onNavigate('short-videos')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between text-left group active:scale-[0.98]"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-1.5 group-hover:scale-105 transition-transform">
              <Video className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Short Videos</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Trending • Local • Viral</p>
            </div>
          </button>

          {/* Tile 3: Common People */}
          <button 
            type="button"
            onClick={() => onNavigate('common-people')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between text-left group active:scale-[0.98]"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-1.5 group-hover:scale-105 transition-transform">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Common People</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Real Voices • Real Stories</p>
            </div>
          </button>

          {/* Tile 4: Area Specials */}
          <button 
            type="button"
            onClick={() => onNavigate('area-specials')}
            className="p-2.5 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between text-left group active:scale-[0.98]"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-1.5 group-hover:scale-105 transition-transform">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] text-white leading-tight">Area Specials</h3>
              <p className="text-[8px] text-gray-400 mt-0.5">Your Area • Your Updates</p>
            </div>
          </button>
        </div>

        {/* Trending Now Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-white">Trending Now</span>
            <button 
              type="button"
              onClick={() => onNavigate('short-videos')}
              className="text-[9px] text-[#F5C754] font-semibold hover:underline cursor-pointer"
            >
              See All &gt;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {TRENDING_NOW.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('video-player')}
                className="rounded-xl overflow-hidden bg-[#141418] border border-[#232328] hover:border-amber-500/40 cursor-pointer group transition-all"
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

        {/* Live Debate Spotlight Section */}
        <div 
          onClick={() => onNavigate('live-debates')}
          className="p-3 rounded-2xl bg-gradient-to-r from-[#1A1212] via-[#241414] to-[#161214] border border-red-500/30 hover:border-red-500/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>Today's Big Debate (7:30 PM)</span>
            </span>
            <span className="text-[8px] text-red-400 font-semibold group-hover:underline">Join &gt;</span>
          </div>
          <p className="font-telugu text-[10px] font-bold text-white leading-snug">
            2026 ఎన్నికలు : ఎవరికి అవకాశాలు?
          </p>
          <p className="text-[8px] text-gray-400 mt-0.5">
            4 Panelists • Live Chat Stream Active
          </p>
        </div>
      </div>

      <BottomNavBar activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}

// 3. SCREEN 3: POLITICAL SURVEY SCREEN (Full 5-Question Flow + Live Results)
export function Screen3Survey({ onBack, onFinish, onNavigate = null }) {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 4
  const [answers, setAnswers] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const activeQuestion = SURVEY_QUESTIONS[currentStep] || SURVEY_QUESTIONS[0];
  const progressPercent = ((currentStep + 1) / SURVEY_QUESTIONS.length) * 100;
  const selectedOptionIdx = answers[currentStep] ?? 0;

  const handleSelectOption = (idx) => {
    setAnswers(prev => ({ ...prev, [currentStep]: idx }));
  };

  const handleNext = () => {
    if (currentStep < SURVEY_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitted(true);
      showToast('🎉 మీ ఓటు విజయవంతంగా నమోదైంది! (Vote Recorded)');
    }
  };

  const handlePrev = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
    } else if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleResetSurvey = () => {
    setCurrentStep(0);
    setIsSubmitted(false);
    showToast('సర్వే పునఃప్రారంభించబడింది (Survey Reset)');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-7 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={handlePrev} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
            title="Go Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-extrabold text-white leading-tight">
              {isSubmitted ? 'సర్వే ఫలితాలు (Survey Results)' : 'Political Survey'}
            </h2>
            <p className="text-[8px] text-gray-400 leading-none mt-0.5">
              {isSubmitted ? 'Official Citizen Sentiment 2026' : `Question ${currentStep + 1} of 5 • Your Opinion Matters`}
            </p>
          </div>
        </div>

        {/* Live Vote Count Badge */}
        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[#FDE047] text-[8px] font-extrabold flex items-center gap-1">
          <Vote className="w-2.5 h-2.5 text-amber-400" />
          <span>12.4K Voted</span>
        </span>
      </div>

      {/* Main Body */}
      {!isSubmitted ? (
        <div className="flex-1 min-h-0 px-3 py-3 overflow-y-auto phone-scroll touch-pan-y flex flex-col justify-between pb-4">
          <div>
            {/* Progress Bar & Counter */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-1.5 bg-[#1F1F26] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#F5C754] to-[#EAB308] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 font-mono">
                {currentStep + 1} / 5
              </span>
            </div>

            {/* Step Category Badge */}
            <div className="mb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#181820] border border-[#2A2A35] text-[9px] font-bold text-gray-300 inline-block">
                {currentStep === 0 && '🎯 ప్రాధాన్యత (Priority)'}
                {currentStep === 1 && '⭐ నచ్చిన అంశం (Best Quality)'}
                {currentStep === 2 && '📈 ఆశించిన మార్పు (Expectations)'}
                {currentStep === 3 && '🤝 విశ్వాసం (Trust Factor)'}
                {currentStep === 4 && '🗳️ తుది నిర్ణయం (Final Decision)'}
              </span>
            </div>

            {/* Question in Telugu */}
            <h3 className="font-telugu text-[13px] font-bold text-white mb-3.5 leading-snug">
              {activeQuestion.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2">
              {activeQuestion.options.map((optionText, idx) => {
                const isSelected = selectedOptionIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'border-[#EAB308] bg-[#1E1A10] shadow-md shadow-amber-500/10'
                        : 'border-[#222228] bg-[#121216] hover:border-gray-600'
                    }`}
                  >
                    {/* Radio circle / checkmark */}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'border-[#F5C754] bg-[#F5C754] text-black font-black' : 'border-gray-500 bg-[#16161C]'
                    }`}>
                      {isSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <span className="text-[8px] text-gray-400">{idx + 1}</span>}
                    </div>

                    <span className={`font-telugu text-[11px] leading-snug flex-1 ${
                      isSelected ? 'text-white font-bold' : 'text-gray-300'
                    }`}>
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav Buttons Row */}
          <div className="pt-3 flex items-center gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="py-2.5 px-3 rounded-full bg-[#16161D] border border-[#2B2B36] text-gray-300 font-bold text-xs hover:bg-[#202028] hover:text-white transition-all cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>{currentStep === 4 ? 'Submit Answers 🗳️' : 'Next Question'}</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      ) : (
        /* Submitted Live Results View */
        <div className="flex-1 min-h-0 px-3 py-3 overflow-y-auto phone-scroll touch-pan-y space-y-3 pb-4">
          <div className="text-center p-3 rounded-2xl bg-gradient-to-b from-[#1E1B12] to-[#121217] border border-amber-500/40 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center mx-auto mb-1.5 shadow-inner">
              <CheckCircle2 className="w-5 h-5 text-[#F5C754]" />
            </div>
            <h3 className="font-telugu text-xs font-bold text-white">
              ధన్యవాదాలు! మీ అభిప్రాయం రికార్డయింది.
            </h3>
            <p className="text-[9px] text-gray-400 mt-0.5">
              Your anonymous opinion has been added to the 2026 People's Pulse.
            </p>
          </div>

          {/* Party Breakdown Bars */}
          <div className="p-3 rounded-2xl bg-[#141419] border border-[#23232C] space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#202028]">
              <span className="text-[10px] font-bold text-white">Live Party Standings</span>
              <span className="text-[8px] text-amber-400 font-mono">12,418 Votes</span>
            </div>

            {PARTIES.map((party) => (
              <div key={party.id} className="space-y-0.5">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-bold text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: party.color }}></span>
                    <span>{party.name}</span>
                    <span className="text-[8px] text-gray-400">({party.teluguName.slice(0, 8)}...)</span>
                  </span>
                  <span className="font-mono font-bold text-amber-400">{party.resultPercent}%</span>
                </div>
                <div className="h-1.5 bg-[#1F1F28] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${party.resultPercent}%`, backgroundColor: party.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleResetSurvey}
              className="w-full py-2.5 px-3 rounded-xl bg-[#181822] border border-[#2E2E3C] text-gray-200 hover:text-white hover:border-amber-400/50 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Vote Again / Edit Responses</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('home') : onBack()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Explore NowNine Home</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      <BottomNavBar activeTab="survey" onTabChange={onNavigate || onBack} />
    </div>
  );
}

// 4. SCREEN 4: LIVE DEBATES SCREEN
export function Screen4LiveDebates({ onBack, onSelectDebate, onNavigate }) {
  const [filter, setFilter] = useState('Live Now');
  const [reminders, setReminders] = useState({});
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const [speakerTopic, setSpeakerTopic] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleReminder = (e, id, title) => {
    e.stopPropagation();
    const next = !reminders[id];
    setReminders(prev => ({ ...prev, [id]: next }));
    showToast(next ? `🔔 Reminder set for: ${title}` : `Reminder cancelled`);
  };

  const handleSpeakerApply = (e) => {
    e.preventDefault();
    if (!speakerTopic.trim()) return;
    setIsSpeakerModalOpen(false);
    setSpeakerTopic('');
    showToast('🎙️ Speaker application sent to Moderator! You will be queued.');
  };

  // Filter logic
  const filteredDebates = LIVE_DEBATES.filter(item => {
    if (filter === 'Live Now') return item.isLive;
    if (filter === 'Upcoming') return !item.isLive;
    return true; // 'Past'
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-7 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Speaker Application Modal */}
      {isSpeakerModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full bg-[#14141A] border border-[#2B2B38] rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#22222E]">
              <div className="flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white">Apply to Speak in Live Debate</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsSpeakerModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-gray-300">
              Citizens can speak directly with analysts and leaders on live broadcast.
            </p>

            <form onSubmit={handleSpeakerApply} className="space-y-2.5">
              <div>
                <label className="text-[9px] font-bold text-gray-400 block mb-1">
                  Your Name / నియోజకవర్గం
                </label>
                <input 
                  type="text" 
                  defaultValue="NowNine Citizen (Hyderabad)" 
                  className="w-full bg-[#181820] border border-[#2B2B35] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400" 
                  required
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-400 block mb-1">
                  Question or Stance (ప్రశ్న / అంశం)
                </label>
                <textarea 
                  rows={2} 
                  value={speakerTopic} 
                  onChange={(e) => setSpeakerTopic(e.target.value)} 
                  placeholder="మీరు అడగాలనుకుంటున్న ప్రశ్న రాయండి..." 
                  className="w-full bg-[#181820] border border-[#2B2B35] rounded-xl p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400" 
                  required 
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-xs shadow-md cursor-pointer hover:brightness-110"
              >
                Submit Application 🎙️
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-1.5">
          <button 
            type="button"
            onClick={onBack} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xs font-extrabold text-white">Live Debates</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsSpeakerModalOpen(true)}
            className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[#FDE047] text-[8px] font-bold hover:bg-amber-500/25 transition-all cursor-pointer flex items-center gap-1"
          >
            <Mic className="w-2.5 h-2.5" />
            <span>Apply to Speak</span>
          </button>
          <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-extrabold uppercase">
            LIVE
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-2.5 pb-6">
        {/* Main Live Debate Video Card */}
        <div 
          onClick={onSelectDebate}
          className="rounded-2xl overflow-hidden bg-[#141419] border border-red-500/40 shadow-lg cursor-pointer group hover:border-red-500/80 transition-all active:scale-[0.99]"
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
                LIVE NOW
              </span>
              <span className="px-1.5 py-0.2 rounded bg-black/60 text-white text-[8px] font-semibold flex items-center gap-0.5">
                <Eye className="w-2.5 h-2.5 text-red-400" />
                12.4K Watching
              </span>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          <div className="p-2 flex items-center justify-between">
            <div>
              <h3 className="font-telugu text-[11px] font-bold text-white line-clamp-1">
                2026 ఎన్నికలు : ఎవరికి అవకాశాలు?
              </h3>
              <p className="text-[8px] text-gray-400 mt-0.5">
                Political Debate • 4 Experts • Public Q&A
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectDebate();
              }}
              className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[9px] font-extrabold shadow-sm hover:brightness-110 shrink-0 cursor-pointer"
            >
              Watch Live →
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          {['Live Now', 'Upcoming', 'Past'].map((tabName) => {
            const isActive = filter === tabName;
            return (
              <button
                key={tabName}
                type="button"
                onClick={() => setFilter(tabName)}
                className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#F5C754] text-black shadow-xs font-black' 
                    : 'bg-[#181820] text-gray-400 hover:text-white hover:bg-[#202028]'
                }`}
              >
                {tabName}
              </button>
            );
          })}
        </div>

        {/* Debates List */}
        <div className="space-y-1.5">
          {filteredDebates.length === 0 ? (
            <div className="p-4 text-center rounded-xl bg-[#141419] border border-[#222228] text-gray-400 text-[10px]">
              No debates currently under "{filter}". Check "Live Now" or "Upcoming".
            </div>
          ) : (
            filteredDebates.map((item) => (
              <div
                key={item.id}
                onClick={onSelectDebate}
                className="p-1.5 rounded-xl bg-[#141419] border border-[#222228] flex items-center gap-2 cursor-pointer hover:border-amber-500/50 transition-all group"
              >
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {item.isLive ? (
                    <span className="absolute top-0.5 left-0.5 px-1 rounded bg-red-600 text-white text-[7px] font-black">
                      LIVE
                    </span>
                  ) : (
                    <span className="absolute top-0.5 left-0.5 px-1 rounded bg-black/70 text-amber-400 text-[7px] font-bold">
                      UPCOMING
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-telugu text-[10px] font-bold text-white truncate group-hover:text-amber-300">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[8px] text-gray-400">
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5 text-amber-400" />
                      {item.time}
                    </span>
                    <span>{item.views}</span>
                  </div>
                </div>

                {/* Reminder or Watch CTA */}
                {!item.isLive ? (
                  <button
                    type="button"
                    onClick={(e) => toggleReminder(e, item.id, item.title)}
                    className={`px-2 py-1 rounded-full text-[8px] font-bold transition-all shrink-0 cursor-pointer ${
                      reminders[item.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1C1C26] text-amber-400 border border-amber-400/30 hover:bg-amber-500/20'
                    }`}
                  >
                    {reminders[item.id] ? 'Reminder Set ✓' : 'Remind 🔔'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDebate();
                    }}
                    className="p-1.5 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors shrink-0 cursor-pointer"
                    title="Watch Stream"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNavBar activeTab="live-debates" onTabChange={onNavigate} />
    </div>
  );
}

// 5. SCREEN 5: SHORT VIDEOS FEED SCREEN
export function Screen5ShortVideos({ onBack, onSelectShort, onNavigate }) {
  const [activeTab, setActiveTab] = useState('For You');
  const [likedShorts, setLikedShorts] = useState({});
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleLikeShort = (e, id) => {
    e.stopPropagation();
    setLikedShorts(prev => ({ ...prev, [id]: !prev[id] }));
    showToast(!likedShorts[id] ? 'Liked short video! ❤️' : 'Removed like');
  };

  const handleShareShort = (e, title) => {
    e.stopPropagation();
    showToast(`📋 Link copied for: "${title.slice(0, 20)}..."`);
  };

  // Filter videos
  const videosList = SHORT_VIDEOS_FEED.filter(video => {
    if (activeTab === 'For You') return true;
    if (activeTab === 'Politics') return video.title.includes('సమస్యలు') || video.badge.includes('Voice');
    if (activeTab === 'Trending') return video.views.includes('12.') || video.views.includes('8.');
    if (activeTab === 'Local') return video.badge.includes('Local') || video.badge.includes('Village');
    return true;
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-7 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full bg-[#14141A] border border-[#2B2B38] rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#22222E]">
              <div className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white">Upload Citizen Short Video</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsUploadOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-gray-300">
              Share 60-second video of your local issues, opinions, or village events.
            </p>

            <div className="p-4 rounded-xl border border-dashed border-amber-400/40 bg-[#181822] text-center flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">📹</span>
              <span className="text-[10px] font-bold text-white">Select Video from Phone</span>
              <span className="text-[8px] text-gray-400">MP4, MOV (Max 60s, up to 50MB)</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsUploadOpen(false);
                showToast('🚀 Video uploaded! Under editorial review.');
              }}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-xs shadow-md cursor-pointer hover:brightness-110"
            >
              Publish to NowNine Feed
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onBack} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xs font-extrabold text-white">Short Videos</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[#FDE047] text-[8px] font-bold hover:bg-amber-500/25 transition-all cursor-pointer flex items-center gap-1"
        >
          <span>+ Upload</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-[#16161C] overflow-x-auto phone-scroll shrink-0">
        {['For You', 'Politics', 'Trending', 'Local'].map((tabName) => {
          const isActive = activeTab === tabName;
          return (
            <button
              key={tabName}
              type="button"
              onClick={() => setActiveTab(tabName)}
              className={`px-3 py-0.8 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#F5C754] text-black shadow-xs font-black' 
                  : 'bg-[#16161D] text-gray-400 hover:text-white hover:bg-[#202028]'
              }`}
            >
              {tabName}
            </button>
          );
        })}
      </div>

      {/* Video Cards Feed */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-2.5 pb-6">
        {videosList.map((item) => (
          <div
            key={item.id}
            onClick={onSelectShort}
            className="rounded-2xl overflow-hidden bg-[#141419] border border-[#23232C] hover:border-amber-500/50 cursor-pointer group relative transition-all active:scale-[0.99]"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              
              {/* Duration badge */}
              <span className="absolute top-1.5 right-1.5 px-1 py-0.2 rounded bg-black/60 text-white text-[8px] font-mono">
                {item.duration}
              </span>

              {/* Views badge */}
              <span className="absolute bottom-1.5 left-2 text-[8px] text-gray-300 flex items-center gap-0.5">
                <Eye className="w-2.5 h-2.5 text-amber-400" />
                {item.views}
              </span>

              {/* Quick Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-amber-400" />
                </div>
              </div>
            </div>

            <div className="p-2 flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-2">
                <span className="inline-block px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-400/30 text-[#FDE047] text-[8px] font-bold mb-1">
                  {item.badge}
                </span>
                <h3 className="font-telugu text-[10px] font-bold text-white line-clamp-1 group-hover:text-amber-300">
                  {item.title}
                </h3>
              </div>

              {/* Quick Card Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => toggleLikeShort(e, item.id)}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    likedShorts[item.id] ? 'text-red-500 bg-red-500/20' : 'text-gray-400 hover:text-white bg-[#1C1C24]'
                  }`}
                  title="Like"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedShorts[item.id] ? 'fill-current' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleShareShort(e, item.title)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-white bg-[#1C1C24] transition-colors cursor-pointer"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
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
  const [filterRole, setFilterRole] = useState('All');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleStartRecord = () => {
    setIsRecording(true);
    setRecordTimer(1);
    const interval = setInterval(() => {
      setRecordTimer(t => {
        if (t >= 15) {
          clearInterval(interval);
          setIsRecording(false);
          return 15;
        }
        return t + 1;
      });
    }, 1000);
  };

  const handleSubmitVoiceStory = () => {
    setIsRecordModalOpen(false);
    setIsRecording(false);
    setRecordTimer(0);
    showToast('🎙️ మీ వాయిస్ నోట్ విజయవంతంగా అందింది! (Voice Recorded)');
  };

  // Filter logic
  const filteredStories = COMMON_PEOPLE_STORIES.filter(story => {
    if (filterRole === 'All') return true;
    if (filterRole === 'Farmers') return story.role.toLowerCase().includes('farmer');
    if (filterRole === 'Students') return story.role.toLowerCase().includes('student');
    if (filterRole === 'Women') return story.role.toLowerCase().includes('housewife') || story.role.toLowerCase().includes('women');
    return true;
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-7 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Voice Record Modal */}
      {isRecordModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full bg-[#14141A] border border-[#2B2B38] rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#22222E]">
              <div className="flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white">మీ ప్రాంత సమస్య చెప్పండి (Record Issue)</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsRecordModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-gray-300">
              రైతులు, విద్యార్థులు, మహిళల గళం నేరుగా ప్రజలకు, నాయకులకు చేరుతుంది.
            </p>

            <div className="p-4 rounded-xl bg-[#181822] border border-[#262632] text-center flex flex-col items-center justify-center gap-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                isRecording ? 'bg-red-600/30 border-2 border-red-500 animate-pulse text-red-400' : 'bg-emerald-600/20 border border-emerald-400 text-emerald-400'
              }`}>
                {isRecording ? '🔴' : '🎙️'}
              </div>
              <span className="text-xs font-bold text-white">
                {isRecording ? `Recording... 00:${recordTimer < 10 ? '0' + recordTimer : recordTimer}` : 'Tap below to start speaking'}
              </span>
              <span className="text-[8px] text-gray-400">Clear voice in Telugu / English</span>
            </div>

            {!isRecording && recordTimer === 0 ? (
              <button
                type="button"
                onClick={handleStartRecord}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Start Recording Voice Note</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitVoiceStory}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Done & Send to NowNine 🚀</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onBack} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-extrabold text-white">Common People</h2>
            <p className="text-[8px] text-[#F5C754] font-medium leading-none mt-0.5">
              Real People • Real Opinions
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsRecordModalOpen(true)}
          className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 text-[8px] font-extrabold hover:bg-emerald-500/25 transition-all cursor-pointer flex items-center gap-1"
        >
          <Mic className="w-2.5 h-2.5" />
          <span>సమస్య చెప్పండి 🎙️</span>
        </button>
      </div>

      {/* Filters */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-[#16161C] overflow-x-auto phone-scroll shrink-0">
        {['All', 'Farmers', 'Students', 'Women'].map((roleName) => {
          const isActive = filterRole === roleName;
          return (
            <button
              key={roleName}
              type="button"
              onClick={() => setFilterRole(roleName)}
              className={`px-3 py-0.8 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#F5C754] text-black shadow-xs font-black' 
                  : 'bg-[#16161D] text-gray-400 hover:text-white hover:bg-[#202028]'
              }`}
            >
              {roleName}
            </button>
          );
        })}
      </div>

      {/* Stories List */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-2 pb-6">
        {filteredStories.map((item) => (
          <div
            key={item.id}
            onClick={onSelectStory}
            className="p-2 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-500/40 flex items-center gap-2.5 cursor-pointer transition-all active:scale-[0.99] group"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <span className="absolute bottom-0.5 right-0.5 text-[7px] px-0.8 rounded bg-black/70 text-white font-mono">
                {item.duration}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-telugu text-[10px] font-bold text-white line-clamp-1 group-hover:text-amber-300">
                {item.title}
              </h4>
              <div className="flex items-center justify-between mt-1 text-[8px] text-gray-400">
                <span className="flex items-center gap-1 text-[#F5C754]">
                  <span>{item.icon}</span>
                  <span className="font-semibold">{item.role}</span>
                </span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5 text-amber-400" />
                  {item.views}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectStory();
              }}
              className="p-1 rounded-full bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors shrink-0"
              title="Play Story"
            >
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </button>
          </div>
        ))}
      </div>

      <BottomNavBar activeTab="common-people" onTabChange={onNavigate} />
    </div>
  );
}

// 7. SCREEN 7: AREA SPECIALS SCREEN
export function Screen7AreaSpecials({ onBack, onNavigate, onSelectUpdate = null }) {
  const [selectedArea, setSelectedArea] = useState('Hyderabad');
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const areasList = ['Hyderabad', 'Vijayawada', 'Warangal', 'Visakhapatnam', 'Tirupati', 'Guntur'];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSelectArea = (area) => {
    setSelectedArea(area);
    setIsAreaDropdownOpen(false);
    showToast(`📍 Selected Area: ${area}`);
  };

  const handleReportIssue = (e) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    setIsReportModalOpen(false);
    setIssueText('');
    showToast(`🚨 Issue submitted for ${selectedArea} Municipal Desk!`);
  };

  const handleOpenItem = (item) => {
    if (onSelectUpdate) onSelectUpdate(item);
    else if (onNavigate) onNavigate('video-player');
  };

  // Filter updates
  const filteredUpdates = AREA_SPECIALS_UPDATES.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-7 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Report Issue Modal */}
      {isReportModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full bg-[#14141A] border border-[#2B2B38] rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#22222E]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white">Report Issue in {selectedArea}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleReportIssue} className="space-y-2.5">
              <div>
                <label className="text-[9px] font-bold text-gray-400 block mb-1">
                  Issue Description (రోడ్డు, డ్రైనేజ్, తాగునీరు, కరెంట్ మొదలైనవి)
                </label>
                <textarea 
                  rows={3} 
                  value={issueText} 
                  onChange={(e) => setIssueText(e.target.value)} 
                  placeholder={`Describe what needs attention in ${selectedArea}...`}
                  className="w-full bg-[#181820] border border-[#2B2B35] rounded-xl p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400" 
                  required 
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-xs shadow-md cursor-pointer hover:brightness-110"
              >
                Submit Citizen Report 🚨
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onBack} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-extrabold text-white">Area Specials</h2>
            <p className="text-[8px] text-gray-400 leading-none mt-0.5">
              Your Area • Your Updates
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="px-2 py-0.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-[8px] font-bold hover:bg-red-600/25 transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Report Issue 🚨</span>
        </button>
      </div>

      {/* Area Selector Dropdown Box */}
      <div className="px-3 pt-2 shrink-0 relative">
        <div 
          onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
          className="p-2 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-400/50 cursor-pointer transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[8px] font-semibold text-gray-400 block mb-0.5">
              Select Your Area
            </span>
            <div className="flex items-center gap-1 font-bold text-xs text-white">
              <MapPin className="w-3.5 h-3.5 text-[#F5C754]" />
              <span>{selectedArea}</span>
            </div>
          </div>
          <span className="text-amber-400 text-[10px] p-1 rounded-md bg-[#1B1B24]">
            {isAreaDropdownOpen ? '▲ Close' : '▼ Change Area'}
          </span>
        </div>

        {/* Dropdown Options Popup */}
        {isAreaDropdownOpen && (
          <div className="absolute top-full left-3 right-3 z-40 mt-1 bg-[#16161E] border border-amber-500/40 rounded-xl shadow-2xl p-1.5 grid grid-cols-2 gap-1 animate-fadeIn">
            {areasList.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleSelectArea(area)}
                className={`p-1.5 text-left text-[11px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedArea === area ? 'bg-amber-500 text-black font-black' : 'text-gray-200 hover:bg-[#20202C]'
                }`}
              >
                <span>📍</span>
                <span>{area}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Chips */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto phone-scroll shrink-0">
        {['All', 'News', 'Events', 'Development', 'Alerts'].map((catName) => {
          const isActive = activeCategory === catName;
          return (
            <button
              key={catName}
              type="button"
              onClick={() => setActiveCategory(catName)}
              className={`px-2.5 py-0.8 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#F5C754] text-black shadow-xs font-black' 
                  : 'bg-[#16161D] text-gray-400 hover:text-white hover:bg-[#202028]'
              }`}
            >
              {catName}
            </button>
          );
        })}
      </div>

      {/* Area Feed Cards */}
      <div className="flex-1 min-h-0 px-3 py-1 overflow-y-auto phone-scroll touch-pan-y space-y-2 pb-6">
        {filteredUpdates.length === 0 ? (
          <div className="p-4 text-center rounded-xl bg-[#141419] border border-[#222228] text-gray-400 text-[10px]">
            No updates under category "{activeCategory}" in {selectedArea}.
          </div>
        ) : (
          filteredUpdates.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(item)}
              className="p-2 rounded-xl bg-[#141419] border border-[#23232C] hover:border-amber-400/40 flex items-center gap-2.5 cursor-pointer transition-all active:scale-[0.99] group"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`px-1.5 py-0.2 rounded text-[7px] font-extrabold text-white ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-[8px] text-gray-400">{item.time}</span>
                </div>
                <h4 className="font-telugu text-[10px] font-bold text-white line-clamp-2 leading-tight group-hover:text-amber-300">
                  {item.title}
                </h4>
              </div>

              <div className="shrink-0 text-amber-400 text-xs p-1">
                →
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavBar activeTab="area-specials" onTabChange={onNavigate} />
    </div>
  );
}

// 8. SCREEN 8: FULLSCREEN SHORT VIDEO PLAYER
export function Screen8ShortVideoPlayer({ onBack, onNavigate = null }) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(8900);
  const [saved, setSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Suresh Kumar', text: 'నిజమైన సమస్యలను లేవనెత్తారు! 👌', time: '10m ago' },
    { id: 2, user: 'Kavitha P', text: 'యువత రాజకీయాల్లోకి రావడం చాలా ముఖ్యం.', time: '25m ago' },
    { id: 3, user: 'Venkatesh Rao', text: 'మా గ్రామంలో కూడా ఇదే పరిస్థితి.', time: '1h ago' }
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const currentVideo = SHORT_VIDEOS_FEED[videoIndex] || SHORT_VIDEOS_FEED[0];

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    showToast(!liked ? 'Liked this video! ❤️' : 'Removed like');
  };

  const toggleSave = () => {
    setSaved(!saved);
    showToast(!saved ? 'Saved to bookmarks! 🔖' : 'Removed bookmark');
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    showToast(!isFollowing ? 'Following @nownine ✓' : 'Unfollowed @nownine');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showToast(!isMuted ? 'Audio Muted 🔇' : 'Audio Unmuted 🔊');
  };

  const handleShare = () => {
    showToast('Video link copied to clipboard! 📋');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        user: 'You',
        text: newComment,
        time: 'Just now'
      }
    ]);
    setNewComment('');
    showToast('Comment posted! 💬');
  };

  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % SHORT_VIDEOS_FEED.length);
    setLiked(false);
    showToast('Next Short Video 🎬');
  };

  const handlePrevVideo = () => {
    setVideoIndex((prev) => (prev - 1 + SHORT_VIDEOS_FEED.length) % SHORT_VIDEOS_FEED.length);
    setLiked(false);
    showToast('Previous Short Video 🎬');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-white select-none">
      {/* Background Fullscreen Video / Photo */}
      <img 
        src={currentVideo.img} 
        alt={currentVideo.title} 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none"></div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-12 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-Up Comment Drawer */}
      {isCommentsOpen && (
        <div className="absolute inset-x-0 bottom-0 top-1/3 z-50 bg-[#121217] border-t border-[#2B2B38] rounded-t-3xl shadow-2xl flex flex-col justify-between p-3 animate-slideUp">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#22222E]">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Comments</span>
                <span className="text-[10px] text-gray-400">({comments.length})</span>
              </span>
              <button 
                type="button"
                onClick={() => setIsCommentsOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto phone-scroll">
              {comments.map((c) => (
                <div key={c.id} className="p-2 rounded-xl bg-[#181822] border border-[#22222A]">
                  <div className="flex items-center justify-between text-[9px] mb-0.5">
                    <span className="font-bold text-amber-400">{c.user}</span>
                    <span className="text-gray-500 font-mono text-[8px]">{c.time}</span>
                  </div>
                  <p className="font-telugu text-[10px] text-gray-200 leading-tight">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleAddComment} className="pt-2 border-t border-[#202028] flex items-center gap-1.5">
            <input 
              type="text" 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Add a citizen comment..." 
              className="flex-1 bg-[#181820] border border-[#262630] rounded-full px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-full bg-[#F5C754] text-black font-bold text-[10px] hover:brightness-110 cursor-pointer shadow-sm"
            >
              Post
            </button>
          </form>
        </div>
      )}

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <PhoneStatusBar />
        <div className="px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={onBack} 
              className="p-1 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-white drop-shadow">Short Video</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Mute/Unmute */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/80 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            {/* City Badge Button */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('area-specials')}
              className="px-2 py-0.5 rounded-full bg-black/50 border border-white/20 text-[9px] font-semibold text-white flex items-center gap-1 backdrop-blur-xs hover:border-amber-400 transition-colors cursor-pointer"
            >
              <MapPin className="w-2.5 h-2.5 text-[#F5C754]" />
              <span>Hyderabad</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Floating Interaction Column */}
      <div className="absolute right-2 bottom-14 z-30 flex flex-col items-center gap-3">
        {/* Next / Prev Video Arrows */}
        <div className="flex flex-col gap-1 mb-1">
          <button 
            type="button"
            onClick={handlePrevVideo} 
            className="w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-colors cursor-pointer"
            title="Previous Short"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleNextVideo} 
            className="w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-colors cursor-pointer"
            title="Next Short"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Heart Like */}
        <button type="button" onClick={toggleLike} className="flex flex-col items-center group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-transform">
            <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-current' : 'text-white'}`} />
          </div>
          <span className="text-[8px] font-bold mt-0.5">{(likesCount / 1000).toFixed(1)}K</span>
        </button>

        {/* Comment */}
        <button 
          type="button" 
          onClick={() => setIsCommentsOpen(!isCommentsOpen)} 
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-transform">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-[8px] font-bold mt-0.5">{comments.length}</span>
        </button>

        {/* Share */}
        <button type="button" onClick={handleShare} className="flex flex-col items-center group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-transform">
            <Share2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-[8px] font-bold mt-0.5">Share</span>
        </button>

        {/* Save */}
        <button type="button" onClick={toggleSave} className="flex flex-col items-center group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-transform">
            <Bookmark className={`w-4 h-4 ${saved ? 'text-amber-400 fill-current' : 'text-white'}`} />
          </div>
          <span className="text-[8px] font-bold mt-0.5">Save</span>
        </button>
      </div>

      {/* Bottom Video Details Overlay */}
      <div className="absolute left-3 right-16 bottom-3 z-30">
        {/* Author & Follow */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-[9px] text-black">
            9
          </div>
          <span className="text-xs font-bold text-white">@nownine</span>
          <button 
            type="button"
            onClick={toggleFollow}
            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold shadow-sm transition-all cursor-pointer ${
              isFollowing ? 'bg-emerald-500 text-black' : 'bg-[#F5C754] text-black hover:brightness-110'
            }`}
          >
            {isFollowing ? 'Following ✓' : 'Follow'}
          </button>
        </div>

        {/* Telugu Title */}
        <p className="font-telugu text-[11px] font-bold text-white drop-shadow mb-1 leading-snug">
          {currentVideo.title}
        </p>

        {/* Badge & Hashtags */}
        <p className="text-[9px] text-amber-300 font-medium">
          <span className="mr-1">{currentVideo.badge}</span>
          <span>#Youth #Politics #India #nownine</span>
        </p>

        {/* Audio tag */}
        <div className="flex items-center gap-1.5 mt-1 text-[8px] text-gray-300">
          <Music2 className="w-3 h-3 text-[#F5C754] animate-spin" />
          <span>Original Voice Audio • NowNine Citizen Stream</span>
        </div>

        {/* Video progress scrubber */}
        <div className="w-full h-0.5 bg-white/30 rounded-full mt-2 overflow-hidden">
          <div className="w-3/5 h-full bg-[#F5C754] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// 9. SCREEN 9: LIVE DEBATE DETAIL / BROADCAST PLAYER
export function Screen9LiveDebateDetail({ onBack, onNavigate = null }) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(LIVE_CHAT_MESSAGES);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPanelist, setSelectedPanelist] = useState(null);
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const [isQueueJoined, setIsQueueJoined] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const emojis = ['👍', '❤️', '👏', '🔥', '🇮🇳', '🗳️', '📢'];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

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

  const handleEmojiClick = (emoji) => {
    setChatInput(prev => prev + emoji);
    showToast(`Reaction sent: ${emoji}`);
  };

  const toggleQueue = () => {
    setIsQueueJoined(!isQueueJoined);
    showToast(!isQueueJoined ? '🙋‍♂️ Joined Speaker Queue (#2)! Moderator notified.' : 'Exited Speaker Queue');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-7 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Panelist Bio Modal */}
      {selectedPanelist && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full bg-[#14141A] border border-[#2B2B38] rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#22222E]">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${selectedPanelist.color} flex items-center justify-center font-bold text-xs text-white`}>
                  {selectedPanelist.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{selectedPanelist.name}</h3>
                  <span className="text-[9px] text-amber-400 font-semibold">{selectedPanelist.role}</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedPanelist(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-gray-300 leading-relaxed">
              Leading regular prime-time analysis on constitutional governance, state budget, and citizen development priorities in Telugu states.
            </p>

            <button
              type="button"
              onClick={() => {
                setChatInput(`@${selectedPanelist.name} `);
                setSelectedPanelist(null);
                showToast(`Tagging @${selectedPanelist.name} in chat`);
              }}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-xs shadow-md cursor-pointer hover:brightness-110"
            >
              Ask Question to {selectedPanelist.name} 💬
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onBack} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xs font-extrabold text-white">Live Debate Studio</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleQueue}
            className={`px-2 py-0.5 rounded-full text-[8px] font-bold transition-all cursor-pointer ${
              isQueueJoined 
                ? 'bg-emerald-600 text-white' 
                : 'bg-amber-500/15 border border-amber-400/30 text-[#FDE047] hover:bg-amber-500/25'
            }`}
          >
            {isQueueJoined ? 'In Queue #2 ✓' : 'Speak 🙋‍♂️'}
          </button>
          <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-extrabold uppercase">
            LIVE
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto phone-scroll touch-pan-y pb-2">
        {/* Video Player */}
        <div className="relative w-full h-36 bg-black overflow-hidden shrink-0 group">
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
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded bg-black/60 text-white hover:text-amber-400 cursor-pointer"
                title="Mute/Unmute"
              >
                {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3" />}
              </button>
              <span className="px-1.5 py-0.2 rounded bg-black/60 text-white text-[8px] font-semibold flex items-center gap-0.5">
                <Eye className="w-2.5 h-2.5 text-red-400" />
                12.4K
              </span>
            </div>
          </div>

          {/* Play/Pause Control Overlay */}
          <div 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/40 transition-colors"
          >
            {!isPlaying && (
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            )}
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
            <span>Live from Hyderabad Studio</span>
          </div>
        </div>

        {/* Panelists Horizontal Scroll */}
        <div className="p-3 border-b border-[#1A1A22]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-white">
              Panelists (Click for bio)
            </span>
            <span className="text-[8px] text-amber-400 font-semibold">4 Experts Active</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto phone-scroll pb-1">
            {DEBATE_PANELISTS.map((panelist) => (
              <button 
                key={panelist.id} 
                type="button"
                onClick={() => setSelectedPanelist(panelist)}
                className="flex flex-col items-center text-center shrink-0 w-16 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${panelist.color} flex items-center justify-center font-bold text-xs text-white shadow-sm mb-1`}>
                  {panelist.name.charAt(0)}
                </div>
                <span className="text-[9px] font-bold text-white truncate w-full">
                  {panelist.name}
                </span>
                <span className="text-[7px] text-gray-400 truncate w-full">
                  {panelist.role}
                </span>
              </button>
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

      {/* Quick Emoji Bar (Toggled with Smile button) */}
      {isEmojiBarOpen && (
        <div className="px-3 py-1.5 bg-[#14141C] border-t border-[#22222E] flex items-center justify-around animate-fadeIn shrink-0">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              className="text-base hover:scale-125 transition-transform cursor-pointer p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Live Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="p-2 border-t border-[#1C1C22] bg-[#0E0E12] flex items-center gap-1.5 shrink-0">
        <button 
          type="button" 
          onClick={() => setIsEmojiBarOpen(!isEmojiBarOpen)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isEmojiBarOpen ? 'text-amber-400 bg-amber-500/20' : 'text-gray-400 hover:text-white'
          }`}
          title="Insert Reaction Emoji"
        >
          <Smile className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type citizen reaction..."
          className="flex-1 bg-[#181820] border border-[#262630] rounded-full px-3 py-1 text-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
        />
        <button 
          type="submit" 
          className="w-7 h-7 rounded-full bg-[#F5C754] text-black flex items-center justify-center shrink-0 hover:brightness-110 shadow-xs cursor-pointer active:scale-95"
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
