const Place = require('../models/Place');

const index = (req, res) => {
  //Si al find method no se le pasa argumentos asume que trae la colección completa sin filtros
/*   Place.find({})
    .then(docs => res.json(docs))
    .catch(err => {
      console.log(err);
      res.json(err);
    }) */

    //paginate de mongoose recibe como primer argumentos los where's o filtros
    //Como segundo argumento recibe la paginacióń
    //Como tercer argumento recibe el limite de elementos por página
    //Como cuarto argumento, recibe el orden, por default es desde el primero creado al ultimo, si agtregamos -1 lo invierte
    Place.paginate({},{page: req.query.page || 1, limit: 8, sort: {'_id': -1}})
    //Los query son los que se reciben en la url despúes del ?
    .then(docs => res.json(docs))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
}

const show = (req, res) => {
  //res.json(req.params.id)
  //REaliza búsqueda por id
  Place.findById(req.params.id)
    .then(doc => res.json(doc))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
}

const create = (req, res) => {
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
}

const update = (req, res) => {
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
}

const destroy = (req, res) => {
  Place.findByIdAndRemove(req.params.id)
    .then(doc => {
      res.json({})
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
}

module.exports = {index, show, create, update, destroy}