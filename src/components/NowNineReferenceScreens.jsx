import React, { useState, useEffect } from 'react';
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
  MicOff,
  Newspaper,
  Camera,
  Upload,
  MoreHorizontal
} from 'lucide-react';
import InstagramVideoUploadModal from './InstagramVideoUploadModal';
import { 
  getCommonTalksVideos, 
  uploadCommonTalksVideo, 
  likeCommonTalksVideo, 
  addCommentToCommonTalksVideo, 
  subscribeCommonTalksVideos 
} from '../data/commonTalksStore';
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
import { 
  DEFAULT_DETECTED_LOCATION, 
  CONSTITUENCY_DATABASE, 
  resolveConstituencyAndParties 
} from '../data/locationConstituencyData';
import { recordLiveBallot } from '../data/voteStore';
import { 
  getActiveBroadcast, 
  getRecordedSessions, 
  subscribeBroadcast, 
  setSelectedDebate, 
  getSelectedDebate 
} from '../data/liveBroadcastStore';
import { getPublishedNews, subscribeNews } from '../data/newsStore';
import { 
  getPublishedHousemates, 
  voteForHousemate, 
  subscribeHousemates 
} from '../data/bossStore';
import { recordCustomerActivity } from '../data/customerActivityStore';
import { recordCitizenLogin } from '../data/citizenSessionStore';

// Phone Status Bar (Cellular, Wifi, Battery icons removed as requested)
export function PhoneStatusBar() {
  return null;
}

// Bottom Navigation Bar (Home, News, Live, Shorts)
export function BottomNavBar({ activeTab = 'home', onTabChange = () => {} }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'live-debates', label: 'Live', icon: Radio },
    { id: 'short-videos', label: 'Shorts', icon: Video },
  ];

  return (
    <div className="h-14 pb-[max(0.25rem,env(safe-area-inset-bottom))] border-t border-[#1C1C22] bg-[#0E0E12] px-2 flex items-center justify-around z-30 select-none shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-center py-1 px-3 min-w-[48px] min-h-[44px] relative transition-all cursor-pointer active:scale-95"
          >
            <Icon 
              className={`w-4 h-4 transition-colors ${
                isActive ? 'text-[#F5C754] stroke-[2.5]' : 'text-gray-400 hover:text-gray-200'
              }`} 
            />
            <span className={`text-[9px] mt-0.5 tracking-tight font-medium ${
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

// REUSABLE CONSTITUENCY & ADDRESS PICKER MODAL
export function ConstituencyPickerModal({
  isOpen,
  onClose,
  currentLocation,
  onLocationChange,
  onDetectLiveGps,
  isLocating
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const filteredConstituencies = (CONSTITUENCY_DATABASE || []).filter(item => {
    // Region tab filter
    if (activeFilter === 'Hyderabad') {
      if (!item.city.toLowerCase().includes('hyderabad')) return false;
    } else if (activeFilter === 'Andhra Pradesh') {
      if (!item.state.toLowerCase().includes('andhra')) return false;
    } else if (activeFilter === 'Telangana') {
      if (!item.state.toLowerCase().includes('telangana') || item.city.toLowerCase().includes('hyderabad')) return false;
    }

    // Search query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return item.locality.toLowerCase().includes(q) ||
           item.city.toLowerCase().includes(q) ||
           item.assembly.toLowerCase().includes(q) ||
           (item.pincode && item.pincode.includes(q)) ||
           (item.exactAddress && item.exactAddress.toLowerCase().includes(q));
  });

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const resolved = resolveConstituencyAndParties({
      exactAddress: customInput.trim(),
      locality: customInput.trim().split(',')[0],
      city: customInput.toLowerCase().includes('hyderabad') ? 'Hyderabad' : 'Vijayawada',
      state: customInput.toLowerCase().includes('andhra') ? 'Andhra Pradesh' : 'Telangana',
      method: 'Manually Entered Address 📍'
    });
    onLocationChange(resolved);
    recordCitizenLogin({ location: resolved, method: 'Manually Entered Address' });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-h-[90%] bg-[#121217] border border-amber-500/50 rounded-2xl p-3 shadow-2xl flex flex-col justify-between space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#22222E]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#F5C754]" />
            <div>
              <h3 className="text-xs font-black text-white">Select or Detect Your Address</h3>
              <p className="text-[8px] text-gray-400">Maps your local Assembly Constituency & Political Parties</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. GPS Auto-Detect Button */}
        <button
          type="button"
          onClick={() => {
            if (onDetectLiveGps) onDetectLiveGps();
            onClose();
          }}
          disabled={isLocating}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-yellow-600/20 border border-amber-400 text-amber-300 font-extrabold text-[10px] flex items-center justify-center gap-2 hover:bg-amber-400/30 transition-all cursor-pointer shadow-md"
        >
          <span className="text-sm">🛰️</span>
          <span>{isLocating ? 'Detecting via Device GPS...' : 'Auto-Detect My Live Address via GPS'}</span>
        </button>

        {/* 2. Search Locality Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search area, road, or pincode (e.g. Kukatpally, Benz Circle, 500072)..."
            className="w-full bg-[#181822] border border-[#2B2B38] focus:border-amber-400 rounded-xl px-3 py-1.5 text-[10px] text-white placeholder-gray-500 focus:outline-none"
          />
          {searchQuery && (
            <button 
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Region Chips */}
        <div className="flex items-center gap-1 overflow-x-auto phone-scroll text-[8px] pb-0.5">
          {['All', 'Hyderabad', 'Telangana', 'Andhra Pradesh'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`px-2 py-0.5 rounded-full font-bold shrink-0 transition-all cursor-pointer ${
                activeFilter === tab 
                  ? 'bg-amber-400 text-black font-black' 
                  : 'bg-[#181820] text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 3. Filtered Constituency List */}
        <div className="space-y-1.5 overflow-y-auto phone-scroll max-h-44 pr-0.5">
          {filteredConstituencies.length === 0 ? (
            <div className="p-3 text-center rounded-xl bg-[#181820] text-gray-400 text-[9px]">
              No pre-listed areas match "{searchQuery}". You can enter your exact address below!
            </div>
          ) : (
            filteredConstituencies.map((item) => {
              const isSelected = item.id === currentLocation?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onLocationChange(item);
                    recordCitizenLogin({ location: item, method: 'Constituency Picker' });
                    onClose();
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm' 
                      : 'bg-[#181820] border-[#252532] text-gray-300 hover:border-amber-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white flex items-center gap-1">
                      <span>📍</span> {item.locality}, {item.city}
                    </span>
                    {isSelected ? (
                      <span className="text-[7px] font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-black">
                        SELECTED
                      </span>
                    ) : (
                      <span className="text-[7px] text-amber-400/80 font-mono">
                        {(item.parties || []).length} Parties
                      </span>
                    )}
                  </div>
                  <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">{item.exactAddress || item.formattedAddress}</p>
                  <div className="mt-1 flex items-center gap-2 text-[7px] text-amber-300/80 font-medium">
                    <span>🏛️ {item.assembly}</span>
                    <span>•</span>
                    <span>{item.state}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 4. Custom Address Direct Entry */}
        <form onSubmit={handleApplyCustom} className="pt-1 border-t border-[#22222E] flex items-center gap-1.5">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Or type exact colony / street address..."
            className="flex-1 bg-[#181822] border border-[#2B2B38] focus:border-amber-400 rounded-xl px-2.5 py-1.5 text-[9px] text-white placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-[9px] font-extrabold cursor-pointer transition-colors shrink-0"
          >
            Apply 📍
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-1.5 rounded-xl bg-[#1C1C24] border border-[#2B2B38] text-[9px] font-bold text-gray-300 hover:text-white cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// LOGIN SCREEN
export function ScreenLogin({ 
  onLoginSuccess, 
  onSkipToHome, 
  onNavigate = null,
  currentLocation = DEFAULT_DETECTED_LOCATION,
  onLocationChange = () => {},
  isLocating = false,
  onDetectLiveGps = () => {}
}) {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValues, setOtpValues] = useState(['9', '4', '1', '0']);
  const [resendTimer, setResendTimer] = useState(28);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [localLocating, setLocalLocating] = useState(true);

  // Guarantee that "Locating..." is active when opening the website
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalLocating(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const activeLocating = isLocating || localLocating;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
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
    recordCitizenLogin({ location: currentLocation, userPhone: phoneNumber, method: 'Mobile OTP (9410)' });
    showToast(`Verified! Welcome from ${currentLocation?.assembly || currentLocation?.locality || 'NowNine'}.`);
    setTimeout(() => onLoginSuccess(), 400);
  };

  const handleGoogleLogin = () => {
    recordCitizenLogin({ location: currentLocation, userPhone: 'Google Account', method: 'Google Sign-In' });
    showToast(`Signed in! Welcome from ${currentLocation?.assembly || currentLocation?.locality || 'NowNine'}.`);
    setTimeout(() => onLoginSuccess(), 500);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0 select-none">
      {/* Background ambient glow centered behind top brand logo */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-[radial-gradient(ellipse_at_top,_rgba(245,199,84,0.22)_0%,_rgba(180,83,9,0.10)_40%,_transparent_75%)] pointer-events-none"></div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-[#1F1A10] border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-lg animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content - Clean, focused login experience */}
      <div className="flex-1 min-h-0 px-4 sm:px-5 pt-4 pb-2 flex flex-col justify-between z-10 overflow-y-auto phone-scroll">
        {/* Brand Logo & Header */}
        <div className="text-center pt-2 shrink-0">
          {/* Official Golden 9 Logo */}
          <div className="flex items-center justify-center mb-1">
            <img 
              src="/now9_icon.png" 
              alt="now9 logo" 
              className="w-16 h-16 sm:w-18 sm:h-18 object-contain drop-shadow-[0_0_24px_rgba(245,199,84,0.45)] hover:scale-105 transition-transform"
            />
          </div>

          {/* Official nownine Branding Banner */}
          <div className="flex items-center justify-center px-2">
            <img 
              src="/now9_banner.png" 
              alt="nownine - VOTE | WATCH | ENGAGE" 
              className="w-52 sm:w-56 max-w-[95%] object-contain mx-auto"
            />
          </div>

          {/* Location Selector Pill - Exact Match to Reference Mockup */}
          <div className="mt-3 flex items-center justify-between px-3.5 py-2 rounded-full bg-[#0E0E12] border border-amber-500/40 shadow-md text-left group">
            <button
              type="button"
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer text-left flex-1"
            >
              {/* Circular yellow ring around MapPin icon */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#F5C754] flex items-center justify-center shrink-0 text-[#F5C754] bg-[#14120B]">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5C754]" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1 leading-tight">
                  <span className="text-xs sm:text-sm font-extrabold text-white truncate">
                    {currentLocation?.locality || 'Jubilee Hills'}, {currentLocation?.city || 'Hyderabad'}
                  </span>
                  <span className="text-[10px] text-[#F5C754] font-bold">▾</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-400 block truncate mt-0.5 font-medium">
                  {currentLocation?.assembly || 'Jubilee Hills / Khairatabad Assembly'} • PIN {currentLocation?.pincode || '500033'}
                </span>
              </div>
            </button>

            {/* Right side: 🛰️ Locating... / 🛰️ GPS Button */}
            <div className="flex items-center gap-1 shrink-0 ml-1.5">
              <button
                type="button"
                onClick={() => {
                  if (onDetectLiveGps) onDetectLiveGps();
                  setLocalLocating(true);
                  setTimeout(() => setLocalLocating(false), 3200);
                  showToast('🛰️ Detecting Live GPS Coordinates...');
                }}
                className={`px-3 py-1 rounded-full border border-[#F5C754] bg-[#16140D] text-[#F5C754] text-[10px] sm:text-xs font-bold hover:bg-amber-500/20 cursor-pointer flex items-center gap-1.5 shadow-sm transition-all ${
                  activeLocating ? 'animate-pulse ring-1 ring-amber-400/40' : ''
                }`}
                title="Detect live GPS"
              >
                <span className={activeLocating ? 'animate-bounce' : ''}>🛰️</span>
                <span>{activeLocating ? 'Locating...' : 'GPS'}</span>
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="mt-3.5 text-left">
            <h2 className="text-base sm:text-lg font-black text-white">
              {otpStep ? 'Verify OTP' : 'Login / Register'}
            </h2>
            <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 leading-snug">
              {otpStep 
                ? `Enter the 4-digit code sent to +91 ${phoneNumber}` 
                : 'Enter your mobile number to vote and join live political discussions'}
            </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="py-2 shrink-0">
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-300 block mb-1">
                  Mobile Number
                </label>
                <div className="flex items-center rounded-xl bg-[#131319] border border-[#2A2A38] focus-within:border-amber-400 transition-colors overflow-hidden">
                  <div className="px-2.5 py-2.5 bg-[#1A1A22] border-r border-[#2A2A38] flex items-center gap-1.5 text-xs font-bold text-gray-200 shrink-0">
                    <IndiaFlag />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile"
                    className="flex-1 bg-transparent px-3 py-2.5 text-xs sm:text-sm font-bold text-white placeholder-gray-500 focus:outline-none"
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
                className="w-full py-2.5 sm:py-3 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>Get OTP</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-3">
              <div>
                <label className="text-[10px] sm:text-[11px] font-bold text-gray-300 block mb-1">
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
                <div className="flex items-center justify-between mt-2 text-[9px] sm:text-[10px]">
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
                className="w-full py-2.5 sm:py-3 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>Verify & Enter NowNine</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          )}

          {/* Social / Guest Options */}
          <div className="mt-3 space-y-2 text-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-[#14141A] border border-[#252530] text-gray-200 text-xs font-semibold hover:bg-[#1C1C24] transition-colors flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                recordCitizenLogin({ location: currentLocation, userPhone: 'Guest Citizen', method: 'Guest Access' });
                onSkipToHome();
              }}
              className="text-[11px] font-semibold text-gray-400 hover:text-[#F5C754] transition-colors inline-block pt-0.5 cursor-pointer"
            >
              Skip & Continue as Guest →
            </button>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="py-2 text-center shrink-0">
          <p className="text-[9px] text-gray-500 leading-tight">
            🔒 100% Anonymous Voting • Official Citizen Opinion Platform
          </p>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="w-full pb-1 flex justify-center z-20 shrink-0">
        <div className="w-24 h-1 bg-white/20 rounded-full"></div>
      </div>

      {/* Constituency & Address Picker Modal */}
      <ConstituencyPickerModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        currentLocation={currentLocation}
        onLocationChange={onLocationChange}
        onDetectLiveGps={onDetectLiveGps}
        isLocating={isLocating}
      />
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
        {/* Official Golden 9 Logo */}
        <img 
          src="/now9_icon.png" 
          alt="now9 logo" 
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_0_35px_rgba(245,199,84,0.55)] mb-3 animate-pulse hover:scale-105 transition-transform"
        />

        {/* Official nownine Brand Banner */}
        <div className="flex items-center justify-center px-4 mb-2">
          <img 
            src="/now9_banner.png" 
            alt="nownine - VOTE | WATCH | ENGAGE" 
            className="w-64 sm:w-72 max-w-[95%] object-contain mx-auto"
          />
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

        {/* 4 Feature Icons Row */}
        <div className="w-full px-3 py-2 flex items-center justify-around text-center border-t border-b border-white/5 bg-[#101014]/80">
          {[
            { label: 'Live On', icon: '🎙️', id: 'live-debates' },
            { label: 'News', icon: '📰', id: 'news' },
            { label: 'Common People', icon: '👥', id: 'common-people' },
            { label: 'Boss of House', icon: '👁️', id: 'big-boss' },
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
export function Screen2Home({ 
  onNavigate, 
  currentLocation = DEFAULT_DETECTED_LOCATION, 
  onLocationChange = () => {}, 
  isLocating = false,
  onDetectLiveGps = () => {},
  selectedParty = null,
  onSelectSurveyParty = () => {}
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [appLang, setAppLang] = useState('తెలుగు');
  const [isConstituencyModalOpen, setIsConstituencyModalOpen] = useState(false);
  // Single selected party (strictly one party at a time)
  const [selectedPartyId, setSelectedPartyId] = useState(() => selectedParty?.id || null);
  const [voteToast, setVoteToast] = useState(null);
  const [showSurveyParties, setShowSurveyParties] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [activeBroadcast, setActiveBroadcast] = useState(() => getActiveBroadcast());
  const [recordedSessions, setRecordedSessions] = useState(() => getRecordedSessions());

  useEffect(() => {
    const unsub = subscribeBroadcast(({ activeBroadcast: ab, recordedSessions: rs }) => {
      if (ab) setActiveBroadcast(ab);
      if (rs) setRecordedSessions(rs);
    });
    return unsub;
  }, []);

  const constituencyLabel = (() => {
    const raw = currentLocation?.assembly || 'Constituency';
    const clean = raw
      .replace(/\s*Assembly\s*Constituency\s*/gi, '')
      .replace(/\s*Assembly\s*/gi, '')
      .replace(/\s*Constituency\s*/gi, '')
      .trim();
    return clean ? `${clean} Constituency` : 'Local Constituency';
  })();

  useEffect(() => {
    if (selectedParty?.id) {
      setSelectedPartyId(selectedParty.id);
    }
  }, [selectedParty]);

  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Live Debate: 2026 ఎన్నికలు - ఎవరికి అవకాశాలు?', subtitle: '12.4K watching now', time: 'Just now', target: 'debate-detail', isUnread: true },
    { id: 2, title: 'Political Survey: 12,400+ Citizens Voted', subtitle: 'Cast your vote on governance & leadership', time: '1h ago', target: 'survey', isUnread: true },
    { id: 3, title: 'Trending Voice: యువతకు ఉద్యోగాలు ఎలా వస్తాయి?', subtitle: '8.9K likes on local voice debate', time: '3h ago', target: 'video-player', isUnread: false },
  ]);

  const unreadCount = notifs.filter(n => n.isUnread).length;

  const handleVoteLocalParty = (partyId, partyName) => {
    // Strictly select only ONE party
    setSelectedPartyId(partyId);
    const found = (currentLocation?.parties || []).find(p => p.id === partyId);
    const chosen = found || { id: partyId, name: partyName };
    if (onSelectSurveyParty) {
      onSelectSurveyParty(chosen);
    }
    setVoteToast(`🎉 ${partyName} ఎంపిక చేయబడింది! Survey Starting...`);
    setTimeout(() => {
      setVoteToast(null);
      if (onNavigate) {
        onNavigate('survey');
      }
    }, 450);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Top Header with Compact Location Pill */}
      <div className="px-3 py-2 flex items-center justify-between gap-2 border-b border-[#1C1C22] bg-[#0E0E12] shrink-0 z-30">
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
            title="Open Menu"
          >
            <Menu className="w-4 h-4 text-[#F5C754]" />
          </button>

          <div 
            onClick={() => {
              setLogoTapCount(prev => {
                if (prev + 1 >= 3) {
                  onNavigate('admin');
                  return 0;
                }
                return prev + 1;
              });
            }}
            className="flex items-center gap-1.5 cursor-pointer shrink-0"
            title="NowNine"
          >
            <img 
              src="/now9_icon.png" 
              alt="now9" 
              className="w-6 h-6 object-contain rounded-full shadow-xs shrink-0 hover:scale-105 transition-transform" 
            />
            <span className="font-extrabold text-xs text-white hidden xs:inline">
              now<span className="text-[#F5C754]">nine</span>
            </span>
          </div>
        </div>

        {/* Compact Location Pill in Header Bar */}
        <button
          type="button"
          onClick={() => setIsConstituencyModalOpen(true)}
          className="flex-1 max-w-[195px] px-2 py-1 rounded-full bg-[#161622] hover:bg-[#20202E] border border-amber-500/35 text-left transition-all flex items-center justify-between gap-1.5 cursor-pointer shadow-sm group hover:border-amber-400"
          title="Click to search or change location"
        >
          <div className="flex items-center gap-1 min-w-0">
            <MapPin className="w-3 h-3 text-[#F5C754] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-extrabold text-white truncate group-hover:text-amber-300">
                  {currentLocation?.locality || currentLocation?.city || 'Locating...'}
                </span>
                <ChevronDown className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              </div>
              <p className="text-[7.5px] text-gray-400 truncate">
                {currentLocation?.assembly || currentLocation?.district || 'Telangana'}
              </p>
            </div>
          </div>
          {isLocating ? (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          )}
        </button>

        <button 
          type="button"
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="text-gray-300 hover:text-white p-1 relative rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer shrink-0"
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
                  <img 
                    src="/now9_icon.png" 
                    alt="now9" 
                    className="w-9 h-9 object-contain rounded-full shadow-md"
                  />
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
                  { label: 'NowNine News', icon: Newspaper, target: 'news', color: 'text-[#F5C754]' },
                  { label: 'Live On', icon: Radio, target: 'live-debates', color: 'text-red-400' },
                  { label: 'Boss of House', icon: Eye, target: 'big-boss', color: 'text-amber-400' },
                  { label: 'Common People', icon: Users, target: 'common-people', color: 'text-emerald-400' },
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

                {/* Admin Command Center Quick Switch on Mobile */}
                <button 
                  type="button"
                  onClick={() => {
                    onNavigate('admin');
                    setIsMenuOpen(false);
                  }}
                  className="w-full p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-[#FDE047] flex items-center justify-between transition-colors cursor-pointer text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Command Center</span>
                  </span>
                  <span className="text-[9px] bg-[#F5C754] text-black px-1.5 py-0.5 rounded-full font-black">
                    PORTAL
                  </span>
                </button>
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
        {showSurveyParties ? (
          /* DEDICATED SURVEY PARTIES VIEW - ONLY PARTIES, NO OTHER SECTIONS */
          <div className="space-y-3 animate-fadeIn pb-4">
            {/* Top Navigation Bar for Survey Mode */}
            <div className="flex items-center justify-between pb-2 border-b border-[#20202A]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSurveyParties(false)}
                  className="p-1.5 rounded-xl bg-[#14141E] hover:bg-[#1E1E2C] border border-[#282838] text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                  title="Return to Home Feed"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <div>
                  <h2 className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>🏛️ Local Political Parties</span>
                    <span className="text-[7.5px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      1 Party Only
                    </span>
                  </h2>
                  <p className="text-[8px] text-gray-400">
                    {currentLocation?.locality || 'Your Area'} • {currentLocation?.assembly || 'Constituency'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSurveyParties(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Close Survey"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction banner */}
            <div className="px-1 flex items-center justify-between">
              <span className="text-[9.5px] font-bold text-gray-300">
                Select your party to vote & evaluate:
              </span>
              <span className="text-[8px] text-amber-300 font-mono">
                {(currentLocation?.parties || []).length} Contesting Parties
              </span>
            </div>

            {/* 2x2 Party Tiles Grid styled exactly like the reference boxes */}
            <div className="grid grid-cols-2 gap-2.5">
              {(currentLocation?.parties || []).map((party) => {
                const isSelected = selectedPartyId === party.id;
                const partyStatus = party.status || party.role || 'Contestant';
                return (
                  <button
                    key={party.id}
                    type="button"
                    onClick={() => handleVoteLocalParty(party.id, party.name)}
                    className={`p-3.5 rounded-2xl bg-[#0C1421] border cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center group active:scale-[0.98] shadow-md shadow-black/40 relative ${
                      isSelected
                        ? 'border-[#F5C754] bg-[#0E1A2C] shadow-lg shadow-[#F5C754]/20 ring-1 ring-[#F5C754]'
                        : 'border-[#1B2A41] hover:border-[#F5C754]/60'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#F5C754] text-black text-[7px] font-black shadow-xs flex items-center gap-0.5 animate-fadeIn">
                        ✓ Selected
                      </span>
                    )}

                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-transform shadow-inner group-hover:scale-105 ${
                      isSelected ? 'border-[#F5C754] bg-[#F5C754]/25 text-[#F5C754]' : 'border-[#F5C754] bg-[#F5C754]/10 text-[#F5C754]'
                    }`}>
                      <span className="text-2xl select-none leading-none">
                        {party.symbol || '🗳️'}
                      </span>
                    </div>

                    {(party.isKutami || party.name?.includes('కూటమి') || party.name?.includes('Kutami') || party.teluguName?.includes('కూటమి')) && (
                      <span className="mb-1.5 px-2 py-0.5 rounded-full text-[8.5px] font-black bg-gradient-to-r from-amber-500/25 to-yellow-500/25 text-amber-300 border border-amber-400/50 shadow-xs flex items-center gap-1">
                        <span>🤝</span>
                        <span>కూటమి (Kutami)</span>
                      </span>
                    )}
                    <h3 className="font-black text-[13.5px] sm:text-[14px] text-white leading-snug tracking-tight">
                      {party.name}
                    </h3>

                    {party.telugu && (
                      <p className="text-[10px] text-slate-300 mt-1 font-medium tracking-normal line-clamp-1 font-telugu">
                        {party.telugu}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-center gap-1 max-w-full">
                      <span className="text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 flex items-center gap-1 max-w-full truncate">
                        <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                        <span className="truncate">{constituencyLabel}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar when a party is selected or to proceed to survey questions */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('survey')}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F8CD55] to-[#E3A336] text-black font-extrabold text-[10px] shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Vote className="w-3.5 h-3.5" />
                <span>
                  {selectedPartyId 
                    ? `Continue Survey with ${(currentLocation?.parties || []).find(p => p.id === selectedPartyId)?.name || 'Selected Party'} →`
                    : 'Start 5-Question Governance Survey →'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowSurveyParties(false)}
                className="w-full py-2 px-3 rounded-xl bg-[#14141E] hover:bg-[#1E1E2C] border border-[#262634] text-gray-400 hover:text-white text-[9.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Close Survey & Return to Home Feed</span>
              </button>
            </div>
          </div>
        ) : (
          /* NORMAL HOME FEED - SHOWN ONLY WHEN NOT IN SURVEY MODE */
          <>
            {/* Greeting */}
            <div>
              <h2 className="text-sm font-extrabold text-white">Good Evening!</h2>
              <p className="text-[10px] text-gray-400">Stay informed. Stay ahead.</p>
            </div>

            {/* Hero Card: Political Survey */}
            <div 
              onClick={() => setShowSurveyParties(true)}
              className="relative rounded-2xl p-3.5 bg-gradient-to-r from-[#1E1B14] via-[#2A2312] to-[#1A1813] border border-amber-500/40 shadow-lg cursor-pointer overflow-hidden group hover:border-amber-400 transition-all"
            >
              <div className="relative z-10 max-w-[68%]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                    Live Constituency Survey
                  </span>
                </div>
                <div className="mb-1.5 leading-tight">
                  <h3 className="text-lg sm:text-[20px] font-black text-white tracking-wide">
                    Now 9 VOTING
                  </h3>
                </div>
                <span className="text-[9px] text-gray-300 block mb-2 mt-0.5 leading-tight">
                  Vote for your preferred political party & rate governance in <strong className="text-amber-300">{currentLocation?.locality || 'Your Area'}</strong>.
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSurveyParties(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F8CD55] to-[#E3A336] text-black font-extrabold text-[9.5px] shadow-sm group-hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Vote className="w-2.5 h-2.5" />
                    <span>Take Survey & Vote Local</span>
                    <ChevronRight className="w-3 h-3 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Hand dropping ballot icon illustration */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center opacity-85 group-hover:scale-110 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
                  🗳️
                </div>
              </div>
            </div>

            {/* 2x2 Feature Tiles Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Tile 1: Live On */}
              <button 
                type="button"
                onClick={() => {
                  if (activeBroadcast?.isLive) {
                    setSelectedDebate({ ...activeBroadcast, isLive: true });
                    onNavigate('debate-detail');
                  } else {
                    onNavigate('live-debates');
                  }
                }}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1421] border border-[#1B2A41] hover:border-[#F5C754]/60 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center group active:scale-[0.98] shadow-md shadow-black/40"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#F5C754] flex items-center justify-center text-[#F5C754] mb-2 bg-[#F5C754]/10 group-hover:scale-105 transition-transform shadow-inner relative">
                  <Play className="w-5 h-5 fill-[#F5C754] stroke-[#F5C754] ml-0.5" />
                  {activeBroadcast?.isLive && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                  )}
                </div>
                <h3 className="font-black text-[14px] sm:text-[15px] text-white leading-snug tracking-tight flex items-center justify-center gap-1">
                  <span>Live On</span>
                  {activeBroadcast?.isLive && (
                    <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[7.5px] font-black uppercase tracking-wider">LIVE</span>
                  )}
                </h3>
                <p className="text-[10px] text-slate-300 mt-1 font-medium tracking-normal">
                  Watch • Listen • Discuss
                </p>
              </button>

              {/* Tile 2: News */}
              <button 
                type="button"
                onClick={() => onNavigate('news')}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1421] border border-[#1B2A41] hover:border-[#F5C754]/60 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center group active:scale-[0.98] shadow-md shadow-black/40"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#F5C754] flex items-center justify-center text-[#F5C754] mb-2 bg-[#F5C754]/10 group-hover:scale-105 transition-transform shadow-inner">
                  <Newspaper className="w-5 h-5 text-[#F5C754]" />
                </div>
                <h3 className="font-black text-[14px] sm:text-[15px] text-white leading-snug tracking-tight">
                  News
                </h3>
                <p className="text-[10px] text-slate-300 mt-1 font-medium tracking-normal">
                  Breaking • State • Local
                </p>
              </button>

              {/* Tile 3: Common Talks & People */}
              <button 
                type="button"
                onClick={() => onNavigate('common-people')}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1421] border border-[#1B2A41] hover:border-[#F5C754]/60 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center group active:scale-[0.98] shadow-md shadow-black/40 relative"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#F5C754] flex items-center justify-center text-[#F5C754] mb-2 bg-[#F5C754]/10 group-hover:scale-105 transition-transform shadow-inner relative">
                  <Users className="w-5 h-5 text-[#F5C754]" />
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[7px] font-black uppercase tracking-wider">
                    REELS
                  </span>
                </div>
                <h3 className="font-black text-[14px] sm:text-[15px] text-white leading-snug tracking-tight flex items-center justify-center gap-1">
                  <span>Common Talks</span>
                </h3>
                <p className="text-[10px] text-slate-300 mt-1 font-medium tracking-normal">
                  Upload Videos • Real Stories
                </p>
              </button>

              {/* Tile 4: Boss of House */}
              <button 
                type="button"
                onClick={() => onNavigate('big-boss')}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1421] border border-[#1B2A41] hover:border-[#F5C754]/60 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center group active:scale-[0.98] shadow-md shadow-black/40"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#F5C754] flex items-center justify-center text-[#F5C754] mb-2 bg-[#F5C754]/10 group-hover:scale-105 transition-transform shadow-inner">
                  <Eye className="w-5 h-5 text-[#F5C754]" />
                </div>
                <h3 className="font-black text-[14px] sm:text-[15px] text-white leading-snug tracking-tight">
                  Boss of House
                </h3>
                <p className="text-[10px] text-slate-300 mt-1 font-medium tracking-normal">
                  Voting • Polls • Drama
                </p>
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

            {/* Live Debate Spotlight Section (Synced with Live Broadcast Store) */}
            <div 
              onClick={() => {
                if (activeBroadcast?.isLive) {
                  setSelectedDebate({ ...activeBroadcast, isLive: true });
                  onNavigate('debate-detail');
                } else if (recordedSessions[0]) {
                  setSelectedDebate({ ...recordedSessions[0], isRecorded: true });
                  onNavigate('debate-detail');
                } else {
                  onNavigate('live-debates');
                }
              }}
              className={`p-3 rounded-2xl bg-gradient-to-r from-[#1A1212] via-[#241414] to-[#161214] border transition-all cursor-pointer group ${
                activeBroadcast?.isLive ? 'border-red-500/70 shadow-lg shadow-red-500/20' : 'border-red-500/30 hover:border-red-500/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-white flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeBroadcast?.isLive ? 'bg-red-500 animate-ping' : 'bg-amber-400'}`}></span>
                  <span>{activeBroadcast?.isLive ? '🔴 LIVE DEBATE NOW ON AIR' : '🎬 Watch Recorded Debate'}</span>
                </span>
                <span className="text-[8px] text-red-400 font-semibold group-hover:underline">
                  {activeBroadcast?.isLive ? 'Join Live >' : 'Watch >'}
                </span>
              </div>
              <p className="font-telugu text-[10px] font-bold text-white leading-snug">
                {activeBroadcast?.isLive 
                  ? activeBroadcast.title 
                  : (recordedSessions[0]?.title || '2026 ఎన్నికలు : ఎవరికి అవకాశాలు?')}
              </p>
              <p className="text-[8px] text-gray-400 mt-0.5">
                {activeBroadcast?.isLive
                  ? `Live with ${activeBroadcast.host} • 🌐 Global Broadcast (Visible to All Users) • 14,280 Watching`
                  : `${recordedSessions[0]?.host || 'Now9 Prime Desk'} • ${recordedSessions[0]?.duration || '28:40'} • ${recordedSessions[0]?.views || '14.8K views'}`}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Toast Notification for Local Voting */}
      {voteToast && (
        <div className="absolute top-12 left-4 right-4 z-50 bg-[#161410] border border-amber-400 text-amber-300 px-3 py-1.5 rounded-xl text-[10px] font-bold text-center shadow-2xl animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{voteToast}</span>
        </div>
      )}

      {/* Constituency Switcher Modal */}
      <ConstituencyPickerModal
        isOpen={isConstituencyModalOpen}
        onClose={() => setIsConstituencyModalOpen(false)}
        currentLocation={currentLocation}
        onLocationChange={(item) => {
          onLocationChange(item);
          setVoteToast(`📍 Address set to: ${item.locality}, ${item.city}`);
          setTimeout(() => setVoteToast(null), 3000);
        }}
        onDetectLiveGps={onDetectLiveGps}
        isLocating={isLocating}
      />


      <BottomNavBar activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}

// 3. SCREEN 3: POLITICAL SURVEY SCREEN (Local Parties Voting + 5-Question Flow + Live Results)
export function Screen3Survey({ 
  onBack, 
  onFinish, 
  onNavigate = null,
  selectedParty = null,
  currentLocation = null,
  onLocationChange = () => {},
  isLocating = false,
  onDetectLiveGps = () => {},
  onSelectSurveyParty = () => {}
}) {
  const loc = currentLocation || DEFAULT_DETECTED_LOCATION;
  const partiesList = loc?.parties || [];

  const constituencyLabel = (() => {
    const raw = loc?.assembly || 'Constituency';
    const clean = raw
      .replace(/\s*Assembly\s*Constituency\s*/gi, '')
      .replace(/\s*Assembly\s*/gi, '')
      .replace(/\s*Constituency\s*/gi, '')
      .trim();
    return clean ? `${clean} Constituency` : 'Local Constituency';
  })();

  // Dynamic questions list supporting extra questions added from admin
  const [questionsList, setQuestionsList] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('now9_custom_questions_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return SURVEY_QUESTIONS;
  });

  useEffect(() => {
    const handleQuestionsUpdate = () => {
      try {
        const stored = localStorage.getItem('now9_custom_questions_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) setQuestionsList(parsed);
        }
      } catch (e) {}
    };
    window.addEventListener('now9_questions_updated', handleQuestionsUpdate);
    window.addEventListener('storage', handleQuestionsUpdate);
    return () => {
      window.removeEventListener('now9_questions_updated', handleQuestionsUpdate);
      window.removeEventListener('storage', handleQuestionsUpdate);
    };
  }, []);

  // Active view tab: 'parties' | 'questions' | 'results'
  const [activeTab, setActiveTab] = useState(() => (selectedParty ? 'questions' : 'parties'));
  // Strictly single chosen party
  const [chosenParty, setChosenParty] = useState(selectedParty);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isConstituencyModalOpen, setIsConstituencyModalOpen] = useState(false);

  useEffect(() => {
    if (selectedParty) {
      setChosenParty(selectedParty);
    }
  }, [selectedParty]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleVoteAndSelectParty = (party) => {
    // Strictly select only ONE party
    setChosenParty(party);
    if (onSelectSurveyParty) {
      onSelectSurveyParty(party);
    }
    recordCustomerActivity({
      type: 'survey',
      title: 'Survey Party Selected',
      detail: `Citizen picked "${party.name}" for governance survey in ${constituencyLabel}`,
      location: constituencyLabel,
      icon: '🗳️',
      badgeColor: 'emerald',
      badgeText: 'Party Choice'
    });
    showToast(`🎉 ${party.name} ఎంపిక చేయబడింది!`);
    setTimeout(() => {
      setActiveTab('questions');
    }, 450);
  };

  const activeQuestion = questionsList[currentStep] || questionsList[0];
  const progressPercent = ((currentStep + 1) / questionsList.length) * 100;
  const selectedOptionIdx = answers[currentStep] ?? 0;

  const handleSelectOption = (idx) => {
    setAnswers(prev => ({ ...prev, [currentStep]: idx }));
    const optObj = activeQuestion?.options?.[idx];
    const optText = optObj?.text || `Option ${idx + 1}`;
    recordCustomerActivity({
      type: 'survey',
      title: `Governance Priority #${currentStep + 1} Answered`,
      detail: `Citizen selected "${optText}" on "${activeQuestion?.questionTelugu || activeQuestion?.question || 'Survey Question'}"`,
      location: constituencyLabel,
      icon: '📊',
      badgeColor: 'amber',
      badgeText: `Priority #${currentStep + 1}`
    });
  };

  const handleNext = () => {
    if (currentStep < questionsList.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitted(true);
      setActiveTab('submitted');
      // Record real live ballot into Admin system
      recordLiveBallot({
        party: chosenParty,
        location: loc,
        answers: answers
      });
      showToast('🎉 మీ ఓటు విజయవంతంగా నమోదైంది! (Vote Recorded)');
    }
  };

  const handlePrev = () => {
    if (isSubmitted || activeTab === 'submitted') {
      setIsSubmitted(false);
      setActiveTab('questions');
    } else if (activeTab === 'questions') {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      } else {
        setActiveTab('parties');
      }
    } else {
      onBack();
    }
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
              {isSubmitted || activeTab === 'submitted'
                ? 'ఓటు నమోదైంది (Vote Submitted)' 
                : activeTab === 'parties'
                  ? 'Local Political Parties'
                  : chosenParty 
                    ? `Vote Survey • ${chosenParty.name}` 
                    : 'Political Survey'}
            </h2>
            <p className="text-[8px] text-gray-400 leading-none mt-0.5">
              {isSubmitted || activeTab === 'submitted'
                ? 'Official Citizen Sentiment 2026 • Confidential' 
                : activeTab === 'parties'
                  ? `${loc?.locality || 'Your Area'} • ${loc?.assembly || 'Assembly'}`
                  : chosenParty 
                    ? `${chosenParty.name} • Question ${currentStep + 1} of 5` 
                    : `Question ${currentStep + 1} of 5 • Your Opinion Matters`}
            </p>
          </div>
        </div>

        {/* Live Vote Count Badge */}
        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[#FDE047] text-[8px] font-extrabold flex items-center gap-1">
          <Vote className="w-2.5 h-2.5 text-amber-400" />
          <span>12.4K Voted</span>
        </span>
      </div>

      {/* Survey Workflow Steps / Tabs - Public results tab removed as requested */}
      {isSubmitted || activeTab === 'submitted' ? (
        <div className="px-3 py-1.5 bg-[#0E0E12] border-b border-[#1C1C24] flex items-center justify-between shrink-0">
          <span className="text-[9.5px] font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>✓ Survey Completed • Confidential Ballot</span>
          </span>
          <span className="text-[8px] text-gray-400 font-mono">Status: Recorded ✓</span>
        </div>
      ) : (
        <div className="px-3 py-1.5 bg-[#0E0E12] border-b border-[#1C1C24] flex items-center justify-between gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('parties')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'parties'
                ? 'bg-amber-500/20 text-[#FDE047] border border-amber-400/40 shadow-xs'
                : 'text-gray-400 hover:text-white hover:bg-[#16161E]'
            }`}
          >
            <Vote className="w-3 h-3" />
            <span>1. Parties ({partiesList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (chosenParty) {
                setActiveTab('questions');
              } else {
                showToast('⚠️ Pick a party first');
              }
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-amber-500/20 text-[#FDE047] border border-amber-400/40 shadow-xs'
                : 'text-gray-400 hover:text-white hover:bg-[#16161E]'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>2. Survey ({currentStep + 1}/5)</span>
          </button>
        </div>
      )}

      {/* Main Body */}
      {/* VIEW 1: POLITICAL PARTIES */}
      {activeTab === 'parties' && (
        <div className="flex-1 min-h-0 px-3 py-2.5 overflow-y-auto phone-scroll touch-pan-y space-y-3 pb-6">
          <div className="rounded-2xl p-3 bg-gradient-to-b from-[#181822] via-[#14141A] to-[#0D0D12] border border-amber-500/35 shadow-xl space-y-2 relative overflow-hidden">
            {/* Subtle gold accent aura */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Header row: Local Parties & Constituency */}
            <div className="flex items-center justify-between pb-1.5 border-b border-[#22222E]">
              <div>
                <h3 className="text-[11px] font-black text-white flex items-center gap-1.5">
                  <span>🏛️ Local Political Parties</span>
                  <span className="text-amber-400 font-bold text-[9px]">({loc?.locality || 'Your Area'})</span>
                </h3>
                <p className="text-[8px] text-gray-400">
                  Political parties & citizen approval in {loc?.assembly || 'Constituency'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsConstituencyModalOpen(true)}
                className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:bg-amber-500/25 transition-all text-[8px] font-bold flex items-center gap-0.5 cursor-pointer"
                title="Change or search constituency"
              >
                <span>Change</span>
                <ChevronRight className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Contesting Political Parties in this Area */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
                    <span>Political Parties in {loc?.locality || 'Your Area'}</span>
                    <span className="text-[7.5px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      1 Party Only
                    </span>
                  </h3>
                  <p className="text-[8px] text-gray-400">
                    Contesting political parties • Tap one party to vote & evaluate
                  </p>
                </div>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono">
                  {partiesList.length} Parties
                </span>
              </div>

              {/* Contesting Political Parties in 2x2 Boxes Matching Reference */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {partiesList.map((party) => {
                  const isSelected = chosenParty?.id === party.id;
                  const partyStatus = party.status || party.role || 'Contestant';
                  return (
                    <button
                      key={party.id}
                      type="button"
                      onClick={() => handleVoteAndSelectParty(party)}
                      className={`p-3.5 rounded-2xl bg-[#0C1421] border cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center group active:scale-[0.98] shadow-md shadow-black/40 relative ${
                        isSelected
                          ? 'border-[#F5C754] bg-[#0E1A2C] shadow-lg shadow-[#F5C754]/20 ring-1 ring-[#F5C754]'
                          : 'border-[#1B2A41] hover:border-[#F5C754]/60'
                      }`}
                    >
                      {/* Single Selected badge */}
                      {isSelected && (
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#F5C754] text-black text-[7px] font-black shadow-xs flex items-center gap-0.5 animate-fadeIn">
                          ✓ Selected
                        </span>
                      )}

                      {/* Golden circular outline icon matching reference */}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-transform shadow-inner group-hover:scale-105 ${
                        isSelected ? 'border-[#F5C754] bg-[#F5C754]/25 text-[#F5C754]' : 'border-[#F5C754] bg-[#F5C754]/10 text-[#F5C754]'
                      }`}>
                        <span className="text-2xl select-none leading-none">
                          {party.symbol || '🗳️'}
                        </span>
                      </div>

                      {(party.isKutami || party.name?.includes('కూటమి') || party.name?.includes('Kutami') || party.teluguName?.includes('కూటమి')) && (
                        <span className="mb-1.5 px-2 py-0.5 rounded-full text-[8.5px] font-black bg-gradient-to-r from-amber-500/25 to-yellow-500/25 text-amber-300 border border-amber-400/50 shadow-xs flex items-center gap-1">
                          <span>🤝</span>
                          <span>కూటమి (Kutami)</span>
                        </span>
                      )}
                      {/* Party Name */}
                      <h3 className="font-black text-[13.5px] sm:text-[14px] text-white leading-snug tracking-tight">
                        {party.name}
                      </h3>

                      {party.telugu && (
                        <p className="text-[10px] text-slate-300 mt-1 font-medium tracking-normal line-clamp-1 font-telugu">
                          {party.telugu}
                        </p>
                      )}

                      <div className="mt-2 flex items-center justify-center gap-1 max-w-full">
                        <span className="text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 flex items-center gap-1 max-w-full truncate">
                          <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                          <span className="truncate">{constituencyLabel}</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-1 text-center">
                <span className="text-[7px] text-gray-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Real-time constituency mapping for Telangana & Andhra Pradesh</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick skip button to general survey questions */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('questions')}
              className="w-full py-2 px-3 rounded-xl bg-[#14141A] border border-[#23232C] text-gray-300 hover:text-white hover:border-amber-400/40 text-[9.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Skip directly to General Survey Questions</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: 5-STEP POLICY & GOVERNANCE OPINION SURVEY */}
      {activeTab === 'questions' && !isSubmitted && (
        <div className="flex-1 min-h-0 px-3 py-3 overflow-y-auto phone-scroll touch-pan-y flex flex-col justify-between pb-4">
          <div>
            {/* If a party is chosen, show party badge with option to change */}
            {chosenParty ? (
              <div className="mb-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{chosenParty.symbol || '🗳️'}</span>
                  <div>
                    <span className="text-[9.5px] font-bold text-white block leading-tight">
                      Selected: {chosenParty.name}
                    </span>
                    <span className="text-[7.5px] text-amber-300 block font-telugu">
                      {chosenParty.telugu || loc?.locality}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('parties')}
                  className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[8px] font-bold hover:bg-amber-400/30 transition-colors cursor-pointer"
                >
                  Change Party
                </button>
              </div>
            ) : (
              <div className="mb-2.5 p-2 rounded-xl bg-[#14141A] border border-[#23232C] flex items-center justify-between">
                <span className="text-[8.5px] text-gray-300">
                  🏛️ Haven't picked a party yet?
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('parties')}
                  className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[8px] font-bold hover:bg-amber-400/30 transition-colors cursor-pointer"
                >
                  Pick Party
                </button>
              </div>
            )}

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
            <button
              type="button"
              onClick={handlePrev}
              className="py-2.5 px-3 rounded-full bg-[#16161D] border border-[#2B2B36] text-gray-300 font-bold text-xs hover:bg-[#202028] hover:text-white transition-all cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{currentStep === 0 ? 'Parties' : 'Prev'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F8CD55] via-[#E3A336] to-[#C58319] text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>{currentStep === questionsList.length - 1 ? 'Submit Answers 🗳️' : 'Next Question'}</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: SUBMITTED LIVE PULSE RESULTS */}
      {/* VIEW 3: SUBMITTED CONFIRMATION (VOTING RESULTS REMOVED AS REQUESTED; NOW SHOWN IN ADMIN PANEL) */}
      {(isSubmitted || activeTab === 'submitted') && (
        <div className="flex-1 min-h-0 px-3 py-3 overflow-y-auto phone-scroll touch-pan-y space-y-3 pb-6">
          {/* Main Success Card */}
          <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-[#1E1B12] via-[#14141A] to-[#0E0E14] border border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-2 shadow-inner">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 stroke-[2.5]" />
            </div>

            <h3 className="font-telugu text-sm font-black text-white leading-snug">
              ధన్యవాదాలు! మీ అభిప్రాయం రికార్డయింది.
            </h3>
            <p className="text-[10px] text-emerald-300 font-semibold mt-1">
              ✓ Vote Successfully Recorded & Encrypted
            </p>
            <p className="text-[9px] text-gray-400 mt-1 leading-relaxed">
              {chosenParty 
                ? `Your anonymous vote for ${chosenParty.name} has been recorded.` 
                : "Your anonymous opinion has been securely added to the 2026 People's Pulse."}
            </p>

            {/* Selected Choice Summary Card */}
            {chosenParty && (
              <div className="mt-3 p-2.5 rounded-xl bg-[#0D0D12] border border-white/10 flex items-center justify-between text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{chosenParty.symbol || '🗳️'}</span>
                  <div>
                    <h4 className="text-[11px] font-black text-white leading-tight">{chosenParty.name}</h4>
                    <p className="text-[8px] text-gray-400 font-telugu">{chosenParty.telugu || loc?.locality || 'Local'}</p>
                  </div>
                </div>
                <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  Confirmed ✓
                </span>
              </div>
            )}
          </div>

          {/* Official Secret Ballot Notice - Explaining results are held securely in Admin Panel */}
          <div className="p-3 rounded-2xl bg-[#121218] border border-amber-500/25 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                🔒 రహస్య బ్యాలెట్ • Confidential Survey
              </span>
            </div>
            <p className="font-telugu text-[9px] text-gray-300 leading-relaxed">
              ఎన్నికల నియమావళి ప్రకారం సర్వే ఫలితాలు అంతర్గతంగా భద్రపరచబడతాయి. సమగ్ర విశ్లేషణ మరియు ఫలితాలు అడ్మిన్ ప్యానెల్ ద్వారా మాత్రమే పర్యవేక్షించబడతాయి.
            </p>
            <p className="text-[8.5px] text-gray-400 leading-normal">
              As per survey policy, individual results are kept private and aggregate analytics are available exclusively to Election Analysts in the Admin Panel.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-1">
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

      {/* Constituency Switcher Modal */}
      <ConstituencyPickerModal
        isOpen={isConstituencyModalOpen}
        onClose={() => setIsConstituencyModalOpen(false)}
        currentLocation={loc}
        onLocationChange={(item) => {
          onLocationChange(item);
          showToast(`📍 Constituency set to: ${item.locality}, ${item.city}`);
        }}
        onDetectLiveGps={onDetectLiveGps}
        isLocating={isLocating}
      />

      <BottomNavBar activeTab="survey" onTabChange={onNavigate || onBack} />
    </div>
  );
}

// 4. SCREEN 4: LIVE DEBATES SCREEN
export function Screen4LiveDebates({ onBack, onSelectDebate, onNavigate }) {
  const [filter, setFilter] = useState('Live Now');
  const [reminders, setReminders] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [activeBroadcast, setActiveBroadcast] = useState(() => getActiveBroadcast());
  const [recordedSessions, setRecordedSessions] = useState(() => getRecordedSessions());

  useEffect(() => {
    const unsub = subscribeBroadcast(({ activeBroadcast: ab, recordedSessions: rs }) => {
      if (ab) setActiveBroadcast(ab);
      if (rs) setRecordedSessions(rs);
    });
    return unsub;
  }, []);

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

  const handleWatchItem = (item) => {
    setSelectedDebate(item);
    recordCustomerActivity({
      type: 'live',
      title: item.isLive ? 'Tuned into Live Debate' : 'Watching Recorded Debate',
      detail: `Citizen opened stream: "${item.title}" (${item.host || 'Political Studio'})`,
      location: 'Live Debate Studio',
      icon: item.isLive ? '🔴' : '🎬',
      badgeColor: item.isLive ? 'red' : 'amber',
      badgeText: item.isLive ? 'Live On Air' : 'Recorded Debate'
    });
    if (onSelectDebate) onSelectDebate();
  };

  // Build filtered debates dynamically
  let displayList = [];
  if (filter === 'Live Now') {
    if (activeBroadcast?.isLive) {
      displayList.push({
        id: activeBroadcast.id || 'admin-live',
        title: activeBroadcast.title,
        host: activeBroadcast.host,
        time: 'Broadcasting Live',
        views: `${(activeBroadcast.viewers / 1000).toFixed(1)}K watching`,
        isLive: true,
        img: activeBroadcast.thumbnail || '/assets/news_debate_studio.jpg',
        isAdminLive: true
      });
    }
    const standardLive = LIVE_DEBATES.filter(item => item.isLive);
    displayList = [...displayList, ...standardLive];
  } else if (filter === 'Past') {
    // Recorded sessions from store
    displayList = recordedSessions.map(rec => ({
      id: rec.id,
      title: rec.title,
      host: rec.host,
      time: rec.date || 'Recorded Session',
      duration: rec.duration,
      views: rec.views,
      isLive: false,
      isRecorded: true,
      img: rec.thumbnail || '/assets/news_debate_studio.jpg',
      videoUrl: rec.videoUrl
    }));
  } else {
    // Upcoming
    displayList = LIVE_DEBATES.filter(item => !item.isLive);
  }

  const heroItem = activeBroadcast?.isLive ? {
    id: activeBroadcast.id || 'admin-live',
    title: activeBroadcast.title,
    subtitle: `🔴 Live Broadcast • ${activeBroadcast.host || 'Now9 Prime Desk'} • 🌐 All Users (Global Broadcast)`,
    views: `${(activeBroadcast.viewers / 1000).toFixed(1)}K Watching`,
    isLive: true,
    img: activeBroadcast.thumbnail || '/assets/news_debate_studio.jpg',
    videoUrl: activeBroadcast.videoUrl
  } : (recordedSessions[0] ? {
    title: recordedSessions[0].title,
    subtitle: `Recorded Debate • ${recordedSessions[0].host} • ${recordedSessions[0].duration}`,
    views: recordedSessions[0].views,
    isLive: false,
    img: recordedSessions[0].thumbnail || '/assets/news_debate_studio.jpg',
    isRecorded: true
  } : {
    title: '2026 ఎన్నికలు : ఎవరికి అవకాశాలు?',
    subtitle: 'Political Debate • 4 Experts • Public Q&A',
    views: '12.4K Watching',
    isLive: false,
    img: '/assets/news_debate_studio.jpg'
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
          <h2 className="text-xs font-extrabold text-white">Live On & Debates</h2>
        </div>
        <div className="flex items-center gap-1.5">
          {activeBroadcast?.isLive ? (
            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[8px] font-extrabold uppercase flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>LIVE NOW</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-[#181824] text-gray-400 text-[8px] font-bold">
              24/7 Citizen Debates
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 px-3 py-2 overflow-y-auto phone-scroll touch-pan-y space-y-2.5 pb-6">
        {/* Main Hero Debate Video Card */}
        <div 
          onClick={() => handleWatchItem(heroItem)}
          className={`rounded-2xl overflow-hidden bg-[#141419] border transition-all cursor-pointer group active:scale-[0.99] ${
            heroItem.isLive ? 'border-red-500/60 shadow-lg shadow-red-500/10' : 'border-[#242432]'
          }`}
        >
          <div className="relative h-28 w-full overflow-hidden">
            <img 
              src={heroItem.img} 
              alt="Live Debate Studio" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30"></div>
            
            {/* Top Badges */}
            <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between">
              {heroItem.isLive ? (
                <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[8px] font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  LIVE NOW
                </span>
              ) : (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[8px] font-bold uppercase">
                  RECORDED SESSION
                </span>
              )}
              <span className="px-1.5 py-0.5 rounded bg-black/60 text-white text-[8px] font-semibold flex items-center gap-0.5">
                <Eye className="w-2.5 h-2.5 text-red-400" />
                {heroItem.views}
              </span>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          <div className="p-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-telugu text-[11px] font-bold text-white line-clamp-1 group-hover:text-amber-300">
                {heroItem.title}
              </h3>
              <p className="text-[8px] text-gray-400 mt-0.5 truncate">
                {heroItem.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleWatchItem(heroItem);
              }}
              className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[9px] font-extrabold shadow-sm hover:brightness-110 shrink-0 cursor-pointer"
            >
              {heroItem.isLive ? 'Watch Live →' : 'Watch ▶'}
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          {['Live Now', 'Past', 'Upcoming'].map((tabName) => {
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
                {tabName === 'Past' ? 'Past / Recorded' : tabName}
              </button>
            );
          })}
        </div>

        {/* Debates List */}
        <div className="space-y-1.5">
          {displayList.length === 0 ? (
            <div className="p-4 text-center rounded-xl bg-[#141419] border border-[#222228] text-gray-400 text-[10px]">
              {filter === 'Live Now' 
                ? 'No live broadcast on air currently. Click "Past / Recorded" to watch recorded sessions.' 
                : `No debates under "${filter}".`}
            </div>
          ) : (
            displayList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleWatchItem(item)}
                className="p-1.5 rounded-xl bg-[#141419] border border-[#222228] flex items-center gap-2 cursor-pointer hover:border-amber-500/50 transition-all group"
              >
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 relative bg-black">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {item.isLive ? (
                    <span className="absolute top-0.5 left-0.5 px-1 rounded bg-red-600 text-white text-[7px] font-black">
                      LIVE
                    </span>
                  ) : item.isRecorded ? (
                    <span className="absolute top-0.5 left-0.5 px-1 rounded bg-amber-500 text-black text-[7px] font-black">
                      REC
                    </span>
                  ) : (
                    <span className="absolute top-0.5 left-0.5 px-1 rounded bg-black/70 text-amber-400 text-[7px] font-bold">
                      UPCOMING
                    </span>
                  )}
                  {item.duration && (
                    <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/80 text-white text-[7px] font-mono">
                      {item.duration}
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
                {filter === 'Upcoming' ? (
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
                      handleWatchItem(item);
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

      {/* Instagram-style Video Upload Modal */}
      <InstagramVideoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onVideoUploaded={() => {
          showToast('🎉 Video published to Common Talks & Shorts feed!');
        }}
      />

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
            onClick={() => {
              recordCustomerActivity({
                type: 'video',
                title: 'Citizen Watching Short Video',
                detail: `Citizen playing video: "${item.title}" (${item.views} views)`,
                location: 'Shorts Feed',
                icon: '▶️',
                badgeColor: 'purple',
                badgeText: item.badge || 'Short Video'
              });
              if (onSelectShort) onSelectShort();
            }}
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

// 6. SCREEN 6: COMMON PEOPLE SCREEN (Common Talks • Instagram-Style Citizen Video Feed & Reels)
export function Screen6CommonPeople({ onBack, onNavigate, onSelectStory = null, currentLocation = null }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [videos, setVideos] = useState(() => getCommonTalksVideos());
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});
  const [activeCommentVideo, setActiveCommentVideo] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [savedVideoIds, setSavedVideoIds] = useState(new Set());

  useEffect(() => {
    const unsub = subscribeCommonTalksVideos((updated) => {
      setVideos(updated);
    });
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const categories = [
    { id: 'All', label: 'All Talks' },
    { id: 'Farmers', label: '🌾 Farmers' },
    { id: 'Students', label: '🎓 Students' },
    { id: 'Women', label: '👩 Women' },
    { id: 'Civic', label: '🏙️ Civic' },
    { id: 'Workers', label: '💼 Work & Life' }
  ];

  const storiesRings = [
    { id: 'upload', name: 'Your Reel', icon: '+', isUpload: true },
    { id: 'Farmers', name: 'Farmers', icon: '🌾', category: 'Farmers' },
    { id: 'Students', name: 'Students', icon: '🎓', category: 'Students' },
    { id: 'Women', name: 'Women', icon: '👩', category: 'Women' },
    { id: 'Civic', name: 'Civic', icon: '🏙️', category: 'Civic' },
    { id: 'Workers', name: 'Life', icon: '💼', category: 'Workers' }
  ];

  const filteredVideos = videos.filter(v => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Farmers') return v.category === 'Farmers' || v.role?.toLowerCase().includes('farmer');
    if (activeFilter === 'Students') return v.category === 'Students' || v.role?.toLowerCase().includes('student');
    if (activeFilter === 'Women') return v.category === 'Women' || v.role?.toLowerCase().includes('women') || v.role?.toLowerCase().includes('housewife');
    if (activeFilter === 'Civic') return v.category === 'Civic' || v.role?.toLowerCase().includes('civic');
    if (activeFilter === 'Workers') return v.category === 'Workers' || v.role?.toLowerCase().includes('worker');
    return true;
  });

  const handleLike = (e, videoId) => {
    e.stopPropagation();
    likeCommonTalksVideo(videoId);
    showToast('❤️ Liked reel!');
  };

  const handleSave = (e, videoId) => {
    e.stopPropagation();
    setSavedVideoIds(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        showToast('Removed from Saved Collection');
      } else {
        next.add(videoId);
        showToast('Saved to Collection 🔖');
      }
      return next;
    });
  };

  const handleShare = (e, video) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#common-talks-${video.id}`).catch(() => {});
    }
    showToast('Reel link copied to clipboard! 📋');
  };

  const handleTogglePlay = (videoId) => {
    setPlayingVideoId(prev => prev === videoId ? null : videoId);
  };

  const handleToggleMute = (e, videoId) => {
    e.stopPropagation();
    setMutedVideos(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim() || !activeCommentVideo) return;
    addCommentToCommonTalksVideo(activeCommentVideo.id, commentInput, 'You');
    setCommentInput('');
    showToast('Comment posted! 💬');
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

      {/* Instagram-style Top Header */}
      <div className="px-3 py-2.5 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={onBack || (() => onNavigate('home'))} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
            title="Go Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-black text-white leading-tight flex items-center gap-1.5">
              <span>Common Talks</span>
              <span className="px-1.5 py-0.2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-[7px] font-black uppercase text-white">REELS</span>
            </h2>
            <p className="text-[8px] text-gray-400 leading-none mt-0.5">కామన్ టాక్స్ • Citizen Video Opinions</p>
          </div>
        </div>

        {/* Instagram Upload Video Button */}
        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white text-[9px] font-black flex items-center gap-1.5 cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-md shadow-rose-500/20"
        >
          <Camera className="w-3 h-3 text-white" />
          <span>Upload Video</span>
        </button>
      </div>

      {/* Instagram Stories Carousel at Top */}
      <div className="px-3 py-2 bg-[#0C0C10] border-b border-[#181820] flex items-center gap-3 overflow-x-auto phone-scroll shrink-0">
        {storiesRings.map((story) => (
          <button
            key={story.id}
            type="button"
            onClick={() => {
              if (story.isUpload) {
                setIsUploadModalOpen(true);
              } else {
                setActiveFilter(story.category);
              }
            }}
            className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className={`w-12 h-12 rounded-full p-0.5 ${
              story.isUpload
                ? 'bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 animate-pulse'
                : activeFilter === story.category
                  ? 'bg-gradient-to-tr from-amber-400 to-yellow-500'
                  : 'bg-[#222230]'
            }`}>
              <div className="w-full h-full rounded-full bg-[#121218] flex items-center justify-center text-sm font-bold shadow-inner relative">
                <span>{story.icon}</span>
                {story.isUpload && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 border border-[#121218] flex items-center justify-center text-[10px] text-white font-black">
                    +
                  </span>
                )}
              </div>
            </div>
            <span className={`text-[8px] font-semibold truncate max-w-[50px] ${
              story.isUpload ? 'text-amber-400 font-extrabold' : activeFilter === story.category ? 'text-white' : 'text-gray-400'
            }`}>
              {story.name}
            </span>
          </button>
        ))}
      </div>

      {/* Categories Filter Pills */}
      <div className="px-3 py-1.5 border-b border-[#1A1A22] bg-[#0A0A0D] flex items-center gap-1.5 overflow-x-auto phone-scroll shrink-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveFilter(cat.id)}
            className={`px-2.5 py-1 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === cat.id
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold shadow-xs'
                : 'bg-[#16161D] text-gray-400 border border-[#23232C] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Feed Area (Instagram Post / Reel Style) */}
      <div className="flex-1 min-h-0 px-2 sm:px-3 py-2.5 overflow-y-auto phone-scroll touch-pan-y space-y-4 pb-14">
        {filteredVideos.map((video) => {
          const isPlaying = playingVideoId === video.id;
          const isMuted = mutedVideos[video.id] ?? true;
          const isSaved = savedVideoIds.has(video.id);

          return (
            <div
              key={video.id}
              className="rounded-2xl overflow-hidden bg-[#121218] border border-[#20202C] shadow-lg transition-all"
            >
              {/* Instagram Post Header */}
              <div className="p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shrink-0">
                    <div className="w-full h-full rounded-full bg-[#121218] flex items-center justify-center font-bold text-xs text-white">
                      {video.author.charAt(0)}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="text-[11px] font-black text-white truncate">
                        {video.author}
                      </h4>
                      <span className="text-[7.5px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                        {video.role || 'Citizen'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] text-gray-400 truncate">
                      <MapPin className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                      <span className="truncate">{video.location}</span>
                      <span>•</span>
                      <span>{video.time}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleShare(e, video)}
                  className="p-1 text-gray-400 hover:text-white cursor-pointer"
                  title="Share"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Instagram Reel Video Player Container */}
              <div 
                onClick={() => handleTogglePlay(video.id)}
                className="relative aspect-[4/3] sm:aspect-video w-full bg-black overflow-hidden cursor-pointer group select-none"
              >
                <video
                  src={video.videoUrl}
                  autoPlay={isPlaying}
                  playsInline
                  loop
                  muted={isMuted}
                  poster={video.thumbnail || '/assets/news_debate_studio.jpg'}
                  className="w-full h-full object-cover"
                />

                {/* Center Play Indicator when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-white/20">
                      <Play className="w-5 h-5 fill-current ml-0.5 text-amber-400" />
                    </div>
                  </div>
                )}

                {/* Top Video Overlay: Verified Voice & Audio */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[8px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Citizen Voice</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleToggleMute(e, video.id)}
                    className="pointer-events-auto p-1 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-amber-400 cursor-pointer shadow-sm border border-white/10"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>

                {/* Bottom Video Overlay: Duration */}
                <div className="absolute bottom-2 right-2 pointer-events-none">
                  <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-white font-mono text-[8px]">
                    ⏱ {video.duration || '0:45'}
                  </span>
                </div>
              </div>

              {/* Instagram Action Buttons Bar */}
              <div className="p-2.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={(e) => handleLike(e, video.id)}
                      className="flex items-center gap-1 cursor-pointer group active:scale-125 transition-transform"
                    >
                      <Heart className={`w-5 h-5 ${video.hasUserLiked ? 'text-rose-500 fill-rose-500' : 'text-gray-300 hover:text-rose-400'}`} />
                    </button>

                    {/* Comment Button */}
                    <button
                      type="button"
                      onClick={() => setActiveCommentVideo(video)}
                      className="flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer active:scale-110 transition-transform"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={(e) => handleShare(e, video)}
                      className="text-gray-300 hover:text-white cursor-pointer active:scale-110 transition-transform"
                    >
                      <Share2 className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => handleSave(e, video.id)}
                    className="cursor-pointer active:scale-110 transition-transform"
                  >
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'text-amber-400 fill-amber-400' : 'text-gray-400 hover:text-white'}`} />
                  </button>
                </div>

                {/* Likes Count */}
                <p className="text-[10px] font-black text-white">
                  ❤️ Liked by {video.likes} citizens
                </p>

                {/* Caption / Title */}
                <div className="text-[10px] leading-relaxed">
                  <span className="font-extrabold text-white mr-1.5">{video.author}</span>
                  <span className="text-gray-200 font-telugu">{video.caption || video.title}</span>
                </div>

                {/* Comments Link */}
                <button
                  type="button"
                  onClick={() => setActiveCommentVideo(video)}
                  className="text-[9px] text-gray-400 hover:text-gray-200 font-medium block pt-0.5 cursor-pointer"
                >
                  View all {video.comments?.length || 0} comments • Add your opinion...
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating Upload Action Button (Instagram Reel Style) */}
      <button
        type="button"
        onClick={() => setIsUploadModalOpen(true)}
        className="absolute bottom-14 right-3 z-30 py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-black text-xs shadow-xl shadow-rose-500/30 flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-white/20"
      >
        <Camera className="w-4 h-4 text-white" />
        <span>+ Upload Reel</span>
      </button>

      {/* Slide-Up Instagram Comment Drawer */}
      {activeCommentVideo && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#14141C] border-t border-[#262638] rounded-t-3xl max-h-[70vh] flex flex-col overflow-hidden text-white shadow-2xl">
            <div className="p-3 border-b border-[#222230] flex items-center justify-between bg-[#181822]">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-black text-white">
                  Comments on {activeCommentVideo.author}'s Reel
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCommentVideo(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto phone-scroll p-3 space-y-2.5">
              {(!activeCommentVideo.comments || activeCommentVideo.comments.length === 0) ? (
                <p className="text-[10px] text-gray-400 text-center py-6">
                  No comments yet. Be the first citizen to comment!
                </p>
              ) : (
                activeCommentVideo.comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-2 bg-[#181824] p-2 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[9px] shrink-0">
                      {c.user.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] font-bold text-amber-300">{c.user}</span>
                        <span className="text-[7.5px] text-gray-500">{c.time}</span>
                      </div>
                      <p className="font-telugu text-[9.5px] text-gray-200 mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAddComment} className="p-2.5 border-t border-[#222230] bg-[#161622] flex items-center gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment as citizen..."
                className="flex-1 bg-[#101018] border border-[#2B2B3E] rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-xs disabled:opacity-40 cursor-pointer"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Instagram Video Upload Modal */}
      <InstagramVideoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        currentLocation={currentLocation}
        onVideoUploaded={(newVideo) => {
          setVideos(getCommonTalksVideos());
          showToast('🎉 Your video was shared to Common Talks!');
        }}
      />

      <BottomNavBar activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}

// 7. SCREEN 7: AREA SPECIALS SCREEN
export function Screen7AreaSpecials({ 
  onBack, 
  onNavigate, 
  onSelectUpdate = null, 
  currentLocation = null, 
  onLocationChange = () => {} 
}) {
  React.useEffect(() => {
    if (onNavigate) onNavigate('home');
    else if (onBack) onBack();
  }, [onNavigate, onBack]);
  return null;
  const [selectedArea, setSelectedArea] = useState(currentLocation ? currentLocation.city : 'Hyderabad');
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
    const matched = CONSTITUENCY_DATABASE.find(c => c.city.toLowerCase() === area.toLowerCase());
    if (matched) {
      onLocationChange(matched);
    }
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
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [activeFeed, setActiveFeed] = useState('studio');
  const [selectedPanelist, setSelectedPanelist] = useState(null);
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const [isQueueJoined, setIsQueueJoined] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [liveState, setLiveState] = useState(() => getActiveBroadcast());
  const selectedDebate = getSelectedDebate();

  useEffect(() => {
    const unsub = subscribeBroadcast(({ activeBroadcast: ab }) => {
      if (ab) setLiveState(ab);
    });
    return unsub;
  }, []);

  const debate = (liveState?.isLive ? liveState : (selectedDebate?.isLive ? selectedDebate : (liveState || selectedDebate))) || {
    title: '2026 ఎన్నికలు: ప్రజా తీర్పు & లైవ్ చర్చ',
    host: 'Now9 Prime Editor & Senior Analysts',
    time: 'Today, 07:30 PM',
    isLive: true,
    isRecorded: false,
    duration: 'Live Broadcast',
    views: '14.8K views',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4'
  };

  const isLive = !!(liveState?.isLive || debate.isLive);
  const isRecorded = !isLive;

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
          <h2 className="text-xs font-extrabold text-white">
            {isLive ? 'Live Debate Studio' : 'Recorded Debate Playback'}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {isLive ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[#DC2626] text-white text-[8px] font-extrabold uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              LIVE
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[8px] font-bold uppercase">
              RECORDED
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto phone-scroll touch-pan-y pb-2">
        {/* Video & Studio Live Broadcast Player */}
        <div className="relative w-full h-48 bg-black overflow-hidden shrink-0 group border-b border-[#232330]">
          {/* 1. Underlying HD Studio Visualizer (Always active as backdrop & fallback) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="/assets/news_debate_studio.jpg" 
              alt="Now9 Live News Studio" 
              className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            />
            {/* Dark gradient for cinematic news studio look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35 pointer-events-none" />
            
            {/* Center Dynamic Audio Spectrum Visualizer */}
            <div className="absolute inset-x-0 bottom-7 top-10 flex flex-col items-center justify-center pointer-events-none">
              <div className="flex items-end justify-center gap-1.5 h-14 mb-2 px-6">
                {[35, 75, 55, 95, 65, 100, 80, 90, 50, 85, 70, 95, 60, 80, 45].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-400 to-white shadow-xs shadow-amber-500/50"
                    style={{
                      height: `${h}%`,
                      animation: isLive ? `pulse ${0.7 + (idx % 4) * 0.2}s ease-in-out infinite alternate` : 'none',
                      animationDelay: `${idx * 0.06}s`
                    }}
                  />
                ))}
              </div>

              <div className="text-center px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="text-[9px] font-extrabold text-[#F5C754] tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>NOW9 NEWS 24/7 • STUDIO 1 LIVE FEED</span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. Optional Video Element (if feed is set to 'stream' and no video error) */}
          {activeFeed === 'stream' && !hasVideoError && (
            <video
              src={debate.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4'}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onError={() => {
                setHasVideoError(true);
                setActiveFeed('studio');
                showToast('Switched to Now9 Studio HD Live Feed');
              }}
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          )}

          {/* 3. Top Floating Overlays */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 pointer-events-auto">
              {isLive ? (
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[8.5px] font-black uppercase flex items-center gap-1.5 shadow-md shadow-red-600/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>LIVE NOW ON AIR</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[8px] font-bold uppercase">
                  RECORDED SESSION
                </span>
              )}
              <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/20 text-[7.5px] font-semibold">
                1080p 60fps
              </span>
            </div>

            <div className="flex items-center gap-1 pointer-events-auto">
              {/* Toggle Studio / Video Stream feed */}
              <button
                type="button"
                onClick={() => {
                  const next = activeFeed === 'studio' ? 'stream' : 'studio';
                  setActiveFeed(next);
                  showToast(next === 'stream' ? 'Switched to Video Stream' : 'Switched to Studio HD Feed');
                }}
                className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white hover:text-amber-300 text-[8px] font-bold border border-white/10 cursor-pointer shadow-sm transition-colors"
                title="Switch Camera Feed"
              >
                {activeFeed === 'studio' ? '📹 Stream' : '🎙️ Studio'}
              </button>

              {/* Mute / Unmute Button */}
              <button
                type="button"
                onClick={() => {
                  const nextMuted = !isMuted;
                  setIsMuted(nextMuted);
                  showToast(nextMuted ? 'Audio Muted 🔇' : 'Live Audio Active 🔊');
                }}
                className="p-1 rounded bg-black/70 backdrop-blur-md text-white hover:text-amber-400 cursor-pointer shadow-sm border border-white/10"
                title="Mute / Unmute Audio"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              {/* Viewers Badge */}
              <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[8px] font-semibold flex items-center gap-0.5 border border-white/10">
                <Eye className="w-2.5 h-2.5 text-red-400" />
                <span>{debate.views || '14.8K'}</span>
              </span>
            </div>
          </div>

          {/* 4. Tap to Unmute Overlay if muted */}
          {isMuted && (
            <div className="absolute inset-x-0 bottom-9 flex justify-center z-20 pointer-events-none">
              <button
                type="button"
                onClick={() => {
                  setIsMuted(false);
                  showToast('Live Studio Sound Unmuted 🔊');
                }}
                className="pointer-events-auto px-3 py-1 rounded-full bg-amber-500/90 text-black font-extrabold text-[9px] shadow-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Volume2 className="w-3 h-3" />
                <span>Tap for Live Sound 🔊</span>
              </button>
            </div>
          )}

          {/* 5. Live Breaking News Ticker running at bottom of video */}
          <div className="absolute inset-x-0 bottom-0 bg-red-950/90 border-t border-red-500/40 px-2 py-0.5 z-20 flex items-center gap-1.5 overflow-hidden">
            <span className="shrink-0 px-1 py-0.2 rounded bg-red-600 text-white text-[7px] font-black uppercase tracking-wider">
              FLASH
            </span>
            <div className="text-[8px] text-white font-telugu whitespace-nowrap overflow-hidden text-ellipsis flex-1">
              🔴 లైవ్ డిబేట్: 2026 అసెంబ్లీ ఎన్నికల ప్రత్యక్ష విశ్లేషణ • పౌరుల ప్రశ్నలు & గ్రౌండ్ రిపోర్ట్
            </div>
          </div>
        </div>

        {/* Debate Title & Meta */}
        <div className="p-3 border-b border-[#1A1A22]">
          <h3 className="font-telugu text-xs font-bold text-white leading-snug">
            {debate.title}
          </h3>
          <p className="text-[9px] text-gray-400 mt-0.5">
            {debate.subtitle || `Host: ${debate.host || 'Now9 Prime Desk'} • 🌐 Visible to All Users (Global Broadcast)`}
          </p>
          <div className="flex items-center gap-2 text-[8px] text-gray-400 mt-1">
            <span className="flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5 text-amber-400" />
              {debate.time || debate.date || 'Today, 07:30 PM'}
            </span>
            <span>•</span>
            <span>{isLive ? 'Broadcasting Live from Studio' : `Duration: ${debate.duration || '28:40'}`}</span>
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

// 10. SCREEN NEWS: 24/7 VERIFIED NEWS SCREEN
export function ScreenNews({ onBack, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);
  const [newsList, setNewsList] = useState(() => getPublishedNews());

  useEffect(() => {
    const unsub = subscribeNews((updated) => {
      setNewsList(updated);
    });
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const categories = ['All', 'Politics', 'Telangana', 'Andhra Pradesh', 'Mahabubnagar', 'Hyderabad'];

  const filteredNews = newsList.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Politics') return (item.tag === 'Breaking' || item.category === 'Elections 2026' || item.category === 'State Politics');
    if (activeCategory === 'Telangana') return (item.category === 'Telangana' || item.title.includes('తెలంగాణ'));
    if (activeCategory === 'Andhra Pradesh') return (item.category === 'Andhra Pradesh' || item.title.includes('ఏపీ') || item.title.includes('ఆంధ్ర'));
    if (activeCategory === 'Mahabubnagar') return (item.category === 'Mahabubnagar' || item.title.includes('మహబూబ్‌నగర్'));
    if (activeCategory === 'Hyderabad') return (item.category === 'Hyderabad' || item.title.includes('హైదరాబాద్'));
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
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

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={onBack || (() => onNavigate('home'))} 
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
            title="Go Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-extrabold text-white leading-tight flex items-center gap-1.5">
              <span>NowNine News</span>
              <span className="text-[9px] text-[#F5C754] font-bold">వార్తలు</span>
            </h2>
            <p className="text-[8px] text-gray-400 leading-none mt-0.5">Breaking • State • Local</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-[8px] font-black flex items-center gap-1 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
          <span>Live 24/7</span>
        </span>
      </div>

      {/* Breaking Flash Ticker */}
      <div className="px-3 py-1.5 bg-gradient-to-r from-red-950/60 via-[#181116] to-[#0A0A0D] border-b border-red-900/30 flex items-center gap-2 shrink-0">
        <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[7.5px] uppercase tracking-wider shrink-0">
          BREAKING
        </span>
        <p className="text-[8.5px] text-gray-200 font-medium truncate font-telugu">
          {newsList[0]?.title || '2026 ఎన్నికల సర్వే: తాజా ప్రజాతీర్పు గణాంకాలు వెల్లడి...'}
        </p>
      </div>

      {/* Filter Categories */}
      <div className="px-3 py-2 border-b border-[#1A1A22] bg-[#0A0A0D] flex items-center gap-1.5 overflow-x-auto phone-scroll shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            className={`px-2.5 py-1 rounded-full text-[9px] font-bold shrink-0 transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#F5C754] text-black font-extrabold shadow-xs'
                : 'bg-[#16161D] text-gray-400 border border-[#23232C] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Feed List */}
      <div className="flex-1 min-h-0 px-3 py-2.5 overflow-y-auto phone-scroll touch-pan-y space-y-2.5 pb-6">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            onClick={() => {
              showToast(`📰 Opening: ${news.title.slice(0, 30)}...`);
              recordCustomerActivity({
                type: 'news',
                title: 'News Article Read',
                detail: `Citizen opened news: "${news.title}"`,
                location: `${news.category || 'Regional'} News`,
                icon: '📰',
                badgeColor: 'blue',
                badgeText: news.tag || 'News Read'
              });
            }}
            className="p-2.5 rounded-2xl bg-[#11141E] border border-[#1E293B] hover:border-[#F5C754]/50 cursor-pointer transition-all space-y-2 group shadow-sm active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-full border ${news.tagColor}`}>
                {news.tag}
              </span>
              <span className="text-[7.5px] text-gray-400 font-mono">
                {news.time} • {news.reads}
              </span>
            </div>

            <h3 className="font-telugu text-[12px] font-bold text-white group-hover:text-[#F5C754] transition-colors leading-snug">
              {news.title}
            </h3>

            <p className="font-telugu text-[9px] text-gray-300 leading-relaxed line-clamp-2">
              {news.summary}
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-[#1C2638] text-[8px] text-gray-400">
              <span className="font-medium text-amber-300/80">{news.source}</span>
              <span className="font-bold text-[#F5C754] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Read Full Story →
              </span>
            </div>
          </div>
        ))}
      </div>

      <BottomNavBar activeTab="news" onTabChange={onNavigate || onBack} />
    </div>
  );
}

// 10. SCREEN 10: BIG BOSS TELUGU SCREEN (Elimination Voting, Polls & House Drama)
export function ScreenBigBoss({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('voting'); // 'voting' | 'highlights' | 'contestants'
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [pollVotes, setPollVotes] = useState({ 1: null });
  const [housemates, setHousemates] = useState(() => getPublishedHousemates());

  useEffect(() => {
    const unsub = subscribeHousemates((updatedList) => {
      setHousemates(updatedList);
    });
    return unsub;
  }, []);

  const nominatedContestants = housemates.filter(h => h.isNominated || h.status === 'Nominated' || h.status === 'Danger Zone');
  const votingList = nominatedContestants.length > 0 ? nominatedContestants : housemates;
  const totalVotesCount = housemates.reduce((sum, h) => sum + (h.votes || 0), 0);

  const highlights = [
    { id: 1, title: '🔥 కెప్టెన్సీ టాస్క్ హై-వోల్టేజ్ గొడవ! శివాజీ vs అమర్‌దీప్', views: '284K', time: '2h ago', duration: '03:45', thumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: '⚡ నామినేషన్స్ హీట్: శోభా శెట్టి తీవ్ర భావోద్వేగం!', views: '192K', time: '5h ago', duration: '04:12', thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: '🎬 వీకెండ్ ఎపిసోడ్ ప్రోమో: హోస్ట్ స్పెషల్ వార్నింగ్!', views: '640K', time: 'Yesterday', duration: '01:30', thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleVoteContestant = (c) => {
    setSelectedContestant(c.id);
    voteForHousemate(c.id);
    setToastMessage(`🎉 మీ ఓటు ${c.name} (${c.teluguName || c.name}) కి నమోదైంది! (Saved Vote Recorded)`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0A0A0D] text-white min-h-0">
      <PhoneStatusBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-10 left-4 right-4 z-50 bg-[#1A1810] border border-[#F5C754] text-[#FDE047] px-3 py-1.5 rounded-full text-[10px] font-bold text-center shadow-2xl animate-fadeIn flex items-center justify-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#1C1C22] bg-[#0E0E12] shrink-0 z-20">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={onBack}
            className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A22] transition-colors cursor-pointer"
            title="Go Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full border border-amber-400/80 bg-amber-400/15 flex items-center justify-center text-amber-300">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-black text-white leading-tight flex items-center gap-1">
                <span>Boss of House</span>
                <span className="text-[7px] px-1 rounded bg-red-600 font-extrabold text-white animate-pulse">
                  LIVE
                </span>
              </h2>
              <p className="text-[8px] text-gray-400">2026 Season • Official Public Voting & Polls</p>
            </div>
          </div>
        </div>

        <span className="text-[8px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30">
          {totalVotesCount > 0 ? `${totalVotesCount.toLocaleString()} Votes` : 'Official Voting'}
        </span>
      </div>

      {/* Tabs */}
      <div className="px-3 py-1.5 bg-[#0E0E12] border-b border-[#1C1C24] flex items-center justify-between gap-1 shrink-0">
        {[
          { id: 'voting', label: '🗳️ Live Voting' },
          { id: 'highlights', label: '🎬 Highlights' },
          { id: 'contestants', label: '👥 Housemates' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1 px-2 rounded-lg text-[9.5px] font-bold transition-all text-center cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#F5C754] text-black shadow-xs font-black'
                : 'text-gray-400 hover:text-white hover:bg-[#16161E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 px-3 py-2.5 overflow-y-auto phone-scroll touch-pan-y space-y-3 pb-6">
        {/* VIEW 1: VOTING & POLLS */}
        {activeTab === 'voting' && (
          <div className="space-y-3">
            {/* Elimination Banner Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#1C1214] to-[#14141A] border border-red-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-black text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  <span>Week Elimination Voting</span>
                </span>
                <span className="text-[8px] text-gray-400">Ends Sunday 11:59 PM</span>
              </div>
              <h3 className="text-xs font-black text-white leading-tight">
                మీ అభిమాన కంటెస్టెంట్‌ను సేవ్ చేయండి!
              </h3>
              <p className="text-[8px] text-gray-300 mt-0.5">
                Tap on any nominated contestant below to cast your free official vote (1 Vote per day).
              </p>
            </div>

            {/* 2x2 Nominated Contestant Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {votingList.map((c) => {
                const isSelected = selectedContestant === c.id;
                return (
                  <div
                    key={c.id}
                    className={`p-3 rounded-2xl bg-[#0C1421] border transition-all duration-200 flex flex-col items-center justify-between text-center relative ${
                      isSelected
                        ? 'border-[#F5C754] bg-[#0E1A2C] shadow-lg shadow-[#F5C754]/20 ring-1 ring-[#F5C754]'
                        : 'border-[#1B2A41] hover:border-[#F5C754]/50'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#F5C754] text-black text-[7px] font-black shadow-xs flex items-center gap-0.5 animate-fadeIn">
                        ✓ Voted
                      </span>
                    )}

                    {/* Circular Avatar */}
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl mb-2 shadow-inner ${
                      isSelected ? 'border-[#F5C754] bg-[#F5C754]/20' : 'border-[#F5C754] bg-[#F5C754]/10'
                    }`}>
                      <span>{c.avatar}</span>
                    </div>

                    <h4 className="font-black text-[13.5px] sm:text-[14px] text-white leading-snug tracking-tight">
                      {c.name}
                    </h4>
                    <p className="text-[10px] text-amber-300 font-semibold font-telugu mt-0.5 leading-normal">
                      {c.teluguName || c.name} • {c.role}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full mt-2 space-y-0.5">
                      <div className="flex items-center justify-between text-[8.5px] text-slate-300 font-medium">
                        <span>Approval</span>
                        <span className="font-mono font-bold text-white">{c.percent || 0}%</span>
                      </div>
                      <div className="w-full h-1 bg-[#1A1A24] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${c.percent || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Vote to Save Button */}
                    <button
                      type="button"
                      onClick={() => handleVoteContestant(c)}
                      className={`w-full mt-2.5 py-1.5 px-2 rounded-xl text-[10px] font-black tracking-normal transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-[#F5C754] text-black hover:brightness-110 shadow-xs'
                      }`}
                    >
                      {isSelected ? '✓ Voted to Save' : 'Vote to Save 🗳️'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Daily House Instant Poll */}
            <div className="p-3 rounded-2xl bg-[#121218] border border-[#23232E] space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-[#1E1E28]">
                <span className="text-[10px] font-black text-white flex items-center gap-1">
                  <span>📊 Today's Housemate Poll</span>
                </span>
                <span className="text-[8px] text-amber-400 font-mono">Poll Live</span>
              </div>
              <p className="text-[9.5px] font-bold text-gray-200 leading-snug">
                ఈ వారం బెస్ట్ ఎంటర్‌టైనర్ ఎవరు? (Who entertained best this week?)
              </p>
              <div className="space-y-1.5 pt-0.5">
                {[
                  { id: 1, name: 'Sivaji', percent: 48 },
                  { id: 2, name: 'Pallavi Prashanth', percent: 32 },
                  { id: 3, name: 'Prince Yawar', percent: 20 },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setPollVotes(prev => ({ ...prev, 1: opt.id }));
                      recordCustomerActivity({
                        type: 'boss-house',
                        title: 'Daily House Poll Voted',
                        detail: `Citizen picked "${opt.name}" in "ఈ వారం బెస్ట్ ఎంటర్‌టైనర్ ఎవరు?"`,
                        location: 'Boss of House Poll',
                        icon: '📊',
                        badgeColor: 'amber',
                        badgeText: 'Daily Poll'
                      });
                    }}
                    className={`w-full p-2 rounded-xl border text-left text-[9px] font-bold transition-all cursor-pointer flex items-center justify-between ${
                      pollVotes[1] === opt.id
                        ? 'bg-amber-500/20 border-amber-400 text-[#FDE047]'
                        : 'bg-[#181822] border-[#262634] text-gray-300 hover:text-white'
                    }`}
                  >
                    <span>{opt.name}</span>
                    <span className="font-mono text-[8.5px]">{opt.percent}%</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: HOUSE HIGHLIGHTS */}
        {activeTab === 'highlights' && (
          <div className="space-y-2.5">
            {highlights.map((video) => (
              <div
                key={video.id}
                onClick={() => onNavigate ? onNavigate('video-player') : null}
                className="p-2 rounded-2xl bg-[#121218] border border-[#22222E] hover:border-amber-400/50 transition-all cursor-pointer group space-y-1.5"
              >
                <div className="h-28 w-full rounded-xl overflow-hidden relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#F5C754] text-black flex items-center justify-center pl-0.5 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-black stroke-black" />
                    </div>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono text-[8px]">
                    {video.duration}
                  </span>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[8px] text-gray-400 mt-1">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: ALL HOUSEMATES DIRECTORY */}
        {activeTab === 'contestants' && (
          <div className="space-y-1.5">
            {housemates.map((hm) => {
              const badgeClass = hm.status === 'Safe' 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                : (hm.status === 'Danger Zone' 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/40' 
                  : 'bg-red-500/20 text-red-400 border-red-500/40');
              return (
                <div 
                  key={hm.id}
                  className="p-2.5 rounded-xl bg-[#121218] border border-[#22222E] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl p-1 rounded-lg bg-[#181822] border border-[#2A2A38]">
                      {hm.avatar}
                    </span>
                    <div>
                      <h4 className="text-[10px] font-black text-white leading-tight">{hm.name}</h4>
                      <p className="text-[8px] text-gray-400 font-telugu">{hm.teluguName || hm.name} • {hm.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold text-amber-400">{hm.percent || 0}%</span>
                    <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                      {hm.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNavBar activeTab="home" onTabChange={onNavigate || onBack} />
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
    <div className="w-full h-full min-h-0 flex flex-col items-center justify-center p-0">
      {/* Responsive Phone Chassis (Full edge-to-edge on mobile, sleek frame on desktop) */}
      <div 
        className="relative w-full max-w-full sm:max-w-[390px] md:max-w-[420px] h-[100dvh] max-h-[100dvh] sm:h-[min(780px,calc(100vh-60px))] sm:rounded-[42px] sm:p-[6px] sm:bg-gradient-to-b sm:from-[#3E382A] sm:via-[#1E1E22] sm:to-[#322B1C] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] sm:border sm:border-[#52482E]/80 transition-all duration-300 flex flex-col min-h-0 overflow-hidden"
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
