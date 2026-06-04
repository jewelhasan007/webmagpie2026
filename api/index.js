const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const connectDB = require("../server/config/db");

const contactRoutes = require("../server/routes/contactRoutes");
const newsletterRoutes = require("../server/routes/newsletterRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// DB connection (make sure it's cached inside connectDB)
connectDB();

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});

app.use("/api", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

module.exports.handler = serverless(app);