const { asyncHandler } = require("../utils/asyncHandler");
const TeamModel = require("../model/team.model.js");
const { apiResponse } = require("../utils/apiResponse");

exports.createTeamMember = asyncHandler(async (req, res) => {
  const { name, position, facebookLink, LinkedInLink, whatsappNum, image } = req.body;

  const member = await TeamModel.create({
    name,
    position,
    facebookLink,
    LinkedInLink,
    whatsappNum,
    image,
  });

  apiResponse(res, 201, "Team member created successfully", member);
});

exports.getAllTeamMembers = asyncHandler(async (req, res) => {
  const members = await TeamModel.find().sort({ createdAt: -1 });
  apiResponse(res, 200, "Team members fetched successfully", members);
});

exports.getTeamMemberById = asyncHandler(async (req, res) => {
  const member = await TeamModel.findById(req.params.id);
  if (!member) {
    return apiResponse(res, 404, "Team member not found", null);
  }
  apiResponse(res, 200, "Team member fetched successfully", member);
});

exports.updateTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const member = await TeamModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!member) {
    return apiResponse(res, 404, "Team member not found", null);
  }

  apiResponse(res, 200, "Team member updated successfully", member);
});

exports.deleteTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const member = await TeamModel.findByIdAndDelete(id);
  if (!member) {
    return apiResponse(res, 404, "Team member not found", null);
  }

  apiResponse(res, 200, "Team member deleted successfully", null);
});