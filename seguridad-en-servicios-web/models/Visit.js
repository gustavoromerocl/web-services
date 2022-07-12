const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const REACTIONS = [ 'like', 'love', 'disappointment', 'yummy', 'anger', 'disgust' ];

let visitSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  reaction: {
    type: String,
    //Los enums sirven para definir una coleccion de datos válidos para una propiedad
    enum: REACTIONS
  },
  observation: String
});

visitSchema.plugin(mongoosePaginate);

visitSchema.statics.forUser = function(userId, page){
  return Visit.paginate({'_user': userId}, {page: page, limit: 5, sort: { '_id': -1}});
}

const Visit = mongoose.model('Visit', visitSchema );

module.exports = Visit;