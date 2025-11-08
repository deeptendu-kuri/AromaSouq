/**
 * Shop by Brand Component
 * Grid display of brand cards
 */

import Link from 'next/link';
import { Brand } from '@/lib/api/homepage';

interface ShopByBrandProps {
  brands: Brand[];
}

export function ShopByBrand({ brands }: ShopByBrandProps) {
  return (
    <div className="container mx-auto px-[5%] mb-16">
      <div className="text-center mb-10">
        <h2 className="text-[32px] text-[var(--color-deep-navy)] font-bold mb-2.5">
          Shop by Brand
        </h2>
        <p className="text-[15px] text-gray-600">
          Premium fragrance houses
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brandSlug=${brand.slug}`}
            className="bg-white p-8 rounded-[10px] text-center shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-[var(--color-oud-gold)]"
          >
            <div className="text-[22px] font-bold text-[var(--color-charcoal)] mb-2">
              {brand.name}
            </div>
            <div className="text-xs text-[var(--color-oud-gold)] font-semibold">
              {brand._count.products} Products
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
