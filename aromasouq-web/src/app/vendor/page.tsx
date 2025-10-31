"use client"

import { useQuery } from "@tanstack/react-query"
import { DollarSign, Package, ShoppingCart, Star, AlertCircle } from "lucide-react"
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
    queryFn: () => apiClient.get<any>('/vendor/dashboard'),
  })

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
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
                {stats?.recentOrders?.map((order: any) => (
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

                {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No recent orders
                    </TableCell>
                  </TableRow>
                )}
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
              {stats?.lowStockProducts?.map((product: any) => (
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
              {stats?.topProducts?.map((product: any) => (
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

              {(!stats?.topProducts || stats.topProducts.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No sales data yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
