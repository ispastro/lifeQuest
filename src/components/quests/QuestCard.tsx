import React from 'react';
import { Quest, CampaignId } from '../../types';
import { useGame } from '../../context/GameContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Zap, 
  ChevronRight,
  Timer
} from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  isHero?: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, isHero = false }) => {
  const { toggleQuestCompletion, openQuestDetail, startFocusMode, campaigns } = useGame();

  const getCampaignMeta = (id: CampaignId) => {
    const custom = campaigns.find(c => c.id === id);
    if (custom) {
      return {
        label: custom.shortName || custom.name,
        text: custom.badgeText || 'text-indigo-700',
        bg: custom.badgeBg || 'bg-indigo-50',
        dot: 'bg-brand-500'
      };
    }
    switch (id) {
      case 'ai-product':
        return { label: 'InterviewMe AI', text: 'text-purple-700', bg: 'bg-purple-50', dot: 'bg-purple-600' };
      case 'engineering':
        return { label: 'Core Mastery', text: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-600' };
      case 'financial':
        return { label: 'Wealth & Income', text: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-600' };
      case 'personal':
        return { label: 'Vitality & Mind', text: 'text-orange-700', bg: 'bg-orange-50', dot: 'bg-orange-600' };
      default:
        return { label: 'Custom Campaign', text: 'text-indigo-700', bg: 'bg-indigo-50', dot: 'bg-indigo-600' };
    }
  };

  const campaign = getCampaignMeta(quest.campaignId);

  if (isHero) {
    return (
      <div className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-200 ${
        quest.completed 
          ? 'bg-slate-50/90 border-slate-200 opacity-90' 
          : 'bg-white border-brand-500/80 shadow-[0_8px_30px_rgb(22,163,74,0.08)] ring-4 ring-brand-100/50'
      } p-5 sm:p-7`}>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2.5 flex-1">
            
            {/* Clean Metadata Line */}
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <span className={`w-2 h-2 rounded-full ${campaign.dot}`} />
              <span className={campaign.text}>{campaign.label}</span>
              <span>•</span>
              <span className="text-slate-600">{quest.difficulty}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3 h-3 text-slate-400" />
                {quest.estimatedDuration}m
              </span>
            </div>

            {/* Title */}
            <h3 
              onClick={() => openQuestDetail(quest)}
              className={`text-lg sm:text-2xl font-black tracking-tight cursor-pointer hover:text-brand-600 transition-colors ${
                quest.completed ? 'line-through text-slate-400 font-bold' : 'text-slate-900'
              }`}
            >
              {quest.title}
            </h3>

            {/* Objective Preview */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-2 max-w-2xl">
              {quest.objective}
            </p>

            {/* Rewards Row */}
            <div className="flex items-center gap-2 pt-1">
              <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                +{quest.xpReward} XP
              </span>
              <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                +{quest.gemReward} Gems
              </span>
              {quest.focusTimeSpent > 0 && (
                <span className="text-xs font-bold text-slate-500 ml-2">
                  {Math.round(quest.focusTimeSpent / 60)}m logged
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs: Full width on mobile, tactile Duolingo style */}
          <div className="flex flex-col xs:flex-row md:flex-col items-stretch sm:items-center gap-2 pt-2 md:pt-0 w-full md:w-auto">
            {!quest.completed ? (
              <>
                <button
                  onClick={() => startFocusMode(quest)}
                  className="btn-tactile-primary w-full md:w-44 py-3 px-5 text-sm font-bold gap-2 touch-manipulation"
                >
                  <Timer className="w-4 h-4" />
                  <span>Start Mission</span>
                </button>
                <button
                  onClick={() => toggleQuestCompletion(quest.id)}
                  className="btn-tactile-secondary w-full md:w-44 py-2.5 px-4 text-xs font-bold gap-1.5 touch-manipulation"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quick Complete</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => toggleQuestCompletion(quest.id)}
                className="btn-tactile-secondary w-full md:w-44 py-3 px-4 text-sm font-bold gap-2 text-emerald-700 bg-emerald-50 border-emerald-300 touch-manipulation"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                <span>Mission Done!</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Quest Card (Crisp, clean, tactile list item)
  return (
    <div className={`group relative bg-white rounded-2xl border-2 transition-all duration-150 p-3.5 sm:p-4 ${
      quest.completed 
        ? 'bg-slate-50/80 border-slate-200' 
        : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
    }`}>
      <div className="flex items-start gap-3 sm:gap-4">
        
        {/* Tactile Circular Checkbox */}
        <button
          onClick={() => toggleQuestCompletion(quest.id)}
          aria-label={quest.completed ? "Mark quest incomplete" : "Complete quest"}
          className={`flex-shrink-0 mt-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all touch-manipulation ${
            quest.completed
              ? 'bg-brand-500 text-white shadow-tactile-green-active'
              : 'border-2 border-slate-300 hover:border-brand-500 hover:bg-brand-50 text-transparent active:scale-90'
          }`}
        >
          {quest.completed ? (
            <CheckCircle2 className="w-5 h-5 fill-current" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 group-hover:text-brand-400" />
          )}
        </button>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            <span className={`w-1.5 h-1.5 rounded-full ${campaign.dot}`} />
            <span className={campaign.text}>{campaign.label}</span>
            <span>•</span>
            <span className="text-slate-500">{quest.difficulty}</span>
            <span className="ml-auto text-slate-400 font-semibold lowercase">
              {quest.estimatedDuration}m
            </span>
          </div>

          <h4 
            onClick={() => openQuestDetail(quest)}
            className={`text-sm sm:text-base font-bold tracking-tight cursor-pointer hover:text-brand-600 transition-colors ${
              quest.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-900'
            }`}
          >
            {quest.title}
          </h4>

          {/* Reward Badges & Action Buttons */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                +{quest.xpReward} XP
              </span>
              <span className="flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Sparkles className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                +{quest.gemReward} 💎
              </span>
            </div>

            <div className="flex items-center gap-1">
              {!quest.completed && (
                <button
                  onClick={() => startFocusMode(quest)}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 transition-all active:scale-95 touch-manipulation"
                >
                  <Timer className="w-3.5 h-3.5 text-brand-600" />
                  <span>Focus</span>
                </button>
              )}
              <button
                onClick={() => openQuestDetail(quest)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all touch-manipulation"
                title="Inspect Quest"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
