# AromaSouq — Complete MVP Specification
**Version:** 1.0
**Date:** October 25, 2025
**Status:** Ready for Development

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
9. [Database Schema Overview](#database-schema-overview)
10. [Technical Implementation Notes](#technical-implementation-notes)

---

## 1. Executive Overview

### MVP Scope
AromaSouq MVP is a **luxury fragrance ecosystem marketplace** that combines:
- **Retail shopping** (perfumes, oud, attars, bakhoor, home fragrance, raw materials)
- **B2B wholesale** (sample requests, bulk ordering)
- **Video-first discovery** (reels, product videos)
- **Gamified rewards** (coins, cashback, loyalty tiers)
- **Community engagement** (reviews, posts, follows)
- **WhatsApp commerce** (instant vendor/admin contact)
- **Multi-vendor management** (brand storefronts, analytics)

### Target Users
1. **Customers** - Retail buyers, fragrance enthusiasts, community members
2. **Vendors** - Fragrance brands, manufacturers, wholesalers
3. **Admins** - Platform operators, moderators, sales team

### MVP Goals
- Launch functional e-commerce platform with 10-20 brands
- Process retail + wholesale orders seamlessly
- Build community engagement foundation
- Implement coins/rewards tracking
- Enable WhatsApp commerce workflows
- Provide vendor self-service tools

---

## 2. Design System & UI/UX Guidelines

### Design Philosophy
**"Luxury meets innovation"** — Inspired by Touch of OUD but enhanced with social, AI, and gamification elements.

### Color Palette

#### Primary Colors
```
Oud Gold (Primary):     #C9A86A
Deep Navy (Dark):       #1A1F2E
Charcoal Black:         #0D0D0D
Ivory White:            #FEFEFE
```

#### Accent Colors
```
Rose Gold (Accent):     #E8C4A0
Amber (Highlight):      #D4A574
Sage Green (Success):   #8B9D83
Burgundy (Alert):       #8B3A3A
```

#### Semantic Colors
```
Success Green:          #4CAF50
Warning Amber:          #FFA726
Error Red:              #EF5350
Info Blue:              #42A5F5
```

### Typography

#### Arabic Font Stack
```css
font-family: 'Tajawal', 'Cairo', 'Almarai', -apple-system, BlinkMacSystemFont, sans-serif;
```

#### English Font Stack
```css
font-family: 'Playfair Display', 'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

#### Font Sizes
```
H1: 48px / 3rem (Hero titles)
H2: 36px / 2.25rem (Section headers)
H3: 28px / 1.75rem (Card titles)
H4: 24px / 1.5rem (Subsections)
Body: 16px / 1rem (Main text)
Small: 14px / 0.875rem (Metadata)
Tiny: 12px / 0.75rem (Labels)
```

### Spacing System
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

### Component Patterns

#### Buttons
- **Primary**: Oud Gold background, white text, subtle shadow
- **Secondary**: Transparent with Oud Gold border
- **Ghost**: Text only, hover underline
- **Sizes**: Small (32px), Medium (40px), Large (48px)

#### Cards
- White background with subtle shadow
- 8px border radius
- Hover: lift effect with increased shadow
- Image aspect ratio: 3:4 for products

#### Navigation
- Sticky header with blur background
- Mega menu for categories
- Mobile: slide-out drawer
- Bilingual toggle (EN/AR with RTL support)

---

## 3. Customer-Side Features

### 3.1 Homepage

#### Hero Section
- **Full-width carousel** with 3-5 promotional banners
- Auto-play every 5 seconds
- Overlay text with CTA buttons
- Mobile: Single column, touch swipe

#### Featured Categories
- **Grid layout**: 6-8 category cards
- Each card: Image, category name, product count
- Hover effect: zoom + overlay
- Quick navigation to category pages

#### Shop by Mood/Occasion
- **Curated collections**: "Summer Oud", "Office Wear", "Date Night", "Ramadan Specials"
- Horizontal scroll on mobile
- Click → filtered product list

#### Trending Products Carousel
- **12 products** in scrollable carousel
- Product card: Image, name, price, quick-add, wishlist
- "View All" button → Shop page

#### Best Sellers
- Same layout as Trending
- Data-driven based on sales volume

#### Video Reels Section
- **Grid of 6 reels** (2x3 on desktop, 1x6 on mobile)
- Thumbnail with play icon
- Click → opens modal video player
- Links to product in reel

#### Community Highlights
- **Latest posts** from community feed
- 3-4 featured posts with images
- "Join Community" CTA

#### Brands We Love
- **Logo carousel** of onboarded brands
- Click → brand storefront page

#### Newsletter Signup
- Email input with "Subscribe" button
- Offer: "Get 50 coins on signup!"

#### Footer
- Links: About, Contact, Shipping, Returns, Privacy, Terms
- Social media icons
- Payment methods icons
- Language toggle

---

### 3.2 Shop / Product Listing Page

#### Layout
- **Left sidebar**: Filters (collapsible on mobile)
- **Main area**: Product grid (3 cols desktop, 2 cols tablet, 1 col mobile)
- **Top bar**: Sort dropdown, view toggle (grid/list), results count

#### Filters
- **Category**: Perfume, Oud, Attar, Bakhoor, Home Fragrance, Essentials, Raw Materials
- **Brand**: Multi-select checkboxes
- **Price Range**: Slider (0 - 5000 AED)
- **Scent Family**: Woody, Floral, Oriental, Fresh, Spicy, etc.
- **Notes**: Oud, Rose, Saffron, Amber, Musk, Sandalwood, etc.
- **Country**: UAE, Saudi, France, Italy, etc.
- **Type**: Original, Clone, Same DNA, Custom
- **Fulfillment**: Brand Fulfilled, Platform Fulfilled
- **Availability**: In Stock, Pre-Order
- **Tags**: Vegan, Alcohol-Free, Long-Lasting, Unisex

#### Sort Options
- Relevance
- Price: Low to High
- Price: High to Low
- Newest First
- Best Sellers
- Top Rated

#### Product Card
- **Image**: 3:4 ratio, hover shows secondary image
- **Wishlist icon**: Top-right corner
- **Badge**: "New", "Sale", "Low Stock", "Clone"
- **Brand name**: Clickable
- **Product name**: 2 lines max with ellipsis
- **Price**: Current price, strikethrough if on sale
- **Rating**: Stars + review count
- **Quick Actions**:
  - "Add to Cart" button
  - "Quick View" icon (opens modal)
  - "Compare" checkbox

#### Pagination
- Load more button or infinite scroll
- Show 24 products per page initially

---

### 3.3 Product Detail Page

#### Breadcrumb Navigation
```
Home > Perfumes > Woody Oriental > Product Name
```

#### Product Gallery (Left Side - 60%)
- **Main image**: Large view (zoom on hover)
- **Thumbnail strip**: 4-6 images below or side
- **Video/Reel**: If available, play inline
- **360° view**: If available
- **AR Preview Button**: "View in your space" (mobile only)

#### Product Info (Right Side - 40%)

##### Product Header
- Brand name (linked)
- Product name (H1)
- Rating stars + review count (linked to reviews)
- Share icons (WhatsApp, Instagram, Copy Link)

##### Pricing
- Current price (large, Oud Gold)
- Original price (if on sale, strikethrough)
- Discount percentage badge
- "Earn X coins on this purchase" badge

##### Variants
- **Size**: Dropdown or swatches (30ml, 50ml, 100ml)
- **Concentration**: EDP, EDT, Parfum, Attar
- **Packaging**: Standard, Gift Box, Custom Wrap

##### Quantity Selector
- Plus/minus buttons
- Stock availability ("12 left in stock")

##### Action Buttons
- **Add to Cart** (Primary, large)
- **Buy Now** (Secondary)
- **Add to Wishlist** (Icon button)
- **Ask for Wholesale Sample** (Link button)
- **Request Custom Version** (Link button)

##### WhatsApp Quick Contact
- Button: "Chat on WhatsApp"
- Pre-filled message: "Hi, I'm interested in [Product Name] - [Product URL]"
- Routes to vendor or admin based on fulfillment type

##### Trust Badges
- Free shipping over 500 AED
- Same-day delivery (UAE)
- Authentic guarantee
- Easy returns (14 days)

##### Scent Profile Section
- **Scent Family**: Woody Oriental
- **Top Notes**: Saffron, Bergamot
- **Heart Notes**: Rose, Jasmine
- **Base Notes**: Oud, Amber, Musk
- Visual pyramid diagram

##### Product Description
- Full HTML description
- Collapsible "Read More"
- Key features in bullet points

##### Product Details Table
- Brand, Country, Type, Volume, Concentration
- Longevity, Sillage, Season, Gender
- Ingredients, Vegan, Alcohol-free

##### Delivery & Returns
- Estimated delivery date
- Shipping cost
- Return policy summary

##### AI Scent Match
- "Find similar scents" button
- Opens modal with AI-suggested products
- Based on notes, brand, price range

---

#### Product Tabs (Below main section)

##### Tab 1: Reviews & Ratings
- Overall rating breakdown (5★ - 1★ with bars)
- Review filters: Verified Purchase, Rating, Sort
- Review cards:
  - User name, avatar, date
  - Star rating
  - Review title + text
  - Images/videos uploaded by user
  - Helpful votes (thumbs up)
  - Report button
- "Write a Review" button (logged-in users)

##### Tab 2: Questions & Answers
- List of Q&A from customers
- "Ask a Question" button
- Vendor can answer
- Community can upvote answers

##### Tab 3: Reels & Videos
- Grid of user-generated and brand videos
- Click to play in modal
- Like, comment, share options

##### Tab 4: Shipping & Returns
- Detailed shipping policy
- Return instructions
- FAQ section

---

#### Related Products Section
- "You May Also Like" carousel
- AI-recommended based on:
  - Same brand
  - Similar notes
  - Same price range
  - Frequently bought together

#### Recently Viewed
- User's browsing history (session-based)

---

### 3.4 Cart Page

#### Cart Items List
- Product image thumbnail
- Product name, brand, variant
- Unit price
- Quantity selector (update in real-time)
- Subtotal
- Remove button
- "Save for Later" button

#### Cart Summary (Sidebar)
- Subtotal
- Shipping estimate (or "Free shipping!")
- Tax/VAT (if applicable)
- **Coins to Earn**: "Earn 50 coins with this order"
- **Total** (large, bold)
- Promo code input field
- "Apply" button
- "Proceed to Checkout" button

#### Recommendations
- "Complete your set" suggestions
- Cross-sell relevant products

#### Empty Cart State
- Icon + message "Your cart is empty"
- "Continue Shopping" button

---

### 3.5 Checkout Page

#### Multi-Step Process
1. **Shipping Address**
2. **Delivery Method**
3. **Payment**
4. **Review & Place Order**

#### Step 1: Shipping Address
- Saved addresses (radio select)
- "Add New Address" button
  - Full name, phone
  - Address line 1, 2
  - City, Emirate/Province, Country
  - ZIP code
  - Address type (Home, Office)
  - "Save for future" checkbox

#### Step 2: Delivery Method
- Standard delivery (3-5 days) - Free over 500 AED
- Express delivery (1-2 days) - 25 AED
- Same-day delivery (UAE only) - 50 AED
- Store pickup (if available)

#### Step 3: Payment
- **Payment Methods**:
  - Credit/Debit Card (Stripe/Tap)
  - Apple Pay / Google Pay
  - Cash on Delivery (if enabled)
  - Wallet + Coins (partial or full)
- Billing address (same as shipping or different)
- "Save card for future" checkbox

#### Step 4: Review & Place Order
- Order summary (all items, quantities, prices)
- Shipping address confirmation
- Delivery method confirmation
- Payment method confirmation
- **Coins Breakdown**:
  - "You will earn X coins"
  - "You used Y coins (-Z AED)"
- Terms & Conditions checkbox
- "Place Order" button (large, primary)

#### Order Success Page
- Order number
- Confirmation message
- "Track Order" button
- **Coins Earned Banner**: "Congratulations! You earned 50 coins"
- Email confirmation sent message
- "Continue Shopping" or "View Order" buttons

---

### 3.6 User Account Pages

#### My Account Dashboard
- Welcome message with user name
- Quick stats:
  - Total orders
  - Coins balance
  - Loyalty tier (Silver/Gold/Platinum)
  - Wishlist count
- Quick actions:
  - Track Order
  - View Wishlist
  - Redeem Coins
  - Update Profile

#### Orders
- List of all orders (tabs: All, Pending, Shipped, Delivered, Cancelled)
- Order card:
  - Order number, date
  - Product images (first 3)
  - Total amount
  - Status badge
  - "Track" and "View Details" buttons

#### Order Details
- Order timeline (Placed → Confirmed → Shipped → Delivered)
- Product list with quantities
- Shipping address
- Payment method
- Invoice download button
- "Reorder" button
- "Request Return" button (if eligible)

#### Wishlist
- Grid of wishlisted products
- Quick add to cart
- Remove button
- "Share Wishlist" button

#### Wallet & Coins
- **Coins Balance** (large display)
- **Cashback Balance** (AED)
- Transaction history:
  - Date, description, coins +/-
  - "Earned from order #123"
  - "Redeemed on order #456"
- "Redeem Coins" button (shows conversion rate: 100 coins = 10 AED)

#### Loyalty Program
- Current tier display (Silver/Gold/Platinum)
- Progress bar to next tier
- Benefits of each tier
- Points needed to upgrade
- "Refer a Friend" CTA

#### Profile Settings
- Personal info: Name, email, phone, DOB, gender
- "Change Password" button
- Preferred language (EN/AR)
- Email/SMS notification preferences
- "Delete Account" button

#### Addresses
- List of saved addresses
- Edit/Delete buttons
- "Add New Address" button
- Set default address

#### Reviews & Ratings
- All reviews user has written
- Edit/Delete options

#### Referrals
- Referral code display
- Copy link button
- Share on social media
- Referral stats (invited, joined, earned)

---

### 3.7 Community Feed Page

#### Feed Layout
- **Left sidebar (20%)**: Navigation
  - Home
  - Following
  - Trending
  - My Posts
  - Saved Posts
  - Create Post

- **Main feed (60%)**: Posts
  - Infinite scroll
  - Post types: Text, Image, Video, Reel, Unboxing

- **Right sidebar (20%)**: Suggestions
  - Recommended users to follow
  - Trending hashtags
  - Community rules

#### Post Card
- User avatar, name, badge (Verified Buyer, Top Reviewer)
- Post timestamp
- Post content (text, image, video)
- Product tagged (if any) - clickable
- Engagement: Like, Comment, Share, Save
- Comment count
- "View Comments" link

#### Create Post Modal
- Text input
- Upload images/videos
- Tag product (search dropdown)
- Add hashtags
- Privacy: Public, Followers Only
- "Post" button

#### Post Detail Page
- Full post view
- All comments (nested replies)
- Like, comment, share options

---

### 3.8 Wholesale / Sample Request Flow

#### "Ask for Wholesale" Button Click
Opens modal/form:
- Business name
- Contact person
- Email, phone
- Business type (Retailer, Distributor, Hotel, Spa, etc.)
- Quantity needed
- Message/Requirements
- "Request Free Sample" checkbox
- "Submit Request" button

#### Confirmation
- "Request submitted" message
- "A sales representative will contact you within 24 hours"
- Request ID for tracking

#### My Requests Page (Account)
- List of all wholesale/sample requests
- Status: Pending, Contacted, Quote Sent, Ordered, Closed
- Request details
- Follow-up messages

---

### 3.9 Custom Perfume Request Flow

#### "Request Custom Version" Button Click
Opens multi-step form:

**Step 1: Inspiration**
- Upload image or describe scent
- Select base product (if cloning)
- Occasion/Mood (dropdown)

**Step 2: Scent Preferences**
- Scent family (checkboxes)
- Preferred notes (multi-select)
- Intensity (slider: Light → Strong)
- Longevity (slider: 4hrs → 12hrs+)

**Step 3: Details**
- Quantity (30ml, 50ml, 100ml)
- Packaging (Standard, Premium, Gift)
- Budget range (slider)
- Delivery urgency

**Step 4: Contact**
- Name, email, phone
- Additional notes
- "Submit Request" button

#### Confirmation
- "Custom request submitted"
- "Our perfumer will contact you with a quote"
- Request tracking ID

---

### 3.10 AI Scent Discovery

#### AI Scent Match Page
- **Search by Name**: Input field "Find perfumes similar to..."
- **Search by Notes**: Multi-select dropdown (Oud, Rose, Amber, etc.)
- **Search by Image**: Upload a bottle image (AI identifies)
- **Voice Search**: Mic button "Describe the scent you want"

#### Results
- AI confidence score
- "Based on your search, here are X matches"
- Product grid with match percentage
- Filter by price, brand, availability

#### AI Custom Perfume Builder
- Interactive quiz:
  1. "What's the occasion?" (Date, Office, Party, Daily, etc.)
  2. "Select your vibe" (Fresh, Bold, Elegant, Mysterious)
  3. "Pick your favorite notes" (Visual grid)
  4. "Intensity preference" (Slider)
- AI generates formula suggestion
- Shows estimated price
- "Request This Blend" button

---

### 3.11 Brand Storefront Page

#### Brand Header
- Brand logo and cover image
- Brand name and tagline
- Follower count
- "Follow" button
- Social media links
- "Chat on WhatsApp" button

#### Brand Story Section
- About the brand (rich text)
- Brand video/reel

#### Products Grid
- All products from this brand
- Filters: Category, Price, Sort
- Same product card as shop page

#### Special Offers
- Brand-specific coupons and deals

#### Brand Reviews
- Aggregate rating
- Recent reviews for brand products

---

### 3.12 Blog / Content Pages

#### Blog Listing
- Grid of blog posts
- Featured post (large card)
- Post preview: Image, title, excerpt, date, author
- Categories: Fragrance Tips, Ingredient Stories, Style Guide, Seasonal

#### Blog Post Page
- Hero image
- Title, author, date, read time
- Rich content (HTML)
- Related products widget
- Share buttons
- Related posts section

---

### 3.13 Static Pages

#### About Us
- Brand story
- Mission & vision
- Team photos (optional)
- Values

#### Contact Us
- Contact form (name, email, message)
- Email, phone, address
- WhatsApp button
- Map embed (if physical location)

#### Shipping & Delivery
- Shipping zones
- Delivery times
- Costs
- Tracking info

#### Returns & Refund Policy
- Return window
- Conditions
- Process
- Refund timeline

#### Privacy Policy
- Data collection
- Usage
- Third parties
- User rights

#### Terms & Conditions
- User agreement
- Vendor terms
- Purchase terms
- Dispute resolution

#### FAQ
- Accordion-style Q&A
- Categories: Ordering, Shipping, Returns, Products, Account

---

### 3.14 Search Page

#### Global Search
- Search bar in header
- Auto-suggest dropdown:
  - Products (with thumbnail)
  - Brands
  - Categories
  - Blog posts
  - Community posts

#### Search Results Page
- Tabs: All, Products, Brands, Posts, Content
- Product results: Grid view
- Brand results: List with logo
- Sorting and filtering

---

### 3.15 Notifications

#### In-App Notifications (Dropdown)
- Recent notifications (10 max)
- Types:
  - Order updates
  - Coins earned
  - Wishlist price drops
  - Community interactions (likes, comments, follows)
  - Admin announcements
- Mark as read/unread
- "View All" link

#### Notification Settings (in Profile)
- Email notifications (on/off per type)
- SMS notifications
- Push notifications (web/app)

---

## 4. Vendor-Side Features

### 4.1 Vendor Dashboard

#### Overview Cards
- **Total Sales** (this month)
- **Total Orders** (pending, completed)
- **Products Listed**
- **Average Rating**
- **Wallet Balance** (pending, available)

#### Recent Orders Table
- Order number, date, customer, items, total, status
- Quick actions: View, Fulfill, Invoice

#### Sales Chart
- Line graph (last 30 days)
- Filter: 7 days, 30 days, 3 months, year

#### Top Products
- Product name, sales count, revenue

#### Pending Actions
- Products awaiting approval
- Orders to fulfill
- Questions to answer
- Reviews to respond to

---

### 4.2 Products Management

#### Products List
- Table view with columns:
  - Image thumbnail
  - Name, SKU
  - Category, Brand
  - Price, Stock
  - Status (Active, Draft, Out of Stock)
  - Actions (Edit, Duplicate, Delete)
- Filters: Category, Status, Stock level
- Bulk actions: Delete, Activate, Deactivate
- "Add New Product" button

#### Add/Edit Product Form

##### Basic Info Tab
- Product name (EN/AR)
- Brand (dropdown)
- Category (dropdown with sub-categories)
- Product type (Original, Clone, Same DNA, Custom)
- SKU (auto-generate option)
- Description (rich text editor)

##### Pricing Tab
- Regular price
- Sale price (optional)
- Cost price (for margin calculation)
- Tax class
- Coins to award on purchase

##### Inventory Tab
- Stock quantity
- Low stock threshold
- Allow backorders (yes/no)
- Stock status (In Stock, Out of Stock, Pre-Order)

##### Images & Media Tab
- Upload product images (drag & drop, multiple)
- Set featured image
- Upload product video/reel (YouTube link or upload)
- Image alt text for SEO

##### Variants Tab
- Size variants (30ml, 50ml, 100ml)
- Concentration variants (EDP, EDT, Attar)
- Packaging variants (Standard, Gift Box)
- Each variant: price, SKU, stock

##### Scent Profile Tab
- Scent family (dropdown)
- Top notes (multi-select)
- Heart notes (multi-select)
- Base notes (multi-select)
- Longevity (slider: 4-12+ hrs)
- Sillage (slider: Intimate → Projecting)
- Season (Spring, Summer, Fall, Winter)
- Gender (Male, Female, Unisex)

##### Details Tab
- Country of origin
- Volume/Size
- Ingredients
- Vegan (yes/no)
- Alcohol-free (yes/no)
- Cruelty-free (yes/no)

##### Shipping Tab
- Weight
- Dimensions (L x W x H)
- Shipping class (Standard, Fragile, Hazmat)
- Fulfillment type (Brand Fulfilled, Platform Fulfilled, Hybrid)

##### SEO Tab
- Meta title
- Meta description
- URL slug
- Focus keyword

##### Settings Tab
- Enable WhatsApp contact (yes/no)
- WhatsApp number (if different from default)
- Enable reviews (yes/no)
- Enable wholesale inquiry (yes/no)
- Enable custom request (yes/no)
- Product visibility (Public, Hidden, Password Protected)

#### Save Options
- Save as Draft
- Save & Publish
- Schedule publish

---

### 4.3 Orders Management

#### Orders List
- Tabs: All, Pending, Processing, Shipped, Delivered, Cancelled, Refunded
- Table columns:
  - Order number, date
  - Customer name
  - Items count
  - Total amount
  - Coins redeemed
  - Status
  - Actions (View, Fulfill, Invoice, Refund)
- Filters: Date range, status, payment method
- Export to CSV button

#### Order Detail Page

##### Order Info
- Order number, date, time
- Customer name, email, phone
- Shipping address
- Billing address
- Payment method
- Order notes

##### Order Items Table
- Product image, name, SKU
- Variant details
- Quantity
- Unit price
- Total

##### Order Summary
- Subtotal
- Shipping cost
- Tax/VAT
- Coins redeemed (-X AED)
- Discount (if any)
- **Total**

##### Order Actions
- **Update Status** (dropdown + button)
  - Confirmed
  - Processing
  - Shipped (add tracking number)
  - Delivered
  - Cancelled (reason required)
- **Add Order Note** (internal or customer-facing)
- **Send Invoice** (email)
- **Process Refund** (full or partial)

##### Order Timeline
- Order placed
- Payment confirmed
- Order confirmed by vendor
- Order shipped (tracking link)
- Order delivered

##### Customer Info Card
- Customer name, email
- Total orders from this customer
- Total spent
- "View Customer Profile" link

---

### 4.4 Analytics & Reports

#### Sales Reports
- **Date range selector**
- **Total revenue** (graph + number)
- **Order count** (graph + number)
- **Average order value**
- **Revenue by category** (pie chart)
- **Revenue by product** (bar chart)
- Export button

#### Product Performance
- Top selling products (table: name, units sold, revenue)
- Low stock alerts
- Out of stock products
- Products with no sales (last 30 days)

#### Customer Insights
- New vs returning customers
- Top customers (by spend)
- Customer acquisition sources
- Geographic distribution (map or table)

#### Marketing Performance
- Coupon usage
- Campaign ROI (if ads enabled)
- Affiliate/influencer sales

---

### 4.5 Reviews & Q&A

#### Product Reviews
- List all reviews on vendor's products
- Filter by product, rating, date
- **Pending Response** tab
- Review card:
  - Product name
  - Customer name, rating, date
  - Review text
  - Vendor response (if any)
  - "Respond" button

#### Respond to Review
- Text input (max 500 chars)
- "Submit Response" button
- Shows publicly on product page

#### Questions & Answers
- All questions on vendor's products
- Similar layout to reviews
- Answer questions inline

---

### 4.6 Coupons & Promotions

#### Coupon List
- Table: Code, type, discount, usage/limit, expiry, status
- "Create Coupon" button

#### Create Coupon Form
- Coupon code (auto-generate option)
- Discount type (Percentage, Fixed Amount, Free Shipping)
- Discount value
- Minimum order value
- Maximum discount cap
- Usage limit (total, per user)
- Expiry date
- Applicable products/categories
- Exclude sale items (yes/no)
- "Create" button

---

### 4.7 Storefront Settings

#### Brand Profile
- Brand logo upload
- Cover image upload
- Brand name (EN/AR)
- Tagline
- Description (rich text)
- Brand story video (upload or YouTube link)
- Social media links (Instagram, TikTok, Website)
- Contact email
- WhatsApp number
- "Save Changes" button

#### Storefront Customization
- Primary brand color
- Banner images (upload multiple for carousel)
- Featured products (drag & drop to reorder)
- Show/hide sections

---

### 4.8 Payouts & Wallet

#### Wallet Balance
- **Available Balance** (can be withdrawn)
- **Pending Balance** (in escrow, unreleased)
- Transaction history table:
  - Date, description, amount, status

#### Payout Requests
- "Request Payout" button (if balance > minimum)
- Payout method: Bank Transfer, PayPal, etc.
- Enter amount
- Bank details (saved or new)
- "Submit Request" button

#### Payout History
- Date, amount, method, status (Pending, Completed)
- Download receipt

---

### 4.9 Campaigns & Ads (If vendor runs ads via platform)

#### My Campaigns
- List of campaigns (Active, Paused, Completed)
- Campaign card:
  - Name
  - Budget spent / total
  - Impressions, clicks, conversions
  - ROI
  - "View Report" button

#### Create Campaign
- Campaign name
- Budget
- Duration (start/end date)
- Target audience (location, interests)
- Ad creative (banner upload)
- Linked products
- "Launch Campaign" button

---

### 4.10 Settings

#### Business Information
- Business name
- Legal entity name
- Tax ID / VAT number
- Business license upload
- Contact person
- Email, phone

#### Bank Details
- Bank name
- Account holder name
- Account number
- IBAN
- Swift code

#### Shipping Settings
- Shipping zones (countries/regions)
- Shipping rates per zone
- Handling time (days)
- Free shipping threshold

#### Notifications
- Email notifications (new orders, low stock, reviews)
- SMS notifications

#### API Keys (Advanced)
- Generate API keys for integrations

---

## 5. Admin-Side Features

### 5.1 Admin Dashboard

#### Key Metrics (Cards)
- Total Revenue (all-time, this month)
- Total Orders (pending, completed)
- Total Customers
- Total Vendors (active, pending approval)
- Total Products
- Total Community Posts
- Platform Commission Earned

#### Charts
- Revenue over time (line graph)
- Orders by status (pie chart)
- Top categories by sales (bar chart)

#### Recent Activity Feed
- New vendor registrations
- New products submitted
- New wholesale leads
- Flagged community posts
- Low stock alerts

#### Quick Actions
- Approve pending vendors
- Moderate community
- Review wholesale leads
- Generate reports

---

### 5.2 Vendor Management

#### Vendors List
- Tabs: All, Active, Pending Approval, Suspended
- Table columns:
  - Vendor name, email
  - Date joined
  - Products count
  - Total sales
  - Commission earned
  - Status
  - Actions (View, Edit, Approve, Suspend)

#### Vendor Detail Page
- Vendor info (business name, contact, tax ID, bank details)
- Products list (link to products)
- Orders list (link to orders)
- Sales analytics
- Commission breakdown
- Payout history
- **Actions**:
  - Edit info
  - Approve/Suspend
  - Send message
  - View storefront

#### Approve Vendor
- Review submitted documents
- KYC verification checklist
- "Approve" or "Reject" button (with reason)

---

### 5.3 Product Management

#### All Products List
- View all products from all vendors
- Filters: Vendor, category, status (pending, approved, flagged)
- Bulk actions: Approve, Reject, Delete
- "Add Product" button (platform-fulfilled products)

#### Product Moderation
- **Pending Approval** tab
- Review product details
- Check for policy violations
- Approve or Reject with feedback

---

### 5.4 Order Management

#### All Orders List
- View all orders from all vendors
- Filters: Date, vendor, status, payment method
- Export to CSV

#### Order Detail
- Same as vendor order detail
- Additional actions:
  - Override status
  - Issue refund (even if vendor hasn't)
  - Contact customer/vendor

---

### 5.5 Customer Management

#### Customers List
- Table: Name, email, phone, join date, orders, total spent, status
- Search by name, email, phone
- Actions: View, Edit, Suspend, Delete

#### Customer Detail Page
- Personal info
- Order history
- Wishlist
- Wallet & coins balance
- Community activity (posts, reviews)
- Support tickets
- **Actions**:
  - Edit info
  - Add/deduct coins manually
  - Suspend account
  - Send email

---

### 5.6 Wholesale & Custom Leads

#### Leads List
- Tabs: Wholesale, Custom Perfume, Manufacturing
- Table columns:
  - Lead ID, date
  - Customer name, business name
  - Product (if linked)
  - Status (New, Contacted, Quote Sent, Won, Lost)
  - Assigned to (sales rep)
  - Actions (View, Assign, Update Status)

#### Lead Detail Page
- Customer/business info
- Request details
- Communication log (emails, calls, WhatsApp)
- Add note
- Update status
- Assign to vendor or sales rep
- Convert to order (if won)

---

### 5.7 Community Moderation

#### Posts Feed
- View all community posts
- Filters: Status (Published, Flagged, Removed), Date, User
- Post card with:
  - User info
  - Post content preview
  - Engagement stats
  - Reports count (if flagged)
  - Actions: Approve, Hide, Delete, Ban User

#### Reported Posts
- List of flagged posts
- Report reason (spam, inappropriate, fake)
- Reporter info
- Review content
- Take action: Dismiss, Hide Post, Remove Post, Ban User

---

### 5.8 Content Management

#### Pages Manager
- List of static pages (About, Contact, FAQ, etc.)
- Edit page content (rich text editor)
- SEO settings per page

#### Blog Manager
- Blog posts list
- Create/Edit post
- Categories and tags
- Featured image
- Publish/schedule

#### Homepage Builder (Optional)
- Drag & drop sections
- Configure hero banners
- Curate featured products, categories, brands

#### Menu Manager
- Edit header navigation
- Edit footer links
- Drag & drop to reorder

---

### 5.9 Coins & Loyalty

#### Coins Settings
- Earning rate (% of order value or fixed amount)
- Redemption rate (100 coins = X AED)
- Expiry rules (days of inactivity)
- Signup bonus coins
- Referral bonus coins

#### Loyalty Tiers
- Define tier thresholds (Silver 0-1000 coins, Gold 1001-5000, Platinum 5001+)
- Benefits per tier (free shipping, extra discounts, early access)

#### Coins Transactions
- View all coins earned/redeemed by all users
- Export data

---

### 5.10 Marketing & Campaigns

#### Email Campaigns
- Create campaign
- Select audience (all, segment, custom list)
- Email template editor
- Schedule send
- View analytics (open rate, click rate, conversions)

#### SMS Campaigns
- Similar to email

#### Push Notifications
- Create notification
- Target: All, Specific Users, Segments
- Schedule
- Track delivery

#### Coupons (Platform-Level)
- Create platform-wide coupons
- Same interface as vendor coupons

#### Influencer Management
- List of registered influencers
- Commission structure
- Sales tracking per influencer
- Payout management

---

### 5.11 Analytics & Reports

#### Sales Analytics
- Total revenue, orders, AOV
- Revenue by category, vendor, product
- Filter by date range
- Export reports

#### Customer Analytics
- New vs returning
- Customer lifetime value
- Churn rate
- Top customers

#### Traffic Analytics
- Page views
- Unique visitors
- Traffic sources
- Bounce rate
- Conversion rate

#### Product Analytics
- Best sellers
- Low performers
- Out of stock impact

#### Financial Reports
- Revenue breakdown
- Commission earned
- Payouts to vendors
- Refunds issued
- Tax collected

---

### 5.12 Settings

#### General Settings
- Site name, logo, favicon
- Default language
- Currency
- Timezone
- Date/time format

#### Shipping Settings
- Shipping zones
- Shipping methods
- Rates
- Free shipping threshold

#### Payment Settings
- Enable/disable payment gateways (Stripe, Tap, PayTabs)
- API keys configuration
- COD settings
- Wallet payment settings

#### Tax Settings
- VAT/Tax rate
- Tax classes
- Countries where tax applies

#### Email Settings
- SMTP configuration
- Email templates (order confirmation, shipping, etc.)
- Sender name and email

#### WhatsApp Settings
- WhatsApp Business API credentials
- Default admin WhatsApp number
- Message templates

#### AI Settings
- OpenAI API key (for AI scent match, custom builder)
- Model selection
- Usage limits

#### Storage Settings
- S3 / Cloudflare R2 credentials
- CDN configuration

#### Security Settings
- Two-factor authentication
- IP whitelist for admin panel
- Rate limiting

#### Roles & Permissions
- Admin roles (Super Admin, Sales Manager, Moderator, etc.)
- Assign permissions per role

---

## 6. Complete Page Map

### Customer-Facing (Public)
```
/                                 → Homepage
/shop                             → Product Listing
/shop/[category]                  → Category Page
/product/[slug]                   → Product Detail
/brands                           → All Brands
/brand/[slug]                     → Brand Storefront
/cart                             → Shopping Cart
/checkout                         → Checkout Flow
/order-success                    → Order Confirmation

/account                          → Account Dashboard
/account/orders                   → Order History
/account/orders/[id]              → Order Detail
/account/wishlist                 → Wishlist
/account/wallet                   → Wallet & Coins
/account/loyalty                  → Loyalty Program
/account/profile                  → Profile Settings
/account/addresses                → Saved Addresses
/account/reviews                  → My Reviews
/account/referrals                → Referral Program
/account/requests                 → Wholesale/Custom Requests

/community                        → Community Feed
/community/post/[id]              → Post Detail
/community/user/[id]              → User Profile

/ai/scent-match                   → AI Scent Discovery
/ai/custom-builder                → AI Custom Perfume

/blog                             → Blog Listing
/blog/[slug]                      → Blog Post

/about                            → About Us
/contact                          → Contact Us
/shipping                         → Shipping Info
/returns                          → Returns Policy
/privacy                          → Privacy Policy
/terms                            → Terms & Conditions
/faq                              → FAQ

/search?q=[query]                 → Search Results
```

### Vendor Panel
```
/vendor                           → Vendor Dashboard
/vendor/products                  → Products List
/vendor/products/new              → Add Product
/vendor/products/[id]/edit        → Edit Product
/vendor/orders                    → Orders List
/vendor/orders/[id]               → Order Detail
/vendor/analytics                 → Analytics & Reports
/vendor/reviews                   → Reviews & Q&A
/vendor/coupons                   → Coupons Management
/vendor/storefront                → Storefront Settings
/vendor/wallet                    → Wallet & Payouts
/vendor/campaigns                 → Ad Campaigns (if enabled)
/vendor/settings                  → Vendor Settings
```

### Admin Panel
```
/admin                            → Admin Dashboard
/admin/vendors                    → Vendors List
/admin/vendors/[id]               → Vendor Detail
/admin/products                   → All Products
/admin/orders                     → All Orders
/admin/customers                  → Customers List
/admin/customers/[id]             → Customer Detail
/admin/leads                      → Wholesale/Custom Leads
/admin/community                  → Community Moderation
/admin/content/pages              → Pages Manager
/admin/content/blog               → Blog Manager
/admin/content/menus              → Menu Manager
/admin/coins                      → Coins & Loyalty Settings
/admin/marketing/email            → Email Campaigns
/admin/marketing/sms              → SMS Campaigns
/admin/marketing/push             → Push Notifications
/admin/marketing/coupons          → Platform Coupons
/admin/marketing/influencers      → Influencer Management
/admin/analytics                  → Analytics & Reports
/admin/settings/general           → General Settings
/admin/settings/shipping          → Shipping Settings
/admin/settings/payment           → Payment Settings
/admin/settings/tax               → Tax Settings
/admin/settings/email             → Email Settings
/admin/settings/whatsapp          → WhatsApp Settings
/admin/settings/ai                → AI Settings
/admin/settings/storage           → Storage Settings
/admin/settings/security          → Security Settings
/admin/settings/roles             → Roles & Permissions
```

**Total Pages: ~80+ unique pages**

---

## 7. Backend API Specification

### 7.1 Authentication & Users

#### Auth Endpoints
```
POST   /api/v1/auth/register              Register new user
POST   /api/v1/auth/login                 Login
POST   /api/v1/auth/logout                Logout
POST   /api/v1/auth/refresh-token         Refresh JWT
POST   /api/v1/auth/forgot-password       Request password reset
POST   /api/v1/auth/reset-password        Reset password with token
POST   /api/v1/auth/verify-email          Verify email with token
POST   /api/v1/auth/resend-verification   Resend verification email
```

#### User Endpoints
```
GET    /api/v1/users/me                   Get current user profile
PUT    /api/v1/users/me                   Update profile
DELETE /api/v1/users/me                   Delete account
POST   /api/v1/users/change-password      Change password
GET    /api/v1/users/me/addresses         Get saved addresses
POST   /api/v1/users/me/addresses         Add address
PUT    /api/v1/users/me/addresses/:id     Update address
DELETE /api/v1/users/me/addresses/:id     Delete address
```

### 7.2 Products

```
GET    /api/v1/products                   Get all products (with filters, pagination)
GET    /api/v1/products/:id               Get product by ID
GET    /api/v1/products/slug/:slug        Get product by slug
POST   /api/v1/products                   Create product (vendor/admin)
PUT    /api/v1/products/:id               Update product
DELETE /api/v1/products/:id               Delete product
GET    /api/v1/products/:id/related       Get related products
GET    /api/v1/products/:id/reviews       Get product reviews
POST   /api/v1/products/:id/reviews       Create review
GET    /api/v1/products/:id/questions     Get Q&A
POST   /api/v1/products/:id/questions     Ask question
POST   /api/v1/products/:id/questions/:qid/answers  Answer question
GET    /api/v1/products/:id/media         Get product videos/reels
POST   /api/v1/products/:id/views         Track product view
```

### 7.3 Categories & Brands

```
GET    /api/v1/categories                 Get all categories
GET    /api/v1/categories/:id             Get category by ID
GET    /api/v1/categories/:id/products    Get products in category

GET    /api/v1/brands                     Get all brands
GET    /api/v1/brands/:id                 Get brand by ID
GET    /api/v1/brands/slug/:slug          Get brand by slug
GET    /api/v1/brands/:id/products        Get brand products
POST   /api/v1/brands/:id/follow          Follow brand
DELETE /api/v1/brands/:id/follow          Unfollow brand
```

### 7.4 Cart & Wishlist

```
GET    /api/v1/cart                       Get user's cart
POST   /api/v1/cart/items                 Add item to cart
PUT    /api/v1/cart/items/:id             Update cart item quantity
DELETE /api/v1/cart/items/:id             Remove item from cart
DELETE /api/v1/cart                       Clear cart
POST   /api/v1/cart/apply-coupon          Apply coupon code

GET    /api/v1/wishlist                   Get wishlist
POST   /api/v1/wishlist                   Add to wishlist
DELETE /api/v1/wishlist/:productId        Remove from wishlist
POST   /api/v1/wishlist/move-to-cart/:id  Move wishlist item to cart
```

### 7.5 Orders & Checkout

```
POST   /api/v1/checkout/create            Create checkout session
POST   /api/v1/checkout/validate          Validate checkout (shipping, payment)
POST   /api/v1/orders                     Place order
GET    /api/v1/orders                     Get user's orders
GET    /api/v1/orders/:id                 Get order details
PUT    /api/v1/orders/:id/cancel          Cancel order
POST   /api/v1/orders/:id/return          Request return
GET    /api/v1/orders/:id/invoice         Download invoice
GET    /api/v1/orders/:id/track           Get tracking info
```

### 7.6 Payments

```
POST   /api/v1/payments/create-intent     Create payment intent (Stripe/Tap)
POST   /api/v1/payments/confirm           Confirm payment
POST   /api/v1/payments/webhook           Webhook endpoint for payment gateway
GET    /api/v1/payments/methods           Get saved payment methods
POST   /api/v1/payments/methods           Add payment method
DELETE /api/v1/payments/methods/:id       Delete payment method
```

### 7.7 Wallet & Coins

```
GET    /api/v1/wallet                     Get wallet balance (coins + cashback)
GET    /api/v1/wallet/transactions        Get transaction history
POST   /api/v1/wallet/redeem              Redeem coins for discount
GET    /api/v1/wallet/conversion-rate     Get current conversion rate
```

### 7.8 Loyalty & Referrals

```
GET    /api/v1/loyalty/status             Get current tier & points
GET    /api/v1/loyalty/tiers              Get all tiers info
GET    /api/v1/referrals                  Get referral stats
POST   /api/v1/referrals/generate         Generate referral code
POST   /api/v1/referrals/apply            Apply referral code
```

### 7.9 Community

```
GET    /api/v1/community/posts            Get feed posts (paginated)
GET    /api/v1/community/posts/:id        Get post detail
POST   /api/v1/community/posts            Create post
PUT    /api/v1/community/posts/:id        Update post
DELETE /api/v1/community/posts/:id        Delete post
POST   /api/v1/community/posts/:id/like   Like post
DELETE /api/v1/community/posts/:id/like   Unlike post
POST   /api/v1/community/posts/:id/save   Save post
DELETE /api/v1/community/posts/:id/save   Unsave post
GET    /api/v1/community/posts/:id/comments  Get comments
POST   /api/v1/community/posts/:id/comments  Add comment
POST   /api/v1/community/posts/:id/report    Report post
POST   /api/v1/community/users/:id/follow    Follow user
DELETE /api/v1/community/users/:id/follow    Unfollow user
GET    /api/v1/community/users/:id          Get user profile
```

### 7.10 Wholesale & Custom Requests

```
POST   /api/v1/leads/wholesale            Submit wholesale inquiry
POST   /api/v1/leads/custom               Submit custom perfume request
GET    /api/v1/leads/my-requests          Get user's requests
GET    /api/v1/leads/:id                  Get request detail
PUT    /api/v1/leads/:id/status           Update request status (admin/vendor)
POST   /api/v1/leads/:id/notes            Add note to lead
```

### 7.11 AI Features

```
POST   /api/v1/ai/scent-match             Find similar scents (by name/notes/image)
POST   /api/v1/ai/custom-builder          Generate custom perfume formula
POST   /api/v1/ai/voice-search            Process voice search query
POST   /api/v1/ai/recommendations         Get personalized recommendations
```

### 7.12 Search

```
GET    /api/v1/search                     Global search (products, brands, posts)
GET    /api/v1/search/autocomplete        Autocomplete suggestions
GET    /api/v1/search/filters             Get available filters for category
```

### 7.13 Reviews & Ratings

```
POST   /api/v1/reviews                    Create review
PUT    /api/v1/reviews/:id                Update review
DELETE /api/v1/reviews/:id                Delete review
POST   /api/v1/reviews/:id/helpful        Mark review as helpful
POST   /api/v1/reviews/:id/report         Report review
POST   /api/v1/reviews/:id/vendor-response  Vendor responds to review
```

### 7.14 Notifications

```
GET    /api/v1/notifications              Get user notifications
PUT    /api/v1/notifications/:id/read     Mark as read
PUT    /api/v1/notifications/read-all     Mark all as read
DELETE /api/v1/notifications/:id          Delete notification
GET    /api/v1/notifications/preferences  Get notification settings
PUT    /api/v1/notifications/preferences  Update notification settings
```

### 7.15 WhatsApp Integration

```
POST   /api/v1/whatsapp/send              Send WhatsApp message (template)
POST   /api/v1/whatsapp/webhook           WhatsApp webhook for replies
GET    /api/v1/whatsapp/templates         Get available message templates
```

### 7.16 Media & Upload

```
POST   /api/v1/media/upload               Upload image/video to CDN
POST   /api/v1/media/upload/bulk          Upload multiple files
DELETE /api/v1/media/:id                  Delete media file
```

### 7.17 Shipping & Delivery

```
POST   /api/v1/shipping/calculate         Calculate shipping cost
GET    /api/v1/shipping/zones             Get shipping zones
GET    /api/v1/shipping/methods           Get available shipping methods
POST   /api/v1/shipping/track             Get tracking info from carrier API
```

### 7.18 Coupons

```
POST   /api/v1/coupons/validate           Validate coupon code
GET    /api/v1/coupons/available          Get coupons available to user
POST   /api/v1/coupons/apply              Apply coupon to cart
DELETE /api/v1/coupons/remove             Remove coupon from cart
```

---

### 7.19 Vendor APIs

```
GET    /api/v1/vendor/dashboard           Get vendor dashboard stats
GET    /api/v1/vendor/products            Get vendor's products
POST   /api/v1/vendor/products            Create product
PUT    /api/v1/vendor/products/:id        Update product
DELETE /api/v1/vendor/products/:id        Delete product
GET    /api/v1/vendor/orders              Get vendor's orders
PUT    /api/v1/vendor/orders/:id/status   Update order status
POST   /api/v1/vendor/orders/:id/tracking Add tracking info
GET    /api/v1/vendor/analytics           Get analytics data
GET    /api/v1/vendor/wallet              Get wallet balance
POST   /api/v1/vendor/wallet/payout       Request payout
GET    /api/v1/vendor/payouts             Get payout history
GET    /api/v1/vendor/reviews             Get reviews on vendor products
POST   /api/v1/vendor/reviews/:id/respond Respond to review
PUT    /api/v1/vendor/storefront          Update storefront settings
GET    /api/v1/vendor/coupons             Get vendor's coupons
POST   /api/v1/vendor/coupons             Create coupon
PUT    /api/v1/vendor/coupons/:id         Update coupon
DELETE /api/v1/vendor/coupons/:id         Delete coupon
```

### 7.20 Admin APIs

```
GET    /api/v1/admin/dashboard            Get admin dashboard stats
GET    /api/v1/admin/vendors              Get all vendors
GET    /api/v1/admin/vendors/:id          Get vendor detail
PUT    /api/v1/admin/vendors/:id          Update vendor
POST   /api/v1/admin/vendors/:id/approve  Approve vendor
POST   /api/v1/admin/vendors/:id/suspend  Suspend vendor
GET    /api/v1/admin/products             Get all products
PUT    /api/v1/admin/products/:id/approve Approve product
GET    /api/v1/admin/orders               Get all orders
GET    /api/v1/admin/customers            Get all customers
GET    /api/v1/admin/customers/:id        Get customer detail
PUT    /api/v1/admin/customers/:id        Update customer
POST   /api/v1/admin/customers/:id/suspend Suspend customer
POST   /api/v1/admin/coins/adjust         Manually adjust user coins
GET    /api/v1/admin/leads                Get all leads
PUT    /api/v1/admin/leads/:id            Update lead
POST   /api/v1/admin/leads/:id/assign     Assign lead to rep
GET    /api/v1/admin/community/posts      Get all posts
POST   /api/v1/admin/community/posts/:id/hide    Hide post
POST   /api/v1/admin/community/posts/:id/delete  Delete post
GET    /api/v1/admin/content/pages        Get all pages
PUT    /api/v1/admin/content/pages/:id    Update page content
GET    /api/v1/admin/analytics            Get platform analytics
GET    /api/v1/admin/settings             Get all settings
PUT    /api/v1/admin/settings             Update settings
POST   /api/v1/admin/marketing/email      Send email campaign
POST   /api/v1/admin/marketing/push       Send push notification
GET    /api/v1/admin/reports/sales        Generate sales report
GET    /api/v1/admin/reports/financial    Generate financial report
```

---

**Total API Endpoints: 150+ endpoints**

---

## 8. UI Mockup Descriptions

### 8.1 Homepage Mockup

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ [Logo] [Categories ▾] [Search...] [AR|EN] [❤] [👤] [🛒 (2)]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │        LUXURY FRAGRANCE COLLECTION 2025                   │ │
│  │        Discover Authentic Oud & Attars                    │ │
│  │                                                           │ │
│  │        [Shop Now]  [Explore Reels]                        │ │
│  │                                                           │ │
│  │  ● ○ ○ ○ ○  (carousel indicators)                        │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  SHOP BY CATEGORY                                               │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ [IMG]  │ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │      │
│  │Perfumes│ │  Oud   │ │ Attar  │ │Bakhoor │ │  Home  │      │
│  │ (234)  │ │  (89)  │ │  (45)  │ │  (67)  │ │  (123) │      │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘      │
│                                                                 │
│  SHOP BY MOOD                                          [View All]│
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│  │Summer   │ │Date     │ │Office   │ │Ramadan  │ →           │
│  │Oud      │ │Night    │ │Wear     │ │Specials │             │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                                 │
│  TRENDING NOW                                      [View All →] │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ [IMG]  │ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │ →    │
│  │  ❤      │ │  ❤      │ │  ❤      │ │  ❤      │ │  ❤      │      │
│  │Brand   │ │Brand   │ │Brand   │ │Brand   │ │Brand   │      │
│  │Name    │ │Name    │ │Name    │ │Name    │ │Name    │      │
│  │★★★★★  │ │★★★★☆  │ │★★★★★  │ │★★★★☆  │ │★★★★★  │      │
│  │450 AED │ │650 AED │ │850 AED │ │320 AED │ │1200 AED│      │
│  │[+ Cart]│ │[+ Cart]│ │[+ Cart]│ │[+ Cart]│ │[+ Cart]│      │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘      │
│                                                                 │
│  DISCOVER REELS                                    [View All →] │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                   │
│  │▶IMG│ │▶IMG│ │▶IMG│ │▶IMG│ │▶IMG│ │▶IMG│ →                 │
│  │120s│ │45s │ │2m  │ │1m  │ │30s │ │90s │                   │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                   │
│                                                                 │
│  COMMUNITY HIGHLIGHTS                              [Join Feed →]│
│  ┌──────────────────────────────────────────┐                  │
│  │ @sarah_fragrances                        │                  │
│  │ "Just received my custom oud! 😍"        │                  │
│  │ [Image of unboxing]                      │                  │
│  │ ❤ 234   💬 12   🔗 Share                 │                  │
│  └──────────────────────────────────────────┘                  │
│                                                                 │
│  BRANDS WE LOVE                                                 │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] →           │
│                                                                 │
│  NEWSLETTER                                                     │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ Get 50 Coins on Signup! 🎁                          │       │
│  │ [Enter your email.....................] [Subscribe] │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER                                                          │
│ About | Contact | Shipping | Returns | FAQ | Privacy | Terms   │
│ © 2025 AromaSouq | [IG] [TikTok] [WA]                          │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8.2 Product Listing Page Mockup

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (same as homepage)                                       │
├─────────────────────────────────────────────────────────────────┤
│ Home > Perfumes > Woody Oriental                                │
│                                                                 │
│ ┌─FILTERS──────┐  ┌─MAIN CONTENT───────────────────────────┐  │
│ │              │  │                                         │  │
│ │ CATEGORY     │  │  PERFUMES (234 products)                │  │
│ │ ☑ Perfume    │  │  Sort: [Best Match ▾] [Grid View 🔲]   │  │
│ │ ☐ Oud        │  │                                         │  │
│ │ ☐ Attar      │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │  │
│ │              │  │  │ [IMG]│ │ [IMG]│ │ [IMG]│ │ [IMG]│  │  │
│ │ BRAND        │  │  │  ❤ NEW│ │  ❤    │ │  ❤ 20%│ │  ❤    │  │  │
│ │ [Search...]  │  │  │      │ │      │ │ OFF  │ │      │  │  │
│ │ ☑ Armaf      │  │  │Brand │ │Brand │ │Brand │ │Brand │  │  │
│ │ ☐ Rasasi     │  │  │Name  │ │Name  │ │Name  │ │Name  │  │  │
│ │ ☐ Swiss      │  │  │      │ │      │ │      │ │      │  │  │
│ │   Arabian    │  │  │★★★★★│ │★★★★☆│ │★★★★★│ │★★★★☆│  │  │
│ │              │  │  │(89)  │ │(45)  │ │(120) │ │(34)  │  │  │
│ │ PRICE        │  │  │      │ │      │ │      │ │      │  │  │
│ │ ━━●━━━━━━   │  │  │450   │ │650   │ │680   │ │320   │  │  │
│ │ 0    5000 AED│  │  │AED   │ │AED   │ │850   │ │AED   │  │  │
│ │              │  │  │      │ │      │ │AED   │ │      │  │  │
│ │ SCENT FAMILY │  │  │[+Cart│ │[+Cart│ │[+Cart│ │[+Cart│  │  │
│ │ ☑ Woody      │  │  │      │ │      │ │      │ │      │  │  │
│ │ ☑ Oriental   │  │  └──────┘ └──────┘ └──────┘ └──────┘  │  │
│ │ ☐ Floral     │  │                                         │  │
│ │ ☐ Fresh      │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │  │
│ │              │  │  │ [IMG]│ │ [IMG]│ │ [IMG]│ │ [IMG]│  │  │
│ │ NOTES        │  │  │  ❤    │ │  ❤    │ │  ❤    │ │  ❤    │  │  │
│ │ [Search...]  │  │  │      │ │      │ │      │ │      │  │  │
│ │ ☑ Oud        │  │  │Brand │ │Brand │ │Brand │ │Brand │  │  │
│ │ ☑ Saffron    │  │  │Name  │ │Name  │ │Name  │ │Name  │  │  │
│ │ ☐ Rose       │  │  │★★★★★│ │★★★★☆│ │★★★★★│ │★★★★☆│  │  │
│ │ ☐ Amber      │  │  │450   │ │650   │ │850   │ │320   │  │  │
│ │              │  │  │AED   │ │AED   │ │AED   │ │AED   │  │  │
│ │ COUNTRY      │  │  │[+Cart│ │[+Cart│ │[+Cart│ │[+Cart│  │  │
│ │ ☐ UAE        │  │  └──────┘ └──────┘ └──────┘ └──────┘  │  │
│ │ ☐ Saudi      │  │                                         │  │
│ │ ☑ France     │  │  [Load More Products]                   │  │
│ │              │  │                                         │  │
│ │ [Clear All]  │  └─────────────────────────────────────────┘  │
│ └──────────────┘                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8.3 Product Detail Page Mockup

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│ Home > Perfumes > Woody Oriental > Oud Royale                   │
│                                                                 │
│ ┌─GALLERY (60%)────────────────┐  ┌─PRODUCT INFO (40%)───────┐│
││                                │  │ Swiss Arabian             ││
││  ┌──────────────────────────┐ │  │ OUD ROYALE EDP 100ML      ││
││  │                          │ │  │ ★★★★★ 4.8  (234 reviews) ││
││  │                          │ │  │ [Share 🔗 WA IG]          ││
││  │      MAIN IMAGE          │ │  │                           ││
││  │      (Zoom on hover)     │ │  │ ┌──────────────────────┐  ││
││  │                          │ │  │ │ 850 AED  1200 AED    │  ││
││  │                          │ │  │ │ Save 29%  🏷️         │  ││
││  └──────────────────────────┘ │  │ │ Earn 85 coins 🪙     │  ││
││                                │  │ └──────────────────────┘  ││
││  [🖼️] [🖼️] [🖼️] [▶] [360°]   │  │                           ││
││                                │  │ SIZE                      ││
││                                │  │ ⚪ 30ml  ⚪ 50ml  ⚫ 100ml ││
││  ┌──────────────────────────┐ │  │                           ││
││  │    [REEL/VIDEO]          │ │  │ CONCENTRATION             ││
││  │    Plays inline          │ │  │ ⚫ EDP  ⚪ EDT            ││
││  │    [▶ Play]              │ │  │                           ││
││  └──────────────────────────┘ │  │ QUANTITY                  ││
│└────────────────────────────────┘  │ ⊖  2  ⊕    (12 in stock)││
│                                     │                           ││
│                                     │ ┌──────────────────────┐ ││
│                                     │ │ [Add to Cart] 🛒     │ ││
│                                     │ │ [Buy Now]            │ ││
│                                     │ │ [♡ Wishlist]         │ ││
│                                     │ └──────────────────────┘ ││
│                                     │                           ││
│                                     │ [💬 Chat on WhatsApp]    ││
│                                     │ [📋 Wholesale Sample]    ││
│                                     │ [🎨 Custom Version]      ││
│                                     │                           ││
│                                     │ ✓ Free shipping >500 AED ││
│                                     │ ✓ Same-day delivery (UAE)││
│                                     │ ✓ Easy returns (14 days) ││
│                                     │                           ││
│                                     │ SCENT PROFILE            ││
│                                     │      ▲                   ││
│                                     │     Top                  ││
│                                     │   Saffron                ││
│                                     │   Bergamot               ││
│                                     │     ▼▲                   ││
│                                     │    Heart                 ││
│                                     │  Rose, Jasmine           ││
│                                     │     ▼▲                   ││
│                                     │     Base                 ││
│                                     │  Oud, Amber, Musk        ││
│                                     │      ▼                   ││
│                                     │                           ││
│                                     │ [🤖 Find Similar Scents] ││
│                                     └───────────────────────────┘│
│                                                                 │
│ ┌─DESCRIPTION──────────────────────────────────────────────────┐│
││ Experience the luxurious blend of authentic oud and saffron...││
││ [Read More...]                                                ││
│└───────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─TABS─────────────────────────────────────────────────────────┐│
││ [Reviews] [Q&A] [Reels] [Shipping]                           ││
││                                                               ││
││ REVIEWS & RATINGS                                             ││
││                                                               ││
││ ★★★★★ 4.8 out of 5  (234 reviews)                            ││
││                                                               ││
││ 5★ ████████████████████░░ 180                                ││
││ 4★ ████████░░░░░░░░░░░░░  40                                 ││
││ 3★ ██░░░░░░░░░░░░░░░░░░░  10                                 ││
││ 2★ █░░░░░░░░░░░░░░░░░░░░   3                                 ││
││ 1★ ░░░░░░░░░░░░░░░░░░░░░   1                                 ││
││                                                               ││
││ [Filter: All ▾] [Sort: Most Helpful ▾]                       ││
││                                                               ││
││ ┌──────────────────────────────────────────────────┐          ││
││ │ 👤 Sarah M.     ★★★★★     Verified Purchase      │          ││
││ │ 2 days ago                                       │          ││
││ │                                                  │          ││
││ │ "Amazing longevity!"                             │          ││
││ │ This perfume lasts all day. The oud is rich but  │          ││
││ │ not overpowering. Perfect for special occasions. │          ││
││ │                                                  │          ││
││ │ [Image] [Image]                                  │          ││
││ │                                                  │          ││
││ │ 👍 Helpful (45)   Report                         │          ││
││ └──────────────────────────────────────────────────┘          ││
││                                                               ││
││ [Load More Reviews]                                           ││
││                                                               ││
││ [Write a Review]                                              ││
│└───────────────────────────────────────────────────────────────┘│
│                                                                 │
│ YOU MAY ALSO LIKE                                               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                 │
│ │[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │ →               │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8.4 Cart Page Mockup

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│ SHOPPING CART (3 items)                                         │
│                                                                 │
│ ┌─CART ITEMS (70%)──────────────┐  ┌─SUMMARY (30%)──────────┐ │
││                                 │  │ ORDER SUMMARY          ││
││ ┌─────────────────────────────┐ │  │                        ││
││ │[IMG] Swiss Arabian          │ │  │ Subtotal:   1,520 AED  ││
││ │      Oud Royale EDP 100ml   │ │  │ Shipping:   Free! ✓    ││
││ │      ★★★★★ 4.8              │ │  │ Tax (5%):      76 AED  ││
││ │                              │ │  │ ─────────────────────  ││
││ │      850 AED                 │ │  │ Total:     1,596 AED   ││
││ │      Qty: ⊖ 1 ⊕             │ │  │                        ││
││ │                              │ │  │ 🪙 Earn 160 coins!    ││
││ │      [Remove] [Save Later]  │ │  │                        ││
││ └─────────────────────────────┘ │  │ ┌────────────────────┐ ││
││                                 │  │ │Promo Code:         │ ││
││ ┌─────────────────────────────┐ │  │ │[____________]      │ ││
││ │[IMG] Ajmal Perfume          │ │  │ │[Apply]             │ ││
││ │      Amber Wood EDT 50ml    │ │  │ └────────────────────┘ ││
││ │      ★★★★☆ 4.5              │ │  │                        ││
││ │                              │ │  │ ┌────────────────────┐ ││
││ │      320 AED                 │ │  │ │[Proceed to        │ ││
││ │      Qty: ⊖ 2 ⊕             │ │  │ │ Checkout]          │ ││
││ │                              │ │  │ └────────────────────┘ ││
││ │      [Remove] [Save Later]  │ │  │                        ││
││ └─────────────────────────────┘ │  │ [Continue Shopping]    ││
││                                 │  │                        ││
│└─────────────────────────────────┘  │ SECURE CHECKOUT        ││
│                                      │ [💳][🔒][✓]            ││
│                                      └────────────────────────┘ │
│                                                                 │
│ COMPLETE YOUR SET                                               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                           │
│ │[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │                           │
│ │[+Add]│ │[+Add]│ │[+Add]│ │[+Add]│                           │
│ └──────┘ └──────┘ └──────┘ └──────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8.5 Vendor Dashboard Mockup

```
┌─────────────────────────────────────────────────────────────────┐
│ VENDOR PANEL                        [👤 Vendor Name] [Logout]   │
├────────┬────────────────────────────────────────────────────────┤
│SIDEBAR │ DASHBOARD                                              │
│        │                                                        │
│🏠 Dash │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│📦 Prods│ │Total Sales│ │Orders    │ │Products  │ │Avg Rating│ │
│📋 Order│ │          │ │          │ │          │ │          │ │
│📊 Analy│ │ 45,230   │ │   234    │ │   89     │ │  4.7 ★   │ │
│⭐ Revie│ │   AED    │ │ 12 Pend. │ │ 5 Draft  │ │          │ │
│🎟️ Coupo│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│🏪 Store│                                                        │
│💰 Wallet│ SALES CHART (Last 30 days)                            │
│⚙️ Setng│ ┌────────────────────────────────────────────────────┐ │
│        │ │    AED                                             │ │
│        │ │ 2000│         ╱╲                                   │ │
│        │ │ 1500│      ╱╲╱  ╲╱╲                                │ │
│        │ │ 1000│   ╱╲╱         ╲                              │ │
│        │ │  500│╱╲╱              ╲╱╲                          │ │
│        │ │    0└──────────────────────────────────────────    │ │
│        │ │      1  5  10  15  20  25  30 (days)              │ │
│        │ └────────────────────────────────────────────────────┘ │
│        │                                                        │
│        │ TOP PRODUCTS                                           │
│        │ ┌────────────────────────────────────────────────────┐ │
│        │ │ Product Name        Sales  Revenue                │ │
│        │ │ ──────────────────────────────────────────────     │ │
│        │ │ Oud Royale EDP       89    75,650 AED             │ │
│        │ │ Amber Wood EDT       67    21,440 AED             │ │
│        │ │ Rose Attar 12ml      45    13,500 AED             │ │
│        │ └────────────────────────────────────────────────────┘ │
│        │                                                        │
│        │ RECENT ORDERS                       [View All Orders]│
│        │ ┌────────────────────────────────────────────────────┐ │
│        │ │ Order #  Date      Customer    Total    Status    │ │
│        │ │ ──────────────────────────────────────────────     │ │
│        │ │ #12345  2h ago    Sarah M.    850 AED  ⏳Pending  │ │
│        │ │ #12344  5h ago    Ahmed K.    320 AED  ✓Shipped  │ │
│        │ │ #12343  1d ago    Fatima A.   450 AED  ✓Delivered│ │
│        │ └────────────────────────────────────────────────────┘ │
│        │                                                        │
│        │ PENDING ACTIONS                                        │
│        │ • 12 orders to fulfill                                 │
│        │ • 5 products awaiting approval                         │
│        │ • 8 reviews to respond to                              │
│        │ • 3 questions to answer                                │
└────────┴────────────────────────────────────────────────────────┘
```

---

### 8.6 Admin Dashboard Mockup

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN PANEL                         [👤 Admin Name] [Logout]    │
├────────┬────────────────────────────────────────────────────────┤
│SIDEBAR │ DASHBOARD                                              │
│        │                                                        │
│🏠 Dash │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│🏪 Vendo│ │Total     │ │Orders    │ │Customers │ │Commission│ │
│📦 Prods│ │Revenue   │ │          │ │          │ │Earned    │ │
│📋 Order│ │          │ │          │ │          │ │          │ │
│👥 Custo│ │ 245,680  │ │  1,234   │ │  4,567   │ │ 24,568   │ │
│📊 Leads│ │   AED    │ │ 45 Pend. │ │ 123 New  │ │   AED    │ │
│💬 Commu│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│📝 Conte│                                                        │
│🪙 Coins│ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│📢 Markt│ │Vendors   │ │Products  │ │Community │               │
│📊 Analy│ │          │ │          │ │Posts     │               │
│⚙️ Setng│ │   45     │ │  1,234   │ │  8,901   │               │
│        │ │ 5 Pend.  │ │ 23 Pend. │ │ 12 Flag. │               │
│        │ └──────────┘ └──────────┘ └──────────┘               │
│        │                                                        │
│        │ REVENUE CHART (This Month)                             │
│        │ ┌────────────────────────────────────────────────────┐ │
│        │ │  [Line graph showing daily revenue trend]          │ │
│        │ └────────────────────────────────────────────────────┘ │
│        │                                                        │
│        │ ORDERS BY STATUS                                       │
│        │ ┌────────────────────────────────────────────────────┐ │
│        │ │  [Pie chart: Pending, Processing, Shipped, etc.]   │ │
│        │ └────────────────────────────────────────────────────┘ │
│        │                                                        │
│        │ RECENT ACTIVITY                                        │
│        │ • New vendor registration: "Luxury Scents LLC"         │
│        │ • Product pending approval: "Midnight Oud EDP"         │
│        │ • Flagged post in community (user: @ahmed123)          │
│        │ • Wholesale lead: "Dubai Hotel Group" (high value)     │
│        │ • Low stock alert: 12 products below threshold         │
│        │                                                        │
│        │ QUICK ACTIONS                                          │
│        │ [Approve Vendors] [Moderate Posts] [Review Leads]      │
└────────┴────────────────────────────────────────────────────────┘
```

---

## 9. Database Schema Overview

### Core Entities

```typescript
// Users
User {
  id: UUID
  email: string (unique)
  phone: string
  passwordHash: string
  firstName: string
  lastName: string
  avatar: string
  role: enum (customer, vendor, admin, moderator)
  status: enum (active, suspended, deleted)
  emailVerified: boolean
  phoneVerified: boolean
  preferredLanguage: enum (en, ar)
  dateJoined: timestamp
  lastLogin: timestamp
}

// User Profiles
UserProfile {
  userId: UUID (FK)
  dateOfBirth: date
  gender: enum (male, female, other)
  notificationPreferences: json
  marketingConsent: boolean
}

// Addresses
Address {
  id: UUID
  userId: UUID (FK)
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
}

// Vendors
Vendor {
  id: UUID
  userId: UUID (FK)
  businessName: string
  legalName: string
  taxId: string
  licenseNumber: string
  licenseDocument: string
  contactPerson: string
  email: string
  phone: string
  whatsappNumber: string
  logo: string
  coverImage: string
  tagline: string
  description: text
  storyVideo: string
  website: string
  instagram: string
  tiktok: string
  status: enum (pending, approved, active, suspended)
  approvedAt: timestamp
  approvedBy: UUID (FK to User)
}

// Vendor Bank Details
VendorBankDetail {
  vendorId: UUID (FK)
  bankName: string
  accountHolderName: string
  accountNumber: string (encrypted)
  iban: string (encrypted)
  swiftCode: string
}

// Categories
Category {
  id: UUID
  name_en: string
  name_ar: string
  slug: string (unique)
  description_en: text
  description_ar: text
  image: string
  icon: string
  parentId: UUID (FK, nullable for root categories)
  order: int
  isActive: boolean
}

// Brands
Brand {
  id: UUID
  name: string (unique)
  slug: string (unique)
  logo: string
  country: string
  description_en: text
  description_ar: text
  vendorId: UUID (FK, nullable if not vendor-owned)
  isActive: boolean
}

// Products
Product {
  id: UUID
  vendorId: UUID (FK)
  brandId: UUID (FK)
  categoryId: UUID (FK)
  name_en: string
  name_ar: string
  slug: string (unique)
  sku: string (unique)
  description_en: text
  description_ar: text
  type: enum (original, clone, same_dna, custom)
  fulfillmentType: enum (brand_fulfilled, platform_fulfilled, hybrid)

  // Pricing
  regularPrice: decimal
  salePrice: decimal (nullable)
  costPrice: decimal

  // Inventory
  stockQuantity: int
  lowStockThreshold: int
  allowBackorders: boolean
  stockStatus: enum (in_stock, out_of_stock, pre_order)

  // Scent Profile
  scentFamily: string
  topNotes: json (array of strings)
  heartNotes: json
  baseNotes: json
  longevity: int (hours)
  sillage: int (1-5 scale)
  season: json (array)
  gender: enum (male, female, unisex)

  // Details
  volume: string
  concentration: string
  ingredients: text
  country: string
  isVegan: boolean
  isAlcoholFree: boolean
  isCrueltyFree: boolean

  // Shipping
  weight: decimal
  dimensions: string (LxWxH)
  shippingClass: string

  // Coins & Rewards
  coinsToAward: int

  // SEO
  metaTitle: string
  metaDescription: string
  focusKeyword: string

  // Settings
  enableWhatsApp: boolean
  whatsappNumber: string (nullable)
  enableReviews: boolean
  enableWholesale: boolean
  enableCustomRequest: boolean
  visibility: enum (public, hidden, password)

  // Status
  status: enum (draft, pending, approved, active, rejected)
  approvedAt: timestamp
  approvedBy: UUID (FK)

  // Timestamps
  createdAt: timestamp
  updatedAt: timestamp
}

// Product Variants
ProductVariant {
  id: UUID
  productId: UUID (FK)
  size: string
  concentration: string
  packaging: string
  sku: string (unique)
  price: decimal
  stockQuantity: int
  isActive: boolean
}

// Product Images
ProductImage {
  id: UUID
  productId: UUID (FK)
  imageUrl: string
  altText: string
  order: int
  isFeatured: boolean
}

// Product Videos
ProductVideo {
  id: UUID
  productId: UUID (FK)
  videoUrl: string
  thumbnailUrl: string
  duration: int (seconds)
  title: string
  order: int
}

// Orders
Order {
  id: UUID
  orderNumber: string (unique, e.g., ARO-2025-00001)
  userId: UUID (FK)
  vendorId: UUID (FK)

  // Amounts
  subtotal: decimal
  shippingCost: decimal
  taxAmount: decimal
  discountAmount: decimal
  coinsRedeemed: int
  coinsRedeemedValue: decimal
  total: decimal

  // Shipping
  shippingAddressId: UUID (FK)
  shippingMethod: string
  estimatedDelivery: date

  // Billing
  billingAddressId: UUID (FK)

  // Payment
  paymentMethod: enum (card, cod, apple_pay, google_pay, wallet)
  paymentStatus: enum (pending, paid, failed, refunded)
  paymentIntentId: string

  // Order Status
  status: enum (pending, confirmed, processing, shipped, delivered, cancelled, refunded)
  cancelReason: text

  // Tracking
  trackingNumber: string
  carrier: string

  // Coins Earned
  coinsEarned: int
  coinsAwarded: boolean

  // Notes
  customerNotes: text
  internalNotes: text

  // Timestamps
  placedAt: timestamp
  confirmedAt: timestamp
  shippedAt: timestamp
  deliveredAt: timestamp
  cancelledAt: timestamp
}

// Order Items
OrderItem {
  id: UUID
  orderId: UUID (FK)
  productId: UUID (FK)
  variantId: UUID (FK, nullable)
  productName: string (snapshot)
  productImage: string (snapshot)
  sku: string
  quantity: int
  unitPrice: decimal
  total: decimal
  coinsEarned: int
}

// Reviews
Review {
  id: UUID
  productId: UUID (FK)
  userId: UUID (FK)
  orderId: UUID (FK, nullable)
  rating: int (1-5)
  title: string
  comment: text
  images: json (array of URLs)
  videos: json (array of URLs)
  isVerifiedPurchase: boolean
  helpfulCount: int
  status: enum (pending, approved, hidden)
  vendorResponse: text (nullable)
  vendorRespondedAt: timestamp
  createdAt: timestamp
}

// Questions & Answers
ProductQuestion {
  id: UUID
  productId: UUID (FK)
  userId: UUID (FK)
  question: text
  answer: text (nullable)
  answeredBy: UUID (FK, nullable - vendor or admin)
  answeredAt: timestamp
  upvotes: int
  status: enum (pending, answered, hidden)
  createdAt: timestamp
}

// Wishlist
Wishlist {
  id: UUID
  userId: UUID (FK)
  productId: UUID (FK)
  addedAt: timestamp
  UNIQUE(userId, productId)
}

// Cart
Cart {
  id: UUID
  userId: UUID (FK, nullable for guest carts)
  sessionId: string (for guests)
  couponCode: string (nullable)
  discountAmount: decimal
  updatedAt: timestamp
}

// Cart Items
CartItem {
  id: UUID
  cartId: UUID (FK)
  productId: UUID (FK)
  variantId: UUID (FK, nullable)
  quantity: int
  addedAt: timestamp
}

// Wallet & Coins
Wallet {
  userId: UUID (FK, PK)
  coinsBalance: int
  cashbackBalance: decimal (AED)
  lifetimeCoinsEarned: int
  lifetimeCoinsRedeemed: int
  loyaltyTier: enum (silver, gold, platinum)
  tierPoints: int
  updatedAt: timestamp
}

// Wallet Transactions
WalletTransaction {
  id: UUID
  userId: UUID (FK)
  type: enum (earned, redeemed, expired, adjusted, refund)
  amount: int (coins)
  balance: int (after transaction)
  source: enum (order, referral, signup, admin_adjustment, expiry)
  sourceId: UUID (nullable, e.g., orderId)
  description: string
  createdAt: timestamp
}

// Coupons
Coupon {
  id: UUID
  code: string (unique)
  vendorId: UUID (FK, nullable for platform coupons)
  discountType: enum (percentage, fixed, free_shipping)
  discountValue: decimal
  minOrderValue: decimal
  maxDiscount: decimal (for percentage coupons)
  usageLimit: int (nullable)
  usageCount: int
  perUserLimit: int
  applicableProductIds: json (array)
  applicableCategoryIds: json (array)
  excludeSaleItems: boolean
  startsAt: timestamp
  expiresAt: timestamp
  isActive: boolean
}

// Community Posts
Post {
  id: UUID
  userId: UUID (FK)
  productId: UUID (FK, nullable if not tagged)
  type: enum (text, image, video, reel, unboxing)
  content: text
  mediaUrls: json (array)
  hashtags: json (array)
  privacy: enum (public, followers)
  likesCount: int
  commentsCount: int
  sharesCount: int
  status: enum (published, hidden, deleted, flagged)
  createdAt: timestamp
}

// Post Likes
PostLike {
  postId: UUID (FK)
  userId: UUID (FK)
  createdAt: timestamp
  PRIMARY KEY (postId, userId)
}

// Post Comments
PostComment {
  id: UUID
  postId: UUID (FK)
  userId: UUID (FK)
  parentId: UUID (FK, nullable for nested replies)
  comment: text
  createdAt: timestamp
}

// Follows (Users following brands or other users)
Follow {
  followerId: UUID (FK to User)
  followingId: UUID (FK to User or Vendor)
  followingType: enum (user, vendor)
  createdAt: timestamp
  PRIMARY KEY (followerId, followingId, followingType)
}

// Leads (Wholesale & Custom Requests)
Lead {
  id: UUID
  userId: UUID (FK, nullable for guests)
  productId: UUID (FK, nullable)
  type: enum (wholesale, custom, manufacturing)

  // Contact Info
  businessName: string (for wholesale)
  contactPerson: string
  email: string
  phone: string

  // Wholesale fields
  businessType: string
  quantityNeeded: string
  requestSample: boolean

  // Custom perfume fields
  inspiration: text
  baseProductId: UUID (FK, nullable)
  occasion: string
  scentFamily: json
  preferredNotes: json
  intensity: int (1-5)
  longevity: int (4-12+ hrs)
  volume: string
  packaging: string
  budgetRange: string
  urgency: string

  // Common
  message: text
  status: enum (new, contacted, quote_sent, won, lost, closed)
  assignedTo: UUID (FK, nullable - vendor or sales rep)

  createdAt: timestamp
  updatedAt: timestamp
}

// Lead Notes
LeadNote {
  id: UUID
  leadId: UUID (FK)
  userId: UUID (FK - who added the note)
  note: text
  createdAt: timestamp
}

// Vendor Payouts
Payout {
  id: UUID
  vendorId: UUID (FK)
  amount: decimal
  method: string
  bankDetailsId: UUID (FK)
  status: enum (pending, processing, completed, failed)
  requestedAt: timestamp
  processedAt: timestamp
  transactionId: string
}

// Notifications
Notification {
  id: UUID
  userId: UUID (FK)
  type: enum (order, coins, community, admin, promotion)
  title: string
  message: text
  link: string
  isRead: boolean
  createdAt: timestamp
}

// Admin Settings (key-value store)
Setting {
  key: string (PK)
  value: json
  description: text
  updatedAt: timestamp
  updatedBy: UUID (FK)
}
```

---

## 10. Technical Implementation Notes

### Tech Stack Summary

**Frontend (Web)**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Zustand (state management)
- React Query (server state)
- Framer Motion (animations)

**Mobile**
- React Native / Expo
- TypeScript
- NativeWind (Tailwind for RN)
- React Navigation

**Backend**
- NestJS (Node.js framework)
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Redis (caching, sessions)

**Media & Storage**
- Cloudflare R2 / AWS S3
- Cloudflare CDN
- HLS for video streaming

**Payments**
- Stripe Connect (primary)
- Tap / PayTabs (regional)

**Messaging**
- WhatsApp Business API
- Firebase Cloud Messaging (push)
- SendGrid / AWS SES (email)

**AI/ML**
- OpenAI GPT-4 API (scent match, custom builder)
- Whisper API (voice search)

**Hosting**
- Vercel (frontend)
- DigitalOcean / Render / AWS (backend)
- Supabase (database + auth)

---

### Key Implementation Priorities for MVP

#### Phase 1 (Weeks 1-4): Core Foundation
1. Database schema setup (Prisma + Supabase)
2. Authentication & user management
3. Product catalog (CRUD for vendors)
4. Basic frontend (homepage, product listing, detail pages)
5. Cart & checkout flow
6. Payment integration (Stripe)

#### Phase 2 (Weeks 5-6): Vendor & Admin Panels
1. Vendor dashboard & product management
2. Order management (vendor + customer views)
3. Admin panel (vendors, products, orders)
4. Basic analytics

#### Phase 3 (Weeks 7-8): Enhanced Features
1. Coins & wallet system
2. Reviews & ratings
3. Wishlist
4. Community feed (basic)
5. WhatsApp integration
6. AI scent match (basic)

#### Phase 4 (Weeks 9-10): Polish & Launch Prep
1. Wholesale/custom lead forms
2. Email notifications
3. SEO optimization
4. Bilingual support (EN/AR)
5. Mobile responsiveness
6. Performance optimization
7. Testing & bug fixes

---

### MVP Features Deferred to Post-Launch
- AR bottle preview
- Voice search
- Advanced AI custom perfume builder
- In-app chat
- Influencer management system
- Advanced campaigns & ads platform
- Loyalty tier automation
- App-only features (native mobile app)

---

## Conclusion

This specification covers a **comprehensive MVP** for AromaSouq with nearly all core features needed to launch. The platform balances:

✅ **Elegant UI/UX** (luxury aesthetic inspired by Touch of OUD)
✅ **Multi-vendor marketplace** (retail + wholesale)
✅ **Social commerce** (community, reels, influencers)
✅ **Gamification** (coins, loyalty, rewards)
✅ **AI-powered discovery** (scent match, recommendations)
✅ **WhatsApp commerce** (instant vendor contact)
✅ **Bilingual support** (English + Arabic with RTL)

**Total Pages:** ~80+
**Total API Endpoints:** ~150+
**Estimated Development:** 10-12 weeks for full MVP
**Team Size:** 3-4 developers (1 backend, 2 frontend, 1 full-stack)

---

**Next Steps:**
1. Review and approve this specification
2. Set up development environment
3. Initialize backend (NestJS + Prisma + Supabase)
4. Initialize frontend (Next.js + Tailwind)
5. Begin Phase 1 implementation

Ready to start building! 🚀
