# AromaSouq Frontend - Implementation Guide

**Version:** 2.0
**Date:** January 2025
**Status:** Production Ready
**Estimated Total Time:** 32-42 hours

---

## 📋 Quick Navigation

| File | Purpose | Time | Status |
|------|---------|------|--------|
| [01-FOUNDATION](#file-01) | Project setup & configuration | 30 min | Required |
| [02-DESIGN-SYSTEM](#file-02) | ⭐ Component library & styling | 4-6 hrs | **CRITICAL** |
| [03-CORE-FEATURES](#file-03) | Backend integration & state | 3-4 hrs | Required |
| [04-PUBLIC-PAGES](#file-04) | Customer-facing pages | 6-8 hrs | Required |
| [05-SHOPPING-FEATURES](#file-05) | Cart, checkout, orders | 6-8 hrs | Required |
| [06-VENDOR-DASHBOARD](#file-06) | Vendor management | 6-8 hrs | Required |
| [07-ADMIN-DASHBOARD](#file-07) | Admin panel | 6-8 hrs | Required |
| [08-ENHANCEMENTS](#file-08) | Wow factors & polish | 4-6 hrs | Optional |

---

## 🎯 Implementation Strategy

### Phase 1: Foundation (Day 1)
```
01-FOUNDATION.md     → 30 minutes
02-DESIGN-SYSTEM.md  → 4-6 hours (MOST IMPORTANT)
03-CORE-FEATURES.md  → 3-4 hours
```

**Outcome:** Design system ready, components built, backend integrated.

### Phase 2: Customer Features (Days 2-3)
```
04-PUBLIC-PAGES.md      → 6-8 hours
05-SHOPPING-FEATURES.md → 6-8 hours
```

**Outcome:** Customer-facing marketplace fully functional.

### Phase 3: Dashboards (Days 4-5)
```
06-VENDOR-DASHBOARD.md → 6-8 hours
07-ADMIN-DASHBOARD.md  → 6-8 hours
```

**Outcome:** Vendor and admin portals complete.

### Phase 4: Polish (Day 6, Optional)
```
08-ENHANCEMENTS.md → 4-6 hours
```

**Outcome:** Premium features and wow factors added.

---

## 🔗 Dependency Chain

```
01-FOUNDATION
    ↓
02-DESIGN-SYSTEM ← ⭐ EVERYTHING IMPORTS FROM HERE
    ↓
03-CORE-FEATURES
    ↓
04-PUBLIC-PAGES ──┐
05-SHOPPING-FEATURES ─┤→ All import from 02-DESIGN-SYSTEM
06-VENDOR-DASHBOARD ──┤
07-ADMIN-DASHBOARD ───┤
08-ENHANCEMENTS ──────┘
```

**CRITICAL:** File 02 (DESIGN-SYSTEM) must be completed first. All other files import components from it.

---

## 📁 File Descriptions

### <a name="file-01"></a>01-FOUNDATION.md
**Purpose:** Set up Next.js project with TypeScript, Tailwind, and folder structure.

**Contains:**
- Next.js 14+ installation
- TypeScript configuration
- Path aliases (@/components, @/lib, etc.)
- Environment variables setup
- Folder structure creation

**Imports:** None
**Exports:** Project scaffold

---

### <a name="file-02"></a>02-DESIGN-SYSTEM.md ⭐ CRITICAL
**Purpose:** Build the complete component library and design system.

**Contains:**
- Tailwind config (Oud gold colors, luxury fonts, shadows, gradients)
- shadcn/ui setup (15-20 base components)
- Aceternity components (5-7 cherry-picked for luxury)
- Custom components:
  - ProductCard (standard + featured variants)
  - ReviewCard
  - StatsCard
  - Badge components (New, Sale, Trending, Low Stock)
  - Button variants (Primary, Secondary, WhatsApp)
  - Form components (Input, Select, Textarea)
  - Navigation components
- Framer Motion animation patterns
- Global CSS and utilities

**Imports:** shadcn/ui, Aceternity (copy-paste)
**Exports:** Complete component library

**Why Critical:** All files 04-08 import components from here. Build this first!

---

### <a name="file-03"></a>03-CORE-FEATURES.md
**Purpose:** Backend integration, types, auth, and state management.

**Contains:**
- API client (axios with cookies)
- TypeScript types (synced with backend)
- Auth store (Zustand + persistence)
- React Query setup
- Form validation (React Hook Form + Zod)
- Route protection middleware

**Imports:** 02-DESIGN-SYSTEM (for UI components in auth forms)
**Exports:** API services, types, hooks, stores

---

### <a name="file-04"></a>04-PUBLIC-PAGES.md
**Purpose:** Customer-facing pages (homepage, products, login).

**Contains:**
- Homepage with hero, featured products, categories
- Header & Footer
- Product listing with filters
- Product detail page
- Login/Register pages
- Search functionality

**Imports:** 02-DESIGN-SYSTEM, 03-CORE-FEATURES
**Exports:** Public pages

---

### <a name="file-05"></a>05-SHOPPING-FEATURES.md
**Purpose:** Shopping flow and user account features.

**Contains:**
- Shopping cart
- Wishlist
- Multi-step checkout
- Order management
- Account dashboard
- Reviews system
- Wallet & Coins

**Imports:** 02-DESIGN-SYSTEM, 03-CORE-FEATURES
**Exports:** Shopping and account pages

---

### <a name="file-06"></a>06-VENDOR-DASHBOARD.md
**Purpose:** Vendor management portal.

**Contains:**
- Vendor layout with sidebar
- Dashboard home with stats
- Products management (CRUD)
- Orders management
- Reviews management
- Brand profile settings

**Imports:** 02-DESIGN-SYSTEM, 03-CORE-FEATURES
**Exports:** Vendor pages

---

### <a name="file-07"></a>07-ADMIN-DASHBOARD.md
**Purpose:** Admin control panel.

**Contains:**
- Admin layout
- Dashboard home with analytics
- User management
- Vendor approval workflow
- Product moderation
- Review moderation
- Platform settings

**Imports:** 02-DESIGN-SYSTEM, 03-CORE-FEATURES
**Exports:** Admin pages

---

### <a name="file-08"></a>08-ENHANCEMENTS.md
**Purpose:** Premium features and wow factors (optional for MVP).

**Contains:**
- Quick view modal
- Buy now flow (skip cart)
- Scent pyramid visualization
- Advanced micro-interactions
- WhatsApp message templates
- Social proof badges (live data)
- Performance optimizations

**Imports:** 02-DESIGN-SYSTEM, 03-CORE-FEATURES
**Exports:** Enhanced components and features

---

## 💡 Import Convention

All files follow this import pattern:

```tsx
// 1. shadcn/ui base components
import { Button, Card, Input, Select, Dialog } from '@/components/ui'

// 2. Custom business components
import { ProductCard, ReviewCard, StatsCard } from '@/components/ui'

// 3. Aceternity (selective use for premium features)
import { GlareCard } from '@/components/aceternity/glare-card'
import { AppleCarousel } from '@/components/aceternity/apple-carousel'

// 4. Core features (API, types, hooks)
import { useAuth, useProducts } from '@/hooks'
import { apiClient } from '@/lib/api-client'
import type { Product, User } from '@/types'

// 5. Framer Motion
import { motion } from 'framer-motion'
```

---

## 🎨 Component Usage Patterns

### Standard Product Card
```tsx
import { ProductCard } from '@/components/ui/product-card'

<ProductCard
  product={product}
  onQuickView={() => setQuickView(true)}
/>
```

### Featured Product (with Aceternity glare effect)
```tsx
import { ProductCard } from '@/components/ui/product-card'

<ProductCard
  product={signatureOud}
  featured
/>
```

### Button Variants
```tsx
import { Button } from '@/components/ui/button'

<Button variant="primary">Add to Cart</Button>
<Button variant="secondary">Add to Wishlist</Button>
<Button variant="whatsapp">Contact Vendor</Button>
<Button variant="ghost">Cancel</Button>
```

---

## ⚙️ Configuration Files

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Tailwind Config (defined in 02-DESIGN-SYSTEM.md)
- Custom colors (Oud gold, deep navy, etc.)
- Custom fonts (Playfair Display, Inter, Cairo)
- Custom shadows, gradients, spacing

### TypeScript Config (defined in 01-FOUNDATION.md)
- Path aliases
- Strict mode
- Import conventions

---

## ✅ Quality Checklist

Before considering implementation complete:

### Functionality
- [ ] All pages render without errors
- [ ] API integration working (login, products, cart, orders)
- [ ] Forms validate correctly
- [ ] Authentication flow works (login → protected routes)
- [ ] File uploads working (images, videos)

### Design System
- [ ] All components use design tokens (colors, fonts, spacing)
- [ ] Consistent styling across all pages
- [ ] Responsive on mobile, tablet, desktop
- [ ] Animations smooth and purposeful
- [ ] Accessibility: keyboard navigation, screen readers

### Performance
- [ ] Pages load in < 2 seconds
- [ ] Images optimized (next/image)
- [ ] Code splitting implemented
- [ ] React Query caching configured

### Business Logic
- [ ] Cart calculations correct (subtotal, tax, shipping, coins)
- [ ] Coins system working (earn, redeem)
- [ ] Order status workflow functional
- [ ] Review system complete (vote, reply, images)

---

## 🚀 Quick Start

### For Developers
1. Read this guide
2. Follow files 01-07 in order
3. File 08 is optional (polish)
4. Import components from 02-DESIGN-SYSTEM
5. Follow import conventions

### For Claude Code (Autonomous Development)
```
Execute files in this exact order:
01 → 02 → 03 → 04 → 05 → 06 → 07 → (08)

Critical: Complete file 02 (DESIGN-SYSTEM) before starting file 04.
All subsequent files import components from 02.
```

---

## 📞 Support

If you encounter issues:
1. Check dependency chain (is 02-DESIGN-SYSTEM complete?)
2. Verify imports are correct (following convention above)
3. Check environment variables are set
4. Verify backend is running at NEXT_PUBLIC_API_URL

---

## 🎯 Success Criteria

After implementing files 01-07:
- ✅ Fully functional e-commerce platform
- ✅ Beautiful luxury aesthetic (Oud gold theme)
- ✅ All features from specification implemented
- ✅ Responsive design
- ✅ Production-ready code

After adding file 08:
- ✅ Premium "wow factor" features
- ✅ Advanced micro-interactions
- ✅ Best-in-class user experience

---

## 📚 Reference

- **Backend API:** See `backend/PHASE-*.md` files
- **Design Spec:** See `AROMASOUQ-MVP-V2-SPECIFICATION.md`
- **shadcn/ui:** https://ui.shadcn.com/
- **Aceternity UI:** https://ui.aceternity.com/
- **Framer Motion:** https://www.framer.com/motion/

---

**Ready to build?** Start with `01-FOUNDATION.md` 🚀
