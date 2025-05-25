"use client"

import { useState, useEffect } from "react"
import type { CartItem } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Edit, ShoppingBag, MapPin } from "lucide-react"
import { MOCK_PRODUCTS } from "@/lib/constants" // For mock data

// Simulate fetching data - in a real app, this would come from previous steps / context / API
const mockOrderItems: CartItem[] = [
  { ...MOCK_PRODUCTS[0], quantity: 1 },
  { ...MOCK_PRODUCTS[2], quantity: 2 },
]

const mockShippingAddress = {
  fullName: "Alex Johnson",
  streetAddress: "123 Main St, Apt 4B",
  cityStateZip: "New York, NY 10001",
  country: "USA",
}

export default function OrderSummaryPage() {
  const [orderItems, setOrderItems] = useState<CartItem[]>([])
  const [shippingAddress, setShippingAddress] = useState(mockShippingAddress)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setOrderItems(mockOrderItems) // Simulate loading from state
    setIsMounted(true)
  }, [])

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shippingCost = subtotal > 50 ? 0 : 10
  const taxes = subtotal * 0.08 // Example 8% tax
  const total = subtotal + shippingCost + taxes

  if (!isMounted) {
    // Basic skeleton
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-xl animate-pulse">
          <CardHeader>
            <div className="h-8 w-3/4 bg-muted rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-muted rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-3" />
          <CardTitle className="text-3xl font-bold text-primary">
            Order Summary
          </CardTitle>
          <CardDescription>
            Please review your order details before proceeding to payment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Shipping Address Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Shipping To</CardTitle>
              </div>
              <Link href="/checkout/address" passHref>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Change
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="font-semibold">{shippingAddress.fullName}</p>
              <p>{shippingAddress.streetAddress}</p>
              <p>{shippingAddress.cityStateZip}</p>
              <p>{shippingAddress.country}</p>
            </CardContent>
          </Card>

          {/* Order Items Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">
                  Items in Order ({orderItems.length})
                </CardTitle>
              </div>
              <Link href="/cart" passHref>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Cart
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-2 border-b last:border-b-0"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                    data-ai-hint={item.dataAiHint || "product image"}
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Price Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Price Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Taxes</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Order Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Link href="/checkout/payment" className="w-full">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
            >
              Proceed to Payment
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
