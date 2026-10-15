import React from 'react';
import { Truck, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const HeaderAnnouncement: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-neutral-100 border-b border-neutral-800 text-[11px] md:text-xs tracking-wider uppercase py-2 px-4 transition-all z-40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Trust Statement & Shoppers WhatsApp Group */}
        <div className="hidden lg:flex items-center gap-3 text-neutral-300 font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Office & Factory: Ajmer, Rajasthan</span>
          </div>
          <span className="text-neutral-700">|</span>
          <a
            href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            title="Any body shopping, join this WhatsApp group for latest update"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Shoppers WhatsApp Group</span>
          </a>
        </div>

        {/* Center Sticky Hero Announcement */}
        <div className="flex-1 flex items-center justify-center gap-2 font-medium text-center">
          <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-white tracking-wide">
            Free Shipping All Over India on orders above ₹999
          </span>
          <span className="hidden sm:inline text-neutral-500">·</span>
          <span className="hidden sm:inline text-neutral-400">Cash on Delivery & Instant UPI Available</span>
        </div>

        {/* Right Offer Highlight & WhatsApp Hotline */}
        <div className="hidden md:flex items-center gap-3 text-neutral-300 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-400">WhatsApp:</span>
            <a 
              href="https://wa.me/919461650052" 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              9461650052
            </a>
            <span className="text-neutral-600">/</span>
            <a 
              href="https://wa.me/919928359313" 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              9928359313
            </a>
          </div>

          <span className="text-neutral-700">|</span>

          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-amber-300 font-bold">5% PREPAID OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
