"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
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

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const { cart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

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
                <Link href="/products" className="text-lg font-medium">Products</Link>
                <Link href="/products?category=perfumes" className="text-lg">Perfumes</Link>
                <Link href="/products?category=oud" className="text-lg">Oud</Link>
                <Link href="/products?category=attars" className="text-lg">Attars</Link>
                <Link href="/products?category=bakhoor" className="text-lg">Bakhoor</Link>
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
                pathname === '/products' && !currentCategory
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              All Products
            </Link>
            <Link
              href="/products?category=perfumes"
              className={cn(
                "text-sm font-medium transition-colors",
                currentCategory === 'perfumes'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Perfumes
            </Link>
            <Link
              href="/products?category=oud"
              className={cn(
                "text-sm font-medium transition-colors",
                currentCategory === 'oud'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Oud
            </Link>
            <Link
              href="/products?category=attars"
              className={cn(
                "text-sm font-medium transition-colors",
                currentCategory === 'attars'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Attars
            </Link>
            <Link
              href="/products?category=bakhoor"
              className={cn(
                "text-sm font-medium transition-colors",
                currentCategory === 'bakhoor'
                  ? "text-oud-gold border-b-2 border-oud-gold pb-1"
                  : "hover:text-oud-gold"
              )}
            >
              Bakhoor
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Input
              type="search"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
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
                {cart && cart.summary && cart.summary.itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-oud-gold">
                    {cart.summary.itemCount}
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
          <div className="relative">
            <Input
              type="search"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
