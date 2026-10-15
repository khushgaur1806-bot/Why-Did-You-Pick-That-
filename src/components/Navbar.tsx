import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  Globe,
  Crown,
  Upload
} from 'lucide-react';
import { ProductCategory, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';
import { MooseWalaLogo } from './MooseWalaLogo';

interface NavbarProps {
  activeCategory: ProductCategory | 'All';
  onSelectCategory: (category: ProductCategory | 'All') => void;
  cartCount: number;
  wishlistCount: number;
  loyaltyPoints: number;
  onOpenLoyalty: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  currentCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  onOpenUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  loyaltyPoints,
  onOpenLoyalty,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  currentCurrency,
  onSelectCurrency,
  onOpenUpload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mensDropdownOpen, setMensDropdownOpen] = useState(false);

  const mensCategories: ProductCategory[] = [
    'T-shirts',
    'Jeans',
    'Lowers',
    'Shawls',
    'Hoodies',
    'Jackets'
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo & Wordmark (Moose Wala) */}
              <button 
                onClick={() => onSelectCategory('All')}
                className="flex items-center text-left group cursor-pointer"
                aria-label="Moose Wala Home"
              >
                <MooseWalaLogo variant="dark" size="md" />
              </button>
            </div>

            {/* Center: Category Navigation (Men's Streetwear Only) */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">
              {/* All Drops */}
              <button
                onClick={() => onSelectCategory('All')}
                className={`py-1 transition-colors relative cursor-pointer ${
                  activeCategory === 'All' ? 'text-black font-semibold' : 'text-neutral-600 hover:text-black'
                }`}
              >
                All Men's Drops
                {activeCategory === 'All' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              {/* Men's Mega Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setMensDropdownOpen(true)}
                onMouseLeave={() => setMensDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 py-1 transition-colors cursor-pointer ${
                    mensCategories.includes(activeCategory as ProductCategory)
                      ? 'text-black font-semibold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <span>Men's Streetwear</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-transform" />
                  {mensCategories.includes(activeCategory as ProductCategory) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {mensDropdownOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-neutral-200 shadow-xl rounded-lg py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
                      Urban Theka Men's
                    </div>
                    {mensCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          onSelectCategory(cat);
                          setMensDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer ${
                          activeCategory === cat ? 'bg-neutral-100 font-semibold text-black' : 'text-neutral-700'
                        }`}
                      >
                        <span>{cat}</span>
                        {cat === 'T-shirts' && <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-mono">₹2,080</span>}
                        {cat === 'Hoodies' && <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-mono">₹3,000+</span>}
                        {cat === 'Jackets' && <span className="text-[10px] text-neutral-500 font-mono">₹5,500+</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accessories: Bandana (बांद्रा) */}
              <button
                onClick={() => onSelectCategory('Bandana')}
                className={`flex items-center gap-1.5 py-1 transition-colors relative cursor-pointer ${
                  activeCategory === 'Bandana' ? 'text-black font-semibold' : 'text-neutral-600 hover:text-black'
                }`}
              >
                <span>Bandana</span>
                <span className="text-[11px] text-neutral-400 font-hindi">(बांद्रा)</span>
                {activeCategory === 'Bandana' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              {/* Bai Thaapi Flagship Direct Link */}
              <button
                onClick={() => onSelectCategory('T-shirts')}
                className="py-1 text-neutral-600 hover:text-black transition-colors cursor-pointer font-medium"
              >
                Bai Thaapi
              </button>

              {/* Malwa Block Direct Link */}
              <button
                onClick={() => onSelectCategory('T-shirts')}
                className="py-1 text-neutral-600 hover:text-black transition-colors cursor-pointer font-medium"
              >
                Malwa Block
              </button>
            </nav>

            {/* Right: Actions (Search, Currency, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Search products"
                title="Search collection"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Currency Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-neutral-800 hover:bg-neutral-100 rounded border border-neutral-200 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-semibold">{CURRENCIES[currentCurrency].symbol} {currentCurrency}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-neutral-200 shadow-xl rounded-md py-1.5 z-50">
                    <div className="px-3 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-wider border-b border-neutral-100">
                      Select Currency
                    </div>
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          onSelectCurrency(curr.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-neutral-50 ${
                          currentCurrency === curr.code ? 'font-bold text-black bg-neutral-100' : 'text-neutral-700'
                        }`}
                      >
                        <span>{curr.symbol} {curr.code}</span>
                        {curr.code === 'INR' && <span className="text-[9px] text-neutral-500">Native</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload Brand Assets / Photos Button */}
              {onOpenUpload && (
                <button
                  type="button"
                  onClick={onOpenUpload}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 hover:bg-black text-amber-300 hover:text-amber-200 border border-amber-500/40 rounded-md text-xs font-mono font-medium transition-all shadow-xs cursor-pointer"
                  title="Upload brand logo or photos to website"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline font-bold">Upload Image</span>
                </button>
              )}

              {/* Moose Wala Loyalty Points Tracker Button */}
              <button
                type="button"
                onClick={onOpenLoyalty}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300/80 rounded-md text-xs font-mono font-bold transition-all group shadow-xs cursor-pointer"
                title="Moose Wala Brotherhood Rewards"
              >
                <Crown className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-12 transition-transform" />
                <span className="tabular-nums font-black">{loyaltyPoints}</span>
                <span className="hidden sm:inline text-[10px] text-amber-800 uppercase font-semibold">Coins</span>
              </button>

              {/* Wishlist Trigger */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className="relative p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="View wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white rounded-full text-[10px] font-mono flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Trigger with Badge */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-3 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg transition-colors shadow-sm"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider">Cart</span>
                <span className="w-5 h-5 bg-white text-neutral-950 rounded-full text-[11px] font-mono flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Slide-out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Sheet */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <MooseWalaLogo variant="dark" size="sm" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-black rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Upload Image Action */}
              {onOpenUpload && (
                <button
                  onClick={() => {
                    onOpenUpload();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-black text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Upload Brand Logo or Photos</span>
                </button>
              )}

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Collections
                </div>
                <button
                  onClick={() => {
                    onSelectCategory('All');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${
                    activeCategory === 'All' ? 'bg-neutral-900 text-white' : 'text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  All Streetwear Drops
                </button>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Men's Streetwear
                </div>
                <div className="space-y-1">
                  {mensCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategory(cat);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 rounded-md text-sm flex items-center justify-between ${
                        activeCategory === cat ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{cat}</span>
                      {cat === 'T-shirts' && <span className="text-[10px] font-mono text-amber-500">₹2,000 - ₹2,500</span>}
                      {cat === 'Jackets' && <span className="text-[10px] font-mono text-neutral-400">₹10k - ₹15k</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Accessories
                </div>
                <button
                  onClick={() => {
                    onSelectCategory('Bandana');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-md text-sm flex items-center justify-between ${
                    activeCategory === 'Bandana' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>Bandana (बांद्रा)</span>
                  <span className="text-[11px] font-mono text-neutral-500">₹1,200</span>
                </button>
              </div>

              {/* Moose Wala Loyalty Points Mobile Card */}
              <div 
                onClick={() => {
                  onOpenLoyalty();
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg cursor-pointer hover:bg-amber-500/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-heading font-black uppercase text-amber-950">
                      MW Brotherhood Rewards
                    </span>
                  </div>
                  <span className="text-xs font-mono font-black text-amber-700">{loyaltyPoints} Coins</span>
                </div>
                <div className="text-[10px] text-amber-900 mt-1 flex justify-between">
                  <span>Earn 1 coin / ₹10</span>
                  <span className="underline font-bold">Redeem Perks →</span>
                </div>
              </div>

              {/* Free Shipping Banner Note */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-600">
                <span className="font-semibold text-black block mb-0.5">Free Shipping India</span>
                Orders above ₹999 qualify for fast complimentary doorstep dispatch.
              </div>
            </div>

            {/* Bottom Currency selector */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50">
              <div className="text-[10px] font-mono uppercase text-neutral-400 mb-2">Currency</div>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => onSelectCurrency(c.code)}
                    className={`py-1.5 text-xs font-mono rounded border ${
                      currentCurrency === c.code ? 'bg-black text-white border-black' : 'bg-white text-neutral-800 border-neutral-200'
                    }`}
                  >
                    {c.symbol} {c.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
