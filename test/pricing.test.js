import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateOrderTotal } from "../src/services/pricing.js";

const baseOrder = {
  customerId: "cust_123",
  items: [
    { sku: "A1", price: 20.0, quantity: 2 },
    { sku: "B2", price: 10.0, quantity: 1 },
  ],
};

// Passes before AND after the fix: order WITH a coupon.
test("applies a coupon discount", () => {
  const order = { ...baseOrder, coupon: { code: "SAVE10", percentOff: 10 } };
  assert.equal(calculateOrderTotal(order), 45.0); // 50 - 10%
});

// FAILS before the fix, PASSES after: order with NO coupon.
// This is the production scenario BugSnag caught.
test("handles an order with no coupon", () => {
  assert.equal(calculateOrderTotal(baseOrder), 50.0);
});
