"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package, MapPin, User, CreditCard, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { apiClient } from "@/lib/api-client"
import { formatCurrency, formatDate } from "@/lib/utils"
import toast from "react-hot-toast"

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-cyan-100 text-cyan-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
}

const statusFlow: Record<string, string> = {
  PENDING: "PROCESSING",
  PROCESSING: "SHIPPED",
  SHIPPED: "DELIVERED",
}

export default function VendorOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const orderId = params.id as string

  const [trackingNumber, setTrackingNumber] = useState("")

  const { data: order, isLoading } = useQuery({
    queryKey: ['vendor-order', orderId],
    queryFn: () => apiClient.get<any>(`/vendor/orders/${orderId}`),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderStatus, trackingNumber }: { orderStatus: string; trackingNumber?: string }) =>
      apiClient.put(`/vendor/orders/${orderId}/status`, { orderStatus, trackingNumber }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-order', orderId] })
      queryClient.invalidateQueries({ queryKey: ['vendor-orders'] })
      toast.success('Order status updated successfully')
      setTrackingNumber("")
    },
    onError: () => {
      toast.error('Failed to update order status')
    },
  })

  const handleStatusUpdate = (newStatus: string) => {
    const payload: any = { orderStatus: newStatus }
    if (newStatus === 'SHIPPED' && trackingNumber) {
      payload.trackingNumber = trackingNumber
    }
    updateStatusMutation.mutate(payload)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Loading order details...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <Button asChild>
            <Link href="/vendor/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  const nextStatus = statusFlow[order.status]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/vendor/orders">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.product.images?.[0]?.url ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Price: {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <CardTitle>Customer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-muted-foreground">{order.customerEmail}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <CardTitle>Shipping Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Address details available</p>
                  <p className="text-xs">Full address shown to vendor only</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Items ({order.itemCount})</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Vendor Total</span>
                <span className="text-oud-gold">{formatCurrency(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status Update Actions */}
          {nextStatus && (
            <Card>
              <CardHeader>
                <CardTitle>Update Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Current status: <span className="font-medium text-foreground">{order.status}</span>
                </div>

                {nextStatus === 'SHIPPED' && (
                  <div className="space-y-2">
                    <Label htmlFor="trackingNumber">Tracking Number (Optional)</Label>
                    <Input
                      id="trackingNumber"
                      placeholder="Enter tracking number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={() => handleStatusUpdate(nextStatus)}
                  disabled={updateStatusMutation.isPending}
                >
                  {updateStatusMutation.isPending
                    ? 'Updating...'
                    : `Mark as ${nextStatus.charAt(0) + nextStatus.slice(1).toLowerCase()}`}
                </Button>

                <p className="text-xs text-muted-foreground">
                  This will notify the customer about the status change.
                </p>
              </CardContent>
            </Card>
          )}

          {order.status === 'DELIVERED' && (
            <Card>
              <CardHeader>
                <CardTitle>Order Complete</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This order has been delivered successfully.
                </p>
              </CardContent>
            </Card>
          )}

          {order.status === 'CANCELLED' && (
            <Card>
              <CardHeader>
                <CardTitle>Order Cancelled</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This order has been cancelled.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
