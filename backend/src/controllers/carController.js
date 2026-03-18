import Car from "../models/Car.js";
import cloudinary from "../config/cloudinary.js";

export const addCar = async (req, res) => {
  const { name, price, image, type, specs } = req.body;
  const userId = req.userId;

  try {
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const isRemoteUrl = typeof image === "string" && /^https?:\/\//i.test(image);
    let imageUrl = image;

    if (!isRemoteUrl) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "car-rental",
        resource_type: "image",
      });
      imageUrl = uploadResult.secure_url;
    }

    const normalizedSpecs = typeof specs === "string"
      ? specs.split(",").map((item) => item.trim()).filter(Boolean)
      : Array.isArray(specs)
        ? specs
        : [];

    const car = await Car.create({
      name,
      price,
      image: imageUrl,
      userId,
      type,
      specs: normalizedSpecs,
    });

    res.status(201).json(car);
  } catch (err) {
    console.error("addCar failed:", err?.message || err);
    res.status(500).json({
      error: err?.message || err?.error?.message || "Car not added",
    });
  }
};


export const getAllCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};


export const getMyCars = async (req, res) => {
  const userId = req.userId;

  try {
    const cars = await Car.find({ userId });
    const fullCars = cars.map(car => ({
      _id: car._id,
      name: car.name,
      price: car.price,
      type: car.type,
      specs: car.specs || [],
      createdAt: car.createdAt || car._id?.getTimestamp?.(),
      imageUrl: car.image,
    }));

    res.json(fullCars);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your cars" });
  }
};

export const deleteMyCar = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const car = await Car.findOne({ _id: id, userId });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // If image is from Cloudinary, try removing it as part of cleanup.
    if (typeof car.image === "string" && car.image.includes("res.cloudinary.com")) {
      const match = car.image.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
      const publicId = match?.[1];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch {
          // Ignore media cleanup failures so DB delete is not blocked.
        }
      }
    }

    await Car.deleteOne({ _id: id, userId });
    return res.json({ message: "Car deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete car" });
  }
};