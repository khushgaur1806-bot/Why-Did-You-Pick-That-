import React from 'react';
import { ShieldCheck, Truck, RotateCcw, MessageCircle, Heart, MapPin, Building2 } from 'lucide-react';
import { ProductCategory } from '../types/store';
import { MooseWalaLogo } from './MooseWalaLogo';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'All') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 text-xs mt-16 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3-Col Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-neutral-800 text-neutral-400">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-heading uppercase font-bold text-white text-sm">Pan-India Express Delivery</h5>
              <p className="text-[11px] mt-1 text-neutral-400">
                Complimentary doorstep dispatch on all orders exceeding ₹999. Airway courier tracking provided via SMS.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-heading uppercase font-bold text-white text-sm">100% Genuine Merchandise</h5>
              <p className="text-[11px] mt-1 text-neutral-400">
                Direct from the official Sidhu Moose Wala estate & Urban Theka archives. Hand-numbered certification tags.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-heading uppercase font-bold text-white text-sm">7-Day Free Size Exchange</h5>
              <p className="text-[11px] mt-1 text-neutral-400">
                Hassle-free reverse pick-up service across 19,000+ Indian postal codes. Zero questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Brand Manifesto */}
          <div className="md:col-span-2 space-y-3">
            <MooseWalaLogo variant="light" size="md" />
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Dedicated to the immortal legacy of Sidhu Moose Wala. Fusing authentic streetwear, heavyweight premium textiles, and raw Punjabi rebellion into wearable archival art.
            </p>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[11px] font-mono">
                <Building2 className="w-3.5 h-3.5" />
                <span>Office & Factory</span>
              </div>
              <p className="text-white text-xs font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ajmer, Rajasthan, India</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-mono">
                Manufacturing, Quality Control & Pan-India Dispatch Hub
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-heading uppercase font-bold text-white text-xs tracking-wider mb-3">
              Streetwear Categories
            </h5>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => onSelectCategory('T-shirts')} className="hover:text-white transition-colors">
                  T-shirts (₹2,000 – ₹2,500)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Hoodies')} className="hover:text-white transition-colors">
                  Hoodies (₹3,000 – ₹7,000)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Jackets')} className="hover:text-white transition-colors">
                  Jackets (₹10,000 – ₹15,000)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Jeans')} className="hover:text-white transition-colors">
                  Jeans (₹3,000 – ₹5,000)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Lowers')} className="hover:text-white transition-colors">
                  Lowers (₹3,000 – ₹5,000)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Shawls')} className="hover:text-white transition-colors">
                  Shawls & Lohi (₹1,000 – ₹1,800)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Bandana')} className="hover:text-white transition-colors">
                  Bandana · बांद्रा
                </button>
              </li>
              <li className="pt-2">
                <a 
                  href="#newsletter-signup" 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/20 transition-all font-bold text-[11px]"
                >
                  <span>👑 VIP List (+700 Coins)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care & Payments */}
          <div>
            <h5 className="font-heading uppercase font-bold text-white text-xs tracking-wider mb-3">
              Accepted Payments
            </h5>
            <div className="space-y-2 text-xs text-neutral-400">
              <div>✓ Cash On Delivery (COD) Pan-India</div>
              <div>✓ Google Pay · PhonePe · Paytm UPI</div>
              <div>✓ Visa, Mastercard, RuPay Cards</div>
              <div>✓ Net Banking & EMI</div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                Official WhatsApp Community & Helpline
              </span>

              {/* Official Shoppers WhatsApp Group */}
              <a 
                href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-gradient-to-r from-emerald-950 via-emerald-900/60 to-neutral-900 hover:from-emerald-900 hover:to-neutral-800 rounded-lg border border-emerald-500/50 hover:border-emerald-400 transition-colors text-xs font-mono group"
                title="Any body shopping, join this WhatsApp group for latest update"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-white font-bold block text-[11px]">Shoppers WhatsApp Group</span>
                    <span className="text-[10px] text-emerald-300">Latest drops & live shopping updates</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-400 text-black px-1.5 py-0.5 rounded font-bold uppercase shrink-0">Join</span>
              </a>
              
              <a 
                href="https://wa.me/919461650052?text=Hello%20Moose%20Wala%20Team,%20I%20have%20an%20inquiry%20regarding%20my%20order" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2 bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-800 hover:border-emerald-500/50 transition-colors text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-white font-bold">+91 9461650052</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">Orders & Help</span>
              </a>

              <a 
                href="https://wa.me/919928359313?text=Hello%20Moose%20Wala%20Team,%20I%20need%20VIP%20sizing%20and%20product%20guidance" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2 bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-800 hover:border-emerald-500/50 transition-colors text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-white font-bold">+91 9928359313</span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold">VIP Sizing</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Moose Wala. Office & Factory: Ajmer, Rajasthan, India. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <MapPin className="w-3 h-3 text-amber-500" />
            <span>Ajmer, Rajasthan, India · Pan-India Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
