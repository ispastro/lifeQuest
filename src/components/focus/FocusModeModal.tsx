import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const FocusModeModal: React.FC = () => {
  const { focusQuest, isFocusModeOpen, closeFocusMode, completeQuest, logFocusTime } = useGame();
  
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
      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-between min-h-[500px] sm:min-h-[560px] p-4 sm:p-8 space-y-4 sm:space-y-6 my-auto">
        
        {/* Top Minimal Bar */}
        <div className="w-full flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
              Deep Work Focus Chamber
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

        {/* Active Quest Context */}
        <div className="text-center space-y-1.5 max-w-md flex-shrink-0 px-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
            {focusQuest.difficulty} Mission • +{focusQuest.xpReward} XP
          </span>
          <h2 className="text-base sm:text-xl font-black text-white tracking-tight leading-snug">
            {focusQuest.title}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium line-clamp-1 sm:line-clamp-2">
            {focusQuest.objective}
          </p>
        </div>

        {/* Circular Progress & Big Digital Timer */}
        <div className="relative flex items-center justify-center my-2 sm:my-4 flex-shrink-0">
          <svg className="w-56 h-56 sm:w-72 sm:h-72 transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-slate-800"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-brand-500 transition-all duration-1000 ease-linear"
              strokeWidth="7"
              strokeDasharray={2 * Math.PI * 105}
              strokeDashoffset={2 * Math.PI * 105 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-6xl font-black tracking-tight text-white tabular-nums font-mono">
              {timeFormatted}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all touch-manipulation ${
                totalSeconds === mins * 60 
                  ? 'bg-brand-500 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-3 sm:gap-4 w-full max-w-sm justify-center flex-shrink-0 pt-2">
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
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-brand-500 hover:bg-brand-400 text-white'
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
                <span>Begin Focus</span>
              </>
            )}
          </button>

          <button
            onClick={handleFinishAndComplete}
            className="p-3 sm:py-3.5 sm:px-4 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-emerald-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[48px] min-w-[48px]"
            title="Complete Mission Early"
          >
            <CheckCircle2 className="w-5 h-5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="hidden sm:inline">Finish</span>
          </button>
        </div>

      </div>
    </div>
  );
};
