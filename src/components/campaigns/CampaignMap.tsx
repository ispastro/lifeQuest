import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Campaign, CampaignId } from '../../types';
import { 
  Bot, 
  Cpu, 
  TrendingUp, 
  Heart, 
  CheckCircle2, 
  Lock, 
  Zap, 
  ArrowRight,
  Shield,
  Flag
} from 'lucide-react';
import { PipMascot } from '../mascot/PipMascot';
import { sounds } from '../../utils/soundEffects';

export const CampaignMap: React.FC = () => {
  const { campaigns } = useGame();
  const [selectedCampaignId, setSelectedCampaignId] = useState<CampaignId>(() => campaigns[0]?.id || 'ai-product');

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  const getCampaignIcon = (id: CampaignId) => {
    switch (id) {
      case 'ai-product': return Bot;
      case 'engineering': return Cpu;
      case 'financial': return TrendingUp;
      default: return Heart;
    }
  };

  const SelectedIcon = getCampaignIcon(selectedCampaign.id);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      
      {/* Top Banner */}
      <section className="game-panel p-5 sm:p-7 relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
              <Flag className="w-3.5 h-3.5" />
              Strategic Chapters
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Big Goals As Story Chapters
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 font-medium">
              A big dream, like starting a business, is split into chapters. Finish one chapter, then go to the next.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PipMascot mood="welcoming" size="md" speechBubble="Choose your war theater!" />
          </div>
        </div>

        {/* Campaign Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6 mt-6 border-t border-white/10">
          {campaigns.map((camp) => {
            const Icon = getCampaignIcon(camp.id);
            const isSelected = camp.id === selectedCampaignId;
            return (
              <button
                key={camp.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCampaignId(camp.id);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 font-extrabold shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-white font-semibold'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-600' : 'text-purple-300'}`} />
                <div className="truncate min-w-0">
                  <div className="text-xs truncate">{camp.shortName}</div>
                  <div className="text-[10px] opacity-75 font-bold">{camp.progress}% Done</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SELECTED CAMPAIGN DETAIL & MILESTONE ROADMAP */}
      <section className="game-panel p-6 sm:p-8 space-y-6">
        
        {/* Campaign Summary Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-2xl ${selectedCampaign.badgeBg} ${selectedCampaign.badgeText}`}>
              <SelectedIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedCampaign.name}
                </h2>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {selectedCampaign.completedMilestones} / {selectedCampaign.totalMilestones} Chapters Conquered
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {selectedCampaign.tagline}
              </p>
            </div>
          </div>

          {/* Progress gauge */}
          <div className="w-full md:w-56 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Campaign Victory</span>
              <span className="font-extrabold text-slate-900">{selectedCampaign.progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700" 
                style={{ width: `${selectedCampaign.progress}%`, backgroundColor: selectedCampaign.color }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Progression Winding Map */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
            Story Chapters Trail
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-1 before:bg-slate-200">
            {selectedCampaign.milestones.map((m, index) => {
              const isCompleted = m.status === 'completed';
              const isInProgress = m.status === 'in_progress';
              const isLocked = m.status === 'locked';

              return (
                <div 
                  key={m.id}
                  className={`relative game-panel p-4 sm:p-5 transition-all ${
                    isInProgress
                      ? 'border-2 border-brand-500 ring-4 ring-brand-100/80 shadow-md'
                      : isCompleted
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'border-slate-200 opacity-60 bg-slate-50/40'
                  }`}
                >
                  {/* Stepping Node Indicator on Timeline */}
                  <div className={`absolute -left-9 sm:-left-11 top-5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border-2 shadow-sm ${
                    isCompleted
                      ? 'bg-brand-500 border-white text-white'
                      : isInProgress
                      ? 'bg-amber-400 border-white text-slate-900 animate-pulse'
                      : 'bg-slate-200 border-white text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? 'Conquered' : isInProgress ? 'Active Chapter' : 'Locked'}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          Chapter #{m.order}
                        </span>
                      </div>

                      <h4 className={`text-base font-bold tracking-tight ${isCompleted ? 'text-slate-800' : isInProgress ? 'text-slate-900 font-extrabold' : 'text-slate-500'}`}>
                        {m.title}
                      </h4>

                      <p className="text-xs text-slate-500 font-medium">
                        {m.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        +{m.xpReward} XP
                      </span>
                      {isLocked && <Lock className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
};
