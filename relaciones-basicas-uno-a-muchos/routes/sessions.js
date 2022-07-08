const express = require('express');
const router = express.Router();

const SessionsController = require('../controllers/SessionsController');

router.route('/')
  .post(
    SessionsController.authenticate, 
    //validamos que las credenciales (email, password) existan en nuestra bbdd y si existe, generamos y enviamos el token
    SessionsController.generateToken, 
    SessionsController.sendToken)

module.exports = router;