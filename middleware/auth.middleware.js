const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return  next();
  }

  try {
    const token = req.headers.autorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const data = tokenService.validateAccess(token);

    req.user = data;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}