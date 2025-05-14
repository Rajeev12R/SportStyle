'use client';

import { useState, useEffect } from 'react';
import type { CartItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, XCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/constants'; // For mock data
import { useToast } from "@/hooks/use-toast";

// Simulate fetching cart items
const initialCartItems: CartItem[] = [
  { ...MOCK_PRODUCTS[0], quantity: 1 },
  { ...MOCK_PRODUCTS[2], quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading cart from localStorage or API
    setCartItems(initialCartItems);
    setIsMounted(true);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Or remove item if quantity is 0
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (id: string) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    if (itemToRemove) {
      toast({
        title: `${itemToRemove.name} removed from cart.`,
        variant: "destructive",
        action: <XCircle className="text-white"/>
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 10; // Example shipping logic
  const total = subtotal + shippingCost;

  if (!isMounted) {
    // Basic skeleton while client-side mounts
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Your Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">Your Cart is Empty</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/sportswear">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Your Shopping Cart ({cartItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/products/${item.id}`} className="shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover w-24 h-24 sm:w-28 sm:h-28"
                      data-ai-hint={item.dataAiHint || 'product image'}
                    />
                  </Link>
                  <div className="flex-grow text-center sm:text-left">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-lg font-semibold hover:text-primary transition-colors">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-md font-medium text-primary">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 h-10 text-center"
                      min="1"
                    />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="sm:ml-auto mt-2 sm:mt-0">
                    <p className="text-lg font-semibold text-right w-24">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                     <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive mt-1 float-right" aria-label="Remove item">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-foreground">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/checkout/address" className="w-full">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
