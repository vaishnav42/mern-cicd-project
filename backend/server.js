import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

// Middleware

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to MERN CI/CD Backend API 🚀",
  });
});

// Health Route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "Server is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});