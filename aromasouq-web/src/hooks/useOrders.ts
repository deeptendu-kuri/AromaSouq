import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

interface Order {
  id: string
  orderNumber: string
  orderStatus: string
  paymentStatus: string
  subtotal: number
  tax: number
  shippingFee: number
  discount: number
  total: number
  createdAt: string
  trackingNumber?: string
  items: {
    id: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      nameAr: string
      images: { url: string }[]
    }
  }[]
  address: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    phone: string
  }
}

interface OrdersResponse {
  data: Order[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export function useOrders(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['orders', page, limit],
    queryFn: () =>
      apiClient.get<OrdersResponse>('/orders', { page, limit }),
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => apiClient.get<Order>(`/orders/${id}`),
    enabled: !!id,
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderId: string) =>
      apiClient.post(`/orders/${orderId}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
