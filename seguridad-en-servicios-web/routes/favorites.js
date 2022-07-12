const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const favoritesController = require('../controllers/FavoritesController');
const { expressjwt: jwt } = require('express-jwt'); //podemos agregar jwt a una ruta en especifico, importando la libreria
const secrets = require('../config/secrets');

router.route('/')
  .get(jwt({secret: secrets.jwt_secret, algorithms: ["HS256"]}), favoritesController.index)
  .post(favoritesController.create)

router.route('/:id')
  .delete(favoritesController.find, authenticateOwner, favoritesController.destroy)

module.exports = router;