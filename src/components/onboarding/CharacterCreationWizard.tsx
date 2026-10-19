import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PipMascot } from '../mascot/PipMascot';
import { 
  Sparkles, 
  ArrowRight, 
  User, 
  Target, 
  CheckCircle2, 
  Cpu, 
  Bot, 
  Rocket, 
  TrendingUp, 
  Heart, 
  Palette, 
  Zap, 
  Clock, 
  Check, 
  ChevronLeft,
  X
} from 'lucide-react';
import { AppTheme, Campaign, Quest } from '../../types';
import { sounds } from '../../utils/soundEffects';

export const CharacterCreationWizard: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding, setIsOnboardingOpen, profile } = useGame();
  
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState(profile.name || 'Alex');
  const [title, setTitle] = useState(profile.title || 'Staff-Track Systems & AI Engineer');
  const [selectedClass, setSelectedClass] = useState<string>('ai-builder');
  const [selectedTheme, setSelectedTheme] = useState<AppTheme>(profile.theme || 'emerald');

  // Custom Campaigns for this user
  const [c1Name, setC1Name] = useState('InterviewMe AI Product');
  const [c2Name, setC2Name] = useState('Production Engineering Mastery');
  const [c3Name, setC3Name] = useState('Personal Vitality & Deep Focus');

  // Custom Today's Quests
  const [q1Title, setQ1Title] = useState('Implement WebRTC Audio Streaming with Backpressure');
  const [q1Duration, setQ1Duration] = useState(60);
  const [q1Difficulty, setQ1Difficulty] = useState<'Epic' | 'Hard' | 'Medium'>('Epic');

  const [q2Title, setQ2Title] = useState('Profile Linux eBPF Tracepoints for Microservice Latency');
  const [q2Duration, setQ2Duration] = useState(45);
  const [q2Difficulty, setQ2Difficulty] = useState<'Epic' | 'Hard' | 'Medium'>('Hard');

  const [q3Title, setQ3Title] = useState('Review Weekly Financial Ledger & Treasury Allocation');
  const [q3Duration, setQ3Duration] = useState(30);
  const [q3Difficulty, setQ3Difficulty] = useState<'Epic' | 'Hard' | 'Medium'>('Medium');

  if (!isOnboardingOpen) return null;

  const archetypes = [
    { id: 'ai-builder', name: 'The AI Product Builder', desc: 'LLMs, vector pipelines, real-time audio, and shipping revenue', icon: Bot, color: 'text-purple-600 bg-purple-50 border-purple-300' },
    { id: 'systems-architect', name: 'The Systems Architect', desc: 'Distributed consensus, Linux kernel profiling, high QPS resilience', icon: Cpu, color: 'text-blue-600 bg-blue-50 border-blue-300' },
    { id: 'indie-founder', name: 'The Solo Founder / Hacker', desc: 'Building products fast, acquiring customers, bootstrapping $10k MRR', icon: Rocket, color: 'text-brand-600 bg-brand-50 border-brand-300' },
    { id: 'career-climber', name: 'The Staff / Principal Climber', desc: 'Organizational leverage, strategic RFCs, comp negotiation', icon: TrendingUp, color: 'text-amber-600 bg-amber-50 border-amber-300' },
  ];

  const handleSelectArchetype = (archId: string) => {
    sounds.playClick();
    setSelectedClass(archId);
    if (archId === 'ai-builder') {
      setTitle('Senior AI Engineer & Builder');
      setC1Name('AI Software Product');
      setQ1Title('Implement Low-Latency Audio Streaming Pipeline');
    } else if (archId === 'systems-architect') {
      setTitle('Staff Systems Infrastructure Architect');
      setC1Name('Distributed Systems Mastery');
      setQ1Title('Debug eBPF Kernel Locks on Ingestion Cluster');
    } else if (archId === 'indie-founder') {
      setTitle('Founder & Full-Stack Solo Engineer');
      setC1Name('SaaS Product to $5,000 MRR');
      setQ1Title('Ship Stripe Metered Billing & Tiered Landing Page');
    } else if (archId === 'career-climber') {
      setTitle('Staff-Track Tech Lead');
      setC1Name('Executive Staff Promotion Packet');
      setQ1Title('Draft Systems Reliability Impact Business Case');
    }
  };

  const handleFinishCustomization = () => {
    const customCampaigns: Campaign[] = [
      {
        id: 'camp-custom-1',
        name: c1Name,
        shortName: c1Name.slice(0, 16),
        tagline: 'Primary technical endeavor and product milestone ladder.',
        color: '#9333ea',
        badgeBg: 'bg-purple-100',
        badgeText: 'text-purple-700',
        icon: 'Bot',
        progress: 60,
        totalMilestones: 5,
        completedMilestones: 3,
        milestones: [
          { id: 'm1', title: 'Phase 1: Working End-to-End Prototype', description: 'Functional architecture verified', status: 'completed', xpReward: 300, order: 1 },
          { id: 'm2', title: 'Phase 2: Core Engine & Benchmark Verification', description: 'Low latency and resilience passed', status: 'completed', xpReward: 400, order: 2 },
          { id: 'm3', title: 'Phase 3: Production Hardening & Security', description: 'Multi-tenant isolation and automated tests', status: 'completed', xpReward: 500, order: 3 },
          { id: 'm4', title: 'Phase 4: Customer Beta Launch', description: 'Gather qualitative feedback from real users', status: 'in_progress', xpReward: 650, order: 4 },
          { id: 'm5', title: 'Phase 5: First $5,000 Milestone', description: 'Proven commercial sustainability', status: 'locked', xpReward: 1200, order: 5 },
        ],
        isCustom: true,
      },
      {
        id: 'camp-custom-2',
        name: c2Name,
        shortName: c2Name.slice(0, 16),
        tagline: 'Deep engineering mastery and architectural leverage.',
        color: '#2563eb',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-700',
        icon: 'Cpu',
        progress: 70,
        totalMilestones: 4,
        completedMilestones: 3,
        milestones: [
          { id: 'eng1', title: 'Raft Distributed Consensus Implementation', description: 'Leader election and log replication', status: 'completed', xpReward: 500, order: 1 },
          { id: 'eng2', title: 'Linux Performance & eBPF Flamegraphs', description: 'Brendan Gregg performance methodology', status: 'completed', xpReward: 400, order: 2 },
          { id: 'eng3', title: 'Database Migration Pipeline', description: 'Zero-downtime ghost table dual writes', status: 'completed', xpReward: 450, order: 3 },
          { id: 'eng4', title: 'Chaos Engineering Drill & Whitepaper', description: 'Simulate partitions and write RFC', status: 'in_progress', xpReward: 700, order: 4 },
        ],
        isCustom: true,
      },
      {
        id: 'camp-custom-3',
        name: c3Name,
        shortName: c3Name.slice(0, 16),
        tagline: 'Peak cognitive stamina and restorative daily ritual.',
        color: '#ea580c',
        badgeBg: 'bg-orange-100',
        badgeText: 'text-orange-700',
        icon: 'Heart',
        progress: 80,
        totalMilestones: 3,
        completedMilestones: 2,
        milestones: [
          { id: 'per1', title: '7.5 Hours Restorative Sleep Protocol', description: 'Zero screens after 11 PM', status: 'completed', xpReward: 250, order: 1 },
          { id: 'per2', title: 'Daily 90-Min Deep Work Block', description: 'Focus before triage or email', status: 'completed', xpReward: 400, order: 2 },
          { id: 'per3', title: 'Unbroken 30-Day Consistency Streak', description: 'Compound progress every day', status: 'in_progress', xpReward: 800, order: 3 },
        ],
        isCustom: true,
      },
    ];

    const customQuests: Quest[] = [
      {
        id: 'quest-today-1',
        title: q1Title,
        campaignId: 'camp-custom-1',
        difficulty: q1Difficulty,
        estimatedDuration: q1Duration,
        xpReward: q1Difficulty === 'Epic' ? 250 : 180,
        gemReward: 25,
        completed: false,
        scheduledDate: '2026-10-19',
        objective: 'Execute priority apex deliverable with rigorous standards.',
        whyItMatters: 'Moves the needle directly on your primary campaign goal.',
        expectedResult: 'Deliverable completed and verified against criteria.',
        acceptanceCriteria: ['Write implementation code', 'Run automated integration test suite', 'Verify performance bounds'],
        focusTimeSpent: 1200,
        isRecommended: true,
        isDailyBoss: true,
        substeps: [
          { id: 'sub-c1-1', text: 'Write implementation code', completed: false },
          { id: 'sub-c1-2', text: 'Run automated integration test suite', completed: false },
          { id: 'sub-c1-3', text: 'Verify performance bounds', completed: false },
        ],
      },
      {
        id: 'quest-today-2',
        title: q2Title,
        campaignId: 'camp-custom-2',
        difficulty: q2Difficulty,
        estimatedDuration: q2Duration,
        xpReward: 180,
        gemReward: 18,
        completed: true,
        completedAt: new Date().toISOString(),
        scheduledDate: '2026-10-19',
        objective: 'High-leverage engineering milestone task.',
        whyItMatters: 'Demonstrates deep mastery and unblocks dependent roadmap items.',
        expectedResult: 'Completed successfully with documentation.',
        acceptanceCriteria: ['Implement core deliverable', 'Document benchmarks in wiki'],
        focusTimeSpent: 2700,
      },
      {
        id: 'quest-today-3',
        title: q3Title,
        campaignId: 'camp-custom-3',
        difficulty: q3Difficulty,
        estimatedDuration: q3Duration,
        xpReward: 100,
        gemReward: 12,
        completed: true,
        completedAt: new Date().toISOString(),
        scheduledDate: '2026-10-19',
        objective: 'Essential consistency and discipline routine.',
        whyItMatters: 'Protects momentum and builds long-term autonomy.',
        expectedResult: 'Routine verified and recorded.',
        acceptanceCriteria: ['Execute protocol', 'Log progress in tracker'],
        focusTimeSpent: 1800,
      },
    ];

    completeOnboarding({
      profile: {
        name,
        title,
        theme: selectedTheme,
        playerClass: selectedClass,
        onboardingCompleted: true,
      },
      campaigns: customCampaigns,
      quests: customQuests,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92dvh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="relative p-5 sm:p-6 bg-slate-900 text-white flex-shrink-0 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white font-black shadow-tactile-green">
              ⚡
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-400 block">
                Expedition Setup Wizard
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Customize Your LifeQuest Journey
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white/10 text-white">
              Step {step} of 4
            </span>
            <button
              onClick={() => {
                localStorage.setItem('lifequest_skipped_onboarding', 'true');
                setIsOnboardingOpen(false);
              }}
              className="p-1 rounded-xl text-slate-400 hover:text-white"
              title="Close and keep demo profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wizard Scrollable Content Body */}
        <div className="p-5 sm:p-7 space-y-5 overflow-y-auto flex-1 overscroll-contain">
          
          {/* STEP 1: IDENTITY & ARCHETYPE */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-xl font-black text-slate-900">1. Who is embarking on this Quest?</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Define your character identity and select your current engineering or builder archetype.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-slate-500">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    autoFocus
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-slate-500">Your Title / Aspiration</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Staff Systems & AI Engineer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-black uppercase text-slate-500">Select Character Archetype</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {archetypes.map((arch) => {
                    const Icon = arch.icon;
                    const isSelected = selectedClass === arch.id;
                    return (
                      <div
                        key={arch.id}
                        onClick={() => handleSelectArchetype(arch.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/60 shadow-md ring-2 ring-brand-200'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`p-2 rounded-xl flex-shrink-0 ${arch.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-slate-900">{arch.name}</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{arch.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DEFINE YOUR CORE CAMPAIGNS */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">2. Name Your 3 Core Life Campaigns</h3>
                <p className="text-xs text-slate-500 font-medium">
                  These represent your long-term battlefronts. You can rename them to match your exact current goals.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-purple-50/70 border-2 border-purple-200 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black text-purple-700 uppercase">Primary Technical Goal</span>
                  <input
                    type="text"
                    value={c1Name}
                    onChange={(e) => setC1Name(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-purple-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="p-3.5 bg-blue-50/70 border-2 border-blue-200 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black text-blue-700 uppercase">Secondary Engineering / Career Pillar</span>
                  <input
                    type="text"
                    value={c2Name}
                    onChange={(e) => setC2Name(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-blue-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="p-3.5 bg-orange-50/70 border-2 border-orange-200 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black text-orange-700 uppercase">Habit, Health & Discipline Pillar</span>
                  <input
                    type="text"
                    value={c3Name}
                    onChange={(e) => setC3Name(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-orange-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FORGE TODAY'S 3 QUESTS */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">3. Set Today's Daily Triad</h3>
                <p className="text-xs text-slate-500 font-medium">
                  What are the three most critical things you will conquer today?
                </p>
              </div>

              <div className="space-y-3">
                {/* Quest 1 (Apex) */}
                <div className="p-3.5 bg-slate-50 border-2 border-brand-400 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-brand-700 uppercase">⚡ Quest 1 (Apex Priority)</span>
                    <span className="text-[10px] font-bold text-slate-500">60 mins • +250 XP</span>
                  </div>
                  <input
                    type="text"
                    value={q1Title}
                    onChange={(e) => setQ1Title(e.target.value)}
                    placeholder="e.g. Implement WebRTC audio streaming"
                    className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Quest 2 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-600 uppercase">Quest 2</span>
                    <span className="text-[10px] font-bold text-slate-500">45 mins • +180 XP</span>
                  </div>
                  <input
                    type="text"
                    value={q2Title}
                    onChange={(e) => setQ2Title(e.target.value)}
                    placeholder="e.g. Profile kernel locks and flamegraphs"
                    className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Quest 3 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-600 uppercase">Quest 3</span>
                    <span className="text-[10px] font-bold text-slate-500">30 mins • +100 XP</span>
                  </div>
                  <input
                    type="text"
                    value={q3Title}
                    onChange={(e) => setQ3Title(e.target.value)}
                    placeholder="e.g. Review portfolio and budget"
                    className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PICK THEME & LAUNCH */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in text-center sm:text-left">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">4. Choose Your Aesthetic Theme</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Select your visual palette. Pip will match your chosen style!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'emerald', name: 'Emerald Forest', color: 'bg-emerald-500' },
                  { id: 'sapphire', name: 'Cyber Sapphire', color: 'bg-blue-600' },
                  { id: 'amethyst', name: 'Amethyst Arc', color: 'bg-purple-600' },
                  { id: 'sunset', name: 'Sunset Ember', color: 'bg-orange-500' },
                  { id: 'midnight', name: 'Midnight OLED', color: 'bg-slate-900' },
                ].map((t) => (
                  <div
                    key={t.id}
                    onClick={() => { sounds.playClick(); setSelectedTheme(t.id as AppTheme); }}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                      selectedTheme === t.id
                        ? 'border-brand-500 bg-brand-50 text-slate-900 shadow-sm font-extrabold'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${t.color}`} />
                    <span className="text-xs">{t.name}</span>
                  </div>
                ))}
              </div>

              {/* Ready to Launch Card */}
              <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-brand-300 rounded-3xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left mt-4">
                <PipMascot mood="celebrating" size="sm" />
                <div>
                  <h4 className="text-sm font-black text-slate-900">Ready to conquer, {name}!</h4>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Your custom character, 3 campaigns, and today's quests are primed for action.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
          {step > 1 ? (
            <button
              onClick={() => { sounds.playClick(); setStep(prev => prev - 1); }}
              className="px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-200 flex items-center gap-1.5 touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={() => {
                localStorage.setItem('lifequest_skipped_onboarding', 'true');
                setIsOnboardingOpen(false);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 touch-manipulation px-2"
            >
              Skip (Use Alex Vance Demo)
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={() => { sounds.playClick(); setStep(prev => prev + 1); }}
              className="btn-tactile-primary py-2.5 px-6 text-xs sm:text-sm font-bold gap-1.5 touch-manipulation"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishCustomization}
              className="btn-tactile-primary py-2.5 px-6 text-xs sm:text-sm font-bold gap-2 touch-manipulation"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch My LifeQuest ⚔️</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
