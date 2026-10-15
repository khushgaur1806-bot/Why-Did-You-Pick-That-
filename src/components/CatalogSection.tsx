import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, ArrowUpRight } from 'lucide-react';
import { Product, ProductCategory, Size, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: ProductCategory | 'All';
  onSelectCategory: (category: ProductCategory | 'All') => void;
  onSelectProductForHero: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: Size) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  currentCurrency: CurrencyCode;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProductForHero,
  onQuickAddToCart,
  wishlistIds,
  onToggleWishlist,
  currentCurrency,
}) => {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const currency = CURRENCIES[currentCurrency];

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

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const priceStandards = {
    'T-shirts': '₹2,000 – ₹2,500',
    'Shawls': '₹1,000 – ₹1,800',
    'Jeans': '₹3,000 – ₹5,000',
    'Lowers': '₹3,000 – ₹5,000',
    'Hoodies': '₹3,000 – ₹7,000',
    'Jackets': '₹10,000 – ₹15,000',
    'Bandana': '₹1,200',
  };

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-neutral-200">
      
      {/* Section Header with Category Standards Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
            <span>Moose Wala Official Vault</span>
            <span>·</span>
            <span>Handcrafted Streetwear</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-neutral-950 uppercase tracking-tight">
            The Complete Collection
          </h2>
        </div>

        {/* Category Filter Buttons (Functional Tabs, clean aesthetic) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isSelected 
                    ? 'bg-black text-white font-semibold shadow-xs' 
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat === 'Bandana' ? 'Bandana (बांद्रा)' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Price Guarantee Note */}
      {selectedCategory !== 'All' && priceStandards[selectedCategory as keyof typeof priceStandards] && (
        <div className="mb-6 px-4 py-2 bg-neutral-100/70 border border-neutral-200 rounded-lg flex items-center justify-between text-xs font-mono text-neutral-700">
          <span>
            Category Standard: <strong>{selectedCategory}</strong>
          </span>
          <span className="text-neutral-900 font-bold">
            Luxury Bracket: {priceStandards[selectedCategory as keyof typeof priceStandards]}
          </span>
        </div>
      )}

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => {
          const isWishlisted = wishlistIds.includes(prod.id);
          const isHovered = hoveredProductId === prod.id;
          const displayPrice = (prod.price * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });
          const displayOriginalPrice = (prod.originalPrice * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });

          return (
            <div
              key={prod.id}
              className="group relative bg-white border border-neutral-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              onMouseEnter={() => setHoveredProductId(prod.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              {/* Product Visual Container */}
              <div className="relative aspect-3/4 bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => onSelectProductForHero(prod)}>
                <ProductVisual
                  product={prod}
                  currentShot={isHovered && prod.gallery.length > 1 ? prod.gallery[1] : prod.gallery[0]}
                  size="md"
                  className="w-full h-full"
                />

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
                  {prod.isHero && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-black/80 px-2 py-0.5 rounded border border-amber-500/40">
                      Featured PDP
                    </span>
                  )}
                  {prod.tag && (
                    <span className="text-[10px] font-mono uppercase text-neutral-300 bg-neutral-900/80 px-2 py-0.5 rounded">
                      {prod.tag.split('·')[0]}
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(prod);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isWishlisted 
                      ? 'bg-rose-50 text-rose-600' 
                      : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-black'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>

                {/* Quick Switch to Hero Overlay Button */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProductForHero(prod);
                    }}
                    className="flex-1 py-2 bg-white/95 hover:bg-white text-black text-xs font-mono font-bold rounded shadow-lg flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View in PDP</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAddToCart(prod, prod.defaultSize);
                    }}
                    className="py-2 px-3 bg-black hover:bg-neutral-900 text-white text-xs font-mono font-bold rounded shadow-lg flex items-center justify-center transition-transform active:scale-95"
                    title={`Add size ${prod.defaultSize} to cart`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                    {prod.category} · Heavyweight Streetwear
                  </div>
                  <h3 
                    onClick={() => onSelectProductForHero(prod)}
                    className="text-base font-heading font-black text-neutral-900 uppercase truncate hover:underline cursor-pointer"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                    {prod.subtitle}
                  </p>
                </div>

                {/* Price Baseline */}
                <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-base text-neutral-950 tabular-nums">
                      {currency.symbol} {displayPrice}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 line-through tabular-nums">
                      {currency.symbol} {displayOriginalPrice}
                    </span>
                  </div>

                  {/* Loyalty Coins Badge */}
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-900 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    <span>+{Math.floor(prod.price / 10)}</span>
                    <span className="text-[9px] text-amber-800 font-semibold">Coins</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
