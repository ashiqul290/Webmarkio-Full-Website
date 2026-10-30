const BannerModel = require("../model/banner.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const defaultBanner = {
  headlineBefore: "We Build",
  headlineHighlight: "Powerful",
  headlineAfter: "Digital Experiences",
  description:
    "WebMarkio Agency helps businesses grow with modern websites, UI/UX design, SEO and digital marketing solutions that convert visitors into loyal clients.",
  stats: [
    { value: "100+", label: "Projects" },
    { value: "50+", label: "Clients" },
    { value: "5★", label: "Rating" },
  ],
};

const toBannerContent = (banner) => ({
  headlineBefore: banner.headlineBefore,
  headlineHighlight: banner.headlineHighlight,
  headlineAfter: banner.headlineAfter,
  description: banner.description,
  stats: banner.stats.map(({ value, label }) => ({ value, label })),
});

exports.getBannerContent = asyncHandler(async (_req, res) => {
  const banner = await BannerModel.findById("home-banner").lean();
  return apiResponse(
    res,
    200,
    "Banner content fetched successfully",
    banner ? toBannerContent(banner) : defaultBanner,
  );
});

exports.updateBannerContent = asyncHandler(async (req, res) => {
  const { headlineBefore, headlineHighlight, headlineAfter, description, stats } = req.body || {};
  const textFields = [
    ["headlineBefore", headlineBefore, 100],
    ["headlineHighlight", headlineHighlight, 100],
    ["headlineAfter", headlineAfter, 100],
    ["description", description, 500],
  ];

  for (const [field, value, maxLength] of textFields) {
    if (typeof value !== "string" || value.trim().length === 0 || value.trim().length > maxLength) {
      return apiResponse(res, 400, `${field} must be a non-empty string up to ${maxLength} characters.`, null);
    }
  }
  if (!Array.isArray(stats) || stats.length !== 3) {
    return apiResponse(res, 400, "Exactly three homepage stats are required.", null);
  }

  const cleanedStats = [];
  for (const [index, stat] of stats.entries()) {
    if (
      !stat ||
      typeof stat.value !== "string" ||
      stat.value.trim().length === 0 ||
      stat.value.trim().length > 20 ||
      typeof stat.label !== "string" ||
      stat.label.trim().length === 0 ||
      stat.label.trim().length > 40
    ) {
      return apiResponse(res, 400, `Stat ${index + 1} needs a value (up to 20 characters) and label (up to 40 characters).`, null);
    }
    cleanedStats.push({ value: stat.value.trim(), label: stat.label.trim() });
  }

  const content = {
    headlineBefore: headlineBefore.trim(),
    headlineHighlight: headlineHighlight.trim(),
    headlineAfter: headlineAfter.trim(),
    description: description.trim(),
    stats: cleanedStats,
  };
  const banner = await BannerModel.findByIdAndUpdate(
    "home-banner",
    { $set: content },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();

  return apiResponse(res, 200, "Banner content updated successfully", toBannerContent(banner));
});
