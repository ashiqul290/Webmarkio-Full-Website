const express = require('express');
const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require('../../../controller/team.controller');
const team = express.Router();

team.post('/add-member', createTeamMember);
team.get('/all-members', getAllTeamMembers);
team.get('/single-member/:id', getTeamMemberById);
team.patch('/update-member/:id', updateTeamMember);
team.delete('/delete-member/:id', deleteTeamMember);

module.exports = team;
