import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

app.use((err, req, res, next) => {
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: "Image payload too large" });
  }
  return next(err);
});

export { app };

export const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Set it in Vercel Environment Variables (Production) or backend/src/.env (local).");
  }

  await mongoose.connect(process.env.MONGO_URI);
  const port = process.env.PORT || 5000;
  console.log("MongoDB connected");

  return app.listen(port, () => console.log(`Server running on port ${port}`));
};

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  startServer().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export default app;
