import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  subject: {
    type: String
  },

  company: {
    type: String
  },

  message: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;