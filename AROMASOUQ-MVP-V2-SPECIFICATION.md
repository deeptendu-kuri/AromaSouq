# AromaSouq — MVP v2 Specification (Focused & Launch-Ready)
**Version:** 2.0
**Date:** October 25, 2025
**Status:** Ready for Development
**Timeline:** 8-10 weeks
**Team Size:** 1-2 developers

---

## Table of Contents
1. [Executive Overview](#executive-overview)
2. [Design System & UI/UX Guidelines](#design-system--uiux-guidelines)
3. [Customer-Side Features](#customer-side-features)
4. [Vendor-Side Features](#vendor-side-features)
5. [Admin-Side Features](#admin-side-features)
6. [Complete Page Map](#complete-page-map)
7. [Backend API Specification](#backend-api-specification)
8. [UI Mockup Descriptions](#ui-mockup-descriptions)
9. [Database Schema](#database-schema)
10. [Technical Implementation Plan](#technical-implementation-plan)

---

## 1. Executive Overview

### What Changed from v1?

**Streamlined from 80+ pages to 20-22 essential pages**

**Removed (Post-MVP):**
- ❌ Community/Social feed
- ❌ B2B wholesale lead system
- ❌ AI custom perfume builder
- ❌ Influencer management
- ❌ Advanced campaigns
- ❌ AR/Voice features
- ❌ Loyalty tiers (keep coins simple)

**Kept (Essential MVP):**
- ✅ Core e-commerce (products, cart, checkout, orders)
- ✅ Reviews & Ratings system
- ✅ Wishlist functionality
- ✅ Product videos/reels
- ✅ Coins system (earn only)
- ✅ WhatsApp quick contact
- ✅ Smart search
- ✅ Related products
- ✅ Vendor brand stories
- ✅ Bilingual (EN/AR)

**Added (Wow Factors):**
- ⭐ Quick view modal
- ⭐ Buy now / Quick checkout
- ⭐ Social proof badges
- ⭐ Video thumbnails on product cards
- ⭐ Scent pyramid visualization
- ⭐ Smooth animations

---

### MVP Goals

**Primary Goal:** Launch a polished, feature-rich fragrance marketplace that impresses investors and attracts customers.

**Success Metrics (Month 1):**
- 15-25 vendors onboarded
- 150-300 products listed
- 30-50 orders placed
- 50+ reviews submitted
- 100+ registered users

**What Makes This MVP Special:**
1. **Modern UX** — Animations, videos, quick view
2. **User Engagement** — Reviews, wishlist, coins
3. **Local Market Fit** — WhatsApp, Arabic, AED currency
4. **Vendor Tools** — Easy product management, video upload
5. **Polished UI** — Touch of OUD aesthetic + modern features

---

### Key Metrics

```
Timeline:         8-10 weeks
Total Pages:      20-22 pages
API Endpoints:    ~55-60 endpoints
Database Tables:  16-18 tables
Team Size:        1-2 developers
Complexity:       Enhanced Marketplace (E-commerce + Engagement)
```

---

## 2. Design System & UI/UX Guidelines

### Design Philosophy
**"Luxury meets modern e-commerce"** — Premium aesthetic inspired by Touch of OUD, enhanced with contemporary features like video, animations, and instant communication.

---

### Color Palette

#### Primary Colors
```css
--oud-gold:        #C9A86A    /* Primary brand color */
--deep-navy:       #1A1F2E    /* Dark backgrounds */
--charcoal:        #2D2D2D    /* Text, headers */
--ivory:           #FEFEFE    /* Light backgrounds */
```

#### Accent Colors
```css
--rose-gold:       #E8C4A0    /* Accents, highlights */
--amber:           #D4A574    /* Hover states */
--sage-green:      #8B9D83    /* Success messages */
--burgundy:        #8B3A3A    /* Urgent/sale items */
```

#### Functional Colors
```css
--success:         #4CAF50    /* Order confirmed */
--warning:         #FFA726    /* Low stock */
--error:           #EF5350    /* Errors, alerts */
--info:            #42A5F5    /* Info messages */
--whatsapp-green:  #25D366    /* WhatsApp button */
```

---

### Typography

#### Font Families
```css
/* English - Serif for headings, Sans for body */
--font-heading-en: 'Playfair Display', Georgia, serif;
--font-body-en:    'Inter', -apple-system, sans-serif;

/* Arabic - Clean, modern Arabic fonts */
--font-heading-ar: 'Cairo', 'Tajawal', sans-serif;
--font-body-ar:    'Tajawal', 'Almarai', sans-serif;
```

#### Font Sizes
```css
--text-xs:   12px / 0.75rem   /* Labels, badges */
--text-sm:   14px / 0.875rem  /* Secondary text */
--text-base: 16px / 1rem      /* Body text */
--text-lg:   18px / 1.125rem  /* Emphasized text */
--text-xl:   20px / 1.25rem   /* Card titles */
--text-2xl:  24px / 1.5rem    /* Section headers */
--text-3xl:  30px / 1.875rem  /* Page titles */
--text-4xl:  36px / 2.25rem   /* Hero text */
--text-5xl:  48px / 3rem      /* Large hero */
```

#### Font Weights
```css
--font-light:     300
--font-normal:    400
--font-medium:    500
--font-semibold:  600
--font-bold:      700
```

---

### Spacing & Layout

#### Spacing Scale
```css
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  32px
--space-2xl: 48px
--space-3xl: 64px
--space-4xl: 96px
```

#### Container Widths
```css
--container-sm:  640px   /* Mobile */
--container-md:  768px   /* Tablet */
--container-lg:  1024px  /* Desktop */
--container-xl:  1280px  /* Wide desktop */
--container-2xl: 1536px  /* Ultra-wide */
```

---

### Component Design Patterns

#### Buttons

**Primary Button**
```css
background: linear-gradient(135deg, #C9A86A, #D4A574);
color: #FFFFFF;
padding: 12px 32px;
border-radius: 8px;
font-weight: 600;
box-shadow: 0 4px 12px rgba(201, 168, 106, 0.3);
transition: all 0.3s ease;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 6px 20px rgba(201, 168, 106, 0.4);
```

**Secondary Button**
```css
background: transparent;
border: 2px solid #C9A86A;
color: #C9A86A;
padding: 12px 32px;
border-radius: 8px;
```

**WhatsApp Button**
```css
background: #25D366;
color: #FFFFFF;
border-radius: 8px;
padding: 10px 24px;
display: flex;
align-items: center;
gap: 8px;
```

#### Cards

**Product Card**
```css
background: #FFFFFF;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
overflow: hidden;
transition: all 0.3s ease;

/* Hover Effect */
transform: translateY(-8px);
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
```

**Image Aspect Ratio:** 3:4 (portrait) for product images

#### Badges

**Badge Styles**
```css
/* New Badge */
background: linear-gradient(135deg, #4CAF50, #66BB6A);
color: #FFFFFF;
padding: 4px 12px;
border-radius: 12px;
font-size: 12px;
font-weight: 600;

/* Sale Badge */
background: linear-gradient(135deg, #EF5350, #E57373);

/* Trending Badge */
background: linear-gradient(135deg, #FFA726, #FFB74D);

/* Low Stock Badge */
background: linear-gradient(135deg, #8B3A3A, #A94442);
```

---

### Animation Guidelines

#### Framer Motion Principles
```javascript
// Page Transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
const pageTransition = { duration: 0.3, ease: "easeInOut" };

// Card Hover
const cardHover = {
  y: -8,
  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
  transition: { duration: 0.2 }
};

// Button Hover
const buttonHover = {
  scale: 1.05,
  boxShadow: "0 6px 20px rgba(201,168,106,0.4)"
};

// Modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};
```

#### Micro-interactions
- ❤️ Heart animation when adding to wishlist (scale + color fill)
- 🛒 Cart icon shake when item added
- 🪙 Coin spin animation when earned
- ⭐ Star rating fill animation (left to right)
- 💬 WhatsApp button pulse effect
- 🔍 Search suggestions slide down

---

### Responsive Design

#### Breakpoints
```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

#### Mobile-First Rules
- Touch targets minimum 44x44px
- Hamburger menu for navigation
- Bottom sheet for filters
- Sticky "Add to Cart" bar on product pages
- Swipeable galleries
- Collapsible sections

---

## 3. Customer-Side Features

### 3.1 Homepage

#### Hero Section
- **Full-width carousel** (3-5 banners)
- Auto-play every 5 seconds
- Navigation dots
- Touch/swipe enabled
- Overlay text with CTA buttons: "Shop Now", "Explore Collection"

**Content:**
- Banner 1: "Discover Luxury Fragrances" + CTA
- Banner 2: "New Arrivals - Oud Collection"
- Banner 3: "Limited Time Offer - 20% Off"

---

#### Shop by Category (Grid)
- **6-8 category cards** in responsive grid
- Each card:
  - High-quality category image
  - Category name (EN/AR)
  - Product count
  - Hover: Zoom effect + overlay
- Click → Category page

**Categories:**
1. Perfumes (180 products)
2. Oud (65 products)
3. Attars (42 products)
4. Bakhoor (38 products)
5. Home Fragrance (55 products)
6. Essential Oils (28 products)

---

#### Featured Products Carousel
- **"Trending Now"** section
- Horizontal scroll (12 products)
- Auto-scroll on desktop
- Manual swipe on mobile
- "View All" button

**Product Card (Compact):**
```
┌──────────────┐
│   [IMAGE]    │ ← Video thumbnail if available
│   ❤ 🔥 Badge │ ← Wishlist heart + badge (trending/new)
├──────────────┤
│ Brand Name   │
│ Product Name │
│ ★★★★☆ (24)  │ ← Rating
│ 450 AED      │
│ Earn 45 🪙   │ ← Coins badge
├──────────────┤
│ [Add to Cart]│
│ [Quick View] │ ← Eye icon
└──────────────┘
```

---

#### Video Products Section (NEW)
- **"See Products in Action"**
- 6 products with video thumbnails
- Hover to play preview (2 seconds, muted)
- Click to view product page
- Play icon overlay

---

#### Best Sellers
- Same layout as Featured Products
- Different data source (top 12 by sales)

---

#### Why Choose AromaSouq
- **4 value propositions** in grid
  - 🚚 Free Shipping (orders >500 AED)
  - ✓ Authentic Products
  - 🔄 Easy Returns (14 days)
  - 💬 Instant WhatsApp Support

---

#### Newsletter Signup
```
┌────────────────────────────────────────────┐
│  Get 50 Coins on Signup! 🎁                │
│  Subscribe for exclusive offers & updates  │
│  [Email input.....] [Subscribe Button]    │
└────────────────────────────────────────────┘
```

---

### 3.2 Product Listing Page

#### Layout
```
┌─HEADER─────────────────────────────────────┐
├─BREADCRUMB─────────────────────────────────┤
│ Home > Perfumes > Woody Oriental           │
├────────────────────────────────────────────┤
│                                            │
│ ┌─FILTERS (25%)─┐  ┌─PRODUCTS (75%)─────┐ │
│ │               │  │                     │ │
│ │ CATEGORY      │  │ 234 Products        │ │
│ │ ☑ Perfume     │  │ Sort: [Dropdown ▾]  │ │
│ │ ☐ Oud         │  │                     │ │
│ │               │  │ ┌──┐ ┌──┐ ┌──┐ ┌──┐│ │
│ │ PRICE RANGE   │  │ │  │ │  │ │  │ │  ││ │
│ │ ━━●━━━━━━━    │  │ └──┘ └──┘ └──┘ └──┘│ │
│ │ 0  -  5000    │  │                     │ │
│ │               │  │ ┌──┐ ┌──┐ ┌──┐ ┌──┐│ │
│ │ BRAND         │  │ │  │ │  │ │  │ │  ││ │
│ │ [Search...]   │  │ └──┘ └──┘ └──┘ └──┘│ │
│ │ ☑ Armaf       │  │                     │ │
│ │ ☐ Rasasi      │  │ [Load More]         │ │
│ │               │  │                     │ │
│ │ RATING        │  └─────────────────────┘ │
│ │ ☑ 4★ & up     │                          │
│ │ ☐ 3★ & up     │                          │
│ │               │                          │
│ │ IN STOCK      │                          │
│ │ ☑ Only        │                          │
│ │               │                          │
│ │ [Clear All]   │                          │
│ └───────────────┘                          │
└────────────────────────────────────────────┘
```

#### Filters (Sidebar)

**Category**
- Multi-select checkboxes
- Nested subcategories

**Price Range**
- Slider (0 - 5000 AED)
- Shows current range values

**Brand**
- Search box to filter brands
- Multi-select checkboxes
- Show product count per brand

**Rating**
- 4★ and up
- 3★ and up
- All ratings

**Scent Family** (for perfumes)
- Woody
- Floral
- Oriental
- Fresh
- Spicy

**Availability**
- In Stock only
- Include Pre-Order

**Clear All Filters** button

---

#### Sort Options
- Relevance (default)
- Price: Low to High
- Price: High to Low
- Newest First
- Best Sellers
- Top Rated

---

#### Product Card (Full)
```
┌────────────────────┐
│   [Product Image]  │ ← 3:4 ratio, video thumbnail if available
│   ❤               │ ← Wishlist heart (top-right)
│   🔥 12 sold today │ ← Social proof badge
│   [Play icon]      │ ← If video exists
├────────────────────┤
│ Swiss Arabian      │ ← Brand name (clickable)
│ Oud Royale EDP     │ ← Product name
│ ★★★★★ 4.8 (89)    │ ← Rating + review count
│                    │
│ 850 AED  1200 AED  │ ← Price (sale + original)
│ Save 29%           │ ← Discount %
│ Earn 85 coins 🪙   │ ← Coins to earn
│                    │
│ [Add to Cart] [👁] │ ← Add to cart + Quick view
└────────────────────┘
```

**Badges on cards:**
- 🔥 "X sold today" (if > 0 sales today)
- ⚡ "Only Y left" (if stock < 5)
- ✨ "New" (if product age < 7 days)
- 🏆 "Best Seller" (if in top 20)
- 📹 "Has Video" (play icon overlay)

---

#### Quick View Modal (WOW FACTOR)

Click eye icon → Opens modal overlay

**Modal Layout:**
```
┌────────────────────────────────────────────────┐
│ ┌─IMAGES (50%)────┐  ┌─INFO (50%)──────────┐  │
│ │                 │  │ Swiss Arabian       │  │
│ │   [Main Image]  │  │ Oud Royale EDP 100ml│  │
│ │                 │  │ ★★★★★ 4.8 (89)     │  │
│ │                 │  │                     │  │
│ │  [Thumb] [Thumb]│  │ 850 AED  1200 AED   │  │
│ │  [Thumb] [Thumb]│  │ Save 29%            │  │
│ │                 │  │                     │  │
│ └─────────────────┘  │ Size: ⚪30ml ⚪50ml  │  │
│                      │       ⚫100ml        │  │
│                      │                     │  │
│                      │ Qty: ⊖ 1 ⊕         │  │
│                      │                     │  │
│                      │ [Add to Cart]       │  │
│                      │ [View Full Details →]│  │
│                      └─────────────────────┘  │
└────────────────────────────────────────────────┘
```

---

#### Mobile Filters
- Bottom sheet drawer
- "Filters" button at top
- Click → Slides up from bottom
- Apply/Reset buttons

---

### 3.3 Product Detail Page

#### Breadcrumb
```
Home > Perfumes > Woody Oriental > Oud Royale EDP
```

---

#### Layout (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│ ┌─GALLERY (55%)──────────┐  ┌─INFO (45%)────────────┐  │
│ │                        │  │                        │  │
│ │  ┌──────────────────┐ │  │ Swiss Arabian          │  │
│ │  │                  │ │  │ OUD ROYALE EDP 100ML   │  │
│ │  │   MAIN IMAGE     │ │  │ ★★★★★ 4.8  (234 ⭐)   │  │
│ │  │   or VIDEO       │ │  │ [Share 🔗 WA IG]       │  │
│ │  │   (Zoom enabled) │ │  │                        │  │
│ │  │                  │ │  │ ┌────────────────────┐ │  │
│ │  └──────────────────┘ │  │ │ 850 AED  1200 AED  │ │  │
│ │                        │  │ │ Save 29%  🏷️       │ │  │
│ │ ┌────────────────────┐│  │ │ Earn 85 coins 🪙   │ │  │
│ │ │ [🖼️] [🖼️] [▶] [🖼️]││  │ └────────────────────┘ │  │
│ │ │ Thumbnails         ││  │                        │  │
│ │ └────────────────────┘│  │ SIZE                   │  │
│ │                        │  │ ⚪ 30ml  ⚪ 50ml  ⚫ 100ml│  │
│ └────────────────────────┘  │                        │  │
│                              │ QUANTITY               │  │
│                              │ ⊖  1  ⊕  (12 in stock)│  │
│                              │                        │  │
│                              │ ┌────────────────────┐ │  │
│                              │ │ [Add to Cart] 🛒   │ │  │
│                              │ │ [Buy Now] ⚡       │ │  │
│                              │ │ [♡ Wishlist]       │ │  │
│                              │ └────────────────────┘ │  │
│                              │                        │  │
│                              │ [💬 Chat on WhatsApp] │  │
│                              │                        │  │
│                              │ ✓ Free shipping >500  │  │
│                              │ ✓ Same-day (UAE)      │  │
│                              │ ✓ Easy returns        │  │
│                              │                        │  │
│                              │ SCENT PYRAMID          │  │
│                              │ ┌─ TOP ────────────┐  │  │
│                              │ │ Saffron, Bergamot│  │  │
│                              │ ├─ HEART ──────────┤  │  │
│                              │ │ Rose, Jasmine    │  │  │
│                              │ ├─ BASE ───────────┤  │  │
│                              │ │ Oud, Amber, Musk │  │  │
│                              │ └──────────────────┘  │  │
│                              └────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

┌─DESCRIPTION─────────────────────────────────────────────┐
│ Experience the luxurious blend of authentic oud...     │
│ [Read More...]                                          │
└─────────────────────────────────────────────────────────┘

┌─TABS────────────────────────────────────────────────────┐
│ [Reviews (234)] [Q&A] [Videos] [Shipping]               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ REVIEWS & RATINGS                                       │
│                                                         │
│ ★★★★★ 4.8 out of 5  (234 reviews)                      │
│                                                         │
│ 5★ ████████████████████░░  180                         │
│ 4★ ████████░░░░░░░░░░░░░   40                          │
│ 3★ ██░░░░░░░░░░░░░░░░░░░   10                          │
│ 2★ █░░░░░░░░░░░░░░░░░░░░    3                          │
│ 1★ ░░░░░░░░░░░░░░░░░░░░░    1                          │
│                                                         │
│ Sort: [Most Helpful ▾]  Filter: [All Ratings ▾]       │
│                                                         │
│ ┌───────────────────────────────────────────┐          │
│ │ 👤 Sarah M.  ★★★★★  ✓ Verified Purchase   │          │
│ │ 2 days ago                                │          │
│ │                                           │          │
│ │ "Amazing longevity!"                      │          │
│ │ This perfume lasts all day. The oud is    │          │
│ │ rich but not overpowering...              │          │
│ │                                           │          │
│ │ [Image] [Image]                           │          │
│ │                                           │          │
│ │ 👍 Helpful (45)  👎 (2)   Report          │          │
│ │                                           │          │
│ │ ↳ Vendor Reply:                           │          │
│ │   Thank you for your review! We're        │          │
│ │   delighted you love it. 💙               │          │
│ └───────────────────────────────────────────┘          │
│                                                         │
│ [Load More Reviews]                                     │
│ [Write a Review]                                        │
└─────────────────────────────────────────────────────────┘

┌─RELATED PRODUCTS────────────────────────────────────────┐
│ You May Also Like                          [View All →] │
│                                                         │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│ │    │ │    │ │    │ │    │ │    │ │    │ →          │
│ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘            │
└─────────────────────────────────────────────────────────┘
```

---

#### Product Gallery Features
- Main image/video display (large)
- Zoom on hover (desktop)
- Pinch to zoom (mobile)
- Thumbnail strip (horizontal scroll)
- Video auto-play on select
- Full-screen mode
- Swipe gestures (mobile)

---

#### Buy Now Button (WOW FACTOR)

**User Flow:**
1. Click "Buy Now" button
2. → Skip cart entirely
3. → Go directly to checkout
4. → Pre-fill last used address
5. → Quick payment
6. → Order confirmed

**Benefits:**
- Reduce steps from 5 to 3
- Higher conversion rate
- Impulse purchases

---

#### WhatsApp Quick Contact (WOW FACTOR)

**Implementation:**
```
Pre-filled message:
"Hi [Vendor Name], I'm interested in [Product Name] ([Price] AED).
Product link: [URL]"

Click → Opens WhatsApp (app or web.whatsapp.com)
```

**Button Design:**
```css
background: #25D366;
color: white;
icon: WhatsApp logo;
text: "Chat on WhatsApp"
pulse animation (subtle)
```

---

#### Scent Pyramid Visualization (WOW FACTOR)

**Interactive Visual:**
```
        ╱──────────╲
       ╱  TOP NOTES ╲
      ╱──────────────╲
     │   Saffron      │ ← Hover: Show note description
     │   Bergamot     │
      ╲──────────────╱
       ╲  HEART NOTES ╲
        ╲──────────────╲
        │   Rose        │
        │   Jasmine     │
         ╲──────────────╱
          ╲  BASE NOTES ╲
           ╲──────────────╲
           │   Oud         │
           │   Amber       │
           │   Musk        │
            ╲──────────────╱
```

**Color Coding:**
- Top notes: Yellow/light tones
- Heart notes: Pink/floral tones
- Base notes: Amber/dark tones

---

#### Review Section Features

**Review Card:**
- User avatar (initials if no photo)
- User name
- Star rating
- Verified purchase badge
- Review date
- Review title (optional)
- Review text (full or truncated)
- Review photos (grid, expandable)
- Helpful/Not Helpful buttons
- Report button
- Vendor reply (if any)

**Review Submission:**
- Star rating selector (1-5)
- Title field (optional)
- Comment field (required, min 20 chars)
- Photo upload (up to 3 images)
- Submit button

**Review Moderation:**
- Auto-publish for verified purchases
- Manual review for others
- Admin can hide/show reviews

---

#### Related Products Algorithm

**Simple Scoring System:**
```javascript
Score Calculation:
1. Same category: +3 points
2. Same vendor: +2 points
3. Price within ±20%: +2 points
4. Same scent family: +1 point
5. Similar tags: +1 point per tag

Sort by score DESC
Return top 6 products
Exclude current product
```

---

### 3.4 Shopping Cart

#### Cart Page Layout
```
┌─────────────────────────────────────────────────────────┐
│ Shopping Cart (3 items)                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─CART ITEMS (70%)──────────┐  ┌─SUMMARY (30%)──────┐  │
│ │                            │  │ ORDER SUMMARY      │  │
│ │ ┌────────────────────────┐ │  │                    │  │
│ │ │[IMG] Swiss Arabian     │ │  │ Subtotal:  1520 AED│  │
│ │ │      Oud Royale EDP    │ │  │ Shipping:  Free ✓  │  │
│ │ │      100ml             │ │  │ VAT (5%):   76 AED │  │
│ │ │                        │ │  │ ─────────────────  │  │
│ │ │      850 AED           │ │  │ Total:    1596 AED │  │
│ │ │      Qty: ⊖ 1 ⊕        │ │  │                    │  │
│ │ │                        │ │  │ 🪙 Earn 160 coins! │  │
│ │ │ [Remove] [Save Later]  │ │  │                    │  │
│ │ └────────────────────────┘ │  │ ┌────────────────┐ │  │
│ │                            │  │ │ Promo Code:    │ │  │
│ │ ┌────────────────────────┐ │  │ │ [__________]   │ │  │
│ │ │[IMG] Ajmal Amber Wood  │ │  │ │ [Apply]        │ │  │
│ │ │      EDT 50ml          │ │  │ └────────────────┘ │  │
│ │ │                        │ │  │                    │  │
│ │ │      320 AED           │ │  │ ┌────────────────┐ │  │
│ │ │      Qty: ⊖ 2 ⊕        │ │  │ │ [Checkout →]   │ │  │
│ │ │                        │ │  │ └────────────────┘ │  │
│ │ │ [Remove] [Save Later]  │ │  │                    │  │
│ │ └────────────────────────┘ │  │ [Continue Shop]    │  │
│ │                            │  │                    │  │
│ └────────────────────────────┘  │ 🔒 Secure Checkout │  │
│                                  └────────────────────┘  │
│                                                         │
│ COMPLETE YOUR FRAGRANCE COLLECTION                      │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                           │
│ │[+] │ │[+] │ │[+] │ │[+] │ → Suggested products       │
│ └────┘ └────┘ └────┘ └────┘                           │
└─────────────────────────────────────────────────────────┘
```

#### Cart Features
- Real-time quantity updates
- Stock validation
- Price updates
- Remove items
- Save for later (moves to wishlist)
- Cart persistence (logged-in users)
- Continue shopping link
- Cross-sell recommendations

#### Empty Cart State
```
┌─────────────────────────────────┐
│                                 │
│         🛒                      │
│                                 │
│   Your cart is empty            │
│                                 │
│   Start shopping and add some   │
│   luxury fragrances!            │
│                                 │
│   [Browse Products]             │
│                                 │
└─────────────────────────────────┘
```

---

### 3.5 Checkout

#### Multi-Step Checkout
```
Step 1: Shipping Address
Step 2: Delivery Method
Step 3: Payment
Step 4: Review & Confirm
```

---

#### Step 1: Shipping Address
```
┌─────────────────────────────────────────────┐
│ SHIPPING ADDRESS                            │
├─────────────────────────────────────────────┤
│                                             │
│ ⚪ Use saved address:                       │
│   ⚫ Home - 123 Sheikh Zayed Road, Dubai    │
│   ⚪ Office - Business Bay, Dubai           │
│                                             │
│ ⚪ Add new address                          │
│   [Form appears when selected]              │
│                                             │
│   Full Name:    [_________________]         │
│   Phone:        [_________________]         │
│   Address Line 1: [_________________]       │
│   Address Line 2: [_________________]       │
│   City:         [_________________]         │
│   Emirate:      [Dubai ▾]                   │
│   Country:      [UAE ▾]                     │
│   ZIP Code:     [_________________]         │
│                                             │
│   ☑ Save for future orders                 │
│                                             │
│ [← Back to Cart]  [Continue to Delivery →] │
└─────────────────────────────────────────────┘
```

---

#### Step 2: Delivery Method
```
┌─────────────────────────────────────────────┐
│ DELIVERY METHOD                             │
├─────────────────────────────────────────────┤
│                                             │
│ ⚫ Standard Delivery (3-5 days)             │
│    FREE for orders above 500 AED            │
│                                             │
│ ⚪ Express Delivery (1-2 days)              │
│    25 AED                                   │
│                                             │
│ ⚪ Same-Day Delivery (UAE only)             │
│    50 AED                                   │
│    Order before 12pm for same-day           │
│                                             │
│ Estimated delivery: Dec 28, 2025            │
│                                             │
│ [← Back]  [Continue to Payment →]          │
└─────────────────────────────────────────────┘
```

---

#### Step 3: Payment
```
┌─────────────────────────────────────────────┐
│ PAYMENT METHOD                              │
├─────────────────────────────────────────────┤
│                                             │
│ ⚫ Credit / Debit Card                      │
│    [💳 Visa] [💳 Mastercard] [💳 Amex]     │
│                                             │
│    Card Number:  [____-____-____-____]      │
│    Name on Card: [_________________]        │
│    Expiry:       [MM/YY]  CVV: [___]        │
│                                             │
│    ☑ Save card for future purchases         │
│                                             │
│ ⚪ Cash on Delivery                         │
│    Pay when you receive (5 AED fee)         │
│                                             │
│ Billing Address:                            │
│ ⚫ Same as shipping                         │
│ ⚪ Different billing address                │
│                                             │
│ [← Back]  [Review Order →]                 │
└─────────────────────────────────────────────┘
```

---

#### Step 4: Review & Place Order
```
┌─────────────────────────────────────────────┐
│ REVIEW YOUR ORDER                           │
├─────────────────────────────────────────────┤
│                                             │
│ ORDER SUMMARY                               │
│ ┌─────────────────────────────────────────┐ │
│ │ 3 items                        1520 AED │ │
│ │                                         │ │
│ │ • Oud Royale EDP 100ml x1               │ │
│ │ • Amber Wood EDT 50ml x2                │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ DELIVERY                                    │
│ ┌─────────────────────────────────────────┐ │
│ │ Standard Delivery (3-5 days)       FREE │ │
│ │ To: 123 Sheikh Zayed Rd, Dubai          │ │
│ │ Est. delivery: Dec 28, 2025             │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ PAYMENT                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ Visa ending in 4242                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ TOTAL BREAKDOWN                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Subtotal:              1520 AED         │ │
│ │ Shipping:              FREE             │ │
│ │ VAT (5%):              76 AED           │ │
│ │ ─────────────────────────────────────   │ │
│ │ Total:                 1596 AED         │ │
│ │                                         │ │
│ │ 🪙 You'll earn 160 coins!               │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ☑ I agree to Terms & Conditions             │
│                                             │
│ [← Back]  [Place Order 🔒]                 │
└─────────────────────────────────────────────┘
```

---

#### Order Success Page
```
┌─────────────────────────────────────────────┐
│              ✓                              │
│                                             │
│      ORDER CONFIRMED!                       │
│                                             │
│   Thank you for your order                  │
│   Order #ARO-2025-00234                     │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 🪙 Congratulations!                     │ │
│ │    You earned 160 coins!                │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ We've sent a confirmation to:               │
│ customer@email.com                          │
│                                             │
│ Estimated delivery: Dec 28, 2025            │
│                                             │
│ [Track Order]  [Continue Shopping]          │
└─────────────────────────────────────────────┘
```

---

### 3.6 User Account Dashboard

#### My Account Home
```
┌─────────────────────────────────────────────────────────┐
│ Welcome back, Ahmed! 👋                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │  Orders  │ │  Coins   │ │ Wishlist │ │ Reviews  │   │
│ │    12    │ │   850🪙  │ │    24    │ │    8     │   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│ QUICK ACTIONS                                           │
│ • Track my last order                                   │
│ • View wishlist                                         │
│ • Update profile                                        │
│                                                         │
│ RECENT ORDERS                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ #ARO-234  Dec 20  3 items  1596 AED  ✓ Delivered   │ │
│ │ #ARO-221  Dec 15  1 item    450 AED  🚚 Shipped    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [View All Orders →]                                     │
└─────────────────────────────────────────────────────────┘
```

---

#### Sidebar Navigation
```
📦 My Orders
❤️ Wishlist
🪙 Wallet & Coins
⭐ My Reviews
👤 Profile Settings
📍 Saved Addresses
🔔 Notifications
🚪 Logout
```

---

#### My Orders Page
```
┌─────────────────────────────────────────────────────────┐
│ MY ORDERS                                               │
├─────────────────────────────────────────────────────────┤
│ [All] [Pending] [Shipped] [Delivered] [Cancelled]      │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Order #ARO-2025-00234        Dec 20, 2025           │ │
│ │                                                     │ │
│ │ [IMG] [IMG] [IMG]  +1 more                          │ │
│ │                                                     │ │
│ │ Total: 1596 AED    Status: ✓ Delivered             │ │
│ │                                                     │ │
│ │ [View Details]  [Reorder]  [Write Review]          │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Order #ARO-2025-00221        Dec 15, 2025           │ │
│ │ ...                                                 │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

#### Order Detail Page
```
┌─────────────────────────────────────────────────────────┐
│ Order #ARO-2025-00234                                   │
│ Placed on Dec 20, 2025                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ORDER TIMELINE                                          │
│ ━━━━●━━━━●━━━━●━━━━●                                   │
│ Placed  Confirmed  Shipped  Delivered                   │
│ Dec 20   Dec 20     Dec 22   Dec 23                     │
│                                                         │
│ ITEMS ORDERED                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Oud Royale EDP 100ml                          │ │
│ │       Swiss Arabian                                 │ │
│ │       Qty: 1  |  850 AED                            │ │
│ │       [Write Review]                                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ SHIPPING ADDRESS                                        │
│ Ahmed Al Mansouri                                       │
│ 123 Sheikh Zayed Road                                   │
│ Dubai, UAE 00000                                        │
│ +971 50 123 4567                                        │
│                                                         │
│ PAYMENT METHOD                                          │
│ Visa ending in 4242                                     │
│                                                         │
│ ORDER SUMMARY                                           │
│ Subtotal:        1520 AED                               │
│ Shipping:        FREE                                   │
│ VAT (5%):        76 AED                                 │
│ ──────────────────────                                  │
│ Total:           1596 AED                               │
│                                                         │
│ Coins Earned:    160 🪙                                 │
│                                                         │
│ [Download Invoice]  [Request Return]                    │
└─────────────────────────────────────────────────────────┘
```

---

#### Wishlist Page
```
┌─────────────────────────────────────────────────────────┐
│ MY WISHLIST (24 items)                   [Share List]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                   │
│ │ [IMG]│ │ [IMG]│ │ [IMG]│ │ [IMG]│                   │
│ │  ❤   │ │  ❤   │ │  ❤   │ │  ❤   │                   │
│ │      │ │      │ │      │ │      │                   │
│ │Brand │ │Brand │ │Brand │ │Brand │                   │
│ │Name  │ │Name  │ │Name  │ │Name  │                   │
│ │★★★★★│ │★★★★☆│ │★★★★★│ │★★★★☆│                   │
│ │450   │ │650   │ │850   │ │320   │                   │
│ │AED   │ │AED   │ │AED   │ │AED   │                   │
│ │      │ │      │ │      │ │      │                   │
│ │[Cart]│ │[Cart]│ │[Cart]│ │[Cart]│                   │
│ │[X]   │ │[X]   │ │[X]   │ │[X]   │                   │
│ └──────┘ └──────┘ └──────┘ └──────┘                   │
│                                                         │
│ [Move All to Cart]  [Clear Wishlist]                    │
└─────────────────────────────────────────────────────────┘
```

---

#### Wallet & Coins Page
```
┌─────────────────────────────────────────────────────────┐
│ WALLET & COINS                                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │              COINS BALANCE                          │ │
│ │                                                     │ │
│ │                  850 🪙                             │ │
│ │                                                     │ │
│ │         Worth ≈ 85 AED                              │ │
│ │                                                     │ │
│ │    💡 Redemption coming soon!                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ TRANSACTION HISTORY                                     │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Dec 20  Earned from Order #234       +160 🪙        │ │
│ │ Dec 18  Review submitted             +20 🪙         │ │
│ │ Dec 15  Earned from Order #221       +45 🪙         │ │
│ │ Dec 10  First purchase bonus         +100 🪙        │ │
│ │ Dec 01  Welcome bonus                +50 🪙         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ HOW TO EARN MORE COINS                                  │
│ • Make purchases: 1 coin per 10 AED                     │
│ • Write reviews: 20 coins per review                    │
│ • Refer friends: 50 coins per signup                    │
└─────────────────────────────────────────────────────────┘
```

---

#### My Reviews Page
```
┌─────────────────────────────────────────────────────────┐
│ MY REVIEWS (8)                                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Oud Royale EDP                    ★★★★★       │ │
│ │                                                     │ │
│ │ "Amazing longevity!"                                │ │
│ │ This perfume lasts all day. The oud is rich...      │ │
│ │                                                     │ │
│ │ Posted: Dec 18, 2025                                │ │
│ │ 👍 45 found helpful                                 │ │
│ │                                                     │ │
│ │ [Edit Review]  [Delete]                             │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ PRODUCTS YOU CAN REVIEW                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Amber Wood EDT                                │ │
│ │       Ordered on Dec 15, Delivered Dec 17           │ │
│ │       [Write Review]                                │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 3.7 Search

#### Smart Search Bar (Header)
```
┌─────────────────────────────────┐
│ 🔍 [Search products...        ] │
└─────────────────────────────────┘
```

**As user types "oud":**

```
┌─────────────────────────────────────────────┐
│ 🔍 [oud                                   ] │
├─────────────────────────────────────────────┤
│ PRODUCTS (5)                                │
│ ┌─────────────────────────────────────────┐ │
│ │ [img] Oud Royale EDP - 850 AED          │ │
│ │ [img] Oud Al Anfar - 450 AED            │ │
│ │ [img] Oud Wood Intense - 1200 AED       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ CATEGORIES (2)                              │
│ • Oud                                       │
│ • Oud Accessories                           │
│                                             │
│ BRANDS (1)                                  │
│ • Oud Elite                                 │
│                                             │
│ [View all results for "oud" →]             │
└─────────────────────────────────────────────┘
```

**Features:**
- Auto-complete after 2 characters
- Debounced (300ms delay)
- Shows top 5 products with images
- Shows matching categories
- Shows matching brands
- "View all results" link
- Works in English and Arabic
- Highlights matching text

---

## 4. Vendor-Side Features

### 4.1 Vendor Dashboard

```
┌─────────────────────────────────────────────────────────┐
│ VENDOR DASHBOARD                    [Profile] [Logout]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Welcome back, Swiss Arabian! 👋                         │
│                                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │Total Sales│ │ Orders   │ │ Products │ │Avg Rating│   │
│ │          │ │          │ │          │ │          │   │
│ │ 45,230   │ │   234    │ │    89    │ │  4.7 ★   │   │
│ │   AED    │ │ 12 Pend. │ │ 5 Draft  │ │          │   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│ SALES CHART (Last 30 days)                              │
│ ┌─────────────────────────────────────────────────────┐ │
│ │  AED                                                │ │
│ │ 2000│         ╱╲                                    │ │
│ │ 1500│      ╱╲╱  ╲╱╲                                 │ │
│ │ 1000│   ╱╲╱         ╲                               │ │
│ │  500│╱╲╱              ╲╱╲                           │ │
│ │    0└──────────────────────────────────────────     │ │
│ │      1  5  10  15  20  25  30 (days)               │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ PENDING ACTIONS                                         │
│ • 12 orders to fulfill                                  │
│ • 5 products awaiting approval                          │
│ • 8 reviews to respond to                               │
│                                                         │
│ RECENT ORDERS                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ #12345  2h ago   Sarah M.   850 AED  ⏳ Pending     │ │
│ │ #12344  5h ago   Ahmed K.   320 AED  ✓ Shipped     │ │
│ │ #12343  1d ago   Fatima A.  450 AED  ✓ Delivered   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [View All Orders →]                                     │
└─────────────────────────────────────────────────────────┘
```

---

### 4.2 Product Management

#### Products List
```
┌─────────────────────────────────────────────────────────┐
│ PRODUCTS                              [+ Add Product]   │
├─────────────────────────────────────────────────────────┤
│ Search: [____________]  Filter: [All ▾]  Status: [All ▾]│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Oud Royale EDP 100ml          SKU: OUD-001    │ │
│ │       Category: Perfumes            Stock: 45       │ │
│ │       Price: 850 AED                Status: ✓ Active│ │
│ │       Rating: ★★★★★ 4.8 (89)       Sales: 234      │ │
│ │       [Edit] [Duplicate] [Delete] [View]            │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Amber Wood EDT 50ml           SKU: AMB-002    │ │
│ │ ...                                                 │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Showing 1-10 of 89 products                             │
│ [< Previous]  [1] [2] [3] ... [9]  [Next >]            │
└─────────────────────────────────────────────────────────┘
```

---

#### Add/Edit Product Form

**Tab Navigation:**
```
[Basic Info] [Media] [Pricing] [Inventory] [Scent Profile] [Shipping]
```

---

**Tab 1: Basic Info**
```
┌─────────────────────────────────────────────────────────┐
│ BASIC INFORMATION                                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Product Name (English):                                 │
│ [_________________________________________________]     │
│                                                         │
│ Product Name (Arabic):                                  │
│ [_________________________________________________]     │
│                                                         │
│ Brand:                                                  │
│ [Swiss Arabian ▾]                                       │
│                                                         │
│ Category:                                               │
│ [Perfumes ▾] > [Woody Oriental ▾]                       │
│                                                         │
│ SKU:                                                    │
│ [OUD-ROYALE-100] [Auto-Generate]                        │
│                                                         │
│ Description (English):                                  │
│ ┌───────────────────────────────────────────────────┐   │
│ │ Experience the luxurious blend of...             │   │
│ │ [Rich text editor with formatting options]       │   │
│ └───────────────────────────────────────────────────┘   │
│                                                         │
│ Description (Arabic):                                   │
│ [Similar rich text editor]                             │
│                                                         │
│ Tags (comma-separated):                                 │
│ [oud, woody, oriental, luxury, long-lasting]            │
│                                                         │
│ [Save Draft]  [Continue to Media →]                     │
└─────────────────────────────────────────────────────────┘
```

---

**Tab 2: Media**
```
┌─────────────────────────────────────────────────────────┐
│ PRODUCT MEDIA                                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ IMAGES                                                  │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Drag & Drop Images Here]                           │ │
│ │                                                     │ │
│ │ or [Browse Files]                                   │ │
│ │                                                     │ │
│ │ Max 8 images, JPG/PNG, 5MB each                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Uploaded Images:                                        │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                           │
│ │[1] │ │[2] │ │[3] │ │[4] │                           │
│ │⭐  │ │    │ │    │ │    │                           │
│ │[X] │ │[X] │ │[X] │ │[X] │                           │
│ └────┘ └────┘ └────┘ └────┘                           │
│ ⭐ = Featured image, drag to reorder                    │
│                                                         │
│ VIDEOS (Optional)                                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Upload Video]                                      │ │
│ │                                                     │ │
│ │ Max 3 videos, MP4/MOV, 50MB, 60 seconds max         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Uploaded Videos:                                        │
│ ┌────┐                                                  │
│ │[▶] │ video1.mp4 (12s)  [X]                           │
│ └────┘                                                  │
│                                                         │
│ [← Back]  [Continue to Pricing →]                      │
└─────────────────────────────────────────────────────────┘
```

---

**Tab 3: Pricing**
```
┌─────────────────────────────────────────────────────────┐
│ PRICING                                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Regular Price (AED):                                    │
│ [1200_____]                                             │
│                                                         │
│ Sale Price (AED) - Optional:                            │
│ [850______]                                             │
│                                                         │
│ ✓ Product on sale                                       │
│ You save: 350 AED (29% off)                             │
│                                                         │
│ Cost Price (for your reference):                        │
│ [400______]                                             │
│ Profit margin: 450 AED (53%)                            │
│                                                         │
│ Coins to Award on Purchase:                             │
│ ● Auto (1 coin per 10 AED) = 85 coins                   │
│ ○ Custom: [_____] coins                                 │
│                                                         │
│ Tax Class:                                              │
│ [Standard Rate (5% VAT) ▾]                              │
│                                                         │
│ [← Back]  [Continue to Inventory →]                    │
└─────────────────────────────────────────────────────────┘
```

---

**Tab 4: Inventory**
```
┌─────────────────────────────────────────────────────────┐
│ INVENTORY                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Stock Quantity:                                         │
│ [45_______]                                             │
│                                                         │
│ Low Stock Alert Threshold:                              │
│ [5________]                                             │
│ Notify me when stock falls below this number            │
│                                                         │
│ Stock Status:                                           │
│ ● In Stock                                              │
│ ○ Out of Stock                                          │
│ ○ Pre-Order                                             │
│                                                         │
│ Allow Backorders:                                       │
│ ○ Yes  ● No                                             │
│                                                         │
│ VARIANTS (Optional)                                     │
│ Does this product have size variants?                   │
│ ○ No  ● Yes                                             │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Size     Price    SKU          Stock               │ │
│ │ ──────────────────────────────────────────────────  │ │
│ │ 30ml     450 AED  OUD-R-30     20    [Edit] [X]    │ │
│ │ 50ml     650 AED  OUD-R-50     35    [Edit] [X]    │ │
│ │ 100ml    850 AED  OUD-R-100    45    [Edit] [X]    │ │
│ │                                                     │ │
│ │ [+ Add Variant]                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [← Back]  [Continue to Scent Profile →]                │
└─────────────────────────────────────────────────────────┘
```

---

**Tab 5: Scent Profile** (For Perfumes/Oud/Attars)
```
┌─────────────────────────────────────────────────────────┐
│ SCENT PROFILE                                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Scent Family:                                           │
│ [Woody Oriental ▾]                                      │
│                                                         │
│ Top Notes:                                              │
│ [Search notes...]                                       │
│ Selected: [Saffron] [Bergamot] [Cardamom]              │
│                                                         │
│ Suggestions: Lemon, Orange, Pink Pepper...              │
│                                                         │
│ Heart Notes:                                            │
│ [Search notes...]                                       │
│ Selected: [Rose] [Jasmine] [Geranium]                  │
│                                                         │
│ Base Notes:                                             │
│ [Search notes...]                                       │
│ Selected: [Oud] [Amber] [Musk] [Sandalwood]            │
│                                                         │
│ Longevity:                                              │
│ ━━━━━━━━━●━━  (8-10 hours)                             │
│ 4hrs ──────────────────── 12+ hrs                       │
│                                                         │
│ Sillage (Projection):                                   │
│ ━━━━━━━●━━━━  (Moderate to Heavy)                      │
│ Intimate ──────────────── Projecting                    │
│                                                         │
│ Recommended Season:                                     │
│ ☐ Spring  ☐ Summer  ☑ Fall  ☑ Winter                   │
│                                                         │
│ Gender:                                                 │
│ ○ Male  ○ Female  ● Unisex                             │
│                                                         │
│ [← Back]  [Continue to Shipping →]                     │
└─────────────────────────────────────────────────────────┘
```

---

**Tab 6: Shipping & Settings**
```
┌─────────────────────────────────────────────────────────┐
│ SHIPPING & SETTINGS                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Weight (kg):                                            │
│ [0.3______]                                             │
│                                                         │
│ Dimensions (L x W x H) cm:                              │
│ [15___] x [10___] x [20___]                             │
│                                                         │
│ Shipping Class:                                         │
│ [Standard ▾]                                            │
│                                                         │
│ WHATSAPP CONTACT                                        │
│ Enable WhatsApp button on product page:                 │
│ ● Yes  ○ No                                             │
│                                                         │
│ WhatsApp Number:                                        │
│ [+971 50 123 4567]                                      │
│ (Uses your default vendor number if empty)              │
│                                                         │
│ ADDITIONAL SETTINGS                                     │
│ ☑ Enable reviews                                        │
│ ☑ Show product in search results                        │
│ ☐ Featured product (admin only)                         │
│                                                         │
│ Product Visibility:                                     │
│ ● Public  ○ Hidden  ○ Password Protected                │
│                                                         │
│ [← Back]  [Save as Draft]  [Submit for Approval]       │
└─────────────────────────────────────────────────────────┘
```

---

### 4.3 Order Management

#### Orders List
```
┌─────────────────────────────────────────────────────────┐
│ ORDERS                                                  │
├─────────────────────────────────────────────────────────┤
│ [All] [Pending] [Processing] [Shipped] [Delivered]     │
│                                                         │
│ Search: [Order #, Customer name...]  Date: [All time ▾]│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ #ARO-234  Dec 20, 2025  10:30 AM                    │ │
│ │                                                     │ │
│ │ Customer: Sarah M. (sarah@email.com)                │ │
│ │ Items: 2  |  Total: 850 AED  |  Status: ⏳ Pending │ │
│ │                                                     │ │
│ │ • Oud Royale EDP 100ml x1                           │ │
│ │ • Amber Wood EDT 50ml x1                            │ │
│ │                                                     │ │
│ │ [View Details]  [Mark as Processing]  [Contact]    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Showing 1-10 of 234 orders                              │
└─────────────────────────────────────────────────────────┘
```

---

#### Order Detail Page
```
┌─────────────────────────────────────────────────────────┐
│ Order #ARO-2025-00234                   Status: Pending │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ UPDATE STATUS                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Current: Pending                                    │ │
│ │ Change to: [Processing ▾]  [Update]                 │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ CUSTOMER INFORMATION                                    │
│ Name: Sarah Mohamed                                     │
│ Email: sarah@email.com                                  │
│ Phone: +971 50 123 4567                                 │
│                                                         │
│ SHIPPING ADDRESS                                        │
│ 123 Sheikh Zayed Road                                   │
│ Dubai, UAE 00000                                        │
│                                                         │
│ ITEMS ORDERED                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Oud Royale EDP 100ml                          │ │
│ │       SKU: OUD-R-100                                │ │
│ │       Qty: 1  |  Price: 850 AED                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ORDER SUMMARY                                           │
│ Subtotal:        850 AED                                │
│ Shipping:        Free                                   │
│ VAT (5%):        42.50 AED                              │
│ ──────────────────────                                  │
│ Total:           892.50 AED                             │
│                                                         │
│ Payment Method: Visa ending in 4242                     │
│ Payment Status: ✓ Paid                                  │
│                                                         │
│ SHIPPING                                                │
│ Method: Standard Delivery (3-5 days)                    │
│ Status: Not Shipped                                     │
│                                                         │
│ Add Tracking:                                           │
│ Carrier: [Aramex ▾]                                     │
│ Tracking #: [_________________]                         │
│ [Save Tracking Info]                                    │
│                                                         │
│ ORDER NOTES                                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Add internal note...]                              │ │
│ │                                                     │ │
│ │ [Add Note (Private)]  [Add Note (Send to Customer)]│ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [Download Invoice]  [Contact Customer]  [Cancel Order] │
└─────────────────────────────────────────────────────────┘
```

---

### 4.4 Reviews Management

```
┌─────────────────────────────────────────────────────────┐
│ PRODUCT REVIEWS                                         │
├─────────────────────────────────────────────────────────┤
│ [All Reviews] [Pending Response] [Flagged]              │
│                                                         │
│ Filter: [All Products ▾]  Rating: [All ▾]  Sort: [Newest]│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Oud Royale EDP                   ★★★★★        │ │
│ │                                                     │ │
│ │ Sarah M.  •  Dec 18, 2025  •  ✓ Verified Purchase  │ │
│ │                                                     │ │
│ │ "Amazing longevity!"                                │ │
│ │ This perfume lasts all day. The oud is rich but     │ │
│ │ not overpowering. Perfect for special occasions.    │ │
│ │                                                     │ │
│ │ [Image] [Image]                                     │ │
│ │                                                     │ │
│ │ 👍 45 found helpful                                 │ │
│ │                                                     │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ Your Reply:                                     │ │ │
│ │ │ [_________________________________________]     │ │ │
│ │ │                                                 │ │ │
│ │ │ [Post Reply]                                    │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Amber Wood EDT                   ★★★★☆       │ │
│ │                                                     │ │
│ │ Ahmed K.  •  Dec 15, 2025                           │ │
│ │                                                     │ │
│ │ "Good value for money"                              │ │
│ │ Nice scent but doesn't last as long as I hoped...  │ │
│ │                                                     │ │
│ │ ✓ You replied on Dec 16:                            │ │
│ │   "Thank you for your feedback! Try applying to    │ │
│ │    pulse points for better longevity."              │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 4.5 Brand Profile Settings

```
┌─────────────────────────────────────────────────────────┐
│ BRAND PROFILE                                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ BRAND IDENTITY                                          │
│                                                         │
│ Brand Logo:                                             │
│ ┌──────┐                                                │
│ │ [IMG]│  [Change Logo] (Max 2MB, PNG/JPG, 500x500px)  │
│ └──────┘                                                │
│                                                         │
│ Brand Cover Image:                                      │
│ [Large banner image]  [Change Cover]                    │
│ (Recommended: 1920x600px)                               │
│                                                         │
│ Brand Name:                                             │
│ [Swiss Arabian Perfumes]                                │
│                                                         │
│ Tagline:                                                │
│ [Luxury fragrances since 1974]                          │
│                                                         │
│ BRAND STORY                                             │
│                                                         │
│ Short Description (English):                            │
│ [Brief intro, 50-100 words...]                          │
│                                                         │
│ Full Brand Story (English):                             │
│ ┌───────────────────────────────────────────────────┐   │
│ │ Founded in 1974 in Dubai, Swiss Arabian has...   │   │
│ │ [Rich text editor]                                │   │
│ └───────────────────────────────────────────────────┘   │
│                                                         │
│ Brand Story (Arabic):                                   │
│ [Similar editor in Arabic]                              │
│                                                         │
│ BRAND VIDEO (Optional)                                  │
│ Upload brand story video:                               │
│ [Upload Video] or YouTube URL: [_______________]        │
│                                                         │
│ CONTACT INFORMATION                                     │
│                                                         │
│ WhatsApp Number:                                        │
│ [+971 50 123 4567]                                      │
│                                                         │
│ Email:                                                  │
│ [contact@swissarabian.ae]                               │
│                                                         │
│ Instagram:                                              │
│ [https://instagram.com/swissarabian]                    │
│                                                         │
│ TikTok:                                                 │
│ [https://tiktok.com/@swissarabian]                      │
│                                                         │
│ Website:                                                │
│ [https://swissarabian.com]                              │
│                                                         │
│ [Save Changes]                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Admin-Side Features

### 5.1 Admin Dashboard

```
┌─────────────────────────────────────────────────────────┐
│ ADMIN DASHBOARD                         [Admin] [Logout] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │ Revenue  │ │ Orders   │ │Customers │ │ Vendors  │   │
│ │ (Month)  │ │          │ │          │ │          │   │
│ │ 245,680  │ │  1,234   │ │  4,567   │ │    45    │   │
│ │   AED    │ │ 45 Pend. │ │ 123 New  │ │ 5 Pend.  │   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│ │ Products │ │ Reviews  │ │Commission│                │
│ │          │ │          │ │  Earned  │                │
│ │  1,234   │ │  2,456   │ │ 24,568   │                │
│ │ 23 Pend. │ │ 12 Flag. │ │   AED    │                │
│ └──────────┘ └──────────┘ └──────────┘                │
│                                                         │
│ REVENUE CHART (This Month)                              │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Line graph showing daily revenue]                  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ RECENT ACTIVITY                                         │
│ • New vendor registration: "Luxury Scents LLC"          │
│ • Product pending approval: "Midnight Oud EDP"          │
│ • Flagged review on "Oud Royale"                        │
│ • Low stock alert: 12 products below threshold          │
│                                                         │
│ QUICK ACTIONS                                           │
│ [Approve Vendors] [Review Products] [Moderate Reviews]  │
└─────────────────────────────────────────────────────────┘
```

---

### 5.2 Vendor Management

```
┌─────────────────────────────────────────────────────────┐
│ VENDOR MANAGEMENT                                       │
├─────────────────────────────────────────────────────────┤
│ [All] [Active] [Pending Approval] [Suspended]          │
│                                                         │
│ Search: [Vendor name, email...]                         │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Swiss Arabian Perfumes              Status: Active  │ │
│ │ contact@swissarabian.ae                             │ │
│ │                                                     │ │
│ │ Joined: Jan 15, 2025                                │ │
│ │ Products: 89  |  Sales: 45,230 AED                  │ │
│ │ Rating: ★★★★★ 4.7                                   │ │
│ │                                                     │ │
│ │ [View Details] [View Products] [Suspend] [Delete]  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Luxury Scents LLC              Status: ⏳ Pending   │ │
│ │ info@luxuryscents.ae                                │ │
│ │                                                     │ │
│ │ Applied: Dec 20, 2025                               │ │
│ │ Documents: ✓ Trade License, ✓ Tax Certificate      │ │
│ │                                                     │ │
│ │ [Review Application] [Approve] [Reject]             │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 5.3 Product Moderation

```
┌─────────────────────────────────────────────────────────┐
│ PRODUCT MODERATION                                      │
├─────────────────────────────────────────────────────────┤
│ [All Products] [Pending Approval] [Flagged] [Active]   │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [IMG] Midnight Oud EDP              ⏳ Pending      │ │
│ │       By: Luxury Scents LLC                         │ │
│ │       Category: Perfumes > Oriental                 │ │
│ │       Price: 950 AED                                │ │
│ │       Stock: 25                                     │ │
│ │       Submitted: Dec 21, 2025                       │ │
│ │                                                     │ │
│ │ [View Full Details]                                 │ │
│ │                                                     │ │
│ │ ✓ Product info complete                             │ │
│ │ ✓ Images uploaded (6)                               │ │
│ │ ✓ Pricing set                                       │ │
│ │ ⚠ Missing scent profile                             │ │
│ │                                                     │ │
│ │ [Approve] [Request Changes] [Reject]                │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 5.4 Review Moderation

```
┌─────────────────────────────────────────────────────────┐
│ REVIEW MODERATION                                       │
├─────────────────────────────────────────────────────────┤
│ [All Reviews] [Flagged] [Hidden]                        │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🚩 FLAGGED REVIEW                                   │ │
│ │                                                     │ │
│ │ [IMG] Oud Royale EDP                   ★☆☆☆☆       │ │
│ │                                                     │ │
│ │ User123  •  Dec 22, 2025                            │ │
│ │                                                     │ │
│ │ "Terrible product, fake smell..."                   │ │
│ │ [Potentially inappropriate language]                │ │
│ │                                                     │ │
│ │ Flagged by: 3 users                                 │ │
│ │ Reason: Spam / Inappropriate                        │ │
│ │                                                     │ │
│ │ [Keep Published] [Hide Review] [Delete Review]     │ │
│ │ [Ban User]                                          │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 5.5 Settings

```
┌─────────────────────────────────────────────────────────┐
│ SETTINGS                                                │
├─────────────────────────────────────────────────────────┤
│ [General] [Payment] [Shipping] [Email] [Coins]         │
│                                                         │
│ GENERAL SETTINGS                                        │
│                                                         │
│ Site Name:                                              │
│ [AromaSouq]                                             │
│                                                         │
│ Site Tagline:                                           │
│ [Your Luxury Fragrance Destination]                     │
│                                                         │
│ Default Currency:                                       │
│ [AED ▾]                                                 │
│                                                         │
│ Default Language:                                       │
│ [English ▾]                                             │
│                                                         │
│ Timezone:                                               │
│ [Asia/Dubai ▾]                                          │
│                                                         │
│ Contact Email:                                          │
│ [support@aromasouq.com]                                 │
│                                                         │
│ WhatsApp Support Number:                                │
│ [+971 50 123 4567]                                      │
│                                                         │
│ Free Shipping Threshold:                                │
│ [500______] AED                                         │
│                                                         │
│ [Save Settings]                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Complete Page Map

### Total Pages: 22

#### Public Pages (5)
```
1. /                           Homepage
2. /products                   Product Listing
3. /products/:slug             Product Detail
4. /vendors/:slug              Vendor Brand Page
5. /about                      About Us
```

#### Customer Pages (8)
```
6. /auth/login                 Login
7. /auth/register              Register
8. /cart                       Shopping Cart
9. /checkout                   Checkout (multi-step)
10. /order-success             Order Confirmation
11. /account                   Account Dashboard
12. /account/orders            Order History
13. /account/orders/:id        Order Detail
14. /account/wishlist          Wishlist
15. /account/wallet            Wallet & Coins
16. /account/reviews           My Reviews
17. /account/profile           Profile Settings
18. /account/addresses         Saved Addresses
```

#### Vendor Pages (5)
```
19. /vendor                    Vendor Dashboard
20. /vendor/products           Products Management
21. /vendor/products/new       Add Product
22. /vendor/products/:id/edit  Edit Product
23. /vendor/orders             Orders Management
24. /vendor/orders/:id         Order Detail
25. /vendor/reviews            Reviews Management
26. /vendor/profile            Brand Profile Settings
```

#### Admin Pages (4)
```
27. /admin                     Admin Dashboard
28. /admin/vendors             Vendor Management
29. /admin/products            Product Moderation
30. /admin/reviews             Review Moderation
31. /admin/settings            Platform Settings
```

---

## 7. Backend API Specification

### Total Endpoints: ~58

---

### 7.1 Authentication (4)
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
```

---

### 7.2 Users (4)
```
GET    /api/v1/users/me
PUT    /api/v1/users/me
PUT    /api/v1/users/me/password
GET    /api/v1/users/me/addresses
POST   /api/v1/users/me/addresses
PUT    /api/v1/users/me/addresses/:id
DELETE /api/v1/users/me/addresses/:id
```

---

### 7.3 Categories (2)
```
GET    /api/v1/categories
GET    /api/v1/categories/:id
```

---

### 7.4 Products (11)
```
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
GET    /api/v1/products/:id/images
POST   /api/v1/products/:id/images
DELETE /api/v1/images/:id
GET    /api/v1/products/:id/videos
POST   /api/v1/products/:id/videos
DELETE /api/v1/videos/:id
GET    /api/v1/products/:id/related
```

---

### 7.5 Search (2)
```
GET    /api/v1/search/autocomplete?q={query}
GET    /api/v1/search?q={query}&type={type}
```

---

### 7.6 Reviews (7)
```
POST   /api/v1/reviews
GET    /api/v1/products/:id/reviews
PUT    /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
POST   /api/v1/reviews/:id/vote
POST   /api/v1/reviews/:id/reply
GET    /api/v1/vendor/reviews
```

---

### 7.7 Wishlist (4)
```
GET    /api/v1/wishlist
POST   /api/v1/wishlist
DELETE /api/v1/wishlist/:productId
DELETE /api/v1/wishlist
```

---

### 7.8 Wallet & Coins (3)
```
GET    /api/v1/wallet
GET    /api/v1/wallet/transactions
POST   /api/v1/wallet/earn (internal)
```

---

### 7.9 Cart (5)
```
GET    /api/v1/cart
POST   /api/v1/cart/items
PUT    /api/v1/cart/items/:id
DELETE /api/v1/cart/items/:id
DELETE /api/v1/cart
```

---

### 7.10 Checkout & Orders (7)
```
POST   /api/v1/checkout/validate
POST   /api/v1/checkout/create-order
POST   /api/v1/checkout/quick
GET    /api/v1/orders
GET    /api/v1/orders/:id
PUT    /api/v1/orders/:id/status
POST   /api/v1/orders/:id/cancel
```

---

### 7.11 Payments (2)
```
POST   /api/v1/payments/create-intent
POST   /api/v1/payments/webhook
```

---

### 7.12 Vendors (5)
```
GET    /api/v1/vendor/dashboard
GET    /api/v1/vendor/products
GET    /api/v1/vendor/orders
PUT    /api/v1/vendor/profile
GET    /api/v1/vendors/:id (public profile)
```

---

### 7.13 Admin (8)
```
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/vendors
PUT    /api/v1/admin/vendors/:id/approve
GET    /api/v1/admin/products
PUT    /api/v1/admin/products/:id/approve
GET    /api/v1/admin/reviews
PUT    /api/v1/admin/reviews/:id
GET    /api/v1/admin/settings
PUT    /api/v1/admin/settings
```

---

## 8. Database Schema

### Total Tables: 18

---

### Core Tables

**User**
```typescript
{
  id: UUID (PK)
  email: string (unique)
  passwordHash: string
  firstName: string
  lastName: string
  phone: string
  role: enum (customer, vendor, admin)
  status: enum (active, suspended, deleted)
  emailVerified: boolean
  preferredLanguage: enum (en, ar)
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

**Vendor**
```typescript
{
  id: UUID (PK)
  userId: UUID (FK → User)
  businessName: string
  legalName: string
  taxId: string
  licenseNumber: string
  licenseDocument: string

  // Branding
  logo: string
  coverImage: string
  tagline_en: string
  tagline_ar: string
  shortDescription_en: text
  shortDescription_ar: text
  brandStory_en: text
  brandStory_ar: text
  brandVideo: string

  // Contact
  email: string
  phone: string
  whatsappNumber: string
  instagramUrl: string
  tiktokUrl: string
  websiteUrl: string

  // Status
  status: enum (pending, approved, active, suspended)
  approvedAt: timestamp
  approvedBy: UUID (FK → User)

  createdAt: timestamp
  updatedAt: timestamp
}
```

---

**Category**
```typescript
{
  id: UUID (PK)
  name_en: string
  name_ar: string
  slug: string (unique)
  description_en: text
  description_ar: text
  image: string
  parentId: UUID (FK, nullable)
  order: int
  isActive: boolean
  createdAt: timestamp
}
```

---

**Product**
```typescript
{
  id: UUID (PK)
  vendorId: UUID (FK → Vendor)
  categoryId: UUID (FK → Category)

  // Basic Info
  name_en: string
  name_ar: string
  slug: string (unique)
  sku: string (unique)
  description_en: text
  description_ar: text
  tags: json (array)

  // Pricing
  regularPrice: decimal
  salePrice: decimal (nullable)
  costPrice: decimal

  // Inventory
  stockQuantity: int
  lowStockThreshold: int
  allowBackorders: boolean
  stockStatus: enum (in_stock, out_of_stock, pre_order)

  // Scent Profile (for perfumes)
  scentFamily: string
  topNotes: json (array)
  heartNotes: json (array)
  baseNotes: json (array)
  longevity: int (hours)
  sillage: int (1-5)
  season: json (array)
  gender: enum (male, female, unisex)

  // Shipping
  weight: decimal
  dimensions: string

  // Settings
  enableWhatsApp: boolean
  whatsappNumber: string
  enableReviews: boolean
  coinsToAward: int

  // Status
  status: enum (draft, pending, approved, active, rejected)
  approvedAt: timestamp

  // Stats (denormalized for performance)
  viewCount: int
  salesCount: int
  avgRating: decimal
  reviewCount: int

  createdAt: timestamp
  updatedAt: timestamp
}
```

---

**ProductImage**
```typescript
{
  id: UUID (PK)
  productId: UUID (FK → Product)
  url: string
  altText: string
  position: int
  isFeatured: boolean
  createdAt: timestamp
}
```

---

**ProductVideo**
```typescript
{
  id: UUID (PK)
  productId: UUID (FK → Product)
  url: string
  thumbnailUrl: string
  duration: int (seconds)
  position: int
  createdAt: timestamp
}
```

---

**ProductVariant**
```typescript
{
  id: UUID (PK)
  productId: UUID (FK → Product)
  name: string (e.g., "100ml")
  sku: string (unique)
  price: decimal
  stockQuantity: int
  isActive: boolean
}
```

---

**Review**
```typescript
{
  id: UUID (PK)
  productId: UUID (FK → Product)
  userId: UUID (FK → User)
  orderId: UUID (FK → Order, nullable)

  rating: int (1-5)
  title: string
  comment: text

  isVerifiedPurchase: boolean
  helpfulCount: int
  notHelpfulCount: int

  vendorReply: text (nullable)
  vendorRepliedAt: timestamp

  status: enum (published, hidden, flagged)

  createdAt: timestamp
  updatedAt: timestamp
}
```

---

**ReviewImage**
```typescript
{
  id: UUID (PK)
  reviewId: UUID (FK → Review)
  url: string
  position: int
}
```

---

**ReviewVote**
```typescript
{
  reviewId: UUID (FK → Review)
  userId: UUID (FK → User)
  voteType: enum (helpful, not_helpful)
  createdAt: timestamp

  PRIMARY KEY (reviewId, userId)
}
```

---

**Wishlist**
```typescript
{
  userId: UUID (FK → User)
  productId: UUID (FK → Product)
  addedAt: timestamp

  PRIMARY KEY (userId, productId)
}
```

---

**Wallet**
```typescript
{
  userId: UUID (PK, FK → User)
  coinsBalance: int
  lifetimeCoinsEarned: int
  lifetimeCoinsRedeemed: int
  updatedAt: timestamp
}
```

---

**CoinTransaction**
```typescript
{
  id: UUID (PK)
  userId: UUID (FK → User)

  type: enum (earned, redeemed, expired, adjusted)
  amount: int (can be negative)
  balance: int (after transaction)

  source: enum (order, signup, first_order, review, referral, admin)
  sourceId: UUID (nullable - orderId, reviewId, etc.)
  description: string

  createdAt: timestamp
}
```

---

**Cart**
```typescript
{
  id: UUID (PK)
  userId: UUID (FK → User, nullable for guest)
  sessionId: string (for guests)
  updatedAt: timestamp
}
```

---

**CartItem**
```typescript
{
  id: UUID (PK)
  cartId: UUID (FK → Cart)
  productId: UUID (FK → Product)
  variantId: UUID (FK → ProductVariant, nullable)
  quantity: int
  addedAt: timestamp
}
```

---

**Order**
```typescript
{
  id: UUID (PK)
  orderNumber: string (unique, e.g., ARO-2025-00234)
  userId: UUID (FK → User)
  vendorId: UUID (FK → Vendor)

  // Amounts
  subtotal: decimal
  shippingCost: decimal
  taxAmount: decimal
  discountAmount: decimal
  total: decimal

  // Shipping
  shippingAddress: json (snapshot)
  shippingMethod: string
  estimatedDelivery: date
  trackingNumber: string
  carrier: string

  // Payment
  paymentMethod: enum (card, cod, apple_pay, google_pay)
  paymentStatus: enum (pending, paid, failed, refunded)
  paymentIntentId: string

  // Status
  status: enum (pending, confirmed, processing, shipped, delivered, cancelled)
  cancelReason: text

  // Coins
  coinsEarned: int
  coinsAwarded: boolean

  // Notes
  customerNotes: text

  // Timestamps
  createdAt: timestamp
  confirmedAt: timestamp
  shippedAt: timestamp
  deliveredAt: timestamp
  cancelledAt: timestamp
}
```

---

**OrderItem**
```typescript
{
  id: UUID (PK)
  orderId: UUID (FK → Order)
  productId: UUID (FK → Product)
  variantId: UUID (FK → ProductVariant, nullable)

  // Snapshot data (in case product changes)
  productName: string
  productImage: string
  sku: string

  quantity: int
  unitPrice: decimal
  total: decimal
  coinsEarned: int
}
```

---

**Address**
```typescript
{
  id: UUID (PK)
  userId: UUID (FK → User)
  fullName: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  emirate: string
  country: string
  zipCode: string
  addressType: enum (home, office)
  isDefault: boolean
  createdAt: timestamp
}
```

---

## 9. Technical Implementation Plan

### Tech Stack

**Frontend (Web)**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion (animations)
- Zustand (state management)
- React Query (server state)
- next-i18next (translations)

**Backend**
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Redis (caching)

**Media & Storage**
- Supabase Storage
- Cloudflare CDN

**Payments**
- Stripe

**Email**
- SendGrid / AWS SES

**Hosting**
- Vercel (frontend)
- DigitalOcean / Render (backend)
- Supabase (database)

---

### Implementation Timeline: 8-10 Weeks

#### Week 1-2: Foundation
```
Backend:
✓ Supabase project setup
✓ Prisma schema design
✓ Authentication system (JWT)
✓ User roles & permissions
✓ Basic CRUD for users

Frontend:
✓ Next.js project setup
✓ Tailwind + Shadcn UI
✓ Design system implementation
✓ Layout components (Header, Footer)
✓ Auth pages (Login, Register)
✓ Bilingual setup (EN/AR)
```

---

#### Week 3: Product Catalog
```
Backend:
✓ Category CRUD
✓ Product CRUD
✓ Image upload (Supabase Storage)
✓ Video upload
✓ Product search & filters

Frontend:
✓ Homepage
✓ Product listing page
✓ Product detail page
✓ Search bar with autocomplete
✓ Category pages
```

---

#### Week 4: Enhanced Product Features
```
Backend:
✓ Related products algorithm
✓ Product variants
✓ Scent profile data

Frontend:
✓ Video upload & display
✓ Quick view modal
✓ Scent pyramid visualization
✓ Vendor brand pages
✓ WhatsApp integration
```

---

#### Week 5: Shopping & Engagement
```
Backend:
✓ Cart CRUD
✓ Wishlist CRUD
✓ Checkout validation
✓ Order creation

Frontend:
✓ Shopping cart
✓ Wishlist
✓ Checkout (multi-step)
✓ Buy now / Quick checkout
✓ Order success page
```

---

#### Week 6: Reviews & Social Proof
```
Backend:
✓ Review CRUD
✓ Review voting
✓ Vendor replies
✓ Review moderation

Frontend:
✓ Review submission
✓ Review display
✓ Star ratings
✓ Social proof badges
✓ Review photos
```

---

#### Week 7: Coins & Payments
```
Backend:
✓ Wallet system
✓ Coin transactions
✓ Coin award logic
✓ Stripe integration
✓ Payment webhooks

Frontend:
✓ Wallet page
✓ Coin display
✓ Payment forms
✓ Order tracking
```

---

#### Week 8: Dashboards
```
Backend:
✓ Vendor dashboard APIs
✓ Admin dashboard APIs
✓ Order management
✓ Analytics endpoints

Frontend:
✓ Vendor dashboard
✓ Product management (vendor)
✓ Order management (vendor)
✓ Review management (vendor)
✓ Admin dashboard
✓ Vendor approval (admin)
✓ Product moderation (admin)
```

---

#### Week 9-10: Polish & Launch
```
Backend:
✓ Email notifications
✓ Performance optimization
✓ Error handling
✓ API rate limiting
✓ Security hardening

Frontend:
✓ Smooth animations (Framer Motion)
✓ Loading states & skeletons
✓ Error handling
✓ Mobile responsive (all pages)
✓ RTL support (Arabic)
✓ SEO optimization
✓ Accessibility (A11y)
✓ Performance optimization
✓ Testing & bug fixes

DevOps:
✓ Production deployment
✓ Environment variables
✓ CDN setup
✓ SSL certificates
✓ Monitoring & logging

🚀 LAUNCH!
```

---

## 10. Conclusion

### What You're Building

**AromaSouq MVP v2** is a focused, polished fragrance marketplace that includes:

✅ **Core E-commerce**
- Product catalog with categories
- Shopping cart & checkout
- Order management
- Stripe payments

✅ **User Engagement**
- Reviews & ratings system
- Wishlist functionality
- Coins system (earn on purchases)
- Related products

✅ **Modern Features**
- Product videos/reels
- Quick view modal
- Buy now / Quick checkout
- Smart search with autocomplete
- WhatsApp quick contact
- Social proof badges

✅ **Vendor Tools**
- Product management (with videos)
- Order management
- Review management
- Brand profile pages

✅ **Admin Controls**
- Vendor approval
- Product moderation
- Review moderation
- Platform settings

✅ **Local Market Fit**
- Bilingual (English + Arabic with RTL)
- AED currency
- UAE shipping focus
- WhatsApp integration

✅ **Premium UX**
- Smooth animations (Framer Motion)
- Scent pyramid visualization
- Video thumbnails on cards
- Touch of OUD aesthetic

---

### Why This MVP Works

**Realistic Scope:** 8-10 weeks with 1-2 developers

**Essential Features Only:** No social feed, no B2B leads, no AI builder, no mobile app

**Investor Ready:** Modern UI, engagement features, working product

**Market Fit:** UAE-focused, fragrance-specific, WhatsApp commerce

---

### Success Metrics (Month 1)

**Vendors:** 15-25 onboarded
**Products:** 150-300 listed
**Orders:** 30-50 placed
**Reviews:** 50+ submitted
**Users:** 100+ registered

---

### Post-MVP Features (Phase 2)

**Deferred to Later:**
- Coins redemption
- Community/social feed
- B2B wholesale system
- AI recommendations
- Mobile app (React Native)
- Advanced analytics
- Influencer program
- AR features
- Voice search

---

## Ready to Build!

This specification provides everything needed to build AromaSouq MVP v2:

✓ Complete feature descriptions
✓ Detailed UI mockups
✓ Full API specifications
✓ Complete database schema
✓ Week-by-week implementation plan
✓ Design system guidelines

**Start with Week 1 and build incrementally!** 🚀

---

**Document Version:** 2.0
**Last Updated:** October 25, 2025
**Status:** ✅ Ready for Development
