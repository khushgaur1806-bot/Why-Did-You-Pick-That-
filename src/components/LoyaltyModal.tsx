import React from 'react';
import { 
  X, 
  Crown, 
  Sparkles, 
  Check, 
  Gift, 
  TrendingUp, 
  Award, 
  Zap, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { LoyaltyReward, LoyaltyTier } from '../types/store';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  onRedeemReward: (reward: LoyaltyReward) => void;
  activeRewardId: string | null;
}

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'reward-200-off',
    title: '₹200 Off Instant Voucher',
    pointsCost: 200,
    discountINR: 200,
    description: 'Flat ₹200 discount applicable on any cart above ₹999.',
    badge: 'Popular',
  },
  {
    id: 'reward-500-off',
    title: '₹500 Off Outerwear Voucher',
    pointsCost: 450,
    discountINR: 500,
    description: 'Save ₹500 on all Jackets, Varsity Bombers & Tapestry Blousons.',
    badge: 'High Value',
  },
  {
    id: 'reward-free-bandana',
    title: 'Free Paisley Bandana (बांद्रा)',
    pointsCost: 350,
    discountINR: 1200,
    description: 'Complimentary authentic 3-pack cotton bandana mask added to bag.',
    badge: 'Exclusive',
  },
  {
    id: 'reward-1000-off',
    title: '₹1,000 Off VIP Legend Voucher',
    pointsCost: 900,
    discountINR: 1000,
    description: 'Exclusive sovereign voucher for Legend tier brotherhood members.',
    badge: 'VIP Only',
  },
];

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({
  isOpen,
  onClose,
  points,
  onRedeemReward,
  activeRewardId,
}) => {
  if (!isOpen) return null;

  // Compute tier
  const tier: LoyaltyTier = points >= 1500 ? 'Legend' : points >= 500 ? 'Warrior' : 'Vanguard';
  const nextTierPoints = tier === 'Vanguard' ? 500 : tier === 'Warrior' ? 1500 : 3000;
  const progressPercent = Math.min(100, Math.round((points / nextTierPoints) * 100));
  const pointsToNext = Math.max(0, nextTierPoints - points);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-neutral-950 text-white border border-neutral-800 rounded-2xl shadow-2xl max-w-xl w-full p-5 sm:p-7 z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-black text-xl uppercase tracking-tight text-white flex items-center gap-2">
              <span>Moose Wala Brotherhood Rewards</span>
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Earn 1 MW Coin for every ₹10 spent on official archive drops
            </p>
          </div>
        </div>

        {/* Tier Card */}
        <div className="mt-5 p-5 rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                Current Standing
              </span>
              <span className="text-2xl font-heading font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <span>{tier} Member</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </span>
            </div>

            {/* Big Points Counter */}
            <div className="text-right">
              <span className="text-3xl font-heading font-black text-white tabular-nums tracking-tight">
                {points}
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold block">
                MW Coins Available
              </span>
            </div>
          </div>

          {/* Progress Bar to Next Tier */}
          <div className="mt-4 pt-3 border-t border-neutral-800/80">
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-400">Next Rank: <strong>{tier === 'Vanguard' ? 'Warrior' : 'Legend'}</strong></span>
              <span className="text-amber-400">{pointsToNext} coins needed</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* How to Earn Strip */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 rounded-lg text-center">
            <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] font-mono text-neutral-400 block">Per Purchase</span>
            <span className="text-xs font-bold text-white">1 Coin / ₹10</span>
          </div>

          <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 rounded-lg text-center">
            <Award className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[10px] font-mono text-neutral-400 block">UPI Bonus</span>
            <span className="text-xs font-bold text-white">+25 Bonus Coins</span>
          </div>

          <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 rounded-lg text-center">
            <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <span className="text-[10px] font-mono text-neutral-400 block">Vault Perks</span>
            <span className="text-xs font-bold text-white">Early Access</span>
          </div>
        </div>

        {/* Redeemable Rewards List */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-neutral-400 font-bold flex items-center justify-between">
            <span>Redeem Rewards & Vouchers</span>
            <span className="text-[10px] text-amber-400 font-normal">Auto-applies to checkout</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {LOYALTY_REWARDS.map((reward) => {
              const canAfford = points >= reward.pointsCost;
              const isApplied = activeRewardId === reward.id;

              return (
                <div
                  key={reward.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    isApplied 
                      ? 'bg-amber-950/30 border-amber-500/80 shadow-md shadow-amber-500/10'
                      : canAfford 
                      ? 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700' 
                      : 'bg-neutral-900/30 border-neutral-800/40 opacity-60'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm text-white uppercase truncate">
                        {reward.title}
                      </h4>
                      <span className="text-[9px] font-mono font-bold bg-neutral-800 text-amber-300 px-1.5 py-0.5 rounded">
                        {reward.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                      {reward.description}
                    </p>
                    <div className="text-[10px] font-mono text-amber-400 font-bold mt-1">
                      Cost: {reward.pointsCost} MW Coins
                    </div>
                  </div>

                  {/* Redeem Button */}
                  <div className="shrink-0">
                    {isApplied ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-black text-xs font-mono font-bold rounded-md">
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => onRedeemReward(reward)}
                        className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-all ${
                          canAfford
                            ? 'bg-amber-400 hover:bg-amber-300 active:scale-95 text-black cursor-pointer shadow-sm'
                            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem' : 'Need More'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-neutral-800 text-center">
          <p className="text-[10px] font-mono text-neutral-500">
            Coins are credited immediately upon order confirmation. Coins do not expire.
          </p>
        </div>

      </div>
    </div>
  );
};
