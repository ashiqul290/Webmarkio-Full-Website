const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model.js");
const { apiResponse } = require("../utils/apiResponse");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.headers.token || req.headers["x-auth-token"];

  if (!token) {
    return apiResponse(res, 401, "Authentication required", null);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    return apiResponse(res, 503, "Authentication service is not configured", null);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch {
    return apiResponse(res, 401, "Invalid or expired token", null);
  }
  if (!decoded || typeof decoded !== "object" || typeof decoded.id !== "string") {
    return apiResponse(res, 401, "Invalid or expired token", null);
  }

  try {
    const user = await UserModel.findById(decoded.id).select("+tokenVersion");
    if (
      !user ||
      user.status !== "active" ||
      user.tokenVersion !== (decoded.tokenVersion ?? 0)
    ) {
      return apiResponse(res, 401, "Authentication required", null);
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user) {
    return apiResponse(res, 401, "Authentication required", null);
  }

  if (req.user.role !== "admin") {
    return apiResponse(res, 403, "Access denied. Admin only.", null);
  }

  return next();
};
