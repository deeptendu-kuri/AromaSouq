'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  Coins,
  ShoppingBag,
  Star,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Wallet {
  id: string
  balance: number
  lifetimeEarned: number
  lifetimeSpent: number
  coinsExpiringSoon: number
  availableBalance: number
}

interface Transaction {
  id: string
  amount: number
  type: 'EARNED' | 'SPENT' | 'EXPIRED' | 'REFUNDED'
  source: string
  description: string
  createdAt: string
  expiresAt?: string
  balanceAfter: number
}

interface WalletStats {
  totalEarned: number
  totalSpent: number
  currentBalance: number
  transactionCount: number
  earningsBySource: Array<{
    source: string
    amount: number
  }>
}

export default function WalletPage() {
  const queryClient = useQueryClient()
  const [coinsToRedeem, setCoinsToRedeem] = useState<number>(100)
  const [transactionPage, setTransactionPage] = useState(1)

  // Fetch wallet data
  const { data: wallet, isLoading: walletLoading } = useQuery<Wallet>({
    queryKey: ['wallet'],
    queryFn: () => apiClient.get('/wallet'),
  })

  // Fetch transactions
  const { data: transactionsData } = useQuery({
    queryKey: ['wallet-transactions', transactionPage],
    queryFn: () => apiClient.get(`/wallet/transactions?page=${transactionPage}&limit=10`),
  })

  // Fetch stats
  const { data: stats } = useQuery<WalletStats>({
    queryKey: ['wallet-stats'],
    queryFn: () => apiClient.get('/wallet/stats'),
  })

  // Redeem coins mutation
  const redeemMutation = useMutation({
    mutationFn: (amount: number) => apiClient.post('/wallet/redeem', { amount }),
    onSuccess: (data) => {
      toast.success(`Successfully redeemed ${coinsToRedeem} coins!`)
      toast.success(`Coupon code: ${data.coupon.code}`, { duration: 10000 })
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-stats'] })
      setCoinsToRedeem(100)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to redeem coins')
    },
  })

  const handleRedeem = () => {
    if (!coinsToRedeem || coinsToRedeem < 10) {
      toast.error('Minimum 10 coins required for redemption')
      return
    }
    if (coinsToRedeem > (wallet?.balance || 0)) {
      toast.error('Insufficient coins balance')
      return
    }
    redeemMutation.mutate(coinsToRedeem)
  }

  const transactions = transactionsData?.data || []
  const meta = transactionsData?.meta

  if (walletLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg">Loading wallet...</p>
      </div>
    )
  }

  const discountValue = (coinsToRedeem * 0.1).toFixed(2)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wallet</h1>
        <p className="text-muted-foreground mt-1">
          Manage your coins, view transactions, and redeem rewards
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Balance Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-oud-gold to-amber-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Available Balance</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold">{wallet?.balance || 0}</h2>
                  <Coins className="h-8 w-8" />
                </div>
                <p className="text-sm text-white/90 mt-2">
                  = {formatCurrency((wallet?.balance || 0) * 1)} discount value
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-white/40" />
            </div>

            {wallet && wallet.coinsExpiringSoon > 0 && (
              <Alert variant="default" className="mt-4 bg-white/20 border-white/30 text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-white">Expiring Soon</AlertTitle>
                <AlertDescription className="text-white/90">
                  {wallet.coinsExpiringSoon} coins will expire in the next 30 days
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lifetime Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span>Total Earned</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {stats?.totalEarned || wallet?.lifetimeEarned || 0}
              </p>
            </div>
            <Separator />
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <ArrowDownLeft className="h-4 w-4 text-red-600" />
                <span>Total Spent</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {stats?.totalSpent || wallet?.lifetimeSpent || 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* How to Earn Coins */}
          <Card>
            <CardHeader>
              <CardTitle>How to Earn Coins</CardTitle>
              <CardDescription>
                Earn coins with every purchase and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-oud-gold/10 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-oud-gold" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Shop & Earn</h4>
                    <p className="text-sm text-muted-foreground">
                      Earn 1 coin for every 10 AED you spend on orders
                    </p>
                    <p className="text-xs text-oud-gold font-medium mt-1">
                      Coins awarded when order is delivered
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-oud-gold/10 rounded-lg">
                    <Star className="h-6 w-6 text-oud-gold" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Write Reviews</h4>
                    <p className="text-sm text-muted-foreground">
                      Earn 10 coins for every product review you write
                    </p>
                    <p className="text-xs text-oud-gold font-medium mt-1">
                      Review delivered products to earn
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-oud-gold/10 rounded-lg">
                    <Gift className="h-6 w-6 text-oud-gold" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Special Promotions</h4>
                    <p className="text-sm text-muted-foreground">
                      Earn bonus coins during special events and promotions
                    </p>
                    <p className="text-xs text-oud-gold font-medium mt-1">
                      Stay tuned for announcements
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Your complete coins transaction log
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Coins className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No transactions yet</p>
                  <p className="text-sm mt-1">Start earning coins by shopping!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx: Transaction) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          tx.type === 'EARNED' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {tx.type === 'EARNED' ? (
                            <ArrowUpRight className={`h-4 w-4 ${
                              tx.type === 'EARNED' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          ) : (
                            <ArrowDownLeft className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{tx.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(tx.createdAt), 'MMM dd, yyyy HH:mm')}
                            </p>
                            {tx.expiresAt && new Date(tx.expiresAt) > new Date() && (
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                Expires {format(new Date(tx.expiresAt), 'MMM dd, yyyy')}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className={`font-bold text-lg ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Balance: {tx.balanceAfter}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {meta && meta.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTransactionPage(p => Math.max(1, p - 1))}
                        disabled={transactionPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Page {transactionPage} of {meta.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTransactionPage(p => Math.min(meta.totalPages, p + 1))}
                        disabled={transactionPage === meta.totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Redemption */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Redeem Coins</CardTitle>
              <CardDescription>
                Convert your coins to discount coupons
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-oud-gold/10 rounded-lg border-2 border-oud-gold/20">
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-oud-gold">1 Coin = 0.1 AED</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Coins to Redeem (Min: 10)
                </label>
                <Input
                  type="number"
                  min="10"
                  max={wallet?.balance || 0}
                  value={coinsToRedeem}
                  onChange={(e) => setCoinsToRedeem(parseInt(e.target.value) || 0)}
                  placeholder="Enter coins"
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Available balance: {wallet?.balance || 0} coins
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Coins:</span>
                  <span className="font-semibold">{coinsToRedeem}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Coupon Value:</span>
                  <span className="font-bold text-oud-gold text-lg">
                    {formatCurrency(parseFloat(discountValue))}
                  </span>
                </div>
              </div>

              <Button
                className="w-full h-12 bg-gradient-to-r from-oud-gold to-amber-600 hover:shadow-lg"
                onClick={handleRedeem}
                disabled={redeemMutation.isPending || !coinsToRedeem || coinsToRedeem < 10 || coinsToRedeem > (wallet?.balance || 0)}
              >
                {redeemMutation.isPending ? 'Redeeming...' : `Redeem ${discountValue} AED`}
              </Button>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Your coupon will be valid for 30 days and can be used once on any order
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-oud-gold mt-1.5 flex-shrink-0" />
                <p>Coins expire after 90 days of being earned</p>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-oud-gold mt-1.5 flex-shrink-0" />
                <p>1 coin = 1 AED discount during checkout</p>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-oud-gold mt-1.5 flex-shrink-0" />
                <p>Maximum 50% of order value can be paid with coins</p>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-oud-gold mt-1.5 flex-shrink-0" />
                <p>Redeemed coupons are valid for 30 days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
