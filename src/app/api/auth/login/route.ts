import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  await dbConnect()
  const { email, password } = await req.json()

  if (!email || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 })

  const user = await User.findOne({ email })
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

  return NextResponse.json({
    message: "Login successful",
    user: { id: user._id, fullname: user.fullname, email: user.email },
  })
}
