"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/products/ProductCard"
import { MOCK_PRODUCTS } from "@/lib/constants"
import { ArrowRight, Bot, Shield, Shirt, Home, Phone } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Product } from "@/types"

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 8)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] bg-[#fafbfc] overflow-hidden">
        {/* Left Model Image */}
        <div className="hidden md:block absolute left-0 bottom-0 h-full w-1/3 z-10 flex items-end">
          <Image
            src="/leftimg.png"
            alt="Model Left"
            width={420}
            height={600}
            className="object-contain object-left h-full w-auto"
            priority
          />
        </div>
        {/* Right Model Image */}
        <div className="hidden md:block absolute right-0 bottom-0 h-full w-1/3 z-10 flex items-end justify-end">
          <Image
            src="/rightimg.png"
            alt="Model Right"
            width={420}
            height={600}
            className="object-contain object-right h-full w-auto"
            priority
          />
        </div>
        {/* Center Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center py-16 px-4">
          <span className="uppercase tracking-widest text-sm font-semibold text-[#b71c2a] mb-4">
            SportStyle
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 leading-tight uppercase">
            The Perfect Place Where
            <br />
            The Sporty Shops
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-500 max-w-xl mx-auto">
            Discover the best sports wear and uniforms here.
          </p>
          <Button
            size="lg"
            className="bg-[#b71c2a] hover:bg-[#a31524] text-white px-10 py-5 text-lg font-bold rounded-md shadow-lg mb-8"
          >
            Shop Now
          </Button>
          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-[#b71c2a] inline-block" />
            <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />
            <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          Explore Our Collections
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          From individual athletic gear to full team kits, find exactly what you
          need to perform your best.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/sportswear" className="group block">
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1641578784369-bf2a6e0ef5f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb3J0cyUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                alt="Sportswear Collection"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="sportswear fashion"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Sportswear
                </h3>
                <p className="text-sm text-gray-200 mb-3">
                  Performance apparel for every activity.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="self-start bg-white/90 text-primary hover:bg-white"
                >
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
          <Link href="/uniforms" className="group block">
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1603373577790-b635631b0302?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjaG9vbCUyMHNwb3J0cyUyMHVuaWZvcm18ZW58MHx8MHx8fDA%3D"
                alt="Uniforms Collection"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="team uniforms"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Team Uniforms
                </h3>
                <p className="text-sm text-gray-200 mb-3">
                  Customizable kits for your entire team.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="self-start bg-white/90 text-primary hover:bg-white"
                >
                  Explore Designs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/sportswear" passHref>
            <Button
              variant="outline"
              size="lg"
              className="text-primary border-primary hover:bg-primary/10"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        {/* Thank You Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-md mx-auto text-center p-0 overflow-hidden">
            {/* Header with icon and gradient */}
            <div className="bg-gradient-to-r from-primary to-green-400 py-6 flex flex-col items-center justify-center relative">
              <div className="bg-white rounded-full p-3 shadow-lg mb-2 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-12 h-12 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white drop-shadow mb-1">
                Thank you!
              </h2>
              <p className="text-white/90 mb-0">We appreciate your interest.</p>
            </div>
            {/* Product info */}
            {selectedProduct && (
              <div className="p-6 flex flex-col items-center">
                <img
                  src={selectedProduct.images?.[0] || "/default-product.png"}
                  alt={selectedProduct.name}
                  className="w-32 h-32 object-cover rounded-lg mb-4 border"
                  onError={(e) => {
                    e.currentTarget.src = "/default-product.png"
                  }}
                />
                <div className="text-lg font-semibold mb-2">
                  {selectedProduct.name}
                </div>
                <div className="text-primary font-bold text-xl mb-2">
                  ₹{selectedProduct.price.toFixed(2)}
                </div>
                <div className="text-gray-500 mb-4">
                  {selectedProduct.category}
                </div>
                <a
                  href={`https://wa.me/919999999999?text=Hi! I'm interested in ${encodeURIComponent(
                    selectedProduct.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition mb-4"
                >
                  WhatsApp Us
                </a>
                {/* Contact Details */}
                <div className="flex flex-col items-center gap-1 text-sm text-gray-600 mt-2">
                  <span>
                    Email:{" "}
                    <a
                      href="mailto:support@sportstyle.com"
                      className="underline hover:text-primary"
                    >
                      support@sportstyle.com
                    </a>
                  </span>
                  <span>
                    Phone:{" "}
                    <a
                      href="tel:+919999999999"
                      className="underline hover:text-primary"
                    >
                      +91-99999-99999
                    </a>
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>
      {/* Why Choose Us Section */}
      <section className="pb-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
          Why Choose SportStyle?
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
          {/* Timeline/Stepper Line */}
          <div
            className="hidden md:block absolute left-1/2 top-12 h-1 w-3/4 bg-gradient-to-r from-primary via-accent to-primary/60 rounded-full -translate-x-1/2 z-0"
            style={{ height: "6px", top: "60px" }}
          />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center bg-white dark:bg-card rounded-xl shadow-lg p-8 w-72 border-2 border-pink-400/60 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-400/20 mb-4 shadow">
              <Shirt className="h-10 w-10 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-pink-500">
              Premium Quality
            </h3>
            <p className="text-sm text-muted-foreground">
              Durable materials and craftsmanship for long-lasting wear.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center bg-white dark:bg-card rounded-xl shadow-lg p-8 w-72 border-2 border-accent/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-4 shadow">
              <Bot className="h-10 w-10 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-accent">
              Innovative Design
            </h3>
            <p className="text-sm text-muted-foreground">
              Modern styles infused with performance-enhancing technology.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center bg-white dark:bg-card rounded-xl shadow-lg p-8 w-72 border-2 border-yellow-400/60 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-400/20 mb-4 shadow">
              <Shield className="h-10 w-10 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-yellow-500">
              Customization Experts
            </h3>
            <p className="text-sm text-muted-foreground">
              Tailor-made uniforms to perfectly represent your team.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
