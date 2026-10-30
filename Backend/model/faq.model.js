const mongoose = require("mongoose");

const faqItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "FAQ id is required"],
    },
    question: {
      type: String,
      trim: true,
      required: [true, "Question is required"],
      maxlength: [300, "Question cannot exceed 300 characters"],
    },
    answer: {
      type: String,
      trim: true,
      required: [true, "Answer is required"],
      maxlength: [3000, "Answer cannot exceed 3000 characters"],
    },
    category: {
      type: String,
      trim: true,
      default: "General",
      maxlength: [100, "Category cannot exceed 100 characters"],
    },
  },
  { _id: false },
);

const faqContentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "home-faq",
  },
  initialized: {
    type: Boolean,
    default: false,
  },
  faqItems: {
    type: [faqItemSchema],
    default: [],
    validate: {
      validator: (items) => {
        const ids = items.map(({ id }) => id);
        return new Set(ids).size === ids.length;
      },
      message: "FAQ IDs must be unique.",
    },
  },
});

module.exports = mongoose.model("FaqContent", faqContentSchema);
