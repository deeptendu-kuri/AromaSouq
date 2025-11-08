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
import { ProductImagePlaceholder } from '@/components/ui/product-image-placeholder'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { formatCurrency } from '@/lib/utils'
import { getFirstProductImage } from '@/lib/image-utils'
import toast from 'react-hot-toast'

export default function ProductModerationPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<string>('ALL')
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<any>({
    queryKey: ['admin-products', { search, status: activeTab === 'ALL' ? undefined : activeTab }],
    queryFn: () => apiClient.get('/admin/products', {
      search: search || undefined,
      status: activeTab === 'ALL' ? undefined : activeTab
    }),
  })

  // Extract products array from response - API returns { data: [...], meta: {...} }
  const products = Array.isArray(data) ? data : (data?.data || [])

  const updateStatusMutation = useMutation({
    mutationFn: ({ productId, status }: { productId: string; status: string }) =>
      apiClient.patch(`/admin/products/${productId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      toast.success('Product status updated')
    },
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Draft</Badge>
      case 'ACTIVE':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
      case 'INACTIVE':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Inactive</Badge>
      case 'OUT_OF_STOCK':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-deep-navy">Product Moderation</h1>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                      {products.map((product: any) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
{getFirstProductImage(product) ? (
                                  <Image
                                    src={getFirstProductImage(product)!}
                                    alt={product.nameEn}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <ProductImagePlaceholder className="w-full h-full" size="sm" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{product.vendor?.businessName || product.vendor?.firstName}</TableCell>
                          <TableCell>{formatCurrency(product.salePrice || product.regularPrice)}</TableCell>
                          <TableCell>
                            <span className={product.stockQuantity < 10 ? 'text-red-600 font-medium' : ''}>
                              {product.stockQuantity}
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
