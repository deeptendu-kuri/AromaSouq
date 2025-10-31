# AromaSouq - Complete Setup Guide
**From Zero to Authentication Ready**

**Environment:** Windows CMD + Claude Code
**Timeline:** 60-90 minutes
**Status:** Step-by-step, nothing skipped

---

## Table of Contents
1. [Prerequisites Verification](#1-prerequisites-verification)
2. [Project Structure Setup](#2-project-structure-setup)
3. [Supabase Account & Project Creation](#3-supabase-account--project-creation)
4. [Backend Setup (NestJS + Prisma)](#4-backend-setup-nestjs--prisma)
5. [Frontend Setup (Next.js)](#5-frontend-setup-nextjs)
6. [MCP Configuration for Claude Code](#6-mcp-configuration-for-claude-code)
7. [Database Schema & Migration](#7-database-schema--migration)
8. [Authentication Implementation](#8-authentication-implementation)
9. [Testing & Verification](#9-testing--verification)
10. [Next Steps](#10-next-steps)

---

## 1. Prerequisites Verification

### Step 1.1: Verify Node.js Version
Open CMD and run:

```cmd
node --version
```

**Expected:** v20.x.x or higher
**If not:** Download from https://nodejs.org/

---

### Step 1.2: Verify Git
```cmd
git --version
```

**Expected:** git version 2.x.x or higher

---

### Step 1.3: Verify pnpm Installation
```cmd
pnpm --version
```

**If not installed:**
```cmd
npm install -g pnpm
```

**Then verify:**
```cmd
pnpm --version
```

**Expected:** 8.x.x or higher

---

### Step 1.4: Verify Claude Code
```cmd
claude --version
```

**Expected:** 2.0.26 (Claude Code)

---

### Step 1.5: Check Current Directory
```cmd
cd C:\Users\deept\AromaSouq
dir
```

**Expected:** You should see the `docs` folder and other files

---

## 2. Project Structure Setup

### Step 2.1: Create Project Folders
```cmd
cd C:\Users\deept\AromaSouq
mkdir aromasouq-api
mkdir aromasouq-web
```

### Step 2.2: Verify Structure
```cmd
dir
```

**Expected output:**
```
Directory of C:\Users\deept\AromaSouq

<DIR>  aromasouq-api
<DIR>  aromasouq-web
<DIR>  docs
```

---

## 3. Supabase Account & Project Creation

### Step 3.1: Create Supabase Account

1. Open browser: https://supabase.com
2. Click "Start your project"
3. Sign up with **GitHub** (recommended)
4. Authorize Supabase to access GitHub

### Step 3.2: Create Organization (if prompted)
- Organization name: `AromaSouq` or your name
- Click "Create organization"

### Step 3.3: Create New Project

**Click "New Project"**

Fill in:
```
Organization: [Your organization]
Name: aromasouq-production
Database Password: [Generate strong password]
```

**CRITICAL: SAVE THIS PASSWORD!**

Create a file to store credentials temporarily:

```cmd
cd C:\Users\deept\AromaSouq
echo # Supabase Credentials > supabase-credentials.txt
echo. >> supabase-credentials.txt
echo Database Password: YOUR_PASSWORD_HERE >> supabase-credentials.txt
notepad supabase-credentials.txt
```

**In notepad, replace `YOUR_PASSWORD_HERE` with your actual password and save**

Continue in Supabase:
```
Region: Singapore (ap-southeast-1) - closest to UAE
Pricing Plan: Free
```

**Click "Create new project"**

**Wait time:** 2-3 minutes ⏰

---

### Step 3.4: Get Connection Strings

Once project is ready:

1. Click **Settings** (gear icon) in sidebar
2. Click **Database**
3. Scroll to **Connection string**
4. Click **URI** tab

**Copy the connection string** - looks like:
```
postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
```

**Add to your credentials file:**

```cmd
notepad C:\Users\deept\AromaSouq\supabase-credentials.txt
```

Add these lines:
```
Connection String Direct:
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

Connection String Pooled:
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true

Replace [YOUR-PASSWORD] with the password you created above
Replace [PROJECT-REF] with your actual project reference
```

---

### Step 3.5: Get API Keys

1. In Supabase Dashboard → Settings → **API**
2. Copy these keys:

**Add to credentials file:**
```cmd
notepad C:\Users\deept\AromaSouq\supabase-credentials.txt
```

Add:
```
Project URL: https://[PROJECT-REF].supabase.co

ANON KEY (Public):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

SERVICE ROLE KEY (Secret - SERVER ONLY):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save this file!**

---

### Step 3.6: Create Storage Buckets

1. In Supabase Dashboard → **Storage**
2. Click **New bucket**

**Create these 4 buckets:**

**Bucket 1: products**
```
Name: products
Public bucket: ✓ (checked)
File size limit: 50 MB
Allowed MIME types: image/*, video/*
```
Click **Create bucket**

**Bucket 2: brands**
```
Name: brands
Public bucket: ✓ (checked)
File size limit: 10 MB
Allowed MIME types: image/*
```
Click **Create bucket**

**Bucket 3: users**
```
Name: users
Public bucket: ✓ (checked)
File size limit: 5 MB
Allowed MIME types: image/*
```
Click **Create bucket**

**Bucket 4: documents**
```
Name: documents
Public bucket: ✗ (unchecked - private)
File size limit: 10 MB
Allowed MIME types: application/pdf, image/*
```
Click **Create bucket**

**Verify:** You should see all 4 buckets in Storage → Buckets

---

## 4. Backend Setup (NestJS + Prisma)

### Step 4.1: Initialize NestJS Project

```cmd
cd C:\Users\deept\AromaSouq\aromasouq-api
```

**Install NestJS CLI globally (if not installed):**
```cmd
pnpm add -g @nestjs/cli
```

**Create NestJS project:**
```cmd
nest new . --package-manager pnpm --skip-git
```

When prompted:
- **Project name:** aromasouq-api (or press Enter to use current dir name)

**Wait for installation...** ⏰ (2-3 minutes)

---

### Step 4.2: Install Core Dependencies

```cmd
pnpm add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator class-transformer
pnpm add -D @types/passport-jwt @types/bcrypt
```

---

### Step 4.3: Install Prisma & Supabase

```cmd
pnpm add -D prisma
pnpm add @prisma/client @supabase/supabase-js
```

---

### Step 4.4: Initialize Prisma

```cmd
npx prisma init
```

**Expected output:**
```
✔ Your Prisma schema was created at prisma/schema.prisma
✔ .env file created
```

---

### Step 4.5: Configure Environment Variables

Open the `.env` file:

```cmd
notepad .env
```

**Replace entire content with:**

```env
# Node Environment
NODE_ENV=development
PORT=3001

# Database - Supabase
# Replace [YOUR-PASSWORD] and [PROJECT-REF] with actual values
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DATABASE_URL_POOLER="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"

# Supabase
# Replace [PROJECT-REF] with your actual project reference
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="your_anon_key_here"
SUPABASE_SERVICE_KEY="your_service_role_key_here"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Stripe (add later)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

**Important:** Replace all placeholders:
- `[YOUR-PASSWORD]` → your Supabase database password
- `[PROJECT-REF]` → your Supabase project reference (from URL)
- `your_anon_key_here` → your actual anon key
- `your_service_role_key_here` → your actual service role key

**Save and close**

---

### Step 4.6: Configure Prisma Schema

```cmd
notepad prisma\schema.prisma
```

**Replace entire content with:**

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL_POOLER")
  directUrl = env("DATABASE_URL")
}

// Enums
enum UserRole {
  CUSTOMER
  VENDOR
  ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

enum VendorStatus {
  PENDING
  APPROVED
  REJECTED
  SUSPENDED
}

// User Model
model User {
  id              String     @id @default(cuid())
  email           String     @unique
  emailVerified   Boolean    @default(false)
  emailVerifiedAt DateTime?
  phone           String?    @unique
  phoneVerified   Boolean    @default(false)
  password        String?
  firstName       String
  lastName        String
  avatar          String?
  role            UserRole   @default(CUSTOMER)
  status          UserStatus @default(ACTIVE)
  language        String     @default("en")

  // OAuth
  googleId String? @unique
  appleId  String? @unique

  // Settings
  notificationPreferences Json?

  // Timestamps
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  lastLoginAt DateTime?

  // Relations
  vendor Vendor?

  @@index([email])
  @@index([role, status])
}

// Vendor Model
model Vendor {
  id                    String       @id @default(cuid())
  userId                String       @unique
  user                  User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  businessName          String
  businessNameAr        String?
  slug                  String       @unique
  description           String?
  descriptionAr         String?
  logo                  String?
  banner                String?
  businessEmail         String
  businessPhone         String
  whatsappNumber        String?
  whatsappEnabled       Boolean      @default(false)
  tradeLicenseNumber    String?
  taxRegistrationNumber String?
  businessLicense       String?
  status                VendorStatus @default(PENDING)
  approvedAt            DateTime?
  approvedBy            String?
  rejectionReason       String?
  commissionRate        Float        @default(15.0)
  settings              Json?
  createdAt             DateTime     @default(now())
  updatedAt             DateTime     @updatedAt

  @@index([slug])
  @@index([status])
}
```

**Save and close**

---

### Step 4.7: Create Initial Migration

```cmd
npx prisma migrate dev --name init
```

**You'll see:**
```
Applying migration...
✔ Generated Prisma Client
```

**Verify in Supabase:**
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. You should see `User` and `Vendor` tables

---

### Step 4.8: Create Seed File

```cmd
notepad prisma\seed.ts
```

**Add this content:**

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Super Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@aromasouq.ae' },
    update: {},
    create: {
      email: 'admin@aromasouq.ae',
      emailVerified: true,
      firstName: 'Super',
      lastName: 'Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Admin created:', admin.email);

  // Create Test Customer
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      emailVerified: true,
      firstName: 'Test',
      lastName: 'Customer',
      password: hashedPassword,
      role: 'CUSTOMER',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Test customer created:', customer.email);

  // Create Test Vendor User
  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@test.com' },
    update: {},
    create: {
      email: 'vendor@test.com',
      emailVerified: true,
      firstName: 'Test',
      lastName: 'Vendor',
      password: hashedPassword,
      role: 'VENDOR',
      status: 'ACTIVE',
      vendor: {
        create: {
          businessName: 'Luxury Fragrances LLC',
          businessNameAr: 'عطور فاخرة',
          slug: 'luxury-fragrances',
          businessEmail: 'vendor@test.com',
          businessPhone: '+971501234567',
          status: 'APPROVED',
          commissionRate: 15.0,
        },
      },
    },
  });

  console.log('✅ Test vendor created:', vendorUser.email);
  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('Test Accounts:');
  console.log('Admin: admin@aromasouq.ae / admin123');
  console.log('Customer: customer@test.com / admin123');
  console.log('Vendor: vendor@test.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Save and close**

---

### Step 4.9: Configure package.json for Seeding

```cmd
notepad package.json
```

**Add this section** (after "scripts" or at the end before closing `}`):

```json
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
```

**Install ts-node:**
```cmd
pnpm add -D ts-node
```

**Run seed:**
```cmd
npx prisma db seed
```

**Expected output:**
```
🌱 Seeding database...
✅ Admin created: admin@aromasouq.ae
✅ Test customer created: customer@test.com
✅ Test vendor created: vendor@test.com
🎉 Seeding completed successfully!
```

---

### Step 4.10: Verify Database in Prisma Studio

```cmd
npx prisma studio
```

**Browser will open at:** http://localhost:5555

**Verify:**
- Click on `User` table → You should see 3 users
- Click on `Vendor` table → You should see 1 vendor

**Leave Prisma Studio open** for now.

---

## 5. Frontend Setup (Next.js)

### Step 5.1: Initialize Next.js Project

**Open a NEW CMD window** (keep the backend one open):

```cmd
cd C:\Users\deept\AromaSouq\aromasouq-web
```

**Create Next.js app:**
```cmd
pnpm create next-app . --typescript --tailwind --app --import-alias "@/*"
```

**When prompted:**
```
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Turbopack for next dev? … No
✔ Would you like to customize the import alias? … No
```

**Wait for installation...** ⏰ (2-3 minutes)

---

### Step 5.2: Install Frontend Dependencies

```cmd
pnpm add @supabase/supabase-js zustand @tanstack/react-query axios react-hook-form zod @hookform/resolvers
pnpm add -D @types/node
```

---

### Step 5.3: Configure Environment Variables

```cmd
notepad .env.local
```

**Add this content** (replace placeholders):

```env
# API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Supabase (Public - safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Replace:**
- `[PROJECT-REF]` → your Supabase project reference
- `your_anon_key_here` → your actual anon key

**Save and close**

---

### Step 5.4: Configure Tailwind with AromaSouq Theme

```cmd
notepad tailwind.config.ts
```

**Replace entire content with:**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AromaSouq Brand Colors
        'oud-gold': {
          DEFAULT: '#C9A86A',
          50: '#F5F1E8',
          100: '#EBE3D1',
          200: '#E1D5BA',
          300: '#D7C7A3',
          400: '#CDB88C',
          500: '#C9A86A',
          600: '#B89555',
          700: '#A78240',
          800: '#8A6B35',
          900: '#6D552A',
        },
        'desert-bronze': {
          DEFAULT: '#A87138',
          50: '#F5EDE3',
          100: '#EBDBC7',
          200: '#D7B78F',
          300: '#C39357',
          400: '#B5822F',
          500: '#A87138',
          600: '#8B5A2B',
          700: '#6E481E',
          800: '#513611',
          900: '#342404',
        },
        'royal-charcoal': {
          DEFAULT: '#2B2B2B',
          50: '#F7F7F7',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#BABABA',
          400: '#757575',
          500: '#2B2B2B',
          600: '#222222',
          700: '#1A1A1A',
          800: '#111111',
          900: '#080808',
        },
        'pearl-white': '#FAFAFA',
        'arabian-crimson': '#C41E3A',
        'emerald-oasis': '#00896B',
        'sapphire-dusk': '#1E3A8A',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Save and close**

---

### Step 5.5: Update Global Styles

```cmd
notepad src\app\globals.css
```

**Replace entire content with:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

@layer base {
  body {
    @apply font-inter text-royal-charcoal bg-pearl-white;
  }

  h1, h2, h3, h4 {
    @apply font-playfair;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

**Save and close**

---

### Step 5.6: Configure Next.js for Images

```cmd
notepad next.config.ts
```

**Replace entire content with:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
```

**Save and close**

---

## 6. MCP Configuration for Claude Code

### Step 6.1: Create MCP Configuration Directory

```cmd
cd C:\Users\deept\AromaSouq
mkdir .claude
```

---

### Step 6.2: Create MCP Configuration File

```cmd
notepad .claude\mcp.json
```

**Add this content:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\deept\\AromaSouq\\aromasouq-api",
        "C:\\Users\\deept\\AromaSouq\\aromasouq-web",
        "C:\\Users\\deept\\AromaSouq\\docs"
      ]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    }
  }
}
```

**Save and close**

---

### Step 6.3: Create Claude Code Workspace Config

```cmd
notepad .claude\config.json
```

**Add:**

```json
{
  "project": {
    "name": "AromaSouq MVP",
    "description": "Luxury fragrance marketplace for UAE/GCC market",
    "structure": {
      "backend": "aromasouq-api",
      "frontend": "aromasouq-web",
      "docs": "docs"
    }
  },
  "defaults": {
    "languageModel": "claude-sonnet-4",
    "temperature": 0.7
  }
}
```

**Save and close**

---

### Step 6.4: Test MCP Connection

```cmd
cd C:\Users\deept\AromaSouq
claude mcp list
```

**Expected:** You should see the filesystem server listed

---

## 7. Database Schema & Migration

### Step 7.1: Add Remaining Models to Prisma Schema

Go back to backend terminal:

```cmd
cd C:\Users\deept\AromaSouq\aromasouq-api
notepad prisma\schema.prisma
```

**Add these models at the end** (after Vendor model):

```prisma
// Product Enums
enum ProductStatus {
  DRAFT
  ACTIVE
  OUT_OF_STOCK
  DISCONTINUED
}

// Category Model
model Category {
  id          String    @id @default(cuid())
  name        String
  nameAr      String?
  slug        String    @unique
  description String?
  image       String?
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  position    Int       @default(0)
  isActive    Boolean   @default(true)
  isFeatured  Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
  @@index([parentId])
}
```

**Save and close**

---

### Step 7.2: Create Migration

```cmd
npx prisma migrate dev --name add_category_model
```

---

### Step 7.3: Generate Prisma Client

```cmd
npx prisma generate
```

---

### Step 7.4: Update Seed File to Add Categories

```cmd
notepad prisma\seed.ts
```

**Add this BEFORE the final console.log statements:**

```typescript
  // Create Categories
  const categories = [
    { name: 'Perfumes', nameAr: 'عطور', slug: 'perfumes' },
    { name: 'Oud', nameAr: 'عود', slug: 'oud' },
    { name: 'Attars', nameAr: 'عطور زيتية', slug: 'attars' },
    { name: 'Bakhoor', nameAr: 'بخور', slug: 'bakhoor' },
    { name: 'Home Fragrance', nameAr: 'معطرات المنزل', slug: 'home-fragrance' },
    { name: 'Essential Oils', nameAr: 'زيوت عطرية', slug: 'essential-oils' },
    { name: 'Gift Sets', nameAr: 'مجموعات هدايا', slug: 'gift-sets' },
    { name: 'Raw Materials', nameAr: 'مواد خام', slug: 'raw-materials' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('✅ Categories created');
```

**Save and run seed again:**

```cmd
npx prisma db seed
```

---

## 8. Authentication Implementation

### Step 8.1: Create Backend Auth Module Structure

```cmd
cd C:\Users\deept\AromaSouq\aromasouq-api\src
mkdir auth
mkdir auth\dto
mkdir auth\guards
mkdir auth\strategies
```

---

### Step 8.2: Create Auth DTOs

```cmd
notepad src\auth\dto\register.dto.ts
```

**Add:**

```typescript
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
```

**Save**

---

```cmd
notepad src\auth\dto\login.dto.ts
```

**Add:**

```typescript
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
```

**Save**

---

```cmd
notepad src\auth\dto\index.ts
```

**Add:**

```typescript
export * from './register.dto';
export * from './login.dto';
```

**Save**

---

### Step 8.3: Create JWT Strategy

```cmd
notepad src\auth\strategies\jwt.strategy.ts
```

**Add:**

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

**Save**

---

### Step 8.4: Create JWT Guard

```cmd
notepad src\auth\guards\jwt-auth.guard.ts
```

**Add:**

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**Save**

---

### Step 8.5: Create Prisma Service

```cmd
cd C:\Users\deept\AromaSouq\aromasouq-api\src
mkdir prisma
notepad src\prisma\prisma.service.ts
```

**Add:**

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

**Save**

---

```cmd
notepad src\prisma\prisma.module.ts
```

**Add:**

```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

**Save**

---

### Step 8.6: Create Auth Service

```cmd
notepad src\auth\auth.service.ts
```

**Add:**

```typescript
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check status
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        status: true,
        language: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
      secret: this.configService.get('JWT_SECRET'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
```

**Save**

---

### Step 8.7: Create Auth Controller

```cmd
notepad src\auth\auth.controller.ts
```

**Add:**

```typescript
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }
}
```

**Save**

---

### Step 8.8: Create Auth Module

```cmd
notepad src\auth\auth.module.ts
```

**Add:**

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

**Save**

---

### Step 8.9: Update App Module

```cmd
notepad src\app.module.ts
```

**Replace entire content with:**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
```

**Save**

---

### Step 8.10: Enable CORS in main.ts

```cmd
notepad src\main.ts
```

**Replace entire content with:**

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on: http://localhost:${port}/api/v1`);
}
bootstrap();
```

**Save**

---

### Step 8.11: Test Backend Server

```cmd
pnpm start:dev
```

**Expected output:**
```
[Nest] 12345  - LOG [NestFactory] Starting Nest application...
[Nest] 12345  - LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - LOG [InstanceLoader] PrismaModule dependencies initialized
[Nest] 12345  - LOG [InstanceLoader] AuthModule dependencies initialized
[Nest] 12345  - LOG [NestApplication] Nest application successfully started
🚀 Backend running on: http://localhost:3001/api/v1
```

**Keep this running!**

---

## 9. Testing & Verification

### Step 9.1: Test Backend Health

**Open a NEW CMD window:**

```cmd
curl http://localhost:3001/api/v1
```

**Expected:** Some response (even 404 is fine, means server is running)

---

### Step 9.2: Test Registration API

Create a test file:

```cmd
cd C:\Users\deept\AromaSouq
notepad test-auth.json
```

**Add:**

```json
{
  "email": "newuser@test.com",
  "password": "testpassword123",
  "firstName": "New",
  "lastName": "User"
}
```

**Save**

**Test with curl:**

```cmd
curl -X POST http://localhost:3001/api/v1/auth/register -H "Content-Type: application/json" -d @test-auth.json
```

**Expected response:**
```json
{
  "user": {
    "id": "...",
    "email": "newuser@test.com",
    "firstName": "New",
    "lastName": "User",
    "role": "CUSTOMER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Copy the `accessToken` value!**

---

### Step 9.3: Test Login API

```cmd
notepad test-login.json
```

**Add:**

```json
{
  "email": "customer@test.com",
  "password": "admin123"
}
```

**Save and test:**

```cmd
curl -X POST http://localhost:3001/api/v1/auth/login -H "Content-Type: application/json" -d @test-login.json
```

**Expected:** Similar response with tokens

---

### Step 9.4: Test Protected Route

**Replace YOUR_TOKEN_HERE with actual token from step 9.2:**

```cmd
curl http://localhost:3001/api/v1/auth/profile -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected:** User profile data

---

### Step 9.5: Start Frontend Development Server

**Go to frontend terminal:**

```cmd
cd C:\Users\deept\AromaSouq\aromasouq-web
pnpm dev
```

**Expected output:**
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Starting...
✓ Ready in 2.3s
```

**Open browser:** http://localhost:3000

**You should see the default Next.js welcome page**

---

## 10. Next Steps

### ✅ What You've Accomplished

1. ✅ Development environment verified
2. ✅ Supabase account and project created
3. ✅ Storage buckets configured
4. ✅ Backend (NestJS) fully set up
5. ✅ Frontend (Next.js) initialized
6. ✅ Prisma ORM configured with Supabase
7. ✅ Database schema created and migrated
8. ✅ Seed data added (3 test users, 1 vendor, 8 categories)
9. ✅ Complete authentication system implemented
10. ✅ MCP configured for Claude Code
11. ✅ API tested and working

---

### 🎯 Ready to Build Features

You can now use Claude Code to build features. Here are example prompts:

**1. Create Login Page:**
```cmd
claude "Create a login page at aromasouq-web/src/app/login/page.tsx with email/password fields using React Hook Form, Zod validation, and the Oud Gold theme. Connect it to the backend API at http://localhost:3001/api/v1/auth/login"
```

**2. Create Auth Context:**
```cmd
claude "Create an auth context in aromasouq-web/src/contexts/AuthContext.tsx that handles login, logout, and stores the user state. Use localStorage for token persistence."
```

**3. Create Product Model:**
```cmd
claude "Add the complete Product model to aromasouq-api/prisma/schema.prisma based on the database schema document in docs/04-AromaSouq-Database-Schema.md, then create and run the migration"
```

**4. Create Products API:**
```cmd
claude "Create a complete Products module in aromasouq-api/src/products with CRUD operations, image upload to Supabase Storage, and proper validation"
```

---

### 📋 Development Checklist

**Currently Running:**
- [ ] Backend: http://localhost:3001/api/v1 (should be running)
- [ ] Frontend: http://localhost:3000 (should be running)
- [ ] Prisma Studio: http://localhost:5555 (optional)

**Services Configured:**
- [x] Supabase Database
- [x] Supabase Storage (4 buckets)
- [x] Backend API with Auth
- [x] Frontend with Tailwind
- [x] MCP for Claude Code

**Test Accounts Created:**
```
Admin: admin@aromasouq.ae / admin123
Customer: customer@test.com / admin123
Vendor: vendor@test.com / admin123
```

---

### 🚀 Recommended Next Steps

1. **Create Frontend Auth Pages** (Login/Register)
2. **Create Protected Route Middleware**
3. **Add Product Model to Database**
4. **Create Product CRUD APIs**
5. **Create Supabase Storage Service**
6. **Build Product Listing Page**

---

### 🆘 Troubleshooting

**Backend won't start:**
```cmd
# Check if port 3001 is in use
netstat -ano | findstr :3001

# Kill process if needed (replace PID)
taskkill /PID [PID] /F
```

**Frontend won't start:**
```cmd
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process if needed
taskkill /PID [PID] /F
```

**Database connection error:**
- Verify .env file has correct Supabase credentials
- Check Supabase project is not paused
- Ensure password has no special characters that need escaping

**Prisma errors:**
```cmd
# Regenerate Prisma Client
npx prisma generate

# Reset database (DANGER: deletes all data)
npx prisma migrate reset
```

---

### 📚 Important Files Reference

**Backend:**
- `.env` - Environment variables
- `prisma/schema.prisma` - Database schema
- `src/auth/` - Authentication module
- `src/prisma/` - Prisma service

**Frontend:**
- `.env.local` - Frontend environment variables
- `tailwind.config.ts` - Tailwind theme configuration
- `src/app/` - Next.js pages

**Project Root:**
- `.claude/mcp.json` - MCP configuration
- `supabase-credentials.txt` - Your Supabase credentials (KEEP SAFE!)

---

### 🎉 You're Ready to Build!

Everything is set up and tested. You can now:

1. Build features using Claude Code
2. Test APIs using curl or Postman
3. View database in Prisma Studio
4. Monitor Supabase in the dashboard

**Documentation Location:** `C:\Users\deept\AromaSouq\docs\`

**Happy Building! 🚀**

---

**Setup Completed:** {{ Current Date }}
**Time Taken:** ~60-90 minutes
**Next Document:** Week 2 in Implementation Roadmap - Build Login/Register UI
