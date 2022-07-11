const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
const FavoritePlace = require('./FavoritePlace'); //Importar antes que Place, de lo contrario genera error
const Place = require('./Place');


let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  admin: {
    type: Boolean,
    default: false
  }
});

//Hoock
//post se ejecuta despues del método save, recibe dos argumentos, el usuario creado y el método next
userSchema.post('save', function (user, next) {
  const count = User.count();
  //Solo si es el primer usuario le asigna el admin true, para el resto es false
  if (count === 1) User.updateOne({ _id: user._id }, { admin: true });

  next();
})

//Traer los lugares asociados al usuarios
userSchema.virtual('places').get(function () {
  return Place.find({ '_user': this._id });
});

userSchema.virtual('favorites').get(async function () {
  //El segundo argumento especifica que propiedad queremos retornar de la consulta
  const response = await FavoritePlace.find({ '_user': this._id }, { '_place': true }).exec();
  
  //Creamos un nuevo arreglo solo con la propiedad _place
  const favorites = response.map(favorite => favorite._place);

  //retorna los lugares que estén en el arreglo favorites
  return Place.find({ '_id': { $in: favorites } });
})

//Asigna un campo password con las funciones necesarias para manipular la encriptación
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;