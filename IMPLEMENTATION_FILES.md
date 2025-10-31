# Implementation Files Reference

This document lists ALL files that have been created or need to be created for the 4 HIGH priority features.

## ✅ Completed Files

### Database
- ✅ `aromasouq-api/prisma/schema.prisma` - Added slug to Vendor, Coupon model, DiscountType enum

### Coupon DTOs
- ✅ `aromasouq-api/src/coupons/dto/create-coupon.dto.ts`
- ✅ `aromasouq-api/src/coupons/dto/update-coupon.dto.ts`
- ✅ `aromasouq-api/src/coupons/dto/validate-coupon.dto.ts`
- ✅ `aromasouq-api/src/coupons/dto/index.ts`

## 📝 Files to Create

### Backend - Coupons Module

**aromasouq-api/src/coupons/coupons.service.ts**
```typescript
// Full coupon service with create, findAll, findOne, update, remove, validate methods
// ~ 250 lines
```

**aromasouq-api/src/coupons/coupons.controller.ts**
```typescript
// Controller with all CRUD endpoints + validate endpoint
// ~ 80 lines
```

**aromasouq-api/src/coupons/coupons.module.ts**
```typescript
// Module registration
// ~ 15 lines
```

### Backend - Product Variants

**aromasouq-api/src/products/dto/create-variant.dto.ts**
```typescript
export class CreateVariantDto {
  name: string;
  nameAr?: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
  compareAtPrice?: number;
}
```

**aromasouq-api/src/products/dto/update-variant.dto.ts**
```typescript
export class UpdateVariantDto extends PartialType(CreateVariantDto) {
  isActive?: boolean;
}
```

**aromasouq-api/src/products/products.service.ts** - ADD METHODS:
```typescript
async createVariant(userId, userRole, productId, dto) { ... }
async getVariants(productId) { ... }
async updateVariant(userId, userRole, variantId, dto) { ... }
async deleteVariant(userId, userRole, variantId) { ... }
```

**aromasouq-api/src/products/products.controller.ts** - ADD ENDPOINTS:
```typescript
@Post(':id/variants')
@Get(':id/variants')
@Patch('variants/:id')
@Delete('variants/:id')
```

### Backend - Vendor Public Profile & Uploads

**aromasouq-api/src/vendor/vendor.service.ts** - ADD METHODS:
```typescript
async getPublicProfile(slug: string) { ... }
async getSalesAnalytics(userId, params) { ... }
async getRevenueBreakdown(userId) { ... }
async exportSalesReport(userId, params) { ... }
```

**aromasouq-api/src/vendor/vendor.controller.ts** - ADD ENDPOINTS:
```typescript
@Get('public/:slug')
@Get('analytics/sales')
@Get('analytics/revenue')
@Get('analytics/export')
```

**aromasouq-api/src/uploads/uploads.service.ts** - ADD METHODS:
```typescript
async uploadVendorLogo(vendorId, file) { ... }
async uploadVendorBanner(vendorId, file) { ... }
```

**aromasouq-api/src/uploads/uploads.controller.ts** - ADD ENDPOINTS:
```typescript
@Post('vendor/logo')
@Post('vendor/banner')
```

### Backend - Module Registration

**aromasouq-api/src/app.module.ts** - UPDATE:
```typescript
imports: [
  // ... existing
  CouponsModule,  // ADD THIS
],
```

### Frontend - Coupon Types & API

**aromasouq-web/src/types/coupon.ts**
```typescript
export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export interface Coupon { ... }
export interface CreateCouponRequest { ... }
export interface ValidateCouponRequest { ... }
export interface ValidateCouponResponse { ... }
```

**aromasouq-web/src/lib/api/coupons.ts**
```typescript
export const couponsApi = {
  getAll,
  getById,
  create,
  update,
  delete,
  validate,
}
```

**aromasouq-web/src/hooks/useCoupons.ts**
```typescript
export function useCoupons() { ... }
export function useCoupon(id) { ... }
export function useCreateCoupon() { ... }
export function useUpdateCoupon() { ... }
export function useDeleteCoupon() { ... }
export function useValidateCoupon() { ... }
```

### Frontend - Coupon Pages

**aromasouq-web/src/app/vendor/coupons/page.tsx**
```typescript
// Coupons list page with cards, status badges, copy functionality
// ~ 150 lines
```

**aromasouq-web/src/app/vendor/coupons/new/page.tsx**
```typescript
// Create coupon form with validation
// ~ 250 lines
```

**aromasouq-web/src/app/vendor/coupons/[id]/edit/page.tsx**
```typescript
// Edit coupon form (reuses create form logic)
// ~ 100 lines
```

### Frontend - Product Variant UI

**aromasouq-web/src/components/vendor/ProductVariantManager.tsx**
```typescript
// Component for managing variants in product form
// Add/remove variants, edit inline
// ~ 200 lines
```

**aromasouq-web/src/app/vendor/products/new/page.tsx** - UPDATE:
```typescript
// Add <ProductVariantManager> component
// Handle variant submission
```

### Frontend - Vendor Public Page

**aromasouq-web/src/app/vendors/[slug]/page.tsx**
```typescript
// Public vendor storefront page
// Banner, logo, brand story, products grid
// ~ 200 lines
```

**aromasouq-web/src/lib/api/vendor.ts** - ADD:
```typescript
export const vendorApi = {
  ...existing,
  getPublicProfile: (slug) => ...,
}
```

### Frontend - Vendor Settings Logo/Banner Upload

**aromasouq-web/src/app/vendor/settings/page.tsx** - UPDATE:
```typescript
// Add file input for logo
// Add file input for banner
// Add slug input field
// Add upload handlers
```

### Frontend - Analytics Components

**aromasouq-web/src/components/vendor/analytics/SalesChart.tsx**
```typescript
import { LineChart, Line, XAxis, YAxis, ... } from 'recharts'
// Sales trend line chart
// ~ 50 lines
```

**aromasouq-web/src/components/vendor/analytics/RevenueBreakdown.tsx**
```typescript
import { BarChart, Bar, ... } from 'recharts'
// Revenue breakdown bar charts with tabs
// ~ 80 lines
```

**aromasouq-web/src/app/vendor/page.tsx** - UPDATE:
```typescript
// Import chart components
// Add date range picker
// Add Export CSV button
// Fetch analytics data
// ~ 100 lines added
```

**aromasouq-web/package.json** - ADD DEPENDENCIES:
```bash
npm install recharts date-fns
```

### Frontend - Vendor Navigation

**aromasouq-web/src/app/vendor/layout.tsx** - UPDATE:
```typescript
// Add "Coupons" link to sidebar navigation
```

---

## File Creation Priority

### Priority 1 (Core Backend - Must Create First)
1. ✅ Coupon DTOs
2. ⏳ `aromasouq-api/src/coupons/coupons.service.ts` (IN PROGRESS)
3. `aromasouq-api/src/coupons/coupons.controller.ts`
4. `aromasouq-api/src/coupons/coupons.module.ts`
5. Update `aromasouq-api/src/app.module.ts`

### Priority 2 (Variant Backend)
6. `aromasouq-api/src/products/dto/create-variant.dto.ts`
7. `aromasouq-api/src/products/dto/update-variant.dto.ts`
8. Update `aromasouq-api/src/products/products.service.ts`
9. Update `aromasouq-api/src/products/products.controller.ts`

### Priority 3 (Vendor Backend)
10. Update `aromasouq-api/src/vendor/vendor.service.ts`
11. Update `aromasouq-api/src/vendor/vendor.controller.ts`
12. Update `aromasouq-api/src/uploads/uploads.service.ts`
13. Update `aromasouq-api/src/uploads/uploads.controller.ts`

### Priority 4 (Frontend Coupon)
14. `aromasouq-web/src/types/coupon.ts`
15. `aromasouq-web/src/lib/api/coupons.ts`
16. `aromasouq-web/src/hooks/useCoupons.ts`
17. `aromasouq-web/src/app/vendor/coupons/page.tsx`
18. `aromasouq-web/src/app/vendor/coupons/new/page.tsx`

### Priority 5 (Frontend Other)
19. `aromasouq-web/src/app/vendors/[slug]/page.tsx`
20. Update `aromasouq-web/src/app/vendor/settings/page.tsx`
21. Install recharts: `npm install recharts date-fns`
22. `aromasouq-web/src/components/vendor/analytics/SalesChart.tsx`
23. `aromasouq-web/src/components/vendor/analytics/RevenueBreakdown.tsx`
24. Update `aromasouq-web/src/app/vendor/page.tsx`

---

## Quick Start Commands

```bash
# Terminal 1 - Backend
cd aromasouq-api
pnpm run start:dev

# Terminal 2 - Frontend
cd aromasouq-web
npm run dev

# After all backend files created, verify with:
curl http://localhost:3001/coupons  # Should return 401 Unauthorized (auth required)

# After frontend files created, test in browser:
# Login as vendor -> /vendor/coupons
```

---

## Completion Checklist

### Backend
- [ ] Coupon CRUD working
- [ ] Coupon validation working
- [ ] Variant CRUD working
- [ ] Vendor public profile endpoint
- [ ] Vendor analytics endpoints
- [ ] Logo/banner upload endpoints

### Frontend
- [ ] Coupon list page
- [ ] Coupon create/edit forms
- [ ] Coupon validation in checkout
- [ ] Variant management in product form
- [ ] Public vendor page
- [ ] Logo/banner upload in settings
- [ ] Analytics charts on dashboard
- [ ] CSV export working

### Testing
- [ ] All endpoints tested with Postman/curl
- [ ] All pages tested in browser
- [ ] Edge cases handled (errors, validation)
- [ ] Mobile responsive

---

Refer to TESTING_GUIDE.md for detailed testing instructions for each feature.
