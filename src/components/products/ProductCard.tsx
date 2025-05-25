"use client"

import type { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { useState } from "react"
import { useWishlist } from "@/context/WishlistContext"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAddingWishlist, setIsAddingWishlist] = useState(false)
  const { wishlist, addToWishlist } = useWishlist()
  const inWishlist = wishlist.some((item) => item.id === product.id)

  const handleAddToWishlist = () => {
    if (inWishlist) return
    setIsAddingWishlist(true)
    addToWishlist(product)
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
    setTimeout(() => setIsAddingWishlist(false), 500)
  }

  // Extract brand from product name (first word)
  const brand = product.name.split(" ")[0]

  // Extract sizes/colors from variants
  const sizes =
    product.variants?.filter((v) => v.type === "Size").map((v) => v.value) || []
  const colors =
    product.variants?.filter((v) => v.type === "Color").map((v) => v.value) ||
    []

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary hover:-translate-y-1 relative">
      {/* Wishlist/like button */}
      <button
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm  z-10"
        onClick={handleAddToWishlist}
        disabled={isAddingWishlist || inWishlist}
        aria-label={inWishlist ? "In Wishlist" : "Add to Wishlist"}
      >
        <Heart
          className={`h-5 w-5 transition-colors duration-200 ${
            inWishlist
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>
      {/* Product image */}
      {/* <Link href={`/products/${product.id}`} className="block"> */}
      <img
        src={
          product.images?.[0] && product.images[0].length > 0
            ? product.images[0]
            : "/default-product.png"
        }
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-48 object-cover rounded-t-lg"
        data-ai-hint={product.dataAiHint || "product image"}
        onError={(e) => {
          e.currentTarget.src = "/default-product.png"
        }}
      />
      {/* </Link> */}
      <div className="p-4">
        {/* Brand and name */}
        <div className="text-xs text-gray-500 font-medium mb-1">{brand}</div>
        <Link href={`/products/${product.id}`} className="block">
          <div className="text-base font-semibold text-gray-900 truncate mb-1">
            {product.name}
          </div>
        </Link>
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="ml-1">({product.reviews})</span>
          </div>
        )}
        {/* Price */}
        <div className="flex items-center gap-2 mt-1 mb-2">
          <span className="text-lg font-bold text-primary">
            ₹{product.price.toFixed(2)}
          </span>
          {/* If you want to show a discount, add a strikethrough price here */}
        </div>
        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-xs text-gray-400 mr-2">Available sizes:</span>
            {sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-0.5 border border-gray-200 rounded text-xs text-gray-700 bg-gray-50"
              >
                {size}
              </span>
            ))}
          </div>
        )}
        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 items-center">
            <span className="text-xs text-gray-400 mr-2">Colors:</span>
            {colors.map((color) => (
              <span
                key={color}
                className="w-5 h-5 rounded-full border border-gray-200 inline-block"
                style={{ background: color.toLowerCase() }}
                title={color}
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
