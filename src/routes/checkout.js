import express from "express";
import { calculateOrderTotal } from "../services/pricing.js";
import { report } from "../bugsnag.js";

export const checkoutRouter = express.Router();

// POST /api/checkout
// Body: { customerId, items: [{ sku, price, quantity }], coupon?: { code, percentOff } }
checkoutRouter.post("/checkout", (req, res) => {
  const order = req.body;
  try {
    const total = calculateOrderTotal(order);
    res.json({ ok: true, customerId: order.customerId, total });
  } catch (err) {
    // Report the handled error to BugSnag with order context, then return 500.
    report(err, {
      customerId: order?.customerId,
      hasCoupon: Boolean(order?.coupon),
      itemCount: order?.items?.length ?? 0,
    });
    res.status(500).json({ ok: false, error: err.message });
  }
});
