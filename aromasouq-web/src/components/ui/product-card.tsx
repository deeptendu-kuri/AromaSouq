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
  // Handle both API response formats
  const hasVideo = showVideo && product.videos && product.videos.length > 0
  const regularPrice = (product as any).regularPrice || (product as any).price || 0
  const salePrice = (product as any).salePrice
  const discount = salePrice ? calculateDiscount(regularPrice, salePrice) : 0
  const stockQuantity = (product as any).stockQuantity || (product as any).stock || 0
  const isLowStock = stockQuantity > 0 && stockQuantity < 5

  // Handle image - check if images is array of objects or array of strings
  let productImage = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'
  if (product.images && product.images.length > 0) {
    const firstImage = product.images[0]
    productImage = typeof firstImage === 'string' ? firstImage : firstImage.url
  }

  const brandName = product.brand?.name || (product as any).vendor?.businessName || 'Premium Brand'
  const productName = product.name || product.nameEn || 'Product'

  const CardWrapper = featured ? GlareCard : React.Fragment
  const wrapperProps = featured ? { className: "h-full" } : {}

  return (
    <CardWrapper {...wrapperProps}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className={cn("h-full", className)}
      >
        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100">
          {/* Image Container - Reduced aspect ratio */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#f8f8f8] via-[#f0f0f0] to-[#e8e8e8]">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={productImage}
                alt={productName}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </Link>

            {/* Badges - More compact */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.createdAt && new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                <Badge className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] border-0 text-white text-[9px] py-0.5 px-2 font-bold">
                  NEW
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-gradient-to-br from-[#EF5350] to-[#E57373] border-0 text-white text-[9px] py-0.5 px-2 font-bold">
                  -{discount}%
                </Badge>
              )}
              {isLowStock && (
                <Badge className="bg-gradient-to-br from-[#8B3A3A] to-[#A94442] border-0 text-white text-[9px] py-0.5 px-2 font-bold">
                  {stockQuantity} LEFT
                </Badge>
              )}
              {(product as any).salesCount && (product as any).salesCount > 0 && (
                <Badge className="bg-gradient-to-br from-[#FFA726] to-[#FFB74D] border-0 text-white text-[9px] py-0.5 px-2 font-bold">
                  🔥 {(product as any).salesCount}
                </Badge>
              )}
            </div>

            {/* Wishlist Heart - Smaller */}
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={(e) => {
                e.preventDefault()
                onToggleWishlist?.(product)
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110"
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                )}
              />
            </motion.button>

            {/* Video Play Icon */}
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="p-3 rounded-full bg-white/90 shadow-lg">
                  <Play className="w-5 h-5 text-[#C9A86A]" fill="currentColor" />
                </div>
              </div>
            )}

            {/* Quick View */}
            {onQuickView && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-end justify-center bg-black/20 p-3"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full text-xs py-1.5"
                  onClick={(e) => {
                    e.preventDefault()
                    onQuickView(product)
                  }}
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Quick View
                </Button>
              </motion.div>
            )}
          </div>

          {/* Content - More compact spacing */}
          <CardContent className="p-3">
            {/* Brand - Smaller */}
            <Link
              href={`/brands/${brandName.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[10px] text-[#C9A86A] hover:text-[#B8975A] transition-colors font-semibold uppercase tracking-wide"
            >
              {brandName}
            </Link>

            {/* Product Name - Single line */}
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-bold text-[13px] mt-1 truncate hover:text-[#C9A86A] transition-colors text-[#2D2D2D]">
                {productName}
              </h3>
            </Link>

            {/* Rating - More compact */}
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-[10px]",
                      i < Math.floor(product.rating || 0) ? "text-[#C9A86A]" : "text-gray-300"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-[9px] text-gray-400">
                ({product.reviewCount || 0})
              </span>
            </div>

            {/* Price - More compact */}
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#1A1F2E]">
                {formatCurrency(salePrice || regularPrice)}
              </span>
              {salePrice && (
                <span className="text-[11px] text-gray-400 line-through">
                  {formatCurrency(regularPrice)}
                </span>
              )}
            </div>

            {/* Coins - Smaller */}
            {(product as any).coinsToAward && (product as any).coinsToAward > 0 && (
              <div className="mt-1 text-[9px] text-gray-500">
                +{(product as any).coinsToAward} coins 🪙
              </div>
            )}

            {/* Add to Cart Button - More refined */}
            {onAddToCart && (
              <Button
                variant="primary"
                size="sm"
                className="w-full mt-3 bg-gradient-to-r from-[#1A1F2E] to-[#2D3748] hover:from-[#C9A86A] hover:to-[#B8975A] text-[11px] py-1.5 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  onAddToCart(product)
                }}
                disabled={stockQuantity === 0}
              >
                {stockQuantity === 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
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
