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
import { Filter, ArrowDownUp, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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

  const [selectedColor, setSelectedColor] = useState<string>("__all__")
  const [selectedSize, setSelectedSize] = useState<string>("__all__")
  const [sortBy, setSortBy] = useState<string>("popular")

  // Filtering
  let filteredProducts = uniformProducts.filter((product) => {
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
    return colorMatch && sizeMatch
  })

  // Sorting
  filteredProducts = [...filteredProducts]
  if (sortBy === "price_asc") filteredProducts.sort((a, b) => a.price - b.price)
  else if (sortBy === "price_desc")
    filteredProducts.sort((a, b) => b.price - a.price)
  else if (sortBy === "newest")
    filteredProducts.sort((a, b) => b.id.localeCompare(a.id))
  // Assuming id encodes recency
  else if (sortBy === "popular")
    filteredProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white  shadow-b border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Browse Our Uniform Styles ({filteredProducts.length})
          </h2>
          <div className="flex gap-4 items-center">
            {/* Color Filter */}
            {allColors.length > 0 && (
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-[140px] rounded shadow-sm border border-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All Colors</SelectItem>
                  {allColors.filter(Boolean).map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {/* Size Filter */}
            {allSizes.length > 0 && (
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-[140px] rounded shadow-sm border border-gray-300">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All Sizes</SelectItem>
                  {allSizes.filter(Boolean).map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {/* Sorting */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded shadow-sm border border-gray-300">
                <ArrowDownUp className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
              No uniform styles found. Start by designing your own!
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
