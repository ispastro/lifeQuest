import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  X, 
  Clock, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  HelpCircle, 
  CheckSquare, 
  FileText,
  Timer
} from 'lucide-react';

export const QuestDetailModal: React.FC = () => {
  const { selectedQuest, closeQuestDetail, completeQuest, startFocusMode } = useGame();
  const [evidenceNotes, setEvidenceNotes] = useState('');

  if (!selectedQuest) return null;

  const handleComplete = () => {
    completeQuest(selectedQuest.id, evidenceNotes, evidenceNotes);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={closeQuestDetail}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92dvh] sm:max-h-[88vh] flex flex-col my-0 sm:my-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden w-full flex justify-center pt-2.5 pb-1 bg-slate-900">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* Top Header Banner */}
        <div className="relative p-5 sm:p-7 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500 text-white">
                  Mission Protocol
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {selectedQuest.scheduledDate}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-white">
                  {selectedQuest.difficulty}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug">
                {selectedQuest.title}
              </h2>
            </div>

            <button
              onClick={closeQuestDetail}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all flex-shrink-0 touch-manipulation"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reward Badges Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 text-xs">
            <span className="flex items-center gap-1 font-black px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Zap className="w-3.5 h-3.5 fill-current" />
              +{selectedQuest.xpReward} XP
            </span>
            <span className="flex items-center gap-1 font-black px-2.5 py-1 rounded-xl bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              +{selectedQuest.gemReward} Gems
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-300 ml-auto">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {selectedQuest.estimatedDuration}m est.
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 space-y-5 overflow-y-auto flex-1 overscroll-contain">
          
          {/* Mission Objective */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-brand-600" />
              <span>Mission Objective</span>
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-200">
              {selectedQuest.objective}
            </p>
          </div>

          {/* Why It Matters */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Why This Mission Matters</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-amber-50/60 p-3 sm:p-3.5 rounded-2xl border border-amber-200/70">
              {selectedQuest.whyItMatters}
            </p>
          </div>

          {/* Acceptance Criteria */}
          {selectedQuest.acceptanceCriteria && selectedQuest.acceptanceCriteria.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Acceptance Criteria</span>
              </h4>
              <ul className="space-y-2">
                {selectedQuest.acceptanceCriteria.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Proof of Work / Notes Recorder */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Accomplishment Evidence / Notes</span>
            </h4>
            <textarea
              value={evidenceNotes}
              onChange={(e) => setEvidenceNotes(e.target.value)}
              placeholder="Record PR links, benchmark stats, or learnings to persist in your adventure log..."
              className="w-full h-20 sm:h-24 px-3.5 py-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm font-medium resize-none"
            />
          </div>

        </div>

        {/* Modal Action Footer with Safe-Area Padding */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 flex-shrink-0 pb-safe">
          <button
            onClick={() => startFocusMode(selectedQuest)}
            className="btn-tactile-secondary w-full sm:w-auto py-3 px-5 text-xs sm:text-sm font-bold gap-2 touch-manipulation"
          >
            <Timer className="w-4 h-4 text-brand-600" />
            <span>Launch Focus Sprint ({selectedQuest.estimatedDuration}m)</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={closeQuestDetail}
              className="w-1/3 sm:w-auto px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all touch-manipulation"
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              disabled={selectedQuest.completed}
              className={`w-2/3 sm:w-auto py-3 px-5 text-xs sm:text-sm font-bold gap-2 touch-manipulation ${
                selectedQuest.completed
                  ? 'btn-tactile-secondary opacity-60 cursor-not-allowed'
                  : 'btn-tactile-primary'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{selectedQuest.completed ? 'Mission Conquered' : 'Confirm Victory'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
