import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Order from "@/lib/models/Order"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const order = await Order.findById(params.id).populate("items.product")
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const data = await req.json()
    const order = await Order.findByIdAndUpdate(params.id, data, {
      new: true,
    }).populate("items.product")
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid order ID or data" },
      { status: 400 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const order = await Order.findByIdAndDelete(params.id)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Order deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 })
  }
}
