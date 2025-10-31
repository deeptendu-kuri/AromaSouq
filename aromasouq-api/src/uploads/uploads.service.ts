import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import {
  FILE_VALIDATION,
  UploadType,
  BUCKET_NAMES,
} from './constants/file-validation.constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: SupabaseService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Validate file type and size
   */
  validateFile(
    file: Express.Multer.File,
    uploadType: UploadType,
  ): void {
    const mimeType = file.mimetype;
    const fileSize = file.size;

    // Validate based on upload type
    switch (uploadType) {
      case UploadType.PRODUCT_IMAGE:
      case UploadType.REVIEW_IMAGE:
      case UploadType.USER_AVATAR:
      case UploadType.BRAND_LOGO:
      case UploadType.BRAND_BANNER:
        if (!FILE_VALIDATION.IMAGE_MIME_TYPES.includes(mimeType)) {
          throw new BadRequestException(
            `Invalid file type. Allowed types: ${FILE_VALIDATION.IMAGE_EXTENSIONS.join(', ')}`,
          );
        }
        if (fileSize > FILE_VALIDATION.IMAGE_MAX_SIZE) {
          throw new BadRequestException(
            `File size exceeds limit of ${FILE_VALIDATION.IMAGE_MAX_SIZE / 1024 / 1024}MB`,
          );
        }
        break;

      case UploadType.PRODUCT_VIDEO:
        if (!FILE_VALIDATION.VIDEO_MIME_TYPES.includes(mimeType)) {
          throw new BadRequestException(
            `Invalid file type. Allowed types: ${FILE_VALIDATION.VIDEO_EXTENSIONS.join(', ')}`,
          );
        }
        if (fileSize > FILE_VALIDATION.VIDEO_MAX_SIZE) {
          throw new BadRequestException(
            `File size exceeds limit of ${FILE_VALIDATION.VIDEO_MAX_SIZE / 1024 / 1024}MB`,
          );
        }
        break;

      case UploadType.VENDOR_DOCUMENT:
        if (!FILE_VALIDATION.DOCUMENT_MIME_TYPES.includes(mimeType)) {
          throw new BadRequestException(
            `Invalid file type. Allowed types: ${FILE_VALIDATION.DOCUMENT_EXTENSIONS.join(', ')}`,
          );
        }
        if (fileSize > FILE_VALIDATION.DOCUMENT_MAX_SIZE) {
          throw new BadRequestException(
            `File size exceeds limit of ${FILE_VALIDATION.DOCUMENT_MAX_SIZE / 1024 / 1024}MB`,
          );
        }
        break;

      default:
        throw new BadRequestException('Invalid upload type');
    }
  }

  /**
   * Generate unique file path
   */
  generateFilePath(
    folder: string,
    originalName: string,
    uniqueId?: string,
  ): string {
    const timestamp = Date.now();
    const randomId = uniqueId || uuidv4();
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    return `${folder}/${randomId}-${timestamp}${extension}`;
  }

  /**
   * Upload product images
   */
  async uploadProductImages(
    productId: string,
    files: Express.Multer.File[],
  ) {
    // Verify product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Validate files
    if (files.length > FILE_VALIDATION.MAX_FILES_PER_UPLOAD) {
      throw new BadRequestException(
        `Maximum ${FILE_VALIDATION.MAX_FILES_PER_UPLOAD} files allowed per upload`,
      );
    }

    files.forEach((file) =>
      this.validateFile(file, UploadType.PRODUCT_IMAGE),
    );

    // Upload files to Supabase
    const uploadPromises = files.map(async (file) => {
      const filePath = this.generateFilePath(
        `products/${productId}/images`,
        file.originalname,
      );
      return this.supabase.uploadFile(
        BUCKET_NAMES.PRODUCTS,
        filePath,
        file.buffer,
        file.mimetype,
      );
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Update product with new image URLs
    const imageUrls = uploadResults.map((result) => result.url);
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: {
        images: {
          push: imageUrls,
        },
      },
    });

    return {
      files: uploadResults,
      message: `${uploadResults.length} image(s) uploaded successfully`,
      count: uploadResults.length,
      product: updatedProduct,
    };
  }

  /**
   * Upload user avatar
   */
  async uploadUserAvatar(userId: string, file: Express.Multer.File) {
    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Validate file
    this.validateFile(file, UploadType.USER_AVATAR);

    // Delete old avatar if exists
    if (user.avatar) {
      try {
        const oldPath = user.avatar.split(`${BUCKET_NAMES.USERS}/`)[1];
        if (oldPath) {
          await this.supabase.deleteFile(BUCKET_NAMES.USERS, oldPath);
        }
      } catch (error) {
        // Ignore errors when deleting old avatar
        console.warn('Failed to delete old avatar:', error.message);
      }
    }

    // Upload new avatar
    const filePath = this.generateFilePath(
      `users/${userId}/avatar`,
      file.originalname,
    );
    const uploadResult = await this.supabase.uploadFile(
      BUCKET_NAMES.USERS,
      filePath,
      file.buffer,
      file.mimetype,
    );

    // Update user with new avatar URL
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: uploadResult.url,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
      },
    });

    return {
      ...uploadResult,
      message: 'Avatar uploaded successfully',
      user: updatedUser,
    };
  }

  /**
   * Upload review images
   */
  async uploadReviewImages(
    reviewId: string,
    userId: string,
    files: Express.Multer.File[],
  ) {
    // Verify review exists and belongs to user
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
      include: { reviewImages: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }

    if (review.userId !== userId) {
      throw new BadRequestException(
        'You can only upload images to your own reviews',
      );
    }

    // Validate files
    if (files.length > FILE_VALIDATION.MAX_FILES_PER_UPLOAD) {
      throw new BadRequestException(
        `Maximum ${FILE_VALIDATION.MAX_FILES_PER_UPLOAD} files allowed per upload`,
      );
    }

    files.forEach((file) =>
      this.validateFile(file, UploadType.REVIEW_IMAGE),
    );

    // Upload files to Supabase
    const uploadPromises = files.map(async (file, index) => {
      const filePath = this.generateFilePath(
        `products/reviews/${reviewId}`,
        file.originalname,
      );
      return this.supabase.uploadFile(
        BUCKET_NAMES.PRODUCTS,
        filePath,
        file.buffer,
        file.mimetype,
      );
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Create ReviewImage records
    const currentMaxSort =
      review.reviewImages.length > 0
        ? Math.max(...review.reviewImages.map((img) => img.sortOrder))
        : -1;

    const reviewImagePromises = uploadResults.map((result, index) =>
      this.prisma.reviewImage.create({
        data: {
          reviewId,
          url: result.url,
          sortOrder: currentMaxSort + index + 1,
        },
      }),
    );

    await Promise.all(reviewImagePromises);

    return {
      files: uploadResults,
      message: `${uploadResults.length} image(s) uploaded successfully`,
      count: uploadResults.length,
    };
  }

  /**
   * Upload brand logo
   */
  async uploadBrandLogo(brandId: string, file: Express.Multer.File) {
    // Verify brand exists
    const brand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    // Validate file
    this.validateFile(file, UploadType.BRAND_LOGO);

    // Delete old logo if exists
    if (brand.logo) {
      try {
        const oldPath = brand.logo.split(`${BUCKET_NAMES.BRANDS}/`)[1];
        if (oldPath) {
          await this.supabase.deleteFile(BUCKET_NAMES.BRANDS, oldPath);
        }
      } catch (error) {
        console.warn('Failed to delete old logo:', error.message);
      }
    }

    // Upload new logo
    const filePath = this.generateFilePath(
      `brands/${brandId}/logo`,
      file.originalname,
    );
    const uploadResult = await this.supabase.uploadFile(
      BUCKET_NAMES.BRANDS,
      filePath,
      file.buffer,
      file.mimetype,
    );

    // Update brand with new logo URL
    const updatedBrand = await this.prisma.brand.update({
      where: { id: brandId },
      data: {
        logo: uploadResult.url,
      },
    });

    return {
      ...uploadResult,
      message: 'Brand logo uploaded successfully',
      brand: updatedBrand,
    };
  }

  /**
   * Upload brand banner
   */
  async uploadBrandBanner(brandId: string, file: Express.Multer.File) {
    // Verify brand exists
    const brand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    // Validate file
    this.validateFile(file, UploadType.BRAND_BANNER);

    // Delete old banner if exists
    if (brand.banner) {
      try {
        const oldPath = brand.banner.split(`${BUCKET_NAMES.BRANDS}/`)[1];
        if (oldPath) {
          await this.supabase.deleteFile(BUCKET_NAMES.BRANDS, oldPath);
        }
      } catch (error) {
        console.warn('Failed to delete old banner:', error.message);
      }
    }

    // Upload new banner
    const filePath = this.generateFilePath(
      `brands/${brandId}/banner`,
      file.originalname,
    );
    const uploadResult = await this.supabase.uploadFile(
      BUCKET_NAMES.BRANDS,
      filePath,
      file.buffer,
      file.mimetype,
    );

    // Update brand with new banner URL
    const updatedBrand = await this.prisma.brand.update({
      where: { id: brandId },
      data: {
        banner: uploadResult.url,
      },
    });

    return {
      ...uploadResult,
      message: 'Brand banner uploaded successfully',
      brand: updatedBrand,
    };
  }

  /**
   * Delete file from storage
   */
  async deleteFile(bucket: string, path: string) {
    return this.supabase.deleteFile(bucket, path);
  }
}
