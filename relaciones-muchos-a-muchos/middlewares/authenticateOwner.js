//Validamos que el usuario actual sea el propietario para proteger el recurso
module.exports = function(req, res, next){
  if(req.place && (req.place._user == req.auth.id)) return next();

  next(new Error('You havent permissions to be here'));
}