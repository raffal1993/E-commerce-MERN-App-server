import mongoose from "mongoose";
import { UserSchema } from "../types/User";

const UserSchema = new mongoose.Schema<UserSchema>(
      {
            username: { type: String, require: true, unique: true },
            email: { type: String, require: true, unique: true },
            password: { type: String, require: true },
            isAdmin: { type: Boolean, default: false }
      },
      { timestamps: true }
);

export default mongoose.model<UserSchema>("User", UserSchema);
