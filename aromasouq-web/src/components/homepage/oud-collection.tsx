/**
 * Oud Collection Showcase Component
 * Displays different types of Oud with descriptions
 */

import Link from 'next/link';

const oudTypes = [
  {
    icon: '🪔',
    name: 'Cambodian Oud',
    description: 'Rare and exquisite with deep woody notes',
    slug: 'cambodian',
  },
  {
    icon: '💎',
    name: 'Indian Oud',
    description: 'Rich, bold, and intensely aromatic',
    slug: 'indian',
  },
  {
    icon: '✨',
    name: 'Thai Oud',
    description: 'Sweet, smooth with honey-like undertones',
    slug: 'thai',
  },
  {
    icon: '🌙',
    name: 'Dehn Al Oud',
    description: 'Pure oil perfection for connoisseurs',
    slug: 'dehn-al-oud',
  },
];

export function OudCollection() {
  return (
    <div className="container mx-auto px-[5%] mb-16">
      <div className="text-center mb-10">
        <h2 className="text-[32px] text-[var(--color-deep-navy)] font-bold mb-2.5">
          Luxury Oud Collection
        </h2>
        <p className="text-[15px] text-gray-600">
          Discover the finest oud varieties from around the world
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {oudTypes.map((oud) => (
          <Link
            key={oud.slug}
            href={`/products?oudType=${oud.slug}`}
            className="bg-white rounded-xl overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] cursor-pointer"
          >
            <div className="h-[240px] bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-oud-gold)] flex items-center justify-center text-[64px]">
              {oud.icon}
            </div>
            <div className="p-6 text-center">
              <div className="text-lg font-bold text-[var(--color-charcoal)] mb-2">
                {oud.name}
              </div>
              <div className="text-[13px] text-gray-600 mb-4">
                {oud.description}
              </div>
              <span className="inline-block bg-white text-[var(--color-deep-navy)] border border-gray-200 px-6.5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-[var(--color-oud-gold)] hover:-translate-y-0.5">
                Explore Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
