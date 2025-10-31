import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsUUID,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nameAr?: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  lowStockAlert?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  video?: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsUUID()
  brandId?: string;

  @IsOptional()
  @IsUUID()
  vendorId?: string; // Optional - auto-injected for vendors, required for admins

  // Basic specs
  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  concentration?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  // NEW: Enhanced Scent Profile
  @IsOptional()
  @IsString()
  topNotes?: string;

  @IsOptional()
  @IsString()
  heartNotes?: string;

  @IsOptional()
  @IsString()
  baseNotes?: string;

  @IsOptional()
  @IsString()
  scentFamily?: string;

  @IsOptional()
  @IsString()
  longevity?: string;

  @IsOptional()
  @IsString()
  sillage?: string;

  @IsOptional()
  @IsString()
  season?: string;

  // NEW: WhatsApp Integration
  @IsOptional()
  @IsBoolean()
  enableWhatsapp?: boolean;

  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  // NEW: Coins System
  @IsOptional()
  @IsInt()
  @Min(0)
  coinsToAward?: number;

  // SEO
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
