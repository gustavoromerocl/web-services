const cloudinary = require('cloudinary');
const secrets = require('../config/secrets');

cloudinary.config(secrets.cloudinary);

//Retornamos una función que recibe el path de la imagen y retorna una promesa para procesar el upload
module.exports = (imagePath) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload(imagePath, (result) => {
    console.log(result);
    if(result.secure_url) return resolve(result.secure_url);

    reject(new Error('Error with cloudinary'));
  })
})