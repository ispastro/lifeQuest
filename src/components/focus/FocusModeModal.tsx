import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { BossAvatarSvg } from '../boss/BossAvatarSvg';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  X,
  Sword,
  Zap,
  ShieldAlert,
  Check,
  Sparkles,
  Flame
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const FocusModeModal: React.FC = () => {
  const { 
    focusQuest, 
    isFocusModeOpen, 
    closeFocusMode, 
    completeQuest, 
    logFocusTime,
    currentBoss,
    bossDamageFloater,
    toggleQuestSubstep
  } = useGame();
  
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Sync initial duration from quest estimated duration if available
  useEffect(() => {
    if (focusQuest?.estimatedDuration) {
      const secs = focusQuest.estimatedDuration * 60;
      setTotalSeconds(secs);
      setSecondsRemaining(secs);
      setIsActive(false);
    }
  }, [focusQuest]);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isActive && secondsRemaining === 0) {
      setIsActive(false);
      sounds.playFocusBell();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsRemaining]);

  if (!isFocusModeOpen || !focusQuest) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const progressPercent = totalSeconds > 0 
    ? Math.round(((totalSeconds - secondsRemaining) / totalSeconds) * 100) 
    : 0;

  const hpPercent = Math.max(0, Math.min(100, Math.round((currentBoss.currentHp / currentBoss.maxHp) * 100)));
  const isLowHp = hpPercent < 30;

  // Small steps / criteria to defeat boss
  const substeps = focusQuest.substeps || focusQuest.acceptanceCriteria.map((c, i) => ({
    id: `sub-${i}`,
    text: c,
    completed: false,
  }));
  const completedSteps = substeps.filter(s => s.completed).length;

  const handleToggleTimer = () => {
    sounds.playClick();
    setIsActive(!isActive);
  };

  const handleResetTimer = () => {
    sounds.playClick();
    setIsActive(false);
    setSecondsRemaining(totalSeconds);
  };

  const setPresetDuration = (mins: number) => {
    sounds.playClick();
    setIsActive(false);
    const secs = mins * 60;
    setTotalSeconds(secs);
    setSecondsRemaining(secs);
  };

  const handleFinishAndComplete = () => {
    const elapsedSeconds = totalSeconds - secondsRemaining;
    logFocusTime(focusQuest.id, elapsedSeconds > 0 ? elapsedSeconds : totalSeconds);
    completeQuest(focusQuest.id);
    closeFocusMode();
  };

  const handleClose = () => {
    const elapsedSeconds = totalSeconds - secondsRemaining;
    if (elapsedSeconds > 60) {
      logFocusTime(focusQuest.id, elapsedSeconds);
    }
    closeFocusMode();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/98 backdrop-blur-xl animate-fade-in text-white select-none h-[100dvh] max-h-[100dvh] overflow-y-auto pt-safe pb-safe">
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-between min-h-[540px] sm:min-h-[600px] p-4 sm:p-6 space-y-4 my-auto">
        
        {/* Top Minimal Bar */}
        <div className="w-full flex items-center justify-between flex-shrink-0 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
              <Sword className="w-3.5 h-3.5" />
              <span>Cadence Boss Battle Chamber</span>
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all touch-manipulation"
            title="Exit Focus Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BOSS RAID HEALTH GAUGE & AVATAR */}
        <div className="w-full bg-purple-950/40 p-3.5 sm:p-4 rounded-3xl border-2 border-purple-500/30 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden flex-shrink-0 shadow-lg">
          <div className="cursor-pointer flex-shrink-0 relative">
            <BossAvatarSvg 
              bossId={currentBoss.id} 
              isHit={!!bossDamageFloater} 
              defeated={currentBoss.defeated}
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg" 
            />
            {bossDamageFloater && (
              <div className="absolute -top-3 -right-3 z-30 pointer-events-none animate-bounce">
                <div className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-xl font-black text-xs border border-white shadow-lg">
                  -{bossDamageFloater.amount} HP!
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 w-full space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="text-xs font-black text-purple-200">
                  {focusQuest.isDailyBoss ? "👑 Today's Apex Boss:" : "Weekly Raid Boss:"}
                </span>
                <span className="text-xs font-extrabold text-white truncate max-w-[200px]">
                  {currentBoss.name}
                </span>
              </div>
              <span className="text-xs font-mono font-black tabular-nums">
                <strong className={isLowHp ? "text-red-400 animate-pulse" : "text-amber-300"}>
                  {currentBoss.currentHp}
                </strong> / {currentBoss.maxHp} HP
              </span>
            </div>

            {/* Boss Health Bar */}
            <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-purple-500/40">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  currentBoss.defeated
                    ? 'bg-slate-700'
                    : isLowHp 
                    ? 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400'
                }`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>

            <p className="text-[10px] text-purple-200/80 font-medium">
              ⚡ Finish small steps below to strike the boss • Defeat the boss to win today's bounty!
            </p>
          </div>
        </div>

        {/* Active Quest Context Title */}
        <div className="text-center space-y-1 max-w-lg flex-shrink-0 px-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
            {focusQuest.difficulty} Quest • +{focusQuest.xpReward} XP • +{focusQuest.gemReward} Coins 💎
          </span>
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
            {focusQuest.title}
          </h2>
        </div>

        {/* Circular Progress & Big Digital Timer */}
        <div className="relative flex items-center justify-center my-1 flex-shrink-0">
          <svg className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-brand-500 transition-all duration-1000 ease-linear"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 85}
              strokeDashoffset={2 * Math.PI * 85 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white tabular-nums font-mono">
              {timeFormatted}
            </span>
            <span className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
              {isActive ? 'In Deep Flow' : secondsRemaining === 0 ? 'Sprint Concluded' : 'Paused'}
            </span>
            <span className="text-[10px] text-brand-400 font-black mt-0.5">
              {progressPercent}% Complete
            </span>
          </div>
        </div>

        {/* Duration Preset Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 flex-shrink-0">
          {[25, 45, 60, 90].map((mins) => (
            <button
              key={mins}
              onClick={() => setPresetDuration(mins)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all touch-manipulation ${
                totalSeconds === mins * 60 
                  ? 'bg-brand-500 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* TACTICAL STRIKES / SMALL STEPS (EACH STEP HURTS THE BOSS) */}
        {substeps.length > 0 && (
          <div className="w-full space-y-2 max-w-lg bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between text-xs font-black text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sword className="w-3.5 h-3.5" />
                <span>Tactical Strikes (Each Step Hurts the Boss)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold">
                {completedSteps}/{substeps.length} Conquered
              </span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {substeps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => toggleQuestSubstep(focusQuest.id, step.id)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 touch-manipulation ${
                    step.completed 
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 line-through opacity-80' 
                      : 'bg-white/10 border-white/15 text-white hover:bg-white/15 active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center border flex-shrink-0 ${
                      step.completed ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-500'
                    }`}>
                      {step.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-left truncate">{step.text}</span>
                  </div>

                  <span className={`text-[9px] sm:text-[10px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5 flex-shrink-0 ${
                    step.completed ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-200 border border-red-500/40'
                  }`}>
                    <Zap className="w-2.5 h-2.5" />
                    {step.completed ? 'STRIKE HIT' : '-250 DMG'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-3 sm:gap-4 w-full max-w-sm justify-center flex-shrink-0 pt-1">
          <button
            onClick={handleResetTimer}
            className="p-3 sm:p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleToggleTimer}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 touch-manipulation min-h-[48px] ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-tactile-orange'
                : 'bg-brand-500 hover:bg-brand-400 text-white shadow-tactile-green'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current ml-0.5" />
                <span>Begin Flow & Fight</span>
              </>
            )}
          </button>

          <button
            onClick={handleFinishAndComplete}
            className="p-3 sm:py-3.5 sm:px-4 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-emerald-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[48px] min-w-[48px]"
            title="Slay Boss & Complete Quest"
          >
            <CheckCircle2 className="w-5 h-5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="hidden sm:inline">Win</span>
          </button>
        </div>

      </div>
    </div>
  );
};
