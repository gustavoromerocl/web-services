const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const visitsController = require('../controllers/VisitsController');

const { expressjwt: jwt } = require('express-jwt'); //podemos agregar jwt a una ruta en especifico, importando la libreria
const secrets = require('../config/secrets');

router.route('/')
  .get(jwt({secret: secrets.jwt_secret, algorithms: ["HS256"]}), visitsController.index)
  .post(visitsController.create)

router.route('/:visit_id')
  .delete(visitsController.find, authenticateOwner, visitsController.destroy)

module.exports = router;