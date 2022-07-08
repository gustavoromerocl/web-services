const Place = require('../models/Place');
const upload = require('../config/upload');
const helpers = require('./helpers');


const validParams = ['title', 'description', 'address', 'acceptCreditCard', 'openHour', 'closeHour'];

//Middleware de búsqueda individual
const find = async (req, res, next) => {
  try {
    //findOne: realiza la búsqueda de un recurso por la propiedad que se le indique, en este caso busca hacermatch con el query param
    const place = await Place.findOne({slug: req.params.id}).exec();
    req.place = place;
    next();

  } catch (err) {
    next(err);
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

//Transformamos la función create en un middleware
const create = async (req, res, next) => {
  //Crear un recurso
  try {
    const params = helpers.buildParams(validParams, req.body);
    //console.log(req.auth);
    params['_user'] = req.auth.id; //Le pasamos el usuario que almacena el jwt al proteger las rutas
    const data = await Place.create(params);

    //Guardamos el nuevo lugar en el objeto request para usarlo en la función saveImage
    req.place = data;
    next();
  } catch (err) {
    next(err)
  }

}

const update = async (req, res) => {
  try {
    const params = helpers.buildParams(validParams, req.body);
    //Retorna un nuevo objeto comparando los que recibe por parametros y actualizando los valores
    
    req.place = Object.assign(req.place, params);
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

const multerMiddleware = () => upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]);

const saveImage = async (req, res) => {
  if (req.place) {
    const files = ['avatar', 'cover'];
    let promises = [];

    //Iteramo sobre los tipos de imagenes almacenados en files
    files.forEach(async (imageType) => {
      //Validamos que hayan archivos cargados y que el tipo de imagen correponda al que se esta iterando
      if (req.files && req.files[imageType]) {
        //Almacenamos el path en una variable
        const path = req.files[imageType][0].path;
        //Agregamos una promesa al arreglo de promesas para subir la imagen a la nube
        promises = [...promises, req.place.updateImage(path, imageType)];
      }
    })

    //console.log(promises);
    //Ejecutamos el arreglo de promesas
    try {
      await Promise.all(promises);
      //console.log(response);
      res.json(req.place);
    } catch (err) {
      console.log(err);
      res.status(400).json({})
    }
  }else{
    res.status(422).json({})
  }
}

module.exports = { index, show, create, update, destroy, find, multerMiddleware, saveImage }