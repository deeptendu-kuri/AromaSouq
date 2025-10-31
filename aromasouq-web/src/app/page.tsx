import Link from "next/link"
import { Spotlight } from "@/components/aceternity/spotlight"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, CheckCircle, RefreshCw, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

const categories = [
  { id: 1, name: "Perfumes", slug: "perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", count: 180 },
  { id: 2, name: "Oud", slug: "oud", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop", count: 65 },
  { id: 3, name: "Attars", slug: "attars", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop", count: 42 },
  { id: 4, name: "Bakhoor", slug: "bakhoor", image: "https://images.unsplash.com/photo-1604335398399-1c42dec0d2c0?w=400&h=400&fit=crop", count: 38 },
  { id: 5, name: "Home Fragrance", slug: "home-fragrance", image: "https://images.unsplash.com/photo-1602874801006-e0c7e98bc436?w=400&h=400&fit=crop", count: 55 },
  { id: 6, name: "Essential Oils", slug: "essential-oils", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop", count: 28 },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-deep-navy">
        <Spotlight className="top-0 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight">
              Discover Luxury <span className="text-oud-gold">Fragrances</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Authentic oud, perfumes, and attars from premium UAE vendors
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/products">Explore Collection</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl lg:text-4xl text-center mb-12">Shop by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl lg:text-4xl text-center mb-12">Why Choose AromaSouq</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over 300 AED</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">Authentic Products</h3>
                <p className="text-sm text-muted-foreground">100% genuine fragrances</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">14-day return policy</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-oud-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-oud-gold" />
                </div>
                <h3 className="font-semibold mb-2">WhatsApp Support</h3>
                <p className="text-sm text-muted-foreground">Instant customer service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-[#dfc899] via-[#c9a86a] to-[#a88a54] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl mb-4">Get 50 Coins on Signup!</h2>
          <p className="text-xl mb-8">Subscribe for exclusive offers & updates</p>

          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-gray-900"
            />
            <Button variant="secondary" size="lg" className="bg-deep-navy text-white hover:bg-deep-navy/90">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
