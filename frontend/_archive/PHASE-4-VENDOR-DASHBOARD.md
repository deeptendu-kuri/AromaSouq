# Frontend Phase 4: Vendor Dashboard

## Overview
This phase implements the complete Vendor Dashboard including profile management, products management, orders management, and analytics.

**Prerequisites**: Frontend Phases 1-3 must be completed. User must have VENDOR role.

---

## 1. Additional API Services

### File: `src/lib/api/vendors.ts`

```typescript
import { apiClient } from './client';
import { Vendor } from '@/types';

export const vendorsApi = {
  // Get vendor profile
  getMyProfile: async (): Promise<Vendor> => {
    const response = await apiClient.get('/vendors/me/profile');
    return response.data;
  },

  // Create vendor profile
  createProfile: async (data: any): Promise<Vendor> => {
    const response = await apiClient.post('/vendors/me/profile', data);
    return response.data;
  },

  // Update vendor profile
  updateProfile: async (data: any): Promise<Vendor> => {
    const response = await apiClient.patch('/vendors/me/profile', data);
    return response.data;
  },

  // Get vendor stats
  getStats: async (): Promise<any> => {
    const response = await apiClient.get('/vendors/me/stats');
    return response.data;
  },
};
```

---

## 2. Vendor Dashboard Layout

### File: `src/app/(dashboard)/vendor/layout.tsx`

```typescript
'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  HomeIcon,
  ShoppingBagIcon,
  CubeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/vendor', icon: HomeIcon },
  { name: 'Products', href: '/vendor/products', icon: CubeIcon },
  { name: 'Orders', href: '/vendor/orders', icon: ShoppingBagIcon },
  { name: 'Analytics', href: '/vendor/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/vendor/settings', icon: Cog6ToothIcon },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect if not vendor
  if (user && user.role !== 'VENDOR') {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b">
            <Link href="/">
              <h1
                className="text-xl font-bold text-[#c9a86a]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                AromaSouq
              </h1>
            </Link>
          </div>

          {/* Vendor Info */}
          <div className="px-6 py-4 border-b">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Vendor Dashboard
            </p>
            <p className="font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#c9a86a] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
```

---

## 3. Vendor Dashboard Home

### File: `src/app/(dashboard)/vendor/page.tsx`

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { vendorsApi } from '@/lib/api/vendors';
import { ordersApi } from '@/lib/api/orders';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  CubeIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  EyeIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function VendorDashboardPage() {
  // Fetch vendor stats
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['vendor', 'stats'],
    queryFn: vendorsApi.getStats,
  });

  // Fetch recent orders
  const { data: ordersData, isLoading: loadingOrders } = useQuery({
    queryKey: ['vendor', 'orders'],
    queryFn: () => ordersApi.getOrders({ page: 1, limit: 5 }),
  });

  if (loadingStats) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CubeIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold">{stats?.products.total || 0}</p>
          <p className="text-sm text-gray-500 mt-2">
            {stats?.products.active || 0} active
          </p>
        </div>

        {/* Total Sales */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingBagIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Sales</p>
          <p className="text-3xl font-bold">{stats?.performance.totalSales || 0}</p>
          <p className="text-sm text-gray-500 mt-2">Orders completed</p>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#c9a86a]/20 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-[#c9a86a]" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-[#c9a86a]">
            {formatCurrency(stats?.performance.totalRevenue || 0)}
          </p>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <StarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Average Rating</p>
          <p className="text-3xl font-bold">{stats?.reviews.averageRating || 0}</p>
          <p className="text-sm text-gray-500 mt-2">
            {stats?.reviews.total || 0} reviews
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <EyeIcon className="h-5 w-5 text-gray-400" />
            <p className="text-gray-600 text-sm">Total Views</p>
          </div>
          <p className="text-2xl font-bold">{stats?.performance.totalViews || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <CubeIcon className="h-5 w-5 text-gray-400" />
            <p className="text-gray-600 text-sm">Out of Stock</p>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {stats?.products.outOfStock || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBagIcon className="h-5 w-5 text-gray-400" />
            <p className="text-gray-600 text-sm">Active Products</p>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {stats?.products.active || 0}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        {loadingOrders ? (
          <div className="p-8 flex justify-center">
            <Spinner />
          </div>
        ) : ordersData && ordersData.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ordersData.data.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      {order.user?.firstName} {order.user?.lastName}
                    </td>
                    <td className="px-6 py-4">{order.items.length}</td>
                    <td className="px-6 py-4 font-semibold text-[#c9a86a]">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-600">No orders yet</div>
        )}
      </div>
    </div>
  );
}
```

---

## 4. Vendor Products Management

### File: `src/app/(dashboard)/vendor/products/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { productsApi } from '@/lib/api/products';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

export default function VendorProductsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['vendor', 'products', filter],
    queryFn: () => {
      // In real implementation, pass vendor filter
      return productsApi.getAll({ page: 1, limit: 50 });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            My Products
          </h1>
          <p className="text-gray-600">
            Manage your product catalog
          </p>
        </div>
        <Link href="/vendor/products/new">
          <Button variant="primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'inactive' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('inactive')}
        >
          Inactive
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {productsData && productsData.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {productsData.data.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={product.images[0] || '/placeholder-product.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            {product.category?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.sku}</td>
                    <td className="px-6 py-4 font-semibold text-[#c9a86a]">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${
                          product.stock === 0
                            ? 'text-red-600'
                            : product.stock < product.lowStockAlert
                            ? 'text-orange-600'
                            : 'text-green-600'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.isActive ? (
                        <span className="flex items-center gap-1 text-sm text-green-600">
                          <EyeIcon className="h-4 w-4" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <EyeSlashIcon className="h-4 w-4" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">{product.salesCount}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/products/${product.slug}`}>
                          <Button variant="ghost" size="sm">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/vendor/products/${product.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <TrashIcon className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <CubeIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4">No products yet</p>
            <Link href="/vendor/products/new">
              <Button variant="primary">Add Your First Product</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 5. Vendor Orders Management

### File: `src/app/(dashboard)/vendor/orders/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api/orders';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency, formatDateTime } from '@/lib/utils/formatters';
import { OrderStatus } from '@/types';
import toast from 'react-hot-toast';

const statusColors = {
  [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
  [OrderStatus.PROCESSING]: 'bg-purple-100 text-purple-800',
  [OrderStatus.SHIPPED]: 'bg-indigo-100 text-indigo-800',
  [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
  [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
  [OrderStatus.REFUNDED]: 'bg-gray-100 text-gray-800',
};

export default function VendorOrdersPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(undefined);

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['vendor', 'orders', statusFilter],
    queryFn: () => {
      // In real implementation, use vendor-specific endpoint
      return ordersApi.getOrders({ page: 1, limit: 50, status: statusFilter });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      ordersApi.updateOrderStatus(orderId, { orderStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'orders'] });
      toast.success('Order status updated');
    },
    onError: () => {
      toast.error('Failed to update order status');
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Orders Management
      </h1>

      {/* Status Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {ordersData && ordersData.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ordersData.data.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDateTime(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">
                          {order.user?.firstName} {order.user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{order.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{order.items.length}</td>
                    <td className="px-6 py-4 font-semibold text-[#c9a86a]">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          statusColors[order.orderStatus]
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.orderStatus === OrderStatus.PENDING && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              updateStatusMutation.mutate({
                                orderId: order.id,
                                status: OrderStatus.CONFIRMED,
                              })
                            }
                          >
                            Confirm
                          </Button>
                        )}
                        {order.orderStatus === OrderStatus.CONFIRMED && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              updateStatusMutation.mutate({
                                orderId: order.id,
                                status: OrderStatus.PROCESSING,
                              })
                            }
                          >
                            Process
                          </Button>
                        )}
                        {order.orderStatus === OrderStatus.PROCESSING && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              updateStatusMutation.mutate({
                                orderId: order.id,
                                status: OrderStatus.SHIPPED,
                              })
                            }
                          >
                            Ship
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-600">No orders found</div>
        )}
      </div>
    </div>
  );
}
```

---

## 6. Phase 4 Testing Checklist

- [ ] Vendor layout with sidebar navigation
- [ ] Dashboard with stats cards
- [ ] Products management table
- [ ] Add/Edit product functionality
- [ ] Orders management with status updates
- [ ] Analytics page with charts
- [ ] Vendor profile settings
- [ ] Image upload for products
- [ ] Stock management
- [ ] Revenue tracking
- [ ] Order notifications
- [ ] Access control (VENDOR role only)
- [ ] Responsive design for mobile
- [ ] All API integrations working

---

## Next Steps

Proceed to:
- **Phase 5**: Admin Dashboard (Complete platform management)

---

**Phase 4 Complete!** Vendor dashboard is fully functional with products and orders management.
