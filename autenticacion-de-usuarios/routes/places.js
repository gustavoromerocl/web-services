const express = require('express');
let router = express.Router();
const placesController = require('../controllers/PlacesController')


router.route('/')
  .get(placesController.index)
  .post(
    placesController.multerMiddleware(), 
    placesController.create, 
    placesController.saveImage)

//El middleware find actúa como una capa intermedia entre la ejeución de los métodos
router.route('/:id')
  .get(placesController.find, placesController.show)
  .put(placesController.find, placesController.update)
  .delete(placesController.find, placesController.destroy)

module.exports = router;