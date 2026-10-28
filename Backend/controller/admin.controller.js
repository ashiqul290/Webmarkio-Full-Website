const mongoose = require("mongoose");
const UserModel = require("../model/User.model");
const ProjectModel = require("../model/projects.model");
const ServiceModel = require("../model/service.model");
const ContactModel = require("../model/contact.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.getOverview = asyncHandler(async (_req, res) => {
  const [users, activeUsers, suspendedUsers, projects, services, contacts] =
    await Promise.all([
      UserModel.countDocuments(),
      UserModel.countDocuments({ status: "active" }),
      UserModel.countDocuments({ status: "suspended" }),
      ProjectModel.countDocuments(),
      ServiceModel.countDocuments(),
      ContactModel.countDocuments(),
    ]);

  return apiResponse(res, 200, "Admin overview fetched successfully", {
    users,
    activeUsers,
    suspendedUsers,
    projects,
    services,
    contacts,
  });
});

exports.getUsers = asyncHandler(async (_req, res) => {
  const users = await UserModel.find()
    .select("name email role status createdAt")
    .sort({ createdAt: -1 })
    .lean();
  return apiResponse(res, 200, "Users fetched successfully", users);
});

exports.updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  if (!mongoose.isValidObjectId(id)) {
    return apiResponse(res, 400, "Invalid user id", null);
  }
  if (!["active", "suspended"].includes(status)) {
    return apiResponse(res, 400, "Status must be active or suspended.", null);
  }
  if (String(req.user._id).toLowerCase() === id.toLowerCase() && status !== "active") {
    return apiResponse(res, 400, "You cannot suspend your own account.", null);
  }

  const targetUser = await UserModel.findById(id).select("role status");
  if (!targetUser) return apiResponse(res, 404, "User not found", null);
  if (targetUser.role === "admin" && targetUser.status === "active" && status === "suspended") {
    const activeAdminCount = await UserModel.countDocuments({ role: "admin", status: "active" });
    if (activeAdminCount <= 1) {
      return apiResponse(res, 409, "The last active administrator cannot be suspended.", null);
    }
  }

  const user = await UserModel.findByIdAndUpdate(
    id,
    { $set: { status }, $inc: { tokenVersion: 1 } },
    { new: true, runValidators: true, select: "name email role status createdAt" },
  );
  if (!user) return apiResponse(res, 404, "User not found", null);

  return apiResponse(res, 200, "User status updated successfully", user);
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body || {};
  if (!mongoose.isValidObjectId(id)) {
    return apiResponse(res, 400, "Invalid user id", null);
  }
  if (!["user", "admin"].includes(role)) {
    return apiResponse(res, 400, "Role must be user or admin.", null);
  }
  if (String(req.user._id).toLowerCase() === id.toLowerCase()) {
    return apiResponse(res, 400, "You cannot change your own role.", null);
  }

  const userToUpdate = await UserModel.findById(id).select(
    "name email role status createdAt +tokenVersion",
  );
  if (!userToUpdate) return apiResponse(res, 404, "User not found", null);
  if (userToUpdate.role === "admin" && userToUpdate.status === "active" && role === "user") {
    const activeAdminCount = await UserModel.countDocuments({ role: "admin", status: "active" });
    if (activeAdminCount <= 1) {
      return apiResponse(res, 409, "The last active administrator cannot be demoted.", null);
    }
  }

  userToUpdate.role = role;
  userToUpdate.tokenVersion += 1;
  await userToUpdate.save();
  return apiResponse(res, 200, "User role updated successfully", userToUpdate);
});

exports.getContacts = asyncHandler(async (_req, res) => {
  const contacts = await ContactModel.find().sort({ createdAt: -1 }).lean();
  return apiResponse(res, 200, "Contacts fetched successfully", contacts);
});
