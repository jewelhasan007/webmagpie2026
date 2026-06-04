require("dotenv").config();

const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

import connectDB from "../server/config/db.js";

const contactRoutes = require("../server/routes/contactRoutes");
const newsletterRoutes = require("../server/routes/newsletterRoutes");

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://zozoweb-z3bs-3d6gviga1-zigzag-mindeds-projects.vercel.app",
  "https://zozoweb-z3bs.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// DB connect
await connectDB();

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
  console.error("🔥 ERROR STACK:", err);

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

// ✅ IMPORTANT FIX
module.exports = serverless(app);