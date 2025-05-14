'use client';

import { useState, useEffect } from 'react';
import type { WishlistItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartCrack, ShoppingCart, Trash2, HeartOff } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/constants'; // For mock data
import { useToast } from "@/hooks/use-toast";

// Simulate fetching wishlist items
const initialWishlistItems: WishlistItem[] = [
  MOCK_PRODUCTS[1],
  MOCK_PRODUCTS[3],
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading wishlist from localStorage or API
    setWishlistItems(initialWishlistItems);
    setIsMounted(true);
  }, []);
  
  const removeFromWishlist = (id: string) => {
    const itemToRemove = wishlistItems.find(item => item.id === id);
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    if (itemToRemove) {
        toast({
          title: `${itemToRemove.name} removed from wishlist.`,
          variant: "destructive",
          action: <HeartOff className="text-white"/>
        });
    }
  };

  const moveToCart = (item: WishlistItem) => {
    removeFromWishlist(item.id);
    // Here you would typically add to cart state/API
    console.log(`${item.name} moved to cart.`);
    toast({
      title: `${item.name} moved to cart!`,
      description: "You can adjust quantity in your cart.",
      action: <ShoppingCart className="text-green-500"/>
    });
  };


  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Your Wishlist</CardTitle>
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

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <HeartCrack className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">Your Wishlist is Empty</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Start adding your favorite items to your wishlist.
        </p>
        <Link href="/sportswear">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Discover Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Your Wishlist ({wishlistItems.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {wishlistItems.map(item => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/products/${item.id}`} className="shrink-0">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-md object-cover w-24 h-24 sm:w-32 sm:h-32"
                  data-ai-hint={item.dataAiHint || 'product image'}
                />
              </Link>
              <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-xl font-semibold hover:text-primary transition-colors">{item.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                <p className="text-lg font-medium text-primary mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto group"
                  onClick={() => moveToCart(item)}
                >
                  <ShoppingCart className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" /> Move to Cart
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFromWishlist(item.id)}
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
  );
}
