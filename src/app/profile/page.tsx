"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  ShoppingBag,
  MapPin,
  CreditCard,
  Heart,
  LogOut,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
// import type { Metadata } from 'next'; // Cannot use in client component

// export const metadata: Metadata = {
//   title: 'My Profile',
//   description: 'Manage your SportStyle account details and preferences.',
// };

// Mock user data - in a real app, this would come from auth context or API
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatarUrl: "/default.png",
  joinDate: "2023-05-15",
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState("")

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user")
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser({
          name: parsed.fullname || parsed.name || "User",
          email: parsed.email,
          avatarUrl:
            parsed.avatarUrl ||
            "https://randomuser.me/api/portraits/men/32.jpg",
          joinDate:
            parsed.createdAt || parsed.joinDate || new Date().toISOString(),
        })
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const openEdit = () => {
    setEditName(user.name)
    setEditEmail(user.email)
    setEditError("")
    setEditOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditLoading(true)
    setEditError("")
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: JSON.parse(localStorage.getItem("user") || "{}").id,
          fullname: editName,
          email: editEmail,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setEditError(data.error || "Update failed")
      } else {
        // Update localStorage and UI
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("user") || "{}"),
          fullname: data.user.fullname,
          email: data.user.email,
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser({
          ...user,
          name: data.user.fullname,
          email: data.user.email,
        })
        setEditOpen(false)
      }
    } catch (err) {
      setEditError("Update failed")
    }
    setEditLoading(false)
  }

  if (!isMounted) {
    return (
      // Basic skeleton or loading state
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="items-center text-center">
            <div className="w-24 h-24 rounded-full bg-muted animate-pulse mb-4"></div>
            <div className="w-40 h-8 bg-muted animate-pulse mb-2"></div>
            <div className="w-60 h-6 bg-muted animate-pulse"></div>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const profileSections = [
    { name: "My Wishlist", icon: Heart, href: "/wishlist" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="items-center text-center p-8 bg-secondary rounded-t-lg">
          <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-lg">
            <AvatarImage
              src={user.avatarUrl}
              alt={user.name}
              data-ai-hint="profile picture"
            />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold text-secondary-foreground">
            {user.name}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {user.email}
          </CardDescription>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={openEdit}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-6">
            {profileSections.map((section) => (
              <Link
                href={section.href}
                key={section.name}
                className="block group"
              >
                <div className="flex items-center justify-between p-4 rounded-md hover:bg-accent/10 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <section.icon className="h-6 w-6 mr-4 text-primary" />
                    <span className="text-lg font-medium text-foreground">
                      {section.name}
                    </span>
                  </div>
                  {/* <User className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />{" "} */}
                  {/* ChevronRight equivalent */}
                </div>
                <Separator className="my-0 group-last-of-type:hidden" />
              </Link>
            ))}
          </div>
          <Separator className="my-8" />
          <Button
            variant="destructive"
            className="w-full text-lg py-3"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" /> Sign Out
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Joined on:{" "}
            {new Date(user.joinDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardContent>
      </Card>
      {/* Edit Profile Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md mx-auto">
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-2">Edit Profile</h2>
            {editError && <div className="text-red-500">{editError}</div>}
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
              required
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={editLoading}>
                {editLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
