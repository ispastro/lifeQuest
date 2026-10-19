import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PipMascot } from '../mascot/PipMascot';
import { QuickNoteInput } from '../quests/QuickNoteInput';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  Layers, 
  Compass,
  Zap,
  Target,
  Sliders,
  Check
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const WeeklyPlanning: React.FC = () => {
  const { dayStages, quests, addQuest, setActiveTab, campaigns } = useGame();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [outcome1, setOutcome1] = useState(() => campaigns[0]?.name ? `Complete Apex Deliverable for ${campaigns[0].name}` : 'Ship InterviewMe AI Low-Latency Audio Streaming Buffer');
  const [outcome2, setOutcome2] = useState(() => campaigns[1]?.name ? `Advance Core Milestone for ${campaigns[1].name}` : 'Deliver Staff Engineer Systems Reliability RFC');
  const [outcome3, setOutcome3] = useState(() => campaigns[2]?.name ? `Maintain Rituals for ${campaigns[2].name}` : 'Maintain 14-Day Consistency & 4 Cardio Sessions');

  const steps = [
    { num: 1, title: 'Outcomes', desc: 'Choose 3 primary weekly targets' },
    { num: 2, title: 'Campaigns', desc: 'Align battles with long-term pillars' },
    { num: 3, title: 'Breakdown', desc: 'Carve into actionable daily quests' },
    { num: 4, title: 'Schedule', desc: 'Assign quests across Mon - Sun' },
    { num: 5, title: 'Workload', desc: 'Calibrate realistic focus hours' },
    { num: 6, title: 'Review', desc: 'Audit overload & balance' },
    { num: 7, title: 'Confirm', desc: 'Seal the weekly adventure pact' },
  ];

  const totalPlannedHours = dayStages.reduce((acc, d) => acc + d.targetHours, 0);
  const isOverloaded = totalPlannedHours > 22;

  const handleNextStep = () => {
    sounds.playClick();
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    } else {
      sounds.playQuestComplete();
      setActiveTab('journey');
    }
  };

  const handlePrevStep = () => {
    sounds.playClick();
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      
      {/* Header Banner */}
      <section className="game-panel p-5 sm:p-7 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Adventure Preparation Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Weekly Adventure Planning
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium">
              Transform ambiguous life ambitions into a realistic 7-day tactical roadmap.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PipMascot mood="welcoming" size="md" speechBubble="Ready to map next week's glory?" />
          </div>
        </div>

        {/* 7-Step Progress Navigator */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 pt-6 mt-6 border-t border-white/10">
          {steps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            return (
              <button
                key={s.num}
                onClick={() => { sounds.playClick(); setCurrentStep(s.num); }}
                className={`flex flex-col items-center p-1.5 sm:p-2 rounded-xl text-center transition-all ${
                  isCurrent
                    ? 'bg-brand-500 text-white font-extrabold shadow-sm'
                    : isCompleted
                    ? 'bg-white/10 text-emerald-300 font-bold'
                    : 'text-slate-400 hover:text-white font-semibold'
                }`}
              >
                <span className="text-[10px] sm:text-xs">
                  {isCompleted ? '✓' : `0${s.num}`}
                </span>
                <span className="text-[10px] hidden sm:block truncate w-full mt-0.5">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP CONTENT BODY */}
      <section className="game-panel p-6 sm:p-8 space-y-6">
        
        {/* Step 1: Choose Important Weekly Outcomes */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">Step 1 of 7</span>
              <h2 className="text-xl font-black text-slate-900">Define Your Three Key Apex Outcomes</h2>
              <p className="text-xs text-slate-500 font-medium">
                If only these three things are accomplished this week, will the week be an undeniable victory?
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <label className="text-xs font-black text-purple-700 uppercase">Outcome 1: {campaigns[0]?.name || 'Primary Technical Goal'}</label>
                <input
                  type="text"
                  value={outcome1}
                  onChange={(e) => setOutcome1(e.target.value)}
                  className="w-full bg-white p-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <label className="text-xs font-black text-blue-700 uppercase">Outcome 2: {campaigns[1]?.name || 'Engineering & Systems'}</label>
                <input
                  type="text"
                  value={outcome2}
                  onChange={(e) => setOutcome2(e.target.value)}
                  className="w-full bg-white p-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <label className="text-xs font-black text-orange-700 uppercase">Outcome 3: {campaigns[2]?.name || 'Vitality & Consistency'}</label>
                <input
                  type="text"
                  value={outcome3}
                  onChange={(e) => setOutcome3(e.target.value)}
                  className="w-full bg-white p-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Campaigns */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">Step 2 of 7</span>
              <h2 className="text-xl font-black text-slate-900">Campaign Alignment</h2>
              <p className="text-xs text-slate-500 font-medium">
                Ensure each outcome links to an active long-term progression track.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {campaigns.slice(0, 4).map((c, idx) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-brand-700 uppercase">Campaign {idx + 1}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                      {c.progress}% Done
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900">{c.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{c.tagline}</p>
                  <div className="text-[11px] font-bold text-slate-500">
                    {c.completedMilestones}/{c.totalMilestones} Milestones Completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 & 4: Daily Breakdown & Schedule */}
        {(currentStep === 3 || currentStep === 4) && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                Step {currentStep} of 7: {currentStep === 3 ? 'Mission Breakdown' : 'Stage Assignment'}
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {currentStep === 3 ? 'Carve Outcomes into Discrete Quests' : 'Assign Quests to 7-Day Stages'}
              </h2>
            </div>

            {currentStep === 3 && (
              <div className="mb-4">
                <QuickNoteInput />
              </div>
            )}

            <div className="space-y-3">
              {quests.slice(0, 4).map((q) => (
                <div key={q.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-100 text-brand-800 uppercase">
                      {q.difficulty}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{q.title}</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                    {q.scheduledDate} ({q.estimatedDuration}m)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 & 6: Workload & Review */}
        {(currentStep === 5 || currentStep === 6) && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                Step {currentStep} of 7: Workload Calibration
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Audit Pacing & Sustainable Hours
              </h2>
            </div>

            {/* Workload Indicator Alert */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isOverloaded 
                ? 'bg-amber-50 border-amber-300 text-amber-900' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}>
              {isOverloaded ? (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-sm">
                  {isOverloaded 
                    ? 'Caution: Heavy Schedule Detected' 
                    : 'Optimal Workload: Ready for Peak Execution'}
                </h4>
                <p>
                  Total planned focus: <strong>{totalPlannedHours} hours</strong> across 7 stages.
                  {isOverloaded 
                    ? ' Consider moving non-critical tasks to Saturday or reducing target hours to prevent fatigue.'
                    : ' Pacing allows ample buffer for unexpected bug triage and cognitive recovery.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {dayStages.map((d) => (
                <div key={d.date} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-black text-slate-700">{d.dayName}</span>
                  <div className="text-base font-extrabold text-slate-900 my-1">{d.targetHours}h</div>
                  <span className="text-[10px] font-bold text-slate-400 capitalize">{d.dayType.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Confirmation */}
        {currentStep === 7 && (
          <div className="text-center py-6 space-y-4">
            <PipMascot mood="celebrating" size="md" speechBubble="Pact ready for signing!" />
            <h2 className="text-2xl font-black text-slate-900">Confirm Week 42 Adventure Plan</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
              You are committing to 3 high-impact outcomes, 7 balanced stages, and {totalPlannedHours} focused hours.
            </p>
          </div>
        )}

        {/* Navigation Step Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="btn-tactile-secondary py-2.5 px-5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={handleNextStep}
            className="btn-tactile-primary py-2.5 px-6 text-xs sm:text-sm font-bold gap-2"
          >
            <span>{currentStep === 7 ? 'Seal Weekly Plan ⚔️' : 'Proceed to Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

    </div>
  );
};
