import mongoose, { Schema, models } from "mongoose"

const UserSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
)

export default models.User || mongoose.model("User", UserSchema)
