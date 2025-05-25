"use client"

import { MOCK_PRODUCTS } from "@/lib/constants"
import type { Product, ProductVariant } from "@/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  CheckCircle,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { use, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import ProductCard from "@/components/products/ProductCard" // For related products

// Helper to get product by ID
const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find((p) => p.id === id)
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({})
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Unwrap params using React.use()
  const unwrappedParams = use(params)

  useEffect(() => {
    const fetchedProduct = getProductById(unwrappedParams.id)
    if (fetchedProduct) {
      setProduct(fetchedProduct)
      // Initialize selected variants
      const initialVariants: Record<string, string> = {}
      fetchedProduct.variants?.forEach((variantGroup) => {
        const firstOption = fetchedProduct.variants?.find(
          (v) => v.type === variantGroup.type
        )
        if (firstOption && !initialVariants[variantGroup.type]) {
          initialVariants[variantGroup.type] = firstOption.value
        }
      })
      setSelectedVariants(initialVariants)
    }
  }, [unwrappedParams.id])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold">Loading product...</h1>
      </div>
    )
  }

  const handleVariantSelect = (type: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: value }))
  }

  const uniqueVariantTypes = product.variants
    ? [...new Set(product.variants.map((v) => v.type))]
    : []

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: `${product.name} added to cart!`,
      description: `Quantity: ${quantity}, Variants: ${Object.values(
        selectedVariants
      ).join(", ")}`,
      action: <CheckCircle className="text-green-500" />,
    })
  }

  const handleAddToWishlist = () => {
    addToWishlist(product)
    toast({
      title: `${product.name} added to wishlist!`,
      action: <Heart className="text-red-500 fill-red-500" />,
    })
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg mb-4">
            <Image
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 ease-in-out"
              data-ai-hint={product.dataAiHint || "product image"}
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-primary scale-105"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            {product.name}
          </h1>

          <div className="flex items-center space-x-4">
            <p className="text-3xl font-semibold text-primary">
              ₹{product.price.toFixed(2)}
            </p>
            {product.rating && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
            )}
          </div>

          <Badge variant="secondary">{product.category}</Badge>

          <p className="text-muted-foreground text-base leading-relaxed">
            {product.description}
          </p>

          <Separator />

          {/* Variants Selection */}
          {uniqueVariantTypes.map((type) => (
            <div key={type} className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                {type}:{" "}
                <span className="text-muted-foreground">
                  {selectedVariants[type]}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ...new Set(
                    product.variants
                      ?.filter((v) => v.type === type)
                      .map((v) => v.value)
                  ),
                ].map((value) => (
                  <Button
                    key={value}
                    variant={
                      selectedVariants[type] === value ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleVariantSelect(type, value)}
                    className={`transition-all ${
                      selectedVariants[type] === value
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity and Actions */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 w-12 text-center font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              size="lg"
              className="group"
              onClick={handleAddToWishlist}
            >
              <Heart className="mr-2 h-5 w-5 text-muted-foreground group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs (Description, Reviews, etc.) */}
      <div className="mt-12 lg:mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 max-w-lg">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews || 0})
            </TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="mt-6 text-muted-foreground leading-relaxed p-4 bg-card rounded-lg shadow"
          >
            {product.description}
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </TabsContent>
          <TabsContent
            value="reviews"
            className="mt-6 p-4 bg-card rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Customer Reviews
            </h3>
            {/* Placeholder for reviews list */}
            {Array.from({ length: Math.min(3, product.reviews || 0) }).map(
              (_, i) => (
                <Card key={i} className="mb-4">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md">User {i + 1}</CardTitle>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-4 h-4 ${
                              starIdx < Math.floor(product.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This is a great product! Highly recommend. Quality is
                      top-notch.
                    </p>
                  </CardContent>
                </Card>
              )
            )}
            {(product.reviews || 0) > 3 && (
              <Button variant="link">View all reviews</Button>
            )}
            {(!product.reviews || product.reviews === 0) && (
              <p className="text-muted-foreground">
                No reviews yet for this product.
              </p>
            )}
          </TabsContent>
          <TabsContent
            value="shipping"
            className="mt-6 text-muted-foreground leading-relaxed p-4 bg-card rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Shipping Information
            </h3>
            <p>
              Standard shipping: 3-5 business days. Express shipping: 1-2
              business days.
            </p>
            <p>Free shipping on orders over $50.</p>
            <Separator className="my-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Returns Policy
            </h3>
            <p>
              Easy 30-day returns. Items must be in new, unworn condition with
              original tags.
            </p>
            <p>Contact customer service to initiate a return.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// This function can be uncommented if you want to generate static paths at build time
// export async function generateStaticParams() {
//   return MOCK_PRODUCTS.map((product) => ({
//     id: product.id,
//   }));
// }
