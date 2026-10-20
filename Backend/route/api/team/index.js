const express = require('express');
const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require('../../../controller/team.controller');
const { protect, adminOnly } = require('../../../middleware/auth.middleware');
const team = express.Router();

team.post('/add-member', protect, adminOnly, createTeamMember);
team.get('/all-members', getAllTeamMembers);
team.get('/single-member/:id', getTeamMemberById);
team.patch('/update-member/:id', protect, adminOnly, updateTeamMember);
team.delete('/delete-member/:id', protect, adminOnly, deleteTeamMember);

module.exports = team;
