const buildParams = require('./helpers').buildParams;
const Application = require('../models/Application');

const validParams = ['origins', 'name'];

const find = async (req, res, next) => {
  try {
    let application = await Application.findById(req.params.id);
    req.mainObj = application;
    req.application = application;
    next()
  } catch (error) {
    console.log(error)
    next(error);
  }
}

const index = async (req, res) => {
  try {
    res.json({message: "Hola desde index"})
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

const create = async (req, res) => {
  try {
    let params = buildParams(validParams, req.body);
  
    const application = await Application.create(params);
    console.log(application);
    res.json(application);
  } catch (error) {
    res.status(422).json({error});
  }

}

const destroy = (req, res) => {
  try {
    req.application.remove();
    res.json({});
  } catch(error) {
    console.log(error)
    res.status(500).json({error});
  }
  
}

module.exports = { index, find, create, destroy };