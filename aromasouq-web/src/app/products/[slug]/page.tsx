"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Heart, Minus, Plus, Share2, Package, Truck, CheckCircle, RotateCcw, Lock } from "lucide-react"
import { Lens } from "@/components/aceternity/lens"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ProductImagePlaceholder } from "@/components/ui/product-image-placeholder"
import { ProductCard } from "@/components/ui/product-card"
import { useProduct } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { getProductImageUrl, hasProductImages } from "@/lib/image-utils"
import { ReviewStats } from "@/components/reviews/ReviewStats"
import { ReviewList } from "@/components/reviews/ReviewList"
import { useReviewStats } from "@/hooks/useReviews"
import { apiClient } from "@/lib/api-client"
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
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  // Fetch best sellers for "You may also like" section
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await apiClient.get('/products/featured')
        setRelatedProducts(response.slice(0, 6)) // Get 6 best sellers
      } catch (error) {
        console.error('Failed to fetch related products:', error)
      }
    }
    fetchBestSellers()
  }, [])

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg">Loading product...</p>
      </div>
    )
  }

  const discount = product.salePrice ? calculateDiscount(product.regularPrice, product.salePrice) : 0
  const currentPrice = product.salePrice || product.regularPrice
  const savings = product.salePrice ? product.regularPrice - product.salePrice : 0
  const currentImageUrl = getProductImageUrl(product, selectedImage)
  const productHasImages = hasProductImages(product)

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-[5%] py-5">
        <div className="text-sm text-gray-600">
          <Link href="/" className="text-oud-gold hover:underline">Home</Link>
          <span className="mx-2">/</span>
          {product.category?.nameEn && (
            <>
              <Link href={`/products?categorySlug=${product.category.slug}`} className="text-oud-gold hover:underline">
                {product.category.nameEn}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span>{product.nameEn}</span>
        </div>
      </div>

      {/* Product Main Section */}
      <div className="container mx-auto px-[5%] mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery - Sticky */}
          <div className="lg:sticky lg:top-[140px] lg:self-start">
            {/* Main Image with Lens Zoom */}
            {productHasImages ? (
              <Lens lensSize={200} zoomFactor={2.5} className="mb-4">
                <div className="relative w-full h-[550px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {currentImageUrl ? (
                    <Image
                      src={currentImageUrl}
                      alt={product.nameEn}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ProductImagePlaceholder className="w-full h-full" />
                  )}
                  {product.salePrice && (
                    <div className="absolute top-5 left-5 bg-burgundy text-white px-4 py-2 rounded-full text-sm font-semibold">
                      -{discount}% OFF
                    </div>
                  )}
                </div>
              </Lens>
            ) : (
              <div className="relative w-full h-[550px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4">
                <ProductImagePlaceholder className="w-full h-full" />
                {product.salePrice && (
                  <div className="absolute top-5 left-5 bg-burgundy text-white px-4 py-2 rounded-full text-sm font-semibold">
                    -{discount}% OFF
                  </div>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {productHasImages && (
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((image, index) => {
                  const thumbUrl = getProductImageUrl(product, index)
                  return (
                    <button
                      key={image.id || index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 w-[100px] h-[100px] rounded-lg overflow-hidden transition-all ${
                        selectedImage === index
                          ? 'ring-2 ring-oud-gold'
                          : 'ring-2 ring-transparent hover:ring-oud-gold'
                      }`}
                    >
                      {thumbUrl ? (
                        <Image src={thumbUrl} alt={`Product ${index + 1}`} fill className="object-cover" />
                      ) : (
                        <ProductImagePlaceholder className="w-full h-full" size="sm" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="py-3">
            {/* Brand */}
            <p className="text-oud-gold text-xs font-semibold uppercase tracking-wider mb-2">
              {product.brand?.nameEn || 'Premium Brand'}
            </p>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-charcoal mb-2 leading-tight">
              {product.nameEn}
            </h1>

            {/* SKU */}
            {product.sku && (
              <p className="text-xs text-gray-400 mb-4">SKU: {product.sku}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.floor(product.rating || 0) ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{(product.rating || 0).toFixed(1)}</span>
              </div>
              <a href="#reviews" className="text-sm text-oud-gold hover:underline">
                {product.reviewCount || 0} Reviews
              </a>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-charcoal">
                  {formatCurrency(currentPrice)}
                </span>
                {product.salePrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatCurrency(product.regularPrice)}
                    </span>
                    <Badge className="bg-burgundy text-white text-xs px-3 py-1">
                      -{discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="text-sm text-green-600 font-semibold">
                  You save {formatCurrency(savings)}
                </p>
              )}
            </div>

            {/* Description */}
            {product.descriptionEn && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-[15px] leading-relaxed text-gray-700">
                  {product.descriptionEn}
                </p>
              </div>
            )}

            {/* Size Display */}
            {product.size && (
              <div className="mb-6">
                <span className="text-sm font-semibold text-charcoal block mb-3">Size</span>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-oud-gold text-white rounded-lg font-medium">
                  <Package className="h-4 w-4" />
                  <span>{product.size}</span>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <span className="text-sm font-semibold text-charcoal block mb-3">Quantity</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-oud-gold hover:text-white hover:border-oud-gold transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 font-semibold w-16 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-oud-gold hover:text-white hover:border-oud-gold transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockQuantity} in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button
                className="flex-1 h-14 bg-gradient-to-r from-oud-gold to-amber-600 hover:shadow-lg hover:-translate-y-0.5 transition-all text-white font-semibold text-base"
                onClick={() => addToCart({ productId: product.id, variantId: selectedVariant || undefined, quantity })}
                disabled={product.stockQuantity === 0}
              >
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-14 border-2 border-oud-gold text-charcoal hover:bg-oud-gold hover:text-white font-semibold text-base transition-colors"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 border-2 border-gray-200 hover:border-burgundy hover:text-burgundy transition-colors"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 border-2 border-gray-200 hover:border-oud-gold hover:text-oud-gold transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-sm">
                <Truck className="h-5 w-5 text-oud-gold flex-shrink-0" />
                <span className="text-gray-700">Free delivery on orders over AED 200</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-sm">
                <CheckCircle className="h-5 w-5 text-oud-gold flex-shrink-0" />
                <span className="text-gray-700">100% Authentic Products</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-sm">
                <RotateCcw className="h-5 w-5 text-oud-gold flex-shrink-0" />
                <span className="text-gray-700">Easy 14-day returns</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-sm">
                <Lock className="h-5 w-5 text-oud-gold flex-shrink-0" />
                <span className="text-gray-700">Secure payment</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
              <strong className="text-charcoal">Delivery:</strong> Usually ships within 24 hours. Estimated delivery 2-3 business days in UAE.
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-[5%] mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent h-auto p-0 rounded-none">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-oud-gold data-[state=active]:text-oud-gold rounded-none px-8 py-4 font-semibold"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-oud-gold data-[state=active]:text-oud-gold rounded-none px-8 py-4 font-semibold"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="data-[state=active]:border-b-2 data-[state=active]:border-oud-gold data-[state=active]:text-oud-gold rounded-none px-8 py-4 font-semibold"
            >
              Fragrance Notes
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-oud-gold data-[state=active]:text-oud-gold rounded-none px-8 py-4 font-semibold"
            >
              Reviews ({product.reviewCount || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4 text-charcoal">Product Description</h3>
              <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
                {product.descriptionEn || "Experience the captivating essence of this luxurious fragrance."}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <h3 className="text-xl font-semibold mb-6 text-charcoal">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.brand && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Brand:</span>
                  <span className="text-gray-700 text-sm">{product.brand.nameEn}</span>
                </div>
              )}
              {product.sku && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">SKU:</span>
                  <span className="text-gray-700 text-sm">{product.sku}</span>
                </div>
              )}
              {product.gender && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Gender:</span>
                  <span className="text-gray-700 text-sm capitalize">{product.gender}</span>
                </div>
              )}
              {product.scentFamily && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Scent Family:</span>
                  <span className="text-gray-700 text-sm">{product.scentFamily}</span>
                </div>
              )}
              {product.longevity && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Longevity:</span>
                  <span className="text-gray-700 text-sm">{product.longevity}</span>
                </div>
              )}
              {product.sillage && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Sillage:</span>
                  <span className="text-gray-700 text-sm">{product.sillage}</span>
                </div>
              )}
              {product.season && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Best Season:</span>
                  <span className="text-gray-700 text-sm">{product.season}</span>
                </div>
              )}
              <div className="flex py-3 border-b border-gray-200">
                <span className="w-36 font-semibold text-charcoal text-sm">Stock Status:</span>
                <span className="text-gray-700 text-sm">
                  {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} units)` : 'Out of Stock'}
                </span>
              </div>
              {product.concentration && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Concentration:</span>
                  <span className="text-gray-700 text-sm">{product.concentration}</span>
                </div>
              )}
              {product.size && (
                <div className="flex py-3 border-b border-gray-200">
                  <span className="w-36 font-semibold text-charcoal text-sm">Size:</span>
                  <span className="text-gray-700 text-sm">{product.size}</span>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-8">
            <h3 className="text-xl font-semibold mb-6 text-charcoal">Fragrance Pyramid</h3>
            <div className="space-y-6">
              {product.topNotes && (
                <div>
                  <h4 className="text-sm font-semibold text-charcoal mb-3">Top Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.topNotes.split(',').map((note: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700">
                        {note.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.heartNotes && (
                <div>
                  <h4 className="text-sm font-semibold text-charcoal mb-3">Heart Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.heartNotes.split(',').map((note: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700">
                        {note.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.baseNotes && (
                <div>
                  <h4 className="text-sm font-semibold text-charcoal mb-3">Base Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.baseNotes.split(',').map((note: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700">
                        {note.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-charcoal">Customer Reviews</h3>
              <Link href={`/products/${params.slug}/write-review`}>
                <Button className="bg-gradient-to-r from-oud-gold to-amber-600 text-white">
                  Write a Review
                </Button>
              </Link>
            </div>

            {reviewStats && <ReviewStats stats={reviewStats} />}
            <ReviewList productId={product.id} />
          </TabsContent>
        </Tabs>
      </div>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-[5%] mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-charcoal mb-2">You May Also Like</h2>
            <p className="text-[15px] text-gray-600">Similar fragrances customers loved</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
