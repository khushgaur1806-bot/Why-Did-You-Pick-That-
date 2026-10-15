// Official SVG Data URLs matching the user's 3 uploaded screenshots of the "Moosa Forever Hoodie" (₹4,000)
// Screenshot 1: Close-up chest "moosa forever" + "Urban Theka" cursive signature
// Screenshot 2: Model front view wearing black hoodie
// Screenshot 3: Model back view with 295, Haveli, GPS coordinates (29.9784° N 75.3194° E), Thar PB65AV9713 & 5911 Tractor

export const MOOSA_FOREVER_DETAIL_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <radialGradient id="hoodieFabric" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1c1d22" />
      <stop offset="50%" stop-color="#121316" />
      <stop offset="100%" stop-color="#0a0a0c" />
    </radialGradient>
    <filter id="flockShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Heavyweight Black Fleece Fabric -->
  <rect width="600" height="700" fill="url(#hoodieFabric)"/>

  <!-- Subtle fabric knit texture lines -->
  <g stroke="#ffffff" stroke-opacity="0.02" stroke-width="1">
    <line x1="0" y1="100" x2="600" y2="100"/>
    <line x1="0" y1="200" x2="600" y2="200"/>
    <line x1="0" y1="300" x2="600" y2="300"/>
    <line x1="0" y1="400" x2="600" y2="400"/>
    <line x1="0" y1="500" x2="600" y2="500"/>
  </g>

  <!-- Hood Collar & Drawstring Area at Top -->
  <path d="M180,0 C220,60 380,60 420,0 L470,80 C440,140 160,140 130,80 Z" fill="#0d0e11" stroke="#000000" stroke-width="4"/>
  <ellipse cx="300" cy="85" rx="70" ry="25" fill="#07080a" stroke="#1f2228" stroke-width="3"/>

  <!-- Thick Knitted Drawstring Knot -->
  <g filter="url(#flockShadow)">
    <path d="M285,85 C280,110 270,140 260,180" stroke="#0f1114" stroke-width="14" stroke-linecap="round" fill="none"/>
    <path d="M285,85 C280,110 270,140 260,180" stroke="#23262d" stroke-width="10" stroke-linecap="round" fill="none"/>
    <circle cx="288" cy="100" r="16" fill="#14171d" stroke="#2a2e37" stroke-width="2"/>
    <circle cx="296" cy="104" r="12" fill="#181c22"/>
  </g>

  <!-- Gothic Old English "moosa forever" Header Print -->
  <g transform="translate(300, 390) scale(1.05)" filter="url(#flockShadow)">
    <text 
      x="0" 
      y="0" 
      text-anchor="middle" 
      fill="#ffffff" 
      font-family="'UnifrakturMaguntia', 'Cinzel', serif" 
      font-size="64" 
      font-weight="bold" 
      letter-spacing="2"
    >
      moosa forever
    </text>

    <!-- Cursive Signature "Urban Theka" underneath right -->
    <path 
      d="M-50,30 Q-40,15 -30,35 Q-20,40 -15,25 Q-5,15 5,30 Q15,40 25,25 Q35,15 45,35" 
      stroke="#ffffff" 
      stroke-width="2.5" 
      fill="none" 
      stroke-linecap="round"
    />
    <text 
      x="0" 
      y="48" 
      text-anchor="middle" 
      fill="#ffffff" 
      font-family="'Brush Script MT', 'Caveat', cursive, sans-serif" 
      font-size="28" 
      font-style="italic" 
      letter-spacing="1"
    >
      UrbanTheka
    </text>
  </g>

  <!-- Bottom Badge Tag -->
  <g transform="translate(300, 640)">
    <rect x="-180" y="-18" width="360" height="36" rx="18" fill="#101216" stroke="#272a33" stroke-width="1.5"/>
    <text x="0" y="5" text-anchor="middle" fill="#d4af37" font-family="monospace" font-size="12" font-weight="bold" letter-spacing="3">
      CHEST CLOSE-UP · GOTHIC FLOCK PRINT
    </text>
  </g>
</svg>
`;

export const MOOSA_FOREVER_FRONT_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <radialGradient id="studioWall" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f5f6f8" />
      <stop offset="70%" stop-color="#e3e6eb" />
      <stop offset="100%" stop-color="#cbd0d8" />
    </radialGradient>
    <linearGradient id="hoodieBlack" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#24252a" />
      <stop offset="30%" stop-color="#151619" />
      <stop offset="80%" stop-color="#0c0d0f" />
      <stop offset="100%" stop-color="#050506" />
    </linearGradient>
    <filter id="modelShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="-10" dy="20" stdDeviation="18" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Clean Minimalist Studio Background -->
  <rect width="600" height="700" fill="url(#studioWall)"/>

  <!-- Studio Panel Molding Lines -->
  <line x1="80" y1="0" x2="80" y2="700" stroke="#ffffff" stroke-width="4"/>
  <line x1="80" y1="260" x2="0" y2="260" stroke="#ffffff" stroke-width="4"/>
  <line x1="80" y1="460" x2="0" y2="460" stroke="#ffffff" stroke-width="4"/>

  <!-- Tropical Palm Leaf in Background (Right) -->
  <g fill="#3a5a40" opacity="0.65" transform="translate(480, 240) rotate(-15)">
    <path d="M0,0 Q60,-40 120,60 Q80,140 0,160 Z"/>
    <path d="M-10,40 Q50,30 90,130 Q40,190 -10,210 Z"/>
    <path d="M-20,100 Q40,110 80,210 Q20,260 -20,270 Z"/>
  </g>

  <!-- MODEL FIGURE (Front Pose as in Screenshot 2) -->
  <g filter="url(#modelShadow)">
    
    <!-- Male Head & Distinctive Styled Mustache / Beard -->
    <g transform="translate(350, 180)">
      <!-- Neck -->
      <path d="M-40,40 L-25,95 L40,95 L45,40 Z" fill="#d29979" stroke="#b07556" stroke-width="2"/>

      <!-- Jaw / Face -->
      <path d="M-45,-20 C-45,55 -20,80 2,82 C25,80 50,55 50,-20 Z" fill="#e2a888"/>

      <!-- Styled Black Beard & Goatee -->
      <path d="M-40,15 C-40,65 -15,85 2,86 C20,85 45,65 45,15 C35,45 15,65 2,65 C-12,65 -30,45 -40,15 Z" fill="#141416"/>
      <polygon points="-10,50 15,50 2,75" fill="#141416"/>

      <!-- Famous Upturned Sharp Handlebar Mustache -->
      <path d="M-55,24 Q-20,26 2,34 Q25,26 60,24 Q30,48 2,42 Q-25,48 -55,24 Z" fill="#0d0e10" stroke="#000" stroke-width="1.5"/>
      <!-- Upturned curls -->
      <path d="M-55,24 C-65,15 -62,5 -52,10 C-58,18 -55,24 -55,24 Z" fill="#0d0e10"/>
      <path d="M60,24 C70,15 67,5 57,10 C63,18 60,24 60,24 Z" fill="#0d0e10"/>

      <!-- Eyes & Strong Eyebrows -->
      <path d="M-35,-20 Q-15,-28 0,-20" stroke="#111" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M8,-20 Q25,-28 42,-20" stroke="#111" stroke-width="5" stroke-linecap="round" fill="none"/>
      <ellipse cx="-18" cy="-10" rx="9" ry="6" fill="#1b1c1e"/>
      <ellipse cx="25" cy="-10" rx="9" ry="6" fill="#1b1c1e"/>

      <!-- Voluminous Textured Black Hair -->
      <path d="M-65,-15 C-70,-85 -20,-115 10,-115 C55,-115 80,-75 75,-15 C65,-5 60,-25 50,-40 C40,-5 25,5 15,-20 C0,15 -25,2 -35,-20 C-45,-2 -55,-15 -65,-15 Z" fill="#121316"/>
      <!-- Fringe layers -->
      <path d="M-25,-55 C-15,-25 -5,-25 5,-50 C15,-20 30,-20 40,-45" stroke="#1c1e24" stroke-width="6" fill="none"/>
    </g>

    <!-- Right Hand Posing Near Head / Ear (As in Screenshot 2) -->
    <g transform="translate(450, 230)">
      <!-- Forearm & Wrist -->
      <path d="M20,60 L-10,25 L-20,40 L10,80 Z" fill="#d29979"/>
      <rect x="0" y="52" width="22" height="7" rx="3" fill="#c49a45" transform="rotate(-30)"/>
      <!-- Fingers curled near hood -->
      <path d="M-25,25 C-35,10 -30,-5 -15,5 L-5,25 Z" fill="#d29979"/>
      <path d="M-20,10 C-30,-2 -22,-15 -10,-8 L0,15 Z" fill="#d29979"/>
    </g>

    <!-- BLACK HOODIE BODY -->
    <g>
      <!-- Deep Double-Layer Hood draped around neck -->
      <path d="M240,240 C280,180 430,180 470,240 C485,300 450,330 350,330 C250,330 225,300 240,240 Z" fill="#111215" stroke="#000000" stroke-width="4"/>

      <!-- Long Drawstrings hanging down -->
      <path d="M315,310 C312,380 308,440 305,510" stroke="#16181d" stroke-width="7" stroke-linecap="round" fill="none"/>
      <rect x="302" y="505" width="6" height="15" fill="#4b505c" rx="2"/>

      <path d="M335,310 C332,380 328,420 325,480" stroke="#16181d" stroke-width="7" stroke-linecap="round" fill="none"/>
      <rect x="322" y="475" width="6" height="15" fill="#4b505c" rx="2"/>

      <!-- Torso Base & Arms -->
      <path d="M220,280 L110,400 L70,680 L160,670 L195,490 L195,700 L505,700 L505,490 L540,670 L620,680 L590,400 L490,280 Z" fill="url(#hoodieBlack)" stroke="#050506" stroke-width="4"/>

      <!-- Left Hand inside Kangaroo Pocket -->
      <path d="M210,560 C240,550 460,550 490,560 L470,700 L230,700 Z" fill="#121316" stroke="#000" stroke-width="3"/>
      <!-- Pocket Entrance Welts -->
      <line x1="210" y1="560" x2="250" y2="670" stroke="#1e2027" stroke-width="4"/>
      <line x1="490" y1="560" x2="450" y2="670" stroke="#1e2027" stroke-width="4"/>

      <!-- GOTHIC CHEST PRINT: "moosa forever" -->
      <g transform="translate(350, 420) rotate(-4)">
        <text 
          x="0" 
          y="0" 
          text-anchor="middle" 
          fill="#ffffff" 
          font-family="'UnifrakturMaguntia', 'Cinzel', serif" 
          font-size="44" 
          font-weight="bold" 
          letter-spacing="2"
        >
          moosa forever
        </text>

        <!-- White Cursive Script "Urban Theka" directly below -->
        <text 
          x="-15" 
          y="28" 
          text-anchor="middle" 
          fill="#ffffff" 
          font-family="'Brush Script MT', 'Caveat', cursive, sans-serif" 
          font-size="19" 
          font-style="italic" 
          letter-spacing="1"
        >
          UrbanTheka
        </text>
      </g>
    </g>

  </g>

  <!-- Authentic Watermark Tag -->
  <g transform="translate(300, 665)">
    <rect x="-170" y="-16" width="340" height="32" rx="16" fill="#000000" stroke="#eab308" stroke-width="1.5"/>
    <text x="0" y="5" text-anchor="middle" fill="#fef08a" font-family="monospace" font-size="11" font-weight="bold" letter-spacing="3">
      MOOSA FOREVER HOODIE · ₹4,000
    </text>
  </g>
</svg>
`;

export const MOOSA_FOREVER_BACK_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <radialGradient id="studioWallBack" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f5f6f8" />
      <stop offset="70%" stop-color="#e3e6eb" />
      <stop offset="100%" stop-color="#cbd0d8" />
    </radialGradient>
    <linearGradient id="hoodieBackBlack" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#24252a" />
      <stop offset="30%" stop-color="#141518" />
      <stop offset="80%" stop-color="#0a0b0d" />
      <stop offset="100%" stop-color="#040405" />
    </linearGradient>
    <filter id="backShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="10" dy="20" stdDeviation="18" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Clean Minimalist Studio Background -->
  <rect width="600" height="700" fill="url(#studioWallBack)"/>

  <!-- Panel Wall Line -->
  <line x1="520" y1="0" x2="520" y2="700" stroke="#ffffff" stroke-width="4"/>

  <!-- MODEL FIGURE (Back View as in Screenshot 3) -->
  <g filter="url(#backShadow)">

    <!-- Model Head & Side Profile (Looking Right) -->
    <g transform="translate(380, 150)">
      <!-- Side Profile of Face & Ear -->
      <path d="M-30,40 C-30,90 20,90 35,60 L50,60 L55,45 L40,40 Z" fill="#d29979"/>
      <ellipse cx="25" cy="45" rx="8" ry="12" fill="#c78c6e"/>
      <!-- Mustache & Beard on Side Profile -->
      <path d="M40,50 L58,48 L52,58 L38,62 Z" fill="#121316"/>
      <path d="M15,65 C30,75 45,70 50,55 L45,80 C30,92 10,88 0,80 Z" fill="#121316"/>

      <!-- Thick Styled Black Hair (Back & Side View) -->
      <path d="M-55,20 C-65,-40 -20,-75 25,-70 C60,-65 80,-30 75,10 C70,40 50,45 35,25 C10,35 -20,35 -55,20 Z" fill="#121316"/>
      <!-- Hair Strands & Volume -->
      <path d="M-30,-50 Q0,-65 30,-40" stroke="#22252d" stroke-width="5" fill="none"/>
      <path d="M-40,-20 Q-10,-45 40,-15" stroke="#22252d" stroke-width="5" fill="none"/>
    </g>

    <!-- HOODIE BACK BODY & HOOD -->
    <g>
      <!-- Hood draped over back of neck -->
      <path d="M210,210 C270,165 410,165 470,210 C480,265 430,320 340,320 C250,320 200,265 210,210 Z" fill="#101114" stroke="#000" strokeWidth="4"/>
      <!-- Hood Fold Crease -->
      <path d="M250,240 Q340,290 430,240" stroke="#1c1f26" stroke-width="4" fill="none"/>

      <!-- Torso Base & Arms (Back View, Shoulders squared) -->
      <path d="M200,240 L100,370 L60,670 L150,660 L180,480 L180,700 L510,700 L510,480 L540,660 L630,670 L590,370 L480,240 Z" fill="url(#hoodieBackBlack)" stroke="#050506" stroke-width="4"/>

      <!-- ==================== THE MONUMENTAL 295 BACK PRINT ==================== -->
      <g transform="translate(345, 470)">
        
        <!-- 1. Top Haveli Arches & Mansa Architecture (White Monochrome Halftone) -->
        <g stroke="#ffffff" stroke-width="2.5" fill="none" transform="translate(0, -200)">
          <!-- Roof Balustrades -->
          <rect x="-140" y="0" width="280" height="40" fill="#0c0d10" stroke="#ffffff" stroke-width="2"/>
          <line x1="-140" y1="12" x2="140" y2="12"/>
          {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map(x => (
            <path key={x} d={`M${x},12 L${x},38`} stroke="#ffffff" stroke-width="2"/>
          ))}
          <!-- Haveli Domed Arches -->
          <path d="M-130,40 Q-95,15 -60,40 L-60,75 L-130,75 Z" fill="#181a20" stroke="#ffffff" stroke-width="2.5"/>
          <path d="M-50,40 Q0,10 50,40 L50,75 L-50,75 Z" fill="#181a20" stroke="#ffffff" stroke-width="2.5"/>
          <path d="M60,40 Q95,15 130,40 L130,75 L60,75 Z" fill="#181a20" stroke="#ffffff" stroke-width="2.5"/>
        </g>

        <!-- 2. Mansa Moosa GPS Coordinates -->
        <g transform="translate(-135, -115)">
          <text x="0" y="0" fill="#ffffff" font-family="'Oswald', sans-serif" font-size="17" font-weight="bold" letter-spacing="1">
            29.9784° N
          </text>
          <text x="0" y="18" fill="#ffffff" font-family="'Oswald', sans-serif" font-size="17" font-weight="bold" letter-spacing="1">
            75.3194° E
          </text>
        </g>

        <!-- 3. Sidhu Moose Wala Autograph Signature (Top Right) -->
        <g transform="translate(60, -135)">
          <path 
            d="M0,20 Q20,-5 45,15 Q70,5 90,30 Q60,35 30,40 Q5,45 -10,30 Q20,10 60,0" 
            stroke="#ffffff" 
            stroke-width="3" 
            fill="none" 
            stroke-linecap="round"
          />
        </g>

        <!-- 4. Vintage 5911 HMT Tractor (Center Right) -->
        <g transform="translate(45, -70)" stroke="#ffffff" stroke-width="2" fill="#101216">
          <!-- Big Rear Tractor Wheel -->
          <circle cx="60" cy="50" r="38" stroke="#ffffff" stroke-width="3"/>
          <circle cx="60" cy="50" r="22" stroke="#ffffff" stroke-width="2"/>
          <!-- Front Hood & Exhaust Pipe -->
          <rect x="-10" y="20" width="55" height="35" rx="3" stroke="#ffffff" stroke-width="2"/>
          <line x1="10" y1="20" x2="10" y2="-15" stroke="#ffffff" stroke-width="4"/>
          <!-- Small Front Wheel -->
          <circle cx="0" cy="58" r="18" stroke="#ffffff" stroke-width="2.5"/>
        </g>

        <!-- 5. Sidhu Moose Wala Portrait (Wearing Turban & Shades with Hands Up) -->
        <g transform="translate(-25, -50)">
          <!-- Turban -->
          <path d="M-35,-20 C-40,-55 30,-55 35,-20 C40,5 -35,5 -35,-20 Z" fill="#ffffff"/>
          <!-- Face & Black Aviator Sunglasses -->
          <path d="M-30,-15 L30,-15 L25,20 L-25,20 Z" fill="#202228" stroke="#ffffff" stroke-width="1.5"/>
          <rect x="-24" y="-12" width="20" height="12" rx="3" fill="#000000" stroke="#ffffff" stroke-width="1.5"/>
          <rect x="4" y="-12" width="20" height="12" rx="3" fill="#000000" stroke="#ffffff" stroke-width="1.5"/>
          <!-- Mask / Beard -->
          <path d="M-28,10 C-25,35 25,35 28,10 Z" fill="#ffffff"/>
          <!-- Layered Cuban Link Chain -->
          <path d="M-20,40 Q0,60 20,40" stroke="#ffffff" stroke-width="3" fill="none"/>
        </g>

        <!-- 6. Mahindra Thar Jeep (PB65AV9713) with Glowing Headlights -->
        <g transform="translate(-5, 70)">
          <!-- Thar Grill & Hood Body -->
          <rect x="-85" y="-30" width="170" height="95" rx="10" fill="#121316" stroke="#ffffff" stroke-width="3"/>
          <!-- 7-Slot Iconic Grill -->
          {[-60, -40, -20, 0, 20, 40, 60].map(gx => (
            <rect key={gx} x={gx-4} y="-8" width="8" height="32" rx="3" fill="#ffffff"/>
          ))}
          <!-- Round Headlights -->
          <circle cx="-70" cy="8" r="14" fill="#ffffff" stroke="#000000" stroke-width="2"/>
          <circle cx="70" cy="8" r="14" fill="#ffffff" stroke="#000000" stroke-width="2"/>
          <!-- Massive Rugged Off-Road Bumper -->
          <rect x="-100" y="48" width="200" height="25" rx="5" fill="#050608" stroke="#ffffff" stroke-width="2.5"/>
          <!-- License Plate: PB65AV9713 -->
          <rect x="-45" y="52" width="90" height="18" rx="2" fill="#ffffff"/>
          <text x="0" y="65" text-anchor="middle" fill="#000000" font-family="'Oswald', sans-serif" font-size="12" font-weight="900" letter-spacing="1">
            PB65AV9713
          </text>
        </g>

        <!-- 7. Massive "295" Anthem Tribute Block at Bottom Left -->
        <g transform="translate(-115, 145)">
          <text 
            x="0" 
            y="0" 
            text-anchor="middle" 
            fill="none" 
            stroke="#ffffff" 
            stroke-width="5" 
            font-family="'Oswald', 'Cinzel', sans-serif" 
            font-size="78" 
            font-weight="900" 
            letter-spacing="2"
          >
            295
          </text>
          <text 
            x="0" 
            y="0" 
            text-anchor="middle" 
            fill="#ffffff" 
            font-family="'Oswald', 'Cinzel', sans-serif" 
            font-size="78" 
            font-weight="900" 
            letter-spacing="2"
            opacity="0.25"
          >
            295
          </text>
        </g>

      </g>
    </g>

  </g>

  <!-- Tag Bar -->
  <g transform="translate(300, 665)">
    <rect x="-170" y="-16" width="340" height="32" rx="16" fill="#000000" stroke="#ffffff" stroke-width="1.5"/>
    <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold" letter-spacing="3">
      BACK 295 ARCHIVE · MANSA HAVELI
    </text>
  </g>
</svg>
`;

export const MOOSA_FOREVER_FRONT_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(MOOSA_FOREVER_FRONT_SVG)}`;
export const MOOSA_FOREVER_BACK_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(MOOSA_FOREVER_BACK_SVG)}`;
export const MOOSA_FOREVER_DETAIL_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(MOOSA_FOREVER_DETAIL_SVG)}`;
