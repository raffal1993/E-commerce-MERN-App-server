import mongoose from "mongoose";
import { CartSchema } from "../types/Cart";

const CartSchema = new mongoose.Schema<CartSchema>(
      {
            userId: { type: String, require: true },
            products: [
                  {
                        productId: {
                              type: String
                        },
                        quantity: {
                              type: Number,
                              default: 1
                        }
                  }
            ]
      },
      { timestamps: true }
);

export default mongoose.model<CartSchema>("Cart", CartSchema);
