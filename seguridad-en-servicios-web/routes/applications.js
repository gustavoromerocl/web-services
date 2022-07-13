const express = require('express');
let router = express.Router();

const applicationsController = require('../controllers/ApplicationsController');
const findUser = require('../middlewares/findUser');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

const { expressjwt: jwt } = require('express-jwt'); //podemos agregar jwt a una ruta en especifico, importando la libreria
const secrets = require('../config/secrets');

router.all('*', jwt({secret: secrets.jwt_secret, algorithms: ["HS256"]}), findUser, authenticateAdmin);

router.route('/')
  .get(applicationsController.index)
  .post(applicationsController.create)

router.route('/:id')
  .delete(applicationsController.find, applicationsController.destroy)

module.exports = router;