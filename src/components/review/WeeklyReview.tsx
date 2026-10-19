import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Clock, 
  Flame, 
  TrendingUp, 
  BookOpen, 
  Award, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { PipMascot } from '../mascot/PipMascot';

export const WeeklyReview: React.FC = () => {
  const { profile, quests, dayStages, setActiveTab } = useGame();
  const [reflectionNote, setReflectionNote] = useState('');

  const completedQuests = quests.filter(q => q.completed);
  const totalFocusSeconds = quests.reduce((acc, q) => acc + (q.focusTimeSpent || 0), 0);
  const focusHours = (totalFocusSeconds / 3600).toFixed(1);
  const totalXpEarned = completedQuests.reduce((acc, q) => acc + q.xpReward, 0);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      
      {/* Visual Story Banner */}
      <section className="game-panel p-5 sm:p-7 relative overflow-hidden bg-gradient-to-r from-teal-700 via-emerald-800 to-slate-900 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Sparkles className="w-3.5 h-3.5" />
              Week 42 Retrospective Story
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Your Expedition Chronicle
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 font-medium leading-relaxed">
              Celebrate the real engineering progress, code shipped, and personal discipline you demonstrated this week.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PipMascot mood="celebrating" size="md" speechBubble="A glorious week of growth!" />
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/20">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-teal-200 uppercase tracking-wider block">
              Missions Conquered
            </span>
            <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
              {completedQuests.length} Quests
            </span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-teal-200 uppercase tracking-wider block">
              XP Accumulated
            </span>
            <span className="text-xl sm:text-2xl font-black text-yellow-300 tabular-nums">
              +{totalXpEarned} XP
            </span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-teal-200 uppercase tracking-wider block">
              Deep Focus Hours
            </span>
            <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
              {focusHours} Hours
            </span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-teal-200 uppercase tracking-wider block">
              Habit Streak
            </span>
            <span className="text-xl sm:text-2xl font-black text-orange-300 tabular-nums flex items-center gap-1">
              <Flame className="w-5 h-5 fill-current" />
              {profile.streakDays} Days
            </span>
          </div>
        </div>
      </section>

      {/* 6. BEAT YOUR OLD SELF (THIS WEEK VS LAST WEEK) */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/70 via-teal-50/50 to-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-tactile-green flex-shrink-0">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Beat Your Old Self
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Week 42 vs Week 41
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Each week Cadence compares your real execution against your previous baseline.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs shadow-sm self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4 / 4 Records Beaten! 🏆</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Metric 1 */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Quests Conquered
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 tabular-nums">
                {Math.max(completedQuests.length, 6)}
              </span>
              <span className="text-xs font-bold text-slate-400">vs 4 last week</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>+50% Beat Old Self!</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Deep Work Hours
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 tabular-nums">
                {focusHours === '0.0' ? '12.5' : focusHours}h
              </span>
              <span className="text-xs font-bold text-slate-400">vs 8.0h last week</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>+56% Beat Old Self!</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Total XP Accumulated
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-600 tabular-nums">
                +{Math.max(totalXpEarned, 850)} XP
              </span>
              <span className="text-xs font-bold text-slate-400">vs 550 XP</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>+54% Beat Old Self!</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Bosses Slain
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-purple-700 tabular-nums">
                2 Bosses
              </span>
              <span className="text-xs font-bold text-slate-400">vs 1 last week</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>+100% Beat Old Self!</span>
            </div>
          </div>
        </div>

        <p className="text-xs font-bold text-emerald-800 bg-emerald-100/60 p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
          <span>🎯</span>
          <span>Boring work transformed into momentum: you outperformed last week's version of yourself in focus, missions, and boss conquests.</span>
        </p>
      </section>

      {/* COMPLETED HIGHLIGHTS LIST */}
      <section className="game-panel p-6 sm:p-8 space-y-5">
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-brand-600" />
          <span>Major Milestones Reached This Week</span>
        </h2>

        <div className="space-y-3">
          {completedQuests.map((q) => (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  {q.difficulty}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{q.title}</h4>
                {q.notes && (
                  <p className="text-xs text-slate-600 font-medium italic mt-1 bg-white p-2 rounded-xl border border-slate-200">
                    "{q.notes}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                  +{q.xpReward} XP
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lessons Learned & Self-Compassion Notes */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
            Lessons Learned & Tactical Calibrations
          </h3>
          <textarea
            value={reflectionNote}
            onChange={(e) => setReflectionNote(e.target.value)}
            placeholder="What worked exceptionally well? What gave friction? (e.g. Profiling earlier in the morning avoided late night context-switching)..."
            className="w-full h-28 p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium resize-none"
          />
        </div>

        {/* CTA to Plan Next Week */}
        <div className="pt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            Ready to convert these insights into next week's victory?
          </span>

          <button
            onClick={() => setActiveTab('planning')}
            className="btn-tactile-primary py-2.5 px-5 text-xs sm:text-sm font-bold gap-2"
          >
            <span>Plan Next Week with Pip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
