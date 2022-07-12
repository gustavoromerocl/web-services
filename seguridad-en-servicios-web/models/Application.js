const mongoose = require('mongoose');
const randomstring = require('randomstring');

async function assignRandomAndUniqueValueToField(app, field, next) {
  const randomString = randomstring.generate(20);

  let searchCriteria = {};
  //asignamos el valor generado a la propiedad al objeto 
  searchCriteria[field] = randomString;

  //contamos los elementos que coincidan con el objeto
  const count = await Application.count(searchCriteria);
  
  //Si encuentra un objeto que coincida, volemos a ejecutar la función
  if( count > 0 ) return assignRandomAndUniqueValueToField(app, field, next);

  //Asignamos a la propiedad
  app[field] = randomString;
  
  next();
}

let applicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true
  },
  secret: {
    type: String,
    required: true,
    unique: true
  },
  origins: String,
  name: String
});

//Ejecutamos antes de guardar el elemento
applicationSchema.pre('validate', function(next) {
  assignRandomAndUniqueValueToField(this, 'applicationId', () => {
    assignRandomAndUniqueValueToField(this, 'secret', next)
  });
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;