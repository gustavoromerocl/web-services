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

//Asigna un campo password con las funciones necesarias para manipular la encriptación
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;