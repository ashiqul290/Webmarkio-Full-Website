const express = require('express');
const auth = require('./auth');
const team = require('./team');
const api = express.Router();

api.use('/auth', auth);
api.use('/team', team);


module.exports = api;
