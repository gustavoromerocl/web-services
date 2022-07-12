const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const SessionsController = require('../controllers/SessionsController');

router.route('/')
  //create se convierte en middleware y envia el usuario a el controlador de sesion para generar el token
  .post(
    UsersController.create,
    SessionsController.generateToken,
    SessionsController.sendToken)

  module.exports = router;
