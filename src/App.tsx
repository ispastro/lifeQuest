import React from 'react';
import { useGame } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { PlayerHome } from './components/home/PlayerHome';
import { WeeklyJourney } from './components/journey/WeeklyJourney';
import { WeeklyPlanning } from './components/planning/WeeklyPlanning';
import { CampaignMap } from './components/campaigns/CampaignMap';
import { SkillTree } from './components/skills/SkillTree';
import { AchievementsGallery } from './components/achievements/AchievementsGallery';
import { RewardShop } from './components/shop/RewardShop';
import { WeeklyReview } from './components/review/WeeklyReview';
import { SettingsStudio } from './components/settings/SettingsStudio';
import { QuestDetailModal } from './components/quests/QuestDetailModal';
import { FocusModeModal } from './components/focus/FocusModeModal';
import { CelebrationModal } from './components/common/CelebrationModal';
import { CommandPalette } from './components/common/CommandPalette';
import { CharacterCreationWizard } from './components/onboarding/CharacterCreationWizard';
import { PwaInstallPrompt } from './components/common/PwaInstallPrompt';
import { BossBattleArena } from './components/boss/BossBattleArena';
import { AuthModal } from './components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { activeTab, toggleCommandPalette, profile } = useGame();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <PlayerHome />;
      case 'journey':
        return <WeeklyJourney />;
      case 'planning':
        return <WeeklyPlanning />;
      case 'campaigns':
        return <CampaignMap />;
      case 'skills':
        return <SkillTree />;
      case 'achievements':
        return <AchievementsGallery />;
      case 'shop':
        return <RewardShop />;
      case 'review':
        return <WeeklyReview />;
      case 'settings':
        return <SettingsStudio />;
      case 'boss':
        return <BossBattleArena />;
      default:
        return <PlayerHome />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      profile.theme === 'midnight' 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-100/80 text-slate-900'
    }`}>
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar />

      {/* Main Screen Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-24 lg:pb-12">
        {renderActiveScreen()}
      </main>

      {/* Floating Command Palette Quick Pill (Desktop & Mobile) */}
      <div className="fixed bottom-20 lg:bottom-5 left-4 z-30">
        <button
          onClick={toggleCommandPalette}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md text-xs font-bold text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-all active:scale-95 touch-manipulation group"
          title="Press ⌘K or / to open Command Menu"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="hidden sm:inline text-slate-400 font-mono">⌘K</span>
          <span className="font-extrabold text-[11px]">Command Menu</span>
        </button>
      </div>

      {/* Interactive Overlays & Modals */}
      <QuestDetailModal />
      <FocusModeModal />
      <CelebrationModal />
      <CommandPalette />
      <CharacterCreationWizard />
      <PwaInstallPrompt />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
