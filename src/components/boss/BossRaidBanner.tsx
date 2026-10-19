import React from 'react';
import { useGame } from '../../context/GameContext';
import { BossAvatarSvg } from './BossAvatarSvg';
import { Sword, Zap, ShieldAlert, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const BossRaidBanner: React.FC = () => {
  const { currentBoss, bossDamageFloater, setActiveTab, resetBoss, quests, startFocusMode } = useGame();

  const todayBossQuest = quests.find(q => q.scheduledDate === '2026-10-19' && !q.completed && (q.isDailyBoss || q.difficulty === 'Epic' || q.difficulty === 'Hard')) 
    || quests.find(q => q.scheduledDate === '2026-10-19' && !q.completed);

  const hpPercent = Math.max(0, Math.min(100, Math.round((currentBoss.currentHp / currentBoss.maxHp) * 100)));
  const isLowHp = hpPercent < 30;

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-purple-900/60 bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-900 text-white p-5 sm:p-6 shadow-xl animate-fade-in group">
      
      {/* Ambient background particles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />

      {/* Floating Damage Text Popup */}
      {bossDamageFloater && (
        <div className="absolute top-8 right-16 sm:right-32 z-30 pointer-events-none animate-bounce">
          <div className={`px-3 py-1.5 rounded-2xl font-black text-sm sm:text-base shadow-2xl flex items-center gap-1 border-2 ${
            bossDamageFloater.isCrit 
              ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-300/60 scale-110' 
              : 'bg-red-600 text-white border-red-300'
          }`}>
            <Zap className="w-4 h-4 fill-current animate-pulse" />
            <span>-{bossDamageFloater.amount} HP</span>
            {bossDamageFloater.isCrit && <span className="text-[10px] uppercase font-black">CRIT!</span>}
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* Left Info & HP Gauge */}
        <div className="space-y-3 flex-1 text-center md:text-left w-full">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-wider border border-purple-400/30">
              <Sword className="w-3.5 h-3.5 text-purple-400" />
              <span>Weekly Raid Boss</span>
            </span>

            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
              {currentBoss.category}
            </span>

            {currentBoss.defeated && (
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SLAYED 🏆</span>
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span>{currentBoss.name}</span>
            </h3>
            <p className="text-xs text-purple-200/80 font-medium line-clamp-1 mt-0.5">
              {todayBossQuest ? `Embodying Apex Task: "${todayBossQuest.title}"` : `${currentBoss.title} • Weakness: ${currentBoss.weakness}`}
            </p>
          </div>

          {/* Boss Taunt / Speech Bubble */}
          <div className="inline-block bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10 text-xs font-semibold text-purple-100 max-w-lg italic">
            "{currentBoss.defeated ? currentBoss.dialogue.defeat : bossDamageFloater ? currentBoss.dialogue.hit : currentBoss.dialogue.intro}"
          </div>

          {/* Boss Health Bar (Tactile RPG Gauge) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-purple-300 font-black">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Boss Resilience</span>
              </span>
              <span className="tabular-nums font-black text-sm tracking-wide">
                <strong className={isLowHp ? "text-red-400 animate-pulse" : "text-purple-300"}>
                  {currentBoss.currentHp}
                </strong> / {currentBoss.maxHp} HP ({hpPercent}%)
              </span>
            </div>

            <div className="h-4 w-full bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-purple-500/40 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-500 shadow-md ${
                  currentBoss.defeated
                    ? 'bg-slate-700'
                    : isLowHp 
                    ? 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-600 via-indigo-500 to-rose-500'
                }`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-0.5">
              <span>Small steps hurt the boss • Finish all steps to win</span>
              <span>Reward: +{currentBoss.rewardXp} XP • +{currentBoss.rewardGems} Gems</span>
            </div>
          </div>

        </div>

        {/* Right Boss Avatar & Raid Chamber Action */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div 
            onClick={() => setActiveTab('boss')}
            className="cursor-pointer group-hover:scale-105 transition-transform"
            title="Inspect Weekly Boss Raid"
          >
            <BossAvatarSvg 
              bossId={currentBoss.id} 
              isHit={!!bossDamageFloater} 
              defeated={currentBoss.defeated}
              className="w-28 h-28 sm:w-36 sm:h-36" 
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {todayBossQuest && !currentBoss.defeated && (
              <button
                onClick={() => {
                  sounds.playClick();
                  startFocusMode(todayBossQuest);
                }}
                className="btn-tactile-primary py-2 px-3.5 text-xs font-black gap-1.5 touch-manipulation whitespace-nowrap bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-tactile-orange"
              >
                <Sword className="w-3.5 h-3.5" />
                <span>Fight Boss ⚔️</span>
              </button>
            )}

            <button
              onClick={() => { sounds.playClick(); setActiveTab('boss'); }}
              className="px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold text-purple-200 transition-colors"
            >
              <span>Arena</span>
            </button>

            {currentBoss.defeated && (
              <button
                onClick={resetBoss}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="Respawn Boss"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
