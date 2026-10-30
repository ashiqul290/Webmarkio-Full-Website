const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "service-categories",
  },
  initialized: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [{ type: String, trim: true }],
    default: [],
    validate: {
      validator: (categories) => new Set(categories.map((item) => item.toLowerCase())).size === categories.length,
      message: "Service categories must be unique.",
    },
  },
});

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
