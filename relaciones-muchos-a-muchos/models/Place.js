/* https://mongoosejs.com/docs/guide.html */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');
const slugify = require('../plugins/slugify');
const Visit = require('./Visit');

let placeSquema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true
  },
  address: String,
  description: String,
  acceptCreditCard: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
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
  //Validamos que el elemento no exista previamente para evitar cambiar el slug al hacer update
  if(this.slug) return next();

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

  console.log(count);
  //Si el recurso ya existe se agrega un numero al slug
  if(count !== 0) this.slug = `${this.slug}-${count}`;
  console.log(this.slug);
  const isValid = await Place.validateSlugCount(this.slug);
  //Si el slug no es valido, se aumenta el contador y se vuelve a ejecutar la función (Olvidaste el return)
  if(!isValid) return generateSlugAndContinue.call(this,count+1, next);
  
  //Validamos si es un valor que no existe previamente para terminar la ejecución con next
  next();
}

placeSquema.plugin(mongoosePaginate);

placeSquema.virtual('visits').get(function(){
  return Visit.find({'_place': this._id}).sort('_id');
});

let Place = mongoose.model('Place', placeSquema);

module.exports = Place;