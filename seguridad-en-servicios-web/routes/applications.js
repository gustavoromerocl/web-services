const express = require('express');
let router = express.Router();

const applicationsController = require('../controllers/ApplicationsController');

const { expressjwt: jwt } = require('express-jwt'); //podemos agregar jwt a una ruta en especifico, importando la libreria
const secrets = require('../config/secrets');

router.route('/')
  .get(jwt({secret: secrets.jwt_secret, algorithms: ["HS256"]}), applicationsController.index)
  .post(applicationsController.create)

router.route('/:id')
  .delete(applicationsController.find, applicationsController.destroy)

module.exports = router;