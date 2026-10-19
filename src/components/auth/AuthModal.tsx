import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PipMascot } from '../mascot/PipMascot';
import { 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Bot, 
  Cpu, 
  Rocket, 
  TrendingUp, 
  KeyRound
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, createAccount, loginAccount, profile } = useGame();

  const [mode, setMode] = useState<'create' | 'login' | 'guest'>('create');
  const [name, setName] = useState(profile.name || 'Alex');
  const [email, setEmail] = useState(profile.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [title, setTitle] = useState(profile.title || 'Staff-Track Systems & AI Engineer');
  const [selectedClass, setSelectedClass] = useState<string>(profile.playerClass || 'ai-builder');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const archetypes = [
    { id: 'ai-builder', name: 'AI Product Builder', icon: Bot, desc: 'LLMs, vector pipelines & streaming audio' },
    { id: 'systems-architect', name: 'Systems Architect', icon: Cpu, desc: 'Distributed consensus & kernel profiling' },
    { id: 'indie-founder', name: 'Solo Founder', icon: Rocket, desc: 'Building fast & bootstrapping MRR' },
    { id: 'career-climber', name: 'Staff Climber', icon: TrendingUp, desc: 'Executive RFCs & technical leverage' },
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your adventurer name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length > 0 && password.length < 4) {
      setErrorMsg('Security PIN or Password must be at least 4 characters.');
      return;
    }

    createAccount({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      pinCode: password,
      title: title.trim(),
      playerClass: selectedClass,
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your registered email.');
      return;
    }

    const success = loginAccount(email.trim().toLowerCase(), password);
    if (!success) {
      setErrorMsg('Account not found or password incorrect. You can create a new account or continue as guest.');
    }
  };

  const handleGuestContinue = () => {
    sounds.playClick();
    closeAuthModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={closeAuthModal}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92dvh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header Banner */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex-shrink-0 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white font-black shadow-tactile-green text-lg">
              🛡️
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-400 block">
                Player Vault & Identity
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {mode === 'create' ? 'Create LifeQuest Account' : mode === 'login' ? 'Adventurer Sign In' : 'Guest Mode'}
              </h2>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 p-1.5 gap-1.5 flex-shrink-0">
          <button
            onClick={() => { sounds.playClick(); setMode('create'); setErrorMsg(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all touch-manipulation ${
              mode === 'create' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => { sounds.playClick(); setMode('login'); setErrorMsg(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all touch-manipulation ${
              mode === 'login' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { sounds.playClick(); setMode('guest'); setErrorMsg(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all touch-manipulation ${
              mode === 'guest' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Guest Vault
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
          
          {/* Mascot Greeting */}
          <div className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl">
            <PipMascot mood={mode === 'create' ? 'welcoming' : 'encouraging'} size="sm" />
            <div>
              <h4 className="text-xs font-black text-slate-900">
                {mode === 'create' 
                  ? 'Embark on your journey, engineer!' 
                  : mode === 'login' 
                  ? 'Welcome back to the frontline!' 
                  : 'Zero friction, 100% offline.'}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                {mode === 'create'
                  ? 'Registering an account grants +50 bonus gems and secures your save data.'
                  : mode === 'login'
                  ? 'Sign in to access your saved achievements and ongoing campaigns.'
                  : 'Play instantly with complete local privacy in your browser.'}
              </p>
            </div>
          </div>

          {/* Error Message Notice */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl animate-shake">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* TAB 1: CREATE ACCOUNT */}
          {mode === 'create' && (
            <form onSubmit={handleCreateSubmit} className="space-y-3.5 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@engineer.dev"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Security Password or 4-Digit PIN</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set quick PIN or password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Engineering Title / Aspiration
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior AI Systems Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Archetype Quick Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Select Archetype
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {archetypes.map((arch) => {
                    const Icon = arch.icon;
                    const isSelected = selectedClass === arch.id;
                    return (
                      <div
                        key={arch.id}
                        onClick={() => { sounds.playClick(); setSelectedClass(arch.id); }}
                        className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 select-none ${
                          isSelected 
                            ? 'border-brand-500 bg-brand-50 shadow-sm font-black' 
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                        <span className="text-xs truncate">{arch.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-tactile-primary py-3 text-xs sm:text-sm font-black justify-center gap-2 touch-manipulation mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Account & Claim +50 Gems 💎</span>
              </button>
            </form>
          )}

          {/* TAB 2: SIGN IN */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 animate-fade-in">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter registered email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Password or PIN</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account PIN / password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-tactile-primary py-3 text-xs sm:text-sm font-black justify-center gap-2 touch-manipulation mt-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Sign In & Load Journey ⚡</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('create')}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  Don't have an account yet? Create one here →
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: GUEST MODE */}
          {mode === 'guest' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Local-First Offline Vault</span>
                </div>
                <p>
                  You are currently playing in <strong>Guest Mode</strong>. All your quests, XP math, boss progress, and bazaar purchases are stored permanently on this device.
                </p>
                <p>
                  Creating an account is optional, but allows you to set an adventurer email, protect your save data with a PIN, and earn a <strong>+50 Gem signup bonus</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGuestContinue}
                  className="w-full py-2.5 rounded-2xl border border-slate-300 text-xs font-black text-slate-700 hover:bg-slate-100 touch-manipulation"
                >
                  Continue as Guest 🛡️
                </button>
                <button
                  type="button"
                  onClick={() => setMode('create')}
                  className="w-full btn-tactile-primary py-2.5 text-xs font-black justify-center gap-1.5 touch-manipulation"
                >
                  <span>Register Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
