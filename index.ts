import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
config();
import cors from "cors";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import productRoute from "./routes/product";
import cartRoute from "./routes/cart";
import orderRoute from "./routes/order";
import stripeRoute from "./routes/stripe";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

connect(process.env.MONGO_URL || "")
      .then(() => console.log(`DB Connection Successfull!`))
      .catch((err) => console.log(err));
1;

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
});
