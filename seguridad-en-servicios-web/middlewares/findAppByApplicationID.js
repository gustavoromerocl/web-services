const Application = require('../models/Application');

module.exports = function (req, res, next) {
  if (req.application) return next();

  const applicationId = req.headers.application;

  if (!applicationId) return next();

  const app = Application.findOne({ applicationId });
  if(!app) return next(new Error('Invalid Application'));

  req.application = app;
  next();
}