/*
  Rutas de premios.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const prizeController = require('../controllers/prizeController');

// Importando middlewares
const {verifyTokenAdmin} = require('../middlewares/verifyToken');

// Para obtener la lista de premios
router.get('/',
  verifyTokenAdmin,
  prizeController.obtenerPremios
);

// Para eliminar un premio
router.delete('/:id',
  verifyTokenAdmin,
  prizeController.eliminarPremio
);

// Para actualizar datos de un premio
router.put('/:id',
  verifyTokenAdmin,
  prizeController.actualizarPremio
);

module.exports = router;