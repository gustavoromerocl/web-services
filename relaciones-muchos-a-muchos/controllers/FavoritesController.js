const buildParams = require('./helpers').buildParams;
const FavoritePlace = require('../models/FavoritePlace');

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

module.exports = { find, create, destroy };