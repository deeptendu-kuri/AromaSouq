/**
 * Featured Collections Component
 * Twin banner display for Men's and Women's collections
 */

import Link from 'next/link';

export function FeaturedCollections() {
  return (
    <div className="container mx-auto px-[5%] mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Men's Banner */}
        <Link
          href="/products?gender=men"
          className="h-[350px] rounded-[14px] overflow-hidden relative group cursor-pointer shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] bg-gradient-to-br from-[var(--color-deep-navy)]/85 to-[var(--color-charcoal)]/70"
        >
          <div className="absolute bottom-[35px] left-[35px] text-white">
            <h3 className="text-[38px] font-bold mb-2">For Him</h3>
            <p className="text-[15px] mb-4.5 opacity-95">
              Bold and sophisticated fragrances
            </p>
            <span className="inline-block bg-white text-[var(--color-deep-navy)] px-6.5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-[var(--color-oud-gold)] hover:-translate-y-0.5">
              Shop Men's
            </span>
          </div>
        </Link>

        {/* Women's Banner */}
        <Link
          href="/products?gender=women"
          className="h-[350px] rounded-[14px] overflow-hidden relative group cursor-pointer shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] bg-gradient-to-br from-[var(--color-burgundy)]/75 to-[var(--color-oud-gold)]/70"
        >
          <div className="absolute bottom-[35px] left-[35px] text-white">
            <h3 className="text-[38px] font-bold mb-2">For Her</h3>
            <p className="text-[15px] mb-4.5 opacity-95">
              Elegant and luxurious scents
            </p>
            <span className="inline-block bg-white text-[var(--color-deep-navy)] px-6.5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-[var(--color-oud-gold)] hover:-translate-y-0.5">
              Shop Women's
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
