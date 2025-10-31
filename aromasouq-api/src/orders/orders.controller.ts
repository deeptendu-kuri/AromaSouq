import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, OrderStatus } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(
    @Req() req: Request,
    @Query('orderStatus') orderStatus?: OrderStatus,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user!['sub'];
    return this.ordersService.findAll(userId, {
      orderStatus,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user!['sub'];
    return this.ordersService.findOne(userId, id);
  }

  @Post()
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user!['sub'];
    return this.ordersService.create(userId, createOrderDto);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }

  @Post(':id/cancel')
  cancel(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user!['sub'];
    return this.ordersService.cancel(userId, id);
  }
}
