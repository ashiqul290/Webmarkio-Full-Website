const mongoose = require("mongoose");
const Service = require("../model/service.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { apiResponse } = require("../utils/apiResponse");

const serviceFields = [
  "slug",
  "title",
  "shortDescription",
  "description",
  "icon",
  "category",
  "features",
  "benefits",
  "process",
  "price",
  "image",
];

const pickServiceFields = (body) =>
  serviceFields.reduce((service, field) => {
    if (body?.[field] !== undefined) service[field] = body[field];
    return service;
  }, {});

exports.AddServiceController = asyncHandler(async (req, res) => {
  const service = new Service(pickServiceFields(req.body));
  await service.save();
  return apiResponse(res, 201, "Service created successfully", service);
});

exports.getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  return apiResponse(res, 200, "Services fetched successfully", services);
});

exports.getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug.toLowerCase() });
  if (!service) return apiResponse(res, 404, "Service not found", null);

  return apiResponse(res, 200, "Service fetched successfully", service);
});

exports.updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return apiResponse(res, 400, "Invalid service id", null);
  }

  const service = await Service.findById(id);
  if (!service) return apiResponse(res, 404, "Service not found", null);

  Object.assign(service, pickServiceFields(req.body));
  await service.save();
  return apiResponse(res, 200, "Service updated successfully", service);
});

exports.deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return apiResponse(res, 400, "Invalid service id", null);
  }

  const service = await Service.findByIdAndDelete(id);
  if (!service) return apiResponse(res, 404, "Service not found", null);

  return apiResponse(res, 200, "Service deleted successfully", service);
});
