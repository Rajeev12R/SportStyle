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
import { Filter, ArrowDownUp, X } from "lucide-react"
import { useState } from "react"
import SidebarFilter from "@/components/products/SidebarFilter"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Helper to get unique values
const getUnique = (arr: any[]) => Array.from(new Set(arr.filter(Boolean)))

export default function SportswearPage() {
  const sportswearProducts = MOCK_PRODUCTS.filter(
    (product) => product.category === "Sportswear"
  )

  // Pagination state
  const productsPerPage = 16
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(sportswearProducts.length / productsPerPage)
  const paginatedProducts = sportswearProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  // Gather all available filter options
  const allColors = getUnique(
    sportswearProducts.flatMap(
      (p) =>
        p.variants?.filter((v) => v.type === "Color").map((v) => v.value) || []
    )
  )
  const allSizes = getUnique(
    sportswearProducts.flatMap(
      (p) =>
        p.variants?.filter((v) => v.type === "Size").map((v) => v.value) || []
    )
  )
  const allStyles = getUnique(
    sportswearProducts.flatMap(
      (p) =>
        p.variants?.filter((v) => v.type === "Style").map((v) => v.value) || []
    )
  )
  const allCategories = getUnique(MOCK_PRODUCTS.map((p) => p.category))
  const minPrice = Math.min(...sportswearProducts.map((p) => p.price))
  const maxPrice = Math.max(...sportswearProducts.map((p) => p.price))

  // Filter state
  const [showFilter, setShowFilter] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>("__all__")
  const [selectedSize, setSelectedSize] = useState<string>("__all__")
  const [selectedStyle, setSelectedStyle] = useState<string>("__all__")
  const [selectedCategory, setSelectedCategory] = useState<string>("__all__")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ])
  const [sortBy, setSortBy] = useState<string>("featured")

  // Derive brands from products (first word of name for demo, or add a brand field to Product type)
  const allBrands = getUnique(
    sportswearProducts.map((p) => p.name.split(" ")[0])
  )
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  // Filtering
  let filteredProducts = sportswearProducts.filter((product) => {
    const colorMatch =
      selectedColor !== "__all__"
        ? product.variants?.some(
            (v) => v.type === "Color" && v.value === selectedColor
          )
        : true
    const sizeMatch =
      selectedSizes.length === 0
        ? true
        : selectedSizes.some((size) =>
            product.variants?.some((v) => v.type === "Size" && v.value === size)
          )
    const styleMatch =
      selectedStyle !== "__all__"
        ? product.variants?.some(
            (v) => v.type === "Style" && v.value === selectedStyle
          )
        : true
    const categoryMatch =
      selectedCategory !== "__all__"
        ? product.category === selectedCategory
        : true
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1]
    const brandMatch =
      selectedBrand === "All Brands"
        ? true
        : product.name.split(" ")[0] === selectedBrand
    return (
      colorMatch &&
      sizeMatch &&
      styleMatch &&
      categoryMatch &&
      priceMatch &&
      brandMatch
    )
  })

  // Sorting
  filteredProducts = [...filteredProducts]
  if (sortBy === "price_asc") filteredProducts.sort((a, b) => a.price - b.price)
  else if (sortBy === "price_desc")
    filteredProducts.sort((a, b) => b.price - a.price)
  else if (sortBy === "newest")
    filteredProducts.sort((a, b) => b.id.localeCompare(a.id))
  else if (sortBy === "rating")
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))

  // Pagination after filtering/sorting
  const paginatedFilteredProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  // Handler for toggling sizes
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  // Handler for reset
  const handleReset = () => {
    setSelectedColor("__all__")
    setSelectedSize("__all__")
    setSelectedStyle("__all__")
    setSelectedCategory("__all__")
    setSelectedBrand("All Brands")
    setSelectedSizes([])
    setPriceRange([minPrice, maxPrice])
  }

  // Handler for page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Handler for card click
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-4 px-2 md:px-8">
        {/* Sidebar - Desktop Only */}
        <div className="hidden md:block w-72 md:sticky md:top-24 flex-shrink-0">
          <SidebarFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            brands={["All Brands", ...allBrands]}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            sizes={allSizes}
            selectedSizes={selectedSizes}
            onSizeToggle={handleSizeToggle}
            colors={allColors}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            onReset={() => {
              handleReset()
              setShowMobileFilter(false)
            }}
          />
        </div>
        {/* Main Content */}
        <div className="flex-1 rounded-xl shadow-sm bg-white w-full">
          {/* Top Bar */}
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center mb-6 md:mb-10 p-4 bg-white border-b border-gray-200 rounded-t-xl">
            {/* Title and count */}
            <div className="flex flex-col gap-1">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                SportWear Collection
              </h2>
              <span className="text-base font-normal text-gray-400/80">
                {filteredProducts.length} products
              </span>
            </div>
            {/* Controls */}
            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
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
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Avg. Customer Rating</SelectItem>
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
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  brands={["All Brands", ...allBrands]}
                  selectedBrand={selectedBrand}
                  onBrandChange={setSelectedBrand}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  sizes={allSizes}
                  selectedSizes={selectedSizes}
                  onSizeToggle={handleSizeToggle}
                  colors={allColors}
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
          {/* Product Grid & Pagination */}
          {paginatedFilteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:py-6">
                {paginatedFilteredProducts.map((product: Product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="cursor-pointer"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              <div className="flex flex-wrap justify-center items-center gap-2 py-6">
                <button
                  className="px-3 py-2 rounded border text-sm font-medium disabled:opacity-50 min-w-[40px]"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-2 rounded border text-sm font-medium min-w-[40px] transition-colors duration-150 ${
                      currentPage === i + 1
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-primary/10"
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-2 rounded border text-sm font-medium disabled:opacity-50 min-w-[40px]"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
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
            </>
          ) : (
            <div className="text-center py-16">
              <img
                src="/empty-state-illustration.svg"
                alt="No products"
                className="mx-auto mb-6 w-40 h-40 opacity-80"
              />
              <p className="text-2xl text-muted-foreground font-semibold mb-2">
                No sportswear products found at this time.
              </p>
              <p className="text-md text-gray-400">
                Try adjusting your filters or check back soon for new arrivals!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
