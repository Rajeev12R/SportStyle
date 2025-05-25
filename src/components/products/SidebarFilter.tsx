import React from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface SidebarFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (cat: string) => void
  brands: string[]
  selectedBrand: string
  onBrandChange: (brand: string) => void
  minPrice: number
  maxPrice: number
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  sizes: string[]
  selectedSizes: string[]
  onSizeToggle: (size: string) => void
  colors: string[]
  selectedColor: string
  onColorChange: (color: string) => void
  onReset: () => void
}

const colorSwatchPalette = [
  "#6366f1",
  "#2563eb",
  "#10b981",
  "#f59e42",
  "#f43f5e",
  "#a855f7",
  "#fbbf24",
  "#6b7280",
  "#e11d48",
  "#14b8a6",
  "#f97316",
  "#b91c1c",
]

export default function SidebarFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrand,
  onBrandChange,
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
  sizes,
  selectedSizes,
  onSizeToggle,
  colors,
  selectedColor,
  onColorChange,
  onReset,
}: SidebarFilterProps) {
  return (
    <aside className="w-full md:w-64 bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          className="text-primary text-sm font-medium hover:underline"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
      {/* Category */}
      <div>
        <div className="text-xs font-semibold text-gray-500 mb-2">Category</div>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="accent-primary"
              />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Brand */}
      <div>
        <div className="text-xs font-semibold text-gray-500 mb-2">Brand</div>
        <div className="flex flex-col gap-1">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => onBrandChange(brand)}
                className="accent-primary"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div>
        <div className="text-xs font-semibold text-gray-500 mb-2">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </div>
        <Slider
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onValueChange={(vals) => onPriceChange([vals[0], vals[1]])}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}+</span>
        </div>
      </div>
      {/* Sizes */}
      <div>
        <div className="text-xs font-semibold text-gray-500 mb-2">
          Popular Sizes
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 rounded border text-xs font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-primary/10"
              }`}
              onClick={() => onSizeToggle(size)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
