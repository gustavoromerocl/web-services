const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const applicationsController = require('../controllers/ApplicationsController');

const { expressjwt: jwt } = require('express-jwt'); //podemos agregar jwt a una ruta en especifico, importando la libreria
const secrets = require('../config/secrets');

router.route('/')
  .get(jwt({secret: secrets.jwt_secret, algorithms: ["HS256"]}), applicationsController.index)
  .post(applicationsController.create)

router.route('/:application_id')
  .delete(applicationsController.find, authenticateOwner, applicationsController.destroy)

module.exports = router;