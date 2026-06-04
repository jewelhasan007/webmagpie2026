const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const connectDB = require("../server/config/db");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectDB();

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});

/*
Import your routes
*/
app.use("/api", contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
module.exports.handler = serverless(app);