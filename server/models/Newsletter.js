// models/Newsletter.js

// import mongoose from 'mongoose';

// const newsletterSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true, // prevents duplicate subscriptions
//     lowercase: true,
//     trim: true,
//   },
//   subscribedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// export default Newsletter;


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