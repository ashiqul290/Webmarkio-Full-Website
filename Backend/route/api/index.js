const express = require('express');
const auth = require('./auth');
const team = require('./team');
const service = require('./service');
const projects = require('./projects');
const contact = require('./contact');
<<<<<<< HEAD
const admin = require('./admin');
const home = require('./home');
=======
>>>>>>> origin/main
const api = express.Router();

api.use('/auth', auth);
api.use('/team', team);
api.use('/services',service)
api.use('/projects', projects);
api.use('/contact', contact);
<<<<<<< HEAD
api.use('/home', home);
api.use('/admin', admin);
=======
>>>>>>> origin/main

module.exports = api;
