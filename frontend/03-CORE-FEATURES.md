# Phase 3: Core Features & Backend Integration

**Estimated Time:** 3-4 hours
**Dependencies:** 01-FOUNDATION.md, 02-DESIGN-SYSTEM.md
**Next Phase:** 04-PUBLIC-PAGES.md

---

## Overview

This phase sets up backend integration, TypeScript types, authentication, and state management. All API services and data hooks are defined here.

---

## Part 1: TypeScript Types

Create `types/index.ts`:

```typescript
// Re-export all types
export * from './user'
export * from './product'
export * from './order'
export * from './review'
export * from './cart'
export * from './common'
```

### User Types

Create `types/user.ts`:

```typescript
import { UserRole, UserStatus, VendorStatus } from '@/lib/constants'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: UserRole
  status: UserStatus
  emailVerified: boolean
  preferredLanguage: 'en' | 'ar'
  createdAt: Date
  updatedAt: Date
  vendor?: Vendor
}

export interface Vendor {
  id: string
  userId: string
  businessName: string
  logo?: string
  coverImage?: string
  taglineEn?: string
  taglineAr?: string
  shortDescriptionEn?: string
  shortDescriptionAr?: string
  brandStoryEn?: string
  brandStoryAr?: string
  email: string
  phone: string
  whatsappNumber?: string
  instagramUrl?: string
  tiktokUrl?: string
  websiteUrl?: string
  status: VendorStatus
  createdAt: Date
}

export interface Wallet {
  userId: string
  balance: number
  lifetimeEarned: number
  lifetimeSpent: number
}

export interface CoinTransaction {
  id: string
  userId: string
  type: 'EARNED' | 'SPENT' | 'EXPIRED' | 'BONUS'
  amount: number
  balance: number
  source: string
  description: string
  createdAt: Date
}

export interface Address {
  id: string
  userId: string
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  emirate: string
  country: string
  zipCode: string
  isDefault: boolean
}
```

### Product Types

Create `types/product.ts`:

```typescript
import { Gender } from '@/lib/constants'

export interface Product {
  id: string
  vendorId: string
  categoryId: string
  brandId?: string
  nameEn: string
  nameAr: string
  slug: string
  sku: string
  descriptionEn: string
  descriptionAr: string
  regularPrice: number
  salePrice?: number
  stockQuantity: number
  lowStockThreshold: number
  images: ProductImage[]
  videos: ProductVideo[]
  variants: ProductVariant[]
  scentProfile?: ScentProfile
  rating: number
  reviewCount: number
  salesCount: number
  coinsToAward: number
  whatsappNumber?: string
  isNew: boolean
  createdAt: Date

  // Relations
  vendor?: {
    id: string
    businessName: string
    logo?: string
  }
  brand?: {
    id: string
    nameEn: string
    nameAr: string
  }
  category?: {
    id: string
    nameEn: string
    nameAr: string
  }
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  altText?: string
  position: number
  isFeatured: boolean
}

export interface ProductVideo {
  id: string
  productId: string
  url: string
  thumbnailUrl: string
  duration: number
  position: number
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  sku: string
  price: number
  stockQuantity: number
  isActive: boolean
}

export interface ScentProfile {
  family: string
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
  longevity: number
  sillage: number
  season: string[]
  gender: Gender
}

export interface Category {
  id: string
  nameEn: string
  nameAr: string
  slug: string
  descriptionEn?: string
  descriptionAr?: string
  image?: string
  parentId?: string
  productCount: number
}

export interface Brand {
  id: string
  nameEn: string
  nameAr: string
  slug: string
  logo?: string
  descriptionEn?: string
  descriptionAr?: string
  productCount: number
}
```

### Order Types

Create `types/order.ts`:

```typescript
import { OrderStatus, PaymentMethod, PaymentStatus } from '@/lib/constants'

export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus

  // Items
  items: OrderItem[]

  // Pricing
  subtotal: number
  shippingCost: number
  taxAmount: number
  coinsUsed: number
  coinsEarned: number
  total: number

  // Shipping
  shippingAddress: {
    fullName: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    emirate: string
    country: string
    zipCode: string
  }

  // Payment
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus

  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  variantId?: string
  quantity: number
  price: number
  total: number

  // Product snapshot
  product: {
    name: string
    image: string
    sku: string
  }
}
```

### Review Types

Create `types/review.ts`:

```typescript
export interface Review {
  id: string
  productId: string
  userId: string
  orderId?: string
  rating: number
  title?: string
  comment: string
  images: ReviewImage[]
  isVerifiedPurchase: boolean
  helpfulCount: number
  notHelpfulCount: number
  vendorReply?: {
    text: string
    repliedAt: Date
  }
  status: 'published' | 'hidden' | 'flagged'
  createdAt: Date

  // Relations
  user?: {
    firstName: string
    lastName: string
    avatar?: string
  }
}

export interface ReviewImage {
  id: string
  reviewId: string
  url: string
  position: number
}
```

### Cart Types

Create `types/cart.ts`:

```typescript
export interface Cart {
  id: string
  userId?: string
  sessionId?: string
  items: CartItem[]
  summary: CartSummary
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  variantId?: string
  quantity: number

  // Product snapshot
  product: {
    id: string
    name: string
    slug: string
    image: string
    price: number
    stockQuantity: number
    coinsToAward: number
  }
  variant?: {
    id: string
    name: string
    price: number
  }
}

export interface CartSummary {
  subtotal: number
  shipping: number
  tax: number
  coinsEarnable: number
  total: number
  itemCount: number
}
```

### Common Types

Create `types/common.ts`:

```typescript
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface FilterOptions {
  categoryId?: string
  brandId?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'bestseller' | 'rating'
  search?: string
  page?: number
  limit?: number
}
```

---

## Part 2: API Client

Create `lib/api-client.ts`:

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios'
import { API_URL } from './constants'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      withCredentials: true, // Important for cookies
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // GET request
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(url, { params })
    return response.data
  }

  // POST request
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  // PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }

  // DELETE request
  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }

  // File upload
  async uploadFile<T>(url: string, file: File, fieldName: string = 'file'): Promise<T> {
    const formData = new FormData()
    formData.append(fieldName, file)

    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export const apiClient = new ApiClient()
```

---

## Part 3: Auth Store (Zustand)

Create `stores/authStore.ts`:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'
import { apiClient } from '@/lib/api-client'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await apiClient.post<{ user: User }>('/auth/login', {
            email,
            password,
          })
          set({ user: response.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (data) => {
        set({ isLoading: true })
        try {
          const response = await apiClient.post<{ user: User }>('/auth/register', data)
          set({ user: response.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await apiClient.post('/auth/logout')
          set({ user: null, isAuthenticated: false })
        } catch (error) {
          console.error('Logout failed:', error)
        }
      },

      fetchUser: async () => {
        set({ isLoading: true })
        try {
          const user = await apiClient.get<User>('/auth/me')
          set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
```

---

## Part 4: React Query Setup

Create `lib/query-client.ts`:

```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
```

Create `components/providers/query-provider.tsx`:

```typescript
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

---

## Part 5: Custom Hooks

### useAuth Hook

Create `hooks/useAuth.ts`:

```typescript
import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, register, logout, fetchUser } = useAuthStore()

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    fetchUser,
    isCustomer: user?.role === 'CUSTOMER',
    isVendor: user?.role === 'VENDOR',
    isAdmin: user?.role === 'ADMIN',
  }
}
```

### useProducts Hook

Create `hooks/useProducts.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Product, PaginatedResponse, FilterOptions } from '@/types'

export function useProducts(filters?: FilterOptions) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => apiClient.get<PaginatedResponse<Product>>('/products', filters),
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => apiClient.get<Product>(`/products/${slug}`),
    enabled: !!slug,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Product>) => apiClient.post<Product>('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Product>) => apiClient.put<Product>(`/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    },
  })
}
```

### useCart Hook

Create `hooks/useCart.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Cart, CartItem } from '@/types'
import toast from 'react-hot-toast'

export function useCart() {
  const queryClient = useQueryClient()

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => apiClient.get<Cart>('/cart'),
  })

  const addToCart = useMutation({
    mutationFn: (data: { productId: string; variantId?: string; quantity: number }) =>
      apiClient.post<Cart>('/cart/items', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Added to cart')
    },
    onError: () => {
      toast.error('Failed to add to cart')
    },
  })

  const updateCartItem = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      apiClient.put<Cart>(`/cart/items/${itemId}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const removeFromCart = useMutation({
    mutationFn: (itemId: string) => apiClient.delete(`/cart/items/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Removed from cart')
    },
  })

  const clearCart = useMutation({
    mutationFn: () => apiClient.delete('/cart'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  return {
    cart,
    isLoading,
    addToCart: addToCart.mutate,
    updateCartItem: updateCartItem.mutate,
    removeFromCart: removeFromCart.mutate,
    clearCart: clearCart.mutate,
  }
}
```

### useWishlist Hook

Create `hooks/useWishlist.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export function useWishlist() {
  const queryClient = useQueryClient()

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => apiClient.get<Product[]>('/wishlist'),
  })

  const addToWishlist = useMutation({
    mutationFn: (productId: string) => apiClient.post('/wishlist', { productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      toast.success('Added to wishlist')
    },
  })

  const removeFromWishlist = useMutation({
    mutationFn: (productId: string) => apiClient.delete(`/wishlist/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      toast.success('Removed from wishlist')
    },
  })

  const toggleWishlist = (productId: string) => {
    const isWishlisted = wishlist?.some((p) => p.id === productId)
    if (isWishlisted) {
      removeFromWishlist.mutate(productId)
    } else {
      addToWishlist.mutate(productId)
    }
  }

  const isWishlisted = (productId: string) => {
    return wishlist?.some((p) => p.id === productId) || false
  }

  return {
    wishlist,
    isLoading,
    toggleWishlist,
    isWishlisted,
  }
}
```

### useWallet Hook

Create `hooks/useWallet.ts`:

```typescript
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Wallet, CoinTransaction } from '@/types'

export function useWallet() {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => apiClient.get<Wallet>('/wallet'),
  })
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => apiClient.get<CoinTransaction[]>('/wallet/transactions'),
  })
}
```

---

## Part 6: Form Validation Schemas (Zod)

Create `lib/validations.ts`:

```typescript
import { z } from 'zod'
import { MIN_PASSWORD_LENGTH } from './constants'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  emirate: z.string().min(2, 'Emirate is required'),
  country: z.string().default('UAE'),
  zipCode: z.string().optional(),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().min(20, 'Review must be at least 20 characters'),
  images: z.array(z.instanceof(File)).max(3, 'Maximum 3 images allowed').optional(),
})

export const productSchema = z.object({
  nameEn: z.string().min(3, 'Product name is required'),
  nameAr: z.string().min(3, 'Arabic name is required'),
  descriptionEn: z.string().min(20, 'Description is required'),
  descriptionAr: z.string().min(20, 'Arabic description is required'),
  categoryId: z.string().min(1, 'Category is required'),
  regularPrice: z.number().min(0, 'Price must be positive'),
  salePrice: z.number().optional(),
  stockQuantity: z.number().min(0, 'Stock cannot be negative'),
  lowStockThreshold: z.number().min(0),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type ProductInput = z.infer<typeof productSchema>
```

---

## Part 7: Middleware for Route Protection

Create `middleware.ts` (root level):

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')
  const { pathname } = request.nextUrl

  // Public routes
  const publicRoutes = ['/', '/products', '/about', '/login', '/register']
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/products/'))

  // Check if user is authenticated
  const isAuthenticated = !!accessToken

  // Redirect to login if accessing protected route without auth
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to home if accessing auth routes while authenticated
  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

---

## Part 8: Update Root Layout with Providers

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

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
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
```

---

## ✅ Phase 3 Complete

You should now have:
- ✅ Complete TypeScript types (synced with backend)
- ✅ API client with cookie support
- ✅ Auth store with Zustand + persistence
- ✅ React Query setup
- ✅ Custom hooks (useAuth, useProducts, useCart, useWishlist, useWallet)
- ✅ Zod validation schemas
- ✅ Route protection middleware
- ✅ Providers configured in root layout

---

## 🎯 Next Steps

Proceed to **04-PUBLIC-PAGES.md** to build customer-facing pages using the components from 02-DESIGN-SYSTEM and hooks from this file.

**Time investment:** 3-4 hours ✅
**Next phase:** 6-8 hours (04-PUBLIC-PAGES.md)
