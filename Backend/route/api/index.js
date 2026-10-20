const express = require('express');
const auth = require('./auth');
const team = require('./team');
const service = require('./service');
const projects = require('./projects');
const contact = require('./contact');
const api = express.Router();

api.use('/auth', auth);
api.use('/team', team);
api.use('/services',service)
api.use('/projects', projects);
api.use('/contact', contact);

module.exports = api;
