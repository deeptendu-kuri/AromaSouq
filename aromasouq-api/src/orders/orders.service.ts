import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponsService: CouponsService,
  ) {}

  async findAll(
    userId: string,
    params?: {
      orderStatus?: OrderStatus;
      page?: number;
      limit?: number;
    },
  ) {
    const { orderStatus, page = 1, limit = 20 } = params || {};

    const where: any = { userId };
    if (orderStatus) where.orderStatus = orderStatus;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  nameAr: true,
                  images: true,
                },
              },
            },
          },
          address: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
          },
        },
        address: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.userId !== userId) {
      throw new BadRequestException('Order does not belong to user');
    }

    return order;
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const { addressId, paymentMethod, coinsToUse = 0, couponCode } = createOrderDto;

    // Verify address belongs to user
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    if (address.userId !== userId) {
      throw new BadRequestException('Address does not belong to user');
    }

    // Get user's cart
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] = [];

    for (const item of cart.items) {
      const price = item.variant?.price || item.product.price;
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price,
      });
    }

    // Validate and apply coupon if provided
    let couponDiscount = 0;
    let couponId: string | null = null;

    if (couponCode) {
      const couponValidation = await this.couponsService.validate({
        code: couponCode,
        orderAmount: subtotal,
      });

      couponDiscount = couponValidation.discountAmount;
      couponId = couponValidation.coupon.id;
    }

    // Calculate tax and shipping (simplified for MVP)
    const tax = subtotal * 0.05; // 5% tax
    const shippingFee = subtotal > 200 ? 0 : 25; // Free shipping over 200 AED

    // Handle coins usage
    let coinsDiscount = 0;
    let coinsUsed = 0;

    if (coinsToUse > 0) {
      // Get user's available coins
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
    }

      if (user.coinsBalance < coinsToUse) {
        throw new BadRequestException('Insufficient coins balance');
      }

      // 1 coin = 1 AED discount, maximum 50% of subtotal after coupon
      const maxCoinsDiscount = (subtotal - couponDiscount) * 0.5;
      coinsDiscount = Math.min(coinsToUse, maxCoinsDiscount);
      coinsUsed = Math.floor(coinsDiscount); // Round down to whole coins
    }

    // Total discount = coupon discount + coins discount
    const totalDiscount = couponDiscount + coinsDiscount;
    const total = subtotal + tax + shippingFee - totalDiscount;

    // Calculate coins to earn (1 coin per 10 AED spent)
    const coinsEarned = Math.floor(total / 10);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with items in a transaction
    const order = await this.prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId,
          paymentMethod,
          subtotal,
          tax,
          shippingFee,
          discount: totalDiscount,
          total,
          coinsUsed,
          coinsEarned,
          couponId,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          address: true,
          coupon: true,
        },
      });

      // Update user's coins if coins were used
      if (coinsUsed > 0) {
        await tx.user.update({
          where: { id: userId },
          data: {
            coinsBalance: {
              decrement: coinsUsed,
            },
          },
        });
      }

      // Increment coupon usage count if coupon was used
      if (couponId) {
        await tx.coupon.update({
          where: { id: couponId },
          data: {
            usageCount: {
              increment: 1,
            },
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    return order;
  }

  async updateStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const { orderStatus, trackingNumber } = updateOrderStatusDto;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
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
        updateData.cancelledAt = new Date();
        updateData.paymentStatus = PaymentStatus.REFUNDED;
        // Refund coins if used
        if (order.coinsUsed > 0) {
          await this.prisma.user.update({
            where: { id: order.userId },
            data: {
              coinsBalance: {
                increment: order.coinsUsed,
              },
            },
          });
        }
        break;
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
    });

    return updatedOrder;
  }

  async cancel(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.userId !== userId) {
      throw new BadRequestException('Order does not belong to user');
    }

    // Can only cancel pending or confirmed orders
    if (
      order.orderStatus !== OrderStatus.PENDING &&
      order.orderStatus !== OrderStatus.CONFIRMED
    ) {
      throw new BadRequestException(
        `Cannot cancel order with status ${order.orderStatus}`,
      );
    }

    return this.updateStatus(orderId, {
      orderStatus: OrderStatus.CANCELLED,
    });
  }
}
