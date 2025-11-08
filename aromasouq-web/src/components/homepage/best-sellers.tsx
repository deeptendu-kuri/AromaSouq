/**
 * Best Sellers Component
 * Displays top-selling products
 */

import { Product } from '@/lib/api/homepage';
import { ProductCarousel } from './product-carousel';

interface BestSellersProps {
  products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="bg-[#f9f9f9] py-12 mb-16">
      <div className="container mx-auto px-[5%]">
        <div className="mb-8">
          <h2 className="text-[32px] text-[var(--color-deep-navy)] font-bold mb-2.5">
            Best Sellers
          </h2>
          <p className="text-[15px] text-gray-600">
            Our most loved fragrances
          </p>
        </div>

        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
