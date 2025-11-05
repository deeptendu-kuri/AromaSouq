'use client'

import React, { useState } from 'react'
import { useBrands, Brand, CreateBrandDto } from '@/hooks/admin/use-brands'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Plus, Store } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
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

export default function AdminBrandsPage() {
  const { brands, isLoading, createBrand, updateBrand, deleteBrand, toggleStatus } = useBrands()

  const [showDialog, setShowDialog] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null)

  const [formData, setFormData] = useState<CreateBrandDto>({
    name: '',
    nameAr: '',
    slug: '',
    description: '',
    descriptionAr: '',
    logo: '',
    banner: '',
    isActive: true,
  })

  // Generate slug from name
  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingBrand) {
      updateBrand(
        { id: editingBrand.id, data: formData },
        {
          onSuccess: () => {
            setShowDialog(false)
            resetForm()
          },
        }
      )
    } else {
      createBrand(formData, {
        onSuccess: () => {
          setShowDialog(false)
          resetForm()
        },
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      slug: '',
      description: '',
      descriptionAr: '',
      logo: '',
      banner: '',
      isActive: true,
    })
    setEditingBrand(null)
  }

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand)
    setFormData({
      name: brand.name,
      nameAr: brand.nameAr || '',
      slug: brand.slug,
      description: brand.description || '',
      descriptionAr: brand.descriptionAr || '',
      logo: brand.logo || '',
      banner: brand.banner || '',
      isActive: brand.isActive,
    })
    setShowDialog(true)
  }

  const handleDeleteClick = (brand: Brand) => {
    setBrandToDelete(brand)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (brandToDelete) {
      deleteBrand(brandToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false)
          setBrandToDelete(null)
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p>Loading brands...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Brand Management</h1>
          <p className="text-gray-600 mt-2">Manage perfume brands and their details</p>
        </div>
        <Button onClick={() => {
          resetForm()
          setShowDialog(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          New Brand
        </Button>
      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                  No brands yet. Create your first brand to get started.
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <Store className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{brand.name}</div>
                        {brand.nameAr && (
                          <div className="text-sm text-gray-500" dir="rtl">{brand.nameAr}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{brand.slug}</code>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{brand._count?.products || 0}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={brand.isActive}
                      onCheckedChange={(checked) => toggleStatus({ id: brand.id, isActive: checked })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 justify-center">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(brand)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(brand)}
                        disabled={(brand._count?.products || 0) > 0}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingBrand ? 'Edit Brand' : 'Create New Brand'}</DialogTitle>
            <DialogDescription>
              {editingBrand ? 'Update brand information' : 'Add a new perfume brand'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Name (English) */}
              <div className="col-span-2">
                <Label htmlFor="name">Brand Name (English) *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  placeholder="e.g., Dior, Chanel, Arabian Oud"
                />
              </div>

              {/* Name (Arabic) */}
              <div className="col-span-2">
                <Label htmlFor="nameAr">Brand Name (Arabic)</Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                  placeholder="ديور، شانيل، العربية للعود"
                  dir="rtl"
                />
              </div>

              {/* Slug */}
              <div className="col-span-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  placeholder="dior, chanel, arabian-oud"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL-friendly identifier (auto-generated from name)
                </p>
              </div>

              {/* Description (English) */}
              <div className="col-span-2">
                <Label htmlFor="description">Description (English)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brand description..."
                  rows={3}
                />
              </div>

              {/* Description (Arabic) */}
              <div className="col-span-2">
                <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                <Textarea
                  id="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                  placeholder="وصف العلامة التجارية..."
                  rows={3}
                  dir="rtl"
                />
              </div>

              {/* Logo URL */}
              <div className="col-span-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                />
                {formData.logo && (
                  <div className="mt-2">
                    <img src={formData.logo} alt="Logo preview" className="h-16 object-contain" />
                  </div>
                )}
              </div>

              {/* Banner URL */}
              <div className="col-span-2">
                <Label htmlFor="banner">Banner URL</Label>
                <Input
                  id="banner"
                  value={formData.banner}
                  onChange={(e) => setFormData(prev => ({ ...prev, banner: e.target.value }))}
                  placeholder="https://example.com/banner.jpg"
                />
                {formData.banner && (
                  <div className="mt-2">
                    <img src={formData.banner} alt="Banner preview" className="w-full h-24 object-cover rounded" />
                  </div>
                )}
              </div>

              {/* Active Status */}
              <div className="col-span-2 flex items-center gap-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingBrand ? 'Update' : 'Create'} Brand
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Brand</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{brandToDelete?.name}"?
              {(brandToDelete?._count?.products || 0) > 0 && (
                <span className="block mt-2 text-red-600">
                  This brand has {brandToDelete?._count?.products} products associated with it.
                  Delete or reassign products first.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
