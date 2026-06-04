
import mongoose from "mongoose";
import newsletterConnection from "../config/newsletterDB.js";

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  }

});

export default newsletterConnection.model("Newsletter", newsletterSchema);