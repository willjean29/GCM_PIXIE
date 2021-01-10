/**
 * Rutas del administrador
 */
const express = require('express');
const router = express.Router();

// Importando controladores
const administratorController = require('../controllers/administratorController');
const authController = require('../controllers/authController');
const {uploadImage} = require('../middlewares/uploadImage');
const {verifyTokenAdmin} = require('../middlewares/verifyToken');
// iniciar sesión
router.post('/login', authController.autenticarAdministrador);

// administrador actual
router.get('/auth',
  verifyTokenAdmin,
  authController.administradorActual
);

// Para validar el DNI del adminsitradorAutenticado
router.post('/verificar-dni',authController.verificarDNI);

// registrar token de web master
router.post('/registrarToken', authController.registrarTokenAdmin);

// validar token de web master
router.post('/validarToken', authController.validarTokenAdmin);

// Para agregar nuevo administrador 
router.post('/register',administratorController.agregarAdministrador);

// Para obtener administrador por ID
router.get('/administrator/:id',administratorController.obtenerAdministratorID);

// Para obtener todos los administradores
router.get('/all',administratorController.obtenerAdministradores);

router.put('/',
  verifyTokenAdmin,
  administratorController.actualizarAdministrador
);

router.put('/avatar',
  verifyTokenAdmin,
  uploadImage,
  administratorController.agregarAvatar
);

router.get('/status/genero',
  verifyTokenAdmin,
  administratorController.obtenerDataGenero
);

router.get('/status/estado',
  verifyTokenAdmin,
  administratorController.obtenerDataEstado
);

router.get('/status/puntos',
  verifyTokenAdmin,
  administratorController.obtenerDataPuntos
);

router.get('/data',
  verifyTokenAdmin,
  administratorController.obtenerDatosEstaticos
);

module.exports = router;