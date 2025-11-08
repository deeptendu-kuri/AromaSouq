/**
 * Hero Slider Component
 * Main banner section with gradient background
 */

import Link from 'next/link';

export function HeroSlider() {
  return (
    <div className="relative h-[550px] overflow-hidden mb-12 bg-gradient-to-br from-[var(--color-deep-navy)] via-[var(--color-charcoal)] to-[var(--color-oud-gold)]">
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="text-center z-10 max-w-3xl px-5">
          <h1 className="text-5xl md:text-[52px] font-bold mb-4.5 leading-tight">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg md:text-[19px] mb-7.5 opacity-95">
            Explore our exclusive collection of premium Arabic perfumes
          </p>
          <Link
            href="/products"
            className="inline-block bg-gradient-to-r from-[var(--color-oud-gold)] to-[var(--color-amber)] text-[var(--color-deep-navy)] px-9.5 py-3.5 rounded-full text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,106,0.4)] shadow-[var(--shadow-oud)]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
