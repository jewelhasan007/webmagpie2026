import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import connectDB from "../server/config/db.js";

import contactRoutes from "../server/routes/contactRoutes.js";
import newsletterRoutes from "../server/routes/newsletterRoutes.js";

const app = express();

app.use(express.json());

// CORS
app.use(cors({
  origin: "*",
  credentials: true,
}));

// IMPORTANT: await DB connection safely
let isConnected = false;

const dbMiddleware = async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
};

app.use(dbMiddleware);

// Routes (NO /api prefix here in Vercel)
app.use("/contact", contactRoutes);
app.use("/newsletter", newsletterRoutes);

app.get("/test", (req, res) => {
  res.json({ success: true });
});

export default serverless(app);