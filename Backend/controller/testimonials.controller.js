const { randomUUID } = require("node:crypto");
const TestimonialsContentModel = require("../model/testimonials.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const allowedFields = new Set([
  "id",
  "name",
  "role",
  "company",
  "image",
  "video",
  "text",
  "serviceType",
  "rating",
]);

exports.getTestimonials = asyncHandler(async (_req, res) => {
  const content = await TestimonialsContentModel.findById("home-testimonials").lean();
  return apiResponse(res, 200, "Testimonials fetched successfully", {
    initialized: content?.initialized === true,
    testimonials: content?.testimonials || [],
  });
});

exports.updateTestimonials = asyncHandler(async (req, res) => {
  const { testimonials } = req.body || {};
  if (!Array.isArray(testimonials) || testimonials.length > 100) {
    return apiResponse(res, 400, "Testimonials must be a list of up to 100 reviews.", null);
  }

  const ids = new Set();
  const cleanedTestimonials = [];
  for (const [index, item] of testimonials.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return apiResponse(res, 400, `Testimonial ${index + 1} must be an object.`, null);
    }

    const unknownField = Object.keys(item).find((field) => !allowedFields.has(field));
    if (unknownField) {
      return apiResponse(res, 400, `Unsupported testimonial field: ${unknownField}.`, null);
    }

    const id = typeof item.id === "string" && item.id.trim() ? item.id.trim() : randomUUID();
    if (ids.has(id)) {
      return apiResponse(res, 400, "Testimonial IDs must be unique.", null);
    }
    ids.add(id);

    for (const field of ["name", "role", "company", "image", "video"]) {
      if (item[field] !== undefined && typeof item[field] !== "string") {
        return apiResponse(res, 400, `Testimonial ${index + 1} ${field} must be text.`, null);
      }
    }
    if (
      typeof item.text !== "string" ||
      item.text.trim().length === 0 ||
      item.text.trim().length > 2000
    ) {
      return apiResponse(res, 400, `Testimonial ${index + 1} needs a review message up to 2000 characters.`, null);
    }
    if (
      typeof item.serviceType !== "string" ||
      item.serviceType.trim().length === 0 ||
      item.serviceType.trim().length > 100
    ) {
      return apiResponse(res, 400, `Testimonial ${index + 1} needs a service type up to 100 characters.`, null);
    }
    for (const field of ["name", "role", "company"]) {
      if ((item[field] || "").trim().length > 100) {
        return apiResponse(res, 400, `Testimonial ${index + 1} ${field} cannot exceed 100 characters.`, null);
      }
    }
    for (const field of ["image", "video"]) {
      const value = (item[field] || "").trim();
      if (value.length > 2048) {
        return apiResponse(res, 400, `Testimonial ${index + 1} ${field} URL cannot exceed 2048 characters.`, null);
      }
      if (value && !/^https?:\/\/\S+$/i.test(value)) {
        return apiResponse(res, 400, `Testimonial ${index + 1} ${field} must be an HTTP or HTTPS URL.`, null);
      }
    }

    const rating = item.rating === undefined ? 5 : Number(item.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return apiResponse(res, 400, `Testimonial ${index + 1} rating must be between 1 and 5.`, null);
    }

    cleanedTestimonials.push({
      id,
      name: (item.name || "").trim(),
      role: (item.role || "").trim(),
      company: (item.company || "").trim(),
      image: (item.image || "").trim(),
      video: (item.video || "").trim(),
      text: item.text.trim(),
      serviceType: item.serviceType.trim(),
      rating,
    });
  }

  const content = await TestimonialsContentModel.findByIdAndUpdate(
    "home-testimonials",
    { $set: { initialized: true, testimonials: cleanedTestimonials } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();

  return apiResponse(res, 200, "Testimonials updated successfully", {
    initialized: content.initialized,
    testimonials: content.testimonials,
  });
});
