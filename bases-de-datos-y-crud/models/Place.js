const mongoose = require('mongoose');

let placeSquema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  acceptCreditCard: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number
  })

let Place = mongoose.model('Place', placeSquema);

module.exports = Place;