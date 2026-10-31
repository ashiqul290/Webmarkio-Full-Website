<<<<<<< HEAD
const bcrypt = require("bcrypt");
const UserModel = require("../model/User.model.js");
const generateToken = require("../helpers/generateToken");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
});

exports.signupController = asyncHandler(async (req, res) => {
  const { name: rawName, email: rawEmail, password } = req.body || {};
  const name = typeof rawName === "string" ? rawName.trim() : "";
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (name.length < 2 || name.length > 80) {
    return apiResponse(res, 400, "Name must be between 2 and 80 characters.", null);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return apiResponse(res, 400, "Enter a valid email address.", null);
  }
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return apiResponse(res, 400, "Password must be at least 8 characters.", null);
  }

  const existingUser = await UserModel.exists({ email });
  if (existingUser) {
    return apiResponse(res, 409, "An account with this email already exists.", null);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
    status: "active",
  });

  return apiResponse(res, 201, "User registered successfully", publicUser(user));
});

exports.loginController = asyncHandler(async (req, res) => {
  const { email: rawEmail, password } = req.body || {};
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  if (!email || typeof password !== "string" || password.length > 72) {
    return apiResponse(res, 401, "Invalid email or password", null);
  }

  const user = await UserModel.findOne({ email }).select("+password +tokenVersion");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return apiResponse(res, 401, "Invalid email or password", null);
  }
  if (user.status !== "active") {
    return apiResponse(res, 403, "This account is unavailable. Contact an administrator.", null);
  }

  const token = generateToken(user._id, user.tokenVersion);
  return apiResponse(res, 200, "User logged in successfully", {
    user: publicUser(user),
    token,
  });
});

exports.currentUserController = asyncHandler(async (req, res) => {
  return apiResponse(res, 200, "Current user fetched successfully", publicUser(req.user));
});

exports.logoutController = asyncHandler(async (req, res) => {
  await UserModel.updateOne({ _id: req.user._id }, { $inc: { tokenVersion: 1 } });
  return apiResponse(res, 200, "User logged out successfully", null);
});
=======
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const UserMoldel = require("../model/User.model.js");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generateToken");
 
exports.signupController = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Check if the user already exists
  const existingUser = await UserMoldel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
const hash = await bcrypt.hash(password, 12);
  // Create a new user
  const newUser = new UserMoldel({
    name,
    email,
    password: hash,
    phone,
  });
  await newUser.save(); 

  apiResponse(res, 201, true, newUser, null, "User registered successfully");
});

exports.loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await UserMoldel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);

  apiResponse(res, 200, "User logged in successfully", { user, token });
});

exports.logoutController = asyncHandler(async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Unable to log out. Please try again.' });
      }
      res.clearCookie('webmarkio-session');
      apiResponse(res, 200, 'User logged out successfully', null);
    });
  } else {
    apiResponse(res, 200, 'User logged out successfully', null);
  }
});

>>>>>>> origin/main
