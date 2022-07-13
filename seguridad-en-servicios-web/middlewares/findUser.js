const User = require('../models/User');

module.exports = async function (req, res, next) {
  if (req.auth) {
    const user = await User.findById(req.auth.id)
    req.fullUser = user;
    return next();
  }

  next();
}

