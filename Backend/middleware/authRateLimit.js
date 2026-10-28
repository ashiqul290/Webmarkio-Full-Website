const { apiResponse } = require("../utils/apiResponse");

const windowMs = 15 * 60 * 1000;
const maxAttempts = 10;
const attemptsByIp = new Map();
let nextCleanupAt = Date.now() + windowMs;

module.exports = function authRateLimit(req, res, next) {
  const now = Date.now();
  if (now >= nextCleanupAt) {
    for (const [ip, entry] of attemptsByIp) {
      if (entry.resetAt <= now) attemptsByIp.delete(ip);
    }
    nextCleanupAt = now + windowMs;
  }

  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const entry = attemptsByIp.get(ip);
  if (!entry || entry.resetAt <= now) {
    attemptsByIp.set(ip, { count: 1, resetAt: now + windowMs });
    return next();
  }

  if (entry.count >= maxAttempts) {
    res.set("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
    return apiResponse(res, 429, "Too many authentication attempts. Try again later.", null);
  }

  entry.count += 1;
  return next();
};
