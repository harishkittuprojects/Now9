import React, { useState } from 'react';
import { 
  RotateCcw, 
  Maximize2, 
  Minimize2
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
  PhoneFrame 
} from './NowNineReferenceScreens';

export default function NowNineUnifiedApp() {
  // Directly start on the Login screen on entry as requested
  const [activeScreenId, setActiveScreenId] = useState('login');
  const [isFullscreen, setIsFullscreen] = useState(false);

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
          />
        );
      case 'splash':
        return <Screen1Splash onGetStarted={() => handleNav('login')} onNavigate={handleNav} />;
      case 'home':
        return <Screen2Home onNavigate={handleNav} />;
      case 'survey':
        return <Screen3Survey onBack={() => handleNav('home')} onFinish={() => handleNav('home')} onNavigate={handleNav} />;
      case 'live-debates':
        return <Screen4LiveDebates onBack={() => handleNav('home')} onSelectDebate={() => handleNav('debate-detail')} onNavigate={handleNav} />;
      case 'short-videos':
        return <Screen5ShortVideos onBack={() => handleNav('home')} onSelectShort={() => handleNav('video-player')} onNavigate={handleNav} />;
      case 'common-people':
        return <Screen6CommonPeople onBack={() => handleNav('home')} onSelectStory={() => handleNav('video-player')} onNavigate={handleNav} />;
      case 'area-specials':
        return <Screen7AreaSpecials onBack={() => handleNav('home')} onNavigate={handleNav} onSelectUpdate={() => handleNav('video-player')} />;
      case 'video-player':
        return <Screen8ShortVideoPlayer onBack={() => handleNav('short-videos')} onNavigate={handleNav} />;
      case 'debate-detail':
        return <Screen9LiveDebateDetail onBack={() => handleNav('live-debates')} onNavigate={handleNav} />;
      default:
        return (
          <ScreenLogin 
            onLoginSuccess={() => handleNav('home')} 
            onSkipToHome={() => handleNav('home')} 
            onNavigate={handleNav}
          />
        );
    }
  };

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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FDE68A] p-[2px] flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <div className="w-full h-full rounded-[10px] bg-[#121215] flex items-center justify-center font-black text-amber-400 text-sm">
                9
              </div>
            </div>
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

          {/* Header Actions */}
          <div className="flex items-center gap-2">
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
