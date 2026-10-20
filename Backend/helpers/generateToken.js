const jwt = require('jsonwebtoken');

module.exports = function generateToken(id) {
  const secret = process.env.JWT_SECRET || 'change_this_secret_in_production';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};
