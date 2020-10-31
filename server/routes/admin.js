const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// iniciar sesión
router.post('/login', authController.autenticarAdministrador2);

module.exports = router;
