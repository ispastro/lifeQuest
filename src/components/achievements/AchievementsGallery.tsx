import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Achievement, AchievementRarity } from '../../types';
import { 
  Award, 
  Flame, 
  Terminal, 
  Zap, 
  Crown, 
  Clock, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { PipMascot } from '../mascot/PipMascot';
import { sounds } from '../../utils/soundEffects';

export const AchievementsGallery: React.FC = () => {
  const { achievements } = useGame();
  const [filterRarity, setFilterRarity] = useState<string>('All');

  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];

  const filteredAchievements = filterRarity === 'All'
    ? achievements
    : achievements.filter(a => a.rarity === filterRarity);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getRarityBadge = (rarity: AchievementRarity) => {
    switch (rarity) {
      case 'Legendary':
        return { bg: 'bg-amber-100 text-amber-800 border-amber-300', ring: 'ring-amber-300' };
      case 'Epic':
        return { bg: 'bg-purple-100 text-purple-800 border-purple-300', ring: 'ring-purple-300' };
      case 'Rare':
        return { bg: 'bg-sky-100 text-sky-800 border-sky-300', ring: 'ring-sky-300' };
      case 'Common':
      default:
        return { bg: 'bg-slate-100 text-slate-800 border-slate-300', ring: 'ring-slate-300' };
    }
  };

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'Flame': return Flame;
      case 'Terminal': return Terminal;
      case 'Crown': return Crown;
      case 'Clock': return Clock;
      case 'DollarSign': return DollarSign;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      
      {/* Banner */}
      <section className="game-panel p-5 sm:p-7 relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-700 to-amber-900 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Award className="w-3.5 h-3.5" />
              Hall of Legendary Deeds
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Trophies & Milestone Badges
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              Permanent recognition for genuine breakthroughs in engineering, consistency, and product creation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PipMascot mood="weekly_achievement" size="md" speechBubble="A gallery of true triumph!" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/20">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {rarities.map((r) => (
              <button
                key={r}
                onClick={() => { sounds.playClick(); setFilterRarity(r); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filterRarity === r
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'bg-black/20 hover:bg-black/30 text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <span className="text-xs font-extrabold text-amber-200">
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>
      </section>

      {/* BADGES SHOWCASE GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAchievements.map((ach) => {
          const Icon = getAchievementIcon(ach.icon);
          const rarity = getRarityBadge(ach.rarity);
          const progressPercent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

          return (
            <div
              key={ach.id}
              className={`game-panel p-5 flex flex-col justify-between transition-all ${
                ach.unlocked
                  ? 'border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50/30 shadow-md'
                  : 'border-slate-200 bg-slate-50/50 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold border ${
                    ach.unlocked 
                      ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-sm' 
                      : 'bg-slate-200 text-slate-400 border-slate-300'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${rarity.bg}`}>
                    {ach.rarity}
                  </span>
                </div>

                <div>
                  <h3 className={`text-base font-black tracking-tight ${ach.unlocked ? 'text-slate-900' : 'text-slate-600'}`}>
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {/* Progress bar if not completed */}
                {!ach.unlocked && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>Progress</span>
                      <span>{ach.progress} / {ach.maxProgress}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-400 rounded-full" 
                        style={{ width: `${progressPercent}%` }} 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom reward tags */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                    <Zap className="w-3 h-3 fill-current" />
                    +{ach.rewardXp} XP
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Sparkles className="w-3 h-3 fill-current" />
                    +{ach.rewardGems} 💎
                  </span>
                </div>

                {ach.unlocked ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Conquered
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
};
