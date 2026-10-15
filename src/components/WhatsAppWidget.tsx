import React, { useState } from 'react';
import { MessageCircle, Phone, X, ExternalLink, ShieldCheck, Clock, MapPin, Users, Sparkles, Bell } from 'lucide-react';

interface WhatsAppWidgetProps {
  isStickyBarVisible?: boolean;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ isStickyBarVisible = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumbers = [
    {
      number: '9461650052',
      display: '+91 9461650052',
      title: 'Order Support & Dispatch',
      desc: 'Order tracking, delivery updates & dispatch',
      badge: 'Support',
      prefill: 'Hello Moose Wala Team, I have an inquiry regarding my order / delivery.',
    },
    {
      number: '9928359313',
      display: '+91 9928359313',
      title: 'VIP Concierge & Sizing',
      desc: 'Size consultation, custom drops & VIP archive',
      badge: 'VIP Hotline',
      prefill: 'Hello Moose Wala Team, I need assistance with product sizing / archive collection.',
    },
  ];

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 transition-all duration-300 ${
        isStickyBarVisible ? 'mb-12 sm:mb-14' : ''
      }`}
    >
      {/* Expanded Popup Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-neutral-950 text-white border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-5 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-black text-sm uppercase tracking-wide text-white">
                  Moose Wala WhatsApp Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Typically replies in 5 mins</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors"
              aria-label="Close WhatsApp menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Official Shoppers & Updates Group Banner */}
          <div className="mt-3">
            <a
              href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-neutral-900 border border-emerald-500/50 hover:border-emerald-400 rounded-xl flex items-center justify-between gap-3 group transition-all shadow-lg hover:shadow-emerald-900/30 block"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-heading font-black uppercase text-emerald-300 tracking-wide">
                      Moose Wala VIP Group
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-emerald-400 text-black px-1.5 py-0.2 rounded-full uppercase">
                      New
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-white leading-tight mt-0.5">
                    Join for latest drops & live shopping updates!
                  </p>
                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
                    Archival restocks, tracking & secret drops
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>

          <p className="text-[11px] text-neutral-400 mt-3 font-medium leading-relaxed">
            Or chat directly with our office & factory concierge in Ajmer:
          </p>

          {/* Numbers List */}
          <div className="mt-2 space-y-2.5">
            {phoneNumbers.map((item) => {
              const waUrl = `https://wa.me/91${item.number}?text=${encodeURIComponent(item.prefill)}`;
              return (
                <a
                  key={item.number}
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800 hover:border-emerald-500/60 rounded-xl flex items-center justify-between gap-3 transition-all duration-200 group block"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {item.display}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-neutral-800 text-amber-300 px-1.5 py-0.5 rounded border border-neutral-700">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-neutral-200 mt-0.5 truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono truncate">
                      {item.desc}
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors shadow-xs">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Office & Factory: Ajmer, Rajasthan</span>
            </span>
            <span>Pan-India Help</span>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-full shadow-2xl transition-all duration-200 group cursor-pointer border border-emerald-400/40"
        aria-label="WhatsApp Concierge"
        title="Chat on WhatsApp (+91 9461650052 / +91 9928359313)"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
        </span>
        <span className="font-heading font-black text-xs uppercase tracking-wider hidden sm:inline">
          WhatsApp Support
        </span>
      </button>
    </div>
  );
};
