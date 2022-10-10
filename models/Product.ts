import mongoose from "mongoose";
import { ProductSchema } from "../types/Product";

const ProductSchema = new mongoose.Schema<ProductSchema>(
      {
            title: { type: String, require: true, unique: true },
            desc: { type: String, require: true },
            img: { type: String, require: true },
            categories: { type: Array },
            size: { type: Array },
            color: { type: Array },
            price: { type: Number, require: true },
            isStock: { type: Boolean, default: true }
      },
      { timestamps: true }
);

export default mongoose.model<ProductSchema>("Product", ProductSchema);
