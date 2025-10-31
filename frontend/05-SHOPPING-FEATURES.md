# Phase 5: Shopping Features

**Estimated Time:** 6-8 hours
**Dependencies:** 01-FOUNDATION.md, 02-DESIGN-SYSTEM.md, 03-CORE-FEATURES.md, 04-PUBLIC-PAGES.md
**Next Phase:** 06-VENDOR-DASHBOARD.md

---

## Overview

Implement complete shopping flow: Cart, Multi-step Checkout, Wishlist, Orders, Account Dashboard, Reviews, and Wallet/Coins management.

---

## Part 1: Shopping Cart

Create `app/cart/page.tsx`:

```typescript
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

  if (!cart || cart.items.length === 0) {
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
          <p className="text-muted-foreground">{cart.summary.itemCount} items</p>
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
                        href={`/products/${item.product.slug}`}
                        className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold hover:text-oud-gold transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>

                        {item.variant && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Size: {item.variant.name}
                          </p>
                        )}

                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-lg font-bold text-oud-gold">
                            {formatCurrency(item.variant?.price || item.product.price)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            × {item.quantity}
                          </span>
                        </div>

                        {/* Stock Warning */}
                        {item.product.stockQuantity < 5 && (
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
                            toast.success("Removed from cart")
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
                            disabled={item.quantity >= item.product.stockQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Item Total */}
                        <p className="text-sm font-bold">
                          {formatCurrency((item.variant?.price || item.product.price) * item.quantity)}
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
                    {formatCurrency(cart.summary.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-semibold">
                    {cart.summary.shipping === 0 ? (
                      <span className="text-green-600">FREE ✓</span>
                    ) : (
                      formatCurrency(cart.summary.shipping)
                    )}
                  </span>
                </div>

                {cart.summary.subtotal < 300 && (
                  <p className="text-xs text-muted-foreground">
                    Add {formatCurrency(300 - cart.summary.subtotal)} more for free shipping
                  </p>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%):</span>
                  <span className="font-semibold">
                    {formatCurrency(cart.summary.tax)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-oud-gold">
                  {formatCurrency(cart.summary.total)}
                </span>
              </div>

              {/* Coins Earning */}
              <div className="bg-gradient-to-r from-oud-gold/10 to-amber/10 p-3 rounded-lg">
                <p className="text-sm font-semibold text-oud-gold flex items-center gap-2">
                  🪙 You'll earn {cart.summary.coinsEarnable} coins!
                  <span className="text-xs text-muted-foreground">
                    (≈ {formatCurrency(cart.summary.coinsEarnable * 0.1)})
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
```

---

## Part 2: Multi-Step Checkout

Create `app/checkout/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCart } from "@/hooks/useCart"
import { useWallet } from "@/hooks/useWallet"
import { addressSchema, type AddressInput } from "@/lib/validations"
import { formatCurrency, formatDate } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"
import toast from "react-hot-toast"

const steps = [
  { id: 1, name: "Address", key: "address" },
  { id: 2, name: "Delivery", key: "delivery" },
  { id: 3, name: "Payment", key: "payment" },
  { id: 4, name: "Review", key: "review" },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { data: wallet } = useWallet()

  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [coinsToUse, setCoinsToUse] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      emirate: "Dubai",
      country: "UAE",
      zipCode: "",
    },
  })

  // Calculate shipping cost based on delivery method
  const shippingCosts = {
    standard: cart?.summary.subtotal >= 300 ? 0 : 25,
    express: 25,
    sameDay: 50,
  }

  const shippingCost = shippingCosts[deliveryMethod]

  // Calculate max coins (50% of subtotal)
  const maxCoinsAllowed = Math.min(
    wallet?.balance || 0,
    Math.floor(((cart?.summary.subtotal || 0) * 0.5) / 0.1)
  )

  const coinsDiscount = coinsToUse * 0.1
  const subtotal = cart?.summary.subtotal || 0
  const taxAmount = (subtotal - coinsDiscount + shippingCost) * 0.05
  const finalTotal = subtotal - coinsDiscount + shippingCost + taxAmount

  const onSubmit = async (data: AddressInput) => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      return
    }

    // Final submission
    setIsSubmitting(true)
    try {
      const order = await apiClient.post('/checkout/create-order', {
        shippingAddress: data,
        deliveryMethod,
        paymentMethod,
        coinsUsed: coinsToUse,
      })

      toast.success('Order placed successfully!')
      clearCart()
      router.push(`/order-success?orderId=${order.id}`)
    } catch (error) {
      toast.error('Failed to place order')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep > step.id
                      ? "bg-green-600 text-white"
                      : currentStep === step.id
                      ? "bg-oud-gold text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className="text-xs mt-2 font-medium">{step.name}</span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${
                    currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="+971 50 123 4567" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1 *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="addressLine2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="emirate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emirate *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Dubai">Dubai</SelectItem>
                                  <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                                  <SelectItem value="Sharjah">Sharjah</SelectItem>
                                  <SelectItem value="Ajman">Ajman</SelectItem>
                                  <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                                  <SelectItem value="Fujairah">Fujairah</SelectItem>
                                  <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" variant="primary" className="w-full">
                        Continue to Delivery
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Delivery */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                        <div className="space-y-3">
                          <Label
                            htmlFor="standard"
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-oud-gold transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="standard" id="standard" />
                              <div>
                                <p className="font-semibold">Standard Delivery</p>
                                <p className="text-sm text-muted-foreground">3-5 business days</p>
                              </div>
                            </div>
                            <span className="font-semibold">
                              {subtotal >= 300 ? "FREE" : `${formatCurrency(25)}`}
                            </span>
                          </Label>

                          <Label
                            htmlFor="express"
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-oud-gold transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="express" id="express" />
                              <div>
                                <p className="font-semibold">Express Delivery</p>
                                <p className="text-sm text-muted-foreground">1-2 business days</p>
                              </div>
                            </div>
                            <span className="font-semibold">{formatCurrency(25)}</span>
                          </Label>

                          <Label
                            htmlFor="sameDay"
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-oud-gold transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="sameDay" id="sameDay" />
                              <div>
                                <p className="font-semibold">Same-Day Delivery</p>
                                <p className="text-sm text-muted-foreground">
                                  UAE only • Order before 12pm
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold">{formatCurrency(50)}</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setCurrentStep(1)}
                        >
                          Back
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                          Continue to Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Coins Redemption */}
                      {wallet && wallet.balance > 0 && (
                        <div>
                          <h3 className="font-semibold mb-2">Use Coins</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Available: <strong>{wallet.balance} coins</strong> (1 coin = 0.10 AED)
                            <br />
                            Max {maxCoinsAllowed} coins can be used (50% of subtotal)
                          </p>

                          <Slider
                            value={[coinsToUse]}
                            onValueChange={([value]) => setCoinsToUse(value)}
                            max={maxCoinsAllowed}
                            step={1}
                            className="mb-2"
                          />

                          <div className="flex justify-between text-sm">
                            <span>Using: {coinsToUse} coins</span>
                            <span className="font-semibold text-green-600">
                              - {formatCurrency(coinsDiscount)}
                            </span>
                          </div>

                          <Separator className="my-6" />
                        </div>
                      )}

                      {/* Payment Method */}
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="space-y-3">
                          <Label
                            htmlFor="card"
                            className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-oud-gold transition-colors"
                          >
                            <RadioGroupItem value="card" id="card" className="mt-1" />
                            <div className="flex-1">
                              <p className="font-semibold">Credit / Debit Card</p>
                              <p className="text-sm text-muted-foreground">
                                Visa, Mastercard, Amex accepted
                              </p>
                            </div>
                          </Label>

                          <Label
                            htmlFor="cod"
                            className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-oud-gold transition-colors"
                          >
                            <RadioGroupItem value="cod" id="cod" className="mt-1" />
                            <div className="flex-1">
                              <p className="font-semibold">Cash on Delivery</p>
                              <p className="text-sm text-muted-foreground">Pay when you receive</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setCurrentStep(2)}
                        >
                          Back
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                          Review Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Shipping Address</h3>
                        <p className="text-sm text-muted-foreground">
                          {form.getValues("fullName")}<br />
                          {form.getValues("addressLine1")}<br />
                          {form.getValues("city")}, {form.getValues("emirate")}<br />
                          {form.getValues("phone")}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold mb-2">Delivery Method</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {deliveryMethod.replace(/([A-Z])/g, ' $1').trim()} - {formatCurrency(shippingCost)}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setCurrentStep(3)}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          className="flex-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Place Order"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </form>
          </Form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cart?.summary.itemCount} items):</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>

                {coinsToUse > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coins ({coinsToUse} coins):</span>
                    <span className="font-semibold">- {formatCurrency(coinsDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Tax (5%):</span>
                  <span className="font-semibold">{formatCurrency(taxAmount)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-baseline">
                <span className="font-bold">Total:</span>
                <span className="text-2xl font-bold text-oud-gold">
                  {formatCurrency(finalTotal)}
                </span>
              </div>

              <div className="bg-sage-green/10 p-3 rounded-lg text-sm">
                <p className="font-semibold text-sage-green">
                  🪙 You'll earn {cart?.summary.coinsEarnable} coins!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

---

## Part 3: Wishlist Page

Create `app/wishlist/page.tsx`:

```typescript
"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
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
```

---

## ✅ Phase 5 Complete

You should now have:
- ✅ Shopping cart with quantity management
- ✅ Multi-step checkout (address, delivery, payment, review)
- ✅ Coins redemption system (max 50% of subtotal)
- ✅ Wishlist management
- ✅ All with Framer Motion animations

**Note:** Orders, Account Dashboard, Reviews, and Wallet pages follow similar patterns using components from 02-DESIGN-SYSTEM and hooks from 03-CORE-FEATURES.

---

## 🎯 Next Steps

Proceed to **06-VENDOR-DASHBOARD.md** for vendor management portal.

**Time investment:** 6-8 hours ✅
**Next phase:** 6-8 hours (06-VENDOR-DASHBOARD.md)
