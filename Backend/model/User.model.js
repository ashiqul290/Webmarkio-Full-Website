const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
<<<<<<< HEAD
      trim: true,
      lowercase: true,
      required: [true, "email is required"],
      unique: true,
=======
      required: [true, "email is required"],
      unique: [true, "email already in use"],
>>>>>>> origin/main
    },
    password: {
      type: String,
      required: [true, "password is required"],
<<<<<<< HEAD
      select: false,
=======
>>>>>>> origin/main
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
<<<<<<< HEAD
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    tokenVersion: {
      type: Number,
      default: 0,
      select: false,
    },
=======
>>>>>>> origin/main
  },
  {
    timestamps: true,
  },
);

<<<<<<< HEAD
userSchema.set("toJSON", {
  transform(_document, returned) {
    delete returned.password;
    delete returned.tokenVersion;
    delete returned.__v;
    return returned;
  },
});

=======
>>>>>>> origin/main
module.exports = mongoose.model("user", userSchema);