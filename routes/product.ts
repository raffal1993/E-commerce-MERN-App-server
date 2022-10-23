import { verifyTokenAndAdmin } from "./verifyToken";
import Product from "../models/Product";
import { Router } from "express";

const router = Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
      const newProduct = new Product(req.body);

      try {
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
      } catch (err) {
            res.status(500).json(err);
      }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
      try {
            const updatedProduct = await Product.findByIdAndUpdate(
                  req.params.id,
                  {
                        $set: req.body
                  },
                  { new: true }
            );
            res.status(200).json(updatedProduct);
      } catch (err) {
            res.status(500).json(err);
      }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
      try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has beed deleted...");
      } catch (err) {
            res.status(500).json(err);
      }
});

//GET
router.get("/find/:id", async (req, res) => {
      try {
            const product = await Product.findById(req.params.id);

            if (product) {
                  res.status(200).json(product);
            }
      } catch (err) {
            res.status(500).json(err);
      }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
      const queryNew = req.query.new;
      const queryCategory = req.query.category;

      try {
            let products;
            if (queryNew) {
                  products = await Product.find()
                        .sort({ createdAt: -1 })
                        .limit(5);
            } else if (queryCategory) {
                  products = await Product.find({
                        categories: {
                              $in: [queryCategory]
                        }
                  });
            } else {
                  products = await Product.find();
            }

            if (products) {
                  res.status(200).json(products);
            }
      } catch (err) {
            res.status(500).json(err);
      }
});

export default router;
