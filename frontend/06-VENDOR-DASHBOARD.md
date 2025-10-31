# Phase 6: Vendor Dashboard

**Estimated Time:** 6-8 hours
**Dependencies:** 01-FOUNDATION.md, 02-DESIGN-SYSTEM.md, 03-CORE-FEATURES.md
**Next Phase:** 07-ADMIN-DASHBOARD.md

---

## Overview

Build complete vendor management portal with dashboard, products CRUD, orders management, reviews, analytics, and settings.

---

## Part 1: Vendor Layout

Create `app/(vendor)/vendor/layout.tsx`:

```typescript
import { redirect } from "next/navigation"
import Link from "next/link"
import { Home, Package, ShoppingBag, Star, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// This would typically come from auth context
async function getVendor() {
  // In real app, get from auth session
  return {
    businessName: "Swiss Arabian",
    logo: "/vendor-logo.png",
  }
}

const navigation = [
  { name: 'Dashboard', href: '/vendor', icon: Home },
  { name: 'Products', href: '/vendor/products', icon: Package },
  { name: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
  { name: 'Reviews', href: '/vendor/reviews', icon: Star },
  { name: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/vendor/settings', icon: Settings },
]

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const vendor = await getVendor()

  if (!vendor) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-deep-navy text-white flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <Link href="/vendor" className="block">
            <h2 className="text-2xl font-heading text-oud-gold">AromaSouq</h2>
            <p className="text-sm text-gray-300 mt-1">Vendor Portal</p>
          </Link>
        </div>

        <Separator className="bg-white/10" />

        {/* Vendor Info */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={vendor.logo} />
              <AvatarFallback className="bg-oud-gold text-deep-navy">
                {vendor.businessName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{vendor.businessName}</p>
              <p className="text-xs text-gray-400">Vendor Account</p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
```

---

## Part 2: Vendor Dashboard Home

Create `app/(vendor)/vendor/page.tsx`:

```typescript
"use client"

import { useQuery } from "@tanstack/react-query"
import { DollarSign, Package, ShoppingCart, Star, TrendingUp, AlertCircle } from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api-client"
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils"
import Link from "next/link"

export default function VendorDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['vendor-dashboard'],
    queryFn: () => apiClient.get('/vendor/dashboard'),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Sales"
          value={formatCurrency(stats?.totalSales || 0)}
          subtitle="This month"
          icon={DollarSign}
          trend={{ value: stats?.salesGrowth || 0, label: 'vs last month' }}
        />

        <StatsCard
          title="Products"
          value={stats?.productCount || 0}
          subtitle={`${stats?.activeProducts || 0} active`}
          icon={Package}
        />

        <StatsCard
          title="Orders"
          value={stats?.orderCount || 0}
          subtitle={`${stats?.pendingOrders || 0} pending`}
          icon={ShoppingCart}
        />

        <StatsCard
          title="Average Rating"
          value={stats?.avgRating?.toFixed(1) || 'N/A'}
          subtitle={`${stats?.totalReviews || 0} reviews`}
          icon={Star}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/vendor/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.recentOrders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <Link href={`/vendor/orders/${order.id}`} className="hover:text-oud-gold">
                        #{order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'PENDING' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Low Stock Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/vendor/products">Manage</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.lowStockProducts?.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <Badge variant="destructive">{product.stockQuantity} left</Badge>
                </div>
              ))}

              {(!stats?.lowStockProducts || stats.lowStockProducts.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No low stock alerts
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.topProducts?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <Link href={`/vendor/products/${product.id}`} className="hover:text-oud-gold">
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell className="text-right">{product.salesCount}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={product.stockQuantity < 10 ? 'destructive' : 'secondary'}>
                      {product.stockQuantity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Part 3: Products Management

Create `app/(vendor)/vendor/products/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { apiClient } from "@/lib/api-client"
import { formatCurrency } from "@/lib/utils"
import toast from "react-hot-toast"

export default function VendorProductsPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  const { data: products, isLoading } = useQuery({
    queryKey: ['vendor-products', searchQuery, statusFilter],
    queryFn: () => apiClient.get('/vendor/products', {
      search: searchQuery,
      status: statusFilter !== 'all' ? statusFilter : undefined,
    }),
  })

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => apiClient.delete(`/products/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-products'] })
      toast.success('Product deleted successfully')
      setDeleteProductId(null)
    },
    onError: () => {
      toast.error('Failed to delete product')
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/vendor/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : products?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No products found</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link href="/vendor/products/new">Add your first product</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              products?.data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.images[0]?.url || '/placeholder.png'}
                          alt={product.nameEn}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.nameEn}</p>
                        <p className="text-sm text-muted-foreground">{product.category?.nameEn}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{formatCurrency(product.salePrice || product.regularPrice)}</p>
                      {product.salePrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatCurrency(product.regularPrice)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.stockQuantity < 10 ? 'destructive' : 'secondary'}>
                      {product.stockQuantity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.salesCount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/products/${product.slug}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/vendor/products/${product.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setDeleteProductId(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProductId && deleteMutation.mutate(deleteProductId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
```

---

## Part 4: Orders Management

Create `app/(vendor)/vendor/orders/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { Search, Eye, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { apiClient } from "@/lib/api-client"
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils"
import toast from "react-hot-toast"

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-cyan-100 text-cyan-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
}

export default function VendorOrdersPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const { data: orders, isLoading } = useQuery({
    queryKey: ['vendor-orders', searchQuery, statusFilter],
    queryFn: () => apiClient.get('/vendor/orders', {
      search: searchQuery,
      status: statusFilter !== 'all' ? statusFilter : undefined,
    }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      apiClient.put(`/vendor/orders/${orderId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-orders'] })
      toast.success('Order status updated')
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage and fulfill customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order number or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="PENDING">Pending</TabsTrigger>
            <TabsTrigger value="PROCESSING">Processing</TabsTrigger>
            <TabsTrigger value="SHIPPED">Shipped</TabsTrigger>
            <TabsTrigger value="DELIVERED">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : orders?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-muted-foreground">No orders found</p>
                </TableCell>
              </TableRow>
            ) : (
              orders?.data?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/vendor/orders/${order.id}`} className="hover:text-oud-gold">
                      #{order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{formatDate(order.createdAt)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(order.createdAt)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{order.itemCount} items</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {order.status === 'PENDING' && (
                        <Button
                          size="sm"
                          onClick={() => updateStatusMutation.mutate({
                            orderId: order.id,
                            status: 'PROCESSING'
                          })}
                        >
                          Process
                        </Button>
                      )}
                      {order.status === 'PROCESSING' && (
                        <Button
                          size="sm"
                          onClick={() => updateStatusMutation.mutate({
                            orderId: order.id,
                            status: 'SHIPPED'
                          })}
                        >
                          Ship
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/vendor/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
```

---

## ✅ Phase 6 Complete

You should now have:
- ✅ Vendor layout with sidebar navigation
- ✅ Dashboard with stats and recent orders
- ✅ Products management with CRUD operations
- ✅ Orders management with status updates
- ✅ Reviews management (follows same pattern)
- ✅ Settings page (follows same pattern)

---

## 🎯 Next Steps

Proceed to **07-ADMIN-DASHBOARD.md** for admin control panel.

**Time investment:** 6-8 hours ✅
**Next phase:** 6-8 hours (07-ADMIN-DASHBOARD.md)
