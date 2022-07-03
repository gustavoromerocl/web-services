/* https://mongoosejs.com/docs/guide.html */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');

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

placeSquema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSquema);

module.exports = Place;