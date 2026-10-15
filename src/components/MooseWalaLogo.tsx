import React, { useState, useEffect } from 'react';
import { getCustomBrandLogo } from '../utils/mediaStore';

interface MooseWalaLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'emblem';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  customLogoUrl?: string | null;
}

export const MooseWalaLogo: React.FC<MooseWalaLogoProps> = ({
  className = '',
  variant = 'dark',
  showText = true,
  size = 'md',
  customLogoUrl,
}) => {
  const isDark = variant === 'dark';
  const [activeLogo, setActiveLogo] = useState<string | null>(customLogoUrl || null);

  useEffect(() => {
    if (customLogoUrl !== undefined) {
      setActiveLogo(customLogoUrl);
    } else {
      setActiveLogo(getCustomBrandLogo());
    }
  }, [customLogoUrl]);

  // Listen to custom logo storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      if (customLogoUrl === undefined) {
        setActiveLogo(getCustomBrandLogo());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('mw_logo_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mw_logo_updated', handleStorageChange);
    };
  }, [customLogoUrl]);
  
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12'
  }[size];

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  }[size];

  const subtitleSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[11px]'
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* High-End Vector Crown & Monogram Emblem or Uploaded Brand Logo */}
      <div
        className={`${iconDimensions} relative shrink-0 rounded-lg flex items-center justify-center overflow-hidden border shadow-sm transition-transform duration-200 group-hover:scale-105 ${
          isDark
            ? 'bg-neutral-950 border-neutral-800 text-white'
            : 'bg-white border-neutral-200 text-neutral-950'
        }`}
      >
        {activeLogo ? (
          <img
            src={activeLogo}
            alt="Moose Wala Official Logo"
            className="w-full h-full object-contain p-0.5"
            onError={() => setActiveLogo(null)}
          />
        ) : (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Royal Crest Outline */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="12"
            stroke="url(#mwGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            className="opacity-70"
          />
          
          {/* Stylized Crown at Top */}
          <path
            d="M32 30L38 40L50 24L62 40L68 30L65 47H35L32 30Z"
            fill="url(#mwGoldSolid)"
          />
          <circle cx="32" cy="28" r="2.5" fill="#f59e0b" />
          <circle cx="50" cy="22" r="3" fill="#fbbf24" />
          <circle cx="68" cy="28" r="2.5" fill="#f59e0b" />

          {/* Bold Monogram "MW" */}
          <text
            x="50"
            y="76"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Oswald', serif"
            fontWeight="900"
            fontSize="27"
            letterSpacing="1"
            fill={isDark ? '#FFFFFF' : '#0A0A0A'}
          >
            MW
          </text>

          {/* Underline Bar with Star */}
          <path
            d="M26 84H74"
            stroke="url(#mwGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="84" r="2" fill="#f59e0b" />

          <defs>
            <linearGradient id="mwGoldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#d97706" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="mwGoldSolid" x1="32" y1="22" x2="68" y2="47" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde68a" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
          </defs>
        </svg>
        )}
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${titleSizes} font-serif-luxury font-black tracking-tight uppercase leading-none transition-colors ${
              isDark ? 'text-neutral-950 group-hover:text-amber-600' : 'text-white group-hover:text-amber-400'
            }`}
          >
            Moose Wala
          </span>
          <span
            className={`${subtitleSizes} font-mono tracking-[0.22em] uppercase mt-0.5 ${
              isDark ? 'text-neutral-500' : 'text-neutral-400'
            }`}
          >
            Official Men's Collection
          </span>
        </div>
      )}
    </div>
  );
};
