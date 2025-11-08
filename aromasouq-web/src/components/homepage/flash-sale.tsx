/**
 * Flash Sale Component
 * Displays limited-time offers with countdown timer
 */

'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/api/homepage';
import { ProductCarousel } from './product-carousel';

interface FlashSaleProps {
  products: Product[];
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function FlashSale({ products }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              // Reset to initial time when countdown ends
              return { hours: 12, minutes: 34, seconds: 56 };
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[var(--color-deep-navy)] to-[var(--color-charcoal)] py-12 mb-16">
      <div className="container mx-auto px-[5%]">
        <div className="text-center mb-10">
          <h2 className="text-[32px] text-[var(--color-ivory)] font-bold mb-2.5">
            ⚡ Flash Sale
          </h2>
          <p className="text-[15px] text-[var(--color-rose-gold)]">
            Hurry! Limited time offers
          </p>
        </div>

        <div className="flex justify-center gap-5 mb-8">
          <div className="text-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-[10px]">
            <div className="text-[32px] font-bold text-[var(--color-oud-gold)] leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[11px] text-[var(--color-ivory)] uppercase tracking-wide mt-1">
              Hours
            </div>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-[10px]">
            <div className="text-[32px] font-bold text-[var(--color-oud-gold)] leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[11px] text-[var(--color-ivory)] uppercase tracking-wide mt-1">
              Minutes
            </div>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-[10px]">
            <div className="text-[32px] font-bold text-[var(--color-oud-gold)] leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[11px] text-[var(--color-ivory)] uppercase tracking-wide mt-1">
              Seconds
            </div>
          </div>
        </div>

        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
