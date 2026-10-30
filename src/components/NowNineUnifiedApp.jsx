import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  MapPin,
  Sparkles
} from 'lucide-react';
import { 
  ScreenLogin,
  Screen1Splash, 
  Screen2Home, 
  Screen3Survey, 
  Screen4LiveDebates, 
  Screen5ShortVideos, 
  Screen6CommonPeople, 
  Screen7AreaSpecials, 
  Screen8ShortVideoPlayer, 
  Screen9LiveDebateDetail, 
  ScreenNews,
  ScreenBigBoss,
  PhoneFrame 
} from './NowNineReferenceScreens';
import ScreenAdminPanel from './ScreenAdminPanel';
import NowNineAdminDashboard from './NowNineAdminDashboard';
import { 
  DEFAULT_DETECTED_LOCATION, 
  CONSTITUENCY_DATABASE,
  fetchLiveUserAddress,
  resolveConstituencyAndParties 
} from '../data/locationConstituencyData';

export default function NowNineUnifiedApp() {
  // Directly start on the Login screen on entry as requested
  const [activeScreenId, setActiveScreenId] = useState('login');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_DETECTED_LOCATION);
  const [selectedSurveyParty, setSelectedSurveyParty] = useState(null);
  const [isLocating, setIsLocating] = useState(true);
  const [locationToast, setLocationToast] = useState(null);

  // Live GPS Location Detection and Reverse Geocoding with guaranteed visibility
  const detectLiveGpsLocation = () => {
    setIsLocating(true);
    const startTime = Date.now();

    const finishLocating = (resolvedLocation = null) => {
      const elapsed = Date.now() - startTime;
      const minDisplayDuration = 3200; // Guarantee "Locating..." is clearly visible for ~3 seconds after opening website
      const remaining = Math.max(0, minDisplayDuration - elapsed);

      setTimeout(() => {
        if (resolvedLocation) {
          setCurrentLocation(resolvedLocation);
        }
        setIsLocating(false);
      }, remaining);
    };

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const resolved = await fetchLiveUserAddress(pos.coords.latitude, pos.coords.longitude);
            finishLocating(resolved);
            setTimeout(() => {
              setLocationToast({
                title: `📍 Located: ${resolved.locality || resolved.city}, ${resolved.city}`,
                subtitle: `${resolved.assembly} • ${resolved.parties?.length || 0} Political Parties Active`
              });
              setTimeout(() => setLocationToast(null), 5000);
            }, 3200);
          } catch (e) {
            console.warn('Reverse geocode error:', e);
            finishLocating(null);
          }
        },
        (err) => {
          console.warn('Geolocation error / permission denied, using default:', err);
          finishLocating(null);
        },
        { timeout: 7000, enableHighAccuracy: true, maximumAge: 60000 }
      );
    } else {
      finishLocating(null);
    }
  };

  // Run auto-locate on initial app load
  useEffect(() => {
    detectLiveGpsLocation();
  }, []);

  // Render active screen
  const renderScreen = (id) => {
    const handleNav = (targetId) => {
      setActiveScreenId(targetId);
    };

    switch (id) {
      case 'login':
        return (
          <ScreenLogin 
            onLoginSuccess={() => handleNav('home')} 
            onSkipToHome={() => handleNav('home')} 
            onNavigate={handleNav}
            currentLocation={currentLocation}
            onLocationChange={setCurrentLocation}
            isLocating={isLocating}
            onDetectLiveGps={detectLiveGpsLocation}
          />
        );
      case 'splash':
        return <Screen1Splash onGetStarted={() => handleNav('login')} onNavigate={handleNav} />;
      case 'home':
        return (
          <Screen2Home 
            onNavigate={handleNav}
            currentLocation={currentLocation}
            onLocationChange={setCurrentLocation}
            isLocating={isLocating}
            onDetectLiveGps={detectLiveGpsLocation}
            selectedParty={selectedSurveyParty}
            onSelectSurveyParty={setSelectedSurveyParty}
          />
        );
      case 'survey':
        return (
          <Screen3Survey 
            onBack={() => handleNav('home')} 
            onFinish={() => handleNav('home')} 
            onNavigate={handleNav}
            selectedParty={selectedSurveyParty}
            currentLocation={currentLocation}
            onLocationChange={setCurrentLocation}
            isLocating={isLocating}
            onDetectLiveGps={detectLiveGpsLocation}
            onSelectSurveyParty={setSelectedSurveyParty}
          />
        );
      case 'live-debates':
        return <Screen4LiveDebates onBack={() => handleNav('home')} onSelectDebate={() => handleNav('debate-detail')} onNavigate={handleNav} />;
      case 'news':
        return <ScreenNews onBack={() => handleNav('home')} onNavigate={handleNav} />;
      case 'short-videos':
        return <Screen5ShortVideos onBack={() => handleNav('home')} onSelectShort={() => handleNav('video-player')} onNavigate={handleNav} />;
      case 'big-boss':
      case 'bigg-boss':
        return <ScreenBigBoss onBack={() => handleNav('home')} onNavigate={handleNav} />;
      case 'common-people':
        return (
          <Screen6CommonPeople 
            onBack={() => handleNav('home')} 
            onNavigate={handleNav} 
            onSelectStory={() => handleNav('video-player')} 
          />
        );
      case 'area-specials':
        handleNav('home');
        return null;
      case 'video-player':
        return <Screen8ShortVideoPlayer onBack={() => handleNav('short-videos')} onNavigate={handleNav} />;
      case 'debate-detail':
        return <Screen9LiveDebateDetail onBack={() => handleNav('live-debates')} onNavigate={handleNav} />;
      case 'admin':
        return (
          <ScreenAdminPanel 
            onBack={() => handleNav('home')} 
            onNavigate={handleNav} 
            currentLocation={currentLocation} 
          />
        );
      default:
        return (
          <ScreenLogin 
            onLoginSuccess={() => handleNav('home')} 
            onSkipToHome={() => handleNav('home')} 
            onNavigate={handleNav}
            currentLocation={currentLocation}
            onLocationChange={setCurrentLocation}
            isLocating={isLocating}
            onDetectLiveGps={detectLiveGpsLocation}
          />
        );
    }
  };

  // Render Full-Screen Command Center Admin Dashboard
  if (activeScreenId === 'admin') {
    return (
      <NowNineAdminDashboard 
        onClose={() => setActiveScreenId('home')}
        onSwitchToMobile={() => setActiveScreenId('home')}
        currentLocation={currentLocation}
      />
    );
  }

  return (
    <div className={`w-full min-h-[100dvh] h-[100dvh] bg-[#070709] text-white flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto' : ''
    }`}>
      {/* Background ambient gold lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Top Header - Desktop Only (Hidden on mobile for pure native app experience) */}
      <header className="hidden sm:block sticky top-0 z-40 bg-[#0E0E12]/95 backdrop-blur-md border-b border-[#202028] px-4 py-2.5 shadow-xl shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & App title */}
          <div className="flex items-center gap-2.5">
            <img 
              src="/now9_icon.png" 
              alt="now9 logo" 
              className="w-8 h-8 object-contain rounded-lg shadow-md shrink-0 hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-white tracking-tight">
                  now<span className="text-[#F5C754]">nine</span>
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[8px] font-black uppercase tracking-wider">
                  LIVE
                </span>
              </div>
            </div>
          </div>

          {/* Location in Desktop Header Bar */}
          <button
            type="button"
            onClick={detectLiveGpsLocation}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121217] hover:bg-[#1A1A22] border border-amber-500/40 text-left transition-all cursor-pointer group shadow-sm hover:border-amber-400"
            title="Click to refresh live GPS location"
          >
            <div className="w-6 h-6 rounded-full border border-[#F5C754] flex items-center justify-center shrink-0 text-[#F5C754]">
              <MapPin className="w-3 h-3 text-[#F5C754]" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-xs font-bold text-white group-hover:text-amber-300">
                {currentLocation?.locality || 'Jubilee Hills'}, {currentLocation?.city || 'Hyderabad'}
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5">
                {currentLocation?.assembly || 'Jubilee Hills / Khairatabad Assembly'} • PIN {currentLocation?.pincode || '500033'}
              </span>
            </div>
            <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-[#1A170F] text-[#F5C754] border border-[#F5C754]/80 font-bold ml-1 flex items-center gap-1 shadow-xs">
              <span className={isLocating ? 'animate-pulse' : ''}>🛰️</span>
              <span>{isLocating ? 'Locating...' : 'GPS'}</span>
            </span>
          </button>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Admin Panel Toggle Button */}
            <button
              onClick={() => setActiveScreenId(activeScreenId === 'admin' ? 'home' : 'admin')}
              className={`p-1.5 px-2.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeScreenId === 'admin'
                  ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-[#181820] border-amber-500/40 text-amber-300 hover:bg-[#20202C] hover:border-amber-400'
              }`}
              title="Open Election Admin Panel"
            >
              <span>🛡️</span>
              <span>{activeScreenId === 'admin' ? 'Exit Admin' : 'Admin Panel'}</span>
            </button>

            {/* Reset to Login Button */}
            <button
              onClick={() => setActiveScreenId('login')}
              className="p-1.5 rounded-lg bg-[#181820] border border-[#2A2A35] text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Reset to Login Screen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart App</span>
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-[#181820] border border-[#2A2A35] text-gray-300 hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* GPS Location Notification Alert */}
      {locationToast && (
        <div 
          onClick={() => setLocationToast(null)}
          className="fixed top-2 sm:top-14 left-1/2 -translate-x-1/2 z-50 bg-[#14141B]/95 border border-amber-400/80 text-white px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-fadeIn cursor-pointer max-w-[92vw] sm:max-w-md backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 animate-bounce" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-xs font-bold text-[#FDE047] leading-tight truncate">{locationToast.title}</p>
            <p className="text-[10px] text-gray-300 mt-0.5 truncate">{locationToast.subtitle}</p>
          </div>
          <span className="text-[9px] text-gray-500 ml-1">✕</span>
        </div>
      )}

      {/* Main App Container: Directly Shows Single Phone Screen */}
      <main className="flex-1 min-h-0 w-full h-full flex flex-col items-center justify-center p-0 sm:p-4 z-10 overflow-hidden">
        <PhoneFrame>
          {renderScreen(activeScreenId)}
        </PhoneFrame>
      </main>

      {/* Footer (Desktop Only) */}
      <footer className="hidden sm:block py-2 border-t border-[#1C1C24] text-center text-[11px] text-gray-500 bg-[#0A0A0D]">
        <p>Now Nine • Political + Community Video App • Your Vote | Your Voice Live</p>
      </footer>
    </div>
  );
}
