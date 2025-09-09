// backend/middleware/roles.js

/**
 * roles can be a single role ('admin') or an array of roles (['admin', 'student'])
 */
module.exports = function (roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Access forbidden: insufficient role' });
    }

    next();
  };
};
