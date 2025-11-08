"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react"
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { cn } from "@/lib/utils"
// import { SearchBar } from "@/components/SearchBar"
// import { CoinsWidget } from "@/components/layout/CoinsWidget"

export function Header() {
  // TEMPORARILY DISABLED - Testing reload issue
  // const { user, isAuthenticated, logout } = useAuth()
  // const { cart, itemCount } = useCart()
  const user = null
  const isAuthenticated = false
  const logout = () => {}
  const itemCount = 0

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('categorySlug')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-deep-navy text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <p>Free shipping on orders over 300 AED</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-oud-gold transition-colors">About</Link>
            <Link href="/contact" className="hover:text-oud-gold transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/products"
                  className={cn(
                    "text-lg font-medium",
                    pathname === '/products' && !categorySlug ? "text-oud-gold" : ""
                  )}
                >
                  Products
                </Link>
                <Link
                  href="/products?categorySlug=perfumes"
                  className={cn(
                    "text-lg",
                    categorySlug === 'perfumes' ? "text-oud-gold font-semibold" : ""
                  )}
                >
                  Perfumes
                </Link>
                <Link
                  href="/products?categorySlug=oud"
                  className={cn(
                    "text-lg",
                    categorySlug === 'oud' ? "text-oud-gold font-semibold" : ""
                  )}
                >
                  Oud
                </Link>
                <Link
                  href="/products?categorySlug=attars"
                  className={cn(
                    "text-lg",
                    categorySlug === 'attars' ? "text-oud-gold font-semibold" : ""
                  )}
                >
                  Attars
                </Link>
                <Link
                  href="/products?categorySlug=bakhoor"
                  className={cn(
                    "text-lg",
                    categorySlug === 'bakhoor' ? "text-oud-gold font-semibold" : ""
                  )}
                >
                  Bakhoor
                </Link>
                <Link
                  href="/products?categorySlug=gift-sets"
                  className={cn(
                    "text-lg",
                    categorySlug === 'gift-sets' ? "text-oud-gold font-semibold" : ""
                  )}
                >
                  Gift Sets
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-heading text-2xl lg:text-3xl text-oud-gold">AromaSouq</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === '/products' && !categorySlug
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              All Products
            </Link>
            <Link
              href="/products?categorySlug=perfumes"
              className={cn(
                "text-sm font-medium transition-colors",
                categorySlug === 'perfumes'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Perfumes
            </Link>
            <Link
              href="/products?categorySlug=oud"
              className={cn(
                "text-sm font-medium transition-colors",
                categorySlug === 'oud'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Oud
            </Link>
            <Link
              href="/products?categorySlug=attars"
              className={cn(
                "text-sm font-medium transition-colors",
                categorySlug === 'attars'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Attars
            </Link>
            <Link
              href="/products?categorySlug=bakhoor"
              className={cn(
                "text-sm font-medium transition-colors",
                categorySlug === 'bakhoor'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Bakhoor
            </Link>
            <Link
              href="/products?categorySlug=gift-sets"
              className={cn(
                "text-sm font-medium transition-colors",
                categorySlug === 'gift-sets'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Gift Sets
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md">
            {/* <SearchBar /> */}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Coins Widget */}
            {/* <CoinsWidget /> */}

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-oud-gold">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wallet">Wallet & Coins</Link>
                  </DropdownMenuItem>
                  {user?.role === 'VENDOR' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/vendor">Vendor Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === 'ADMIN' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="primary" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          {/* <SearchBar /> */}
        </div>
      </div>
    </header>
  )
}
