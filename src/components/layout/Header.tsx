"use client"

import Link from "next/link"
import {
  Shirt,
  Home,
  Heart,
  User,
  Phone,
  Menu,
  X,
  Search,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { NAV_LINKS, NavLinkItem } from "@/lib/constants"
import { useSession } from "next-auth/react"

const AppLogo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
  >
    <Shirt className="h-8 w-8" />
    <span className="text-2xl font-bold tracking-tight">SportStyle</span>
  </Link>
)

const DesktopNavItem: React.FC<{ item: NavLinkItem }> = ({ item }) => (
  <Link href={item.href} passHref>
    <Button
      variant="ghost"
      className="text-foreground hover:bg-accent/10 hover:text-primary"
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </Button>
  </Link>
)

const MobileNavItem: React.FC<{ item: NavLinkItem }> = ({ item }) => (
  <SheetClose asChild>
    <Link href={item.href} passHref>
      <Button
        variant="ghost"
        className="w-full justify-start text-lg py-3 text-foreground hover:bg-accent/10 hover:text-primary"
      >
        <item.icon className="mr-2 h-6 w-6" />
        {item.label}
      </Button>
    </Link>
  </SheetClose>
)

export default function Header() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-primary">
            <Shirt className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-tight">
              SportStyle
            </span>
          </div>
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse md:hidden"></div>
        </div>
      </header>
    ) // Render a basic skeleton or null during server render / hydration mismatch
  }

  const commonNavLinks = NAV_LINKS.filter(
    (link) => !["Cart", "Wishlist", "Profile", "Login"].includes(link.label)
  )
  const iconNavLinks = NAV_LINKS.filter((link) =>
    ["Cart", "Wishlist", "Profile", "Login"].includes(link.label)
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-2 md:px-4">
        <AppLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 flex-shrink flex-wrap overflow-x-auto">
          {commonNavLinks.map((item) => (
            <DesktopNavItem key={item.href} item={item} />
          ))}
          {session?.user?.role === "admin" && (
            <Link href="/admin-dashboard" passHref>
              <Button
                variant="ghost"
                className="text-foreground hover:bg-accent/10 hover:text-primary"
              >
                <Bot className="mr-2 h-5 w-5" />
                Admin
              </Button>
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {iconNavLinks.map((item) => (
            <Link href={item.href} key={item.href} passHref>
              <Button
                variant="ghost"
                size="icon"
                aria-label={item.label}
                className="text-foreground hover:text-primary hover:bg-accent/10"
              >
                <item.icon className="h-6 w-6" />
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex-shrink-0">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-7 w-7 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs bg-background p-6 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <SheetClose asChild>
                    <AppLogo />
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="h-7 w-7 text-foreground" />
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-3 flex-grow">
                  {NAV_LINKS.map((item) => (
                    <MobileNavItem key={item.href} item={item} />
                  ))}
                  {session?.user?.role === "admin" && (
                    <SheetClose asChild>
                      <Link href="/admin-dashboard" passHref>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-lg py-3 text-foreground hover:bg-accent/10 hover:text-primary"
                        >
                          <Bot className="mr-3 h-6 w-6" />
                          Admin
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </nav>

                <div className="mt-auto pt-6 border-t border-border/40">
                  <p className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} SportStyle
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
