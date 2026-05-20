import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Database Setup
const MONGODB_URI = process.env.MONGODB_URI;
let useMongoDB = false;
let sqliteDb: any = null;

if (MONGODB_URI && (MONGODB_URI.startsWith("mongodb://") || MONGODB_URI.startsWith("mongodb+srv://"))) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      useMongoDB = true;
    })
    .catch((err) => {
      console.error("MongoDB connection error, falling back to SQLite:", err.message);
      setupSQLite();
    });
} else {
  console.log("No valid MONGODB_URI found, using SQLite for local storage.");
  setupSQLite();
}

function setupSQLite() {
  sqliteDb = new Database("nexus.db");
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT,
      subject TEXT,
      company TEXT,
      message TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      subscribedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("SQLite database initialized.");
}

// MongoDB Schemas (only used if MongoDB is connected)
const MessageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  company: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", MessageSchema);
const Subscriber = mongoose.model("Subscriber", SubscriberSchema);

// API Routes
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, subject, company, message } = req.body;
    
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (useMongoDB) {
      const newMessage = new Message({ fullName, email, subject, company, message });
      await newMessage.save();
    } else {
      const stmt = sqliteDb.prepare("INSERT INTO messages (fullName, email, subject, company, message) VALUES (?, ?, ?, ?, ?)");
      stmt.run(fullName, email, subject, company, message);
    }
    
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (useMongoDB) {
      const existing = await Subscriber.findOne({ email });
      if (existing) return res.status(400).json({ error: "Already subscribed" });
      const newSubscriber = new Subscriber({ email });
      await newSubscriber.save();
    } else {
      const checkStmt = sqliteDb.prepare("SELECT email FROM subscribers WHERE email = ?");
      const existing = checkStmt.get(email);
      if (existing) return res.status(400).json({ error: "Already subscribed" });
      
      const stmt = sqliteDb.prepare("INSERT INTO subscribers (email) VALUES (?)");
      stmt.run(email);
    }
    
    res.status(201).json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Error saving subscriber:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root: "dist" });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
