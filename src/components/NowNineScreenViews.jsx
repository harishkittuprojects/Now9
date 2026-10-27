import React from 'react';
import { ChevronLeft, ChevronRight, BarChart2, Users, Check } from 'lucide-react';
import { PartySymbol, NowNineLogo, CompactTopHeader } from './NowNinePartySymbols';
import { PARTIES, SURVEY_QUESTIONS } from '../data/nowNineAppFlowData';

// Top Golden Ribbon Decorative Wave
export function GoldenRibbonDecor({ position = "top" }) {
  if (position === "bottom") {
    return (
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-24 z-0 opacity-40">
        <svg viewBox="0 0 400 120" fill="none" className="w-full h-full preserve-3d">
          <path d="M-20,120 Q100,60 250,90 T420,40 L420,120 Z" fill="url(#goldGradBottom)" opacity="0.6" />
          <path d="M-10,120 Q140,80 300,110 T420,80 L420,120 Z" fill="url(#goldGradBottom2)" opacity="0.4" />
          <defs>
            <linearGradient id="goldGradBottom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CA8A04" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="goldGradBottom2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden h-28 z-0 opacity-60">
      <svg viewBox="0 0 400 120" fill="none" className="w-full h-full">
        <path d="M-20,0 C60,40 180,60 420,-10 L420,0 L-20,0 Z" fill="url(#goldGrad1)" opacity="0.4" />
        <path d="M-10,0 C120,60 280,20 420,40 L420,0 L-10,0 Z" fill="url(#goldGrad2)" opacity="0.3" />
        <path d="M50,-10 Q200,90 410,15 L410,-10 Z" fill="url(#goldGrad3)" opacity="0.25" />
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#EAB308" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#CA8A04" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// 1. Phone Status Bar (Cellular, Wifi, Battery without time)
export function PhoneStatusBar() {
  return (
    <div className="h-6 px-4 flex items-center justify-end text-white text-[11px] font-semibold tracking-tight z-30 select-none bg-transparent shrink-0">
      <div className="flex items-center gap-1.5 opacity-90 ml-auto">
        {/* Cellular Signal (4 bars) */}
        <div className="flex items-end gap-[1.5px] h-3">
          <span className="w-[2.5px] h-1.5 bg-white rounded-2xs"></span>
          <span className="w-[2.5px] h-2 bg-white rounded-2xs"></span>
          <span className="w-[2.5px] h-2.5 bg-white rounded-2xs"></span>
          <span className="w-[2.5px] h-3 bg-white rounded-2xs"></span>
        </div>
        {/* Wifi Icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M12 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-4.9-3.4a7.02 7.02 0 0 1 9.8 0l1.4-1.4a8.98 8.98 0 0 0-12.6 0l1.4 1.4zm-2.8-2.8a11 11 0 0 1 15.4 0l1.4-1.4a12.98 12.98 0 0 0-18.2 0l1.4 1.4z" />
        </svg>
        {/* Battery Icon */}
        <div className="flex items-center gap-[1px]">
          <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1px] flex items-center">
            <div className="h-full w-full bg-white rounded-[1.5px]"></div>
          </div>
          <div className="w-[1.5px] h-1 bg-white/70 rounded-r-xs"></div>
        </div>
      </div>
    </div>
  );
}

// 2. SCREEN 1: SPLASH SCREEN
export function ScreenSplash({ onNext }) {
  return (
    <div 
      onClick={onNext}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden cursor-pointer select-none bg-[#0B0B0D]"
    >
      <GoldenRibbonDecor position="top" />

      {/* Top Bar */}
      <PhoneStatusBar />

      {/* Center Brand Identity */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-4 pb-2 z-10 text-center animate-fadeIn">
        <div className="mb-2 transform transition-transform duration-300 hover:scale-105">
          <NowNineLogo size="xl" showSubtitle={true} showLiveBadge={true} />
        </div>
      </div>

      {/* Hero Illustration: Illuminated Parliament & Silhouettes */}
      <div className="relative w-full z-10 flex flex-col items-center">
        {/* Parliament Graphic */}
        <div className="relative w-full overflow-hidden flex items-end justify-center">
          <img
            src="/assets/parliament_circular.jpg"
            alt="Indian Parliament Sansad Bhavan Illuminated"
            className="w-full h-56 object-cover object-bottom filter contrast-110 brightness-105 drop-shadow-2xl"
          />
          {/* Subtle dark gradient overlay to blend into black background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-transparent to-transparent"></div>
        </div>

        {/* Golden Cursive Slogan */}
        <div className="py-4 text-center z-20">
          <p 
            className="font-script text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FDE047] via-[#F5C754] to-[#EAB308] tracking-wide drop-shadow-md"
            style={{ textShadow: '0 2px 10px rgba(234, 179, 8, 0.4)' }}
          >
            India's Voice Matters
          </p>
        </div>

        {/* Tap to enter hint */}
        <div className="pb-3 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-yellow-500/20 text-yellow-300/80 text-[11px] font-medium tracking-wide">
            <span>Tap anywhere to continue</span>
            <ChevronRight className="w-3.5 h-3.5 text-yellow-400" />
          </span>
        </div>
      </div>

      {/* Bottom Home Swipe Bar */}
      <div className="w-full pb-2 flex justify-center z-20">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}

// 3. SCREEN 2: SELECT YOUR PARTY
export function ScreenSelectParty({ selectedParty, onSelectParty, onNext, onSkip }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C0E] text-white">
      <GoldenRibbonDecor position="top" />

      {/* Status Bar */}
      <PhoneStatusBar />

      {/* Header */}
      <CompactTopHeader onSkip={onSkip} />

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-3 overflow-y-auto phone-scroll z-10">
        {/* Title & Subtitle */}
        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-white mb-0.5">
            Select Your Party
          </h2>
          <p className="text-xs text-gray-400">
            Choose the party you prefer
          </p>
        </div>

        {/* Parties List */}
        <div className="space-y-2.5">
          {PARTIES.map((party) => {
            const isSelected = selectedParty === party.id;
            return (
              <button
                key={party.id}
                type="button"
                onClick={() => onSelectParty(party.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'border-[#EAB308] bg-[#1C1A14]/90 shadow-lg shadow-amber-500/10'
                    : 'border-[#26262B] bg-[#141417]/80 hover:border-gray-600 hover:bg-[#1A1A1F]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Party Icon */}
                  <PartySymbol type={party.symbolType} className="w-8 h-8 rounded-lg" />
                  
                  {/* Names */}
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white leading-snug">
                      {party.name}
                    </span>
                    <span className="text-[11px] font-telugu text-gray-400">
                      {party.teluguName}
                    </span>
                  </div>
                </div>

                {/* Radio Circle */}
                <div 
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#F5C754] bg-[#0E0E10]'
                      : 'border-gray-500 group-hover:border-gray-400'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FDE047] to-[#F59E0B] shadow-sm"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Area */}
      <div className="p-4 border-t border-[#222226] bg-[#0E0E11]/95 z-20">
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedParty}
          className="gold-btn w-full py-3 px-6 rounded-full text-black font-extrabold text-sm flex items-center justify-center gap-2 tracking-wide disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
        {/* iOS Home Indicator */}
        <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-3"></div>
      </div>
    </div>
  );
}

// 4. SCREEN 3-7: SURVEY QUESTIONS (Step 1 to 5)
export function ScreenSurveyQuestion({ 
  questionData, 
  totalSteps = 5, 
  selectedOption, 
  onSelectOption, 
  onNext, 
  onPrev,
  isLast = false
}) {
  const currentStep = questionData.step;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C0E] text-white">
      <GoldenRibbonDecor position="top" />

      {/* Status Bar */}
      <PhoneStatusBar />

      {/* Stepper Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#252528] bg-[#0E0E10]/90 z-20">
        {/* Back Button */}
        <button
          type="button"
          onClick={onPrev}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Previous question"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Numbered Stepper: 1 2 3 4 5 */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((sNum) => {
            const isActive = sNum === currentStep;
            return (
              <div
                key={sNum}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-tr from-[#F5C754] to-[#FDE047] text-black shadow-md shadow-amber-500/30 ring-2 ring-amber-400/30'
                    : 'bg-[#1C1C21] text-gray-400 border border-[#2D2D35]'
                }`}
              >
                {sNum}
              </div>
            );
          })}
        </div>

        {/* Step Indicator */}
        <span className="text-[11px] font-semibold text-gray-400">
          {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Question & Options Content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto phone-scroll z-10 flex flex-col justify-between">
        <div>
          {/* Question Text in Telugu */}
          <h3 className="font-telugu text-[15px] sm:text-base font-bold text-white mb-5 leading-relaxed tracking-wide">
            {questionData.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {questionData.options.map((optionText, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectOption(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 group cursor-pointer ${
                    isSelected
                      ? 'border-[#EAB308] bg-[#1D1B14] shadow-md shadow-amber-500/10'
                      : 'border-[#26262B] bg-[#141417]/80 hover:border-gray-600 hover:bg-[#1A1A1F]'
                  }`}
                >
                  {/* Radio Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'border-[#F5C754] bg-[#0E0E10]'
                        : 'border-gray-500 group-hover:border-gray-400'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FDE047] to-[#F59E0B]"></div>
                    )}
                  </div>

                  {/* Option Text in Telugu */}
                  <span className={`font-telugu text-sm leading-snug ${isSelected ? 'text-white font-semibold' : 'text-gray-300'}`}>
                    {optionText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Button */}
      <div className="p-4 border-t border-[#222226] bg-[#0E0E11]/95 z-20">
        <button
          type="button"
          onClick={onNext}
          disabled={selectedOption === undefined || selectedOption === null}
          className="gold-btn w-full py-3 px-6 rounded-full text-black font-extrabold text-sm flex items-center justify-center gap-2 tracking-wide disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{isLast ? 'Submit Answers' : 'Next'}</span>
          {!isLast && <ChevronRight className="w-4 h-4 stroke-[3]" />}
        </button>
        {/* iOS Home Indicator */}
        <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-3"></div>
      </div>
    </div>
  );
}

// 5. SCREEN 8: THANK YOU
export function ScreenThankYou({ onNext }) {
  return (
    <div 
      onClick={onNext}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0B0B0D] text-white cursor-pointer select-none"
    >
      <GoldenRibbonDecor position="top" />

      {/* Status Bar */}
      <PhoneStatusBar />

      {/* Center Thank You Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-2 pb-2 z-10 text-center animate-fadeIn">
        {/* Logo */}
        <div className="mb-4">
          <NowNineLogo size="lg" showSubtitle={true} showLiveBadge={true} />
        </div>

        {/* Thank You Heading */}
        <h2 className="text-3xl font-extrabold gold-gradient-text tracking-tight mb-2 drop-shadow-lg">
          Thank You!
        </h2>
        
        {/* Subtitle */}
        <p className="text-xs text-gray-300 font-medium leading-relaxed">
          Your opinion matters.
        </p>
        <p className="text-xs text-gray-400 font-medium">
          We appreciate your time.
        </p>
      </div>

      {/* Hero Parliament Graphic */}
      <div className="relative w-full z-10 flex flex-col items-center">
        <div className="relative w-full overflow-hidden flex items-end justify-center">
          <img
            src="/assets/parliament_circular.jpg"
            alt="Indian Parliament Sansad Bhavan Illuminated"
            className="w-full h-44 object-cover object-bottom filter contrast-110 brightness-105 drop-shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-transparent to-transparent"></div>
        </div>

        {/* Bottom card: Pulse note */}
        <div className="px-5 w-full pb-3 z-20">
          <div className="p-3 rounded-2xl bg-[#161619] border border-[#2D2D33] flex items-center gap-3 shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-[#F5C754]/15 border border-[#F5C754]/30 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#F5C754]" />
            </div>
            <p className="text-[11px] text-gray-300 leading-snug">
              Your responses will help us understand the real pulse of the people.
            </p>
          </div>
        </div>

        {/* Click to proceed hint */}
        <div className="pb-2 text-center">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-yellow-400 hover:underline">
            <span>View Live Poll Results</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="w-full pb-2 flex justify-center z-20">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}

// 6. SCREEN 9: LIVE POLL RESULTS
export function ScreenLiveResults({ onNext, onRestart }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C0E] text-white">
      <GoldenRibbonDecor position="top" />

      {/* Status Bar */}
      <PhoneStatusBar />

      {/* Top Header */}
      <CompactTopHeader />

      {/* Content Area */}
      <div className="flex-1 px-4 py-3 overflow-y-auto phone-scroll z-10 flex flex-col justify-between">
        <div>
          {/* Header Title with Bar Chart Icon */}
          <div className="flex items-center gap-2 mb-0.5">
            <BarChart2 className="w-5 h-5 text-[#F5C754]" />
            <h2 className="text-lg font-bold tracking-tight text-white">
              Live Poll Results
            </h2>
          </div>
          <p className="text-[11px] text-gray-400 mb-4">
            Current Trend (Overall)
          </p>

          {/* Results Bars */}
          <div className="space-y-3">
            {PARTIES.map((party) => {
              return (
                <div key={party.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <PartySymbol type={party.symbolType} className="w-6 h-6 rounded-md" />
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-xs leading-none">
                          {party.name}
                        </span>
                        <span className="text-[9px] font-telugu text-gray-400 leading-none mt-0.5">
                          {party.teluguName}
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-white">
                      {party.resultPercent.toFixed(1)}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#1F1F24] overflow-hidden p-[1px]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 shadow-sm"
                      style={{
                        width: `${party.resultPercent}%`,
                        backgroundColor: party.barColor,
                        boxShadow: `0 0 8px ${party.barColor}55`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Card at Bottom */}
        <div className="mt-4 pt-2">
          <div className="p-3 rounded-2xl bg-[#141418] border border-[#26262B] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <BarChart2 className="w-4 h-4 text-[#F5C754]" />
            </div>
            <p className="text-[10px] text-gray-400 leading-tight">
              This is a pre-poll survey result and not an official election outcome.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Area */}
      <div className="p-3 border-t border-[#222226] bg-[#0E0E11]/95 z-20">
        <button
          type="button"
          onClick={onNext}
          className="gold-btn w-full py-2.5 px-6 rounded-full text-black font-extrabold text-xs flex items-center justify-center gap-1.5 tracking-wide cursor-pointer"
        >
          <span>Continue</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
        {/* iOS Home Indicator */}
        <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-2.5"></div>
      </div>
    </div>
  );
}

// 7. SCREEN 10: TOGETHER FOR A STRONGER DEMOCRACY (OUTRO)
export function ScreenOutro({ onRestart }) {
  return (
    <div 
      onClick={onRestart}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0B0B0D] text-white cursor-pointer select-none"
    >
      <GoldenRibbonDecor position="top" />

      {/* Status Bar */}
      <PhoneStatusBar />

      {/* Top Brand Identity */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-4 pb-2 z-10 text-center animate-fadeIn">
        <div className="mb-4">
          <NowNineLogo size="lg" showSubtitle={true} showLiveBadge={true} />
        </div>

        {/* Golden Cursive / Calligraphy Title */}
        <div className="mt-2 max-w-[260px] text-center">
          <h2 
            className="font-script text-3xl sm:text-4xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0A0] via-[#F5C754] to-[#EAB308] drop-shadow-xl"
            style={{ textShadow: '0 2px 14px rgba(234, 179, 8, 0.45)' }}
          >
            Together for a Stronger Democracy
          </h2>
        </div>
      </div>

      {/* Hero Illustration: Parliament & Crowd */}
      <div className="relative w-full z-10 flex flex-col items-center">
        <div className="relative w-full overflow-hidden flex items-end justify-center">
          <img
            src="/assets/parliament_circular.jpg"
            alt="Indian Parliament Sansad Bhavan Illuminated"
            className="w-full h-52 object-cover object-bottom filter contrast-110 brightness-105 drop-shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-transparent to-transparent"></div>
        </div>

        {/* Restart / Replay Survey Hint */}
        <div className="py-4 text-center z-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-yellow-500/20 text-yellow-300 text-[11px] font-semibold tracking-wide hover:bg-white/10 transition-colors">
            <span>Tap to restart survey flow</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Bottom Home Indicator */}
      <div className="w-full pb-2 flex justify-center z-20">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}

// 8. LUXURY PHONE CHASSIS WRAPPER
export function PhoneChassis({ children, title = null, stepBadge = null, className = "", isCard = false, onClick = null }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Optional Card Label */}
      {title && (
        <div className="mb-2 text-center flex items-center gap-1.5">
          {stepBadge && (
            <span className="w-5 h-5 rounded-full bg-[#EAB308] text-black font-extrabold text-[11px] flex items-center justify-center">
              {stepBadge}
            </span>
          )}
          <span className="text-xs font-bold text-gray-300">
            {title}
          </span>
        </div>
      )}

      {/* iPhone Device Chassis */}
      <div 
        onClick={onClick}
        className={`relative rounded-[38px] p-[5px] sm:p-[6px] bg-gradient-to-b from-[#403B2E] via-[#1E1E22] to-[#3B3420] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#524933]/60 transition-transform duration-300 ${
          isCard ? 'hover:scale-[1.02] cursor-pointer' : ''
        }`}
        style={{
          width: isCard ? '220px' : '340px',
          height: isCard ? '440px' : '680px',
          maxWidth: '100%'
        }}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#111116] ml-6"></div>
        </div>

        {/* Screen Bezel & Container */}
        <div className="w-full h-full rounded-[32px] overflow-hidden bg-[#0C0C0E] border border-black/80 relative">
          {children}
        </div>
      </div>
    </div>
  );
}
