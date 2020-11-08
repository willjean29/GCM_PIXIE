const express = require('express');
const router = express.Router();

// Importando controladores
const administratorController = require('../controllers/administratorController');
const authController = require('../controllers/authController');

// Para agregar nuevo administrador 
router.post('/register',administratorController.agregarAdministrador);

module.exports = router;
