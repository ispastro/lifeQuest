import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PipMascot, MascotMood } from '../mascot/PipMascot';
import { QuestCard } from '../quests/QuestCard';
import { BossRaidBanner } from '../boss/BossRaidBanner';
import { QuickNoteInput } from '../quests/QuickNoteInput';
import { 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Clock, 
  Zap,
  Target,
  Bot,
  Cpu,
  TrendingUp,
  Heart,
  Sparkles,
  Rocket,
  Coffee
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const PlayerHome: React.FC = () => {
  const { profile, quests, campaigns, dayStages, setActiveTab, addQuest, startOnboarding } = useGame();
  const [questFilter, setQuestFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCampaign, setNewCampaign] = useState<string>(() => campaigns[0]?.id || 'ai-product');
  const [newDuration, setNewDuration] = useState(45);

  // Today's quests (scheduled for 2026-10-19)
  const todayQuests = quests.filter(q => q.scheduledDate === '2026-10-19');
  const completedTodayCount = todayQuests.filter(q => q.completed).length;
  const totalTodayCount = todayQuests.length;
  const progressRatio = totalTodayCount > 0 ? (completedTodayCount / totalTodayCount) : 0;
  const progressPercent = Math.round(progressRatio * 100);

  // Recommended Next Quest (incomplete, highest leverage)
  const recommendedQuest = todayQuests.find(q => !q.completed) || todayQuests[0];

  // Mascot authentic dialogue (witty engineer tone)
  let mascotMood: MascotMood = 'welcoming';
  let speechText = `Let's tackle today's apex mission, ${profile.name}!`;
  if (completedTodayCount === totalTodayCount && totalTodayCount > 0) {
    mascotMood = 'celebrating';
    speechText = `Clean sweep today, ${profile.name}! Time to celebrate ☕`;
  } else if (completedTodayCount >= 2) {
    mascotMood = 'encouraging';
    speechText = "Just 1 more quest to seal the streak!";
  }

  // Filtered Quests list
  const filteredQuests = todayQuests.filter(q => {
    if (questFilter === 'pending') return !q.completed;
    if (questFilter === 'completed') return q.completed;
    return true;
  });

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addQuest({
      title: newTitle.trim(),
      campaignId: newCampaign,
      difficulty: 'Medium',
      estimatedDuration: newDuration,
      xpReward: 120,
      gemReward: 15,
      scheduledDate: '2026-10-19',
      objective: 'Execute high-impact task aligned with weekly adventure outcomes.',
      whyItMatters: 'Compounds into long-term technical and personal advancement.',
      expectedResult: 'Deliverable completed and verified against criteria.',
      acceptanceCriteria: ['Implement core deliverable', 'Validate tests / output'],
    });

    setNewTitle('');
    setIsAddingQuest(false);
  };

  const getCampaignIcon = (id: string) => {
    switch (id) {
      case 'ai-product': return Bot;
      case 'engineering': return Cpu;
      case 'financial': return TrendingUp;
      default: return Heart;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 lg:pb-12 max-w-5xl mx-auto">
      
      {/* Quick Customization Banner for new/customizing users */}
      <div className="bg-gradient-to-r from-brand-600 via-teal-600 to-emerald-600 rounded-3xl p-4 sm:p-5 text-white shadow-tactile-green flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-black text-xl flex-shrink-0 shadow-inner">
            ⚡
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <span>Customize Character, Campaigns & Quests</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                From Scratch
              </span>
            </h3>
            <p className="text-xs text-emerald-100 font-medium mt-0.5">
              Personalize your engineering persona, battlefront campaigns, and today's daily triad missions.
            </p>
          </div>
        </div>
        <button
          onClick={startOnboarding}
          className="bg-white text-slate-900 border-b-4 border-slate-300 hover:bg-slate-50 py-2.5 px-5 text-xs font-black rounded-2xl flex-shrink-0 shadow-md touch-manipulation active:scale-95 transition-all"
        >
          Customize My Journey ✨
        </button>
      </div>

      {/* HERO WELCOMING SECTION: Clean, vibrant, authentic game deck */}
      <section className="relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-8">
        
        {/* Soft background ambient tint */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-100/50 via-brand-50/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-amber-50/40 via-yellow-50/20 to-transparent rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Left Greeting & Contextual Information */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>Monday, Oct 19 • Week 42</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Hey {profile.name}, ready to <span className="text-brand-600 underline decoration-brand-300 decoration-wavy decoration-2 underline-offset-4">level up</span>?
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
              You're holding a <strong className="text-orange-600 font-extrabold inline-flex items-center gap-1"><Flame className="w-4 h-4 fill-orange-500 inline" /> {profile.streakDays}-day streak</strong>. Conquering today’s 3 missions will push your systems promo case forward.
            </p>

            {/* Daily Summary Stats Chips */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>{completedTodayCount} of {totalTodayCount} Quests Done</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 shadow-sm">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>1h 45m Focus Logged</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-xs font-black text-amber-800 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>+280 XP Today</span>
              </div>
            </div>
          </div>

          {/* Right Mascot Area with Clean Dialogue */}
          <div className="flex flex-col items-center flex-shrink-0 pt-2 md:pt-0">
            <PipMascot
              mood={mascotMood}
              size="lg"
              speechBubble={speechText}
              onClick={() => {
                sounds.playCoin();
              }}
            />
            <span className="text-[10px] font-black tracking-widest text-slate-400 mt-2 uppercase">
              Pip • Level 12 Familiar
            </span>
          </div>

        </div>

        {/* Bottom Progress Bar: Tactile Nintendo / Duolingo Style */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span className="flex items-center gap-1.5 text-slate-800 font-extrabold">
              <Target className="w-4 h-4 text-brand-600" />
              <span>Today's Daily Target</span>
            </span>
            <span className="tabular-nums font-black text-brand-700 text-sm">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* 1. YOU WRITE YOUR TASKS: QUICK NOTE MAGIC PARSER */}
      <QuickNoteInput />

      {/* 2 & 3. TASKS BECOME QUESTS & YOU FIGHT THE BOSS */}
      <BossRaidBanner />

      {/* RECOMMENDED NEXT MISSION (APEX TARGET) */}
      {recommendedQuest && (
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
              </span>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Priority Mission For Today
              </h2>
            </div>
            <span className="text-[11px] font-black text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
              Highest Leverage
            </span>
          </div>

          <QuestCard quest={recommendedQuest} isHero={true} />
        </section>
      )}

      {/* TODAY'S MAIN QUESTS (THE DAILY TRIAD) */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Today's Daily Quests</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {completedTodayCount}/{totalTodayCount}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600 border border-slate-200/80">
              <button
                onClick={() => { sounds.playClick(); setQuestFilter('all'); }}
                className={`px-3 py-1 rounded-xl transition-all touch-manipulation ${
                  questFilter === 'all' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                All ({todayQuests.length})
              </button>
              <button
                onClick={() => { sounds.playClick(); setQuestFilter('pending'); }}
                className={`px-3 py-1 rounded-xl transition-all touch-manipulation ${
                  questFilter === 'pending' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                Active ({todayQuests.filter(q => !q.completed).length})
              </button>
              <button
                onClick={() => { sounds.playClick(); setQuestFilter('completed'); }}
                className={`px-3 py-1 rounded-xl transition-all touch-manipulation ${
                  questFilter === 'completed' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                Done ({completedTodayCount})
              </button>
            </div>

            {/* Quick Add Quest Button */}
            <button
              onClick={() => { sounds.playClick(); setIsAddingQuest(!isAddingQuest); }}
              className="p-2 rounded-2xl border border-slate-200 bg-white hover:border-brand-500 hover:bg-brand-50 text-slate-700 transition-all active:scale-95 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center shadow-sm"
              title="Add a custom quest"
            >
              <Plus className="w-5 h-5 text-brand-600" />
            </button>
          </div>
        </div>

        {/* Quick Add Quest Inline Form */}
        {isAddingQuest && (
          <form onSubmit={handleCreateQuest} className="game-panel p-4 sm:p-5 border-2 border-brand-400 bg-brand-50/40 space-y-3 animate-slide-up">
            <h4 className="text-sm font-extrabold text-slate-800">Add New Daily Quest</h4>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Write Prometheus metrics exporter for AI agent websocket"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-sm bg-white"
              autoFocus
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <select
                  value={newCampaign}
                  onChange={(e) => setNewCampaign(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <select
                  value={newDuration}
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white"
                >
                  <option value={25}>25 min (Sprint)</option>
                  <option value={45}>45 min (Standard)</option>
                  <option value={60}>60 min (Deep Block)</option>
                  <option value={90}>90 min (Epic Focus)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingQuest(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-primary px-4 py-1.5 text-xs font-bold"
                >
                  Add Quest (+120 XP)
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Quests Stack */}
        <div className="space-y-3">
          {filteredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
          {filteredQuests.length === 0 && (
            <div className="game-panel p-8 text-center space-y-2 bg-slate-50/50">
              <p className="text-sm font-bold text-slate-500">No quests in this category.</p>
              <button
                onClick={() => setQuestFilter('all')}
                className="text-xs font-bold text-brand-600 underline"
              >
                Show all today's quests
              </button>
            </div>
          )}
        </div>
      </section>

      {/* COMPACT 7-DAY WEEKLY ADVENTURE TRACK PREVIEW */}
      <section className="game-panel p-4 sm:p-6 space-y-4 border-2 border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                7-Day Adventure Track
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                Week 42 • Mon through Sun
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('journey')}
            className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 group touch-manipulation"
          >
            <span>Full Map</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Stepping Stones 7-Day Bar */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 pt-1 select-none">
          {dayStages.map((day) => {
            const isToday = day.isCurrentDay;
            const isDone = day.isCompleted;

            return (
              <div
                key={day.date}
                onClick={() => setActiveTab('journey')}
                className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2.5 rounded-2xl cursor-pointer transition-all duration-150 touch-manipulation ${
                  isToday
                    ? 'bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-tactile-green ring-2 ring-brand-300 -translate-y-1'
                    : isDone
                    ? 'bg-slate-100 border border-slate-200 text-slate-600'
                    : 'bg-white border border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className={`text-[9px] sm:text-[11px] font-extrabold ${isToday ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {day.dayOfWeek}
                </span>

                <span className={`text-xs sm:text-base font-black my-0.5 ${isToday ? 'text-white' : 'text-slate-800'}`}>
                  {day.date.split('-')[2]}
                </span>

                <div className="mt-0.5">
                  {isToday ? (
                    <div className="w-4 h-4 rounded-full bg-white text-brand-700 flex items-center justify-center text-[9px] font-black">
                      ⚡
                    </div>
                  ) : isDone ? (
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </div>
                  ) : day.dayType === 'rest' ? (
                    <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[9px] font-bold">
                      🌿
                    </div>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ACTIVE CAMPAIGNS GLANCE */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Active Campaign Frontlines
          </h3>
          <button
            onClick={() => setActiveTab('campaigns')}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            Campaign Map →
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {campaigns.map((camp) => {
            const Icon = getCampaignIcon(camp.id);
            return (
              <div
                key={camp.id}
                onClick={() => setActiveTab('campaigns')}
                className="game-panel p-3.5 sm:p-4 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all space-y-2 border-2 border-slate-100"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${camp.badgeBg} ${camp.badgeText}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-slate-700 tabular-nums">
                    {camp.progress}%
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">{camp.name}</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold truncate mt-0.5">
                    {camp.completedMilestones}/{camp.totalMilestones} Milestones
                  </p>
                </div>

                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${camp.progress}%`,
                      backgroundColor: camp.color 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
