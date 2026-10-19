import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Palette, 
  User, 
  ShoppingBag, 
  Plus, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  Map, 
  Save,
  Check,
  ShieldCheck,
  UserCheck,
  UserPlus,
  KeyRound,
  LogOut,
  Lock,
  Mail
} from 'lucide-react';
import { AppTheme } from '../../types';
import { sounds } from '../../utils/soundEffects';

export const SettingsStudio: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    setTheme, 
    addCustomShopItem, 
    addCustomCampaign, 
    exportData, 
    importData, 
    resetToDefaults,
    startOnboarding,
    openAuthModal,
    logoutAccount 
  } = useGame();

  // Profile Form state
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [handle, setHandle] = useState(profile.handle);
  const [profileSaved, setProfileSaved] = useState(false);

  // Custom Reward Form state
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardCost, setRewardCost] = useState(250);
  const [rewardDesc, setRewardDesc] = useState('');
  const [rewardCategory, setRewardCategory] = useState<'Real Life Treat' | 'Gear' | 'Power-Up'>('Real Life Treat');
  const [rewardAdded, setRewardAdded] = useState(false);

  // Custom Campaign Form state
  const [campName, setCampName] = useState('');
  const [campTagline, setCampTagline] = useState('');
  const [campColor, setCampColor] = useState('#2563eb');
  const [campAdded, setCampAdded] = useState(false);

  // Import JSON string state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const themes: { id: AppTheme; name: string; desc: string; previewBg: string; border: string }[] = [
    { id: 'emerald', name: 'Emerald Forest', desc: 'Duolingo / Nintendo vitality green', previewBg: 'bg-emerald-500', border: 'border-emerald-600' },
    { id: 'sapphire', name: 'Cyber Sapphire', desc: 'Linear & production engineering blue', previewBg: 'bg-blue-600', border: 'border-blue-700' },
    { id: 'amethyst', name: 'Amethyst Arc', desc: 'AI innovation & high-tech violet', previewBg: 'bg-purple-600', border: 'border-purple-700' },
    { id: 'sunset', name: 'Sunset Ember', desc: 'High-energy habit fire orange', previewBg: 'bg-orange-500', border: 'border-orange-600' },
    { id: 'midnight', name: 'Midnight Stealth', desc: 'OLED deep dark mode', previewBg: 'bg-slate-900', border: 'border-slate-700' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, title, handle });
    sounds.playCoin();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleAddReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim()) return;
    addCustomShopItem({
      title: rewardTitle.trim(),
      description: rewardDesc.trim() || 'Custom real-life victory treat.',
      cost: rewardCost,
      icon: rewardCategory === 'Real Life Treat' ? 'Coffee' : rewardCategory === 'Gear' ? 'Keyboard' : 'Shield',
      category: rewardCategory,
    });
    setRewardTitle('');
    setRewardDesc('');
    setRewardAdded(true);
    setTimeout(() => setRewardAdded(false), 2500);
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName.trim()) return;
    addCustomCampaign({
      id: `camp-${Date.now()}`,
      name: campName.trim(),
      shortName: campName.trim().slice(0, 14),
      tagline: campTagline.trim() || 'A personal high-leverage life campaign.',
      color: campColor,
      badgeBg: 'bg-slate-100',
      badgeText: 'text-slate-800',
      icon: 'Target',
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Milestone 1: Prototype Foundation', description: 'Initial proof of concept', status: 'in_progress', xpReward: 300, order: 1 },
        { id: `m-${Date.now()}-2`, title: 'Milestone 2: Validation & Growth', description: 'Demonstrate real traction', status: 'locked', xpReward: 500, order: 2 },
      ],
    });
    setCampName('');
    setCampTagline('');
    setCampAdded(true);
    setTimeout(() => setCampAdded(false), 2500);
  };

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifequest-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    sounds.playCoin();
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importData(importJsonText);
    if (success) {
      setImportStatus('Save file successfully restored!');
      setImportJsonText('');
    } else {
      setImportStatus('Invalid save file format. Please check JSON syntax.');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* Settings Studio Header */}
      <section className="game-panel p-5 sm:p-7 relative overflow-hidden bg-white border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-brand-100 text-brand-700">
                <Palette className="w-5 h-5" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-brand-700">
                Customization & Power Studio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Personalize Your Experience
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              Customize your aesthetic themes, player persona, custom real-world rewards, and life campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* PLAYER ACCOUNT & SECURITY VAULT CARD */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Hero Account & Security Vault</h2>
              <p className="text-xs text-slate-500 font-medium">
                Local-first authentication, multi-device readiness, and PIN save protection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {profile.isRegistered ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Registered & Secured
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Guest / Sandbox Mode
              </span>
            )}
          </div>
        </div>

        {profile.isRegistered ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>Registered Email</span>
                </span>
                <p className="text-xs font-extrabold text-slate-800 truncate">
                  {profile.email || 'Registered Adventurer'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Security Protection</span>
                </span>
                <p className="text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {profile.pinCode ? 'PIN Protected' : 'Active Account'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-slate-400" />
                  <span>Vault Account ID</span>
                </span>
                <p className="text-xs font-mono font-bold text-slate-600 truncate">
                  {profile.accountId || 'HERO-PRIMARY-VAULT'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <p className="text-xs text-slate-500 font-medium">
                Your character data, XP progression, and bazaar inventory are permanently linked to your adventurer profile.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="btn-tactile-secondary py-2 px-3.5 text-xs font-bold gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Switch / Access Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Sign out of your account and switch to Guest Mode? Your progress is saved.')) {
                      logoutAccount();
                    }
                  }}
                  className="px-3.5 py-2 rounded-2xl border border-slate-200 text-slate-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black flex-shrink-0 shadow-tactile-orange">
                ⭐
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  Save your hero & earn +50 Bonus Gems!
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  You are currently playing in Guest Mode. Register an account to protect your progress with a PIN, enable multi-device sync, and unlock extra starting gems.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={openAuthModal}
                className="btn-tactile-primary py-2.5 px-5 text-xs font-black gap-2 shadow-tactile-green"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Free Account (+50 💎)</span>
              </button>
              <button
                type="button"
                onClick={openAuthModal}
                className="btn-tactile-secondary py-2.5 px-4 text-xs font-bold gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-slate-600" />
                <span>Sign In to Existing Account</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* EXPEDITION SETUP WIZARD CARD */}
      <section className="game-panel p-5 sm:p-6 border-2 border-brand-200 bg-gradient-to-r from-brand-50 via-teal-50 to-emerald-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black text-xl shadow-tactile-green flex-shrink-0">
            ⚔️
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>Interactive Character & Adventure Wizard</span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                4-Step Flow
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Re-run the guided setup to configure your engineering archetype, life campaigns, today's daily triad quests, and theme.
            </p>
          </div>
        </div>
        <button
          onClick={startOnboarding}
          className="btn-tactile-primary py-2.5 px-5 text-xs font-black flex-shrink-0 flex items-center justify-center gap-2 touch-manipulation"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Wizard</span>
        </button>
      </section>

      {/* THEME ENGINE SWITCHER */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Palette className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-black text-slate-900">Visual Theme Engine</h2>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Select your visual palette. Transforms all buttons, glows, accent indicators, and mascot style in real-time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {themes.map((t) => {
            const isSelected = profile.theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 shadow-md ring-2 ring-brand-200'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl ${t.previewBg} shadow-sm border ${t.border}`} />
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{t.name}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">{t.desc}</p>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-5 h-5 text-brand-600 stroke-[3]" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* PLAYER IDENTITY CUSTOMIZER */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <User className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-black text-slate-900">Player Persona & Title</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Player Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">Professional Engineering Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-emerald-600">
              {profileSaved && '✓ Profile updated instantly!'}
            </span>
            <button
              type="submit"
              className="btn-tactile-primary py-2 px-5 text-xs font-bold gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Persona</span>
            </button>
          </div>
        </form>
      </section>

      {/* CUSTOM REWARD CREATOR */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShoppingBag className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-black text-slate-900">Create Custom Real-Life Reward</h2>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Add meaningful real-world rewards that motivate you (e.g. Specialty coffee, ergonomic chair upgrade, weekend trip).
        </p>

        <form onSubmit={handleAddReward} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Reward Title</label>
              <input
                type="text"
                value={rewardTitle}
                onChange={(e) => setRewardTitle(e.target.value)}
                placeholder="e.g. 🍣 Omakase Dinner Celebration"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Price in Gems</label>
              <input
                type="number"
                value={rewardCost}
                onChange={(e) => setRewardCost(Number(e.target.value))}
                min={50}
                step={50}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Reward Description / Terms</label>
            <input
              type="text"
              value={rewardDesc}
              onChange={(e) => setRewardDesc(e.target.value)}
              placeholder="e.g. Enjoy after shipping InterviewMe AI v1 release!"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-emerald-600">
              {rewardAdded && '✓ Custom reward published to Bazaar!'}
            </span>
            <button
              type="submit"
              className="btn-tactile-primary py-2 px-4 text-xs font-bold gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Reward Shop</span>
            </button>
          </div>
        </form>
      </section>

      {/* CUSTOM CAMPAIGN CREATOR */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Map className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-black text-slate-900">Forge Custom Campaign Pillar</h2>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Create a personalized long-term endeavor (e.g. "Sub-3:30 Marathon", "Micro-SaaS to $5k MRR").
        </p>

        <form onSubmit={handleAddCampaign} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Campaign Name</label>
              <input
                type="text"
                value={campName}
                onChange={(e) => setCampName(e.target.value)}
                placeholder="e.g. Marathon Endurance Foundation"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Campaign Tagline</label>
              <input
                type="text"
                value={campTagline}
                onChange={(e) => setCampTagline(e.target.value)}
                placeholder="e.g. Build aerobic base and qualify for city marathon"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-emerald-600">
              {campAdded && '✓ New Campaign Track added!'}
            </span>
            <button
              type="submit"
              className="btn-tactile-primary py-2 px-4 text-xs font-bold gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Forge Campaign</span>
            </button>
          </div>
        </form>
      </section>

      {/* SAVE STATE DATA BACKUP & RESTORE */}
      <section className="game-panel p-5 sm:p-7 space-y-4 border-2 border-slate-200">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Download className="w-5 h-5 text-slate-700" />
          <h2 className="text-lg font-black text-slate-900">Save State Backup & Reset</h2>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Export your entire LifeQuest game state to a portable JSON save file, or restore from a previous backup.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
            className="btn-tactile-secondary py-2.5 px-4 text-xs font-bold gap-2"
          >
            <Download className="w-4 h-4 text-brand-600" />
            <span>Export Save File (.json)</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all progress back to pristine demo state?')) {
                resetToDefaults();
              }
            }}
            className="px-4 py-2.5 rounded-2xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* Restore section */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <label className="text-[11px] font-bold text-slate-600 block">Restore from JSON</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON save state here..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
            />
            <button
              onClick={handleImport}
              className="btn-tactile-primary py-2 px-4 text-xs font-bold"
            >
              Restore
            </button>
          </div>
          {importStatus && (
            <p className="text-xs font-bold text-brand-700 mt-1">{importStatus}</p>
          )}
        </div>
      </section>

    </div>
  );
};
