# AromaSouq - Enhanced MVP Specification (Final)

**Version:** 2.0 (Enhanced)  
**Date:** October 25, 2025  
**Purpose:** Define the ENHANCED MVP with strategic features + wow factors  
**Timeline:** 8-10 weeks (realistic with added features)  
**Team:** 1-2 developers

---

## 🎯 What Changed from Basic MVP

### **Added Features (Per Your Request):**
```
✅ Reviews & Ratings system
✅ Related Products (algorithm-based)
✅ Wishlist functionality
✅ Video/Reels on products
✅ Buy Now / Quick Checkout
✅ Coins system (earn only, redeem later)
```

### **Added Wow Factors (Strategic):**
```
✅ WhatsApp Quick Contact (instant vendor chat)
✅ Smart Search with autocomplete
✅ Quick View modal (product preview)
✅ Video thumbnails on product cards
✅ Social proof badges ("12 sold today")
✅ Vendor brand stories
✅ Smooth animations (Framer Motion)
✅ Personalized homepage sections
✅ Arabic-first bilingual experience
✅ Scent notes visual wheel
```

---

## 📊 Enhanced MVP Summary

### **Updated Metrics:**

```
Timeline:        8-10 weeks (was 6-8)
Team Size:       1-2 developers
Total Pages:     18-22 pages (was 12-15)
API Endpoints:   50-60 endpoints (was 35-40)
Database Tables: 16 tables (was 12)
Complexity:      Enhanced marketplace with engagement features
```

### **Launch Goals:**

1. ✅ Functional e-commerce with polish
2. ✅ User engagement features (reviews, wishlist, coins)
3. ✅ Vendor differentiation (videos, stories)
4. ✅ Instant communication (WhatsApp)
5. ✅ "Wow" user experience
6. ✅ Investor-ready presentation

---

## ✅ CORE FEATURES (From Basic MVP)

**These remain unchanged from the basic MVP:**

### 1. Authentication & Users
- Email + password login/register
- Three roles (customer, vendor, admin)
- Basic profile management
- Password reset

### 2. Basic Product Catalog
- Product CRUD
- Categories
- Images upload
- Stock management
- Active/inactive status

### 3. Basic Shopping Flow
- Shopping cart
- Cart persistence
- Checkout form
- Stripe payment
- Order creation

### 4. Order Management
- Order history (customer)
- Order management (vendor)
- Status updates
- Basic order tracking

### 5. Vendor Dashboard
- Product management
- Order management
- Basic stats

### 6. Admin Panel
- Vendor approval
- Product oversight
- Order management
- Category management

---

## ⭐ ENHANCED FEATURES (New Additions)

### **1. Reviews & Ratings System**

**Why This Impresses:**
- **Customers:** Build trust, make informed decisions
- **Vendors:** Social proof, improve products
- **Investors:** User-generated content, engagement

**What to Build:**

#### Product Reviews
```
✅ Star rating (1-5 stars)
✅ Written review (text)
✅ Review photos (up to 3 images)
✅ Verified purchase badge
✅ Review date
✅ Helpful/not helpful votes
✅ Vendor can reply to reviews
```

#### Review Display
```
✅ Average rating on product card (4.5★ 24 reviews)
✅ Rating distribution (5★: 60%, 4★: 30%, etc.)
✅ Reviews section on product detail page
✅ Sort by: Most recent, Most helpful, Highest/Lowest rating
✅ Filter by: Star rating, Verified purchase
```

#### Review Submission
```
✅ Customer can review after delivery
✅ One review per product per customer
✅ Edit review within 7 days
✅ Email notification to vendor on new review
```

**Database Tables:**
```sql
Review {
  id, userId, productId, orderId
  rating (1-5)
  title (short summary)
  comment (detailed review)
  isVerifiedPurchase (boolean)
  helpfulCount, notHelpfulCount
  vendorReply (text, nullable)
  vendorRepliedAt (timestamp)
  status (published, hidden, flagged)
  createdAt, updatedAt
}

ReviewImage {
  id, reviewId
  url (Supabase Storage)
  position
}

ReviewVote {
  reviewId, userId
  voteType (helpful, not_helpful)
  createdAt
  PRIMARY KEY (reviewId, userId)
}
```

**API Endpoints:**
```
POST   /reviews                      # Submit review
GET    /products/:id/reviews         # Get product reviews
PUT    /reviews/:id                  # Edit review
DELETE /reviews/:id                  # Delete review
POST   /reviews/:id/vote             # Vote helpful/not
POST   /reviews/:id/reply            # Vendor reply
GET    /vendor/reviews               # Vendor's product reviews
```

---

### **2. Wishlist**

**Why This Impresses:**
- **Customers:** Save products, return later
- **Vendors:** Track customer interest
- **Investors:** Increased conversion, engagement metric

**What to Build:**

```
✅ Heart icon on product cards
✅ Add/remove from wishlist (one click)
✅ Wishlist page (grid view)
✅ "Move to cart" button
✅ Share wishlist (link)
✅ Wishlist count in header
✅ Email notifications (price drop, back in stock)
```

**User Experience:**
```
- Click heart → Animates and fills with color
- Tooltip: "Added to wishlist"
- Persists across sessions
- Works for logged-in users only (prompt login if guest)
- Wishlist badge in header shows count
```

**Database Table:**
```sql
Wishlist {
  userId, productId
  addedAt
  notifyOnPriceDown (boolean)
  notifyOnStock (boolean)
  PRIMARY KEY (userId, productId)
}
```

**API Endpoints:**
```
GET    /wishlist                     # Get my wishlist
POST   /wishlist                     # Add item
DELETE /wishlist/:productId          # Remove item
POST   /wishlist/bulk                # Add multiple
DELETE /wishlist                     # Clear all
```

---

### **3. Related Products**

**Why This Impresses:**
- **Customers:** Discover more products
- **Vendors:** Cross-selling, increased sales
- **Investors:** Higher average order value

**What to Build:**

```
✅ "You May Also Like" section on product page
✅ Show 4-6 related products
✅ Algorithm-based recommendations:
   - Same category
   - Same vendor
   - Similar price range
   - Same scent family (if available)
✅ Horizontal scroll on mobile
```

**Algorithm (Simple for MVP):**
```typescript
// Scoring system
1. Same category: +3 points
2. Same vendor: +2 points
3. Price within 20%: +2 points
4. Same tags: +1 point each
5. Sort by score, then by popularity
6. Return top 6 products
```

**API Endpoint:**
```
GET    /products/:id/related        # Get related products
```

---

### **4. Product Videos/Reels**

**Why This Impresses:**
- **Customers:** See product in action, build confidence
- **Vendors:** Showcase product better
- **Investors:** Modern shopping experience, higher conversion

**What to Build:**

#### Video Upload
```
✅ Vendors can upload short videos (max 60 seconds)
✅ Supported formats: MP4, MOV
✅ Max size: 50MB
✅ Uploaded to Supabase Storage
✅ Thumbnail auto-generated
✅ Multiple videos per product (up to 3)
```

#### Video Display
```
✅ Video thumbnail on product card (play icon overlay)
✅ Click thumbnail → plays video in modal or inline
✅ Video carousel on product detail page
✅ Mute/unmute control
✅ Full-screen option
```

**Database Table:**
```sql
ProductVideo {
  id, productId
  videoUrl (Supabase Storage)
  thumbnailUrl (auto-generated)
  duration (seconds)
  position (order)
  createdAt
}
```

**API Endpoints:**
```
POST   /products/:id/videos          # Upload video
GET    /products/:id/videos          # Get videos
DELETE /videos/:id                   # Delete video
```

**Implementation:**
```typescript
// Use HTML5 video player
<video 
  controls 
  poster={thumbnailUrl}
  className="w-full rounded-lg"
>
  <source src={videoUrl} type="video/mp4" />
</video>

// Or use react-player for better controls
import ReactPlayer from 'react-player'
<ReactPlayer 
  url={videoUrl} 
  controls 
  light={thumbnailUrl}
  width="100%"
  height="auto"
/>
```

---

### **5. Buy Now / Quick Checkout**

**Why This Impresses:**
- **Customers:** Faster purchase (fewer steps)
- **Vendors:** Higher conversion (reduce abandonment)
- **Investors:** Optimized checkout flow

**What to Build:**

```
✅ "Buy Now" button on product detail page
✅ Skips cart, goes directly to checkout
✅ Pre-fills checkout form with last used address
✅ One-click purchase for returning customers
✅ Works with single product only
```

**User Flow:**
```
1. User clicks "Buy Now" on product page
2. → Redirects to checkout with this product
3. → Address form (pre-filled if has previous order)
4. → Apply coupon (optional)
5. → Payment method (Stripe)
6. → Place order
7. → Order confirmation
```

**Implementation:**
```typescript
// Buy Now button
<button onClick={() => handleBuyNow(product)}>
  Buy Now
</button>

// Handler
const handleBuyNow = async (product) => {
  // Create temporary cart with single item
  const tempCart = {
    items: [{ productId: product.id, quantity: 1 }]
  };
  
  // Store in session/local storage
  sessionStorage.setItem('quickCheckout', JSON.stringify(tempCart));
  
  // Redirect to checkout
  router.push('/checkout?mode=quick');
};
```

**API Endpoint:**
```
POST   /checkout/quick              # Quick checkout for single product
```

---

### **6. Coins System (Earn Only)**

**Why This Impresses:**
- **Customers:** Rewarded for purchases
- **Vendors:** Incentive for repeat purchases
- **Investors:** Loyalty mechanism, customer retention

**What to Build:**

#### Earn Coins
```
✅ Earn 1 coin per 10 AED spent
✅ Earn 50 coins on signup (welcome bonus)
✅ Earn 100 coins on first purchase
✅ Earn 20 coins per review submitted
✅ Coins display in user profile
✅ Coins history (earned transactions)
```

#### Display Coins
```
✅ Coins balance in header (when logged in)
✅ "Earn X coins" badge on product cards
✅ Coins earned shown on order confirmation
✅ Coins wallet page (balance + history)
```

#### Redemption (Future)
```
⏳ Redeem coins for discounts (coming soon)
⏳ Show "100 coins = 10 AED" conversion
⏳ Minimum redemption: 500 coins
```

**Database Tables:**
```sql
Wallet {
  userId (PK)
  coinsBalance (int)
  lifetimeCoinsEarned (int)
  updatedAt
}

CoinTransaction {
  id, userId
  type (earned, redeemed, expired, adjusted)
  amount (int, can be negative)
  balance (after transaction)
  source (order, signup, review, referral, admin)
  sourceId (orderId, reviewId, etc.)
  description (text)
  createdAt
}
```

**API Endpoints:**
```
GET    /wallet                      # Get my wallet
GET    /wallet/transactions         # Transaction history
POST   /wallet/earn                 # Award coins (internal)
```

**Calculation Logic:**
```typescript
// On order completion
const coinsEarned = Math.floor(order.total / 10);
await awardCoins(userId, coinsEarned, 'order', orderId);

// On signup
await awardCoins(userId, 50, 'signup', null);

// On first purchase
if (isFirstPurchase) {
  await awardCoins(userId, 100, 'first_order', orderId);
}

// On review submission
await awardCoins(userId, 20, 'review', reviewId);
```

---

## 🌟 WOW FACTORS (Strategic Additions)

### **Wow Factor 1: WhatsApp Quick Contact**

**Why This Impresses:**
- **Customers:** Instant support, familiar platform
- **Vendors:** Direct customer communication, build relationships
- **Investors:** High engagement, UAE market fit (WhatsApp is #1)

**What to Build:**

```
✅ WhatsApp button on product page
✅ Pre-filled message with product details
✅ Routes to vendor's WhatsApp number
✅ Click → Opens WhatsApp (app or web)
✅ Track WhatsApp clicks (analytics)
```

**Implementation:**
```typescript
// WhatsApp component
const WhatsAppButton = ({ product, vendor }) => {
  const message = encodeURIComponent(
    `Hi ${vendor.brandName}, I'm interested in ${product.name} (${product.price} AED).\n\n` +
    `Product link: ${window.location.href}`
  );
  
  const whatsappUrl = `https://wa.me/${vendor.whatsappNumber}?text=${message}`;
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      <WhatsAppIcon />
      Chat on WhatsApp
    </a>
  );
};
```

**Vendor Setup:**
```
- Vendor adds WhatsApp number in profile
- Validates format: +971XXXXXXXXX
- Shows on product pages
```

---

### **Wow Factor 2: Smart Search with Autocomplete**

**Why This Impresses:**
- **Customers:** Find products faster
- **Vendors:** Products get discovered
- **Investors:** Modern UX, reduced bounce rate

**What to Build:**

```
✅ Search bar in header (prominent)
✅ Autocomplete dropdown as you type
✅ Shows suggestions:
   - Products (with image, price)
   - Categories
   - Brands
✅ Search history (recent searches)
✅ Trending searches
✅ "No results" with suggestions
✅ Works in English and Arabic
```

**User Experience:**
```
1. User types "oud"
2. → Dropdown appears after 2 characters
3. → Shows:
   - Products matching "oud" (top 5)
   - Category: "Oud" (if exists)
   - Brands with "oud" in name
4. → User clicks suggestion or presses Enter
5. → Goes to results page or product directly
```

**API Endpoints:**
```
GET    /search/autocomplete?q=oud   # Get suggestions
GET    /search?q=oud&type=products  # Full search results
```

**Implementation:**
```typescript
// Use debounced search
import { useDebouncedValue } from '@/hooks/useDebounce';

const [query, setQuery] = useState('');
const debouncedQuery = useDebouncedValue(query, 300);

// Fetch suggestions
const { data: suggestions } = useQuery(
  ['autocomplete', debouncedQuery],
  () => fetchAutocomplete(debouncedQuery),
  { enabled: debouncedQuery.length >= 2 }
);
```

---

### **Wow Factor 3: Quick View Modal**

**Why This Impresses:**
- **Customers:** Preview product without leaving page
- **Vendors:** Lower friction, higher views
- **Investors:** Reduced bounce rate, better engagement

**What to Build:**

```
✅ "Quick View" icon on product cards (eye icon)
✅ Click → Opens modal overlay
✅ Modal shows:
   - Product images (swipeable)
   - Name, price, rating
   - Short description (first 100 words)
   - Size selector (if variants exist)
   - Add to cart button
   - View full details link
✅ Smooth animation (fade in + scale)
✅ Close on ESC or click outside
```

**User Experience:**
```
- Hover over product card → Show "Quick View" icon
- Click icon → Modal opens (0.3s animation)
- Modal: See key info without page reload
- Can add to cart directly from modal
- Or click "View Details" for full page
```

**Implementation:**
```typescript
// Quick View Modal
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-4xl">
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left: Images */}
      <ImageGallery images={product.images} />
      
      {/* Right: Details */}
      <div>
        <h2>{product.name}</h2>
        <div className="flex items-center gap-2">
          <StarRating rating={product.avgRating} />
          <span>{product.reviewCount} reviews</span>
        </div>
        <p className="text-3xl font-bold">{product.price} AED</p>
        <p className="text-gray-600">{truncate(product.description, 100)}</p>
        
        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        
        <Link href={`/products/${product.id}`}>
          View Full Details →
        </Link>
      </div>
    </div>
  </DialogContent>
</Dialog>
```

---

### **Wow Factor 4: Video Thumbnails on Product Cards**

**Why This Impresses:**
- **Customers:** See product in action before clicking
- **Vendors:** Stand out from competitors
- **Investors:** Modern e-commerce, higher engagement

**What to Build:**

```
✅ If product has video → Show video thumbnail instead of static image
✅ Play icon overlay
✅ Hover → Show first 2 seconds of video (auto-play, muted)
✅ Click → Goes to product page (or opens quick view)
✅ Video plays on product page automatically
```

**Implementation:**
```typescript
// Product Card with Video
const ProductCard = ({ product }) => {
  const hasVideo = product.videos?.length > 0;
  
  return (
    <div className="group relative">
      {hasVideo ? (
        <div className="relative">
          <video
            src={product.videos[0].url}
            poster={product.videos[0].thumbnail}
            muted
            loop
            className="w-full aspect-[3/4] object-cover"
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
          />
          <PlayIcon className="absolute inset-0 m-auto" />
        </div>
      ) : (
        <img src={product.images[0]} alt={product.name} />
      )}
      {/* Rest of card */}
    </div>
  );
};
```

---

### **Wow Factor 5: Social Proof Badges**

**Why This Impresses:**
- **Customers:** FOMO (fear of missing out), trust signals
- **Vendors:** Boost conversions
- **Investors:** Conversion optimization, data-driven

**What to Build:**

```
✅ "X people bought this today" badge
✅ "Only Y left in stock" urgency badge
✅ "Trending" badge (top 20 products this week)
✅ "Best Seller" badge (top 10 products this month)
✅ "New Arrival" badge (< 7 days old)
✅ Real-time purchase notifications (toast)
```

**Badge Examples:**
```
🔥 12 sold today
⚡ Only 3 left
📈 Trending
🏆 Best Seller
✨ New
```

**Implementation:**
```typescript
// Calculate "sold today"
const soldToday = await prisma.orderItem.count({
  where: {
    productId: product.id,
    order: {
      createdAt: {
        gte: startOfDay(new Date())
      },
      status: { in: ['processing', 'shipped', 'delivered'] }
    }
  }
});

// Show badge if > 0
{soldToday > 0 && (
  <span className="badge bg-orange-500">
    🔥 {soldToday} sold today
  </span>
)}
```

**Real-time Toast:**
```typescript
// When someone makes purchase, show toast to other users
"Someone in Dubai just purchased Oud Al Anfar"
```

---

### **Wow Factor 6: Vendor Brand Stories**

**Why This Impresses:**
- **Customers:** Connect with brands emotionally
- **Vendors:** Build brand identity, differentiation
- **Investors:** Brand loyalty, higher perceived value

**What to Build:**

```
✅ Vendor profile page (/vendors/:id)
✅ Brand story section (rich text, 200-500 words)
✅ Brand photos/video (hero image)
✅ Founding year, location
✅ "Meet the founder" section (optional)
✅ Social media links
✅ Products from this vendor
✅ "Follow" button (optional for MVP)
```

**Vendor Profile Page:**
```
- Hero banner with brand image
- Brand logo
- Brand name + tagline
- Short description (50 words)
- Full brand story (expandable)
- Product grid (their products)
- Contact buttons (WhatsApp, Email)
```

**Database Addition:**
```sql
Vendor {
  ...existing fields...
  brandStory (text)
  brandStoryAr (text)
  founderName (string)
  founderPhoto (url)
  foundingYear (int)
  videoUrl (url, nullable)
  instagramUrl
  tiktokUrl
}
```

---

### **Wow Factor 7: Smooth Animations**

**Why This Impresses:**
- **Customers:** Feels premium, enjoyable to use
- **Vendors:** Professional platform
- **Investors:** Attention to detail, quality product

**What to Build:**

```
✅ Page transitions (fade in)
✅ Cart drawer (slide from right)
✅ Modal animations (scale + fade)
✅ Button hover effects (scale, shadow)
✅ Card hover (lift effect)
✅ Image lazy loading with fade-in
✅ Skeleton loaders (shimmer effect)
✅ Toast notifications (slide in from top)
✅ "Added to cart" animation (product flies to cart icon)
```

**Implementation with Framer Motion:**
```typescript
import { motion } from 'framer-motion';

// Page transition
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>

// Card hover
<motion.div
  whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
  transition={{ duration: 0.2 }}
>
  {/* Product card */}
</motion.div>

// Add to cart animation
const controls = useAnimation();
const handleAddToCart = async () => {
  await controls.start({
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  });
  // Add to cart logic
};
```

---

### **Wow Factor 8: Personalized Homepage Sections**

**Why This Impresses:**
- **Customers:** Relevant products, better experience
- **Vendors:** Better visibility for right audience
- **Investors:** Personalization = higher conversions

**What to Build:**

```
✅ "Recommended for You" section (logged-in users)
✅ "Based on Your Browsing" section
✅ "Recently Viewed" section
✅ "Complete Your Collection" (if bought similar items)
✅ Simple algorithm (no ML required for MVP)
```

**Algorithm (Simple):**
```typescript
// Recommended for You
1. Get user's past orders (categories)
2. Show popular products from those categories
3. Exclude already purchased items

// Based on Your Browsing
1. Track last 10 products viewed (local storage)
2. Find products in same categories
3. Sort by popularity

// Recently Viewed
1. Show last 8 products viewed
2. Store in local storage

// Complete Your Collection
1. If user bought Oud, suggest Oud accessories
2. If user bought Perfume, suggest travel size
3. Category-based suggestions
```

---

### **Wow Factor 9: Arabic-First Bilingual Experience**

**Why This Impresses:**
- **Customers:** Feels local, relatable (UAE market)
- **Vendors:** Reach Arabic-speaking customers
- **Investors:** Market fit, scalable to GCC

**What to Build:**

```
✅ Language toggle (EN/AR) in header
✅ RTL (right-to-left) layout for Arabic
✅ All content in both languages
✅ Arabic font: Tajawal (clean, modern)
✅ English font: Playfair Display + Inter
✅ Auto-detect user language (browser setting)
✅ Persist language choice
✅ Currency always in AED (not USD)
✅ Date formats (Arabic calendar option)
```

**Implementation:**
```typescript
// next-i18next for translations
import { useTranslation } from 'next-i18next';

const { t, i18n } = useTranslation();

// Use translations
<h1>{t('home.hero.title')}</h1>

// RTL support
<html dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>

// Tailwind RTL
<div className="ml-4 rtl:mr-4 rtl:ml-0">
```

**Translation Files:**
```json
// en.json
{
  "home": {
    "hero": {
      "title": "Discover Luxury Fragrances"
    }
  }
}

// ar.json
{
  "home": {
    "hero": {
      "title": "اكتشف العطور الفاخرة"
    }
  }
}
```

---

### **Wow Factor 10: Scent Notes Visual Wheel**

**Why This Impresses:**
- **Customers:** Understand fragrance profile visually
- **Vendors:** Present products professionally
- **Investors:** Niche feature, shows domain expertise

**What to Build:**

```
✅ Visual scent pyramid on product page
✅ Three layers: Top, Heart, Base notes
✅ Color-coded by scent family
✅ Hover → Show note description
✅ Beautiful SVG/CSS design
✅ Optional: Scent wheel (circular diagram)
```

**Design:**
```
        TOP NOTES
    ╱───────────────╲
   │  Bergamot       │
   │  Saffron        │
    ╲───────────────╱
        HEART NOTES
    ╱───────────────╲
   │  Rose           │
   │  Jasmine        │
    ╲───────────────╱
        BASE NOTES
    ╱───────────────╲
   │  Oud            │
   │  Amber          │
   │  Musk           │
    ╲───────────────╱
```

**Implementation:**
```typescript
const ScentPyramid = ({ notes }) => (
  <div className="space-y-2">
    {/* Top Notes */}
    <div className="bg-yellow-50 p-4 rounded-t-lg">
      <h4 className="text-sm font-semibold mb-2">Top Notes</h4>
      <div className="flex flex-wrap gap-2">
        {notes.top.map(note => (
          <span key={note} className="badge">{note}</span>
        ))}
      </div>
    </div>
    
    {/* Heart Notes */}
    <div className="bg-pink-50 p-4">
      <h4 className="text-sm font-semibold mb-2">Heart Notes</h4>
      <div className="flex flex-wrap gap-2">
        {notes.heart.map(note => (
          <span key={note} className="badge">{note}</span>
        ))}
      </div>
    </div>
    
    {/* Base Notes */}
    <div className="bg-amber-50 p-4 rounded-b-lg">
      <h4 className="text-sm font-semibold mb-2">Base Notes</h4>
      <div className="flex flex-wrap gap-2">
        {notes.base.map(note => (
          <span key={note} className="badge">{note}</span>
        ))}
      </div>
    </div>
  </div>
);
```

**Database:**
```sql
Product {
  ...existing...
  scentNotesTop (json array)
  scentNotesHeart (json array)
  scentNotesBase (json array)
  scentFamily (string: woody, floral, oriental, fresh)
}
```

---

## 📄 Complete Page List (Enhanced MVP)

### **Total Pages: 20-22**

#### **Public Pages (5)**
```
1. Homepage
   - Hero banner
   - Featured categories
   - Featured products
   - Trending products
   - Video products section (new)
   - Footer

2. Product Listing (/products)
   - Product grid (with video thumbnails)
   - Filters (category, price, brand, rating)
   - Smart search bar
   - Pagination

3. Product Detail (/products/:id)
   - Image + video gallery
   - Product info
   - Reviews section (new)
   - Related products (new)
   - Scent pyramid (new)
   - WhatsApp button (new)
   - Add to cart / Buy now

4. Vendor Profile (/vendors/:id)
   - Brand story (new)
   - Products from vendor
   - Contact buttons

5. About Us
   - Company info
   - Contact details
```

#### **Customer Pages (8)**
```
6. Login / Register
7. Shopping Cart (/cart)
8. Checkout (/checkout)
   - Quick checkout mode (new)
9. Order Confirmation
10. My Account Dashboard
11. My Orders (list + detail)
12. My Wishlist (new)
13. My Wallet/Coins (new)
14. My Reviews (new)
```

#### **Vendor Pages (5)**
```
15. Vendor Login
16. Vendor Dashboard
    - Stats + coins awarded to customers
17. Products Management
    - Add/edit product (with video upload)
18. Orders Management
19. Reviews Management (new)
    - View reviews, reply to reviews
```

#### **Admin Pages (4)**
```
20. Admin Login
21. Admin Dashboard
    - Vendors, products, orders overview
22. Vendor Management
    - Approve/reject, view details
23. Reviews Moderation (new)
    - Flag/hide inappropriate reviews
```

---

## 🗄️ Complete Database Schema

### **Total Tables: 16**

**Core Tables (from basic MVP):**
```
1. User
2. Vendor
3. Category
4. Product
5. ProductImage
6. Cart
7. CartItem
8. Order
9. OrderItem
10. Address
11. Payment
12. Coupon
```

**New Tables (enhanced features):**
```
13. ProductVideo
    - id, productId, videoUrl, thumbnailUrl
    - duration, position, createdAt

14. Review
    - id, userId, productId, orderId
    - rating, title, comment
    - isVerifiedPurchase, helpfulCount
    - vendorReply, status, createdAt

15. ReviewImage
    - id, reviewId, url, position

16. ReviewVote
    - reviewId, userId, voteType
    - PRIMARY KEY (reviewId, userId)

17. Wishlist
    - userId, productId, addedAt
    - notifyOnPriceDown, notifyOnStock
    - PRIMARY KEY (userId, productId)

18. Wallet
    - userId (PK), coinsBalance
    - lifetimeCoinsEarned, updatedAt

19. CoinTransaction
    - id, userId, type, amount
    - balance, source, sourceId
    - description, createdAt
```

**Tables Still Excluded (add later):**
```
❌ Post, PostLike, PostComment (social)
❌ Follow (social)
❌ Lead, LeadNote (B2B)
❌ Notification (add Phase 2)
❌ Payout (add when needed)
❌ Setting (hardcode for MVP)
```

---

## 🔌 Complete API Endpoints

### **Total Endpoints: 55-60**

#### **Auth (4)**
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/forgot-password
```

#### **Users (4)**
```
GET    /users/me
PUT    /users/me
PUT    /users/me/password
GET    /users/me/stats          # Orders, reviews, coins
```

#### **Categories (2)**
```
GET    /categories
GET    /categories/:id
```

#### **Products (10)**
```
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
GET    /products/:id/images
POST   /products/:id/images
DELETE /images/:id
GET    /products/:id/videos     # New
POST   /products/:id/videos     # New
DELETE /videos/:id              # New
GET    /products/:id/related    # New
```

#### **Search (2)**
```
GET    /search/autocomplete     # New
GET    /search
```

#### **Reviews (7) - New**
```
POST   /reviews
GET    /products/:id/reviews
PUT    /reviews/:id
DELETE /reviews/:id
POST   /reviews/:id/vote
POST   /reviews/:id/reply       # Vendor
GET    /vendor/reviews          # Vendor dashboard
```

#### **Wishlist (5) - New**
```
GET    /wishlist
POST   /wishlist
DELETE /wishlist/:productId
POST   /wishlist/bulk
DELETE /wishlist
```

#### **Wallet/Coins (3) - New**
```
GET    /wallet
GET    /wallet/transactions
POST   /wallet/earn             # Internal use
```

#### **Cart (5)**
```
GET    /cart
POST   /cart/items
PUT    /cart/items/:id
DELETE /cart/items/:id
DELETE /cart
```

#### **Checkout (3)**
```
POST   /checkout/validate
POST   /checkout/create-order
POST   /checkout/quick          # New (Buy Now)
```

#### **Orders (6)**
```
GET    /orders
GET    /orders/:id
PUT    /orders/:id/status
POST   /orders/:id/cancel
GET    /orders/:id/invoice
POST   /payments/webhook
```

#### **Coupons (2)**
```
POST   /coupons/validate
GET    /coupons/:code           # Get details
```

#### **Vendor (5)**
```
GET    /vendor/dashboard
GET    /vendor/products
GET    /vendor/orders
GET    /vendor/reviews          # New
PUT    /vendor/profile
GET    /vendors/:id             # Public profile (new)
```

#### **Admin (7)**
```
GET    /admin/vendors
PUT    /admin/vendors/:id
GET    /admin/products
GET    /admin/orders
POST   /admin/categories
PUT    /admin/categories/:id
DELETE /admin/categories/:id
GET    /admin/reviews           # New (moderation)
PUT    /admin/reviews/:id       # New (hide/show)
GET    /admin/stats             # New (dashboard)
```

**Total: ~60 endpoints**

---

## ⏱️ Revised Implementation Timeline

### **Total: 8-10 weeks**

#### **Week 1-2: Foundation (Same as Basic MVP)**
```
- Supabase setup
- Backend scaffolding (NestJS)
- Frontend scaffolding (Next.js)
- Authentication system
- User roles
- Basic layout
- Design system setup
```

#### **Week 3: Products Core**
```
- Product CRUD
- Category management
- Image upload (Supabase)
- Product listing page
- Product detail page
- Basic search
```

#### **Week 4: Enhanced Product Features**
```
✨ Video upload & display
✨ Related products algorithm
✨ Scent notes pyramid
✨ Vendor profile pages
✨ Quick view modal
```

#### **Week 5: Shopping & Engagement**
```
- Shopping cart
- Wishlist functionality
✨ Buy now / Quick checkout
- Checkout flow
- Stripe integration
```

#### **Week 6: Reviews & Social Proof**
```
✨ Review submission
✨ Review display & voting
✨ Vendor replies
✨ Social proof badges
✨ Review photos
```

#### **Week 7: Loyalty & Communication**
```
✨ Coins system (earn)
✨ Wallet page
✨ WhatsApp integration
✨ Smart search with autocomplete
- Order management (all roles)
```

#### **Week 8: Dashboards & Management**
```
- Vendor dashboard (enhanced)
- Admin panel (enhanced)
- Review moderation
- Order status updates
- Basic analytics
```

#### **Week 9-10: Polish & Launch**
```
✨ Smooth animations (Framer Motion)
✨ Bilingual (EN/AR with RTL)
- Responsive design (all pages)
- Email notifications
- Performance optimization
- Testing & bug fixes
- SEO basics
- Deploy to production
🚀 Launch!
```

---

## 🎨 Design Guidelines (Enhanced)

### **Animation Principles:**
```
- Use Framer Motion for all animations
- Keep animations subtle (0.2-0.4s duration)
- Use ease-in-out curves
- Animate: opacity, transform (scale, y)
- Page transitions: fade + slide up
- Card hover: lift + shadow
- Button hover: scale (1.02-1.05)
```

### **Loading States:**
```
- Skeleton screens (shimmer effect)
- Loading spinners (for buttons)
- Progress bars (for uploads)
- Lazy loading images (fade in)
- Optimistic UI updates (cart, wishlist)
```

### **Micro-interactions:**
```
- Heart animation on wishlist add
- Cart icon shake when item added
- Coin icon spin when earned
- Star rating fill animation
- WhatsApp button pulse
- Search suggestions slide down
```

### **Mobile-First:**
```
- All features work on mobile
- Touch-friendly (44px minimum)
- Bottom sheet for filters
- Swipeable product galleries
- Hamburger menu
- Sticky add-to-cart bar
```

---

## ✅ Definition of Done (Enhanced MVP)

### **You can launch when:**

```
Core E-commerce:
✅ Vendor can add products (images + videos)
✅ Products show on listing & detail pages
✅ Customer can browse products
✅ Customer can add to cart & wishlist
✅ Customer can checkout (normal & quick)
✅ Stripe payment works
✅ Orders are created & tracked

Engagement Features:
✅ Reviews can be submitted & displayed
✅ Coins are earned on purchases
✅ Wishlist works (add, remove, view)
✅ Related products show
✅ Videos play on product pages

Wow Factors:
✅ WhatsApp quick contact works
✅ Smart search with autocomplete works
✅ Quick view modal works
✅ Animations are smooth
✅ Social proof badges show
✅ Bilingual (EN/AR) works perfectly

Management:
✅ Vendor can manage products & orders
✅ Vendor can reply to reviews
✅ Admin can approve vendors
✅ Admin can moderate reviews

Quality:
✅ Site is responsive (mobile, tablet, desktop)
✅ No critical bugs
✅ Page load time < 3 seconds
✅ All forms validate properly
```

---

## 🎯 Success Metrics (Enhanced MVP)

### **After 1 Month:**
```
Vendors:
- 15-25 vendors onboarded
- 150-300 products listed
- 20+ products with videos
- 50+ reviews submitted

Customers:
- 100-200 registered users
- 30-50 orders placed
- 200+ wishlist items
- 100+ WhatsApp clicks
- 10,000+ coins earned

Engagement:
- 30+ reviews with photos
- 50+ products in wishlists
- 100+ search queries
- 500+ video plays
```

### **What Impresses Investors:**
```
✅ Modern, polished UI (animations, videos)
✅ User engagement features (reviews, wishlist, coins)
✅ Local market fit (WhatsApp, Arabic, AED)
✅ Working product with real transactions
✅ Vendor adoption (quality brands)
✅ Customer engagement metrics
✅ Unique features (scent pyramid, videos, coins)
```

---

## 📝 Instructions for Claude Code

### **Use This Document To Generate:**

**1. Complete MVP Specification Document**
```
Structure:
- Executive Summary
- User Roles & Flows
- Detailed Feature Descriptions (20+ pages)
- Page-by-Page Breakdown (20-22 pages)
- API Endpoint Specifications (60 endpoints)
- Database Schema (16 tables with Prisma models)
- UI/UX Guidelines
- Implementation Timeline (week by week)
- Tech Stack Details
```

**2. Include ALL These Features:**
```
Core MVP Features:
✅ Authentication, Products, Cart, Checkout, Orders
✅ Vendor Dashboard, Admin Panel

Enhanced Features (Your Request):
✅ Reviews & Ratings (full system)
✅ Wishlist (with notifications)
✅ Related Products (algorithm)
✅ Product Videos (upload & display)
✅ Buy Now / Quick Checkout
✅ Coins System (earn only)

Wow Factors (Strategic):
✅ WhatsApp Quick Contact
✅ Smart Search (autocomplete)
✅ Quick View Modal
✅ Video Thumbnails on Cards
✅ Social Proof Badges
✅ Vendor Brand Stories
✅ Smooth Animations
✅ Personalized Homepage
✅ Arabic-First Bilingual
✅ Scent Notes Visual Wheel
```

**3. Detailed Specifications Needed:**

For EACH feature, include:
```
- Feature description & purpose
- User stories (as customer, as vendor, as admin)
- UI components needed
- API endpoints (request/response)
- Database tables/fields
- Business logic
- Edge cases
- Validation rules
```

**4. Keep This Realistic:**
```
Timeline: 8-10 weeks (not 12+ weeks)
Team: 1-2 developers
Complexity: Enhanced marketplace (not social platform)
Focus: E-commerce + engagement (not B2B, not AI)
```

**5. Format:**
```
- Use clear headings (H1, H2, H3)
- Include code examples where relevant
- Add mockup descriptions (not actual images)
- Use tables for comparison
- Include checkboxes for features
- Add diagrams (text-based is fine)
```

**6. Tone:**
```
- Professional but practical
- Focus on "must have" vs "nice to have"
- Emphasize speed to market
- Highlight investor appeal
- Be realistic about timelines
```

---

## 🚀 Final Summary

### **What You're Building:**

**A polished, feature-rich fragrance marketplace with:**
- ✅ Core e-commerce (products, cart, checkout)
- ✅ User engagement (reviews, wishlist, coins)
- ✅ Vendor tools (products, orders, reviews)
- ✅ Admin controls (vendors, products, moderation)
- ✅ Wow factors (WhatsApp, search, videos, animations)
- ✅ Local market fit (Arabic, AED, UAE focus)

### **Timeline:** 8-10 weeks (realistic with all features)

### **Team:** 1-2 developers

### **Launch With:**
- 15-25 vendors
- 150-300 products
- Working reviews & coins system
- Modern, polished UI
- Investor-ready product

### **Add Later (Phase 2):**
- Coins redemption
- Social/community features
- B2B/wholesale
- AI recommendations
- Mobile app
- Advanced analytics

---

**This specification balances:**
- ✅ Your requested features (reviews, wishlist, videos, coins, buy now)
- ✅ Strategic wow factors (to impress stakeholders)
- ✅ Realistic timeline (achievable in 8-10 weeks)
- ✅ Market fit (UAE, fragrance industry)

**Ready to give to Claude Code for full MVP generation!** 🚀

---

**Questions Before Generating?**
- Happy with the feature list?
- Any wow factors to add/remove?
- Timeline concerns?
- Ready to proceed?

✅ **If yes, paste this document to Claude Code with the prompt provided above!**
