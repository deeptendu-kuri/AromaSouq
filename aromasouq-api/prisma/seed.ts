import { PrismaClient, UserRole, VendorStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@aromasouq.ae' },
    update: {},
    create: {
      email: 'admin@aromasouq.ae',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  console.log('✅ Created admin user:', adminUser.email);

  // Create wallet for admin
  await prisma.wallet.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      balance: 1000,
      lifetimeEarned: 1000,
      lifetimeSpent: 0,
    },
  });
  console.log('✅ Created wallet for admin');

  // Create vendor user
  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@aromasouq.ae' },
    update: {},
    create: {
      email: 'vendor@aromasouq.ae',
      password: hashedPassword,
      firstName: 'Vendor',
      lastName: 'User',
      role: UserRole.VENDOR,
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  console.log('✅ Created vendor user:', vendorUser.email);

  // Create wallet for vendor
  await prisma.wallet.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: {
      userId: vendorUser.id,
      balance: 500,
      lifetimeEarned: 500,
      lifetimeSpent: 0,
    },
  });
  console.log('✅ Created wallet for vendor');

  // Create Vendor profile
  const vendor = await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: {
      userId: vendorUser.id,
      businessName: 'AromaSouq Official',
      businessNameAr: 'أروماسوق الرسمي',
      businessEmail: 'vendor@aromasouq.ae',
      businessPhone: '+971501234567',
      description: 'Official AromaSouq fragrance vendor',
      descriptionAr: 'بائع عطور أروماسوق الرسمي',
      logo: 'https://logo.clearbit.com/aromasouq.ae',
      status: VendorStatus.APPROVED,
    },
  });
  console.log('✅ Created vendor profile');

  // Create Categories
  const menCategory = await prisma.category.upsert({
    where: { slug: 'men-fragrances' },
    update: {},
    create: {
      name: 'Men Fragrances',
      nameAr: 'عطور رجالية',
      slug: 'men-fragrances',
      description: 'Discover our exclusive collection of men fragrances',
      descriptionAr: 'اكتشف مجموعتنا الحصرية من العطور الرجالية',
      icon: '👨',
      sortOrder: 1,
      isActive: true,
    },
  });

  const womenCategory = await prisma.category.upsert({
    where: { slug: 'women-fragrances' },
    update: {},
    create: {
      name: 'Women Fragrances',
      nameAr: 'عطور نسائية',
      slug: 'women-fragrances',
      description: 'Explore our elegant collection of women fragrances',
      descriptionAr: 'استكشف مجموعتنا الأنيقة من العطور النسائية',
      icon: '👩',
      sortOrder: 2,
      isActive: true,
    },
  });

  const unisexCategory = await prisma.category.upsert({
    where: { slug: 'unisex-fragrances' },
    update: {},
    create: {
      name: 'Unisex Fragrances',
      nameAr: 'عطور للجنسين',
      slug: 'unisex-fragrances',
      description: 'Modern fragrances for everyone',
      descriptionAr: 'عطور عصرية للجميع',
      icon: '🌟',
      sortOrder: 3,
      isActive: true,
    },
  });

  console.log('✅ Created categories');

  // Create Brands
  const dior = await prisma.brand.upsert({
    where: { slug: 'dior' },
    update: {},
    create: {
      name: 'Dior',
      nameAr: 'ديور',
      slug: 'dior',
      description: 'Luxury French fashion house founded in 1946',
      descriptionAr: 'دار أزياء فرنسية فاخرة تأسست عام 1946',
      logo: 'https://logo.clearbit.com/dior.com',
      isActive: true,
    },
  });

  const chanel = await prisma.brand.upsert({
    where: { slug: 'chanel' },
    update: {},
    create: {
      name: 'Chanel',
      nameAr: 'شانيل',
      slug: 'chanel',
      description: 'Iconic French luxury brand',
      descriptionAr: 'علامة تجارية فرنسية فاخرة مميزة',
      logo: 'https://logo.clearbit.com/chanel.com',
      isActive: true,
    },
  });

  const tomFord = await prisma.brand.upsert({
    where: { slug: 'tom-ford' },
    update: {},
    create: {
      name: 'Tom Ford',
      nameAr: 'توم فورد',
      slug: 'tom-ford',
      description: 'American luxury fashion brand',
      descriptionAr: 'علامة تجارية أمريكية فاخرة',
      logo: 'https://logo.clearbit.com/tomford.com',
      isActive: true,
    },
  });

  const versace = await prisma.brand.upsert({
    where: { slug: 'versace' },
    update: {},
    create: {
      name: 'Versace',
      nameAr: 'فيرساتشي',
      slug: 'versace',
      description: 'Italian luxury fashion company',
      descriptionAr: 'شركة أزياء إيطالية فاخرة',
      logo: 'https://logo.clearbit.com/versace.com',
      isActive: true,
    },
  });

  console.log('✅ Created brands');

  // Create Products
  const products = [
    {
      name: 'Sauvage Eau de Toilette',
      nameAr: 'سوفاج أو دو تواليت',
      slug: 'dior-sauvage-edt',
      description:
        'A radically fresh composition, Sauvage is both raw and noble. Radiant top notes burst with the juicy freshness of Calabrian bergamot.',
      descriptionAr:
        'تركيبة منعشة بشكل جذري، سوفاج خام ونبيل في آن واحد. تنفجر النوتات العليا المشرقة بنضارة البرغموت الكالابري.',
      price: 450.0,
      compareAtPrice: 550.0,
      cost: 300.0,
      sku: 'DIOR-SAU-100',
      barcode: '3348901419628',
      stock: 50,
      lowStockAlert: 10,
      images: [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
        'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500',
      ],
      categoryId: menCategory.id,
      brandId: dior.id,
      vendorId: vendor.id,
      size: '100ml',
      concentration: 'Eau de Toilette',
      gender: 'Men',
      topNotes: 'Calabrian Bergamot, Pepper',
      heartNotes: 'Sichuan Pepper, Lavender, Pink Pepper, Vetiver, Patchouli, Geranium, Elemi',
      baseNotes: 'Ambroxan, Cedar, Labdanum',
      scentFamily: 'Woody Aromatic',
      longevity: '6-8 hours',
      sillage: 'Strong',
      season: 'All Season',
      enableWhatsapp: true,
      whatsappNumber: '+971501234567',
      coinsToAward: 45,
      metaTitle: 'Dior Sauvage EDT 100ml - Buy Online',
      metaDescription: 'Shop Dior Sauvage Eau de Toilette 100ml at AromaSouq',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Chanel No. 5 Eau de Parfum',
      nameAr: 'شانيل رقم 5 أو دو بارفان',
      slug: 'chanel-no5-edp',
      description:
        'An iconic floral bouquet with an aldehydic top note. The essence of femininity.',
      descriptionAr: 'باقة زهور أيقونية مع نوتة ألدهيدية علوية. جوهر الأنوثة.',
      price: 620.0,
      compareAtPrice: 750.0,
      cost: 450.0,
      sku: 'CHAN-NO5-100',
      barcode: '3145891165203',
      stock: 30,
      lowStockAlert: 5,
      images: [
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
      ],
      categoryId: womenCategory.id,
      brandId: chanel.id,
      vendorId: vendor.id,
      size: '100ml',
      concentration: 'Eau de Parfum',
      gender: 'Women',
      topNotes: 'Aldehydes, Ylang-Ylang, Neroli, Bergamot, Lemon',
      heartNotes: 'Iris, Jasmine, Rose, Orris Root, Lily of the Valley',
      baseNotes: 'Civet, Vanilla, Sandalwood, Vetiver, Patchouli, Musk, Amber',
      scentFamily: 'Floral Aldehyde',
      longevity: '8-10 hours',
      sillage: 'Moderate to Strong',
      season: 'Spring, Fall',
      enableWhatsapp: true,
      whatsappNumber: '+971501234567',
      coinsToAward: 62,
      metaTitle: 'Chanel No. 5 EDP 100ml - Luxury Perfume',
      metaDescription: 'The iconic Chanel No. 5 Eau de Parfum at AromaSouq',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Black Orchid Eau de Parfum',
      nameAr: 'بلاك أوركيد أو دو بارفان',
      slug: 'tom-ford-black-orchid',
      description:
        'A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids and spice.',
      descriptionAr:
        'عطر فاخر وحسي من التوافقات الغنية والداكنة وجرعة جذابة من الأوركيد الأسود والتوابل.',
      price: 580.0,
      compareAtPrice: 680.0,
      cost: 420.0,
      sku: 'TF-BO-100',
      barcode: '888066652865',
      stock: 25,
      lowStockAlert: 8,
      images: [
        'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500',
      ],
      categoryId: unisexCategory.id,
      brandId: tomFord.id,
      vendorId: vendor.id,
      size: '100ml',
      concentration: 'Eau de Parfum',
      gender: 'Unisex',
      topNotes: 'Truffle, Gardenia, Black Currant, Ylang-Ylang, Jasmine, Bergamot, Mandarin Orange, Amalfi Lemon',
      heartNotes: 'Orchid, Spices, Gardenia, Fruity Notes, Ylang-Ylang, Jasmine, Lotus',
      baseNotes: 'Mexican chocolate, Patchouli, Vanilla, Incense, Amber, Sandalwood, Vetiver, White Musk',
      scentFamily: 'Oriental Floral',
      longevity: '10-12 hours',
      sillage: 'Very Strong',
      season: 'Fall, Winter',
      enableWhatsapp: true,
      whatsappNumber: '+971501234567',
      coinsToAward: 58,
      metaTitle: 'Tom Ford Black Orchid EDP - Luxury Unisex Fragrance',
      metaDescription: 'Tom Ford Black Orchid Eau de Parfum at AromaSouq',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Eros Eau de Toilette',
      nameAr: 'إيروس أو دو تواليت',
      slug: 'versace-eros-edt',
      description:
        'A fragrance that interprets the sublime masculinity through a luminous aura with an intense, vibrant, and glowing combination of fresh mint leaves, Italian lemon zest, and green apple.',
      descriptionAr:
        'عطر يفسر الذكورة السامية من خلال هالة مضيئة مع مزيج مكثف وحيوي ومتوهج من أوراق النعناع الطازجة وقشر الليمون الإيطالي والتفاح الأخضر.',
      price: 380.0,
      compareAtPrice: 450.0,
      cost: 250.0,
      sku: 'VERS-EROS-100',
      barcode: '8011003823772',
      stock: 40,
      lowStockAlert: 10,
      images: [
        'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500',
      ],
      categoryId: menCategory.id,
      brandId: versace.id,
      vendorId: vendor.id,
      size: '100ml',
      concentration: 'Eau de Toilette',
      gender: 'Men',
      topNotes: 'Mint, Green Apple, Lemon',
      heartNotes: 'Tonka Bean, Ambroxan, Geranium',
      baseNotes: 'Madagascar Vanilla, Virginian Cedar, Atlas Cedar, Vetiver, Oakmoss',
      scentFamily: 'Aromatic Fougere',
      longevity: '6-8 hours',
      sillage: 'Strong',
      season: 'Spring, Summer',
      enableWhatsapp: true,
      whatsappNumber: '+971501234567',
      coinsToAward: 38,
      metaTitle: 'Versace Eros EDT 100ml - Fresh Masculine Fragrance',
      metaDescription: 'Versace Eros Eau de Toilette for Men at AromaSouq',
      isActive: true,
      isFeatured: false,
    },
    {
      name: 'Coco Mademoiselle Eau de Parfum',
      nameAr: 'كوكو مادموزيل أو دو بارفان',
      slug: 'chanel-coco-mademoiselle',
      description:
        'A sparkling, bold ambery fragrance that recalls a daring young Coco Chanel.',
      descriptionAr: 'عطر كهرماني جريء ولامع يذكرنا بشابة جريئة كوكو شانيل.',
      price: 590.0,
      compareAtPrice: 700.0,
      cost: 430.0,
      sku: 'CHAN-COCO-100',
      barcode: '3145891165500',
      stock: 35,
      lowStockAlert: 8,
      images: [
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      ],
      categoryId: womenCategory.id,
      brandId: chanel.id,
      vendorId: vendor.id,
      size: '100ml',
      concentration: 'Eau de Parfum',
      gender: 'Women',
      topNotes: 'Orange, Mandarin Orange, Orange Blossom, Bergamot',
      heartNotes: 'Mimosa, Jasmine, Turkish Rose, Ylang-Ylang',
      baseNotes: 'Tonka Bean, Patchouli, Opoponax, Vanilla, Vetiver, White Musk',
      scentFamily: 'Amber Floral',
      longevity: '8-10 hours',
      sillage: 'Moderate to Strong',
      season: 'All Season',
      enableWhatsapp: true,
      whatsappNumber: '+971501234567',
      coinsToAward: 59,
      metaTitle: 'Chanel Coco Mademoiselle EDP - Elegant Perfume',
      metaDescription: 'Chanel Coco Mademoiselle Eau de Parfum at AromaSouq',
      isActive: true,
      isFeatured: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log(`✅ Created ${products.length} products`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('  Admin: admin@aromasouq.ae / Admin123!');
  console.log('  Vendor: vendor@aromasouq.ae / Admin123!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
