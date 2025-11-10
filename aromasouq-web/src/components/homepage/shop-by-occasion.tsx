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
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-20 mb-0">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-violet-300/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-fuchsia-300/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-[5%] relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-5 py-1.5 rounded-full mb-3 shadow-lg text-xs font-bold tracking-wide">
            ✨ EVERY MOMENT MATTERS
          </div>
          <h2 className="text-5xl text-[var(--color-deep-navy)] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            Shop by Occasion
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find the perfect scent for every moment • Make lasting impressions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {occasions.filter(occasion => occasion.occasion).map((occasion, index) => {
            const { icon, tag } = getOccasionData(occasion.occasion);
            return (
              <Link
                key={occasion.occasion || `occasion-${index}`}
                href={`/products?occasion=${encodeURIComponent(occasion.occasion)}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 px-6 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-white/50 group hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50"
              >
                <div className="text-6xl mb-5 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
                <div className="text-base font-bold text-[var(--color-deep-navy)] mb-2">
                  {occasion.occasion}
                </div>
                <div className="text-xs text-violet-600 font-semibold bg-violet-100 px-3 py-1 rounded-full inline-block">
                  {tag}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
    </div>
  );
}
