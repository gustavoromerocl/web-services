module.exports = async function (req, res, next) {
  if (req.fullUser && req.fullUser.admin) return next();
  
  next(new Error('You havent permissions to be here'));
}

