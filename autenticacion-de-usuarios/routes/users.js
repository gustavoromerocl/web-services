const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const SessionsController = require('../controllers/SessionsController');

router.route('/')
  .post(
    UsersController.create, 
    //create se conveirte en middleware y envia el usuario a el controlador de sesion para generar el token
    SessionsController.generateToken, 
    SessionsController.sendToken)

module.exports = router;
