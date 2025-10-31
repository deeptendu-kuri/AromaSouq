"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"
import toast from "react-hot-toast"
import { Building2, Globe, Bell, User, Loader2 } from "lucide-react"

// Vendor update schema
const vendorUpdateSchema = z.object({
  businessName: z.string().min(3, "Business name must be at least 3 characters"),
  businessEmail: z.string().email("Invalid email address"),
  businessPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  businessNameAr: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  tradeLicense: z.string().optional(),
  taxNumber: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  facebookUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  whatsappNumber: z.string().optional(),
})

type VendorUpdateInput = z.infer<typeof vendorUpdateSchema>

export default function VendorSettingsPage() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("business")
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<VendorUpdateInput>({
    resolver: zodResolver(vendorUpdateSchema),
  })

  // Fetch vendor profile
  const { data: vendor, isLoading: isLoadingVendor } = useQuery({
    queryKey: ['vendor-profile'],
    queryFn: () => apiClient.get<any>('/vendor/profile'),
  })

  // Populate form when vendor data is loaded
  useEffect(() => {
    if (vendor) {
      form.reset({
        businessName: vendor.businessName || "",
        businessEmail: vendor.businessEmail || "",
        businessPhone: vendor.businessPhone || "",
        businessNameAr: vendor.businessNameAr || "",
        description: vendor.description || "",
        descriptionAr: vendor.descriptionAr || "",
        tradeLicense: vendor.tradeLicense || "",
        taxNumber: vendor.taxNumber || "",
        website: vendor.website || "",
        instagramUrl: vendor.instagramUrl || "",
        facebookUrl: vendor.facebookUrl || "",
        twitterUrl: vendor.twitterUrl || "",
        whatsappNumber: vendor.whatsappNumber || "",
      })
    }
  }, [vendor, form])

  const updateMutation = useMutation({
    mutationFn: (data: VendorUpdateInput) => apiClient.patch('/vendor/profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-profile'] })
      toast.success('Profile updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile')
    },
  })

  const onSubmit = (data: VendorUpdateInput) => {
    updateMutation.mutate(data)
  }

  if (isLoadingVendor) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-oud-gold" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your vendor profile and preferences
          </p>
        </div>
        {vendor && (
          <Badge variant={vendor.status === 'APPROVED' ? 'default' : 'secondary'}>
            {vendor.status}
          </Badge>
        )}
      </div>

      {/* Account Status Notice */}
      {vendor?.status === 'PENDING' && (
        <Card className="border-yellow-500 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              <strong>Pending Approval:</strong> Your vendor account is awaiting admin approval.
              You'll be able to add products once your account is approved (typically 1-2 business days).
            </p>
          </CardContent>
        </Card>
      )}

      {vendor?.status === 'REJECTED' && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="p-4">
            <p className="text-sm text-red-800">
              <strong>Application Rejected:</strong> Your vendor application has been rejected.
              Please contact support for more information.
            </p>
          </CardContent>
        </Card>
      )}

      {vendor?.status === 'SUSPENDED' && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="p-4">
            <p className="text-sm text-red-800">
              <strong>Account Suspended:</strong> Your vendor account has been suspended.
              Please contact support for assistance.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Settings Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="business">
                <Building2 className="h-4 w-4 mr-2" />
                Business
              </TabsTrigger>
              <TabsTrigger value="social">
                <Globe className="h-4 w-4 mr-2" />
                Social
              </TabsTrigger>
              <TabsTrigger value="documents">
                Documents
              </TabsTrigger>
              <TabsTrigger value="account">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Business Information */}
            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>
                    Update your business details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name (English) *</FormLabel>
                          <FormControl>
                            <Input placeholder="Luxury Fragrances LLC" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessNameAr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name (Arabic)</FormLabel>
                          <FormControl>
                            <Input placeholder="اسم التجاري" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (English)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell customers about your business..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be displayed on your vendor profile
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descriptionAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Arabic)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="وصف عملك"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="businessEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contact@business.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Phone *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+971 4 123 4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+971 50 123 4567" {...field} />
                        </FormControl>
                        <FormDescription>
                          Include country code (e.g., +971 for UAE)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Social Media */}
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media & Website</CardTitle>
                  <CardDescription>
                    Add your social media links and website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourbusiness.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagramUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/yourbusiness" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facebookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/yourbusiness" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter / X</FormLabel>
                        <FormControl>
                          <Input placeholder="https://twitter.com/yourbusiness" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 3: Documents */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Business Documents</CardTitle>
                  <CardDescription>
                    Manage your trade license and tax information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tradeLicense"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trade License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="123456" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your UAE trade license number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Registration Number (TRN)</FormLabel>
                        <FormControl>
                          <Input placeholder="100000000000003" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your UAE VAT registration number (if applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Providing accurate business documents helps speed up
                      the approval process and builds trust with customers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 4: Account Information */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    View your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Vendor ID</p>
                      <p className="text-sm font-mono">{vendor?.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Account Status</p>
                      <Badge variant={vendor?.status === 'APPROVED' ? 'default' : 'secondary'}>
                        {vendor?.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Member Since</p>
                      <p className="text-sm">
                        {vendor?.createdAt ? new Date(vendor.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Total Products</p>
                      <p className="text-sm">{vendor?._count?.products || 0}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">User Name</p>
                      <p className="text-sm">
                        {vendor?.user?.firstName} {vendor?.user?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">User Email</p>
                      <p className="text-sm">{vendor?.user?.email}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-gray-700">
                      <strong>Need Help?</strong> Contact our support team at support@aromasouq.com
                      or call +971 4 123 4567
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
