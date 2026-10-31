const jwt = require('jsonwebtoken');

<<<<<<< HEAD
module.exports = function generateToken(id, tokenVersion = 0) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters.");
  }

  return jwt.sign({ id, tokenVersion }, secret, { expiresIn: "7d" });
=======
module.exports = function generateToken(id) {
  const secret = process.env.JWT_SECRET || 'change_this_secret_in_production';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
>>>>>>> origin/main
};
