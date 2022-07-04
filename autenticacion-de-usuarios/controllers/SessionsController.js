const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

const generateToken = (req, res, next) => {
  if (!req.user) return next();
  //El método sing o firma recibe el payload y la firma para generar el jwt
  req.token = jwt.sign({ id: req.user._id }, secrets.jwt_secret);
  
  //Avanza a la siguiente ejecución
  next();
}

const sendToken = (req, res) => {
  //Si el token se generó lo envia como respuesta
  if(req.token){
    res.json({user: req.user, jwt: req.token});
  }else {
    res.status(422).json({error: 'Could not create user'});
  }
}

module.exports = { generateToken, sendToken }