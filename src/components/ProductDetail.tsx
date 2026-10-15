import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Ruler, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Maximize2,
  ChevronRight,
  Flame,
  CreditCard,
  Smartphone,
  Banknote,
  Sparkles,
  Crown,
  MessageCircle,
  MapPin,
  Building2,
  Upload
} from 'lucide-react';
import { Product, Size, GalleryShot, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';
import { getProductCustomImages } from '../utils/mediaStore';
import { ProductVisual } from './ProductVisual';
import { SizeChartModal } from './SizeChartModal';

interface ProductDetailProps {
  product: Product;
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
  quantity: number;
  onUpdateQuantity: (qty: number) => void;
  onAddToCart: (product: Product, size: Size, quantity: number) => void;
  onBuyNow: (product: Product, size: Size, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currentCurrency: CurrencyCode;
  onRegisterMainCTA?: (element: HTMLElement | null) => void;
  onOpenLoyalty?: () => void;
  onOpenUpload?: (productId?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  selectedSize,
  onSelectSize,
  quantity,
  onUpdateQuantity,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  currentCurrency,
  onRegisterMainCTA,
  onOpenLoyalty,
  onOpenUpload,
}) => {
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [customImages, setCustomImages] = useState<string[]>([]);

  const mainCtaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCustomImages(getProductCustomImages(product.id));
    setActiveShotIndex(0);
  }, [product.id]);

  useEffect(() => {
    const handleUpdate = () => {
      setCustomImages(getProductCustomImages(product.id));
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('mw_product_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('mw_product_updated', handleUpdate);
    };
  }, [product.id]);

  // Register main CTA element for sticky bottom bar intersection detection
  useEffect(() => {
    if (onRegisterMainCTA && mainCtaRef.current) {
      onRegisterMainCTA(mainCtaRef.current);
    }
  }, [onRegisterMainCTA]);

  const currency = CURRENCIES[currentCurrency];
  const convertedPrice = (product.price * currency.rateFromINR).toLocaleString('en-IN', {
    maximumFractionDigits: currentCurrency === 'INR' ? 2 : 2,
    minimumFractionDigits: 2,
  });
  const convertedOriginalPrice = (product.originalPrice * currency.rateFromINR).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const allSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const fullGallery: GalleryShot[] = [
    ...customImages.map((imgUrl, i) => ({
      id: `custom-shot-${i}`,
      label: `Uploaded Custom Fit ${i + 1}`,
      angle: 'detail' as const,
      imageUrl: imgUrl,
    })),
    ...product.gallery,
  ];

  const activeShot = fullGallery[activeShotIndex] || fullGallery[0];

  // Mouse move for high-precision zoom lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `${product.title} - Sidhu Moose Wala Streetwear`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-6 uppercase tracking-wider">
        <a href="#home" className="hover:text-black transition-colors">Home</a>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="hover:text-black cursor-pointer transition-colors">MEN</span>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main PDP Grid (Left: Gallery, Right: Purchase Module) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* Left Column: Visual Gallery + Thumbnails (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start sticky top-24">
          
          {/* Thumbnails Column */}
          <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto w-full md:w-20 shrink-0 pb-2 md:pb-0 scrollbar-none">
            {fullGallery.map((shot, idx) => {
              const isSelected = idx === activeShotIndex;
              return (
                <button
                  key={shot.id}
                  onClick={() => setActiveShotIndex(idx)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-neutral-900 flex items-center justify-center cursor-pointer ${
                    isSelected ? 'border-neutral-950 shadow-md ring-2 ring-neutral-900/10' : 'border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`View ${shot.label}`}
                >
                  <ProductVisual
                    product={product}
                    currentShot={shot}
                    size="sm"
                    className="w-full h-full pointer-events-none scale-90"
                  />
                  {isSelected && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-black" />
                  )}
                </button>
              );
            })}

            {/* Upload Custom View for This Product */}
            {onOpenUpload && (
              <button
                type="button"
                onClick={() => onOpenUpload(product.id)}
                className="w-16 h-20 md:w-20 md:h-24 rounded-lg border-2 border-dashed border-amber-500/60 hover:border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 flex flex-col items-center justify-center gap-1 transition-all shrink-0 p-1 cursor-pointer"
                title="Upload custom photo or print for this apparel"
              >
                <Upload className="w-4 h-4 text-amber-600" />
                <span className="text-[9px] font-mono text-center leading-tight font-bold">Upload Photo</span>
              </button>
            )}
          </div>

          {/* Primary Main Image Frame with Zoom-on-Hover */}
          <div 
            ref={galleryRef}
            className="relative flex-1 w-full aspect-3/4 sm:aspect-4/5 md:aspect-3/4 bg-neutral-900 rounded-xl overflow-hidden shadow-sm border border-neutral-200/80 cursor-crosshair group"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Main Visual */}
            <ProductVisual
              product={product}
              currentShot={activeShot}
              isZoomed={isZooming}
              zoomPosition={zoomPos}
              size="hero"
              className="w-full h-full"
            />

            {/* Hover Zoom Hint */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900/75 backdrop-blur-md rounded text-[11px] font-mono text-neutral-300 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Hover to Zoom</span>
            </div>

            {/* Wishlist Floating Button on Main Visual */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                isWishlisted 
                  ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                  : 'bg-white/90 text-neutral-700 hover:text-black hover:bg-white border border-neutral-200'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Header & Badges */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  {product.tag || 'Official Drop'}
                </span>
                <span className="text-xs text-neutral-400 font-mono">·</span>
                <span className="text-xs text-neutral-500 font-mono uppercase">{product.category}</span>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black py-1 px-2 rounded hover:bg-neutral-100 transition-colors"
                title="Share product link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight text-neutral-950 mt-2 uppercase">
              {product.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-medium">
              {product.subtitle}
            </p>
          </div>

          {/* Price Display Section */}
          <div className="pb-4 border-b border-neutral-200">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-bold text-neutral-950 tracking-tight tabular-nums">
                {currency.symbol} {convertedPrice}
              </span>

              <span className="text-sm font-mono text-neutral-400 line-through tabular-nums">
                {currency.symbol} {convertedOriginalPrice}
              </span>

              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {product.discountPercent}% OFF
              </span>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 mt-1.5 flex items-center gap-2">
              <span>Inclusive of all taxes</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">Free Express Shipping</span>
            </div>
          </div>

          {/* Offers Available Box (Matching User Reference Screenshot) */}
          <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-900">
              <span className="flex items-center gap-1.5">
                Offers Available <span role="img" aria-label="sparkles">🤩</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Promo Code</span>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              <div className="px-4 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-neutral-800">Free Shipping on Orders Above ₹999</span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded shrink-0">
                  No Code Req.
                </span>
              </div>

              <div className="px-4 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-neutral-800">
                    Get <strong className="font-semibold text-black">Free Gift</strong> on all Prepaid orders
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                  Auto applied
                </span>
              </div>

              {/* Moose Wala Loyalty Points Gamification */}
              <div 
                onClick={onOpenLoyalty}
                className="px-4 py-2.5 flex items-center justify-between gap-2 bg-amber-500/10 hover:bg-amber-500/15 transition-colors cursor-pointer"
                title="View Moose Wala Loyalty Rewards"
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-amber-950 font-medium text-xs">
                    Earn <strong className="font-bold text-black">+{Math.floor(product.price / 10)} MW Coins</strong> with this item
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded shrink-0">
                  Loyalty Points
                </span>
              </div>

              <div className="px-4 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-neutral-800">
                    Get Flat <strong className="font-semibold text-black">5% OFF</strong> on prepaid orders.
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                  Auto applied
                </span>
              </div>
            </div>
          </div>

          {/* Size Selector Module */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              {/* Dynamic Size Label */}
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-900 font-mono">
                Size: <span className="font-black text-black">{selectedSize}</span>
              </div>

              {/* Size Guide Trigger */}
              <button
                type="button"
                onClick={() => setIsSizeChartOpen(true)}
                className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black font-medium transition-colors group cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black" />
                <span className="underline underline-offset-4 decoration-neutral-300 group-hover:decoration-black">Size Chart</span>
              </button>
            </div>

            {/* Horizontal Pill Grid: XS, S, M, L, XL, XXL, XXXL */}
            <div className="grid grid-cols-7 gap-2">
              {allSizes.map((sz) => {
                const isSelected = selectedSize === sz;
                const isOutOfStock = product.outOfStockSizes.includes(sz);

                return (
                  <button
                    key={sz}
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => onSelectSize(sz)}
                    className={`relative py-3 px-1 rounded-md text-xs font-mono font-bold flex items-center justify-center transition-all select-none ${
                      isOutOfStock
                        ? 'opacity-40 cursor-not-allowed pointer-events-none bg-neutral-100 text-neutral-400 border border-neutral-200 out-of-stock-strike'
                        : isSelected
                        ? 'bg-black text-white shadow-sm border border-black'
                        : 'bg-white border border-neutral-300 hover:border-black text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    {/* Animated selection border using Framer Motion layoutId */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeSizePill"
                        className="absolute inset-0 rounded-md border-2 border-black pointer-events-none"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}

                    <span className="relative z-10">{sz}</span>
                  </button>
                );
              })}
            </div>

            {/* Fit Guarantee Note */}
            <p className="text-[11px] text-neutral-500">
              Drop-shoulder boxy streetwear drape. Free size exchanges across India within 7 days.
            </p>
          </div>

          {/* Primary Action Buttons: Quantity Counter + Add to Cart + Buy It Now */}
          <div ref={mainCtaRef} className="space-y-3 pt-2">
            
            <div className="flex gap-3">
              {/* Quantity Counter [- 1 +] */}
              <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="px-3.5 py-3 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-neutral-950 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Secondary CTA: Outline "Add to Cart" */}
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="flex-1 py-3 px-4 border-2 border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-white rounded-lg font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 group active:scale-[0.99] cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Primary CTA: Bold solid black "Buy It Now" */}
            <button
              type="button"
              onClick={() => onBuyNow(product, selectedSize, quantity)}
              className="w-full py-4 px-6 bg-black hover:bg-neutral-900 active:scale-[0.99] text-white rounded-lg font-heading font-black text-base uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Buy It Now</span>
              <span className="font-mono font-normal text-xs text-neutral-400">
                · {currency.symbol} {((product.price * quantity) * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </button>

            {/* Custom Design / Photo Upload Button */}
            {onOpenUpload && (
              <button
                type="button"
                onClick={() => onOpenUpload(product.id)}
                className="w-full py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-950 border border-amber-500/30 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-amber-600" />
                <span>Upload Custom Photo / Design for this Garment</span>
              </button>
            )}

            {/* Direct WhatsApp Instant Order / Sizing Hotline */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1.5">
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Order / Sizing via WhatsApp:
                </span>
                <span className="text-neutral-400">Available 24x7</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/919461650052?text=${encodeURIComponent(`Hi Moose Wala! I want to order "${product.title}" (Size: ${selectedSize}, Qty: ${quantity}) for ₹${product.price * quantity}. Please confirm order & dispatch details.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WhatsApp: 9461650052</span>
                </a>
                <a
                  href={`https://wa.me/919928359313?text=${encodeURIComponent(`Hi Moose Wala VIP Desk! I want to order "${product.title}" (Size: ${selectedSize}, Qty: ${quantity}) for ₹${product.price * quantity}. Please assist me with my order & sizing.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: 9928359313</span>
                </a>
              </div>

              {/* Shoppers WhatsApp Group Callout */}
              <a
                href="https://chat.whatsapp.com/CG92U38xvAcFOFkxmJ5rk8"
                target="_blank"
                rel="noreferrer"
                className="mt-2 p-2.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-neutral-900 hover:from-emerald-900 hover:to-neutral-800 text-white rounded-lg text-xs font-mono flex items-center justify-between border border-emerald-500/40 transition-all shadow-xs group"
                title="Any body shopping, join this WhatsApp group for latest update"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-emerald-500 text-black flex items-center justify-center shrink-0 font-bold">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="font-heading font-black text-xs uppercase text-emerald-300 block truncate">
                      Shoppers WhatsApp Group
                    </span>
                    <span className="text-[10px] text-neutral-300 block truncate">
                      Any body shopping: Join for live drop updates & tracking
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-400 text-black px-2 py-0.5 rounded font-bold uppercase shrink-0 group-hover:scale-105 transition-transform">
                  Join Group
                </span>
              </a>
            </div>
          </div>

          {/* Supported Payment Methods Section */}
          <div className="pt-2 border-t border-neutral-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2.5">
              Guaranteed Safe & Supported Checkout
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-2 bg-neutral-100/70 border border-neutral-200/80 rounded-md text-xs text-neutral-800">
                <Banknote className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-medium text-[11px]">Cash on Delivery</span>
              </div>

              <div className="flex items-center gap-2 p-2 bg-neutral-100/70 border border-neutral-200/80 rounded-md text-xs text-neutral-800">
                <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium text-[11px]">UPI (GPay / PhonePe)</span>
              </div>

              <div className="flex items-center gap-2 p-2 bg-neutral-100/70 border border-neutral-200/80 rounded-md text-xs text-neutral-800">
                <CreditCard className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="font-medium text-[11px]">Cards & Visa</span>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Sizing Assistance (9461650052 / 9928359313) */}
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-neutral-900 block">Need Instant Size Guidance on WhatsApp?</span>
                <span className="text-[11px] text-neutral-600 font-mono">Chat with our stylists in Punjab:</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://wa.me/919461650052?text=Hello%20Moose%20Wala%20Team,%20I%20need%20size%20advice%20for%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-white hover:bg-emerald-600 hover:text-white text-neutral-900 rounded border border-emerald-300 text-xs font-mono font-bold transition-colors shadow-xs"
              >
                9461650052
              </a>
              <a
                href={`https://wa.me/919928359313?text=Hello%20Moose%20Wala%20Team,%20I%20need%20VIP%20sizing%20help%20for%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-white hover:bg-emerald-600 hover:text-white text-neutral-900 rounded border border-emerald-300 text-xs font-mono font-bold transition-colors shadow-xs"
              >
                9928359313
              </a>
            </div>
          </div>

          {/* Delivery & Authenticity Highlights */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-4 h-4 text-neutral-700 mb-1" />
              <span className="text-[11px] font-bold text-neutral-900">2-4 Days</span>
              <span className="text-[10px] text-neutral-500">Pan-India Dispatch</span>
            </div>
            <div className="flex flex-col items-center border-x border-neutral-200 px-2">
              <RotateCcw className="w-4 h-4 text-neutral-700 mb-1" />
              <span className="text-[11px] font-bold text-neutral-900">7-Day Free</span>
              <span className="text-[10px] text-neutral-500">Hassle-Free Exchange</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-neutral-700 mb-1" />
              <span className="text-[11px] font-bold text-neutral-900">100% Genuine</span>
              <span className="text-[10px] text-neutral-500">Verified Moose Wala</span>
            </div>
          </div>

          {/* Garment Details & Story */}
          <div className="border border-neutral-200 rounded-xl p-4 bg-white text-xs space-y-3">
            <h4 className="font-heading uppercase font-bold text-neutral-900 tracking-wider">
              Product Specifications & Craftsmanship
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-y-2 pt-2 border-t border-neutral-100 font-mono text-[11px]">
              <div className="text-neutral-500">Fabric Build:</div>
              <div className="text-neutral-900 font-bold">Heavyweight Super-Combed</div>

              <div className="text-neutral-500">Composition:</div>
              <div className="text-neutral-900 font-medium">{product.fabric}</div>

              <div className="text-neutral-500">Fit Silhouette:</div>
              <div className="text-neutral-900 font-medium">{product.fit}</div>

              <div className="text-neutral-500">Office & Factory:</div>
              <div className="text-neutral-900 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                <span>Ajmer, Rajasthan, India</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        productTitle={product.title}
      />
    </div>
  );
};
