const Application = require('../models/Application');

module.exports = async function(req,res, next) {
  //Si la petición es ajax termina la ejecución del middleware
  try {
    if(req.xhr) return next();

    const secret = req.headers.secret;
  
    if(!secret) return next();
  
    const app = Application.findOne({secret});
    req.application = app;
    next();
  }catch(error){
    next(error);
  }
}