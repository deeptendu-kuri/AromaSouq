export interface Review {
  id: string
  productId: string
  userId: string
  orderId?: string
  rating: number
  title?: string
  comment: string
  images: ReviewImage[]
  isVerifiedPurchase: boolean
  helpfulCount: number
  notHelpfulCount: number
  vendorReply?: {
    text: string
    repliedAt: Date
  }
  status: 'published' | 'hidden' | 'flagged'
  createdAt: Date

  // Relations
  user?: {
    firstName: string
    lastName: string
    avatar?: string
  }
}

export interface ReviewImage {
  id: string
  reviewId: string
  url: string
  position: number
}
