const express = require('express');
let router = express.Router();
const Place = require('../models/Place');

router.route('/')
  .get((req, res) =>
    //Si al find method no se le pasa argumentos asume que trae la colección completa sin filtros
    Place.find({})
      .then(docs => res.json(docs))
      .catch(err => {
        console.log(err)
        res.json(err)
      }))
  .post((req, res) => {
    Place.create({
      title: req.body.title,
      description: req.body.description,
      acceptCreditCard: req.body.acceptCreditCard,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour
    }).then(doc => res.json(doc))
      .catch(err => {
        console.log(err)
        res.json(err)
      })
  })

router.route('/:id')
  .get((req, res) => {
    //res.json(req.params.id)
    //REaliza búsqueda por id
    Place.findById(req.params.id)
      .then(doc => res.json(doc))
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  })
  .put((req, res) => {
    /*   Place.findById(req.params.id)
        .then(doc => {
          doc.title = req.body.title,
          doc.description = req.body.description,
          doc.acceptCreditCard = req.body.acceptCreditCard,
          doc.openHour = req.body.openHour,
          doc.closeHour = req.body.closeHour
    
          doc.save();
          res.json(doc);
        }) */
  
    Place.updateOne({ _id: req.params.id }, {
      title: req.body.title,
      description: req.body.description,
      acceptCreditCard: req.body.acceptCreditCard,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour
    })
      .then(doc => res.json(doc))
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  
  })
  .delete((req, res) => {
    Place.findByIdAndRemove(req.params.id)
      .then(doc => {
        res.json({})
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  })

module.exports = router;