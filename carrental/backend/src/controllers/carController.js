import Car from "../models/Car.js";

export const addCar = async (req, res) => {
  const { name, price } = req.body;
  const image = req.file?.filename;
  const userId = req.userId;

  try {
    const car = await Car.create({ name, price, image, userId });
    res.status(201).json(car);
  } catch {
    res.status(500).json({ error: "Car not added" });
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
      imageUrl: `${process.env.BASE_URL}/uploads/${car.image}`, // Make sure BASE_URL is set
    }));

    res.json(fullCars);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your cars" });
  }
};