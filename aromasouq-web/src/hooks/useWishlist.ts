import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export function useWishlist() {
  const queryClient = useQueryClient()

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => apiClient.get<Product[]>('/wishlist'),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })

  const addToWishlist = useMutation({
    mutationFn: (productId: string) => apiClient.post('/wishlist', { productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      toast.success('Added to wishlist')
    },
    onError: () => {
      toast.error('Failed to add to wishlist')
    },
  })

  const removeFromWishlist = useMutation({
    mutationFn: (productId: string) => apiClient.delete(`/wishlist/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      toast.success('Removed from wishlist')
    },
  })

  const toggleWishlist = (productId: string) => {
    const isInWishlist = wishlist?.some((item) => item.id === productId)
    if (isInWishlist) {
      removeFromWishlist.mutate(productId)
    } else {
      addToWishlist.mutate(productId)
    }
  }

  const isWishlisted = (productId: string) => {
    return wishlist?.some((item) => item.id === productId) || false
  }

  return {
    wishlist,
    isLoading,
    addToWishlist: addToWishlist.mutate,
    removeFromWishlist: removeFromWishlist.mutate,
    toggleWishlist,
    isWishlisted,
    wishlistCount: wishlist?.length || 0,
  }
}
