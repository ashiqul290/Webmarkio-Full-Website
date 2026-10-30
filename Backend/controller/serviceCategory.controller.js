const ServiceCategoryModel = require("../model/serviceCategory.model");
const ServiceModel = require("../model/service.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const defaultCategories = ["Web Development", "Digital Marketing", "Graphic Design"];

function mergeCategories(...groups) {
  const categories = new Map();
  for (const group of groups) {
    for (const value of group) {
      if (typeof value !== "string" || !value.trim()) continue;
      const name = value.trim();
      const key = name.toLocaleLowerCase();
      if (!categories.has(key)) categories.set(key, name);
    }
  }
  return [...categories.values()];
}

exports.getServiceCategories = asyncHandler(async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const [content, serviceCategories] = await Promise.all([
    ServiceCategoryModel.findById("service-categories").lean(),
    ServiceModel.distinct("category"),
  ]);
  const categories = mergeCategories(
    content?.initialized ? content.categories : defaultCategories,
    serviceCategories,
  );
  return apiResponse(res, 200, "Service categories fetched successfully", categories);
});

exports.updateServiceCategories = asyncHandler(async (req, res) => {
  const { categories } = req.body || {};
  if (!Array.isArray(categories) || categories.length > 100) {
    return apiResponse(res, 400, "Provide up to 100 service categories.", null);
  }

  const cleanedCategories = [];
  const seen = new Set();
  for (const [index, category] of categories.entries()) {
    if (typeof category !== "string" || !category.trim() || category.trim().length > 80) {
      return apiResponse(res, 400, `Category ${index + 1} must be 1-80 characters.`, null);
    }
    const name = category.trim();
    const key = name.toLocaleLowerCase();
    if (seen.has(key)) {
      return apiResponse(res, 400, "Service category names must be unique.", null);
    }
    seen.add(key);
    cleanedCategories.push(name);
  }

  const usedCategories = await ServiceModel.distinct("category");
  const removedUsedCategory = usedCategories.find(
    (category) => !seen.has(String(category).trim().toLocaleLowerCase()),
  );
  if (removedUsedCategory) {
    return apiResponse(
      res,
      409,
      `Move or delete services in "${removedUsedCategory}" before removing that category.`,
      null,
    );
  }

  const content = await ServiceCategoryModel.findByIdAndUpdate(
    "service-categories",
    { $set: { initialized: true, categories: cleanedCategories } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();

  return apiResponse(res, 200, "Service categories updated successfully", content.categories);
});
