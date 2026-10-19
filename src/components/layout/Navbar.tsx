import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  Map, 
  Compass, 
  Award, 
  ShoppingBag, 
  BookOpen, 
  CheckSquare,
  Home,
  Menu,
  X,
  History,
  Settings,
  Search,
  Sword,
  UserPlus,
  UserCheck
} from 'lucide-react';
import { ActiveTab } from '../../types';

export const Navbar: React.FC = () => {
  const { profile, activeTab, setActiveTab, toggleSound, toggleCommandPalette, openAuthModal } = useGame();
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  const xpPercent = Math.min(100, Math.round((profile.currentXp / profile.xpToNextLevel) * 100));

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'boss', label: 'Raid Arena ⚔️', icon: Sword },
    { id: 'journey', label: '7-Day Journey', icon: Compass },
    { id: 'planning', label: 'Planning', icon: CheckSquare },
    { id: 'campaigns', label: 'Campaigns', icon: Map },
    { id: 'skills', label: 'Skill Tree', icon: BookOpen },
    { id: 'achievements', label: 'Badges', icon: Award },
    { id: 'shop', label: 'Rewards', icon: ShoppingBag },
    { id: 'review', label: 'Review', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMobileNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileMoreOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all pt-safe">
        {/* Top Status & Currency Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-18 gap-2 sm:gap-4">
            
            {/* Brand Logo & Mascot Avatar */}
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none flex-shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-1.5 shadow-tactile-green group-hover:-translate-y-0.5 group-active:translate-y-0.5 transition-all">
                <img src="/logo.svg" alt="LifeQuest" className="w-full h-full drop-shadow" />
              </div>
              <div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                    LifeQuest
                  </span>
                  <span className="bg-brand-100 text-brand-800 text-[9px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2 py-0.2 rounded-full border border-brand-200">
                    PWA
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold -mt-0.5 hidden sm:block">
                  Level Up Your Life & Engineering
                </p>
              </div>
            </div>

            {/* Player Stats Pills: Level, Streak, Currency */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-1 justify-end">
              
              {/* Level & XP Gauge (Desktop & Tablet) */}
              <div className="hidden md:flex flex-col flex-1 max-w-[200px]">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
                  <span className="flex items-center gap-1 text-brand-700 font-black">
                    <span className="bg-brand-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-extrabold">
                      LVL {profile.level}
                    </span>
                    <span className="truncate max-w-[100px]">{profile.levelTitle}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold tabular-nums">
                    {profile.currentXp}/{profile.xpToNextLevel} XP
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>

              {/* Mobile Level Badge (Compact) */}
              <div className="md:hidden flex items-center bg-brand-50 border border-brand-200 px-2 py-1 rounded-xl">
                <span className="text-[10px] font-black text-brand-800">
                  LVL {profile.level}
                </span>
              </div>

              {/* Streak Counter Pill */}
              <div 
                title={`${profile.streakDays} Day Streak! ${profile.streakFreezeCount} Freeze Shields available`}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/90 rounded-2xl shadow-sm cursor-default"
              >
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-black text-orange-700 tabular-nums">
                  {profile.streakDays}
                </span>
                {profile.streakFreezeCount > 0 && (
                  <span className="hidden sm:flex items-center gap-0.5 bg-sky-100 text-sky-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 border border-sky-200">
                    <ShieldCheck className="w-3 h-3 text-sky-600" />
                    {profile.streakFreezeCount}
                  </span>
                )}
              </div>

              {/* Gems / Sparks Currency Pill */}
              <div 
                onClick={() => setActiveTab('shop')}
                title="LifeQuest Gems: Tap to open Bazaar"
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/90 rounded-2xl shadow-sm hover:border-emerald-300 cursor-pointer transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 fill-emerald-300 animate-sparkle" />
                <span className="text-xs sm:text-sm font-black text-emerald-700 tabular-nums">
                  {profile.gems}
                </span>
              </div>

              {/* Sound Mute/Unmute Quick Toggle */}
              <button
                onClick={toggleSound}
                aria-label={profile.soundEnabled ? "Mute audio" : "Enable audio"}
                className="p-1.5 sm:p-2 rounded-2xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:scale-95 transition-all touch-manipulation"
                title={profile.soundEnabled ? "Sound Effects: ON" : "Sound Effects: OFF"}
              >
                {profile.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-brand-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Command Palette ⌘K Trigger (Desktop/Tablet) */}
              <button
                onClick={toggleCommandPalette}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-95 touch-manipulation"
                title="Search & Commands (⌘K or /)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] font-mono text-slate-400">⌘K</span>
              </button>

              {/* Account / Hero Vault Trigger */}
              {profile.isRegistered ? (
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-700 active:scale-95 transition-all cursor-pointer shadow-sm touch-manipulation"
                  title={`Hero Vault: Registered as ${profile.email || profile.name}. Click to switch or manage account.`}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <span className="hidden sm:inline font-extrabold max-w-[85px] truncate text-slate-800">
                    {profile.name}
                  </span>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-xs shadow-tactile-orange active:translate-y-0.5 transition-all cursor-pointer touch-manipulation"
                  title="Create an account to save your hero progress (+50 Bonus Gems)"
                >
                  <UserPlus className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="hidden sm:inline">Save Hero</span>
                  <span className="bg-white/25 text-white text-[10px] px-1 py-0.2 rounded font-black hidden md:inline">
                    +50💎
                  </span>
                </button>
              )}

              {/* Settings Gear Shortcut */}
              <button
                onClick={() => setActiveTab('settings')}
                className="p-1.5 sm:p-2 rounded-2xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:scale-95 transition-all touch-manipulation"
                title="Settings & Themes"
              >
                <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-brand-600' : 'text-slate-500'}`} />
              </button>

              {/* Profile Avatar */}
              <div 
                onClick={() => setActiveTab('settings')}
                className="flex items-center pl-1 border-l border-slate-200 cursor-pointer"
                title={`Edit Player Persona (${profile.name})`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm ring-2 ring-brand-400 ring-offset-1">
                  {profile.name ? profile.name.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'LQ'}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 pb-2 -mt-0.5 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.id === 'journey' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Thumb Zone Optimized) */}
      <nav 
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] bottom-nav-safe"
      >
        <div className="grid grid-cols-5 items-center max-w-lg mx-auto px-1 pt-1">
          {/* Tab 1: Home */}
          <button
            onClick={() => handleMobileNavClick('home')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95 touch-manipulation ${
              activeTab === 'home' ? 'text-brand-600 font-extrabold' : 'text-slate-500 font-semibold'
            }`}
          >
            <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5">Home</span>
          </button>

          {/* Tab 2: 7-Day Journey */}
          <button
            onClick={() => handleMobileNavClick('journey')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95 touch-manipulation ${
              activeTab === 'journey' ? 'text-brand-600 font-extrabold' : 'text-slate-500 font-semibold'
            }`}
          >
            <div className="relative">
              <Compass className={`w-5 h-5 ${activeTab === 'journey' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            </div>
            <span className="text-[10px] mt-0.5">Journey</span>
          </button>

          {/* Tab 3: Planning */}
          <button
            onClick={() => handleMobileNavClick('planning')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95 touch-manipulation ${
              activeTab === 'planning' ? 'text-brand-600 font-extrabold' : 'text-slate-500 font-semibold'
            }`}
          >
            <CheckSquare className={`w-5 h-5 ${activeTab === 'planning' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5">Plan</span>
          </button>

          {/* Tab 4: Campaigns */}
          <button
            onClick={() => handleMobileNavClick('campaigns')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95 touch-manipulation ${
              activeTab === 'campaigns' ? 'text-brand-600 font-extrabold' : 'text-slate-500 font-semibold'
            }`}
          >
            <Map className={`w-5 h-5 ${activeTab === 'campaigns' ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5">Campaigns</span>
          </button>

          {/* Tab 5: More (Drawer with Skills, Badges, Shop, Review) */}
          <button
            onClick={() => setIsMobileMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95 touch-manipulation ${
              ['skills', 'achievements', 'shop', 'review'].includes(activeTab) 
                ? 'text-brand-600 font-extrabold' 
                : 'text-slate-500 font-semibold'
            }`}
          >
            <Menu className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* MOBILE "MORE" ACTION DRAWER */}
      {isMobileMoreOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end lg:hidden animate-fade-in"
          onClick={() => setIsMobileMoreOpen(false)}
        >
          <div 
            className="bg-white rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 space-y-4 bottom-nav-safe animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto" />
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">LifeQuest Expeditions</h3>
              <button 
                onClick={() => setIsMobileMoreOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Account Vault Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center font-black text-white text-xs shadow-tactile-green">
                  {profile.name ? profile.name.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'LQ'}
                </div>
                <div>
                  <div className="text-xs font-black flex items-center gap-1.5">
                    <span className="text-white">{profile.name}</span>
                    {profile.isRegistered ? (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded font-black border border-emerald-500/30">
                        SAVED
                      </span>
                    ) : (
                      <span className="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded font-black border border-amber-500/30">
                        GUEST
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-300 truncate max-w-[140px]">
                    {profile.isRegistered ? (profile.email || 'Registered Hero') : 'Unsaved Guest Mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileMoreOpen(false);
                  openAuthModal();
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs shadow-sm active:scale-95 transition-all touch-manipulation ${
                  profile.isRegistered 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-tactile-orange'
                }`}
              >
                {profile.isRegistered ? 'Hero Vault' : 'Save (+50💎)'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleMobileNavClick('skills')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left ${
                  activeTab === 'skills'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">Skill Tree</div>
                  <div className="text-[10px] text-slate-500">Mastery Perks</div>
                </div>
              </button>

              <button
                onClick={() => handleMobileNavClick('achievements')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left ${
                  activeTab === 'achievements'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">Badges</div>
                  <div className="text-[10px] text-slate-500">Milestone Trophies</div>
                </div>
              </button>

              <button
                onClick={() => handleMobileNavClick('shop')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left ${
                  activeTab === 'shop'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">Reward Shop</div>
                  <div className="text-[10px] text-slate-500">{profile.gems} Gems Ready</div>
                </div>
              </button>

              <button
                onClick={() => handleMobileNavClick('review')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left ${
                  activeTab === 'review'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">Weekly Review</div>
                  <div className="text-[10px] text-slate-500">Story Chronicle</div>
                </div>
              </button>

              <button
                onClick={() => handleMobileNavClick('settings')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left col-span-2 ${
                  activeTab === 'settings'
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-200 text-slate-800">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">Customization & Themes</div>
                  <div className="text-[10px] text-slate-500">Aesthetic theme, persona, rewards & campaigns</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
