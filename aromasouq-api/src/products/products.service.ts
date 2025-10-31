import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    categoryId?: string;
    categorySlug?: string;
    brandId?: string;
    vendorId?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    gender?: string;
    concentration?: string;
    scentFamily?: string;
    season?: string;
    isFeatured?: boolean;
    isActive?: boolean;
    sortBy?: 'price' | 'createdAt' | 'name';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const {
      categoryId,
      categorySlug,
      brandId,
      vendorId,
      search,
      minPrice,
      maxPrice,
      gender,
      concentration,
      scentFamily,
      season,
      isFeatured,
      isActive = true,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = params || {};

    const where: any = {
      isActive,
    };

    // Support filtering by category ID or slug
    if (categoryId) {
      where.categoryId = categoryId;
    } else if (categorySlug) {
      // Find category by slug first
      const category = await this.prisma.category.findUnique({
        where: { slug: categorySlug },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    if (brandId) where.brandId = brandId;
    if (vendorId) where.vendorId = vendorId;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;
    if (gender) where.gender = gender;
    if (concentration) where.concentration = concentration;
    if (scentFamily) where.scentFamily = scentFamily;
    if (season) where.season = season;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameAr: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              nameAr: true,
              slug: true,
            },
          },
          brand: {
            select: {
              id: true,
              name: true,
              nameAr: true,
              slug: true,
              logo: true,
            },
          },
          vendor: {
            select: {
              id: true,
              businessName: true,
              businessNameAr: true,
              businessEmail: true,
              businessPhone: true,
            },
          },
          variants: {
            where: { isActive: true },
          },
          videos: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    // Transform products to match frontend expectations
    const transformedProducts = products.map(product => this.transformProduct(product));

    return {
      data: transformedProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            slug: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            slug: true,
            logo: true,
          },
        },
        vendor: {
          select: {
            id: true,
            businessName: true,
            businessNameAr: true,
            businessEmail: true,
            businessPhone: true,
          },
        },
        variants: {
          where: { isActive: true },
        },
        videos: true,
        reviews: {
          where: { isPublished: true },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            reviewImages: true,
            _count: {
              select: { votes: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.transformProduct(product);
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            slug: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            slug: true,
            logo: true,
          },
        },
        vendor: {
          select: {
            id: true,
            businessName: true,
            businessNameAr: true,
            businessEmail: true,
            businessPhone: true,
          },
        },
        variants: {
          where: { isActive: true },
        },
        videos: true,
        reviews: {
          where: { isPublished: true },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            reviewImages: true,
            _count: {
              select: { votes: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return this.transformProduct(product);
  }

  async create(
    userId: string,
    userRole: UserRole,
    createProductDto: CreateProductDto,
  ) {
    // Check slug uniqueness
    const existingProduct = await this.prisma.product.findUnique({
      where: { slug: createProductDto.slug },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Product with slug ${createProductDto.slug} already exists`,
      );
    }

    // Verify category exists
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new BadRequestException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }

    // Verify brand exists if provided
    if (createProductDto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: createProductDto.brandId },
      });

      if (!brand) {
        throw new BadRequestException(
          `Brand with ID ${createProductDto.brandId} not found`,
        );
      }
    }

    // Auto-inject vendorId based on user role
    let vendorId: string;

    if (userRole === UserRole.ADMIN) {
      // Admin can create products for any vendor
      if (!createProductDto.vendorId) {
        throw new BadRequestException(
          'Admin must specify vendorId when creating products',
        );
      }
      vendorId = createProductDto.vendorId;

      // Verify vendor exists
      const vendor = await this.prisma.vendor.findUnique({
        where: { id: vendorId },
      });

      if (!vendor) {
        throw new BadRequestException(
          `Vendor with ID ${vendorId} not found`,
        );
      }
    } else {
      // Vendor creates product for themselves
      const vendor = await this.prisma.vendor.findUnique({
        where: { userId },
      });

      if (!vendor) {
        throw new ForbiddenException(
          'Vendor profile not found. Please create a vendor profile first.',
        );
      }

      if (vendor.status !== 'APPROVED') {
        throw new ForbiddenException(
          `Cannot create products. Vendor status is: ${vendor.status}`,
        );
      }

      vendorId = vendor.id;
    }

    // Remove vendorId from DTO to prevent client manipulation
    const { vendorId: _, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,
        vendorId, // Use the auto-injected/validated vendorId
      },
      include: {
        category: true,
        brand: true,
        vendor: {
          select: {
            id: true,
            businessName: true,
            businessNameAr: true,
            businessEmail: true,
            businessPhone: true,
          },
        },
      },
    });
  }

  async update(
    userId: string,
    userRole: UserRole,
    productId: string,
    updateProductDto: UpdateProductDto,
  ) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // OWNERSHIP CHECK - Vendors can only update their own products
    if (userRole === UserRole.VENDOR) {
      const vendor = await this.prisma.vendor.findUnique({
        where: { userId },
      });

      if (!vendor) {
        throw new ForbiddenException('Vendor profile not found');
      }

      if (product.vendorId !== vendor.id) {
        throw new ForbiddenException(
          'You can only update your own products',
        );
      }

      // Prevent vendor from changing vendorId
      delete updateProductDto.vendorId;
    }

    // Check slug uniqueness if slug is being updated
    if (updateProductDto.slug && updateProductDto.slug !== product.slug) {
      const existingProduct = await this.prisma.product.findUnique({
        where: { slug: updateProductDto.slug },
      });

      if (existingProduct) {
        throw new ConflictException(
          `Product with slug ${updateProductDto.slug} already exists`,
        );
      }
    }

    // Verify category exists if being updated
    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId },
      });

      if (!category) {
        throw new BadRequestException(
          `Category with ID ${updateProductDto.categoryId} not found`,
        );
      }
    }

    // Verify brand exists if being updated
    if (updateProductDto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: updateProductDto.brandId },
      });

      if (!brand) {
        throw new BadRequestException(
          `Brand with ID ${updateProductDto.brandId} not found`,
        );
      }
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto,
      include: {
        category: true,
        brand: true,
        vendor: {
          select: {
            id: true,
            businessName: true,
            businessNameAr: true,
            businessEmail: true,
            businessPhone: true,
          },
        },
      },
    });
  }

  async remove(userId: string, userRole: UserRole, productId: string) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // OWNERSHIP CHECK - Vendors can only delete their own products
    if (userRole === UserRole.VENDOR) {
      const vendor = await this.prisma.vendor.findUnique({
        where: { userId },
      });

      if (!vendor) {
        throw new ForbiddenException('Vendor profile not found');
      }

      if (product.vendorId !== vendor.id) {
        throw new ForbiddenException(
          'You can only delete your own products',
        );
      }
    }

    // Soft delete by setting isActive to false
    return this.prisma.product.update({
      where: { id: productId },
      data: { isActive: false },
    });
  }

  async updateStock(
    userId: string,
    userRole: UserRole,
    productId: string,
    quantity: number,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // OWNERSHIP CHECK - Vendors can only update stock for their own products
    if (userRole === UserRole.VENDOR) {
      const vendor = await this.prisma.vendor.findUnique({
        where: { userId },
      });

      if (!vendor) {
        throw new ForbiddenException('Vendor profile not found');
      }

      if (product.vendorId !== vendor.id) {
        throw new ForbiddenException(
          'You can only update stock for your own products',
        );
      }
    }

    const newStock = product.stock + quantity;

    if (newStock < 0) {
      throw new BadRequestException('Insufficient stock');
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: { stock: newStock },
    });
  }

  async getFeaturedProducts(limit: number = 10) {
    const products = await this.prisma.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            slug: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            slug: true,
            logo: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return products.map(product => this.transformProduct(product));
  }

  /**
   * Transform product from database format to frontend format
   */
  private transformProduct(product: any) {
    return {
      ...product,
      // Map field names to match frontend expectations
      nameEn: product.name,
      descriptionEn: product.description,
      regularPrice: product.price,
      salePrice: product.compareAtPrice,
      stockQuantity: product.stock,
      lowStockThreshold: product.lowStockAlert,
      // Transform images from String[] to ProductImage[]
      images: product.images?.map((url: string, index: number) => ({
        id: `${product.id}-img-${index}`,
        productId: product.id,
        url,
        altText: product.name,
        position: index,
        isFeatured: index === 0,
      })) || [],
      // Ensure rating fields exist
      rating: product.averageRating || 0,
      // Transform category/brand names
      category: product.category ? {
        ...product.category,
        nameEn: product.category.name,
      } : undefined,
      brand: product.brand ? {
        ...product.brand,
        nameEn: product.brand.name,
      } : undefined,
    };
  }

  // ============================================================================
  // PRODUCT VARIANTS
  // ============================================================================

  async createVariant(
    userId: string,
    userRole: UserRole,
    productId: string,
    createVariantDto: CreateVariantDto,
  ) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product with ID ${productId} not found`);

    if (userRole === UserRole.VENDOR) {
      const vendor = await this.prisma.vendor.findUnique({ where: { userId } });
      if (!vendor) throw new ForbiddenException('Vendor profile not found');
      if (product.vendorId !== vendor.id) {
        throw new ForbiddenException('You can only create variants for your own products');
      }
    }

    const existingVariant = await this.prisma.productVariant.findUnique({
      where: { sku: createVariantDto.sku },
    });
    if (existingVariant) {
      throw new ConflictException(`Variant with SKU ${createVariantDto.sku} already exists`);
    }

    return this.prisma.productVariant.create({
      data: {
        ...createVariantDto,
        productId,
      },
    });
  }

  async getVariants(productId: string) {
    return this.prisma.productVariant.findMany({
      where: { productId, isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async updateVariant(
    userId: string,
    userRole: UserRole,
    variantId: string,
    updateVariantDto: UpdateVariantDto,
  ) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });
    if (!variant) throw new NotFoundException(`Variant with ID ${variantId} not found`);

    if (userRole === UserRole.VENDOR) {
      const vendor = await this.prisma.vendor.findUnique({ where: { userId } });
      if (!vendor) throw new ForbiddenException('Vendor profile not found');
      if (variant.product.vendorId !== vendor.id) {
        throw new ForbiddenException('You can only update variants for your own products');
      }
    }

    if (updateVariantDto.sku && updateVariantDto.sku !== variant.sku) {
      const existingVariant = await this.prisma.productVariant.findUnique({
        where: { sku: updateVariantDto.sku },
      });
      if (existingVariant) {
        throw new ConflictException(`Variant with SKU ${updateVariantDto.sku} already exists`);
      }
    }

    return this.prisma.productVariant.update({
      where: { id: variantId },
      data: updateVariantDto,
    });
  }

  async deleteVariant(userId: string, userRole: UserRole, variantId: string) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });
    if (!variant) throw new NotFoundException(`Variant with ID ${variantId} not found`);

    if (userRole === UserRole.VENDOR) {
      const vendor = await this.prisma.vendor.findUnique({ where: { userId } });
      if (!vendor) throw new ForbiddenException('Vendor profile not found');
      if (variant.product.vendorId !== vendor.id) {
        throw new ForbiddenException('You can only delete variants for your own products');
      }
    }

    return this.prisma.productVariant.update({
      where: { id: variantId },
      data: { isActive: false },
    });
  }
}
