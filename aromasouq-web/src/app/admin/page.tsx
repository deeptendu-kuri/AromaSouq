'use client'

import { ArrowUpRight, DollarSign, Users, Store, Package, ShoppingCart, Star } from 'lucide-react'
import { StatsCard } from '@/components/ui/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAdminStats } from '@/hooks/admin/use-admin-stats'
import { useVendorApprovals } from '@/hooks/admin/use-vendor-approvals'
import { VendorStatus } from '@/lib/constants'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats()
  const { vendors: pendingVendors } = useVendorApprovals({ status: VendorStatus.PENDING, limit: 5 })

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-deep-navy">Dashboard</h1>
        <p className="text-gray-600 mt-1">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats?.revenue.total || 0)}
          subtitle="This month"
          icon={DollarSign}
          trend={{
            value: stats?.revenue.growth || 0,
            label: 'vs last month',
          }}
        />

        <StatsCard
          title="Customers"
          value={(stats?.customers.total || 0).toLocaleString()}
          subtitle={`${stats?.customers.new || 0} new this month`}
          icon={Users}
        />

        <StatsCard
          title="Active Vendors"
          value={(stats?.vendors.approved || 0).toLocaleString()}
          subtitle={
            stats?.vendors.pending
              ? `${stats.vendors.pending} pending approval`
              : 'No pending approvals'
          }
          icon={Store}
        />

        <StatsCard
          title="Total Products"
          value={(stats?.products.total || 0).toLocaleString()}
          subtitle={
            stats?.products.pendingModeration
              ? `${stats.products.pendingModeration} need moderation`
              : 'All moderated'
          }
          icon={Package}
        />

        <StatsCard
          title="Orders"
          value={(stats?.orders.total || 0).toLocaleString()}
          subtitle={`${stats?.orders.processing || 0} processing`}
          icon={ShoppingCart}
        />

        <StatsCard
          title="Platform Rating"
          value={stats?.reviews.averageRating?.toFixed(1) || '0.0'}
          subtitle={`${stats?.reviews.flagged || 0} reviews flagged`}
          icon={Star}
        />
      </div>

      {/* Pending Vendor Approvals */}
      {pendingVendors.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Vendor Approvals</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/vendors?status=PENDING">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{vendor.businessName || `${vendor.user?.firstName} ${vendor.user?.lastName}`}</p>
                    <p className="text-sm text-muted-foreground">{vendor.user?.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied {formatDate(vendor.createdAt)}
                    </p>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/admin/vendors/${vendor.id}/review`}>
                      Review Application
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <Link href="/admin/users">
                <Users className="h-6 w-6 mb-2 text-oud-gold" />
                <span className="font-medium">Manage Users</span>
                <span className="text-xs text-muted-foreground mt-1">
                  View and manage all users
                </span>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <Link href="/admin/vendors">
                <Store className="h-6 w-6 mb-2 text-oud-gold" />
                <span className="font-medium">Review Vendors</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Approve vendor applications
                </span>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <Link href="/admin/products">
                <Package className="h-6 w-6 mb-2 text-oud-gold" />
                <span className="font-medium">Moderate Products</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Review flagged products
                </span>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <Link href="/admin/reviews">
                <Star className="h-6 w-6 mb-2 text-oud-gold" />
                <span className="font-medium">Moderate Reviews</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Review flagged reviews
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Commission Earned */}
      <Card className="bg-gradient-to-br from-oud-gold/10 to-amber/10 border-oud-gold/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Commission Earned</p>
              <p className="text-3xl font-bold text-oud-gold mt-2">
                {formatCurrency(stats?.commissionEarned || 0)}
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-oud-gold opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
