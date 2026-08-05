const express = require('express');
const auth = require('./auth');
const team = require('./team');
const service = require('./service');
const api = express.Router();

api.use('/auth', auth);
api.use('/team', team);
api.use('/service',service)

module.exports = api;
