const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      trim: true,
      required: [true, "stat value is required"],
      maxlength: [20, "stat value cannot exceed 20 characters"],
    },
    label: {
      type: String,
      trim: true,
      required: [true, "stat label is required"],
      maxlength: [40, "stat label cannot exceed 40 characters"],
    },
  },
  { _id: false },
);

const bannerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "home-banner",
  },
  headlineBefore: {
    type: String,
    trim: true,
    required: [true, "headline first part is required"],
    maxlength: [100, "headline first part cannot exceed 100 characters"],
  },
  headlineHighlight: {
    type: String,
    trim: true,
    required: [true, "headline highlighted part is required"],
    maxlength: [100, "headline highlighted part cannot exceed 100 characters"],
  },
  headlineAfter: {
    type: String,
    trim: true,
    required: [true, "headline last part is required"],
    maxlength: [100, "headline last part cannot exceed 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "description is required"],
    maxlength: [500, "description cannot exceed 500 characters"],
  },
  stats: {
    type: [statSchema],
    required: true,
    validate: {
      validator: (stats) => stats.length === 3,
      message: "Exactly three homepage stats are required.",
    },
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
