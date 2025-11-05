'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ui/product-card';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    gender: searchParams.get('gender') || '',
    concentration: searchParams.get('concentration') || '',
    scentFamily: searchParams.get('scentFamily') || '',
    season: searchParams.get('season') || '',
    // Phase 3: New classification filters
    productType: searchParams.get('productType') || '',
    region: searchParams.get('region') || '',
    occasion: searchParams.get('occasion') || '',
    oudType: searchParams.get('oudType') || '',
    collection: searchParams.get('collection') || '',
    sort: searchParams.get('sort') || 'createdAt_desc',
  });

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    gender: true,
    concentration: true,
    scent: true,
    season: true,
    // Phase 3: New sections
    productType: true,
    region: true,
    occasion: true,
    oudType: true,
    collection: true,
  });

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
    setPage(1); // Reset to page 1 when filters change

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
      category: '',
      brand: '',
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Fragrances</h1>
          <p className="text-gray-600">
            Discover our collection of authentic perfumes
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'w-80' : 'w-0'
            } transition-all duration-300 overflow-hidden`}
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories?.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands?.map((brand: any) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range - Collapsible */}
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                {/* Gender - Collapsible */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All</option>
                      <option value="MALE">Men</option>
                      <option value="FEMALE">Women</option>
                      <option value="UNISEX">Unisex</option>
                    </select>
                  )}
                </div>

                {/* Concentration - Collapsible */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                {/* Scent Family - Collapsible */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All</option>
                      <option value="Floral">Floral</option>
                      <option value="Oriental">Oriental/Amber</option>
                      <option value="Woody">Woody</option>
                      <option value="Fresh">Fresh/Aquatic</option>
                      <option value="Citrus">Citrus</option>
                      <option value="Fruity">Fruity</option>
                      <option value="Spicy">Spicy</option>
                      <option value="Gourmand">Gourmand</option>
                    </select>
                  )}
                </div>

                {/* Season - Collapsible */}
                <div>
                  <button
                    onClick={() => toggleSection('season')}
                    className="w-full flex items-center justify-between text-sm font-medium mb-2"
                  >
                    <span>Season</span>
                    {expandedSections.season ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.season && (
                    <select
                      value={filters.season}
                      onChange={(e) => handleFilterChange('season', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All Seasons</option>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Fall">Fall/Autumn</option>
                      <option value="Winter">Winter</option>
                      <option value="Year-round">Year-round</option>
                    </select>
                  )}
                </div>

                {/* Product Type - Collapsible (Phase 3) */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                {/* Region - Collapsible (Phase 3) */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                {/* Occasion - Collapsible (Phase 3) */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                {/* Oud Type - Collapsible (Phase 3) */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                {/* Collection - Collapsible (Phase 3) */}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>

                <p className="text-gray-600">
                  {data?.pagination?.total || 0} product{data?.pagination?.total !== 1 ? 's' : ''} found
                  {hasActiveFilters && (
                    <span className="text-purple-600 ml-2">
                      (filtered)
                    </span>
                  )}
                </p>
              </div>

              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="createdAt_desc">Newest First</option>
                <option value="createdAt_asc">Oldest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="salesCount_desc">Most Popular</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">Failed to load products. Please try again.</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && data?.data.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Filter className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
                  <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {[...Array(data.pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        // Show first, last, current, and adjacent pages
                        if (
                          pageNum === 1 ||
                          pageNum === data.pagination.totalPages ||
                          (pageNum >= page - 1 && pageNum <= page + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              className={`px-4 py-2 border rounded-lg ${
                                page === pageNum
                                  ? 'bg-purple-600 text-white border-purple-600'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === page - 2 ||
                          pageNum === page + 2
                        ) {
                          return <span key={pageNum} className="px-2">...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === data.pagination.totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
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
