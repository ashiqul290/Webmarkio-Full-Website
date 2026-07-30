const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    position: {
      type: String,
      required: [true, "position is required"]
    },
    facebookLink: {
      type: String,
    },
    LinkedInLink: {
      type: String,
    },
    whatsappNum: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("team", userSchema);