/**
 * Shop by Scent Family Component
 * Horizontal carousel of scent family cards
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ScentFamily } from '@/lib/api/homepage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopByScentProps {
  scentFamilies: ScentFamily[];
}

// Icon mapping for scent families
const scentIcons: Record<string, string> = {
  floral: '🌸',
  fruity: '🍎',
  'fresh/aquatic': '🌊',
  oriental: '🌟',
  woody: '🌳',
  musky: '💨',
  'sweet/gourmand': '🍬',
  spicy: '🌶️',
  oud: '🪵',
  leather: '🧥',
};

function getScentIcon(scentName: string | undefined): string {
  if (!scentName) return '🌿';
  const normalized = scentName.toLowerCase();
  return scentIcons[normalized] || '🌿';
}

export function ShopByScent({ scentFamilies }: ShopByScentProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 244 * 4; // (card width 220 + gap 24) * 4
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
              Shop by Scent Family
            </h2>
            <p className="text-[15px] text-gray-600">
              Find your perfect fragrance DNA
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
          {scentFamilies.filter(scent => scent.scentFamily).map((scent, index) => (
            <Link
              key={scent.scentFamily || `scent-${index}`}
              href={`/products?scentFamily=${encodeURIComponent(scent.scentFamily)}`}
              className="flex-shrink-0 w-[220px] bg-white rounded-xl overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] cursor-pointer text-center"
            >
              <div className="text-[56px] pt-8 pb-5 bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0]">
                {getScentIcon(scent.scentFamily)}
              </div>
              <div className="p-5">
                <div className="text-base font-bold text-[var(--color-charcoal)] mb-1.5">
                  {scent.scentFamily}
                </div>
                <div className="text-xs text-[var(--color-oud-gold)] font-semibold">
                  {scent.count} Products
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
