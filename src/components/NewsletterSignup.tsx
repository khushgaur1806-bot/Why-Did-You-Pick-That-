import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Sparkles, 
  Coins, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Bell, 
  Phone, 
  Gift, 
  Flame,
  Award,
  MessageCircle,
  ExternalLink,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterSignupProps {
  onRewardCoins: (amount: number, reason: string) => void;
  onOpenLoyaltyModal: () => void;
  currentPoints: number;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  onRewardCoins,
  onOpenLoyaltyModal,
  currentPoints,
}) => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedPreference, setSelectedPreference] = useState<string>('All Drops');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [subscribedData, setSubscribedData] = useState<{
    email: string;
    subscribedAt: number;
    vipNumber: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  // Check persistent subscription state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mw_vip_subscribed_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setHasSubscribed(true);
        setSubscribedData(parsed);
      }
    } catch (e) {
      console.warn('Failed to parse VIP subscription state', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address to claim your 700 coins.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const vipNumber = `MW-${Math.floor(100000 + Math.random() * 900000)}`;
      const data = {
        email: cleanEmail,
        whatsapp: whatsapp.trim() || undefined,
        preference: selectedPreference,
        subscribedAt: Date.now(),
        vipNumber,
      };

      try {
        localStorage.setItem('mw_vip_subscribed_data', JSON.stringify(data));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }

      setHasSubscribed(true);
      setSubscribedData(data);
      setIsSubmitting(false);
      setShowConfetti(true);

      // Reward the user with 700 loyalty coins
      onRewardCoins(700, 'Moose Wala VIP List Welcome Bonus');

      // Turn off confetti after 4 seconds
      setTimeout(() => setShowConfetti(false), 4500);
    }, 700);
  };

  const categories = [
    'All Drops',
    'Oversized Tees (₹2,000 – ₹2,500)',
    'Heavy Hoodies (₹3,000 – ₹7,000)',
    'Archival Varsity (₹10,000 – ₹15,000)'
  ];

  return (
    <section 
      id="newsletter-signup"
      className="relative overflow-hidden bg-neutral-950 text-white py-16 sm:py-20 border-t border-b border-neutral-800"
    >
      {/* Background Decorative Glow & Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
        <div 
          className="w-full h-full opacity-5"
          style={{
            backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-lg shadow-amber-950/40 backdrop-blur-sm animate-pulse">
            <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Limited VIP Access · Instant +700 MW Coins Reward</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          </div>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-black tracking-tight uppercase text-white">
            Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Moose Wala VIP List</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            Become an insider in the official Sidhu Moose Wala brotherhood. Get immediate drop access, secret factory releases from Ajmer, and <strong className="text-amber-400 font-bold">700 free loyalty coins</strong> credited to your wallet today.
          </p>
        </div>

        {/* Interactive VIP Membership Card State or Signup Form */}
        <div className="bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Subtle Golden Crown Insignia Watermark */}
          <div className="absolute right-6 top-6 opacity-5 pointer-events-none hidden sm:block">
            <Crown className="w-40 h-40 text-amber-400" />
          </div>

          <AnimatePresence mode="wait">
            {hasSubscribed && subscribedData ? (
              /* ALREADY SUBSCRIBED / VIP MEMBER STATE */
              <motion.div
                key="vip-confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-neutral-900 to-amber-950/40 border border-amber-500/50 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-[11px] font-bold tracking-wider uppercase border border-amber-400/30">
                          Verified VIP Member
                        </span>
                        <span className="text-neutral-400 text-xs font-mono">
                          ID: {subscribedData.vipNumber}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-white mt-1">
                        Welcome to the Moose Wala Inner Circle!
                      </h3>
                      <p className="text-xs text-neutral-300 mt-0.5 font-mono">
                        Subscribed as: <span className="text-amber-300">{subscribedData.email}</span>
                      </p>
                    </div>
                  </div>

                  {/* 700 Coins Credited Badge */}
                  <div className="flex flex-col items-center md:items-end shrink-0 w-full md:w-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 font-heading font-bold text-sm">
                      <Coins className="w-5 h-5 text-amber-400" />
                      <span>+700 Loyalty Coins Credited</span>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono mt-1">
                      Current Total Balance: {currentPoints} Coins
                    </span>
                  </div>
                </div>

                {/* VIP Perks Overview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-heading font-bold uppercase text-white block">15-Min Drop Notice</span>
                      <p className="text-neutral-400 text-[11px] mt-0.5">Early checkout links for limited edition apparel drops.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-heading font-bold uppercase text-white block">Redeem Coins Now</span>
                      <p className="text-neutral-400 text-[11px] mt-0.5">Apply your 700 coins toward instant order discounts.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-heading font-bold uppercase text-white block">Ajmer Factory Access</span>
                      <p className="text-neutral-400 text-[11px] mt-0.5">Direct reservations for archival unreleased streetwear.</p>
                    </div>
                  </div>
                </div>

                {/* Shoppers WhatsApp Group Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-emerald-900/40 to-neutral-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-xs uppercase text-emerald-300 tracking-wider">
                          Official Shoppers WhatsApp Community
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-400 text-black font-bold uppercase">
                          VIP Group
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Any body shopping, join this WhatsApp group for live drop updates, secret archive restocks & order tracking!
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Join WhatsApp Group</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Action button to open Loyalty Modal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>You are officially subscribed to all Moose Wala announcements.</span>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenLoyaltyModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Coins className="w-4 h-4 text-black" />
                    <span>View & Redeem 700 Coins</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* SIGNUP FORM STATE */
              <motion.form
                key="signup-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* 700 Coins Incentive Banner */}
                <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center shrink-0">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading uppercase font-bold text-amber-300">
                        Immediate 700 Coin Signup Grant
                      </h4>
                      <p className="text-xs text-neutral-300">
                        Join in 10 seconds. We'll instantly deposit 700 MW loyalty coins into your active balance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-900 border border-amber-500/40 font-mono text-xs font-bold text-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Reward: 700 Coins (₹350 Value)</span>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email Input (Required) */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* WhatsApp/Phone Input (Optional for priority drops) */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>WhatsApp Number (Optional)</span>
                      <span className="text-[10px] text-amber-400 font-normal">For SMS/WhatsApp Drops</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Preference Pills */}
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-2">
                    Preferred Collection Alert
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedPreference(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                          selectedPreference === cat
                            ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error message */}
                {errorMsg && (
                  <p className="text-xs text-rose-400 font-mono bg-rose-950/40 border border-rose-800/50 p-2.5 rounded-lg">
                    {errorMsg}
                  </p>
                )}

                {/* Submit Button & Trust Signal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Zero spam. 1-click unsubscribe anytime. 700 coins credited instantly.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 font-heading font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 disabled:opacity-60 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Credit 700 Coins...</span>
                      </>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 text-black" />
                        <span>Claim 700 Coins & Join VIP</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </div>

                {/* Shoppers WhatsApp Group Invite Option */}
                <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-neutral-300">
                      Shopping right now? Join our <strong className="text-emerald-400">Official WhatsApp Group</strong> for real-time drop notices & live updates!
                    </span>
                  </div>
                  <a
                    href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-[11px] shrink-0 transition-colors"
                  >
                    <span>Join WhatsApp Group</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Celebration effect when awarded */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
              <div className="bg-amber-400/20 backdrop-blur-md border border-amber-400 p-6 rounded-2xl text-center shadow-2xl animate-bounce">
                <Crown className="w-12 h-12 text-amber-300 mx-auto mb-2 animate-pulse" />
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                  +700 MW COINS UNLOCKED!
                </h3>
                <p className="text-xs font-mono text-amber-200 mt-1">
                  Deposited directly to your header wallet
                </p>
              </div>
            </div>
          )}

        </div>

        {/* 4 Bottom Micro-Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center text-neutral-400 text-xs font-mono">
          <div className="flex items-center justify-center gap-1.5 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Over 14,200+ VIP Members</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Ajmer Factory Authenticated</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Priority WhatsApp Drop Dispatch</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Instant Coin Redeem at Checkout</span>
          </div>
        </div>

      </div>
    </section>
  );
};
