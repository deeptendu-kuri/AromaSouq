/**
 * Product Carousel Component
 * Reusable horizontal scrolling product display
 */

'use client';

import { useRef } from 'react';
import { ProductCard } from '@/components/ui/product-card';
import { Product } from '@/lib/api/homepage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
  className?: string;
}

export function ProductCarousel({ products, className = '' }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 284 * 4; // (card width 260 + gap 24) * 4 cards
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex justify-between items-center mb-8">
        <div></div>
        <div className="flex gap-2.5">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-oud-gold)] hover:border-[var(--color-oud-gold)] hover:text-white text-[var(--color-charcoal)]"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-oud-gold)] hover:border-[var(--color-oud-gold)] hover:text-white text-[var(--color-charcoal)]"
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
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[260px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
