const buildParams = require('./helpers').buildParams;
const FavoritePlace = require('../models/FavoritePlace');
const User = require('../models/User');
const validParams = ['_place'];

const find = async (req, res, next) => {
  try {
    let favorite = await FavoritePlace.findById(req.params.id);
    req.mainObj = favorite;
    req.favorite = favorite;
    next()
  } catch (error) {
    console.log(error)
    next(error);
  }
}

const index = async (req, res) => {
  try {
    if(!req.fullUser) return res.json({});

    //Usamos el virtual creado en el modelo user
    const places = await req.fullUser.favorites; 
    //console.log(places);
    res.json(places);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

const create = async (req, res) => {
  try {
    let params = buildParams(validParams, req.body);
    
    params['_user'] = req.auth.id;
  
    const favorite = await FavoritePlace.create(params);
    console.log(favorite);
    res.json(favorite);
  } catch (error) {
    res.status(422).json({error});
  }

}

const destroy = (req, res) => {
  try {
    req.favorite.remove();
    res.json({});
  } catch(error) {
    console.log(error)
    res.status(500).json({error});
  }
  
}

module.exports = { index, find, create, destroy };