import express from "express";
import { addCar, deleteMyCar, getAllCars, getMyCars } from "../controllers/carController.js";
import { protect } from "../middleware.js";

const router = express.Router();

router.post("/add", protect, addCar);
router.get("/my", protect, getMyCars);
router.delete("/my/:id", protect, deleteMyCar);
router.get("/", getAllCars);

export default router;
