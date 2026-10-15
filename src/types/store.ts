export type ProductCategory = 
  | 'T-shirts'
  | 'Jeans'
  | 'Lowers'
  | 'Shawls'
  | 'Hoodies'
  | 'Jackets'
  | 'Bandana';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export interface GalleryShot {
  id: string;
  label: string;
  angle: 'back' | 'front' | 'detail' | 'collar';
  imageUrl?: string;
}

export interface ProductVisualConfig {
  apparelType: 'tee' | 'jacket' | 'shawl' | 'jeans' | 'lowers' | 'hoodie' | 'bandana';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  graphicText?: string;
  subGraphicText?: string;
  patternType?: 'baroque_lion' | 'varsity_leather' | 'tapestry' | 'gurmukhi_script' | 'paisley' | 'flame' | 'camo_patches' | 'gothic_moosa' | 'legend_purple' | 'tractor_295' | 'raw_denim';
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  isHero?: boolean;
  tag?: string;
  inStockSizes: Size[];
  outOfStockSizes: Size[];
  defaultSize: Size;
  description: string;
  story: string;
  fabric: string;
  fit: string;
  washCare: string;
  origin: string;
  imageUrl?: string;
  gallery: GalleryShot[];
  visual: ProductVisualConfig;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: Size;
  quantity: number;
}

export type CurrencyCode = 'INR' | 'USD' | 'CAD' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromINR: number;
}

export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'card';
  upiApp?: 'gpay' | 'phonepe' | 'paytm';
}

export type LoyaltyTier = 'Vanguard' | 'Warrior' | 'Legend';

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsCost: number;
  discountINR: number;
  description: string;
  badge: string;
}

