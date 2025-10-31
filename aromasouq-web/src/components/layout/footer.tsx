import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-deep-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-heading text-2xl text-oud-gold mb-4">AromaSouq</h3>
            <p className="text-sm text-gray-300 mb-4">
              Your premier destination for authentic luxury fragrances, oud, and attars from the finest UAE vendors.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:text-oud-gold">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-oud-gold">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-oud-gold">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/products" className="hover:text-oud-gold transition-colors">All Products</Link></li>
              <li><Link href="/products?category=perfumes" className="hover:text-oud-gold transition-colors">Perfumes</Link></li>
              <li><Link href="/products?category=oud" className="hover:text-oud-gold transition-colors">Oud</Link></li>
              <li><Link href="/products?category=attars" className="hover:text-oud-gold transition-colors">Attars</Link></li>
              <li><Link href="/products?category=bakhoor" className="hover:text-oud-gold transition-colors">Bakhoor</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-oud-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-oud-gold transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="hover:text-oud-gold transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-oud-gold transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-oud-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to get 50 coins and exclusive offers!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2025 AromaSouq. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-oud-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-oud-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
