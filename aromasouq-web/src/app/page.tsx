"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Types for API responses
interface ScentFamily {
  scentFamily: string
  _count: number
}

interface GenderBanner {
  men: number
  women: number
  unisex: number
}

interface Occasion {
  occasion: string
  _count: number
}

interface Region {
  region: string
  _count: number
}

interface OudType {
  oudType: string
  _count: number
}

interface Collection {
  collection: string
  _count: number
}

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  salePrice?: number
  discountPercent?: number
  isOnSale: boolean
  gender: string
  scentFamily: string
  region: string
  collection?: string
  images: { url: string }[]
  vendor: { businessName: string }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Category icons mapping
const categoryIcons = {
  perfumes: "🌹",
  bakhoor: "🪔",
  oud: "💎",
  "gift-sets": "🎁",
  "attar-oils": "✨",
  "home-fragrance": "🏠",
  "body-mist": "💧",
  "natural-oils": "🌿"
}

// Scent family icons
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
}

// Occasion icons
const occasionIcons: Record<string, { icon: string; tag: string }> = {
  OFFICE: { icon: "💼", tag: "Professional & Subtle" },
  PARTY: { icon: "🎉", tag: "Bold & Captivating" },
  DATE: { icon: "💝", tag: "Romantic & Alluring" },
  WEDDING: { icon: "💍", tag: "Luxurious & Memorable" },
  RAMADAN: { icon: "🌙", tag: "Traditional & Sacred" },
  DAILY: { icon: "🌞", tag: "Fresh & Comfortable" }
}

// Region flags
const regionFlags: Record<string, string> = {
  UAE: "🇦🇪",
  SAUDI: "🇸🇦",
  KUWAIT: "🇰🇼",
  QATAR: "🇶🇦",
  OMAN: "🇴🇲",
  BAHRAIN: "🇧🇭",
  FRANCE: "🇫🇷",
  ITALY: "🇮🇹",
  USA: "🇺🇸",
  INDIA: "🇮🇳",
  THAILAND: "🇹🇭"
}

// Oud type details
const oudTypeDetails: Record<string, { icon: string; desc: string }> = {
  CAMBODIAN: { icon: "🪔", desc: "Rare and exquisite with deep woody notes" },
  INDIAN: { icon: "💎", desc: "Rich, bold, and intensely aromatic" },
  THAI: { icon: "✨", desc: "Sweet, smooth with honey-like undertones" }
}

export default function HomePage() {
  const [scentFamilies, setScentFamilies] = useState<ScentFamily[]>([])
  const [genderBanner, setGenderBanner] = useState<GenderBanner | null>(null)
  const [occasions, setOccasions] = useState<Occasion[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [oudTypes, setOudTypes] = useState<OudType[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [signatureProducts, setSignatureProducts] = useState<Product[]>([])
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([])
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 })

  useEffect(() => {
    // Fetch all data
    const fetchData = async () => {
      try {
        const [
          scentRes,
          genderRes,
          occasionsRes,
          regionsRes,
          oudRes,
          collectionsRes,
          signatureRes,
          flashSaleRes,
          bestSellersRes,
          newArrivalsRes
        ] = await Promise.all([
          fetch(`${API_URL}/products/scent-families`),
          fetch(`${API_URL}/products/gender-banners`),
          fetch(`${API_URL}/products/occasions`),
          fetch(`${API_URL}/products/regions`),
          fetch(`${API_URL}/products/oud-types`),
          fetch(`${API_URL}/products/collections`),
          fetch(`${API_URL}/products/collection/SIGNATURE`),
          fetch(`${API_URL}/products?isOnSale=true&limit=10`),
          fetch(`${API_URL}/products/collection/MOST_LOVED`),
          fetch(`${API_URL}/products/new-arrivals?limit=10`)
        ])

        if (scentRes.ok) setScentFamilies(await scentRes.json())
        if (genderRes.ok) setGenderBanner(await genderRes.json())
        if (occasionsRes.ok) setOccasions(await occasionsRes.json())
        if (regionsRes.ok) setRegions(await regionsRes.json())
        if (oudRes.ok) setOudTypes(await oudRes.json())
        if (collectionsRes.ok) setCollections(await collectionsRes.json())
        if (signatureRes.ok) {
          const data = await signatureRes.json()
          setSignatureProducts(Array.isArray(data) ? data : (data.products || []))
        }
        if (flashSaleRes.ok) {
          const data = await flashSaleRes.json()
          setFlashSaleProducts(Array.isArray(data) ? data : (data.products || []))
        }
        if (bestSellersRes.ok) {
          const data = await bestSellersRes.json()
          setBestSellers(Array.isArray(data) ? data : (data.products || []))
        }
        if (newArrivalsRes.ok) {
          const data = await newArrivalsRes.json()
          setNewArrivals(Array.isArray(data) ? data : (data.products || []))
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Hero Section */}
      <section className="relative h-[550px] overflow-hidden bg-gradient-to-br from-[#1A1F2E] via-[#2D2D2D] to-[#C9A86A] flex items-center justify-center text-white mb-12">
        <div className="text-center z-10 max-w-[700px] px-5">
          <h1 className="text-5xl lg:text-[52px] mb-5 font-bold leading-tight">
            Discover Your Signature Scent
          </h1>
          <p className="text-[19px] mb-8 opacity-95">
            Explore our exclusive collection of premium Arabic perfumes
          </p>
          <Button
            asChild
            className="bg-gradient-to-br from-[#C9A86A] to-[#D4A574] text-[#1A1F2E] hover:translate-y-[-2px] transition-transform px-10 py-6 rounded-full text-base font-semibold shadow-[0_4px_12px_rgba(201,168,106,0.3)]"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-[1400px] mx-auto px-[5%] mb-16">
        <div className="text-center mb-10">
          <h2 className="text-[32px] text-[#1A1F2E] font-bold mb-2">Shop by Category</h2>
          <p className="text-[15px] text-gray-600">Discover our curated collections</p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-5 max-w-[1000px] mx-auto">
          {Object.entries(categoryIcons).map(([slug, icon]) => (
            <Link
              key={slug}
              href={`/products?categorySlug=${slug}`}
              className="text-center cursor-pointer hover:translate-y-[-5px] transition-transform"
            >
              <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#C9A86A] to-[#D4A574] mx-auto mb-3 flex items-center justify-center text-[44px] shadow-[0_4px_12px_rgba(201,168,106,0.3)] hover:shadow-[0_6px_20px_rgba(201,168,106,0.4)] hover:scale-105 transition-all">
                {icon}
              </div>
              <div className="font-semibold text-[#2D2D2D] text-sm capitalize">
                {slug.replace("-", " ")}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Brand Signature Collection */}
      {signatureProducts.length > 0 && (
        <section className="bg-gradient-to-br from-[#8B3A3A] to-[#1A1F2E] py-16 mb-16 text-white">
          <div className="max-w-[1400px] mx-auto px-[5%]">
            <div className="text-center mb-10">
              <h2 className="text-[32px] font-bold mb-2">
                Our Brand Signature Collection <span className="text-[32px]">⭐</span>
              </h2>
              <p className="text-[15px] text-[#C9A86A]">
                Handcrafted with passion, exclusively by AromaSouq
              </p>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4">
                {signatureProducts.map((product) => (
                  <ProductCard key={product.id} product={product} badge="OUR BRAND ⭐" badgeColor="bg-green-700" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="bg-gradient-to-br from-[#1A1F2E] to-[#2D2D2D] py-12 mb-16">
          <div className="max-w-[1400px] mx-auto px-[5%]">
            <div className="text-center mb-10">
              <h2 className="text-[32px] text-white font-bold mb-2">⚡ Flash Sale</h2>
              <p className="text-[15px] text-[#E8C4A0]">Hurry! Limited time offers</p>
            </div>

            <div className="flex justify-center gap-5 mb-8">
              <div className="text-center bg-white/10 backdrop-blur-lg px-5 py-3 rounded-lg">
                <div className="text-[32px] font-bold text-[#C9A86A] leading-none">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[11px] text-white uppercase tracking-wide mt-1">Hours</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-lg px-5 py-3 rounded-lg">
                <div className="text-[32px] font-bold text-[#C9A86A] leading-none">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-[11px] text-white uppercase tracking-wide mt-1">Minutes</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-lg px-5 py-3 rounded-lg">
                <div className="text-[32px] font-bold text-[#C9A86A] leading-none">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-[11px] text-white uppercase tracking-wide mt-1">Seconds</div>
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4">
                {flashSaleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    badge={`-${product.discountPercent}% OFF`}
                    badgeColor="bg-[#8B3A3A]"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Twin Banner (Men/Women) */}
      <section className="max-w-[1400px] mx-auto px-[5%] mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/products?gender=men"
            className="h-[350px] rounded-[14px] overflow-hidden relative cursor-pointer shadow-md hover:translate-y-[-5px] hover:shadow-lg transition-all bg-gradient-to-br from-[#1A1F2E]/85 to-[#2D2D2D]/70"
          >
            <div className="absolute bottom-9 left-9 text-white">
              <h3 className="text-[38px] mb-2 font-bold">For Him</h3>
              <p className="text-[15px] mb-5 opacity-95">Bold and sophisticated fragrances</p>
              <span className="bg-white text-[#1A1F2E] px-7 py-3 rounded-full inline-block font-semibold text-sm hover:bg-[#C9A86A] hover:translate-y-[-2px] transition-all">
                Shop Men's
              </span>
            </div>
          </Link>

          <Link
            href="/products?gender=women"
            className="h-[350px] rounded-[14px] overflow-hidden relative cursor-pointer shadow-md hover:translate-y-[-5px] hover:shadow-lg transition-all bg-gradient-to-br from-[#8B3A3A]/75 to-[#C9A86A]/70"
          >
            <div className="absolute bottom-9 left-9 text-white">
              <h3 className="text-[38px] mb-2 font-bold">For Her</h3>
              <p className="text-[15px] mb-5 opacity-95">Elegant and luxurious scents</p>
              <span className="bg-white text-[#1A1F2E] px-7 py-3 rounded-full inline-block font-semibold text-sm hover:bg-[#C9A86A] hover:translate-y-[-2px] transition-all">
                Shop Women's
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Shop by Scent Family */}
      {scentFamilies.length > 0 && (
        <section className="bg-[#f9f9f9] py-12 mb-16">
          <div className="max-w-[1400px] mx-auto px-[5%]">
            <div className="text-left mb-8">
              <h2 className="text-[32px] text-[#1A1F2E] font-bold mb-2">Shop by Scent Family</h2>
              <p className="text-[15px] text-gray-600">Find your perfect fragrance DNA</p>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4">
                {scentFamilies.map((item) => (
                <Link
                  key={item.scentFamily}
                  href={`/products?scentFamily=${item.scentFamily}`}
                  className="flex-shrink-0 w-[220px] bg-white rounded-xl overflow-hidden shadow-sm hover:translate-y-[-5px] hover:shadow-lg transition-all cursor-pointer text-center"
                >
                  <div className="text-[56px] pt-8 pb-5 bg-gradient-to-br from-[#f9f9f9] to-[#e8e8e8]">
                    {scentFamilyIcons[item.scentFamily] || "🌺"}
                  </div>
                  <div className="p-5">
                    <div className="text-base font-bold text-[#2D2D2D] mb-1 capitalize">
                      {item.scentFamily}
                    </div>
                    <div className="text-xs text-[#C9A86A] font-semibold">
                      {item._count} Products
                    </div>
                  </div>
                </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Luxury Oud Collection */}
      {oudTypes.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-[5%] mb-16">
        <div className="text-center mb-10">
          <h2 className="text-[32px] text-[#1A1F2E] font-bold mb-2">Luxury Oud Collection</h2>
          <p className="text-[15px] text-gray-600">Discover the finest oud varieties from around the world</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oudTypes.map((item) => (
            <Link
              key={item.oudType}
              href={`/products?oudType=${item.oudType}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:translate-y-[-5px] hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="h-[240px] bg-gradient-to-br from-[#D4A574] to-[#C9A86A] flex items-center justify-center text-[64px]">
                {oudTypeDetails[item.oudType]?.icon || "🪵"}
              </div>
              <div className="p-6 text-center">
                <div className="text-lg font-bold text-[#2D2D2D] mb-2 capitalize">
                  {item.oudType.replace("_", " ")} Oud
                </div>
                <div className="text-[13px] text-gray-600 mb-4">
                  {oudTypeDetails[item.oudType]?.desc || "Premium quality oud"}
                </div>
                <span className="bg-white text-[#1A1F2E] border-2 border-[#e8e8e8] px-7 py-3 rounded-full inline-block font-semibold text-sm hover:bg-[#C9A86A] hover:border-[#C9A86A] transition-all">
                  Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="bg-[#f9f9f9] py-12 mb-16">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-left mb-8">
            <h2 className="text-[32px] text-[#1A1F2E] font-bold mb-2">Best Sellers</h2>
            <p className="text-[15px] text-gray-600">Our most loved fragrances</p>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} badge="Bestseller" badgeColor="bg-green-700" />
              ))}
            </div>
          </div>
        </div>
        </section>
      )}

      {/* Shop by Occasion */}
      {occasions.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-[5%] mb-16">
        <div className="text-center mb-10">
          <h2 className="text-[32px] text-[#1A1F2E] font-bold mb-2">Shop by Occasion</h2>
          <p className="text-[15px] text-gray-600">Find the perfect scent for every moment</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {occasions.map((item) => (
            <Link
              key={item.occasion}
              href={`/products?occasion=${item.occasion}`}
              className="bg-white rounded-xl p-8 text-center shadow-sm hover:translate-y-[-3px] hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-[#C9A86A]"
            >
              <div className="text-[48px] mb-4">
                {occasionIcons[item.occasion]?.icon || "✨"}
              </div>
              <div className="text-[15px] font-bold text-[#2D2D2D] mb-1 capitalize">
                {item.occasion.toLowerCase().replace("_", " ")}
              </div>
              <div className="text-[11px] text-[#C9A86A] font-semibold">
                {occasionIcons[item.occasion]?.tag || "Special"}
              </div>
            </Link>
          ))}
        </div>
        </section>
      )}

      {/* Shop by Region */}
      {regions.length > 0 && (
        <section className="bg-[#f9f9f9] py-12 mb-16">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-left mb-8">
            <h2 className="text-[32px] text-[#1A1F2E] font-bold mb-2">Shop by Region</h2>
            <p className="text-[15px] text-gray-600">Explore fragrances from around the world</p>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4">
              {regions.map((item) => (
                <Link
                  key={item.region}
                  href={`/products?region=${item.region}`}
                  className="flex-shrink-0 w-[240px] bg-white rounded-xl overflow-hidden shadow-sm hover:translate-y-[-5px] hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="h-[140px] flex items-center justify-center text-[72px] bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8]">
                    {regionFlags[item.region] || "🌍"}
                  </div>
                  <div className="p-5 text-center">
                    <div className="text-base font-bold text-[#2D2D2D] mb-1 capitalize">
                      {item.region.replace("_", " ")}
                    </div>
                    <div className="text-xs text-[#C9A86A] font-semibold">
                      {item._count} Products
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        </section>
      )}
    </div>
  )
}

// Product Card Component
function ProductCard({
  product,
  badge,
  badgeColor
}: {
  product: Product
  badge?: string
  badgeColor?: string
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex-shrink-0 w-[260px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:translate-y-[-4px] transition-all cursor-pointer"
    >
      <div className="relative w-full h-[240px] bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8]">
        {badge && (
          <div className={`absolute top-2 right-2 ${badgeColor || "bg-[#8B3A3A]"} text-white px-2 py-1 rounded-full text-[10px] font-semibold`}>
            {badge}
          </div>
        )}
        <button className="absolute top-2 left-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:bg-[#C9A86A] hover:text-white transition-all">
          ♡
        </button>
      </div>
      <div className="p-3">
        <div className="text-[10px] text-[#C9A86A] font-semibold uppercase tracking-wide mb-1">
          {product.vendor?.businessName || "AromaSouq"}
        </div>
        <div className="text-sm font-semibold text-[#2D2D2D] mb-2 h-9 overflow-hidden line-clamp-2">
          {product.name}
        </div>
        <div className="flex items-center gap-1 mb-2 text-xs">
          <span className="text-[#C9A86A]">★★★★★</span>
          <span className="text-gray-500">(0)</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          {product.isOnSale && product.salePrice ? (
            <>
              <span className="text-lg font-bold text-[#1A1F2E]">
                AED {product.salePrice}
              </span>
              <span className="text-[13px] text-gray-400 line-through">
                AED {product.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-[#1A1F2E]">
              AED {product.price}
            </span>
          )}
        </div>
        <button className="w-full py-2 bg-[#1A1F2E] text-white rounded-md font-semibold text-xs hover:bg-[#C9A86A] hover:text-[#1A1F2E] transition-all">
          Add to Cart
        </button>
      </div>
    </Link>
  )
}
