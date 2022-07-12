const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const visitsController = require('../controllers/VisitsController');


router.route('/')
  .get(visitsController.index)
  .post(visitsController.create)

router.route('/:id')
  .delete(visitsController.find, authenticateOwner, visitsController.destroy)

module.exports = router;