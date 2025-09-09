// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Expect token in Authorization header: "Bearer <token>"
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1]; // take only the token part
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded payload contains { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
