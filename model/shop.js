import mongoose from "mongoose";

const shopScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

shopScheema.index({ location: "2dsphere" });

const Shop = mongoose.model("Shop", shopScheema);
export default Shop;
