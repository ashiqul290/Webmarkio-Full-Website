const express = require("express");
const {
  addProject,
  getAllProjects,
  getSingleProject,
  getProjectsByType,
  updateProject,
  deleteProject,
} = require("../../../controller/projects.controller");
const { protect, adminOnly } = require("../../../middleware/auth.middleware");
const projects = express.Router();

projects.post("/add-project", protect, adminOnly, addProject);
projects.get("/all-projects", getAllProjects);
projects.get("/single-project/:id", getSingleProject);
projects.get("/type/:typeSlug", getProjectsByType);
projects.patch("/update-project/:id", protect, adminOnly, updateProject);
projects.delete("/delete-project/:id", protect, adminOnly, deleteProject);

module.exports = projects;