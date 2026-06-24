// Reproduces the production error so it shows up in BugSnag.
// Usage: start the server (npm start) in one terminal, then: npm run trigger-error
//
// Sends one checkout WITH a coupon (succeeds) and one WITHOUT (throws -> BugSnag).
const base = process.env.BASE_URL || "http://localhost:3000";

async function post(body) {
  const res = await fetch(`${base}/api/checkout`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}

const items = [
  { sku: "A1", price: 20.0, quantity: 2 },
  { sku: "B2", price: 10.0, quantity: 1 },
];

const withCoupon = await post({ customerId: "cust_ok", items, coupon: { code: "SAVE10", percentOff: 10 } });
console.log("with coupon   ->", withCoupon.status, JSON.stringify(withCoupon.body));

const noCoupon = await post({ customerId: "cust_guest", items });
console.log("without coupon->", noCoupon.status, JSON.stringify(noCoupon.body));
console.log("\nThe 500 above is now in BugSnag. Open your IDE and ask the agent to investigate.");