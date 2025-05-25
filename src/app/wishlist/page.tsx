"use client"

import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartCrack, Trash2, HeartOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const moveToCart = (item: any) => {
    addToCart(item, 1)
    removeFromWishlist(item.id)
    toast({
      title: `${item.name} moved to cart!`,
      description: "You can adjust quantity in your cart.",
    })
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <HeartCrack className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          Your Wishlist is Empty
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Start adding your favorite items to your wishlist.
        </p>
        <Link href="/sportswear">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Discover Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Your Wishlist ({wishlist.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {wishlist.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/products/${item.id}`} className="shrink-0">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-md object-cover w-24 h-24 sm:w-32 sm:h-32"
                  data-ai-hint={item.dataAiHint || "product image"}
                />
              </Link>
              <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                <p className="text-lg font-medium text-primary mt-1">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto group"
                  onClick={() => moveToCart(item)}
                >
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    removeFromWishlist(item.id)
                    toast({
                      title: `${item.name} removed from wishlist.`,
                      variant: "destructive",
                      action: <HeartOff className="text-white" />,
                    })
                  }}
                  className="text-muted-foreground hover:text-destructive group"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
