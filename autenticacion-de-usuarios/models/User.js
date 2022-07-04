const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

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
//post se ejcuta despues del método save, recibe dos argumentos, el usuario creado y el método next
userSchema.post('save', async function (user, next) {
  const count = await User.count();
  //Solo si es el primer usuario le asigna el admin true, para el resto es false
  if (count === 1) await User.updateOne({_id: user._id}, {admin: true});
  
  next();
})

//Asigna un campo password con las funciones necesarias para manipular la encriptación
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;