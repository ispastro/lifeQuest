import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Coffee, 
  Keyboard, 
  Crown, 
  Plus, 
  CheckCircle2, 
  Gift
} from 'lucide-react';
import { PipMascot } from '../mascot/PipMascot';
import { sounds } from '../../utils/soundEffects';

export const RewardShop: React.FC = () => {
  const { profile, shopItems, buyShopItem, addCustomShopItem } = useGame();
  const [confirmItemId, setConfirmItemId] = useState<string | null>(null);
  const [isAddingReward, setIsAddingReward] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customCost, setCustomCost] = useState(200);
  const [customCategory, setCustomCategory] = useState<'Real Life Treat' | 'Gear' | 'Power-Up'>('Real Life Treat');

  const getItemIcon = (icon: string) => {
    switch (icon) {
      case 'Shield': return ShieldCheck;
      case 'Coffee': return Coffee;
      case 'Keyboard': return Keyboard;
      case 'Crown': return Crown;
      default: return Gift;
    }
  };

  const handlePurchase = (id: string) => {
    const success = buyShopItem(id);
    if (success) {
      setConfirmItemId(null);
    }
  };

  const handleCreateCustomReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    addCustomShopItem({
      title: customTitle.trim(),
      description: 'Personalized reward earned from focused life conquest.',
      cost: customCost,
      icon: customCategory === 'Real Life Treat' ? 'Coffee' : customCategory === 'Gear' ? 'Keyboard' : 'Shield',
      category: customCategory,
    });

    setCustomTitle('');
    setIsAddingReward(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Banner */}
      <section className="game-panel p-5 sm:p-7 relative overflow-hidden bg-white border-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <ShoppingBag className="w-3.5 h-3.5" />
              LifeQuest Bazaar & Reward Emporium
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Reward Yourself for Hard Work
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Convert your quest gems into real-life treats, workstation ergonomics, and streak shields. Guilt-free and earned.
            </p>
          </div>

          {/* Currency Display & Mascot */}
          <div className="flex items-center gap-4 bg-emerald-50/70 border border-emerald-200 px-5 py-3 rounded-3xl">
            <PipMascot mood="welcoming" size="sm" />
            <div>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">
                Available Currency
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
                <span>{profile.gems} Gems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ITEMS CATALOG SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Available Treats & Upgrades ({shopItems.length})
          </h2>

          <button
            onClick={() => { sounds.playClick(); setIsAddingReward(!isAddingReward); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-brand-500 text-xs font-bold text-slate-700 shadow-sm transition-all active:scale-95 touch-manipulation"
          >
            <Plus className="w-4 h-4 text-brand-600" />
            <span>Create Custom Treat</span>
          </button>
        </div>

        {/* Inline Custom Reward Creator */}
        {isAddingReward && (
          <form onSubmit={handleCreateCustomReward} className="game-panel p-4 sm:p-5 border-2 border-brand-400 bg-brand-50/30 space-y-3 animate-slide-up">
            <h3 className="text-sm font-black text-slate-900">Define Your Personalized Reward</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. 🍣 Omakase Dinner or 🎧 Airpods Max"
                className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                autoFocus
              />
              <input
                type="number"
                value={customCost}
                onChange={(e) => setCustomCost(Number(e.target.value))}
                min={50}
                step={50}
                placeholder="Gem Cost"
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white"
              >
                <option value="Real Life Treat">Real Life Treat</option>
                <option value="Gear">Hardware / Gear</option>
                <option value="Power-Up">Power-Up</option>
              </select>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingReward(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-primary py-1.5 px-4 text-xs font-bold"
                >
                  Add to Shop
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ITEMS CATALOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {shopItems.map((item) => {
            const Icon = getItemIcon(item.icon);
            const canAfford = profile.gems >= item.cost;
            const isConfirming = confirmItemId === item.id;

            return (
              <div
                key={item.id}
                className="game-panel p-5 flex flex-col justify-between hover:shadow-md transition-all space-y-4 border-2 border-slate-100"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.purchasedCount > 0 && (
                    <span className="text-[11px] font-bold text-brand-600 block">
                      Redeemed {item.purchasedCount} time{item.purchasedCount === 1 ? '' : 's'}
                    </span>
                  )}
                </div>

                {/* Price & Tactile Purchase CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-black text-slate-900">
                    <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                    <span>{item.cost} Gems</span>
                  </div>

                  {isConfirming ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setConfirmItemId(null)}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePurchase(item.id)}
                        className="btn-tactile-primary py-1.5 px-3 text-xs font-bold"
                      >
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setConfirmItemId(item.id);
                      }}
                      disabled={!canAfford}
                      className={`btn-tactile-primary py-2 px-4 text-xs font-bold touch-manipulation ${
                        !canAfford ? 'opacity-40 cursor-not-allowed' : ''
                      }`}
                    >
                      {canAfford ? 'Redeem Treat' : 'Need More Gems'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
