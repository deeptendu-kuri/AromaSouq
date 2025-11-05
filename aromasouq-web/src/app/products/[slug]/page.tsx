"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Heart, Minus, Plus, Share2 } from "lucide-react"
import { Lens } from "@/components/aceternity/lens"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useProduct } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { ReviewStats } from "@/components/reviews/ReviewStats"
import { ReviewList } from "@/components/reviews/ReviewList"
import { useReviewStats } from "@/hooks/useReviews"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const { data: product, isLoading } = useProduct(params.slug as string)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { data: reviewStats } = useReviewStats(product?.id || '')

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg">Loading product...</p>
      </div>
    )
  }

  const discount = product.salePrice ? calculateDiscount(product.regularPrice, product.salePrice) : 0
  const currentPrice = product.salePrice || product.regularPrice

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        Home / {product.category?.nameEn || 'Products'} / {product.nameEn}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image with Lens Zoom */}
          <Lens lensSize={200} zoomFactor={2.5} className="mb-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images?.[selectedImage]?.url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'}
                alt={product.nameEn}
                fill
                className="object-cover"
              />
            </div>
          </Lens>

          {/* Thumbnails */}
          {product.images && product.images.length > 0 && (
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
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Brand */}
          <p className="text-sm text-muted-foreground mb-2">{product.brand?.nameEn || 'Premium Brand'}</p>

          {/* Title */}
          <h1 className="font-heading text-3xl lg:text-4xl mb-4">{product.nameEn}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating || 0) ? "text-amber-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0} reviews)
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
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">Save {discount}%</Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Earn {product.coinsToAward} coins</p>
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
              onClick={() => addToCart({ productId: product.id, variantId: selectedVariant || undefined, quantity })}
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
                  {product.scentProfile.topNotes && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Top Notes:</span>
                      <p className="mt-1">{product.scentProfile.topNotes.join(', ')}</p>
                    </div>
                  )}
                  {product.scentProfile.heartNotes && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Heart Notes:</span>
                      <p className="mt-1">{product.scentProfile.heartNotes.join(', ')}</p>
                    </div>
                  )}
                  {product.scentProfile.baseNotes && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Base Notes:</span>
                      <p className="mt-1">{product.scentProfile.baseNotes.join(', ')}</p>
                    </div>
                  )}
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
            {/* Write Review Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <Link href={`/products/${params.slug}/write-review`}>
                <Button variant="primary">Write a Review</Button>
              </Link>
            </div>

            {/* Review Stats */}
            {reviewStats && <ReviewStats stats={reviewStats} />}

            {/* Review List */}
            <ReviewList productId={product.id} />
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
    </div>
  )
}
