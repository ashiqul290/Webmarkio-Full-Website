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

