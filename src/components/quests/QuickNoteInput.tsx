import React, { useState, useMemo } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Clock, 
  Calendar, 
  Sun, 
  Sunset, 
  Moon, 
  Sword, 
  Check, 
  Zap,
  Bot
} from 'lucide-react';
import { Quest, QuestDifficulty } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface ParsedTaskPreview {
  rawTitle: string;
  cleanTitle: string;
  dateStr: string;
  displayDate: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  estimatedDuration: number;
  difficulty: QuestDifficulty;
  xpReward: number;
  gemReward: number;
  isDailyBoss: boolean;
  campaignId: string;
  substeps: string[];
}

export const QuickNoteInput: React.FC = () => {
  const { addMultipleQuests, campaigns, quests } = useGame();
  const [noteText, setNoteText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [justAddedCount, setJustAddedCount] = useState<number | null>(null);

  // Natural Language Parser
  const parsedTasks: ParsedTaskPreview[] = useMemo(() => {
    if (!noteText.trim()) return [];

    // Split text by commas, newlines, semicolons, or " and "
    const rawChunks = noteText
      .split(/\n|,|;|\band\b/i)
      .map(s => s.trim())
      .filter(s => s.length > 2);

    if (rawChunks.length === 0) return [];

    // Day calculations relative to current date (2026-10-19 is Monday)
    const baseDate = new Date('2026-10-19T12:00:00Z');
    const dayMap: Record<string, number> = {
      mon: 0, monday: 0,
      tue: 1, tuesday: 1,
      wed: 2, wednesday: 2,
      thu: 3, thursday: 3,
      fri: 4, friday: 4,
      sat: 5, saturday: 5,
      sun: 6, sunday: 6,
    };

    const results = rawChunks.map((chunk, index) => {
      let text = chunk;
      let scheduledDate = '2026-10-19';
      let displayDate = 'Today';
      let timeOfDay: 'morning' | 'afternoon' | 'evening' = 
        index % 3 === 0 ? 'morning' : index % 3 === 1 ? 'afternoon' : 'evening';

      // 1. Detect Day keywords (e.g. "by thursday", "tomorrow", "friday")
      const lower = text.toLowerCase();
      if (lower.includes('tomorrow')) {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + 1);
        scheduledDate = d.toISOString().slice(0, 10);
        displayDate = 'Tomorrow (Tue)';
        text = text.replace(/tomorrow/i, '');
      } else {
        for (const [dayName, dayOffset] of Object.entries(dayMap)) {
          const regex = new RegExp(`\\b(by|on)?\\s*${dayName}\\b`, 'i');
          if (regex.test(lower)) {
            const d = new Date(baseDate);
            d.setDate(d.getDate() + dayOffset);
            scheduledDate = d.toISOString().slice(0, 10);
            displayDate = dayName.charAt(0).toUpperCase() + dayName.slice(1);
            text = text.replace(regex, '');
            break;
          }
        }
      }

      // 2. Detect Time of Day keywords
      if (/\b(morning|7am|8am|9am|10am|am)\b/i.test(text)) {
        timeOfDay = 'morning';
        text = text.replace(/\b(in the\s+)?(morning|7am|8am|9am|10am)\b/i, '');
      } else if (/\b(afternoon|1pm|2pm|3pm|lunch|noon)\b/i.test(text)) {
        timeOfDay = 'afternoon';
        text = text.replace(/\b(in the\s+)?(afternoon|1pm|2pm|3pm|lunch|noon)\b/i, '');
      } else if (/\b(tonight|evening|night|6pm|7pm|8pm|pm)\b/i.test(text)) {
        timeOfDay = 'evening';
        text = text.replace(/\b(at\s+)?(tonight|evening|night|6pm|7pm|8pm)\b/i, '');
      }

      // 3. Detect Duration (e.g. "45m", "30 mins", "1h", "2 hours")
      let duration = 30;
      const durationMatch = text.match(/(\d+)\s*(m|min|mins|h|hr|hours)\b/i);
      if (durationMatch) {
        const val = parseInt(durationMatch[1], 10);
        const unit = durationMatch[2].toLowerCase();
        duration = unit.startsWith('h') ? val * 60 : val;
        text = text.replace(durationMatch[0], '');
      } else {
        // Infer duration based on verbs
        if (/report|build|refactor|design|audit|presentation|study|exam|feature/i.test(text)) {
          duration = 60;
        } else if (/call|email|text|reply|ping|water|order|buy|schedule/i.test(text)) {
          duration = 15;
        }
      }

      // Clean up punctuation and prepositions
      text = text.replace(/^[,\s;.-]+|[,\s;.-]+$/g, '').trim();
      text = text.replace(/\s+/g, ' ');

      // Capitalize first letter
      const cleanTitle = text ? text.charAt(0).toUpperCase() + text.slice(1) : chunk;

      // 4. Calculate Difficulty & Rewards
      let difficulty: QuestDifficulty = 'Medium';
      let xp = 120;
      let gems = 15;

      if (duration >= 60) {
        difficulty = 'Hard';
        xp = 250;
        gems = 25;
      } else if (duration <= 20) {
        difficulty = 'Easy';
        xp = 50;
        gems = 8;
      }

      // 5. Categorize Campaign
      let campaignId = campaigns[0]?.id || 'ai-product';
      if (/tax|money|pay|bank|invest|budget|income|crypto|fund/i.test(cleanTitle)) {
        campaignId = 'financial';
      } else if (/workout|gym|run|sleep|mom|dad|friend|health|walk|coffee|meditate/i.test(cleanTitle)) {
        campaignId = 'personal';
      } else if (/code|deploy|ebpf|linux|sql|system|kernel|server|db|git/i.test(cleanTitle)) {
        campaignId = 'engineering';
      }

      // Sub-steps for strikes
      const substeps = [
        `Prepare outline & setup for ${cleanTitle}`,
        `Execute core substance and review details`,
        `Final verification & mark complete`,
      ];

      return {
        rawTitle: chunk,
        cleanTitle,
        dateStr: scheduledDate,
        displayDate,
        timeOfDay,
        estimatedDuration: duration,
        difficulty,
        xpReward: xp,
        gemReward: gems,
        isDailyBoss: false, // will mark the largest below
        campaignId,
        substeps,
      };
    });

    // Mark the biggest task of the batch as Daily Boss
    if (results.length > 0) {
      let maxIdx = 0;
      for (let i = 1; i < results.length; i++) {
        if (results[i].xpReward > results[maxIdx].xpReward) {
          maxIdx = i;
        }
      }
      results[maxIdx].isDailyBoss = true;
      results[maxIdx].xpReward = Math.max(300, results[maxIdx].xpReward);
      results[maxIdx].gemReward = Math.max(35, results[maxIdx].gemReward);
    }

    return results;
  }, [noteText, campaigns]);

  const handleAddAll = () => {
    if (parsedTasks.length === 0) return;

    const questsToAdd = parsedTasks.map(t => ({
      title: t.cleanTitle,
      campaignId: t.campaignId,
      difficulty: t.difficulty,
      estimatedDuration: t.estimatedDuration,
      xpReward: t.xpReward,
      gemReward: t.gemReward,
      scheduledDate: t.dateStr,
      timeOfDay: t.timeOfDay,
      isDailyBoss: t.isDailyBoss,
      objective: `Execute "${t.cleanTitle}" scheduled for ${t.timeOfDay}.`,
      whyItMatters: 'Key driver of daily momentum and streak progression in Cadence.',
      expectedResult: 'Deliverable completed and criteria satisfied.',
      acceptanceCriteria: t.substeps,
      substeps: t.substeps.map((text, i) => ({
        id: `sub-${Date.now()}-${i}`,
        text,
        completed: false,
      })),
    }));

    addMultipleQuests(questsToAdd);
    setJustAddedCount(questsToAdd.length);
    setNoteText('');
    setTimeout(() => setJustAddedCount(null), 3000);
  };

  const handleExampleClick = (example: string) => {
    sounds.playClick();
    setNoteText(example);
  };

  const totalXp = parsedTasks.reduce((acc, t) => acc + t.xpReward, 0);

  return (
    <section className="game-panel p-4 sm:p-6 border-2 border-slate-200 bg-white relative overflow-hidden shadow-sm">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-black shadow-tactile-green text-sm flex-shrink-0">
            ✍️
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Quick Note Task Writer</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                Magic Parser
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Type like a quick note — Cadence schedules each quest at a good time in your day.
            </p>
          </div>
        </div>

        {justAddedCount && (
          <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full animate-bounce">
            ✓ Added {justAddedCount} Quests!
          </span>
        )}
      </div>

      {/* Note Input Box */}
      <div className={`relative rounded-2xl border-2 transition-all ${
        isFocused ? 'border-brand-500 ring-4 ring-brand-100 bg-white' : 'border-slate-200 bg-slate-50'
      }`}>
        <textarea
          rows={2}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder='Type quick tasks: "finish report by Thursday, call mom, 30m gym tonight"...'
          className="w-full p-3 sm:p-4 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal bg-transparent focus:outline-none resize-none"
        />

        {noteText && (
          <div className="flex items-center justify-between p-2.5 bg-slate-100/80 border-t border-slate-200/80 rounded-b-xl">
            <span className="text-[11px] font-bold text-slate-600">
              {parsedTasks.length} {parsedTasks.length === 1 ? 'quest' : 'quests'} recognized • <strong className="text-brand-700">+{totalXp} Total XP</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNoteText('')}
                className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleAddAll}
                className="btn-tactile-primary py-1.5 px-3.5 text-xs font-black gap-1.5 touch-manipulation shadow-tactile-green"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Turn into Quests ✨</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts / Examples */}
      {!noteText && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-[10px] font-black uppercase text-slate-400 mr-1">Try example:</span>
          {[
            'finish report by Thursday, call mom',
            'review system architecture, 45m workout tonight',
            'deploy billing webhook, doctor appointment tomorrow'
          ].map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => handleExampleClick(ex)}
              className="text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-xl transition-all"
            >
              "{ex}"
            </button>
          ))}
        </div>
      )}

      {/* Live Parser Preview Cards */}
      {parsedTasks.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-500 tracking-wider">
            <span>How Cadence understands your day:</span>
            <span className="text-brand-700">Ready to play</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {parsedTasks.map((t, i) => (
              <div 
                key={i}
                className={`p-3 rounded-2xl border transition-all ${
                  t.isDailyBoss 
                    ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm ring-2 ring-amber-200' 
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase">
                    {t.isDailyBoss ? (
                      <span className="bg-amber-500 text-white px-1.5 py-0.2 rounded-md flex items-center gap-1 shadow-sm">
                        <Sword className="w-3 h-3" /> Today's Boss
                      </span>
                    ) : (
                      <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-md">
                        Quest #{i + 1}
                      </span>
                    )}
                  </span>

                  <span className="text-[10px] font-black text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.2 rounded-md">
                    +{t.xpReward} XP
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {t.cleanTitle}
                </h4>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[10px] font-bold text-slate-500">
                  <span className="flex items-center gap-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {t.displayDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 capitalize">
                    {t.timeOfDay === 'morning' ? <Sun className="w-3 h-3 text-amber-500" /> : t.timeOfDay === 'afternoon' ? <Sunset className="w-3 h-3 text-orange-500" /> : <Moon className="w-3 h-3 text-indigo-500" />}
                    {t.timeOfDay}
                  </span>
                  <span>•</span>
                  <span>{t.estimatedDuration}m</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleAddAll}
              className="w-full sm:w-auto btn-tactile-primary py-2.5 px-6 text-xs sm:text-sm font-black gap-2 shadow-tactile-green"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Add All to My Day (+{totalXp} XP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
