import React, { useState, useEffect, useRef } from 'react';
import { HeaderAnnouncement } from './components/HeaderAnnouncement';
import { Navbar } from './components/Navbar';
import { HomeHeroBanner } from './components/HomeHeroBanner';
import { ArchiveWardrobeRail } from './components/ArchiveWardrobeRail';
import { ProductDetail } from './components/ProductDetail';
import { StickyBottomBar } from './components/StickyBottomBar';
import { CatalogSection } from './components/CatalogSection';
import { HeritageStorySection } from './components/HeritageStorySection';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';
import { ImageUploadModal } from './components/ImageUploadModal';
import { LookbookSection } from './components/LookbookSection';
import { NewsletterSignup } from './components/NewsletterSignup';
import { getCustomHeroImage } from './utils/mediaStore';
import { PRODUCTS } from './data/products';
import { Product, Size, CartItem, ProductCategory, CurrencyCode, LoyaltyReward } from './types/store';
import { MessageCircle, Crown, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  // Hero Product (Default: "Sidhu Moose Wala Bai Thaapi T-shirt" from authentic Urban Theka collection)
  const [heroProduct, setHeroProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(PRODUCTS[0].defaultSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [customHeroImage, setCustomHeroImage] = useState<string | null>(getCustomHeroImage());

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedSize: 'XS',
      quantity: 1,
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-undercover-varsity']);

  // Loyalty Points Gamification State
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mw_loyalty_points');
      return saved ? parseInt(saved, 10) : 250; // Welcome 250 MW Coins bonus
    } catch {
      return 250;
    }
  });

  const [activeReward, setActiveReward] = useState<LoyaltyReward | null>(null);
  const [pointsToast, setPointsToast] = useState<{ message: string; coins?: number } | null>(null);

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadProductId, setUploadProductId] = useState<string | undefined>(undefined);

  // Sync custom hero image on custom update
  useEffect(() => {
    const handleHeroUpdate = () => {
      setCustomHeroImage(getCustomHeroImage());
    };
    window.addEventListener('storage', handleHeroUpdate);
    window.addEventListener('mw_hero_updated', handleHeroUpdate);
    return () => {
      window.removeEventListener('storage', handleHeroUpdate);
      window.removeEventListener('mw_hero_updated', handleHeroUpdate);
    };
  }, []);

  // Category Filter & Currency
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  // Sticky Bottom Floating Bar Visibility
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const mainCtaElementRef = useRef<HTMLElement | null>(null);

  // Persist loyalty points
  useEffect(() => {
    try {
      localStorage.setItem('mw_loyalty_points', loyaltyPoints.toString());
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }, [loyaltyPoints]);

  // Synchronize size when hero product changes
  const handleSelectProductForHero = (product: Product) => {
    setHeroProduct(product);
    setSelectedSize(product.defaultSize);
    setQuantity(1);
    const pdpEl = document.getElementById('pdp');
    if (pdpEl) {
      pdpEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Setup scroll observer for sticky bottom floating bar
  useEffect(() => {
    const handleScroll = () => {
      if (mainCtaElementRef.current) {
        const rect = mainCtaElementRef.current.getBoundingClientRect();
        setIsStickyBarVisible(rect.bottom < 80);
      } else {
        setIsStickyBarVisible(window.scrollY > 550);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, size: Size, qty: number) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [
        ...prev,
        {
          id: `cart-${product.id}-${size}-${Date.now()}`,
          product,
          selectedSize: size,
          quantity: qty,
        }
      ];
    });

    // Gamified feedback toast
    const potentialCoins = Math.floor((product.price * qty) / 10);
    showToast(`Added to Bag! You will earn +${potentialCoins} MW Coins at checkout`, potentialCoins);
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleBuyNow = (product: Product, size: Size, qty: number) => {
    handleAddToCart(product, size, qty);
    setIsCheckoutOpen(true);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const isAlready = prev.includes(product.id);
      if (!isAlready) {
        showToast(`Saved to Wishlist: ${product.title}`);
      }
      return isAlready ? prev.filter(id => id !== product.id) : [...prev, product.id];
    });
  };

  // Loyalty reward redemption
  const handleRedeemReward = (reward: LoyaltyReward) => {
    if (loyaltyPoints >= reward.pointsCost) {
      setLoyaltyPoints(prev => prev - reward.pointsCost);
      setActiveReward(reward);
      setIsLoyaltyOpen(false);
      showToast(`Applied ${reward.title} to your order!`, -reward.pointsCost);
    }
  };

  const handleOrderSuccess = (earnedCoins: number) => {
    setLoyaltyPoints(prev => prev + earnedCoins);
    setCartItems([]);
    setActiveReward(null);
    showToast(`Order Placed! +${earnedCoins} MW Coins added to your header balance!`, earnedCoins);
  };

  const handleRewardCoins = (amount: number, reason: string) => {
    setLoyaltyPoints(prev => prev + amount);
    showToast(`VIP List Joined! +${amount} MW Coins added to your header balance!`, amount);
  };

  const showToast = (message: string, coins?: number) => {
    setPointsToast({ message, coins });
    setTimeout(() => {
      setPointsToast(null);
    }, 4000);
  };

  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-black selection:text-white relative">
      
      {/* 1. Top Promotional Banner */}
      <HeaderAnnouncement />

      {/* 2. Header Navigation with Moose Wala Loyalty Points Tracker */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        loyaltyPoints={loyaltyPoints}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentCurrency={currency}
        onSelectCurrency={setCurrency}
        onOpenUpload={() => {
          setUploadProductId(heroProduct.id);
          setIsUploadOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3. Attractive Homepage Editorial Campaign Banner */}
        <HomeHeroBanner
          featuredProduct={PRODUCTS[0]}
          onExploreDrop={() => {
            const el = document.getElementById('pdp');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectProduct={handleSelectProductForHero}
          currentCurrency={currency}
          onQuickAdd={(prod, sz) => handleAddToCart(prod, sz, 1)}
          onOpenUpload={() => {
            setUploadProductId(heroProduct.id);
            setIsUploadOpen(true);
          }}
          customHeroImage={customHeroImage}
        />

        {/* 4. Interactive Uploaded Streetwear Clothes Wardrobe Rail */}
        <ArchiveWardrobeRail
          products={PRODUCTS}
          selectedProduct={heroProduct}
          onSelectProduct={handleSelectProductForHero}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
          }}
          currentCurrency={currency}
        />

        {/* 5. Production-Grade Hero Product Detail Component (PDP) */}
        <section id="pdp" className="bg-white border-b border-neutral-200">
          <ProductDetail
            product={heroProduct}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            quantity={quantity}
            onUpdateQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            isWishlisted={wishlistIds.includes(heroProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            currentCurrency={currency}
            onRegisterMainCTA={(elem) => {
              mainCtaElementRef.current = elem;
            }}
            onOpenLoyalty={() => setIsLoyaltyOpen(true)}
            onOpenUpload={(prodId) => {
              setUploadProductId(prodId || heroProduct.id);
              setIsUploadOpen(true);
            }}
          />
        </section>

        {/* 5. Complete Streetwear Catalog & Price Standard Filters */}
        <CatalogSection
          products={PRODUCTS}
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectProductForHero={handleSelectProductForHero}
          onQuickAddToCart={(prod, sz) => handleAddToCart(prod, sz, 1)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          currentCurrency={currency}
        />

        {/* 6. Community Lookbook & Upload Gallery */}
        <LookbookSection
          onOpenUpload={() => {
            setUploadProductId(heroProduct.id);
            setIsUploadOpen(true);
          }}
        />

        {/* 7. Brand Heritage & Brotherhood Testimonials */}
        <HeritageStorySection />

        {/* 8. Newsletter Signup & Moose Wala VIP List (+700 Coins Reward) */}
        <NewsletterSignup
          onRewardCoins={handleRewardCoins}
          onOpenLoyaltyModal={() => setIsLoyaltyOpen(true)}
          currentPoints={loyaltyPoints}
        />
      </main>

      {/* 7. Sticky Bottom Floating Add-to-Cart Bar */}
      <StickyBottomBar
        isVisible={isStickyBarVisible}
        product={heroProduct}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        quantity={quantity}
        onUpdateQuantity={setQuantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        currentCurrency={currency}
      />

      {/* Interactive WhatsApp Multi-Line Concierge Widget (9461650052 & 9928359313) */}
      <WhatsAppWidget isStickyBarVisible={isStickyBarVisible} />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currentCurrency={currency}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(prod, sz) => handleAddToCart(prod, sz, 1)}
        onSelectForHero={handleSelectProductForHero}
        currentCurrency={currency}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProductForHero}
        currentCurrency={currency}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
        currentCurrency={currency}
        activeReward={activeReward}
      />

      {/* Moose Wala Brotherhood Rewards Modal */}
      <LoyaltyModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        points={loyaltyPoints}
        onRedeemReward={handleRedeemReward}
        activeRewardId={activeReward?.id || null}
      />

      {/* Moose Wala Image Studio & Asset Uploader Modal */}
      <ImageUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        initialProductId={uploadProductId}
      />

      {/* Gamified Loyalty Points Floating Toast Notification */}
      <AnimatePresence>
        {pointsToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-950 text-white border border-amber-500/50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0">
              <Crown className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono">
              <span className="font-bold text-amber-300 block">{pointsToast.message}</span>
              <span className="text-[10px] text-neutral-400">Moose Wala Brotherhood Rewards · Balance: {loyaltyPoints} Coins</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onSelectCategory={(cat) => {
        setActiveCategory(cat);
        const el = document.getElementById('catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

    </div>
  );
}
