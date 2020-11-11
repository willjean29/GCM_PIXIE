/**
 * Rutas del administrador
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// iniciar sesión
router.post('/login', authController.autenticarAdministrador);

// validar token de web master
router.post('/validarToken', authController.validarTokenAdmin);

module.exports = router;