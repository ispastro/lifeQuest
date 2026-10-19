import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PipMascot } from '../mascot/PipMascot';
import { QuestCard } from '../quests/QuestCard';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Zap, 
  Compass, 
  Coffee,
  BarChart3,
  Check,
  Star,
  Flag,
  Rocket
} from 'lucide-react';
import { DayStage } from '../../types';
import { sounds } from '../../utils/soundEffects';

export const WeeklyJourney: React.FC = () => {
  const { dayStages, quests, setActiveTab } = useGame();
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-19'); // Monday by default
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);

  const selectedDay = dayStages.find(d => d.date === selectedDate) || dayStages[0];
  const dayQuests = quests.filter(q => q.scheduledDate === selectedDate);

  // Overall Weekly Metrics
  const totalWeekQuests = quests.length;
  const completedWeekQuests = quests.filter(q => q.completed).length;
  const totalPlannedHours = dayStages.reduce((acc, d) => acc + d.targetHours, 0);
  const totalLoggedFocusMinutes = dayStages.reduce((acc, d) => acc + d.focusMinutes, 0);
  const totalLoggedFocusHours = (totalLoggedFocusMinutes / 60).toFixed(1);

  const handlePrevWeek = () => {
    sounds.playClick();
    setCurrentWeekOffset(prev => prev - 1);
  };

  const handleNextWeek = () => {
    sounds.playClick();
    setCurrentWeekOffset(prev => prev + 1);
  };

  const handleCurrentWeek = () => {
    sounds.playClick();
    setCurrentWeekOffset(0);
    setSelectedDate('2026-10-19');
  };

  const getDayTypeMeta = (type: DayStage['dayType']) => {
    switch (type) {
      case 'deep_project':
        return { label: 'Deep Project', bg: 'bg-purple-100 text-purple-800 border-purple-200', icon: Rocket };
      case 'full_work':
        return { label: 'Full Workday', bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: Zap };
      case 'personal_dev':
        return { label: 'Personal Dev', bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: Star };
      case 'rest':
        return { label: 'Rest & Strategy', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Coffee };
      case 'light':
      default:
        return { label: 'Light Day', bg: 'bg-slate-100 text-slate-800 border-slate-200', icon: Flag };
    }
  };

  return (
    <div className="space-y-5 sm:space-y-8 pb-16">

      {/* WEEKLY HEADER & EXPEDITION BANNER */}
      <section className="game-panel p-4 sm:p-7 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-emerald-50/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-brand-100 text-brand-700">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-700">
                7-Day Adventure Expedition
              </span>
            </div>
            
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {currentWeekOffset === 0 
                ? 'Week 42: The Distributed Resilience Expedition' 
                : currentWeekOffset > 0 
                ? `Week ${42 + currentWeekOffset}: Future Campaign Horizon` 
                : `Week ${42 + currentWeekOffset}: Archived Expedition`}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              {currentWeekOffset === 0 
                ? 'October 19 – October 25, 2026 • Mon through Sun' 
                : 'Expedition schedule adjusted'}
            </p>
          </div>

          {/* Week Navigation Controls */}
          <div className="flex items-center gap-1.5 self-start md:self-auto">
            <button
              onClick={handlePrevWeek}
              className="p-2 sm:p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all shadow-sm touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Previous Week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleCurrentWeek}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-extrabold transition-all shadow-sm touch-manipulation min-h-[44px] ${
                currentWeekOffset === 0 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Current Week
            </button>

            <button
              onClick={handleNextWeek}
              className="p-2 sm:p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all shadow-sm touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Next Week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weekly Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-200/80">
          <div className="bg-white/90 p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              Quests Completed
            </span>
            <span className="text-base sm:text-xl font-black text-slate-900 tabular-nums">
              {completedWeekQuests} <span className="text-xs text-slate-400 font-bold">/ {totalWeekQuests}</span>
            </span>
          </div>

          <div className="bg-white/90 p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              Focus Hours Logged
            </span>
            <span className="text-base sm:text-xl font-black text-brand-700 tabular-nums">
              {totalLoggedFocusHours}h <span className="text-xs text-slate-400 font-bold">/ {totalPlannedHours}h</span>
            </span>
          </div>

          <div className="bg-white/90 p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              Workload Health
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-600 flex items-center gap-1 mt-0.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Optimal Pacing
            </span>
          </div>

          <div className="bg-white/90 p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              Adventure Flow
            </span>
            <button
              onClick={() => setActiveTab('planning')}
              className="text-xs font-black text-brand-600 hover:text-brand-800 flex items-center gap-1 mt-0.5 group touch-manipulation"
            >
              <span>Planning Studio</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE ADVENTURE QUICK-STEPPER STRIP (Thumb-Friendly Tab Bar) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-600" />
            <span>Select Day Stage ({selectedDay.dayName})</span>
          </h2>
          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
            Sat & Sun First-Class
          </span>
        </div>

        {/* 7-Day Stepper Strip (Always fits without horizontal page scroll) */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 select-none">
          {dayStages.map((day) => {
            const isSelected = day.date === selectedDate;
            const isToday = day.isCurrentDay;
            const isCompleted = day.isCompleted;
            const assigned = quests.filter(q => q.scheduledDate === day.date);
            const doneCount = assigned.filter(q => q.completed).length;

            return (
              <button
                key={day.date}
                onClick={() => {
                  sounds.playClick();
                  setSelectedDate(day.date);
                }}
                className={`flex flex-col items-center justify-between p-1.5 sm:p-3 rounded-2xl transition-all duration-150 touch-manipulation cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-tactile-green ring-2 ring-brand-300 -translate-y-1'
                    : isToday
                    ? 'bg-brand-50 border-2 border-brand-400 text-brand-900 shadow-sm'
                    : isCompleted
                    ? 'bg-slate-100 border border-slate-200 text-slate-700'
                    : 'bg-white border border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {/* Active indicator */}
                <span className={`text-[9px] sm:text-xs font-extrabold ${isSelected ? 'text-emerald-100' : isToday ? 'text-brand-600' : 'text-slate-400'}`}>
                  {day.dayOfWeek}
                </span>

                <span className={`text-xs sm:text-lg font-black my-0.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {day.date.split('-')[2]}
                </span>

                {/* Status symbol */}
                <div className="mt-0.5">
                  {isSelected ? (
                    <span className="w-4 h-4 rounded-full bg-white text-brand-700 flex items-center justify-center text-[9px] font-black">
                      ●
                    </span>
                  ) : isToday ? (
                    <span className="w-4 h-4 rounded-full bg-brand-500 text-white flex items-center justify-center text-[9px] font-black animate-pulse">
                      ⚡
                    </span>
                  ) : doneCount === assigned.length && assigned.length > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-black">
                      ✓
                    </span>
                  ) : day.dayType === 'rest' ? (
                    <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[9px] font-black">
                      🌿
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                  )}
                </div>

                <span className={`text-[8px] sm:text-[10px] font-bold mt-1 hidden xs:block truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {doneCount}/{assigned.length}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* DETAILED INSPECTION DRAWER FOR THE SELECTED DAY */}
      <section className="game-panel p-4 sm:p-7 space-y-5 border-2 border-slate-200 shadow-md">
        
        {/* Day Inspector Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-xl bg-slate-900 text-white">
                {selectedDay.dayName} Stage
              </span>
              <span className="text-xs font-bold text-slate-500">
                {selectedDay.date}
              </span>
              {selectedDay.isCurrentDay && (
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current text-brand-600" />
                  Active Today
                </span>
              )}
              {selectedDay.dayOfWeek === 'Sat' && (
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                  <Rocket className="w-3 h-3 text-purple-600" />
                  Deep Hack Stage
                </span>
              )}
              {selectedDay.dayOfWeek === 'Sun' && (
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Coffee className="w-3 h-3 text-emerald-600" />
                  Recharge Stage
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              {selectedDay.theme}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {selectedDay.statusText} • Planned Workload: {selectedDay.targetHours} hours
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('planning')}
              className="btn-tactile-secondary py-2.5 px-3.5 text-xs font-bold gap-1.5 touch-manipulation w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>Modify Day Plan</span>
            </button>
          </div>
        </div>

        {/* Day Workload Analysis Meter */}
        <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold flex-shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                Workload Assessment: Balanced & Realistic
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {dayQuests.length} assigned mission{dayQuests.length === 1 ? '' : 's'} totaling ~{selectedDay.targetHours} hours of focused execution.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-600 self-end sm:self-auto">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Focus Sprints</span>
              <span className="text-xs sm:text-sm font-black text-slate-900">{selectedDay.focusSessionsCount} completed</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Focus Time</span>
              <span className="text-xs sm:text-sm font-black text-brand-700">{selectedDay.focusMinutes} mins</span>
            </div>
          </div>
        </div>

        {/* Quests Scheduled for this Stage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500">
              Assigned Missions for {selectedDay.dayName} ({dayQuests.length})
            </h4>
          </div>

          <div className="space-y-3">
            {dayQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}

            {dayQuests.length === 0 && (
              <div className="text-center py-8 bg-slate-50/60 rounded-3xl border-2 border-dashed border-slate-200 space-y-3 p-4">
                <PipMascot mood="empty_state" size="sm" />
                <p className="text-sm font-bold text-slate-600">
                  No quests assigned to {selectedDay.dayName} yet.
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
                  Use the Weekly Planning studio to break down campaign milestones and assign missions here!
                </p>
                <button
                  onClick={() => setActiveTab('planning')}
                  className="btn-tactile-primary py-2.5 px-4 text-xs font-bold mt-2 touch-manipulation"
                >
                  Plan Quests for {selectedDay.dayName}
                </button>
              </div>
            )}
          </div>
        </div>

      </section>

    </div>
  );
};
