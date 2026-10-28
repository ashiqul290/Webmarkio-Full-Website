const express = require("express");
const {
  getOverview,
  getUsers,
  updateUserStatus,
  updateUserRole,
  getContacts,
} = require("../../../controller/admin.controller");
const { protect, adminOnly } = require("../../../middleware/auth.middleware");

const admin = express.Router();
admin.use(protect, adminOnly);
admin.get("/overview", getOverview);
admin.get("/users", getUsers);
admin.patch("/users/:id/status", updateUserStatus);
admin.patch("/users/:id/role", updateUserRole);
admin.get("/contacts", getContacts);

module.exports = admin;
