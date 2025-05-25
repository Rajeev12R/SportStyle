import mongoose, { Schema, models, model } from "mongoose"

const VariantSchema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
})

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String, required: true }],
    dataAiHint: String,
    variants: [VariantSchema],
    rating: Number,
    reviews: Number,
    inStock: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default models.Product || model("Product", ProductSchema)
