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
import { Product } from "@/types"

interface ProductCardProps {
  product: Product
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
  const hasVideo = showVideo && product.videos && product.videos.length > 0
  const discount = product.salePrice
    ? calculateDiscount(product.regularPrice, product.salePrice)
    : 0
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 5
  const productImage = product.images && product.images.length > 0 ? product.images[0].url : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'
  const brandName = product.brand?.nameEn || 'Premium Brand'
  const productName = product.nameEn

  const CardWrapper = featured ? GlareCard : React.Fragment
  const wrapperProps = featured ? { className: "h-full" } : {}

  return (
    <CardWrapper {...wrapperProps}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.2 }}
        className={cn("h-full", className)}
      >
        <Card className="h-full overflow-hidden hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={productImage}
                alt={productName}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                <Badge className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] border-0 text-white">
                  New
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-gradient-to-br from-[#EF5350] to-[#E57373] border-0 text-white">
                  Save {discount}%
                </Badge>
              )}
              {isLowStock && (
                <Badge className="bg-gradient-to-br from-[#8B3A3A] to-[#A94442] border-0 text-white">
                  Only {product.stockQuantity} left
                </Badge>
              )}
              {product.salesCount && product.salesCount > 0 && (
                <Badge className="bg-gradient-to-br from-[#FFA726] to-[#FFB74D] border-0 text-white">
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
                  <Play className="w-6 h-6 text-[#C9A86A]" fill="currentColor" />
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
              href={`/brands/${brandName.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs text-muted-foreground hover:text-[#C9A86A] transition-colors"
            >
              {brandName}
            </Link>

            {/* Product Name */}
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-semibold text-sm mt-1 line-clamp-2 hover:text-[#C9A86A] transition-colors">
                {productName}
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
                      i < Math.floor(product.rating || 0) ? "text-amber-400" : "text-gray-300"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0})
              </span>
            </div>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#C9A86A]">
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
