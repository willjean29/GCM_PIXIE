/*
  Rutas del catalogo de premios.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const catalogController = require('../controllers/catalogController');

// Importando middlewares
const {uploadImage} = require('../middlewares/uploadMultiImages');
const {verifyTokenAdmin} = require('../middlewares/verifyToken');

// Para registrar catalogo de premios
router.post('/register',
  verifyTokenAdmin,
  uploadImage,
  catalogController.registrarCatalogoPremios
);

module.exports = router;