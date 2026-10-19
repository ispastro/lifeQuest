export type CampaignId = string;

export interface CampaignMilestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'locked';
  xpReward: number;
  order: number;
}

export interface Campaign {
  id: CampaignId;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  progress: number;
  totalMilestones: number;
  completedMilestones: number;
  milestones: CampaignMilestone[];
  isCustom?: boolean;
}

export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Epic' | 'Legendary';

export interface Quest {
  id: string;
  title: string;
  campaignId: CampaignId;
  difficulty: QuestDifficulty;
  estimatedDuration: number; // in minutes
  xpReward: number;
  gemReward: number;
  completed: boolean;
  completedAt?: string;
  scheduledDate: string; // YYYY-MM-DD
  objective: string;
  whyItMatters: string;
  expectedResult: string;
  acceptanceCriteria: string[];
  notes?: string;
  evidence?: string;
  focusTimeSpent: number; // in seconds
  isRecommended?: boolean;
}

export type DayType = 'light' | 'full_work' | 'deep_project' | 'personal_dev' | 'rest';

export interface DayStage {
  date: string; // YYYY-MM-DD
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dayName: string; // Monday, Tuesday...
  dayType: DayType;
  targetHours: number;
  focusMinutes: number;
  focusSessionsCount: number;
  isCurrentDay: boolean;
  isCompleted: boolean;
  theme: string;
  statusText: string;
}

export interface SkillNode {
  id: string;
  category: 'Backend' | 'AI Engineering' | 'System Design' | 'Database' | 'Production' | 'Communication' | 'Career';
  title: string;
  level: number;
  maxLevel: number;
  description: string;
  status: 'completed' | 'in_progress' | 'available' | 'locked';
  xpCost: number;
  prerequisites: string[];
  icon: string;
  perks: string[];
}

export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: AchievementRarity;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  rewardXp: number;
  rewardGems: number;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  category: 'Gear' | 'Real Life Treat' | 'Power-Up' | 'Cosmetic';
  purchasedCount: number;
  isCustom?: boolean;
}

export type AppTheme = 'emerald' | 'sapphire' | 'amethyst' | 'sunset' | 'midnight';

export interface PlayerProfile {
  name: string;
  handle: string;
  title: string;
  level: number;
  levelTitle: string;
  currentXp: number;
  xpToNextLevel: number;
  streakDays: number;
  streakFreezeCount: number;
  gems: number;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  theme: AppTheme;
  avatarColor: string;
  playerClass?: string;
  onboardingCompleted?: boolean;
}

export type ActiveTab = 
  | 'home' 
  | 'journey' 
  | 'planning' 
  | 'campaigns' 
  | 'skills' 
  | 'achievements' 
  | 'shop' 
  | 'review'
  | 'settings'
  | 'boss';

export interface BossAttack {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface WeeklyBoss {
  id: string;
  name: string;
  title: string;
  description: string;
  category: 'Distributed Systems' | 'AI & LLM Infra' | 'Legacy Code' | 'Production Chaos';
  maxHp: number;
  currentHp: number;
  defeated: boolean;
  defeatedAt?: string;
  rewardXp: number;
  rewardGems: number;
  weakness: string;
  dialogue: {
    intro: string;
    taunt: string;
    hit: string;
    defeat: string;
  };
  attacks: BossAttack[];
}

