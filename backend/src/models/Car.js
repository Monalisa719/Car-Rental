import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  price: Number,
  image: String,
  type: String,
  specs: [String],
}, { timestamps: true });

export default mongoose.model("Car", carSchema);
