'use client'

import { useState } from 'react'
import { Search, Trash2, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function ReviewModerationPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<string>('FLAGGED')
  const [reviewToDelete, setReviewToDelete] = useState<any | null>(null)
  const queryClient = useQueryClient()

  const { data: reviews, isLoading } = useQuery<any[]>({
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
      toast.success('Review deleted successfully')
      setReviewToDelete(null)
    },
  })

  const clearFlagMutation = useMutation({
    mutationFn: (reviewId: string) => apiClient.patch(`/admin/reviews/${reviewId}/clear-flag`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] })
      toast.success('Flag cleared')
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-deep-navy">Review Moderation</h1>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                  {reviews.map((review: any) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium">{review.user?.firstName} {review.user?.lastName}</p>
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
                            href={`/products/${review.product?.slug}`}
                            className="text-sm text-oud-gold hover:underline mb-2 block"
                          >
                            {review.product?.nameEn}
                          </Link>
                          <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                          {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-2">
                              {review.images.map((img: any, idx: number) => (
                                <div key={idx} className="relative w-20 h-20 rounded overflow-hidden">
                                  <Image src={img.url} alt={`Review image ${idx + 1} for ${review.product?.nameEn}`} fill className="object-cover" />
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
