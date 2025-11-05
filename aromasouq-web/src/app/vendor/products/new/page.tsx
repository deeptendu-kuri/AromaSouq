"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { apiClient } from "@/lib/api-client"
import toast from "react-hot-toast"
import { ArrowLeft, Package } from "lucide-react"
import Link from "next/link"

// Comprehensive product validation schema
const createProductSchema = z.object({
  // Basic Info
  name: z.string().min(3, "Product name must be at least 3 characters"),
  nameAr: z.string().optional(),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  descriptionAr: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().optional(),

  // Pricing & Inventory
  price: z.number().min(1, "Price must be at least 1 AED"),
  compareAtPrice: z.number().optional(),
  cost: z.number().optional(),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  barcode: z.string().optional(),
  stock: z.number().min(0, "Stock cannot be negative"),
  lowStockAlert: z.number().optional(),

  // Media
  images: z.array(z.string()).optional(),
  video: z.string().optional(),

  // Specifications
  size: z.string().optional(),
  concentration: z.string().optional(),
  gender: z.string().optional(),

  // Scent Profile
  topNotes: z.string().optional(),
  heartNotes: z.string().optional(),
  baseNotes: z.string().optional(),
  notes: z.string().optional(),
  scentFamily: z.string().optional(),
  longevity: z.string().optional(),
  sillage: z.string().optional(),
  season: z.string().optional(),

  // Classification (Phase 2)
  productType: z.string().optional(),
  region: z.string().optional(),
  occasion: z.string().optional(),
  oudType: z.string().optional(),
  collection: z.string().optional(),

  // Advanced
  enableWhatsapp: z.boolean().optional(),
  whatsappNumber: z.string().optional(),
  coinsToAward: z.number().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

type CreateProductInput = z.infer<typeof createProductSchema>

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      nameAr: "",
      slug: "",
      description: "",
      descriptionAr: "",
      categoryId: "",
      brandId: "",
      price: 0,
      compareAtPrice: 0,
      cost: 0,
      sku: "",
      barcode: "",
      stock: 0,
      lowStockAlert: 10,
      images: [],
      video: "",
      size: "",
      concentration: "",
      gender: "",
      topNotes: "",
      heartNotes: "",
      baseNotes: "",
      notes: "",
      scentFamily: "",
      longevity: "",
      sillage: "",
      season: "",
      productType: "",
      region: "",
      occasion: "",
      oudType: "",
      collection: "",
      enableWhatsapp: false,
      whatsappNumber: "",
      coinsToAward: 0,
      metaTitle: "",
      metaDescription: "",
      isActive: true,
      isFeatured: false,
    },
  })

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.get<any[]>('/categories'),
  })

  // Fetch brands
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: () => apiClient.get<any[]>('/brands'),
  })

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    form.setValue('name', value)
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    form.setValue('slug', slug)
  }

  const onSubmit = async (data: CreateProductInput) => {
    console.log('Form submitted with data:', data)
    setIsLoading(true)
    try {
      const response = await apiClient.post<any>('/products', data)
      toast.success("Product created successfully!")
      router.push('/vendor/products')
    } catch (error: any) {
      console.error('Create product error:', error)
      toast.error(error?.response?.data?.message || "Failed to create product")
    } finally {
      setIsLoading(false)
    }
  }

  const onError = (errors: any) => {
    console.log('Form validation errors:', errors)
    toast.error("Please fill in all required fields correctly")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/vendor/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">
            Fill in the product details below
          </p>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-7">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="scent">Scent</TabsTrigger>
                  <TabsTrigger value="specs">Specs</TabsTrigger>
                  <TabsTrigger value="classification">Class</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                {/* Tab 1: Basic Info */}
                <TabsContent value="basic">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>
                        Enter the product name, description, category, and brand
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name (English) *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Oud Royale 100ml"
                                {...field}
                                onChange={(e) => handleNameChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nameAr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name (Arabic)</FormLabel>
                            <FormControl>
                              <Input placeholder="اسم المنتج" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL Slug *</FormLabel>
                            <FormControl>
                              <Input placeholder="oud-royale-100ml" {...field} />
                            </FormControl>
                            <FormDescription>
                              Auto-generated from product name. You can customize it.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (English) *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the product..."
                                rows={5}
                                {...field}
                              />
                            </FormControl>
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
                                placeholder="وصف المنتج"
                                rows={5}
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
                          name="categoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories?.map((category: any) => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="brandId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Brand</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select brand" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {brands?.map((brand: any) => (
                                    <SelectItem key={brand.id} value={brand.id}>
                                      {brand.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 2: Media */}
                <TabsContent value="media">
                  <Card>
                    <CardHeader>
                      <CardTitle>Media</CardTitle>
                      <CardDescription>
                        Add product images and videos (up to 8 images, 3 videos)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Image upload feature coming soon
                        </p>
                        <p className="text-xs text-muted-foreground">
                          For now, you can add image URLs manually after creating the product
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="video"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://youtube.com/..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              YouTube, Vimeo, or direct video URL
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 3: Pricing & Inventory */}
                <TabsContent value="pricing">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing & Inventory</CardTitle>
                      <CardDescription>
                        Set prices, stock levels, and SKU
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (AED) *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="99.99"
                                  {...field}
                                  value={field.value || ''}
                                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="compareAtPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Compare at Price (AED)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="149.99"
                                  {...field}
                                  value={field.value || ''}
                                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormDescription>
                                Original price for showing discount
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost per Item (AED)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="50.00"
                                {...field}
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                              />
                            </FormControl>
                            <FormDescription>
                              Your cost (for profit calculation, not shown to customers)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="sku"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SKU *</FormLabel>
                              <FormControl>
                                <Input placeholder="OUD-ROY-100" {...field} />
                              </FormControl>
                              <FormDescription>
                                Stock Keeping Unit
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="barcode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Barcode</FormLabel>
                              <FormControl>
                                <Input placeholder="123456789012" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock Quantity *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="100"
                                  {...field}
                                  value={field.value || ''}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lowStockAlert"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Low Stock Alert</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="10"
                                  {...field}
                                  value={field.value || ''}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormDescription>
                                Get notified when stock falls below this
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 4: Scent Profile */}
                <TabsContent value="scent">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scent Profile</CardTitle>
                      <CardDescription>
                        Detailed fragrance characteristics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="topNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Top Notes</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Bergamot, Lemon, Orange" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="heartNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heart Notes</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Rose, Jasmine, Lavender" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="baseNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Notes</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Oud, Musk, Amber" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional scent characteristics..."
                                rows={3}
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
                          name="scentFamily"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Scent Family</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select family" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="woody">Woody</SelectItem>
                                  <SelectItem value="floral">Floral</SelectItem>
                                  <SelectItem value="oriental">Oriental</SelectItem>
                                  <SelectItem value="fresh">Fresh</SelectItem>
                                  <SelectItem value="citrus">Citrus</SelectItem>
                                  <SelectItem value="spicy">Spicy</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="season"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Best Season</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select season" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="spring">Spring</SelectItem>
                                  <SelectItem value="summer">Summer</SelectItem>
                                  <SelectItem value="autumn">Autumn</SelectItem>
                                  <SelectItem value="winter">Winter</SelectItem>
                                  <SelectItem value="all">All Seasons</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="longevity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Longevity</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="How long it lasts" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="weak">Weak (1-2 hours)</SelectItem>
                                  <SelectItem value="moderate">Moderate (3-5 hours)</SelectItem>
                                  <SelectItem value="long-lasting">Long Lasting (6-8 hours)</SelectItem>
                                  <SelectItem value="very-long-lasting">Very Long Lasting (8+ hours)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sillage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sillage (Projection)</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Scent trail strength" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="intimate">Intimate</SelectItem>
                                  <SelectItem value="moderate">Moderate</SelectItem>
                                  <SelectItem value="strong">Strong</SelectItem>
                                  <SelectItem value="enormous">Enormous</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 5: Specifications */}
                <TabsContent value="specs">
                  <Card>
                    <CardHeader>
                      <CardTitle>Specifications</CardTitle>
                      <CardDescription>
                        Size, concentration, and other product specs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 100ml, 50ml, 3ml" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="concentration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Concentration</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select concentration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="parfum">Parfum (20-30%)</SelectItem>
                                <SelectItem value="edp">Eau de Parfum (15-20%)</SelectItem>
                                <SelectItem value="edt">Eau de Toilette (5-15%)</SelectItem>
                                <SelectItem value="edc">Eau de Cologne (2-4%)</SelectItem>
                                <SelectItem value="attar">Attar (Pure Oil)</SelectItem>
                                <SelectItem value="oud">Oud</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="unisex">Unisex</SelectItem>
                                <SelectItem value="men">Men</SelectItem>
                                <SelectItem value="women">Women</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 6: Classification (Phase 2) */}
                <TabsContent value="classification">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Classification</CardTitle>
                      <CardDescription>
                        Classify your product for better discoverability by customers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Product Type */}
                      <FormField
                        control={form.control}
                        name="productType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ORIGINAL">Original</SelectItem>
                                <SelectItem value="CLONE">Clone</SelectItem>
                                <SelectItem value="SIMILAR_DNA">Similar DNA</SelectItem>
                                <SelectItem value="NICHE">Niche</SelectItem>
                                <SelectItem value="ATTAR">Attar</SelectItem>
                                <SelectItem value="BODY_SPRAY">Body Spray</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              What type of fragrance is this?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Region */}
                      <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Origin Region</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="UAE">UAE</SelectItem>
                                <SelectItem value="SAUDI">Saudi Arabia</SelectItem>
                                <SelectItem value="KUWAIT">Kuwait</SelectItem>
                                <SelectItem value="QATAR">Qatar</SelectItem>
                                <SelectItem value="OMAN">Oman</SelectItem>
                                <SelectItem value="BAHRAIN">Bahrain</SelectItem>
                                <SelectItem value="FRANCE">France</SelectItem>
                                <SelectItem value="ITALY">Italy</SelectItem>
                                <SelectItem value="UK">United Kingdom</SelectItem>
                                <SelectItem value="USA">United States</SelectItem>
                                <SelectItem value="INDIA">India</SelectItem>
                                <SelectItem value="THAILAND">Thailand</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Where is this fragrance from?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Occasion */}
                      <FormField
                        control={form.control}
                        name="occasion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Suitable Occasions</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., OFFICE,DAILY,PARTY,WEDDING,RAMADAN,EID"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Comma-separated list of occasions (OFFICE, DAILY, PARTY, WEDDING, RAMADAN, EID)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Oud Type (if applicable) */}
                      <FormField
                        control={form.control}
                        name="oudType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Oud Type (if applicable)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select oud type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="CAMBODIAN">Cambodian Oud</SelectItem>
                                <SelectItem value="INDIAN">Indian Oud</SelectItem>
                                <SelectItem value="THAI">Thai Oud</SelectItem>
                                <SelectItem value="MALAYSIAN">Malaysian Oud</SelectItem>
                                <SelectItem value="LAOTIAN">Laotian Oud</SelectItem>
                                <SelectItem value="MUKHALLAT">Mukhallat</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Leave empty if product doesn't contain oud
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Collection */}
                      <FormField
                        control={form.control}
                        name="collection"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Collection</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select collection" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="RAMADAN">Ramadan Collection</SelectItem>
                                <SelectItem value="SIGNATURE">Signature Collection</SelectItem>
                                <SelectItem value="CELEBRITY">Celebrity Collection</SelectItem>
                                <SelectItem value="MOST_LOVED">Most Loved</SelectItem>
                                <SelectItem value="TRENDING">Trending Now</SelectItem>
                                <SelectItem value="EXCLUSIVE">Exclusive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Which special collection does this belong to?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 7: Advanced */}
                <TabsContent value="advanced">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Settings</CardTitle>
                      <CardDescription>
                        WhatsApp integration, SEO, and rewards
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* WhatsApp */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">WhatsApp Integration</h3>
                        <FormField
                          control={form.control}
                          name="enableWhatsapp"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Enable WhatsApp Orders</FormLabel>
                                <FormDescription>
                                  Allow customers to order this product via WhatsApp
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        {form.watch('enableWhatsapp') && (
                          <FormField
                            control={form.control}
                            name="whatsappNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>WhatsApp Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+971501234567" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Include country code (e.g., +971 for UAE)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {/* Coins System */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Rewards</h3>
                        <FormField
                          control={form.control}
                          name="coinsToAward"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coins to Award</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="10"
                                  {...field}
                                  value={field.value || ''}
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                                />
                              </FormControl>
                              <FormDescription>
                                Reward coins customers earn when purchasing this product
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* SEO */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">SEO Settings</h3>
                        <FormField
                          control={form.control}
                          name="metaTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Title</FormLabel>
                              <FormControl>
                                <Input placeholder="SEO title for search engines" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="metaDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="SEO description for search engines"
                                  rows={3}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Visibility */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Visibility</h3>
                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Active</FormLabel>
                                <FormDescription>
                                  Make this product visible to customers
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isFeatured"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Featured</FormLabel>
                                <FormDescription>
                                  Show this product in featured sections
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => console.log('Submit button clicked', form.formState.errors)}
                  >
                    {isLoading ? "Creating..." : "Create Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/vendor/products">Cancel</Link>
                  </Button>

                  {/* Debug Info */}
                  {Object.keys(form.formState.errors).length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm font-semibold text-red-800 mb-2">
                        Validation Errors:
                      </p>
                      <ul className="text-xs text-red-700 space-y-1">
                        {Object.entries(form.formState.errors).map(([field, error]: [string, any]) => (
                          <li key={field}>
                            <strong>{field}:</strong> {error.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
