import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { UpdateOrderStatusDto } from '../orders/dto/update-order-status.dto';
import { VendorStatus, UserRole, OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class VendorService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create vendor profile for a user
   * Called after user registration with role=VENDOR
   */
  async create(userId: string, createVendorDto: CreateVendorDto) {
    // Check if user exists and has VENDOR role
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { vendorProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.VENDOR) {
      throw new ForbiddenException('User must have VENDOR role');
    }

    if (user.vendorProfile) {
      throw new ConflictException('Vendor profile already exists for this user');
    }

    // Create vendor profile
    const vendor = await this.prisma.vendor.create({
      data: {
        userId,
        businessName: createVendorDto.businessName,
        businessEmail: createVendorDto.businessEmail,
        businessPhone: createVendorDto.businessPhone,
        businessNameAr: createVendorDto.businessNameAr,
        description: createVendorDto.description,
        descriptionAr: createVendorDto.descriptionAr,
        tradeLicense: createVendorDto.tradeLicense,
        taxNumber: createVendorDto.taxNumber,
        website: createVendorDto.website,
        instagramUrl: createVendorDto.instagramUrl,
        facebookUrl: createVendorDto.facebookUrl,
        twitterUrl: createVendorDto.twitterUrl,
        whatsappNumber: createVendorDto.whatsappNumber,
        status: VendorStatus.PENDING, // Requires admin approval
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
          },
        },
      },
    });

    return vendor;
  }

  /**
   * Get vendor profile by userId
   */
  async getByUserId(userId: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true,
            role: true,
            status: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    return vendor;
  }

  /**
   * Update vendor profile
   */
  async update(userId: string, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    if (vendor.status === VendorStatus.SUSPENDED) {
      throw new ForbiddenException('Cannot update suspended vendor profile');
    }

    return this.prisma.vendor.update({
      where: { userId },
      data: updateVendorDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  /**
   * Get vendor dashboard statistics
   */
  async getDashboardStats(userId: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    // Get all products for this vendor
    const products = await this.prisma.product.findMany({
      where: { vendorId: vendor.id },
      select: {
        id: true,
        name: true,
        sku: true,
        stock: true,
        price: true,
        salesCount: true,
        averageRating: true,
        reviewCount: true,
        isActive: true,
        lowStockAlert: true,
      },
    });

    const productIds = products.map((p) => p.id);

    // Get orders containing vendor's products
    const orders = await this.prisma.order.findMany({
      where: {
        items: {
          some: {
            productId: { in: productIds },
          },
        },
      },
      include: {
        items: {
          where: {
            productId: { in: productIds },
          },
          include: {
            product: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Get last 100 orders for calculations
    });

    // Calculate statistics
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.isActive).length;
    const lowStockProducts = products.filter(
      (p) => p.stock <= p.lowStockAlert && p.stock > 0,
    );

    const totalSales = orders.reduce((sum, order) => {
      const vendorItemsTotal = order.items.reduce(
        (itemSum, item) => itemSum + item.price * item.quantity,
        0,
      );
      return sum + vendorItemsTotal;
    }, 0);

    const pendingOrders = orders.filter((o) => o.orderStatus === 'PENDING').length;
    const totalOrders = orders.length;

    const avgRating =
      totalProducts > 0
        ? products.reduce((sum, p) => sum + p.averageRating, 0) / totalProducts
        : 0;
    const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);

    // Top selling products
    const topProducts = [...products]
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        salesCount: p.salesCount,
        revenue: p.price * p.salesCount,
        stockQuantity: p.stock,
      }));

    // Recent orders mapped to vendor's items
    const recentOrders = orders.slice(0, 5).map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: `${order.user.firstName} ${order.user.lastName}`,
      customerEmail: order.user.email,
      total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: order.orderStatus,
      createdAt: order.createdAt,
    }));

    return {
      totalSales,
      salesGrowth: 0, // TODO: Calculate vs last month
      productCount: totalProducts,
      activeProducts,
      orderCount: totalOrders,
      pendingOrders,
      avgRating: parseFloat(avgRating.toFixed(1)),
      totalReviews,
      topProducts,
      recentOrders,
      lowStockProducts: lowStockProducts.map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        stockQuantity: p.stock,
      })),
    };
  }

  /**
   * Get vendor's products with filters
   */
  async getProducts(userId: string, params?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    const { search, status, page = 1, limit = 20 } = params || {};
    const skip = (page - 1) * limit;

    const where: any = {
      vendorId: vendor.id,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status && status !== 'all') {
      where.isActive = status === 'active';
    }

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
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get vendor's orders
   */
  async getOrders(userId: string, params?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    // Get all product IDs for this vendor
    const products = await this.prisma.product.findMany({
      where: { vendorId: vendor.id },
      select: { id: true },
    });

    const productIds = products.map((p) => p.id);

    const { search, status, page = 1, limit = 20 } = params || {};
    const skip = (page - 1) * limit;

    const where: any = {
      items: {
        some: {
          productId: { in: productIds },
        },
      },
    };

    if (status && status !== 'all') {
      where.orderStatus = status;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: {
            where: {
              productId: { in: productIds },
            },
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    // Calculate vendor-specific totals for each order
    const ordersWithVendorTotal = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: `${order.user.firstName} ${order.user.lastName}`,
      customerEmail: order.user.email,
      itemCount: order.items.length,
      total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: order.orderStatus,
      createdAt: order.createdAt,
      items: order.items,
    }));

    return {
      data: ordersWithVendorTotal,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single order details (vendors can only view orders containing their products)
   */
  async getOrder(userId: string, orderId: string) {
    // Get vendor profile
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    // Get all product IDs for this vendor
    const products = await this.prisma.product.findMany({
      where: { vendorId: vendor.id },
      select: { id: true },
    });

    const productIds = products.map((p) => p.id);

    // Get the order and verify it contains vendor's products
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          where: {
            productId: { in: productIds },
          },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        address: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.items.length === 0) {
      throw new ForbiddenException(
        'This order does not contain any of your products',
      );
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: `${order.user.firstName} ${order.user.lastName}`,
      customerEmail: order.user.email,
      itemCount: order.items.length,
      total: order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      status: order.orderStatus,
      createdAt: order.createdAt,
      items: order.items,
      address: order.address,
      trackingNumber: order.trackingNumber,
    };
  }

  /**
   * Update order status (vendors can only update orders containing their products)
   */
  async updateOrderStatus(
    userId: string,
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const { orderStatus, trackingNumber } = updateOrderStatusDto;

    // Get vendor profile
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }

    // Get all product IDs for this vendor
    const products = await this.prisma.product.findMany({
      where: { vendorId: vendor.id },
      select: { id: true },
    });

    const productIds = products.map((p) => p.id);

    // Get the order and verify it contains vendor's products
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          where: {
            productId: { in: productIds },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.items.length === 0) {
      throw new ForbiddenException(
        'This order does not contain any of your products',
      );
    }

    // Prepare update data
    const updateData: any = { orderStatus };

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    // Set timestamp fields based on status
    switch (orderStatus) {
      case OrderStatus.CONFIRMED:
        updateData.confirmedAt = new Date();
        updateData.paymentStatus = PaymentStatus.PAID;
        break;
      case OrderStatus.PROCESSING:
        // No specific timestamp for processing
        break;
      case OrderStatus.SHIPPED:
        updateData.shippedAt = new Date();
        break;
      case OrderStatus.DELIVERED:
        updateData.deliveredAt = new Date();
        // Award coins to user when order is delivered
        await this.prisma.user.update({
          where: { id: order.userId },
          data: {
            coinsBalance: {
              increment: order.coinsEarned,
            },
          },
        });
        break;
      case OrderStatus.CANCELLED:
        throw new BadRequestException(
          'Vendors cannot cancel orders. Please contact customer support.',
        );
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        items: {
          where: {
            productId: { in: productIds },
          },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return {
      id: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber,
      customerName: `${updatedOrder.user.firstName} ${updatedOrder.user.lastName}`,
      customerEmail: updatedOrder.user.email,
      itemCount: updatedOrder.items.length,
      total: updatedOrder.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      status: updatedOrder.orderStatus,
      createdAt: updatedOrder.createdAt,
      items: updatedOrder.items,
    };
  }
}
