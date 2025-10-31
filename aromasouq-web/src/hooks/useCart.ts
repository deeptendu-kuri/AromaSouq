import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Cart } from '@/types'
import toast from 'react-hot-toast'

export function useCart() {
  const queryClient = useQueryClient()

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => apiClient.get<Cart>('/cart'),
  })

  const addToCart = useMutation({
    mutationFn: (data: { productId: string; variantId?: string; quantity: number }) =>
      apiClient.post<Cart>('/cart/items', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Added to cart')
    },
    onError: () => {
      toast.error('Failed to add to cart')
    },
  })

  const updateQuantity = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      apiClient.patch<Cart>(`/cart/items/${itemId}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const updateCartItem = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      apiClient.patch<Cart>(`/cart/items/${itemId}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const removeFromCart = useMutation({
    mutationFn: (itemId: string) => apiClient.delete(`/cart/items/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Removed from cart')
    },
  })

  const clearCart = useMutation({
    mutationFn: () => apiClient.delete('/cart'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  return {
    cart,
    isLoading,
    addToCart: addToCart.mutate,
    updateQuantity: updateQuantity.mutate,
    updateCartItem: updateCartItem.mutate,
    removeFromCart: removeFromCart.mutate,
    clearCart: clearCart.mutate,
    itemCount: cart?.summary?.itemCount || 0,
  }
}
