# Phase 07: Admin Dashboard - Complete Implementation

**Dependencies**: Requires completion of phases 01-03 (Foundation, Design System, Core Features)

This phase implements the complete admin control panel for platform management, including user management, vendor approvals, product/review moderation, and platform analytics.

---

## 📁 File Structure

```
app/
├── (admin)/
│   ├── admin/
│   │   ├── layout.tsx              # Admin layout with sidebar
│   │   ├── page.tsx                # Admin dashboard home
│   │   ├── users/
│   │   │   └── page.tsx            # User management
│   │   ├── vendors/
│   │   │   ├── page.tsx            # Vendor approvals
│   │   │   └── [id]/
│   │   │       └── review/
│   │   │           └── page.tsx    # Review vendor application
│   │   ├── products/
│   │   │   └── page.tsx            # Product moderation
│   │   ├── reviews/
│   │   │   └── page.tsx            # Review moderation
│   │   ├── orders/
│   │   │   └── page.tsx            # Platform orders overview
│   │   └── settings/
│   │       └── page.tsx            # Platform settings
hooks/
└── admin/
    ├── use-admin-stats.ts          # Platform analytics hook
    ├── use-users.ts                # User management hook
    └── use-vendor-approvals.ts     # Vendor approval hook
```

---

## 🎨 Components Used

**From 02-DESIGN-SYSTEM.md:**
- `StatsCard` - Platform metrics display
- `Card`, `CardHeader`, `CardTitle`, `CardContent` - Content containers
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` - Data tables
- `Button` (all variants) - Actions
- `Badge` - Status indicators
- `Select` - Filters and dropdowns
- `Input` - Search fields
- `Dialog`, `AlertDialog` - Modals and confirmations
- `Tabs` - Navigation between states
- `Textarea` - Approval/rejection reasons

**From 03-CORE-FEATURES.md:**
- `apiClient` - API calls
- `useQuery`, `useMutation` - Data fetching
- `useToast` - Notifications

---

## 🔧 Admin-Specific Hooks

### hooks/admin/use-admin-stats.ts

```typescript
'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

interface AdminStats {
  revenue: {
    total: number
    thisMonth: number
    growth: number
  }
  customers: {
    total: number
    active: number
    new: number
  }
  vendors: {
    total: number
    pending: number
    approved: number
    rejected: number
    suspended: number
  }
  products: {
    total: number
    active: number
    pendingModeration: number
  }
  orders: {
    total: number
    thisMonth: number
    processing: number
  }
  reviews: {
    total: number
    flagged: number
    averageRating: number
  }
  commissionEarned: number
}

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: () => apiClient.get('/admin/stats'),
  })
}
```

### hooks/admin/use-users.ts

```typescript
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { User, UserRole, UserStatus } from '@/types'
import { useToast } from '@/hooks/use-toast'

interface UsersFilters {
  search?: string
  role?: UserRole
  status?: UserStatus
  page?: number
  limit?: number
}

interface UsersResponse {
  users: User[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export function useUsers(filters: UsersFilters = {}) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const usersQuery = useQuery<UsersResponse>({
    queryKey: ['admin-users', filters],
    queryFn: () => apiClient.get('/admin/users', filters),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      apiClient.patch(`/admin/users/${userId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast({
        title: 'User status updated',
        description: 'The user status has been updated successfully.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update user status. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => apiClient.delete(`/admin/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast({
        title: 'User deleted',
        description: 'The user has been deleted successfully.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete user. Please try again.',
        variant: 'destructive',
      })
    },
  })

  return {
    users: usersQuery.data?.users || [],
    pagination: usersQuery.data?.pagination,
    isLoading: usersQuery.isLoading,
    updateStatus: updateStatusMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  }
}
```

### hooks/admin/use-vendor-approvals.ts

```typescript
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { User, VendorStatus } from '@/types'
import { useToast } from '@/hooks/use-toast'

interface VendorApplication extends User {
  businessName?: string
  businessLicense?: string
  taxDocument?: string
  bankDetails?: {
    accountName: string
    accountNumber: string
    bankName: string
    iban: string
  }
  appliedAt: string
  reviewedAt?: string
  rejectionReason?: string
}

interface VendorFilters {
  status?: VendorStatus
  search?: string
  page?: number
  limit?: number
}

interface VendorsResponse {
  vendors: VendorApplication[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export function useVendorApprovals(filters: VendorFilters = {}) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const vendorsQuery = useQuery<VendorsResponse>({
    queryKey: ['admin-vendor-approvals', filters],
    queryFn: () => apiClient.get('/admin/vendors', filters),
  })

  const approveMutation = useMutation({
    mutationFn: (vendorId: string) =>
      apiClient.post(`/admin/vendors/${vendorId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendor-approvals'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      toast({
        title: 'Vendor approved',
        description: 'The vendor application has been approved.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to approve vendor. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: ({ vendorId, reason }: { vendorId: string; reason: string }) =>
      apiClient.post(`/admin/vendors/${vendorId}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendor-approvals'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      toast({
        title: 'Vendor rejected',
        description: 'The vendor application has been rejected.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to reject vendor. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const suspendMutation = useMutation({
    mutationFn: ({ vendorId, reason }: { vendorId: string; reason: string }) =>
      apiClient.post(`/admin/vendors/${vendorId}/suspend`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendor-approvals'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      toast({
        title: 'Vendor suspended',
        description: 'The vendor has been suspended.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to suspend vendor. Please try again.',
        variant: 'destructive',
      })
    },
  })

  return {
    vendors: vendorsQuery.data?.vendors || [],
    pagination: vendorsQuery.data?.pagination,
    isLoading: vendorsQuery.isLoading,
    approve: approveMutation.mutate,
    reject: rejectMutation.mutate,
    suspend: suspendMutation.mutate,
    isProcessing: approveMutation.isPending || rejectMutation.isPending || suspendMutation.isPending,
  }
}
```

---

## 📄 Admin Layout

### app/(admin)/admin/layout.tsx

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  MessageSquare,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Vendors', href: '/admin/vendors', icon: Store },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 w-64 h-full bg-deep-navy text-white transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center font-playfair font-bold text-deep-navy">
                A
              </div>
              <div>
                <h2 className="font-playfair font-bold text-oud-gold">AromaSouq</h2>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Admin info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-oud-gold text-deep-navy">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-oud-gold text-deep-navy font-medium"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-white border-b lg:hidden">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="font-playfair font-bold text-oud-gold">AromaSouq</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
```

---

## 🏠 Admin Dashboard Home

### app/(admin)/admin/page.tsx

```typescript
'use client'

import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Store, Package, ShoppingCart, Star } from 'lucide-react'
import { StatsCard } from '@/components/ui/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAdminStats } from '@/hooks/admin/use-admin-stats'
import { useVendorApprovals } from '@/hooks/admin/use-vendor-approvals'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats()
  const { vendors: pendingVendors } = useVendorApprovals({ status: 'PENDING', limit: 5 })

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-deep-navy">Dashboard</h1>
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
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
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
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
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
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />

        <StatsCard
          title="Orders"
          value={(stats?.orders.total || 0).toLocaleString()}
          subtitle={`${stats?.orders.processing || 0} processing`}
          icon={ShoppingCart}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />

        <StatsCard
          title="Platform Rating"
          value={stats?.reviews.averageRating?.toFixed(1) || '0.0'}
          subtitle={`${stats?.reviews.flagged || 0} reviews flagged`}
          icon={Star}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-100"
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
                    <p className="font-medium">{vendor.businessName || vendor.name}</p>
                    <p className="text-sm text-muted-foreground">{vendor.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied {formatDate(vendor.appliedAt)}
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
```

---

## 👥 User Management

### app/(admin)/admin/users/page.tsx

```typescript
'use client'

import { useState } from 'react'
import { Search, MoreVertical, UserCheck, UserX, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useUsers } from '@/hooks/admin/use-users'
import { User, UserRole, UserStatus } from '@/types'
import { formatDate } from '@/lib/utils'

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL')
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const { users, isLoading, updateStatus, deleteUser, isUpdating, isDeleting } = useUsers({
    search: search || undefined,
    role: roleFilter === 'ALL' ? undefined : roleFilter,
    status: statusFilter === 'ALL' ? undefined : statusFilter,
  })

  const handleStatusToggle = (user: User) => {
    const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
    updateStatus({ userId: user.id, status: newStatus })
  }

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id)
      setUserToDelete(null)
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'VENDOR':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'CUSTOMER':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-deep-navy">User Management</h1>
        <p className="text-gray-600 mt-1">Manage all platform users</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | 'ALL')}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="VENDOR">Vendor</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as UserStatus | 'ALL')}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">Loading...</div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-oud-gold/20 flex items-center justify-center text-oud-gold font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={isUpdating || isDeleting}>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusToggle(user)}>
                              {user.status === 'ACTIVE' ? (
                                <>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Suspend User
                                </>
                              ) : (
                                <>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate User
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setUserToDelete(user)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
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

## 🏪 Vendor Approvals

### app/(admin)/admin/vendors/page.tsx

```typescript
'use client'

import { useState } from 'react'
import { Search, ExternalLink, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useVendorApprovals } from '@/hooks/admin/use-vendor-approvals'
import { VendorStatus } from '@/types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function VendorsPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<VendorStatus | 'ALL'>('PENDING')
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; vendorId?: string }>({ open: false })
  const [rejectionReason, setRejectionReason] = useState('')

  const { vendors, isLoading, approve, reject, isProcessing } = useVendorApprovals({
    search: search || undefined,
    status: activeTab === 'ALL' ? undefined : activeTab,
  })

  const handleApprove = (vendorId: string) => {
    if (confirm('Are you sure you want to approve this vendor?')) {
      approve(vendorId)
    }
  }

  const handleRejectClick = (vendorId: string) => {
    setRejectDialog({ open: true, vendorId })
    setRejectionReason('')
  }

  const handleRejectConfirm = () => {
    if (rejectDialog.vendorId && rejectionReason.trim()) {
      reject({ vendorId: rejectDialog.vendorId, reason: rejectionReason })
      setRejectDialog({ open: false })
      setRejectionReason('')
    }
  }

  const getStatusBadge = (status: VendorStatus) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case 'APPROVED':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
      case 'REJECTED':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
      case 'SUSPENDED':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Suspended</Badge>
    }
  }

  const pendingCount = vendors.filter(v => v.status === 'PENDING').length
  const approvedCount = vendors.filter(v => v.status === 'APPROVED').length
  const rejectedCount = vendors.filter(v => v.status === 'REJECTED').length
  const suspendedCount = vendors.filter(v => v.status === 'SUSPENDED').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-deep-navy">Vendor Management</h1>
        <p className="text-gray-600 mt-1">Review and manage vendor applications</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by business name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as VendorStatus | 'ALL')}>
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="PENDING">
            Pending {pendingCount > 0 && `(${pendingCount})`}
          </TabsTrigger>
          <TabsTrigger value="APPROVED">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="REJECTED">Rejected ({rejectedCount})</TabsTrigger>
          <TabsTrigger value="SUSPENDED">Suspended ({suspendedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendors ({vendors.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">Loading...</div>
              ) : vendors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No vendors found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vendor.businessName || vendor.name}</p>
                              {vendor.businessLicense && (
                                <p className="text-xs text-muted-foreground">
                                  License: {vendor.businessLicense}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{vendor.name}</p>
                              <p className="text-xs text-muted-foreground">{vendor.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(vendor.appliedAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/vendors/${vendor.id}/review`}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Review
                                </Link>
                              </Button>
                              {vendor.status === 'PENDING' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(vendor.id)}
                                    disabled={isProcessing}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRejectClick(vendor.id)}
                                    disabled={isProcessing}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rejection Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => setRejectDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Vendor Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this vendor application. This will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false })}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim() || isProcessing}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

### app/(admin)/admin/vendors/[id]/review/page.tsx

```typescript
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, CheckCircle, XCircle, Download, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { useVendorApprovals } from '@/hooks/admin/use-vendor-approvals'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function VendorReviewPage() {
  const params = useParams()
  const router = useRouter()
  const vendorId = params.id as string
  const [rejectDialog, setRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  const { approve, reject, isProcessing } = useVendorApprovals()

  const { data: vendor, isLoading } = useQuery({
    queryKey: ['vendor-application', vendorId],
    queryFn: () => apiClient.get(`/admin/vendors/${vendorId}`),
  })

  const handleApprove = () => {
    if (confirm('Are you sure you want to approve this vendor?')) {
      approve(vendorId, {
        onSuccess: () => router.push('/admin/vendors'),
      })
    }
  }

  const handleRejectConfirm = () => {
    if (rejectionReason.trim()) {
      reject({ vendorId, reason: rejectionReason }, {
        onSuccess: () => {
          setRejectDialog(false)
          router.push('/admin/vendors')
        },
      })
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>
  }

  if (!vendor) {
    return <div className="flex items-center justify-center min-h-[400px]">Vendor not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/vendors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-playfair font-bold text-deep-navy">
            Review Vendor Application
          </h1>
          <p className="text-gray-600 mt-1">{vendor.businessName || vendor.name}</p>
        </div>
        {vendor.status === 'PENDING' && (
          <div className="flex gap-2">
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => setRejectDialog(true)}
              disabled={isProcessing}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Business Name</Label>
                  <p className="font-medium mt-1">{vendor.businessName || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Business License</Label>
                  <p className="font-medium mt-1">{vendor.businessLicense || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Contact Person</Label>
                  <p className="font-medium mt-1">{vendor.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium mt-1">{vendor.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          {vendor.bankDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Account Name</Label>
                    <p className="font-medium mt-1">{vendor.bankDetails.accountName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bank Name</Label>
                    <p className="font-medium mt-1">{vendor.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account Number</Label>
                    <p className="font-medium mt-1">{vendor.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">IBAN</Label>
                    <p className="font-medium mt-1">{vendor.bankDetails.iban}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vendor.taxDocument && (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Tax Document</p>
                    <p className="text-sm text-muted-foreground">VAT registration certificate</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={vendor.taxDocument} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    {vendor.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Applied On</Label>
                <p className="font-medium mt-1">{formatDate(vendor.appliedAt)}</p>
              </div>
              {vendor.reviewedAt && (
                <div>
                  <Label className="text-muted-foreground">Reviewed On</Label>
                  <p className="font-medium mt-1">{formatDate(vendor.reviewedAt)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rejection Reason (if rejected) */}
          {vendor.status === 'REJECTED' && vendor.rejectionReason && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Rejection Reason</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700">{vendor.rejectionReason}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Vendor Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this vendor application. This will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim() || isProcessing}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

---

## 📦 Product Moderation

### app/(admin)/admin/products/page.tsx

```typescript
'use client'

import { useState } from 'react'
import { Search, Eye, Ban, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Product, ProductStatus } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

export default function ProductModerationPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'ALL' | ProductStatus>('ALL')
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['admin-products', { search, status: activeTab === 'ALL' ? undefined : activeTab }],
    queryFn: () => apiClient.get('/admin/products', {
      search: search || undefined,
      status: activeTab === 'ALL' ? undefined : activeTab
    }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ productId, status }: { productId: string; status: ProductStatus }) =>
      apiClient.patch(`/admin/products/${productId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      toast({ title: 'Product status updated' })
    },
  })

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Draft</Badge>
      case 'ACTIVE':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
      case 'INACTIVE':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Inactive</Badge>
      case 'OUT_OF_STOCK':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Out of Stock</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-deep-navy">Product Moderation</h1>
        <p className="text-gray-600 mt-1">Review and moderate all products</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ALL' | ProductStatus)}>
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="ACTIVE">Active</TabsTrigger>
          <TabsTrigger value="INACTIVE">Inactive</TabsTrigger>
          <TabsTrigger value="OUT_OF_STOCK">Out of Stock</TabsTrigger>
          <TabsTrigger value="DRAFT">Draft</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Products ({products?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">Loading...</div>
              ) : !products || products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No products found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
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
                          <TableCell>{product.vendor?.businessName || product.vendor?.name}</TableCell>
                          <TableCell>{formatCurrency(product.price)}</TableCell>
                          <TableCell>
                            <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/products/${product.slug}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              {product.status !== 'ACTIVE' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateStatusMutation.mutate({
                                    productId: product.id,
                                    status: 'ACTIVE'
                                  })}
                                  disabled={updateStatusMutation.isPending}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </Button>
                              )}
                              {product.status === 'ACTIVE' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateStatusMutation.mutate({
                                    productId: product.id,
                                    status: 'INACTIVE'
                                  })}
                                  disabled={updateStatusMutation.isPending}
                                >
                                  <Ban className="h-4 w-4 mr-2" />
                                  Deactivate
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

---

## ⭐ Review Moderation

### app/(admin)/admin/reviews/page.tsx

```typescript
'use client'

import { useState } from 'react'
import { Search, Eye, Trash2, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Review } from '@/types'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Star } from 'lucide-react'

export default function ReviewModerationPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'ALL' | 'FLAGGED'>('FLAGGED')
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ['admin-reviews', { search, flagged: activeTab === 'FLAGGED' }],
    queryFn: () => apiClient.get('/admin/reviews', {
      search: search || undefined,
      flagged: activeTab === 'FLAGGED' ? true : undefined
    }),
  })

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: string) => apiClient.delete(`/admin/reviews/${reviewId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] })
      toast({ title: 'Review deleted successfully' })
      setReviewToDelete(null)
    },
  })

  const clearFlagMutation = useMutation({
    mutationFn: (reviewId: string) => apiClient.patch(`/admin/reviews/${reviewId}/clear-flag`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] })
      toast({ title: 'Flag cleared' })
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-deep-navy">Review Moderation</h1>
        <p className="text-gray-600 mt-1">Moderate customer reviews</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ALL' | 'FLAGGED')}>
        <TabsList>
          <TabsTrigger value="FLAGGED">Flagged</TabsTrigger>
          <TabsTrigger value="ALL">All Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reviews ({reviews?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">Loading...</div>
              ) : !reviews || reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No reviews found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium">{review.user.name}</p>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.flagged && (
                              <Badge variant="destructive">Flagged</Badge>
                            )}
                          </div>
                          <Link
                            href={`/products/${review.product.slug}`}
                            className="text-sm text-oud-gold hover:underline mb-2 block"
                          >
                            {review.product.nameEn}
                          </Link>
                          <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                          {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-2">
                              {review.images.map((img, idx) => (
                                <div key={idx} className="relative w-20 h-20 rounded overflow-hidden">
                                  <Image src={img.url} alt="" fill className="object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                        </div>
                        <div className="flex gap-2">
                          {review.flagged && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => clearFlagMutation.mutate(review.id)}
                              disabled={clearFlagMutation.isPending}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Clear Flag
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setReviewToDelete(review)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation */}
      <AlertDialog open={!!reviewToDelete} onOpenChange={() => setReviewToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => reviewToDelete && deleteReviewMutation.mutate(reviewToDelete.id)}
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

## 🔒 Route Protection

Ensure admin routes are protected in `middleware.ts`:

```typescript
// middleware.ts (add to existing middleware from 03-CORE-FEATURES)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  // Admin routes - require ADMIN role
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/vendor/:path*', '/profile/:path*'],
}
```

---

## ✅ Implementation Checklist

**Phase 07 Complete:**
- [x] Admin layout with sidebar navigation
- [x] Dashboard home with platform statistics
- [x] User management (view, activate, suspend, delete)
- [x] Vendor approval workflow with document review
- [x] Product moderation interface
- [x] Review moderation (flagged reviews)
- [x] Admin-specific hooks (useAdminStats, useUsers, useVendorApprovals)
- [x] Route protection for admin pages
- [x] Responsive design for all admin pages

**Integration Points:**
- Uses all components from `02-DESIGN-SYSTEM.md` ✅
- Uses `apiClient` and hooks from `03-CORE-FEATURES.md` ✅
- Follows patterns from `04-PUBLIC-PAGES.md` and `05-SHOPPING-FEATURES.md` ✅

**Next Phase:** 08-ENHANCEMENTS.md (Quick View, Buy Now, Scent Pyramid, Advanced Interactions)
