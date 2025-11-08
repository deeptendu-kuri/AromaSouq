/**
 * Shop by Occasion Component
 * Grid display of occasion categories
 */

import Link from 'next/link';
import { Occasion } from '@/lib/api/homepage';

interface ShopByOccasionProps {
  occasions: Occasion[];
}

// Icon and tag mapping for occasions
const occasionData: Record<string, { icon: string; tag: string }> = {
  office: { icon: '💼', tag: 'Professional & Subtle' },
  party: { icon: '🎉', tag: 'Bold & Captivating' },
  date: { icon: '💝', tag: 'Romantic & Alluring' },
  wedding: { icon: '💍', tag: 'Luxurious & Memorable' },
  ramadan: { icon: '🌙', tag: 'Traditional & Sacred' },
  eid: { icon: '🌙', tag: 'Traditional & Sacred' },
  daily: { icon: '🌞', tag: 'Fresh & Comfortable' },
};

function getOccasionData(occasionName: string | undefined) {
  if (!occasionName) {
    return { icon: '✨', tag: 'Perfect for any moment' };
  }
  const normalized = occasionName.toLowerCase();
  for (const [key, value] of Object.entries(occasionData)) {
    if (normalized.includes(key)) {
      return value;
    }
  }
  return { icon: '✨', tag: 'Perfect for any moment' };
}

export function ShopByOccasion({ occasions }: ShopByOccasionProps) {
  return (
    <div className="container mx-auto px-[5%] mb-16">
      <div className="text-center mb-10">
        <h2 className="text-[32px] text-[var(--color-deep-navy)] font-bold mb-2.5">
          Shop by Occasion
        </h2>
        <p className="text-[15px] text-gray-600">
          Find the perfect scent for every moment
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {occasions.filter(occasion => occasion.occasion).map((occasion, index) => {
          const { icon, tag } = getOccasionData(occasion.occasion);
          return (
            <Link
              key={occasion.occasion || `occasion-${index}`}
              href={`/products?occasion=${encodeURIComponent(occasion.occasion)}`}
              className="bg-white rounded-xl p-8 px-6 text-center shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] hover:border-2 hover:border-[var(--color-oud-gold)] cursor-pointer border-2 border-transparent"
            >
              <div className="text-5xl mb-4">{icon}</div>
              <div className="text-[15px] font-bold text-[var(--color-charcoal)] mb-1.5">
                {occasion.occasion}
              </div>
              <div className="text-[11px] text-[var(--color-oud-gold)] font-semibold">
                {tag}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
