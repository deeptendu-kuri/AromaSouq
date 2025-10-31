"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import { useProducts } from "@/hooks/useProducts"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [sortOption, setSortOption] = useState<string | undefined>()

  // Build filters object with proper backend format
  const filters = {
    category: categoryParam || undefined,
    minPrice: 0,
    maxPrice: 5000,
    // Map frontend sort options to backend format
    ...(sortOption === 'price_asc' && { sortBy: 'price', sortOrder: 'asc' }),
    ...(sortOption === 'price_desc' && { sortBy: 'price', sortOrder: 'desc' }),
    ...(sortOption === 'newest' && { sortBy: 'createdAt', sortOrder: 'desc' }),
  }

  const { data, isLoading } = useProducts(filters as any)

  // Get category display name
  const getCategoryName = (category: string | null) => {
    if (!category) return 'All Products'
    const categoryMap: Record<string, string> = {
      'perfumes': 'Perfumes',
      'oud': 'Oud',
      'attars': 'Attars',
      'bakhoor': 'Bakhoor'
    }
    return categoryMap[category] || 'All Products'
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 5000]}
          max={5000}
          step={50}
          onValueChange={([min, max]) => {
            // Note: Price range filter will be applied when we implement stateful filters
            console.log('Price range changed:', min, max)
          }}
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>0 AED</span>
          <span>5000 AED</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Perfumes</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Oud</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Attars</span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">4★ & up</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">3★ & up</span>
          </label>
        </div>
      </div>

      <Button variant="outline" className="w-full">Clear All Filters</Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        Home / Products {categoryParam && `/ ${getCategoryName(categoryParam)}`}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <FilterSidebar />
        </aside>

        {/* Products */}
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {getCategoryName(categoryParam)}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isLoading ? 'Loading...' : `${data?.pagination?.total || 0} products found`}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <FilterSidebar />
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {data && data.pagination && data.pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline">Previous</Button>
              {[...Array(data.pagination.totalPages)].map((_, i) => (
                <Button key={i} variant={i + 1 === data.pagination.page ? "primary" : "outline"}>
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline">Next</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
