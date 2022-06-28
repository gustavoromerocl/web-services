const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

placeSquema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSquema);

module.exports = Place;