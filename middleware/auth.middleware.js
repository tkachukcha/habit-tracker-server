const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return  next();
  }
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Unauthorized. Authorization header is not there' });
    }
    const token = req.headers.authorization.split(' ')[1];  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. No token' });
    }
    const data = tokenService.validateAccess(token);
    if (!data) {
      return res.status(401).json({ message: 'Unauthorized. Token is not valid' });
    }
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Server error' });
  }
}