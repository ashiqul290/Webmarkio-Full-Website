const mongoose = require("mongoose");

const processSchema = new mongoose.Schema(
  {
    step: {
      type: Number,
      required: [true, "process step is required"],
      min: [1, "process step must be at least 1"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "process title is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "process description is required"],
    },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "slug is required"],
      unique: true,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "title is required"],
    },
    shortDescription: {
      type: String,
      trim: true,
      required: [true, "shortDescription is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "description is required"],
    },
    icon: {
      type: String,
      trim: true,
      required: [true, "icon is required"],
    },
    category: {
      type: String,
      trim: true,
      required: [true, "category is required"],
    },
    features: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    benefits: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    process: {
      type: [processSchema],
      default: [],
    },
    price: {
      type: String,
      trim: true,
      required: [true, "price is required"],
    },
    image: {
      type: String,
      trim: true,
      required: [true, "image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
