const express = require("express");
const {
  getOverview,
  getUsers,
  updateUserStatus,
  updateUserRole,
  getContacts,
} = require("../../../controller/admin.controller");
const { getBannerContent, updateBannerContent } = require("../../../controller/banner.controller");
const {
  getTestimonials,
  updateTestimonials,
  updateTestimonial,
} = require("../../../controller/testimonials.controller");
const { getFaq, updateFaq, updateFaqItem } = require("../../../controller/faq.controller");
const { protect, adminOnly } = require("../../../middleware/auth.middleware");

const admin = express.Router();
admin.use(protect, adminOnly);
admin.get("/overview", getOverview);
admin.get("/users", getUsers);
admin.patch("/users/:id/status", updateUserStatus);
admin.patch("/users/:id/role", updateUserRole);
admin.get("/contacts", getContacts);
admin.get("/banner", getBannerContent);
admin.put("/banner", updateBannerContent);
admin.get("/testimonials", getTestimonials);
admin.put("/testimonials", updateTestimonials);
admin.patch("/testimonials/:id", updateTestimonial);
admin.get("/faq", getFaq);
admin.put("/faq", updateFaq);
admin.patch("/faq/:id", updateFaqItem);

module.exports = admin;
