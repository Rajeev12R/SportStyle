import ProductCard from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/constants';
import type { Product } from '@/types';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, ArrowDownUp, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Team Uniforms',
  description: 'Explore customizable team uniforms for all sports.',
};

export default function UniformsPage() {
  const uniformProducts = MOCK_PRODUCTS.filter(
    (product) => product.category === 'Uniforms'
  );

  return (
    <div className="space-y-12">
      <section className="text-center py-10 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg shadow-md">
        <Shield className="h-16 w-16 mx-auto mb-4"/>
        <h1 className="text-4xl font-bold mb-3">Custom Team Uniforms</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Outfit your team with high-quality, custom-designed uniforms that build identity and inspire performance.
        </p>
        <Button variant="secondary" size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/uniform-builder">Start Designing Your Uniform</Link>
        </Button>
      </section>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-card rounded-lg shadow">
         <h2 className="text-2xl font-semibold text-card-foreground">
          Browse Our Uniform Styles ({uniformProducts.length})
        </h2>
        <div className="flex gap-4 items-center">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Sport Type
          </Button>
          <Select defaultValue="popular">
            <SelectTrigger className="w-[180px]">
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

      {uniformProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {uniformProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No uniform styles found. Start by designing your own!</p>
        </div>
      )}
    </div>
  );
}
