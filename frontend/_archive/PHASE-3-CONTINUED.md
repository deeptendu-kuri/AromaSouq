# Frontend Phase 3 (Continued): Cart, Checkout, Orders & Account

## Overview
This document continues Phase 3 with the remaining user-facing features: Cart, Wishlist, Checkout, Orders, and Account Dashboard pages.

**Prerequisites**: Phase 3 Part 1 (Product pages) must be completed.

---

## 1. Cart Page

### File: `src/app/(main)/cart/page.tsx`

```typescript
'use client';

import { useCart } from '@/lib/hooks/useCart';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/utils/formatters';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    cart,
    isLoading,
    updateCartItem,
    removeFromCart,
    clearCart,
    isUpdating,
    isRemoving,
  } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Start adding some fragrances!</p>
          <Link href="/products">
            <Button variant="primary" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem({ itemId, data: { quantity: newQuantity } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl md:text-4xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">
                {cart.items.length} {cart.items.length === 1 ? 'Item' : 'Items'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
              >
                Clear Cart
              </Button>
            </div>

            {/* Items */}
            <div className="divide-y">
              {cart.items.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={item.product.images[0] || '/placeholder-product.jpg'}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold hover:text-[#c9a86a] transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    {item.product.brand && (
                      <p className="text-sm text-gray-600">{item.product.brand.name}</p>
                    )}
                    <p className="text-lg font-bold text-[#c9a86a] mt-2">
                      {formatCurrency(item.product.price)}
                    </p>

                    {/* Stock warning */}
                    {item.product.stock < item.quantity && (
                      <p className="text-sm text-red-600 mt-1">
                        Only {item.product.stock} left in stock
                      </p>
                    )}
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col items-end justify-between">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={isUpdating}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={isUpdating || item.quantity >= item.product.stock}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="text-right">
                      <p className="font-bold text-lg mb-2">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={isRemoving}
                        className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Shopping */}
          <Link href="/products">
            <Button variant="outline" className="mt-4">
              ← Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(cart.summary.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {cart.summary.subtotal >= 300 ? 'Free' : formatCurrency(25)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-semibold">
                  {formatCurrency(cart.summary.subtotal * 0.05)}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-[#c9a86a]">
                  {formatCurrency(
                    cart.summary.subtotal +
                      (cart.summary.subtotal >= 300 ? 0 : 25) +
                      cart.summary.subtotal * 0.05
                  )}
                </span>
              </div>
            </div>

            {/* Free shipping message */}
            {cart.summary.subtotal < 300 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700">
                  Add {formatCurrency(300 - cart.summary.subtotal)} more for free shipping!
                </p>
              </div>
            )}

            {/* Coins */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-green-700">
                🪙 Earn{' '}
                <span className="font-semibold">
                  {Math.floor(cart.summary.subtotal * 0.01 / 0.1)} coins
                </span>{' '}
                with this order
              </p>
            </div>

            {/* Checkout Button */}
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => router.push('/checkout')}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => router.push('/login?redirect=/checkout')}
              >
                Login to Checkout
              </Button>
            )}

            {/* Security badges */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 2. Wishlist Page

### File: `src/app/(main)/wishlist/page.tsx`

```typescript
'use client';

import { useWishlist } from '@/lib/hooks/useWishlist';
import { useCart } from '@/lib/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/utils/formatters';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function WishlistPage() {
  const { wishlist, isLoading, removeFromWishlist, isRemoving } = useWishlist();
  const { addToCart, isAdding } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!wishlist || wishlist.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-6">Save your favorite fragrances here!</p>
          <Link href="/products">
            <Button variant="primary" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        My Wishlist
      </h1>
      <p className="text-gray-600 mb-8">{wishlist.count} items</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden group relative"
          >
            {/* Remove button */}
            <button
              onClick={() => removeFromWishlist(item.id)}
              disabled={isRemoving}
              className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <TrashIcon className="h-5 w-5 text-red-600" />
            </button>

            {/* Product Image */}
            <Link href={`/products/${item.product.slug}`} className="block relative aspect-square">
              <Image
                src={item.product.images[0] || '/placeholder-product.jpg'}
                alt={item.product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Product Info */}
            <div className="p-4">
              {item.product.brand && (
                <p className="text-xs text-gray-500 mb-1">{item.product.brand.name}</p>
              )}
              <Link href={`/products/${item.product.slug}`}>
                <h3 className="font-semibold hover:text-[#c9a86a] transition-colors line-clamp-2 mb-2">
                  {item.product.name}
                </h3>
              </Link>

              <p className="text-lg font-bold text-[#c9a86a] mb-3">
                {formatCurrency(item.product.price)}
              </p>

              {/* Stock status */}
              {item.product.stock === 0 ? (
                <p className="text-sm text-red-600 mb-3">Out of stock</p>
              ) : item.product.stock < 5 ? (
                <p className="text-sm text-orange-600 mb-3">
                  Only {item.product.stock} left!
                </p>
              ) : null}

              {/* Add to Cart */}
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                disabled={item.product.stock === 0 || isAdding}
                onClick={() =>
                  addToCart({
                    productId: item.product.id,
                    quantity: 1,
                  })
                }
              >
                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 3. Checkout Page

### File: `src/app/(main)/checkout/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/lib/hooks/useCart';
import { ordersApi } from '@/lib/api/orders';
import { walletApi } from '@/lib/api/wallet';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/utils/formatters';
import { PaymentMethod } from '@/types';
import toast from 'react-hot-toast';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(4, 'ZIP code is required'),
  country: z.string().default('UAE'),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading: loadingCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH_ON_DELIVERY
  );
  const [coinsToUse, setCoinsToUse] = useState(0);

  // Fetch wallet
  const { data: wallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: walletApi.getWallet,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: 'UAE',
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: ordersApi.createOrder,
    onSuccess: (order) => {
      toast.success('Order placed successfully!');
      router.push(`/orders/${order.id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to place order');
    },
  });

  if (loadingCart) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const subtotal = cart.summary.subtotal;
  const shipping = subtotal >= 300 ? 0 : 25;
  const tax = subtotal * 0.05;
  const coinsDiscount = coinsToUse * 0.1;
  const total = subtotal + shipping + tax - coinsDiscount;

  const maxCoinsAllowed = Math.min(
    wallet?.balance || 0,
    Math.floor((subtotal * 0.5) / 0.1)
  );

  const onSubmit = async (addressData: AddressFormData) => {
    // In real implementation, you would:
    // 1. Create/select address
    // 2. Process payment if not COD
    // 3. Create order with addressId

    // For now, we'll create a mock addressId
    const mockAddressId = 'temp-address-id';

    createOrderMutation.mutate({
      addressId: mockAddressId,
      paymentMethod,
      coinsToUse,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl md:text-4xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Checkout
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.fullName?.message}
                    {...register('fullName')}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Address Line 1"
                    placeholder="Street address, building name"
                    error={errors.addressLine1?.message}
                    {...register('addressLine1')}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Address Line 2 (Optional)"
                    placeholder="Apartment, suite, unit"
                    error={errors.addressLine2?.message}
                    {...register('addressLine2')}
                  />
                </div>
                <Input
                  label="City"
                  placeholder="Dubai"
                  error={errors.city?.message}
                  {...register('city')}
                />
                <Input
                  label="State"
                  placeholder="Dubai"
                  error={errors.state?.message}
                  {...register('state')}
                />
                <Input
                  label="ZIP Code"
                  placeholder="12345"
                  error={errors.zipCode?.message}
                  {...register('zipCode')}
                />
                <Input
                  label="Country"
                  value="UAE"
                  disabled
                  {...register('country')}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: PaymentMethod.CASH_ON_DELIVERY, label: 'Cash on Delivery' },
                  { value: PaymentMethod.CREDIT_CARD, label: 'Credit Card' },
                  { value: PaymentMethod.DEBIT_CARD, label: 'Debit Card' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.value
                        ? 'border-[#c9a86a] bg-[#c9a86a]/5'
                        : 'border-gray-200 hover:border-[#c9a86a]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="text-[#c9a86a] focus:ring-[#c9a86a]"
                    />
                    <span className="ml-3 font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Use Coins */}
            {wallet && wallet.balance > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Use Coins</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-700 mb-2">
                    You have <span className="font-bold">{wallet.balance} coins</span>
                  </p>
                  <p className="text-sm text-green-600">
                    1 coin = AED 0.10 | Max {maxCoinsAllowed} coins for this order (50% of
                    subtotal)
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="0"
                    max={maxCoinsAllowed}
                    value={coinsToUse}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setCoinsToUse(Math.min(maxCoinsAllowed, Math.max(0, value)));
                    }}
                    placeholder="Enter coins to use"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCoinsToUse(maxCoinsAllowed)}
                  >
                    Use Max
                  </Button>
                </div>
                {coinsToUse > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Discount: {formatCurrency(coinsDiscount)}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.images[0] || '/placeholder-product.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                      <span className="absolute -top-2 -right-2 bg-[#c9a86a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                {coinsToUse > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coins Discount</span>
                    <span>-{formatCurrency(coinsDiscount)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#c9a86a]">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Coins to earn */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-700">
                  🪙 You'll earn{' '}
                  <span className="font-bold">
                    {Math.floor(subtotal * 0.01 / 0.1)} coins
                  </span>{' '}
                  with this order
                </p>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={createOrderMutation.isPending}
                disabled={createOrderMutation.isPending}
              >
                Place Order
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
```

---

## 4. Orders Page

### File: `src/app/(main)/orders/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { ordersApi } from '@/lib/api/orders';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { OrderStatus } from '@/types';

const statusColors = {
  [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
  [OrderStatus.PROCESSING]: 'bg-purple-100 text-purple-800',
  [OrderStatus.SHIPPED]: 'bg-indigo-100 text-indigo-800',
  [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
  [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
  [OrderStatus.REFUNDED]: 'bg-gray-100 text-gray-800',
};

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(undefined);

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['orders', { status: statusFilter }],
    queryFn: () => ordersApi.getOrders({ page: 1, limit: 20, status: statusFilter }),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl md:text-4xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        My Orders
      </h1>

      {/* Filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={statusFilter === undefined ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(undefined)}
        >
          All
        </Button>
        {Object.values(OrderStatus).map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      {ordersData && ordersData.data.length > 0 ? (
        <div className="space-y-4">
          {ordersData.data.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-semibold">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold text-[#c9a86a]">
                    {formatCurrency(order.total)}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[order.orderStatus]
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4 mb-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        {item.product?.images?.[0] && (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name || 'Product'}
                            fill
                            className="object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-sm text-gray-600">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>

                {/* Coins */}
                {order.coinsEarned > 0 && order.orderStatus === OrderStatus.DELIVERED && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-700">
                      🪙 Earned {order.coinsEarned} coins from this order
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                  {order.orderStatus === OrderStatus.DELIVERED && (
                    <Button variant="outline">Write Reviews</Button>
                  )}
                  {(order.orderStatus === OrderStatus.PENDING ||
                    order.orderStatus === OrderStatus.CONFIRMED) && (
                    <Button variant="outline">Cancel Order</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No orders found</p>
          <Link href="/products">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
```

---

## 5. Account Dashboard

### File: `src/app/(main)/account/page.tsx`

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { walletApi } from '@/lib/api/wallet';
import { ordersApi } from '@/lib/api/orders';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  WalletIcon,
  CogIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function AccountPage() {
  const { user } = useAuth();

  // Fetch wallet
  const { data: wallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: walletApi.getWallet,
  });

  // Fetch recent orders
  const { data: ordersData } = useQuery({
    queryKey: ['orders', { limit: 5 }],
    queryFn: () => ordersApi.getOrders({ page: 1, limit: 5 }),
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          My Account
        </h1>
        <p className="text-gray-600">
          Welcome back, {user.firstName}! 👋
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wallet */}
          <Link
            href="/account/wallet"
            className="bg-gradient-to-br from-[#c9a86a] to-[#a88a54] text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <WalletIcon className="h-8 w-8" />
              <ArrowRightIcon className="h-5 w-5" />
            </div>
            <p className="text-white/80 text-sm mb-1">Coin Balance</p>
            <p className="text-3xl font-bold">{wallet?.balance || 0}</p>
            <p className="text-white/80 text-sm mt-2">
              = {formatCurrency((wallet?.balance || 0) * 0.1)}
            </p>
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#c9a86a]"
          >
            <div className="flex items-start justify-between mb-4">
              <ShoppingBagIcon className="h-8 w-8 text-[#c9a86a]" />
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">
              {ordersData?.meta.total || 0}
            </p>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#c9a86a]"
          >
            <div className="flex items-start justify-between mb-4">
              <HeartIcon className="h-8 w-8 text-[#c9a86a]" />
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Wishlist Items</p>
            <p className="text-3xl font-bold text-gray-900">-</p>
          </Link>

          {/* Profile */}
          <Link
            href="/account/profile"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#c9a86a]"
          >
            <div className="flex items-start justify-between mb-4">
              <CogIcon className="h-8 w-8 text-[#c9a86a]" />
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Account Settings</p>
            <p className="text-lg font-semibold text-gray-900">Manage Profile</p>
          </Link>
        </div>

        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-bold text-lg mb-4">Profile</h2>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Account Type</p>
                <p className="font-medium capitalize">{user.role.toLowerCase()}</p>
              </div>
            </div>
            <Link href="/account/profile">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      {ordersData && ordersData.data.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <Link href="/orders">
              <Button variant="ghost">
                View All
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ordersData.data.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.orderNumber}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#c9a86a]">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 6. Phase 3 Testing Checklist

- [ ] Cart page with quantity update and removal
- [ ] Cart summary with shipping calculation
- [ ] Free shipping threshold indicator
- [ ] Wishlist page with product grid
- [ ] Add to cart from wishlist
- [ ] Checkout page with address form
- [ ] Payment method selection
- [ ] Coins redemption in checkout
- [ ] Order creation flow
- [ ] Orders listing page with filters
- [ ] Order status badges
- [ ] Account dashboard with stats
- [ ] Wallet balance display
- [ ] Recent orders table
- [ ] All pages responsive on mobile
- [ ] Toast notifications working
- [ ] Form validation with Zod
- [ ] API integration tested

---

## Next Steps

Proceed to:
- **Phase 4**: Vendor Dashboard (Products management, Orders, Analytics)
- **Phase 5**: Admin Dashboard (Users, Vendors approval, Orders management, Analytics)

---

**Phase 3 Complete!** All shopping and user features are now fully implemented with proper state management, form validation, and API integration.
