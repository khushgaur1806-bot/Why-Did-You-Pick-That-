export interface UploadedAsset {
  id: string;
  name: string;
  dataUrl: string;
  sizeBytes?: number;
  uploadedAt: number;
  role?: 'logo' | 'hero' | 'product' | 'lookbook';
  targetProductId?: string;
  category?: string;
}

const STORAGE_KEY_ASSETS = 'mw_uploaded_assets_v1';
const STORAGE_KEY_LOGO = 'mw_custom_brand_logo_v1';
const STORAGE_KEY_HERO = 'mw_custom_hero_image_v1';
const STORAGE_KEY_PROD_IMAGES = 'mw_product_custom_images_v1';

// Pre-packaged authentic vector/graphic assets reflecting the exact user screenshots
export const PRESET_BRAND_ASSETS: UploadedAsset[] = [
  {
    id: 'preset-logo-gold-crest',
    name: 'Moose Wala Royal Crown Crest (Official Brand Logo)',
    category: 'Brand Logo',
    uploadedAt: 1715000000000,
    role: 'logo',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#1c1917" />
            <stop offset="80%" stop-color="#0a0a0a" />
            <stop offset="100%" stop-color="#000000" />
          </radialGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="25%" stop-color="#eab308" />
            <stop offset="60%" stop-color="#ca8a04" />
            <stop offset="100%" stop-color="#854d0e" />
          </linearGradient>
          <filter id="goldDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#ca8a04" flood-opacity="0.35"/>
          </filter>
        </defs>
        <rect width="500" height="500" fill="url(#bgGlow)" rx="40"/>
        <rect x="25" y="25" width="450" height="450" fill="none" stroke="url(#goldGradient)" stroke-width="4" rx="30" stroke-dasharray="16 8" opacity="0.65"/>
        <circle cx="250" cy="250" r="195" fill="none" stroke="url(#goldGradient)" stroke-width="2.5" opacity="0.4"/>
        
        <!-- Royal Crown -->
        <g filter="url(#goldDrop)">
          <path d="M160 180 L195 230 L250 150 L305 230 L340 180 L325 265 H175 Z" fill="url(#goldGradient)" />
          <circle cx="160" cy="172" r="10" fill="#fef08a" />
          <circle cx="250" cy="140" r="13" fill="#fef08a" />
          <circle cx="340" cy="172" r="10" fill="#fef08a" />
          <!-- Crown Jewels -->
          <circle cx="205" cy="245" r="5" fill="#18181b" />
          <circle cx="250" cy="245" r="6" fill="#dc2626" />
          <circle cx="295" cy="245" r="5" fill="#18181b" />
        </g>

        <!-- Bold Monogram "MW" -->
        <text x="250" y="360" text-anchor="middle" font-family="'Cinzel', 'Oswald', serif" font-size="110" font-weight="900" letter-spacing="4" fill="url(#goldGradient)" filter="url(#goldDrop)">MW</text>
        
        <!-- Wordmark & Location -->
        <text x="250" y="405" text-anchor="middle" font-family="'Cinzel', sans-serif" font-size="24" font-weight="800" letter-spacing="12" fill="#fafafa">MOOSE WALA</text>
        <text x="250" y="435" text-anchor="middle" font-family="monospace" font-size="13" letter-spacing="4" fill="#a1a1aa">OFFICE &amp; FACTORY: AJMER, RAJASTHAN</text>
      </svg>
    `)}`,
  },
  {
    id: 'preset-bai-thaapi-art',
    name: 'Bai Thaapi ਥਾਪੀ Signature Streetwear Silhouette',
    category: 'Product Artwork',
    uploadedAt: 1715000001000,
    role: 'product',
    targetProductId: 'prod-bai-thaapi-tee',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
        <rect width="500" height="500" fill="#121417" rx="30"/>
        <circle cx="250" cy="240" r="170" fill="#1e2329" />
        <path d="M120 440 C140 320 180 200 240 130 C270 95 320 85 360 120 C380 140 370 170 340 185 C310 200 290 220 290 260 L360 280 C390 290 410 320 400 350 L380 440 Z" fill="#2a3038" opacity="0.8"/>
        <!-- Slapping arm pose -->
        <path d="M220 210 L160 260 L140 330 L180 340 L230 290 Z" fill="#eab308"/>
        <text x="250" y="70" text-anchor="middle" font-family="'Cinzel', serif" font-size="28" font-weight="900" letter-spacing="6" fill="#fef08a">BAI THAAPI · ਥਾਪੀ</text>
        <text x="250" y="465" text-anchor="middle" font-family="monospace" font-size="14" letter-spacing="5" fill="#eab308">AUTHENTIC MOOSE WALA FIT · AJMER</text>
      </svg>
    `)}`,
  },
  {
    id: 'preset-tiger-tracksuit',
    name: 'Royal Tiger Embroidery Luxury Tracksuit Shot',
    category: 'Apparel Drop',
    uploadedAt: 1715000002000,
    role: 'product',
    targetProductId: 'prod-legacy-tracksuit',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
        <rect width="500" height="500" fill="#0d0e11" rx="30"/>
        <!-- Tracksuit silhouette -->
        <path d="M140 90 L250 140 L360 90 L440 190 L390 230 L350 190 L350 430 L150 430 L150 190 L110 230 L60 190 Z" fill="#181a20" stroke="#2a2e38" stroke-width="4"/>
        <!-- Golden embroidered Tiger Face in center -->
        <circle cx="250" cy="270" r="70" fill="#242018" stroke="#ca8a04" stroke-width="3"/>
        <path d="M210 240 L250 210 L290 240 L275 285 L225 285 Z" fill="#eab308"/>
        <circle cx="235" cy="250" r="4" fill="#000000"/>
        <circle cx="265" cy="250" r="4" fill="#000000"/>
        <text x="250" y="55" text-anchor="middle" font-family="'Cinzel', serif" font-size="22" font-weight="800" fill="#ca8a04" letter-spacing="4">TIGER EMBROIDERY SUIT</text>
        <text x="250" y="475" text-anchor="middle" font-family="monospace" font-size="13" fill="#a1a1aa">OFFICE &amp; FACTORY: AJMER, RAJASTHAN</text>
      </svg>
    `)}`,
  },
  {
    id: 'preset-295-tractor',
    name: '295 Iconic Tractor & Crown Heritage Graphic',
    category: 'Merchandise Drop',
    uploadedAt: 1715000003000,
    role: 'lookbook',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
        <rect width="500" height="500" fill="#111317" rx="30"/>
        <rect x="40" y="40" width="420" height="420" fill="none" stroke="#ca8a04" stroke-width="2" rx="20"/>
        <!-- 295 Big Bold -->
        <text x="250" y="210" text-anchor="middle" font-family="'Cinzel', 'Oswald', serif" font-size="130" font-weight="900" fill="#eab308" letter-spacing="6">295</text>
        <text x="250" y="280" text-anchor="middle" font-family="'Cinzel', sans-serif" font-size="28" font-weight="700" letter-spacing="10" fill="#fafafa">TRACTOR HERITAGE</text>
        <text x="250" y="340" text-anchor="middle" font-family="monospace" font-size="16" letter-spacing="4" fill="#a1a1aa">SIDHU MOOSE WALA OFFICIAL</text>
        <text x="250" y="420" text-anchor="middle" font-family="monospace" font-size="12" letter-spacing="3" fill="#ca8a04">OFFICE &amp; FACTORY: AJMER, RAJASTHAN, INDIA</text>
      </svg>
    `)}`,
  }
];

export function getStoredAssets(): UploadedAsset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ASSETS);
    if (!raw) return PRESET_BRAND_ASSETS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PRESET_BRAND_ASSETS;
  } catch (err) {
    console.warn('Failed to load stored assets:', err);
    return PRESET_BRAND_ASSETS;
  }
}

export function saveStoredAssets(assets: UploadedAsset[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(assets));
  } catch (err) {
    console.warn('LocalStorage save error (likely quota):', err);
    // If full, trim older non-preset items
    try {
      const trimmed = assets.slice(0, 15);
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(trimmed));
    } catch {
      // ignore
    }
  }
}

export function getCustomBrandLogo(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_LOGO);
  } catch {
    return null;
  }
}

export function setCustomBrandLogo(dataUrl: string | null): void {
  try {
    if (dataUrl) {
      localStorage.setItem(STORAGE_KEY_LOGO, dataUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_LOGO);
    }
  } catch (err) {
    console.warn('Failed to set custom brand logo:', err);
  }
}

export function getCustomHeroImage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_HERO);
  } catch {
    return null;
  }
}

export function setCustomHeroImage(dataUrl: string | null): void {
  try {
    if (dataUrl) {
      localStorage.setItem(STORAGE_KEY_HERO, dataUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_HERO);
    }
  } catch (err) {
    console.warn('Failed to set custom hero image:', err);
  }
}

export function getProductCustomImages(productId: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROD_IMAGES);
    if (!raw) return [];
    const map = JSON.parse(raw);
    return map[productId] || [];
  } catch {
    return [];
  }
}

export function addProductCustomImage(productId: string, dataUrl: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROD_IMAGES);
    const map = raw ? JSON.parse(raw) : {};
    const existing = map[productId] || [];
    map[productId] = [dataUrl, ...existing.filter((u: string) => u !== dataUrl)].slice(0, 6);
    localStorage.setItem(STORAGE_KEY_PROD_IMAGES, JSON.stringify(map));
  } catch (err) {
    console.warn('Failed to save product custom image:', err);
  }
}
