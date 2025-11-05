'use client'

import { useState } from 'react'
import { Search, ExternalLink, CheckCircle, XCircle } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useVendorApprovals } from '@/hooks/admin/use-vendor-approvals'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function VendorsPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<string>('PENDING')
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; vendorId?: string }>({ open: false })
  const [rejectionReason, setRejectionReason] = useState('')

  const { vendors, isLoading, approve, reject, isProcessing } = useVendorApprovals({
    search: search || undefined,
    status: activeTab === 'ALL' ? undefined : activeTab as any,
  })

  // Debug: Log vendors data
  console.log('Vendors data:', vendors, 'isLoading:', isLoading)

  const handleApprove = (vendorId: string) => {
    if (confirm('Are you sure you want to approve this vendor?')) {
      approve(vendorId)
    }
  }

  const handleRejectClick = (vendorId: string) => {
    setRejectDialog({ open: true, vendorId })
    setRejectionReason('')
  }

  const handleRejectConfirm = () => {
    if (rejectDialog.vendorId && rejectionReason.trim()) {
      reject({ vendorId: rejectDialog.vendorId, reason: rejectionReason })
      setRejectDialog({ open: false })
      setRejectionReason('')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case 'APPROVED':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
      case 'REJECTED':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
      case 'SUSPENDED':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const vendorsArray = Array.isArray(vendors) ? vendors : []
  const pendingCount = vendorsArray.filter((v: any) => v.status === 'PENDING').length
  const approvedCount = vendorsArray.filter((v: any) => v.status === 'APPROVED').length
  const rejectedCount = vendorsArray.filter((v: any) => v.status === 'REJECTED').length
  const suspendedCount = vendorsArray.filter((v: any) => v.status === 'SUSPENDED').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-deep-navy">Vendor Management</h1>
        <p className="text-gray-600 mt-1">Review and manage vendor applications</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by business name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="PENDING">
            Pending {pendingCount > 0 && `(${pendingCount})`}
          </TabsTrigger>
          <TabsTrigger value="APPROVED">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="REJECTED">Rejected ({rejectedCount})</TabsTrigger>
          <TabsTrigger value="SUSPENDED">Suspended ({suspendedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendors ({vendorsArray.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">Loading...</div>
              ) : vendorsArray.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No vendors found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendorsArray.map((vendor: any) => (
                        <TableRow key={vendor.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vendor.businessName || `${vendor.user?.firstName} ${vendor.user?.lastName}`}</p>
                              {vendor.businessLicense && (
                                <p className="text-xs text-muted-foreground">
                                  License: {vendor.businessLicense}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{vendor.user?.firstName} {vendor.user?.lastName}</p>
                              <p className="text-xs text-muted-foreground">{vendor.user?.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(vendor.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/vendors/${vendor.id}/review`}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Review
                                </Link>
                              </Button>
                              {vendor.status === 'PENDING' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(vendor.id)}
                                    disabled={isProcessing}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRejectClick(vendor.id)}
                                    disabled={isProcessing}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </>
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

      {/* Rejection Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => setRejectDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Vendor Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this vendor application. This will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false })}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim() || isProcessing}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
