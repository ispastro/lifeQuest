import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Zap, Sparkles, X } from 'lucide-react';
import { PipMascot } from '../mascot/PipMascot';

export const CelebrationModal: React.FC = () => {
  const { celebration, clearCelebration } = useGame();

  // Auto-dismiss after 4.5 seconds
  useEffect(() => {
    if (!celebration) return;
    const timer = setTimeout(() => {
      clearCelebration();
    }, 4500);
    return () => clearTimeout(timer);
  }, [celebration, clearCelebration]);

  if (!celebration) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 sm:right-8 z-50 max-w-sm sm:max-w-md w-full animate-bounce-subtle pointer-events-auto">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-4 sm:p-5 shadow-2xl border-2 border-brand-400">
        
        {/* Background glow burst */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-brand-500/30 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          {/* Mascot in celebratory or level-up state */}
          <div className="flex-shrink-0">
            <PipMascot 
              mood={celebration.type === 'boss' ? 'weekly_achievement' : celebration.type === 'level' ? 'level_up' : 'celebrating'} 
              size="sm" 
            />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-400 block">
              {celebration.type === 'boss' 
                ? '⚔️ EPIC RAID VICTORY!' 
                : celebration.type === 'level' 
                ? '⭐ LEVEL UP!' 
                : '✨ VICTORY UNLOCKED'}
            </span>
            <h4 className="text-base sm:text-lg font-black text-white truncate">
              {celebration.title}
            </h4>
            {celebration.subtitle && (
              <p className="text-xs text-slate-300 truncate mt-0.5">
                {celebration.subtitle}
              </p>
            )}

            {/* Earned stats */}
            <div className="flex items-center gap-2 mt-2">
              {celebration.xp !== undefined && celebration.xp > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  <Zap className="w-3 h-3 fill-current" />
                  +{celebration.xp} XP
                </span>
              )}
              {celebration.gems !== undefined && celebration.gems !== 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                  <Sparkles className="w-3 h-3 fill-current" />
                  {celebration.gems > 0 ? `+${celebration.gems}` : celebration.gems} Gems
                </span>
              )}
            </div>
          </div>

          {/* Dismiss button */}
          <button
            onClick={clearCelebration}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors self-start"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
