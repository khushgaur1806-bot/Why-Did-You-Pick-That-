import React from 'react';
import { Sparkles, ArrowRight, Flame, Crown, Check } from 'lucide-react';
import { Product, ProductCategory, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';

interface ArchiveWardrobeRailProps {
  products: Product[];
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
  activeCategory: ProductCategory | 'All';
  onSelectCategory: (category: ProductCategory | 'All') => void;
  currentCurrency: CurrencyCode;
}

export const ArchiveWardrobeRail: React.FC<ArchiveWardrobeRailProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  activeCategory,
  onSelectCategory,
  currentCurrency,
}) => {
  const currency = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'T-shirts',
    'Hoodies',
    'Jackets',
    'Jeans',
    'Lowers',
    'Shawls',
    'Bandana',
  ];

  const filtered = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400 text-black flex items-center justify-center font-bold text-xs shadow-xs">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-heading font-black tracking-wide uppercase text-white flex items-center gap-2">
                <span>Urban Theka Men's Wardrobe</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                  {products.length} Official Drops
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Click any clothing piece below to load full multi-angle Product Detail Page (PDP) & Size Selector
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-black font-bold shadow-xs'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                }`}
              >
                {cat === 'Bandana' ? 'Bandana (बांद्रा)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scrollable Clothes Rack */}
        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
          {filtered.map((item) => {
            const isSelected = selectedProduct.id === item.id;
            const convertedPrice = Math.round(item.price * currency.rateFromINR);
            const coinsEarned = Math.floor(item.price / 10);

            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className={`shrink-0 w-44 sm:w-52 rounded-xl p-2.5 border transition-all duration-200 cursor-pointer snap-start relative group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-800/90 border-amber-400 shadow-lg shadow-amber-400/10 ring-2 ring-amber-400/20'
                    : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/40'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute -top-2 left-3 bg-amber-400 text-black text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-20">
                    <Check className="w-2.5 h-2.5" />
                    <span>Active in PDP</span>
                  </div>
                )}

                {/* Thumbnail Image */}
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800/80 mb-2">
                  <img
                    src={item.imageUrl || item.gallery[0]?.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-mono text-neutral-300">
                    {item.category}
                  </div>

                  {/* Build Pill */}
                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-mono text-amber-400 font-bold">
                    HEAVYWEIGHT
                  </div>

                  {/* Hover Inspect CTA */}
                  <div className="absolute inset-x-2 bottom-2 py-1.5 bg-white text-black text-[10px] font-heading font-black uppercase rounded text-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    Inspect Piece →
                  </div>
                </div>

                {/* Garment Details */}
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-xs sm:text-sm text-white uppercase truncate group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-mono line-clamp-1">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80">
                    <div>
                      <span className="font-heading font-bold text-xs sm:text-sm text-amber-300">
                        {currency.symbol}{convertedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-500/20 px-1.5 py-0.5 rounded">
                      +{coinsEarned} Coins
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
