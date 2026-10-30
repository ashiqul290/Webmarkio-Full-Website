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

function validateTestimonials(testimonials) {
  if (!Array.isArray(testimonials) || testimonials.length > 100) {
    return { error: "Testimonials must be a list of up to 100 reviews." };
  }

  const ids = new Set();
  const cleanedTestimonials = [];
  for (const [index, item] of testimonials.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return { error: `Testimonial ${index + 1} must be an object.` };
    }

    const unknownField = Object.keys(item).find((field) => !allowedFields.has(field));
    if (unknownField) {
      return { error: `Unsupported testimonial field: ${unknownField}.` };
    }

    const id = typeof item.id === "string" && item.id.trim() ? item.id.trim() : randomUUID();
    if (ids.has(id)) {
      return { error: "Testimonial IDs must be unique." };
    }
    ids.add(id);

    for (const field of ["name", "role", "company", "image", "video"]) {
      if (item[field] !== undefined && typeof item[field] !== "string") {
        return { error: `Testimonial ${index + 1} ${field} must be text.` };
      }
    }
    if (
      typeof item.text !== "string" ||
      item.text.trim().length === 0 ||
      item.text.trim().length > 2000
    ) {
      return { error: `Testimonial ${index + 1} needs a review message up to 2000 characters.` };
    }
    if (
      typeof item.serviceType !== "string" ||
      item.serviceType.trim().length === 0 ||
      item.serviceType.trim().length > 100
    ) {
      return { error: `Testimonial ${index + 1} needs a service type up to 100 characters.` };
    }
    for (const field of ["name", "role", "company"]) {
      if ((item[field] || "").trim().length > 100) {
        return { error: `Testimonial ${index + 1} ${field} cannot exceed 100 characters.` };
      }
    }
    for (const field of ["image", "video"]) {
      const value = (item[field] || "").trim();
      if (value.length > 2048) {
        return { error: `Testimonial ${index + 1} ${field} URL cannot exceed 2048 characters.` };
      }
      if (value && !/^https?:\/\/\S+$/i.test(value)) {
        return { error: `Testimonial ${index + 1} ${field} must be an HTTP or HTTPS URL.` };
      }
    }

    const rating = item.rating === undefined ? 5 : Number(item.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return { error: `Testimonial ${index + 1} rating must be between 1 and 5.` };
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

  return { testimonials: cleanedTestimonials };
}

exports.getTestimonials = asyncHandler(async (_req, res) => {
  const content = await TestimonialsContentModel.findById("home-testimonials").lean();
  return apiResponse(res, 200, "Testimonials fetched successfully", {
    initialized: content?.initialized === true,
    testimonials: content?.testimonials || [],
  });
});

exports.updateTestimonials = asyncHandler(async (req, res) => {
  const validation = validateTestimonials(req.body?.testimonials);
  if (validation.error) return apiResponse(res, 400, validation.error, null);

  const content = await TestimonialsContentModel.findByIdAndUpdate(
    "home-testimonials",
    { $set: { initialized: true, testimonials: validation.testimonials } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();

  return apiResponse(res, 200, "Testimonials updated successfully", {
    initialized: content.initialized,
    testimonials: content.testimonials,
  });
});

exports.updateTestimonial = asyncHandler(async (req, res) => {
  const validation = validateTestimonials([{ ...req.body, id: req.params.id }]);
  if (validation.error) return apiResponse(res, 400, validation.error, null);

  const content = await TestimonialsContentModel.findById("home-testimonials");
  if (!content?.initialized) {
    return apiResponse(res, 404, "Testimonials have not been initialized.", null);
  }

  const index = content.testimonials.findIndex((item) => item.id === req.params.id);
  if (index === -1) return apiResponse(res, 404, "Testimonial not found.", null);

  content.testimonials[index] = validation.testimonials[0];
  await content.save();

  return apiResponse(res, 200, "Testimonial updated successfully", {
    initialized: content.initialized,
    testimonials: content.testimonials.map((item) =>
      typeof item.toObject === "function" ? item.toObject() : item,
    ),
  });
});
