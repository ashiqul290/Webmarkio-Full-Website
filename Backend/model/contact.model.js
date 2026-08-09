const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required'],
    },
    phone: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      required: [true, 'message is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('contact', contactSchema);
