/*
  Rutas de categorías.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const categoryController = require('../controllers/categoryController');

// Importando middlewares
const { verifyTokenAdmin } = require('../middlewares/verifyToken');

// Para registrar categoría
router.post('/',
  // verifyTokenAdmin,
  categoryController.registrarCategoria
);

// Para obtener la lista de categorías
router.get('/',
  verifyTokenAdmin,
  categoryController.obtenerCategorias
);

module.exports = router;