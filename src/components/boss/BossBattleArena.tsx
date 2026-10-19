import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { BossAvatarSvg } from './BossAvatarSvg';
import { PipMascot } from '../mascot/PipMascot';
import { 
  Sword, 
  ShieldAlert, 
  Zap, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Flame, 
  Crosshair,
  Award,
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { alternateBosses } from '../../data/initialData';
import { sounds } from '../../utils/soundEffects';

export const BossBattleArena: React.FC = () => {
  const { 
    currentBoss, 
    bossDamageFloater, 
    damageBoss, 
    switchBoss, 
    resetBoss, 
    quests, 
    completeQuest, 
    startFocusMode,
    setActiveTab,
    profile 
  } = useGame();

  const [selectedBossId, setSelectedBossId] = useState(currentBoss.id);

  const hpPercent = Math.max(0, Math.min(100, Math.round((currentBoss.currentHp / currentBoss.maxHp) * 100)));
  const isLowHp = hpPercent < 30;

  // Today's quests
  const todayQuests = quests.filter(q => q.scheduledDate === '2026-10-19');
  const pendingQuests = todayQuests.filter(q => !q.completed);
  const completedTodayCount = todayQuests.filter(q => q.completed).length;

  const handleManualStrike = (questId: string, diff: string) => {
    sounds.playQuestComplete();
    completeQuest(questId, 'Conquered during Weekly Raid Battle!');
  };

  const handleSwitch = (id: string) => {
    setSelectedBossId(id);
    switchBoss(id);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* ARENA STAGE CARD: Epic Nintendo / RPG Battle Stage */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-purple-800/80 bg-gradient-to-b from-slate-950 via-purple-950/70 to-slate-950 text-white p-5 sm:p-8 shadow-2xl">
        
        {/* Ambient energy aura */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Damage Popup */}
        {bossDamageFloater && (
          <div className="absolute top-16 right-1/4 z-30 pointer-events-none animate-bounce">
            <div className={`px-4 py-2 rounded-2xl font-black text-base sm:text-xl shadow-2xl flex items-center gap-1.5 border-2 ${
              bossDamageFloater.isCrit 
                ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-300/80 scale-125' 
                : 'bg-red-600 text-white border-red-300'
            }`}>
              <Zap className="w-5 h-5 fill-current animate-pulse" />
              <span>-{bossDamageFloater.amount} HP</span>
              {bossDamageFloater.isCrit && <span className="text-xs uppercase font-black">CRIT!</span>}
            </div>
          </div>
        )}

        {/* Top Arena Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
              <Sword className="w-4 h-4 text-purple-400" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-purple-300">
              Weekly Epic Raid Arena
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">
              Weakness: <strong className="text-yellow-300">{currentBoss.weakness}</strong>
            </span>
          </div>
        </div>

        {/* Battle Stage Center Field */}
        <div className="py-6 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Fighter: Pip & Player Tactical Stance */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <PipMascot 
                mood={currentBoss.defeated ? "celebrating" : isLowHp ? "encouraging" : "welcoming"} 
                size="md" 
                speechBubble={currentBoss.defeated ? "Boss banished! Magnificent raid!" : "Strike with your daily triad quests!"}
              />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-400 block">
                  Battle Vanguard
                </span>
                <h4 className="text-lg font-black text-white">{profile.name}</h4>
                <p className="text-xs text-slate-400 font-semibold">Level {profile.level} • {profile.title}</p>
              </div>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-sm space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-yellow-300">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Raid Multiplier Active</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                {profile.streakDays}-day streak confers a <strong className="text-white">+20% XP bonus</strong> on final boss vanquish!
              </p>
            </div>
          </div>

          {/* Center VS Clash Emblem */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center font-black text-lg text-white shadow-lg border border-white/20 animate-pulse">
              VS
            </div>
          </div>

          {/* Right Fighter: The Weekly Boss */}
          <div className="flex flex-col items-center text-center space-y-3 flex-1">
            <BossAvatarSvg 
              bossId={currentBoss.id} 
              isHit={!!bossDamageFloater} 
              defeated={currentBoss.defeated}
              className="w-36 h-36 sm:w-48 sm:h-48"
            />
            
            <div className="space-y-1 max-w-sm">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentBoss.name}
              </h3>
              <p className="text-xs text-purple-200 font-medium">
                {currentBoss.title}
              </p>
            </div>

            <div className="bg-purple-900/40 border border-purple-400/30 px-3.5 py-1.5 rounded-2xl text-xs text-purple-200 italic max-w-xs">
              "{currentBoss.defeated ? currentBoss.dialogue.defeat : bossDamageFloater ? currentBoss.dialogue.hit : currentBoss.dialogue.taunt}"
            </div>
          </div>

        </div>

        {/* Bottom Boss Health Gauge Bar */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-purple-300 font-black">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Boss Integrity</span>
            </span>
            <span className="tabular-nums font-black text-sm tracking-wide">
              <strong className={isLowHp ? "text-red-400 animate-pulse" : "text-white"}>
                {currentBoss.currentHp}
              </strong> / {currentBoss.maxHp} HP ({hpPercent}%)
            </span>
          </div>

          <div className="h-5 w-full bg-slate-900/90 rounded-full overflow-hidden p-0.5 border-2 border-purple-500/50 shadow-inner">
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

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 pt-1">
            <span>Defeat Reward: <strong className="text-yellow-300">+{currentBoss.rewardXp} XP</strong> & <strong className="text-emerald-300">+{currentBoss.rewardGems} Gems</strong></span>
            {currentBoss.defeated && (
              <button
                onClick={resetBoss}
                className="btn-tactile-secondary py-1 px-3 text-xs font-bold gap-1 text-slate-900 bg-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Respawn Boss</span>
              </button>
            )}
          </div>
        </div>

      </section>

      {/* TACTICAL STRIKE ARSENAL: Conquering Quests Deals Boss Damage */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-red-600" />
              <span>Strike Arsenal: Today's Battle Missions</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Conquer these missions today to inflict heavy damage on {currentBoss.name}.
            </p>
          </div>

          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            {completedTodayCount}/{todayQuests.length} Quests Struck
          </span>
        </div>

        <div className="space-y-3">
          {todayQuests.map((q) => {
            const isEpic = q.difficulty === 'Epic' || q.difficulty === 'Legendary';
            const damageValue = isEpic ? 350 : q.difficulty === 'Hard' ? 240 : q.difficulty === 'Medium' ? 160 : 90;

            return (
              <div 
                key={q.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  q.completed 
                    ? 'bg-slate-50 border-slate-200 opacity-80' 
                    : isEpic 
                    ? 'bg-purple-50/60 border-purple-300 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isEpic ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {q.estimatedDuration}m
                    </span>
                    {q.isRecommended && (
                      <span className="text-[10px] font-black uppercase text-brand-700 bg-brand-100 px-2 py-0.5 rounded-full">
                        Apex Attack
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm font-black tracking-tight ${q.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {q.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                  <div className="text-right mr-1">
                    <span className={`text-xs font-black block tabular-nums ${isEpic ? 'text-purple-700' : 'text-red-600'}`}>
                      {q.completed ? 'Struck!' : `+${damageValue} DMG`}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {isEpic ? '⚡ Critical Strike' : 'Standard Strike'}
                    </span>
                  </div>

                  {!q.completed ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => startFocusMode(q)}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 touch-manipulation"
                        title="Enter Focus Mode"
                      >
                        Focus
                      </button>
                      <button
                        onClick={() => handleManualStrike(q.id, q.difficulty)}
                        className="btn-tactile-primary py-2 px-3.5 text-xs font-bold gap-1.5 touch-manipulation"
                      >
                        <Sword className="w-3.5 h-3.5" />
                        <span>Strike</span>
                      </button>
                    </div>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-black text-brand-600 px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Conquered</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOSS ATTACKS & ENGINEERING MECHANICS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Boss Signatures */}
        <div className="game-panel p-5 space-y-3 border-2 border-slate-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h4 className="font-black text-sm text-slate-900">Boss Signature Attacks</h4>
          </div>

          <div className="space-y-2.5">
            {currentBoss.attacks.map((att) => (
              <div key={att.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">{att.name}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.2 rounded-full ${
                    att.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {att.severity} threat
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{att.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Counter-Measures & Habit Buffs */}
        <div className="game-panel p-5 space-y-3 border-2 border-slate-200 bg-gradient-to-br from-emerald-50/50 to-teal-50/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <h4 className="font-black text-sm text-slate-900">Engineer Counter-Measures</h4>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 font-medium">
            <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
              <span className="font-black text-brand-800 text-[11px] uppercase block">
                ⚡ Focus Session Cannon
              </span>
              <p className="text-slate-600">
                Completing a 25-minute Pomodoro deep work block deals <strong className="text-slate-900">+75 damage</strong> directly to the boss.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
              <span className="font-black text-brand-800 text-[11px] uppercase block">
                🛡️ Weekly Completion Raid Pact
              </span>
              <p className="text-slate-600">
                Slay the boss before Sunday midnight to unlock the <strong className="text-purple-700">Raid Vanquisher Trophy</strong> in your Achievements Gallery.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ALTERNATE RAID BOSS SWITCHER */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h4 className="text-base font-black text-slate-900">Select Raid Encounter</h4>
            <p className="text-xs text-slate-500 font-medium">Switch battle theater or face a different engineering nemesis.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {alternateBosses.map((boss) => {
            const isSelected = boss.id === currentBoss.id;
            return (
              <div
                key={boss.id}
                onClick={() => handleSwitch(boss.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isSelected 
                    ? 'border-purple-600 bg-purple-50/70 shadow-md ring-2 ring-purple-200' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      {boss.category}
                    </span>
                    {boss.defeated && (
                      <span className="text-[10px] font-black text-emerald-600">✓ Slain</span>
                    )}
                  </div>
                  <h5 className="font-black text-sm text-slate-900 mt-2">{boss.name}</h5>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-0.5">{boss.description}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-100">
                  <span className="text-slate-500">{boss.maxHp} HP</span>
                  <span className="text-purple-700">+{boss.rewardXp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
