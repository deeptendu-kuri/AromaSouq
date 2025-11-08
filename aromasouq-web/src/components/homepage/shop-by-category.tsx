/**
 * Shop by Category Component
 * Displays categories as circular icons
 */

import Link from 'next/link';
import { Category } from '@/lib/api/homepage';

interface ShopByCategoryProps {
  categories: Category[];
}

export function ShopByCategory({ categories }: ShopByCategoryProps) {
  return (
    <div className="container mx-auto px-[5%] mb-16">
      <div className="text-center mb-10">
        <h2 className="text-[32px] text-[var(--color-deep-navy)] font-bold mb-2.5">
          Shop by Category
        </h2>
        <p className="text-[15px] text-gray-600">
          Discover our curated collections
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-5 max-w-[1000px] mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?categorySlug=${category.slug}`}
            className="text-center group cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
          >
            <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[var(--color-oud-gold)] to-[var(--color-amber)] mx-auto mb-3 flex items-center justify-center text-[44px] shadow-[var(--shadow-oud)] transition-all duration-300 group-hover:shadow-[var(--shadow-oud-hover)] group-hover:scale-105">
              {category.icon}
            </div>
            <div className="font-semibold text-[var(--color-charcoal)] text-sm">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
