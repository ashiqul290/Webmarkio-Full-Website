const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "testimonial id is required"],
    },
    name: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "role cannot exceed 100 characters"],
    },
    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "company cannot exceed 100 characters"],
    },
    image: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2048, "image URL cannot exceed 2048 characters"],
    },
    video: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2048, "video URL cannot exceed 2048 characters"],
    },
    text: {
      type: String,
      trim: true,
      required: [true, "review message is required"],
      maxlength: [2000, "review message cannot exceed 2000 characters"],
    },
    serviceType: {
      type: String,
      trim: true,
      required: [true, "service type is required"],
      maxlength: [100, "service type cannot exceed 100 characters"],
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  { _id: false },
);

const testimonialsContentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "home-testimonials",
  },
  initialized: {
    type: Boolean,
    default: false,
  },
  testimonials: {
    type: [testimonialSchema],
    default: [],
    validate: {
      validator: (testimonials) => {
        const ids = testimonials.map(({ id }) => id);
        return new Set(ids).size === ids.length;
      },
      message: "Testimonial IDs must be unique.",
    },
  },
});

module.exports = mongoose.model("TestimonialsContent", testimonialsContentSchema);
