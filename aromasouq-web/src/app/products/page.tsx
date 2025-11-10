'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ui/product-card';
import { Filter, X, ChevronDown, ChevronUp, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Context data for dynamic page rendering
const scentFamilyIcons: Record<string, string> = {
  floral: "🌸",
  fruity: "🍎",
  fresh: "🌊",
  aquatic: "🌊",
  oriental: "🌟",
  woody: "🌳",
  citrus: "🍊",
  spicy: "🌶️",
  green: "🌿",
  gourmand: "🍬"
};

const regionFlags: Record<string, string> = {
  UAE: "🇦🇪",
  SAUDI: "🇸🇦",
  KUWAIT: "🇰🇼",
  QATAR: "🇶🇦",
  OMAN: "🇴🇲",
  BAHRAIN: "🇧🇭",
  FRANCE: "🇫🇷",
  ITALY: "🇮🇹",
  UK: "🇬🇧",
  USA: "🇺🇸",
  INDIA: "🇮🇳",
  THAILAND: "🇹🇭"
};

const occasionIcons: Record<string, string> = {
  OFFICE: "💼",
  DAILY: "🌞",
  PARTY: "🎉",
  WEDDING: "💍",
  RAMADAN: "🌙",
  EID: "✨",
  DATE: "💝"
};

const collectionIcons: Record<string, string> = {
  RAMADAN: "🌙",
  SIGNATURE: "⭐",
  CELEBRITY: "👑",
  MOST_LOVED: "❤️",
  TRENDING: "🔥",
  EXCLUSIVE: "💎"
};

const oudTypeIcons: Record<string, string> = {
  CAMBODIAN: "🪔",
  INDIAN: "💎",
  THAI: "✨",
  MALAYSIAN: "🌴",
  LAOTIAN: "🏔️",
  MUKHALLAT: "🌙"
};

interface PageContext {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
}

function getPageContext(filters: any): PageContext {
  // Priority order: Collection > Gender > Scent Family > Region > Occasion > Oud Type > Product Type

  // Collection-specific contexts
  if (filters.collection) {
    const collectionNames: Record<string, string> = {
      SIGNATURE: "Our Brand Signature Collection",
      MOST_LOVED: "Most Loved Fragrances",
      TRENDING: "Trending Now",
      RAMADAN: "Ramadan Collection",
      EXCLUSIVE: "Exclusive Collection",
      CELEBRITY: "Celebrity Collection"
    };

    const collectionDescriptions: Record<string, string> = {
      SIGNATURE: "Handcrafted with passion, exclusively by AromaSouq. Discover our finest creations that embody luxury and tradition.",
      MOST_LOVED: "Customer favorites that have captured hearts. These are the fragrances our community can't get enough of.",
      TRENDING: "The hottest scents of the season. Stay ahead with fragrances everyone is talking about.",
      RAMADAN: "Sacred scents for the blessed month. Traditional and spiritual fragrances perfect for Ramadan.",
      EXCLUSIVE: "Limited edition masterpieces. Rare and exquisite fragrances for the discerning collector.",
      CELEBRITY: "Signature scents from your favorite celebrities. Experience the glamour and allure."
    };

    return {
      title: collectionNames[filters.collection] || "Collection",
      subtitle: "Curated with excellence",
      icon: collectionIcons[filters.collection] || "✨",
      gradient: "from-[#8B3A3A] via-[#1A1F2E] to-[#C9A86A]",
      description: collectionDescriptions[filters.collection] || "Explore our curated collection of premium fragrances.",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Collections", href: "/products" },
        { label: collectionNames[filters.collection] || "Collection" }
      ]
    };
  }

  // Gender-specific contexts
  if (filters.gender) {
    const genderData: Record<string, any> = {
      men: {
        title: "Men's Fragrances",
        subtitle: "Bold & Sophisticated Scents",
        icon: "👔",
        gradient: "from-[#1A1F2E] via-[#2D2D2D] to-[#4A5568]",
        description: "Explore our curated collection of masculine fragrances. From bold oud to fresh aquatic scents, find your signature scent that commands attention and leaves a lasting impression.",
        breadcrumbs: [
          { label: "Home", href: "/" },
          { label: "Shop by Gender", href: "/products" },
          { label: "Men's Fragrances" }
        ]
      },
      women: {
        title: "Women's Fragrances",
        subtitle: "Elegant & Luxurious Scents",
        icon: "👗",
        gradient: "from-[#8B3A3A] via-[#C9A86A] to-[#E8C4A0]",
        description: "Discover elegant and luxurious fragrances for women. From delicate florals to rich oriental blends, find the perfect scent that celebrates your femininity and grace.",
        breadcrumbs: [
          { label: "Home", href: "/" },
          { label: "Shop by Gender", href: "/products" },
          { label: "Women's Fragrances" }
        ]
      },
      unisex: {
        title: "Unisex Fragrances",
        subtitle: "Scents for Everyone",
        icon: "✨",
        gradient: "from-[#C9A86A] via-[#D4A574] to-[#E8C4A0]",
        description: "Explore versatile fragrances that transcend gender boundaries. Universal scents that celebrate individuality and personal expression.",
        breadcrumbs: [
          { label: "Home", href: "/" },
          { label: "Shop by Gender", href: "/products" },
          { label: "Unisex Fragrances" }
        ]
      }
    };

    const gender = filters.gender.toLowerCase();
    return genderData[gender] || genderData.unisex;
  }

  // Scent Family contexts
  if (filters.scentFamily) {
    const scentDescriptions: Record<string, string> = {
      floral: "Delicate and romantic, floral perfumes feature beautiful notes of roses, jasmine, and lily. Perfect for those who appreciate classic elegance.",
      oriental: "Warm and exotic, oriental fragrances blend amber, vanilla, and spices. Experience the rich heritage of Middle Eastern perfumery.",
      woody: "Earthy and sophisticated, woody scents feature sandalwood, cedar, and oud. Timeless fragrances that exude confidence.",
      fresh: "Clean and invigorating, fresh fragrances bring crisp notes of citrus and green. Perfect for daily wear and active lifestyles.",
      citrus: "Bright and energizing, citrus perfumes feature lemon, bergamot, and orange. Uplifting scents that refresh and revitalize.",
      fruity: "Sweet and playful, fruity fragrances blend apple, peach, and berries. Fun and youthful scents for the vibrant spirit.",
      spicy: "Bold and warm, spicy perfumes feature cinnamon, cardamom, and pepper. Captivating scents that leave an impression.",
      aquatic: "Fresh and oceanic, aquatic fragrances evoke the sea breeze. Cool and modern scents for the contemporary individual.",
      green: "Natural and crisp, green fragrances feature grass and herbal notes. Refreshing scents that connect with nature.",
      gourmand: "Sweet and indulgent, gourmand perfumes feature vanilla, caramel, and chocolate. Delicious scents you'll want to wear."
    };

    const familyName = filters.scentFamily.charAt(0).toUpperCase() + filters.scentFamily.slice(1);

    return {
      title: `${familyName} Perfumes`,
      subtitle: `Discover the Art of ${familyName} Fragrances`,
      icon: scentFamilyIcons[filters.scentFamily] || "🌺",
      gradient: "from-[#f9f9f9] via-[#e8e8e8] to-[#C9A86A]",
      description: scentDescriptions[filters.scentFamily] || `Explore our collection of ${familyName.toLowerCase()} fragrances.`,
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Shop by Scent", href: "/products" },
        { label: `${familyName} Scents` }
      ]
    };
  }

  // Region contexts
  if (filters.region) {
    const regionNames: Record<string, string> = {
      UAE: "United Arab Emirates",
      SAUDI: "Saudi Arabia",
      KUWAIT: "Kuwait",
      QATAR: "Qatar",
      OMAN: "Oman",
      BAHRAIN: "Bahrain",
      FRANCE: "France",
      ITALY: "Italy",
      UK: "United Kingdom",
      USA: "United States",
      INDIA: "India",
      THAILAND: "Thailand"
    };

    const regionDescriptions: Record<string, string> = {
      UAE: "Discover luxury fragrances from the United Arab Emirates. Experience the rich perfumery tradition of Dubai and Abu Dhabi.",
      SAUDI: "Explore authentic Arabian perfumes from Saudi Arabia. Traditional oud and oriental scents from the heart of Arabia.",
      KUWAIT: "Premium fragrances from Kuwait. Sophisticated blends that reflect Gulf heritage and modern luxury.",
      FRANCE: "Classic French perfumery at its finest. Elegant and timeless scents from the perfume capital of the world.",
      ITALY: "Italian luxury and craftsmanship. Refined fragrances that embody La Dolce Vita.",
      INDIA: "Rich and diverse scents from India. Traditional attars and modern perfumes with exotic ingredients.",
      THAILAND: "Exotic fragrances from Thailand. Sweet and tropical scents infused with Thai heritage."
    };

    const regionName = regionNames[filters.region] || filters.region;

    return {
      title: `Fragrances from ${regionName}`,
      subtitle: "Authentic Regional Scents",
      icon: regionFlags[filters.region] || "🌍",
      gradient: "from-[#D4A574] via-[#C9A86A] to-[#8B3A3A]",
      description: regionDescriptions[filters.region] || `Explore premium fragrances from ${regionName}.`,
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Shop by Region", href: "/products" },
        { label: regionName }
      ]
    };
  }

  // Occasion contexts
  if (filters.occasion) {
    const occasionData: Record<string, any> = {
      OFFICE: {
        title: "Office Fragrances",
        subtitle: "Professional & Subtle",
        description: "Sophisticated scents perfect for the workplace. Professional fragrances that make the right impression without overwhelming."
      },
      DAILY: {
        title: "Daily Wear Fragrances",
        subtitle: "Fresh & Comfortable",
        description: "Versatile scents for everyday use. Light and fresh fragrances that become your signature scent."
      },
      PARTY: {
        title: "Party Fragrances",
        subtitle: "Bold & Captivating",
        description: "Make an entrance with bold party scents. Fragrances that stand out in social settings and leave lasting impressions."
      },
      WEDDING: {
        title: "Wedding Fragrances",
        subtitle: "Luxurious & Memorable",
        description: "Celebrate special moments with elegant scents. Luxurious fragrances perfect for weddings and formal events."
      },
      RAMADAN: {
        title: "Ramadan Fragrances",
        subtitle: "Traditional & Sacred",
        description: "Spiritual scents for the blessed month. Traditional fragrances that enhance the sacred atmosphere of Ramadan."
      },
      EID: {
        title: "Eid Fragrances",
        subtitle: "Festive & Joyful",
        description: "Celebrate Eid with special fragrances. Festive scents that mark the joyous occasion."
      }
    };

    const occasion = occasionData[filters.occasion] || {
      title: "Occasion Fragrances",
      subtitle: "Perfect for Every Moment",
      description: "Find the perfect scent for any occasion."
    };

    return {
      ...occasion,
      icon: occasionIcons[filters.occasion] || "✨",
      gradient: "from-[#1A1F2E] via-[#8B3A3A] to-[#C9A86A]",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Shop by Occasion", href: "/products" },
        { label: occasion.title }
      ]
    };
  }

  // Oud Type contexts
  if (filters.oudType) {
    const oudData: Record<string, any> = {
      CAMBODIAN: {
        title: "Cambodian Oud",
        subtitle: "Rare & Exquisite",
        description: "Experience the finest Cambodian oud. Rare and exquisite with deep woody notes and unmatched complexity."
      },
      INDIAN: {
        title: "Indian Oud",
        subtitle: "Rich & Bold",
        description: "Discover authentic Indian oud. Rich, bold, and intensely aromatic with deep, resinous character."
      },
      THAI: {
        title: "Thai Oud",
        subtitle: "Sweet & Smooth",
        description: "Explore premium Thai oud. Sweet and smooth with honey-like undertones and gentle warmth."
      },
      MALAYSIAN: {
        title: "Malaysian Oud",
        subtitle: "Balanced & Refined",
        description: "Malaysian oud perfection. Balanced and refined with sophisticated depth."
      },
      MUKHALLAT: {
        title: "Dehn Al Oud",
        subtitle: "Pure Oil Perfection",
        description: "Discover Dehn Al Oud. Pure oil perfection for connoisseurs - the ultimate expression of oud artistry."
      }
    };

    const oud = oudData[filters.oudType] || {
      title: "Premium Oud Collection",
      subtitle: "Luxury Oud Fragrances",
      description: "Discover our collection of premium oud fragrances."
    };

    return {
      ...oud,
      icon: oudTypeIcons[filters.oudType] || "🪵",
      gradient: "from-[#D4A574] via-[#C9A86A] to-[#8B3A3A]",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Oud Collection", href: "/products" },
        { label: oud.title }
      ]
    };
  }

  // Product Type contexts
  if (filters.productType) {
    const typeNames: Record<string, string> = {
      ORIGINAL: "Original Fragrances",
      CLONE: "Designer Clones",
      SIMILAR_DNA: "Similar DNA Fragrances",
      NICHE: "Niche Perfumes",
      ATTAR: "Traditional Attars",
      BODY_SPRAY: "Body Sprays"
    };

    return {
      title: typeNames[filters.productType] || "Products",
      subtitle: "Quality Guaranteed",
      icon: "✨",
      gradient: "from-[#C9A86A] to-[#D4A574]",
      description: `Explore our collection of ${(typeNames[filters.productType] || "products").toLowerCase()}.`,
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Shop by Type", href: "/products" },
        { label: typeNames[filters.productType] || "Products" }
      ]
    };
  }

  // Category context
  if (filters.categorySlug) {
    return {
      title: filters.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      subtitle: "Premium Collection",
      icon: "🌹",
      gradient: "from-[#C9A86A] to-[#D4A574]",
      description: "Discover our premium collection of authentic fragrances.",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Categories", href: "/products" },
        { label: filters.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }
      ]
    };
  }

  // Search results context
  if (filters.search) {
    return {
      title: `Search Results for "${filters.search}"`,
      subtitle: "Find Your Perfect Scent",
      icon: "🔍",
      gradient: "from-[#1A1F2E] to-[#2D2D2D]",
      description: `Showing results for "${filters.search}". Refine your search using the filters below.`,
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Search", href: "/products" },
        { label: `"${filters.search}"` }
      ]
    };
  }

  // Default context
  return {
    title: "All Fragrances",
    subtitle: "Discover Your Signature Scent",
    icon: "🌹",
    gradient: "from-[#C9A86A] via-[#D4A574] to-[#E8C4A0]",
    description: "Explore our complete collection of authentic perfumes, oud, and attars from premium vendors across the UAE.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "All Products" }
    ]
  };
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    categorySlug: searchParams.get('categorySlug') || searchParams.get('category') || '',
    brandId: searchParams.get('brandId') || searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    gender: searchParams.get('gender') || '',
    concentration: searchParams.get('concentration') || '',
    scentFamily: searchParams.get('scentFamily') || '',
    season: searchParams.get('season') || '',
    productType: searchParams.get('productType') || '',
    region: searchParams.get('region') || '',
    occasion: searchParams.get('occasion') || '',
    oudType: searchParams.get('oudType') || '',
    collection: searchParams.get('collection') || '',
    sort: searchParams.get('sort') || 'createdAt_desc',
  });

  const [page, setPage] = useState(1);

  // Sync filters with URL params whenever they change
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
      categorySlug: searchParams.get('categorySlug') || searchParams.get('category') || '',
      brandId: searchParams.get('brandId') || searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      gender: searchParams.get('gender') || '',
      concentration: searchParams.get('concentration') || '',
      scentFamily: searchParams.get('scentFamily') || '',
      season: searchParams.get('season') || '',
      productType: searchParams.get('productType') || '',
      region: searchParams.get('region') || '',
      occasion: searchParams.get('occasion') || '',
      oudType: searchParams.get('oudType') || '',
      collection: searchParams.get('collection') || '',
      sort: searchParams.get('sort') || 'createdAt_desc',
    });
    setPage(1); // Reset to page 1 when filters change
  }, [searchParams]);
  const [showFilters, setShowFilters] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    gender: true,
    concentration: true,
    scent: true,
    season: true,
    productType: true,
    region: true,
    occasion: true,
    oudType: true,
    collection: true,
  });

  // Get dynamic page context
  const pageContext = useMemo(() => getPageContext(filters), [filters]);

  const limit = 20;

  // Fetch products with filters
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters, page],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Add all non-empty filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const res = await apiClient.get(`/products?${params.toString()}`);
      return res;
    },
  });

  // Fetch categories for filter options
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await apiClient.get('/categories');
    },
  });

  // Fetch brands for filter options
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      return await apiClient.get('/brands');
    },
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPage(1);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      categorySlug: '',
      brandId: '',
      minPrice: '',
      maxPrice: '',
      gender: '',
      concentration: '',
      scentFamily: '',
      season: '',
      productType: '',
      region: '',
      occasion: '',
      oudType: '',
      collection: '',
      sort: 'createdAt_desc',
    };
    setFilters(clearedFilters);
    setPage(1);
    router.push('/products');
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== 'sort' && value !== ''
  );

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Dynamic Hero Section - Vibrant & Artistic */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${pageContext.gradient} text-white py-20 mb-0`}>
        {/* Artistic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sparkles */}
          <div className="absolute top-20 left-[15%] w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_25px_10px_rgba(253,224,71,0.6)] animate-pulse"></div>
          <div className="absolute top-40 right-[20%] w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_20px_8px_rgba(251,191,36,0.5)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-[25%] w-2 h-2 bg-orange-300 rounded-full shadow-[0_0_20px_8px_rgba(251,146,60,0.5)] animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Glowing orbs */}
          <div className="absolute top-10 right-[10%] w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-[15%] w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Decorative patterns */}
          <svg className="absolute top-0 right-0 w-64 h-64 opacity-10" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1.5" opacity="0.7" />
            <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-white/90">
            {pageContext.breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index === 0 && <Home className="w-4 h-4" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-yellow-300 transition-colors font-semibold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-bold">{crumb.label}</span>
                )}
                {index < pageContext.breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-white/60" />
                )}
              </div>
            ))}
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/30">
              <span className="text-4xl drop-shadow-lg">{pageContext.icon}</span>
              <span className="text-sm font-black tracking-wider uppercase">{pageContext.subtitle}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] leading-tight">
              {pageContext.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-3xl font-semibold drop-shadow-md">
              {pageContext.description}
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white/20"></div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'w-80' : 'w-0'
            } transition-all duration-300 overflow-hidden`}
          >
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 sticky top-24 border-2 border-amber-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  <Filter className="w-6 h-6 text-amber-600" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center gap-1 hover:shadow-lg transition-all hover:scale-105"
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Search */}
                <div>
                  <label className="block text-sm font-black mb-2 text-gray-700">🔍 Search</label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2.5 border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filters.categorySlug}
                    onChange={(e) => handleFilterChange('categorySlug', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories?.map((cat: any) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <select
                    value={filters.brandId}
                    onChange={(e) => handleFilterChange('brandId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands?.map((brand: any) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <button
                    onClick={() => toggleSection('price')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Price Range</span>
                    {expandedSections.price ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.price && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <button
                    onClick={() => toggleSection('gender')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Gender</span>
                    {expandedSections.gender ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.gender && (
                    <select
                      value={filters.gender}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  )}
                </div>

                {/* Concentration */}
                <div>
                  <button
                    onClick={() => toggleSection('concentration')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Concentration</span>
                    {expandedSections.concentration ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.concentration && (
                    <select
                      value={filters.concentration}
                      onChange={(e) => handleFilterChange('concentration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All</option>
                      <option value="EDP">Eau de Parfum (EDP)</option>
                      <option value="EDT">Eau de Toilette (EDT)</option>
                      <option value="EDC">Eau de Cologne (EDC)</option>
                      <option value="Perfume Oil">Perfume Oil</option>
                      <option value="Parfum">Parfum</option>
                    </select>
                  )}
                </div>

                {/* Scent Family */}
                <div>
                  <button
                    onClick={() => toggleSection('scent')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Scent Family</span>
                    {expandedSections.scent ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.scent && (
                    <select
                      value={filters.scentFamily}
                      onChange={(e) => handleFilterChange('scentFamily', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All</option>
                      <option value="floral">Floral</option>
                      <option value="oriental">Oriental</option>
                      <option value="woody">Woody</option>
                      <option value="fresh">Fresh</option>
                      <option value="citrus">Citrus</option>
                      <option value="fruity">Fruity</option>
                      <option value="spicy">Spicy</option>
                      <option value="aquatic">Aquatic</option>
                      <option value="green">Green</option>
                      <option value="gourmand">Gourmand</option>
                    </select>
                  )}
                </div>

                {/* Product Type */}
                <div>
                  <button
                    onClick={() => toggleSection('productType')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Product Type</span>
                    {expandedSections.productType ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.productType && (
                    <select
                      value={filters.productType}
                      onChange={(e) => handleFilterChange('productType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="ORIGINAL">Original</option>
                      <option value="CLONE">Clone</option>
                      <option value="SIMILAR_DNA">Similar DNA</option>
                      <option value="NICHE">Niche</option>
                      <option value="ATTAR">Attar</option>
                      <option value="BODY_SPRAY">Body Spray</option>
                    </select>
                  )}
                </div>

                {/* Region */}
                <div>
                  <button
                    onClick={() => toggleSection('region')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Region / Origin</span>
                    {expandedSections.region ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.region && (
                    <select
                      value={filters.region}
                      onChange={(e) => handleFilterChange('region', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All Regions</option>
                      <option value="UAE">UAE</option>
                      <option value="SAUDI">Saudi Arabia</option>
                      <option value="KUWAIT">Kuwait</option>
                      <option value="QATAR">Qatar</option>
                      <option value="OMAN">Oman</option>
                      <option value="BAHRAIN">Bahrain</option>
                      <option value="FRANCE">France</option>
                      <option value="ITALY">Italy</option>
                      <option value="UK">United Kingdom</option>
                      <option value="USA">United States</option>
                      <option value="INDIA">India</option>
                      <option value="THAILAND">Thailand</option>
                    </select>
                  )}
                </div>

                {/* Occasion */}
                <div>
                  <button
                    onClick={() => toggleSection('occasion')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Occasion</span>
                    {expandedSections.occasion ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.occasion && (
                    <select
                      value={filters.occasion}
                      onChange={(e) => handleFilterChange('occasion', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All Occasions</option>
                      <option value="OFFICE">Office</option>
                      <option value="DAILY">Daily Wear</option>
                      <option value="PARTY">Party</option>
                      <option value="WEDDING">Wedding</option>
                      <option value="RAMADAN">Ramadan</option>
                      <option value="EID">Eid</option>
                    </select>
                  )}
                </div>

                {/* Oud Type */}
                <div>
                  <button
                    onClick={() => toggleSection('oudType')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Oud Type</span>
                    {expandedSections.oudType ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.oudType && (
                    <select
                      value={filters.oudType}
                      onChange={(e) => handleFilterChange('oudType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All Oud Types</option>
                      <option value="CAMBODIAN">Cambodian Oud</option>
                      <option value="INDIAN">Indian Oud</option>
                      <option value="THAI">Thai Oud</option>
                      <option value="MALAYSIAN">Malaysian Oud</option>
                      <option value="LAOTIAN">Laotian Oud</option>
                      <option value="MUKHALLAT">Mukhallat</option>
                    </select>
                  )}
                </div>

                {/* Collection */}
                <div>
                  <button
                    onClick={() => toggleSection('collection')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Collection</span>
                    {expandedSections.collection ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.collection && (
                    <select
                      value={filters.collection}
                      onChange={(e) => handleFilterChange('collection', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A86A] focus:border-transparent"
                    >
                      <option value="">All Collections</option>
                      <option value="RAMADAN">Ramadan Collection</option>
                      <option value="SIGNATURE">Signature Collection</option>
                      <option value="CELEBRITY">Celebrity Collection</option>
                      <option value="MOST_LOVED">Most Loved</option>
                      <option value="TRENDING">Trending Now</option>
                      <option value="EXCLUSIVE">Exclusive</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-gradient-to-r from-white via-amber-50 to-orange-50 rounded-2xl shadow-xl p-5 mb-8 flex items-center justify-between border-2 border-amber-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 border-2 border-amber-300/30"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>

                <p className="text-gray-700 font-semibold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 font-black text-lg">
                    {data?.pagination?.total || 0}
                  </span>
                  {' '}product{data?.pagination?.total !== 1 ? 's' : ''} found
                  {hasActiveFilters && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 ml-2 font-black">
                      (filtered)
                    </span>
                  )}
                </p>
              </div>

              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="px-4 py-2.5 border-2 border-amber-300 rounded-xl bg-gradient-to-r from-white to-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-bold text-gray-700 hover:shadow-md transition-all cursor-pointer"
              >
                <option value="createdAt_desc">✨ Newest First</option>
                <option value="createdAt_asc">🕐 Oldest First</option>
                <option value="price_asc">💰 Price: Low to High</option>
                <option value="price_desc">💎 Price: High to Low</option>
                <option value="name_asc">🔤 Name: A to Z</option>
                <option value="name_desc">🔡 Name: Z to A</option>
                <option value="rating_desc">⭐ Highest Rated</option>
                <option value="salesCount_desc">🔥 Most Popular</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl p-4 shadow-lg border-2 border-amber-100">
                    <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl h-64 mb-4"></div>
                    <div className="h-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full w-3/4 mb-2"></div>
                    <div className="h-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-8 text-center shadow-xl">
                <div className="text-5xl mb-4">⚠️</div>
                <p className="text-red-700 font-bold text-lg">Failed to load products. Please try again.</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && data?.data.length === 0 && (
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-2xl p-16 text-center border-2 border-amber-200">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Filter className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">No products found</h3>
                <p className="text-gray-700 mb-6 text-lg font-semibold">
                  Try adjusting your filters or search terms
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-black text-base hover:shadow-2xl transition-all hover:scale-105 border-2 border-amber-300/30"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && data?.data.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.data.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {data && data.pagination && data.pagination.totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-3">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-6 py-3 border-2 border-amber-300 rounded-xl bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-orange-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-gray-700 hover:shadow-lg transition-all disabled:hover:shadow-none"
                    >
                      ← Previous
                    </button>

                    <div className="flex gap-2">
                      {[...Array(data.pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        if (
                          pageNum === 1 ||
                          pageNum === data.pagination.totalPages ||
                          (pageNum >= page - 1 && pageNum <= page + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              className={`px-5 py-3 border-2 rounded-xl font-black transition-all ${
                                page === pageNum
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-lg scale-110'
                                  : 'border-amber-300 bg-white hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 text-gray-700 hover:shadow-md'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === page - 2 ||
                          pageNum === page + 2
                        ) {
                          return <span key={pageNum} className="px-3 text-amber-600 font-black text-xl">...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === data.pagination.totalPages}
                      className="px-6 py-3 border-2 border-amber-300 rounded-xl bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-orange-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-gray-700 hover:shadow-lg transition-all disabled:hover:shadow-none"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
