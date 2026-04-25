// src/index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger/swagger");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Security & Logging Middleware ─────────────────
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Swagger UI ────────────────────────────────────
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "Order Service API Docs",
  })
);

// Export OpenAPI JSON để API Gateway hoặc service khác dùng
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

// ─── Health Check ──────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: process.env.SERVICE_NAME || "order-service",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ────────────────────────────────────────
app.use("/api/orders", orderRoutes);

// ─── Global Error Handler (luôn đặt cuối cùng) ────
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Order Service running on http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;