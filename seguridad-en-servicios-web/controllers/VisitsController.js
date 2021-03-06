const buildParams = require('./helpers').buildParams;
const Visit = require('../models/Visit');

const validParams = ['_place', 'reaction', 'observation'];

const find = async (req, res, next) => {
  try {
    let visit = await Visit.findById(req.params.visit_id);
    req.mainObj = visit;
    req.visit = visit;
    next()
  } catch (error) {
    console.log(error)
    next(error);
  }
}

const index = async (req, res) => {
  try {
    let promise = null;

    //Visitas de un lugar
    if(req.place) promise = req.place.visits;

    //visitas de un usuario
    if(req.auth) promise = Visit.forUser(req.auth.id, req.query.page || 1)

    if(promise) {
      const visits = await promise;
      res.json(visits);
    }
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