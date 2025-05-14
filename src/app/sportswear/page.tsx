import ProductCard from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/constants';
import type { Product } from '@/types';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, ArrowDownUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sportswear',
  description: 'Browse our collection of high-performance sportswear.',
};

export default function SportswearPage() {
  const sportswearProducts = MOCK_PRODUCTS.filter(
    (product) => product.category === 'Sportswear'
  );

  return (
    <div className="space-y-12">
      <section className="text-center py-10 bg-secondary rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-3 text-secondary-foreground">Performance Sportswear</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover athletic apparel engineered for comfort, durability, and style.
        </p>
      </section>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-card-foreground">
          Showing {sportswearProducts.length} Products
        </h2>
        <div className="flex gap-4 items-center">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
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

      {sportswearProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {sportswearProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No sportswear products found at this time.</p>
          {/* Optionally, suggest checking other categories or coming back later */}
        </div>
      )}
    </div>
  );
}
