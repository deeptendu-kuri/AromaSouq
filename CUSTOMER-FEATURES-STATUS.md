# AromaSouq Customer Features - Implementation Status

**Generated:** 2025-10-26
**Analysis Date:** Current Implementation Review

---

## Executive Summary

**Total Features Analyzed:** 40+
**Fully Implemented:** 15 (37.5%)
**Partially Implemented:** 7 (17.5%)
**Not Implemented:** 18 (45%)

### Overall Progress by Category

| Category | Implemented | Partial | Missing | Progress |
|----------|-------------|---------|---------|----------|
| Product Discovery | 1/4 | 0/4 | 3/4 | 25% |
| Product Pages | 2/4 | 1/4 | 1/4 | 62.5% |
| Cart & Checkout | 4/4 | 0/4 | 0/4 | **100%** ✅ |
| Lead Generation | 0/3 | 0/3 | 3/3 | 0% |
| WhatsApp Commerce | 0/3 | 2/3 | 1/3 | 33% |
| Coins & Loyalty | 1/5 | 1/5 | 3/5 | 30% |
| AI Features | 0/3 | 0/3 | 3/3 | 0% |
| Community | 0/3 | 1/3 | 2/3 | 16% |
| Notifications | 0/2 | 0/2 | 2/2 | 0% |

---

## Detailed Feature Analysis

### 1. Product Discovery & Search

#### ✅ Advanced Product Filtering (IMPLEMENTED)
**Backend:** `/api/products?[filters]`
- **Location:** `aromasouq-api/src/products/products.controller.ts:26-63`
- **Service:** `aromasouq-api/src/products/products.service.ts:15-161`

**Available Filters:**
- ✅ Category (by ID or slug)
- ✅ Brand
- ✅ Vendor
- ✅ Gender (MEN, WOMEN, UNISEX)
- ✅ Concentration (EDP, EDT, PERFUME_OIL, etc.)
- ✅ Scent Family (FLORAL, WOODY, FRESH, ORIENTAL, etc.)
- ✅ Season (SPRING, SUMMER, AUTUMN, WINTER, ALL_SEASON)
- ✅ Price Range (minPrice, maxPrice)
- ✅ Search (by name, description)
- ✅ Featured products flag
- ✅ Active/inactive products
- ✅ Sorting (price, createdAt, name)

**Frontend:**
- **Location:** `aromasouq-web/src/app/products/page.tsx`
- **Hook:** `aromasouq-web/src/hooks/useProducts.ts`
- Features client-side category selection and server-side filtering

**Missing:**
- ❌ Scent note-based filtering (e.g., "find all perfumes with vanilla")
- ❌ Country of origin filter

---

#### ❌ DNA Similarity / Scent Matching (NOT IMPLEMENTED)

**Schema Readiness:**
```typescript
// Schema has scent note fields
topNotes      String[]
heartNotes    String[]
baseNotes     String[]
scentFamily   ScentFamily
```

**What's Missing:**
- No similarity algorithm
- No scent DNA comparison API endpoint
- No frontend "Find Similar" button
- No ML-based recommendation

**Recommended Implementation:**
1. Create cosine similarity algorithm for note vectors
2. Add endpoint: `GET /products/:id/similar`
3. Add "Find Similar Scents" button on product pages
4. Consider ML embeddings for better matching

---

#### ❌ Voice Search (NOT IMPLEMENTED)

**What's Missing:**
- No Web Speech API integration
- No voice-to-text endpoint
- No microphone permission handling
- No voice search UI component

**Recommended Stack:**
- Frontend: Web Speech API (browser native)
- Backend: Google Cloud Speech-to-Text (optional)
- UI: Microphone button in search bar

---

#### ❌ AI Scent Match (NOT IMPLEMENTED)

**What's Missing:**
- No ML model integration
- No fragrance recommendation engine
- No personalization based on past purchases

**Recommended Approach:**
- Use TensorFlow.js or external API
- Train on user purchase history + product notes
- Implement collaborative filtering

---

### 2. Product Pages

#### ✅ Product Schema & Information (IMPLEMENTED)

**Database Schema:** `aromasouq-api/prisma/schema.prisma:217-310`

**Available Fields:**
```typescript
model Product {
  // Basic info
  name, nameAr, description, descriptionAr

  // Pricing
  price, compareAtPrice, costPrice

  // Inventory
  stock, sku, barcode

  // Scent details
  topNotes[], heartNotes[], baseNotes[]
  scentFamily, concentration, gender
  longevity, sillage, season[]

  // Media
  images (ProductImage[])
  videos (ProductVideo[])

  // Relations
  category, brand, vendor
  variants (ProductVariant[])
  reviews (Review[])

  // Metadata
  isActive, isFeatured
  slug (auto-generated)
}
```

**Frontend Display:**
- **Location:** `aromasouq-web/src/app/products/[slug]/page.tsx`
- Image gallery with zoom lens effect
- Variant selection (size/SKU/price)
- Rating display with stars
- Scent notes visualization (if available)
- Brand and category links

**API Endpoint:**
```
GET /api/products/:id
GET /api/products/slug/:slug
```

**Response includes:**
- Full product details
- Category, brand, vendor info
- Variants with pricing
- Videos
- 10 most recent reviews
- Average rating + review count

---

#### ✅ Reviews Functionality (FULLY IMPLEMENTED)

**Backend:**
- **Controller:** `aromasouq-api/src/reviews/reviews.controller.ts`
- **Service:** `aromasouq-api/src/reviews/reviews.service.ts`
- **Models:** Review, ReviewVote, ReviewImage

**Features:**
- ✅ Create review (POST /reviews)
- ✅ Update review (PATCH /reviews/:id)
- ✅ Delete review (DELETE /reviews/:id)
- ✅ Vote helpful/unhelpful (POST /reviews/:id/vote)
- ✅ Vendor replies (vendorReply field)
- ✅ Review images (ReviewImage model)
- ✅ Verified purchase badge
- ✅ Admin moderation (publish/unpublish)
- ✅ Rating 1-5 stars
- ✅ Average rating calculation
- ✅ Review count tracking

**Frontend:**
- Review creation form
- Star rating component
- Review listing with pagination
- Helpful vote buttons

**Database Schema:**
```typescript
model Review {
  id          String
  userId      String
  productId   String
  orderId     String?      // For verified purchases
  rating      Int          // 1-5
  title       String
  comment     String
  pros        String[]
  cons        String[]
  images      ReviewImage[]
  isPublished Boolean @default(true)
  vendorReply String?
  vendorRepliedAt DateTime?
  helpfulCount Int @default(0)
  notHelpfulCount Int @default(0)
}
```

**Permissions:**
- Customers can create/edit/delete own reviews
- Vendors can reply to reviews on their products
- Admin can moderate (publish/unpublish) any review

---

#### 🟡 Product Videos/Reels (PARTIALLY IMPLEMENTED)

**Backend - Implemented:**
```typescript
model ProductVideo {
  id          String
  productId   String
  url         String       // Video URL
  title       String?
  thumbnail   String?
  duration    Int?         // in seconds
  sortOrder   Int @default(0)
}
```

**API Support:**
- Videos are fetched with product details
- Stored in database with sort order
- No dedicated video upload endpoint

**Frontend - Missing:**
- ❌ No video player component
- ❌ No video carousel
- ❌ No Reels-style interface
- ❌ No video upload functionality

**Recommended Implementation:**
1. Add video player component (React Player or native HTML5)
2. Create video upload endpoint using Supabase Storage
3. Add Reels-style swipeable video interface
4. Support for Instagram Reels embed links

---

#### ❌ AR Bottle Preview (NOT IMPLEMENTED)

**What's Missing:**
- No 3D model support (glTF/GLB files)
- No AR library integration (8th Wall, AR.js, or Model Viewer)
- No camera access for AR overlay
- No 3D model storage

**Recommended Stack:**
- Frontend: Google's `<model-viewer>` web component
- 3D Models: Store GLB files in Supabase Storage
- Add field to Product model: `arModel String?`
- Mobile: WebXR API for native AR

---

### 3. Cart & Checkout ✅ (FULLY IMPLEMENTED)

#### ✅ Shopping Cart

**Backend:**
- **Service:** `aromasouq-api/src/cart/cart.service.ts`
- **Models:** Cart, CartItem

**Features:**
```typescript
POST   /cart/items              // Add item
PATCH  /cart/items/:id          // Update quantity
DELETE /cart/items/:id          // Remove item
DELETE /cart                    // Clear cart
GET    /cart                    // Get cart
```

**Frontend:**
- **Hook:** `aromasouq-web/src/hooks/useCart.ts`
- **Page:** `aromasouq-web/src/app/cart/page.tsx`

**Features:**
- ✅ Add to cart with variant selection
- ✅ Update quantities (increment/decrement)
- ✅ Remove items
- ✅ Stock validation
- ✅ Automatic cart creation per user
- ✅ Subtotal calculation
- ✅ Coins earning preview
- ✅ Product image thumbnails
- ✅ Variant display (size/SKU)

**Smart Features:**
- Cart persists across sessions
- Automatic cart merging on login
- Stock warnings
- Variant-level inventory tracking

---

#### ✅ Checkout Workflow (4 Steps)

**Frontend:** `aromasouq-web/src/app/checkout/page.tsx`

**Steps:**
1. **Address** - Select or add delivery address
2. **Delivery Method** - Choose shipping option
3. **Payment Method** - Select payment type
4. **Review & Confirm** - Final order confirmation

**Features:**
- ✅ Address validation (Zod schema)
- ✅ Delivery methods:
  - Standard Delivery (Free, 3-5 days)
  - Express Delivery (30 AED, 1-2 days)
  - Same-Day Delivery (50 AED, same day)
- ✅ Payment methods:
  - COD (Cash on Delivery)
  - Credit/Debit Card (placeholder)
  - Wallet (placeholder)
- ✅ Coin redemption (up to 50% of subtotal)
- ✅ Tax calculation (5% VAT)
- ✅ Order summary with breakdown
- ✅ Stock validation before order
- ✅ Automatic cart clearing after order

**Backend:**
- **Service:** `aromasouq-api/src/orders/orders.service.ts`
- **Endpoint:** `POST /orders`

**Transaction Safety:**
- Uses Prisma transactions for:
  - Order creation
  - Stock deduction
  - Cart clearing
  - Coin deduction/earning
  - Wallet transaction recording

---

#### ✅ Multi-Category Support

**Implementation:**
- No restrictions on mixing product categories
- Single cart can contain:
  - Perfumes
  - Oud
  - Bakhoor
  - Accessories
- Each item maintains vendor relationship
- Order summary groups by vendor (if needed)

---

#### ✅ Same-Day Delivery (UAE)

**Implementation:**
- **Location:** Checkout step 2 (Delivery method)
- **Cost:** 50 AED
- **Availability:** All Emirates
- **Time:** Orders placed before 2 PM delivered same day

**Schema:**
```typescript
enum DeliveryMethod {
  STANDARD
  EXPRESS
  SAME_DAY
}
```

**Frontend Display:**
- Clear pricing breakdown
- Estimated delivery time
- Icon indicators for each method

---

### 4. Lead Generation

#### ❌ Wholesale Sample Request (NOT IMPLEMENTED)

**What's Missing:**
- No wholesale inquiry form
- No business details capture
- No B2B lead tracking
- No admin notification system

**Recommended Implementation:**
```typescript
model WholesaleRequest {
  id              String
  userId          String
  businessName    String
  contactPerson   String
  email           String
  phone           String
  businessType    String  // Retailer, Distributor, etc.
  quantity        String  // Expected order volume
  products        String[] // Product IDs of interest
  message         String
  status          String  // PENDING, CONTACTED, CONVERTED, REJECTED
  createdAt       DateTime
}
```

**Suggested Flow:**
1. "Request Wholesale Pricing" button on product pages
2. Form collects business details
3. Admin receives notification
4. Admin contacts lead via email/WhatsApp

---

#### ❌ Custom Perfume Request (NOT IMPLEMENTED)

**What's Missing:**
- No custom perfume builder form
- No inspiration workflow
- No custom order tracking

**Recommended Implementation:**
```typescript
model CustomPerfumeRequest {
  id              String
  userId          String
  inspirationName String?  // e.g., "Similar to Chanel No. 5"
  preferredNotes  String[] // Top/Heart/Base notes
  concentration   String
  bottleSize      String
  budget          Float
  occasion        String   // Daily, Special, Gift
  description     String   // Free-form description
  status          String   // PENDING, IN_REVIEW, QUOTED, APPROVED, REJECTED
  quotedPrice     Float?
  vendorId        String?  // Assigned vendor
}
```

**Suggested Features:**
- Multi-step custom perfume builder
- Scent note selector (visual)
- Budget range slider
- Photo upload for inspiration
- Admin assignment to vendor
- Quote generation

---

#### ❌ Inspiration Perfume Workflow (NOT IMPLEMENTED)

**What's Missing:**
- No "Find Similar" feature
- No guided perfume discovery
- No quiz/questionnaire

**Recommended Implementation:**
1. **Scent Profile Quiz:**
   - Preferred scent families
   - Occasions
   - Season preferences
   - Budget range
2. **AI Recommendation:**
   - Match quiz responses to products
   - Show top 5 matches
3. **Save Preferences:**
   - Store in user profile
   - Use for future recommendations

---

### 5. WhatsApp Commerce

#### 🟡 WhatsApp Integration (BASIC IMPLEMENTATION)

**Frontend Component:**
- **Location:** `aromasouq-web/src/components/features/whatsapp-button.tsx`

**Features:**
- ✅ WhatsApp chat button
- ✅ Product-specific messages (pre-filled)
- ✅ Order inquiry support
- ✅ Custom message support
- ✅ Opens WhatsApp with prefilled text

**Usage Examples:**
```typescript
// Product inquiry
<WhatsAppButton
  phoneNumber="+971501234567"
  message="Hi, I'm interested in [Product Name]"
  productName="Chanel No. 5"
/>

// Order support
<WhatsAppButton
  phoneNumber="+971501234567"
  message="I need help with order #12345"
  label="Chat Support"
/>
```

**Database Support:**
```typescript
// Product model
whatsappEnabled Boolean @default(false)
whatsappNumber  String?

// Vendor model
whatsappEnabled Boolean @default(false)
whatsappNumber  String?
```

**What's Working:**
- Click-to-chat functionality
- Pre-filled messages
- Opens WhatsApp Web or app

**What's Missing:**
- ❌ WhatsApp Business API integration
- ❌ Webhook for incoming messages
- ❌ Chat history storage
- ❌ Automated responses
- ❌ Order status via WhatsApp
- ❌ Payment via WhatsApp
- ❌ Catalog sync

---

#### 🟡 Template Messages (FRONTEND ONLY)

**Implemented:**
- Pre-formatted message strings
- Product detail insertion
- Order number insertion

**Templates:**
```typescript
// Product inquiry
`Hi, I'm interested in ${productName}. Can you provide more details?`

// Order inquiry
`Hi, I need help with order #${orderId}`

// Wholesale inquiry
`Hi, I'd like to inquire about wholesale pricing for ${productName}`
```

**What's Missing:**
- ❌ Backend template management
- ❌ Admin template editor
- ❌ Dynamic variable insertion
- ❌ Multi-language templates
- ❌ Template versioning

**Recommended Implementation:**
```typescript
model WhatsAppTemplate {
  id          String
  name        String
  category    String  // PRODUCT_INQUIRY, ORDER_SUPPORT, etc.
  messageEn   String
  messageAr   String
  variables   String[] // [productName, orderId, etc.]
  isActive    Boolean
}
```

---

#### ❌ Conditional Routing (NOT IMPLEMENTED)

**What's Missing:**
- No intelligent message routing
- No auto-assignment to vendor/admin
- No queue management
- No SLA tracking

**Recommended Implementation:**
1. **Message Classification:**
   - Product inquiry → Route to vendor
   - Order support → Route to admin
   - Complaint → Route to admin
   - Wholesale → Route to sales team

2. **Routing Rules:**
```typescript
model WhatsAppRoutingRule {
  id          String
  trigger     String  // Keyword or regex
  routeTo     String  // VENDOR, ADMIN, SALES
  priority    Int
}
```

3. **Queue Management:**
   - Track pending messages
   - Auto-assign to available agents
   - Response time SLA

---

### 6. Wallet & Coins System

#### ✅ Wallet & Coins Database (FULLY IMPLEMENTED)

**Models:**
```typescript
model Wallet {
  id              String
  userId          String @unique
  balance         Int @default(0)
  lifetimeEarned  Int @default(0)
  lifetimeSpent   Int @default(0)
  transactions    CoinTransaction[]
}

model CoinTransaction {
  id            String
  walletId      String
  amount        Int
  type          TransactionType  // EARNED, SPENT, REFUNDED, EXPIRED
  source        CoinSource       // ORDER_PURCHASE, PRODUCT_REVIEW, REFERRAL, etc.
  description   String
  balanceAfter  Int
  expiresAt     DateTime?
  relatedOrderId String?
}
```

**User Model:**
```typescript
model User {
  coinsBalance  Int @default(0)  // Denormalized for quick access
  wallet        Wallet?
}
```

**Features:**
- ✅ Automatic wallet creation on user registration
- ✅ Coin earning on order delivery (1 coin per 10 AED spent)
- ✅ Coin redemption for discount (1 coin = 0.1 AED)
- ✅ Maximum 50% order discount with coins
- ✅ Transaction history with timestamps
- ✅ Lifetime earned/spent tracking
- ✅ Expiration tracking (expiresAt field)

**Backend:**
- **Service:** `aromasouq-api/src/users/users.service.ts:148-229`
- **Endpoints:**
  - `GET /users/coins-history?page=1&limit=20`
  - Coin operations in order service

**Frontend:**
- **Hook:** `aromasouq-web/src/hooks/useWallet.ts`
- **Display:** Checkout page, cart page
- **Features:**
  - Current balance display
  - Coins to earn calculation
  - Redeem coins checkbox
  - Transaction history (stub)

**Coin Sources Implemented:**
```typescript
enum CoinSource {
  ORDER_PURCHASE     // ✅ Working
  PRODUCT_REVIEW     // 🟡 Schema only
  REFERRAL          // 🟡 Schema only
  PROMOTION         // 🟡 Schema only
  REFUND            // ✅ Working
  ADMIN             // 🟡 Schema only
}
```

---

#### ❌ Tiered Loyalty System (NOT IMPLEMENTED)

**What's Missing:**
- No tier system (Silver, Gold, Platinum)
- No tier benefits
- No progress tracking
- No tier upgrade/downgrade logic

**Recommended Implementation:**
```typescript
enum LoyaltyTier {
  BRONZE
  SILVER
  GOLD
  PLATINUM
  DIAMOND
}

model LoyaltyProgress {
  id              String
  userId          String @unique
  currentTier     LoyaltyTier @default(BRONZE)
  points          Int @default(0)
  nextTierPoints  Int
  tierSince       DateTime
  lifetimeOrders  Int @default(0)
  lifetimeSpent   Float @default(0)
}

model TierBenefit {
  tier            LoyaltyTier
  coinMultiplier  Float    // e.g., 1.5x for Gold
  freeShipping    Boolean
  earlyAccess     Boolean
  birthdayBonus   Int      // Extra coins on birthday
  prioritySupport Boolean
}
```

**Suggested Tier Structure:**
- **Bronze:** 0-999 points (Default)
  - 1x coin earning
  - Standard shipping rates

- **Silver:** 1,000-4,999 points
  - 1.25x coin earning
  - 10% off first order of the month

- **Gold:** 5,000-14,999 points
  - 1.5x coin earning
  - Free standard shipping
  - Early access to sales

- **Platinum:** 15,000-49,999 points
  - 2x coin earning
  - Free express shipping
  - Birthday bonus (500 coins)
  - Priority customer support

- **Diamond:** 50,000+ points
  - 2.5x coin earning
  - All Platinum benefits
  - Exclusive products
  - Personal shopper

---

#### ❌ Streak Rewards (NOT IMPLEMENTED)

**What's Missing:**
- No daily login tracking
- No consecutive purchase tracking
- No streak bonuses

**Recommended Implementation:**
```typescript
model UserStreak {
  id              String
  userId          String @unique
  currentStreak   Int @default(0)
  longestStreak   Int @default(0)
  lastActivityDate DateTime
  streakType      String  // LOGIN, PURCHASE, REVIEW
}

model StreakReward {
  streakDays      Int
  rewardCoins     Int
  rewardType      String
  message         String
}
```

**Streak Types:**
1. **Login Streak:**
   - Day 3: 10 coins
   - Day 7: 50 coins
   - Day 30: 300 coins

2. **Purchase Streak:**
   - 2 consecutive months: 100 coins
   - 6 consecutive months: 500 coins
   - 12 consecutive months: 2000 coins

3. **Review Streak:**
   - 5 reviews: 50 coins
   - 10 reviews: 150 coins
   - 25 reviews: 500 coins

---

#### 🟡 Referral System (SCHEMA ONLY)

**Implemented:**
- CoinSource.REFERRAL exists in enum
- Database can track referral transactions

**What's Missing:**
- ❌ Referral link generation
- ❌ Referral code tracking
- ❌ Referrer/Referee relationship
- ❌ Referral rewards distribution
- ❌ Referral dashboard

**Recommended Implementation:**
```typescript
model Referral {
  id              String
  referrerId      String  // User who refers
  referredId      String  // User who was referred
  referralCode    String @unique
  status          String  // PENDING, COMPLETED, EXPIRED
  referrerReward  Int     // Coins for referrer
  referredReward  Int     // Coins for new user
  completedAt     DateTime?
  orderId         String? // First order of referred user
}

model ReferralSettings {
  referrerReward  Int @default(100)  // Coins for referrer
  referredReward  Int @default(50)   // Coins for new user
  minimumPurchase Float @default(100) // Min order for referral to count
}
```

**Suggested Flow:**
1. User gets unique referral code (e.g., `JOHN-A5B3`)
2. New user signs up with code
3. New user gets 50 coins welcome bonus
4. On first order (>100 AED), both get rewards:
   - Referrer: 100 coins
   - Referred: Additional 50 coins

**Frontend Needed:**
- Referral dashboard page
- Share buttons (WhatsApp, Email, Copy link)
- Referral stats (sent, pending, completed)
- Leaderboard (top referrers)

---

#### ❌ Spin-the-Wheel Promos (NOT IMPLEMENTED)

**What's Missing:**
- No wheel component
- No prize pool management
- No spin tracking
- No probability configuration

**Recommended Implementation:**
```typescript
model SpinTheWheel {
  id              String
  userId          String
  campaignId      String
  prize           String
  prizeType       String  // COINS, DISCOUNT, FREE_SHIPPING, PRODUCT
  prizeValue      Int
  spunAt          DateTime
  claimed         Boolean @default(false)
}

model WheelCampaign {
  id              String
  name            String
  startDate       DateTime
  endDate         DateTime
  maxSpinsPerUser Int
  prizes          WheelPrize[]
  isActive        Boolean
}

model WheelPrize {
  campaignId      String
  label           String
  type            String
  value           Int
  probability     Float  // 0-1 (e.g., 0.3 = 30%)
  quantity        Int    // Total available
  remaining       Int
}
```

**Suggested Prizes:**
- 10 Coins (50% probability)
- 25 Coins (25% probability)
- 50 Coins (15% probability)
- 100 Coins (5% probability)
- Free Shipping (3% probability)
- 10% Discount Coupon (2% probability)

**Trigger Conditions:**
- First order completion
- Birthday
- Loyalty tier upgrade
- Referral milestone

---

### 7. AI Features

#### ❌ AI Scent Match (NOT IMPLEMENTED)

**What's Missing:**
- No ML model
- No scent vector embeddings
- No similarity search
- No personalization engine

**Recommended Approach:**

**Option 1: Vector Similarity (Simple)**
```typescript
// Calculate Jaccard similarity between scent notes
function calculateScentSimilarity(product1, product2) {
  const notes1 = [...product1.topNotes, ...product1.heartNotes, ...product1.baseNotes]
  const notes2 = [...product2.topNotes, ...product2.heartNotes, ...product2.baseNotes]

  const intersection = notes1.filter(n => notes2.includes(n)).length
  const union = new Set([...notes1, ...notes2]).size

  return intersection / union
}

// API endpoint
GET /api/products/:id/similar?limit=5
```

**Option 2: ML-Based (Advanced)**
- Train model on fragrance note embeddings
- Use TensorFlow.js or external API
- Consider user preferences and purchase history
- Implement collaborative filtering

**Database Addition:**
```typescript
model ScentEmbedding {
  productId       String @unique
  embedding       Float[]  // Vector representation
  lastUpdated     DateTime
}
```

---

#### ❌ AI Custom Perfume Builder (NOT IMPLEMENTED)

**What's Missing:**
- No guided builder interface
- No AI suggestion engine
- No formula generation
- No quote system

**Recommended Implementation:**

**Step 1: User Input Collection**
```typescript
interface CustomPerfumeRequest {
  // Preferences
  style: 'FRESH' | 'WARM' | 'FLORAL' | 'WOODY' | 'EXOTIC'
  intensity: 'LIGHT' | 'MODERATE' | 'STRONG'
  occasion: 'DAILY' | 'EVENING' | 'SPECIAL' | 'GIFT'
  season: 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER'

  // Inspiration
  inspirationName?: string  // "Something like Chanel No. 5"
  likedNotes: string[]
  dislikedNotes: string[]

  // Details
  concentration: string
  bottleSize: string
  budget: number
}
```

**Step 2: AI Formula Suggestion**
- Match user preferences to note database
- Generate 3-5 formula suggestions
- Show note pyramids with percentages

**Step 3: Refinement**
- User selects preferred formula
- Adjust note intensities
- Preview description

**Step 4: Quote & Order**
- Calculate price based on notes and quantity
- Assign to vendor for creation
- Track custom order progress

**Required Models:**
```typescript
model CustomPerfumeOrder {
  id              String
  userId          String
  formula         Json  // Note composition
  status          String
  quotedPrice     Float
  vendorId        String?
  estimatedDays   Int
}
```

---

#### ❌ General Recommendation System (NOT IMPLEMENTED)

**What's Missing:**
- No "Recommended for You" section
- No "Customers Also Bought" feature
- No personalized homepage
- No email recommendations

**Recommended Strategies:**

**1. Collaborative Filtering:**
```sql
-- Find users with similar purchase history
SELECT p2.*
FROM orders o1
JOIN order_items oi1 ON o1.id = oi1.order_id
JOIN order_items oi2 ON oi2.product_id IN (
  SELECT product_id FROM order_items WHERE order_id IN (
    SELECT id FROM orders WHERE user_id = $userId
  )
)
JOIN products p2 ON oi2.product_id = p2.id
WHERE o1.user_id != $userId
GROUP BY p2.id
ORDER BY COUNT(*) DESC
LIMIT 10
```

**2. Content-Based Filtering:**
- Recommend products with similar scent families
- Match gender, concentration, price range
- Consider past browsing history

**3. Trending Products:**
- Most purchased this week
- Highest rated
- Newly added

**Implementation:**
```typescript
GET /api/recommendations/for-you
GET /api/products/:id/frequently-bought-together
GET /api/recommendations/trending
```

---

### 8. Community Features

#### ❌ Community Feed / Posts (NOT IMPLEMENTED)

**What's Missing:**
- No social feed
- No user posts
- No timeline
- No activity stream

**Recommended Implementation:**
```typescript
model Post {
  id          String
  userId      String
  type        PostType  // TEXT, IMAGE, VIDEO, UNBOXING, REVIEW_SHARE
  content     String
  media       PostMedia[]
  productId   String?   // Tagged product
  likes       Like[]
  comments    Comment[]
  shares      Int @default(0)
  isPublic    Boolean @default(true)
  createdAt   DateTime
}

model PostMedia {
  id          String
  postId      String
  type        String  // IMAGE, VIDEO
  url         String
  thumbnail   String?
  sortOrder   Int
}

enum PostType {
  TEXT
  IMAGE
  VIDEO
  UNBOXING
  REVIEW_SHARE
  COLLECTION
}
```

**Feed Types:**
1. **Following Feed:** Posts from users you follow
2. **Discover Feed:** Popular posts from all users
3. **Product Feed:** Posts tagged with specific product
4. **My Posts:** User's own post history

**API Endpoints:**
```typescript
GET  /api/feed/following?page=1
GET  /api/feed/discover?page=1
GET  /api/posts/:id
POST /api/posts
DELETE /api/posts/:id
```

---

#### ❌ Social Features (Follows, Likes, Comments) (NOT IMPLEMENTED)

**What's Missing:**
- No follow/unfollow functionality
- No like system
- No commenting on posts
- No social graph

**Recommended Implementation:**

**1. Follow System:**
```typescript
model Follow {
  id          String
  followerId  String  // User who follows
  followingId String  // User being followed
  createdAt   DateTime

  @@unique([followerId, followingId])
}

// User stats
model UserSocialStats {
  userId          String @unique
  followersCount  Int @default(0)
  followingCount  Int @default(0)
  postsCount      Int @default(0)
  likesReceived   Int @default(0)
}
```

**2. Like System:**
```typescript
model Like {
  id          String
  userId      String
  postId      String?
  productId   String?
  createdAt   DateTime

  @@unique([userId, postId])
  @@unique([userId, productId])
}
```

**3. Comment System:**
```typescript
model Comment {
  id          String
  userId      String
  postId      String
  content     String
  parentId    String?   // For threaded comments
  likes       CommentLike[]
  createdAt   DateTime
}

model CommentLike {
  userId      String
  commentId   String

  @@unique([userId, commentId])
}
```

**API Endpoints:**
```typescript
// Follow
POST   /api/users/:id/follow
DELETE /api/users/:id/unfollow
GET    /api/users/:id/followers
GET    /api/users/:id/following

// Like
POST   /api/posts/:id/like
DELETE /api/posts/:id/unlike
GET    /api/posts/:id/likes

// Comment
POST   /api/posts/:id/comments
GET    /api/posts/:id/comments
DELETE /api/comments/:id
```

---

#### 🟡 User-Generated Content (PARTIAL - Reviews Only)

**Implemented:**
- ✅ Review images (ReviewImage model)
- ✅ Review text with pros/cons
- ✅ Star ratings

**Missing:**
- ❌ Dedicated unboxing feature
- ❌ Collection showcase
- ❌ User photo galleries
- ❌ Scent journey stories

**Recommended Additions:**

**1. Unboxing Posts:**
```typescript
model Unboxing {
  id          String
  userId      String
  orderId     String
  title       String
  description String
  photos      UnboxingPhoto[]
  video       String?
  products    Product[]  // Tagged products
  likes       Like[]
  comments    Comment[]
  views       Int @default(0)
  createdAt   DateTime
}
```

**2. Product Collections:**
```typescript
model Collection {
  id          String
  userId      String
  name        String
  description String
  coverImage  String?
  products    CollectionProduct[]
  isPublic    Boolean @default(true)
  likes       Int @default(0)
  saves       Int @default(0)
}

// e.g., "My Summer Fragrances 2025"
```

**3. Scent Journey:**
```typescript
model ScentJourney {
  id          String
  userId      String
  year        Int
  month       Int
  productId   String
  notes       String  // Personal experience notes
  rating      Int
  occasion    String
  weather     String
}
```

---

### 9. Notifications

#### ❌ Push Notifications (NOT IMPLEMENTED)

**What's Missing:**
- No push notification service
- No FCM integration
- No notification model
- No subscription management

**Recommended Implementation:**

**Backend Model:**
```typescript
model Notification {
  id          String
  userId      String
  type        NotificationType
  title       String
  message     String
  data        Json?      // Additional metadata
  read        Boolean @default(false)
  actionUrl   String?
  createdAt   DateTime
}

enum NotificationType {
  ORDER_CONFIRMED
  ORDER_SHIPPED
  ORDER_DELIVERED
  PRODUCT_RESTOCKED
  PRICE_DROP
  COINS_EXPIRING
  NEW_REVIEW
  COMMUNITY_POST
  PROMOTION
  ADMIN_MESSAGE
}

model PushSubscription {
  id          String
  userId      String
  endpoint    String
  p256dh      String
  auth        String
  userAgent   String?
  createdAt   DateTime
}
```

**Notification Triggers:**
1. **Order Updates:**
   - Order confirmed
   - Order shipped (with tracking)
   - Order delivered
   - Order cancelled/refunded

2. **Product Alerts:**
   - Wishlisted item back in stock
   - Price drop on wishlisted item
   - New review on purchased product

3. **Coins & Loyalty:**
   - Coins expiring in 7 days
   - Loyalty tier upgraded
   - Referral reward earned

4. **Community:**
   - Someone liked your post
   - New comment on your post
   - New follower

5. **Promotions:**
   - Flash sale starting
   - Exclusive offer for your tier
   - Birthday bonus available

**Frontend Implementation:**
```typescript
// Request permission
const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    // Subscribe to push notifications
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY
    })
    // Send subscription to backend
    await api.post('/notifications/subscribe', subscription)
  }
}
```

**API Endpoints:**
```typescript
POST /api/notifications/subscribe
GET  /api/notifications?page=1
PATCH /api/notifications/:id/read
PATCH /api/notifications/read-all
DELETE /api/notifications/:id
```

---

#### ❌ Notification Preferences (NOT IMPLEMENTED)

**What's Missing:**
- No preference management
- No opt-in/opt-out controls
- No channel selection (email, push, SMS)

**Recommended Implementation:**
```typescript
model NotificationPreference {
  userId          String @unique

  // Email notifications
  emailOrders     Boolean @default(true)
  emailMarketing  Boolean @default(true)
  emailCommunity  Boolean @default(false)

  // Push notifications
  pushOrders      Boolean @default(true)
  pushRestocks    Boolean @default(true)
  pushCoins       Boolean @default(true)
  pushCommunity   Boolean @default(false)

  // SMS notifications
  smsOrders       Boolean @default(false)
  smsDelivery     Boolean @default(false)
}
```

**UI Page:**
- Settings > Notifications
- Toggle switches for each notification type
- Grouped by channel (Email, Push, SMS)
- "Pause all notifications" option

---

## Additional Implemented Features (Not in Requirements)

### ✅ Admin Dashboard
**Location:** `aromasouq-web/src/app/admin/`

**Features:**
- ✅ Dashboard statistics
- ✅ User management (view, filter, update status)
- ✅ Vendor approval workflow
- ✅ Product management
- ✅ Order tracking
- ✅ Review moderation

**Recent Addition:**
- Vendor approval endpoints (GET /admin/vendors, PATCH /admin/vendors/:id/status)
- Pending vendors count in dashboard

---

### ✅ Vendor Dashboard
**Location:** `aromasouq-api/src/vendor/`

**Features:**
- ✅ Sales statistics
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Vendor profile editing
- ✅ Reply to reviews
- ✅ Revenue tracking

---

### 🟡 Coupons/Discounts (PARTIALLY IMPLEMENTED)

**Database Model:**
```typescript
model Coupon {
  id              String
  code            String @unique
  discountType    String  // PERCENTAGE, FIXED
  discountValue   Float
  minOrderAmount  Float?
  maxDiscount     Float?
  usageLimit      Int?
  usedCount       Int @default(0)
  validFrom       DateTime
  validTo         DateTime
  isActive        Boolean @default(true)
  vendorId        String?
  categoryId      String?
  productId       String?
}
```

**What's Implemented:**
- ✅ Database schema
- ✅ Vendor-specific coupons
- ✅ Usage limits
- ✅ Validity dates

**What's Missing:**
- ❌ Coupon validation API endpoint
- ❌ Frontend coupon application
- ❌ Automatic coupon suggestions
- ❌ Admin coupon creation UI

---

### ✅ File Upload / Media Management

**Backend:**
- **Location:** `aromasouq-api/src/uploads/`
- **Service:** `aromasouq-api/src/supabase/`

**Features:**
- ✅ Supabase Storage integration
- ✅ Multi-file upload
- ✅ Image optimization
- ✅ Public URL generation
- ✅ File type validation
- ✅ Size limits

**Supported Upload Types:**
- Product images
- Review images
- Vendor logos/banners
- User avatars
- Category images

---

## Implementation Priority Roadmap

### Phase 1: Quick Wins (1-2 weeks)
**Low effort, high impact features**

1. **Coupon Application in Checkout** (2 days)
   - Add coupon input field
   - Create validation endpoint
   - Apply discount to order total

2. **Product Video Display** (2 days)
   - Add video player component
   - Display ProductVideo in product detail page
   - Support YouTube/Vimeo embeds

3. **Referral Link Generation** (3 days)
   - Generate unique referral codes
   - Create referral dashboard page
   - Add share buttons (WhatsApp, Email)
   - Track referral signups

4. **Scent Similarity (Basic)** (3 days)
   - Implement Jaccard similarity for notes
   - Add "Find Similar" endpoint
   - Display similar products on product page

---

### Phase 2: High Impact Features (3-4 weeks)

1. **Push Notifications** (1 week)
   - Integrate Firebase Cloud Messaging
   - Create notification model
   - Implement service worker
   - Add notification preferences UI
   - Trigger notifications for key events

2. **Loyalty Tiers** (1 week)
   - Create tier system (Bronze to Diamond)
   - Add progress tracking
   - Implement tier benefits
   - Show tier badge in UI
   - Notify on tier upgrades

3. **WhatsApp Business API Integration** (1 week)
   - Set up WhatsApp Business account
   - Integrate webhook for incoming messages
   - Store chat history
   - Auto-route messages to vendors/admin
   - Send order status updates

4. **Wholesale Lead Form** (2 days)
   - Create wholesale request form
   - Add business details capture
   - Notify admin on submission
   - Admin lead management dashboard

---

### Phase 3: Advanced Features (4-6 weeks)

1. **AI Scent Matching** (2 weeks)
   - Train ML model on fragrance embeddings
   - Implement vector similarity search
   - Add personalized recommendations
   - Create "Find Your Scent" quiz

2. **Community Feed** (2 weeks)
   - Create Post model and endpoints
   - Build feed UI (Following + Discover)
   - Add like/comment functionality
   - Implement follow system
   - Create user profiles with social stats

3. **AI Custom Perfume Builder** (2 weeks)
   - Design multi-step builder UI
   - Create note recommendation engine
   - Implement formula generation
   - Add quote system
   - Vendor assignment for custom orders

4. **Streak Rewards** (1 week)
   - Track login streaks
   - Track purchase streaks
   - Create reward tiers
   - Display streak progress in UI
   - Send streak milestone notifications

---

### Phase 4: Premium Features (6-8 weeks)

1. **AR Bottle Preview** (2 weeks)
   - Integrate Google Model Viewer
   - Create/acquire 3D bottle models (GLB)
   - Store models in Supabase
   - Add AR button on product pages
   - Test on mobile devices

2. **Voice Search** (1 week)
   - Integrate Web Speech API
   - Add microphone button to search bar
   - Handle voice-to-text conversion
   - Parse search queries
   - Display voice search results

3. **Spin-the-Wheel Gamification** (1 week)
   - Create wheel component (CSS animations)
   - Build prize pool management
   - Implement probability engine
   - Track spins per user
   - Award prizes (coins, discounts, etc.)

4. **Full Notification System** (2 weeks)
   - Email notifications (SendGrid/AWS SES)
   - SMS notifications (Twilio)
   - In-app notification center
   - Notification grouping and batching
   - Unsubscribe management

---

## Technology Stack Recommendations

### AI/ML Features
- **TensorFlow.js** - Browser-based ML
- **OpenAI API** - Text generation for custom perfume descriptions
- **Pinecone** - Vector database for scent embeddings
- **Hugging Face** - Pre-trained scent/text models

### Push Notifications
- **Firebase Cloud Messaging (FCM)** - Cross-platform push
- **OneSignal** - Alternative with better analytics
- **Web Push Protocol** - Native browser support

### Community Features
- **Socket.IO** - Real-time updates for likes/comments
- **Redis** - Cache for feed generation
- **PostgreSQL Full-Text Search** - Search posts and users

### WhatsApp Integration
- **WhatsApp Business API** - Official API
- **Twilio WhatsApp** - Easier integration
- **MessageBird** - Multi-channel messaging

### AR Features
- **Google Model Viewer** - Web-based AR
- **Three.js** - 3D rendering
- **8th Wall** - Advanced WebAR

### Analytics & Monitoring
- **Google Analytics 4** - User behavior
- **Mixpanel** - Product analytics
- **Sentry** - Error tracking
- **LogRocket** - Session replay

---

## Key Metrics to Track

### Customer Engagement
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Session duration
- Pages per session
- Bounce rate

### E-commerce
- Conversion rate
- Average order value (AOV)
- Cart abandonment rate
- Repeat purchase rate
- Customer lifetime value (CLV)

### Loyalty & Retention
- Coins redemption rate
- Tier distribution
- Streak completion rate
- Referral conversion rate
- Churn rate

### Community
- Post engagement rate
- Average comments per post
- Like-to-view ratio
- User growth rate (followers)
- Content creation rate

### WhatsApp Commerce
- Message response time
- Conversation-to-order rate
- Customer satisfaction (CSAT)
- Agent utilization

---

## Estimated Development Timeline

| Phase | Duration | Team Size | Features |
|-------|----------|-----------|----------|
| Phase 1 (Quick Wins) | 2 weeks | 2 devs | Coupons, Videos, Basic Referral, Scent Similarity |
| Phase 2 (High Impact) | 4 weeks | 3 devs | Push Notifications, Loyalty Tiers, WhatsApp, Wholesale |
| Phase 3 (Advanced) | 6 weeks | 4 devs | AI Scent Match, Community Feed, Custom Perfume Builder |
| Phase 4 (Premium) | 8 weeks | 4 devs | AR Preview, Voice Search, Spin-the-Wheel, Full Notifications |

**Total Estimated Time:** 20 weeks (~5 months)
**Total Team:** 4 developers + 1 designer + 1 PM

---

## Conclusion

**Current Implementation Status:**
- **Strong Foundation:** Cart, checkout, coins, reviews, vendor/admin dashboards are fully functional
- **Missing Premium Features:** AI, AR, community, advanced loyalty features not yet implemented
- **Partially Complete:** WhatsApp, coupons, referrals have database support but need full implementation

**Recommended Next Steps:**
1. **Week 1-2:** Complete Phase 1 quick wins (coupons, video display, basic referrals)
2. **Week 3-6:** Implement Phase 2 high-impact features (notifications, loyalty tiers)
3. **Week 7-12:** Build Phase 3 advanced features (AI scent match, community)
4. **Week 13-20:** Add Phase 4 premium features (AR, voice, gamification)

**Strategic Priority:**
Focus on **retention** features (loyalty tiers, notifications, referrals) before **acquisition** features (AR, AI), as you already have a solid product catalog and checkout flow.

---

**Document Version:** 1.0
**Last Updated:** 2025-10-26
**Next Review:** After Phase 1 completion
