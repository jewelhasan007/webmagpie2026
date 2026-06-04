require("dotenv").config();

const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const connectDB = require("../server/config/db");

const contactRoutes = require("../server/routes/contactRoutes");
const newsletterRoutes = require("../server/routes/newsletterRoutes");

const app = express();

app.use(express.json());

const allowedOrigin = process.env.VITE_BASE_URL || "*";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// DB connect
connectDB();

// Test route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});

// Routes (IMPORTANT FIX)
app.use("/contact", contactRoutes);
app.use("/newsletter", newsletterRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// ✅ IMPORTANT FIX
module.exports = serverless(app);