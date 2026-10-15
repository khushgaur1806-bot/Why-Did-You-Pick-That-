import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame, Crown, Check, Eye, Upload } from 'lucide-react';
import { Product, Size, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';

interface HomeHeroBannerProps {
  onExploreDrop: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProduct: Product;
  currentCurrency?: CurrencyCode;
  onQuickAdd?: (product: Product, size: Size) => void;
  onOpenUpload?: () => void;
  customHeroImage?: string | null;
}

export const HomeHeroBanner: React.FC<HomeHeroBannerProps> = ({
  onExploreDrop,
  onSelectProduct,
  featuredProduct,
  currentCurrency = 'INR',
  onQuickAdd,
  onOpenUpload,
  customHeroImage,
}) => {
  const [selectedHeroSize, setSelectedHeroSize] = useState<Size>(featuredProduct.defaultSize || 'XS');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const currencyInfo = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  const convertedPrice = Math.round(featuredProduct.price * currencyInfo.rateFromINR);
  const convertedOriginal = Math.round(featuredProduct.originalPrice * currencyInfo.rateFromINR);
  const loyaltyCoinsEarned = Math.floor(featuredProduct.price / 10);

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(featuredProduct, selectedHeroSize);
      setIsAddedSuccess(true);
      setTimeout(() => setIsAddedSuccess(false), 2200);
    } else {
      onSelectProduct(featuredProduct);
    }
  };

  return (
    <div className="relative bg-[#0a0a0c] text-white overflow-hidden border-b border-neutral-800">
      {/* Background ambient luxury lighting & subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(212,175,55,0.18),rgba(0,0,0,0.95))]" />
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement & Primary CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Archive Badge & Gamified Points Teaser */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/90 border border-amber-500/30 rounded-full text-[11px] font-mono text-amber-300 backdrop-blur-md shadow-xs">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold tracking-wider">MOOSE WALA · OFFICIAL STREETWEAR COLLECTION</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-300">MEN'S STREETWEAR</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-500/20 rounded-full text-[10px] font-mono text-amber-200">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Earn {loyaltyCoinsEarned} MW Coins on this drop</span>
              </div>
            </div>

            {/* Headline with Moose Wala Signature Piece */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-amber-400 block font-bold">
                Moose Wala Original Design · Heavyweight French Terry
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight uppercase leading-[0.92]">
                Bai <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-neutral-400">
                  Thaapi Tee
                </span>
              </h1>
            </div>

            {/* Brand Manifesto */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-normal leading-relaxed">
              The definitive thigh-slap (ਥਾਪੀ) pose immortalized in custom-milled French Terry loopback cotton. 
              Designed exclusively by Moose Wala · Office & Factory in Ajmer, Rajasthan, India.
            </p>

            {/* Interactive Size Pill Selector for Quick Checkout */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-neutral-400">
                  Select Size: <strong className="text-white font-bold">{selectedHeroSize}</strong>
                </span>
                <span className="text-[11px] text-amber-400 font-bold">
                  {featuredProduct.inStockSizes.includes(selectedHeroSize) ? 'In Stock · Ready for Pan-India Dispatch' : 'Sold Out'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => {
                  const isAvailable = featuredProduct.inStockSizes.includes(size as Size);
                  const isSelected = selectedHeroSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedHeroSize(size as Size)}
                      className={`h-9 px-3.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 scale-105'
                          : isAvailable
                          ? 'bg-neutral-900 border border-neutral-700 hover:border-neutral-400 text-white'
                          : 'bg-neutral-900/40 border border-neutral-800 text-neutral-600 cursor-not-allowed line-through'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleQuickAddToCart}
                className="py-3.5 px-6 sm:px-8 bg-white hover:bg-neutral-200 active:scale-[0.98] text-black font-heading font-black text-sm uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-xl shadow-white/10 cursor-pointer"
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag · {currencyInfo.symbol}{convertedPrice.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onExploreDrop}
                className="py-3.5 px-6 border border-neutral-700 hover:border-white text-neutral-200 hover:text-white font-heading font-bold text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer bg-neutral-900/60 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 text-neutral-400" />
                <span>View Full Product Detail (PDP)</span>
              </button>

              {onOpenUpload && (
                <button
                  type="button"
                  onClick={onOpenUpload}
                  className="py-3.5 px-5 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer bg-amber-500/10 backdrop-blur-sm"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Upload Images</span>
                </button>
              )}
            </div>

            {/* Trust & Guarantee Ticker */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="block text-white font-bold text-sm">₹999+</span>
                <span className="text-neutral-400 text-[10px]">Free India Express Shipping</span>
              </div>
              <div className="border-x border-neutral-800 px-3">
                <span className="block text-white font-bold text-sm">COD & UPI</span>
                <span className="text-neutral-400 text-[10px]">Instant 5% Prepaid Off</span>
              </div>
              <div>
                <span className="block text-amber-300 font-bold text-sm">Moose Wala</span>
                <span className="text-neutral-400 text-[10px]">Official SMW Merchandise</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => onSelectProduct(featuredProduct)}
              className="group relative bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Product Photography Container */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center border border-neutral-800/80">
                <img
                  src={customHeroImage || featuredProduct.imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"}
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Editorial Vignette & Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 border border-amber-500/30 flex items-center gap-1 shadow-md">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Urban Theka Original</span>
                </div>

                <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-neutral-300 border border-neutral-800 shadow-md">
                  HEAVYWEIGHT
                </div>

                {/* Hover Reveal Action Bar */}
                <div className="absolute bottom-3 inset-x-3 py-2.5 bg-white text-black rounded-lg text-xs font-heading font-black uppercase text-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 shadow-xl">
                  Inspect Bai Thaapi in PDP →
                </div>
              </div>

              {/* Product Info Bar */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white uppercase group-hover:text-amber-300 transition-colors">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Heavyweight Loopknit Cotton · Deep Olive / Black
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-heading font-bold text-amber-300">
                    {currencyInfo.symbol}{convertedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[11px] text-neutral-400 line-through">
                    {currencyInfo.symbol}{convertedOriginal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
