import User from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { Router } from "express";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
      const { username, email, password } = req.body;

      const newUser = new User({
            username,
            email,
            password: CryptoJS.AES.encrypt(
                  password,
                  process.env.PASSWORD_SECRET!.toString()
            )
      });

      try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
      } catch (err) {
            res.status(500).json(err);
      }
});

//LOGIN
router.post("/login", async (req, res) => {
      const { username, password: loginPassword } = req.body;

      try {
            const user = await User.findOne({ username }).lean();

            if (!user) return res.status(401).json("wrong credentials!");

            const { password: userPassword, ...userData } = user;

            const hashedPassword = CryptoJS.AES.decrypt(
                  userPassword,
                  process.env.PASSWORD_SECRET!.toString()
            );

            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            if (originalPassword !== loginPassword) {
                  return res.status(401).json("wrong password!");
            }

            const accessToken = jwt.sign(
                  { id: user._id, isAdmin: user.isAdmin },
                  process.env.JWT_SECRET_KEY!,
                  { expiresIn: "3d" }
            );

            res.status(200).json({ ...userData, accessToken });
      } catch (err) {
            res.status(500).json(err);
      }
});

export default router;
