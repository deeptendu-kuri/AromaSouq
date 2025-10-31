# Phase 4: Public Pages (Customer-Facing)

**Estimated Time:** 6-8 hours
**Dependencies:** 01-FOUNDATION.md, 02-DESIGN-SYSTEM.md, 03-CORE-FEATURES.md
**Next Phase:** 05-SHOPPING-FEATURES.md

---

## Overview

Build customer-facing pages: Homepage, Product Listing, Product Detail, Login/Register, Search, and static pages. All components are imported from 02-DESIGN-SYSTEM.

---

## Part 1: Header Component

Create `components/layout/Header.tsx`:

```typescript
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const { cart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-deep-navy text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <p>Free shipping on orders over 300 AED</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-oud-gold transition-colors">About</Link>
            <Link href="/contact" className="hover:text-oud-gold transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/products" className="text-lg font-medium">Products</Link>
                <Link href="/products?category=perfumes" className="text-lg">Perfumes</Link>
                <Link href="/products?category=oud" className="text-lg">Oud</Link>
                <Link href="/products?category=attars" className="text-lg">Attars</Link>
                <Link href="/products?category=bakhoor" className="text-lg">Bakhoor</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-heading text-2xl lg:text-3xl text-oud-gold">AromaSouq</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-oud-gold transition-colors">
              All Products
            </Link>
            <Link href="/products?category=perfumes" className="text-sm font-medium hover:text-oud-gold transition-colors">
              Perfumes
            </Link>
            <Link href="/products?category=oud" className="text-sm font-medium hover:text-oud-gold transition-colors">
              Oud
            </Link>
            <Link href="/products?category=attars" className="text-sm font-medium hover:text-oud-gold transition-colors">
              Attars
            </Link>
            <Link href="/products?category=bakhoor" className="text-sm font-medium hover:text-oud-gold transition-colors">
              Bakhoor
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Input
              type="search"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cart && cart.summary.itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-oud-gold">
                    {cart.summary.itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wallet">Wallet & Coins</Link>
                  </DropdownMenuItem>
                  {user?.role === 'VENDOR' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/vendor">Vendor Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === 'ADMIN' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="primary" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
```

---

## Part 2: Footer Component

Create `components/layout/Footer.tsx`:

```typescript
import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-deep-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-heading text-2xl text-oud-gold mb-4">AromaSouq</h3>
            <p className="text-sm text-gray-300 mb-4">
              Your premier destination for authentic luxury fragrances, oud, and attars from the finest UAE vendors.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:text-oud-gold">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-oud-gold">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-oud-gold">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/products" className="hover:text-oud-gold transition-colors">All Products</Link></li>
              <li><Link href="/products?category=perfumes" className="hover:text-oud-gold transition-colors">Perfumes</Link></li>
              <li><Link href="/products?category=oud" className="hover:text-oud-gold transition-colors">Oud</Link></li>
              <li><Link href="/products?category=attars" className="hover:text-oud-gold transition-colors">Attars</Link></li>
              <li><Link href="/products?category=bakhoor" className="hover:text-oud-gold transition-colors">Bakhoor</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-oud-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-oud-gold transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="hover:text-oud-gold transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-oud-gold transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-oud-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to get 50 coins and exclusive offers!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2025 AromaSouq. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-oud-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-oud-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## Part 3: Homepage

Create `app/page.tsx`:

```typescript
import { Suspense } from "react"
import Link from "next/link"
import { Spotlight } from "@/components/aceternity/spotlight"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, CheckCircle, RefreshCw, MessageCircle } from "lucide-react"

// Mock data - replace with actual API calls
const featuredProducts = [
  // Add product data
]

const categories = [
  { id: 1, name: "Perfumes", slug: "perfumes", image: "/images/categories/perfumes.jpg", count: 180 },
  { id: 2, name: "Oud", slug: "oud", image: "/images/categories/oud.jpg", count: 65 },
  { id: 3, name: "Attars", slug: "attars", image: "/images/categories/attars.jpg", count: 42 },
  { id: 4, name: "Bakhoor", slug: "bakhoor", image: "/images/categories/bakhoor.jpg", count: 38 },
  { id: 5, name: "Home Fragrance", slug: "home-fragrance", image: "/images/categories/home.jpg", count: 55 },
  { id: 6, name: "Essential Oils", slug: "essential-oils", image: "/images/categories/oils.jpg", count: 28 },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-deep-navy">
        <Spotlight className="top-0 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight">
              Discover Luxury <span className="text-oud-gold">Fragrances</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Authentic oud, perfumes, and attars from premium UAE vendors
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/products">Explore Collection</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl lg:text-4xl text-center mb-12">Shop by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl lg:text-4xl">Trending Now</h2>
            <Button variant="ghost" asChild>
              <Link href="/products">View All →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First product gets featured treatment with GlareCard */}
            <ProductCard product={featuredProducts[0]} featured />

            {/* Rest are standard */}
            {featuredProducts.slice(1, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl lg:text-4xl text-center mb-12">Why Choose AromaSouq</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over 300 AED</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">Authentic Products</h3>
                <p className="text-sm text-muted-foreground">100% genuine fragrances</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">14-day return policy</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">WhatsApp Support</h3>
                <p className="text-sm text-muted-foreground">Instant customer service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-gold text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl mb-4">Get 50 Coins on Signup! 🎁</h2>
          <p className="text-xl mb-8">Subscribe for exclusive offers & updates</p>

          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-gray-900"
            />
            <Button variant="secondary" size="lg">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

Update `app/layout.tsx` to include Header and Footer:

```typescript
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  )
}
```

---

## Part 4: Product Listing Page

Create `app/products/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import { useProducts } from "@/hooks/useProducts"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    categoryId: searchParams.get('category') || undefined,
    minPrice: 0,
    maxPrice: 5000,
    sortBy: 'relevance',
  })

  const { data, isLoading } = useProducts(filters)

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 5000]}
          max={5000}
          step={50}
          onValueChange={([min, max]) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{filters.minPrice} AED</span>
          <span>{filters.maxPrice} AED</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Perfumes</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Oud</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Attars</span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">4★ & up</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">3★ & up</span>
          </label>
        </div>
      </div>

      <Button variant="outline" className="w-full">Clear All Filters</Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        Home / Products
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <FilterSidebar />
        </aside>

        {/* Products */}
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {isLoading ? 'Loading...' : `${data?.pagination.total || 0} Products`}
            </h1>

            <div className="flex gap-4 items-center">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <FilterSidebar />
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select defaultValue="relevance" onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="bestseller">Best Sellers</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline">Previous</Button>
              {[...Array(data.pagination.totalPages)].map((_, i) => (
                <Button key={i} variant={i + 1 === data.pagination.page ? "primary" : "outline"}>
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline">Next</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
```

---

## Part 5: Product Detail Page

Create `app/products/[slug]/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Heart, Minus, Plus, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Lens } from "@/components/aceternity/lens"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ReviewCard } from "@/components/ui/review-card"
import { ProductCard } from "@/components/ui/product-card"
import { useProduct } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { formatCurrency, calculateDiscount } from "@/lib/utils"

export default function ProductDetailPage() {
  const params = useParams()
  const { data: product, isLoading } = useProduct(params.slug as string)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  if (isLoading || !product) {
    return <div>Loading...</div>
  }

  const discount = product.salePrice ? calculateDiscount(product.regularPrice, product.salePrice) : 0
  const currentPrice = product.salePrice || product.regularPrice

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        Home / {product.category?.nameEn} / {product.nameEn}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image with Lens Zoom */}
          <Lens lensSize={200} zoomFactor={2.5} className="mb-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.nameEn}
                fill
                className="object-cover"
              />
            </div>
          </Lens>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                  selectedImage === index ? 'ring-2 ring-oud-gold' : ''
                }`}
              >
                <Image src={image.url} alt={`Product ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Brand */}
          <p className="text-sm text-muted-foreground mb-2">{product.brand?.nameEn}</p>

          {/* Title */}
          <h1 className="font-heading text-3xl lg:text-4xl mb-4">{product.nameEn}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-oud-gold">{formatCurrency(currentPrice)}</span>
              {product.salePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatCurrency(product.regularPrice)}
                  </span>
                  <Badge className="bg-gradient-badge-sale text-white">Save {discount}%</Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Earn {product.coinsToAward} coins 🪙</p>
          </div>

          <Separator className="my-6" />

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size:</h3>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant === variant.id ? "primary" : "outline"}
                    onClick={() => setSelectedVariant(variant.id)}
                  >
                    {variant.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Quantity:</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stockQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stockQuantity} in stock
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => addToCart({ productId: product.id, variantId: selectedVariant, quantity })}
              disabled={product.stockQuantity === 0}
            >
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted(product.id) ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* WhatsApp */}
          {product.whatsappNumber && (
            <Button variant="whatsapp" size="lg" className="w-full mb-6">
              💬 Chat on WhatsApp
            </Button>
          )}

          {/* Benefits */}
          <Card>
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Free shipping on orders over 300 AED</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Same-day delivery (UAE)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Easy returns within 14 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Scent Profile */}
          {product.scentProfile && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Scent Profile</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Top Notes:</span>
                    <p className="mt-1">{product.scentProfile.topNotes.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Heart Notes:</span>
                    <p className="mt-1">{product.scentProfile.heartNotes.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Base Notes:</span>
                    <p className="mt-1">{product.scentProfile.baseNotes.join(', ')}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Longevity:</span>
                      <p>{product.scentProfile.longevity} hours</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Sillage:</span>
                      <p>{product.scentProfile.sillage}/5</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.descriptionEn}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-6">
            {/* Reviews will be mapped here */}
            <p>Reviews section</p>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Shipping Information</h3>
                <ul className="space-y-2">
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery: 1-2 business days</li>
                  <li>• Same-day delivery available for UAE (order before 12pm)</li>
                  <li>• Free shipping on orders over 300 AED</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Related products will be mapped here */}
        </div>
      </section>
    </div>
  )
}
```

---

## Part 6: Login/Register Pages

Create `app/(auth)/login/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from "@/hooks/useAuth"
import { loginSchema, type LoginInput } from "@/lib/validations"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      toast.success("Welcome back!")
      router.push("/")
    } catch (error) {
      toast.error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/forgot-password" className="text-sm text-oud-gold hover:underline">
            Forgot password?
          </Link>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-oud-gold hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
```

Create similar Register page at `app/(auth)/register/page.tsx` using `registerSchema`.

---

## ✅ Phase 4 Complete

You should now have:
- ✅ Header with navigation, search, cart badge, user menu
- ✅ Footer with links and newsletter
- ✅ Homepage with hero, categories, featured products
- ✅ Product listing with filters and sorting
- ✅ Product detail with image gallery, variants, add to cart
- ✅ Login/Register pages with form validation

---

## 🎯 Next Steps

Proceed to **05-SHOPPING-FEATURES.md** for cart, checkout, wishlist, and order management.

**Time investment:** 6-8 hours ✅
**Next phase:** 6-8 hours (05-SHOPPING-FEATURES.md)
