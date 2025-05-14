import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || 'product image'}
          />
        </Link>
        {product.category && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-opacity-80 backdrop-blur-sm">
            {product.category}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors truncate" title={product.name}>
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden text-ellipsis">
          {product.description.substring(0, 60)}...
        </p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating.toFixed(1)} ({product.reviews})</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full gap-2">
          <Button variant="outline" size="sm" className="flex-1 group" aria-label={`Add ${product.name} to cart`}>
            <ShoppingCart className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            Add to Cart
          </Button>
          <Button variant="ghost" size="icon" aria-label={`Add ${product.name} to wishlist`} className="group">
            <Heart className="h-5 w-5 text-muted-foreground group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
