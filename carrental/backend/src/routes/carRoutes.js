import express from "express";
import multer from "multer";
import { addCar, getAllCars, getMyCars } from "../controllers/carController.js";
import { protect } from "../middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", protect, upload.single("image"), addCar);
router.get("/my", protect, getMyCars);
router.get("/", getAllCars);

export default router;
