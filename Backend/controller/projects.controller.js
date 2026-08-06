const mongoose = require("mongoose");
const ProjectsModel = require("../model/projects.model.js");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const slugify = require('slugify')


exports.addProject = asyncHandler(async (req, res) => {
  const {
    projectname,
    projecttype,
    companyname,
    projectoverview,
    projectrequirements,
    workdescription,
    keyfeatures,
    projectgallery,
    mainimage,
    technologies,
    projectlink,
    maintechnology,
  } = req.body;

  if (!projectname || !projecttype) {
    return apiResponse(res, 400, "projectname and projecttype are required", null);
  }

  const projecttypeSlug = slugify(projecttype, {
    lower: true,
    strict: true,
  });

  const project = await ProjectsModel.create({
    projectname,
    projecttype,
    projecttypeSlug,
    companyname,
    projectoverview,
    projectrequirements,
    workdescription,
    keyfeatures,
    projectgallery,
    mainimage,
    technologies,
    projectlink,
    maintechnology,
  });

  apiResponse(res, 201, "Project created successfully", project);
});

exports.getAllProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectsModel.find();
  apiResponse(res, 200, "Projects fetched successfully", projects);
});

exports.getSingleProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return apiResponse(res, 400, "Invalid project id", null);
  }

  const project = await ProjectsModel.findById(id);
  if (!project) {
    return apiResponse(res, 404, "Project not found", null);
  }
  apiResponse(res, 200, "Project fetched successfully", project);
});

exports.getProjectsByType = asyncHandler(async (req, res) => {
  const { typeSlug } = req.params;
  const projects = await ProjectsModel.find({ projecttypeSlug: typeSlug });
  apiResponse(res, 200, "Projects fetched by type successfully", projects);
});

exports.updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return apiResponse(res, 400, "Invalid project id", null);
  }

  const project = await ProjectsModel.findById(id);
  if (!project) {
    return apiResponse(res, 404, "Project not found", null);
  }

  Object.assign(project, req.body);
  await project.save();

  apiResponse(res, 200, "Project updated successfully", project);
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return apiResponse(res, 400, "Invalid project id", null);
  }

  const project = await ProjectsModel.findByIdAndDelete(id);
  if (!project) {
    return apiResponse(res, 404, "Project not found", null);
  }
  apiResponse(res, 200, "Project deleted successfully", project);
});
