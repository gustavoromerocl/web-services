const buildParams = require('./helpers').buildParams;
const Visit = require('../models/Visit');
const User = require('../models/User');

const validParams = ['_place', 'reaction', 'observation'];

const find = async (req, res, next) => {
  try {
    let visit = await Visit.findById(req.params.visit_id);
    req.mainObj = visit;
    req.favorite = visit;
    next()
  } catch (error) {
    console.log(error)
    next(error);
  }
}

const index = async (req, res) => {
  try {
    const user = await User.findOne({'_id': req.auth.id});
    //Usamos el virtual creado en el modelo user
    const places = await user.favorites; 
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
  
    const visit = await Visit.create(params);
    console.log(visit);
    res.json(visit);
  } catch (error) {
    res.status(422).json({error});
  }

}

const destroy = (req, res) => {
  try {
    req.visit.remove();
    res.json({});
  } catch(error) {
    console.log(error)
    res.status(500).json({error});
  }
  
}

module.exports = { index, find, create, destroy };