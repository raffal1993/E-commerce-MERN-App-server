import {
      verifyToken,
      verifyTokenAndAdmin,
      verifyTokenAndAuthorization
} from "./verifyToken";
import { Router } from "express";
import Cart from "../models/Cart";

const router = Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
      const newCart = new Cart(req.body);

      try {
            const savedProduct = await newCart.save();
            res.status(201).json(savedProduct);
      } catch (err) {
            res.status(500).json(err);
      }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
      try {
            const updatedCart = await Cart.findByIdAndUpdate(
                  req.params.id,
                  {
                        $set: req.body
                  },
                  { new: true }
            );
            res.status(200).json(updatedCart);
      } catch (err) {
            res.status(500).json(err);
      }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
      try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json("Cart has beed deleted...");
      } catch (err) {
            res.status(500).json(err);
      }
});

//GET
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
      try {
            const cart = await Cart.findOne({ userId: req.params.userId });

            if (cart) {
                  res.status(200).json(cart);
            }
      } catch (err) {
            res.status(500).json(err);
      }
});

//Get ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
      try {
            const carts = await Cart.find();
            res.status(200).json(carts);
      } catch (err) {
            res.status(500).json(err);
      }
});

export default router;
