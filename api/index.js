require("dotenv").config();

const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const connectDB = require("../server/config/db");

const contactRoutes = require("../server/routes/contactRoutes");
const newsletterRoutes = require("../server/routes/newsletterRoutes");

const app = express();

// Middleware
app.use(express.json());

// CORS setup (uses env safely)
const allowedOrigin = process.env.VITE_BASE_URL || "*";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// DB connection (should be cached inside connectDB)
connectDB();

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});

// Routes
app.use("/api", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// Export for Vercel / serverless
module.exports.handler = serverless(app);

// deployment check