/*
  Rutas de usuario.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const userController = require('../controllers/userController');

// Para registrar nuevo cliente
router.post('/register',
  userController.registrarCliente
);

router.put('/',
  userController.actualizarCliente
);

module.exports = router;