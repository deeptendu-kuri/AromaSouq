/**
 * Announcement Bar Component
 * Displays promotional messages at the top of the page
 */

import Link from 'next/link';

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[var(--color-deep-navy)] to-[var(--color-charcoal)] text-[var(--color-ivory)] py-2.5 text-center text-sm">
      <span className="inline-flex items-center gap-2 flex-wrap justify-center px-4">
        <span>🎉 Free Shipping on Orders Above AED 200</span>
        <span className="hidden sm:inline">|</span>
        <Link
          href="/payment-options"
          className="text-[var(--color-oud-gold)] font-semibold hover:underline"
        >
          Buy Now Pay Later Available
        </Link>
        <span className="hidden sm:inline">|</span>
        <Link
          href="/click-collect"
          className="text-[var(--color-oud-gold)] font-semibold hover:underline"
        >
          Click & Collect in 2 Hours
        </Link>
      </span>
    </div>
  );
}
