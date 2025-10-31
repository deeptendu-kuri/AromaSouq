# AromaSouq Frontend - Complete Implementation Roadmap

**Generated:** October 25, 2025
**Purpose:** Step-by-step guide to implement the complete frontend based on documentation files
**Total Time:** 32-42 hours (6 days)
**Files to Follow:** 01-08 in frontend folder

---

## 📋 Table of Contents

1. [Understanding the Documentation Structure](#1-understanding-the-documentation-structure)
2. [Implementation Order & Dependencies](#2-implementation-order--dependencies)
3. [Day-by-Day Execution Plan](#3-day-by-day-execution-plan)
4. [Critical Success Factors](#4-critical-success-factors)
5. [Component Architecture](#5-component-architecture)
6. [Import Patterns & Conventions](#6-import-patterns--conventions)
7. [Testing Strategy](#7-testing-strategy)
8. [Deployment Checklist](#8-deployment-checklist)

---

## 1. Understanding the Documentation Structure

### 📁 Frontend Documentation Files

The frontend is documented in **9 implementation files** located in `C:\Users\deept\AromaSouq\frontend\`:

```
frontend/
├── 00-IMPLEMENTATION-GUIDE.md    ← START HERE (navigation guide)
├── 01-FOUNDATION.md              ← Day 1 Morning (30 min)
├── 02-DESIGN-SYSTEM.md           ← Day 1 Afternoon (4-6 hours) ⭐ CRITICAL
├── 03-CORE-FEATURES.md           ← Day 1 Evening (3-4 hours)
├── 04-PUBLIC-PAGES.md            ← Day 2 (6-8 hours)
├── 05-SHOPPING-FEATURES.md       ← Day 3 (6-8 hours)
├── 06-VENDOR-DASHBOARD.md        ← Day 4 (6-8 hours)
├── 07-ADMIN-DASHBOARD.md         ← Day 5 (6-8 hours)
├── 08-ENHANCEMENTS.md            ← Day 6 (4-6 hours) Optional
└── IMPLEMENTATION-STATUS.md      ← Status tracker
```

### 🎯 File Purposes

| File | What It Contains | Why It Matters |
|------|-----------------|----------------|
| **00-IMPLEMENTATION-GUIDE** | Navigation map, execution order, quick reference | Your starting point - read first! |
| **01-FOUNDATION** | Next.js setup, TypeScript config, folder structure | Creates project scaffold |
| **02-DESIGN-SYSTEM** ⭐ | Complete component library, Tailwind config, shadcn/ui, Aceternity | **MOST CRITICAL** - All pages import from here |
| **03-CORE-FEATURES** | API client, types, auth store, React Query, hooks | Backend integration layer |
| **04-PUBLIC-PAGES** | Homepage, products, login, header, footer | Customer-facing pages |
| **05-SHOPPING-FEATURES** | Cart, checkout, wishlist, orders, reviews | Shopping flow |
| **06-VENDOR-DASHBOARD** | Vendor portal, products, orders management | Vendor features |
| **07-ADMIN-DASHBOARD** | Admin panel, user management, vendor approval | Admin features |
| **08-ENHANCEMENTS** | Quick view, buy now, scent pyramid, animations | Premium features |

---

## 2. Implementation Order & Dependencies

### 🔗 Critical Dependency Chain

```
START HERE
    ↓
01-FOUNDATION (Creates project)
    ↓
02-DESIGN-SYSTEM ← ⭐⭐⭐ COMPLETE THIS FIRST ⭐⭐⭐
    ↓              (All components defined here)
03-CORE-FEATURES
    ↓
┌───────────────────────────────┐
│   All these import from 02:   │
│                               │
│   04-PUBLIC-PAGES             │
│   05-SHOPPING-FEATURES        │
│   06-VENDOR-DASHBOARD         │
│   07-ADMIN-DASHBOARD          │
│   08-ENHANCEMENTS             │
└───────────────────────────────┘
```

### ⚠️ Critical Rules

1. **File 02 MUST be completed before files 04-08**
   - All pages import components from `@/components/ui`
   - Components defined in 02-DESIGN-SYSTEM
   - If 02 is incomplete, all other pages will fail

2. **File 03 MUST be completed before files 04-08**
   - All pages use API hooks from 03-CORE-FEATURES
   - Types defined in 03
   - Without 03, pages cannot fetch data

3. **Files 04-08 can be done in parallel**
   - Once 02 and 03 are complete
   - Each file is independent
   - But recommended order: 04 → 05 → 06 → 07 → 08

---

## 3. Day-by-Day Execution Plan

### 📅 Day 1: Foundation & Design System (8 hours)

**Morning Session (9am - 12pm):**

```bash
# Step 1: Create Next.js Project (30 minutes)
npx create-next-app@latest aromasouq-frontend
cd aromasouq-frontend

# Follow prompts:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ src/ directory: No
# ✓ App Router: Yes
# ✓ Import alias: @/*

# Step 2: Install Dependencies (10 minutes)
npm install zustand @tanstack/react-query axios
npm install react-hook-form zod @hookform/resolvers
npm install framer-motion
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react date-fns react-hot-toast

# Step 3: Create Folder Structure (10 minutes)
mkdir -p app/\(auth\)/login app/\(auth\)/register
mkdir -p app/\(customer\)/account app/\(customer\)/cart app/\(customer\)/checkout
mkdir -p app/\(vendor\)/vendor app/\(admin\)/admin
mkdir -p components/ui components/aceternity components/layout
mkdir -p lib hooks stores types public/images

# Step 4: Configure Environment (5 minutes)
# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local

# Step 5: Update TypeScript Config (5 minutes)
# Follow 01-FOUNDATION.md for tsconfig.json paths
```

**Status Check:** ✅ Project created, dependencies installed, folders ready

---

**Afternoon Session (1pm - 6pm): Design System ⭐**

**File: 02-DESIGN-SYSTEM.md (4-6 hours)**

```bash
# Step 1: Update Tailwind Config (30 min)
# Copy complete tailwind.config.ts from 02-DESIGN-SYSTEM.md
# Includes: Oud colors, fonts, shadows, gradients

npm install tailwindcss-animate

# Step 2: Initialize shadcn/ui (30 min)
npx shadcn-ui@latest init

# Step 3: Install shadcn Components (1 hour)
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add table
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
# ... (15-20 total components)

# Step 4: Add Aceternity Components (1 hour)
# Manually copy 5-7 components from ui.aceternity.com
# - GlareCard (featured products)
# - Spotlight (hero section)
# - Lens (image zoom)
# - AppleCarousel (product galleries)
# - BackgroundGradient (premium cards)

# Step 5: Create Custom Components (2-3 hours)
# Build these in components/ui/:
# - ProductCard.tsx (standard + featured variants)
# - ReviewCard.tsx
# - StatsCard.tsx
# - Badge variants (New, Sale, Trending, Low Stock)
# - Button variants (primary, secondary, whatsapp)
```

**Critical Checklist for Day 1:**
- [ ] Tailwind config has all Oud colors
- [ ] All 15-20 shadcn components installed
- [ ] 5-7 Aceternity components copied
- [ ] ProductCard component complete with hover animations
- [ ] ReviewCard component complete
- [ ] StatsCard component complete
- [ ] Button variants (primary, whatsapp) working

**Why This Matters:**
Once Day 1 is complete, you have:
✅ Complete component library
✅ All UI components ready to use
✅ Design system established
✅ Ready to build pages (Days 2-5)

---

### 📅 Day 2: Core Features & Public Pages (8 hours)

**Morning Session (9am - 12pm): Core Features**

**File: 03-CORE-FEATURES.md (3-4 hours)**

```typescript
// Step 1: Create TypeScript Types (1 hour)
// types/user.ts
// types/product.ts
// types/order.ts
// types/cart.ts
// types/review.ts
// types/common.ts

// Step 2: Create API Client (30 min)
// lib/api-client.ts
class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true, // ⭐ CRITICAL for cookies
    })
  }
}

// Step 3: Create Auth Store (30 min)
// stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(persist(
  (set) => ({
    user: null,
    login: async (email, password) => { /* ... */ },
    logout: async () => { /* ... */ },
  }),
  { name: 'auth-storage' }
))

// Step 4: Setup React Query (20 min)
// lib/query-client.ts
// components/providers/QueryProvider.tsx

// Step 5: Create Custom Hooks (1 hour)
// hooks/useAuth.ts
// hooks/useProducts.ts
// hooks/useCart.ts
// hooks/useWishlist.ts
// hooks/useOrders.ts

// Step 6: Create Middleware (30 min)
// middleware.ts - Route protection
```

**Critical Checklist:**
- [ ] All TypeScript types match backend Prisma schema
- [ ] API client configured with `withCredentials: true`
- [ ] Auth store working (login/logout)
- [ ] React Query provider in app layout
- [ ] All hooks created and typed

---

**Afternoon Session (1pm - 6pm): Public Pages**

**File: 04-PUBLIC-PAGES.md (6-8 hours - continue into evening if needed)**

```typescript
// Step 1: Create Header Component (1 hour)
// components/layout/Header.tsx
// - Logo, navigation, search, cart badge, user menu
// - Sticky on scroll
// - Mobile responsive

// Step 2: Create Footer Component (30 min)
// components/layout/Footer.tsx
// - Links, newsletter, social media

// Step 3: Create Homepage (2 hours)
// app/page.tsx
// - Hero section with Spotlight (Aceternity)
// - Categories grid (6 categories)
// - Featured products carousel
// - Stats banner
// - Brand showcase

// Step 4: Product Listing Page (2 hours)
// app/(customer)/products/page.tsx
// - Filters sidebar (category, brand, price, rating)
// - Product grid with ProductCard components
// - Pagination
// - Sort dropdown

// Step 5: Product Detail Page (2 hours)
// app/(customer)/products/[slug]/page.tsx
// - Image gallery with Lens zoom (Aceternity)
// - Product info, variants, price
// - Scent profile display
// - Add to cart/wishlist
// - Reviews section
// - Related products

// Step 6: Login/Register Pages (1 hour)
// app/(auth)/login/page.tsx
// app/(auth)/register/page.tsx
// - Forms with validation (React Hook Form + Zod)
// - Error handling
```

**Critical Checklist:**
- [ ] Header shows cart badge with item count
- [ ] Homepage hero uses Spotlight effect
- [ ] Product cards use ProductCard component
- [ ] Product detail has image zoom (Lens)
- [ ] Forms validate with Zod
- [ ] All pages responsive

---

### 📅 Day 3: Shopping Features (8 hours)

**File: 05-SHOPPING-FEATURES.md (6-8 hours)**

```typescript
// Step 1: Shopping Cart Page (2 hours)
// app/(customer)/cart/page.tsx
// - Cart items with quantity controls
// - Price breakdown (subtotal, shipping, tax, total)
// - Coins earned display
// - Empty cart state
// - Remove with animation (Framer Motion)

// Step 2: Multi-Step Checkout (3-4 hours)
// app/(customer)/checkout/page.tsx
// Step 1: Delivery Address
// Step 2: Delivery Method (Standard/Express)
// Step 3: Payment Method + Coins Redemption
// Step 4: Review & Confirm

// - Progress indicator (1/4, 2/4, 3/4, 4/4)
// - Address management (add new, select saved)
// - Coins slider (max 50% of subtotal)
// - Order summary sidebar

// Step 3: Wishlist Page (1 hour)
// app/(customer)/wishlist/page.tsx
// - Product grid with heart animation
// - Add to cart from wishlist
// - Remove with animation

// Step 4: Orders Page (1 hour)
// app/(customer)/orders/page.tsx
// - Order list with status badges
// - Order detail view
// - Track order button
// - Cancel order option

// Step 5: Account Dashboard (1 hour)
// app/(customer)/account/page.tsx
// - Profile info
// - Address management
// - Order history
// - Wallet/Coins balance
```

**Critical Checklist:**
- [ ] Cart updates in real-time
- [ ] Checkout validates each step
- [ ] Coins slider respects 50% max rule
- [ ] Order status badges match backend statuses
- [ ] Wishlist heart animates on toggle

---

### 📅 Day 4: Vendor Dashboard (8 hours)

**File: 06-VENDOR-DASHBOARD.md (6-8 hours)**

```typescript
// Step 1: Vendor Layout (1 hour)
// app/(vendor)/vendor/layout.tsx
// - Sidebar navigation (Dashboard, Products, Orders, Reviews)
// - Deep navy background
// - Vendor logo and business name
// - Logout button

// Step 2: Vendor Dashboard Home (1 hour)
// app/(vendor)/vendor/page.tsx
// - StatsCards (Sales, Products, Orders, Rating)
// - Recent orders table
// - Low stock alerts
// - Sales chart (optional)

// Step 3: Products Management (3-4 hours)
// app/(vendor)/vendor/products/page.tsx
// - Products table with image preview
// - Search and filters
// - Edit/Delete actions
// - Add Product button

// app/(vendor)/vendor/products/new/page.tsx
// - 4-step product creation form
// - Image upload with drag-and-drop
// - Variant management
// - Video upload
// - Scent profile inputs

// Step 4: Orders Management (2 hours)
// app/(vendor)/vendor/orders/page.tsx
// - Orders table with status filters
// - Status update buttons
// - Customer contact info
// - Order details view
```

**Critical Checklist:**
- [ ] Vendor sidebar navigation working
- [ ] StatsCards show correct data
- [ ] Product table sortable and searchable
- [ ] Image upload connects to Supabase
- [ ] Order status updates trigger backend API

---

### 📅 Day 5: Admin Dashboard (8 hours)

**File: 07-ADMIN-DASHBOARD.md (6-8 hours)**

```typescript
// Step 1: Admin Layout (1 hour)
// app/(admin)/admin/layout.tsx
// - Sidebar with admin navigation
// - Platform logo
// - Admin profile

// Step 2: Admin Dashboard Home (1 hour)
// app/(admin)/admin/page.tsx
// - Platform-wide StatsCards (Revenue, Users, Vendors, Products)
// - Recent activity feed
// - Pending approvals notification

// Step 3: User Management (1.5 hours)
// app/(admin)/admin/users/page.tsx
// - User table with search/filters
// - Suspend/Activate actions
// - Delete with confirmation
// - Role badges (Customer, Vendor, Admin)

// Step 4: Vendor Approval Workflow (2 hours)
// app/(admin)/admin/vendors/page.tsx
// - Vendor applications list
// - Status filters (Pending, Approved, Rejected, Suspended)
// - Review application details
// - Approve/Reject with reason

// app/(admin)/admin/vendors/[id]/review/page.tsx
// - Full application review page
// - Document viewer
// - Verification checklist
// - Approve/Reject buttons

// Step 5: Product Moderation (1.5 hours)
// app/(admin)/admin/products/page.tsx
// - All products table (all vendors)
// - Activate/Deactivate actions
// - Delete with warning

// Step 6: Review Moderation (1 hour)
// app/(admin)/admin/reviews/page.tsx
// - Flagged reviews list
// - Approve/Hide/Delete actions
// - View report reason
```

**Critical Checklist:**
- [ ] Admin dashboard shows platform stats
- [ ] Vendor approval workflow complete
- [ ] User suspend/activate working
- [ ] Product moderation functional
- [ ] Review moderation working

---

### 📅 Day 6: Premium Enhancements (Optional, 6 hours)

**File: 08-ENHANCEMENTS.md (4-6 hours)**

```typescript
// Step 1: Quick View Modal (1.5 hours)
// components/features/QuickViewModal.tsx
// - Product preview without leaving page
// - Image gallery
// - Add to cart from modal
// - Smooth animations

// Step 2: Buy Now Flow (1.5 hours)
// app/(customer)/checkout/quick/[productId]/page.tsx
// - Express checkout (skip cart)
// - Simplified 2-step process
// - Quick purchase

// Step 3: Scent Pyramid Visualization (1 hour)
// components/features/ScentPyramid.tsx
// - SVG-based pyramid
// - Interactive top/heart/base notes
// - Gradient fills
// - Hover effects

// Step 4: WhatsApp Integration (30 min)
// components/features/WhatsAppButton.tsx
// - Pre-filled messages
// - Product-specific templates
// - Floating button option

// Step 5: Social Proof Badges (30 min)
// components/features/SocialProofBadge.tsx
// - Live purchase notifications
// - "X people viewing" counter
// - "Only Y left" alerts

// Step 6: Advanced Micro-interactions (1 hour)
// components/animations/
// - HeartAnimation.tsx (wishlist)
// - CartShake.tsx (add to cart)
// - CoinSpin.tsx (coins earned)
// - ParticleEffect.tsx (celebrations)
```

**Critical Checklist:**
- [ ] Quick view opens smoothly
- [ ] Buy now bypasses cart correctly
- [ ] Scent pyramid renders beautifully
- [ ] WhatsApp button pre-fills message
- [ ] Social proof notifications appear
- [ ] All animations smooth (60fps)

---

## 4. Critical Success Factors

### ⭐ File 02 (DESIGN-SYSTEM) is the Foundation

**Why File 02 is Critical:**

1. **All Components Defined Here:**
   - ProductCard, ReviewCard, StatsCard
   - Button, Input, Select, Dialog, etc.
   - Badge variants (New, Sale, Trending)
   - All shadcn/ui components

2. **Import Pattern:**
   ```typescript
   // In ALL files 04-08, you'll see:
   import { ProductCard, Button, Card } from '@/components/ui'

   // If 02-DESIGN-SYSTEM is incomplete:
   // ❌ ERROR: Cannot find module '@/components/ui/product-card'
   ```

3. **Tailwind Configuration:**
   - Oud gold colors (#C9A86A)
   - Custom fonts (Playfair Display)
   - Shadow utilities
   - Gradient classes
   - Without these, pages won't look right

**Completion Checklist for File 02:**
```
✅ tailwind.config.ts updated with:
   - All Oud colors (oud-gold, deep-navy, etc.)
   - Font families (Playfair Display, Inter)
   - Shadow utilities (shadow-card, shadow-oud)
   - Gradient utilities (gradient-gold, gradient-badge-*)

✅ shadcn/ui installed and configured:
   - Button component ✓
   - Card component ✓
   - Input, Select, Textarea ✓
   - Dialog, Modal ✓
   - Table ✓
   - Badge ✓
   - Tabs ✓
   - (15-20 total components)

✅ Aceternity components copied:
   - GlareCard ✓ (for featured products)
   - Spotlight ✓ (for hero section)
   - Lens ✓ (for product zoom)
   - AppleCarousel ✓ (for galleries)
   - BackgroundGradient ✓

✅ Custom components created:
   - ProductCard.tsx ✓
     - Standard variant
     - Featured variant (with GlareCard)
     - Hover animations (lift up, shadow)
     - Badges (New, Sale, Trending)
     - Wishlist heart icon
     - Coins display

   - ReviewCard.tsx ✓
     - Star rating display
     - User info
     - Review text
     - Images gallery
     - Helpful/Not helpful voting
     - Vendor reply section

   - StatsCard.tsx ✓
     - Icon with colored background
     - Value display (large)
     - Subtitle
     - Trend indicator (↑ ↓)

✅ Button variants working:
   - Primary (gradient gold)
   - Secondary (outline)
   - WhatsApp (green)
   - Ghost, Destructive
```

**Test File 02 Completion:**
```typescript
// Create test page: app/test-components/page.tsx

import { ProductCard, ReviewCard, StatsCard, Button } from '@/components/ui'

export default function TestPage() {
  const testProduct = {
    id: '1',
    name: 'Test Oud',
    price: 350,
    images: [{ url: '/test.jpg' }],
    rating: 4.5,
    reviewCount: 120,
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-heading">Component Test</h1>

      {/* Test ProductCard */}
      <ProductCard product={testProduct} />

      {/* Test Buttons */}
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="whatsapp">WhatsApp</Button>
      </div>

      {/* Test StatsCard */}
      <StatsCard
        title="Total Sales"
        value="AED 15,750"
        trend={{ value: 23, label: 'vs last month' }}
      />
    </div>
  )
}
```

**Run Test:**
```bash
npm run dev
# Visit http://localhost:3000/test-components
# All components should render without errors
```

If test passes → File 02 is complete ✅
If errors → Fix File 02 before proceeding

---

### ⭐ File 03 (CORE-FEATURES) Enables Data Flow

**Why File 03 is Critical:**

1. **API Integration:**
   - All pages need `apiClient` to fetch data
   - Without it, pages are static shells

2. **Authentication:**
   - Login/logout functionality
   - Protected routes (vendor, admin)
   - User context

3. **Type Safety:**
   - TypeScript types for all entities
   - IntelliSense in VSCode
   - Compile-time error checking

**Completion Checklist for File 03:**
```
✅ TypeScript types created:
   - types/user.ts (User, Vendor, Wallet)
   - types/product.ts (Product, Category, Brand)
   - types/order.ts (Order, OrderItem)
   - types/cart.ts (Cart, CartItem, CartSummary)
   - types/review.ts (Review, ReviewImage)
   - types/common.ts (PaginatedResponse, ApiResponse)

✅ API client configured:
   - lib/api-client.ts created
   - baseURL from env variable
   - withCredentials: true (for cookies)
   - Error interceptor (401 → redirect /login)
   - Methods: get, post, put, patch, delete

✅ Auth store working:
   - stores/authStore.ts created
   - Zustand with persist middleware
   - login(), logout(), fetchUser()
   - User state synced

✅ React Query setup:
   - lib/query-client.ts created
   - QueryProvider in app/layout.tsx
   - staleTime, cacheTime configured

✅ Custom hooks created:
   - hooks/useAuth.ts ✓
   - hooks/useProducts.ts ✓
   - hooks/useCart.ts ✓
   - hooks/useWishlist.ts ✓
   - hooks/useOrders.ts ✓
   - hooks/useWallet.ts ✓

✅ Middleware configured:
   - middleware.ts created
   - Route protection by role
   - Cookie validation
   - Redirect logic
```

**Test File 03 Completion:**
```typescript
// Test API client
import { apiClient } from '@/lib/api-client'

async function testAPI() {
  try {
    const products = await apiClient.get('/products')
    console.log('✅ API working:', products)
  } catch (error) {
    console.error('❌ API error:', error)
  }
}

// Test auth store
import { useAuthStore } from '@/stores/authStore'

const { login, user } = useAuthStore()
console.log('✅ Auth store:', { login, user })

// Test hooks
import { useProducts } from '@/hooks/useProducts'

function TestComponent() {
  const { data, isLoading } = useProducts()
  return <div>Products: {data?.length}</div>
}
```

If tests pass → File 03 is complete ✅

---

## 5. Component Architecture

### 🏗️ Component Hierarchy

```
app/page.tsx (Homepage)
    ↓
components/layout/Header.tsx
    ↓ imports
components/ui/Button.tsx (from shadcn)
components/ui/Badge.tsx (from shadcn)
    ↓
app/products/page.tsx
    ↓ imports
components/ui/ProductCard.tsx (custom)
    ↓ uses
components/ui/Card.tsx (from shadcn)
components/ui/Badge.tsx (from shadcn)
components/aceternity/GlareCard.tsx (if featured)
    ↓
app/products/[slug]/page.tsx
    ↓ imports
components/aceternity/Lens.tsx (image zoom)
components/features/ScentPyramid.tsx (custom)
components/ui/ReviewCard.tsx (custom)
```

### 📦 Component Categories

**1. shadcn/ui Base Components** (from File 02)
```
components/ui/
├── button.tsx          ← shadcn CLI installed
├── card.tsx            ← shadcn CLI installed
├── input.tsx           ← shadcn CLI installed
├── select.tsx          ← shadcn CLI installed
├── dialog.tsx          ← shadcn CLI installed
├── table.tsx           ← shadcn CLI installed
└── ... (15-20 total)
```

**2. Aceternity Premium Components** (from File 02)
```
components/aceternity/
├── glare-card.tsx      ← Manually copied
├── spotlight.tsx       ← Manually copied
├── lens.tsx            ← Manually copied
├── apple-carousel.tsx  ← Manually copied
└── background-gradient.tsx ← Manually copied
```

**3. Custom Business Components** (from File 02)
```
components/ui/
├── product-card.tsx    ← Built by you
├── review-card.tsx     ← Built by you
├── stats-card.tsx      ← Built by you
└── badge-variants.tsx  ← Built by you
```

**4. Layout Components** (from Files 04-07)
```
components/layout/
├── Header.tsx          ← File 04
├── Footer.tsx          ← File 04
├── VendorSidebar.tsx   ← File 06
└── AdminSidebar.tsx    ← File 07
```

**5. Feature Components** (from File 08)
```
components/features/
├── QuickViewModal.tsx
├── ScentPyramid.tsx
├── WhatsAppButton.tsx
└── SocialProofBadge.tsx
```

---

## 6. Import Patterns & Conventions

### Standard Import Order

**Every page file should follow this order:**

```typescript
// 1. React & Next.js
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// 2. shadcn/ui base components
import { Button, Card, Input, Select, Dialog } from '@/components/ui'

// 3. Custom business components
import { ProductCard, ReviewCard, StatsCard } from '@/components/ui'

// 4. Aceternity components (selective)
import { GlareCard } from '@/components/aceternity/glare-card'
import { Spotlight } from '@/components/aceternity/spotlight'

// 5. Feature components
import { ScentPyramid } from '@/components/features/scent-pyramid'
import { WhatsAppButton } from '@/components/features/whatsapp-button'

// 6. Hooks & API
import { useAuth, useProducts, useCart } from '@/hooks'
import { apiClient } from '@/lib/api-client'

// 7. Types
import type { Product, User, Order } from '@/types'

// 8. Utils & Constants
import { formatCurrency, formatDate } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

// 9. Framer Motion
import { motion, AnimatePresence } from 'framer-motion'

// 10. Icons
import { ShoppingCart, Heart, Star, Search } from 'lucide-react'
```

### Component Usage Examples

**Using ProductCard:**
```typescript
import { ProductCard } from '@/components/ui/product-card'

// Standard product
<ProductCard
  product={product}
  onQuickView={() => setQuickViewOpen(true)}
/>

// Featured product with glare effect
<ProductCard
  product={signatureProduct}
  featured={true}
/>
```

**Using Button Variants:**
```typescript
import { Button } from '@/components/ui/button'

<Button variant="primary">Add to Cart</Button>
<Button variant="secondary">Add to Wishlist</Button>
<Button variant="whatsapp">Contact Vendor</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="destructive">Delete</Button>
```

**Using Hooks:**
```typescript
import { useProducts, useCart, useAuth } from '@/hooks'

function ProductsPage() {
  const { data: products, isLoading } = useProducts({
    category: 'oud',
    minPrice: 100,
    maxPrice: 500
  })

  const { addToCart } = useCart()
  const { user, isAuthenticated } = useAuth()

  // ...
}
```

---

## 7. Testing Strategy

### Manual Testing Checklist

**After Each Day:**

**Day 1 Tests:**
```
✓ Design System
  - [ ] All colors render correctly (Oud gold #C9A86A)
  - [ ] Fonts load (Playfair Display headings)
  - [ ] ProductCard displays with image
  - [ ] ProductCard hovers and lifts up
  - [ ] Buttons have correct variants
  - [ ] Badges show gradients
```

**Day 2 Tests:**
```
✓ Core Features
  - [ ] Login form works (test with backend)
  - [ ] Cookie is set after login
  - [ ] Protected routes redirect if not logged in
  - [ ] useProducts hook fetches data
  - [ ] useCart hook updates cart count

✓ Public Pages
  - [ ] Homepage loads without errors
  - [ ] Hero Spotlight effect works
  - [ ] Product listing shows products
  - [ ] Filters update product list
  - [ ] Product detail loads correctly
  - [ ] Image zoom (Lens) works
```

**Day 3 Tests:**
```
✓ Shopping Features
  - [ ] Add to cart updates badge
  - [ ] Cart page shows items
  - [ ] Quantity +/- buttons work
  - [ ] Cart summary calculates correctly
  - [ ] Checkout Step 1: Address saves
  - [ ] Checkout Step 2: Delivery selects
  - [ ] Checkout Step 3: Coins slider works
  - [ ] Checkout Step 4: Order places
  - [ ] Wishlist heart animates
```

**Day 4 Tests:**
```
✓ Vendor Dashboard
  - [ ] Vendor can login
  - [ ] Dashboard shows stats
  - [ ] Products table loads
  - [ ] Add Product form works
  - [ ] Image upload to Supabase succeeds
  - [ ] Order status updates
```

**Day 5 Tests:**
```
✓ Admin Dashboard
  - [ ] Admin can login
  - [ ] Platform stats show
  - [ ] User suspend/activate works
  - [ ] Vendor approval workflow works
  - [ ] Product moderation works
```

**Day 6 Tests:**
```
✓ Enhancements
  - [ ] Quick view modal opens
  - [ ] Buy now bypasses cart
  - [ ] Scent pyramid renders
  - [ ] WhatsApp button opens chat
  - [ ] Social proof badges appear
```

### Integration Testing

**Test Complete User Flow:**
```
1. Guest browses products
2. Clicks product → Views detail
3. Clicks Add to Cart → Redirected to login
4. Registers new account
5. Adds product to cart
6. Proceeds to checkout
7. Completes all 4 steps
8. Places order
9. Receives confirmation
10. Views order in account
```

**Expected Result:**
- Order appears in customer's account
- Order appears in vendor's dashboard
- Order appears in admin's overview
- Coins added to wallet (pending)

---

## 8. Deployment Checklist

### Pre-Deployment

```bash
# 1. Build test
npm run build
# Should complete without errors

# 2. Type check
npx tsc --noEmit
# Should have 0 errors

# 3. Lint check
npm run lint
# Fix all warnings

# 4. Environment variables
# Ensure production .env has:
NEXT_PUBLIC_API_URL=https://api.aromasouq.com/api
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 5. Test production build locally
npm run build
npm run start
# Visit http://localhost:3000
```

### Deployment Steps

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables in Vercel dashboard
# https://vercel.com/your-project/settings/environment-variables
```

**Option 2: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Post-Deployment Tests

```
✓ Homepage loads
✓ Products load from API
✓ Login works
✓ Cart updates
✓ Checkout completes
✓ Images load from Supabase
✓ All fonts load (Playfair Display)
✓ Animations smooth
✓ Mobile responsive
✓ No console errors
```

---

## Summary: How to Start

### 🚀 Quick Start (RIGHT NOW)

1. **Read 00-IMPLEMENTATION-GUIDE.md** (10 minutes)
   - Understand file structure
   - Note dependency chain

2. **Follow 01-FOUNDATION.md** (30 minutes)
   - Create Next.js project
   - Install dependencies
   - Create folder structure

3. **Complete 02-DESIGN-SYSTEM.md** (4-6 hours)
   - ⭐ MOST CRITICAL FILE
   - Install all components
   - Test ProductCard renders

4. **Complete 03-CORE-FEATURES.md** (3-4 hours)
   - Setup API integration
   - Create hooks
   - Test login works

5. **Continue with 04-08** (in order)
   - Build pages using components from File 02
   - Use hooks from File 03

### 📝 Implementation Checklist

```
Day 1:
  [ ] 01-FOUNDATION complete (30 min)
  [ ] 02-DESIGN-SYSTEM complete (4-6 hours) ⭐
  [ ] 03-CORE-FEATURES complete (3-4 hours)

Day 2:
  [ ] 04-PUBLIC-PAGES complete (6-8 hours)

Day 3:
  [ ] 05-SHOPPING-FEATURES complete (6-8 hours)

Day 4:
  [ ] 06-VENDOR-DASHBOARD complete (6-8 hours)

Day 5:
  [ ] 07-ADMIN-DASHBOARD complete (6-8 hours)

Day 6 (Optional):
  [ ] 08-ENHANCEMENTS complete (4-6 hours)

Final:
  [ ] Build succeeds
  [ ] All tests pass
  [ ] Deployed to production
```

---

**Total Time:** 32-42 hours (6 days)

**Ready to start?**
→ Open `frontend/01-FOUNDATION.md` and begin! 🚀

---

**For Questions:**
- Refer back to `00-IMPLEMENTATION-GUIDE.md`
- Check compatibility report: `COMPATIBILITY-ANALYSIS-REPORT.md`
- Review backend API: `backend/PHASE-*.md`
- Check specification: `AROMASOUQ-MVP-V2-SPECIFICATION.md`
