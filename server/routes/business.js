const express = require('express');
const router = express.Router();

// Importando controladores
const businessController = require('../controllers/businessController');
const authController = require('../controllers/authController');

const { verificarToken } = require('../middlewares/verifyToken');
const { uploadImage } = require('../middlewares/uploadImage');

// Para validar RUC
router.post('/verificar-ruc',
  // authController.adminsitradorAutenticado,
  businessController.validarRUC
);

module.exports = router;