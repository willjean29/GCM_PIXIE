/*
  Rutas del catálogo.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const catalogController = require('../controllers/catalogController');

// Importando middlewares
const {uploadImage} = require('../middlewares/uploadMultiImages');
const {verifyTokenAdmin} = require('../middlewares/verifyToken');

// Para registrar el catálogo de premios
router.post('/register',
  verifyTokenAdmin,
  uploadImage,
  catalogController.registrarCatalogoPremios
);

// Para mostrar el catálogo de premios
router.get('/register',
  verifyTokenAdmin,
  catalogController.mostrarCrearCatalogo
);

// Para mostrar la lista de premios
router.get('/list',
  verifyTokenAdmin,
  catalogController.mostrarListaCatalogo
);

module.exports = router;