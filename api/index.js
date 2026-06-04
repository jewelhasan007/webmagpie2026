import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import connectDB from "../server/config/db.js";

import newsletterRoutes from "../server/routes/newsletterRoutes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// DO NOT block request with DB connection
let dbConnected = false;

app.use(async (req, res, next) => {
  if (!dbConnected) {
    dbConnected = true;
    connectDB().catch(console.error);
  }
  next();
});

app.use("/newsletter", newsletterRoutes);

export default serverless(app);