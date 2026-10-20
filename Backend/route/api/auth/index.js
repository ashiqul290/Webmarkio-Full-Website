const express = require('express');
const { signupController, loginController, logoutController } = require('../../../controller/auth.controller');
const auth = express.Router();

auth.post('/signup', signupController);

auth.post('/login', loginController);

auth.post('/logout', logoutController);

module.exports = auth;
