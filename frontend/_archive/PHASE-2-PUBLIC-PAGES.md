# Frontend Phase 2: Public Pages

## Overview
This phase implements all public-facing pages including Homepage, Product Listing, Product Detail, Categories, Brands, and Authentication pages.

**Prerequisites**: Frontend Phase 1 must be completed.

---

## 1. API Services (Additional)

### File: `src/lib/api/products.ts`

```typescript
import { apiClient } from './client';
import { Product, PaginatedResponse, ProductQueryParams } from '@/types';

export const productsApi = {
  // Get all products with filters
  getAll: async (params?: ProductQueryParams): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  // Get product by ID
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Get product by slug
  getBySlug: async (slug: string): Promise<Product> => {
    const response = await apiClient.get(`/products/slug/${slug}`);
    return response.data;
  },
};
```

### File: `src/lib/api/brands.ts`

```typescript
import { apiClient } from './client';
import { Brand } from '@/types';

export const brandsApi = {
  // Get all brands
  getAll: async (): Promise<Brand[]> => {
    const response = await apiClient.get('/brands');
    return response.data;
  },

  // Get brand by ID
  getById: async (id: string): Promise<Brand> => {
    const response = await apiClient.get(`/brands/${id}`);
    return response.data;
  },

  // Get brand by slug
  getBySlug: async (slug: string): Promise<Brand> => {
    const response = await apiClient.get(`/brands/slug/${slug}`);
    return response.data;
  },
};
```

---

## 2. Layout Components

### File: `src/components/layout/Header.tsx`

```typescript
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/Button';
import { ShoppingCartIcon, UserIcon, HeartIcon, SearchIcon } from '@heroicons/react/24/outline';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCartStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#c9a86a] text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Free shipping on orders over AED 300
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1
              className="text-2xl md:text-3xl font-bold text-[#c9a86a]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              AromaSouq
            </h1>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search fragrances, brands..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a86a]"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                href="/wishlist"
                className="flex items-center text-gray-700 hover:text-[#c9a86a] transition-colors"
              >
                <HeartIcon className="h-6 w-6" />
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center text-gray-700 hover:text-[#c9a86a] transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-[#c9a86a] transition-colors">
                  <UserIcon className="h-6 w-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/account/wallet"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Wallet
                  </Link>
                  {user?.role === 'VENDOR' && (
                    <Link
                      href="/vendor"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Vendor Dashboard
                    </Link>
                  )}
                  {user?.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <hr className="my-2" />
                  <button
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search fragrances, brands..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a86a]"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 py-3 overflow-x-auto">
            <li>
              <Link
                href="/products"
                className="text-gray-700 hover:text-[#c9a86a] font-medium whitespace-nowrap"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-[#c9a86a] font-medium whitespace-nowrap"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/brands"
                className="text-gray-700 hover:text-[#c9a86a] font-medium whitespace-nowrap"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="/products?isFeatured=true"
                className="text-gray-700 hover:text-[#c9a86a] font-medium whitespace-nowrap"
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                href="/products?gender=Men"
                className="text-gray-700 hover:text-[#c9a86a] font-medium whitespace-nowrap"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/products?gender=Women"
                className="text-gray-700 hover:text-[#c9a86a] font-medium whitespace-nowrap"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/products?gender=Unisex"
                className="text-gray-700 hover:text-[#c9a86a] font-medium whitespace-nowrap"
              >
                Unisex
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
```

### File: `src/components/layout/Footer.tsx`

```typescript
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3
              className="text-xl font-bold mb-4 text-[#c9a86a]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              AromaSouq
            </h3>
            <p className="text-gray-400 text-sm">
              Your destination for authentic luxury fragrances in the UAE and GCC region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@aromasouq.ae</li>
              <li>Phone: +971 4 XXX XXXX</li>
              <li>WhatsApp: +971 50 XXX XXXX</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; 2025 AromaSouq. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>We accept:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-800 rounded">Visa</span>
              <span className="px-2 py-1 bg-gray-800 rounded">Mastercard</span>
              <span className="px-2 py-1 bg-gray-800 rounded">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 3. Main Layout Group

### File: `src/app/(main)/layout.tsx`

```typescript
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

---

## 4. Homepage

### File: `src/app/(main)/page.tsx`

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { productsApi } from '@/lib/api/products';
import { categoriesApi } from '@/lib/api/categories';
import { brandsApi } from '@/lib/api/brands';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/common/ProductCard';
import { CategoryCard } from '@/components/common/CategoryCard';
import { Spinner } from '@/components/ui/Spinner';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  // Fetch featured products
  const { data: featuredProducts, isLoading: loadingProducts } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsApi.getAll({ isFeatured: true, limit: 8 }),
  });

  // Fetch categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAllWithProductCount(),
  });

  // Fetch brands
  const { data: brands, isLoading: loadingBrands } = useQuery({
    queryKey: ['brands'],
    queryFn: () => brandsApi.getAll(),
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#dfc899] via-[#c9a86a] to-[#a88a54] text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Discover Your Signature Scent
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Authentic luxury fragrances from the world's finest brands
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button variant="primary" size="lg" className="bg-white text-[#c9a86a] hover:bg-gray-100">
                  Shop Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#c9a86a]">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-[#f8f7f5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#c9a86a] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Authentic</h3>
              <p className="text-gray-600 text-sm">Guaranteed genuine products from authorized distributors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#c9a86a] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Same-day delivery available in Dubai and UAE-wide shipping</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#c9a86a] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Multiple payment options including cash on delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Featured Fragrances
            </h2>
            <Link href="/products?isFeatured=true">
              <Button variant="ghost">
                View All
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.data.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#f8f7f5]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Shop by Category
            </h2>
            <Link href="/categories">
              <Button variant="ghost">
                View All
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loadingCategories ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories?.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Luxury Brands
          </h2>

          {loadingBrands ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {brands?.slice(0, 12).map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                >
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={60}
                      className="object-contain"
                    />
                  ) : (
                    <span className="font-semibold text-gray-700">{brand.name}</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#c9a86a] to-[#a88a54] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Become a Vendor
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join AromaSouq and reach thousands of fragrance enthusiasts across the GCC
          </p>
          <Link href="/vendor/apply">
            <Button variant="primary" size="lg" className="bg-white text-[#c9a86a] hover:bg-gray-100">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
```

---

## 5. Product Card Component

### File: `src/components/common/ProductCard.tsx`

```typescript
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils/formatters';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.isFeatured && (
          <span className="absolute top-2 right-2 bg-[#c9a86a] text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-red-600 font-bold px-4 py-2 rounded">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 mb-1">{product.brand.name}</p>
        )}

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-[#c9a86a] transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-[#c9a86a]">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Coins */}
        {product.coinsToAward > 0 && (
          <p className="text-xs text-green-600 mb-3">
            Earn {product.coinsToAward} coins
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="p-2 border border-gray-300 rounded-lg hover:border-[#c9a86a] hover:text-[#c9a86a] transition-colors"
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
          <button
            disabled={product.stock === 0}
            className="flex-1 bg-[#c9a86a] text-white px-4 py-2 rounded-lg hover:bg-[#a88a54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="text-sm font-semibold">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 6. Category Card Component

### File: `src/components/common/CategoryCard.tsx`

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category & { _count?: { products: number } };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 text-center group"
    >
      {category.image ? (
        <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      ) : category.icon ? (
        <div className="w-16 h-16 mx-auto mb-3 text-[#c9a86a]">
          <span className="text-4xl">{category.icon}</span>
        </div>
      ) : (
        <div className="w-16 h-16 mx-auto mb-3 bg-[#c9a86a]/10 rounded-full flex items-center justify-center">
          <span className="text-2xl text-[#c9a86a] font-bold">
            {category.name.charAt(0)}
          </span>
        </div>
      )}
      <h3 className="font-semibold text-gray-900 group-hover:text-[#c9a86a] transition-colors">
        {category.name}
      </h3>
      {category._count && (
        <p className="text-xs text-gray-500 mt-1">{category._count.products} products</p>
      )}
    </Link>
  );
}
```

---

## 7. Install Heroicons

```bash
cd aromasouq-web
npm install @heroicons/react
npm install next-themes  # For dark mode support (optional)
```

---

## 8. Authentication Pages

### File: `src/app/(auth)/layout.tsx`

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dfc899] via-[#c9a86a] to-[#a88a54] flex items-center justify-center p-4">
      {children}
    </div>
  );
}
```

### File: `src/app/(auth)/login/page.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1
          className="text-3xl font-bold text-center mb-2 text-[#c9a86a]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">Sign in to your account</p>

        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {loginError.message || 'Invalid email or password'}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#c9a86a] focus:ring-[#c9a86a]"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-[#c9a86a] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#c9a86a] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-white hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
```

### File: `src/app/(auth)/register/page.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser, isLoading, registerError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerUser(registerData);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1
          className="text-3xl font-bold text-center mb-2 text-[#c9a86a]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Create Account
        </h1>
        <p className="text-gray-600 text-center mb-8">Join AromaSouq today</p>

        {registerError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {registerError.message || 'Registration failed'}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Phone (Optional)"
            type="tel"
            placeholder="+971 50 123 4567"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 rounded border-gray-300 text-[#c9a86a] focus:ring-[#c9a86a]"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <Link href="/terms" className="text-[#c9a86a] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#c9a86a] hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#c9a86a] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-white hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
```

---

## 9. Phase 2 Testing Checklist

- [ ] Install @heroicons/react
- [ ] Create Header component with navigation
- [ ] Create Footer component
- [ ] Create MainLayout with Header and Footer
- [ ] Create ProductCard component
- [ ] Create CategoryCard component
- [ ] Implement Homepage with all sections
- [ ] Create auth layout
- [ ] Create login page with form validation
- [ ] Create register page with form validation
- [ ] Test authentication flow end-to-end
- [ ] Test product card wishlist toggle
- [ ] Test responsive design on mobile
- [ ] Verify API integration with backend

---

## Next Steps

Proceed to:
- **Phase 3**: Complete Product Listing, Product Detail, Cart, Wishlist, Checkout, Orders, Reviews
- **Phase 4**: Vendor Dashboard
- **Phase 5**: Admin Dashboard

---

**Phase 2 Complete!** Public pages including Homepage, Layouts, and Authentication are now functional.
