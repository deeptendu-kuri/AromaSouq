"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Search, ShoppingCart, Heart, User, Menu, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { cn } from "@/lib/utils"
// import { SearchBar } from "@/components/SearchBar"
// import { CoinsWidget } from "@/components/layout/CoinsWidget"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const { cart, itemCount } = useCart()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('categorySlug')

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar - Promotional */}
      <div className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        <div className="container mx-auto px-4 py-2.5 flex justify-between items-center text-xs md:text-sm">
          <p className="font-semibold">✨ Free shipping on orders over 300 AED</p>
          <div className="hidden md:flex gap-4 font-medium">
            <Link href="/about" className="hover:text-[var(--color-oud-gold)] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[var(--color-oud-gold)] transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-8">
          {/* Logo - Left */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-amber-50">
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/products"
                    className={cn(
                      "text-base font-semibold py-2 px-4 rounded-lg transition-colors",
                      pathname === '/products' && !categorySlug
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-[var(--color-oud-gold)]"
                        : "hover:bg-gray-50"
                    )}
                  >
                    All Products
                  </Link>
                  <Link
                    href="/products?categorySlug=perfumes"
                    className={cn(
                      "text-base font-semibold py-2 px-4 rounded-lg transition-colors",
                      categorySlug === 'perfumes'
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-[var(--color-oud-gold)]"
                        : "hover:bg-gray-50"
                    )}
                  >
                    Perfumes
                  </Link>
                  <Link
                    href="/products?categorySlug=oud"
                    className={cn(
                      "text-base font-semibold py-2 px-4 rounded-lg transition-colors",
                      categorySlug === 'oud'
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-[var(--color-oud-gold)]"
                        : "hover:bg-gray-50"
                    )}
                  >
                    Oud
                  </Link>
                  <Link
                    href="/products?categorySlug=attars"
                    className={cn(
                      "text-base font-semibold py-2 px-4 rounded-lg transition-colors",
                      categorySlug === 'attars'
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-[var(--color-oud-gold)]"
                        : "hover:bg-gray-50"
                    )}
                  >
                    Attars
                  </Link>
                  <Link
                    href="/products?categorySlug=bakhoor"
                    className={cn(
                      "text-base font-semibold py-2 px-4 rounded-lg transition-colors",
                      categorySlug === 'bakhoor'
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-[var(--color-oud-gold)]"
                        : "hover:bg-gray-50"
                    )}
                  >
                    Bakhoor
                  </Link>
                  <Link
                    href="/products?categorySlug=gift-sets"
                    className={cn(
                      "text-base font-semibold py-2 px-4 rounded-lg transition-colors",
                      categorySlug === 'gift-sets'
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 text-[var(--color-oud-gold)]"
                        : "hover:bg-gray-50"
                    )}
                  >
                    Gift Sets
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2">
              <h1 className="font-heading text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-oud-gold)] to-amber-600">
                AromaSouq
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1">
            <Link
              href="/products"
              className={cn(
                "px-4 py-2 text-sm font-bold transition-all rounded-lg",
                pathname === '/products' && !categorySlug
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-50 hover:text-[var(--color-oud-gold)]"
              )}
            >
              All Products
            </Link>
            <Link
              href="/products?categorySlug=perfumes"
              className={cn(
                "px-4 py-2 text-sm font-bold transition-all rounded-lg",
                categorySlug === 'perfumes'
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-50 hover:text-[var(--color-oud-gold)]"
              )}
            >
              Perfumes
            </Link>
            <Link
              href="/products?categorySlug=oud"
              className={cn(
                "px-4 py-2 text-sm font-bold transition-all rounded-lg",
                categorySlug === 'oud'
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-50 hover:text-[var(--color-oud-gold)]"
              )}
            >
              Oud
            </Link>
            <Link
              href="/products?categorySlug=attars"
              className={cn(
                "px-4 py-2 text-sm font-bold transition-all rounded-lg",
                categorySlug === 'attars'
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-50 hover:text-[var(--color-oud-gold)]"
              )}
            >
              Attars
            </Link>
            <Link
              href="/products?categorySlug=bakhoor"
              className={cn(
                "px-4 py-2 text-sm font-bold transition-all rounded-lg",
                categorySlug === 'bakhoor'
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-50 hover:text-[var(--color-oud-gold)]"
              )}
            >
              Bakhoor
            </Link>
            <Link
              href="/products?categorySlug=gift-sets"
              className={cn(
                "px-4 py-2 text-sm font-bold transition-all rounded-lg",
                categorySlug === 'gift-sets'
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-amber-50 hover:text-[var(--color-oud-gold)]"
              )}
            >
              Gift Sets
            </Link>
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-3">
            {/* Coins Widget */}
            {isAuthenticated && user?.coinsBalance !== undefined && (
              <Link
                href="/account/wallet"
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full hover:shadow-md transition-all border border-amber-200"
              >
                <Coins className="h-4 w-4 text-[var(--color-oud-gold)]" />
                <span className="font-black text-[var(--color-oud-gold)] text-sm">{user.coinsBalance}</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2.5 hover:bg-amber-50 rounded-full transition-colors"
            >
              <Heart className="h-5 w-5 text-gray-700 hover:text-red-500 transition-colors" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 hover:bg-amber-50 rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white border-2 border-white shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2.5 hover:bg-amber-50 rounded-full transition-colors">
                    <User className="h-5 w-5 text-gray-700" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 shadow-xl border-gray-200">
                  <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50">
                    <p className="text-sm font-bold text-gray-800">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-600 font-medium">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="font-semibold">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="font-semibold">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wallet" className="font-semibold">Wallet & Coins</Link>
                  </DropdownMenuItem>
                  {user?.role === 'VENDOR' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/vendor" className="font-semibold text-purple-600">Vendor Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === 'ADMIN' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="font-semibold text-blue-600">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="font-semibold text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-all text-sm hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
