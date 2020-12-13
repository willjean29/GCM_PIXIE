/*
  Rutas del precio.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const prizeController = require('../controllers/prizeController');

// Importando middlewares
const {verifyTokenAdmin} = require('../middlewares/verifyToken');

// Para obtener premios
router.get('/',
  verifyTokenAdmin,
  prizeController.obtenerPremios
);

// Para eliminar premios
router.delete('/:id',
  verifyTokenAdmin,
  prizeController.eliminarPremio
);

// Para actualizar premios
router.put('/:id',
  verifyTokenAdmin,
  prizeController.actualizarPremio
);

module.exports = router;