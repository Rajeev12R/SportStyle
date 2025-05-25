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

// Helper to get unique values
const getUnique = (arr: any[]) => Array.from(new Set(arr.filter(Boolean)))

export default function SportswearPage() {
  const sportswearProducts = MOCK_PRODUCTS.filter(
    (product) => product.category === "Sportswear"
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

  // Filtering
  let filteredProducts = sportswearProducts.filter((product) => {
    const colorMatch =
      selectedColor !== "__all__"
        ? product.variants?.some(
            (v) => v.type === "Color" && v.value === selectedColor
          )
        : true
    const sizeMatch =
      selectedSize !== "__all__"
        ? product.variants?.some(
            (v) => v.type === "Size" && v.value === selectedSize
          )
        : true
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
    return colorMatch && sizeMatch && styleMatch && categoryMatch && priceMatch
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

  // Reset all filters
  const clearFilters = () => {
    setSelectedColor("__all__")
    setSelectedSize("__all__")
    setSelectedStyle("__all__")
    setSelectedCategory("__all__")
    setPriceRange([minPrice, maxPrice])
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white  shadow-b border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Showing {filteredProducts.length} Products
          </h2>
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              className="rounded shadow-sm border border-gray-300"
              onClick={() => setShowFilter(true)}
            >
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded shadow-sm border border-gray-300">
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
        {/* Filter Modal/Popover */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-card rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                onClick={() => setShowFilter(false)}
                aria-label="Close filter"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-bold mb-4">Filter Products</h3>
              <div className="space-y-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={minPrice}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-20 border rounded px-2 py-1"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-20 border rounded px-2 py-1"
                    />
                  </div>
                </div>
                {/* Color */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Color
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="__all__">All Colors</option>
                    {allColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Size */}
                <div>
                  <label className="block text-sm font-medium mb-1">Size</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="__all__">All Sizes</option>
                    {allSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Style */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Style
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                  >
                    <option value="__all__">All Styles</option>
                    {allStyles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="__all__">All Categories</option>
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                  <Button type="button" onClick={() => setShowFilter(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 py-8">
            {filteredProducts.map((product: Product) => (
              <div
                className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg rounded-lg bg-white"
                key={product.id}
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
              No sportswear products found at this time.
            </p>
            <p className="text-md text-muted-foreground">
              Try adjusting your filters or check back soon for new arrivals!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
