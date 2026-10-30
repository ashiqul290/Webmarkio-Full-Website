const { randomUUID } = require("node:crypto");
const FaqContentModel = require("../model/faq.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const allowedFields = new Set(["id", "question", "answer", "category"]);

function validateFaqItems(items) {
  if (!Array.isArray(items) || items.length > 200) {
    return { error: "FAQ items must be a list of up to 200 questions." };
  }

  const ids = new Set();
  const faqItems = [];
  for (const [index, item] of items.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return { error: `FAQ item ${index + 1} must be an object.` };
    }

    const unknownField = Object.keys(item).find((field) => !allowedFields.has(field));
    if (unknownField) return { error: `Unsupported FAQ field: ${unknownField}.` };

    const id = typeof item.id === "string" && item.id.trim() ? item.id.trim() : randomUUID();
    if (ids.has(id)) return { error: "FAQ IDs must be unique." };
    ids.add(id);

    for (const field of ["question", "answer", "category"]) {
      if (item[field] !== undefined && typeof item[field] !== "string") {
        return { error: `FAQ item ${index + 1} ${field} must be text.` };
      }
    }
    if (
      typeof item.question !== "string" ||
      item.question.trim().length === 0 ||
      item.question.trim().length > 300
    ) {
      return { error: `FAQ item ${index + 1} needs a question up to 300 characters.` };
    }
    if (
      typeof item.answer !== "string" ||
      item.answer.trim().length === 0 ||
      item.answer.trim().length > 3000
    ) {
      return { error: `FAQ item ${index + 1} needs an answer up to 3000 characters.` };
    }
    const category = item.category === undefined ? "General" : item.category.trim();
    if (category.length > 100) {
      return { error: `FAQ item ${index + 1} category cannot exceed 100 characters.` };
    }

    faqItems.push({
      id,
      question: item.question.trim(),
      answer: item.answer.trim(),
      category: category || "General",
    });
  }

  return { faqItems };
}

exports.getFaq = asyncHandler(async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const content = await FaqContentModel.findById("home-faq").lean();
  return apiResponse(res, 200, "FAQ content fetched successfully", {
    initialized: content?.initialized === true,
    faqItems: content?.faqItems || [],
  });
});

exports.updateFaq = asyncHandler(async (req, res) => {
  const validation = validateFaqItems(req.body?.faqItems);
  if (validation.error) return apiResponse(res, 400, validation.error, null);

  const content = await FaqContentModel.findByIdAndUpdate(
    "home-faq",
    { $set: { initialized: true, faqItems: validation.faqItems } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();

  return apiResponse(res, 200, "FAQ content updated successfully", {
    initialized: content.initialized,
    faqItems: content.faqItems,
  });
});

exports.updateFaqItem = asyncHandler(async (req, res) => {
  const validation = validateFaqItems([{ ...req.body, id: req.params.id }]);
  if (validation.error) return apiResponse(res, 400, validation.error, null);

  const content = await FaqContentModel.findById("home-faq");
  if (!content?.initialized) return apiResponse(res, 404, "FAQ content has not been initialized.", null);

  const index = content.faqItems.findIndex((item) => item.id === req.params.id);
  if (index === -1) return apiResponse(res, 404, "FAQ item not found.", null);

  content.faqItems[index] = validation.faqItems[0];
  await content.save();

  return apiResponse(res, 200, "FAQ item updated successfully", {
    initialized: content.initialized,
    faqItems: content.faqItems.map((item) =>
      typeof item.toObject === "function" ? item.toObject() : item,
    ),
  });
});
