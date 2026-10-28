const express = require('express');
const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
} = require('../../../controller/auth.controller');
const { protect } = require('../../../middleware/auth.middleware');
const authRateLimit = require('../../../middleware/authRateLimit');
const auth = express.Router();

auth.post('/signup', authRateLimit, signupController);

auth.post('/login', authRateLimit, loginController);

auth.get('/me', protect, currentUserController);
auth.post('/logout', protect, logoutController);

module.exports = auth;
