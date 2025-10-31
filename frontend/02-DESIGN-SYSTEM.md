# Phase 2: Design System & Component Library

**Estimated Time:** 4-6 hours
**Dependencies:** 01-FOUNDATION.md
**Next Phase:** 03-CORE-FEATURES.md

⚠️ **CRITICAL PHASE** - All subsequent phases (04-08) import components from this file. Complete this before moving forward!

---

## Overview

This phase establishes the complete design system with:
- Luxury color palette (Oud gold theme)
- Typography system (Playfair Display + Inter)
- shadcn/ui base components (15-20 components)
- Aceternity UI enhancements (5-7 selective components)
- Custom business components (ProductCard, ReviewCard, etc.)
- Framer Motion animation patterns

---

## Part 1: Tailwind Configuration

### Update `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Luxury Oud Theme
        'oud-gold': '#C9A86A',
        'deep-navy': '#1A1F2E',
        'charcoal': '#2D2D2D',
        'ivory': '#FEFEFE',
        'rose-gold': '#E8C4A0',
        'amber': '#D4A574',
        'sage-green': '#8B9D83',
        'burgundy': '#8B3A3A',
        'whatsapp-green': '#25D366',

        // shadcn/ui variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'heading': ['var(--font-playfair)', 'Georgia', 'serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
        'sans': ['var(--font-inter)', 'sans-serif'],
        'serif': ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'oud': '0 4px 12px rgba(201, 168, 106, 0.3)',
        'oud-hover': '0 6px 20px rgba(201, 168, 106, 0.4)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A86A, #D4A574)',
        'gradient-badge-new': 'linear-gradient(135deg, #4CAF50, #66BB6A)',
        'gradient-badge-sale': 'linear-gradient(135deg, #EF5350, #E57373)',
        'gradient-badge-trending': 'linear-gradient(135deg, #FFA726, #FFB74D)',
        'gradient-badge-low-stock': 'linear-gradient(135deg, #8B3A3A, #A94442)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### Install Tailwind Animate Plugin

```bash
npm install tailwindcss-animate
```

---

## Part 2: shadcn/ui Setup

### Initialize shadcn/ui

```bash
npx shadcn-ui@latest init
```

**Configuration:**
```
✓ Would you like to use TypeScript? yes
✓ Which style would you like to use? Default
✓ Which color would you like to use as base color? Slate
✓ Where is your global CSS file? app/globals.css
✓ Would you like to use CSS variables for colors? yes
✓ Where is your tailwind.config located? tailwind.config.ts
✓ Configure the import alias for components? @/components
✓ Configure the import alias for utils? @/lib/utils
✓ Are you using React Server Components? yes
```

### Install Core shadcn Components

```bash
# Form & Input Components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form

# Layout Components
npx shadcn-ui@latest add card
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet

# Feedback Components
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add progress

# Navigation Components
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add tooltip

# Data Display
npx shadcn-ui@latest add table
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add skeleton
```

This creates components in `components/ui/` that can be imported.

---

## Part 3: Custom Button Variants

Update `components/ui/button.tsx` to add custom variants:

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // Custom luxury variants
        primary: "bg-gradient-gold text-white shadow-oud hover:shadow-oud-hover hover:-translate-y-0.5 transition-all duration-200",
        whatsapp: "bg-whatsapp-green text-white hover:bg-whatsapp-green/90 shadow-md hover:shadow-lg transition-all",
        burgundy: "bg-burgundy text-white hover:bg-burgundy/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

---

## Part 4: Aceternity Components (Selective)

Create folder: `components/aceternity/`

### 4.1 Glare Card (for featured products)

Create `components/aceternity/glare-card.tsx`:

```typescript
"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GlareCardProps {
  children: React.ReactNode
  className?: string
}

export function GlareCard({ children, className }: GlareCardProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden rounded-xl", className)}
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(201, 168, 106, 0.15), transparent 80%)`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
```

### 4.2 Spotlight (for hero sections)

Create `components/aceternity/spotlight.tsx`:

```typescript
"use client"

import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-[1] h-[169%] w-[138%] animate-spotlight opacity-0 lg:w-[84%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          />
        </filter>
      </defs>
    </svg>
  )
}
```

### 4.3 Lens (product image zoom)

Create `components/aceternity/lens.tsx`:

```typescript
"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LensProps {
  children: React.ReactNode
  lensSize?: number
  zoomFactor?: number
  className?: string
}

export function Lens({ children, lensSize = 150, zoomFactor = 2, className }: LensProps) {
  const [showLens, setShowLens] = useState(false)
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setLensPosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-zoom-in", className)}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {showLens && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute rounded-full border-2 border-oud-gold pointer-events-none"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${lensPosition.x - lensSize / 2}px`,
            top: `${lensPosition.y - lensSize / 2}px`,
            backgroundImage: `url(${(children as any)?.props?.src || ''})`,
            backgroundSize: `${zoomFactor * 100}%`,
            backgroundPosition: `-${(lensPosition.x - lensSize / 2) * zoomFactor}px -${(lensPosition.y - lensSize / 2) * zoomFactor}px`,
          }}
        />
      )}
    </div>
  )
}
```

---

## Part 5: Custom Business Components

### 5.1 Product Card

Create `components/ui/product-card.tsx`:

```typescript
"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Play, ShoppingCart, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlareCard } from "@/components/aceternity/glare-card"
import { cn, formatCurrency, calculateDiscount } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    brandName: string
    imageUrl: string
    videoUrl?: string
    regularPrice: number
    salePrice?: number
    rating: number
    reviewCount: number
    coinsToAward: number
    stockQuantity: number
    salesCount?: number
    isNew?: boolean
  }
  featured?: boolean
  showVideo?: boolean
  onQuickView?: (product: any) => void
  onAddToCart?: (product: any) => void
  onToggleWishlist?: (product: any) => void
  isWishlisted?: boolean
  className?: string
}

export function ProductCard({
  product,
  featured = false,
  showVideo = true,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className,
}: ProductCardProps) {
  const hasVideo = showVideo && product.videoUrl
  const discount = product.salePrice
    ? calculateDiscount(product.regularPrice, product.salePrice)
    : 0
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 5

  const CardWrapper = featured ? GlareCard : React.Fragment
  const wrapperProps = featured ? { className: "h-full" } : {}

  return (
    <CardWrapper {...wrapperProps}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.2 }}
        className={cn("h-full", className)}
      >
        <Card className="h-full overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-gradient-badge-new border-0 text-white">
                  New
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-gradient-badge-sale border-0 text-white">
                  Save {discount}%
                </Badge>
              )}
              {isLowStock && (
                <Badge className="bg-gradient-badge-low-stock border-0 text-white">
                  Only {product.stockQuantity} left
                </Badge>
              )}
              {product.salesCount && product.salesCount > 0 && (
                <Badge className="bg-gradient-badge-trending border-0 text-white">
                  🔥 {product.salesCount} sold today
                </Badge>
              )}
            </div>

            {/* Wishlist Heart */}
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={(e) => {
                e.preventDefault()
                onToggleWishlist?.(product)
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                )}
              />
            </motion.button>

            {/* Video Play Icon */}
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="p-4 rounded-full bg-white/90 shadow-lg">
                  <Play className="w-6 h-6 text-oud-gold" fill="currentColor" />
                </div>
              </div>
            )}

            {/* Quick View */}
            {onQuickView && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-end justify-center bg-black/20 p-4"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    onQuickView(product)
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Quick View
                </Button>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-4">
            {/* Brand */}
            <Link
              href={`/brands/${product.brandName.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs text-muted-foreground hover:text-oud-gold transition-colors"
            >
              {product.brandName}
            </Link>

            {/* Product Name */}
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-semibold text-sm mt-1 line-clamp-2 hover:text-oud-gold transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-sm",
                      i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-lg font-bold text-oud-gold">
                {formatCurrency(product.salePrice || product.regularPrice)}
              </span>
              {product.salePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.regularPrice)}
                </span>
              )}
            </div>

            {/* Coins */}
            <div className="mt-2 text-xs text-muted-foreground">
              Earn {product.coinsToAward} coins 🪙
            </div>

            {/* Add to Cart Button */}
            {onAddToCart && (
              <Button
                variant="primary"
                size="sm"
                className="w-full mt-4"
                onClick={(e) => {
                  e.preventDefault()
                  onAddToCart(product)
                }}
                disabled={product.stockQuantity === 0}
              >
                {product.stockQuantity === 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </CardWrapper>
  )
}
```

### 5.2 Review Card

Create `components/ui/review-card.tsx`:

```typescript
"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, formatRelativeTime } from "@/lib/utils"

interface ReviewCardProps {
  review: {
    id: string
    userName: string
    userAvatar?: string
    rating: number
    title?: string
    comment: string
    images?: string[]
    createdAt: Date | string
    isVerifiedPurchase: boolean
    helpfulCount: number
    notHelpfulCount: number
    vendorReply?: {
      text: string
      repliedAt: Date | string
    }
  }
  onVote?: (reviewId: string, voteType: 'helpful' | 'not_helpful') => void
  onReport?: (reviewId: string) => void
  className?: string
}

export function ReviewCard({ review, onVote, onReport, className }: ReviewCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const initials = review.userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={review.userAvatar} alt={review.userName} />
            <AvatarFallback className="bg-oud-gold/20 text-oud-gold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">{review.userName}</span>
              {review.isVerifiedPurchase && (
                <Badge variant="outline" className="text-xs">
                  ✓ Verified Purchase
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {formatRelativeTime(review.createdAt)}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-lg",
                    i < review.rating ? "text-amber-400" : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Report Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReport?.(review.id)}
          >
            <Flag className="w-4 h-4" />
          </Button>
        </div>

        {/* Title */}
        {review.title && (
          <h4 className="font-semibold mt-4">{review.title}</h4>
        )}

        {/* Comment */}
        <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
          {review.comment}
        </p>

        {/* Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mt-4">
            {review.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative w-20 h-20 rounded-lg overflow-hidden hover:ring-2 hover:ring-oud-gold transition-all"
              >
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Helpful Buttons */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote?.(review.id, 'helpful')}
            className="gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            Helpful ({review.helpfulCount})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote?.(review.id, 'not_helpful')}
            className="gap-2"
          >
            <ThumbsDown className="w-4 h-4" />
            ({review.notHelpfulCount})
          </Button>
        </div>

        {/* Vendor Reply */}
        {review.vendorReply && (
          <div className="mt-4 ml-12 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">Vendor Reply</Badge>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(review.vendorReply.repliedAt)}
              </span>
            </div>
            <p className="text-sm">{review.vendorReply.text}</p>
          </div>
        )}
      </CardContent>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Review image"
              width={1200}
              height={800}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Card>
  )
}
```

### 5.3 Stats Card

Create `components/ui/stats-card.tsx`:

```typescript
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: {
    value: number
    label: string
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  const isPositiveTrend = trend && trend.value > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <h3 className="text-3xl font-bold mt-2">{value}</h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">
                  {subtitle}
                </p>
              )}
              {trend && (
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isPositiveTrend ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {isPositiveTrend ? "↑" : "↓"} {Math.abs(trend.value)}%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {trend.label}
                  </span>
                </div>
              )}
            </div>
            {Icon && (
              <div className="p-3 rounded-lg bg-oud-gold/10">
                <Icon className="w-6 h-6 text-oud-gold" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

---

## Part 6: Framer Motion Patterns

Create `lib/animations.ts`:

```typescript
import { Variants } from "framer-motion"

/**
 * Page transitions
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const pageTransition = {
  duration: 0.3,
  ease: "easeInOut",
}

/**
 * Card hover effects
 */
export const cardHover = {
  y: -8,
  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
  transition: { duration: 0.2 },
}

/**
 * Button hover effects
 */
export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 6px 20px rgba(201,168,106,0.4)",
}

/**
 * Modal animations
 */
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Slide up animation
 */
export const slideUp: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
}

/**
 * Scale animation
 */
export const scale: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
}
```

---

## Part 7: Toast Notifications Setup

Create `components/providers/toast-provider.tsx`:

```typescript
"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1A1F2E',
          color: '#FEFEFE',
          borderRadius: '8px',
        },
        success: {
          iconTheme: {
            primary: '#C9A86A',
            secondary: '#FEFEFE',
          },
        },
      }}
    />
  )
}
```

---

## ✅ Phase 2 Complete

You should now have:
- ✅ Tailwind configured with luxury Oud theme
- ✅ shadcn/ui components installed (15-20 base components)
- ✅ Custom button variants (primary, whatsapp, etc.)
- ✅ Aceternity components (GlareCard, Spotlight, Lens)
- ✅ Custom business components (ProductCard, ReviewCard, StatsCard)
- ✅ Framer Motion animation patterns
- ✅ Toast notifications configured

---

## 🎯 Component Usage Examples

```tsx
// Import components
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ui/product-card'
import { ReviewCard } from '@/components/ui/review-card'
import { StatsCard } from '@/components/ui/stats-card'
import { GlareCard } from '@/components/aceternity/glare-card'

// Use them in your pages
<Button variant="primary">Add to Cart</Button>
<Button variant="whatsapp">Contact Us</Button>

<ProductCard product={product} featured />
<ReviewCard review={review} />
<StatsCard title="Total Sales" value="245,680 AED" />
```

---

## 🚀 Next Steps

Proceed to **03-CORE-FEATURES.md** to set up backend integration, types, and state management.

**Time investment:** 4-6 hours ✅
**Next phase:** 3-4 hours (03-CORE-FEATURES.md)
