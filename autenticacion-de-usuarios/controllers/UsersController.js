const User = require('../models/User');
const buildParams = require('./helpers').buildParams;

const validParams = ['email', 'name', 'password'];

const create = async (req, res) => {
  try {
    let params = buildParams(validParams, req.body);
    const user = await User.create(params);
    
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).json({error});
  }
}

module.exports = { create };