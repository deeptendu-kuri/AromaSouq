/**
 * Our Brand Spotlight Component
 * Showcases AromaSouq signature products
 */

import { Product } from '@/lib/api/homepage';
import { ProductCarousel } from './product-carousel';

interface OurBrandSpotlightProps {
  products: Product[];
}

export function OurBrandSpotlight({ products }: OurBrandSpotlightProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--color-burgundy)] to-[var(--color-deep-navy)] py-16 mb-16 text-white">
      <div className="container mx-auto px-[5%]">
        <div className="text-center mb-10">
          <h2 className="text-[32px] text-[var(--color-ivory)] font-bold mb-2.5">
            Our Brand Signature Collection <span className="text-[32px] ml-2">⭐</span>
          </h2>
          <p className="text-[15px] text-[var(--color-oud-gold)]">
            Handcrafted with passion, exclusively by AromaSouq
          </p>
        </div>

        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
