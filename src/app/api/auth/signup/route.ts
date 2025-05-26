import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  await dbConnect()
  const { fullname, email, password } = await req.json()

  if (!fullname || !email || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 })

  const existing = await User.findOne({ email })
  if (existing)
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    )

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ fullname, email, password: hashed })

  return NextResponse.json({
    message: "Signup successful",
    user: { id: user._id, fullname, email },
  })
}
