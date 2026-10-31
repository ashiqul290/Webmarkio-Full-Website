const express = require('express');
<<<<<<< HEAD
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
=======
const { signupController, loginController, logoutController } = require('../../../controller/auth.controller');
const auth = express.Router();

auth.post('/signup', signupController);

auth.post('/login', loginController);

auth.post('/logout', logoutController);
>>>>>>> origin/main

module.exports = auth;
