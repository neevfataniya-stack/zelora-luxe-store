import React, { useState } from 'react';
import { ProductCategory } from '../../types';

interface JewelleryVisualProps {
  src: string;
  alt: string;
  category?: ProductCategory;
  className?: string;
  aspectRatioClass?: string;
}

export const JewelleryVisual: React.FC<JewelleryVisualProps> = ({
  src,
  alt,
  category,
  className = 'w-full h-full object-cover',
  aspectRatioClass = 'aspect-[4/5]',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // SVG Fallback silhouettes for each jewellery domain
  const renderFallbackArt = () => {
    switch (category) {
      case 'Earrings':
        return (
          <svg className="w-20 h-20 text-[#C5A46D] opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="22" r="5" stroke="#C5A46D" fill="#ECE4D8" />
            <path d="M50 27 L50 48" stroke="#C5A46D" />
            <ellipse cx="50" cy="65" rx="12" ry="17" stroke="#C5A46D" fill="#FAF7F2" />
            <circle cx="50" cy="65" r="5" fill="#641E32" />
          </svg>
        );
      case 'Necklaces':
        return (
          <svg className="w-20 h-20 text-[#C5A46D] opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M25 20 C 35 70, 65 70, 75 20" stroke="#C5A46D" strokeDasharray="3 2" />
            <polygon points="50,66 45,76 55,76" fill="#FAF7F2" stroke="#641E32" />
            <circle cx="50" cy="72" r="2.5" fill="#C5A46D" />
          </svg>
        );
      case 'Bangles & Bracelets':
        return (
          <svg className="w-20 h-20 text-[#C5A46D] opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <ellipse cx="50" cy="50" rx="30" ry="18" stroke="#C5A46D" strokeWidth="3" />
            <ellipse cx="50" cy="46" rx="27" ry="15" stroke="#641E32" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case 'Rings':
        return (
          <svg className="w-20 h-20 text-[#C5A46D] opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="58" r="22" stroke="#C5A46D" strokeWidth="2.5" />
            <rect x="42" y="26" width="16" height="12" rx="2" stroke="#641E32" fill="#FAF7F2" />
            <line x1="42" y1="32" x2="58" y2="32" stroke="#C5A46D" />
          </svg>
        );
      case 'Jewellery Sets':
      default:
        return (
          <svg className="w-20 h-20 text-[#C5A46D] opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="34" cy="40" r="14" stroke="#C5A46D" />
            <circle cx="66" cy="40" r="14" stroke="#C5A46D" />
            <path d="M20 75 Q 50 95 80 75" stroke="#641E32" strokeWidth="2" />
            <circle cx="50" cy="85" r="4" fill="#C5A46D" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#ECE4D8]/60 ${aspectRatioClass} flex items-center justify-center`}>
      {/* Background ambient luxury gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#F5F0E8] to-[#ECE4D8]" />

      {/* Styled Fallback Container */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-0">
          <div className="p-4 rounded-full bg-white/40 border border-[#C5A46D]/20 mb-2 shadow-xs">
            {renderFallbackArt()}
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#665E58] font-medium">
            {category || 'Zelora Jewels'}
          </span>
        </div>
      )}

      {/* Actual Product Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
