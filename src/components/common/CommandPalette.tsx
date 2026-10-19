import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Search, 
  Command, 
  Compass, 
  Home, 
  CheckSquare, 
  Map, 
  BookOpen, 
  Award, 
  ShoppingBag, 
  History, 
  Settings, 
  Zap, 
  Timer, 
  Palette, 
  Volume2, 
  VolumeX, 
  Plus, 
  X,
  Sparkles,
  Sword
} from 'lucide-react';
import { ActiveTab, AppTheme } from '../../types';
import { sounds } from '../../utils/soundEffects';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    setActiveTab, 
    quests, 
    openQuestDetail, 
    startFocusMode, 
    setTheme, 
    profile, 
    toggleSound,
    startOnboarding 
  } = useGame();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  interface CommandItem {
    id: string;
    category: string;
    title: string;
    subtitle?: string;
    icon: React.ElementType;
    badge?: string;
    action: () => void;
  }

  const navigationCommands: CommandItem[] = [
    { id: 'nav-home', category: 'Navigation', title: 'Go to Player Home', icon: Home, action: () => setActiveTab('home') },
    { id: 'nav-boss', category: 'Navigation', title: 'Enter Weekly Raid Arena', icon: Sword, badge: 'Epic Boss', action: () => setActiveTab('boss') },
    { id: 'nav-journey', category: 'Navigation', title: 'Open 7-Day Journey Map', icon: Compass, action: () => setActiveTab('journey') },
    { id: 'nav-planning', category: 'Navigation', title: 'Weekly Planning Studio', icon: CheckSquare, action: () => setActiveTab('planning') },
    { id: 'nav-campaigns', category: 'Navigation', title: 'Strategic Campaign Map', icon: Map, action: () => setActiveTab('campaigns') },
    { id: 'nav-skills', category: 'Navigation', title: 'Skill Progression Tree', icon: BookOpen, action: () => setActiveTab('skills') },
    { id: 'nav-achievements', category: 'Navigation', title: 'Milestone Badges & Trophies', icon: Award, action: () => setActiveTab('achievements') },
    { id: 'nav-shop', category: 'Navigation', title: 'Rewards Bazaar', icon: ShoppingBag, action: () => setActiveTab('shop') },
    { id: 'nav-review', category: 'Navigation', title: 'Weekly Review Chronicle', icon: History, action: () => setActiveTab('review') },
    { id: 'nav-settings', category: 'Navigation', title: 'Customization & Settings', icon: Settings, action: () => setActiveTab('settings') },
  ];

  const themeCommands: CommandItem[] = [
    { id: 'theme-emerald', category: 'Themes', title: 'Emerald Forest (Duolingo Style)', icon: Palette, badge: profile.theme === 'emerald' ? 'Active' : undefined, action: () => setTheme('emerald') },
    { id: 'theme-sapphire', category: 'Themes', title: 'Cyber Sapphire (Systems Blue)', icon: Palette, badge: profile.theme === 'sapphire' ? 'Active' : undefined, action: () => setTheme('sapphire') },
    { id: 'theme-amethyst', category: 'Themes', title: 'Amethyst Arc (AI Purple)', icon: Palette, badge: profile.theme === 'amethyst' ? 'Active' : undefined, action: () => setTheme('amethyst') },
    { id: 'theme-sunset', category: 'Themes', title: 'Sunset Ember (Flame Orange)', icon: Palette, badge: profile.theme === 'sunset' ? 'Active' : undefined, action: () => setTheme('sunset') },
    { id: 'theme-midnight', category: 'Themes', title: 'Midnight Stealth (OLED Dark)', icon: Palette, badge: profile.theme === 'midnight' ? 'Active' : undefined, action: () => setTheme('midnight') },
  ];

  const questCommands: CommandItem[] = quests.map(q => ({
    id: `quest-${q.id}`,
    category: 'Missions',
    title: q.title,
    subtitle: `${q.difficulty} • +${q.xpReward} XP`,
    icon: q.completed ? CheckSquare : Zap,
    action: () => openQuestDetail(q),
  }));

  const actionCommands: CommandItem[] = [
    { id: 'act-wizard', category: 'Customization', title: 'Open Character & Journey Setup Wizard', icon: Sparkles, badge: 'Customizer', action: startOnboarding },
    { id: 'act-focus', category: 'Quick Action', title: 'Start Focus Mode on Apex Quest', icon: Timer, action: () => {
      const topQuest = quests.find(q => !q.completed) || quests[0];
      if (topQuest) startFocusMode(topQuest);
    }},
    { id: 'act-sound', category: 'Quick Action', title: profile.soundEnabled ? 'Mute Procedural Sound Effects' : 'Enable Procedural Sound Effects', icon: profile.soundEnabled ? VolumeX : Volume2, action: toggleSound },
  ];

  const allCommands = [...actionCommands, ...navigationCommands, ...themeCommands, ...questCommands];

  const filteredCommands = query.trim() === ''
    ? allCommands.slice(0, 10)
    : allCommands.filter(c => 
        c.title.toLowerCase().includes(query.toLowerCase()) || 
        c.category.toLowerCase().includes(query.toLowerCase()) ||
        c.subtitle?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsCommandPaletteOpen(false);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command, quest, or jump to screen... (esc to exit)"
            className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.map((cmd, idx) => {
            const Icon = cmd.icon;
            const isSelected = idx === selectedIndex;

            return (
              <div
                key={cmd.id}
                onClick={() => {
                  sounds.playClick();
                  cmd.action();
                  setIsCommandPaletteOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate min-w-0">
                    <div className="text-xs sm:text-sm font-extrabold truncate">
                      {cmd.title}
                    </div>
                    {cmd.subtitle && (
                      <div className={`text-[11px] truncate font-medium ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                        {cmd.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {cmd.badge && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-500 text-white">
                      {cmd.badge}
                    </span>
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cmd.category}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredCommands.length === 0 && (
            <div className="py-8 text-center text-xs font-bold text-slate-400">
              No matching commands or quests found.
            </div>
          )}
        </div>

        {/* Keyboard Helper Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] font-bold text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-white border shadow-xs text-slate-600">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white border shadow-xs text-slate-600">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white border shadow-xs text-slate-600">esc</kbd> Close</span>
          </div>
          <span className="text-brand-600 font-extrabold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> LifeQuest ⌘K
          </span>
        </div>
      </div>
    </div>
  );
};
