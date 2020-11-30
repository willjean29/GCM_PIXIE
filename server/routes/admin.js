/*
  Rutas del administrador.
*/

const express = require('express');
const router = express.Router();

// Importando controladores
const administratorController = require('../controllers/administratorController');
const authController = require('../controllers/authController');

const { verifyTokenAdmin } = require('../middlewares/verifyToken');

// Para iniciar sesión
router.post('/login', 
  authController.autenticarAdministrador
);

// Para obtener el administrador actual
router.get('/auth',
  verifyTokenAdmin,
  authController.administradorActual
);

// Para validar el DNI del adminsitradorAutenticado
router.post('/verificar-dni',
  authController.verificarDNI
);

// Para registrar el token de web master
router.post('/registrarToken',
  authController.registrarTokenAdmin
);

// Para validar el token de web master
router.post('/validarToken',
  authController.validarTokenAdmin
);

// Para agregar nuevo administrador 
router.post('/register',
  administratorController.agregarAdministrador
);

// Para obtener administrador por ID
router.get('/administrator/:id',
  administratorController.obtenerAdministratorID
);

// Para obtener todos los administradores
router.get('/all',
  administratorController.obtenerAdministradores
);

module.exports = router;