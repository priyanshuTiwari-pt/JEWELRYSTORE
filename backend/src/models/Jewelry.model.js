import mongoose from "mongoose";

const jewelrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,
    description: String,
    material: {
      type: String,
      enum: [
        "Gold",
        "Silver",
        "Stainless Steel",
        "Copper",
        "Diamond",
        "Pearls",
        "Other",
      ],
    },
    price: Number,
    quantity: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Jewelry", jewelrySchema);
