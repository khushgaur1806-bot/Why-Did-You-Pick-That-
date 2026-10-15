import { Product, CurrencyConfig } from '../types/store';
import { 
  MOOSA_FOREVER_FRONT_DATA_URL, 
  MOOSA_FOREVER_BACK_DATA_URL, 
  MOOSA_FOREVER_DETAIL_DATA_URL 
} from './moosaForeverAssets';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rateFromINR: 1 },
  USD: { code: 'USD', symbol: '$', rateFromINR: 0.012 },
  CAD: { code: 'CAD', symbol: 'CA$', rateFromINR: 0.016 },
  GBP: { code: 'GBP', symbol: '£', rateFromINR: 0.0094 },
  EUR: { code: 'EUR', symbol: '€', rateFromINR: 0.011 },
};

export const PRODUCTS: Product[] = [
  // ==================== OFFICIAL FLAGSHIP HOODIE DROP ====================
  {
    id: 'prod-moosa-forever-hoodie',
    slug: 'moosa-forever-hoodie',
    title: 'Moosa Forever Hoodie',
    subtitle: 'Official Gothic "moosa forever" & 295 Mansa Haveli Archive Drop',
    category: 'Hoodies',
    price: 4000.00,
    originalPrice: 5500.00,
    discountPercent: 27,
    rating: 5.0,
    reviewsCount: 712,
    isHero: true,
    tag: 'Official Drop · As Seen on Sidhu',
    inStockSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    outOfStockSizes: ['XXXL'],
    defaultSize: 'L',
    description: 'The definitive "moosa forever" Heavyweight Hoodie from the official Moose Wala collection. Features the iconic Old English Gothic "moosa forever" lettering across the chest with the cursive Urban Theka signature beneath. The back showcases the monumental 295 archival montage: Sidhu Moose Wala ancestral haveli arches, Mansa GPS coordinates (29.9784° N 75.3194° E), legendary 5911 HMT tractor, Mahindra Thar PB65AV9713, and massive "295" tribute block. Spun from 450 GSM ultra-heavy combed cotton fleece with double-lined hood.',
    story: 'Worn by Sidhu Moose Wala and brotherhood members as a badge of Punjabi heritage, resilience, and eternal brotherhood. Dedicated to Moosa village and the immortal 295 legacy.',
    fabric: '450 GSM 100% Super-Combed French Terry Fleece Cotton',
    fit: 'Boxy Heavyweight Drop-Shoulder Streetwear Silhouette',
    washCare: 'Cold gentle machine wash inside out. Air dry in shade. Do not iron directly on flock print.',
    origin: 'Office & Factory: Ajmer, Rajasthan, India',
    imageUrl: MOOSA_FOREVER_FRONT_DATA_URL,
    gallery: [
      { 
        id: 'mf-front', 
        label: 'Front Model · moosa forever Gothic Chest Print', 
        angle: 'front', 
        imageUrl: MOOSA_FOREVER_FRONT_DATA_URL 
      },
      { 
        id: 'mf-back', 
        label: 'Back Print · 295 Mansa Haveli, Thar & Tractor', 
        angle: 'back', 
        imageUrl: MOOSA_FOREVER_BACK_DATA_URL 
      },
      { 
        id: 'mf-detail', 
        label: 'Chest Close-Up · moosa forever & Urban Theka Script', 
        angle: 'detail', 
        imageUrl: MOOSA_FOREVER_DETAIL_DATA_URL 
      },
      { 
        id: 'mf-hood', 
        label: 'Double-Layered Hood & Aglet Drawstrings', 
        angle: 'collar', 
        imageUrl: MOOSA_FOREVER_FRONT_DATA_URL 
      },
    ],
    visual: {
      apparelType: 'hoodie',
      primaryColor: '#101012',
      secondaryColor: '#ffffff',
      accentColor: '#eab308',
      graphicText: 'moosa forever',
      subGraphicText: 'URBAN THEKA · 295 MANSA',
      patternType: 'legend_purple',
    },
  },
];
