const Place = require('../models/Place');

//Middleware de búsqueda individual
const find = async (req, res, next) => {
  try {
    const  place = await Place.findById(req.params.id)

    req.place = place;
    next()

  } catch (err) {
    next(err)
  }
}

const index = async (req, res) => {
  //Búsqueda de todos los recursos

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
  //Búsqueda individual
  res.json(req.place);
}

const create = async (req, res) => {
  //Crear un recurso
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
  //Actualizar un recurso
  let attributes = ['title', 'description', 'acceptCreditCard', 'openHour', 'closeHour'];
  let placeParams = {};

  //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
  attributes.forEach(attr => {
    if(Object.prototype.hasOwnProperty.call(req.body, attr))
      placeParams[attr] = req.body[attr];
  })

  try {
    //Retorna un nuevo objeto comparando los que recibe por parametros y actualizando los valores
    req.place = Object.assign(req.place, placeParams);
    req.place.save()

    res.json(req.place);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

const destroy = (req, res) => {
  //Eliminar un recurso
  try {
    req.place.remove();
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

module.exports = { index, show, create, update, destroy, find}