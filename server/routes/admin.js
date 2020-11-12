/**
 * Rutas del administrador
 */
const express = require('express');
const router = express.Router();

// Importando controladores
const administratorController = require('../controllers/administratorController');
const authController = require('../controllers/authController');
// iniciar sesión
router.post('/login', authController.autenticarAdministrador);

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

module.exports = router;