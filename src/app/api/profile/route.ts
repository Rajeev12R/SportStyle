import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"
import User from "@/models/User"

export async function PUT(req: NextRequest) {
  await dbConnect()
  const { id, fullname, email } = await req.json()

  if (!id || !fullname || !email)
    return NextResponse.json({ error: "All fields required" }, { status: 400 })

  const user = await User.findByIdAndUpdate(
    id,
    { fullname, email },
    { new: true }
  )
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 })

  return NextResponse.json({
    message: "Profile updated",
    user: { id: user._id, fullname: user.fullname, email: user.email },
  })
}
