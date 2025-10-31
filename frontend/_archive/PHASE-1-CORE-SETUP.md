# Frontend Phase 1: Core Setup & Architecture

## Overview
This phase establishes the complete frontend architecture including providers, API layer, authentication, TypeScript types, layouts, and reusable UI components.

**Prerequisites**: Backend Phase 1 must be completed and running.

---

## 1. Current Setup Analysis

**Existing (✅):**
- Next.js 16.0.0 with App Router
- React 19.2.0, TypeScript 5
- Tailwind CSS v4 with brand colors
- Fonts: Playfair Display + Inter
- Dependencies: React Query, Axios, React Hook Form, Zod, Zustand, Supabase client
- .env.local configured

**Missing (To Build in Phase 1):**
- React Query provider
- Axios instance with cookie support
- Authentication context and hooks
- Zustand stores
- TypeScript types for all backend models
- Layouts (Main, Auth, Dashboard)
- Reusable UI components
- API service layer
- Error handling utilities

---

## 2. Project Structure

Create the following directory structure in `src/`:

```
src/
├── app/
│   ├── (auth)/              # Auth layout group
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (main)/              # Main layout group (public)
│   │   ├── layout.tsx
│   │   └── ...pages
│   ├── (dashboard)/         # Dashboard layout group
│   │   ├── account/
│   │   ├── vendor/
│   │   └── admin/
│   ├── globals.css
│   ├── layout.tsx           # Root layout
│   └── page.tsx
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   └── common/              # Common components
│       ├── ProductCard.tsx
│       ├── CategoryCard.tsx
│       └── ...
├── lib/
│   ├── api/                 # API layer
│   │   ├── client.ts        # Axios instance
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   └── ...
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useWishlist.ts
│   │   └── ...
│   ├── store/               # Zustand stores
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   └── ...
│   ├── utils/               # Utilities
│   │   ├── cn.ts            # Class name utility
│   │   ├── formatters.ts
│   │   └── validators.ts
│   └── providers/           # Context providers
│       ├── QueryProvider.tsx
│       ├── AuthProvider.tsx
│       └── ToastProvider.tsx
├── types/
│   ├── index.ts
│   ├── api.ts
│   ├── models.ts
│   └── enums.ts
└── middleware.ts            # Next.js middleware for auth
```

---

## 3. TypeScript Types

### File: `src/types/enums.ts`

```typescript
// Match backend Prisma enums exactly
export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum VendorStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  WALLET = 'WALLET',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export enum CoinTransactionType {
  EARNED = 'EARNED',
  SPENT = 'SPENT',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
  ADMIN_ADJUSTMENT = 'ADMIN_ADJUSTMENT',
}

export enum CoinSource {
  ORDER_PURCHASE = 'ORDER_PURCHASE',
  PRODUCT_REVIEW = 'PRODUCT_REVIEW',
  REFERRAL = 'REFERRAL',
  PROMOTION = 'PROMOTION',
  REFUND = 'REFUND',
  ADMIN = 'ADMIN',
}

export enum VoteType {
  HELPFUL = 'HELPFUL',
  NOT_HELPFUL = 'NOT_HELPFUL',
}
```

### File: `src/types/models.ts`

```typescript
import {
  UserRole,
  UserStatus,
  VendorStatus,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  CoinTransactionType,
  CoinSource,
  VoteType,
} from './enums';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  preferredLanguage: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  businessNameAr?: string;
  description?: string;
  descriptionAr?: string;
  tagline?: string;
  taglineAr?: string;
  brandStory?: string;
  brandStoryAr?: string;
  logo?: string;
  banner?: string;
  tradeLicense?: string;
  taxNumber?: string;
  businessEmail: string;
  businessPhone: string;
  website?: string;
  whatsappNumber?: string;
  whatsappEnabled: boolean;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  tiktokUrl?: string;
  status: VendorStatus;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  icon?: string;
  image?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  logo?: string;
  banner?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  nameAr?: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
  compareAtPrice?: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVideo {
  id: string;
  productId: string;
  url: string;
  title?: string;
  titleAr?: string;
  thumbnail?: string;
  duration?: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  sku: string;
  barcode?: string;
  stock: number;
  lowStockAlert: number;
  images: string[];
  video?: string;
  categoryId: string;
  category?: Category;
  brandId?: string;
  brand?: Brand;
  vendorId: string;
  vendor?: Vendor;
  size?: string;
  concentration?: string;
  gender?: string;
  notes?: string;
  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;
  scentFamily?: string;
  longevity?: string;
  sillage?: string;
  season?: string;
  enableWhatsapp: boolean;
  whatsappNumber?: string;
  coinsToAward: number;
  viewCount: number;
  salesCount: number;
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  isFeatured: boolean;
  averageRating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  videos?: ProductVideo[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  addressId: string;
  address?: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  coinsEarned: number;
  coinsUsed: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentId?: string;
  trackingNumber?: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: string;
}

export interface ReviewImage {
  id: string;
  reviewId: string;
  url: string;
  sortOrder: number;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  user?: User;
  productId: string;
  product?: Product;
  rating: number;
  title?: string;
  comment?: string;
  images: string[];
  vendorReply?: string;
  vendorRepliedAt?: string;
  helpfulCount: number;
  notHelpfulCount: number;
  isVerifiedPurchase: boolean;
  isPublished: boolean;
  reviewImages?: ReviewImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CoinTransaction {
  id: string;
  walletId: string;
  amount: number;
  type: CoinTransactionType;
  source: CoinSource;
  description?: string;
  orderId?: string;
  reviewId?: string;
  productId?: string;
  balanceAfter: number;
  expiresAt?: string;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  transactions?: CoinTransaction[];
  createdAt: string;
  updatedAt: string;
}
```

### File: `src/types/api.ts`

```typescript
// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Auth DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

// Product Query
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  brandId?: string;
  vendorId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: string;
  concentration?: string;
  scentFamily?: string;
  isFeatured?: boolean;
  sortBy?: 'createdAt' | 'price' | 'name' | 'averageRating' | 'salesCount';
  sortOrder?: 'asc' | 'desc';
}

// Cart
export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
}

export interface CartResponse {
  items: CartItem[];
  summary: CartSummary;
}

// Order
export interface CreateOrderDto {
  addressId: string;
  paymentMethod: PaymentMethod;
  coinsToUse?: number;
}

// Review
export interface CreateReviewDto {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
}

export interface VoteReviewDto {
  voteType: VoteType;
}

// Import types for easy access
import { User } from './models';
```

### File: `src/types/index.ts`

```typescript
export * from './enums';
export * from './models';
export * from './api';
```

---

## 4. API Client Setup

### File: `src/lib/api/client.ts`

```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance with cookie support
export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized - redirect to login
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }

      // Return formatted error
      return Promise.reject({
        message: error.response.data?.message || 'An error occurred',
        statusCode: status,
        error: error.response.data?.error,
      });
    }

    // Network error
    return Promise.reject({
      message: 'Network error. Please check your connection.',
      statusCode: 0,
    });
  }
);

export default apiClient;
```

### File: `src/lib/api/auth.ts`

```typescript
import { apiClient } from './client';
import { LoginDto, RegisterDto, AuthResponse, User } from '@/types';

export const authApi = {
  // Register new user
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  // Get current user profile
  getMe: async (): Promise<{ user: User }> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
```

### File: `src/lib/api/categories.ts`

```typescript
import { apiClient } from './client';
import { Category } from '@/types';

export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  // Get all categories with product count
  getAllWithProductCount: async (): Promise<Category[]> => {
    const response = await apiClient.get('/categories/with-product-count');
    return response.data;
  },

  // Get category by ID
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  // Get category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get(`/categories/slug/${slug}`);
    return response.data;
  },
};
```

---

## 5. Authentication Store (Zustand)

### File: `src/lib/store/authStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### File: `src/lib/store/cartStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  itemCount: number;
  setItemCount: (count: number) => void;
  incrementItemCount: () => void;
  decrementItemCount: () => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      itemCount: 0,
      setItemCount: (count) => set({ itemCount: count }),
      incrementItemCount: () => set((state) => ({ itemCount: state.itemCount + 1 })),
      decrementItemCount: () =>
        set((state) => ({ itemCount: Math.max(0, state.itemCount - 1) })),
      resetCart: () => set({ itemCount: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
```

---

## 6. React Query Provider

### File: `src/lib/providers/QueryProvider.tsx`

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### File: `src/lib/providers/AuthProvider.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { authApi } from '@/lib/api/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { user } = await authApi.getMe();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
```

---

## 7. Custom Hooks

### File: `src/lib/hooks/useAuth.ts`

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { useCartStore } from '@/lib/store/cartStore';
import { LoginDto, RegisterDto } from '@/types';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setUser, logout: logoutStore } = useAuthStore();
  const { resetCart } = useCartStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response) => {
      setUser(response.user);
      router.push('/');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (response) => {
      setUser(response.user);
      router.push('/');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logoutStore();
      resetCart();
      queryClient.clear();
      router.push('/login');
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
```

---

## 8. Utility Functions

### File: `src/lib/utils/cn.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### File: `src/lib/utils/formatters.ts`

```typescript
export const formatCurrency = (amount: number, currency = 'AED'): string => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date: string): string => {
  return new Intl.DateTimeFormat('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return formatDate(date);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
```

---

## 9. Update Root Layout

### File: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { AuthProvider } from '@/lib/providers/AuthProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AromaSouq - Luxury Fragrances UAE & GCC',
  description:
    'Discover authentic luxury fragrances and premium perfumes in the UAE. Shop from top brands with fast delivery across the GCC.',
  keywords: 'perfume, fragrance, luxury, UAE, GCC, Dubai, oud, attar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

---

## 10. Install Additional Dependencies

```bash
cd aromasouq-web
npm install clsx tailwind-merge
npm install --save-dev @tanstack/react-query-devtools
```

---

## 11. Next.js Middleware for Auth

### File: `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has auth cookie
  const hasAuthCookie = request.cookies.has('access_token');

  // Protected routes that require authentication
  const protectedRoutes = ['/account', '/checkout', '/orders'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Vendor routes
  const isVendorRoute = pathname.startsWith('/vendor');

  // Admin routes
  const isAdminRoute = pathname.startsWith('/admin');

  // Auth routes (login, register)
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !hasAuthCookie) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to home if accessing auth routes while authenticated
  if (isAuthRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // For vendor and admin routes, we'll handle role-based access in the pages themselves
  // since we can't decode JWT in middleware without adding extra dependencies

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
```

---

## 12. Basic UI Components

### File: `src/components/ui/Button.tsx`

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-[#c9a86a] text-white hover:bg-[#a88a54] focus:ring-[#c9a86a]',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600',
      outline:
        'border-2 border-[#c9a86a] text-[#c9a86a] hover:bg-[#c9a86a] hover:text-white focus:ring-[#c9a86a]',
      ghost: 'text-[#c9a86a] hover:bg-[#c9a86a]/10 focus:ring-[#c9a86a]',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### File: `src/components/ui/Input.tsx`

```typescript
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a86a] focus:border-transparent transition-all',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### File: `src/components/ui/Spinner.tsx`

```typescript
import { cn } from '@/lib/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-b-2 border-[#c9a86a]',
          sizes[size],
          className
        )}
      />
    </div>
  );
}
```

---

## 13. Phase 1 Testing Checklist

- [ ] Install additional dependencies (clsx, tailwind-merge)
- [ ] Create all TypeScript types (enums, models, api)
- [ ] Set up API client with axios and cookie support
- [ ] Create auth API service
- [ ] Create categories API service
- [ ] Set up Zustand stores (auth, cart)
- [ ] Create React Query provider
- [ ] Create Auth provider
- [ ] Create useAuth custom hook
- [ ] Add utility functions (cn, formatters)
- [ ] Update root layout with providers
- [ ] Create middleware for auth protection
- [ ] Create basic UI components (Button, Input, Spinner)
- [ ] Test API client with backend
- [ ] Test authentication flow (login/logout)
- [ ] Test middleware redirects

---

## 14. Next Steps

After completing Phase 1, proceed to:
- **Phase 2**: Public pages (Home, Products, Product Detail, Categories, Brands)
- **Phase 3**: User features (Cart, Wishlist, Checkout, Account, Reviews)
- **Phase 4**: Vendor Dashboard
- **Phase 5**: Admin Dashboard

---

**Phase 1 Complete!** The core frontend architecture is now in place with proper API integration, authentication, state management, and reusable components.
