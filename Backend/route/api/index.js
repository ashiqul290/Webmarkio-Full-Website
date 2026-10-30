const express = require('express');
const auth = require('./auth');
const team = require('./team');
const service = require('./service');
const projects = require('./projects');
const contact = require('./contact');
const admin = require('./admin');
const home = require('./home');
const api = express.Router();

api.use('/auth', auth);
api.use('/team', team);
api.use('/services',service)
api.use('/projects', projects);
api.use('/contact', contact);
api.use('/home', home);
api.use('/admin', admin);

module.exports = api;
