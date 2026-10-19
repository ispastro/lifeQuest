import React from 'react';

export type MascotMood = 
  | 'welcoming' 
  | 'celebrating' 
  | 'level_up' 
  | 'encouraging' 
  | 'empty_state' 
  | 'weekly_achievement';

interface PipMascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
  onClick?: () => void;
  className?: string;
}

export const PipMascot: React.FC<PipMascotProps> = ({
  mood = 'welcoming',
  size = 'md',
  speechBubble,
  onClick,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-52 h-52',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Speech Bubble */}
      {speechBubble && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 max-w-[85vw] sm:max-w-xs text-center whitespace-normal sm:whitespace-nowrap bg-white text-slate-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-2xl shadow-lg border-2 border-slate-200 animate-bounce-subtle">
          <span>{speechBubble}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
          <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-slate-200 -z-10" />
        </div>
      )}

      {/* Floating Spark Glow */}
      <div 
        className={`relative ${sizeMap[size]} cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95`}
        onClick={onClick}
        title="Pip - Your LifeQuest Companion (Click to cheer!)"
      >
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Mascot Body Gradient */}
            <radialGradient id="pipBodyGrad" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="65%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>

            {/* Belly Screen Gradient */}
            <linearGradient id="pipScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Core Energy Glow */}
            <radialGradient id="pipCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>

            {/* Golden Crown / Horn Aura */}
            <linearGradient id="pipGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Soft Shadow */}
            <filter id="pipShadow" x="-20%" y="-10%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#064e3b" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Aura for Level Up / Celebrating */}
          {(mood === 'level_up' || mood === 'celebrating') && (
            <g className="animate-spin" style={{ transformOrigin: '80px 85px', animationDuration: '14s' }}>
              <circle cx="80" cy="85" r="70" stroke="#fde047" strokeWidth="2" strokeDasharray="6 8" opacity="0.6" />
              <circle cx="80" cy="85" r="62" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
            </g>
          )}

          {/* Little Floating Companion Wings / Jet Thrusters */}
          <g className="transition-all duration-300">
            {/* Left Thruster */}
            <rect x="22" y="78" width="16" height="24" rx="8" fill="#15803d" stroke="#0f3d23" strokeWidth="2" />
            <circle cx="30" cy="98" r="4" fill="#38bdf8" className="animate-pulse" />
            
            {/* Right Thruster */}
            <rect x="122" y="78" width="16" height="24" rx="8" fill="#15803d" stroke="#0f3d23" strokeWidth="2" />
            <circle cx="130" cy="98" r="4" fill="#38bdf8" className="animate-pulse" />
          </g>

          {/* Main Body - Adorable Rounded Cyber-Familiar */}
          <rect
            x="36"
            y="42"
            width="88"
            height="86"
            rx="40"
            fill="url(#pipBodyGrad)"
            stroke="#0f3d23"
            strokeWidth="3.5"
            filter="url(#pipShadow)"
          />

          {/* Antenna / Spark Sensor */}
          <g>
            <path d="M80 42 V26" stroke="#0f3d23" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="80" cy="22" r="9" fill="url(#pipGoldGrad)" stroke="#0f3d23" strokeWidth="2" />
            <circle cx="78" cy="20" r="3" fill="#ffffff" />
            {/* Tiny Spark Star */}
            <path
              d="M80 14 L82 18 L86 20 L82 22 L80 26 L78 22 L74 20 L78 18 Z"
              fill="#fef08a"
              className="animate-sparkle"
              style={{ transformOrigin: '80px 20px' }}
            />
          </g>

          {/* Ear Sensor Pods */}
          <circle cx="36" cy="74" r="9" fill="#15803d" stroke="#0f3d23" strokeWidth="2.5" />
          <circle cx="36" cy="74" r="4" fill="#38bdf8" />
          <circle cx="124" cy="74" r="9" fill="#15803d" stroke="#0f3d23" strokeWidth="2.5" />
          <circle cx="124" cy="74" r="4" fill="#38bdf8" />

          {/* Belly Screen / Face Visor */}
          <rect
            x="48"
            y="54"
            width="64"
            height="50"
            rx="18"
            fill="url(#pipScreenGrad)"
            stroke="#0f172a"
            strokeWidth="2"
          />

          {/* Visor Glass Reflection */}
          <path
            d="M52 60 C62 56, 80 56, 106 60 C90 64, 68 64, 52 60 Z"
            fill="#ffffff"
            fillOpacity="0.15"
          />

          {/* EXPRESSIVE EYES BASED ON MOOD */}
          {mood === 'welcoming' && (
            <g>
              {/* Happy Arched Eyes ^ ^ */}
              <path d="M58 74 Q66 64 74 74" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M86 74 Q94 64 102 74" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Soft Blushing Cheeks */}
              <circle cx="56" cy="86" r="3.5" fill="#f472b6" opacity="0.7" />
              <circle cx="104" cy="86" r="3.5" fill="#f472b6" opacity="0.7" />
              {/* Cute smiling mouth LED */}
              <path d="M76 86 Q80 90 84 86" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'celebrating' && (
            <g>
              {/* Starry Eyes ★ ★ */}
              <polygon points="66,66 68,72 74,72 69,76 71,82 66,78 61,82 63,76 58,72 64,72" fill="#fde047" />
              <polygon points="94,66 96,72 102,72 97,76 99,82 94,78 89,82 91,76 86,72 92,72" fill="#fde047" />
              {/* Cheerful wide open smile */}
              <path d="M74 86 Q80 94 86 86 Z" fill="#38bdf8" />
              {/* Rosy cheeks */}
              <circle cx="54" cy="84" r="4" fill="#fb7185" opacity="0.8" />
              <circle cx="106" cy="84" r="4" fill="#fb7185" opacity="0.8" />
            </g>
          )}

          {mood === 'level_up' && (
            <g>
              {/* Golden Crown on Head */}
              <path
                d="M62 40 L70 28 L80 34 L90 28 L98 40 Z"
                fill="url(#pipGoldGrad)"
                stroke="#0f3d23"
                strokeWidth="2"
              />
              <circle cx="70" cy="28" r="2.5" fill="#f43f5e" />
              <circle cx="80" cy="34" r="2.5" fill="#38bdf8" />
              <circle cx="90" cy="28" r="2.5" fill="#a855f7" />

              {/* Triumphant determined glowing eyes */}
              <circle cx="66" cy="74" r="7" fill="#fde047" />
              <circle cx="68" cy="72" r="3" fill="#ffffff" />
              <circle cx="94" cy="74" r="7" fill="#fde047" />
              <circle cx="96" cy="72" r="3" fill="#ffffff" />
              {/* Confident smirk */}
              <path d="M75 88 Q82 93 88 87" stroke="#fde047" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'encouraging' && (
            <g>
              {/* Winking left eye, determined right eye */}
              <path d="M58 74 L72 74" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <circle cx="94" cy="74" r="6" fill="#38bdf8" />
              <circle cx="96" cy="72" r="2" fill="#ffffff" />
              {/* Warm encouraging smile */}
              <path d="M76 86 Q80 90 85 87" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="56" cy="85" r="3" fill="#f472b6" opacity="0.6" />
              <circle cx="104" cy="85" r="3" fill="#f472b6" opacity="0.6" />
            </g>
          )}

          {mood === 'empty_state' && (
            <g>
              {/* Curious wide round eyes */}
              <circle cx="66" cy="74" r="6" fill="#38bdf8" />
              <circle cx="68" cy="72" r="2.5" fill="#ffffff" />
              <circle cx="94" cy="74" r="6" fill="#38bdf8" />
              <circle cx="96" cy="72" r="2.5" fill="#ffffff" />
              {/* Small "o" mouth */}
              <circle cx="80" cy="88" r="3" fill="#38bdf8" />
            </g>
          )}

          {mood === 'weekly_achievement' && (
            <g>
              {/* Sparkle happy eyes */}
              <path d="M60 72 Q66 65 72 72 Q66 79 60 72 Z" fill="#fde047" />
              <path d="M88 72 Q94 65 100 72 Q94 79 88 72 Z" fill="#fde047" />
              {/* Cheerful wide smile */}
              <path d="M74 86 Q80 92 86 86" stroke="#fde047" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Little Hands / Waving Hand */}
          <g>
            {mood === 'welcoming' || mood === 'celebrating' ? (
              // Left hand waving up!
              <path
                d="M38 78 C28 65, 24 50, 32 46 C38 42, 42 56, 42 66"
                fill="#22c55e"
                stroke="#0f3d23"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ) : (
              // Left hand resting at side
              <circle cx="40" cy="98" r="7" fill="#22c55e" stroke="#0f3d23" strokeWidth="2.5" />
            )}

            {mood === 'celebrating' ? (
              // Right hand raised too!
              <path
                d="M122 78 C132 65, 136 50, 128 46 C122 42, 118 56, 118 66"
                fill="#22c55e"
                stroke="#0f3d23"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ) : mood === 'encouraging' ? (
              // Thumbs up / fist bump right hand
              <g>
                <circle cx="120" cy="94" r="8" fill="#22c55e" stroke="#0f3d23" strokeWidth="2.5" />
                <path d="M120 86 V92" stroke="#0f3d23" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              // Right hand resting
              <circle cx="120" cy="98" r="7" fill="#22c55e" stroke="#0f3d23" strokeWidth="2.5" />
            )}
          </g>

          {/* Lower Arc Energy Reactor Core */}
          <circle cx="80" cy="116" r="6" fill="url(#pipCoreGlow)" stroke="#0f3d23" strokeWidth="2" />
          <circle cx="80" cy="116" r="2.5" fill="#ffffff" className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
};
