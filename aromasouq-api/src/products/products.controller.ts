import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('category') categorySlug?: string,
    @Query('brandId') brandId?: string,
    @Query('vendorId') vendorId?: string,
    @Query('search') search?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('gender') gender?: string,
    @Query('concentration') concentration?: string,
    @Query('scentFamily') scentFamily?: string,
    @Query('season') season?: string,
    @Query('isFeatured') isFeatured?: string,
    @Query('isActive') isActive?: string,
    @Query('sortBy') sortBy?: 'price' | 'createdAt' | 'name',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productsService.findAll({
      categoryId,
      categorySlug,
      brandId,
      vendorId,
      search,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      gender,
      concentration,
      scentFamily,
      season,
      isFeatured: isFeatured === 'true' ? true : isFeatured === 'false' ? false : undefined,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      sortBy,
      sortOrder,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get('featured')
  getFeatured(@Query('limit') limit?: string) {
    return this.productsService.getFeaturedProducts(
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  create(@Req() req: Request, @Body() createProductDto: CreateProductDto) {
    const userId = req.user!['sub'];
    const userRole = req.user!['role'] as UserRole;
    return this.productsService.create(userId, userRole, createProductDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const userId = req.user!['sub'];
    const userRole = req.user!['role'] as UserRole;
    return this.productsService.update(userId, userRole, id, updateProductDto);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  updateStock(
    @Req() req: Request,
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = req.user!['sub'];
    const userRole = req.user!['role'] as UserRole;
    return this.productsService.updateStock(userId, userRole, id, quantity);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  remove(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user!['sub'];
    const userRole = req.user!['role'] as UserRole;
    return this.productsService.remove(userId, userRole, id);
  }

  // ============================================================================
  // PRODUCT VARIANTS
  // ============================================================================

  @Post(':id/variants')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  createVariant(
    @Req() req: Request,
    @Param('id') productId: string,
    @Body() createVariantDto: CreateVariantDto,
  ) {
    const userId = req.user!['sub'];
    const userRole = req.user!['role'] as UserRole;
    return this.productsService.createVariant(userId, userRole, productId, createVariantDto);
  }

  @Get(':id/variants')
  getVariants(@Param('id') productId: string) {
    return this.productsService.getVariants(productId);
  }

  @Patch('variants/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  updateVariant(
    @Req() req: Request,
    @Param('id') variantId: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    const userId = req.user!['sub'];
    const userRole = req.user!['role'] as UserRole;
    return this.productsService.updateVariant(userId, userRole, variantId, updateVariantDto);
  }

  @Delete('variants/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  deleteVariant(@Req() req: Request, @Param('id') variantId: string) {
    const userId = req.user!['sub'];
    const userRole = req.user!['role'] as UserRole;
    return this.productsService.deleteVariant(userId, userRole, variantId);
  }
}
