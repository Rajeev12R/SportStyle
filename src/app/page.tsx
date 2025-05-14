import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/products/ProductCard"
import { MOCK_PRODUCTS } from "@/lib/constants"
import { ArrowRight, Bot, Shield, Shirt } from "lucide-react"

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/80 via-primary to-accent/70 text-primary-foreground py-20 md:py-32 rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="sport action"
          />
          <div className="absolute inset-0 bg-black/30"></div>{" "}
          {/* Dark overlay for text contrast */}
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Elevate Your Game with SwiftStride
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Discover premium sportswear and custom uniforms designed for peak
            performance and ultimate comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sportswear" passHref>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Shop Sportswear <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/uniforms" passHref>
              <Button
                variant="outline"
                size="lg"
                className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Design Uniforms <Shield className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          Explore Our Collections
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          From individual athletic gear to full team kits, find exactly what you
          need to perform your best.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/sportswear" className="group block">
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1641578784369-bf2a6e0ef5f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb3J0cyUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                alt="Sportswear Collection"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="sportswear fashion"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Sportswear
                </h3>
                <p className="text-sm text-gray-200 mb-3">
                  Performance apparel for every activity.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="self-start bg-white/90 text-primary hover:bg-white"
                >
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
          <Link href="/uniforms" className="group block">
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1603373577790-b635631b0302?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjaG9vbCUyMHNwb3J0cyUyMHVuaWZvcm18ZW58MHx8MHx8fDA%3D"
                alt="Uniforms Collection"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="team uniforms"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Team Uniforms
                </h3>
                <p className="text-sm text-gray-200 mb-3">
                  Customizable kits for your entire team.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="self-start bg-white/90 text-primary hover:bg-white"
                >
                  Explore Designs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/sportswear" passHref>
            <Button
              variant="outline"
              size="lg"
              className="text-primary border-primary hover:bg-primary/10"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Style Assistant CTA Section */}
      <section className="bg-secondary py-16 rounded-xl shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <Bot className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-secondary-foreground">
            Need Style Advice?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Let our AI Style Assistant help you find the perfect gear based on
            your preferences.
          </p>
          <Link href="/style-assistant" passHref>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Try Style Assistant <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
          Why Choose SwiftStride?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-card rounded-lg shadow-md">
            <Shirt className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              Premium Quality
            </h3>
            <p className="text-sm text-muted-foreground">
              Durable materials and craftsmanship for long-lasting wear.
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md">
            <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              Innovative Design
            </h3>
            <p className="text-sm text-muted-foreground">
              Modern styles infused with performance-enhancing technology.
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              Customization Experts
            </h3>
            <p className="text-sm text-muted-foreground">
              Tailor-made uniforms to perfectly represent your team.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
