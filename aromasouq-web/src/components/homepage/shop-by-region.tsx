/**
 * Shop by Region Component
 * Horizontal carousel of regional fragrance origins
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Region } from '@/lib/api/homepage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopByRegionProps {
  regions: Region[];
}

// Flag emoji mapping for regions
const regionFlags: Record<string, string> = {
  uae: '🇦🇪',
  'saudi arabia': '🇸🇦',
  saudi: '🇸🇦',
  kuwait: '🇰🇼',
  qatar: '🇶🇦',
  oman: '🇴🇲',
  bahrain: '🇧🇭',
  france: '🇫🇷',
  french: '🇫🇷',
  italy: '🇮🇹',
  italian: '🇮🇹',
  spain: '🇪🇸',
  spanish: '🇪🇸',
  uk: '🇬🇧',
  'united kingdom': '🇬🇧',
  usa: '🇺🇸',
  america: '🇺🇸',
  india: '🇮🇳',
  indian: '🇮🇳',
  arab: '🇸🇦',
  arabic: '🇸🇦',
  european: '🇪🇺',
};

function getRegionFlag(regionName: string | undefined): string {
  if (!regionName) return '🌍';
  const normalized = regionName.toLowerCase();
  for (const [key, flag] of Object.entries(regionFlags)) {
    if (normalized.includes(key)) {
      return flag;
    }
  }
  return '🌍';
}

export function ShopByRegion({ regions }: ShopByRegionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 264 * 4; // (card width 240 + gap 24) * 4
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-[#f9f9f9] py-12 mb-16">
      <div className="container mx-auto px-[5%]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-[32px] text-[var(--color-deep-navy)] font-bold mb-2.5">
              Shop by Region
            </h2>
            <p className="text-[15px] text-gray-600">
              Explore fragrances from around the world
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-oud-gold)] hover:border-[var(--color-oud-gold)] hover:text-white"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-oud-gold)] hover:border-[var(--color-oud-gold)] hover:text-white"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {regions.filter(region => region.region).map((region, index) => (
            <Link
              key={region.region || `region-${index}`}
              href={`/products?region=${encodeURIComponent(region.region)}`}
              className="flex-shrink-0 w-[240px] bg-white rounded-xl overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] cursor-pointer"
            >
              <div className="h-[140px] flex items-center justify-center text-[72px] bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8]">
                {getRegionFlag(region.region)}
              </div>
              <div className="p-5 text-center">
                <div className="text-base font-bold text-[var(--color-charcoal)] mb-1.5">
                  {region.region}
                </div>
                <div className="text-xs text-[var(--color-oud-gold)] font-semibold">
                  {region.count} Products
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
