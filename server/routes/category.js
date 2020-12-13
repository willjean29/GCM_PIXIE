/*
  Rutas de la categoría.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const categoryController = require('../controllers/categoryController');

// Importando middlewares
const { verifyTokenAdmin } = require('../middlewares/verifyToken');

// Para registrar una categoría
router.post('/',
  // verifyTokenAdmin,
  categoryController.registrarCategoria
);

// Para obtener las categorías
router.get('/',
  verifyTokenAdmin,
  categoryController.obtenerCategorias
);

module.exports = router;