import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import userRoutes from "./src/routes/userRoutes.js";
import carRoutes from "./src/routes/carRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Car rental backend is live");
});

app.get("/api/serverStatus", (req, res) => {
  res.send("Car rental Backend is running 🚀");
});

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

app.use((err, req, res, next) => {
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: "Image payload too large" });
  }
  return next(err);
});

const connectDB = async () => {
  try {
    const conn_str = process.env.MONGO_URI;
    await mongoose.connect(conn_str);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}
export default app;
