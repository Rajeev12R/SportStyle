"use client"
import ProductCard from "@/components/products/ProductCard"
import { MOCK_PRODUCTS } from "@/lib/constants"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Filter, ArrowDownUp, Shield, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import SidebarFilter from "@/components/products/SidebarFilter"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { useRouter } from "next/navigation"

export default function UniformsPage() {
  const uniformProducts = MOCK_PRODUCTS.filter(
    (product) => product.category === "Uniforms"
  )

  // Gather all available colors and sizes from variants
  const allColors = Array.from(
    new Set(
      uniformProducts.flatMap(
        (p) =>
          p.variants?.filter((v) => v.type === "Color").map((v) => v.value) ||
          []
      )
    )
  )
  const allSizes = Array.from(
    new Set(
      uniformProducts.flatMap(
        (p) =>
          p.variants?.filter((v) => v.type === "Size").map((v) => v.value) || []
      )
    )
  )

  // Derive brands from products (first word of name for demo, or add a brand field to Product type)
  const allBrands = Array.from(
    new Set(uniformProducts.map((p) => p.name.split(" ")[0]))
  )
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string>("__all__")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Math.min(...uniformProducts.map((p) => p.price)),
    Math.max(...uniformProducts.map((p) => p.price)),
  ])
  const minPrice = Math.min(...uniformProducts.map((p) => p.price))
  const maxPrice = Math.max(...uniformProducts.map((p) => p.price))
  const allCategories = Array.from(
    new Set(uniformProducts.map((p) => p.category))
  )

  // Filtering logic update for brand and sizes
  let filteredProducts = uniformProducts.filter((product) => {
    const colorMatch =
      selectedColor === "__all__"
        ? true
        : product.variants?.some(
            (v) => v.type === "Color" && v.value === selectedColor
          )
    const sizeMatch =
      selectedSizes.length === 0
        ? true
        : selectedSizes.some((size) =>
            product.variants?.some((v) => v.type === "Size" && v.value === size)
          )
    const brandMatch =
      selectedBrand === "All Brands"
        ? true
        : product.name.split(" ")[0] === selectedBrand
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1]
    return colorMatch && sizeMatch && brandMatch && priceMatch
  })

  // Sorting
  const [sortBy, setSortBy] = useState<string>("popular")
  filteredProducts = [...filteredProducts]
  if (sortBy === "price_asc") filteredProducts.sort((a, b) => a.price - b.price)
  else if (sortBy === "price_desc")
    filteredProducts.sort((a, b) => b.price - a.price)
  else if (sortBy === "newest")
    filteredProducts.sort((a, b) => b.id.localeCompare(a.id))
  else if (sortBy === "popular")
    filteredProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))

  // Handler for toggling sizes
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  // Handler for reset
  const handleReset = () => {
    setSelectedBrand("All Brands")
    setSelectedSizes([])
    setSelectedColor("__all__")
    setPriceRange([minPrice, maxPrice])
  }

  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }
  const handleViewAllProducts = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (user) {
        router.push("/uniforms")
      } else {
        router.push("/login")
      }
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-4 px-2 md:px-8">
          {/* Sidebar - Desktop Only */}
          <div className="hidden md:block md:w-72 md:sticky md:top-24 flex-shrink-0">
            <SidebarFilter
              categories={allCategories}
              selectedCategory={""}
              onCategoryChange={() => {}}
              brands={["All Brands", ...allBrands]}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              sizes={Array.from(
                new Set(
                  uniformProducts.flatMap(
                    (p) =>
                      p.variants
                        ?.filter((v) => v.type === "Size")
                        .map((v) => v.value) || []
                  )
                )
              )}
              selectedSizes={selectedSizes}
              onSizeToggle={handleSizeToggle}
              colors={Array.from(
                new Set(
                  uniformProducts.flatMap(
                    (p) =>
                      p.variants
                        ?.filter((v) => v.type === "Color")
                        .map((v) => v.value) || []
                  )
                )
              )}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              onReset={handleReset}
            />
          </div>
          {/* Main Content */}
          <div className="flex-1 rounded-xl shadow-sm bg-white">
            {/* Top Bar */}
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center mb-6 md:mb-10 p-4 bg-white border-b border-gray-200 rounded-t-xl">
              {/* Title and count */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Uniforms Collection
                </h2>
                <span className="text-base font-normal text-gray-400/80">
                  {filteredProducts.length} products
                </span>
              </div>
              {/* Controls */}
              <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                {/* Filters Button - Mobile Only */}
                <button
                  className="block md:hidden px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-primary/10 transition w-full flex items-center"
                  onClick={() => setShowMobileFilter(true)}
                >
                  <Filter className="inline-block w-4 h-4 mr-2" /> Filters
                </button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] border border-gray-300">
                    <ArrowDownUp className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="price_asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Sidebar Modal - Mobile Only */}
            {showMobileFilter && (
              <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 md:hidden">
                <div className="bg-white w-full max-w-xs h-full shadow-xl p-4 relative animate-in slide-in-from-left-8">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-primary"
                    onClick={() => setShowMobileFilter(false)}
                    aria-label="Close filters"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <SidebarFilter
                    categories={allCategories}
                    selectedCategory={""}
                    onCategoryChange={() => {}}
                    brands={["All Brands", ...allBrands]}
                    selectedBrand={selectedBrand}
                    onBrandChange={setSelectedBrand}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    sizes={Array.from(
                      new Set(
                        uniformProducts.flatMap(
                          (p) =>
                            p.variants
                              ?.filter((v) => v.type === "Size")
                              .map((v) => v.value) || []
                        )
                      )
                    )}
                    selectedSizes={selectedSizes}
                    onSizeToggle={handleSizeToggle}
                    colors={Array.from(
                      new Set(
                        uniformProducts.flatMap(
                          (p) =>
                            p.variants
                              ?.filter((v) => v.type === "Color")
                              .map((v) => v.value) || []
                        )
                      )
                    )}
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                    onReset={() => {
                      handleReset()
                      setShowMobileFilter(false)
                    }}
                  />
                </div>
                {/* Click outside to close */}
                <div
                  className="flex-1 h-full"
                  onClick={() => setShowMobileFilter(false)}
                />
              </div>
            )}
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4 md:py-6">
                {filteredProducts.map((product: Product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="cursor-pointer"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <img
                  src="/empty-state-illustration.svg"
                  alt="No products"
                  className="mx-auto mb-6 w-40 h-40 opacity-80"
                />
                <p className="text-2xl text-muted-foreground font-semibold mb-2">
                  No uniform styles found. Start by designing your own!
                </p>
                <p className="text-md text-gray-400">
                  Try adjusting your filters or check back soon for new
                  arrivals!
                </p>
              </div>
            )}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogContent className="max-w-md mx-auto text-center p-0 overflow-hidden">
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
                  <p className="text-white/90 mb-0">
                    We appreciate your interest.
                  </p>
                </div>
                {selectedProduct && (
                  <div className="p-6 flex flex-col items-center">
                    <img
                      src={
                        selectedProduct.images?.[0] || "/default-product.png"
                      }
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
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
