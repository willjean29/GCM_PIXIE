/*
  Rutas del administrador.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const administratorController = require('../controllers/administratorController');
const authController = require('../controllers/authController');

const { uploadImage } = require('../middlewares/uploadImage');
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

// Para validar el DNI del administradorAutenticado
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

// Para actualizar datos de administrador
router.put('/',
  verifyTokenAdmin,
  administratorController.actualizarAdministrador
);

// Para agregar imagen de administrador
router.put('/avatar',
  verifyTokenAdmin,
  uploadImage,
  administratorController.agregarAvatar
);

module.exports = router;