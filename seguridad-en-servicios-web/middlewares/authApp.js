const Application = require('../models/Application');
var { unless } = require("express-unless");
module.exports = function (middlewareOptions) {
  let AuthApp = function (req, res, next) {
    try {
      const count = Application.count({});
      //Si no hay una aplicación creada nos permite (o si el count es 0) no entra en esta validación
      if (count > 0 && !req.application) return next(new Error('An application is required to consume this APIs'));

      req.validApp = true;
      next();
    } catch (error) {
      next(error);
    }
  }

  AuthApp.unless = unless;

  return AuthApp;
}

