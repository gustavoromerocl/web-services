/* https://mongoosejs.com/docs/guide.html */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');
const slugify = require('../plugins/slugify');

let placeSquema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true
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
},{
  //Los métodos se deben declarar como funciones ES5, mongoose no interpreta arrow functions ya que se basa en Clases
  methods: {
    updateImage: async function(path, imageType){
      //subir la imagen

      //uploader(path).then(secure_url => this.saveAvatarUrl(secure_url))
      const response = await uploader(path);

      return await this.saveImageUrl(response, imageType);
    },
    saveImageUrl: async function(secure_url, _imageType){
      //guardar el lugar
      //Accedemos a la prop del objeto mediante la key 
      this[`${_imageType}Image`] = secure_url;
      return await this.save();
    },
  }
})

//Hooks
placeSquema.pre('save', async function(next){
  //call, bind y apply (Scope): call preserva el valor de this
  await generateSlugAndContinue.call(this, 0, next);
  next();
})

placeSquema.statics.validateSlugCount = async function(slug){
  const count = await Place.count({slug});
  if(count > 0) return false;
  return true;
}

async function generateSlugAndContinue(count, next){
  this.slug = slugify(this.title);
  //Si el recurso ya existe se agrega un numero al slug
  if(count != 0) this.slug = `${this.slug}-${count}`;

  const isValid = await Place.validateSlugCount(this.slug);
  //Si el slug no es valido, se aumenta el contador y se vuelve a ejecutar la función
  if(!isValid) generateSlugAndContinue.call(this,count+1, next);
  
  //Validamos si es un valor que no existe previamente para terminar la ejecución con next
  next();
}

placeSquema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSquema);

module.exports = Place;