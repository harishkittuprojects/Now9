import React from 'react';

// Crisp SVG Symbols matching the exact symbols in the user UI reference
export function PartySymbol({ type, className = "w-6 h-6", rounded = "rounded-lg" }) {
  switch (type) {
    case 'lotus':
    case 'bjp':
      return (
        <div className={`flex items-center justify-center shrink-0 bg-[#FF6F00] text-white p-1.5 shadow-sm ${rounded} ${className}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            {/* Lotus Petals */}
            <path d="M12 3c-1.5 3-3.5 5.5-3.5 8.5a3.5 3.5 0 0 0 7 0C15.5 8.5 13.5 6 12 3z" fill="white" stroke="#FF6F00" strokeWidth="0.5" />
            <path d="M8.5 11.5c-2.5-1-4.5 0-5.5 2 1.5 2.5 4.5 2.5 5.5.5z" fill="white" stroke="#FF6F00" strokeWidth="0.5" />
            <path d="M15.5 11.5c2.5-1 4.5 0 5.5 2-1.5 2.5-4.5 2.5-5.5.5z" fill="white" stroke="#FF6F00" strokeWidth="0.5" />
            <path d="M6 15c-2 .5-3 2-3 3.5 2.5 1 5.5 0 6.5-1.5z" fill="white" />
            <path d="M18 15c2 .5 3 2 3 3.5-2.5 1-5.5 0-6.5-1.5z" fill="white" />
            <path d="M4 19.5c4 2 12 2 16 0" stroke="white" strokeWidth="1.8" />
          </svg>
        </div>
      );

    case 'hand':
    case 'congress':
      return (
        <div className={`flex items-center justify-center shrink-0 bg-[#0284C7] text-white p-1.5 shadow-sm ${rounded} ${className}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            {/* Open Palm of Hand */}
            <path d="M18 10a1 1 0 0 0-1-1 1 1 0 0 0-1 1v-3a1 1 0 0 0-2 0v3a1 1 0 0 0-2 0V5a1 1 0 0 0-2 0v5a1 1 0 0 0-2 0V8a1 1 0 0 0-2 0v7c0 4.4 3.6 8 8 8s8-3.6 8-8v-5z" />
          </svg>
        </div>
      );

    case 'car':
    case 'brs':
      return (
        <div className={`flex items-center justify-center shrink-0 bg-[#E11475] text-white p-1.5 shadow-sm ${rounded} ${className}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            {/* Car profile */}
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L17.8 7.3C17.4 6.5 16.6 6 15.7 6H8.3c-.9 0-1.7.5-2.1 1.3L3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3zM8 18.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm10 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM6.5 11l2-3.5h7l2 3.5h-11z" />
          </svg>
        </div>
      );

    case 'fan':
    case 'ysrcp':
      return (
        <div className={`flex items-center justify-center shrink-0 bg-[#16A34A] text-white p-1.5 shadow-sm ${rounded} ${className}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            {/* Ceiling Fan Symbol */}
            <circle cx="12" cy="12" r="2.8" />
            <path d="M12 9.2V2.5c0-.8.7-1.5 1.5-1.5 2 0 3.5 3 3 6.5l-4.5 1.7z" />
            <path d="M9.6 13.4L3.8 17c-.7.4-1.6.1-2-.6-1-1.7.5-4.5 3.8-5.3l4 2.3z" />
            <path d="M14.4 13.4l5.8 3.6c.7.4 1 .1 1.2-.7.6-2-1.3-4.3-4.5-4.8l-2.5 1.9z" />
          </svg>
        </div>
      );

    case 'hammer':
    case 'cpm':
      return (
        <div className={`flex items-center justify-center shrink-0 bg-[#DC2626] text-white p-1.5 shadow-sm ${rounded} ${className}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            {/* Crossed Sickle and Hammer */}
            <path d="M12 2l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4z" transform="scale(0.6) translate(16, 2)" />
            <path d="M18.8 8.2c-1.8-2.4-4.8-3.9-8.1-3.9-2.5 0-4.8.9-6.6 2.4l1.4 1.4C6.9 7.1 8.8 6.4 10.7 6.4c2.8 0 5.3 1.3 6.9 3.3L15 11.3l5.5 1.5.5-5.6-2.2 1z" />
            <path d="M6 14l-3 3 1.4 1.4 3-3-1.4-1.4z" />
            <path d="M13.5 12.5l-4-4-1.5 1.5 1.5 1.5-5 5 2 2 5-5 1.5 1.5 1.5-1.5z" />
          </svg>
        </div>
      );

    case 'others':
    default:
      return (
        <div className={`flex items-center justify-center shrink-0 bg-[#475569] text-white p-1.5 shadow-sm ${rounded} ${className}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        </div>
      );
  }
}

// The official NowNine Gold '9' with Play Arrow embedded
export function NowNineLogo({ size = "md", showSubtitle = true, showLiveBadge = true }) {
  const iconSize = size === "lg" ? "w-14 h-14" : size === "xl" ? "w-20 h-20" : size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const numSize = size === "lg" ? "text-3xl" : size === "xl" ? "text-5xl" : size === "sm" ? "text-lg" : "text-2xl";
  const titleSize = size === "lg" ? "text-3xl" : size === "xl" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center gap-2">
        {/* Golden circular emblem with '9' & inner play symbol */}
        <div className={`${iconSize} rounded-full bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FDE68A] p-[2.5px] shadow-lg shadow-amber-500/25 shrink-0 flex items-center justify-center relative`}>
          <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center relative overflow-hidden">
            {/* Golden 9 */}
            <span className={`font-black ${numSize} text-transparent bg-clip-text bg-gradient-to-b from-[#FFF1B0] via-[#F5C754] to-[#D49022] leading-none tracking-tighter`}>
              9
            </span>
            {/* Play triangle inside the loop */}
            <div className="absolute right-[22%] top-[34%] w-0 h-0 border-t-[3.5px] border-t-transparent border-b-[3.5px] border-b-transparent border-l-[6px] border-l-[#F5C754]"></div>
          </div>
        </div>

        {/* Brand Name Text */}
        <div className="flex items-center">
          <span className={`font-extrabold ${titleSize} tracking-tight text-white`}>
            now<span className="text-[#F5C754]">nine</span>
          </span>
        </div>
      </div>

      {/* Subtitle & LIVE pill badge */}
      {showSubtitle && (
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-gray-300 tracking-[0.18em] uppercase">
            YOUR VOTE <span className="text-[#F5C754]">|</span> YOUR VOICE
          </span>
          {showLiveBadge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#DC2626] text-white text-[9px] font-black uppercase tracking-wider shadow-sm shadow-red-600/40">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping mr-1 inline-block" />
              LIVE
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Header variation for inside screens (compact top bar)
export function CompactTopHeader({ onMenuClick, onSkip, title = null }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-b border-[#252528] bg-[#0E0E10]/90 backdrop-blur-md sticky top-0 z-20">
      <button 
        type="button"
        onClick={onMenuClick}
        className="w-8 h-8 rounded-lg flex flex-col justify-center gap-1 p-1.5 hover:bg-white/10 text-gray-300 transition-colors"
        aria-label="Navigation Menu"
      >
        <span className="w-5 h-0.5 bg-[#F5C754] rounded-full"></span>
        <span className="w-5 h-0.5 bg-[#F5C754] rounded-full"></span>
        <span className="w-3.5 h-0.5 bg-[#F5C754] rounded-full"></span>
      </button>

      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#B45309] via-[#F59E0B] to-[#FDE68A] p-[1.5px] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center">
            <span className="font-black text-xs text-[#F5C754]">9</span>
          </div>
        </div>
        <span className="font-extrabold text-base tracking-tight text-white">
          now<span className="text-[#F5C754]">nine</span>
        </span>
      </div>

      {onSkip ? (
        <button
          onClick={onSkip}
          className="text-xs font-semibold text-gray-300 hover:text-white px-2 py-1 rounded transition-colors"
        >
          Skip
        </button>
      ) : (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[9px] font-black uppercase tracking-wider">
          LIVE
        </span>
      )}
    </div>
  );
}
