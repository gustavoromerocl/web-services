const Place = require('../models/Place');

const index = async (req, res) => {
  //Si al find method no se le pasa argumentos asume que trae la colección completa sin filtros
  /*   Place.find({})
      .then(docs => res.json(docs))
      .catch(err => {
        console.log(err);
        res.json(err);
      }) */

  try {
    //paginate de mongoose recibe como primer argumentos los where's o filtros
    //Como segundo argumento recibe la paginacióń
    //Como tercer argumento recibe el limite de elementos por página
    //Como cuarto argumento, recibe el orden, por default es desde el primero creado al ultimo, si agtregamos -1 lo invierte
    const data = await Place.paginate({}, { page: req.query.page || 1, limit: 8, sort: { '_id': -1 } })
    //Los query son los que se reciben en la url despúes del ?
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }

}

const show = async (req, res) => {
  //res.json(req.params.id)
  //Realiza búsqueda por id
  try {
    const data = await Place.findById(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err)
    res.json(err)
  }

}

const create = async (req, res) => {
  try {
    const data = await Place.create({
      title: req.body.title,
      description: req.body.description,
      acceptCreditCard: req.body.acceptCreditCard,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour
    })

    res.json(data);

  } catch (err) {
    console.log(err)
    res.json(err)
  }

}

const update = async (req, res) => {
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

  try {
    const data = await Place.updateOne({ _id: req.params.id }, {
      title: req.body.title,
      description: req.body.description,
      acceptCreditCard: req.body.acceptCreditCard,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour
    })

    res.json(data);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

const destroy = (req, res) => {
  try {
    const data = Place.findByIdAndRemove(req.params.id)
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

module.exports = { index, show, create, update, destroy }