const express = require('express');
let router = express.Router();
const placesController = require('../controllers/PlacesController');
const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(placesController.index)
  .post(
    placesController.multerMiddleware(), 
    placesController.create, 
    placesController.saveImage)

//El middleware find actúa como una capa intermedia entre la ejeución de los métodos
router.route('/:id')
  .get(placesController.find, placesController.show)
  //Validamos que solo el propietario del recurso pueda editar o eliminar
  .put(placesController.find, authenticateOwner, placesController.update)
  .delete(placesController.find, authenticateOwner, placesController.destroy)

module.exports = router;