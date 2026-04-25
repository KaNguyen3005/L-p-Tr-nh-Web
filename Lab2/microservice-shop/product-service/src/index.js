// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();
// ─── Security & Logging Middleware ───────────
app.use(helmet()); // Bảo mật HTTP headers
app.use(cors());
app.use(morgan("dev")); // Log requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ─── Swagger UI ──────────────────────────────
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: "Product Service API Docs",
  }),
);
// Export spec dạng JSON để tích hợp với API Gateway
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
// ─── Routes ──────────────────────────────────
app.get("/health", (req, res) =>
  res.json({
    status: "ok",
    service: process.env.SERVICE_NAME,
    uptime: process.uptime(),
  }),
);
app.use("/api/products", productRoutes);
// ─── Global Error Handler (ĐẶT CUỐI CÙNG) ──
app.use(errorHandler);


console.log("PORT from env =", process.env.PORT);
console.log("DATABASE_URL exists =", !!process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
