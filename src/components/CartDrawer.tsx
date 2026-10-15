import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Gift, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  currentCurrency: CurrencyCode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currentCurrency,
}) => {
  const currency = CURRENCIES[currentCurrency];

  const subtotalINR = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThresholdINR = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdINR - subtotalINR);
  const freeShippingProgress = Math.min(100, (subtotalINR / freeShippingThresholdINR) * 100);

  const formattedSubtotal = (subtotalINR * currency.rateFromINR).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

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
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-neutral-900" />
                  <h3 className="font-heading font-black text-lg uppercase tracking-tight text-neutral-900">
                    Your Shopping Bag
                  </h3>
                  <span className="text-xs font-mono font-bold text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded-full">
                    {items.reduce((acc, i) => acc + i.quantity, 0)}
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

              {/* Free Shipping Progress Meter */}
              <div className="bg-neutral-900 text-white p-3.5 text-xs font-mono">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <span>
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-emerald-400 font-bold">Free India Shipping Unlocked!</span>
                      ) : (
                        <span>
                          Add <strong className="text-amber-300">₹{remainingForFreeShipping.toFixed(0)}</strong> more for Free Shipping
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400">{Math.round(freeShippingProgress)}%</span>
                </div>

                <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-3">
                      <ShoppingBag className="w-8 h-8 text-neutral-400" />
                    </div>
                    <p className="font-heading uppercase text-neutral-900 font-bold text-base mb-1">
                      Your bag is empty
                    </p>
                    <p className="text-xs text-neutral-500 max-w-xs mb-4">
                      Explore the Sidhu Moose Wala streetwear collection and add exclusive signature pieces.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-black text-white text-xs font-bold font-mono uppercase rounded-md hover:bg-neutral-800 transition-colors"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  items.map((item) => {
                    const itemPrice = (item.product.price * item.quantity * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3.5 p-3 rounded-lg border border-neutral-200 bg-neutral-50/40 relative group"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-20 bg-neutral-900 rounded-md overflow-hidden shrink-0 border border-neutral-200">
                          <ProductVisual product={item.product} size="sm" className="w-full h-full scale-90" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-heading font-black text-sm text-neutral-900 uppercase truncate">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mt-0.5">
                              <span>Size: <strong className="text-black">{item.selectedSize}</strong></span>
                              <span>·</span>
                              <span>{item.product.category}</span>
                            </div>
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/60">
                            <div className="flex items-center border border-neutral-300 rounded bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="px-2 py-0.5 text-neutral-600 hover:text-black disabled:opacity-30"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-neutral-600 hover:text-black"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-heading font-bold text-sm text-neutral-950 tabular-nums">
                              {currency.symbol} {itemPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50/70 space-y-3">
                  
                  {/* Loyalty Points Earned Tracker & Prepaid Offer Alert */}
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-[11px] text-amber-950">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Coins Earned on this bag:</span>
                    </span>
                    <span className="font-mono font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      +{Math.floor(subtotalINR / 10)} MW Coins
                    </span>
                  </div>

                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-[11px] text-emerald-800">
                    <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Prepaid Bonus:</strong> Get Free Exclusive Gift + Extra 5% off automatically at checkout!
                    </span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-neutral-500 block">Subtotal</span>
                      <span className="text-[11px] text-neutral-400 font-mono">Taxes included · Free delivery</span>
                    </div>
                    <span className="text-2xl font-heading font-black text-neutral-950 tabular-nums">
                      {currency.symbol} {formattedSubtotal}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={onProceedToCheckout}
                    className="w-full py-3.5 px-4 bg-black hover:bg-neutral-900 active:scale-[0.99] text-white rounded-lg font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Proceed to Indian Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                    <div className="text-center text-[10px] font-mono text-neutral-400">
                    Cash on Delivery (COD) · UPI · Visa / Mastercard
                  </div>

                  {/* Shoppers WhatsApp Group Callout */}
                  <a
                    href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-lg flex items-center justify-between gap-2 text-xs text-emerald-950 transition-colors group block"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <span className="font-heading font-bold uppercase text-[11px] block truncate">
                          Join Shoppers WhatsApp Group
                        </span>
                        <span className="text-[10px] text-emerald-800 font-mono block truncate">
                          Latest drops & live shopping updates
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
