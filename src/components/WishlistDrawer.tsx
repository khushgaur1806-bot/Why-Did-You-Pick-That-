import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product, Size, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product, size: Size) => void;
  onSelectForHero: (product: Product) => void;
  currentCurrency: CurrencyCode;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectForHero,
  currentCurrency,
}) => {
  const currency = CURRENCIES[currentCurrency];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  <h3 className="font-heading font-black text-lg uppercase tracking-tight text-neutral-900">
                    Your Wishlist
                  </h3>
                  <span className="text-xs font-mono font-bold text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded-full">
                    {wishlistProducts.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-neutral-400 hover:text-black rounded-md hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {wishlistProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-8 h-8 text-neutral-300" />
                    </div>
                    <p className="font-heading uppercase text-neutral-900 font-bold text-base mb-1">
                      No saved pieces yet
                    </p>
                    <p className="text-xs text-neutral-500 max-w-xs">
                      Tap the heart icon on any Moose Wala drop to save it to your wishlist.
                    </p>
                  </div>
                ) : (
                  wishlistProducts.map((prod) => {
                    const price = (prod.price * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });
                    return (
                      <div
                        key={prod.id}
                        className="flex gap-3.5 p-3 rounded-lg border border-neutral-200 bg-neutral-50/40 relative group"
                      >
                        <div 
                          className="w-16 h-20 bg-neutral-900 rounded-md overflow-hidden shrink-0 border border-neutral-200 cursor-pointer"
                          onClick={() => {
                            onSelectForHero(prod);
                            onClose();
                          }}
                        >
                          <ProductVisual product={prod} size="sm" className="w-full h-full scale-90" />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 
                                onClick={() => {
                                  onSelectForHero(prod);
                                  onClose();
                                }}
                                className="font-heading font-black text-sm text-neutral-900 uppercase truncate hover:underline cursor-pointer"
                              >
                                {prod.title}
                              </h4>
                              <button
                                onClick={() => onRemoveFromWishlist(prod)}
                                className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-xs font-mono text-neutral-500">{prod.category}</div>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/60">
                            <span className="font-heading font-bold text-sm text-neutral-950">
                              {currency.symbol} {price}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                onMoveToCart(prod, prod.defaultSize);
                                onRemoveFromWishlist(prod);
                              }}
                              className="px-2.5 py-1 bg-black hover:bg-neutral-800 text-white text-xs font-heading font-bold uppercase rounded flex items-center gap-1 transition-colors"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Move to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
