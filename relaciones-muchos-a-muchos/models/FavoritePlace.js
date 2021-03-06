const mongoose = require('mongoose');

let favoriteSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  }
});

const FavoritesPlace = mongoose.model('FavoritesPlace', favoriteSchema);

module.exports = FavoritesPlace;
