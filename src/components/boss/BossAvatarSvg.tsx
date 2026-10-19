import React from 'react';

interface BossAvatarSvgProps {
  bossId: string;
  isHit?: boolean;
  defeated?: boolean;
  className?: string;
}

export const BossAvatarSvg: React.FC<BossAvatarSvgProps> = ({ 
  bossId, 
  isHit = false, 
  defeated = false,
  className = "w-32 h-32 sm:w-44 sm:h-44" 
}) => {
  if (bossId === 'boss-spaghetti-titan') {
    return (
      <div className={`relative flex items-center justify-center transition-transform duration-150 ${isHit ? 'animate-bounce scale-95' : 'animate-float'} ${className}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Spaghetti Monolith Base */}
          <rect x="25" y="25" width="70" height="80" rx="16" fill={defeated ? "#64748b" : isHit ? "#ef4444" : "#334155"} stroke="#1e293b" strokeWidth="4"/>
          {/* Cracked Stone Rune Lines */}
          <path d="M40 30 L55 60 L45 95" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 2"/>
          <path d="M80 35 L68 70 L75 90" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 2"/>
          {/* Tangled Wire Tentacles */}
          <path d="M15 60 Q 5 75 18 90 Q 25 100 20 115" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
          <path d="M105 60 Q 115 75 102 90 Q 95 100 100 115" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
          <path d="M20 40 Q 5 30 15 15" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
          <path d="M100 40 Q 115 30 105 15" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
          {/* Eyes */}
          {defeated ? (
            <>
              <text x="42" y="55" fill="#94a3b8" fontSize="14" fontWeight="bold">X</text>
              <text x="66" y="55" fill="#94a3b8" fontSize="14" fontWeight="bold">X</text>
            </>
          ) : (
            <>
              <circle cx="48" cy="50" r="7" fill="#fbbf24"/>
              <circle cx="48" cy="50" r="3" fill="#dc2626"/>
              <circle cx="72" cy="50" r="7" fill="#fbbf24"/>
              <circle cx="72" cy="50" r="3" fill="#dc2626"/>
            </>
          )}
          {/* Monolith Mouth Grill */}
          <rect x="44" y="70" width="32" height="10" rx="4" fill="#0f172a"/>
          <line x1="52" y1="70" x2="52" y2="80" stroke="#475569" strokeWidth="2"/>
          <line x1="60" y1="70" x2="60" y2="80" stroke="#475569" strokeWidth="2"/>
          <line x1="68" y1="70" x2="68" y2="80" stroke="#475569" strokeWidth="2"/>
        </svg>
      </div>
    );
  }

  if (bossId === 'boss-outage-hydra') {
    return (
      <div className={`relative flex items-center justify-center transition-transform duration-150 ${isHit ? 'animate-bounce scale-95' : 'animate-float'} ${className}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hydra Center Body */}
          <ellipse cx="60" cy="85" rx="35" ry="24" fill={defeated ? "#64748b" : isHit ? "#ef4444" : "#1e1b4b"} stroke="#312e81" strokeWidth="4"/>
          {/* Three Neck Stalks */}
          <path d="M45 80 Q 30 50 25 35" stroke={defeated ? "#64748b" : "#4338ca"} strokeWidth="8" strokeLinecap="round"/>
          <path d="M60 75 Q 60 45 60 25" stroke={defeated ? "#64748b" : "#4338ca"} strokeWidth="8" strokeLinecap="round"/>
          <path d="M75 80 Q 90 50 95 35" stroke={defeated ? "#64748b" : "#4338ca"} strokeWidth="8" strokeLinecap="round"/>
          {/* Left Head */}
          <circle cx="25" cy="30" r="14" fill={defeated ? "#475569" : "#6366f1"} stroke="#312e81" strokeWidth="3"/>
          <circle cx="22" cy="28" r="3" fill={defeated ? "#94a3b8" : "#ef4444"}/>
          {/* Middle Head (Alpha) */}
          <circle cx="60" cy="20" r="16" fill={defeated ? "#475569" : "#4f46e5"} stroke="#312e81" strokeWidth="3"/>
          <circle cx="56" cy="18" r="4" fill={defeated ? "#94a3b8" : "#fbbf24"}/>
          <circle cx="64" cy="18" r="4" fill={defeated ? "#94a3b8" : "#fbbf24"}/>
          {/* Right Head */}
          <circle cx="95" cy="30" r="14" fill={defeated ? "#475569" : "#6366f1"} stroke="#312e81" strokeWidth="3"/>
          <circle cx="98" cy="28" r="3" fill={defeated ? "#94a3b8" : "#ef4444"}/>
          {/* Danger Beacon */}
          <polygon points="60,2 64,8 56,8" fill="#ef4444" className="animate-pulse"/>
        </svg>
      </div>
    );
  }

  // Default: The Latency Demon (P99 Spike)
  return (
    <div className={`relative flex items-center justify-center transition-transform duration-150 ${isHit ? 'animate-bounce scale-95' : 'animate-float'} ${className}`}>
      {/* Background Ambient Flame Glow */}
      <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-300 ${
        defeated 
          ? 'bg-slate-500/20 opacity-30' 
          : isHit 
          ? 'bg-red-500/60 opacity-90' 
          : 'bg-purple-600/40 opacity-70 animate-pulse'
      }`} />

      <svg viewBox="0 0 120 120" className="w-full h-full relative z-10 drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="demonBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={defeated ? "#64748b" : isHit ? "#ef4444" : "#7c3aed"}/>
            <stop offset="100%" stopColor={defeated ? "#334155" : isHit ? "#b91c1c" : "#4c1d95"}/>
          </linearGradient>
          <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b"/>
            <stop offset="100%" stopColor="#d97706"/>
          </linearGradient>
        </defs>

        {/* Demon Horns */}
        <path d="M38 35 C 28 15, 12 18, 14 6 C 28 8, 38 22, 44 32 Z" fill="url(#hornGrad)" stroke="#78350f" strokeWidth="2"/>
        <path d="M82 35 C 92 15, 108 18, 106 6 C 92 8, 82 22, 76 32 Z" fill="url(#hornGrad)" stroke="#78350f" strokeWidth="2"/>

        {/* Demon Cloud / Ghost Body */}
        <path 
          d="M60 20 C 35 20, 24 40, 24 60 C 24 85, 36 105, 30 115 C 42 110, 48 114, 60 110 C 72 114, 78 110, 90 115 C 84 105, 96 85, 96 60 C 96 40, 85 20, 60 20 Z" 
          fill="url(#demonBody)" 
          stroke={defeated ? "#475569" : "#5b21b6"} 
          strokeWidth="3.5"
        />

        {/* Circuit Latency Tracepoints */}
        <path d="M36 50 H 46 V 65 H 56" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2"/>
        <path d="M84 50 H 74 V 65 H 64" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2"/>

        {/* Glowing Eyes */}
        {defeated ? (
          <>
            <text x="38" y="52" fill="#94a3b8" fontSize="16" fontWeight="900">×</text>
            <text x="68" y="52" fill="#94a3b8" fontSize="16" fontWeight="900">×</text>
            <path d="M48 78 Q 60 70 72 78" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
          </>
        ) : (
          <>
            <polygon points="36,46 50,42 46,52" fill="#facc15" stroke="#b45309" strokeWidth="1.5"/>
            <polygon points="84,46 70,42 74,52" fill="#facc15" stroke="#b45309" strokeWidth="1.5"/>
            <circle cx="43" cy="47" r="2.5" fill="#dc2626"/>
            <circle cx="77" cy="47" r="2.5" fill="#dc2626"/>

            {/* Jagged Fanged Mouth */}
            <path d="M42 70 Q 60 88 78 70" fill="#2e1065" stroke="#581c87" strokeWidth="2.5"/>
            <polygon points="46,71 50,78 54,71" fill="#ffffff"/>
            <polygon points="56,72 60,80 64,72" fill="#ffffff"/>
            <polygon points="66,71 70,78 74,71" fill="#ffffff"/>
          </>
        )}
      </svg>
    </div>
  );
};
