"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/useCart"
import { formatCurrency } from "@/lib/utils"
import toast from "react-hot-toast"

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart, isLoading } = useCart()
  const [promoCode, setPromoCode] = useState("")

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start shopping and add some luxury fragrances to your cart!
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  const productImage = (item: any) => {
    return item.product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'
  }

  const productName = (item: any) => {
    return item.product?.nameEn || item.product?.name || 'Product'
  }

  const productSlug = (item: any) => {
    return item.product?.slug || '#'
  }

  const productPrice = (item: any) => {
    return item.variant?.price || item.product?.salePrice || item.product?.regularPrice || 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">{cart.summary?.itemCount || 0} items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link
                        href={`/products/${productSlug(item)}`}
                        className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group"
                      >
                        <Image
                          src={productImage(item)}
                          alt={productName(item)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${productSlug(item)}`}
                          className="font-semibold hover:text-oud-gold transition-colors line-clamp-2"
                        >
                          {productName(item)}
                        </Link>

                        {item.variant && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Size: {item.variant.name}
                          </p>
                        )}

                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-lg font-bold text-oud-gold">
                            {formatCurrency(productPrice(item))}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            × {item.quantity}
                          </span>
                        </div>

                        {/* Stock Warning */}
                        {item.product?.stockQuantity < 5 && (
                          <p className="text-xs text-orange-600 mt-1">
                            Only {item.product.stockQuantity} left in stock
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-3">
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeFromCart(item.id)
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        {/* Quantity Selector */}
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateCartItem({
                              itemId: item.id,
                              quantity: item.quantity - 1
                            })}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="px-3 font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateCartItem({
                              itemId: item.id,
                              quantity: item.quantity + 1
                            })}
                            disabled={item.quantity >= (item.product?.stockQuantity || 0)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Item Total */}
                        <p className="text-sm font-bold">
                          {formatCurrency(productPrice(item) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Continue Shopping */}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">
                    {formatCurrency(cart.summary?.subtotal || 0)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-semibold">
                    {(cart.summary?.shipping || 0) === 0 ? (
                      <span className="text-green-600">FREE ✓</span>
                    ) : (
                      formatCurrency(cart.summary?.shipping || 0)
                    )}
                  </span>
                </div>

                {(cart.summary?.subtotal || 0) < 300 && (
                  <p className="text-xs text-muted-foreground">
                    Add {formatCurrency(300 - (cart.summary?.subtotal || 0))} more for free shipping
                  </p>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%):</span>
                  <span className="font-semibold">
                    {formatCurrency(cart.summary?.tax || 0)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-oud-gold">
                  {formatCurrency(cart.summary?.total || 0)}
                </span>
              </div>

              {/* Coins Earning */}
              <div className="bg-gradient-to-r from-oud-gold/10 to-amber/10 p-3 rounded-lg">
                <p className="text-sm font-semibold text-oud-gold flex items-center gap-2">
                  You'll earn {cart.summary?.coinsEarnable || 0} coins!
                  <span className="text-xs text-muted-foreground">
                    (≈ {formatCurrency((cart.summary?.coinsEarnable || 0) * 0.1)})
                  </span>
                </p>
              </div>

              {/* Promo Code */}
              <div>
                <label className="text-sm font-medium mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Separator />

              {/* Checkout Button */}
              <Button variant="primary" size="lg" className="w-full" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="text-green-600">🔒</span>
                <span>Secure Checkout</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
