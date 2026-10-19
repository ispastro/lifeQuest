import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  PlayerProfile, 
  Campaign, 
  Quest, 
  DayStage, 
  SkillNode, 
  Achievement, 
  ShopItem, 
  ActiveTab,
  AppTheme,
  WeeklyBoss
} from '../types';
import { 
  initialPlayerProfile, 
  initialCampaigns, 
  initialQuests, 
  initialDayStages, 
  initialSkillNodes, 
  initialAchievements, 
  initialShopItems,
  initialWeeklyBoss,
  alternateBosses
} from '../data/initialData';
import { sounds } from '../utils/soundEffects';

interface CelebrationPayload {
  type: 'quest' | 'level' | 'achievement' | 'purchase' | 'boss';
  title: string;
  subtitle?: string;
  xp?: number;
  gems?: number;
}

interface GameContextType {
  profile: PlayerProfile;
  campaigns: Campaign[];
  quests: Quest[];
  dayStages: DayStage[];
  skills: SkillNode[];
  achievements: Achievement[];
  shopItems: ShopItem[];
  currentBoss: WeeklyBoss;
  bossDamageFloater: { id: string; amount: number; isCrit: boolean } | null;
  activeTab: ActiveTab;
  selectedQuest: Quest | null;
  focusQuest: Quest | null;
  isFocusModeOpen: boolean;
  isCommandPaletteOpen: boolean;
  isOnboardingOpen: boolean;
  isAuthModalOpen: boolean;
  celebration: CelebrationPayload | null;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedQuest: (quest: Quest | null) => void;
  openQuestDetail: (quest: Quest) => void;
  closeQuestDetail: () => void;
  startFocusMode: (quest: Quest) => void;
  closeFocusMode: () => void;
  damageBoss: (amount: number, isCrit?: boolean) => void;
  switchBoss: (bossId: string) => void;
  resetBoss: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  createAccount: (data: { name: string; email: string; password?: string; pinCode?: string; title?: string; playerClass?: string }) => void;
  loginAccount: (email: string, password?: string) => boolean;
  logoutAccount: () => void;
  startOnboarding: () => void;
  completeOnboarding: (data: { profile: Partial<PlayerProfile>; campaigns?: Campaign[]; quests?: Quest[] }) => void;
  setIsOnboardingOpen: (open: boolean) => void;
  toggleQuestCompletion: (questId: string) => void;
  completeQuest: (questId: string, notes?: string, evidence?: string) => void;
  addQuest: (quest: Omit<Quest, 'id' | 'completed' | 'focusTimeSpent'>) => void;
  updateQuest: (quest: Quest) => void;
  deleteQuest: (questId: string) => void;
  unlockSkill: (skillId: string) => void;
  buyShopItem: (itemId: string) => boolean;
  addCustomShopItem: (item: Omit<ShopItem, 'id' | 'purchasedCount' | 'isCustom'>) => void;
  addCustomCampaign: (campaign: Omit<Campaign, 'progress' | 'totalMilestones' | 'completedMilestones'>) => void;
  setTheme: (theme: AppTheme) => void;
  updateProfile: (updates: Partial<PlayerProfile>) => void;
  toggleSound: () => void;
  toggleAnimations: () => void;
  clearCelebration: () => void;
  logFocusTime: (questId: string, seconds: number) => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  resetToDefaults: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'lifequest_profile_v2',
  QUESTS: 'lifequest_quests_v2',
  CAMPAIGNS: 'lifequest_campaigns_v2',
  DAYS: 'lifequest_days_v2',
  SKILLS: 'lifequest_skills_v2',
  ACHIEVEMENTS: 'lifequest_achievements_v2',
  SHOP: 'lifequest_shop_v2',
  BOSS: 'lifequest_boss_v2',
  ACCOUNTS: 'lifequest_accounts_v2',
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or fallback to defaults
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialPlayerProfile;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTS);
    return saved ? JSON.parse(saved) : initialQuests;
  });

  const [dayStages, setDayStages] = useState<DayStage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DAYS);
    return saved ? JSON.parse(saved) : initialDayStages;
  });

  const [skills, setSkills] = useState<SkillNode[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : initialSkillNodes;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHOP);
    return saved ? JSON.parse(saved) : initialShopItems;
  });

  const [currentBoss, setCurrentBoss] = useState<WeeklyBoss>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOSS);
    return saved ? JSON.parse(saved) : initialWeeklyBoss;
  });

  const [bossDamageFloater, setBossDamageFloater] = useState<{ id: string; amount: number; isCrit: boolean } | null>(null);

  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [focusQuest, setFocusQuest] = useState<Quest | null>(null);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [celebration, setCelebration] = useState<CelebrationPayload | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!saved) return true;
    try {
      const parsed = JSON.parse(saved);
      return !parsed.onboardingCompleted && !localStorage.getItem('lifequest_skipped_onboarding');
    } catch {
      return false;
    }
  });

  // Sync sound setting to sound synthesizer
  useEffect(() => {
    sounds.enabled = profile.soundEnabled;
  }, [profile.soundEnabled]);

  // Apply theme class to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', profile.theme || 'emerald');
    if (profile.theme === 'midnight') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.theme]);

  // Global Keyboard Shortcuts (⌘K, /, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K opens Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sounds.playClick();
        setIsCommandPaletteOpen(prev => !prev);
      }
      // '/' opens command palette when not typing in form field
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        sounds.playClick();
        setIsCommandPaletteOpen(true);
      }
      // Escape closes modals
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (selectedQuest) setSelectedQuest(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, selectedQuest]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DAYS, JSON.stringify(dayStages));
  }, [dayStages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOP, JSON.stringify(shopItems));
  }, [shopItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOSS, JSON.stringify(currentBoss));
  }, [currentBoss]);

  const setActiveTab = (tab: ActiveTab) => {
    sounds.playClick();
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCommandPalette = () => {
    sounds.playClick();
    setIsCommandPaletteOpen(prev => !prev);
  };

  const openQuestDetail = (quest: Quest) => {
    sounds.playClick();
    setSelectedQuest(quest);
  };

  const closeQuestDetail = () => {
    setSelectedQuest(null);
  };

  const startFocusMode = (quest: Quest) => {
    sounds.playClick();
    setFocusQuest(quest);
    setIsFocusModeOpen(true);
    if (selectedQuest) setSelectedQuest(null);
  };

  const closeFocusMode = () => {
    setIsFocusModeOpen(false);
    setFocusQuest(null);
  };

  const triggerConfetti = () => {
    if (!profile.animationsEnabled) return;
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#38bdf8', '#fbbf24', '#a855f7'],
      });
    } catch {
      // ignore in environments without canvas
    }
  };

  const damageBoss = (amount: number, isCrit: boolean = false) => {
    if (isCrit) {
      sounds.playCriticalHit();
    } else {
      sounds.playBossHit();
    }

    setBossDamageFloater({ id: `dmg-${Date.now()}`, amount, isCrit });
    setTimeout(() => {
      setBossDamageFloater(null);
    }, 1800);

    setCurrentBoss(prev => {
      if (prev.defeated) return prev;
      const nextHp = Math.max(0, prev.currentHp - amount);
      const isDefeatedNow = nextHp === 0 && !prev.defeated;

      if (isDefeatedNow) {
        sounds.playBossDefeat();
        triggerConfetti();
        setProfile(p => ({
          ...p,
          currentXp: p.currentXp + prev.rewardXp,
          gems: p.gems + prev.rewardGems,
        }));
        setCelebration({
          type: 'boss',
          title: `🏆 RAID BOSS BANISHED!`,
          subtitle: `You conquered ${prev.name}!`,
          xp: prev.rewardXp,
          gems: prev.rewardGems,
        });
        return {
          ...prev,
          currentHp: 0,
          defeated: true,
          defeatedAt: new Date().toISOString(),
        };
      }

      return {
        ...prev,
        currentHp: nextHp,
      };
    });
  };

  const switchBoss = (bossId: string) => {
    const found = alternateBosses.find(b => b.id === bossId);
    if (found) {
      sounds.playClick();
      setCurrentBoss(found);
    }
  };

  const resetBoss = () => {
    sounds.playClick();
    setCurrentBoss(prev => ({
      ...prev,
      currentHp: prev.maxHp,
      defeated: false,
      defeatedAt: undefined,
    }));
  };

  const completeQuest = (questId: string, notes?: string, evidence?: string) => {
    const target = quests.find(q => q.id === questId);
    if (!target) return;
    if (target.completed) return;

    const updatedQuests = quests.map(q => {
      if (q.id === questId) {
        return {
          ...q,
          completed: true,
          completedAt: new Date().toISOString(),
          notes: notes !== undefined ? notes : q.notes,
          evidence: evidence !== undefined ? evidence : q.evidence,
        };
      }
      return q;
    });

    setQuests(updatedQuests);

    let newXp = profile.currentXp + target.xpReward;
    let newLevel = profile.level;
    let newXpToNext = profile.xpToNextLevel;
    let leveledUp = false;

    if (newXp >= profile.xpToNextLevel) {
      leveledUp = true;
      newLevel += 1;
      newXp = newXp - profile.xpToNextLevel;
      newXpToNext = Math.round(profile.xpToNextLevel * 1.25);
    }

    const newGems = profile.gems + target.gemReward;

    setProfile(prev => ({
      ...prev,
      level: newLevel,
      currentXp: newXp,
      xpToNextLevel: newXpToNext,
      gems: newGems,
    }));

    // Update campaign progress
    setCampaigns(prev => prev.map(c => {
      if (c.id === target.campaignId) {
        const total = c.totalMilestones;
        const currentCompleted = Math.min(total, c.completedMilestones + 1);
        return {
          ...c,
          completedMilestones: currentCompleted,
          progress: Math.min(100, Math.round((currentCompleted / total) * 100)),
        };
      }
      return c;
    }));

    // Inflict damage on Weekly Raid Boss!
    const baseDamage = target.difficulty === 'Epic' || target.difficulty === 'Legendary'
      ? 350
      : target.difficulty === 'Hard'
      ? 240
      : target.difficulty === 'Medium'
      ? 160
      : 90;
    const isCrit = target.difficulty === 'Epic' || target.difficulty === 'Legendary' || target.isRecommended === true;
    damageBoss(baseDamage, isCrit);

    if (leveledUp) {
      sounds.playLevelUp();
      triggerConfetti();
      setCelebration({
        type: 'level',
        title: `LEVEL UP! Level ${newLevel}`,
        subtitle: `Awesome work! Conquered "${target.title}"`,
        xp: target.xpReward,
        gems: target.gemReward,
      });
    } else {
      sounds.playQuestComplete();
      triggerConfetti();
      setCelebration({
        type: 'quest',
        title: 'Mission Conquered!',
        subtitle: target.title,
        xp: target.xpReward,
        gems: target.gemReward,
      });
    }

    if (selectedQuest?.id === questId) {
      setSelectedQuest(null);
    }
  };

  const toggleQuestCompletion = (questId: string) => {
    const target = quests.find(q => q.id === questId);
    if (!target) return;

    if (!target.completed) {
      completeQuest(questId);
    } else {
      sounds.playClick();
      setQuests(prev => prev.map(q => q.id === questId ? { ...q, completed: false, completedAt: undefined } : q));
      setProfile(prev => ({
        ...prev,
        currentXp: Math.max(0, prev.currentXp - target.xpReward),
        gems: Math.max(0, prev.gems - target.gemReward),
      }));
    }
  };

  const addQuest = (newQuestData: Omit<Quest, 'id' | 'completed' | 'focusTimeSpent'>) => {
    sounds.playCoin();
    const newQuest: Quest = {
      ...newQuestData,
      id: `quest-${Date.now()}`,
      completed: false,
      focusTimeSpent: 0,
    };
    setQuests(prev => [newQuest, ...prev]);
  };

  const updateQuest = (updated: Quest) => {
    sounds.playClick();
    setQuests(prev => prev.map(q => q.id === updated.id ? updated : q));
    if (selectedQuest?.id === updated.id) {
      setSelectedQuest(updated);
    }
  };

  const deleteQuest = (questId: string) => {
    sounds.playClick();
    setQuests(prev => prev.filter(q => q.id !== questId));
    if (selectedQuest?.id === questId) {
      setSelectedQuest(null);
    }
  };

  const unlockSkill = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    if (!skill || skill.status !== 'available') return;
    if (profile.currentXp < skill.xpCost) return;

    sounds.playLevelUp();
    triggerConfetti();

    setProfile(prev => ({
      ...prev,
      currentXp: prev.currentXp - skill.xpCost,
    }));

    setSkills(prev => prev.map(s => s.id === skillId ? { ...s, status: 'completed' } : s));
    setCelebration({
      type: 'achievement',
      title: 'Skill Mastered!',
      subtitle: skill.title,
      xp: 0,
      gems: 25,
    });
  };

  const buyShopItem = (itemId: string): boolean => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return false;
    if (profile.gems < item.cost) {
      return false;
    }

    sounds.playCoin();
    triggerConfetti();

    setProfile(prev => ({
      ...prev,
      gems: prev.gems - item.cost,
      streakFreezeCount: item.id === 'shop-1' ? prev.streakFreezeCount + 1 : prev.streakFreezeCount,
    }));

    setShopItems(prev => prev.map(i => i.id === itemId ? { ...i, purchasedCount: i.purchasedCount + 1 } : i));

    setCelebration({
      type: 'purchase',
      title: 'Reward Redeemed!',
      subtitle: item.title,
      gems: -item.cost,
    });

    return true;
  };

  const addCustomShopItem = (newItemData: Omit<ShopItem, 'id' | 'purchasedCount' | 'isCustom'>) => {
    sounds.playCoin();
    const item: ShopItem = {
      ...newItemData,
      id: `custom-reward-${Date.now()}`,
      purchasedCount: 0,
      isCustom: true,
    };
    setShopItems(prev => [item, ...prev]);
  };

  const addCustomCampaign = (newCamp: Omit<Campaign, 'progress' | 'totalMilestones' | 'completedMilestones'>) => {
    sounds.playCoin();
    const camp: Campaign = {
      ...newCamp,
      progress: 0,
      totalMilestones: newCamp.milestones.length,
      completedMilestones: 0,
      isCustom: true,
    };
    setCampaigns(prev => [...prev, camp]);
  };

  const setTheme = (theme: AppTheme) => {
    sounds.playClick();
    setProfile(prev => ({ ...prev, theme }));
  };

  const updateProfile = (updates: Partial<PlayerProfile>) => {
    sounds.playClick();
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const logFocusTime = (questId: string, seconds: number) => {
    setQuests(prev => prev.map(q => {
      if (q.id === questId) {
        return {
          ...q,
          focusTimeSpent: (q.focusTimeSpent || 0) + seconds,
        };
      }
      return q;
    }));

    setDayStages(prev => prev.map(d => {
      if (d.isCurrentDay) {
        return {
          ...d,
          focusMinutes: d.focusMinutes + Math.round(seconds / 60),
          focusSessionsCount: d.focusSessionsCount + 1,
        };
      }
      return d;
    }));
  };

  const toggleSound = () => {
    setProfile(prev => {
      const next = !prev.soundEnabled;
      sounds.enabled = next;
      if (next) sounds.playClick();
      return { ...prev, soundEnabled: next };
    });
  };

  const toggleAnimations = () => {
    sounds.playClick();
    setProfile(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
  };

  const clearCelebration = () => {
    setCelebration(null);
  };

  const exportData = (): string => {
    const data = {
      profile,
      quests,
      campaigns,
      dayStages,
      skills,
      achievements,
      shopItems,
      currentBoss,
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.quests) setQuests(parsed.quests);
      if (parsed.campaigns) setCampaigns(parsed.campaigns);
      if (parsed.dayStages) setDayStages(parsed.dayStages);
      if (parsed.skills) setSkills(parsed.skills);
      if (parsed.achievements) setAchievements(parsed.achievements);
      if (parsed.shopItems) setShopItems(parsed.shopItems);
      if (parsed.currentBoss) setCurrentBoss(parsed.currentBoss);
      sounds.playLevelUp();
      return true;
    } catch {
      return false;
    }
  };

  const openAuthModal = () => {
    sounds.playClick();
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const createAccount = (data: { 
    name: string; 
    email: string; 
    password?: string; 
    pinCode?: string; 
    title?: string; 
    playerClass?: string 
  }) => {
    sounds.playLevelUp();
    triggerConfetti();

    const accountId = `usr-${Date.now()}`;
    const newProfileUpdates: Partial<PlayerProfile> = {
      name: data.name,
      email: data.email,
      accountId,
      isRegistered: true,
      createdAt: new Date().toISOString(),
      title: data.title || profile.title,
      playerClass: data.playerClass || profile.playerClass,
      pinCode: data.pinCode,
      onboardingCompleted: true,
    };

    setProfile(prev => ({
      ...prev,
      ...newProfileUpdates,
      gems: prev.gems + 50,
    }));

    // Save to stored accounts catalog
    try {
      const existing = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      const accountsList = existing ? JSON.parse(existing) : [];
      const updatedList = [
        ...accountsList.filter((a: any) => a.email.toLowerCase() !== data.email.toLowerCase()),
        {
          id: accountId,
          email: data.email,
          name: data.name,
          title: data.title || profile.title,
          password: data.password || '',
          pinCode: data.pinCode || '',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(updatedList));
    } catch {
      // ignore
    }

    setIsAuthModalOpen(false);

    setCelebration({
      type: 'level',
      title: `Account Registered!`,
      subtitle: `Welcome aboard, ${data.name}! +50 Bonus Gems Awarded 💎`,
      gems: 50,
    });
  };

  const loginAccount = (email: string, password?: string): boolean => {
    try {
      const existing = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      const accountsList = existing ? JSON.parse(existing) : [];
      const found = accountsList.find((a: any) => a.email.toLowerCase() === email.toLowerCase());

      if (found) {
        if (found.password && password && found.password !== password) {
          return false;
        }

        sounds.playLevelUp();
        triggerConfetti();
        setProfile(prev => ({
          ...prev,
          name: found.name || prev.name,
          email: found.email,
          title: found.title || prev.title,
          accountId: found.id,
          isRegistered: true,
          pinCode: found.pinCode,
        }));
        setIsAuthModalOpen(false);
        setCelebration({
          type: 'level',
          title: `Welcome back, ${found.name}!`,
          subtitle: `Local adventure vault authenticated.`,
        });
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  };

  const logoutAccount = () => {
    sounds.playClick();
    setProfile(prev => ({
      ...prev,
      isRegistered: false,
      email: undefined,
      accountId: undefined,
      pinCode: undefined,
    }));
  };

  const startOnboarding = () => {
    sounds.playClick();
    setIsOnboardingOpen(true);
  };

  const completeOnboarding = (data: { profile: Partial<PlayerProfile>; campaigns?: Campaign[]; quests?: Quest[] }) => {
    sounds.playLevelUp();
    triggerConfetti();
    setProfile(prev => ({ ...prev, ...data.profile, onboardingCompleted: true }));
    if (data.campaigns && data.campaigns.length > 0) {
      setCampaigns(data.campaigns);
    }
    if (data.quests && data.quests.length > 0) {
      setQuests(data.quests);
    }
    setIsOnboardingOpen(false);
    setCelebration({
      type: 'level',
      title: 'Expedition Customizer Completed!',
      subtitle: `Welcome to LifeQuest, ${data.profile.name || profile.name}!`,
      gems: 50,
    });
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setProfile(initialPlayerProfile);
    setQuests(initialQuests);
    setCampaigns(initialCampaigns);
    setDayStages(initialDayStages);
    setSkills(initialSkillNodes);
    setAchievements(initialAchievements);
    setShopItems(initialShopItems);
    setCurrentBoss(initialWeeklyBoss);
    sounds.playCoin();
  };

  return (
    <GameContext.Provider
      value={{
        profile,
        campaigns,
        quests,
        dayStages,
        skills,
        achievements,
        shopItems,
        currentBoss,
        bossDamageFloater,
        activeTab,
        selectedQuest,
        focusQuest,
        isFocusModeOpen,
        isCommandPaletteOpen,
        isOnboardingOpen,
        isAuthModalOpen,
        celebration,
        setActiveTab,
        setSelectedQuest,
        openQuestDetail,
        closeQuestDetail,
        startFocusMode,
        closeFocusMode,
        damageBoss,
        switchBoss,
        resetBoss,
        openAuthModal,
        closeAuthModal,
        createAccount,
        loginAccount,
        logoutAccount,
        startOnboarding,
        completeOnboarding,
        setIsOnboardingOpen,
        toggleQuestCompletion,
        completeQuest,
        addQuest,
        updateQuest,
        deleteQuest,
        unlockSkill,
        buyShopItem,
        addCustomShopItem,
        addCustomCampaign,
        setTheme,
        updateProfile,
        toggleSound,
        toggleAnimations,
        clearCelebration,
        logFocusTime,
        setIsCommandPaletteOpen,
        toggleCommandPalette,
        exportData,
        importData,
        resetToDefaults,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
