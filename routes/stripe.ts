import { Router } from "express";
import Stripe from "stripe";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2022-08-01"
});

router.post("/payment", async (req, res) => {
      stripe.charges
            .create({
                  source: req.body.tokenId,
                  amount: req.body.amount,
                  currency: "usd"
            })
            .then((stripeRes) => {
                  res.status(200).json(stripeRes);
            })
            .catch((stripeErr) => {
                  res.status(500).json(stripeErr);
            });
});

export default router;
