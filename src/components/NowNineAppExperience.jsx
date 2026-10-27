import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Grid, 
  RotateCcw, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';
import { 
  ScreenSplash, 
  ScreenSelectParty, 
  ScreenSurveyQuestion, 
  ScreenThankYou, 
  ScreenLiveResults, 
  ScreenOutro, 
  PhoneChassis,
  PhoneStatusBar 
} from './NowNineScreenViews';
import { PARTIES, SURVEY_QUESTIONS, SCREEN_TABS } from '../data/nowNineAppFlowData';

export default function NowNineAppExperience({ onClose = null, initialScreen = 'splash', onNavigatePlatform = null }) {
  // View mode: 'interactive' (single active phone) vs 'grid' (all 10 screens side-by-side)
  const [viewMode, setViewMode] = useState('interactive');
  const [currentScreenId, setCurrentScreenId] = useState(initialScreen);
  
  // Interactive state
  const [selectedParty, setSelectedParty] = useState('bjp'); // Defaults to BJP matching reference image
  const [answers, setAnswers] = useState({
    q1: 0, // 'నాయకత్వంపై నమ్మకం'
    q2: 0, // 'పార్టీ నాయకుడు'
    q3: 0, // 'ఉద్యోగాలు, ఉపాధి'
    q4: 0, // 'గతంలో చేసిన పనులు'
    q5: 0  // 'రాష్ట్ర / దేశ స్థాయి నాయకత్వం'
  });
  
  // Auto-play walkthrough state
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Screen progression ordering
  const SCREEN_ORDER = [
    'splash',
    'select-party',
    'q1',
    'q2',
    'q3',
    'q4',
    'q5',
    'thank-you',
    'live-results',
    'outro'
  ];

  const currentIndex = SCREEN_ORDER.indexOf(currentScreenId);

  const goToNextScreen = () => {
    if (currentIndex < SCREEN_ORDER.length - 1) {
      setCurrentScreenId(SCREEN_ORDER[currentIndex + 1]);
    } else {
      // Loop or restart
      setCurrentScreenId(SCREEN_ORDER[0]);
    }
  };

  const goToPrevScreen = () => {
    if (currentIndex > 0) {
      setCurrentScreenId(SCREEN_ORDER[currentIndex - 1]);
    }
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleResetFlow = () => {
    setCurrentScreenId('splash');
    setSelectedParty('bjp');
    setAnswers({
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0
    });
    setIsAutoPlaying(false);
  };

  // Auto-play timer effect
  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setTimeout(() => {
        goToNextScreen();
      }, currentScreenId === 'splash' ? 2400 : 3200);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentScreenId]);

  // Render content of a specific screen ID
  const renderScreenContent = (screenId, isStaticCard = false) => {
    switch (screenId) {
      case 'splash':
        return <ScreenSplash onNext={goToNextScreen} />;

      case 'select-party':
        return (
          <ScreenSelectParty
            selectedParty={isStaticCard ? 'bjp' : selectedParty}
            onSelectParty={(partyId) => setSelectedParty(partyId)}
            onNext={goToNextScreen}
            onSkip={() => setCurrentScreenId('q1')}
          />
        );

      case 'q1':
        return (
          <ScreenSurveyQuestion
            questionData={SURVEY_QUESTIONS[0]}
            totalSteps={5}
            selectedOption={isStaticCard ? 0 : answers.q1}
            onSelectOption={(idx) => handleSelectOption('q1', idx)}
            onNext={goToNextScreen}
            onPrev={goToPrevScreen}
          />
        );

      case 'q2':
        return (
          <ScreenSurveyQuestion
            questionData={SURVEY_QUESTIONS[1]}
            totalSteps={5}
            selectedOption={isStaticCard ? 0 : answers.q2}
            onSelectOption={(idx) => handleSelectOption('q2', idx)}
            onNext={goToNextScreen}
            onPrev={goToPrevScreen}
          />
        );

      case 'q3':
        return (
          <ScreenSurveyQuestion
            questionData={SURVEY_QUESTIONS[2]}
            totalSteps={5}
            selectedOption={isStaticCard ? 0 : answers.q3}
            onSelectOption={(idx) => handleSelectOption('q3', idx)}
            onNext={goToNextScreen}
            onPrev={goToPrevScreen}
          />
        );

      case 'q4':
        return (
          <ScreenSurveyQuestion
            questionData={SURVEY_QUESTIONS[3]}
            totalSteps={5}
            selectedOption={isStaticCard ? 0 : answers.q4}
            onSelectOption={(idx) => handleSelectOption('q4', idx)}
            onNext={goToNextScreen}
            onPrev={goToPrevScreen}
          />
        );

      case 'q5':
        return (
          <ScreenSurveyQuestion
            questionData={SURVEY_QUESTIONS[4]}
            totalSteps={5}
            selectedOption={isStaticCard ? 0 : answers.q5}
            onSelectOption={(idx) => handleSelectOption('q5', idx)}
            onNext={goToNextScreen}
            onPrev={goToPrevScreen}
            isLast={true}
          />
        );

      case 'thank-you':
        return <ScreenThankYou onNext={goToNextScreen} />;

      case 'live-results':
        return (
          <ScreenLiveResults
            onNext={goToNextScreen}
            onRestart={handleResetFlow}
          />
        );

      case 'outro':
        return <ScreenOutro onRestart={handleResetFlow} />;

      default:
        return <ScreenSplash onNext={goToNextScreen} />;
    }
  };

  return (
    <div className={`w-full bg-[#070709] text-white flex flex-col transition-all duration-300 relative ${
      isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto' : 'min-h-screen py-6 sm:py-10'
    }`}>
      {/* Background ambient gold lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Top Experience Control Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full z-20 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#141418]/90 border border-[#26262D] backdrop-blur-md shadow-2xl">
          {/* Title & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FDE68A] p-[2px] flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full rounded-[10px] bg-[#0E0E10] flex items-center justify-center">
                <span className="font-black text-xl text-[#F5C754]">9</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  NowNine Live Voting & Opinion Flow
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] font-black uppercase tracking-wider">
                  LIVE UI
                </span>
              </div>
            </div>
          </div>

          {/* Action & Mode Toggles */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* View Mode Toggle: Interactive Phone vs 10 Screens Grid */}
            <div className="flex items-center bg-[#1A1A20] p-1 rounded-xl border border-[#2D2D36]">
              <button
                onClick={() => setViewMode('interactive')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'interactive'
                    ? 'bg-gradient-to-r from-[#F5C754] to-[#EAB308] text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Interactive Phone</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#F5C754] to-[#EAB308] text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All 10 Screens Grid</span>
              </button>
            </div>

            {/* Auto-Play Walkthrough Toggle */}
            {viewMode === 'interactive' && (
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  isAutoPlaying
                    ? 'bg-amber-500/20 text-[#F5C754] border-amber-500/50'
                    : 'bg-[#1A1A20] text-gray-300 border-[#2D2D36] hover:text-white'
                }`}
                title="Automatically step through each screen"
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoPlaying ? 'Pause Walkthrough' : 'Auto Play Flow'}</span>
              </button>
            )}

            {/* Restart Button */}
            <button
              onClick={handleResetFlow}
              className="p-2 rounded-xl bg-[#1A1A20] border border-[#2D2D36] text-gray-300 hover:text-white hover:bg-[#25252E] transition-colors"
              title="Reset Flow to Splash Screen"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-[#1A1A20] border border-[#2D2D36] text-gray-300 hover:text-white hover:bg-[#25252E] transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close or back to main portal */}
            {onClose && (
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                Close View
              </button>
            )}
          </div>
        </div>

        {/* Step Navigation Ribbon (Only in interactive mode) */}
        {viewMode === 'interactive' && (
          <div className="mt-3 overflow-x-auto phone-scroll pb-1">
            <div className="flex items-center gap-1.5 min-w-max p-1 bg-[#101014] rounded-xl border border-[#202026]">
              {SCREEN_TABS.map((tab, idx) => {
                const isActive = tab.id === currentScreenId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentScreenId(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#F5C754] text-black font-bold shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      isActive ? 'bg-black text-[#F5C754]' : 'bg-[#1C1C22] text-gray-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span>{tab.short}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Display Area */}
      <div className="flex-1 max-w-7xl mx-auto px-4 w-full flex items-center justify-center z-10">
        {viewMode === 'interactive' ? (
          /* SINGLE INTERACTIVE PHONE SIMULATOR */
          <div className="flex flex-col items-center justify-center py-2 animate-fadeIn">
            <PhoneChassis
              title={`Step ${currentIndex + 1} of 10: ${SCREEN_TABS[currentIndex]?.label || ''}`}
              stepBadge={currentIndex + 1}
            >
              {renderScreenContent(currentScreenId, false)}
            </PhoneChassis>

            {/* Bottom Screen Switcher Controls */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={goToPrevScreen}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1A20] border border-[#2D2D36] text-xs font-bold text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Screen</span>
              </button>

              <span className="text-xs font-bold text-gray-400">
                {currentIndex + 1} / 10
              </span>

              <button
                type="button"
                onClick={goToNextScreen}
                disabled={currentIndex === SCREEN_ORDER.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5C754] to-[#EAB308] text-black text-xs font-extrabold shadow-md shadow-amber-500/20 disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-105 transition-all"
              >
                <span>Next Screen</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ALL 10 SCREENS SIDE-BY-SIDE (EXACT REPLICA OF USER REFERENCE IMAGE) */
          <div className="w-full py-4 animate-fadeIn">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold gold-gradient-text tracking-tight">
                All 10 Screens Complete Workflow
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Click any phone screen below to jump directly into the interactive simulator
              </p>
            </div>

            {/* 10 Phones Grid (2 rows of 5 on large screens, responsive on smaller screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
              {SCREEN_ORDER.map((screenId, idx) => {
                const tabInfo = SCREEN_TABS[idx];
                return (
                  <div key={screenId} className="flex flex-col items-center">
                    <PhoneChassis
                      title={tabInfo?.short}
                      stepBadge={idx + 1}
                      isCard={true}
                      onClick={() => {
                        setCurrentScreenId(screenId);
                        setViewMode('interactive');
                      }}
                    >
                      {renderScreenContent(screenId, true)}
                    </PhoneChassis>

                    {/* Quick Button below each card */}
                    <button
                      onClick={() => {
                        setCurrentScreenId(screenId);
                        setViewMode('interactive');
                      }}
                      className="mt-2.5 px-3 py-1 rounded-lg bg-[#18181E] border border-[#2C2C35] text-[11px] font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all flex items-center gap-1"
                    >
                      <span>Interact Screen {idx + 1}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer info note */}
      <div className="mt-8 pt-4 border-t border-[#1C1C22] text-center text-xs text-gray-500">
        <p>Now Nine • Your Vote | Your Voice • Live Citizen Opinion Platform</p>
      </div>
    </div>
  );
}
