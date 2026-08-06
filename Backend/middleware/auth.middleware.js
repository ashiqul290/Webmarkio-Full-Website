const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model.js");
const { apiResponse } = require("../utils/apiResponse");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.headers.token || req.headers["x-auth-token"];

    if (!token) {
      return apiResponse(res, 401, "Authentication required", null);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "change_this_secret_in_production");
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return apiResponse(res, 401, "User not found", null);
    }

    req.user = user;
    next();
  } catch (error) {
    return apiResponse(res, 401, "Invalid or expired token", null);
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user) {
    return apiResponse(res, 401, "Authentication required", null);
  }

  if (req.user.role !== "admin") {
    return apiResponse(res, 403, "Access denied. Admin only.", null);
  }

  next();
};
