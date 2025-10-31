"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"

export default function WishlistPage() {
  const { wishlist, isLoading, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Save your favorite fragrances to your wishlist!
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlist.length} items</p>
        </div>
        <Button variant="outline">Share Wishlist</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ProductCard
                product={product}
                isWishlisted={true}
                onToggleWishlist={() => toggleWishlist(product.id)}
                onAddToCart={() => addToCart({ productId: product.id, quantity: 1 })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
