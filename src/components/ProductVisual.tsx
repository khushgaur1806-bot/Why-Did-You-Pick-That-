import React from 'react';
import { Product, GalleryShot } from '../types/store';

interface ProductVisualProps {
  product: Product;
  currentShot?: GalleryShot;
  isZoomed?: boolean;
  zoomPosition?: { x: number; y: number };
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  currentShot,
  isZoomed = false,
  zoomPosition = { x: 50, y: 50 },
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const angle = currentShot?.angle || 'back';
  
  const activeImageUrl = !imageError 
    ? (currentShot?.imageUrl || product.imageUrl) 
    : undefined;

  return (
    <div className={`relative overflow-hidden w-full h-full select-none flex items-center justify-center bg-[#0d0f12] ${className}`}>
      {/* Studio Lighting Background */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, #20242a 0%, #0d0f12 85%)`,
          transform: isZoomed ? `scale(2.2) translate(${(50 - zoomPosition.x) * 0.7}%, ${(50 - zoomPosition.y) * 0.7}%)` : 'none',
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
      >
        {/* Soft studio vignette & ambient gradient */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/80 pointer-events-none z-10" />

        {activeImageUrl ? (
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
            <img
              src={activeImageUrl}
              alt={`${product.title} - ${currentShot?.label || angle}`}
              className={`w-full h-full object-cover sm:object-contain rounded-lg transition-opacity duration-500 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
              onLoad={() => setIsLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!isLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/60 animate-pulse">
                <span className="text-xs font-mono text-neutral-400">Loading Archive View...</span>
              </div>
            )}
          </div>
        ) : (
          /* Dynamic Realistic Studio Render Fallback */
          <div className="w-full h-full flex items-center justify-center p-3 sm:p-6 relative">
            {renderRealisticProduct(product, angle)}
          </div>
        )}
      </div>

      {/* Floating Angle Indicator Badge */}
      <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-wider uppercase text-neutral-300 bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-neutral-800 z-20 flex items-center gap-1.5 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>Angle · {angle.toUpperCase()}</span>
      </div>

      {/* Fabric / Build Tag */}
      <div className="absolute top-3 right-3 text-[10px] font-mono tracking-wider uppercase text-amber-300 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30 z-20 shadow-md">
        Heavyweight
      </div>
    </div>
  );
};

// Renders authentic high-definition product visual matching the exact user photos
function renderRealisticProduct(product: Product, angle: 'back' | 'front' | 'detail' | 'collar') {
  const id = product.slug;

  // 1. BAI THAAPI / URBAN THEKA TEE
  if (id.includes('bai-thaapi') || id.includes('malwa-block') || id.includes('80-vehley')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="oliveWash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c3a35" />
            <stop offset="40%" stopColor="#202c28" />
            <stop offset="80%" stopColor="#17221e" />
            <stop offset="100%" stopColor="#101815" />
          </linearGradient>
          <radialGradient id="lionGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hanger at top */}
        <path d="M220,50 L250,20 L280,50" stroke="#71717a" strokeWidth="3" fill="none" />
        <path d="M250,20 C250,10 258,8 260,15 C262,22 252,25 250,20" stroke="#a1a1aa" strokeWidth="2.5" fill="none" />
        <path d="M190,55 L310,55" stroke="#3f3f46" strokeWidth="6" strokeLinecap="round" />

        {/* Heavy Boxy Drop-Shoulder Oversized Tee */}
        <g id="tee-silhouette">
          {/* Main Body */}
          <path
            d="M170,68 C205,78 295,78 330,68 L470,155 L430,245 L375,220 L375,570 C375,580 365,590 350,590 L150,590 C135,590 125,580 125,570 L125,220 L70,245 L30,155 Z"
            fill="url(#oliveWash)"
            stroke="#0d1412"
            strokeWidth="3.5"
          />

          {/* Ribbed Collar */}
          <path d="M170,68 C195,95 305,95 330,68 C310,85 190,85 170,68 Z" fill="#141c19" stroke="#0d1412" strokeWidth="2" />
          <path d="M180,72 C205,90 295,90 320,72" stroke="#25352f" strokeWidth="2" strokeDasharray="3 3" fill="none" />

          {/* Sleeve Drop Seams */}
          <path d="M170,68 L125,220" stroke="#121815" strokeWidth="3" />
          <path d="M330,68 L375,220" stroke="#121815" strokeWidth="3" />

          {/* Natural Fabric Shadows & Folds */}
          <path d="M135,260 Q160,300 140,420" stroke="#0d1412" strokeWidth="4" fill="none" opacity="0.6" />
          <path d="M365,260 Q340,300 360,420" stroke="#0d1412" strokeWidth="4" fill="none" opacity="0.6" />
        </g>

        {/* ANGLE: BACK - Bai Thaapi Artwork */}
        {angle === 'back' && (
          <g transform="translate(0, 10)">
            {/* Subtle glow circle behind graphic */}
            <circle cx="250" cy="275" r="100" fill="url(#lionGlow)" />

            {/* Arch & Flourishes */}
            <path
              d="M170,165 Q250,135 330,165"
              stroke="#e8ede9"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flourish side scrolls */}
            <path d="M165,170 C145,190 160,225 150,250 C140,285 155,330 165,360 C185,410 250,425 250,425 C250,425 315,410 335,360 C345,330 360,285 350,250 C340,225 355,190 335,170" 
              stroke="#e8ede9" strokeWidth="2" fill="none" strokeDasharray="6 3" opacity="0.9" />

            {/* Regal Crown */}
            <g transform="translate(230, 150) scale(0.7)">
              <path d="M0,25 L10,5 L25,18 L40,5 L50,25 Z" fill="#e8ede9" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="10" cy="5" r="3" fill="#ffffff" />
              <circle cx="25" cy="18" r="3" fill="#ffffff" />
              <circle cx="40" cy="5" r="3" fill="#ffffff" />
            </g>

            {/* Text: "BAI THAAPI" */}
            <text x="250" y="210" textAnchor="middle" fill="#ffffff" fontFamily="Oswald, sans-serif" fontWeight="900" fontSize="22" letterSpacing="3">
              BAI THAAPI
            </text>
            <text x="250" y="225" textAnchor="middle" fill="#c4d1cb" fontFamily="monospace" fontSize="7" letterSpacing="3">
              URBAN THEKA · SIDHU MOOSE WALA
            </text>

            {/* Intricate Roaring Lion Illustration in Off-White Ink */}
            <g transform="translate(195, 230) scale(0.55)">
              {/* Lion Head & Roar */}
              <path d="M100,20 C50,20 20,60 15,110 C10,160 35,200 65,225 C90,240 110,240 135,225 C165,200 190,160 185,110 C180,60 150,20 100,20 Z" fill="#1b2622" stroke="#e8ede9" strokeWidth="3" />
              {/* Mane waves */}
              <path d="M30,80 Q5,120 25,160" stroke="#e8ede9" strokeWidth="3" fill="none" />
              <path d="M170,80 Q195,120 175,160" stroke="#e8ede9" strokeWidth="3" fill="none" />
              <path d="M20,130 Q-5,180 35,210" stroke="#e8ede9" strokeWidth="2.5" fill="none" />
              <path d="M180,130 Q205,180 165,210" stroke="#e8ede9" strokeWidth="2.5" fill="none" />
              {/* Fierce Eyes */}
              <polygon points="65,95 85,100 70,105" fill="#ffffff" />
              <polygon points="135,95 115,100 130,105" fill="#ffffff" />
              {/* Snout & Fangs */}
              <path d="M90,115 L100,135 L110,115 Z" fill="#ffffff" />
              <path d="M75,150 Q100,138 125,150 Q100,195 75,150 Z" fill="#0d1412" stroke="#ffffff" strokeWidth="3" />
              <polygon points="82,150 86,165 90,150" fill="#ffffff" />
              <polygon points="118,150 114,165 110,150" fill="#ffffff" />
            </g>

            {/* Bottom Baroque Banner */}
            <path d="M190,380 Q250,405 310,380" stroke="#e8ede9" strokeWidth="2.5" fill="none" />
            <circle cx="250" cy="392" r="3" fill="#e8ede9" />
          </g>
        )}

        {/* ANGLE: FRONT - Minimalist Signature Drop */}
        {angle === 'front' && (
          <g transform="translate(200, 200)">
            <path d="M10,25 Q35,5 60,20 T95,15" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <text x="50" y="42" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif" fontSize="7" letterSpacing="3" fontWeight="800">
              SIDHU MOOSE WALA
            </text>
            <text x="50" y="52" textAnchor="middle" fill="#a0b3aa" fontFamily="sans-serif" fontSize="6" letterSpacing="2">
              ✕ SOCIAL STUDIES
            </text>
          </g>
        )}

        {/* ANGLE: COLLAR / DETAIL */}
        {(angle === 'collar' || angle === 'detail') && (
          <g transform="translate(175, 170)">
            <rect x="0" y="0" width="150" height="90" rx="8" fill="#121a17" stroke="#354841" strokeWidth="2" />
            <text x="75" y="35" textAnchor="middle" fill="#d4af37" fontFamily="Cinzel, serif" fontSize="13" fontWeight="bold">
              MOOSE WALA
            </text>
            <text x="75" y="54" textAnchor="middle" fill="#e8ede9" fontSize="8" fontFamily="monospace">
              HEAVYWEIGHT LOOPBACK COTTON
            </text>
            <text x="75" y="70" textAnchor="middle" fill="#889c93" fontSize="7" fontFamily="monospace">
              OFFICIAL ESTATE ARCHIVE
            </text>
          </g>
        )}
      </svg>
    );
  }

  // 2. MOOSE X SOCIAL STUDIES ACID WASH TEE (Screenshot 2026-10-14 200732 / 200754)
  if (id.includes('vintage-wash') || id.includes('social-studies-tee')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        <defs>
          <radialGradient id="acidWash" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#3d3d42" />
            <stop offset="50%" stopColor="#252528" />
            <stop offset="100%" stopColor="#141416" />
          </radialGradient>
        </defs>

        {/* T-shirt Base */}
        <path
          d="M170,68 C205,78 295,78 330,68 L470,155 L430,245 L375,220 L375,570 C375,580 365,590 350,590 L150,590 C135,590 125,580 125,570 L125,220 L70,245 L30,155 Z"
          fill="url(#acidWash)"
          stroke="#0b0b0d"
          strokeWidth="3.5"
        />
        {/* Distressed Rib Collar */}
        <path d="M170,68 C195,95 305,95 330,68 C310,85 190,85 170,68 Z" fill="#18181b" stroke="#000" strokeWidth="2" />

        {/* BACK: Red Gothic "MOOSE" with Sidhu Moosewala Silhouette */}
        {angle === 'back' ? (
          <g transform="translate(0, 10)">
            {/* Bold Blood Red Gothic "MOOSE" Header */}
            <text x="250" y="200" textAnchor="middle" fill="#d90429" fontFamily="UnifrakturMaguntia, cursive, serif" fontSize="72" fontWeight="bold" letterSpacing="4">
              MOOSE
            </text>

            {/* Sidhu Moosewala Iconic Hand-Gesture Halftone Graphic */}
            <rect x="200" y="210" width="100" height="150" rx="4" fill="#1a1a1d" stroke="#d90429" strokeWidth="1.5" />
            <circle cx="250" cy="245" r="22" fill="#2d2d32" />
            {/* Turban & Bandana Mask */}
            <path d="M230,235 C235,220 265,220 270,235 C270,250 230,250 230,235 Z" fill="#111" />
            <polygon points="240,250 260,250 250,270" fill="#d90429" />
            {/* Arms up iconic pose */}
            <path d="M210,280 L185,220" stroke="#f1f1f1" strokeWidth="8" strokeLinecap="round" />
            <path d="M290,280 L315,220" stroke="#f1f1f1" strokeWidth="8" strokeLinecap="round" />

            <text x="250" y="390" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" letterSpacing="3">
              SIDHU MOOSE WALA
            </text>
            <text x="250" y="405" textAnchor="middle" fill="#d90429" fontSize="7.5" fontFamily="monospace" letterSpacing="2">
              PB65 MANSA ARCHIVES
            </text>
          </g>
        ) : (
          /* FRONT: Chest Signature */
          <g transform="translate(200, 210)">
            <path d="M10,25 Q35,5 60,20 T95,15" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <text x="50" y="42" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" letterSpacing="2">
              SIDHU MOOSE WALA
            </text>
            <text x="50" y="54" textAnchor="middle" fill="#999" fontSize="6.5" letterSpacing="1">
              ✕ SOCIAL STUDIES
            </text>
          </g>
        )}
      </svg>
    );
  }

  // 3. JATT SOCIAL STUDIES SAFFRON & BLACK HOODIE (Screenshot 2026-10-14 195725 / 195744 / 195759)
  if (id.includes('jatt-social-studies') || id.includes('orange') || (product.category === 'Hoodies' && product.visual.primaryColor === '#ff9f1c')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        {/* Hood */}
        <path d="M165,75 C195,35 305,35 335,75 C355,105 315,125 250,125 C185,125 145,105 165,75 Z" fill="#141414" stroke="#000" strokeWidth="3" />
        <path d="M235,115 L225,210" stroke="#ff9f1c" strokeWidth="4" strokeLinecap="round" />
        <path d="M265,115 L275,210" stroke="#ff9f1c" strokeWidth="4" strokeLinecap="round" />

        {/* Orange Torso Body with Black Underarm Panels */}
        <path d="M160,105 L80,205 L60,465 L130,445 L140,195 L140,550 L360,550 L360,195 L370,445 L440,465 L420,205 L340,105 Z" fill="#f77f00" stroke="#000" strokeWidth="3" />
        {/* Black side contrast panels */}
        <path d="M140,240 L140,550 L170,550 L170,280 Z" fill="#141414" />
        <path d="M360,240 L360,550 L330,550 L330,280 Z" fill="#141414" />

        {/* Kangaroo Pocket */}
        <path d="M180,410 L320,410 L350,510 L150,510 Z" fill="#f77f00" stroke="#111" strokeWidth="2.5" />

        {/* Graphic: Sidhu Moosewala Gun & Masked Portrait */}
        <g transform="translate(190, 180) scale(0.6)">
          <circle cx="100" cy="100" r="90" fill="#141414" stroke="#ffffff" strokeWidth="3" />
          {/* Green Turban & Bandana */}
          <path d="M60,60 C75,20 125,20 140,60 C150,90 50,90 60,60 Z" fill="#2d6a4f" />
          <polygon points="75,90 125,90 100,135" fill="#52b788" />
          {/* Gun over shoulder */}
          <line x1="140" y1="20" x2="110" y2="150" stroke="#d4af37" strokeWidth="8" strokeLinecap="round" />
          <rect x="130" y="15" width="25" height="15" fill="#8d99ae" />
          
          <text x="100" y="225" textAnchor="middle" fill="#ffffff" fontFamily="Oswald, sans-serif" fontSize="26" fontWeight="bold">
            SIDHU
          </text>
          <text x="100" y="250" textAnchor="middle" fill="#ffffff" fontFamily="Oswald, sans-serif" fontSize="24" fontWeight="bold">
            MOOSE WALA
          </text>
        </g>
      </svg>
    );
  }

  // 4. UNDERCOVER LEATHER-SLEEVE VARSITY BOMBER (Screenshot 2026-10-14 195402 / 195421 / 195442)
  if (id.includes('varsity') || id.includes('undercover')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        <defs>
          <linearGradient id="camelLeather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a373" />
            <stop offset="50%" stopColor="#bc8a5f" />
            <stop offset="100%" stopColor="#8b5e34" />
          </linearGradient>
          <linearGradient id="blackMelton" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#252525" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
        </defs>

        {/* Black Melton Wool Torso */}
        <path d="M170,85 C205,100 295,100 330,85 L360,530 C360,545 345,555 330,555 L170,555 C155,555 140,545 140,530 Z" fill="url(#blackMelton)" stroke="#000" strokeWidth="3.5" />

        {/* Camel Tan Leather Sleeves */}
        <path d="M170,85 L55,180 L75,480 L140,460 L140,215 Z" fill="url(#camelLeather)" stroke="#000" strokeWidth="3" />
        <path d="M330,85 L445,180 L425,480 L360,460 L360,215 Z" fill="url(#camelLeather)" stroke="#000" strokeWidth="3" />

        {/* Striped Ribbed Collar, Cuffs & Hem */}
        <path d="M170,85 C205,105 295,105 330,85" stroke="#bc8a5f" strokeWidth="8" strokeDasharray="6 4" fill="none" />
        <rect x="140" y="535" width="220" height="25" fill="#141414" stroke="#bc8a5f" strokeWidth="2.5" strokeDasharray="8 5" />
        <rect x="70" y="465" width="70" height="20" fill="#141414" stroke="#bc8a5f" strokeWidth="2" strokeDasharray="6 3" />
        <rect x="360" y="465" width="70" height="20" fill="#141414" stroke="#bc8a5f" strokeWidth="2" strokeDasharray="6 3" />

        {/* Snap Buttons */}
        <line x1="250" y1="90" x2="250" y2="535" stroke="#000" strokeWidth="4" />
        {[130, 195, 260, 325, 390, 455, 515].map((y) => (
          <circle key={y} cx="250" cy={y} r="6.5" fill="#bc8a5f" stroke="#222" strokeWidth="1.5" />
        ))}

        {/* Right Sleeve Famous Quote Script (From user photo!) */}
        <g transform="translate(85, 220) rotate(80)">
          <text x="0" y="0" fill="#201309" fontFamily="Cinzel, serif" fontSize="9" fontWeight="900" letterSpacing="1">
            "When all other methods of communication have failed,
          </text>
          <text x="0" y="12" fill="#201309" fontFamily="Cinzel, serif" fontSize="9" fontWeight="900" letterSpacing="1">
            it is righteous to take the sword in hand!"
          </text>
        </g>

        {/* Chest 3-Stars Embroidered Patch */}
        <g transform="translate(180, 150) scale(0.8)">
          <path d="M20,15 L25,30 L40,30 L28,40 L32,55 L20,45 L8,55 L12,40 L0,30 L15,30 Z" fill="#bc8a5f" stroke="#000" strokeWidth="1" />
          <path d="M50,8 L55,23 L70,23 L58,33 L62,48 L50,38 L38,48 L42,33 L30,23 L45,23 Z" fill="#bc8a5f" stroke="#000" strokeWidth="1" />
          <path d="M80,15 L85,30 L100,30 L88,40 L92,55 L80,45 L68,55 L72,40 L60,30 L75,30 Z" fill="#bc8a5f" stroke="#000" strokeWidth="1" />
        </g>

        {/* BACK ANGLE: Huge Chenille "ROYAL" Logo */}
        {angle === 'back' && (
          <g transform="translate(250, 260)">
            <rect x="-85" y="-45" width="170" height="90" rx="10" fill="#141414" stroke="#bc8a5f" strokeWidth="3" />
            <text x="0" y="10" textAnchor="middle" fill="#bc8a5f" fontFamily="Cinzel, serif" fontSize="42" fontWeight="900" letterSpacing="4">
              ROYAL
            </text>
            <text x="0" y="32" textAnchor="middle" fill="#f1f1f1" fontSize="9" letterSpacing="3">
              SIDHU MOOSE WALA ARCHIVE
            </text>
          </g>
        )}
      </svg>
    );
  }

  // 5. TIMES SQUARE JACQUARD TAPESTRY JACKET (Screenshot 2026-10-14 201327 / 201341 / 201357)
  if (id.includes('times-square') || id.includes('tapestry')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        <defs>
          <pattern id="tapestryGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#2b4141" />
            <rect x="0" y="0" width="20" height="20" fill="#3a5a54" />
            <rect x="20" y="20" width="20" height="20" fill="#cfb087" opacity="0.6" />
            <circle cx="20" cy="20" r="4" fill="#a8423f" />
          </pattern>
        </defs>

        {/* Turn-down Collar */}
        <polygon points="170,80 250,115 190,140" fill="#1e3030" stroke="#000" strokeWidth="2" />
        <polygon points="330,80 250,115 310,140" fill="#1e3030" stroke="#000" strokeWidth="2" />

        {/* Tapestry Woven Body */}
        <path d="M170,85 L330,85 L365,540 L135,540 Z" fill="url(#tapestryGrid)" stroke="#1a2525" strokeWidth="3.5" />
        {/* Sleeves */}
        <path d="M170,85 L50,185 L75,470 L135,450 L135,215 Z" fill="url(#tapestryGrid)" stroke="#1a2525" strokeWidth="3" />
        <path d="M330,85 L450,185 L425,470 L365,450 L365,215 Z" fill="url(#tapestryGrid)" stroke="#1a2525" strokeWidth="3" />

        {/* Utility Patch Pockets */}
        <rect x="155" y="320" width="80" height="95" rx="4" fill="url(#tapestryGrid)" stroke="#cfb087" strokeWidth="2" />
        <rect x="265" y="320" width="80" height="95" rx="4" fill="url(#tapestryGrid)" stroke="#cfb087" strokeWidth="2" />

        {/* Heavy Antique Bronze YKK Zipper & Puller */}
        <line x1="250" y1="115" x2="250" y2="540" stroke="#8c6d3b" strokeWidth="5" />
        <polygon points="245,210 255,210 253,240 247,240" fill="#c49a45" stroke="#000" strokeWidth="1" />
        <text x="250" y="232" textAnchor="middle" fill="#000" fontSize="5" fontWeight="bold">YKK</text>

        {/* Vintage Times Square Woven Lettering */}
        <text x="250" y="280" textAnchor="middle" fill="#f8f9fa" fontFamily="Cinzel, serif" fontSize="22" fontWeight="900" letterSpacing="2">
          TIMES SQUARE
        </text>
        <text x="250" y="300" textAnchor="middle" fill="#cfb087" fontSize="8" letterSpacing="3">
          NEW YORK · WOVEN JACQUARD
        </text>
      </svg>
    );
  }

  // 6. BLUE BANDANA PAISLEY PUFFER (Screenshot 2026-10-14 201131 / 201148)
  if (id.includes('bandana-puffer') || id.includes('blue-bandana')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        {/* Insulated High Stand Collar */}
        <rect x="175" y="55" width="150" height="40" rx="10" fill="#1b4965" stroke="#000" strokeWidth="3" />

        {/* Quilted Puffer Baffles with Blue Paisley Patterns */}
        <g stroke="#000" strokeWidth="3">
          {/* Top Baffle */}
          <path d="M150,95 L350,95 L365,190 L135,190 Z" fill="#2b6cb0" />
          {/* Middle Baffle */}
          <path d="M135,190 L365,190 L370,310 L130,310 Z" fill="#1d3557" />
          {/* Lower Middle Baffle */}
          <path d="M130,310 L370,310 L365,430 L135,430 Z" fill="#2b6cb0" />
          {/* Bottom Baffle */}
          <path d="M135,430 L365,430 L355,540 L145,540 Z" fill="#1d3557" />

          {/* Puffy Sleeves */}
          <path d="M150,95 L40,190 L60,480 L135,440 L135,190 Z" fill="#8ecae6" />
          <path d="M350,95 L460,190 L440,480 L365,440 L365,190 Z" fill="#8ecae6" />
        </g>

        {/* White Paisley Motifs inside Baffles */}
        {[140, 250, 370, 485].map((y, idx) => (
          <g key={idx} transform={`translate(200, ${y}) scale(0.6)`} fill="#ffffff" opacity="0.85">
            <path d="M0,0 C20,-30 50,-20 40,10 C30,30 0,30 0,0 Z" />
            <path d="M100,0 C120,-30 150,-20 140,10 C130,30 100,30 100,0 Z" />
          </g>
        ))}

        {/* Urban Theka Chest Label */}
        <rect x="270" y="210" width="65" height="18" rx="2" fill="#e2e8f0" stroke="#000" strokeWidth="1" />
        <text x="302" y="222" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">
          URBAN THEKA
        </text>

        <line x1="250" y1="55" x2="250" y2="540" stroke="#000" strokeWidth="4" />
      </svg>
    );
  }

  // 7. HERITAGE GURMUKHI LOHI SHAWL (Screenshot 2026-10-13 190738 / 190818 / 190849)
  if (id.includes('shawl') || id.includes('lohi')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        {/* Charcoal Wool Lohi Draped Silhouette */}
        <path d="M120,70 C190,50 310,50 380,70 L430,540 C360,575 140,575 70,540 Z" fill="#3a3f47" stroke="#1f2328" strokeWidth="3.5" />
        {/* Draped Front Overlap */}
        <path d="M90,140 Q250,230 410,140 L420,330 Q250,400 80,330 Z" fill="#2d323a" opacity="0.9" />

        {/* Silver Gurmukhi Calligraphy 35 Akhar Characters (ੳ, ਅ, ੲ, ਸ, ਹ, ਕ, ਖ, ਗ...) */}
        <g fill="#c5cbd3" opacity="0.9" fontSize="28" fontFamily="serif" fontWeight="bold">
          <text x="135" y="130">ੳ</text>
          <text x="210" y="115">ਅ</text>
          <text x="285" y="125">ੲ</text>
          <text x="355" y="165">ਸ</text>
          <text x="150" y="220">ਹ</text>
          <text x="235" y="245">ਕ</text>
          <text x="320" y="225">ਖ</text>
          <text x="140" y="340">ਗ</text>
          <text x="250" y="365">ਘ</text>
          <text x="340" y="340">ਙ</text>
          <text x="190" y="440">ਚ</text>
          <text x="290" y="440">ਛ</text>
        </g>

        {/* Subtle Punjab & Canada Map Outline Motifs */}
        <path d="M350,380 Q370,360 380,390 Q390,410 370,420 Z" stroke="#c5cbd3" strokeWidth="2" fill="none" />
        <text x="250" y="520" textAnchor="middle" fill="#e2e8f0" fontSize="11" letterSpacing="4" fontFamily="Cinzel, serif">
          PUNJAB HERITAGE LOHI
        </text>
        <line x1="80" y1="540" x2="420" y2="540" stroke="#c5cbd3" strokeWidth="2" strokeDasharray="5 3" />
      </svg>
    );
  }

  // 8. INVINCIBLE CONTRAST POCKET LOWERS (Screenshot 2026-10-13 190538 / 190602 / 190618)
  if (id.includes('invincible')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        {/* Waistband */}
        <rect x="135" y="65" width="230" height="45" fill="#c8a97e" stroke="#000" strokeWidth="3" />
        {/* Bold White "INVINCIBLE" Text Across Waist */}
        <text x="250" y="96" textAnchor="middle" fill="#ffffff" fontFamily="Oswald, sans-serif" fontSize="22" fontWeight="900" letterSpacing="4">
          INVINCIBLE
        </text>

        {/* Sand Khaki Pants Legs */}
        <path d="M135,110 L105,550 L225,550 L245,230 L255,230 L275,550 L395,550 L365,110 Z" fill="#d4b483" stroke="#000" strokeWidth="3" />

        {/* Forest Green Cargo Pockets on Legs */}
        <rect x="115" y="220" width="70" height="85" rx="5" fill="#1b3b2b" stroke="#000" strokeWidth="2" />
        <circle cx="150" cy="245" r="12" fill="#d4b483" />

        <rect x="315" y="300" width="75" height="95" rx="5" fill="#1b3b2b" stroke="#000" strokeWidth="2" />
        <rect x="125" y="380" width="65" height="75" rx="5" fill="#1b3b2b" stroke="#000" strokeWidth="2" />
        <rect x="310" y="450" width="65" height="70" rx="5" fill="#1b3b2b" stroke="#000" strokeWidth="2" />

        {/* Sidhu Moosewala Signature below pocket */}
        <path d="M310,210 Q335,195 360,205" stroke="#ffffff" strokeWidth="2" fill="none" />
        <text x="335" y="222" textAnchor="middle" fill="#ffffff" fontSize="6">
          Sidhu Moose Wala
        </text>
      </svg>
    );
  }

  // 9. 295 TRIBUTE HOODIE (Screenshot 2026-10-14 200007 / 200026)
  if (id.includes('295')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        {/* Black Heavy Hoodie Base */}
        <path d="M165,75 C195,35 305,35 335,75 C355,105 315,125 250,125 C185,125 145,105 165,75 Z" fill="#141416" stroke="#000" strokeWidth="3" />
        <path d="M160,105 L80,205 L60,465 L130,445 L140,195 L140,550 L360,550 L360,195 L370,445 L440,465 L420,205 L340,105 Z" fill="#141416" stroke="#000" strokeWidth="3" />
        
        {/* Drawstrings */}
        <path d="M235,115 L225,210" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M265,115 L275,210" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />

        {/* BACK: 295 Thar, Tractor & Coordinates Graphic */}
        <g transform="translate(0, 15)">
          {/* Mansa Village Coordinates */}
          <text x="180" y="170" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
            29.9784° N
          </text>
          <text x="180" y="185" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
            75.3194° E
          </text>

          {/* Mahindra Thar Silhouette with PB65AV9713 number plate */}
          <rect x="200" y="270" width="100" height="75" rx="6" fill="#090a0c" stroke="#ffffff" strokeWidth="2" />
          <circle cx="225" cy="310" r="10" fill="#ffffff" />
          <circle cx="275" cy="310" r="10" fill="#ffffff" />
          <rect x="220" y="325" width="60" height="14" fill="#ffffff" />
          <text x="250" y="335" textAnchor="middle" fill="#000000" fontSize="7" fontWeight="bold">
            PB65AV9713
          </text>

          {/* Giant "295" Typography */}
          <text x="250" y="420" textAnchor="middle" fill="#ffffff" fontFamily="Oswald, sans-serif" fontSize="64" fontWeight="900" letterSpacing="4">
            295
          </text>
        </g>
      </svg>
    );
  }

  // 10. LEGEND PURPLE HOODIE (Screenshot 2026-10-14 195557 / 195642)
  if (id.includes('legend')) {
    return (
      <svg viewBox="0 0 500 620" className="w-full h-full max-h-[580px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
        <path d="M165,75 C195,35 305,35 335,75 C355,105 315,125 250,125 C185,125 145,105 165,75 Z" fill="#4a154b" stroke="#000" strokeWidth="3" />
        <path d="M160,105 L80,205 L60,465 L130,445 L140,195 L140,550 L360,550 L360,195 L370,445 L440,465 L420,205 L340,105 Z" fill="#581c87" stroke="#000" strokeWidth="3" />
        
        {/* Drawstrings */}
        <path d="M235,115 L225,210" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        <path d="M265,115 L275,210" stroke="#000" strokeWidth="4" strokeLinecap="round" />

        {/* Kangaroo Pocket */}
        <path d="M180,410 L320,410 L350,510 L150,510 Z" fill="#4c1d95" stroke="#000" strokeWidth="2.5" />

        {angle === 'back' ? (
          /* Back Yellow Target Crest */
          <g transform="translate(250, 260)">
            <circle cx="0" cy="0" r="50" fill="none" stroke="#facc15" strokeWidth="6" />
            <circle cx="0" cy="0" r="30" fill="none" stroke="#facc15" strokeWidth="3" />
            <circle cx="0" cy="0" r="10" fill="#facc15" />
            <text x="0" y="80" textAnchor="middle" fill="#facc15" fontFamily="Oswald, sans-serif" fontSize="16" fontWeight="bold" letterSpacing="3">
              URBAN THEKA
            </text>
          </g>
        ) : (
          /* Front Graphic: LEGEND - NEVER FOLD */
          <g transform="translate(0, 15)">
            <text x="250" y="215" textAnchor="middle" fill="#facc15" fontFamily="Cinzel, serif" fontSize="32" fontWeight="900" letterSpacing="4">
              LEGEND
            </text>
            <rect x="200" y="230" width="100" height="120" rx="4" fill="#3b0764" stroke="#facc15" strokeWidth="2" />
            <text x="250" y="375" textAnchor="middle" fill="#facc15" fontFamily="Oswald, sans-serif" fontSize="11" fontWeight="bold" letterSpacing="2">
              NEVER FOLD · NEVER BACK DOWN
            </text>
          </g>
        )}
      </svg>
    );
  }

  // 11. PAISLEY BANDANA (Screenshot 2026-10-14 201629)
  return (
    <svg viewBox="0 0 500 500" className="w-full h-full max-h-[500px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]">
      <rect x="50" y="50" width="400" height="400" fill="#111111" stroke="#f1f1f1" strokeWidth="4" />
      <rect x="75" y="75" width="350" height="350" fill="none" stroke="#f1f1f1" strokeWidth="2" strokeDasharray="6 3" />
      <rect x="100" y="100" width="300" height="300" fill="none" stroke="#f1f1f1" strokeWidth="1.5" />
      
      {/* Paisley Corner Filigree */}
      {[
        { x: 140, y: 140, r: 0 },
        { x: 360, y: 140, r: 90 },
        { x: 360, y: 360, r: 180 },
        { x: 140, y: 360, r: 270 },
      ].map((pos, idx) => (
        <g key={idx} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}>
          <path d="M0,0 C20,-30 50,-20 40,10 C30,30 0,30 0,0 Z" fill="#ffffff" opacity="0.9" />
          <circle cx="20" cy="0" r="4" fill="#111" />
        </g>
      ))}

      {/* Center ubn tka Stamp */}
      <circle cx="250" cy="250" r="50" fill="none" stroke="#ffffff" strokeWidth="2" />
      <text x="250" y="246" textAnchor="middle" fill="#ffffff" fontFamily="Cinzel, serif" fontSize="16" fontWeight="bold">
        ubn
      </text>
      <text x="250" y="266" textAnchor="middle" fill="#ffffff" fontFamily="Cinzel, serif" fontSize="16" fontWeight="bold">
        tka
      </text>
    </svg>
  );
}
