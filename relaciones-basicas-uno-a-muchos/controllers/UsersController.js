const User = require('../models/User');
const buildParams = require('./helpers').buildParams;

const validParams = ['email', 'name', 'password'];

const create = async (req, res, next) => {
  try {
    let params = buildParams(validParams, req.body);
    const user = await User.create(params);
    req.user = user;

    next();
    //res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).json({ error });
  }
}

const myPlaces = async (req, res) => {
  try {
    console.log(req.auth);
    const user = await User.findOne({ '_id': req.auth.id });
    const places = await user.places;
    console.log(places);
    res.json(places);
  } catch (error) {
    console.log(error);
    res.status(422).json({ error });
  }

}

module.exports = { create, myPlaces };