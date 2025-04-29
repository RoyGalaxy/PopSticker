import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, },
  description: { type: String, default: '', },
  price: { type: Number, required: true, min: 0, },
  categories: { type: [String],default: [], },
  images: { type: [String], required: true, },
  inStock: { type: Boolean, default: true },
  bestSeller: { type: Boolean, default: false },
  sizes: { type: [String], default: [] },
  tags: { type: [String],default: [] }
}, { timestamps: true });

const ProductModel = mongoose.models.product || mongoose.model("product", ProductSchema)

export default ProductModel