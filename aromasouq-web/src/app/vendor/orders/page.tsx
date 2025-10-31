"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { Search, Eye, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiClient } from "@/lib/api-client"
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils"
import toast from "react-hot-toast"

const statusColors: Record<string, string> = {
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
    queryFn: () => apiClient.get<{ data: any[] }>('/vendor/orders', {
      search: searchQuery,
      status: statusFilter !== 'all' ? statusFilter : undefined,
    }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }: { orderId: string; orderStatus: string }) =>
      apiClient.put(`/vendor/orders/${orderId}/status`, { orderStatus }),
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
            ) : (!orders?.data || orders?.data?.length === 0) ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-muted-foreground">No orders found</p>
                </TableCell>
              </TableRow>
            ) : (
              orders?.data?.map((order: any) => (
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
                    <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
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
                            orderStatus: 'PROCESSING'
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
                            orderStatus: 'SHIPPED'
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
