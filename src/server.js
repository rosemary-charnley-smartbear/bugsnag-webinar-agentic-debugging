import express from "express";
import { startBugsnag } from "./bugsnag.js";
import { checkoutRouter } from "./routes/checkout.js";

startBugsnag();

const app = express();
app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", checkoutRouter);

const port = process.env.PORT || 3000;

// Only listen when run directly, so tests can import the app without a port.
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`bugsnag-mcp-demo listening on http://localhost:${port}`);
  });
}

export { app };
