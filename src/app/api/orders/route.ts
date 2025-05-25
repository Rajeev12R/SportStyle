import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Order from "@/lib/models/Order"

export async function GET() {
  await dbConnect()
  try {
    const orders = await Order.find({}).populate("items.product")
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  await dbConnect()
  try {
    const data = await req.json()
    const order = await Order.create(data)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 400 }
    )
  }
}
