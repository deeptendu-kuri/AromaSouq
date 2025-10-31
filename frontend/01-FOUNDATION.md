# Phase 1: Foundation Setup

**Estimated Time:** 30 minutes
**Dependencies:** None
**Next Phase:** 02-DESIGN-SYSTEM.md

---

## Overview

This phase sets up the Next.js project with TypeScript, Tailwind CSS, and the necessary configuration for the AromaSouq luxury fragrance marketplace.

---

## 1. Create Next.js Project

```bash
npx create-next-app@latest aromasouq-frontend
```

**Configuration prompts:**
```
✓ Would you like to use TypeScript? Yes
✓ Would you like to use ESLint? Yes
✓ Would you like to use Tailwind CSS? Yes
✓ Would you like to use `src/` directory? No
✓ Would you like to use App Router? Yes
✓ Would you like to customize the default import alias? Yes
  What import alias would you like configured? @/*
```

```bash
cd aromasouq-frontend
```

---

## 2. Install Core Dependencies

```bash
# State Management & Data Fetching
npm install zustand @tanstack/react-query axios

# Form Handling & Validation
npm install react-hook-form zod @hookform/resolvers

# Animation
npm install framer-motion

# UI Components (shadcn/ui dependencies)
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# Date utilities
npm install date-fns

# Additional utilities
npm install react-hot-toast
```

---

## 3. Install Development Dependencies

```bash
npm install -D @types/node @types/react @types/react-dom
```

---

## 4. Project Folder Structure

Create the following folder structure:

```
aromasouq-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (customer)/
│   │   ├── account/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   └── wishlist/
│   ├── (vendor)/
│   │   └── vendor/
│   ├── (admin)/
│   │   └── admin/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                    ← shadcn components go here
│   ├── aceternity/            ← Aceternity components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── providers/
│       ├── AuthProvider.tsx
│       └── QueryProvider.tsx
├── lib/
│   ├── api-client.ts
│   ├── utils.ts
│   └── constants.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useCart.ts
│   └── useWishlist.ts
├── stores/
│   ├── authStore.ts
│   └── cartStore.ts
├── types/
│   ├── index.ts
│   ├── user.ts
│   ├── product.ts
│   ├── order.ts
│   └── review.ts
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

Create the folders:

```bash
# From project root
mkdir -p app/\(auth\)/login app/\(auth\)/register
mkdir -p app/\(customer\)/account app/\(customer\)/cart app/\(customer\)/checkout app/\(customer\)/products app/\(customer\)/wishlist
mkdir -p app/\(vendor\)/vendor
mkdir -p app/\(admin\)/admin
mkdir -p components/ui components/aceternity components/layout components/providers
mkdir -p lib hooks stores types
mkdir -p public/images
```

---

## 5. TypeScript Configuration

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/stores/*": ["./stores/*"],
      "@/types/*": ["./types/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 6. Environment Variables

Create `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Supabase Configuration (for file uploads)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AromaSouq
```

Create `.env.example` (for version control):

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=
```

---

## 7. Next.js Configuration

Update `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
```

---

## 8. Utility Functions

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency to AED
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`

  return formatDate(date)
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(
  regularPrice: number,
  salePrice: number
): number {
  if (!salePrice || salePrice >= regularPrice) return 0
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
```

---

## 9. Constants

Create `lib/constants.ts`:

```typescript
/**
 * Application constants
 */

// API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Pagination
export const ITEMS_PER_PAGE = 12
export const REVIEWS_PER_PAGE = 10

// Cart
export const FREE_SHIPPING_THRESHOLD = 300 // AED
export const TAX_RATE = 0.05 // 5% VAT

// Coins
export const COINS_VALUE = 0.10 // 1 coin = 0.10 AED
export const COINS_EARN_RATE = 0.01 // 1% of order value
export const COINS_MAX_REDEMPTION = 0.50 // Max 50% of subtotal
export const COINS_PER_REVIEW = 20

// File Uploads
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime']

// Validation
export const MIN_PASSWORD_LENGTH = 8
export const MIN_REVIEW_LENGTH = 20
export const MAX_REVIEW_IMAGES = 3
export const MAX_PRODUCT_IMAGES = 8
export const MAX_PRODUCT_VIDEOS = 3

// Routes
export const PUBLIC_ROUTES = ['/', '/products', '/about', '/login', '/register']
export const AUTH_ROUTES = ['/login', '/register']
export const CUSTOMER_ROUTES = ['/account', '/cart', '/checkout', '/wishlist', '/orders']
export const VENDOR_ROUTES = ['/vendor']
export const ADMIN_ROUTES = ['/admin']

// Enum mappings
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CARD = 'CARD',
  COD = 'COD',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum VendorStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNISEX = 'UNISEX',
}

export enum CoinTransactionType {
  EARNED = 'EARNED',
  SPENT = 'SPENT',
  EXPIRED = 'EXPIRED',
  BONUS = 'BONUS',
}

export enum CoinSource {
  ORDER_PURCHASE = 'ORDER_PURCHASE',
  ORDER_REFUND = 'ORDER_REFUND',
  REVIEW = 'REVIEW',
  SIGNUP = 'SIGNUP',
  ADMIN_ADJUSTMENT = 'ADMIN_ADJUSTMENT',
}
```

---

## 10. Global Styles

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 36 47% 60%; /* Oud gold */
    --primary-foreground: 0 0% 98%;
    --secondary: 215 25% 13%; /* Deep navy */
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 36 47% 60%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Focus styles */
*:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2;
}
```

---

## 11. Root Layout

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AromaSouq - Luxury Fragrance Marketplace",
  description: "Discover authentic luxury fragrances, oud, attars, and more from premium UAE vendors.",
  keywords: "perfume, oud, attar, fragrance, luxury, UAE, Dubai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

## 12. Verification

Run the development server to verify everything is set up correctly:

```bash
npm run dev
```

Visit http://localhost:3000 - you should see the default Next.js page.

---

## ✅ Phase 1 Complete

You should now have:
- ✅ Next.js 14+ with App Router
- ✅ TypeScript configured with path aliases
- ✅ Tailwind CSS installed
- ✅ Folder structure created
- ✅ Core dependencies installed
- ✅ Utility functions ready
- ✅ Constants defined
- ✅ Environment variables set up
- ✅ Development server running

---

## 🎯 Next Steps

Proceed to **02-DESIGN-SYSTEM.md** to build the component library and set up the luxury design system. This is the most important phase - all subsequent phases will import components from it.

**Time investment:** 30 minutes ✅
**Next phase:** 4-6 hours (02-DESIGN-SYSTEM.md)
