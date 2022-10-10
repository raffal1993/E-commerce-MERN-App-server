import mongoose from "mongoose";
import { OrderSchema } from "../types/Order";

const OrderSchema = new mongoose.Schema<OrderSchema>(
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
            ],
            amount: { type: Number, require: true },
            address: { type: Object, require: true },
            status: { type: String, default: "pending" }
      },
      { timestamps: true }
);

export default mongoose.model<OrderSchema>("Order", OrderSchema);
