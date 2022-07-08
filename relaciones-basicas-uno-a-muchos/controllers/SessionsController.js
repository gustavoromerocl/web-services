const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const User = require('../models/User');

const authenticate = async (req,res, next) => {
  try{
    //buscamos el usuario por email
    const user = await User.findOne({email: req.body.email});
    //usamos el method verifyPassword de bcrypt que valida que la credenciale este correcta (solo si existe el usuario validado anteriormente)
    const valid = await user.verifyPassword(req.body.password);

    //Si la contraseña coincide, valid es true
    if (valid) {
      //guardamos el usuario en el request y le damos next;
      req.user = user
      next();
    }else {
      throw('Invalid Credentials');
    }
  }catch(err){
    res.json({err});
    next(err);
  }
}

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

module.exports = { generateToken, sendToken, authenticate }