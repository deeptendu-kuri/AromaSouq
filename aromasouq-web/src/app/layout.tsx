import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AromaSouq - Luxury Fragrances UAE & GCC",
  description: "Discover authentic luxury fragrances and premium perfumes in the UAE. Shop from top brands with fast delivery across the GCC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen`} style={{ fontFamily: 'var(--font-inter)' }} suppressHydrationWarning>
        <QueryProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1A1F2E',
                color: '#fff',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
