"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (!user) {
        router.replace("/login")
      } else {
        setChecked(true)
      }
    }
  }, [router])

  if (!checked)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  return <>{children}</>
}
