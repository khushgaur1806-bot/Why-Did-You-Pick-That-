import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Minus, Plus } from 'lucide-react';
import { Product, Size, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface StickyBottomBarProps {
  isVisible: boolean;
  product: Product;
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
  quantity: number;
  onUpdateQuantity: (qty: number) => void;
  onAddToCart: (product: Product, size: Size, quantity: number) => void;
  onBuyNow: (product: Product, size: Size, quantity: number) => void;
  currentCurrency: CurrencyCode;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  isVisible,
  product,
  selectedSize,
  onSelectSize,
  quantity,
  onUpdateQuantity,
  onAddToCart,
  onBuyNow,
  currentCurrency,
}) => {
  const currency = CURRENCIES[currentCurrency];
  const allSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const formattedPrice = (product.price * currency.rateFromINR).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-300 shadow-[0_-8px_25px_rgba(0,0,0,0.12)] py-2.5 px-3 sm:px-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Left: Product Thumbnail & Title + Price */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-12 sm:w-12 sm:h-14 bg-neutral-900 rounded-md overflow-hidden shrink-0 border border-neutral-200">
                <ProductVisual product={product} size="sm" className="w-full h-full scale-90" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-heading font-black text-neutral-900 uppercase truncate">
                  {product.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800">
                  <span>{currency.symbol} {formattedPrice}</span>
                  <span className="hidden md:inline text-[10px] font-normal text-emerald-600 bg-emerald-50 px-1 rounded">
                    Free Ship
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Synchronized Size Selector & Quantity Stepper */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Synchronized Size Dropdown */}
              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={(e) => onSelectSize(e.target.value as Size)}
                  className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 rounded-md py-1.5 px-2.5 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                  aria-label="Select size"
                >
                  {allSizes.map((sz) => {
                    const isOutOfStock = product.outOfStockSizes.includes(sz);
                    return (
                      <option key={sz} value={sz} disabled={isOutOfStock}>
                        {sz} - {currency.symbol} {formattedPrice} {isOutOfStock ? '(Sold Out)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Quantity Counter */}
              <div className="hidden sm:flex items-center border border-neutral-300 rounded-md bg-neutral-50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="px-2 py-1.5 text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-7 text-center font-mono font-bold text-xs text-neutral-950 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(quantity + 1)}
                  className="px-2 py-1.5 text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right: Dual CTAs */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Secondary CTA: Compact "Add to Cart" */}
              <button
                type="button"
                onClick={() => onAddToCart(product, selectedSize, quantity)}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 border border-black hover:bg-neutral-100 text-black text-xs font-heading font-bold uppercase rounded-md transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>

              {/* High-emphasis Primary CTA: "Buy Now" */}
              <button
                type="button"
                onClick={() => onBuyNow(product, selectedSize, quantity)}
                className="flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 bg-black hover:bg-neutral-900 active:scale-[0.98] text-white text-xs sm:text-sm font-heading font-black uppercase tracking-wider rounded-md transition-all shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
