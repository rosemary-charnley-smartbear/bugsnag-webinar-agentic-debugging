// Pricing service for the checkout flow.
//
// >>> THIS FILE CONTAINS THE INTENTIONAL DEMO BUG <<<
//
// calculateOrderTotal sums line items and applies a discount coupon.
// The bug: it assumes every order has a `coupon` object and reads
// `order.coupon.percentOff` directly. Most orders in testing had a coupon,
// so it passed QA -- but in production, orders WITHOUT a coupon throw:
//
//   TypeError: Cannot read properties of undefined (reading 'percentOff')
//
// This is the error that shows up in BugSnag and that we fix live in the demo.

export function calculateOrderTotal(order) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // BUG: order.coupon may be undefined for guest / no-coupon checkouts.
  const discount = subtotal * (order.coupon.percentOff / 100);

  // FIXED: Now code checks if order.coupon exists before reading percentOff.
  // const discount = order.coupon ? subtotal * (order.coupon.percentOff / 100) : 0;

  const total = subtotal - discount;
  return Math.round(total * 100) / 100;
}
