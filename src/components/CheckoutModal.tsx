import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Banknote, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Lock,
  ArrowRight,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { CartItem, CurrencyCode, LoyaltyReward } from '../types/store';
import { CURRENCIES } from '../data/products';
import { Crown } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (earnedCoins: number) => void;
  currentCurrency: CurrencyCode;
  activeReward?: LoyaltyReward | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  currentCurrency,
  activeReward,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [coinsAwarded, setCoinsAwarded] = useState(0);

  const [form, setForm] = useState({
    fullName: 'Arshdeep Singh',
    phone: '9876543210',
    email: 'khushgaur1806@gmail.com',
    address: 'SCF 42, Phase 7, Industrial Area',
    city: 'Mohali',
    state: 'Punjab',
    pincode: '160062',
  });

  if (!isOpen) return null;

  const currency = CURRENCIES[currentCurrency];
  const subtotalINR = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // 5% discount if prepaid (UPI or Card)
  const isPrepaid = paymentMethod === 'upi' || paymentMethod === 'card';
  const prepaidDiscountINR = isPrepaid ? Math.round(subtotalINR * 0.05) : 0;
  
  // Applied Loyalty reward discount
  const loyaltyVoucherDiscountINR = activeReward ? activeReward.discountINR : 0;
  
  const finalTotalINR = Math.max(0, subtotalINR - prepaidDiscountINR - loyaltyVoucherDiscountINR);
  const earnedCoinsCalculated = Math.floor(finalTotalINR / 10) + (paymentMethod === 'upi' ? 25 : 0);

  const formattedSubtotal = (subtotalINR * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const formattedPrepaidDiscount = (prepaidDiscountINR * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const formattedVoucherDiscount = (loyaltyVoucherDiscountINR * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const formattedTotal = (finalTotalINR * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `MW-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setCoinsAwarded(earnedCoinsCalculated);
      setIsSubmitting(false);
      setOrderComplete(true);
      onOrderSuccess(earnedCoinsCalculated);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => !isSubmitting && onClose()}
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-5 sm:p-7 z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        {!orderComplete && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-black rounded-md hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ORDER SUCCESS SCREEN */}
        {orderComplete ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-neutral-950">
              Order Confirmed!
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Waheguru Ji Ka Khalsa! Your official Moose Wala streetwear order has been placed successfully.
            </p>

            {/* Gamified Coins Celebration Badge */}
            <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 rounded-xl border border-amber-400/50 max-w-md mx-auto text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-amber-900 font-heading font-black text-sm uppercase">
                <Crown className="w-4 h-4 text-amber-600 animate-spin" />
                <span>+{coinsAwarded} MW Coins Earned!</span>
              </div>
              <p className="text-xs text-amber-950 font-medium">
                Successfully credited to your <strong>Moose Wala Loyalty Points</strong> balance in the top header.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 max-w-md mx-auto font-mono text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Order Reference:</span>
                <span className="font-bold text-black">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Mode:</span>
                <span className="uppercase font-semibold text-neutral-900">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? `Instant UPI (${upiApp.toUpperCase()})` : 'Credit/Debit Card'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping To:</span>
                <span className="font-medium text-neutral-900">{form.fullName}, {form.city}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-neutral-200">
                <span>Total Amount:</span>
                <span className="text-black">{currency.symbol} {formattedTotal}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 bg-emerald-50 max-w-md mx-auto p-2.5 rounded-lg border border-emerald-200">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Estimated Delivery: 2-3 Business Days (Express Pan-India Airway)</span>
            </div>

            {/* Shoppers WhatsApp Group Card */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-emerald-50 rounded-xl border border-emerald-300 max-w-md mx-auto text-left space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-xs uppercase text-emerald-950 tracking-wider">
                      Official Shoppers WhatsApp Group
                    </span>
                    <span className="bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                      Latest Updates
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 mt-1 leading-snug">
                    Any body shopping, join this official WhatsApp group for real-time dispatch alerts, airway tracking, and unreleased drop previews!
                  </p>
                </div>
              </div>

              <a
                href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-lg font-heading font-black text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join WhatsApp Group For Order Updates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="py-3 px-8 bg-black hover:bg-neutral-800 text-white font-heading font-bold uppercase rounded-lg text-xs tracking-wider transition-colors"
              >
                Continue Exploring Collection
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handlePlaceOrder} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-bold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-neutral-950">
                Shipping & Payment Details
              </h3>
              <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-medium">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Any body shopping: Join our official WhatsApp group for live drop updates!</span>
                </div>
                <a
                  href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-mono font-bold text-emerald-700 hover:text-emerald-900 hover:underline shrink-0 flex items-center gap-1"
                >
                  <span>Join Group</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Address Form */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 font-bold">1. Delivery Address</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full text-xs font-medium px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none"
                    placeholder="Recipient Name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1">Phone Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs font-medium px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none font-mono"
                    placeholder="10-digit mobile"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1">Street Address / Landmark *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full text-xs font-medium px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none"
                    placeholder="House/Plot no, Area, Landmark"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full text-xs font-medium px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full text-xs font-medium px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-neutral-400 font-bold">2. Payment Method</span>
                <span className="text-[11px] font-mono text-emerald-600 font-bold">5% OFF with UPI/Card</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'upi' ? 'border-black bg-neutral-950 text-white shadow-sm' : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                      -5% OFF
                    </span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs uppercase block">Instant UPI</span>
                    <span className={`text-[10px] ${paymentMethod === 'upi' ? 'text-neutral-400' : 'text-neutral-500'}`}>GPay/PhonePe</span>
                  </div>
                </button>

                {/* Cash on Delivery (COD) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cod' ? 'border-black bg-neutral-950 text-white shadow-sm' : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-400 mb-1" />
                  <div>
                    <span className="font-heading font-bold text-xs uppercase block">Cash On Delivery</span>
                    <span className={`text-[10px] ${paymentMethod === 'cod' ? 'text-neutral-400' : 'text-neutral-500'}`}>Pay at doorstep</span>
                  </div>
                </button>

                {/* Cards */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card' ? 'border-black bg-neutral-950 text-white shadow-sm' : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-400 mb-1" />
                  <div>
                    <span className="font-heading font-bold text-xs uppercase block">Credit/Debit</span>
                    <span className={`text-[10px] ${paymentMethod === 'card' ? 'text-neutral-400' : 'text-neutral-500'}`}>Visa / Mastercard</span>
                  </div>
                </button>
              </div>

              {/* UPI App Selection if UPI is chosen */}
              {paymentMethod === 'upi' && (
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-600">Choose App:</span>
                  <div className="flex gap-2">
                    {(['gpay', 'phonepe', 'paytm'] as const).map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiApp(app)}
                        className={`px-3 py-1 rounded border text-[11px] font-bold uppercase transition-colors ${
                          upiApp === app ? 'bg-black text-white border-black' : 'bg-white text-neutral-700 border-neutral-200'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal ({items.length} items):</span>
                <span>{currency.symbol} {formattedSubtotal}</span>
              </div>

              {prepaidDiscountINR > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Prepaid 5% Auto Discount:</span>
                  <span>- {currency.symbol} {formattedPrepaidDiscount}</span>
                </div>
              )}

              {activeReward && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>MW Loyalty Voucher ({activeReward.title}):</span>
                  <span>- {currency.symbol} {formattedVoucherDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping Charges (India):</span>
                <span className="text-emerald-700 font-bold uppercase">Free Express</span>
              </div>

              {/* Loyalty coins preview */}
              <div className="flex items-center justify-between text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded border border-amber-200 text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span>Coins to be earned on this order:</span>
                </span>
                <span className="font-mono text-amber-700 font-black">+{earnedCoinsCalculated} MW Coins</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Total Amount to Pay:</span>
                <span className="text-base">{currency.symbol} {formattedTotal}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-black hover:bg-neutral-900 active:scale-[0.99] text-white rounded-lg font-heading font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Generating Order Token...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Confirm & Place Order · {currency.symbol} {formattedTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
