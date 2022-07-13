const { unless } = require("express-unless");

module.exports = function(options){
  let CORsMiddleware = function(req, res, next){

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', "Origin, X-REquested-With, Content-Type, Accept, Authorization, Application")
    next();
  }

  CORsMiddleware.unless = unless;

  return CORsMiddleware;
}