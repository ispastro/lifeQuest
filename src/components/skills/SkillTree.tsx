import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { SkillNode } from '../../types';
import { 
  BookOpen, 
  Sparkles, 
  Zap, 
  Lock, 
  CheckCircle2, 
  Terminal, 
  Network, 
  Database, 
  Activity, 
  MessageSquare, 
  Award,
  ShieldAlert
} from 'lucide-react';
import { PipMascot } from '../mascot/PipMascot';
import { sounds } from '../../utils/soundEffects';

export const SkillTree: React.FC = () => {
  const { skills, unlockSkill, profile } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Backend', 'AI Engineering', 'System Design', 'Database', 'Production', 'Communication', 'Career'];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  const getSkillIcon = (category: SkillNode['category']) => {
    switch (category) {
      case 'Backend': return Terminal;
      case 'AI Engineering': return Sparkles;
      case 'System Design': return Network;
      case 'Database': return Database;
      case 'Production': return Activity;
      case 'Communication': return MessageSquare;
      default: return Award;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      
      {/* Top Banner */}
      <section className="game-panel p-5 sm:p-7 relative overflow-hidden bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              Engineering Mastery Skill Constellation
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Skill Progression Tree
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              Invest your hard-earned XP into deep technical capabilities, systems mastery, and career leverage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PipMascot mood="level_up" size="md" speechBubble="Unlock your mastery perks!" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 pt-6 mt-6 border-t border-white/10 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { sounds.playClick(); setSelectedCategory(cat); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-sm font-extrabold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* SKILL NODES GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredSkills.map((skill) => {
          const Icon = getSkillIcon(skill.category);
          const isMastered = skill.status === 'completed';
          const isInProgress = skill.status === 'in_progress';
          const isAvailable = skill.status === 'available';
          const isLocked = skill.status === 'locked';
          const canAfford = profile.currentXp >= skill.xpCost;

          return (
            <div
              key={skill.id}
              className={`game-panel p-5 flex flex-col justify-between transition-all duration-200 ${
                isMastered
                  ? 'border-2 border-emerald-400 bg-emerald-50/20'
                  : isInProgress
                  ? 'border-2 border-brand-500 bg-white shadow-md'
                  : isAvailable
                  ? 'border-2 border-amber-300 bg-amber-50/20 hover:border-amber-400'
                  : 'border-slate-200 opacity-60 bg-slate-50'
              }`}
            >
              <div className="space-y-3">
                
                {/* Node Status Header */}
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl ${
                    isMastered 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : isInProgress 
                      ? 'bg-brand-100 text-brand-700' 
                      : isAvailable 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    isMastered 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : isInProgress 
                      ? 'bg-brand-100 text-brand-800' 
                      : isAvailable 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isMastered ? 'Mastered' : isInProgress ? 'In Training' : isAvailable ? 'Available' : 'Locked'}
                  </span>
                </div>

                {/* Title & Level */}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {skill.category} • Tier {skill.level}/{skill.maxLevel}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Perks unlocked */}
                {skill.perks && skill.perks.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Unlocked Capabilities
                    </span>
                    {skill.perks.map((perk, i) => (
                      <div key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-700 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {isMastered ? 'Max Tier' : `${skill.xpCost} XP to Unlock`}
                </span>

                {isAvailable && (
                  <button
                    onClick={() => unlockSkill(skill.id)}
                    disabled={!canAfford}
                    className={`btn-tactile-primary py-1.5 px-3.5 text-xs font-bold ${
                      !canAfford ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    {canAfford ? 'Unlock Node' : 'Need More XP'}
                  </button>
                )}

                {isMastered && (
                  <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Complete
                  </span>
                )}

                {isLocked && (
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Prerequisites needed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
};
