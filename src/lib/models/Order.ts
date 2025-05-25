import mongoose, { Schema, models, model } from "mongoose"

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  variant: { type: Object }, // e.g., color/size
})

const OrderSchema = new Schema(
  {
    user: { type: String }, // can be replaced with ObjectId ref to User later
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: { type: Object },
    paymentInfo: { type: Object },
    notes: String,
  },
  { timestamps: true }
)

export default models.Order || model("Order", OrderSchema)
