"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import { vendorRegisterSchema, type VendorRegisterInput } from "@/lib/validations"
import { apiClient } from "@/lib/api-client"
import toast from "react-hot-toast"
import { Store, User, Building2, FileText, CheckCircle } from "lucide-react"

export default function BecomeVendorPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<VendorRegisterInput>({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      businessPhone: "",
      businessAddress: "",
      tradeLicenseNumber: "",
    },
  })

  const steps = [
    { title: "Personal Info", icon: User },
    { title: "Business Info", icon: Building2 },
    { title: "Documents", icon: FileText },
  ]

  const onSubmit = async (data: VendorRegisterInput) => {
    setIsLoading(true)
    try {
      // Step 1: Register user with role VENDOR
      const registerResponse = await apiClient.post<{ user: any }>('/auth/register', {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: 'VENDOR',
      })

      toast.success("Account created successfully!")

      // Step 2: Create vendor profile
      await apiClient.post('/vendor/profile', {
        businessName: data.businessName,
        businessEmail: data.email,
        businessPhone: data.businessPhone,
        description: data.businessAddress,
        tradeLicense: data.tradeLicenseNumber,
      })

      toast.success("Vendor profile created! Awaiting admin approval.")

      // Redirect to vendor dashboard
      router.push('/vendor?pending=true')
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error?.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep)
    const isValid = await form.trigger(fields)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const getFieldsForStep = (step: number): Array<keyof VendorRegisterInput> => {
    switch (step) {
      case 0:
        return ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword']
      case 1:
        return ['businessName', 'businessPhone', 'businessAddress']
      case 2:
        return ['tradeLicenseNumber']
      default:
        return []
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Store className="h-16 w-16 mx-auto text-oud-gold mb-4" />
          <h1 className="text-4xl font-bold mb-2">Become a Vendor</h1>
          <p className="text-muted-foreground">
            Join AromaSouq and start selling your fragrances to customers across the UAE
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className={`flex items-center gap-2 ${
                    index <= currentStep ? 'text-oud-gold' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep + 1}: {steps[currentStep].title}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "Enter your personal information"}
              {currentStep === 1 && "Tell us about your business"}
              {currentStep === 2 && "Upload business documents (optional)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+971 50 123 4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password *</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormDescription>At least 6 characters</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password *</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Business Info */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Luxury Fragrances LLC" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be displayed to customers
                          </FormDescription>
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

                    <FormField
                      control={form.control}
                      name="businessAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Address *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Street address, building number, area, city"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="tradeLicenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trade License Number</FormLabel>
                          <FormControl>
                            <Input placeholder="123456" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your UAE trade license number. This helps speed up approval.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 mb-2">
                            What happens next?
                          </p>
                          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                            <li>Your application will be reviewed by our team</li>
                            <li>Approval typically takes 1-2 business days</li>
                            <li>You'll receive an email notification once approved</li>
                            <li>After approval, you can start adding products</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t">
                  {currentStep > 0 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  ) : (
                    <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground self-center">
                      Already have an account? Login
                    </Link>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={nextStep} className="ml-auto">
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                      className="ml-auto"
                    >
                      {isLoading ? "Creating account..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reach More Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access thousands of fragrance enthusiasts across the UAE and GCC region.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Easy Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your products, orders, and inventory from one dashboard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get paid on time with our secure payment processing system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
