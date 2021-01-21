/*
  Configuración de conexión a la BD de Cloudinary
  para el almacenamiento de imágenes.
*/

// Importando librerías
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = cloudinary;